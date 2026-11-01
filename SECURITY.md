# Security Policy

BananaCrystal moves real money. We take reports seriously and we respond to every one.

## Reporting a vulnerability

Email **security@bananacrystal.com**. Please do not open a public GitHub issue for anything security-related.

Include what you can of the following:

- The endpoint, tool name or page affected
- Steps to reproduce, or a proof of concept
- The impact as you understand it
- Your sandbox key prefix if the report involves a key (never send a full key)

We acknowledge reports within 2 business days and aim to confirm or rule out the issue within 10 business days. We will keep you informed while we fix it and we will credit you in the fix notes if you would like.

## Scope

In scope:

- The hosted MCP server at `https://agentic.bananacrystal.com/mcp`
- The REST API at `https://agentic.bananacrystal.com`
- The developer portal at `https://agents.bananacrystal.com`
- The configuration files in this repository

Out of scope:

- Third-party MCP clients (Claude, Cursor, ChatGPT and others)
- Third-party directories that list this server
- The Hedera network itself
- Denial-of-service testing, social engineering and physical attacks

## Rules for testing

- Use a **sandbox key** (`bc_test_` prefix). Sandbox keys work against test balances only.
- Do not access, modify or delete data that is not yours.
- Do not run automated scanners against production rate limits.
- Stop and report as soon as you can demonstrate the issue.

We will not take legal action against researchers who follow these rules and report in good faith.

## How the server protects you

- **API keys are scoped.** A key carries only the scopes it was created with (`read`, `transfer`, `swap`, `fiat`). The server rejects any tool call outside the key's scope.
- **Spending limits are enforced server-side.** Per-transaction maximum and a rolling 24-hour cap are set per key and checked on every call. Nothing in the agent's prompt can raise them.
- **Transfers, swaps and withdrawals require a one-time code** sent to the account holder's email. The agent can request a code but never receives it.
- **Requests are idempotent.** A retried call with the same idempotency key is not executed twice.
- **Keys are shown once.** We store a hash. If you lose a key, revoke it and create a new one at agents.bananacrystal.com/account.
- **Sandbox and production are separate environments.** Test keys cannot reach real balances.

## Key hygiene for integrators

- Keep keys in environment variables or your client's secret store, never in a committed config file.
- Create one key per agent or per workload, with the smallest scope that works.
- Revoke keys you no longer use. Rotation takes effect immediately.
- Production keys start with `bc_live_`. If you see one in a log, a chat transcript or a repository, revoke it first and investigate second.

## Supported versions

Only the hosted server is supported. There is no self-hosted release. The deprecated npm package `@bananacrystal/mcp-server` is no longer maintained and should not be used.
