import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { ClientOptions } from 'e-invoice-api';
import express from 'express';
import http from 'node:http';
import { isIPv6 } from 'node:net';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { ClientAuthError, parseClientAuthHeaders } from './auth';
import { getLogger } from './logger';
import { ClientMethodPermissions, narrowCodeToolOptions } from './methods';
import { McpOptions } from './options';
import { initMcpServer, newMcpServer } from './server';

const CLIENT_ENV_PREFIX = 'E_INVOICE_';

// An SDK client constructed without a base URL reads this name. The code tool keeps the
// operator's API address, so a value from the request is not passed to the subprocess.
const IGNORED_CLIENT_ENVS = new Set(['E_INVOICE_BASE_URL']);

/**
 * Reads the `x-mcp-client-envs` header: a JSON object of environment variables for the code tool
 * subprocess of this request. Only string values whose name starts with `E_INVOICE_` are kept,
 * except `E_INVOICE_BASE_URL`. Every other entry, and a malformed header, is dropped.
 */
export const filterClientEnvs = (
  header: string | string[] | undefined,
): Record<string, string> | undefined => {
  if (typeof header !== 'string') return undefined;

  let parsed: unknown;
  try {
    parsed = JSON.parse(header);
  } catch {
    return undefined;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return undefined;

  const envs = Object.entries(parsed).filter(
    (entry): entry is [string, string] =>
      entry[0].startsWith(CLIENT_ENV_PREFIX) &&
      !IGNORED_CLIENT_ENVS.has(entry[0]) &&
      typeof entry[1] === 'string',
  );
  return envs.length > 0 ? Object.fromEntries(envs) : undefined;
};

/** The `x-mcp-client-permissions` header is not a valid permissions object. */
class ClientPermissionsError extends Error {}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

/**
 * Reads the `x-mcp-client-permissions` header: a JSON object with `allow_http_gets`, `allowed_methods`
 * and `blocked_methods`. The header is rejected as a whole when it is malformed, so that a restriction
 * the client asked for is never silently skipped.
 */
const parseClientPermissions = (
  header: string | string[] | undefined,
): ClientMethodPermissions | undefined => {
  if (header === undefined) return undefined;

  let parsed: any;
  try {
    parsed = JSON.parse(String(header));
  } catch {
    throw new ClientPermissionsError('Invalid x-mcp-client-permissions header: expected a JSON object.');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new ClientPermissionsError('Invalid x-mcp-client-permissions header: expected a JSON object.');
  }

  const { allow_http_gets, allowed_methods, blocked_methods } = parsed;
  if (allow_http_gets !== undefined && typeof allow_http_gets !== 'boolean') {
    throw new ClientPermissionsError(
      'Invalid x-mcp-client-permissions header: allow_http_gets must be a boolean.',
    );
  }
  for (const [name, value] of Object.entries({ allowed_methods, blocked_methods })) {
    if (value !== undefined && !isStringArray(value)) {
      throw new ClientPermissionsError(
        `Invalid x-mcp-client-permissions header: ${name} must be an array of strings.`,
      );
    }
  }

  return { allowHttpGets: allow_http_gets, allowedMethods: allowed_methods, blockedMethods: blocked_methods };
};

/**
 * Applies the `x-mcp-client-permissions` header to the operator's options. The header can only narrow
 * the operator's method configuration: a method stays blocked unless both allow it.
 */
const mcpOptionsForRequest = (mcpOptions: McpOptions, req: express.Request): McpOptions => {
  const permissions = parseClientPermissions(req.headers['x-mcp-client-permissions']);
  if (!permissions) return mcpOptions;

  let narrowed: McpOptions;
  try {
    narrowed = narrowCodeToolOptions(mcpOptions, permissions);
  } catch (error) {
    // The only failure is a pattern that is not a valid regular expression.
    throw new ClientPermissionsError(
      `Invalid x-mcp-client-permissions header: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  getLogger().info(
    { clientPermissions: permissions },
    'Narrowing code execution permissions from x-mcp-client-permissions header',
  );
  return narrowed;
};

const newServer = async ({
  clientOptions,
  mcpOptions,
  authOptions,
  req,
}: {
  clientOptions: ClientOptions;
  mcpOptions: McpOptions;
  authOptions: Partial<ClientOptions>;
  req: express.Request;
}): Promise<McpServer> => {
  const customInstructionsPath = mcpOptions.customInstructionsPath;
  const server = await newMcpServer({ customInstructionsPath });

  const mcpClientInfo =
    typeof req.body?.params?.clientInfo?.name === 'string' ?
      { name: req.body.params.clientInfo.name, version: String(req.body.params.clientInfo.version ?? '') }
    : undefined;

  await initMcpServer({
    server: server,
    mcpOptions,
    clientOptions: {
      ...clientOptions,
      ...authOptions,
    },
    upstreamClientEnvs: filterClientEnvs(req.headers['x-mcp-client-envs']),
    mcpSessionId: (req as any).mcpSessionId,
    mcpClientInfo,
  });

  if (mcpClientInfo) {
    getLogger().info({ mcpSessionId: (req as any).mcpSessionId, mcpClientInfo }, 'MCP client connected');
  }

  return server;
};

const jsonRpcError = (res: express.Response, status: number, message: string) => {
  res.status(status).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message,
    },
    id: null,
  });
};

/**
 * Requires client credentials on the request. The credentials of the server's own environment are never
 * used for HTTP requests, so a request without them gets a 401.
 */
const requireClientAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.locals['authOptions'] = parseClientAuthHeaders(req, true);
  } catch (error) {
    if (!(error instanceof ClientAuthError)) throw error;
    res.setHeader('WWW-Authenticate', 'Bearer');
    jsonRpcError(res, 401, error.message);
    return;
  }
  next();
};

type HostValidationOptions = {
  /** `Host` header values to accept, in the form the client sends them (`host` or `host:port`). */
  allowedHosts: string[];
  /** `Origin` header values to accept. A request without an `Origin` header is accepted. */
  allowedOrigins: string[];
};

const post =
  (options: { clientOptions: ClientOptions; mcpOptions: McpOptions } & HostValidationOptions) =>
  async (req: express.Request, res: express.Response) => {
    let mcpOptions: McpOptions;
    try {
      mcpOptions = mcpOptionsForRequest(options.mcpOptions, req);
    } catch (error) {
      if (!(error instanceof ClientPermissionsError)) throw error;
      jsonRpcError(res, 400, error.message);
      return;
    }

    const server = await newServer({
      clientOptions: options.clientOptions,
      mcpOptions,
      authOptions: res.locals['authOptions'],
      req,
    });
    // The transport rejects requests whose Host or Origin header is not in the allowed lists.
    const transport = new StreamableHTTPServerTransport({
      enableDnsRebindingProtection: true,
      allowedHosts: options.allowedHosts,
      allowedOrigins: options.allowedOrigins,
    });
    await server.connect(transport as any);
    await transport.handleRequest(req, res, req.body);
  };

const get = async (_req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

const del = async (_req: express.Request, res: express.Response) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not supported',
    },
  });
};

const redactHeaders = (headers: Record<string, any>) => {
  const hiddenHeaders = /auth|cookie|key|token|x-mcp-client-envs/i;
  const filtered = { ...headers };
  Object.keys(filtered).forEach((key) => {
    if (hiddenHeaders.test(key)) {
      filtered[key] = '[REDACTED]';
    }
  });
  return filtered;
};

/**
 * Builds the Express app of the streamable HTTP transport.
 *
 * Every request except `GET /health` must carry client credentials, and MCP requests must have a `Host`
 * header (and an `Origin` header, when one is sent) from the allowed lists.
 */
export const streamableHTTPApp = ({
  clientOptions = {},
  mcpOptions,
  allowedHosts,
  allowedOrigins,
}: {
  clientOptions?: ClientOptions;
  mcpOptions: McpOptions;
} & HostValidationOptions): express.Express => {
  const app = express();
  app.set('query parser', 'extended');
  app.use(express.json());
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const existing = req.headers['mcp-session-id'];
    const sessionId = (Array.isArray(existing) ? existing[0] : existing) || crypto.randomUUID();
    (req as any).mcpSessionId = sessionId;
    const origWriteHead = res.writeHead.bind(res);
    res.writeHead = function (statusCode: number, ...rest: any[]) {
      res.setHeader('mcp-session-id', sessionId);
      return origWriteHead(statusCode, ...rest);
    } as typeof res.writeHead;
    next();
  });
  app.use(
    pinoHttp({
      logger: getLogger(),
      customProps: (req) => ({
        mcpSessionId: (req as any).mcpSessionId,
      }),
      customLogLevel: (_req, res) => {
        if (res.statusCode >= 500) {
          return 'error';
        } else if (res.statusCode >= 400) {
          return 'warn';
        }
        return 'info';
      },
      customSuccessMessage: function (req, res) {
        return `Request ${req.method} to ${req.url} completed with status ${res.statusCode}`;
      },
      customErrorMessage: function (req, res, _err) {
        return `Request ${req.method} to ${req.url} errored with status ${res.statusCode}`;
      },
      serializers: {
        req: pino.stdSerializers.wrapRequestSerializer((req) => {
          return {
            ...req,
            headers: redactHeaders(req.raw.headers),
          };
        }),
        res: pino.stdSerializers.wrapResponseSerializer((res) => {
          return {
            ...res,
            headers: redactHeaders(res.headers),
          };
        }),
      },
    }),
  );

  app.get('/health', async (_req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
  });
  app.use(requireClientAuth);
  app.get('/', get);
  app.post('/', post({ clientOptions, mcpOptions, allowedHosts, allowedOrigins }));
  app.delete('/', del);

  return app;
};

const LOOPBACK_HOSTS = ['localhost', '127.0.0.1', '[::1]'];
const WILDCARD_HOSTS = ['0.0.0.0', '::'];
const DEFAULT_HTTP_PORT = 80;

/**
 * The `Host` header values accepted by default: the loopback names for the listening port, plus the
 * listening address itself when it is a specific (non-wildcard) address. Without a port, as on a Unix
 * socket, the names are accepted without one.
 */
export const defaultAllowedHosts = ({
  port,
  host,
}: {
  port?: number | undefined;
  host?: string | undefined;
}) => {
  const names = [...LOOPBACK_HOSTS];
  if (host && !WILDCARD_HOSTS.includes(host)) {
    names.push(isIPv6(host) ? `[${host}]` : host);
  }

  const hosts =
    port === undefined ? names : (
      [
        ...names.map((name) => `${name}:${port}`),
        // Clients leave the default port out of the Host header.
        ...(port === DEFAULT_HTTP_PORT ? names : []),
      ]
    );
  return [...new Set(hosts)];
};

/** The `Origin` header values accepted by default: `http://` origins of {@link defaultAllowedHosts}. */
export const defaultAllowedOrigins = (address: { port?: number | undefined; host?: string | undefined }) =>
  defaultAllowedHosts(address).map((host) => `http://${host}`);

/**
 * Starts the streamable HTTP transport.
 *
 * @param host - Address to listen on; the loopback interface by default. Ignored for a Unix socket.
 * @param allowedHosts - `Host` header values to accept in addition to {@link defaultAllowedHosts}.
 * @param allowedOrigins - `Origin` header values to accept in addition to {@link defaultAllowedOrigins}.
 */
export const launchStreamableHTTPServer = async ({
  mcpOptions,
  port,
  host = '127.0.0.1',
  allowedHosts = [],
  allowedOrigins = [],
}: {
  mcpOptions: McpOptions;
  port: number | string | undefined;
  host?: string | undefined;
  allowedHosts?: string[] | undefined;
  allowedOrigins?: string[] | undefined;
}): Promise<http.Server> => {
  // An empty host would make Node listen on every interface.
  const listenHost = host || '127.0.0.1';
  const server = http.createServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    const onListening = () => {
      server.off('error', reject);
      resolve();
    };
    if (typeof port === 'string') {
      server.listen(port, onListening);
    } else {
      server.listen(port, listenHost, onListening);
    }
  });

  // The default hosts and origins depend on the port, which is only known once the server is listening.
  const address = server.address();
  const listening =
    typeof address === 'object' && address !== null ? { port: address.port, host: listenHost } : {};
  server.on(
    'request',
    streamableHTTPApp({
      mcpOptions,
      // Host names and origins are case-insensitive, and clients send them in lower case.
      allowedHosts: [...defaultAllowedHosts(listening), ...allowedHosts.map((value) => value.toLowerCase())],
      allowedOrigins: [
        ...defaultAllowedOrigins(listening),
        ...allowedOrigins.map((value) => value.toLowerCase()),
      ],
    }),
  );

  const logger = getLogger();

  if (typeof address === 'string') {
    logger.info(`MCP Server running on streamable HTTP at ${address}`);
  } else if (address !== null) {
    logger.info(`MCP Server running on streamable HTTP on ${address.address} port ${address.port}`);
  }

  return server;
};
