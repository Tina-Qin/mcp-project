"use client"

import { Zap, Code2, ArrowRight, Wallet, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BifurcationSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-blue-500">
            Choose Your Path
          </h2>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">
            Two Ways to Access Web3
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Skills Card */}
          <div className="group relative overflow-hidden border border-border/30 bg-card/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            {/* Icon */}
            <div className="mb-6 inline-flex border border-blue-500/20 bg-blue-500/5 p-3">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>

            {/* Content */}
            <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-blue-500">
              AntAlpha Skills
            </h3>
            <h4 className="mb-4 text-2xl font-bold text-foreground">
              For Explorers: Play & Go
            </h4>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              No coding required. Access pre-built on-chain skills including asset queries, 
              optimal swaps, and smart money tracking - all through a simple interface.
            </p>

            {/* Mini Feature List */}
            <div className="mb-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 border border-border/30 bg-secondary/30 px-3 py-1">
                <Wallet className="h-3 w-3 text-blue-500" />
                <span className="font-mono text-xs text-muted-foreground">Balance Query</span>
              </div>
              <div className="flex items-center gap-2 border border-border/30 bg-secondary/30 px-3 py-1">
                <RefreshCw className="h-3 w-3 text-blue-500" />
                <span className="font-mono text-xs text-muted-foreground">Best Swap</span>
              </div>
              <div className="flex items-center gap-2 border border-border/30 bg-secondary/30 px-3 py-1">
                <TrendingUp className="h-3 w-3 text-blue-500" />
                <span className="font-mono text-xs text-muted-foreground">Smart Money</span>
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="mb-8 overflow-hidden border border-border/30 bg-background/80">
              <div className="flex items-center gap-2 border-b border-border/30 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />
              </div>
              <div className="p-3 font-mono text-xs text-muted-foreground">
                <span className="text-blue-500">$</span> balance --wallet 0x1234...{"\n"}
                <span className="text-foreground">ETH: 2.45 | USDC: 1,250.00</span>
              </div>
            </div>

            {/* CTA */}
            <Button
              variant="outline"
              className="group/btn border-blue-500/50 font-mono text-sm text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            >
              Explore Skills
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>

            {/* Decorative Corner */}
            <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:bg-blue-500/10" />
          </div>

          {/* MCP API Card */}
          <div className="group relative overflow-hidden border border-border/30 bg-card/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            {/* Icon */}
            <div className="mb-6 inline-flex border border-blue-500/20 bg-blue-500/5 p-3">
              <Code2 className="h-6 w-6 text-blue-500" />
            </div>

            {/* Content */}
            <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-blue-500">
              AntAlpha MCP
            </h3>
            <h4 className="mb-4 text-2xl font-bold text-foreground">
              For AI Developers: Unified Gateway
            </h4>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              One API call grants your Agent full network connectivity. OpenAI-compatible 
              interface for seamless integration with your existing AI applications.
            </p>

            {/* Code Block */}
            <div className="mb-8 overflow-hidden border border-border/30 bg-background/80">
              <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">request.json</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
                <code className="text-muted-foreground">
                  <span className="text-foreground">{"{"}</span>{"\n"}
                  {"  "}<span className="text-blue-400">{'"model"'}</span>: <span className="text-blue-300">{'"antalpha-mcp"'}</span>,{"\n"}
                  {"  "}<span className="text-blue-400">{'"intent"'}</span>: <span className="text-blue-300">{'"swap"'}</span>,{"\n"}
                  {"  "}<span className="text-blue-400">{'"params"'}</span>: <span className="text-foreground">{"{ ... }"}</span>{"\n"}
                  <span className="text-foreground">{"}"}</span>
                </code>
              </pre>
            </div>

            {/* CTA */}
            <Button
              variant="outline"
              className="group/btn border-blue-500/50 font-mono text-sm text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            >
              View API Docs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>

            {/* Decorative Corner */}
            <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-blue-500/5 blur-2xl transition-all group-hover:bg-blue-500/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
