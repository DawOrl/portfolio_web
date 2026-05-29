"use client";

import { Quote, Star } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  return (
    <Section id="opinie">
      <SectionHeading
        eyebrow="05 — Opinie"
        title="Co mówią klienci"
        subtitle="Najważniejszy jest efekt i komfort współpracy. Oto, jak oceniają ją osoby, dla których pracowałem."
        align="center"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cvData.testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card/50 p-7">
              <Quote className="h-7 w-7 text-primary/40" />
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                „{t.quote}”
              </blockquote>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star
                    key={s}
                    size={15}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>
              <figcaption className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
