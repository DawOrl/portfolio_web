"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@/data/cv-data";
import { SectionHeading } from "@/components/ui/section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Kolory aktywnego etapu — stałe z motywu dark (strona jest dark-mode-first);
   GSAP nie interpoluje płynnie wartości var(), stąd hexy. */
const AMBER = "#f59e0b";
const AMBER_FG = "#1a1206";

/**
 * Sekcja procesu jako "scrollowana opowieść" (GSAP ScrollTrigger):
 * na desktopie sekcja przyszpila się do ekranu, a etapy 01–04 odtwarzają
 * się sekwencyjnie w rytmie scrolla (linia dorysowuje się do etapu, kafelek
 * z numerem zalewa się amber, poprzedni etap przygasa). Na mobile/tablecie
 * zwykłe wjazdy + pionowa linia scrubowana, bez pinowania. Przy
 * `prefers-reduced-motion` wszystko jest statyczne.
 */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia(sectionRef);

    // Desktop: pin + scrub — oś czasu odtwarzana scrollem.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const steps = gsap.utils.toArray<HTMLElement>(
          ".process-step",
          sectionRef.current
        );
        gsap.set(steps, { opacity: 0.2, y: 28 });
        gsap.set(lineRef.current, { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        steps.forEach((step, i) => {
          const num = step.querySelector<HTMLElement>(".process-num");
          tl.to(lineRef.current, {
            scaleX: (i + 1) / steps.length,
            duration: 0.6,
          });
          tl.to(
            step,
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            "<0.2"
          );
          if (num) {
            tl.to(
              num,
              {
                backgroundColor: AMBER,
                color: AMBER_FG,
                borderColor: AMBER,
                duration: 0.25,
              },
              "<"
            );
          }
          if (i > 0) {
            tl.to(steps[i - 1], { opacity: 0.45, duration: 0.3 }, "<");
          }
        });

        // Finał: wszystkie etapy wracają do pełnej widoczności + oddech przed odpięciem.
        tl.to(steps, { opacity: 1, duration: 0.4 });
        tl.to({}, { duration: 0.35 });
      }
    );

    // Mobile/tablet: bez pinowania — wjazdy etapów + rysująca się pionowa linia.
    mm.add(
      "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      () => {
        const steps = gsap.utils.toArray<HTMLElement>(
          ".process-step",
          sectionRef.current
        );
        steps.forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: step, start: "top 85%", once: true },
            }
          );
        });
        if (lineMobileRef.current) {
          gsap.fromTo(
            lineMobileRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 75%",
                end: "bottom 55%",
                scrub: true,
              },
            }
          );
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proces"
      className="relative scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="03 — Jak pracuję"
          title="Prosty, przewidywalny proces"
          subtitle="Wiesz dokładnie, co dzieje się na każdym etapie. Bez niespodzianek, z wyceną i akceptacją przed startem prac."
        />

        <div
          ref={gridRef}
          className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Oś czasu (desktop) — dorysowuje się do kolejnych etapów */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block"
          >
            <div
              ref={lineRef}
              className="h-full origin-left bg-gradient-to-r from-primary via-primary to-[#f43f5e]"
            />
          </div>

          {/* Oś czasu (mobile) — pionowa linia łącząca etapy */}
          <div
            aria-hidden
            className="absolute bottom-8 left-7 top-7 w-px bg-border sm:hidden"
          >
            <div
              ref={lineMobileRef}
              className="h-full w-full origin-top bg-gradient-to-b from-primary via-primary to-[#f43f5e]"
            />
          </div>

          {cvData.processSteps.map((step) => (
            <div key={step.step} className="process-step relative flex flex-col gap-4">
              <div className="process-num relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-card font-display text-lg font-bold text-primary shadow-lg shadow-primary/5">
                {step.step}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
