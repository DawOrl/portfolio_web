"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FooterWordmarkProps {
  text?: string;
}

/**
 * Ogromny, ledwo widoczny napis w tle stopki z subtelnie przesuwającym się
 * gradientem (shimmer). Czysto dekoracyjny — respektuje prefers-reduced-motion.
 */
export function FooterWordmark({ text = "dorlowski.dev" }: FooterWordmarkProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end justify-center overflow-hidden"
    >
      <div className="w-full max-w-6xl px-6 md:px-10">
        <motion.span
          animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ duration: 9, ease: "linear", repeat: Infinity }}
          className="block translate-y-[14%] whitespace-nowrap text-center font-display text-[clamp(2.5rem,11vw,128px)] font-bold leading-none tracking-tighter text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, color-mix(in oklab, var(--foreground) 5%, transparent) 0%, color-mix(in oklab, var(--primary) 28%, transparent) 50%, color-mix(in oklab, var(--foreground) 5%, transparent) 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {text}
        </motion.span>
      </div>
    </div>
  );
}
