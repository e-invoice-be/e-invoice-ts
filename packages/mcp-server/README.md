# e-invoice.be Peppol MCP Server

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export E_INVOICE_API_KEY="My API Key"
npx -y e-invoice-api-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "e_invoice_api_api": {
      "command": "npx",
      "args": ["-y", "e-invoice-api-mcp"],
      "env": {
        "E_INVOICE_API_KEY": "My API Key"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=e-invoice-api-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImUtaW52b2ljZS1hcGktbWNwIl0sImVudiI6eyJFX0lOVk9JQ0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://insiders.vscode.dev/redirect/mcp/install?name=e-invoice-api-mcp&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22e-invoice-api-mcp%22%5D%2C%22env%22%3A%7B%22E_INVOICE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add e_invoice_api_mcp_api --env E_INVOICE_API_KEY="My API Key" -- npx -y e-invoice-api-mcp
```

## Code Mode

This MCP server is built on the "Code Mode" tool scheme. In this MCP Server,
your agent will write code against the TypeScript SDK, which will then be executed in a
sandbox. To accomplish this, the server will expose two tools to your agent:

- The first tool is a docs search tool, which can be used to generically query for
  documentation about your API/SDK.

- The second tool is a code tool, where the agent can write code against the TypeScript SDK.
  The code is executed in a sandbox without access to your API key or environment, and whose
  filesystem and network access are restricted to what the SDK needs — see "Where code runs" below. Then, anything the code returns or
  prints will be returned to the agent as the result of the tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

### Where code runs

The code tool runs each call in a Deno subprocess on the same machine as the MCP server.
No code is sent to a third-party service. Deno 2.9 or later must be installed for the code tool to work:
install it from https://deno.land and make sure `deno` is in the `PATH` of the MCP server, or
install the `deno` npm package next to the MCP server with `npm install deno`.

The subprocess is restricted as follows:

- **Files**: it can read the MCP server's own package files (including its `node_modules`). It cannot
  write files or start other processes.
- **Network**: its only network access is to a listener that the MCP server opens on `127.0.0.1`
  for the duration of the call, on a random port and path. That listener forwards requests to your
  API base URL, and follows redirects only within it. Paths that leave the base URL are refused,
  including encoded slashes and parent segments. Request bodies larger than 32 MiB are refused.
  Other hosts cannot be reached, with the SDK client, with `fetch` or by importing remote modules.
  Requests to the API are sent by the MCP server process (Node.js), so proxy and certificate
  settings for reaching the API belong to that process (for example `NODE_USE_ENV_PROXY=1` with
  `HTTPS_PROXY`, or `NODE_EXTRA_CA_CERTS`).
- **Credentials**: the API key stays in the MCP server process. The SDK client in the code holds a
  placeholder (`client.apiKey` is not your key, and `client.baseURL` is the local listener); the
  server adds the `Authorization` header when it forwards a request. Headers from
  `E_INVOICE_CUSTOM_HEADERS` are added in the same way, whether that variable is set on the server
  or supplied for one request. The header text is not given to the code.
- **Environment**: the subprocess does not inherit the environment of the MCP server. It is started
  with only what Deno needs to run (`PATH`, `HOME`, `DENO_DIR`, `XDG_CACHE_HOME`, the temporary
  directory variables and, on Windows, `SystemRoot`, `USERPROFILE`, `LOCALAPPDATA` and `PATHEXT`)
  plus `E_INVOICE_LOG`. Deno is resolved from the server's own `PATH` before the subprocess starts.
  The code can read `E_INVOICE_LOG` and a few names that the TypeScript compiler checks (such as
  `NODE_ENV`). `E_INVOICE_CUSTOM_HEADERS` is on that read list because the SDK looks it up when the
  client is constructed; the variable is left unset. With the HTTP transport, an `x-mcp-client-envs`
  header can add `E_INVOICE_*` variables for that request. `E_INVOICE_API_KEY`,
  `E_INVOICE_BASE_URL`, `E_INVOICE_CUSTOM_HEADERS` and any other name, including `PATH` and
  `HOME`, are not taken from that header.

The code can still call any endpoint that the API key is allowed to use, including through
`client.get` / `client.post` and by sending requests to the local listener itself. To limit what an
agent can do, use an API key with limited permissions.

The `--code-execution-mode` flag is kept for compatibility; `local` is its only value and the default.

### Docs search

The docs search tool uses an in-memory search index that is built from SDK method data embedded
in the server. No request is sent to a remote search service. Use `--docs-dir=<path>` to add
your own Markdown or JSON files to the index. The `--docs-search-mode` flag is kept for
compatibility; `local` is its only value and the default.

### Instructions

The server sends built-in instructions to the MCP client. Use `--custom-instructions-path=<path>`
to replace them with the contents of a file.

## Running remotely

Launching the server with `--transport=http` serves MCP over the Streamable HTTP transport instead of stdio.

### Deployment model

In HTTP mode the server does not hold credentials of its own. Every client sends its own e-invoice.be API key
with each request, and the server uses that key, and only that key, for the API calls made on behalf of that
request. An `E_INVOICE_API_KEY` in the server's environment is not used by the HTTP transport.

The server is meant to run next to the MCP client, on the same machine, and by default only accepts
connections from that machine. To serve other machines, expose it deliberately:

- set `--host` to the address to listen on,
- list the host names (and, for browser-based clients, the origins) that clients use to reach it with
  `--allowed-hosts` and `--allowed-origins`,
- and put it behind a reverse proxy that terminates TLS, so API keys are not sent in clear text.

The server passes the client's API key on to the e-invoice.be API and does not check it itself, so anyone who
can reach the port can list the tools and run the code tool (see "Where code runs"). Limit who can reach the
port with your network setup, and use `--no-tools=code` if the clients do not need the code tool.

### Options

| Option              | Environment variable         | Default     | Description                                                                           |
| ------------------- | ---------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `--port`            | `MCP_SERVER_PORT`            | `3000`      | Port to listen on.                                                                    |
| `--host`            | `MCP_SERVER_HOST`            | `127.0.0.1` | Address to listen on. Use `0.0.0.0` (or a specific address) to accept other machines. |
| `--socket`          | `MCP_SERVER_SOCKET`          |             | Unix socket to listen on, instead of a port.                                          |
| `--allowed-hosts`   | `MCP_SERVER_ALLOWED_HOSTS`   |             | Additional `Host` header values to accept, such as `mcp.example.com`.                 |
| `--allowed-origins` | `MCP_SERVER_ALLOWED_ORIGINS` |             | Additional `Origin` header values to accept, such as `https://app.example.com`.       |

`--allowed-hosts` and `--allowed-origins` can be repeated or given as a comma-separated list.

### Host and Origin validation

MCP requests are only served when their `Host` header is one of the allowed values; other requests get a
`403` response. The loopback names for the listening port (`localhost:<port>`, `127.0.0.1:<port>` and
`[::1]:<port>`) are always allowed, as is the `--host` address when it is a specific address. Add the names
clients use with `--allowed-hosts`, written exactly as the client sends them (`mcp.example.com`, or
`mcp.example.com:8443` for a non-default port).

A request with an `Origin` header (sent by browsers) is checked the same way against the loopback origins
and `--allowed-origins`. Requests without an `Origin` header are not affected. The default origins use
`http://`; add an `https://` origin, such as `https://mcp.example.com`, with `--allowed-origins` when
browser-based clients reach the server over TLS.

When the server listens on a Unix socket (`--socket`), the loopback names are accepted without a port.

For example, to serve clients that reach the server as `https://mcp.example.com` through a reverse proxy:

```sh
npx -y e-invoice-api-mcp --transport=http --host=0.0.0.0 --port=3000 --allowed-hosts=mcp.example.com
```

If the reverse proxy runs on the same machine, the default `--host` is enough. The check applies to the
`Host` header as the server receives it, so configure the proxy to pass the client's `Host` header on.

In a container, the server has to listen on `0.0.0.0` for a published port to work; add the host name and
port that clients use on the outside to `--allowed-hosts` if they are not `localhost:<port>` with the same
port number.

### Authorization

Every request must carry the client's API key; requests without one get a `401` response. `GET /health` is
the only exception: it needs no credentials and is not subject to `Host` validation, so it can be used for
health checks.

Send the key in the `Authorization` header using the Bearer scheme, or in the following header:

| Header                | Equivalent client option | Security scheme |
| --------------------- | ------------------------ | --------------- |
| `x-e-invoice-api-key` | `apiKey`                 | HTTPBearer      |

The following optional headers are also supported:

| Header                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-mcp-client-envs`        | JSON object of environment variables to set for the code tool subprocess of this request. Only variables whose name starts with `E_INVOICE_` are accepted, and `E_INVOICE_BASE_URL` is not, so the operator's API address stays in effect. Other names are ignored.                                                                                                                                                                                                                |
| `x-mcp-client-permissions` | JSON object (`allow_http_gets`, `allowed_methods`, `blocked_methods`) that further restricts the methods the code tool may use for this request. It is combined with the `--code-allow-http-gets`, `--code-allowed-methods` and `--code-blocked-methods` options: a method is available only if both allow it, so the header cannot allow a method that the server's options do not. A malformed header, including a method pattern with nested repetition, gets a `400` response. |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "e_invoice_api_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```
