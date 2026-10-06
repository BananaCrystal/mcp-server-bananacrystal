# Meta Muse Integration Guide for BananaCrystal MCP Server

Meta Muse is Meta's cloud-hosted personal AI agent. Because Meta Muse operates entirely on a cloud container without a local runtime host, it interacts with external tools via **Streamable HTTP / Model Context Protocol (MCP)** endpoints.

---

## 1. Public HTTPS Endpoints

BananaCrystal exposes two publicly accessible endpoints secured by TLS/SSL and API Key authentication:

| Environment | Public URL | Description | Auth Header |
| :--- | :--- | :--- | :--- |
| **Production (Live)** | `https://agentic.bananacrystal.com/mcp` | Production network with real Hedera mainnet token settlements and live FX rates. | `x-api-key` or `Authorization: Bearer` |
| **Sandbox (Testing)** | `https://agentic.bananacrystal.com/mcp/sandbox` | Mock financial environment with pre-funded test wallets and safe mock transactions. | `x-api-key` or `Authorization: Bearer` |

---

## 2. Option A: Add as a Custom Remote Server (UI Surface)

In the Meta Muse Web/App interface:
1. Navigate to **Settings** $\rightarrow$ **Plugins / Connectors** $\rightarrow$ **Add Remote Server**.
2. Fill in the connection form:
   - **Server Name**: `BananaCrystal Finance`
   - **Transport Type**: `Streamable HTTP / SSE`
   - **Server URL**: `https://agentic.bananacrystal.com/mcp` (or `/mcp/sandbox` for testing)
   - **Headers**:
     - `x-api-key`: `bc_live_...` (or your `bc_test_...` key)
     - `Content-Type`: `application/json`
3. Click **Test & Connect**. Meta Muse will perform an MCP handshake (`initialize` and `tools/list`) to index available tools.

---

## 3. Option B: Chat-Based Registration

Users can register and authenticate the MCP server directly within the Meta Muse conversation window by sending this prompt:

```text
Connect to the BananaCrystal MCP financial server at https://agentic.bananacrystal.com/mcp using my API key header x-api-key: [YOUR_API_KEY]. Enable exchange rates, swap estimations, wallet profile, and Hedera token transfers.
```

Meta Muse will parse the URL and header, display an interactive **"Connect Server"** confirmation modal, and save the tool definitions into the user's active session.

---

## 4. Client Handling & Protocol Execution

Once registered, Meta Muse executes MCP requests using the standard JSON-RPC 2.0 protocol over HTTP:

### A. Exchange Rate Query
When a user asks Meta Muse *"What is the exchange rate for USD to EUR?"*, Meta Muse executes:
```json
{
  "jsonrpc": "2.0",
  "id": "muse_req_01",
  "method": "tools/call",
  "params": {
    "name": "get_exchange_rate",
    "arguments": {
      "currency": "EUR"
    }
  }
}
```

### B. Fee Estimation
When a user asks Meta Muse *"Estimate the fee to swap $100 to IDR"*:
```json
{
  "jsonrpc": "2.0",
  "id": "muse_req_02",
  "method": "tools/call",
  "params": {
    "name": "estimate_swap_fees",
    "arguments": {
      "fromCurrency": "USDb",
      "toCurrency": "IDRb",
      "amount": 100
    }
  }
}
```

### C. Security & Guardrails
- **Read-Only Auto Execution**: Rate queries (`get_exchange_rate`) and profile lookups (`get_my_profile`) carry `readOnlyHint: true` and execute instantaneously without extra prompts.
- **Destructive Action Confirmation**: Fund movements (`transfer_tokens`, `swap_currency`) carry `destructiveHint: true`. Meta Muse requires explicit user confirmation and prompts for an OTP (`request_transfer_otp`) before dispatching transaction tools.
