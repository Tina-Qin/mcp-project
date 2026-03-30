"use client";

import {
  Wallet,
  History,
  Layers,
  LineChart,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

import { AgentPlatformsBand } from "@/components/landing/agent-platforms-band";

const GITHUB_ORG = "https://github.com/AntalphaAI";
const PRIME_MCP_URL = "https://mcp.prime.antalpha.com/mcp";
const WEB3_SKILLS_MCP_URL = "https://mcp-skills.prime.antalpha.com/mcp";

type Capability = {
  title: string;
  titleCn: string;
  description: string;
  dataSources: string;
  intentExample: string;
  skillExample?: string;
  routerKey: string;
  poweredBy: string[];
  icon: LucideIcon;
  /** GitHub repo name under AntalphaAI */
  githubRepo: string;
};

const capabilities: Capability[] = [
  {
    title: "Wallet Balance",
    titleCn: "余额查询",
    description:
      "查询任意地址在多链、多资产上的余额聚合，一次看清持仓结构。",
    dataSources: "DeBank · On-chain RPC",
    intentExample: '"wallet_balance"',
    skillExample: "wallet-balance",
    routerKey: "wallet.balance",
    poweredBy: ["DeBank", "On-chain RPC"],
    icon: Wallet,
    githubRepo: "wallet-balance",
  },
  {
    title: "Transaction History",
    titleCn: "交易查询",
    description:
      "人类可读的交易收据：查询状态、手续费、多链 Token 划转，便于对账与行为分析。",
    dataSources: "DeBank · Dune",
    intentExample: '"tx_history"',
    skillExample: "transaction-receipt",
    routerKey: "tx.history",
    poweredBy: ["DeBank", "Dune"],
    icon: History,
    githubRepo: "transaction-receipt",
  },
  {
    title: "DeFi & Trading",
    titleCn: "DeFi 与交易",
    description:
      "DEX 询价、最优路由与执行相关能力；借贷、LP、质押等仓位由 Router 聚合返回。",
    dataSources: "DeBank · DefiLlama",
    intentExample: '"defi_positions"',
    skillExample: "web3-trader",
    routerKey: "defi.position",
    poweredBy: ["DeBank", "DefiLlama"],
    icon: Layers,
    githubRepo: "web3-trader",
  },
  {
    title: "Analytics & Smart Money",
    titleCn: "分析与聪明钱",
    description:
      "按 Token / 地址集做持仓与流向分析，跟踪 Smart Money 与巨鲸信号。",
    dataSources: "Nansen · Dune",
    intentExample: '"smart_money"',
    skillExample: "smart-money",
    routerKey: "smart.money",
    poweredBy: ["Nansen", "Dune"],
    icon: LineChart,
    githubRepo: "smart-money",
  },
];

function githubRepoUrl(repo: string) {
  return `${GITHUB_ORG}/${repo}`;
}

export function CapabilitiesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-blue-500">
            Capabilities
          </h2>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">
            What your Agent can do with AntAlpha
          </p>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            典型链上能力，一次接入全打通
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground/90">
            Router 不是抽象概念——每个能力对应可调用的 Key / Skill，并由典型数据源
            提供结果。
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
            <a
              href={GITHUB_ORG}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-blue-400 underline-offset-4 hover:text-blue-300 hover:underline"
            >
              Open source · AntalphaAI
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-muted-foreground">
              Prime RWA 见{" "}
              <a
                href={`${GITHUB_ORG}/antalpha-rwa-skill`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-400 underline-offset-4 hover:underline"
              >
                antalpha-rwa-skill
              </a>
            </span>
          </div>
        </div>

        <div className="mb-10 rounded-lg border border-blue-500/25 bg-blue-500/5 px-4 py-5 sm:px-6">
          <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-400">
            MCP · 统一接入
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            安装下列开源 Skill 后，在 Agent 的 MCP 配置中接入对应端点，即可按 Router Key
            / 工具名调用。常用 Server：{" "}
            <code className="rounded bg-secondary/60 px-1 py-0.5 font-mono text-xs text-foreground">
              antalpha-prime
            </code>{" "}
            →{" "}
            <a
              href={PRIME_MCP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-mono text-xs text-blue-400 hover:underline"
            >
              {PRIME_MCP_URL}
            </a>
            ；{" "}
            <code className="rounded bg-secondary/60 px-1 py-0.5 font-mono text-xs text-foreground">
              web3-skills
            </code>{" "}
            →{" "}
            <a
              href={WEB3_SKILLS_MCP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-mono text-xs text-blue-400 hover:underline"
            >
              {WEB3_SKILLS_MCP_URL}
            </a>
            。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((cap) => (
            <div
              key={cap.routerKey}
              className="group relative flex flex-col overflow-hidden border border-border/30 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] sm:p-8"
            >
              <div className="mb-5 inline-flex w-fit border border-blue-500/20 bg-blue-500/5 p-3">
                <cap.icon className="h-6 w-6 text-blue-500" />
              </div>

              <h3 className="mb-1 text-xl font-bold text-foreground">
                {cap.title}
              </h3>
              <p className="mb-4 font-mono text-xs font-medium text-blue-500">
                {cap.titleCn}
              </p>

              <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {cap.description}
              </p>

              <div className="mb-4 space-y-2 border-t border-border/30 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Data sources
                </p>
                <p className="text-sm text-foreground">{cap.dataSources}</p>
              </div>

              <div className="mb-4 rounded-md border border-border/40 bg-background/60 p-3 font-mono text-xs leading-relaxed text-muted-foreground">
                <span className="text-blue-400">intent:</span>{" "}
                <span className="text-blue-300">{cap.intentExample}</span>
                {cap.skillExample ? (
                  <>
                    <span className="text-muted-foreground"> · </span>
                    <span className="text-blue-400">skill:</span>{" "}
                    <span className="text-blue-300">{cap.skillExample}</span>
                  </>
                ) : null}
              </div>

              <div className="mb-5">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Powered by
                </p>
                <div className="flex flex-wrap gap-2">
                  {cap.poweredBy.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center rounded border border-border/40 bg-secondary/40 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground/90"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5 rounded-md border border-border/40 bg-background/40 p-3">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  GitHub Skill
                </p>
                <a
                  href={githubRepoUrl(cap.githubRepo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 break-all font-mono text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline"
                >
                  AntalphaAI/{cap.githubRepo}
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </a>
              </div>

              <div className="mt-auto border-t border-border/30 pt-4 font-mono text-[11px] text-muted-foreground">
                Router Key:{" "}
                <code className="rounded bg-secondary/50 px-1.5 py-0.5 text-blue-400">
                  {cap.routerKey}
                </code>
              </div>

              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:bg-blue-500/10" />
            </div>
          ))}
        </div>

        <AgentPlatformsBand />
      </div>
    </section>
  );
}
