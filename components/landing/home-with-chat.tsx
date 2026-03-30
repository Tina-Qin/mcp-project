"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, type CSSProperties } from "react";
import { isToolUIPart, getToolName } from "ai";
import Image from "next/image";
import { Package, TrendingUp, Wallet, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { BifurcationSection } from "@/components/landing/bifurcation-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TerminalDemo } from "@/components/landing/terminal-demo";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { Footer } from "@/components/landing/footer";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const ASSISTANT_NAME = "Nina";
const ASSISTANT_AVATAR = "/nina-avatar.png";

const SUGGESTIONS = [
  "What RWA products are on sale and how do fees compare?",
  "Explain risks, redemption rules, and subscription flow for Prime offerings.",
  "I have a wallet address — can you check my orders and holdings?",
];

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
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Related open-source skill repos"
    >
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

type ToolState =
  | "input-streaming"
  | "input-available"
  | "output-available"
  | "approval-requested"
  | "approval-responded"
  | "output-error"
  | "output-denied";

function AssistantTextBubble({
  html,
  isTextStreaming,
}: {
  html: string;
  isTextStreaming: boolean;
}) {
  const innerHtml =
    html +
    (isTextStreaming
      ? '<span class="nina-cyber-cursor-wrap" aria-hidden="true"><span class="nina-cyber-cursor"></span></span>'
      : "");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border px-3.5 py-3.5 shadow-sm",
        isTextStreaming
          ? "nina-cyber-bubble nina-cyber-bubble--active border-violet-500/35 bg-zinc-950/95 shadow-black/30"
          : "border-zinc-800 bg-zinc-900 shadow-black/20",
      )}
    >
      {isTextStreaming ? (
        <>
          <div className="nina-cyber-scanline" aria-hidden />
          <div className="nina-cyber-noise" aria-hidden />
        </>
      ) : null}
      <div
        className={cn(
          "relative z-2 text-[13px] leading-relaxed text-zinc-200 [&_pre]:relative [&_pre]:z-2 [&_strong]:font-semibold [&_strong]:text-zinc-50",
          isTextStreaming && "nina-cyber-markdown--stream",
        )}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    </div>
  );
}

