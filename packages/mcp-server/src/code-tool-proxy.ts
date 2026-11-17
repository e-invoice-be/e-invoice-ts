import crypto from 'node:crypto';
import http from 'node:http';
import { AddressInfo } from 'node:net';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { EInvoice } from 'e-invoice-api';

/**
 * The API key handed to the SDK client inside the code tool subprocess. It is not a credential:
 * the upstream proxy replaces the `Authorization` header before a request leaves this process.
 */
export const PLACEHOLDER_API_KEY = 'managed-by-mcp-server';

export type UpstreamProxy = {
  /** Base URL for the SDK client in the subprocess, including the per-execution path token. */
  baseURL: string;
  /** `host:port` of the listener, for the subprocess's network permission. */
  host: string;
  close: () => Promise<void>;
};

// Headers that describe a single connection or that this proxy sets itself.
const droppedRequestHeaders = new Set([
  'authorization',
  'connection',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'proxy-connection',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

// `fetch` decodes the upstream body, so its encoding and length no longer describe what is sent on.
const droppedResponseHeaders = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'transfer-encoding',
]);

/**
 * Parses newline-separated `Name: value` pairs, the format of `E_INVOICE_CUSTOM_HEADERS`.
 */
export function parseCustomHeaders(value: string | undefined): Record<string, string> {
  const headers: Record<string, string> = {};
  for (const line of (value ?? '').split('\n')) {
    const colon = line.indexOf(':');
    if (colon > 0) {
      headers[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
    }
  }
  return headers;
}

const MAX_REDIRECTS = 5;

function sendError(res: http.ServerResponse, status: number, message: string) {
  if (res.headersSent) {
    res.destroy();
    return;
  }
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}

function hasToken(pathname: string, token: string): boolean {
  const candidate = Buffer.from(pathname.slice(1, 1 + token.length));
  const expected = Buffer.from(token);
  if (candidate.length !== expected.length || !crypto.timingSafeEqual(candidate, expected)) {
    return false;
  }
  const next = pathname[1 + token.length];
  return next === undefined || next === '/' || next === '?';
}

async function readBody(req: http.IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks);
}

/**
 * Starts a loopback HTTP listener that forwards requests to the API on behalf of `client`.
 *
 * The code tool subprocess talks to this listener instead of the API itself, so the credentials
 * stay in this process: every forwarded request gets the `Authorization` header of `client`,
 * whatever the subprocess sent. Requests must carry the random path token of this proxy, which
 * is only known to the one execution it was started for.
 *
 * @param defaultHeaders - headers added to forwarded requests that do not already set them.
 */
export async function startUpstreamProxy({
  client,
  defaultHeaders = {},
}: {
  client: EInvoice;
  defaultHeaders?: Record<string, string>;
}): Promise<UpstreamProxy> {
  const token = crypto.randomBytes(32).toString('hex');
  const upstreamBase = client.baseURL.replace(/\/+$/, '');
  const upstreamBaseURL = new URL(upstreamBase);
  const isWithinBase = (url: URL) =>
    url.origin === upstreamBaseURL.origin &&
    (upstreamBaseURL.pathname === '/' ||
      url.pathname === upstreamBaseURL.pathname ||
      url.pathname.startsWith(`${upstreamBaseURL.pathname}/`));
  const { req: authenticatedRequest } = await client.buildRequest({ method: 'get', path: '/' });
  const authorization = authenticatedRequest.headers.get('authorization');

  const forward = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const requestPath = req.url ?? '';
    if (!hasToken(requestPath, token)) {
      sendError(res, 404, 'Not found');
      return;
    }

    const target = new URL(upstreamBase + requestPath.slice(1 + token.length));
    if (!isWithinBase(target)) {
      sendError(res, 400, 'Requests can only be sent to the API base URL');
      return;
    }

    const headers = new Headers();
    for (const [name, value] of Object.entries(req.headers)) {
      if (value === undefined || droppedRequestHeaders.has(name)) continue;
      headers.set(name, Array.isArray(value) ? value.join(', ') : value);
    }
    for (const [name, value] of Object.entries(defaultHeaders)) {
      if (!droppedRequestHeaders.has(name.toLowerCase()) && !headers.has(name)) {
        headers.set(name, value);
      }
    }
    if (authorization) {
      headers.set('authorization', authorization);
    }

    let method = req.method ?? 'GET';
    let body = method === 'GET' || method === 'HEAD' ? undefined : await readBody(req);

    const abort = new AbortController();
    res.on('close', () => abort.abort());

    // Redirects are only followed while they stay within the API base URL; any other redirect
    // is passed on as the response.
    let url = target;
    let upstream: Response;
    for (let redirects = 0; ; redirects++) {
      upstream = await fetch(url, {
        method,
        headers,
        signal: abort.signal,
        redirect: 'manual',
        ...(body && body.length > 0 ? { body } : undefined),
      });
      const location = upstream.headers.get('location');
      if (upstream.status < 300 || upstream.status >= 400 || !location || redirects >= MAX_REDIRECTS) break;
      const next = new URL(location, url);
      if (!isWithinBase(next)) break;
      await upstream.body?.cancel();
      if (
        upstream.status === 303 ||
        (upstream.status !== 307 && upstream.status !== 308 && method === 'POST')
      ) {
        method = 'GET';
        body = undefined;
        headers.delete('content-type');
      }
      url = next;
    }

    const responseHeaders: Record<string, string | string[]> = {};
    upstream.headers.forEach((value, name) => {
      if (!droppedResponseHeaders.has(name)) responseHeaders[name] = value;
    });
    const cookies = upstream.headers.getSetCookie();
    if (cookies.length > 0) responseHeaders['set-cookie'] = cookies;
    res.writeHead(upstream.status, responseHeaders);
    if (upstream.body) {
      await pipeline(Readable.fromWeb(upstream.body), res);
    } else {
      res.end();
    }
  };

  const server = http.createServer((req, res) => {
    forward(req, res).catch((error) => {
      sendError(
        res,
        502,
        `Could not reach the API: ${error instanceof Error ? error.message : String(error)}`,
      );
    });
  });

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });
  const host = `127.0.0.1:${(server.address() as AddressInfo).port}`;

  return {
    baseURL: `http://${host}/${token}`,
    host,
    close: () =>
      new Promise<void>((resolve) => {
        server.close(() => resolve());
        server.closeAllConnections();
      }),
  };
}
