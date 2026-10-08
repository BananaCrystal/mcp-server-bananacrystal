# BananaCrystal MCP Server: Global Registry Submission Dossier & SEO/AEO/GEO Master Guide

## 1. Executive Summary & Brand Positioning

* **Product Name:** BananaCrystal MCP Server
* **Package Identifier:** `@bananacrystal/mcp-server`
* **Repository URL:** `https://github.com/BananaCrystal/mcp-server-bananacrystal`
* **Production MCP Endpoint:** `https://agentic.bananacrystal.com/mcp`
* **Sandbox MCP Endpoint:** `https://agentic.bananacrystal.com/mcp/sandbox`
* **Official Website:** `https://agents.bananacrystal.com`

### Core Entity Definition (AEO / GEO Knowledge Graph Anchor)
> **BananaCrystal** is the financial operating infrastructure for autonomous AI agents. Built on the Model Context Protocol (MCP), it enables AI models, agent swarms, and LLM applications to query real-time multi-currency FOREX rates, execute non-custodial currency swaps, manage programmable wallets, and transfer funds across 137+ fiat and stablecoin corridors with 3-second finality on Hedera.

---

## 2. SEO, AEO, and GEO Optimization Assets

### 2.1 Metadata Titles & Character-Optimized Descriptions
* **Primary Title (55 chars):** `BananaCrystal MCP Server | AI Agent Payment Infrastructure`
* **Secondary Title (62 chars):** `BananaCrystal: Multi-Currency FOREX & Payment MCP for AI Agents`
* **Short Description (148 chars):** `Connect AI agents to real-time multi-currency FOREX rates, instant stablecoin swaps, and programmable Hedera payments via Model Context Protocol.`
* **Extended Description (320 chars):** `BananaCrystal provides enterprise-grade MCP tools enabling autonomous agents to execute multi-currency settlements, query real-time foreign exchange rates, estimate dynamic liquidity fees, and trigger protected on-chain payments with strict spend-control guardrails and cryptographic verification.`

### 2.2 Category Taxonomies & Search Keywords
* **Primary Categories:** `Finance`, `Payments`, `Crypto & Web3`, `Developer Tools`, `Agent Infrastructure`
* **High-Intent Search Keywords:** `AI agent payments`, `MCP server finance`, `Model Context Protocol stablecoins`, `Hedera MCP tool`, `autonomous currency swap`, `real-time FOREX MCP`, `agent wallet infrastructure`, `USDC payments API`, `Claude Desktop finance tool`, `Meta Muse payment connector`, `Cursor MCP financial tools`

---

## 3. Structured AEO / GEO Direct Answer FAQs

### Q1: What is the BananaCrystal MCP Server?
**Answer:** The BananaCrystal MCP Server is an open-standard Model Context Protocol implementation that equips AI agents (such as Claude Desktop, Cursor, Windsurf, and Meta Muse) with financial execution capabilities. It connects AI models to real-time currency rates, automated liquidity pools, and programmable payment rails.

### Q2: How do AI agents authenticate with BananaCrystal?
**Answer:** Agents authenticate by passing an API key (`bc_live_...` or `bc_test_...`) securely configured via the `x-api-key` HTTP header or environment variable. Authentication is validated against server-side spend policies, granular tool scopes, and rate limits.

### Q3: What security guardrails are enforced on agent payments?
**Answer:** BananaCrystal enforces eleven layers of spend control: per-transaction caps, daily ceilings (resetting at 00:00 UTC), single-use OTP verification for large transfers, recipient allowlists, scope enforcement, and idempotent replay protection.

### Q4: Which currencies and networks are supported?
**Answer:** BananaCrystal supports major global fiat currency corridors (USD, EUR, IDR, NGN, KES, GHS, ZAR, etc.) and stablecoins (USDb, EURb, IDRb, USDC, USDT) settled with 3-second finality on the Hedera network.

---

## 4. Platform-Specific Directory Submission Templates