function ToolCallRow({ name, state }: { name: string; state: ToolState }) {
  const stateLabel =
    state === "output-available"
      ? "completed"
      : state === "input-available"
        ? "running"
        : "loading";

  return (
    <div className="my-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-500">
      <span>Tool: </span>
      <span className="font-mono text-zinc-300">{name}</span>
      <span className="ml-2">({stateLabel})</span>
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMarkdown(text: string): string {
  const escaped = escapeHtml(text);
  return escaped
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="my-2 overflow-x-auto rounded-xl border border-zinc-800 bg-black/40 p-3 text-xs text-zinc-300"><code>$2</code></pre>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-zinc-800/80 px-1 py-0.5 text-xs text-zinc-200">$1</code>',
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

export function HomeWithChat() {
  const [input, setInput] = useState("");
  const { messages, setMessages, sendMessage, status } = useChat({ transport });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLElement>(null);

  const isStreaming = status === "streaming";
  const hasResults = messages.some((m) => m.role === "assistant");

  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
  };

  const sendSuggestion = (text: string) => {
    if (isStreaming) return;
    sendMessage({ text });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="min-h-0 flex-1 overflow-y-auto pb-44">
        <Navbar />
        <HeroSection />
        <BifurcationSection />
        <FeaturesSection />
        <TerminalDemo />
        <EcosystemSection />

        <section
          ref={chatSectionRef}
          className="scroll-mt-4 border-t border-zinc-800/40 px-4 py-8 sm:px-6"
        >
          <div className="mx-auto w-full max-w-6xl space-y-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={scrollToChat}
                className="text-xs font-medium text-muted-foreground underline decoration-zinc-700 underline-offset-[6px] transition-colors hover:text-primary"
              >
                Jump to chat
              </button>
            </div>

            {!hasResults && !isStreaming && (
              <div className="space-y-5">
                <p className="text-[13px] leading-relaxed text-zinc-400">
                  <span className="nina-intro-line" style={{ animationDelay: "0ms" }}>
                    Ask in natural language about Web3 routing, RWA products, or your wallet.
                  </span>{" "}
                  <span className="nina-intro-line" style={{ animationDelay: "90ms" }}>
                    Nina uses{" "}
                    <span
                      className="nina-intro-accent"
                      style={{ "--nina-shimmer-delay": "0.35s" } as CSSProperties}
                    >
                      Antalpha Prime MCP
                    </span>{" "}
                    for live product data when relevant.
                  </span>
                </p>
                <div className="space-y-2.5">
                  <p className="text-[11px] font-medium text-zinc-500">Try asking</p>
                  <div className="flex flex-col items-start gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={isStreaming}
                        className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-left text-xs leading-snug text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800/90 disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => sendSuggestion(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.length > 0 || isStreaming ? (
              <div className="nina-glow-frame w-full">
                <div
                  className="nina-glow-frame__inner nina-messages-scroll max-h-[min(32vh,17rem)] w-full overflow-y-auto overflow-x-hidden p-3.5 sm:max-h-[min(34vh,18rem)] sm:p-4"
                  aria-label="Chat messages"
                >
                  <div className="space-y-4">
                    {messages.map((message, msgIndex) => (
                      <div key={message.id} className="space-y-2">
                        {message.role === "user"
                          ? message.parts.map((part, i) =>
                              part.type === "text" ? (
                                <div
                                  key={`${message.id}-u-${i}`}
                                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100"
                                >
                                  {part.text}
                                </div>
                              ) : null,
                            )
                          : null}
                        {message.role === "assistant" ? (
                          <div className="flex gap-3">
                            <Image
                              src={ASSISTANT_AVATAR}
                              alt={ASSISTANT_NAME}
                              width={32}
                              height={32}
                              className="mt-0.5 size-8 shrink-0 rounded-full object-cover ring-1 ring-zinc-700/60"
                            />
                            <div className="min-w-0 flex-1 space-y-2">
                              <p className="text-[10px] font-medium text-zinc-500">
                                {ASSISTANT_NAME}
                              </p>
                              {message.parts.map((part, i) => {
                                if (part.type === "text") {
                                  let lastTextPartIndex = -1;
                                  for (let j = message.parts.length - 1; j >= 0; j--) {
                                    if (message.parts[j].type === "text") {
                                      lastTextPartIndex = j;
                                      break;
                                    }
                                  }
                                  const isLastTextPart = i === lastTextPartIndex;
                                  const isTextStreaming =
                                    part.state === "streaming" ||
                                    (isStreaming &&
                                      msgIndex === messages.length - 1 &&
                                      isLastTextPart &&
                                      message.role === "assistant");

                                  return (
                                    <AssistantTextBubble
                                      key={`${message.id}-${i}`}
                                      html={formatMarkdown(part.text)}
                                      isTextStreaming={isTextStreaming}
                                    />
                                  );
                                }
                                if (isToolUIPart(part)) {
                                  return (
                                    <ToolCallRow
                                      key={`${message.id}-${i}`}
                                      name={getToolName(part)}
                                      state={part.state}
                                    />
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}

                    {isStreaming && !hasResults ? (
                      <p className="text-sm text-zinc-500">Working (may call product APIs)…</p>
                    ) : null}

                    <div ref={messagesEndRef} className="h-px shrink-0" aria-hidden />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <Footer />
      </div>

      <div className="sticky bottom-0 z-20 shrink-0 border-t border-zinc-800/80 bg-[#09090b]/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md supports-backdrop-filter:bg-[#09090b]/70 sm:px-6">
        <div className="mx-auto mb-3 flex max-w-6xl items-center gap-3">
          <Image
            src={ASSISTANT_AVATAR}
            alt={ASSISTANT_NAME}
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover ring-1 ring-zinc-700/80"
          />
          <div className="min-w-0">
            <p className="text-[17px] font-semibold tracking-tight text-zinc-50">
              {ASSISTANT_NAME}
            </p>
            <p className="text-[11px] text-zinc-400">Antalpha RWA assistant</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl space-y-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="nina-glow-frame min-w-0 flex-1">
              <div className="nina-glow-frame__inner flex min-h-11 min-w-0 items-center gap-2 px-3 py-1.5 sm:min-h-12 sm:px-4 sm:py-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. How do I subscribe to RWA products and what are the risks?"
                  disabled={isStreaming}
                  className="h-9 min-h-9 flex-1 border-0 bg-transparent px-0 text-sm text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:ring-0 sm:h-10 sm:min-h-10"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="h-9 shrink-0 rounded-xl bg-zinc-50 px-4 font-semibold text-zinc-950 hover:bg-white sm:h-10 sm:px-5"
                >
                  {isStreaming ? "Replying…" : "Send"}
                </Button>
              </div>
            </div>
            {messages.length > 0 && !isStreaming ? (
              <Button
                type="button"
                variant="ghost"
                onClick={handleClear}
                className="text-zinc-500 hover:bg-zinc-800/80 hover:text-zinc-200"
              >
                Clear chat
              </Button>
            ) : null}
          </form>
          <SkillLinksRow />
        </div>
      </div>

      <footer className="shrink-0 px-4 pb-2 pt-1">
        <p className="text-center text-[10px] text-zinc-600">
          AI SDK · MCP (mcp.prime.antalpha.com)
        </p>
      </footer>
    </div>
  );
}
