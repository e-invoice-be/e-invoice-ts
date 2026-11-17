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
// Authorization is dropped so a reflected request header is not handed back to the subprocess.
const droppedResponseHeaders = new Set([
  'authorization',
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'proxy-authorization',
  'transfer-encoding',
]);

/** Largest request body the listener will buffer and forward. */
export const MAX_FORWARDED_BODY_BYTES = 32 * 1024 * 1024;

// Encoded slash or backslash, or an encoded `..`, including a `%25` encoding of that percent sign.
// A single encoded dot (as in `file%2etxt`) is left alone.
const encodedPathTrick = /%(?:25)*(?:2f|5c)|%(?:25)*2e%(?:25)*2e/i;

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

class ForwardRejected extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

function sendError(res: http.ServerResponse, status: number, message: string) {
  if (res.headersSent) {
    res.destroy();
    return;
  }
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}

function redact(value: string, secrets: readonly string[]): string {
  return secrets.reduce(
    (current, secret) => (secret.length >= 8 ? current.split(secret).join('[redacted]') : current),
    value,
  );
}

function hasToken(requestTarget: string, token: string): boolean {
  const candidate = Buffer.from(requestTarget.slice(1, 1 + token.length));
  const expected = Buffer.from(token);
  if (candidate.length !== expected.length || !crypto.timingSafeEqual(candidate, expected)) {
    return false;
  }
  const next = requestTarget[1 + token.length];
  return next === undefined || next === '/' || next === '?';
}

/**
 * The path of a forwarded request, without the query string. Rejects parent segments, backslashes,
 * and encodings of a slash, backslash, or parent segment, which an upstream server may treat as path syntax.
 */
function isSafeRequestPath(pathPart: string): boolean {
  if (pathPart.includes('\\') || pathPart.includes('\0') || pathPart.includes('#')) return false;
  if (encodedPathTrick.test(pathPart)) return false;
  return !pathPart.split('/').some((segment) => segment === '..' || segment === '.');
}

function isWithinBase(url: URL, base: URL): boolean {
  if (url.origin !== base.origin || url.username !== base.username || url.password !== base.password) {
    return false;
  }
  const basePath = base.pathname;
  // A base URL with no path prefix covers every path on that origin.
  if (basePath === '/') return true;
  return url.pathname === basePath || url.pathname.startsWith(`${basePath}/`);
}

function resolveForwardURL(
  upstreamBase: string,
  upstreamBaseURL: URL,
  requestTarget: string,
  token: string,
): URL {
  // Absolute-form targets (`GET http://host/...`) and anything other than an origin-form path are refused.
  if (!requestTarget.startsWith('/') || !hasToken(requestTarget, token)) {
    throw new ForwardRejected(404, 'Not found');
  }
  const rest = requestTarget.slice(1 + token.length);
  if (rest !== '' && !rest.startsWith('/') && !rest.startsWith('?')) {
    throw new ForwardRejected(404, 'Not found');
  }
  const queryAt = rest.indexOf('?');
  const pathPart = queryAt === -1 ? rest : rest.slice(0, queryAt);
  const query = queryAt === -1 ? '' : rest.slice(queryAt);
  if (!isSafeRequestPath(pathPart)) {
    throw new ForwardRejected(400, 'Requests can only be sent to the API base URL');
  }
  let target: URL;
  try {
    target = new URL(upstreamBase + pathPart + query);
  } catch {
    throw new ForwardRejected(400, 'Requests can only be sent to the API base URL');
  }
  if (!isWithinBase(target, upstreamBaseURL) || !isSafeRequestPath(target.pathname)) {
    throw new ForwardRejected(400, 'Requests can only be sent to the API base URL');
  }
  return target;
}

async function readBody(req: http.IncomingMessage): Promise<Buffer> {
  const declared = req.headers['content-length'];
  if (Array.isArray(declared)) {
    throw new ForwardRejected(400, 'Invalid Content-Length');
  }
  if (declared !== undefined) {
    const length = Number(declared);
    if (!Number.isInteger(length) || length < 0) {
      throw new ForwardRejected(400, 'Invalid Content-Length');
    }
    if (length > MAX_FORWARDED_BODY_BYTES) {
      throw new ForwardRejected(413, 'Request body is too large');
    }
  }
  const chunks: Buffer[] = [];
  let received = 0;
  for await (const chunk of req) {
    const buf = chunk as Buffer;
    received += buf.length;
    if (received > MAX_FORWARDED_BODY_BYTES) {
      throw new ForwardRejected(413, 'Request body is too large');
    }
    chunks.push(buf);
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
  // Taken from the client directly. `buildRequest` would also fold in `E_INVOICE_CUSTOM_HEADERS`,
  // which can carry its own Authorization line and must not replace this credential.
  const authorization = `Bearer ${client.apiKey}`;
  const secrets = [client.apiKey, authorization].filter((secret) => secret.length >= 8);

  const forward = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const remote = req.socket.remoteAddress;
    if (remote !== '127.0.0.1' && remote !== '::ffff:127.0.0.1') {
      sendError(res, 404, 'Not found');
      return;
    }

    let target: URL;
    try {
      target = resolveForwardURL(upstreamBase, upstreamBaseURL, req.url ?? '', token);
    } catch (error) {
      if (error instanceof ForwardRejected) {
        sendError(res, error.status, error.message);
        return;
      }
      throw error;
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
    let body: Buffer | undefined;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        body = await readBody(req);
      } catch (error) {
        if (error instanceof ForwardRejected) {
          sendError(res, error.status, error.message);
          res.once('finish', () => req.destroy());
          return;
        }
        throw error;
      }
    }

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
      if (!isWithinBase(next, upstreamBaseURL) || !isSafeRequestPath(next.pathname)) break;
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
      if (!droppedResponseHeaders.has(name)) responseHeaders[name] = redact(value, secrets);
    });
    const cookies = upstream.headers.getSetCookie();
    if (cookies.length > 0) responseHeaders['set-cookie'] = cookies.map((cookie) => redact(cookie, secrets));
    res.writeHead(upstream.status, responseHeaders);
    if (upstream.body) {
      await pipeline(Readable.fromWeb(upstream.body), res);
    } else {
      res.end();
    }
  };

  const server = http.createServer((req, res) => {
    forward(req, res).catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      sendError(res, 502, `Could not reach the API: ${redact(message, secrets)}`);
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
