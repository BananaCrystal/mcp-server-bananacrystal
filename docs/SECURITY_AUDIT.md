# BananaCrystal MCP Server: Security Audit and Invariant Verification Report

## Executive Summary
* **Protocol Specification:** Model Context Protocol (MCP) Streamable HTTP & stdio
* **Status:** Passed 32/32 Adversarial Invariant Test Scenarios
* **Target Servers:** `https://agentic.bananacrystal.com/mcp` and `@bananacrystal/mcp-server`

## Audited Security Controls & Invariants

1. **Per-Transaction & Daily Ceilings:**
   - Evaluated against strict daily spending caps (resetting daily at 00:00 UTC).
   - Multi-agent bursts and parallel requests respect atomic ceiling constraints with zero over-budget breach.

2. **Step-Up Authentication & OTP Invariants:**
   - Single-use, time-bounded One-Time Passwords (OTP) required for sensitive transfers.
   - Replayed, expired, or invalid OTP codes are immediately rejected without ledger mutation.

3. **Recipient Allowlist & Scope Enforcement:**
   - Granular tool scopes (`read_only`, `rate`, `swap`, `transfer`) strictly enforced.
   - Transfers to non-whitelisted destinations or restricted token IDs return standard authorization errors.

4. **Math & Boundary Protections:**
   - Strict positive decimal validation across all numerical inputs.
   - Negative values, zero amounts, and scientific notation overflow payloads are blocked.
