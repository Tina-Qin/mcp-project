"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "./particle-background"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Particle Network Background */}
      <ParticleBackground />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Gradient Overlay - softer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      
      {/* Radial Glow - Blue, more subtle */}
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-[120px]" />

      {/* Content positioned at ~40% vertical */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 pt-[12vh] sm:px-6 sm:pt-[15vh] lg:px-8 lg:pt-[18vh]">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 border border-border/30 bg-secondary/30 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="font-mono text-xs text-muted-foreground">
              Web3 AI Infrastructure Layer
            </span>
          </div>

          {/* Main Heading - Sharp, Hardcore Typography */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block text-foreground">The Router For</span>
            <span className="block text-gradient-blue neon-glow">Web3 AI.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            Stop fighting with fragmented APIs. One unified endpoint to route all 
            your AI Agents&apos; intents across chains, protocols, and data providers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group w-full bg-blue-600 font-mono text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] sm:w-auto"
            >
              Build with MCP API
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-border/50 font-mono text-sm font-semibold text-foreground transition-all hover:border-blue-500/50 hover:bg-transparent hover:text-blue-500 sm:w-auto"
            >
              Explore Zero-Code Skills
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">Scroll</span>
            <div className="h-8 w-[1px] animate-pulse bg-gradient-to-b from-blue-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
