"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";

export function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <Section id="proces">
      <SectionHeading
        eyebrow="03 — Jak pracuję"
        title="Prosty, przewidywalny proces"
        subtitle="Wiesz dokładnie, co dzieje się na każdym etapie. Bez niespodzianek, z wyceną i akceptacją przed startem prac."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Linia łącząca (desktop) */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-border via-primary/40 to-border lg:block"
        />

        {cvData.processSteps.map((step) => (
          <motion.div
            key={step.step}
            variants={{
              hidden: reduce ? {} : { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="relative flex flex-col gap-4"
          >
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-card font-display text-lg font-bold text-primary shadow-lg shadow-primary/5">
              {step.step}
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
