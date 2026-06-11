"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/** Bento: zygzak 7/5 — 5/7 kolumn (na siatce 12), zamiast czterech równych kart. */
const bentoSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function ServicesSection() {
  const reduce = useReducedMotion();

  return (
    <Section id="uslugi">
      <SectionHeading
        eyebrow="01 — Oferta"
        title="W czym mogę Ci pomóc"
        subtitle="Buduję strony skrojone pod cel Twojej firmy — od prostej wizytówki, przez landing pod kampanię, po sklep czy aplikację."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12"
      >
        {cvData.services.map((service, i) => (
          <motion.article
            key={service.id}
            variants={{
              hidden: reduce ? {} : { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={cn(
              "group relative flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-primary hover:bg-primary md:p-8",
              bentoSpans[i % bentoSpans.length]
            )}
          >
            {/* Numer typograficzny zamiast ikony w kafelku */}
            <span
              aria-hidden
              className="font-display text-5xl font-bold leading-none tracking-tight text-primary/25 transition-colors duration-300 group-hover:text-primary-foreground/35 md:text-6xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="font-display text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
                {service.description}
              </p>
            </div>

            <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-300 group-hover:text-primary-foreground/90"
                >
                  <Check
                    size={15}
                    className="shrink-0 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
