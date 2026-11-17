import qs from 'qs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import z from 'zod';

export type CLIOptions = McpOptions & {
  debug: boolean;
  logFormat: 'json' | 'pretty';
  transport: 'stdio' | 'http';
  port: number | undefined;
  socket: string | undefined;
  host: string;
  allowedHosts: string[] | undefined;
  allowedOrigins: string[] | undefined;
};

export type McpOptions = {
  includeCodeTool?: boolean | undefined;
  includeDocsTools?: boolean | undefined;
  docsSearchMode?: McpDocsSearchMode | undefined;
  docsDir?: string | undefined;
  codeAllowHttpGets?: boolean | undefined;
  codeAllowedMethods?: string[] | undefined;
  codeBlockedMethods?: string[] | undefined;
  codeExecutionMode?: McpCodeExecutionMode | undefined;
  customInstructionsPath?: string | undefined;
};

export type McpCodeExecutionMode = 'local';

export type McpDocsSearchMode = 'local';

// Lets a list option be given as repeated flags, or as one comma-separated value (for example from an
// environment variable).
const splitCommaSeparated = (values: string[]): string[] =>
  values
    .flatMap((value) => String(value).split(','))
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

export function parseCLIOptions(): CLIOptions {
  const opts = yargs(hideBin(process.argv))
    .option('allowed-hosts', {
      type: 'string',
      array: true,
      coerce: splitCommaSeparated,
      description:
        'Additional Host header values to accept if using http transport, such as mcp.example.com or mcp.example.com:8443. The loopback names for the listening port are always accepted; requests with any other Host header are rejected.',
    })
    .option('allowed-origins', {
      type: 'string',
      array: true,
      coerce: splitCommaSeparated,
      description:
        'Additional Origin header values to accept if using http transport, such as https://app.example.com. The loopback origins for the listening port are always accepted; requests with any other Origin header are rejected.',
    })
    .option('code-allow-http-gets', {
      type: 'boolean',
      description:
        'Allow all code tool methods that map to HTTP GET operations. If all code-allow-* flags are unset, then everything is allowed.',
    })
    .option('code-allowed-methods', {
      type: 'string',
      array: true,
      description:
        'Methods to explicitly allow for code tool. Evaluated as regular expressions against method fully qualified names. If all code-allow-* flags are unset, then everything is allowed.',
    })
    .option('code-blocked-methods', {
      type: 'string',
      array: true,
      description:
        'Methods to explicitly block for code tool. Evaluated as regular expressions against method fully qualified names. If all code-allow-* flags are unset, then everything is allowed.',
    })
    .option('code-execution-mode', {
      type: 'string',
      choices: ['local'],
      default: 'local',
      description:
        "Where to run code execution in code tool; 'local' (the only mode) will execute code locally on the MCP server machine in a Deno subprocess.",
    })
    .option('custom-instructions-path', {
      type: 'string',
      description: 'Path to custom instructions for the MCP server',
    })
    .option('debug', { type: 'boolean', description: 'Enable debug logging' })
    .option('docs-dir', {
      type: 'string',
      description:
        'Path to a directory of local documentation files (markdown/JSON) to include in local docs search.',
    })
    .option('docs-search-mode', {
      type: 'string',
      choices: ['local'],
      default: 'local',
      description:
        "Where to search documentation; 'local' (the only mode) uses an in-memory search index built from embedded SDK method data and optional local docs files.",
    })
    .option('host', {
      type: 'string',
      default: '127.0.0.1',
      description:
        'Address to listen on if using http transport. Defaults to the loopback interface; set it to 0.0.0.0 or a specific address to accept connections from other machines.',
    })
    .option('log-format', {
      type: 'string',
      choices: ['json', 'pretty'],
      description: 'Format for log output; defaults to json unless tty is detected',
    })
    .option('no-tools', {
      type: 'string',
      array: true,
      choices: ['code', 'docs'],
      description: 'Tools to explicitly disable',
    })
    .option('port', {
      type: 'number',
      default: 3000,
      description: 'Port to serve on if using http transport',
    })
    .option('socket', { type: 'string', description: 'Unix socket to serve on if using http transport' })
    .option('tools', {
      type: 'string',
      array: true,
      choices: ['code', 'docs'],
      description: 'Tools to explicitly enable',
    })
    .option('transport', {
      type: 'string',
      choices: ['stdio', 'http'],
      default: 'stdio',
      description:
        'What transport to use; stdio for local servers or http for remote servers. The http transport requires client credentials on every request.',
    })
    .env('MCP_SERVER')
    .version(true)
    .help();

  const argv = opts.parseSync();

  const shouldIncludeToolType = (toolType: 'code' | 'docs') =>
    argv.noTools?.includes(toolType) ? false
    : argv.tools?.includes(toolType) ? true
    : undefined;

  const includeCodeTool = shouldIncludeToolType('code');
  const includeDocsTools = shouldIncludeToolType('docs');

  // A repeated --host gives a list; the last value wins. An empty value falls back to the default.
  const host = [argv.host].flat().pop() || '127.0.0.1';

  const transport = argv.transport as 'stdio' | 'http';
  const logFormat =
    argv.logFormat ? (argv.logFormat as 'json' | 'pretty')
    : process.stderr.isTTY ? 'pretty'
    : 'json';

  return {
    ...(includeCodeTool !== undefined && { includeCodeTool }),
    ...(includeDocsTools !== undefined && { includeDocsTools }),
    debug: !!argv.debug,
    docsSearchMode: argv.docsSearchMode as McpDocsSearchMode,
    docsDir: argv.docsDir,
    codeAllowHttpGets: argv.codeAllowHttpGets,
    codeAllowedMethods: argv.codeAllowedMethods,
    codeBlockedMethods: argv.codeBlockedMethods,
    codeExecutionMode: argv.codeExecutionMode as McpCodeExecutionMode,
    customInstructionsPath: argv.customInstructionsPath,
    transport,
    logFormat,
    port: argv.port,
    socket: argv.socket,
    host,
    allowedHosts: argv.allowedHosts,
    allowedOrigins: argv.allowedOrigins,
  };
}

