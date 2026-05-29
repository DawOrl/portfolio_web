"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const reduce = useReducedMotion();

  return (
    <Section id="cennik">
      <SectionHeading
        eyebrow="05 — Cennik"
        title="Przejrzyste pakiety"
        subtitle="Ceny orientacyjne — finalną wycenę przygotowuję indywidualnie po poznaniu Twoich potrzeb. Bez ukrytych kosztów."
        align="center"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
      >
        {cvData.pricing.map((plan) => (
          <motion.div
            key={plan.name}
            variants={{
              hidden: reduce ? {} : { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={cn(
              "relative flex flex-col gap-6 rounded-3xl border p-7 md:p-8",
              plan.featured
                ? "border-primary/50 bg-card shadow-xl shadow-primary/5 lg:-mt-4 lg:mb-4"
                : "border-border bg-card/50"
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                Najczęściej wybierany
              </span>
            )}

            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
            </div>

            <div>
              <span className="font-display text-3xl font-bold text-foreground">
                {plan.price}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {plan.description}
            </p>

            <ul className="flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-foreground/90"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <a href="#kontakt" className="mt-auto pt-2">
              <Button
                className="w-full font-semibold"
                variant={plan.featured ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
