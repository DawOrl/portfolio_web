"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface CtaBandProps {
  title?: string;
  subtitle?: string;
}

/**
 * Full-bleed pas CTA z wielką typografią w marquee (motyw gigantycznego
 * wordmarku ze stopki). Cały pas jest linkiem do #kontakt; animacja
 * pauzuje na hover i wyłącza się przy `prefers-reduced-motion`.
 */
export function CtaBand({
  title = "Masz pomysł na projekt?",
  subtitle = "Opowiedz mi o swojej firmie — przygotuję bezpłatną wycenę i podpowiem najlepsze rozwiązanie.",
}: CtaBandProps) {
  const segment = (
    <span className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
      <span className="whitespace-nowrap font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
        {title}
      </span>
      <ArrowRight
        className="h-8 w-8 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-2 md:h-12 md:w-12"
        strokeWidth={1.75}
      />
      <span className="whitespace-nowrap font-display text-4xl font-bold tracking-tight text-primary md:text-6xl">
        Wyceń projekt
      </span>
      <ArrowRight
        className="h-8 w-8 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-2 md:h-12 md:w-12"
        strokeWidth={1.75}
      />
    </span>
  );

  return (
    <Reveal>
      <a
        href="#kontakt"
        aria-label={`${title} Wyceń projekt`}
        className="group block overflow-hidden border-y border-border bg-card/40 py-10 backdrop-blur-sm transition-colors duration-300 hover:bg-card/70 md:py-14"
      >
        <div
          aria-hidden
          className="flex w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {segment}
          {segment}
          {segment}
        </div>
        <p className="mx-auto mt-6 max-w-2xl px-6 text-center text-sm text-muted-foreground md:mt-8">
          {subtitle}
        </p>
      </a>
    </Reveal>
  );
}
