"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

/** Wspólny easing "kinowy" (expo-out) dla całej sekwencji intro. */
const EASE = [0.16, 1, 0.3, 1] as const;

interface KineticLineProps {
  children: ReactNode;
  delay: number;
  className?: string;
}

/**
 * Linia nagłówka odsłaniana z maski (overflow-hidden) — tekst wjeżdża
 * z dołu z lekkim obrotem, jak w kinetycznych czołówkach typograficznych.
 */
function KineticLine({ children, delay, className }: KineticLineProps) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("block overflow-hidden py-[0.06em] -my-[0.06em]", className)}>
      <motion.span
        className="block origin-left will-change-transform"
        initial={reduce ? false : { y: "115%", rotate: 3 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax przy scrollowaniu w dół: treść i zdjęcie "rozjeżdżają się"
  // w różnym tempie (głębia), całość delikatnie gaśnie i maleje.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const shrink = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  // Przy preferencji ograniczenia ruchu nie podpinamy transformacji scrollowych.
  const motionStyle = (y: MotionValue<number>) =>
    reduce ? undefined : { y, opacity: fade, scale: shrink };

  return (
    <section
      ref={sectionRef}
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
        <motion.div
          style={motionStyle(contentY)}
          className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Status dostępności — linia eyebrow zamiast pigułki */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease: EASE }}
            className="mb-6 inline-flex items-center gap-3 text-sm font-medium tracking-wide text-primary"
          >
            <span aria-hidden className="h-px w-8 bg-primary/50" />
            {cvData.personal.availability}
          </motion.p>

          {/* Nagłówek — kinetyczna typografia, linia po linii z maski */}
          <h1 className="max-w-full font-display text-[2.1rem] font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-[3.5rem]">
            <KineticLine delay={0.1}>Tworzę nowoczesne</KineticLine>
            <KineticLine delay={0.22}>
              {/* Akcent "markerem" — ręcznie rysowane podkreślenie zamiast gradientu */}
              <span className="relative inline-block">
                strony internetowe
                <svg
                  aria-hidden
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  fill="none"
                  className="absolute -bottom-[0.04em] left-0 h-[0.18em] w-full"
                >
                  <motion.path
                    d="M4 9.5C60 4.5 150 3.5 296 8"
                    stroke="var(--primary)"
                    strokeWidth={6}
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 1.15, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </KineticLine>
            <KineticLine delay={0.34}>dla firm</KineticLine>
          </h1>

          {/* Podtytuł */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {cvData.personal.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="group w-full font-semibold sm:w-auto"
              >
                <a href="#kontakt">
                  Wyceń projekt
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full font-medium sm:w-auto"
              >
                <a href="#realizacje">Zobacz realizacje</a>
              </Button>
            </Magnetic>
          </motion.div>

          {/* Pasek zaufania — wyróżniki */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.05 }}
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
        </motion.div>

        {/* Prawa kolumna — zdjęcie odsłaniane clip-pathem (efekt "kurtyny") */}
        <motion.div
          style={motionStyle(photoY)}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-transparent blur-2xl" />
          <motion.div
            initial={
              reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 2rem)" }
            }
            animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
            transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl"
          >
            <motion.img
              src="/profile.jpg"
              alt={cvData.personal.name}
              initial={reduce ? false : { scale: 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, delay: 0.45, ease: EASE }}
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
          </motion.div>
        </motion.div>
      </div>

      {/* Wskaźnik scrollowania — cienka linia z przesuwającym się światłem */}
      <motion.a
        href="#uslugi"
        aria-label="Przewiń do sekcji usług"
        style={reduce ? undefined : { opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-primary to-primary motion-reduce:animate-none" />
        </span>
      </motion.a>
    </section>
  );
}
