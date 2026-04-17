# BananaCrystal MCP Server

[![npm version](https://badge.fury.io/js/%40bananacrystal%2Fmcp-server.svg)](https://www.npmjs.com/package/@bananacrystal/mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Agent payment infrastructure for AI.** Give your AI agent autonomous payment capability — stablecoin transfers, multi-currency swaps, agent wallets, and fiat operations. Works with Claude, LangChain, CrewAI, AutoGPT, and any MCP-compatible framework.

Built on [Hedera](https://hedera.com) — fast, low-cost, enterprise-grade.

---

## What Your Agent Can Do

Once configured, your AI agent can:

- **Check balances** across all supported stablecoins
- **Transfer tokens** to any account, email, or username — with OTP security
- **Swap currencies** between 30+ stablecoins at live exchange rates
- **Manage fiat** — deposits and withdrawals via ACH/wire
- **Agent-to-agent payments** — one agent requests, another approves via email
- **Prediction market** — create and trade offers with escrow
- **KYC verification** — initiate and check verification status

All through natural language. No code changes needed after setup.

---

## Quick Start (5 minutes)

### 1. Install

```bash
npm install -g @bananacrystal/mcp-server
```

### 2. Get Your API Key

1. Sign up at [agents.bananacrystal.com](https://agents.bananacrystal.com)
2. Go to **Account → API Keys**
3. Create a **Sandbox key** first (starts with `bc_test_`) — free, no real money
4. When ready for production, create a **Live key**

### 3. Configure Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

**Sandbox (start here — no real money):**

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

**Live (real money):**

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

> The package auto-detects sandbox vs live from your key prefix. No URL configuration needed.

### 4. Restart Claude Desktop

Quit and reopen Claude Desktop completely.

### 5. Try It

```
Check my BananaCrystal balance
```

```
Swap 100 USDb to NGNb on BananaCrystal
```

```
Transfer 50 USDb to alice@example.com on BananaCrystal
```

---

## Sandbox vs Live

|                  | Sandbox                               | Live               |
| ---------------- | ------------------------------------- | ------------------ |
| Key prefix       | `bc_test_...`                         | No prefix          |
| Endpoint         | Auto-detected                         | Auto-detected      |
| Money            | Fake                                  | Real               |
| Starting balance | 10,000 USDb, 5M NGNb, 50K GHSb + more | Your real balance  |
| OTP on transfer  | Returned in response (no email)       | Sent to your email |
| KYC              | Always approved                       | Real verification  |
| Spend limits     | Unlimited                             | Enforced           |
| Reset balance    | `reset_sandbox_balance` tool          | N/A                |

**Always start with sandbox.** Test your full integration before switching to a live key.

---

## Supported Currencies

Every currency is a fully-backed stablecoin on Hedera. The token symbol is the ISO currency code with a `b` suffix (e.g. Nigerian Naira NGN → **NGNb**). 130+ currencies supported.

### Africa

| Currency               | Token | Hedera Token ID |
| ---------------------- | ----- | --------------- |
| Nigerian Naira         | NGNb  | 0.0.10036627    |
| Ghanaian Cedi          | GHSb  | 0.0.10036502    |
| Kenyan Shilling        | KESb  | 0.0.10036559    |
| South African Rand     | ZARb  | 0.0.10036705    |
| Egyptian Pound         | EGPb  | 0.0.10036488    |
| Ethiopian Birr         | ETBb  | 0.0.10036491    |
| Moroccan Dirham        | MADb  | 0.0.10036592    |
| Ugandan Shilling       | UGXb  | 0.0.10060747    |
| Rwandan Franc          | RWFb  | 0.0.10036664    |
| Zambian Kwacha         | ZMWb  | 0.0.10036706    |
| Tunisian Dinar         | TNDb  | 0.0.10036684    |
| Angolan Kwanza         | AOAb  | 0.0.10036443    |
| Botswana Pula          | BWPb  | 0.0.10036462    |
| Burundian Franc        | BIFb  | 0.0.10036453    |
| Cape Verdean Escudo    | CVEb  | 0.0.10036479    |
| West African CFA Franc | XOFb  | 0.0.10036702    |
| Djiboutian Franc       | DJFb  | 0.0.10036482    |
| Eritrean Nakfa         | ERNb  | 0.0.10036490    |
| Gambian Dalasi         | GMDb  | 0.0.10036508    |
| Guinean Franc          | GNFb  | 0.0.10036510    |
| Lesotho Loti           | LSLb  | 0.0.10036588    |
| Liberian Dollar        | LRDb  | 0.0.10036586    |
| Libyan Dinar           | LYDb  | 0.0.10036590    |
| Malagasy Ariary        | MGAb  | 0.0.10036596    |
| Malawian Kwacha        | MWKb  | 0.0.10036614    |
| Mauritanian Ouguiya    | MRUb  | 0.0.10036607    |
| Mauritian Rupee        | MURb  | 0.0.10036609    |
| Mozambican Metical     | MZNb  | 0.0.10036623    |
| Namibian Dollar        | NADb  | 0.0.10036625    |
| São Tomé Dobra         | STNb  | 0.0.10036678    |
| Seychellois Rupee      | SCRb  | 0.0.10036669    |
| Somali Shilling        | SOSb  | 0.0.10036675    |
| Swazi Lilangeni        | SZLb  | 0.0.10036680    |

### Americas

| Currency                 | Token | Hedera Token ID |
| ------------------------ | ----- | --------------- |
| US Dollar                | USDb  | 0.0.7118026     |
| Canadian Dollar          | CADb  | 0.0.10036466    |
| Mexican Peso             | MXNb  | 0.0.10036615    |
| Brazilian Real           | BRLb  | 0.0.10036458    |
| Argentine Peso           | ARSb  | 0.0.10036444    |
| Chilean Peso             | CLPb  | 0.0.10036472    |
| Colombian Peso           | COPb  | 0.0.10036474    |
| Peruvian Sol             | PENb  | 0.0.10036643    |
| Bolivian Boliviano       | BOBb  | 0.0.10036456    |
| Costa Rican Colón        | CRCb  | 0.0.10036476    |
| Dominican Peso           | DOPb  | 0.0.10036485    |
| Guatemalan Quetzal       | GTQb  | 0.0.10036514    |
| Haitian Gourde           | HTGb  | 0.0.10036530    |
| Honduran Lempira         | HNLb  | 0.0.10036521    |
| Jamaican Dollar          | JMDb  | 0.0.10036551    |
| Nicaraguan Córdoba       | NIOb  | 0.0.10036629    |
| Paraguayan Guaraní       | PYGb  | 0.0.10036655    |
| Trinidad & Tobago Dollar | TTDb  | 0.0.10036687    |
| Guyanese Dollar          | GYDb  | 0.0.10036516    |
| Surinamese Dollar        | SRDb  | 0.0.10036676    |
| Barbadian Dollar         | BBDb  | 0.0.10036449    |
| Belize Dollar            | BZDb  | 0.0.10036465    |
| East Caribbean Dollar    | XCDb  | 0.0.10036700    |
| Bahamian Dollar          | BSDb  | 0.0.10036460    |
| Cayman Islands Dollar    | KYDb  | 0.0.10036574    |
| Cuban Peso               | CUPb  | 0.0.10036478    |

### Europe

| Currency         | Token | Hedera Token ID |
| ---------------- | ----- | --------------- |
| Euro             | EURb  | 0.0.10036492    |
| British Pound    | GBPb  | 0.0.10036498    |
| Swiss Franc      | CHFb  | 0.0.10036469    |
| Swedish Krona    | SEKb  | 0.0.10036671    |
| Norwegian Krone  | NOKb  | 0.0.10036632    |
| Danish Krone     | DKKb  | 0.0.10036484    |
| Polish Złoty     | PLNb  | 0.0.10036651    |
| Czech Koruna     | CZKb  | 0.0.10036480    |
| Hungarian Forint | HUFb  | 0.0.10036533    |
| Romanian Leu     | RONb  | 0.0.10036658    |
| Bulgarian Lev    | BGNb  | 0.0.10036451    |
| Serbian Dinar    | RSDb  | 0.0.10036661    |
| Icelandic Króna  | ISKb  | 0.0.10036549    |
| Moldovan Leu     | MDLb  | 0.0.10036594    |
| Macedonian Denar | MKDb  | 0.0.10036598    |
| Albanian Lek     | ALLb  | 0.0.10036440    |
| Bosnian Mark     | BAMb  | 0.0.10036448    |

### Asia & Pacific

| Currency               | Token | Hedera Token ID |
| ---------------------- | ----- | --------------- |
| Indian Rupee           | INRb  | 0.0.10036542    |
| Japanese Yen           | JPYb  | 0.0.10036557    |
| Chinese Yuan           | CNYb  | 0.0.10036473    |
| South Korean Won       | KRWb  | 0.0.10036570    |
| Singapore Dollar       | SGDb  | 0.0.10036672    |
| Hong Kong Dollar       | HKDb  | 0.0.10036518    |
| Malaysian Ringgit      | MYRb  | 0.0.10036621    |
| Thai Baht              | THBb  | 0.0.10036681    |
| Indonesian Rupiah      | IDRb  | 0.0.10036536    |
| Philippine Peso        | PHPb  | 0.0.10036648    |
| Vietnamese Đồng        | VNDb  | 0.0.10036696    |
| New Taiwan Dollar      | TWDb  | 0.0.10036688    |
| Pakistani Rupee        | PKRb  | 0.0.10036649    |
| Bangladeshi Taka       | BDTb  | 0.0.10036450    |
| Sri Lankan Rupee       | LKRb  | 0.0.10036584    |
| Nepalese Rupee         | NPRb  | 0.0.10036634    |
| Kazakhstani Tenge      | KZTb  | 0.0.10036576    |
| Uzbekistani Som        | UZSb  | 0.0.10036694    |
| Kyrgyzstani Som        | KGSb  | 0.0.10036562    |
| Tajikistani Somoni     | TJSb  | 0.0.10036682    |
| Turkmenistan Manat     | TMTb  | 0.0.10036683    |
| Armenian Dram          | AMDb  | 0.0.10036441    |
| Azerbaijani Manat      | AZNb  | 0.0.10036447    |
| Georgian Lari          | GELb  | 0.0.10036500    |
| Mongolian Tögrög       | MNTb  | 0.0.10036602    |
| Cambodian Riel         | KHRb  | 0.0.10036564    |
| Lao Kip                | LAKb  | 0.0.10036578    |
| Maldivian Rufiyaa      | MVRb  | 0.0.10036611    |
| Bhutanese Ngultrum     | BTNb  | 0.0.10036461    |
| Brunei Dollar          | BNDb  | 0.0.10036455    |
| Afghan Afghani         | AFNb  | 0.0.10036438    |
| Australian Dollar      | AUDb  | 0.0.10036445    |
| New Zealand Dollar     | NZDb  | 0.0.10036636    |
| Papua New Guinean Kina | PGKb  | 0.0.10036645    |
| Fijian Dollar          | FJDb  | 0.0.10036494    |
| Samoan Tala            | WSTb  | 0.0.10036698    |
| Tongan Paʻanga         | TOPb  | 0.0.10036685    |
| Vanuatu Vatu           | VUVb  | 0.0.10036697    |
| CFP Franc              | XPFb  | 0.0.10036703    |

### Middle East

| Currency        | Token | Hedera Token ID |
| --------------- | ----- | --------------- |
| UAE Dirham      | AEDb  | 0.0.10036437    |
| Saudi Riyal     | SARb  | 0.0.10036666    |
| Qatari Riyal    | QARb  | 0.0.10036657    |
| Kuwaiti Dinar   | KWDb  | 0.0.10036572    |
| Bahraini Dinar  | BHDb  | 0.0.10036452    |
| Omani Rial      | OMRb  | 0.0.10036638    |
| Jordanian Dinar | JODb  | 0.0.10036553    |
| Lebanese Pound  | LBPb  | 0.0.10036582    |
| Israeli Shekel  | ILSb  | 0.0.10036539    |
| Turkish Lira    | TRYb  | 0.0.10036686    |
| Yemeni Rial     | YERb  | 0.0.10036704    |
| Syrian Pound    | SYPb  | 0.0.10036679    |

> Use `list_available_tokens` to get the live list with current token IDs and exchange rates.

---

## Fee Structure

| Operation            | Fee                        |
| -------------------- | -------------------------- |
| Token transfer       | 0.3% of transfer amount    |
| Currency swap        | 0.5% of swap amount        |
| Fiat deposit         | Varies by rail (ACH, wire) |
| Fiat withdrawal      | Varies by rail             |
| Balance check        | Free                       |
| Exchange rate lookup | Free                       |

Fees are charged by the network and deducted automatically. No hidden fees.

---

## All 40 Tools

### Utility

| Tool              | Description                    |
| ----------------- | ------------------------------ |
| `ping`            | Health check                   |
| `get_server_info` | Server version and environment |
| `echo`            | Echo a message back            |

### Account & Profile

| Tool                      | Description                                |
| ------------------------- | ------------------------------------------ |
| `get_my_profile`          | Your profile, wallets, and MCP key info    |
| `get_balances`            | Token balances (all or specific token)     |
| `get_transaction_history` | Paginated transaction history with filters |
| `get_my_limits`           | API key limits and current usage           |

### Transfers

| Tool                   | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| `request_transfer_otp` | Step 1 — request OTP code (sent to email, or returned directly in sandbox) |
| `transfer_tokens`      | Step 2 — execute transfer with OTP                                         |

### Swaps

| Tool                        | Description                           |
| --------------------------- | ------------------------------------- |
| `swap_currency`             | Swap between any two supported tokens |
| `estimate_swap_fees`        | Estimate fees before swapping         |
| `get_exchange_rate`         | Live buy/sell rates for a currency    |
| `list_supported_currencies` | All supported currencies with fees    |
| `list_available_tokens`     | All Hedera token IDs                  |

### Fiat (KYC required)

| Tool                    | Description                         |
| ----------------------- | ----------------------------------- |
| `initiate_deposit`      | Deposit via ACH or wire             |
| `request_withdrawal`    | Withdraw to bank account            |
| `get_deposit_status`    | Check deposit status by transfer ID |
| `get_withdrawal_status` | Check withdrawal requests           |
| `initiate_kyc`          | Start KYC verification              |
| `get_kyc_status`        | Check KYC verification status       |

### Settings

| Tool                       | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `update_my_agent_settings` | Toggle approval requirements and set webhook URL |

### Agent-to-Agent Payments

| Tool                           | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `request_agent_transaction`    | Request a transaction from another user's agent |
| `check_approval_status`        | Poll approval status                            |
| `execute_approved_transaction` | Execute after approval                          |
| `get_agent_config`             | Check if another user supports agent requests   |

### Prediction Market

| Tool                  | Description                       |
| --------------------- | --------------------------------- |
| `list_offers`         | Browse active offers              |
| `get_offer`           | Get offer details                 |
| `get_my_offers`       | Your offers                       |
| `create_offer`        | Create a new offer                |
| `update_offer`        | Edit an offer (before any trades) |
| `delist_offer`        | Remove offer from marketplace     |
| `delete_offer`        | Permanently delete offer          |
| `list_trades`         | Browse all trades                 |
| `get_trade`           | Get trade details                 |
| `get_my_trades`       | Your trades                       |
| `engage_offer`        | Trade against an offer            |
| `cancel_trade`        | Cancel an active trade            |
| `get_escrow_balances` | Escrow balance breakdown          |
| `get_escrow_history`  | Full escrow transaction history   |

### Sandbox Only

| Tool                    | Description                     |
| ----------------------- | ------------------------------- |
| `reset_sandbox_balance` | Reset fake balances to defaults |

---

## Usage Examples

### Check Balance

```
You: What's my BananaCrystal balance?

Claude: You have:
  • 10,000.00 USDb
  • 5,000,000.00 NGNb
  • 50,000.00 GHSb
```

### Transfer Tokens

```
You: Send 100 USDb to alice@example.com on BananaCrystal

Claude: I'll transfer 100 USDb to alice@example.com.
        Requesting OTP verification...
        [OTP sent to your email]

You: The code is 847291

Claude: Transfer complete! 100 USDb sent to alice@example.com.
        Transaction ID: 0x7f3a...
```

### Swap Currencies

```
You: Swap 50 USDb to NGNb on BananaCrystal

Claude: Current rate: 1 USD = 1,612 NGN
        You'll receive approximately 80,600 NGNb (after 0.5% fee)
        Executing swap...
        Done! Swapped 50 USDb → 80,197.00 NGNb
```

### Agent-to-Agent Payment

```
You: Request 200 USDb from bob@example.com for the project invoice

Claude: Sent approval request to Bob.
        He'll receive an email to approve or reject.
        Approval ID: d7f50bd2-...
        [Approval links never expire — Bob can approve anytime]
```

### LangChain Integration

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
    # Use tools with any LangChain agent
```

### CrewAI Integration

```python
from crewai import Agent
from crewai_tools import MCPServerAdapter

mcp_server = MCPServerAdapter({
    "command": "bananacrystal-mcp",
    "env": {"BANANACRYSTAL_API_KEY": "bc_test_your_key"},
})

payment_agent = Agent(
    role="Payment Manager",
    goal="Handle all payment operations",
    tools=mcp_server.tools,
)
```

---

## Security

### API Key Security

- Never commit API keys to version control
- Use environment variables — never hardcode
- Rotate keys regularly in your BananaCrystal dashboard
- Revoke unused keys immediately

### Transaction Security

- **OTP verification** on all transfers (email code required by default)
- **Email approval** for agent-to-agent transactions (on by default)
- **Spend limits** enforced server-side — set per-transaction, daily, and monthly caps
- **Rate limiting** on all operations
- **Idempotency** — duplicate requests are safely deduplicated

### What This Package Does NOT Have Access To

- Your private keys (managed by BananaCrystal's secure infrastructure)
- Other users' data
- Internal business logic

This package is a thin client. All security, validation, and business logic runs server-side at BananaCrystal.

---

## Configuration

### Environment Variables

| Variable                | Required | Default                | Description                              |
| ----------------------- | -------- | ---------------------- | ---------------------------------------- |
| `BANANACRYSTAL_API_KEY` | Yes      | —                      | Your API key (`bc_test_...` for sandbox) |
| `BANANACRYSTAL_API_URL` | No       | Auto-detected from key | Override the MCP endpoint URL            |
| `DEBUG`                 | No       | `false`                | Set to `true` for verbose logging        |

### Debug Mode

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "bananacrystal-mcp",
      "env": {
        "BANANACRYSTAL_API_KEY": "your_key_here",
        "DEBUG": "true"
      }
    }
  }
}
```

---

## Troubleshooting

### "API key invalid"

- Verify the key is copied correctly (no extra spaces)
- Check it hasn't been revoked at [agents.bananacrystal.com](https://agents.bananacrystal.com)
- Sandbox keys start with `bc_test_`, live keys have no prefix

### "Rate limit exceeded"

- Wait for the retry-after period shown in the error
- Contact support to increase your limits

### MCP server not showing in Claude

1. Verify the JSON config is valid (use a JSON validator)
2. Quit Claude Desktop completely (not just close the window)
3. Reopen Claude Desktop
4. Check Claude's MCP logs: **Help → Enable MCP Logging**

### "Insufficient balance" in sandbox

- Use the `reset_sandbox_balance` tool to restore default balances
- Or ask Claude: "Reset my BananaCrystal sandbox balance"

### Connection errors

- Check your internet connection
- Verify the API key is set correctly
- Try `DEBUG=true` to see detailed logs

---

## For Contributors: Local Development

### Setup

```bash
git clone https://github.com/bananacrystal/mcp-server.git
cd mcp-server
npm install
```

### Run with Mock Server (no API key needed)

```bash
# Terminal 1 — start mock server
npm run mock

# Terminal 2 — configure Claude to use mock
```

Add to Claude Desktop config:

```json
{
  "mcpServers": {
    "bananacrystal": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "BANANACRYSTAL_API_KEY": "test_key",
        "BANANACRYSTAL_API_URL": "http://localhost:3000"
      }
    }
  }
}
```

### Build

```bash
npm run build
```

### Test with MCP Inspector

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

Set `BANANACRYSTAL_API_KEY` to your sandbox key in the inspector environment.

---

## FAQ

**Q: Do I need to know blockchain to use this?**
No. You interact through natural language with your AI agent. BananaCrystal handles all the blockchain complexity.

**Q: What is a stablecoin?**
A stablecoin is a digital currency pegged to a real-world currency. USDb is always worth 1 USD. NGNb is always worth 1 Nigerian Naira. They live on Hedera blockchain for fast, cheap transfers.

**Q: Is this safe to use with real money?**
Yes. All transactions require OTP verification by default. Agent-to-agent transactions require email approval. Spend limits are enforced server-side. Start with sandbox to test before going live.

**Q: Can I disable OTP for automated workflows?**
Yes. You can disable OTP per API key for fully autonomous transfer flows. Use `update_my_agent_settings` with `require_otp: false`. Only do this for trusted, controlled environments.

**Q: What happens if my agent makes a mistake?**
Transfers require OTP confirmation by default — your agent can't send money without you confirming. For agent-to-agent transactions, you receive an email to approve or reject. Approval links never expire.

**Q: How do I add funds to my account?**
Use the `initiate_deposit` tool (requires KYC verification) or transfer tokens from another BananaCrystal account.

**Q: What's the difference between sandbox and live?**
Sandbox uses fake money — perfect for testing. Live uses real money. You can switch by changing your API key. No code changes needed.

**Q: Which AI frameworks are supported?**
Any framework that supports MCP (Model Context Protocol): Claude Desktop, Cursor, Windsurf, LangChain (via `langchain-mcp-adapters`), CrewAI (via `crewai-tools`), AutoGPT, and more.

**Q: Are there transaction limits?**
Default limits: $10,000 per transaction, $50,000 per day, $500,000 per month. Contact support to increase limits.

**Q: How fast are transactions?**
Hedera finalizes transactions in 3-5 seconds. Swaps are instant. Fiat deposits/withdrawals depend on the rail (ACH: 1-3 days, wire: same day).

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Good first issues:**

- Add integration examples for new frameworks
- Improve error messages
- Add more usage examples to README
- Improve TypeScript types

---

## Support & Links

- **Documentation:** [agents.bananacrystal.com/docs](https://agents.bananacrystal.com/docs)
- **Sign up:** [agents.bananacrystal.com](https://agents.bananacrystal.com)
- **Issues:** [GitHub Issues](https://github.com/bananacrystal/mcp-server/issues)
- **Email:** support@bananacrystal.com

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

_Built by the BananaCrystal team. Powering the agent economy._
