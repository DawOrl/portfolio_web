import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import "./project-card.css";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const title = project.title.split(" - ")[0];
  const mobile = project.gallery.find((src) => src.endsWith("/mobile.png"));

  return (
    <Link
      href={`/realizacje/${project.slug}`}
      className="work-item library-card"
      data-project-slug={project.slug}
    >
      <div className="work-image">
        <div
          className={`library-preview${mobile ? " library-device-pair" : ""}`}
        >
          <div className="library-device-browser">
            <div className="library-device-screen">
              <Image
                src={project.cover}
                alt={`Strona ${title} w wersji desktopowej`}
                fill
                data-project-cover
                data-project-slug={project.slug}
                sizes={
                  mobile
                    ? "(max-width: 760px) calc(88vw - 68px), (max-width: 1100px) calc(44vw - 65px), 520px"
                    : "(max-width: 760px) calc(100vw - 76px), (max-width: 1100px) calc(50vw - 74px), 550px"
                }
              />
            </div>
          </div>
          {mobile && (
            <div className="library-phone">
              <div className="library-phone-screen">
                <Image
                  src={mobile}
                  alt={`Strona ${title} w wersji mobilnej`}
                  fill
                  sizes="(max-width: 760px) calc(23vw - 17px), (max-width: 1100px) calc(12vw - 20px), 124px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="work-caption">
        <div>
          <span className="library-card-category">
            <span>{String(index + 1).padStart(2, "0")}</span>
            {project.category}
          </span>
          <h3>{title}</h3>
        </div>
        <span className="library-card-meta">
          <span className="work-year">{project.year}</span>
          <span className="work-open" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </span>
      </div>
      <p className="library-description">{project.tagline}</p>
      <span className="library-card-kind">
        {project.kind === "demo" ? "Projekt autorski" : project.client}
      </span>
    </Link>
  );
}
