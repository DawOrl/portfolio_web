import { Aurora } from "@/components/blocks/Aurora";
import { Navbar } from "@/components/blocks/Navbar";
import { Hero } from "@/components/blocks/Hero";
import { InfiniteMarquee } from "@/components/blocks/InfiniteMarquee";
import { ServicesSection } from "@/components/blocks/ServicesSection";
import { ProjectsTeaser } from "@/components/blocks/ProjectsTeaser";
import { ProcessSection } from "@/components/blocks/ProcessSection";
import { CtaBand } from "@/components/blocks/CtaBand";
import { AboutSection } from "@/components/blocks/AboutSection";
import { TechStack } from "@/components/blocks/TechStack";
import { PricingSection } from "@/components/blocks/PricingSection";
import { FaqSection } from "@/components/blocks/FaqSection";
import { ContactSection } from "@/components/blocks/ContactSection";
import { SocialLinks } from "@/components/blocks/SocialLinks";
import { SiteFooter } from "@/components/blocks/SiteFooter";

export default function Home() {
  return (
    <>
      {/* Tło "Aurora" — świetliste plamy w kolorach brandu */}
      <div className="fixed inset-0 -z-10 bg-background">
        <Aurora />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(245,158,11,0.08),transparent_70%)]"
        />
        {/* Ziarno filmowe na całym tle — łamie cyfrową gładkość gradientów */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-noise opacity-[0.05]"
        />
      </div>

      <Navbar />

      <main className="overflow-hidden">
        <Hero />

        {/* Pasek technologii */}
        <div className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10">
          <InfiniteMarquee />
        </div>

        <ServicesSection />
        <ProjectsTeaser />
        <ProcessSection />

        <CtaBand />

        <AboutSection />

        {/* Kompetencje (część sekcji "O mnie") */}
        <div className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10 md:pb-28">
          <TechStack />
        </div>

        <PricingSection />
        <FaqSection />
        <ContactSection />
        <SocialLinks />
      </main>

      <SiteFooter />
    </>
  );
}
