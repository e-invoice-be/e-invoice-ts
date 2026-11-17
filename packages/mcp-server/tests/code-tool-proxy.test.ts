import http from 'node:http';
import { AddressInfo } from 'node:net';
import EInvoice from 'e-invoice-api';
import {
  MAX_FORWARDED_BODY_BYTES,
  PLACEHOLDER_API_KEY,
  UpstreamProxy,
  parseCustomHeaders,
  startUpstreamProxy,
} from '../src/code-tool-proxy';

type RecordedRequest = {
  method: string | undefined;
  url: string | undefined;
  headers: http.IncomingHttpHeaders;
  body: string;
};

const API_KEY = 'test-key-held-by-the-server';

describe('startUpstreamProxy', () => {
  let upstream: http.Server;
  let upstreamURL: string;
  let requests: RecordedRequest[];
  let proxy: UpstreamProxy;

  beforeAll(async () => {
    upstream = http.createServer((req, res) => {
      const chunks: Buffer[] = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => {
        requests.push({
          method: req.method,
          url: req.url,
          headers: req.headers,
          body: Buffer.concat(chunks).toString(),
        });
        if (req.url === '/base/api/slash') {
          res.writeHead(307, { location: `${upstreamURL}/api/slash/` });
          res.end();
          return;
        }
        if (req.url === '/base/api/elsewhere') {
          res.writeHead(302, { location: 'http://other-host.test/landing' });
          res.end();
          return;
        }
        if (req.url === '/base/api/encoded') {
          res.writeHead(302, { location: `${upstreamURL}/..%2fsecret` });
          res.end();
          return;
        }
        if (req.url === '/base/api/reflect') {
          res.writeHead(200, {
            'content-type': 'application/json',
            authorization: `Bearer ${API_KEY}`,
            'x-note': `prefix ${API_KEY} suffix`,
          });
          res.end(JSON.stringify({ ok: true }));
          return;
        }
        if (req.url?.startsWith('/base/missing')) {
          res.writeHead(404, { 'content-type': 'application/json', 'x-request-id': 'req_1' });
          res.end(JSON.stringify({ detail: 'Not found' }));
          return;
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      });
    });
    await new Promise<void>((resolve) => upstream.listen(0, '127.0.0.1', resolve));
    upstreamURL = `http://127.0.0.1:${(upstream.address() as AddressInfo).port}/base`;
  });

  afterAll(async () => {
    upstream.closeAllConnections();
    await new Promise((resolve) => upstream.close(resolve));
  });

  beforeEach(async () => {
    requests = [];
    proxy = await startUpstreamProxy({
      client: new EInvoice({ apiKey: API_KEY, baseURL: upstreamURL }),
      defaultHeaders: { 'X-Tenant': 'from-server', 'X-Shared': 'from-server' },
    });
  });

  afterEach(async () => {
    await proxy.close();
  });

  it('listens on the loopback interface with a random path token', () => {
    expect(proxy.baseURL).toMatch(/^http:\/\/127\.0\.0\.1:\d+\/[0-9a-f]{64}$/);
    expect(proxy.baseURL).toContain(`http://${proxy.host}/`);
    expect(proxy.baseURL).not.toContain(API_KEY);
  });

  it('uses a different path token for every proxy', async () => {
    const other = await startUpstreamProxy({
      client: new EInvoice({ apiKey: API_KEY, baseURL: upstreamURL }),
    });
    try {
      expect(new URL(other.baseURL).pathname).not.toEqual(new URL(proxy.baseURL).pathname);
    } finally {
      await other.close();
    }
  });

  it('forwards requests to the API base URL with the credentials of the client', async () => {
    const response = await fetch(`${proxy.baseURL}/api/documents/?page=2`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${PLACEHOLDER_API_KEY}`,
        'content-type': 'application/json',
        'x-shared': 'from-request',
      },
      body: JSON.stringify({ hello: 'world' }),
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      method: 'POST',
      url: '/base/api/documents/?page=2',
      body: JSON.stringify({ hello: 'world' }),
    });
    expect(requests[0]!.headers).toMatchObject({
      authorization: `Bearer ${API_KEY}`,
      'content-type': 'application/json',
      // Default headers are added, but do not replace a header of the request.
      'x-tenant': 'from-server',
      'x-shared': 'from-request',
    });
  });

  it('works with an SDK client that only has the placeholder key', async () => {
    const workerClient = new EInvoice({ apiKey: PLACEHOLDER_API_KEY, baseURL: proxy.baseURL });

    expect(await workerClient.get('/api/me/')).toEqual({ ok: true });
    expect(requests[0]!.url).toBe('/base/api/me/');
    expect(requests[0]!.headers.authorization).toBe(`Bearer ${API_KEY}`);
  });

  it('follows redirects within the API base URL, keeping method and body', async () => {
    const response = await fetch(`${proxy.baseURL}/api/slash`, { method: 'POST', body: 'payload' });

    expect(response.status).toBe(200);
    expect(requests.map(({ method, url, body }) => ({ method, url, body }))).toEqual([
      { method: 'POST', url: '/base/api/slash', body: 'payload' },
      { method: 'POST', url: '/base/api/slash/', body: 'payload' },
    ]);
    expect(requests[1]!.headers.authorization).toBe(`Bearer ${API_KEY}`);
  });

  it('passes redirects to other hosts on without following them', async () => {
    const response = await fetch(`${proxy.baseURL}/api/elsewhere`, { redirect: 'manual' });

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('http://other-host.test/landing');
    expect(requests).toHaveLength(1);
  });

  const rawStatus = (path: string, method = 'GET') => {
    const { hostname, port } = new URL(proxy.baseURL);
    return new Promise<number | undefined>((resolve, reject) => {
      http
        .request({ hostname, port, path, method }, (res) => {
          res.resume();
          resolve(res.statusCode);
        })
        .on('error', reject)
        .end();
    });
  };

  it('rejects paths that resolve to outside the API base URL', async () => {
    const { pathname } = new URL(proxy.baseURL);
    // `fetch` would resolve the dot segments itself, so send the raw path.
    expect(await rawStatus(`${pathname}/../other`)).toBe(400);
    expect(requests).toHaveLength(0);
  });

  it.each([
    ['encoded slashes', '/..%2f..%2fsecret'],
    ['an encoded parent segment', '/%2e%2e%2fsecret'],
    ['a double-encoded slash', '/%252fsecret'],
    ['backslashes', '/..\\..\\secret'],
  ])('rejects a path with %s', async (_name, suffix) => {
    const { pathname } = new URL(proxy.baseURL);
    expect(await rawStatus(`${pathname}${suffix}`)).toBe(400);
    expect(requests).toHaveLength(0);
  });

  it('rejects an absolute-form request target', async () => {
    const url = new URL(proxy.baseURL);
    const status = await new Promise<number | undefined>((resolve, reject) => {
      const socket = http.request(
        { hostname: url.hostname, port: url.port, path: `${url.href}/api/me/`, method: 'GET' },
        (res) => {
          res.resume();
          resolve(res.statusCode);
        },
      );
      socket.on('error', reject);
      socket.end();
    });

    expect(status).toBe(404);
    expect(requests).toHaveLength(0);
  });

  it('does not follow a redirect whose path contains an encoded slash', async () => {
    const response = await fetch(`${proxy.baseURL}/api/encoded`, { redirect: 'manual' });

    expect(response.status).toBe(302);
    expect(requests).toHaveLength(1);
  });

  it('does not return the API key in response headers', async () => {
    const response = await fetch(`${proxy.baseURL}/api/reflect`);

    expect(response.status).toBe(200);
    expect(response.headers.get('authorization')).toBeNull();
    expect(response.headers.get('x-note')).toBe('prefix [redacted] suffix');
    expect(JSON.stringify([...response.headers.entries()])).not.toContain(API_KEY);
  });

  it('refuses a request body larger than the limit', async () => {
    const { hostname, port, pathname } = new URL(proxy.baseURL);
    const status = await new Promise<number | undefined>((resolve, reject) => {
      const req = http.request(
        {
          hostname,
          port,
          path: `${pathname}/api/me/`,
          method: 'POST',
          headers: { 'content-length': String(MAX_FORWARDED_BODY_BYTES + 1) },
        },
        (res) => {
          res.resume();
          resolve(res.statusCode);
        },
      );
      req.on('error', reject);
      req.end();
    });

    expect(status).toBe(413);
    expect(requests).toHaveLength(0);
  });

  it('stops reading a chunked body once it passes the limit', async () => {
    const { hostname, port, pathname } = new URL(proxy.baseURL);
    const status = await new Promise<number | undefined>((resolve, reject) => {
      let settled = false;
      const finish = (value: number | undefined) => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      const req = http.request({ hostname, port, path: `${pathname}/api/me/`, method: 'POST' }, (res) => {
        res.resume();
        res.on('end', () => finish(res.statusCode));
      });
      req.on('error', (error: NodeJS.ErrnoException) => {
        // The listener closes the connection once the limit is passed.
        if (error.code === 'ECONNRESET' || error.code === 'EPIPE') finish(413);
        else reject(error);
      });
      // `write` without a Content-Length uses chunked encoding, so the listener counts bytes.
      req.write(Buffer.alloc(MAX_FORWARDED_BODY_BYTES + 1));
      req.end();
    });

    expect(status).toBe(413);
    expect(requests).toHaveLength(0);
  });

  it('passes the status and headers of API errors through', async () => {
    const response = await fetch(`${proxy.baseURL}/missing`);

    expect(response.status).toBe(404);
    expect(response.headers.get('x-request-id')).toBe('req_1');
    expect(await response.json()).toEqual({ detail: 'Not found' });
  });

  it.each([
    ['no token', '/api/me/'],
    ['another token', `/${'0'.repeat(64)}/api/me/`],
    ['a token with a suffix', '__TOKEN__extra/api/me/'],
  ])('rejects requests with %s without contacting the API', async (_name, path) => {
    const url = new URL(proxy.baseURL);
    const response = await fetch(`${url.origin}${path.replace('__TOKEN__', url.pathname)}`);

    expect(response.status).toBe(404);
    expect(requests).toHaveLength(0);
  });

  it('answers 502 when the API cannot be reached', async () => {
    const unreachable = await startUpstreamProxy({
      // Port 9 (discard) on loopback is not listening.
      client: new EInvoice({ apiKey: API_KEY, baseURL: 'http://127.0.0.1:9' }),
    });
    try {
      const response = await fetch(`${unreachable.baseURL}/api/me/`);

      expect(response.status).toBe(502);
      expect(JSON.stringify(await response.json())).not.toContain(API_KEY);
    } finally {
      await unreachable.close();
    }
  });

  it('stops accepting requests once closed', async () => {
    const closed = await startUpstreamProxy({
      client: new EInvoice({ apiKey: API_KEY, baseURL: upstreamURL }),
    });
    await closed.close();

    await expect(fetch(`${closed.baseURL}/api/me/`)).rejects.toThrow();
    expect(requests).toHaveLength(0);
  });
});

describe('parseCustomHeaders', () => {
  it('parses newline-separated header lines', () => {
    expect(parseCustomHeaders('X-One: 1\nX-Two:  two: 2 \nnot a header\n')).toEqual({
      'X-One': '1',
      'X-Two': 'two: 2',
    });
  });

  it('returns no headers when unset', () => {
    expect(parseCustomHeaders(undefined)).toEqual({});
  });
});
