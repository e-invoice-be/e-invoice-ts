import http from 'node:http';
import type { AddressInfo } from 'node:net';
import {
  defaultAllowedHosts,
  defaultAllowedOrigins,
  filterClientEnvs,
  launchStreamableHTTPServer,
} from '../src/http';
import { configureLogger } from '../src/logger';
import type { McpOptions } from '../src/options';

type TestResponse = { status: number; headers: http.IncomingHttpHeaders; body: string };

const send = (
  port: number,
  {
    method = 'POST',
    path = '/',
    headers = {},
    body,
  }: { method?: string; path?: string; headers?: Record<string, string>; body?: unknown } = {},
): Promise<TestResponse> =>
  new Promise((resolve, reject) => {
    const payload = body === undefined ? undefined : JSON.stringify(body);
    const req = http.request(
      {
        host: '127.0.0.1',
        port,
        method,
        path,
        headers: {
          accept: 'application/json, text/event-stream',
          ...(payload !== undefined && {
            'content-type': 'application/json',
            'content-length': String(Buffer.byteLength(payload)),
          }),
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode ?? 0, headers: res.headers, body: data }));
      },
    );
    req.on('error', reject);
    req.end(payload);
  });

const credentials = { authorization: 'Bearer client-api-key' };

const listTools = { jsonrpc: '2.0', id: 1, method: 'tools/list' };

const executeCode = (code: string) => ({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: { name: 'execute', arguments: { code } },
});

/** Extracts the JSON-RPC message from a JSON or single-event SSE response body. */
const rpcMessage = (response: TestResponse): any => {
  const dataLine = response.body.split('\n').find((line) => line.startsWith('data: '));
  return JSON.parse(dataLine ? dataLine.slice('data: '.length) : response.body);
};

