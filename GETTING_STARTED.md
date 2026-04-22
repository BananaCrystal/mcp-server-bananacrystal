# Getting Started with BananaCrystal MCP Server

## 🚀 Quick Setup (5 minutes)

### 1. Install the Package

```bash
npm install -g @bananacrystal/mcp-server
```

### 2. Get Your API Key

1. Visit [agents.bananacrystal.com](https://agents.bananacrystal.com)
2. Sign up or log in
3. Go to **Account** → **API Keys**
4. Click **Create New Key**
5. **Start with a Sandbox key** — it has fake money, zero risk, and full functionality. Sandbox keys start with `bc_test_`. Live keys have no prefix.
6. Copy your key

> **Tip:** You can always tell sandbox from live by the `bc_test_` prefix. The package automatically routes each key to the correct endpoint.

### 3. Configure Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "bc_live_your_key_here"
      }
    }
  }
}
```

**⚠️ Note:** This connects to production with real money. Use a Sandbox key (`bc_test_...`) while testing — same config, no real money.

### 4. Restart Claude Desktop

Quit and reopen Claude Desktop completely.

### 5. Test It!

Try these commands in Claude:

```
Check my BananaCrystal balance
```

```
Show my recent BananaCrystal transactions
```

```
What tokens are supported on BananaCrystal?
```

> **Sandbox tip:** If you used a `bc_test_` key, your account comes pre-seeded with 10,000 USDb, 5,000,000 NGNb, and more. OTP codes are returned directly in the response — no email needed. Reset balances anytime by asking Claude: _"Reset my BananaCrystal sandbox balance"_.

---

## 🧪 For Developers: Testing Without Production

If you're contributing to the package, use the **mock server**:

### 1. Clone and Setup

```bash
git clone https://github.com/bananacrystal/mcp-server.git
cd mcp-server
npm install
```

### 2. Start Mock Server

```bash
npm run mock
```

You'll see:

```
🍌 BananaCrystal Mock API Server
================================
Server running at: http://localhost:3001
```

### 3. Configure Claude for Mock

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "bc_mock_test",
        "BANANACRYSTAL_API_URL": "http://localhost:3001"
      }
    }
  }
}
```

### 4. Test with Fake Data

Now all API calls go to your local mock server with fake responses. Perfect for development!

---

## 📍 Important URLs

| Purpose             | URL                                                          |
| ------------------- | ------------------------------------------------------------ |
| **Sign Up / Login** | [agents.bananacrystal.com](https://agents.bananacrystal.com) |
| **Production API**  | `https://agentic.bananacrystal.com/mcp` (default)            |
| **Mock Server**     | `http://localhost:3001` (for developers)                     |
| **Documentation**   | [GitHub README](README.md)                                   |

---

## 🎯 What You Can Do

### 💰 Balance & Account

- Check balances for all tokens
- View specific token balances
- Get your profile information

### 💸 Transfers

- Transfer tokens to Hedera accounts
- Transfer by email or username
- OTP verification for security

### 🔄 Swaps

- Swap between any supported tokens
- Get exchange rates
- Estimate fees before swapping

### 📊 History & Info

- View transaction history
- Filter by type and direction
- Check API limits and usage

### 🤖 Agent-to-Agent

- Request transactions from other users
- Email approval workflow
- Secure execution

---

## 💡 Example Conversations

### Check Balance

**You:** "What's my USDb balance on BananaCrystal?"  
**Claude:** "You have 1,250.00 USDb"

### Transfer Tokens

**You:** "Send 100 USDb to [email@example.com] on BananaCrystal"  
**Claude:** "I'll request an OTP code..."  
_(You receive email, provide code, transfer completes)_

### Swap Currency

**You:** "Swap 50 USDb to NGNb on BananaCrystal"  
**Claude:** "Done! You swapped 50 USDb for 79,000 NGNb"

### View History

**You:** "Show my last 5 BananaCrystal transactions"  
**Claude:** _(Lists your recent transactions)_

---

## 🔧 Troubleshooting

### API Key Issues

- ✅ Key starts with `bc_`
- ✅ No extra spaces in config
- ✅ Key not revoked at [agents.bananacrystal.com](https://agents.bananacrystal.com)

### MCP Server Not Showing

- ✅ Valid JSON in config file
- ✅ Claude Desktop fully restarted
- ✅ Check Claude's logs

### Connection Errors

- ✅ Internet connection working
- ✅ API URL correct (or use default)
- ✅ Try mock server for development

---

## 📚 Next Steps

1. **Read Full Docs:** [README.md](README.md)
2. **Quick Start Guide:** [QUICKSTART.md](QUICKSTART.md)
3. **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Get Help:** support@bananacrystal.com

---

## 🎉 You're Ready!

Start using BananaCrystal with Claude naturally. Just talk to Claude about what you want to do, and it will use the MCP server to interact with BananaCrystal for you.

**Happy building!** 🚀
