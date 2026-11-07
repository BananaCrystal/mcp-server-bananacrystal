# BananaCrystal MCP Server

**Give your AI agent a wallet: live FX rates, swaps and payments in 140+ local currencies.**

One hosted MCP endpoint. 40 tools. Free sandbox. Settles on Hedera in under 5 seconds.

```
https://agentic.bananacrystal.com/mcp
```

[Docs](https://agents.bananacrystal.com/docs/mcp) · [Get a free sandbox key](https://agents.bananacrystal.com/account) · [API reference](https://agents.bananacrystal.com/docs/api) · [Security policy](SECURITY.md)

---

## What this is

BananaCrystal is a hosted MCP server that gives an AI agent a wallet it can actually spend from. The agent can check balances, get a live exchange rate, swap between 140+ local-currency stablecoins, send money to another user, and move funds in and out of fiat, all through standard MCP tool calls. Limits are enforced on our side, so the agent never holds a private key and can never spend past the cap you set.

This repository holds the configuration files for connecting an MCP client to the hosted server. There is nothing to install or run locally. The server itself is hosted and maintained by BananaCrystal.

## Connect in five minutes

1. Create a free account at [agents.bananacrystal.com/account](https://agents.bananacrystal.com/account) and copy a sandbox key. Sandbox keys start with `bc_test_` and come with test balances, so nothing real moves.
2. Add the server to your MCP client.
3. Ask your agent: *"What is my USDb balance?"*

### Claude Desktop, Claude Code, Cursor, Windsurf, VS Code

Add this to your client's MCP config (`claude_desktop_config.json`, `~/.cursor/mcp.json`, `.vscode/mcp.json`, or the equivalent):

```json
{
  "mcpServers": {
    "bananacrystal": {
      "url": "https://agentic.bananacrystal.com/mcp",
      "headers": {
        "x-api-key": "bc_test_your_key"
      }
    }
  }
}
```

Clients that do not yet accept a `url` entry directly (older Claude Desktop builds) can use `mcp-remote`:

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://agentic.bananacrystal.com/mcp",
        "--header", "x-api-key:${BANANACRYSTAL_API_KEY}"
      ],
      "env": { "BANANACRYSTAL_API_KEY": "bc_test_your_key" }
    }
  }
}
```

### Claude Code (one line)

```bash
claude mcp add --transport http bananacrystal https://agentic.bananacrystal.com/mcp --header "x-api-key: bc_test_your_key"
```

### Gemini CLI

```bash
gemini extensions install https://github.com/BananaCrystal/mcp-server-bananacrystal
export BANANACRYSTAL_API_KEY=bc_test_your_key
```

### ChatGPT, Claude.ai connectors, and OAuth clients

Add `https://agentic.bananacrystal.com/mcp` as a custom connector or remote MCP server. Leave the API key empty and the client will walk you through OAuth 2.0 sign-in. The server advertises its authorization server at `/.well-known/oauth-protected-resource`.

### Any language, no SDK

The server speaks Streamable HTTP, so any MCP client library works. The only thing you need is the URL and a key.

```bash
curl -s https://agentic.bananacrystal.com/mcp \
  -H "content-type: application/json" \
  -H "x-api-key: bc_test_your_key" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## What your agent can do

| Group | Tools | Fee |
|---|---|---|
| Read-only | `get_balances`, `get_exchange_rate`, `get_transaction_history`, `get_my_limits`, `estimate_swap_fees` and 19 more | Free |
| Transfer | `request_transfer_otp`, `transfer_tokens` | 0.3% |
| Swap | `swap_currency` across 140+ local-currency stablecoins | 0.5% |
| Fiat | `initiate_kyc`, `initiate_deposit`, `request_withdrawal` | Partner rate shown before you confirm |
| Offers and trades | `create_offer`, `update_offer`, `engage_offer`, `cancel_trade` and 2 more | Free to list |
| Agent to agent | `request_agent_transaction`, `execute_approved_transaction` and 1 more | 0.3% |

The full list with input schemas is at [agents.bananacrystal.com/docs/mcp](https://agents.bananacrystal.com/docs/mcp). Every tool also returns its schema through `tools/list`.

### Example: pay an invoice in rupiah

```
User:  Pay Putri's invoice: Rp 1,500,000 from my USD balance.

Agent: get_exchange_rate(USD, IDR)           -> 1 USD = 16,360 IDR
       swap_currency(91.69 USDb -> IDRb)      -> 1,500,000 IDRb, fee 0.5%
       request_transfer_otp()                 -> code sent to your email
       [you enter the 6-digit code]
       transfer_tokens(1,500,000 IDRb, @putri) -> settled in 3.4s

       Paid. Total cost $0.73. Receipt saved.
```

## Guardrails

Everything that limits spending lives on the server, not in the agent's prompt.

- **Scoped API keys.** Each key gets only the scopes it needs: `read`, `transfer`, `swap`, `fiat`. A read-only key cannot move money, whatever the prompt says.
- **Per-transaction maximum and rolling 24-hour cap**, set per key in your account and enforced server-side. A runaway loop stops at the number you chose.
- **Email one-time code on transfers, swaps and withdrawals, on by default.** The agent can request the code; only you can supply it.
- **Idempotent requests.** Retrying a call never pays twice.
- **Sandbox is a separate environment.** `bc_test_` keys never touch real balances.

## Pricing

Reads are free. Transfers cost 0.3% and swaps 0.5%, charged in the currency you send. There is no monthly fee, no minimum and no per-call charge. Fiat deposits and withdrawals carry the partner's rate, which the agent sees before it confirms.

## Sandbox and production

| | Sandbox | Production |
|---|---|---|
| Key format | `bc_test_` prefix | 64 hex characters, no prefix |
| Balances | Test funds, reset on request | Real |
| KYC | Not required | Required before fiat tools |
| Rate limit | Returned by `get_my_limits` | Returned by `get_my_limits` |

## About BananaCrystal

BananaCrystal is a registered money services business in the United States (FinCEN) and Canada (FINTRAC). Stablecoins are issued on Hedera and each local-currency token is backed one to one by the deposits that minted it. Learn more at [bananacrystal.com](https://www.bananacrystal.com).

## Support and security

- Questions and integration help: [support@bananacrystal.com](mailto:support@bananacrystal.com)
- Security reports: [security@bananacrystal.com](mailto:security@bananacrystal.com). Please read [SECURITY.md](SECURITY.md) before reporting.
- Privacy policy: [bananacrystal.com/privacy](https://www.bananacrystal.com/privacy/)

## License

The configuration files in this repository are released under the MIT License. Use of the hosted server is governed by the [BananaCrystal Terms and Conditions](https://www.bananacrystal.com/terms/).
