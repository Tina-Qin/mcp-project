import {
  streamText,
  stepCountIs,
  convertToModelMessages,
  tool,
  type ToolSet,
} from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createMCPClient } from "@ai-sdk/mcp";
import { z } from "zod";
import {
  fetchAntalphaOrdersByAddress,
  fetchAntalphaProductList,
} from "@/lib/antalpha-prime-mcp";
import { loadAgentsSkills, loadSkillReferences } from "@/lib/load-skill";

const provider = createOpenAI({
  baseURL: "https://newapi.elevatesphere.com/v1",
  apiKey: process.env.NEW_API_KEY,
});

const DEFAULT_SKILLS = ["antalpha-rwa"];

function createAntalphaPrimeTools(baseUrl: string): ToolSet {
  return {
    "list-products": tool({
      description:
        "List current Antalpha Prime RWA products (on-sale offerings, yields, terms). Use when the user asks about products, 在售, 产品介绍, or subscription options.",
      inputSchema: z.object({
        context: z
          .string()
          .min(2)
          .describe(
            "Short phrase echoing the user's request (ensures valid JSON tool input).",
          ),
      }),
      execute: async ({ context }) => {
        void context;
        return fetchAntalphaProductList(baseUrl);
      },
    }),
    "query-orders-by-address": tool({
      description:
        "Query Antalpha RWA orders for an Ethereum wallet address (0x + 40 hex).",
      inputSchema: z.object({
        address: z
          .string()
          .regex(
            /^0x[a-fA-F0-9]{40}$/,
            "Valid 0x-prefixed 40-hex Ethereum address",
          ),
      }),
      execute: async ({ address }) =>
        fetchAntalphaOrdersByAddress(baseUrl, address),
    }),
  } as ToolSet;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: unknown };
    const uiMessages = body.messages;
    if (!Array.isArray(uiMessages)) {
      return Response.json(
        { error: "Invalid body: expected { messages: UIMessage[] }" },
        { status: 400 },
      );
    }

    if (!process.env.NEW_API_KEY) {
      return Response.json(
        {
          error:
            "Missing NEW_API_KEY. Add it to .env.local (see docs/env-chat.example).",
        },
        { status: 503 },
      );
    }

    const primeUrl =
      process.env.MCP_PRIME_URL ?? "https://mcp.prime.antalpha.com/mcp";
    const web3SkillsUrl =
      process.env.MCP_WEB3_SKILLS_URL ??
      "https://mcp-skills.prime.antalpha.com/mcp";

    let mcpTools: ToolSet = createAntalphaPrimeTools(primeUrl);
    try {
      const web3Client = await createMCPClient({
        name: "web3-skills",
        transport: { type: "http", url: web3SkillsUrl },
      });
      const web3Tools = await web3Client.tools().catch(() => ({} as ToolSet));
      mcpTools = { ...mcpTools, ...web3Tools };
    } catch {
      // Web3 MCP optional; Prime tools still work
    }

    const envSkills = process.env.CHAT_AGENT_SKILLS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const skillNames = envSkills?.length ? envSkills : DEFAULT_SKILLS;
    const skillBlocks = await loadAgentsSkills(skillNames);
    const refBlocks = await loadSkillReferences(skillNames);
    const baseSystem = `Your name is Nina. You are an assistant for Antalpha Prime RWA (on-chain real-world-asset style) products and general Web3 questions.

**Products & guidance**
- When the user asks about products, what's on sale, rates, "介绍一下产品", 在售产品, or similar: call **list-products** with a short **context** string summarizing their question, then summarize tool output in clear markdown (use tables when comparing multiple products). If the tool returns empty, say so and suggest they try again later.
- If they share an Ethereum address (0x...) and want order status: use **query-orders-by-address** with that address.
- Guide step by step: prefer self-custody wallets (not exchange deposit addresses), USDT on Ethereum per product rules, risks (returns not guaranteed, funds typically locked until maturity), and never ask for private keys or seed phrases.
- For payment links / subscribe flows, follow the SKILL.md instructions (e.g. local \`python3 scripts/rwa_client.py subscribe\` under \`assets/antalpha-rwa-skill/scripts/\`).

**Other tools**
- Use remaining MCP tools when the user asks for token lists or other supported Web3 lookups.

If a tool fails or returns no data, say so clearly.
Always respond in the same language the user uses.`;

    const systemParts: string[] = [baseSystem];
    if (skillBlocks.length > 0) {
      systemParts.push(
        `---\nThe following project SKILL.md instructions also apply:\n\n${skillBlocks.join("\n\n")}`,
      );
    }
    if (refBlocks.length > 0) {
      systemParts.push(
        `---\nThe following reference documents (FAQ, flows, MCP config) also apply:\n\n${refBlocks.join("\n\n")}`,
      );
    }
    const system = systemParts.join("\n\n");

    const messages = await convertToModelMessages(uiMessages, {
      tools: mcpTools,
      ignoreIncompleteToolCalls: true,
    });

    const result = streamText({
      model: provider.chat("claude-opus-4-6"),
      system,
      messages,
      tools: mcpTools,
      stopWhen: stepCountIs(10),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[api/chat]", error);
    const message =
      error instanceof Error ? error.message : "Chat request failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
