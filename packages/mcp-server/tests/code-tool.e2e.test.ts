import { ChildProcess, spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import net, { AddressInfo } from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';

// End-to-end tests of the `execute` tool: they start the built server (`dist/index.js`) as a child
// process, connect a real MCP client over each transport and run code in a real Deno subprocess.
// Every execution starts Deno and type-checks the code, which takes a few seconds.
jest.setTimeout(120_000);

const packageRoot = path.resolve(__dirname, '..');
const serverEntry = path.join(packageRoot, 'dist', 'index.js');
const workerEntry = path.join(packageRoot, 'dist', 'code-tool-worker.mjs');

const STDIO_API_KEY = 'test-key-stdio-1234567890';
const HTTP_API_KEY = 'test-key-http-0987654321';
const CANARY_NAME = 'UNRELATED_SERVICE_TOKEN';
const CANARY_VALUE = 'canary-value-5f2c9a7e41';
const PLACEHOLDER_API_KEY = 'managed-by-mcp-server';
const UPSTREAM_RESPONSE = { ok: true, source: 'fake-upstream' };

function findDeno(): string | undefined {
  const names = process.platform === 'win32' ? ['deno.exe', 'deno.cmd'] : ['deno'];
  for (const dir of (process.env['PATH'] ?? '').split(path.delimiter)) {
    for (const name of names) {
      if (dir && fs.existsSync(path.join(dir, name))) return path.join(dir, name);
    }
  }
  const packaged = path.join(packageRoot, 'node_modules', 'deno', 'bin.cjs');
  return fs.existsSync(packaged) ? packaged : undefined;
}

function missingPrerequisites(): string[] {
  const missing: string[] = [];
  for (const file of [serverEntry, workerEntry]) {
    if (!fs.existsSync(file)) {
      missing.push(`${path.relative(packageRoot, file)} does not exist (run \`yarn build\`)`);
    }
  }
  if (!findDeno()) {
    missing.push('Deno was not found on PATH or in node_modules/deno');
  }
  return missing;
}

type UpstreamRequest = { method: string; url: string; authorization: string | undefined };
type ExecuteResult = { isError: boolean; text: string };
type Connection = { client: Client; close: () => Promise<void> };

async function execute(client: Client, code: string): Promise<ExecuteResult> {
  const result = await client.callTool({ name: 'execute', arguments: { code } });
  const content = (result.content ?? []) as Array<{ type: string; text?: string }>;
  return {
    isError: result.isError === true,
    text: content.map((block) => block.text ?? '').join('\n'),
  };
}

async function findFreePort(): Promise<number> {
  const server = net.createServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });
  const { port } = server.address() as AddressInfo;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return port;
}

async function stopChild(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) return;
  const exited = new Promise<void>((resolve) => child.once('exit', () => resolve()));
  child.kill('SIGTERM');
  const timer = setTimeout(() => child.kill('SIGKILL'), 5_000);
  await exited;
  clearTimeout(timer);
}

// A directory that does not exist, appended to the PATH of the servers started here. The servers
// pass PATH on to the Deno subprocesses, so every process of this run can be recognised by it.
const runMarker = path.join(
  os.tmpdir(),
  `code-tool-e2e-${process.pid}-${crypto.randomBytes(8).toString('hex')}`,
);

// The PIDs of the processes that were started, directly or indirectly, by the servers of this run.
// Only implemented where /proc is available; elsewhere it finds nothing.
function findProcessesOfThisRun(): number[] {
  let entries: string[];
  try {
    entries = fs.readdirSync('/proc');
  } catch {
    return [];
  }
  const pids: number[] = [];
  for (const entry of entries) {
    const pid = Number(entry);
    if (!Number.isInteger(pid) || pid === process.pid) continue;
    try {
      if (fs.readFileSync(`/proc/${pid}/environ`, 'utf8').includes(runMarker)) pids.push(pid);
    } catch {
      // Not readable (another user's process) or already gone.
    }
  }
  return pids;
}

