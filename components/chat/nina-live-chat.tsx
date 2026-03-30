"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart, type UIMessage } from "ai";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { extractCompletedToolNames } from "@/lib/extract-completed-tool-names";
import {
  buildCombinedInstallSnippet,
  resolveSkillsFromToolNames,
} from "@/lib/skill-registry";
import { SkillDetailSheet } from "@/components/chat/skill-detail-sheet";
import { SkillUsedCard } from "@/components/chat/skill-used-card";

const NINA_AVATAR = "/nina-avatar.png";

function textFromParts(parts: UIMessage["parts"]): string {
  return parts
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join("");
}

export function NinaLiveChat() {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const { messages, sendMessage, status, stop, error } = useChat({
    transport,
  });

  const [input, setInput] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetSkills, setSheetSkills] = useState<
    ReturnType<typeof resolveSkillsFromToolNames>
  >([]);

  const busy = status === "submitted" || status === "streaming";

  async function submitFromInput() {
    const t = input.trim();
    if (!t || busy) return;
    await sendMessage({ text: t });
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submitFromInput();
  }

  function handleCopyInstall(skills: ReturnType<typeof resolveSkillsFromToolNames>) {
    const text = buildCombinedInstallSnippet(skills);
    void navigator.clipboard.writeText(text).then(
      () => {
        toast.success("已复制 MCP 配置到剪贴板");
      },
      () => {
        toast.error("复制失败，请手动选择配置文本");
      },
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Toaster richColors position="top-center" theme="dark" />
      <header className="border-b border-border/40 px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={NINA_AVATAR}
              alt=""
              width={36}
              height={36}
              className="rounded-full ring-1 ring-border/60"
            />
            <div>
              <h1 className="font-semibold tracking-tight">Nina · 真实对话</h1>
              <p className="text-muted-foreground text-xs">
                连接 /api/chat，展示本次回复使用的 Skill
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            返回首页
          </Link>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <ScrollArea className="h-full px-4 py-4">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 pb-32">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              例如：介绍一下在售产品；或提供 0x
              地址查询订单。若调用了工具，回复下方会出现「已使用 Skill」。
            </p>
          ) : null}

          {messages.map((m) => {
            if (m.role === "user") {
              return (
                <div
                  key={m.id}
                  className="ml-auto max-w-[85%] rounded-2xl bg-primary/15 px-4 py-2.5 text-sm">
                  {textFromParts(m.parts)}
                </div>
              );
            }

            const tools = extractCompletedToolNames(m.parts);
            const skills = resolveSkillsFromToolNames(tools);

            return (
              <div key={m.id} className="flex max-w-[min(100%,42rem)] flex-col gap-0">
                <div className="flex items-start gap-3">
                  <span className="relative mt-0.5 size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-border/60">
                    <Image
                      src={NINA_AVATAR}
                      alt=""
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="rounded-2xl border border-border/40 bg-muted/20 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
                      {textFromParts(m.parts)}
                    </div>
                    {skills.length > 0 ? (
                      <SkillUsedCard
                        skills={skills}
                        onViewDetails={() => {
                          setSheetSkills(skills);
                          setSheetOpen(true);
                        }}
                        onInstall={() => handleCopyInstall(skills)}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}

          {error ? (
            <p className="text-destructive text-sm" role="alert">
              {error.message}
            </p>
          ) : null}
        </div>
        </ScrollArea>
      </div>

      <SkillDetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        skills={sheetSkills}
      />

      <footer className="border-t border-border/40 bg-background/95 p-4 backdrop-blur">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl flex-col gap-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息…"
            rows={3}
            disabled={busy}
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submitFromInput();
              }
            }}
          />
          <div className="flex justify-end gap-2">
            {busy ? (
              <Button type="button" variant="outline" onClick={() => void stop()}>
                停止
              </Button>
            ) : null}
            <Button type="submit" disabled={busy || !input.trim()}>
              发送
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}
