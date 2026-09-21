import { cn } from "@/lib/utils";

/** Geometry shared with the favicon and downloadable SVG. */
export function BrandMark({ className }: { className?: string; src?: string }) {
  return (
    <svg
      width="88"
      height="64"
      viewBox="0 0 88 64"
      fill="none"
      className={cn("brand-mark", className)}
      role="img"
      aria-label="Dawid Orłowski — monogram do"
    >
      <path
        d="M34 8v36a14 14 0 1 1-14-14h14"
        stroke="currentColor"
        strokeWidth="8"
      />
      <circle cx="61" cy="44" r="14" stroke="currentColor" strokeWidth="8" />
      <path d="M77 8h8v8h-8z" fill="#9FC5D3" />
    </svg>
  );
}
