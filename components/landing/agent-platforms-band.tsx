"use client";

import Image from "next/image";

type Platform = {
  id: string;
  name: string;
  hint?: string;
  /** Path under `/public`, e.g. `/agent-logos/openai.svg` */
  localLogo?: string;
  /** Wide wordmark (e.g. OpenAI); wider icon area */
  logoWide?: boolean;
  simpleIconSlug?: string;
  iconColor?: string;
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
    title: "Everyday chat",
    titleEn: "Personal agents",
    description:
      "Query on-chain data in everyday chat, install Skills, invoke from conversation.",
    platforms: [
      {
        id: "openai",
        name: "OpenAI",
        hint: "GPTs · MCP",
        localLogo: "/agent-logos/openai.svg",
        logoWide: true,
      },
      {
        id: "claude-desktop",
        name: "Claude",
        hint: "Desktop",
        simpleIconSlug: "anthropic",
        iconColor: "ffffff",
      },
    ],
  },
  {
    id: "coding",
    title: "IDE & repository",
    titleEn: "Coding agents",
    description:
      "Configure MCP in your IDE or repo; drive on-chain capabilities with Router Keys.",
    platforms: [
      {
        id: "claude-code",
        name: "Claude Code",
        hint: "Anthropic",
        simpleIconSlug: "anthropic",
        iconColor: "ffffff",
      },
      {
        id: "cursor",
        name: "Cursor",
        simpleIconSlug: "cursor",
        iconColor: "ffffff",
      },
    ],
  },
  {
    id: "collab",
    title: "Workflows & multi-agent",
    titleEn: "Orchestration",
    description:
      "Workflows and multi-agent orchestration on the same antalpha-mcp endpoint.",
    platforms: [
      {
        id: "openclaw",
        name: "OpenClaw",
        localLogo: "/agent-logos/openclaw.svg",
      },
      {
        id: "dify",
        name: "Dify",
        simpleIconSlug: "dify",
        iconColor: "ffffff",
      },
    ],
  },
];

function platformLogoSrc(p: Platform): string | null {
  if (p.localLogo) return p.localLogo;
  if (p.simpleIconSlug && p.iconColor) {
    return `https://cdn.simpleicons.org/${p.simpleIconSlug}/${p.iconColor}`;
  }
  return null;
}

function PlatformRow({ p }: { p: Platform }) {
  const iconSrc = platformLogoSrc(p);
  const isWide = !!p.logoWide;

  return (
    <div className="flex min-h-[88px] items-center gap-4 bg-linear-to-b from-secondary/30 to-background/80 px-4 py-4 transition-colors sm:gap-5 sm:px-5">
      <div
        className={`flex shrink-0 items-center justify-center ${
          isWide ? "h-12 min-w-28 max-w-36 sm:min-w-32" : "h-12 w-12"
        }`}
      >
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={isWide ? 140 : 48}
            height={48}
            className={
              isWide
                ? "h-10 w-auto max-h-10 max-w-36 object-contain object-left"
                : "h-12 w-12 object-contain opacity-95"
            }
            unoptimized
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 font-mono text-lg font-bold text-blue-300">
            {p.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <div className="font-mono text-base font-bold tracking-tight text-foreground sm:text-lg">
          {p.name}
        </div>
        {p.hint ? (
          <div className="mt-0.5 font-mono text-xs text-muted-foreground">
            {p.hint}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AgentPlatformsBand() {
  return (
    <div className="mt-20 pt-16">
      <div className="mb-12 text-center">
        <p className="text-xl font-bold text-foreground sm:text-2xl">
          Works with your favorite agent platforms
        </p>
        <p className="mt-2 text-base text-muted-foreground">
          Personal agents, coding agents, and collaboration tools—one Router / MCP stack
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground/90">
          Enable{" "}
          <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs text-blue-400">
            antalpha-mcp
          </code>{" "}
          in your Agent’s MCP or Skills settings, or install the related Skills, to use the Router
          Keys above.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col bg-card/20 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-500">
              {cat.titleEn}
            </div>
            <h4 className="mb-2 text-lg font-bold text-foreground">{cat.title}</h4>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              {cat.description}
            </p>

            <div className="mt-auto flex flex-col gap-3">
              {cat.platforms.map((p) => (
                <PlatformRow key={p.id} p={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
