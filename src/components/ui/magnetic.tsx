"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  /** Siła przyciągania (0–1) — ułamek odległości kursora od środka. */
  strength?: number;
  className?: string;
}

/**
 * "Magnetyczny" wrapper — element delikatnie podąża za kursorem w obrębie
 * swojego pola i sprężyście wraca po opuszczeniu. Działa tylko dla myszy;
 * przy `prefers-reduced-motion` jest przezroczystym kontenerem.
 */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  if (reduce) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
