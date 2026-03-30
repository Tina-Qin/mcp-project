"use client";

type Platform = {
  id: string;
  /** Short label shown large (wordmark-style until official logos are added) */
  name: string;
  hint?: string;
};

type AgentCategory = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  platforms: Platform[];
};

const categories: AgentCategory[] = [
  {
    id: "personal",
    title: "个人智能体",
    titleEn: "Personal agents",
    description: "日常对话里查链上、装 Skill，对话即调用。",
    platforms: [
      { id: "openai", name: "OpenAI", hint: "GPTs · MCP" },
      { id: "claude-desktop", name: "Claude", hint: "Desktop" },
    ],
  },
  {
    id: "coding",
    title: "编程智能体",
    titleEn: "Coding agents",
    description: "在 IDE / 仓库内配置 MCP，用 Router Key 驱动链上能力。",
    platforms: [
      { id: "claude-code", name: "Claude Code", hint: "Anthropic" },
      { id: "cursor", name: "Cursor" },
    ],
  },
  {
    id: "collab",
    title: "智能体协作",
    titleEn: "Orchestration",
    description: "工作流与多 Agent 编排，同一套 antalpha-mcp 端点。",
    platforms: [
      { id: "openclaw", name: "OpenClaw" },
      { id: "dify", name: "Dify" },
    ],
  },
];

export function AgentPlatformsBand() {
  return (
    <div className="mt-20 border-t border-border/30 pt-16">
      <div className="mb-12 text-center">
        <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-blue-500">
          Who it&apos;s for
        </h3>
        <p className="text-xl font-bold text-foreground sm:text-2xl">
          Works with your favorite agent platforms
        </p>
        <p className="mt-2 text-base text-muted-foreground">
          个人智能体、编程智能体、协作工具——同一套 Router / MCP
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground/90">
          在 Agent 的 MCP 或 Skills 配置中启用{" "}
          <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs text-blue-400">
            antalpha-mcp
          </code>{" "}
          或安装相关 Skill，即可接入上文 Router Key。
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col border border-border/30 bg-card/20 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-500">
              {cat.titleEn}
            </div>
            <h4 className="mb-2 text-lg font-bold text-foreground">{cat.title}</h4>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              {cat.description}
            </p>

            <div className="mt-auto flex flex-col gap-4">
              {cat.platforms.map((p) => (
                <div
                  key={p.id}
                  className="flex min-h-[88px] items-center justify-center border border-border/40 bg-linear-to-b from-secondary/30 to-background/80 px-4 py-6 transition-colors hover:border-blue-500/40"
                >
                  <div className="text-center">
                    <div className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {p.name}
                    </div>
                    {p.hint ? (
                      <div className="mt-1 font-mono text-muted-foreground text-xs">
                        {p.hint}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center font-mono text-[11px] text-muted-foreground/70">
        商标与标识归各平台所有。展示名称仅供参考，接入方式以各产品文档为准。
      </p>
    </div>
  );
}
