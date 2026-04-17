# BananaCrystal MCP — Quick Start

## 1. Install

```bash
npm install -g @bananacrystal/mcp-server
```

## 2. Get a Sandbox Key (free, no real money)

1. Sign up at [agents.bananacrystal.com](https://agents.bananacrystal.com)
2. Go to **Account → API Keys**
3. Click **Create Sandbox Key**
4. Copy the key — it starts with `bc_test_`

## 3. Add to Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "bc_test_your_key_here"
      }
    }
  }
}
```

## 4. Restart Claude Desktop

Quit completely and reopen.

## 5. Test It

Ask Claude:

```
Check my BananaCrystal balance
```

You should see your sandbox balances:

- 10,000 USDb
- 5,000,000 NGNb
- 50,000 GHSb
- and more...

## 6. Try a Swap

```
Swap 100 USDb to NGNb on BananaCrystal
```

## 7. Try a Transfer

```
Transfer 50 USDb to test@example.com on BananaCrystal
```

In sandbox, the OTP code is returned directly in the response — no email needed.

## 8. Go Live

When you're ready:

1. Create a **Live key** at [agents.bananacrystal.com](https://agents.bananacrystal.com)
2. Replace `bc_test_your_key_here` with your live key
3. Restart Claude Desktop

That's it. Same tools, real money.

---

**Full documentation:** [agents.bananacrystal.com/docs](https://agents.bananacrystal.com/docs)
