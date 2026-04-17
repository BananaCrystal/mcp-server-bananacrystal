#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { BananaCrystalClient } from './client.js';
import { registerTools } from './tools/index.js';

async function main() {
  // Validate environment
  const apiKey = process.env.BANANACRYSTAL_API_KEY;
  if (!apiKey) {
    console.error(
      'Error: BANANACRYSTAL_API_KEY environment variable is required',
    );
    console.error('');
    console.error(
      'Get your API key at: https://bananacrystal.com/settings/api-keys',
    );
    console.error('');
    console.error('Then set it in your Claude Desktop config:');
    console.error('  "env": {');
    console.error('    "BANANACRYSTAL_API_KEY": "your_key_here"');
    console.error('  }');
    process.exit(1);
  }

  const apiUrl =
    process.env.BANANACRYSTAL_API_URL || 'https://api.bananacrystal.com';
  const debug = process.env.DEBUG === 'true';

  if (debug) {
    console.error('[BananaCrystal MCP] Starting server...');
    console.error('[BananaCrystal MCP] API URL:', apiUrl);
    console.error(
      '[BananaCrystal MCP] API Key:',
      apiKey.substring(0, 10) + '...',
    );
  }

  // Create MCP server
  const server = new Server(
    {
      name: 'bananacrystal-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  // Create API client
  const client = new BananaCrystalClient(apiUrl, apiKey, debug);

  // Register all tools
  registerTools(server, client);

  // Connect via stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  if (debug) {
    console.error('[BananaCrystal MCP] Server connected and ready');
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
