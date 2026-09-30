# Meta Muse — BananaCrystal MCP Integration

## Overview
**Meta Muse** connects to external MCP tools via HTTPS Streamable HTTP / Server-Sent Events (SSE).

### 1. Connection Parameters
* **Server Name:** BananaCrystal MCP Server
* **Endpoint URL:** `https://agentic.bananacrystal.com/mcp`
* **Transport:** `streamable-http`
* **Authentication:** `Bearer` (`Authorization: Bearer bc_live_...`)
* **API Key Sign-up:** [https://agents.bananacrystal.com](https://agents.bananacrystal.com) (Account -> API Keys)

### 2. User Chat Connection Prompt
Users on Meta Muse can connect by pasting this prompt into their Muse chat:
```text
Connect to the BananaCrystal MCP Server at https://agentic.bananacrystal.com/mcp to enable FOREX queries and autonomous wallet transactions.
```
