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
  The code is executed in a sandbox whose filesystem and network access are restricted to
  what the SDK needs — see "Where code runs" below. Then, anything the code returns or
  prints will be returned to the agent as the result of the tool call.

Using this scheme, agents are capable of performing very complex tasks deterministically
and repeatably.

### Where code runs

The code tool runs each call in a Deno subprocess on the same machine as the MCP server,
restricted to reading the server's own files and to making network requests to your API host.
No code is sent to a third-party service. Deno 2.9 or later must be installed for the code tool to work:
install it from https://deno.land and make sure `deno` is in the `PATH` of the MCP server, or
install the `deno` npm package next to the MCP server with `npm install deno`.

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

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| --------------------- | ------------------------ | --------------- |
| `x-e-invoice-api-key` | `apiKey` | HTTPBearer |

The following optional headers are also supported:
| Header | Description |
| --------------------- | ------------------------ |
| `x-mcp-client-envs` | JSON object of environment variables to set for the code tool subprocess of this request |
| `x-mcp-client-permissions` | JSON object (`allow_http_gets`, `allowed_methods`, `blocked_methods`) that overrides the `--code-allow-http-gets`, `--code-allowed-methods` and `--code-blocked-methods` options for this request |

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
