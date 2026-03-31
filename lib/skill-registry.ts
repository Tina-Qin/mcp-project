/**
 * Maps AI SDK / MCP tool names to logical "Skill" metadata for UI (tags, drawer, install).
 * Extend `TOOL_TO_SKILL` for new static tools; unknown tools use `web3-mcp-fallback`.
 */

export type SkillDetailContent = {
  title: string;
  description: string;
  inputs: string[];
  outputs: string[];
  dataSources: string[];
  mcpSnippet: string;
  repositoryUrl?: string;
  documentationUrl?: string;
};

type RegistryRow = {
  skillId: string;
  displayName: string;
  detailKey: string;
  mcpSnippet: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  /** Skill package name aligned with `loadAgentsSkills` / repo, e.g. antalpha-rwa */
  agentsSkillPackage: string;
  /** MCP server key in config, e.g. antalpha-prime */
  mcpServerKey: string;
  /** Actual MCP HTTP endpoint URL */
  mcpEndpointUrl: string;
};

const PRIME_MCP_URL = "https://mcp.prime.antalpha.com/mcp";
const WEB3_SKILLS_MCP_URL = "https://mcp-skills.prime.antalpha.com/mcp";

const SNIPPET_ANTALPHA_PRIME = `{
  "mcpServers": {
    "antalpha-prime": {
      "url": "${PRIME_MCP_URL}"
    }
  }
}`;

const SNIPPET_WEB3_SKILLS = `{
  "mcpServers": {
    "web3-skills": {
      "url": "${WEB3_SKILLS_MCP_URL}"
    }
  }
}`;

const ROW_ANTALPHA_RWA: RegistryRow = {
  skillId: "antalpha-rwa",
  displayName: "Antalpha RWA",
  detailKey: "antalpha-rwa",
  mcpSnippet: SNIPPET_ANTALPHA_PRIME,
  repositoryUrl: "https://github.com/AntalphaAI/antalpha-rwa-skill",
  documentationUrl: "https://github.com/AntalphaAI/antalpha-rwa-skill",
  agentsSkillPackage: "antalpha-rwa",
  mcpServerKey: "antalpha-prime",
  mcpEndpointUrl: PRIME_MCP_URL,
};

const ROW_WEB3_FALLBACK: RegistryRow = {
  skillId: "web3-mcp-fallback",
  displayName: "Web3 Skills (MCP)",
  detailKey: "web3-mcp-fallback",
  mcpSnippet: SNIPPET_WEB3_SKILLS,
  repositoryUrl: "https://github.com/AntalphaAI",
  documentationUrl: "https://mcp-skills.prime.antalpha.com",
  agentsSkillPackage: "web3-skills",
  mcpServerKey: "web3-skills",
  mcpEndpointUrl: WEB3_SKILLS_MCP_URL,
};

/** Exact tool name → registry row (static tools from `app/api/chat/route.ts`). */
const TOOL_TO_SKILL: Record<string, RegistryRow> = {
  "list-products": ROW_ANTALPHA_RWA,
  "query-orders-by-address": ROW_ANTALPHA_RWA,
};

export function resolveRegistryRowForTool(toolName: string): RegistryRow {
  return TOOL_TO_SKILL[toolName] ?? ROW_WEB3_FALLBACK;
}

export type ResolvedSkill = {
  skillId: string;
  displayName: string;
  detailKey: string;
  mcpSnippet: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  /** Tool names in this turn that mapped to this skill */
  sourceToolNames: string[];
  /** Skill package / repo name */
  agentsSkillPackage: string;
  /** Server key in MCP config */
  mcpServerKey: string;
  /** MCP endpoint URL */
  mcpEndpointUrl: string;
};

export function resolveSkillsFromToolNames(
  toolNames: string[],
): ResolvedSkill[] {
  const byId = new Map<string, ResolvedSkill>();
  for (const tool of toolNames) {
    const row = resolveRegistryRowForTool(tool);
    const prev = byId.get(row.skillId);
    if (prev) {
      if (!prev.sourceToolNames.includes(tool)) {
        prev.sourceToolNames.push(tool);
      }
    } else {
      byId.set(row.skillId, {
        skillId: row.skillId,
        displayName: row.displayName,
        detailKey: row.detailKey,
        mcpSnippet: row.mcpSnippet,
        repositoryUrl: row.repositoryUrl,
        documentationUrl: row.documentationUrl,
        sourceToolNames: [tool],
        agentsSkillPackage: row.agentsSkillPackage,
        mcpServerKey: row.mcpServerKey,
        mcpEndpointUrl: row.mcpEndpointUrl,
      });
    }
  }
  return [...byId.values()];
}

export function buildCombinedInstallSnippet(skills: ResolvedSkill[]): string {
  return skills
    .map((s) => `# ${s.displayName}\n${s.mcpSnippet}`)
    .join("\n\n---\n\n");
}

export const SKILL_DETAILS: Record<string, SkillDetailContent> = {
  "antalpha-rwa": {
    title: "Antalpha RWA",
    description:
      "Query on-sale RWA products and subscription rules via Antalpha Prime MCP, and look up orders by Ethereum address. Use for product overviews, subscription flows, and order checks.",
    inputs: [
      "list-products: parameter `context` (short restatement of the user’s question for valid JSON input).",
      "query-orders-by-address: parameter `address` (0x-prefixed 40-character hex Ethereum address).",
    ],
    outputs: [
      "Product list: structured data for on-sale products, yields, tenor, network, and token.",
      "Order query: order summary for that address (per API response).",
    ],
    dataSources: ["Antalpha Prime backend / MCP"],
    mcpSnippet: SNIPPET_ANTALPHA_PRIME,
    repositoryUrl: "https://github.com/AntalphaAI/antalpha-rwa-skill",
    documentationUrl: "https://github.com/AntalphaAI/antalpha-rwa-skill",
  },
  "web3-mcp-fallback": {
    title: "Web3 Skills (MCP)",
    description:
      "Dynamic tools from Antalpha Web3 Skills MCP (tool names may change with the service version). For on-chain data, address profiles, and other extensions; see the tools currently exposed by the MCP.",
    inputs: ["Depends on the tool (the model chooses calls based on the user’s question)."],
    outputs: ["Structured or text results per tool."],
    dataSources: ["Data providers aggregated by Web3 Skills MCP (varies by tool)"],
    mcpSnippet: SNIPPET_WEB3_SKILLS,
    repositoryUrl: "https://github.com/AntalphaAI",
    documentationUrl: "https://mcp-skills.prime.antalpha.com",
  },
};

export function getSkillDetail(detailKey: string): SkillDetailContent | undefined {
  return SKILL_DETAILS[detailKey];
}
