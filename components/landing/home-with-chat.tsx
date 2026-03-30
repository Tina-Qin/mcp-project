import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { BifurcationSection } from "@/components/landing/bifurcation-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TerminalDemo } from "@/components/landing/terminal-demo";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { NinaChatDemoSection } from "@/components/landing/nina-chat-demo-section";
import { Footer } from "@/components/landing/footer";

export function HomeWithChat() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <BifurcationSection />
      <FeaturesSection />
      <TerminalDemo />
      <EcosystemSection />
      <NinaChatDemoSection />
      <Footer />
    </div>
  );
}
