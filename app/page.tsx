import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { BifurcationSection } from "@/components/landing/bifurcation-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TerminalDemo } from "@/components/landing/terminal-demo"
import { EcosystemSection } from "@/components/landing/ecosystem-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BifurcationSection />
      <FeaturesSection />
      <TerminalDemo />
      <EcosystemSection />
      <Footer />
    </main>
  )
}
