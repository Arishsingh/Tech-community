import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { WhyStack } from "@/components/why-stack";
import { Showcase } from "@/components/showcase";
import { BuildSection } from "@/components/build-section";
import { TechPass } from "@/components/techpass";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <WhyStack />
      <Showcase />
      <BuildSection />
      <TechPass />
      <Faq />
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
