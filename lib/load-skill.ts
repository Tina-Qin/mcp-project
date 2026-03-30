import { access, constants, readFile } from "fs/promises";
import { join } from "path";

/** Optional skill markdown under `assets/` (e.g. cloned antalpha-rwa-skill). */
const SKILL_ASSET_PATHS: Record<string, string> = {
  "antalpha-rwa": join(
    process.cwd(),
    "assets",
    "antalpha-rwa-skill",
    "SKILL.md",
  ),
};

const SKILL_REFERENCE_PATHS: Record<string, string[]> = {
  "antalpha-rwa": [
    join(
      process.cwd(),
      "assets",
      "antalpha-rwa-skill",
      "references",
      "FAQ.md",
    ),
  ],
};

export function stripYamlFrontmatter(markdown: string): string {
  const trimmed = markdown.trimStart();
  if (!trimmed.startsWith("---")) return markdown;
  const end = trimmed.indexOf("\n---", 3);
  if (end === -1) return markdown;
  return trimmed.slice(end + 4).trimStart();
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function loadAgentsSkill(skillName: string): Promise<string | null> {
  const agentsPath = join(process.cwd(), ".agents", "skills", skillName, "SKILL.md");
  const assetPath = SKILL_ASSET_PATHS[skillName];
  const filePath =
    (await fileExists(agentsPath))
      ? agentsPath
      : assetPath && (await fileExists(assetPath))
        ? assetPath
        : null;
  if (!filePath) return null;
  const raw = await readFile(filePath, "utf-8");
  return stripYamlFrontmatter(raw);
}

export async function loadAgentsSkills(skillNames: string[]): Promise<string[]> {
  const blocks: string[] = [];
  for (const name of skillNames) {
    const md = await loadAgentsSkill(name);
    if (md) blocks.push(`### Skill: ${name}\n\n${md}`);
  }
  return blocks;
}

export async function loadSkillReferences(skillNames: string[]): Promise<string[]> {
  const blocks: string[] = [];
  for (const name of skillNames) {
    const paths = SKILL_REFERENCE_PATHS[name];
    if (!paths) continue;
    for (const refPath of paths) {
      if (!(await fileExists(refPath))) continue;
      const raw = await readFile(refPath, "utf-8");
      const base = refPath.split(/[/\\]/).pop() ?? "reference";
      blocks.push(`### Reference (${name}): ${base}\n\n${raw.trim()}`);
    }
  }
  return blocks;
}