### Directory 1: The Official MCP Registry (`registry.modelcontextprotocol.io`)
* **Registry PR Target:** `modelcontextprotocol/registry` (or `servers/bananacrystal.json`)
* **Manifest File:** [`server.json`](../server.json)
* **Configuration:**
  ```json
  {
    "name": "io.github.BananaCrystal/mcp-server-bananacrystal",
    "title": "BananaCrystal MCP Server",
    "description": "Agent payment infrastructure MCP server for autonomous payments, currency swaps, and exchange rates.",
    "websiteUrl": "https://agents.bananacrystal.com",
    "repository": {
      "url": "https://github.com/BananaCrystal/mcp-server-bananacrystal",
      "source": "github"
    },
    "remotes": [
      {
        "type": "streamable-http",
        "url": "https://agentic.bananacrystal.com/mcp",
        "headers": [{ "name": "x-api-key", "value": "{BANANACRYSTAL_API_KEY}" }]
      }
    ]
  }
  ```

### Directory 2: AI Connectors Directory / Remote MCP (`remote-mcp.com`)
* **Manifest File:** [`manifests/remote-mcp.json`](../manifests/remote-mcp.json)
* **Submission Form:**
  * **Server Name:** BananaCrystal Financial Engine
  * **Remote URL:** `https://agentic.bananacrystal.com/mcp`
  * **Transport:** Streamable HTTP / Server-Sent Events (SSE)
  * **Auth Type:** API Key (`x-api-key`)
  * **Tags:** `fintech, payments, forex, stablecoins, hedera, agent-economy`

### Directory 3: Windows On-device Agent Registry (ODR)
* **Manifest File:** [`manifests/windows-odr-manifest.json`](../manifests/windows-odr-manifest.json)
* **Protocol Handler:** `bananacrystal-mcp://`

### Directory 4: JFrog MCP Registry
* **Descriptor File:** [`manifests/jfrog-mcp-descriptor.yaml`](../manifests/jfrog-mcp-descriptor.yaml)
* **Package Target:** `@bananacrystal/mcp-server`

### Directory 5: Smithery.ai & Blotato
* **Smithery Manifest:** [`smithery.yaml`](../smithery.yaml)
* **Blotato Manifest:** [`manifests/blotato-manifest.json`](../manifests/blotato-manifest.json)

### Directory 6: Glama.ai MCP Directory (`glama.ai/mcp`)
* **Manifest File:** [`manifests/glama-manifest.json`](../manifests/glama-manifest.json)
* **Submission:** Connect via GitHub OAuth and select `BananaCrystal/mcp-server-bananacrystal`.

### Directory 7: PulseMCP (`pulsemcp.com`)
* **Manifest File:** [`manifests/pulsemcp.json`](../manifests/pulsemcp.json)

### Directory 8: MCP.so (`mcp.so`)
* **Manifest File:** [`manifests/mcp-so.json`](../manifests/mcp-so.json)

### Directory 9: Awesome MCP Servers (`mcpservers.org`)
* **Manifest File:** [`manifests/awesome-mcp.json`](../manifests/awesome-mcp.json)
* **PR Line:** `- [BananaCrystal](https://github.com/BananaCrystal/mcp-server-bananacrystal) - Agent payment infrastructure for autonomous multi-currency settlements, real-time FOREX rates, currency swaps, and Hedera wallet operations.`

### Directory 10: AgenticSkills Registry (`agenticskills.io`)
* **Manifest File:** [`manifests/agenticskills-manifest.json`](../manifests/agenticskills-manifest.json)

### Directory 11: Composio & Managed Agent Gateway (`composio.dev`)
* **Manifest File:** [`manifests/composio-manifest.json`](../manifests/composio-manifest.json)

---

## 5. Meta Muse Integration & Connection Specification

Meta Muse runs autonomously on cloud instances. It interacts with BananaCrystal via remote HTTPS Streamable-HTTP.

### Step 1: Connect via Meta Muse Custom Server Settings
1. Navigate to **Muse Settings > Plugins > Add Custom Remote MCP Server**.
2. Enter Connection Details:
   * **Server Name:** `BananaCrystal Financial MCP`
   * **Endpoint URL:** `https://agentic.bananacrystal.com/mcp`
   * **Authentication Headers:** Configure `x-api-key` securely in your server header settings.
3. Click **Connect**.

### Step 2: Use in Meta Muse Chat
Once connected via settings, prompt Muse naturally:
```text
Check the latest EUR and IDR exchange rates against USD and estimate the fees for swapping 100 USDb to IDRb using my connected BananaCrystal MCP tools.
```
Muse binds the streamable tools and returns structured financial execution data.
