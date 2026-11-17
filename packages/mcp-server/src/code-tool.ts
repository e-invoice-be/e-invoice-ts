import { ContentBlock, McpRequestContext, McpTool, Metadata, ToolCallResult, asErrorResult } from './types';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { WorkerOutput } from './code-tool-types';
import { getLogger } from './logger';
import { SdkMethod } from './methods';
import { ClientOptions } from 'e-invoice-api';
import { PLACEHOLDER_API_KEY, parseCustomHeaders, startUpstreamProxy } from './code-tool-proxy';

export const codeToolDescription = `Runs JavaScript code to interact with the E Invoice API.

You are a skilled TypeScript programmer writing code to interface with the service.
Define an async function named "run" that takes a single parameter of an initialized SDK client and it will be run.
For example:

\`\`\`
async function run(client) {
  const documentResponse = await client.documents.create();

  console.log(documentResponse.id);
}
\`\`\`

You will be returned anything that your function returns, plus the results of any console.log statements.
Do not add try-catch blocks for single API calls. The tool will handle errors for you.
Do not add comments unless necessary for generating better code.
Code will run in a local Deno sandbox. Its only network access is through the SDK client to a loopback listener that forwards to the E Invoice API; other hosts cannot be reached and remote modules cannot be imported.
The client is already authenticated. The API credentials are not available to the code. The subprocess does not inherit the host process environment; the code may only read E_INVOICE_LOG and a few names the TypeScript compiler checks.
The filesystem cannot be written to, and no subprocesses can be started.
Variables will not persist between calls, so make sure to return or log any data you might need later.
Remember that you are writing TypeScript code, so you need to be careful with your types.
Always type dynamic key-value stores explicitly as Record<string, YourValueType> instead of {}.`;

/**
 * A tool that runs code against a copy of the SDK.
 *
 * Instead of exposing every endpoint as its own tool, which uses up too many tokens for LLMs to use at once,
 * we expose a single tool that can be used to search for endpoints by name, resource, operation, or tag, and then
 * a generic endpoint that can be used to invoke any endpoint with the provided arguments.
 *
 * @param blockedMethods - The methods to block for code execution. Blocking is done by simple string
 * matching, so it is not secure against obfuscation. For stronger security, block in the downstream API
 * with limited API keys.
 */
export function codeTool({ blockedMethods }: { blockedMethods: SdkMethod[] | undefined }): McpTool {
  const metadata: Metadata = { resource: 'all', operation: 'write', tags: [] };
  const tool: Tool = {
    name: 'execute',
    description: codeToolDescription,
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Code to execute.',
        },
      },
      required: ['code'],
    },
  };

  const logger = getLogger();

  const handler = async ({
    reqContext,
    args,
  }: {
    reqContext: McpRequestContext;
    args: any;
  }): Promise<ToolCallResult> => {
    const code = args.code as string;
    // Do very basic blocking of code that includes forbidden method names.
    //
    // WARNING: This is not secure against obfuscation and other evasion methods. If
    // stronger security blocks are required, then these should be enforced in the downstream
    // API (e.g., by having users call the MCP server with API keys with limited permissions).
    if (blockedMethods) {
      const blockedMatches = blockedMethods.filter((method) => code.includes(method.fullyQualifiedName));
      if (blockedMatches.length > 0) {
        return asErrorResult(
          `The following methods have been blocked by the MCP server and cannot be used in code execution: ${blockedMatches
            .map((m) => m.fullyQualifiedName)
            .join(', ')}`,
        );
      }
    }

    const startTime = Date.now();

    logger.debug('Executing code in local Deno environment');
    const result = await localDenoHandler({ reqContext, args });

    logger.info(
      {
        durationMs: Date.now() - startTime,
        isError: result.isError,
        contentRows: result.content?.length ?? 0,
      },
      'Got code tool execution result',
    );
    return result;
  };

  return { metadata, tool, handler };
}

/**
 * Variables of the MCP server's own environment that are passed on to the Deno subprocess.
 * These are what Deno needs in order to run, plus the SDK's log level. They come from the
 * server process; a request cannot replace them.
 */
const PASSED_ENV_NAMES = [
  'PATH',
  'HOME',
  'DENO_DIR',
  'XDG_CACHE_HOME',
  'TMPDIR',
  'TMP',
  'TEMP',
  // Windows
  'SYSTEMROOT',
  'USERPROFILE',
  'LOCALAPPDATA',
  'PATHEXT',
  'E_INVOICE_LOG',
];

/**
 * Environment variables that code in the Deno subprocess is permitted to read. Reading any other
 * variable fails, so this lists what the worker's own dependencies read while they load.
 */
