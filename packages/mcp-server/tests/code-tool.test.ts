import { EventEmitter } from 'node:events';
import http from 'node:http';
import { AddressInfo } from 'node:net';
import path from 'node:path';
import EInvoice from 'e-invoice-api';
import { READABLE_ENV_NAMES, buildWorkerEnv, codeTool, codeToolDescription } from '../src/code-tool';
import { PLACEHOLDER_API_KEY } from '../src/code-tool-proxy';
import { configureLogger } from '../src/logger';

type WorkerStart = {
  denoExecutable: string;
  runFlags: string[];
  env: Record<string, string>;
};
type WorkerRequest = {
  opts: { baseURL: string; apiKey: string };
  code: string;
};

const workerStarts: WorkerStart[] = [];
const workerRequests: WorkerRequest[] = [];
// What the stand-in worker does with a request; the default answers like a successful execution.
let workerBehaviour: (request: WorkerRequest) => Promise<{ status: number; body: unknown }>;

// Stand-in for the Deno subprocess: records how it would have been started and what it was sent.
jest.mock('@valtown/deno-http-worker', () => ({
  newDenoHTTPWorker: async (_script: URL, options: any) => {
    workerStarts.push({
      denoExecutable: options.denoExecutable,
      runFlags: options.runFlags,
      env: options.spawnOptions.env,
    });
    return {
      addEventListener: () => {},
      terminate: () => {},
      request: (_url: string, _options: unknown, callback: (resp: any) => void) => {
        let written = '';
        return {
          write: (chunk: string, done: (err?: Error | null) => void) => {
            written += chunk;
            done();
          },
          end: () => {
            const request = JSON.parse(written) as WorkerRequest;
            workerRequests.push(request);
            void workerBehaviour(request).then(({ status, body }) => {
              const resp = Object.assign(new EventEmitter(), {
                statusCode: status,
                headers: { 'content-type': 'application/json' },
              });
              callback(resp);
              resp.emit('data', Buffer.from(JSON.stringify(body)));
              resp.emit('end');
            });
          },
        };
      },
    };
  },
}));

jest.mock(
  '../src/code-tool-paths.cjs',
  () => ({ getWorkerPath: () => path.resolve(__dirname, '../dist/code-tool-worker.mjs') }),
  { virtual: true },
);

const API_KEY = 'test-key-held-by-the-server';

describe('codeToolDescription', () => {
  it('describes what the sandbox permits', () => {
    expect(codeTool({ blockedMethods: undefined }).tool.description).toBe(codeToolDescription);
    expect(codeToolDescription).toContain('local Deno sandbox');
    expect(codeToolDescription).toContain('loopback listener that forwards to the E Invoice API');
    expect(codeToolDescription).toContain('The API credentials are not available to the code');
    expect(codeToolDescription).toContain('The subprocess does not inherit the host process environment');
    expect(codeToolDescription).toContain('E_INVOICE_LOG');
    expect(codeToolDescription).toContain('The filesystem cannot be written to');
    expect(codeToolDescription).toContain('no subprocesses can be started');
  });

  beforeAll(() => configureLogger({ level: 'error', pretty: false }));
});

describe('buildWorkerEnv', () => {
  const parentEnv = {
    PATH: '/usr/bin',
    HOME: '/home/someone',
    DENO_DIR: '/var/cache/deno',
    TMPDIR: '/tmp',
    E_INVOICE_LOG: 'debug',
    E_INVOICE_API_KEY: API_KEY,
    E_INVOICE_BASE_URL: 'https://api.example.test',
    E_INVOICE_CUSTOM_HEADERS: 'X-Tenant: acme',
    UNRELATED_SERVICE_TOKEN: 'unrelated-value',
    NODE_OPTIONS: '--inspect',
    EMPTY: undefined,
  };

  it('passes on only the variables needed to run Deno and the log level', () => {
    expect(buildWorkerEnv(parentEnv, undefined, 'linux')).toEqual({
      PATH: '/usr/bin',
      HOME: '/home/someone',
      DENO_DIR: '/var/cache/deno',
      TMPDIR: '/tmp',
      E_INVOICE_LOG: 'debug',
    });
  });

  it('merges E_INVOICE_* settings from the request and ignores every other name', () => {
    expect(
      buildWorkerEnv(
        parentEnv,
        {
          E_INVOICE_LOG: 'info',
          E_INVOICE_EXTRA: 'x',
          E_INVOICE_BASE_URL: 'https://api.example.test',
          PATH: '/tmp/other-bin',
          HOME: '/tmp/other-home',
          LD_PRELOAD: '/tmp/lib.so',
          LD_LIBRARY_PATH: '/tmp/lib',
          NODE_OPTIONS: '--require /tmp/preload.js',
          DENO_DIR: '/tmp/other-deno',
          E_INVOICE_API_KEY: 'caller-key',
          E_INVOICE_CUSTOM_HEADERS: 'Authorization: Bearer caller-key',
          E_INVOICE_WEBHOOK_SECRET: 'caller-secret',
        },
        'linux',
      ),
    ).toEqual({
      PATH: '/usr/bin',
      HOME: '/home/someone',
      DENO_DIR: '/var/cache/deno',
      TMPDIR: '/tmp',
      E_INVOICE_LOG: 'info',
      E_INVOICE_EXTRA: 'x',
    });
    expect(buildWorkerEnv(parentEnv, { E_INVOICE_BASE_URL: 'https://other.example.test' }, 'linux')).not.toHaveProperty(
      'E_INVOICE_BASE_URL',
    );
  });

  it('matches variable names case-insensitively on Windows only', () => {
    const windowsEnv = { Path: 'C:\\Windows', SystemRoot: 'C:\\Windows', Secret: 'unrelated-value' };

    expect(buildWorkerEnv(windowsEnv, undefined, 'win32')).toEqual({
      Path: 'C:\\Windows',
      SystemRoot: 'C:\\Windows',
    });
    expect(buildWorkerEnv(windowsEnv, undefined, 'linux')).toEqual({});
  });
});

