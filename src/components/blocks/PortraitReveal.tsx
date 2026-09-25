"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Scan } from "lucide-react";
import "./portrait-reveal.css";

gsap.registerPlugin(useGSAP);

type LiquidState = { x: number; y: number; radius: number; phase: number };

function liquidPath(
  state: LiquidState,
  target: { x: number; y: number },
  width: number,
  height: number,
) {
  if (state.radius < 0.1) return "M0 0Z";
  const dx = Math.max(-50, Math.min(50, target.x - state.x));
  const dy = Math.max(-50, Math.min(50, target.y - state.y));
  const speed = Math.hypot(dx, dy);
  const points = Array.from({ length: 24 }, (_, index) => {
    const angle = (index / 24) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const flow = (cos * dx + sin * dy) / (speed || 1);
    const wave =
      1 +
      0.18 * Math.sin(angle * 3 + state.phase) +
      0.1 * Math.cos(angle * 5 - state.phase * 1.2) +
      0.045 * Math.sin(angle * 7 + state.phase * 0.7);
    const radius =
      state.radius * (wave + 0.3 * Math.min(speed / 50, 1) * flow * flow);
    return {
      x: (state.x + cos * radius - dx * 0.2) / width,
      y: (state.y + sin * radius - dy * 0.2) / height,
    };
  });
  const point = (index: number) =>
    points[(index + points.length) % points.length];
  const pair = (x: number, y: number) => `${x.toFixed(5)} ${y.toFixed(5)}`;
  let path = `M${pair(points[0].x, points[0].y)}`;
  for (let i = 0; i < points.length; i++) {
    const previous = point(i - 1),
      current = point(i),
      next = point(i + 1),
      after = point(i + 2);
    path += `C${pair(current.x + (next.x - previous.x) / 6, current.y + (next.y - previous.y) / 6)} ${pair(next.x - (after.x - current.x) / 6, next.y - (after.y - current.y) / 6)} ${pair(next.x, next.y)}`;
  }
  return `${path}Z`;
}

