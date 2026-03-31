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
    userPrompt: "How do I install antalpha-rwa-skill on my Agent?",
    assistantLines: [
      "Two steps: ① Open the `antalpha-rwa-skill` repo on GitHub and follow the README to add the skill pack to your Agents / Cursor skills list; ② or point your client at the official MCP (`mcp.prime.antalpha.com`), enable `antalpha-rwa`, save, and reload the Agent. After that, your assistant can call RWA capabilities per the SKILL contract.",
    ],
  },
  {
    id: "s2-mcp-only",
    headerStripe: "MCP · CONNECT",
    userPrompt: "Can I skip cloning the repo and use MCP only?",
    assistantLines: [
      "Yes. Set MCP to `mcp.prime.antalpha.com`, enable `antalpha-rwa` in available skills, save, and reload—no local clone required; tools and conventions still follow the official SKILL.",
    ],
  },
  {
    id: "s3-why",
    headerStripe: "SKILL · HIGHLIGHT",
    userPrompt: "Why install antalpha-rwa-skill first?",
    assistantLines: [
      "It is our open-source Skill for RWA fixed-income and on-chain subscription flows: product docs, subscription, and risk controls in one callable surface—aligned with this site’s MCP and fastest to ship a Web Agent that talks RWA fluently.",
    ],
  },
  {
    id: "s4-repo",
    headerStripe: "GITHUB · REPO",
    userPrompt: "Send me the repo link.",
    assistantLines: [
      "Open source: `https://github.com/AntalphaAI/antalpha-rwa-skill`. Star it and follow the docs to install; the page below also has quick links to jump straight to the repo.",
    ],
  },
  {
    id: "s5-troubleshoot",
    headerStripe: "AGENT · RELOAD",
    userPrompt: "I installed it but nothing happens in chat?",
    assistantLines: [
      "Confirm the skill is written to your Agent config and saved; if MCP, check endpoint and network. If tools still don’t appear, restart the client or reload the Agent and verify the skill id is `antalpha-rwa`.",
    ],
  },
  {
    id: "s6-more-skills",
    headerStripe: "SKILLS · ECOSYSTEM",
    userPrompt: "Besides RWA, can I install other Skills?",
    assistantLines: [
      "Yes. You can stack web3-trader, wallet-balance, and other open-source Skills the same way; if RWA is your main use case, keep antalpha-rwa-skill installed first, then add more as needed.",
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
              <span className="text-[11px] leading-none text-emerald-400/90">Online</span>
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
