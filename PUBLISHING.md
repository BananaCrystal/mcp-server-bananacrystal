# Publishing to the MCP Registry

The server is listed as `com.bananacrystal/mcp` on the official registry:
https://registry.modelcontextprotocol.io/?q=bananacrystal

Directories such as PulseMCP and the GitHub MCP Registry read from it, so this is the one listing to keep current.

## Update the listing

1. Change `server.json` (description, icon, headers, and so on) and raise `version`, for example `1.1.0` to `1.1.1`. A published version can't be edited or published again.
2. Merge the change to `main`.
3. Open **Actions → Publish to the MCP Registry → Run workflow** on `main`.
4. Check the listing at the link above.

## How the registry knows it's us

The `com.` prefix is `bananacrystal.com` reversed. The registry checks a DNS TXT record on `bananacrystal.com` that starts with `v=MCPv1; k=ed25519; p=`. That's the public half of an Ed25519 key. The workflow signs in with the private half, stored as the repo secret `MCP_REGISTRY_PRIVATE_KEY` (hex).

The private key is never committed to this repo or pasted into an issue, PR or chat.

## Rotate the key

Do this if the key may have leaked, or when someone who held it leaves.

1. Make a new key:
   ```
   openssl genpkey -algorithm Ed25519 -out mcp-registry.pem
   ```
2. Print the new TXT value and replace the old record on `bananacrystal.com` with it:
   ```
   echo "v=MCPv1; k=ed25519; p=$(openssl pkey -in mcp-registry.pem -pubout -outform DER | tail -c 32 | base64)"
   ```
3. Replace the repo secret (needs admin on this repo):
   ```
   openssl pkey -in mcp-registry.pem -outform DER | tail -c 32 | xxd -p -c 64 \
     | gh secret set MCP_REGISTRY_PRIVATE_KEY -R BananaCrystal/mcp-server-bananacrystal
   ```
4. Store `mcp-registry.pem` in the team password manager, then delete the local copy.

## Publish from a laptop instead

Install `mcp-publisher` (`brew install mcp-publisher`), then from this repo:
```
mcp-publisher login dns --domain bananacrystal.com --private-key "$(openssl pkey -in mcp-registry.pem -outform DER | tail -c 32 | xxd -p -c 64)"
mcp-publisher publish
```
