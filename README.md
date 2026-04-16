# BananaCrystal MCP Server

[![npm version](https://badge.fury.io/js/%40bananacrystal%2Fmcp-server.svg)](https://www.npmjs.com/package/@bananacrystal/mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP (Model Context Protocol) server for BananaCrystal - enables AI agents like Claude to interact with BananaCrystal's payment infrastructure on Hedera.

## What is This?

This package allows AI agents (like Claude Desktop, Cursor, Windsurf) to:

- Check your crypto balances
- Transfer tokens on Hedera
- Swap between currencies
- View transaction history
- Manage agent-to-agent transactions
- And more!

All through natural language conversations with your AI assistant.

## Quick Start

### 1. Install

```bash
npm install -g @bananacrystal/mcp-server
```

### 2. Get API Key

1. Sign up at [agents.bananacrystal.com](https://agents.bananacrystal.com)
2. Go to Account → API Keys
3. Create a new MCP API key
4. Copy the key (starts with `bc_`)

### 3. Configure Claude Desktop

Edit your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:

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

### 4. Restart Claude Desktop

Restart Claude Desktop to load the MCP server.

### 5. Try It Out!

Ask Claude:

- "Check my BananaCrystal balance"
- "Transfer 100 USDC to 0.0.12345 on BananaCrystal"
- "Swap 50 USD to NGN on BananaCrystal"
- "Show my recent BananaCrystal transactions"

## Features

### 💰 Balance Management

- Check balances for all tokens
- View specific token balances
- Real-time balance updates

### 💸 Transfers

- Transfer tokens to Hedera accounts
- Transfer by email or username
- OTP verification for security

### 🔄 Currency Swaps

- Swap between any supported tokens
- Automatic exchange rate calculation
- Fee estimation before swapping

### 📊 Transaction History

- View all transactions
- Filter by type (transfer/swap)
- Filter by direction (incoming/outgoing)
- Paginated results

### 🤖 Agent-to-Agent Transactions

- Request transactions from other users
- Email approval workflow
- Secure execution tokens
- Never-expiring approval links

### ⚙️ Settings & Limits

- View API key limits
- Check current usage
- Configure agent approval settings
- Set webhook callbacks

## Available Tools

The MCP server provides these tools to AI agents:

| Tool                           | Description                           |
| ------------------------------ | ------------------------------------- |
| `get_my_profile`               | Get your profile and wallet info      |
| `get_balances`                 | Check token balances                  |
| `request_transfer_otp`         | Request OTP for transfer              |
| `transfer_tokens`              | Execute token transfer                |
| `swap_currency`                | Swap between currencies               |
| `estimate_swap_fees`           | Estimate swap fees                    |
| `get_exchange_rate`            | Get current exchange rates            |
| `list_supported_currencies`    | List all supported tokens             |
| `get_transaction_history`      | View transaction history              |
| `get_my_limits`                | Check API limits and usage            |
| `update_my_agent_settings`     | Configure agent settings              |
| `request_agent_transaction`    | Request transaction from another user |
| `check_approval_status`        | Check approval status                 |
| `execute_approved_transaction` | Execute approved transaction          |
| `get_agent_config`             | Look up another user's config         |

## Configuration

### Environment Variables

| Variable                | Required | Description                                              |
| ----------------------- | -------- | -------------------------------------------------------- |
| `BANANACRYSTAL_API_KEY` | Yes      | Your BananaCrystal API key                               |
| `BANANACRYSTAL_API_URL` | No       | API URL (default: https://agentic.bananacrystal.com/mcp) |
| `DEBUG`                 | No       | Enable debug logging (set to `true`)                     |

### For Developers: Testing with Mock Server

If you're contributing to this package, you can test locally without a real API key:

```bash
# Clone the repo
git clone https://github.com/bananacrystal/mcp-server.git
cd mcp-server

# Install and start mock server
npm install
npm run mock
```

Then configure Claude to use the mock server:

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "test_key",
        "BANANACRYSTAL_API_URL": "http://localhost:3000"
      }
    }
  }
}
```

The mock server returns realistic fake data so you can develop and test without affecting production.
| `BANANACRYSTAL_API_URL` | No | API URL (default: https://agentic.bananacrystal.com/mcp) |
| `DEBUG` | No | Enable debug logging (set to `true`) |

### Example with Debug Logging

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "bc_live_your_key_here",
        "DEBUG": "true"
      }
    }
  }
}
```

