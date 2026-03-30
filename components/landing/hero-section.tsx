"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "./particle-background"

/** 与首屏聊天区共用背景层 */
export function HeroBackground() {
  return (
    <>
      <ParticleBackground />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-[120px]" />
    </>
  )
}

type HeroLeadVariant = "split" | "centered";

/** 首屏主文案；`split` 时大屏左对齐（与右侧聊天并排），`centered` 为整页 Hero 居中 */
export function HeroLead({ variant = "split" }: { variant?: HeroLeadVariant }) {
  const split = variant === "split";
  return (
    <div
      className={
        split
          ? "mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left"
          : "mx-auto w-full max-w-2xl text-center"
      }
    >
      <div
        className={
          split
            ? "mb-4 flex justify-center sm:mb-5 lg:justify-start"
            : "mb-4 flex justify-center sm:mb-5"
        }
      >
        <div className="inline-flex items-center gap-2 border border-border/30 bg-secondary/30 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="font-mono text-xs text-muted-foreground">
            Web3 AI Infrastructure Layer
          </span>
        </div>
      </div>

      <h1 className="mb-3 text-3xl font-bold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
        <span className="block text-foreground">The Router For</span>
        <span className="block text-gradient-blue neon-glow">Web3 AI.</span>
      </h1>

      <p
        className={
          split
            ? "mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mb-7 sm:text-base md:text-lg lg:mx-0"
            : "mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mb-7 sm:text-base md:text-lg"
        }
      >
        Stop fighting with fragmented APIs. One unified endpoint to route all your AI
        Agents&apos; intents across chains, protocols, and data providers.
      </p>

      <div
        className={
          split
            ? "flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
            : "flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        }
      >
        <Button
          size="lg"
          className="group h-11 w-full bg-blue-600 font-mono text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] sm:h-10 sm:w-auto"
        >
          Build with MCP API
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-11 w-full border-border/50 font-mono text-sm font-semibold text-foreground transition-all hover:border-blue-500/50 hover:bg-transparent hover:text-blue-500 sm:h-10 sm:w-auto"
        >
          Explore Zero-Code Skills
        </Button>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative shrink-0 overflow-hidden pt-16">
      <HeroBackground />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-4 pt-6 sm:px-6 sm:pb-5 sm:pt-8 md:pt-10 lg:px-8">
        <HeroLead variant="centered" />
      </div>
    </section>
  )
}
