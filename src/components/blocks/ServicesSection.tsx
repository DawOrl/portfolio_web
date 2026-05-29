"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, Target, ShoppingBag, Smartphone, Check, type LucideIcon } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Target,
  ShoppingBag,
  Smartphone,
};

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
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {cvData.services.map((service) => {
          const Icon = iconMap[service.icon] ?? Globe;
          return (
            <motion.article
              key={service.id}
              variants={{
                hidden: reduce ? {} : { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 md:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Icon size={22} strokeWidth={1.75} />
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>

              <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="inline-flex items-center gap-1.5 text-sm text-foreground/80"
                  >
                    <Check size={15} className="shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