## Usage Examples

### Check Balance

**You:** "Check my BananaCrystal balance"

**Claude:** "You have:

- 1,000.00 USDC
- 50,000.00 NGN
- 100.00 USD"

### Transfer Tokens

**You:** "Transfer 100 USDC to alice@example.com on BananaCrystal"

**Claude:** "I'll help you transfer 100 USDC. First, I need to request an OTP code..."
_(Requests OTP, you receive email, provide code, transfer executes)_

### Swap Currency

**You:** "Swap 50 USD to NGN on BananaCrystal"

**Claude:** "I'll swap 50 USD to NGN for you..."
_(Executes swap, shows result)_

### Agent-to-Agent Transaction

**You:** "Request 100 USD from bob@example.com on BananaCrystal for the dinner bill"

**Claude:** "I've sent an approval request to Bob. He'll receive an email to approve the transaction..."

## Security

### API Key Security

- Never commit API keys to version control
- Use environment variables for configuration
- Rotate keys regularly
- Revoke unused keys

### Transaction Security

- OTP verification for transfers
- Email approval for agent-to-agent transactions
- Spend limits enforced server-side
- Rate limiting on all operations

### What This Package Does NOT Have Access To

- Your private keys (managed by BananaCrystal)
- Your database
- Other users' data
- Internal business logic

This MCP server is just a thin client that makes HTTP requests to BananaCrystal's API. All security, validation, and business logic happens server-side.

## Troubleshooting

### "API key invalid" Error

**Cause:** API key is missing, incorrect, or revoked

**Solution:**

1. Check your key starts with `bc_`
2. Verify key hasn't been revoked at [agents.bananacrystal.com](https://agents.bananacrystal.com)
3. Ensure key has required scopes
4. Check for typos in config file

### "Rate limit exceeded" Error

**Cause:** Too many requests in a short time

**Solution:**

- Wait for the retry-after period (shown in error)
- Reduce request frequency
- Contact support to increase limits

### MCP Server Not Showing in Claude

**Cause:** Configuration error or Claude not restarted

**Solution:**

1. Check config file syntax (valid JSON)
2. Verify file path is correct
3. Restart Claude Desktop completely
4. Check Claude's MCP logs for errors

### Connection Errors

**Cause:** Network issues or API downtime

**Solution:**

- Check your internet connection
- Verify API URL is correct
- Check BananaCrystal status page
- Try again in a few moments

## Development

### Running Locally

```bash
# Clone the repo
git clone https://github.com/bananacrystal/mcp-server.git
cd mcp-server

# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev
```

### Testing

```bash
# Set your API key
export BANANACRYSTAL_API_KEY=bc_test_your_key_here

# Run the server
npm run dev

# In another terminal, test with MCP Inspector
npx @modelcontextprotocol/inspector node dist/index.js
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas for Contribution

- Bug fixes
- Documentation improvements
- New examples
- Platform support (Windows, Linux)
- Integration guides
- Performance optimizations
- Test coverage

## Support

- **Documentation**: [docs.bananacrystal.com](https://docs.bananacrystal.com)
- **Issues**: [GitHub Issues](https://github.com/bananacrystal/mcp-server/issues)
- **Discord**: [Join our community](https://discord.gg/bananacrystal)
- **Email**: support@bananacrystal.com

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- [BananaCrystal Website](https://bananacrystal.com)
- [API Documentation](https://docs.bananacrystal.com)
- [MCP Protocol](https://modelcontextprotocol.io)
- [Hedera Network](https://hedera.com)

---

Built with ❤️ by the BananaCrystal team
