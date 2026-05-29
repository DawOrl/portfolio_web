"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Button } from "@/components/ui/button";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden pb-16 pt-28 lg:min-h-[92vh] lg:pt-24"
    >
      {/* Subtelna poświata w tle hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-130 w-full max-w-205 -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Lewa kolumna — treść */}
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge dostępności */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {cvData.personal.availability}
          </motion.div>

          {/* Nagłówek */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-full font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Tworzę nowoczesne{" "}
            <span className="text-gradient">strony internetowe</span> dla firm
          </motion.h1>

          {/* Podtytuł */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {cvData.personal.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#kontakt">
              <Button size="lg" className="group w-full font-semibold sm:w-auto">
                Wyceń projekt
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#realizacje">
              <Button
                size="lg"
                variant="outline"
                className="w-full font-medium sm:w-auto"
              >
                Zobacz realizacje
              </Button>
            </a>
          </motion.div>

          {/* Pasek zaufania — wyróżniki */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} className="text-primary" />
              {cvData.personal.location}
            </span>
            {cvData.highlights.map((h) => (
              <span key={h} className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary" />
                {h}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Prawa kolumna — zdjęcie */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-transparent blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt={cvData.personal.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
              <p className="font-display text-lg font-semibold text-foreground">
                {cvData.personal.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {cvData.personal.role} · {cvData.personal.location}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
