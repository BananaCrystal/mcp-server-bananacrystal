# Deprecation plan: `@bananacrystal/mcp-server`

**Status: not yet executed. Waiting on Ian's go-ahead before anything below is run.**

## Why

BananaCrystal runs a hosted MCP server. Clients connect to it over a URL and fetch the tool list live via
`tools/list`, so the server is the single source of truth.

The npm package shipped its own static copy of the tool definitions (`src/tools/definitions.ts`). That copy
could only ever drift from the server, and a client connecting over the URL never reads it. The package also
carried an HTTP transport that targets REST paths the backend does not expose, so it could not reach
production at all.

Rather than keep re-syncing a file that nobody's client reads, the package is retired and everyone is pointed
at the URL.

## Connection details users should move to

| Environment | URL                                             |
| ----------- | ----------------------------------------------- |
| Production  | `https://agentic.bananacrystal.com/mcp`         |
| Staging     | `https://agentic.stg.bananacrystal.com/mcp`     |
| Sandbox     | `https://agentic.bananacrystal.com/mcp/sandbox` |

Auth header: `x-api-key: <API_KEY>` (OAuth `Authorization: Bearer <token>` is also supported).

Use the `agentic.*` host. `agents.bananacrystal.com` is the web app and returns HTML, not MCP.

## Onboarding (unchanged by the deprecation)

1. Create an account at [agents.bananacrystal.com](https://agents.bananacrystal.com).
2. Generate an API key on the **AI Agent Access** page.
3. Paste the URL and key into your MCP client config.

The npm package never replaced steps 1 and 2 — those were always done in the web app.

## Command to run (do NOT run until Ian approves)

```bash
npm deprecate @bananacrystal/mcp-server \
  "Deprecated — connect via URL: https://agentic.bananacrystal.com/mcp"
```

Requires publish rights on the `@bananacrystal` npm scope.

## Notes / open items

- `npm deprecate` marks every published version and shows a warning on install. It does **not** unpublish;
  existing installs keep working (or rather, keep failing the way they already do against production).
- Published `v1.0.1` defaults `BANANACRYSTAL_API_URL` to the JSON-RPC endpoint and then appends
  `/api/v1/mcp/*`, producing an unreachable URL. Anyone already on `npx` fails silently. The deprecation
  warning is what reaches them, since docs changes do not. Consider whether a final patch release that prints
  a startup notice pointing at the URL connector is worth it before deprecating.
- This repository is kept as reference/documentation. Archiving it is a separate decision.
