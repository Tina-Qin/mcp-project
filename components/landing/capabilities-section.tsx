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

type QuickCapability = {
  title: string;
  routerKey: string;
  icon: LucideIcon;
};

const capabilities: QuickCapability[] = [
  {
    title: "Balance",
    routerKey: "wallet.balance",
    icon: Wallet,
  },
  {
    title: "Transactions",
    routerKey: "tx.history",
    icon: History,
  },
  {
    title: "DeFi & trading",
    routerKey: "defi.position",
    icon: Layers,
  },
  {
    title: "Analytics & smart money",
    routerKey: "smart.money",
    icon: LineChart,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            What your Agent can do with AntAlpha
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Typical on-chain capabilities—one integration, fully connected
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground/90">
            The Router is concrete: each capability maps to callable Keys / Skills, backed by
            representative data sources.
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
              Prime RWA: see{" "}
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

        <div className="mb-12 rounded-xl border border-blue-500/20 bg-linear-to-b from-blue-500/7 to-transparent px-4 py-6 sm:px-8 sm:py-8">
          <div className="border-b border-border/30 pb-8">
            <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-400">
              MCP · unified access
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              After installing the open-source Skills below, add the matching endpoints in your
              Agent’s MCP config to call by Router Key / tool name. Common servers:{" "}
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
              ;{" "}
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
              .
            </p>
          </div>

          <div className="pt-8">
            <div className="mb-6 text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-blue-400">
                Core keys · quick reference
              </p>
              <p className="mt-2 text-lg font-bold text-foreground sm:text-xl">
                Capabilities and Router Keys
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Balance, transactions, DeFi, smart money—each Key maps to one callable on-chain
                capability class
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((cap) => (
                <div
                  key={cap.routerKey}
                  className="flex flex-col rounded-lg border border-border/50 bg-card/40 px-4 py-4 backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <cap.icon className="h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                    <span className="text-sm font-semibold text-foreground">
                      {cap.title}
                    </span>
                  </div>
                  <code className="break-all rounded-md border border-blue-500/30 bg-blue-500/10 px-2.5 py-2 text-center font-mono text-sm font-semibold text-blue-300">
                    {cap.routerKey}
                  </code>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border/30 pt-6">
              <p className="mb-3 text-center font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Representative data sources (aggregated across capabilities)
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["DeBank", "DefiLlama", "Dune", "Nansen", "On-chain RPC"].map(
                  (name) => (
                    <span
                      key={name}
                      className="inline-flex items-center rounded-full border border-blue-500/25 bg-secondary/50 px-3 py-1.5 font-mono text-xs font-medium text-foreground/95"
                    >
                      {name}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <AgentPlatformsBand />
      </div>
    </section>
  );
}
