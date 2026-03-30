import type { UIMessage } from "ai";
import { getToolName, isToolUIPart } from "ai";

/**
 * Collects tool names from assistant message parts where the invocation has
 * finished (success or error). Used to drive Skill Card UI.
 */
export function extractCompletedToolNames(
  parts: UIMessage["parts"],
): string[] {
  const names: string[] = [];
  for (const part of parts) {
    if (!isToolUIPart(part)) continue;
    const { state } = part;
    if (state !== "output-available" && state !== "output-error") continue;
    names.push(getToolName(part));
  }
  return [...new Set(names)];
}
