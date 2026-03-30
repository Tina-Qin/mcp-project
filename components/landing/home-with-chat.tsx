import { Navbar } from "@/components/landing/navbar";
import { LandingFirstScreen } from "@/components/landing/landing-first-screen";
import { BifurcationSection } from "@/components/landing/bifurcation-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TerminalDemo } from "@/components/landing/terminal-demo";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { Footer } from "@/components/landing/footer";

export function HomeWithChat() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <LandingFirstScreen />
      <BifurcationSection />
      <FeaturesSection />
      <TerminalDemo />
      <EcosystemSection />
      <Footer />
    </div>
  );
}
