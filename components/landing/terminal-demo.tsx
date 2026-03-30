"use client"

import { useEffect, useState } from "react"
import { Terminal, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

const routingSteps = [
  { provider: "Nansen", status: "querying", delay: 800 },
  { provider: "Arkham", status: "querying", delay: 1200 },
  { provider: "DeBank", status: "querying", delay: 600 },
]

export function TerminalDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= routingSteps.length) {
          setIsComplete(true)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    const resetInterval = setInterval(() => {
      setCurrentStep(0)
      setIsComplete(false)
    }, 6000)

    return () => {
      clearInterval(interval)
      clearInterval(resetInterval)
    }
  }, [])

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-blue-500">
            See It In Action
          </h2>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">
            Intelligent Request Routing
          </p>
        </div>

        {/* Terminal Window */}
        <div className="mx-auto max-w-4xl overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-border/30 bg-secondary/20 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
            <div className="ml-4 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono text-sm text-muted-foreground">
                mcp-router
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
            {/* Input Side */}
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Agent Intent
              </div>
              <div className="border border-border/30 bg-background/50 p-4">
                <pre className="font-mono text-sm">
                  <span className="text-muted-foreground">&gt;</span>{" "}
                  <span className="text-blue-500">Agent Intent</span>:{" "}
                  <span className="text-foreground">smart_money</span>
                  {"\n"}
                  <span className="text-muted-foreground">&gt;</span>{" "}
                  <span className="text-blue-500">token</span>
                  <span className="text-foreground">=</span>
                  <span className="text-blue-300">PEPE</span>
                  <span className="animate-blink text-blue-500">_</span>
                </pre>
              </div>
            </div>

            {/* Routing Side */}
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                AntAlpha Router
              </div>
              <div className="space-y-3">
                {/* Router Node */}
                <div className="flex items-center gap-3 border border-blue-500/30 bg-blue-500/5 px-4 py-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                  <span className="font-mono text-sm text-blue-500">
                    [AntAlpha Router]
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-blue-500" />
                </div>

                {/* Provider Nodes */}
                <div className="ml-6 space-y-2 border-l border-border/30 pl-4">
                  {routingSteps.map((step, index) => (
                    <div
                      key={step.provider}
                      className={`flex items-center gap-3 border px-4 py-2 transition-all duration-300 ${
                        currentStep > index
                          ? "border-blue-500/30 bg-blue-500/5"
                          : "border-border/20 bg-background/30"
                      }`}
                    >
                      {currentStep > index ? (
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      ) : currentStep === index ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-border" />
                      )}
                      <span
                        className={`font-mono text-sm ${
                          currentStep > index
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.provider}
                      </span>
                      {currentStep > index && (
                        <span className="ml-auto font-mono text-xs text-blue-500">
                          {step.delay}ms
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Result */}
                <div
                  className={`flex items-center gap-3 border px-4 py-3 transition-all duration-500 ${
                    isComplete
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-border/20 bg-background/30"
                  }`}
                >
                  {isComplete ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <span className="font-mono text-sm text-blue-500">
                        Aggregated Data Ready
                      </span>
                      <span className="ml-auto font-mono text-xs text-muted-foreground">
                        3 sources
                      </span>
                    </>
                  ) : (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="font-mono text-sm text-muted-foreground">
                        Parallel querying Nansen & Arkham...
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
