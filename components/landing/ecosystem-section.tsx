const providers = [
  "DeBank",
  "Etherscan",
  "1inch",
  "Uniswap",
  "Nansen",
  "Arkham",
  "Dune",
  "CoinGecko",
  "Alchemy",
  "Infura",
  "The Graph",
  "Chainlink",
]

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-blue-500">
            Ecosystem
          </h2>
          <p className="text-2xl font-bold text-foreground sm:text-3xl">
            Powered by the Best in Web3
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

          {/* Marquee Track */}
          <div className="flex animate-marquee">
            {/* First set */}
            {providers.map((provider, index) => (
              <div
                key={`first-${index}`}
                className="mx-4 flex-shrink-0 border border-border/20 bg-card/20 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30"
              >
                <span className="font-mono text-lg font-semibold text-muted-foreground/70 transition-colors hover:text-foreground">
                  {provider}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {providers.map((provider, index) => (
              <div
                key={`second-${index}`}
                className="mx-4 flex-shrink-0 border border-border/20 bg-card/20 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30"
              >
                <span className="font-mono text-lg font-semibold text-muted-foreground/70 transition-colors hover:text-foreground">
                  {provider}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="border border-border/20 bg-card/20 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 font-mono text-3xl font-bold text-blue-500">
              50+
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              Supported Chains
            </div>
          </div>
          <div className="border border-border/20 bg-card/20 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 font-mono text-3xl font-bold text-blue-500">
              20+
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              Data Providers
            </div>
          </div>
          <div className="border border-border/20 bg-card/20 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 font-mono text-3xl font-bold text-blue-500">
              99.9%
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              Uptime SLA
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
