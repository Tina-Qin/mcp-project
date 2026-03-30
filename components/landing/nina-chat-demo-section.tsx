import { Package, TrendingUp, Wallet, type LucideIcon } from "lucide-react";

import { CyberMcpChatDemo } from "./cyber-mcp-chat-demo";

const SKILL_LINKS: {
  id: string;
  label: string;
  href: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "antalpha-rwa-skill",
    label: "antalpha-rwa-skill",
    href: "https://github.com/AntalphaAI/antalpha-rwa-skill",
    Icon: Package,
  },
  {
    id: "web3-trader",
    label: "web3-trader",
    href: "https://github.com/AntalphaAI/web3-trader",
    Icon: TrendingUp,
  },
  {
    id: "wallet-balance",
    label: "wallet-balance",
    href: "https://github.com/AntalphaAI/wallet-balance",
    Icon: Wallet,
  },
];

function SkillLinksRow() {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="相关开源 Skill 仓库">
      {SKILL_LINKS.map(({ id, label, href, Icon }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#333333] px-3.5 py-2 text-[13px] leading-none text-zinc-50 transition-colors hover:bg-zinc-700"
        >
          <Icon className="size-4 shrink-0 text-[#5B8DEF]" aria-hidden />
          <span className="truncate font-normal">{label}</span>
        </a>
      ))}
    </div>
  );
}

/** AgentFi / www 同款：赛博聊天演示 + Skill pills，置于 Ecosystem 下方 */
export function NinaChatDemoSection() {
  return (
    <section
      id="nina-demo"
      className="relative border-t border-border/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center sm:justify-start">
          <h2 className="text-balance text-xl font-medium tracking-normal text-foreground [word-spacing:0.18em] sm:text-2xl md:text-[1.625rem] md:leading-snug">
            Build your web agent with Antalpha
          </h2>
          <svg
            aria-hidden
            className="h-6 w-6 shrink-0 text-muted-foreground sm:h-7 sm:w-7"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.35"
            viewBox="0 0 24 24"
          >
            <title>Sparkle</title>
            <path d="M12 2l1.2 7.3L21 11l-7.8 1.7L12 21l-1.2-8.3L3 11l7.8-1.7L12 2Z" />
          </svg>
        </div>

        <div
          className="w-full"
          style={{
            filter:
              "drop-shadow(0 25px 50px rgba(92, 240, 255, 0.12)) drop-shadow(0 8px 32px rgba(217, 70, 239, 0.08))",
          }}
        >
          <CyberMcpChatDemo />
        </div>

        <div className="mt-6 flex justify-center sm:justify-start">
          <SkillLinksRow />
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground sm:text-left">
          AI SDK · MCP（mcp.prime.antalpha.com）· 演示动画，非实时对话
        </p>
      </div>
    </section>
  );
}
