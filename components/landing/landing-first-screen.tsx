"use client";

import { HeroBackground, HeroLead } from "@/components/landing/hero-section";
import { NinaChatPanel } from "@/components/landing/nina-chat-demo-section";

/** First screen: copy on top + chat below (stacked, centered; avoids overly narrow split columns) */
export function LandingFirstScreen() {
  return (
    <section
      id="nina-demo"
      className="relative min-h-dvh overflow-hidden"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl flex-col items-center gap-10 px-4 pb-8 pt-24 sm:gap-12 sm:px-6 sm:pt-28 lg:px-8">
        <HeroLead variant="centered" />
        <div className="w-full max-w-3xl lg:max-w-4xl">
          <NinaChatPanel align="centered" />
        </div>
      </div>
    </section>
  );
}
