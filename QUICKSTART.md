# Quick Start Guide

Get up and running with BananaCrystal MCP Server in 5 minutes.

> ## ⚠️ The `@bananacrystal/mcp-server` npm package is deprecated
>
> **Do not install it.** BananaCrystal is a hosted MCP server — connect your client directly to the URL below and authenticate with the header `x-api-key: <YOUR_API_KEY>`. Your client fetches the tool list live from the server, so it is always current.

| Environment | URL                                             |
| ----------- | ----------------------------------------------- |
| Production  | `https://agentic.bananacrystal.com/mcp`         |
| Sandbox     | `https://agentic.bananacrystal.com/mcp/sandbox` |

> **Use the `agentic.` host, not `agents.`** — `agents.bananacrystal.com` is the web app and returns HTML, not MCP.

## Step 1: Create an account and get an API key (2 minutes)

1. Go to [agents.bananacrystal.com](https://agents.bananacrystal.com) — the web app, where accounts and keys live
2. Sign up or log in
3. Open the **AI Agent Access** page
4. Click **Create New Key**
5. **Start with a Sandbox key** for fake money, zero risk, and full functionality. Sandbox keys start with `bc_test_`. Live keys have no prefix.
6. Copy the key

⚠️ **Important**: Save your key securely. You won't be able to see it again!

## Step 2: Configure Claude Desktop (1 minute)

### macOS

```bash
# Open config file
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Windows

```bash
# Open config file
notepad %APPDATA%\Claude\claude_desktop_config.json
```

### Add Configuration

Paste this into the file:

```json
{
  "mcpServers": {
    "bananacrystal": {
      "url": "https://agentic.bananacrystal.com/mcp",
      "headers": {
        "x-api-key": "PASTE_YOUR_KEY_HERE"
      }
    }
  }
}
```

Using a `bc_test_` sandbox key? Point at `https://agentic.bananacrystal.com/mcp/sandbox` instead.

Replace `PASTE_YOUR_KEY_HERE` with your actual API key.

**Note:** This connects to production. Use a Sandbox key (`bc_test_...`) while testing because it uses the same configuration without real money!

## Step 3: Restart Claude (30 seconds)

1. Quit Claude Desktop completely
2. Reopen Claude Desktop
3. Wait for it to fully load

## Step 4: Test It! (30 seconds)

Open a new conversation in Claude and try:

```
Check my BananaCrystal balance
```

Claude should respond with your account balances!

## What to Try Next

### Check Balances

```
What's my USDC balance on BananaCrystal?
```

### View Transactions

```
Show my recent BananaCrystal transactions
```

### Get Exchange Rates

```
What's the current USD to NGN exchange rate on BananaCrystal?
```

**Note:** The MCP server provides 40 payment tools. For comprehensive rate data including historical rates, batch conversions, and statistics, please use the dedicated **rate service**. See the [Rate Service Documentation](README.md#backend-rate-service-separate-from-mcp-tools) in the README for details.

### Transfer Tokens

```
Transfer 10 USDC to 0.0.12345 on BananaCrystal
```

_(You'll receive an OTP via email)_

### Swap Currencies

```
Swap 50 USD to NGN on BananaCrystal
```

## Troubleshooting

### "API key invalid"

- Check you copied the full key
- Verify key hasn't been revoked
- Ensure no extra spaces in config

### MCP server not showing

- Verify JSON syntax in config file
- Restart Claude completely
- Check Claude's logs for errors

### Connection errors

- Check your internet connection
- Verify API URL is correct (default should work)
- Try again in a few moments

## Need Help?

- 📖 [Full Documentation](README.md)
- 💬 [Discord Community](https://discord.gg/bananacrystal)
- 📧 Email: support@bananacrystal.com
- 🐛 [Report Issues](https://github.com/BananaCrystal/mcp-server-bananacrystal/issues)

## Next Steps

- Read the [full README](README.md) for all features
- Check out [example conversations](examples/)
- Join our [Discord](https://discord.gg/bananacrystal) to share your experience

Happy building! 🚀
