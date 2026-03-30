"use client";

import { HeroBackground, HeroLead } from "@/components/landing/hero-section";
import { NinaChatPanel } from "@/components/landing/nina-chat-demo-section";

/** 首屏：左文案 + 右聊天（lg+ 并排），小屏纵向堆叠且尽量一屏内 */
export function LandingFirstScreen() {
  return (
    <section
      id="nina-demo"
      className="relative min-h-dvh overflow-hidden"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl grid-cols-1 content-start gap-8 px-4 pb-8 pt-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 xl:gap-12">
        <HeroLead />
        <NinaChatPanel align="split" />
      </div>
    </section>
  );
}
