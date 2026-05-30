"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsLibrary({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState("Wszystkie");

  const filtered = useMemo(
    () =>
      projects.filter((p) => active === "Wszystkie" || p.category === active),
    [projects, active]
  );

  return (
    <div>
      {/* Filtry — tylko gdy jest realnie z czego wybierać */}
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                active === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Karta-CTA */}
        <Link
          href="/#kontakt"
          className="group flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center transition-colors duration-300 hover:border-primary/50 hover:bg-card/50"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight size={22} />
          </span>
          <span className="font-display text-lg font-semibold text-foreground">
            Twój projekt może być tutaj
          </span>
          <span className="max-w-xs text-sm text-muted-foreground">
            Porozmawiajmy o Twojej stronie — bezpłatna wycena.
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
