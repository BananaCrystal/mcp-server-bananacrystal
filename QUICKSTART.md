# Quick Start Guide

Get up and running with BananaCrystal MCP Server in 5 minutes.

## Step 1: Install (1 minute)

```bash
npm install -g @bananacrystal/mcp-server
```

Verify installation:

```bash
bananacrystal-mcp --version
```

## Step 2: Get API Key (2 minutes)

1. Go to [agents.bananacrystal.com](https://agents.bananacrystal.com)
2. Sign up or log in
3. Navigate to **Account** → **API Keys**
4. Click **Create New Key**
5. Select **MCP Server** as the key type
6. Copy the key (it starts with `bc_`)

⚠️ **Important**: Save your key securely. You won't be able to see it again!

## Step 3: Configure Claude Desktop (1 minute)

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
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "PASTE_YOUR_KEY_HERE"
      }
    }
  }
}
```

Replace `PASTE_YOUR_KEY_HERE` with your actual API key.

**Note:** This connects to production. Start with small amounts to test!

## Step 4: Restart Claude (30 seconds)

1. Quit Claude Desktop completely
2. Reopen Claude Desktop
3. Wait for it to fully load

## Step 5: Test It! (30 seconds)

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
- 🐛 [Report Issues](https://github.com/bananacrystal/mcp-server/issues)

## Next Steps

- Read the [full README](README.md) for all features
- Check out [example conversations](examples/)
- Join our [Discord](https://discord.gg/bananacrystal) to share your experience

Happy building! 🚀
