# Install BananaCrystal MCP

BananaCrystal is a hosted MCP server. There is nothing to download.

1. Get a free sandbox API key at https://agents.bananacrystal.com/account (keys start with `bc_test_`).
2. Add the server to the client's MCP configuration:

```json
{
  "mcpServers": {
    "bananacrystal": {
      "url": "https://agentic.bananacrystal.com/mcp",
      "headers": { "x-api-key": "bc_test_your_key" }
    }
  }
}
```

3. Restart the client. Confirm with the prompt: "What is my USDb balance?"

If the client cannot connect to a `url` entry directly, use `npx -y mcp-remote https://agentic.bananacrystal.com/mcp --header "x-api-key:bc_test_your_key"` as the command instead.

Production keys have no prefix and require KYC for fiat tools. Store keys in environment variables, never in committed files.
