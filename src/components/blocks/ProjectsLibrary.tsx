"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      projects.filter((p) => active === "Wszystkie" || p.category === active),
    [projects, active],
  );

  return (
    <div>
      {categories.length > 2 && (
        <div
          className="library-filters"
          role="group"
          aria-label="Filtruj projekty według rodzaju"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              aria-controls="library-results"
              className="library-filter"
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <p className="library-result-count" role="status">
        {active} <span aria-hidden="true">/</span> Liczba projektów:{" "}
        {filtered.length}
      </p>
      <div
        id="library-results"
        className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
      >
        {filtered.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </div>
      <Link href="/#kontakt" className="library-invitation">
        <span>
          <strong>Twój projekt może być tutaj</strong>
          <span>Porozmawiajmy o Twojej stronie. Wycena jest bezpłatna.</span>
        </span>
        <ArrowUpRight size={28} aria-hidden="true" />
      </Link>
    </div>
  );
}
