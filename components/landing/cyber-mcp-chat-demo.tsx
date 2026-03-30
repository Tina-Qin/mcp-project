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
    id: "q1-products",
    headerStripe: "PRODUCTS · LIVE LIST",
    userPrompt: "介绍一下在售产品信息。",
    assistantLines: [
      "目前在售的是 Fixed_Yield_7D（7 天固定收益）：RWA 固定收益类，募集中；以太坊主网 USDT；预期年化 8%，单利；最低 10 USDT、单人最高 10,000 USDT；认购窗口见产品页/公告，起息为认购后 T+1，到期 T+1 自动回款，不可提前赎回。底层为 BTC 超额抵押类机构贷款。",
    ],
  },
  {
    id: "q2-subscribe",
    headerStripe: "SUBSCRIBE · BUY",
    userPrompt: "我想了解如何买入或认购？",
    assistantLines: [
      "认购步骤：① 使用 MetaMask、imToken、Trust Wallet 等自托管钱包准备 USDT（ERC-20）；② 确认金额在 10～10,000 USDT 之间；③ 向官方公布的产品收款地址转入 USDT；④ 链上确认到账即视为认购成功；⑤ 到期后 T+1 本金+收益原路退回您的转账地址。请勿从交易所直接转同一笔认购，以免回款地址不一致导致资金风险。",
    ],
  },
  {
    id: "q3-cex",
    headerStripe: "WALLET · EXCHANGE",
    userPrompt: "可以用交易所充值地址认购吗？",
    assistantLines: [
      "不建议。到期回款会打到您转出 USDT 的钱包地址；交易所充值地址常变动或不等于您个人控制地址，可能导致无法收到回款。请使用自托管钱包并自行保管好私钥/助记词。",
    ],
  },
  {
    id: "q4-limits",
    headerStripe: "LIMITS · AMOUNT",
    userPrompt: "投资金额有什么限制？",
    assistantLines: [
      "单笔/单人维度以产品规则为准：最低 10 USDT，最高 10,000 USDT；低于下限可能不计入有效认购，超出上限部分通常不计息或不按产品规则计息，请以最新产品说明为准。",
    ],
  },
  {
    id: "q5-address",
    headerStripe: "ADDRESS · USDT",
    userPrompt: "转账要转到哪个地址？",
    assistantLines: [
      "请仅使用官方渠道（官网、App 内产品页或客服确认）公布的 USDT（以太坊主网）收款地址。向错误网络或非官方地址转账可能导致资产损失；转账前务必核对网络 = 以太坊主网、代币 = USDT。",
    ],
  },
  {
    id: "q6-confirm",
    headerStripe: "ORDER · CONFIRM",
    userPrompt: "怎么知道认购成功了？",
    assistantLines: [
      "在区块浏览器上查看您的转账：交易成功且 USDT 已到账产品收款地址，即链上认购完成。您也可以把您的钱包地址提供给客服或助理，协助核对订单/到账情况（若系统提供查询功能）。",
    ],
  },
  {
    id: "q7-schedule",
    headerStripe: "SCHEDULE · T+1",
    userPrompt: "起息和到期时间怎么算？",
    assistantLines: [
      "以产品条款为准：一般为认购截止后按 T+1 起息，并有明确到期日；本示例产品中起息、到期、认购起止日期以页面展示或最新公告为准，投资前请再次确认 UTC+8 时间。",
    ],
  },
  {
    id: "q8-redeem",
    headerStripe: "REDEEM · MATURITY",
    userPrompt: "到期怎么赎回？能提前卖吗？",
    assistantLines: [
      "不支持提前赎回；产品到期后，通常在 T+1 自动将本金+收益退回至您认购时使用的原钱包地址，一般无需额外操作。若长时间未到账，请用交易哈希与官方支持联系排查。",
    ],
  },
  {
    id: "q9-yield",
    headerStripe: "YIELD · APR",
    userPrompt: "8% 年化具体怎么算？",
    assistantLines: [
      "产品为单利，计息基准常见为 ACT/365（按实际天数/365）。实际收益以持有天数、认购本金（在有效区间内）及最终兑付规则为准，请以协议与兑付通知为准。",
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
                className="h-5 w-5 shrink-0 rounded-xs border border-[#5cf0ff]/50 object-cover shadow-[0_0_10px_rgba(92,240,255,0.35)]"
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
