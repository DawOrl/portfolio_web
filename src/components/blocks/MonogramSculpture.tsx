"use client";

import { useEffect, useId, useRef } from "react";
import "./monogram-sculpture.css";

/** The SVG remains visible until WebGL is ready, and when WebGL is unavailable. */
export function MonogramSculpture() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const gradient = useId();

  useEffect(() => {
    const element = stage.current!;
    let cancelled = false;
    let started = false;
    let dispose: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        void import("@/components/three/monogram-scene")
          .then(({ mountMonogram }) => {
            if (!cancelled) dispose = mountMonogram(element, canvas.current!);
          })
          .catch(() => {
            /* The static mark is the deliberate fallback. */
          });
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={stage}
      className="monogram-sculpture"
      role="img"
      aria-label="Przestrzenny monogram do — burgundowa forma z metalowymi krawędziami"
    >
      <div className="monogram-guide" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="monogram-shadow" aria-hidden="true" />
      <svg
        className="monogram-fallback"
        viewBox="-5 -5 100 80"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradient}
            x1="5"
            y1="0"
            x2="80"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e1d8d0" />
            <stop offset=".3" stopColor="#514b4b" />
            <stop offset=".6" stopColor="#d2c7c0" />
            <stop offset="1" stopColor="#4a4243" />
          </linearGradient>
        </defs>
        <g
          transform="translate(3 4)"
          stroke={`url(#${gradient})`}
          strokeWidth="9"
        >
          <path d="M34 8v36a14 14 0 1 1-14-14h14" />
          <circle cx="61" cy="44" r="14" />
        </g>
        <g stroke="#a00c30" strokeWidth="8">
          <path d="M34 8v36a14 14 0 1 1-14-14h14" />
          <circle cx="61" cy="44" r="14" />
        </g>
        <path d="M77 8h8v8h-8z" fill="var(--accent-cool)" />
      </svg>
      <canvas ref={canvas} className="monogram-canvas" aria-hidden="true" />
      <span className="monogram-caption" aria-hidden="true">
        FIG. 01 / OSOBISTY ZNAK
      </span>
      <span className="monogram-material" aria-hidden="true">
        BURGUND / METAL
      </span>
      <span className="monogram-pointer-note" aria-hidden="true">
        ZMIANA PERSPEKTYWY <span>↗</span>
      </span>
    </div>
  );
}
