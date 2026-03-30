"use client";

/**
 * Animated MCP chat demo — aligned with prime-next/apps/www
 * `agentfi/components/cyber-mcp-chat.tsx` (scenarios & UI parity).
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import "./cyber-mcp-chat-demo.css";

const NINA_AVATAR = "/nina-avatar.png";

type BubbleVariant = "user" | "assistant";

type DemoPhase = "input" | "send" | "user_in_chat" | "assistant" | "loop_pause";

type ChatDemoScenario = {
  id: string;
  headerStripe: string;
  userPrompt: string;
  assistantLines: string[];
};

const CHAT_SCENARIOS: ChatDemoScenario[] = [
  {
    id: "s1-install",
    headerStripe: "SKILL · INSTALL",
    userPrompt: "我想给自己的 Agent 装上 antalpha-rwa-skill，要怎么操作？",
    assistantLines: [
      "推荐两步：① 打开 GitHub 上的 `antalpha-rwa-skill` 仓库，按 README 把技能包加入你的 Agents / Cursor 技能列表；② 或在客户端接入官方 MCP（mcp.prime.antalpha.com），启用 `antalpha-rwa` 后保存并重载 Agent。装好后你的助理就能按 SKILL 约定调用 RWA 相关能力。",
    ],
  },
  {
    id: "s2-mcp-only",
    headerStripe: "MCP · CONNECT",
    userPrompt: "不想拷仓库，只用 MCP 可以吗？",
    assistantLines: [
      "可以。配置 MCP 指向 `mcp.prime.antalpha.com`，在可用技能里勾选 `antalpha-rwa`，保存后重载即可；无需本地 clone，工具与约定仍以官方 SKILL 为准。",
    ],
  },
  {
    id: "s3-why",
    headerStripe: "SKILL · HIGHLIGHT",
    userPrompt: "为什么先装 antalpha-rwa-skill？",
    assistantLines: [
      "这是我们为 RWA 固收与链上认购场景主推的开源 Skill：把产品说明、认购与风控要点封装成 Agent 可调用的能力，和本站 MCP 一致，最适合快速搭一个「会讲 RWA」的 Web Agent。",
    ],
  },
  {
    id: "s4-repo",
    headerStripe: "GITHUB · REPO",
    userPrompt: "仓库地址发我一下。",
    assistantLines: [
      "开源地址：`https://github.com/AntalphaAI/antalpha-rwa-skill`。建议 Star 后按文档安装；页面下方也有 antalpha-rwa-skill 快捷入口，可一键跳到仓库开始装。",
    ],
  },
  {
    id: "s5-troubleshoot",
    headerStripe: "AGENT · RELOAD",
    userPrompt: "装好了但对话里没反应？",
    assistantLines: [
      "先确认技能已写入 Agent 配置并已保存；若走 MCP，检查端点与网络。仍无工具时，重启客户端或重载 Agent，并核对技能 ID 是否为 `antalpha-rwa`。",
    ],
  },
  {
    id: "s6-more-skills",
    headerStripe: "SKILLS · ECOSYSTEM",
    userPrompt: "除了 RWA，还能装别的 Skill 吗？",
    assistantLines: [
      "可以。同一套方式可叠加 web3-trader、wallet-balance 等开源 Skill；若你的场景以 RWA 为主，仍建议优先装好 antalpha-rwa-skill，再按需扩展。",
    ],
  },
];

const INPUT_CHAR_MS = 38;
const INPUT_DONE_PAUSE_MS = 450;
const SEND_ANIM_MS = 480;
const USER_TO_AI_DELAY_MS = 320;
const ASSISTANT_CHAR_MS = 32;
const ASSISTANT_LINE_PAUSE_MS = 520;
const LOOP_PAUSE_MS = 4200;

export function CyberMcpChatDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>("input");
  const [inputCharIndex, setInputCharIndex] = useState(0);
  const [assistantLineIndex, setAssistantLineIndex] = useState(0);
  const [assistantCharIndex, setAssistantCharIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scenario = CHAT_SCENARIOS[scenarioIndex] ?? CHAT_SCENARIOS[0];
  const userPrompt = scenario.userPrompt;
  const assistantLines = scenario.assistantLines;

  useEffect(() => {
    if (phase !== "input") {
      return;
    }
    if (inputCharIndex >= userPrompt.length) {
      const t = window.setTimeout(() => {
        setPhase("send");
      }, INPUT_DONE_PAUSE_MS);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setInputCharIndex((c) => c + 1);
    }, INPUT_CHAR_MS);
    return () => window.clearTimeout(t);
  }, [phase, inputCharIndex, userPrompt]);

  useEffect(() => {
    if (phase !== "send") {
      return;
    }
    const t = window.setTimeout(() => {
      setPhase("user_in_chat");
    }, SEND_ANIM_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "user_in_chat") {
      return;
    }
    const t = window.setTimeout(() => {
      setPhase("assistant");
      setAssistantLineIndex(0);
      setAssistantCharIndex(0);
    }, USER_TO_AI_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "assistant") {
      return;
    }
    const line = assistantLines[assistantLineIndex];
    if (!line) {
      return;
    }
    const full = line;
    if (assistantCharIndex < full.length) {
      const t = window.setTimeout(() => {
        setAssistantCharIndex((c) => c + 1);
      }, ASSISTANT_CHAR_MS);
      return () => window.clearTimeout(t);
    }
    if (assistantLineIndex < assistantLines.length - 1) {
      const t = window.setTimeout(() => {
        setAssistantLineIndex((l) => l + 1);
        setAssistantCharIndex(0);
      }, ASSISTANT_LINE_PAUSE_MS);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setPhase("loop_pause");
    }, ASSISTANT_LINE_PAUSE_MS);
    return () => window.clearTimeout(t);
  }, [phase, assistantLineIndex, assistantCharIndex, assistantLines]);

  useEffect(() => {
    if (phase !== "loop_pause") {
      return;
    }
    const t = window.setTimeout(() => {
      setScenarioIndex((i) => (i + 1) % CHAT_SCENARIOS.length);
      setPhase("input");
      setInputCharIndex(0);
      setAssistantLineIndex(0);
      setAssistantCharIndex(0);
    }, LOOP_PAUSE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });

  const inputText = phase === "input" || phase === "send" ? userPrompt.slice(0, inputCharIndex) : "";
  const showInputCursor = phase === "input" && inputCharIndex < userPrompt.length;
  const showUserInChat = phase === "user_in_chat" || phase === "assistant" || phase === "loop_pause";

  const assistantCompleted =
    phase === "assistant"
      ? assistantLines.slice(0, assistantLineIndex)
      : phase === "loop_pause"
        ? assistantLines
        : [];

  const currentAssistantLine = phase === "assistant" ? assistantLines[assistantLineIndex] : undefined;
  const assistantPartial = currentAssistantLine !== undefined ? currentAssistantLine.slice(0, assistantCharIndex) : "";
  const showAssistantCursor =
    phase === "assistant" &&
    currentAssistantLine !== undefined &&
    assistantCharIndex < currentAssistantLine.length;

  const sendPressed = phase === "send";

  return (
    <div className="cyber-mcp-chat-demo-root w-full">
      <div className="af-cyber-chat-window">
        <div className="af-cyber-chat-header">
          <div className="af-cyber-chat-header-left">
            <Image
              alt="Nina"
              className="h-7 w-7 shrink-0 rounded-full border border-white/10 object-cover"
              height={28}
              src={NINA_AVATAR}
              width={28}
            />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-sm font-semibold leading-tight text-zinc-100">Nina</span>
              <span className="text-[11px] leading-none text-emerald-400/90">在线</span>
            </div>
          </div>
          <span className="af-cyber-chat-header-context" title={scenario.headerStripe}>
            {scenario.headerStripe}
          </span>
        </div>

        <div className="af-cyber-chat-body-wrap">
          <div className="af-cyber-chat-grid-bg" aria-hidden />
          <div className="af-cyber-chat-scan" aria-hidden />

          <div ref={scrollRef} className="af-cyber-chat-body">
            {showUserInChat ? <ChatBlock variant="user" text={userPrompt} /> : null}
            {assistantCompleted.map((text, i) => (
              <ChatBlock key={`${scenario.id}-done-${i}`} variant="assistant" text={text} />
            ))}
            {currentAssistantLine !== undefined && phase === "assistant" ? (
              <ChatBlock variant="assistant" text={assistantPartial} showCursor={showAssistantCursor} />
            ) : null}
          </div>

          <div className="af-cyber-chat-input-row">
            <div className="af-cyber-chat-input-fake min-h-10 min-w-0 flex-1 items-start pt-0.5">
              <span className="shrink-0 text-[#5cf0ff]/50">&gt;</span>
              <div className="min-w-0 flex-1">
                {phase === "input" || phase === "send" ? (
                  <span className="text-[#c4f9f0]/95">
                    {inputText}
                    {showInputCursor ? (
                      <span className="af-cyber-chat-cursor ml-0.5 inline-block h-3.5 w-1.5 align-[-2px] bg-[#d946ef]" />
                    ) : null}
                  </span>
                ) : (
                  <span className="text-[#71717a] [word-spacing:0.16em]">antalpha-rwa-skill</span>
                )}
              </div>
            </div>
            <button
              type="button"
              className={`af-cyber-chat-send ${sendPressed ? "af-cyber-chat-send--pressed" : ""}`}
              aria-label="Send (demo)"
              tabIndex={-1}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <title>Send</title>
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBlock(props: { variant: BubbleVariant; text: string; showCursor?: boolean }) {
  const { variant, text, showCursor } = props;
  const isUser = variant === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`af-cyber-chat-bubble af-font-mono max-w-[95%] px-3 py-2.5 text-[12px] leading-relaxed whitespace-pre-wrap ${
          isUser ? "af-cyber-chat-bubble-user text-[#e0e7ff]" : "af-cyber-chat-bubble-bot text-[#c4f9f0]"
        }`}
      >
        <div
          className={`mb-1.5 flex items-center gap-2 ${
            isUser ? "text-[10px] font-bold uppercase tracking-widest text-[#c4b5fd]" : ""
          }`}
        >
          {isUser ? (
            "[ USER ]"
          ) : (
            <>
              <Image
                alt="Nina"
                className="h-5 w-5 shrink-0 rounded-xs object-cover ring-1 ring-white/10"
                height={20}
                src={NINA_AVATAR}
                width={20}
              />
              <span className="text-[10px] font-bold tracking-wide text-[#5cf0ff]">Nina</span>
            </>
          )}
        </div>
        <div className="relative">
          {text}
          {showCursor ? (
            <span className="af-cyber-chat-cursor ml-0.5 inline-block h-3.5 w-1.5 align-[-2px] bg-[#5cf0ff]" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
