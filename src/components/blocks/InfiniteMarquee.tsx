"use client";
/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { cvData } from "@/data/cv-data";

// Nazwa technologii -> plik logo w /public/ikony
const iconMap: Record<string, string> = {
  "Next.js": "nextjs",
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwind",
  "Framer Motion": "framer",
  "Node.js": "nodejs",
  Python: "python",
  "REST API": "api",
  Git: "git",
  Vercel: "vercel",
  Claude: "claude",
  "Claude Code": "claude-code",
  Gemini: "gemini",
  "Nano Banana 2": "nano-banana",
  Obsidian: "obsidian",
};

export function InfiniteMarquee() {
  const items = [...cvData.skills];
  // Powielamy listę, aby pętla domykała się płynnie
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative flex w-full items-center overflow-hidden rounded-xl border border-border bg-card/30 py-6">
      {/* Płynne zanikanie po bokach */}
      <div className="absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background to-transparent md:w-24" />
      <div className="absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background to-transparent md:w-24" />

      <motion.div
        className="flex w-max gap-6 whitespace-nowrap md:gap-10"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ ease: "linear", duration: 35, repeat: Infinity }}
      >
        {duplicatedItems.map((item, index) => {
          const icon = iconMap[item];
          return (
            <span
              key={index}
              className="flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 font-mono text-xs text-muted-foreground md:text-sm"
            >
              {icon && (
                <img
                  src={`/icons/${icon}.svg`}
                  alt=""
                  aria-hidden
                  className="h-4 w-4 shrink-0"
                />
              )}
              {item}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