export const READABLE_ENV_NAMES = [
  // Read by the SDK client when it is constructed.
  'E_INVOICE_LOG',
  'E_INVOICE_CUSTOM_HEADERS',
  // Read by the TypeScript compiler when it is imported.
  'NODE_ENV',
  'NODE_INSPECTOR_IPC',
  'VSCODE_INSPECTOR_OPTIONS',
  'TSC_NONPOLLING_WATCHER',
  'TSC_WATCHDIRECTORY',
  'TSC_WATCHFILE',
  ...['POLLINGINTERVAL', 'POLLINGCHUNKSIZE', 'UNCHANGEDPOLLTHRESHOLDS'].flatMap((setting) =>
    ['LOW', 'MEDIUM', 'HIGH'].map((level) => `TSC_WATCH_${setting}_${level}`),
  ),
];

// Request settings the SDK understands. Only these names are copied from the request into the
// subprocess environment; PATH, HOME and similar names from the request are not.
const CLIENT_ENV_NAME = /^E_INVOICE_[A-Z0-9_]+$/;
// The API key and custom headers stay in this process. The subprocess is allowed to read the custom
// headers name, because the SDK looks it up, but the value is applied by the loopback listener instead.
const WITHHELD_CLIENT_ENV_NAMES = new Set([
  'E_INVOICE_API_KEY',
  'E_INVOICE_BASE_URL',
  'E_INVOICE_CUSTOM_HEADERS',
]);
const CREDENTIAL_ENV_NAME = /KEY|SECRET|TOKEN|PASSWORD|CREDENTIAL|AUTHORIZATION/;

/**
 * Builds the environment of the Deno subprocess: the passed-on variables of `parentEnv`, with the
 * `E_INVOICE_*` settings from `upstreamClientEnvs` merged over them.
 */
export function buildWorkerEnv(
  parentEnv: Record<string, string | undefined>,
  upstreamClientEnvs?: Record<string, string>,
  platform: string = process.platform,
): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [name, value] of Object.entries(parentEnv)) {
    // Windows environment variable names are case-insensitive (`Path`, `SystemRoot`).
    const lookupName = platform === 'win32' ? name.toUpperCase() : name;
    if (value !== undefined && PASSED_ENV_NAMES.includes(lookupName)) {
      env[name] = value;
    }
  }
  for (const [name, value] of Object.entries(upstreamClientEnvs ?? {})) {
    if (typeof value !== 'string' || !CLIENT_ENV_NAME.test(name)) continue;
    if (WITHHELD_CLIENT_ENV_NAMES.has(name) || CREDENTIAL_ENV_NAME.test(name)) continue;
    env[name] = value;
  }
  return env;
}

