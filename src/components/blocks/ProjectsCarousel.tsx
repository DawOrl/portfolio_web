"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  if (!projects.length) return null;
  const selected = projects[active];
  const move = (direction: number) =>
    setActive(
      (index) => (index + direction + projects.length) % projects.length,
    );
  const offset = (index: number) => {
    let distance = (index - active + projects.length) % projects.length;
    if (distance > projects.length / 2) distance -= projects.length;
    return distance;
  };

  return (
    <div
      className="spatial-carousel"
      role="region"
      aria-roledescription="karuzela"
      aria-label="Wybrane projekty"
    >
      <div className="carousel-top">
        <span>WYBRANE PRACE / DESIGN & DEVELOPMENT</span>
        <span className="carousel-instruction">
          WYBIERZ SWOJĄ PERSPEKTYWĘ <ArrowUpRight size={14} />
        </span>
      </div>
      <div
        className="spatial-stage"
        tabIndex={0}
        aria-label="Karuzela projektów — użyj strzałek w lewo i w prawo"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          gesture.current = { x: event.clientX, y: event.clientY };
          suppressClick.current = false;
        }}
        onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
            suppressClick.current = true;
            move(dx < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onPointerLeave={() => {
          gesture.current = null;
        }}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="spatial-orbit" aria-hidden="true" />
        {projects.map((project, index) => {
          const distance = offset(index);
          return (
            <button
              key={project.slug}
              type="button"
              className="spatial-card"
              data-position={distance}
              data-active={index === active}
              style={{ zIndex: projects.length - Math.abs(distance) }}
              onClick={() => setActive(index)}
              aria-label={`Pokaż projekt ${index + 1}: ${project.title}`}
              aria-pressed={index === active}
            >
              <div className="spatial-card-image">
                <Image
                  src={project.cover}
                  alt={`Podgląd strony ${project.title.split(" — ")[0]}`}
                  fill
                  sizes="(max-width: 760px) 55vw, 360px"
                  draggable={false}
                />
              </div>
              <span className="spatial-card-number">
                {String(index + 1).padStart(2, "0")} / {project.year}
              </span>
              <span className="spatial-card-name">
                {project.title.split(" — ")[0]}
              </span>
            </button>
          );
        })}
        <span className="spatial-stage-note" aria-hidden="true">
          PRZECIĄGNIJ LUB WYBIERZ KARTĘ
        </span>
      </div>
      <div className="spatial-caption" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">
          {selected.category} ·{" "}
          {selected.kind === "demo"
            ? "Projekt autorski"
            : "Realizacja dla klienta"}
        </span>
        <h3>{selected.title.split(" — ")[0]}</h3>
        <p>{selected.tagline}</p>
        <Link className="text-link" href={`/realizacje/${selected.slug}`}>
          Zobacz projekt <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="carousel-controls">
        <div className="carousel-count">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <span>/ {String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="carousel-progress" aria-label="Wybór projektu">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              onClick={() => setActive(index)}
              aria-label={`Przejdź do projektu ${index + 1}: ${project.title}`}
              aria-current={active === index ? "true" : undefined}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="carousel-arrows">
          <button onClick={() => move(-1)} aria-label="Poprzedni projekt">
            <ArrowLeft size={21} />
          </button>
          <button onClick={() => move(1)} aria-label="Następny projekt">
            <ArrowRight size={21} />
          </button>
        </div>
      </div>
    </div>
  );
}
