import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { BananaCrystalClient } from "../client.js";
import { createToolDefinitions } from "./definitions.js";
import { createToolHandlers } from "./handlers.js";

export function registerTools(server: Server, client: BananaCrystalClient) {
  const tools = createToolDefinitions();
  const handlers = createToolHandlers(client);

  // Register tools/list handler
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

  // Register tools/call handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const handler = handlers[name];

    if (!handler) {
      return {
        content: [{ type: "text" as const, text: `Unknown tool: ${name}` }],
        isError: true,
      };
    }

    try {
      const result = await handler(args || {});
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  });
}
