import { Package, TrendingUp, Wallet, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
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

type NinaChatPanelAlign = "centered" | "split";

/** 赛博聊天 + Skill pills；`split` 时标题在大屏与左侧文案对齐 */
export function NinaChatPanel({
  align = "centered",
  className,
}: {
  align?: NinaChatPanelAlign;
  className?: string;
}) {
  const titleRow =
    align === "split"
      ? "mb-4 flex flex-col items-center text-center sm:mb-5 lg:items-start lg:text-left"
      : "mb-4 flex flex-col items-center text-center sm:mb-5";

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className={titleRow}>
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-x-3 gap-y-2",
            align === "split" && "lg:justify-start"
          )}
        >
          <h2 className="text-balance text-lg font-medium tracking-tight text-foreground sm:text-xl md:text-2xl">
            Build your agent with Antalpha AI
          </h2>
          <svg
            aria-hidden
            className="h-6 w-6 shrink-0 text-blue-400/75 sm:h-7 sm:w-7"
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
      </div>

      <div className="w-full space-y-4 sm:space-y-5" aria-label="Skill 安装演示聊天区">
        <div
          className={cn(
            "nina-chat-shell nina-chat-shell--compact w-full",
            align === "split" && "nina-chat-shell--split"
          )}
        >
          <CyberMcpChatDemo />
        </div>

        <div
          className={cn(
            "flex",
            align === "split" ? "justify-center lg:justify-start" : "justify-center"
          )}
        >
          <SkillLinksRow />
        </div>

        <p
          className={cn(
            "text-[11px] text-muted-foreground",
            align === "split" ? "text-center lg:text-left" : "text-center"
          )}
        >
          AI SDK · MCP（mcp.prime.antalpha.com）· 演示动画（Skill 安装引导），非实时对话
        </p>
      </div>
    </div>
  );
}

/** 独立区块版（整宽居中）；首页首屏请用 `LandingFirstScreen` */
export function NinaChatDemoSection() {
  return (
    <section className="relative shrink-0 border-t border-border/30 pb-6 pt-3 sm:pb-8 sm:pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NinaChatPanel align="centered" />
      </div>
    </section>
  );
}
