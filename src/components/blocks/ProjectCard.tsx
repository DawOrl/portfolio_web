"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/realizacje/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
      >
        {/* Okładka */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-background">
          <img
            src={project.cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {project.category}
          </span>
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>

        {/* Treść */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            {project.year && <span>{project.year}</span>}
            {project.year && project.client && <span>·</span>}
            {project.client && <span>{project.client}</span>}
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
