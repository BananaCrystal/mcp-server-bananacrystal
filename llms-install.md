# Installing the BananaCrystal MCP server

These steps are for an AI agent (Cline, Claude Code, Cursor and similar) setting up BananaCrystal for a user.

BananaCrystal is a hosted MCP server. There is nothing to install, build or run locally. Don't use the `@bananacrystal/mcp-server` npm package: it is deprecated and can't reach the hosted server.

## 1. Get an API key

Ask the user to create a key at https://agents.bananacrystal.com/account (MCP keys).

- A sandbox key starts with `bc_test_`. It's free and only moves test balances.
- A live key moves real money. Use one only when the user asks for it.

If the client supports OAuth for remote MCP servers, the key can be skipped: the client opens a BananaCrystal sign-in page instead.

## 2. Add the server

Add this to the client's MCP settings (for Cline: `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "bananacrystal": {
      "type": "streamableHttp",
      "url": "https://agentic.bananacrystal.com/mcp",
      "headers": {
        "x-api-key": "<the user's key>"
      }
    }
  }
}
```

For a sandbox key, use `https://agentic.bananacrystal.com/mcp/sandbox` as the URL.

## 3. Check it works

Call the `ping` tool. It should return `pong`. Then call `get_exchange_rate` with `currency: "NGN"` to see a live rate.

## Notes

- Transfers, swaps and withdrawals ask for an email code by default. Ask the user for the code; never guess it.
- Docs: https://agents.bananacrystal.com/docs/mcp