const coerceArray = <T extends z.ZodTypeAny>(zodType: T) =>
  z.preprocess(
    (val) =>
      Array.isArray(val) ? val
      : val ? [val]
      : val,
    z.array(zodType).optional(),
  );

const QueryOptions = z.object({
  tools: coerceArray(z.enum(['code', 'docs'])).describe('Specify which MCP tools to use'),
  no_tools: coerceArray(z.enum(['code', 'docs'])).describe('Specify which MCP tools to not use.'),
  tool: coerceArray(z.string()).describe('Include tools matching the specified names'),
});

export function parseQueryOptions(defaultOptions: McpOptions, query: unknown): McpOptions {
  const queryObject = typeof query === 'string' ? qs.parse(query) : query;
  const queryOptions = QueryOptions.parse(queryObject);

  const codeTool: boolean | undefined =
    queryOptions.no_tools && queryOptions.no_tools?.includes('code') ? false
    : queryOptions.tools?.includes('code') ? true
    : defaultOptions.includeCodeTool;

  const docsTools: boolean | undefined =
    queryOptions.no_tools && queryOptions.no_tools?.includes('docs') ? false
    : queryOptions.tools?.includes('docs') ? true
    : defaultOptions.includeDocsTools;

  return {
    ...(codeTool !== undefined && { includeCodeTool: codeTool }),
    ...(docsTools !== undefined && { includeDocsTools: docsTools }),
    codeExecutionMode: defaultOptions.codeExecutionMode,
    docsSearchMode: defaultOptions.docsSearchMode,
    docsDir: defaultOptions.docsDir,
  };
}