describe('streamable HTTP transport', () => {
  const servers: http.Server[] = [];

  const launch = async (
    options: {
      mcpOptions?: McpOptions;
      host?: string;
      allowedHosts?: string[];
      allowedOrigins?: string[];
    } = {},
  ) => {
    const server = await launchStreamableHTTPServer({
      mcpOptions: { includeDocsTools: false },
      port: 0,
      ...options,
    });
    servers.push(server);
    return (server.address() as AddressInfo).port;
  };

  beforeAll(() => configureLogger({ level: 'silent' as any, pretty: false }));

  afterEach(async () => {
    await Promise.all(
      servers.splice(0).map((server) => new Promise((resolve) => server.close(() => resolve(undefined)))),
    );
  });

  describe('listening address', () => {
    it('listens on 127.0.0.1 by default', async () => {
      const server = await launchStreamableHTTPServer({ mcpOptions: {}, port: 0 });
      servers.push(server);

      expect((server.address() as AddressInfo).address).toBe('127.0.0.1');
    });

    it('listens on 127.0.0.1 when the host is empty', async () => {
      const server = await launchStreamableHTTPServer({ mcpOptions: {}, port: 0, host: '' });
      servers.push(server);

      expect((server.address() as AddressInfo).address).toBe('127.0.0.1');
    });

    it('listens on the configured host', async () => {
      const server = await launchStreamableHTTPServer({ mcpOptions: {}, port: 0, host: '0.0.0.0' });
      servers.push(server);

      expect((server.address() as AddressInfo).address).toBe('0.0.0.0');
    });
  });

  describe('credentials', () => {
    const originalApiKey = process.env['E_INVOICE_API_KEY'];

    beforeEach(() => {
      process.env['E_INVOICE_API_KEY'] = 'server-environment-key';
    });

    afterEach(() => {
      if (originalApiKey === undefined) delete process.env['E_INVOICE_API_KEY'];
      else process.env['E_INVOICE_API_KEY'] = originalApiKey;
    });

    it('responds 401 to a request without credentials, even when the server environment has an api key', async () => {
      const port = await launch();

      const response = await send(port, { body: listTools });

      expect(response.status).toBe(401);
      expect(response.headers['www-authenticate']).toMatch(/^Bearer/);
      expect(JSON.parse(response.body).error.message).toMatch(/Missing required Authorization header/);
    });

    it.each(['GET', 'DELETE'])('responds 401 to a %s request without credentials', async (method) => {
      const port = await launch();

      expect((await send(port, { method })).status).toBe(401);
    });

    it('responds 401 to an empty bearer value', async () => {
      const port = await launch();

      const response = await send(port, { headers: { authorization: 'Bearer ' }, body: listTools });

      expect(response.status).toBe(401);
    });

    it('responds 401 to an unsupported authorization scheme', async () => {
      const port = await launch();

      const response = await send(port, {
        headers: { authorization: 'Basic dXNlcjpwYXNz' },
        body: listTools,
      });

      expect(response.status).toBe(401);
    });

    it('serves a request with a Bearer authorization header', async () => {
      const port = await launch();

      const response = await send(port, { headers: credentials, body: listTools });

      expect(response.status).toBe(200);
      expect(rpcMessage(response).result.tools.map((tool: any) => tool.name)).toEqual(['execute']);
    });

    it('serves a request with an x-e-invoice-api-key header', async () => {
      const port = await launch();

      const response = await send(port, {
        headers: { 'x-e-invoice-api-key': 'client-api-key' },
        body: listTools,
      });

      expect(response.status).toBe(200);
    });

    it('keeps the health endpoint available without credentials', async () => {
      const port = await launch();

      const response = await send(port, { method: 'GET', path: '/health' });

      expect(response.status).toBe(200);
      expect(response.body).toBe('OK');
    });

    it('responds 405 to GET and DELETE with credentials', async () => {
      const port = await launch();

      expect((await send(port, { method: 'GET', headers: credentials })).status).toBe(405);
      expect((await send(port, { method: 'DELETE', headers: credentials })).status).toBe(405);
    });
  });

  describe('Host and Origin validation', () => {
    it('accepts the loopback names for the bound port by default', async () => {
      const port = await launch();

      for (const host of [`127.0.0.1:${port}`, `localhost:${port}`, `[::1]:${port}`]) {
        const response = await send(port, { headers: { ...credentials, host }, body: listTools });
        expect(response.status).toBe(200);
      }
    });

    it('rejects an unexpected Host header', async () => {
      const port = await launch();

      const response = await send(port, {
        headers: { ...credentials, host: `other.example:${port}` },
        body: listTools,
      });

      expect(response.status).toBe(403);
      expect(JSON.parse(response.body).error.message).toMatch(/Invalid Host header/);
    });

    it('rejects a loopback name on another port', async () => {
      const port = await launch();

      const response = await send(port, {
        headers: { ...credentials, host: `localhost:${port + 1}` },
        body: listTools,
      });

      expect(response.status).toBe(403);
    });

    it('rejects an unexpected Origin header', async () => {
      const port = await launch();

      const response = await send(port, {
        headers: { ...credentials, origin: 'https://other.example' },
        body: listTools,
      });

      expect(response.status).toBe(403);
      expect(JSON.parse(response.body).error.message).toMatch(/Invalid Origin header/);
    });

    it('accepts a loopback Origin for the bound port', async () => {
      const port = await launch();

      const response = await send(port, {
        headers: { ...credentials, origin: `http://localhost:${port}` },
        body: listTools,
      });

      expect(response.status).toBe(200);
    });

    it('accepts additional configured hosts and origins', async () => {
      const port = await launch({
        allowedHosts: ['mcp.example.com'],
        allowedOrigins: ['https://app.example.com'],
      });

      const response = await send(port, {
        headers: { ...credentials, host: 'mcp.example.com', origin: 'https://app.example.com' },
        body: listTools,
      });

      expect(response.status).toBe(200);
      // The defaults stay in place next to the configured values.
      expect((await send(port, { headers: credentials, body: listTools })).status).toBe(200);
    });

    it('matches configured hosts and origins case-insensitively', async () => {
      const port = await launch({
        allowedHosts: ['MCP.Example.com'],
        allowedOrigins: ['https://App.Example.com'],
      });

      const response = await send(port, {
        headers: { ...credentials, host: 'mcp.example.com', origin: 'https://app.example.com' },
        body: listTools,
      });

      expect(response.status).toBe(200);
    });

    it('does not check the Host header of the health endpoint', async () => {
      const port = await launch();

      const response = await send(port, {
        method: 'GET',
        path: '/health',
        headers: { host: 'other.example' },
      });

      expect(response.status).toBe(200);
    });

    it('builds the default hosts and origins from the listening address', () => {
      expect(defaultAllowedHosts({ port: 3000 })).toEqual(['localhost:3000', '127.0.0.1:3000', '[::1]:3000']);
      expect(defaultAllowedOrigins({ port: 3000 })).toEqual([
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://[::1]:3000',
      ]);
    });

    it('adds a specific bound address to the defaults, but not a wildcard address', () => {
      expect(defaultAllowedHosts({ port: 3000, host: '192.0.2.10' })).toContain('192.0.2.10:3000');
      expect(defaultAllowedHosts({ port: 3000, host: '2001:db8::1' })).toContain('[2001:db8::1]:3000');
      expect(defaultAllowedHosts({ port: 3000, host: '0.0.0.0' })).toHaveLength(3);
      expect(defaultAllowedHosts({ port: 3000, host: '::' })).toHaveLength(3);
    });

    it('uses names without a port when the port is the HTTP default or unknown', () => {
      expect(defaultAllowedHosts({ port: 80 })).toEqual(
        expect.arrayContaining(['localhost', 'localhost:80', '127.0.0.1']),
      );
      expect(defaultAllowedHosts({})).toEqual(['localhost', '127.0.0.1', '[::1]']);
    });
  });

  describe('x-mcp-client-envs', () => {
    it('keeps only string values whose name starts with E_INVOICE_, except the base URL', () => {
      expect(
        filterClientEnvs(
          JSON.stringify({
            E_INVOICE_LOG: 'debug',
            E_INVOICE_BASE_URL: 'https://api.example.com',
            E_INVOICE_CUSTOM_HEADERS: 'X-Request-Id: 1',
            PATH: '/tmp/bin',
            NODE_OPTIONS: '--require ./x.js',
            e_invoice_lowercase: 'x',
            E_INVOICE_NUMBER: 1,
          }),
        ),
      ).toEqual({
        E_INVOICE_LOG: 'debug',
        E_INVOICE_CUSTOM_HEADERS: 'X-Request-Id: 1',
      });
    });

    it('drops a header that only sets E_INVOICE_BASE_URL', () => {
      expect(filterClientEnvs(JSON.stringify({ E_INVOICE_BASE_URL: 'http://127.0.0.1:9' }))).toBeUndefined();
    });

    it('returns nothing when no name is on the allowlist', () => {
      expect(filterClientEnvs(JSON.stringify({ PATH: '/tmp/bin' }))).toBeUndefined();
    });

    it('ignores a missing or malformed header', () => {
      expect(filterClientEnvs(undefined)).toBeUndefined();
      expect(filterClientEnvs('not json')).toBeUndefined();
      expect(filterClientEnvs('["E_INVOICE_BASE_URL"]')).toBeUndefined();
      expect(filterClientEnvs('null')).toBeUndefined();
    });
  });

  describe('x-mcp-client-permissions', () => {
    const blockedMessage = /have been blocked by the MCP server/;

    const execute = async (port: number, code: string, permissions?: unknown) => {
      const response = await send(port, {
        headers: {
          ...credentials,
          ...(permissions !== undefined && {
            'x-mcp-client-permissions':
              typeof permissions === 'string' ? permissions : JSON.stringify(permissions),
          }),
        },
        body: executeCode(code),
      });
      return response;
    };

    it('cannot allow a method the operator blocked', async () => {
      const port = await launch({
        mcpOptions: { includeDocsTools: false, codeBlockedMethods: ['^documents\\.delete$'] },
      });

      for (const permissions of [
        { blocked_methods: [] },
        { allowed_methods: ['.*'] },
        { allowed_methods: ['^documents\\.delete$'], allow_http_gets: true },
      ]) {
        const response = await execute(port, 'client.documents.delete("id")', permissions);

        expect(response.status).toBe(200);
        const result = rpcMessage(response).result;
        expect(result.isError).toBe(true);
        expect(result.content[0].text).toMatch(blockedMessage);
      }
    });

    it('cannot allow a method outside the operator allow list', async () => {
      const port = await launch({ mcpOptions: { includeDocsTools: false, codeAllowHttpGets: true } });

      const response = await execute(port, 'client.documents.create({})', {
        allow_http_gets: false,
        allowed_methods: ['^documents\\.create$'],
      });

      expect(rpcMessage(response).result.content[0].text).toMatch(blockedMessage);
    });

    it('can block a method the operator allows', async () => {
      const port = await launch();

      const response = await execute(port, 'client.documents.delete("id")', {
        blocked_methods: ['^documents\\.delete$'],
      });

      expect(rpcMessage(response).result.content[0].text).toMatch(blockedMessage);
    });

    it('can restrict the operator configuration to an allow list', async () => {
      const port = await launch();

      const response = await execute(port, 'client.documents.delete("id")', { allow_http_gets: true });

      expect(rpcMessage(response).result.content[0].text).toMatch(blockedMessage);
    });

    it.each([
      ['malformed JSON', 'not json'],
      ['a non-object value', '["documents.delete"]'],
      ['a non-boolean allow_http_gets', { allow_http_gets: 'yes' }],
      ['a non-array allowed_methods', { allowed_methods: 'documents' }],
      ['a non-string blocked_methods entry', { blocked_methods: [1] }],
      ['an invalid regular expression', { blocked_methods: ['('] }],
      ['a method pattern with nested repetition', { blocked_methods: ['^((?:.)+)+x$'] }],
    ])('responds 400 to %s', async (_name, permissions) => {
      const port = await launch();

      const response = await execute(port, 'client.documents.delete("id")', permissions);

      expect(response.status).toBe(400);
      expect(JSON.parse(response.body).error.message).toMatch(/x-mcp-client-permissions/);
    });
  });
});
