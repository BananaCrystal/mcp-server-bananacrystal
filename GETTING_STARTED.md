# Getting Started with BananaCrystal MCP Server

## What is This?

This package connects AI agents (Claude, LangChain, CrewAI, etc.) to BananaCrystal's payment infrastructure. Your agent can check balances, transfer stablecoins, swap currencies, and manage payments — all through natural language.

## Prerequisites

- Node.js 20+
- Claude Desktop, Cursor, or any MCP-compatible AI client
- A BananaCrystal account ([agents.bananacrystal.com](https://agents.bananacrystal.com))

---

## Step 1: Install

```bash
npm install -g @bananacrystal/mcp-server
```

Verify:

```bash
bananacrystal-mcp --version
```

---

## Step 2: Create Your API Key

### Start with Sandbox (Recommended)

Sandbox gives you fake money to test with — no risk, no real transactions.

1. Go to [agents.bananacrystal.com](https://agents.bananacrystal.com)
2. Sign up or log in
3. Navigate to **Account → API Keys**
4. Click **Create Sandbox Key**
5. Copy the key (starts with `bc_test_`)

Your sandbox account starts with:

- **10,000 USDb** (US Dollar stablecoin)
- **5,000,000 NGNb** (Nigerian Naira stablecoin)
- **50,000 GHSb** (Ghanaian Cedi stablecoin)
- **1,000,000 KESb** (Kenyan Shilling stablecoin)
- **150,000 ZARb** (South African Rand stablecoin)

### Create a Live Key (When Ready)

Same process — click **Create Live Key** instead. Live keys have no `bc_test_` prefix.

---

## Step 3: Configure Your AI Client

### Claude Desktop

Edit the config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

**Sandbox:**

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "bc_test_your_sandbox_key_here"
      }
    }
  }
}
```

**Live:**

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "your_live_key_here"
      }
    }
  }
}
```

> The package automatically routes to the correct endpoint based on your key prefix. No URL configuration needed.

### Cursor / Windsurf

Same JSON format — check your editor's MCP configuration docs for the file location.

### LangChain

```python
from langchain_mcp_adapters.client import MultiServerMCPClient

async with MultiServerMCPClient({
    "bananacrystal": {
        "command": "bananacrystal-mcp",
        "env": {"BANANACRYSTAL_API_KEY": "bc_test_your_key"},
        "transport": "stdio",
    }
}) as client:
    tools = client.get_tools()
```

### CrewAI

```python
from crewai_tools import MCPServerAdapter

mcp = MCPServerAdapter({
    "command": "bananacrystal-mcp",
    "env": {"BANANACRYSTAL_API_KEY": "bc_test_your_key"},
})
tools = mcp.tools
```

---

## Step 4: Restart and Test

Restart your AI client completely, then try:

```
Check my BananaCrystal balance
```

Expected response:

```
You have:
• 10,000.00 USDb
• 5,000,000.00 NGNb
• 50,000.00 GHSb
...
```

---

## Step 5: Explore the Tools

### Transfer Tokens

```
Transfer 100 USDb to alice@example.com on BananaCrystal
```

In sandbox: the OTP code is returned directly in the response.
In live: you receive an email with the OTP code.

### Swap Currencies

```
Swap 50 USDb to NGNb on BananaCrystal
```

### Check Exchange Rate

```
What's the current USD to NGN rate on BananaCrystal?
```

### View Transaction History

```
Show my last 10 BananaCrystal transactions
```

### Reset Sandbox Balance (Sandbox Only)

```
Reset my BananaCrystal sandbox balance
```

---

## Sandbox vs Live Reference

| Feature       | Sandbox         | Live              |
| ------------- | --------------- | ----------------- |
| Key prefix    | `bc_test_...`   | No prefix         |
| Money         | Fake            | Real              |
| OTP delivery  | In API response | Email             |
| KYC           | Always approved | Required for fiat |
| Spend limits  | Unlimited       | Enforced          |
| Balance reset | Available       | N/A               |

---

## Important URLs

| Purpose              | URL                                                                    |
| -------------------- | ---------------------------------------------------------------------- |
| Sign up / Dashboard  | [agents.bananacrystal.com](https://agents.bananacrystal.com)           |
| Documentation        | [agents.bananacrystal.com/docs](https://agents.bananacrystal.com/docs) |
| Live MCP endpoint    | `https://agentic.bananacrystal.com/mcp`                                |
| Sandbox MCP endpoint | `https://agentic.bananacrystal.com/mcp/sandbox`                        |

---

## Next Steps

- Read the full [README](README.md) for all 40 tools
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Check [agents.bananacrystal.com/docs](https://agents.bananacrystal.com/docs) for API documentation
