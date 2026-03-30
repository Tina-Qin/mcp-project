import { Globe, Cpu, Shield } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "One API, Multi-Chain",
    titleCn: "一次接入，多链通用",
    description:
      "Connect once, access everywhere. Route requests seamlessly across Ethereum, BSC, Base, Arbitrum, and 50+ chains.",
  },
  {
    icon: Cpu,
    title: "Smart Routing Engine",
    titleCn: "智能策略引擎",
    description:
      "AI-powered routing automatically finds optimal paths, compares prices, and selects the best execution strategy.",
  },
  {
    icon: Shield,
    title: "Zero Downtime Fallback",
    titleCn: "容错高可用",
    description:
      "Enterprise-grade reliability with automatic failover. Primary node fails? We switch instantly to backups.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-24">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/5 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-blue-500">
            Core Features
          </h2>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">
            Built for Scale, Designed for Developers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden border border-border/30 bg-card/20 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-card/40"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex border border-blue-500/20 bg-blue-500/5 p-3 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-500/10">
                <feature.icon className="h-6 w-6 text-blue-500" />
              </div>

              {/* Title */}
              <h3 className="mb-1 text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mb-4 font-mono text-xs text-blue-500">
                {feature.titleCn}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              {/* Hover line indicator */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
