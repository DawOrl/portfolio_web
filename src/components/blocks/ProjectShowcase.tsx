"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Pojedyncza realizacja w układzie naprzemiennym (obraz raz z lewej, raz
 * z prawej) — duży screenshot z parallaxem wewnątrz maski przy scrollu.
 */
export function ProjectShowcase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const reversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-12"
    >
      {/* Screenshot — bohater realizacji */}
      <Link
        href={`/realizacje/${project.slug}`}
        aria-label={`Zobacz case study: ${project.title}`}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-colors duration-300 hover:border-primary/40 lg:col-span-7",
          reversed && "lg:order-2"
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={project.cover}
            alt={project.title}
            loading="lazy"
            style={reduce ? undefined : { y: parallaxY }}
            className="h-full w-full scale-[1.14] object-cover object-top transition-transform duration-700 group-hover:scale-[1.2]"
          />
        </div>
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      {/* Treść */}
      <div className={cn("lg:col-span-5", reversed && "lg:order-1")}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-primary">{project.category}</span>
          {project.year && (
            <>
              <span aria-hidden>·</span>
              <span>{project.year}</span>
            </>
          )}
          {project.client && (
            <>
              <span aria-hidden>·</span>
              <span>{project.client}</span>
            </>
          )}
          {project.kind === "demo" && (
            <span className="ml-1 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-0.5 font-medium text-primary">
              Projekt autorski
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          <Link
            href={`/realizacje/${project.slug}`}
            className="transition-colors hover:text-primary"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/realizacje/${project.slug}`}
          className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          Zobacz case study
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}
