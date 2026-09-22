import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link
      href={`/realizacje/${project.slug}`}
      className={`work-item work-${index % 4} library-card`}
    >
      <div className="work-image">
        <div className="library-preview">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 1152px) calc(50vw - 76px), 500px"
          />
        </div>
      </div>
      <div className="work-caption">
        <div>
          <span className="eyebrow">
            {project.category} /{" "}
            {project.kind === "demo" ? "PROJEKT AUTORSKI" : project.client}
          </span>
          <h3>{project.title.split(" — ")[0]}</h3>
        </div>
        <span className="library-card-meta">
          <span className="work-year">{project.year}</span>
          <span className="work-open" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </span>
      </div>
      <p className="library-description">{project.tagline}</p>
    </Link>
  );
}
