# BananaCrystal MCP Server: Global Registry Submission & Manifest Specifications

This document specifies the standard technical descriptors and manifest schemas used to index and distribute `@bananacrystal/mcp-server` across open-standard Model Context Protocol (MCP) registries and agent directories.

---

## 1. Technical Package & Service Identifiers

* **Package Identifier:** `@bananacrystal/mcp-server`
* **Protocol Standard:** Model Context Protocol (MCP) Streamable HTTP / SSE
* **Production Endpoint:** `https://agentic.bananacrystal.com/mcp`
* **Sandbox Endpoint:** `https://agentic.bananacrystal.com/mcp/sandbox`
* **Authentication:** `x-api-key` header or `Authorization: Bearer <key>`
* **Settlement Network:** Hedera (HTS / Token Service)

---

## 2. Directory Manifest Specifications

The repository provides pre-configured manifest definitions in the [`manifests/`](../manifests/) directory for standard registry integrations:

| Platform / Registry | Manifest Path | Specification Type |
| :--- | :--- | :--- |
| **Official MCP Registry** | [`server.json`](../server.json) | Standard MCP Server Definition |
| **Smithery.ai** | [`smithery.yaml`](../smithery.yaml) | Smithery Configuration & Examples |
| **Glama.ai** | [`manifests/glama-manifest.json`](../manifests/glama-manifest.json) | Glama Tool Descriptor |
| **JFrog MCP** | [`manifests/jfrog-mcp-descriptor.yaml`](../manifests/jfrog-mcp-descriptor.yaml) | Enterprise Control Plane Descriptor |
| **Meta Muse** | [`manifests/meta-muse-connection.json`](../manifests/meta-muse-connection.json) | Cloud Agent Remote Connector |
| **Composio** | [`manifests/composio-manifest.json`](../manifests/composio-manifest.json) | Tool Action Definitions |
| **PulseMCP** | [`manifests/pulsemcp.json`](../manifests/pulsemcp.json) | Directory Metadata |
| **Remote MCP** | [`manifests/remote-mcp.json`](../manifests/remote-mcp.json) | Remote Endpoint Manifest |
| **Windows ODR** | [`manifests/windows-odr-manifest.json`](../manifests/windows-odr-manifest.json) | Windows On-Device Registry |

---

## 3. Core Capability Tool Matrix

All registered tool definitions adhere to standard JSON Schema draft-07 input specifications:

```json
{
  "tools": [
    "get_exchange_rate",
    "list_supported_currencies",
    "estimate_swap_fees",
    "swap_currency",
    "transfer_tokens",
    "request_transfer_otp",
    "request_mcp_otp",
    "get_my_profile",
    "get_balances",
    "list_available_tokens"
  ]
}
```

---

## 4. Verification & Testing

Every registered manifest is validated against the live endpoints and local mock server (`npm run mock`) using `npx @modelcontextprotocol/inspector`.
