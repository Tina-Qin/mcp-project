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
  /** 与 `loadAgentsSkills` / 仓库一致的 Skill 包名，如 antalpha-rwa */
  agentsSkillPackage: string;
  /** MCP 配置中的 server 键，如 antalpha-prime */
  mcpServerKey: string;
  /** 实际连接的 MCP HTTP 端点 */
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
  /** SKILL 包 / 仓库侧名称 */
  agentsSkillPackage: string;
  /** MCP 配置里的 server 键 */
  mcpServerKey: string;
  /** 实际 MCP 端点 */
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
      "通过 Antalpha Prime MCP 查询在售 RWA 产品、认购规则，以及按以太坊地址查询订单。适用于产品介绍、认购流程与订单核对等场景。",
    inputs: [
      "list-products：参数 context（对用户问题的简短复述，满足 JSON 输入要求）。",
      "query-orders-by-address：参数 address（0x 开头的 40 位十六进制以太坊地址）。",
    ],
    outputs: [
      "产品列表：在售产品、收益率、期限、网络与代币等结构化数据。",
      "订单查询：与该地址相关的订单摘要（以接口返回为准）。",
    ],
    dataSources: ["Antalpha Prime 后端 / MCP"],
    mcpSnippet: SNIPPET_ANTALPHA_PRIME,
    repositoryUrl: "https://github.com/AntalphaAI/antalpha-rwa-skill",
    documentationUrl: "https://github.com/AntalphaAI/antalpha-rwa-skill",
  },
  "web3-mcp-fallback": {
    title: "Web3 Skills (MCP)",
    description:
      "来自 Antalpha Web3 Skills MCP 的动态工具（工具名随服务版本变化）。用于链上数据、地址画像等扩展能力；具体能力以当前 MCP 暴露的 tools 为准。",
    inputs: ["依具体工具而定（由模型根据用户问题选择调用）。"],
    outputs: ["依具体工具返回的结构化或文本结果。"],
    dataSources: ["Web3 Skills MCP 聚合的数据提供方（随工具而异）"],
    mcpSnippet: SNIPPET_WEB3_SKILLS,
    repositoryUrl: "https://github.com/AntalphaAI",
    documentationUrl: "https://mcp-skills.prime.antalpha.com",
  },
};

export function getSkillDetail(detailKey: string): SkillDetailContent | undefined {
  return SKILL_DETAILS[detailKey];
}
