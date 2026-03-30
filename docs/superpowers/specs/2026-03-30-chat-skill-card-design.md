# Design: Chat Skill Card (mcp-project)

**Status:** Approved for implementation planning  
**Date:** 2026-03-30  
**Scope:** mcp-project only (not prime-next in v1)

## Problem

Users cannot see which **Skill** (logical capability) or **tool** powered a given assistant reply, nor find installation instructions. The product goal is to show a **Skill Card** under assistant messages in a **real** chat surface, with **View details** (drawer) and **Install to my Agent** (copy MCP snippet + links), aligned with MCP adoption.

## Goals

1. After a reply that involved tool execution, show **「已使用 Skill:」** with one or more **tags** (mapped display names), plus **查看详情** and **安装到我的 Agent**.
2. **查看详情** opens a **Sheet** with: capability summary, inputs/outputs (as documented in static data), data sources list, MCP config snippet, and links to GitHub/docs (**hybrid static + external**).
3. **安装** v1: **copy MCP configuration** to clipboard with success/error toast; optional placeholder or disabled state for “one-click import” to other platforms if no stable integration exists.
4. **Do not** change the landing page scripted demo behavior; **real** chat lives on a **separate route** (e.g. `/chat`).

## Non-goals (v1)

- Replacing or merging the animated `CyberMcpChatDemo` with live chat on the same widget.
- Server-injected `usedSkillIds` metadata in the stream (may be revisited in v2).
- Parsing full `SKILL.md` at runtime for the drawer body (hybrid: static summaries + outbound links).
- Guaranteed “one-click import” for OpenAI/Claude without a defined URL or API.

## Decisions (locked)

| Topic | Choice |
|--------|--------|
| Product surface | **mcp-project** first |
| Skill naming in UI | **Registry:** `toolName` → `skillId` + display name(s) |
| Detail content | **C — Hybrid:** static structured fields in-repo + links to GitHub/docs |
| Entry | **1 —** Keep home demo; add **dedicated route** for live chat |
| Detection mechanism | **Client-side** parsing of assistant message **parts** from `useChat` + `toUIMessageStreamResponse()` (recommended over server-injected markers for v1) |

## Architecture

### Backend

- **No required change** to `app/api/chat/route.ts` for v1 beyond maintaining `streamText` + `toUIMessageStreamResponse()` compatibility with `@ai-sdk/react` `useChat`.
- Tool names exposed in UI message parts are the **source of truth** for “what ran.”

### Frontend

- New route: **`app/chat/page.tsx`** (name finalizable as `/chat` or `/try`; default ** `/chat`** in this spec).
- **`useChat`** from `@ai-sdk/react`, default transport targeting **`POST /api/chat`**.
- **Registry module** (e.g. `lib/skill-registry.ts` or imported JSON with types): maps **tool name** (and optional prefix/wildcard rules) → `skillId`, labels, `detailKey`, `mcpSnippet`, external URLs.
- **Components:** message list renders assistant text as today; **below** the assistant bubble, if tool parts resolve to at least one skill, render **`SkillUsedCard`**; **`SkillDetailSheet`** (shadcn **Sheet**) for details.

### Dynamic MCP tools (Web3)

- Registry MUST include a **fallback** entry for unknown tool names (e.g. generic “Web3 Skills (MCP)” copy + generic install guidance) **or** explicit prefix rules, so users never see a broken empty card. **Product default:** show **fallback** rather than hiding the card entirely.

### Multi-tool turns

- Collect **distinct `skillId`s** after mapping all tool names in the assistant message parts; **dedupe**. Presentation: **one card row, multiple tags** (or equivalent compact layout).

## Data model (registry)

Each mapping entry SHOULD include:

- **match:** exact `toolName` and/or prefix/pattern (implementation-defined, must be documented in code).
- **skillId:** stable string for React keys and detail lookup.
- **displayName:** primary UI string (Chinese; optional `displayNameEn` if needed).
- **detailKey:** key into static detail blob(s).
- **mcpSnippet:** string copied on install.
- **links:** `documentationUrl`, `repositoryUrl` (optional fields).

Static detail content (per `detailKey`): short **description**, **inputs/outputs** bullets, **data sources** list, same **mcpSnippet** (or reference), optional **notes**.

## User flows

1. User opens **`/chat`**, sends a message; assistant streams; tools may run.
2. When the assistant message contains completed tool parts, client derives tool names → registry → skill tags; **SkillUsedCard** appears under that message.
3. **查看详情** → opens Sheet with static detail for selected `skillId` / `detailKey`.
4. **安装到我的 Agent** → copy `mcpSnippet` → toast; failures surfaced clearly.

## Edge cases

| Case | Behavior |
|------|-----------|
| No tools in turn | No Skill Card. |
| Tool name not in registry | Use **fallback** skill row (see Dynamic MCP tools). |
| Skill in system prompt only, no tool call | No Skill Card (cannot infer from parts; v2 could add server metadata if required). |
| Copy fails | Toast error. |

## Testing (recommended)

- **Unit tests** for registry: given `toolName` → expected `skillId` / display fields / fallback.
- **Component tests** or story-level snapshots with **fixture UIMessage parts** (no live API) for Skill Card + Sheet.

## Future (out of scope for v1)

- Server-stream **data parts** with `usedSkillIds` to decouple display from tool rename churn.
- Read selective sections from `SKILL.md` at build time into generated JSON.
- First-class “import to platform” when URLs/APIs exist.

## Related code (reference)

- `app/api/chat/route.ts` — `streamText`, `toUIMessageStreamResponse()`.
- `components/landing/cyber-mcp-chat-demo.tsx` — scripted demo; **unchanged** in behavior for v1.
- `lib/load-skill.ts` — system prompt skills; orthogonal to Skill Card display.
