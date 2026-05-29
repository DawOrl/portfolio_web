"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

interface CtaBandProps {
  title?: string;
  subtitle?: string;
}

export function CtaBand({
  title = "Masz pomysł na projekt?",
  subtitle = "Opowiedz mi o swojej firmie — przygotuję bezpłatną wycenę i podpowiem najlepsze rozwiązanie.",
}: CtaBandProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/60 p-8 backdrop-blur-sm md:p-12">
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {title}
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">{subtitle}</p>
            </div>
            <a href="#kontakt" className="shrink-0">
              <Button size="lg" className="group font-semibold">
                Wyceń projekt
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