const localDenoHandler = async ({
  reqContext,
  args,
}: {
  reqContext: McpRequestContext;
  args: unknown;
}): Promise<ToolCallResult> => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const url = await import('node:url');
  const { newDenoHTTPWorker } = await import('@valtown/deno-http-worker');
  const { getWorkerPath } = await import('./code-tool-paths.cjs');
  const workerPath = getWorkerPath();

  const client = reqContext.client;
  const { code } = args as { code: string };

  let denoPath: string | undefined;

  const packageRoot = path.resolve(path.dirname(workerPath), '..');
  const packageNodeModulesPath = path.resolve(packageRoot, 'node_modules');

  // Resolve Deno from this process. The subprocess is started with that absolute path, so its
  // own environment cannot select a different binary.
  const { execSync } = await import('node:child_process');
  try {
    const found = execSync('command -v deno', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (path.isAbsolute(found)) denoPath = found;
  } catch {
    // Use the deno binary of the `deno` npm package if it's found in a node_modules
    // directory at or above the worker (this covers both the repo and the published layout)
    for (let dir = path.dirname(workerPath); ; dir = path.dirname(dir)) {
      const denoPackagePath = path.resolve(dir, 'node_modules', 'deno');
      // Prefer the binary that the package installed over its `bin.cjs` launcher: the launcher
      // runs the binary as a child of its own, which would outlive the launcher when the
      // subprocess is terminated.
      const candidates = [process.platform === 'win32' ? 'deno.exe' : 'deno', 'bin.cjs'];
      for (const candidate of candidates) {
        try {
          await fs.promises.access(path.resolve(denoPackagePath, candidate), fs.constants.X_OK);
          denoPath = path.resolve(denoPackagePath, candidate);
          break;
        } catch {
          // Try the next candidate
        }
      }
      if (denoPath || dir === path.dirname(dir)) break;
    }
  }

  if (!denoPath) {
    return asErrorResult(
      'Deno is required for code execution but was not found. ' +
        'Install it from https://deno.land and make sure `deno` is in the PATH of the MCP server, ' +
        'or install the `deno` npm package next to this MCP server (npm install deno).',
    );
  }

  const allowReadPaths = [
    'code-tool-worker.mjs',
    `${workerPath.replace(/([/\\]node_modules)[/\\].+$/, '$1')}/`,
    packageRoot,
  ];

  // Follow symlinks in node_modules to allow read access to workspace-linked packages
  try {
    const sdkPkgName = 'e-invoice-api';
    const sdkDir = path.resolve(packageNodeModulesPath, sdkPkgName);
    const realSdkDir = fs.realpathSync(sdkDir);
    if (realSdkDir !== sdkDir) {
      allowReadPaths.push(realSdkDir);
    }
  } catch {
    // Ignore if symlink resolution fails
  }

  const allowRead = allowReadPaths.join(',');

  // The subprocess gets no credentials. Its SDK client sends requests to this listener, which
  // forwards them to the API with the credentials of the client of this request.
  const proxy = await startUpstreamProxy({
    client,
    // Header values stay in this process. The subprocess environment does not receive them.
    defaultHeaders: {
      ...parseCustomHeaders(process.env['E_INVOICE_CUSTOM_HEADERS']),
      ...parseCustomHeaders(reqContext.upstreamClientEnvs?.['E_INVOICE_CUSTOM_HEADERS']),
    },
  });

  let worker: Awaited<ReturnType<typeof newDenoHTTPWorker>>;
  try {
    worker = await newDenoHTTPWorker(url.pathToFileURL(workerPath), {
      denoExecutable: denoPath,
      runFlags: [
        `--node-modules-dir=manual`,
        `--allow-read=${allowRead}`,
        `--allow-net=${proxy.host}`,
        // Modules can only be loaded from the files above, not from remote hosts.
        '--no-remote',
        // Instantiating the client reads these, even when they are not set.
        `--allow-env=${READABLE_ENV_NAMES.join(',')}`,
      ],
      printOutput: true,
      spawnOptions: {
        cwd: path.dirname(workerPath),
        env: buildWorkerEnv(process.env, reqContext.upstreamClientEnvs),
      },
    });
  } catch (error) {
    await proxy.close();
    return asErrorResult(
      `Could not start Deno for code execution: ${error instanceof Error ? error.message : String(error)}. ` +
        'Make sure that Deno 2.9 or later is installed.',
    );
  }

  try {
    const resp = await new Promise<Response>((resolve, reject) => {
      worker.addEventListener('exit', (exitCode) => {
        reject(new Error(`Worker exited with code ${exitCode}`));
      });

      const opts = {
        baseURL: proxy.baseURL,
        apiKey: PLACEHOLDER_API_KEY,
        defaultHeaders: {
          'X-E-Invoice-MCP': 'true',
        },
      } satisfies Partial<ClientOptions> as ClientOptions;

      const req = worker.request(
        'http://localhost',
        {
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        },
        (resp) => {
          const body: Uint8Array[] = [];
          resp.on('error', (err) => {
            reject(err);
          });
          resp.on('data', (chunk) => {
            body.push(chunk);
          });
          resp.on('end', () => {
            resolve(
              new Response(Buffer.concat(body).toString(), {
                status: resp.statusCode ?? 200,
                headers: resp.headers as any,
              }),
            );
          });
        },
      );

      const body = JSON.stringify({
        opts,
        code,
      });

      req.write(body, (err) => {
        if (err != null) {
          reject(err);
        }
      });

      req.end();
    });

    if (resp.status === 200) {
      const { result, log_lines, err_lines } = (await resp.json()) as WorkerOutput;
      const returnOutput: ContentBlock | null =
        result == null ? null : (
          {
            type: 'text',
            text: typeof result === 'string' ? result : JSON.stringify(result),
          }
        );
      const logOutput: ContentBlock | null =
        log_lines.length === 0 ?
          null
        : {
            type: 'text',
            text: log_lines.join('\n'),
          };
      const errOutput: ContentBlock | null =
        err_lines.length === 0 ?
          null
        : {
            type: 'text',
            text: 'Error output:\n' + err_lines.join('\n'),
          };
      return {
        content: [returnOutput, logOutput, errOutput].filter((block) => block !== null),
      };
    } else {
      const { result, log_lines, err_lines } = (await resp.json()) as WorkerOutput;
      const messageOutput: ContentBlock | null =
        result == null ? null : (
          {
            type: 'text',
            text: typeof result === 'string' ? result : JSON.stringify(result),
          }
        );
      const logOutput: ContentBlock | null =
        log_lines.length === 0 ?
          null
        : {
            type: 'text',
            text: log_lines.join('\n'),
          };
      const errOutput: ContentBlock | null =
        err_lines.length === 0 ?
          null
        : {
            type: 'text',
            text: 'Error output:\n' + err_lines.join('\n'),
          };
      return {
        content: [messageOutput, logOutput, errOutput].filter((block) => block !== null),
        isError: true,
      };
    }
  } finally {
    worker.terminate();
    await proxy.close();
  }
};