// When Deno is started through the launcher script of the `deno` npm package, the server ends the
// launcher after an execution, but the Deno process it started keeps running. Stop those here, by PID.
async function stopProcessesOfThisRun(): Promise<void> {
  const deadline = Date.now() + 5_000;
  for (let pids = findProcessesOfThisRun(); pids.length > 0; pids = findProcessesOfThisRun()) {
    for (const pid of pids) {
      try {
        process.kill(pid, 'SIGKILL');
      } catch {
        // Already gone.
      }
    }
    if (Date.now() > deadline) break;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

const missing = missingPrerequisites();

if (missing.length > 0 && process.env['CI']) {
  describe('execute tool (end to end)', () => {
    it('has the built server and Deno available', () => {
      throw new Error(
        `The end-to-end tests of the code tool cannot run and must not be skipped in CI:\n- ${missing.join(
          '\n- ',
        )}`,
      );
    });
  });
} else {
  if (missing.length > 0) {
    console.warn(`Skipping the end-to-end tests of the code tool:\n- ${missing.join('\n- ')}`);
  }
  const describeE2E = missing.length > 0 ? describe.skip : describe;

  describeE2E('execute tool (end to end)', () => {
    let upstream: http.Server;
    let upstreamURL: string;
    const upstreamRequests: UpstreamRequest[] = [];

    // The variables the server process is started with. Each transport adds its own on top.
    const serverEnv = (): Record<string, string> => ({
      PATH: [process.env['PATH'] ?? '', runMarker].join(path.delimiter),
      HOME: process.env['HOME'] ?? os.homedir(),
      E_INVOICE_BASE_URL: upstreamURL,
      [CANARY_NAME]: CANARY_VALUE,
    });

    beforeAll(async () => {
      // Stands in for the E Invoice API: records what it receives and answers with fixed JSON.
      upstream = http.createServer((req, res) => {
        req.resume();
        req.on('end', () => {
          upstreamRequests.push({
            method: req.method ?? '',
            url: req.url ?? '',
            authorization: req.headers.authorization,
          });
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify(UPSTREAM_RESPONSE));
        });
      });
      await new Promise<void>((resolve, reject) => {
        upstream.once('error', reject);
        upstream.listen(0, '127.0.0.1', () => resolve());
      });
      upstreamURL = `http://127.0.0.1:${(upstream.address() as AddressInfo).port}`;
    });

    afterAll(async () => {
      upstream.closeAllConnections();
      await new Promise<void>((resolve) => upstream.close(() => resolve()));
    });

    // --- stdio transport: the server is spawned by the MCP client and has the API key in its environment.

    const connectStdio = async (): Promise<Connection> => {
      const transport = new StdioClientTransport({
        command: process.execPath,
        args: [serverEntry],
        env: { ...serverEnv(), E_INVOICE_API_KEY: STDIO_API_KEY },
        cwd: packageRoot,
        stderr: 'pipe',
      });
      // The server logs to stderr; drain it so the pipe never fills up.
      transport.stderr?.on('data', () => {});
      const client = new Client({ name: 'code-tool-e2e-stdio', version: '0.0.0' });
      await client.connect(transport);
      return { client, close: () => client.close() };
    };

    // --- HTTP transport: one long-running server without an API key; each client sends its own.

    let httpServer: ChildProcess | undefined;
    let httpServerURL: string;
    let httpServerOutput = '';

    const startHttpServer = async (): Promise<void> => {
      const port = await findFreePort();
      const child = spawn(process.execPath, [serverEntry, '--transport=http', `--port=${port}`], {
        cwd: packageRoot,
        env: serverEnv(),
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      httpServer = child;
      child.stdout?.on('data', (chunk) => (httpServerOutput += chunk));
      child.stderr?.on('data', (chunk) => (httpServerOutput += chunk));
      httpServerURL = `http://127.0.0.1:${port}/`;

      const deadline = Date.now() + 30_000;
      for (;;) {
        if (child.exitCode !== null || child.signalCode !== null) {
          throw new Error(`The HTTP server exited before it was ready:\n${httpServerOutput}`);
        }
        try {
          const res = await fetch(`${httpServerURL}health`);
          await res.arrayBuffer();
          if (res.status === 200) return;
        } catch {
          // Not listening yet.
        }
        if (Date.now() > deadline) {
          throw new Error(`The HTTP server did not become healthy in time:\n${httpServerOutput}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    const connectHttp = async (extraHeaders: Record<string, string> = {}): Promise<Connection> => {
      const transport = new StreamableHTTPClientTransport(new URL(httpServerURL), {
        requestInit: { headers: { Authorization: `Bearer ${HTTP_API_KEY}`, ...extraHeaders } },
      });
      const client = new Client({ name: 'code-tool-e2e-http', version: '0.0.0' });
      await client.connect(transport as Transport);
      return { client, close: () => client.close() };
    };

    const transports = [
      { transport: 'stdio', apiKey: STDIO_API_KEY, start: async () => {}, connect: () => connectStdio() },
      { transport: 'http', apiKey: HTTP_API_KEY, start: startHttpServer, connect: () => connectHttp() },
    ];

    describe.each(transports)('over the $transport transport', ({ apiKey, start, connect }) => {
      let connection: Connection;
      let client: Client;

      beforeAll(async () => {
        await start();
        connection = await connect();
        client = connection.client;
      });

      afterAll(async () => {
        await connection?.close();
      });

      const expectNoSecrets = (text: string) => {
        expect(text).not.toContain(apiKey);
        expect(text).not.toContain(CANARY_VALUE);
      };

      it('lists the execute tool', async () => {
        const { tools } = await client.listTools();
        expect(tools.map((tool) => tool.name)).toContain('execute');
      });

      it('the SDK client in executed code is authenticated by the server', async () => {
        const seenBefore = upstreamRequests.length;

        const result = await execute(
          client,
          'async function run(client) { return await client.me.retrieve(); }',
        );

        expect(result.text).toBe(JSON.stringify(UPSTREAM_RESPONSE));
        expect(result.isError).toBe(false);

        const received = upstreamRequests.slice(seenBefore);
        expect(received).toHaveLength(1);
        expect(received[0]!.method).toBe('GET');
        expect(received[0]!.url).toBe('/api/me/');
        expect(received[0]!.authorization).toBe(`Bearer ${apiKey}`);
      });

      it('the SDK client in executed code holds a placeholder key and a loopback base URL', async () => {
        const result = await execute(
          client,
          'async function run(client) { return { apiKey: client.apiKey, baseURL: client.baseURL }; }',
        );

        expect(result.isError).toBe(false);
        expectNoSecrets(result.text);
        const value = JSON.parse(result.text);
        expect(value.apiKey).toBe(PLACEHOLDER_API_KEY);
        expect(value.baseURL).toMatch(/^http:\/\/127\.0\.0\.1:\d+\/[0-9a-f]{64}$/);
      });

      it('executed code cannot list the environment variables of the server', async () => {
        const result = await execute(
          client,
          'async function run(client) { return (globalThis as any).Deno.env.toObject(); }',
        );

        expect(result.isError).toBe(true);
        expect(result.text).toMatch(/env access/);
        expectNoSecrets(result.text);
      });

      it.each([CANARY_NAME, 'E_INVOICE_API_KEY'])(
        'executed code cannot read the environment variable %s of the server',
        async (name) => {
          const result = await execute(
            client,
            `async function run(client) { return (globalThis as any).Deno.env.get(${JSON.stringify(
              name,
            )}); }`,
          );

          expect(result.isError).toBe(true);
          expect(result.text).toMatch(/env access/);
          expectNoSecrets(result.text);
        },
      );

      it('executed code cannot reach hosts other than the API', async () => {
        // Deno refuses before it connects, so this sends nothing over the network.
        const result = await execute(
          client,
          "async function run(client) { const res = await fetch('https://example.com'); return res.status; }",
        );

        expect(result.isError).toBe(true);
        expect(result.text).toMatch(/net access/);
        expectNoSecrets(result.text);
      });

      it('executed code cannot import modules from remote hosts', async () => {
        // Deno refuses before it connects, so this sends nothing over the network.
        const result = await execute(
          client,
          "async function run(client) { const specifier = 'https://esm.sh/left-pad'; await import(specifier); return 'imported'; }",
        );

        expect(result.isError).toBe(true);
        expect(result.text).toMatch(/remote specifier/);
        expectNoSecrets(result.text);
      });

      it('executed code cannot write files or start subprocesses', async () => {
        const target = path.join(os.tmpdir(), `code-tool-e2e-${process.pid}-${Date.now()}.txt`);
        const code = `
          async function run(client) {
            const deno = (globalThis as any).Deno;
            const outcomes: Record<string, string> = {};
            try {
              await deno.writeTextFile(${JSON.stringify(target)}, 'x');
              outcomes.write = 'allowed';
            } catch (error) {
              outcomes.write = String(error);
            }
            try {
              await new deno.Command('ls').output();
              outcomes.run = 'allowed';
            } catch (error) {
              outcomes.run = String(error);
            }
            return outcomes;
          }`;

        try {
          const result = await execute(client, code);

          expect(result.isError).toBe(false);
          expectNoSecrets(result.text);
          const outcomes = JSON.parse(result.text);
          expect(outcomes.write).toMatch(/write access/);
          expect(outcomes.run).toMatch(/run access/);
          expect(fs.existsSync(target)).toBe(false);
        } finally {
          fs.rmSync(target, { force: true });
        }
      });
    });

    describe('over the http transport with an x-mcp-client-envs header', () => {
      it('executes code with the variables of the header merged into the subprocess environment', async () => {
        const seenBefore = upstreamRequests.length;
        const connection = await connectHttp({
          'x-mcp-client-envs': JSON.stringify({ E_INVOICE_LOG: 'debug' }),
        });

        try {
          const result = await execute(
            connection.client,
            'async function run(client) { return await client.me.retrieve(); }',
          );

          expect(result.isError).toBe(false);
          expect(result.text).toContain(JSON.stringify(UPSTREAM_RESPONSE));
          expect(result.text).not.toContain(HTTP_API_KEY);
          expect(result.text).not.toContain(CANARY_VALUE);
          expect(upstreamRequests.slice(seenBefore).map((request) => request.authorization)).toEqual([
            `Bearer ${HTTP_API_KEY}`,
          ]);
        } finally {
          await connection.close();
        }
      });
    });

    // Declared last, so it runs after the HTTP tests above have finished.
    afterAll(async () => {
      if (httpServer) await stopChild(httpServer);
      await stopProcessesOfThisRun();
    });
  });
}
