<!--
  SEO/GEO/AEO METADATA
  Primary:  agent payment infrastructure · autonomous payments · AI-native finance
  Secondary: agent wallet · agent economy · MCP payments · LangChain payments
  Tertiary:  stablecoin payments · Hedera MCP · autonomous payment network · AI agent wallet
-->

<div align="center">

<img src="https://www.bananacrystal.com/wp-content/uploads/2024/02/bananacrystal-logo.png" alt="BananaCrystal" height="60"/>

# Agent Payment Infrastructure

### The MCP Server That Gives AI Agents a Wallet

_One endpoint. Every payment capability. The financial primitive of the agent economy._

<br/>

[![Get API Key](https://img.shields.io/badge/Get%20Free%20API%20Key-agents.bananacrystal.com-F5821F?style=for-the-badge)](https://agents.bananacrystal.com/account)
[![npm](https://img.shields.io/npm/v/@bananacrystal/mcp-server?style=for-the-badge&color=5B63A4)](https://www.npmjs.com/package/@bananacrystal/mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Hedera](https://img.shields.io/badge/Settled%20on-Hedera%20%3C5s-6b48ff?style=for-the-badge)](https://hedera.com)
[![MCP](https://img.shields.io/badge/MCP-Compatible-0ea5e9?style=for-the-badge)](https://modelcontextprotocol.io)

<br/>

**Works with Claude · LangChain · CrewAI · AutoGPT · Cursor · Windsurf · Any MCP client**

<br/>

> _"The agent economy is forming now. Developers who integrate payment rails first_
> _will define how AI agents transact. This is that infrastructure."_

<br/>

---

**If this project helps you build payment-capable agents, please star the repo on [GitHub](https://github.com/BananaCrystal/mcp-server-bananacrystal) — it helps other developers find it.**

[![Star on GitHub](https://img.shields.io/github/stars/BananaCrystal/mcp-server-bananacrystal?style=social)](https://github.com/BananaCrystal/mcp-server-bananacrystal)

> **How to star:** Open the repo, then click the ⭐ **Star** button in the top-right corner (free GitHub account required).

---

</div>

<br/>

## What this is

**BananaCrystal** provides **agent payment infrastructure** — the missing financial layer of the AI agent stack.

Traditional payment rails (banks, card networks, legacy APIs) were built for humans: human identity, human authorization, human operating hours. When AI agents try to use them they fail architecturally — fixed fees that make micropayments economically impossible, KYC requirements agents cannot satisfy, 3–5 day settlement windows that break autonomous workflows.

This MCP server is the alternative. **One configuration line gives any AI agent:**

- An **agent wallet** with a real stablecoin balance
- **Autonomous payment authority** within operator-defined spending limits
- **150+ currencies** — USDb, EURb, NGNb, GBPb, CADb and more
- **On-chain settlement in under 5 seconds** on Hedera
- An **immutable audit trail** every agent action is written to

This is not a product feature. This is a new category: **autonomous payments** — the financial primitive of the agent economy, built for machines from first principles.

<br/>

---

## Why AI agents need their own payment rails

|                         | Traditional rails                     | BananaCrystal                                     |
| ----------------------- | ------------------------------------- | ------------------------------------------------- |
| **Fee per transaction** | $0.30 + 2.9% (Stripe) · $15–35 (wire) | **0.3% transfers · 0.5% swaps · free for reads**  |
| **Settlement speed**    | 1–5 business days                     | **Under 5 seconds, absolute finality**            |
| **Identity model**      | Human KYC required                    | **Agent ID — programmatic**                       |
| **Authorization**       | Human approval per transaction        | **Programmatic policy — autonomous**              |
| **Operating hours**     | Banking hours, weekdays               | **24/7/365**                                      |
| **Micropayments**       | Impossible at $0.30/tx                | **Native — sub-cent viable**                      |
| **Spending controls**   | Card limit only                       | **Per-tx caps, daily limits, allowlists, scopes** |
| **Audit trail**         | Monthly statements                    | **Immutable on-chain, machine-readable**          |

> 1,000 transactions/day on Stripe: **$109,500/year** in fees alone.
> 1,000 transactions/day on BananaCrystal: **$365/year**.
> The agent economy runs on micropayments. The infrastructure fee must be microscopic — or the economics collapse entirely.

<br/>

---

## Quick start — working agent in 5 minutes

**Step 1 — Install**

```bash
npm install -g @bananacrystal/mcp-server
```

**Step 2 — Get a free API key**

Sign up at **[agents.bananacrystal.com](https://agents.bananacrystal.com)** → **[Account → API Keys](https://agents.bananacrystal.com/account)** → Create MCP key.


**Fees:** Transfers: 0.3% of amount · Swaps: 0.5% of amount · Read-only operations (balances, history, rates): free.

> **Start with a Sandbox key** — fake money, zero risk, full functionality. Sandbox keys start with `bc_test_` so you can always tell them apart from live keys. Switch to a Live key (no prefix) when ready.

**Step 3 — Pick your agent framework**

<details>
<summary><b>Sandbox mode — test without real money</b></summary>

Create a **Sandbox key** at **[agents.bananacrystal.com/account](https://agents.bananacrystal.com/account)** → API Keys → Create Sandbox Key.

Sandbox keys start with `bc_test_` — this prefix is how you (and the package) know it's a test key with no real money. Live keys have no prefix. The package automatically routes each key to the correct endpoint.

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

**Sandbox behaviour:**

- Pre-seeded balances: 10,000 USDb · 5,000,000 NGNb · 50,000 GHSb · 1,000,000 KESb · 150,000 ZARb
- OTP codes returned directly in the API response — no email sent
- KYC always approved
- Spend limits unlimited
- Reset balances anytime with the `reset_sandbox_balance` tool

Switch to a live key when you're ready. Same tools, same config, real money.

</details>

<details>
<summary><b>Claude Desktop</b></summary>

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

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

Restart Claude Desktop. Then ask it:

```
"Check my BananaCrystal balance"
"Transfer 50 USDb to 0.0.12345 — payment for the data report"
"Swap 100 USDb to NGNb at the current rate"
"Show my last 10 transactions"
```

Your agent now has a payment wallet.

</details>

<details>
<summary><b>Cursor / Windsurf / Cline</b></summary>

Add to your IDE MCP config:

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

Your coding agent can now pay for API calls, data feeds, and compute per use.

</details>

<details>
<summary><b>LangChain (Python)</b></summary>

```python
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
import asyncio, os

async def create_payment_agent():
    client = MultiServerMCPClient({
        "bananacrystal": {
            "command": "bananacrystal-mcp",
            "env": {
                "BANANACRYSTAL_API_KEY": os.getenv("BANANACRYSTAL_API_KEY")
            },
            "transport": "stdio"
        }
    })
    tools = await client.get_tools()
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a financial operations AI agent with an
        agent wallet on BananaCrystal agent payment infrastructure.
        Always check balance before large transfers.
        Always include a memo with every payment.
        Report the transaction ID for every settled payment."""),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad")
    ])
    agent = create_openai_tools_agent(llm, tools, prompt)
    return AgentExecutor(agent=agent, tools=tools, verbose=True)

agent = asyncio.run(create_payment_agent())
result = agent.invoke({
    "input": "Check balance, then pay 12.50 USDb to vendor:data-provider-01 for today's market data report"
})
# Agent checks balance → verifies limits → requests OTP → executes transfer
# Settlement confirmed on Hedera in 3.2s · txId: 0.0.789@1711234567
```

</details>

<details>
<summary><b>CrewAI</b></summary>

```python
from crewai import Agent, Task, Crew
from langchain_mcp_adapters.client import MultiServerMCPClient
import asyncio, os

async def setup_payment_tools():
    client = MultiServerMCPClient({
        "bananacrystal": {
            "command": "bananacrystal-mcp",
            "env": {"BANANACRYSTAL_API_KEY": os.getenv("BANANACRYSTAL_API_KEY")},
            "transport": "stdio"
        }
    })
    return await client.get_tools()

payment_tools = asyncio.run(setup_payment_tools())

treasury_agent = Agent(
    role="Autonomous Treasury Manager",
    goal="Monitor stablecoin balances and execute payments within defined limits",
    backstory="""You are an AI-native finance agent on the BananaCrystal
    agent payment infrastructure. You manage a multi-currency stablecoin
    treasury, executing transfers, swaps, and vendor payments autonomously.""",
    tools=payment_tools,
    verbose=True
)

treasury_task = Task(
    description="""Check USDb balance. If above 10,000 USDb, swap 5,000 USDb
    to EURb. Then pay vendor invoice of 500 USDb to vendor:accounting-service-01.""",
    agent=treasury_agent,
    expected_output="Balance checked, swap executed, vendor paid. All transaction IDs logged."
)

result = Crew(agents=[treasury_agent], tasks=[treasury_task]).kickoff()
```

</details>

<details>
<summary><b>AutoGPT</b></summary>

```yaml
plugins:
  - name: BananaCrystal Payments
    package: "@bananacrystal/mcp-server"
    description: >
      Agent payment infrastructure — autonomous stablecoin transfers, 
      currency swaps, and fiat operations on Hedera blockchain.
    env:
      BANANACRYSTAL_API_KEY: "${BC_API_KEY}"
```

</details>

<br/>

---

## 40 production-ready payment tools

Every tool an agent needs for complete autonomous payment capability. All live. All guarded.

<details>
<summary><b>Read-only tools</b> — free, safe for any agent</summary>

| Tool                        | What it does                              |
| --------------------------- | ----------------------------------------- |
| `ping`                      | Health check                              |
| `get_server_info`           | Server version and environment            |
| `echo`                      | Echo a message                            |
| `get_my_profile`            | Your profile, wallets, and MCP key info   |
| `get_balances`              | Token balances (all or specific token)    |
| `get_exchange_rate`         | Live buy/sell rates for any currency      |
| `list_supported_currencies` | All supported stablecoins                 |
| `list_available_tokens`     | All Hedera token IDs                      |
| `get_transaction_history`   | Paginated transaction log with filters    |
| `get_my_limits`             | API key spending limits and current usage |
| `estimate_swap_fees`        | Calculate fees before swapping            |
| `get_agent_config`          | Look up another agent's payment config    |
| `check_approval_status`     | Status of a pending approval request      |
| `get_kyc_status`            | KYC verification status                   |
| `get_deposit_status`        | Fiat deposit status by transfer ID        |
| `get_withdrawal_status`     | Fiat withdrawal requests                  |
| `get_escrow_balances`       | Escrow balance breakdown                  |
| `get_escrow_history`        | Full escrow transaction history           |
| `list_offers`               | Browse prediction market offers           |
| `get_offer`                 | Single offer details                      |
| `get_my_offers`             | Your offers                               |
| `list_trades`               | Browse all trades                         |
| `get_trade`                 | Single trade details                      |
| `get_my_trades`             | Your trades                               |

</details>

<details>
<summary><b>Transfer tools</b> — require <code>transfer</code> scope · fee: 0.3% of amount</summary>

| Tool                   | What it does                                                            |
| ---------------------- | ----------------------------------------------------------------------- |
| `request_transfer_otp` | Step 1 — request OTP code (email in live, returned directly in sandbox) |
| `transfer_tokens`      | Step 2 — execute transfer with OTP                                      |

</details>

<details>
<summary><b>Swap tools</b> — require <code>swap</code> scope · fee: 0.5% of amount</summary>

| Tool            | What it does                               |
| --------------- | ------------------------------------------ |
| `swap_currency` | Swap between any two supported stablecoins |

</details>

<details>
<summary><b>Fiat tools</b> — require <code>fiat</code> scope + KYC</summary>

| Tool                 | What it does             |
| -------------------- | ------------------------ |
| `initiate_kyc`       | Start KYC verification   |
| `initiate_deposit`   | Deposit via ACH or wire  |
| `request_withdrawal` | Withdraw to bank account |

</details>

<details>
<summary><b>Offers & trades tools</b> — require <code>offers</code> scope</summary>

| Tool           | What it does                      |
| -------------- | --------------------------------- |
| `create_offer` | Create a prediction market offer  |
| `update_offer` | Edit an offer (before any trades) |
| `delist_offer` | Remove offer from marketplace     |
| `delete_offer` | Permanently delete offer          |
| `engage_offer` | Trade against an offer            |
| `cancel_trade` | Cancel an active trade            |

</details>

<details>
<summary><b>Agent-to-agent tools</b> — require <code>transfer</code> scope</summary>

| Tool                           | What it does                                    |
| ------------------------------ | ----------------------------------------------- |
| `request_agent_transaction`    | Request a transaction from another user's agent |
| `execute_approved_transaction` | Execute after approval                          |
| `update_my_agent_settings`     | Configure approval rules and webhook URL        |

</details>

<details>
<summary><b>Sandbox-only tools</b></summary>

| Tool                    | What it does                    |
| ----------------------- | ------------------------------- |
| `reset_sandbox_balance` | Reset fake balances to defaults |

</details>

<br/>

---

## Real-world agent economy use cases

<details>
<summary><b>Autonomous treasury management</b></summary>

```
Task:    "Monitor USDb balance. If above 50,000, swap 20% to EURb."

Flow:    get_balances → check threshold → estimate_swap_fees
         → swap_currency → audit log written to Hedera

Result:  Rebalanced $42,000 in 4.2 seconds.
         Human involvement: zero.
         Fee: 0.5% of swap amount.
```

</details>

<details>
<summary><b>AI customer service refunds</b></summary>

```
Task:    "Process refund for order #84921. Customer verified. Amount: 45.00 USDb."

Flow:    Verify eligibility → transfer_tokens → settlement confirmed

Result:  Before: 48-hour queue, 3 staff touchpoints.
         After:  2.8 second settlement. Zero staff involvement.
```

</details>

<details>
<summary><b>Multi-agent payroll</b></summary>

```
Task:    "Verify task completion by agent:worker-03. If verified, pay 12.50 USDb."

Flow:    Orchestrator verifies output → request_agent_transaction
         → agent:worker-03 receives payment atomically

This is the agent economy: agents hiring agents, paying for output.
```

</details>

<details>
<summary><b>Cross-border vendor payments</b></summary>

```
Task:    "Pay Nigerian vendor 500 USD equivalent in NGNb."

Flow:    get_exchange_rate (USDb/NGNb: 1,580)
         → swap_currency (500 USDb → 790,000 NGNb)
         → transfer_tokens to vendor wallet

Traditional wire: 3–5 days, $35 fee.
BananaCrystal:    4.1 seconds, 0.3% fee.
```

</details>

<details>
<summary><b>Per-call API billing for research agents</b></summary>

```
Task:    "Query the pricing data API. Pay per result."

Flow:    Agent calls data provider → provider returns HTTP 402
         → agent calls transfer_tokens (0.3% of transfer amount)
         → data unlocked → agent continues workflow

1,000 queries/day = $1.00 in payments + $1.00 in fees.
Economically impossible on Stripe ($300/day in fees alone).
```

</details>

<br/>

---

## Security architecture

| Layer            | Mechanism                                         | What it prevents             |
| ---------------- | ------------------------------------------------- | ---------------------------- |
| API Key Scopes   | `read_only`, `transfer`, `swap`, `fiat` per key   | Agent scope creep            |
| Spending Limits  | Per-tx max + daily cap enforced server-side       | Runaway agent spending       |
| OTP Verification | 6-digit code to registered email for transfers    | Unauthorized payments        |
| Idempotency Keys | Redis deduplication per request                   | Double-spend on retries      |
| Rate Limiting    | Per-key per-minute and per-day caps               | Runaway agent loops          |
| Immutable Audit  | Every tool call written to Hedera consensus layer | Tampered transaction history |

**What this package does NOT have access to:**

- Your private keys — managed server-side
- Other users' wallets or data
- The ability to modify its own spending limits
- Anything outside your API key's scope

This MCP server is a thin authenticated client. All security enforcement executes server-side at BananaCrystal's infrastructure layer — not in this package.

<br/>

---

## Configuration

| Variable                | Required | Default                                 | Description                                                                                                                       |
| ----------------------- | -------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `BANANACRYSTAL_API_KEY` | **Yes**  | —                                       | Your API key from agents.bananacrystal.com/account. Sandbox keys start with `bc_test_` (no real money). Live keys have no prefix. |
| `BANANACRYSTAL_API_URL` | No       | `https://agentic.bananacrystal.com/mcp` | Override API endpoint                                                                                                             |
| `DEBUG`                 | No       | `false`                                 | Enable verbose debug logging                                                                                                      |

<br/>

---

## Pricing

**Read-only operations are always free.** Fees only apply when moving money.

| Operation                               | Fee                         |
| --------------------------------------- | --------------------------- |
| Balance checks, history, rates, profile | **Free**                    |
| Token transfers (`transfer_tokens`)     | **0.3%** of transfer amount |
| Currency swaps (`swap_currency`)        | **0.5%** of swap amount     |
| Fiat deposits / withdrawals             | Varies by rail (ACH, wire)  |

| Tier            | Volume                      | Cost                        | For                                     |
| --------------- | --------------------------- | --------------------------- | --------------------------------------- |
| **Free**        | First 1,000 API calls/month | $0                          | Development and testing                 |
| **Pay-per-use** | 1,001+ /month               | 0.3% transfers · 0.5% swaps | Production agents at any scale          |
| **Enterprise**  | Unlimited                   | Contact us                  | High-volume autonomous payment networks |

No monthly fee. No seat pricing. No lock-in.

<br/>

---

## Frequently asked questions

<details>
<summary><b>What exactly is agent payment infrastructure?</b></summary>

Agent payment infrastructure is the class of financial technology designed from first principles for AI agents as the primary economic actor. It provides agent wallets with programmatic identity (no human KYC), autonomous transaction authorization without per-transaction human approval, machine-speed settlement, and machine-readable audit trails.

Traditional payment infrastructure (Stripe, bank APIs, card networks) assumes a human is the accountable party behind every payment. Agent payment infrastructure assumes the payer may be an autonomous software process operating 24/7 at machine speed. These are architecturally different requirements — which is why BananaCrystal exists as a category, not just a product.

</details>

<details>
<summary><b>How is this different from Stripe or traditional payment APIs?</b></summary>

Seven architectural differences:

1. **Identity** — Stripe requires human KYC and a legal entity. BananaCrystal issues agent wallets with programmatic identity in seconds.
2. **Authorization** — Stripe requires a human to authorize each transaction (3DS2, card PIN, etc.). BananaCrystal uses programmatic spending policy set once by the operator.
3. **Fees** — Stripe charges $0.30 + 2.9% per transaction, making micropayments economically impossible. BananaCrystal charges a percentage of the amount (0.3% for transfers, 0.5% for swaps) with no fixed fee — making micropayments viable.
4. **Settlement** — Stripe settlements take 2–3 days. BananaCrystal settles on Hedera in under 5 seconds with absolute finality.
5. **Hours** — Banks and card networks have operating hours. BananaCrystal is 24/7/365.
6. **Fraud detection** — Stripe's fraud system is trained on human transaction patterns and flags automated agent behavior as suspicious. BananaCrystal is designed for machine transaction patterns.
7. **Spending controls** — Stripe offers card limits only. BananaCrystal offers per-transaction caps, daily limits, recipient allowlists, and currency restrictions — all enforced at infrastructure level, not application layer.

</details>

<details>
<summary><b>Is this safe to give to an AI agent? What stops it spending everything?</b></summary>

Spending controls are enforced at the infrastructure layer — not in your application code, and not in the agent's code. The agent cannot override them.

You set:

- **Daily spending cap** — hard limit on total daily spend (e.g. $100/day)
- **Per-transaction maximum** — no single payment over a threshold (e.g. $25 max)
- **Recipient allowlist** — agent can only pay pre-approved wallet addresses
- **Currency restrictions** — agent can only transact in currencies you permit
- **OTP requirement** — transfers above a threshold require a 6-digit email code

A runaway agent hitting its limit receives a `SpendingLimitExceeded` error and stops. No funds move.

</details>

<details>
<summary><b>What is an agent wallet?</b></summary>

An agent wallet is a non-custodial financial account owned and operated by an AI agent — not a human. Its identity derives from a programmatic agent ID, not from government documents or KYC verification of a person. The wallet holds a real stablecoin balance, has an on-chain Hedera address, and can send and receive value autonomously within the spending limits you configure.

When you sign up at [agents.bananacrystal.com/account](https://agents.bananacrystal.com/account) and create an API key, an agent wallet is automatically provisioned. Your agents reference it via the API key — they never need to know private keys or manage cryptographic identity directly.

</details>

<details>
<summary><b>Which AI frameworks work with this MCP server?</b></summary>

Any framework that supports the Model Context Protocol (MCP). Confirmed integrations:

- **Claude Desktop** (Anthropic) — native MCP support
- **Cursor, Windsurf, Cline** — IDE agents with MCP support
- **LangChain** — via `langchain-mcp-adapters` package
- **CrewAI** — via LangChain MCP adapter
- **AutoGPT** — via plugin configuration
- **Custom agents** — any agent that can call JSON-RPC over stdio or HTTP

OpenAI adopted MCP in March 2025. Microsoft added it to Copilot Studio in May 2025. Gartner projects 75% of API gateway vendors will support MCP by 2026. This is the standard — build on it.

</details>

<details>
<summary><b>What currencies are supported?</b></summary>

150+ stablecoin currency pairs. The core flow:

1. Deposit USDC (external stablecoin) into your BananaCrystal account
2. Convert to USDb (BananaCrystal's native 1:1 USD stablecoin)
3. Swap USDb to any of 150+ local currency stablecoins
4. Withdraw back to USDC or your local bank anytime

Every swap settles on Hedera in under 5 seconds. No banks. No SWIFT. No weekends.

**Fees:** Token transfers cost **0.3%** of the transfer amount. Currency swaps cost **0.5%** of the swap amount. All other operations are free.

A sample of supported currencies:

| Currency          | Token |     | Currency           | Token |
| ----------------- | ----- | --- | ------------------ | ----- |
| US Dollar         | USDb  |     | Nigerian Naira     | NGNb  |
| Euro              | EURb  |     | Ghanaian Cedi      | GHSb  |
| British Pound     | GBPb  |     | Kenyan Shilling    | KESb  |
| UAE Dirham        | AEDb  |     | South African Rand | ZARb  |
| Indian Rupee      | INRb  |     | Egyptian Pound     | EGPb  |
| Canadian Dollar   | CADb  |     | Ethiopian Birr     | ETBb  |
| Australian Dollar | AUDb  |     | Moroccan Dirham    | MADb  |
| Japanese Yen      | JPYb  |     | Ugandan Shilling   | UGXb  |

**[View all 150+ supported currencies →](./CURRENCIES.md)**

Use `list_available_tokens` to get the live list with Hedera token IDs and current exchange rates.

</details>

<details>
<summary><b>What is Hedera and why does it matter for agent payments?</b></summary>

Hedera is an enterprise-grade public distributed ledger chosen for three properties critical to autonomous agent payments:

- **Absolute finality in under 5 seconds** — unlike Ethereum (probabilistic finality over minutes) or Bitcoin (10+ minute blocks), Hedera's hashgraph consensus provides certainty that a transaction has cleared. An agent's next action depends on knowing the payment settled — absolute finality is a functional requirement, not a preference.
- **Low transaction fees** — Hedera's fee structure makes agent micropayments economically viable at scale. No other production blockchain offers this combination of speed and cost.
- **Carbon-negative network** — the only carbon-negative public distributed ledger, which matters for enterprises running agents at millions of transactions per month.

</details>

<details>
<summary><b>Is the MCP server open source? Can I self-host it?</b></summary>

Yes — MIT licensed. The server is a thin authenticated client that makes HTTP requests to BananaCrystal's API. You can fork it, modify it, and run it locally. A mock server is included for development without a real API key.

To run locally without an API key:

```bash
git clone https://github.com/BananaCrystal/mcp-server-bananacrystal.git
cd mcp-server-bananacrystal
npm install && npm run mock
```

The mock server returns realistic data so you can build integrations, write tests, and explore all 40 tools without touching production.

</details>

<details>
<summary><b>What is the agent economy?</b></summary>

The agent economy is the emerging economic layer in which AI agents participate as independent economic actors — not just tools that assist humans, but participants that earn, spend, negotiate, and operate on their own financial behalf.

It requires three new infrastructure primitives: **agent wallets** (programmatic identity, no human KYC), **autonomous payments** (programmatic spending policy, not per-transaction human approval), and **machine-speed settlement** (on-chain, under 5 seconds, machine-readable confirmation).

BananaCrystal is the agent payment infrastructure layer. We don't sell a product. We represent a category: **AI-native finance** — the financial system built for machines, not adapted from the one built for humans. The agent economy is forming now. Developers who integrate payment rails first will define how it works.

</details>

<details>
<summary><b>How do I report a security vulnerability?</b></summary>

Do not open a public GitHub issue for security vulnerabilities. Email support@bananacrystal.com with:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact

We will acknowledge within 24 hours and aim to resolve critical issues within 72 hours. We do not currently have a formal bug bounty program but we recognize responsible disclosures publicly and in our changelog.

</details>

<br/>

---

## Development and local testing

```bash
# Clone
git clone https://github.com/BananaCrystal/mcp-server-bananacrystal.git
cd mcp-server-bananacrystal

# Install
npm install

# Start mock server — no API key needed, all 40 tools return realistic data
npm run mock

# Build from source
npm run build

# Run in development mode
npm run dev

# Test with MCP Inspector
export BANANACRYSTAL_API_KEY=bc_test_your_key_here
npx @modelcontextprotocol/inspector node dist/index.js
```

**Configure your agent to use the mock server:**

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

<br/>

---

## Troubleshooting

<details>
<summary><b>"API key invalid"</b></summary>

- Verify the key is copied correctly from [agents.bananacrystal.com/account](https://agents.bananacrystal.com/account)
- Sandbox keys start with `bc_test_` (testing only — no real money). Live keys have no prefix.
- Verify key is active at [agents.bananacrystal.com/account](https://agents.bananacrystal.com/account) → API Keys
- Check the key has the required scope for the tool being called (`transfer` scope for `transfer_tokens`, `swap` scope for `swap_currency`)
- Check for whitespace or truncation in the environment variable

</details>

<details>
<summary><b>"Spending limit exceeded"</b></summary>

This is working as designed — limits are enforced at infrastructure level and cannot be bypassed.

To increase limits: [agents.bananacrystal.com/account](https://agents.bananacrystal.com/account) → API Keys → Edit → adjust daily cap or per-transaction maximum.

If you are building a production agent, set limits conservatively first and increase after observing real usage patterns.

</details>

<details>
<summary><b>MCP server not appearing in Claude / Cursor</b></summary>

1. Validate config file is valid JSON at [jsonlint.com](https://jsonlint.com)
2. Confirm file is at the correct path for your OS
3. Restart the application completely (full quit, not just reload)
4. Check the application's MCP logs for the exact error message

</details>

<details>
<summary><b>OTP not received</b></summary>

- Check spam/junk folder for email from BananaCrystal
- OTP expires in 10 minutes — request a fresh one if needed
- Verify your registered email at [agents.bananacrystal.com/account](https://agents.bananacrystal.com/account)

</details>

<details>
<summary><b>"Rate limit exceeded"</b></summary>

- Implement exponential backoff in your agent retry logic
- The error response includes a `retry_after` field in seconds — respect it
- For high-volume production agents, contact support to increase rate limits

</details>

<br/>

---

## Contributing

**We are building the financial infrastructure of the agent economy. This is early. Your contributions shape the category.**

```bash
git clone https://github.com/BananaCrystal/mcp-server-bananacrystal.git
cd mcp-server-bananacrystal
npm install
npm run mock   # develop against mock — no API key needed
npm run dev
```

### What to work on

The highest-impact contributions right now:

| Area                        | What we need                                            | Impact                                                 |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| **Framework guides**        | Eliza, Dify, n8n, Zapier AI integration examples        | Expands reach to new developer communities             |
| **Language SDKs**           | Python wrapper (`pip install bananacrystal`), Go client | Makes the package accessible to non-JS developers      |
| **Agent workflow examples** | Refund bots, treasury agents, payroll orchestrators     | Developers copy real-world patterns directly           |
| **Test coverage**           | Unit and integration tests against mock server          | Makes every PR reviewable with confidence              |
| **Documentation**           | Edge cases, error handling, advanced patterns           | Reduces support burden, accelerates adoption           |
| **Platform integrations**   | OpenWebUI, LibreChat, Continue.dev MCP configs          | Puts BananaCrystal in front of new developer audiences |

### How to contribute

1. Check open issues on [GitHub](https://github.com/BananaCrystal/mcp-server-bananacrystal/issues) for `good first issue` labels
2. Fork the repo and create a branch: `git checkout -b feature/your-contribution`
3. Make your changes against the mock server (no API key needed)
4. Submit a PR with a clear description of what you built and why
5. We review within 48 hours

See [CONTRIBUTING.md](https://github.com/BananaCrystal/mcp-server-bananacrystal/blob/main/CONTRIBUTING.md) for the full guide and [GETTING_STARTED.md](https://github.com/BananaCrystal/mcp-server-bananacrystal/blob/main/GETTING_STARTED.md) for a developer walkthrough.

### Recognition

All contributors are credited in the commit history. Significant contributions (new framework integrations, language SDKs, major examples) are highlighted in the project README.

**If you build something interesting with this MCP server, open an issue tagged `showcase` and we will feature it.**

<br/>

---

## Star, share, and spread the category

If BananaCrystal has been useful:

**Star the repo** — it helps other developers find agent payment infrastructure when they need it.
Visit [github.com/BananaCrystal/mcp-server-bananacrystal](https://github.com/BananaCrystal/mcp-server-bananacrystal) to star.

**Share it** — post in your AI agent community, Discord, or newsletter. The agent economy needs infrastructure. Developers building agents need to know this exists.

**Open an issue** — if something doesn't work, if you need a framework that isn't supported, or if you have ideas. Every issue makes the project more useful for everyone.

<br/>

---

## Links

|                   |                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Get API key**   | [agents.bananacrystal.com/account](https://agents.bananacrystal.com/account)                        |
| **Platform**      | [bananacrystal.com](https://www.agents.bananacrystal.com)                                                  |
| **Documentation** | [agents.bananacrystal.com/docs](https://agents.bananacrystal.com/docs)                              |
| **GitHub**        | [BananaCrystal/mcp-server-bananacrystal](https://github.com/BananaCrystal/mcp-server-bananacrystal) |
| **npm**           | [@bananacrystal/mcp-server](https://www.npmjs.com/package/@bananacrystal/mcp-server)                |
| **MCP Protocol**  | [modelcontextprotocol.io](https://modelcontextprotocol.io)                                          |
| **Hedera**        | [hedera.com](https://hedera.com)                                                                    |
| **Support**       | support@bananacrystal.com                                                                           |

<br/>

---

<div align="center">

**MIT licensed · Built by [BananaCrystal](https://bananacrystal.com)**

_Agent Payment Infrastructure · Autonomous Payments · AI-Native Finance_

[Get started free](https://agents.bananacrystal.com/account) · [Read the docs](https://agents.bananacrystal.com/docs) · [View on GitHub](https://github.com/BananaCrystal/mcp-server-bananacrystal)

</div>

<!--
SCHEMA MARKUP — for AI engine indexing and GEO/AEO optimisation
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "BananaCrystal MCP Server",
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "Node.js",
      "description": "Agent payment infrastructure MCP server. Gives AI agents autonomous payment capability — stablecoin transfers, currency swaps, agent wallets, and fiat operations on Hedera blockchain. Works with Claude, LangChain, CrewAI, AutoGPT.",
      "featureList": "get_balances, get_exchange_rate, transfer_tokens, swap_currency, get_transaction_history, get_my_limits, request_agent_transaction, execute_approved_transaction",
      "offers": {
        "@type": "Offer",
        "description": "0.3% for transfers, 0.5% for swaps. Read-only operations free. First 1,000 API calls free."
      },
      "provider": {
        "@type": "Organization",
        "name": "BananaCrystal",
        "url": "https://bananacrystal.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is agent payment infrastructure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agent payment infrastructure is financial technology designed from first principles for AI agents as the primary economic actor — providing agent wallets, autonomous payment authorization, machine-speed settlement, and machine-readable audit trails. BananaCrystal provides this through a single MCP endpoint."
          }
        },
        {
          "@type": "Question",
          "name": "How do AI agents make autonomous payments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI agents make autonomous payments through BananaCrystal's MCP server. The agent calls payment tools (transfer_tokens, swap_currency) within operator-defined spending limits. Transactions settle on Hedera blockchain in under 5 seconds. Transfers cost 0.3% of the amount, swaps cost 0.5%. No human approval is required per transaction — the operator sets policy once and the agent operates within it autonomously."
          }
        },
        {
          "@type": "Question",
          "name": "What is an agent wallet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An agent wallet is a non-custodial financial account owned and operated by an AI agent. Its identity derives from a programmatic agent ID — not human KYC or government documents. The wallet holds a real stablecoin balance, has an on-chain Hedera address, and can send and receive value autonomously within operator-configured spending limits."
          }
        }
      ]
    }
  ]
}
-->