describe('code tool handler', () => {
  let upstream: http.Server;
  let upstreamURL: string;
  let upstreamAuthorizations: (string | undefined)[];
  let upstreamHeaderSets: http.IncomingHttpHeaders[];
  const savedEnv = { ...process.env };

  beforeAll(async () => {
    configureLogger({ level: 'error', pretty: false });
    upstream = http.createServer((req, res) => {
      upstreamAuthorizations.push(req.headers.authorization);
      upstreamHeaderSets.push(req.headers);
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ tenant: 'acme' }));
    });
    await new Promise<void>((resolve) => upstream.listen(0, '127.0.0.1', resolve));
    upstreamURL = `http://127.0.0.1:${(upstream.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    upstream.closeAllConnections();
    await new Promise((resolve) => upstream.close(resolve));
  });

  beforeEach(() => {
    workerStarts.length = 0;
    workerRequests.length = 0;
    upstreamAuthorizations = [];
    upstreamHeaderSets = [];
    workerBehaviour = async () => ({
      status: 200,
      body: { is_error: false, result: { done: true }, log_lines: ['a log line'], err_lines: [] },
    });
    process.env['E_INVOICE_API_KEY'] = API_KEY;
    process.env['UNRELATED_SERVICE_TOKEN'] = 'unrelated-value';
  });

  afterEach(() => {
    process.env = { ...savedEnv };
  });

  const execute = (upstreamClientEnvs?: Record<string, string>) =>
    codeTool({ blockedMethods: undefined }).handler({
      reqContext: { client: new EInvoice({ apiKey: API_KEY, baseURL: upstreamURL }), upstreamClientEnvs },
      args: { code: 'async function run(client) { return await client.me.retrieve(); }' },
    });

  it('starts the subprocess with only the expected environment variables', async () => {
    await execute();

    expect(workerStarts).toHaveLength(1);
    const expectedNames = [
      'PATH',
      'HOME',
      'DENO_DIR',
      'XDG_CACHE_HOME',
      'TMPDIR',
      'TMP',
      'TEMP',
      'E_INVOICE_LOG',
    ];
    expect(Object.keys(workerStarts[0]!.env).sort()).toEqual(
      expectedNames.filter((name) => savedEnv[name] !== undefined).sort(),
    );
    expect(JSON.stringify(workerStarts[0]!.env)).not.toContain(API_KEY);
    expect(JSON.stringify(workerStarts[0]!.env)).not.toContain('unrelated-value');
  });

  it('adds the client environment of the request to the subprocess environment', async () => {
    await execute({ E_INVOICE_LOG: 'debug' });

    expect(workerStarts[0]!.env).toMatchObject({ E_INVOICE_LOG: 'debug' });
    expect(workerStarts[0]!.env).not.toHaveProperty('UNRELATED_SERVICE_TOKEN');
    expect(workerStarts[0]!.env).not.toHaveProperty('E_INVOICE_API_KEY');
    expect(path.isAbsolute(workerStarts[0]!.denoExecutable)).toBe(true);
  });

  it('keeps custom headers and caller process settings out of the subprocess', async () => {
    process.env['E_INVOICE_CUSTOM_HEADERS'] = 'X-Tenant: acme\nAuthorization: Bearer from-server-header';
    workerBehaviour = async ({ opts }) => {
      const response = await fetch(`${opts.baseURL}/api/me/`);
      return {
        status: 200,
        body: { is_error: false, result: await response.json(), log_lines: [], err_lines: [] },
      };
    };

    await execute({
      PATH: '/tmp/not-the-server-path',
      LD_PRELOAD: '/tmp/lib.so',
      E_INVOICE_API_KEY: 'caller-key',
      E_INVOICE_CUSTOM_HEADERS: 'X-From-Client: from-client',
      E_INVOICE_LOG: 'debug',
    });

    const env = workerStarts[0]!.env;
    expect(env['PATH']).not.toBe('/tmp/not-the-server-path');
    expect(env).not.toHaveProperty('LD_PRELOAD');
    expect(env).not.toHaveProperty('E_INVOICE_API_KEY');
    expect(env).not.toHaveProperty('E_INVOICE_CUSTOM_HEADERS');
    expect(JSON.stringify(env)).not.toContain('acme');
    expect(JSON.stringify(env)).not.toContain('from-client');
    expect(JSON.stringify(env)).not.toContain('caller-key');
    expect(JSON.stringify(env)).not.toContain('from-server-header');
    expect(env['E_INVOICE_LOG']).toBe('debug');
    expect(upstreamAuthorizations).toEqual([`Bearer ${API_KEY}`]);
    expect(upstreamHeaderSets[0]).toMatchObject({ 'x-tenant': 'acme', 'x-from-client': 'from-client' });
    expect(JSON.stringify(workerRequests[0])).not.toContain('acme');
    expect(JSON.stringify(workerRequests[0])).not.toContain('from-client');
    expect(JSON.stringify(workerRequests[0])).not.toContain(API_KEY);
  });

  it('permits the subprocess to read a named list of environment variables only', async () => {
    await execute();

    const envFlags = workerStarts[0]!.runFlags.filter((flag) => flag.startsWith('--allow-env'));
    expect(envFlags).toEqual([`--allow-env=${READABLE_ENV_NAMES.join(',')}`]);
    expect(READABLE_ENV_NAMES).toEqual(expect.arrayContaining(['E_INVOICE_LOG', 'E_INVOICE_CUSTOM_HEADERS']));
    expect(READABLE_ENV_NAMES).not.toContain('E_INVOICE_API_KEY');
    expect(READABLE_ENV_NAMES).not.toContain('PATH');
  });

  it('grants no permissions beyond reading its files and reaching the loopback listener', async () => {
    await execute();

    const { runFlags } = workerStarts[0]!;
    const proxyHost = new URL(workerRequests[0]!.opts.baseURL).host;
    expect(runFlags).toContain(`--allow-net=${proxyHost}`);
    expect(proxyHost).toMatch(/^127\.0\.0\.1:\d+$/);
    expect(runFlags.map((flag) => flag.split('=')[0]).sort()).toEqual([
      '--allow-env',
      '--allow-net',
      '--allow-read',
      '--no-remote',
      '--node-modules-dir',
    ]);
  });

  it('gives the subprocess a placeholder key and a loopback base URL', async () => {
    await execute();

    expect(workerRequests[0]!.opts.apiKey).toBe(PLACEHOLDER_API_KEY);
    expect(workerRequests[0]!.opts.baseURL).toMatch(/^http:\/\/127\.0\.0\.1:\d+\/[0-9a-f]{64}$/);
    expect(JSON.stringify(workerRequests[0])).not.toContain(API_KEY);
  });

  it('authenticates SDK calls of the subprocess while the code runs', async () => {
    workerBehaviour = async ({ opts }) => {
      const workerClient = new EInvoice(opts);
      return {
        status: 200,
        body: { is_error: false, result: await workerClient.get('/api/me/'), log_lines: [], err_lines: [] },
      };
    };

    const result = await execute();

    expect(result.isError).toBeUndefined();
    expect(result.content).toEqual([{ type: 'text', text: JSON.stringify({ tenant: 'acme' }) }]);
    expect(upstreamAuthorizations).toEqual([`Bearer ${API_KEY}`]);
  });

  it('stops the loopback listener when the execution has finished', async () => {
    await execute();

    await expect(fetch(`${workerRequests[0]!.opts.baseURL}/api/me/`)).rejects.toThrow();
    expect(upstreamAuthorizations).toEqual([]);
  });

  it('returns the result and log lines of a successful execution', async () => {
    expect(await execute()).toEqual({
      content: [
        { type: 'text', text: JSON.stringify({ done: true }) },
        { type: 'text', text: 'a log line' },
      ],
    });
  });

  it('returns an error result for a failed execution', async () => {
    workerBehaviour = async () => ({
      status: 400,
      body: { is_error: true, result: 'TypeError: nope', log_lines: [], err_lines: ['an error line'] },
    });

    expect(await execute()).toEqual({
      content: [
        { type: 'text', text: 'TypeError: nope' },
        { type: 'text', text: 'Error output:\nan error line' },
      ],
      isError: true,
    });
  });
});
