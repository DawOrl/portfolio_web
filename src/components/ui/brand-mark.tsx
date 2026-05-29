"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Logo marki z /public (przezroczyste tło). Domyślnie sam znak orła
 * (logo-mark.png); przez `src` można podać pełny lockup (logo-full.png).
 * Jeśli pliku nie ma jeszcze w projekcie — komponent po cichu się chowa,
 * więc nigdzie nie pojawi się "zepsuty" obrazek.
 */
export function BrandMark({
  className,
  src = "/logo-mark.png",
}: {
  className?: string;
  src?: string;
}) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  return (
    <img
      src={src}
      alt="Logo dorlowski.dev"
      onError={() => setOk(false)}
      className={cn("object-contain", className)}
    />
  );
}