export function PortraitReveal() {
  const maskId = useId().replace(/:/g, "");
  const image = useRef<HTMLDivElement>(null);
  const shape = useRef<SVGPathElement>(null);
  const locked = useRef(false);
  const switchView = useRef<(value: boolean) => void>(() => {});
  const [showRobot, setShowRobot] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useGSAP(
    () => {
      if (!ready || failed) return;
      const visual = image.current!;
      const stage = visual.closest<HTMLElement>(".about-portrait-stage")!;
      const media = gsap.matchMedia();
      media.add(
        {
          all: "(min-width: 0px)",
          fine: "(hover: hover) and (pointer: fine)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { fine, reduce } = context.conditions!;
          const canMask = CSS.supports("mask-image", `url("#${maskId}-robot")`);
          const human = visual.querySelector(".portrait-human")!;
          const android = visual.querySelector(".portrait-android")!;
          let width = visual.clientWidth;
          let height = visual.clientHeight;
          const fullRadius = () => Math.hypot(width, height) * 1.8;

          if (reduce || !canMask) {
            gsap.set(android, { opacity: locked.current ? 1 : 0 });
            gsap.set(human, { opacity: locked.current ? 0 : 1 });
            const toRobot = gsap.quickTo(android, "opacity", {
              duration: reduce ? 0 : 0.35,
            });
            const toHuman = gsap.quickTo(human, "opacity", {
              duration: reduce ? 0 : 0.35,
            });
            switchView.current = (value) => {
              toRobot(value ? 1 : 0);
              toHuman(value ? 0 : 1);
            };
            return () => {
              switchView.current = () => {};
            };
          }

          visual.dataset.revealMode = "liquid";
          const state: LiquidState = {
            x: width * 0.5,
            y: height * 0.32,
            radius: locked.current ? fullRadius() : 0,
            phase: 0.8,
          };
          const target = { x: state.x, y: state.y };
          let phase = state.phase;
          let frame = 0;
          let active = true;
          const draw = () => {
            shape.current?.setAttribute(
              "d",
              liquidPath(state, target, width, height),
            );
          };
          // Coalesce the quickTo updates into one mask write per frame; no idle loop.
          const queueDraw = () => {
            if (frame || !active) return;
            frame = requestAnimationFrame(() => {
              frame = 0;
              draw();
            });
          };
          draw();
          gsap.set(human, { maskImage: `url("#${maskId}-human")` });
          gsap.set(android, {
            opacity: 1,
            maskImage: `url("#${maskId}-robot")`,
          });
          const moveX = gsap.quickTo(state, "x", {
            duration: 0.36,
            ease: "power3.out",
            onUpdate: queueDraw,
          });
          const moveY = gsap.quickTo(state, "y", {
            duration: 0.36,
            ease: "power3.out",
            onUpdate: queueDraw,
          });
          const ripple = gsap.quickTo(state, "phase", {
            duration: 1.15,
            ease: "power2.out",
            onUpdate: queueDraw,
          });
          const radius = gsap.quickTo(state, "radius", {
            duration: 0.65,
            ease: "power3.out",
            onUpdate: queueDraw,
          });
          switchView.current = (value) => radius(value ? fullRadius() : 0);

          const move = (event: PointerEvent) => {
            if (locked.current || event.pointerType !== "mouse") return;
            if (
              event.target instanceof Element &&
              event.target.closest("a,button")
            ) {
              radius(0);
              return;
            }
            const rect = visual.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
              radius(0);
              return;
            }
            const distance = Math.hypot(x - target.x, y - target.y);
            phase += Math.min(distance, 80) * 0.012;
            target.x = x;
            target.y = y;
            moveX(x);
            moveY(y);
            ripple(phase);
            radius(Math.min(175, rect.width * 0.25));
          };
          const leave = () => {
            if (!locked.current) radius(0);
          };
          const blur = () => {
            if (!locked.current) radius(0);
          };
          const resize = new ResizeObserver(() => {
            width = visual.clientWidth;
            height = visual.clientHeight;
            radius(locked.current ? fullRadius() : 0);
            queueDraw();
          });
          resize.observe(visual);
          if (fine) {
            stage.addEventListener("pointermove", move);
            stage.addEventListener("pointerleave", leave);
            window.addEventListener("blur", blur);
          }
          return () => {
            active = false;
            cancelAnimationFrame(frame);
            stage.removeEventListener("pointermove", move);
            stage.removeEventListener("pointerleave", leave);
            window.removeEventListener("blur", blur);
            resize.disconnect();
            delete visual.dataset.revealMode;
            switchView.current = () => {};
          };
        },
        image,
      );
      return () => media.revert();
    },
    {
      scope: image,
      dependencies: [ready, failed, maskId],
      revertOnUpdate: true,
    },
  );

  return (
    <>
      <div
        ref={image}
        id="portrait-visual"
        className="about-portrait-image"
        role="img"
        aria-label={
          showRobot
            ? "Robot w kolorach marki, interaktywny wariant portretu"
            : "Portret Dawida Orłowskiego"
        }
      >
        <svg
          className="portrait-masks"
          width="0"
          height="0"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <path ref={shape} id={`${maskId}-shape`} d="M0 0Z" />
            <filter
              id={`${maskId}-soft`}
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
            >
              <feGaussianBlur stdDeviation="0.006" />
            </filter>
            <mask
              id={`${maskId}-human`}
              maskUnits="objectBoundingBox"
              maskContentUnits="objectBoundingBox"
              x="0"
              y="0"
              width="1"
              height="1"
              style={{ maskType: "luminance" }}
            >
              <rect width="1" height="1" fill="white" />
              <use
                href={`#${maskId}-shape`}
                fill="black"
                filter={`url(#${maskId}-soft)`}
              />
            </mask>
            <mask
              id={`${maskId}-robot`}
              maskUnits="objectBoundingBox"
              maskContentUnits="objectBoundingBox"
              x="0"
              y="0"
              width="1"
              height="1"
              style={{ maskType: "luminance" }}
            >
              <use
                href={`#${maskId}-shape`}
                fill="white"
                filter={`url(#${maskId}-soft)`}
              />
            </mask>
          </defs>
        </svg>
        <div className="portrait-human" aria-hidden="true">
          <Image
            src="/profile-cutout-enhanced.png"
            alt=""
            fill
            quality={95}
            sizes="(max-width: 760px) 460px, (max-width: 1100px) 542px, 780px"
          />
        </div>
        <div className="portrait-android" aria-hidden="true">
          <Image
            src="/profile-android.png"
            alt=""
            fill
            quality={95}
            sizes="(max-width: 760px) 460px, (max-width: 1100px) 542px, 780px"
            onLoad={() => setReady(true)}
            onError={() => {
              setFailed(true);
              setShowRobot(false);
              locked.current = false;
            }}
          />
        </div>
      </div>
      <div className="portrait-reveal-control">
        <button
          type="button"
          aria-pressed={showRobot}
          aria-controls="portrait-visual"
          disabled={!ready || failed}
          onClick={() => {
            const value = !locked.current;
            locked.current = value;
            setShowRobot(value);
            switchView.current(value);
          }}
        >
          <Scan size={16} aria-hidden="true" />
          {failed
            ? "Efekt niedostępny"
            : !ready
              ? "Ładowanie efektu…"
              : showRobot
                ? "Pokaż portret"
                : "Pokaż robota"}
        </button>
        {ready && !failed && !showRobot && (
          <span className="portrait-reveal-hint">
            lub przesuń kursor po zdjęciu
          </span>
        )}
      </div>
    </>
  );
}
