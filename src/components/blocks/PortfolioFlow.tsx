"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./portfolio-flow.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const chapters = [
  ".hero",
  "#studium-formy",
  "#realizacje",
  "#uslugi",
  "#o-mnie",
  "#od-pomyslu-do-strony",
  "#proces",
  "#cennik",
  "#faq",
  "#kontakt",
];

type FlowPoint = { x: number; y: number };

/** Read document flow rather than animated transforms or a pinned section's rect. */
function chapterTop(element: HTMLElement, main: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null =
    element.closest<HTMLElement>(".pin-spacer") ?? element;
  while (node && node !== main) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function connectChapters(points: FlowPoint[]) {
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index++) {
    const previous = points[index - 1];
    const current = points[index];
    const middle = (previous.y + current.y) / 2;
    path += ` C ${previous.x} ${middle}, ${current.x} ${middle}, ${current.x} ${current.y}`;
  }
  return path;
}

export function PortfolioFlow() {
  const guide = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = guide.current;
      const main = root?.closest<HTMLElement>(".portfolio-home");
      if (!root || !main) return;
      const svg = root.querySelector<SVGSVGElement>("svg")!;
      const track = root.querySelector<SVGPathElement>(
        ".portfolio-flow-track",
      )!;
      const drawn = root.querySelector<SVGPathElement>(
        ".portfolio-flow-drawn",
      )!;
      const lead = root.querySelector<SVGPathElement>(".portfolio-flow-lead")!;
      const marker = root.querySelector<SVGGElement>(".portfolio-flow-marker")!;
      const stops = Array.from(
        root.querySelectorAll<SVGCircleElement>(".portfolio-flow-stop"),
      );
      const media = gsap.matchMedia(root);

      media.add(
        "(min-width: 761px) and (prefers-reduced-motion: no-preference) and (forced-colors: none)",
        () => {
          let alive = true;
          let frame = 0;
          let measuredHeight = 0;
          let measuredWidth = 0;
          let length = 1;
          let direction = 1;
          let samples: FlowPoint[] = [];
          let nodes: FlowPoint[] = [];
          let activeStop = -2;
          const progress = { value: 0 };

          const render = () => {
            if (!samples.length) return;
            const value = gsap.utils.clamp(0, 1, progress.value);
            const distance = value * length;
            const sample = value * (samples.length - 1);
            const index = Math.min(samples.length - 2, Math.floor(sample));
            const mix = sample - index;
            const start = samples[index];
            const end = samples[index + 1];
            const x = start.x + (end.x - start.x) * mix;
            const y = start.y + (end.y - start.y) * mix;
            const angle =
              (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI -
              90 +
              (direction < 0 ? 180 : 0);
            const tail = Math.min(44, distance);

            drawn.style.strokeDashoffset = String(length - distance);
            lead.style.strokeDasharray = `${tail} ${length}`;
            lead.style.strokeDashoffset = String(-Math.max(0, distance - tail));
            marker.setAttribute(
              "transform",
              `translate(${x} ${y}) rotate(${angle})`,
            );

            let current = -1;
            for (let stop = 0; stop < nodes.length; stop++) {
              if (nodes[stop].y <= y + 2) current = stop;
            }
            if (current !== activeStop) {
              activeStop = current;
              stops.forEach((stop, stopIndex) => {
                stop.dataset.state =
                  stopIndex === current
                    ? "current"
                    : stopIndex < current
                      ? "passed"
                      : "upcoming";
              });
            }
          };

          const measure = () => {
            // Batch layout reads before SVG writes; scroll updates only use cached points.
            const height = main.clientHeight;
            const width = root.clientWidth;
            const center = width / 2;
            const bend = Math.min(7, width * 0.2);
            const end = Math.max(48, height - 32);
            const anchors = chapters
              .map((selector) => main.querySelector<HTMLElement>(selector))
              .map((section, index) => {
                if (!section) return null;
                return {
                  x: center + (index % 2 === 0 ? -bend : bend),
                  y: Math.min(end - 24, chapterTop(section, main) + 48),
                };
              })
              .filter((point): point is FlowPoint => point !== null)
              .sort((first, second) => first.y - second.y)
              .filter((point, index, points) =>
                index === 0 ? point.y > 24 : point.y - points[index - 1].y > 48,
              );

            measuredHeight = height;
            measuredWidth = main.clientWidth;
            nodes = anchors;
            activeStop = -2;
            const path = connectChapters([
              { x: center, y: 24 },
              ...anchors,
              { x: center, y: end },
            ]);
            svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
            [track, drawn, lead].forEach((element) =>
              element.setAttribute("d", path),
            );
            stops.forEach((stop, index) => {
              const node = anchors[index];
              stop.style.display = node ? "" : "none";
              if (node) {
                stop.setAttribute("cx", String(node.x));
                stop.setAttribute("cy", String(node.y));
              }
            });

            length = track.getTotalLength();
            drawn.style.strokeDasharray = String(length);
            samples = Array.from({ length: 257 }, (_, index) => {
              const point = track.getPointAtLength((length * index) / 256);
              return { x: point.x, y: point.y };
            });
            render();
            root.dataset.ready = "true";
          };

          const refresh = () => {
            if (frame || !alive) return;
            frame = requestAnimationFrame(() => {
              frame = 0;
              if (alive) ScrollTrigger.refresh();
            });
          };

          measure();
          gsap.to(progress, {
            value: 1,
            ease: "none",
            onUpdate: render,
            scrollTrigger: {
              trigger: main,
              start: "top 55%",
              end: "bottom 55%",
              scrub: 0.18,
              refreshPriority: -1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                direction = self.direction;
              },
              onRefresh: measure,
            },
          });

          const observer = new ResizeObserver(() => {
            if (
              main.clientHeight !== measuredHeight ||
              main.clientWidth !== measuredWidth
            ) {
              refresh();
            }
          });
          observer.observe(main);
          void document.fonts.ready.then(() => {
            if (alive) refresh();
          });

          return () => {
            alive = false;
            observer.disconnect();
            cancelAnimationFrame(frame);
            delete root.dataset.ready;
          };
        },
      );

      return () => media.revert();
    },
    { scope: guide },
  );

  return (
    <div ref={guide} className="portfolio-flow" aria-hidden="true">
      <svg viewBox="0 0 32 1" preserveAspectRatio="none" focusable="false">
        <path className="portfolio-flow-track" />
        <path className="portfolio-flow-drawn" />
        <path className="portfolio-flow-lead" />
        {chapters.map((chapter) => (
          <circle key={chapter} className="portfolio-flow-stop" r="2.5" />
        ))}
        <g className="portfolio-flow-marker">
          <circle r="3" />
          <path d="M -3 -7 L 0 -4 L 3 -7" />
        </g>
      </svg>
    </div>
  );
}
