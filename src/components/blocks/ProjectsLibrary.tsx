"use client";

import { useMemo, useState } from "react";
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
    [projects, active],
  );

  return (
    <div className="library-content">
      {categories.length > 2 && (
        <div
          className="library-filters"
          role="group"
          aria-label="Filtruj projekty według rodzaju"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              aria-controls="library-results"
              className="library-filter"
            >
              {category}
              <span className="library-filter-count" aria-hidden="true">
                {category === "Wszystkie"
                  ? projects.length
                  : projects.filter((project) => project.category === category)
                      .length}
              </span>
            </button>
          ))}
        </div>
      )}

      <p className="library-result-count" role="status" aria-atomic="true">
        <span>{active}</span>
        <span>
          Wyświetlono {filtered.length} z&nbsp;{projects.length} projektów
        </span>
      </p>
      <div id="library-results" className="library-grid">
        {filtered.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} index={projects.indexOf(project)} />
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="library-empty">
          <h2>Brak projektów w&nbsp;tej kategorii.</h2>
          <p>Wybierz inny rodzaj projektu lub wróć do pełnej biblioteki.</p>
          <button type="button" onClick={() => setActive("Wszystkie")}>
            Pokaż wszystkie projekty
          </button>
        </div>
      )}
    </div>
  );
}
