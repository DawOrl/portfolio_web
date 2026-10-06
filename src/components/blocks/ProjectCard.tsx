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
      className={`work-item work-${index % 4} library-card`}
    >
      <div className="work-image">
        <div
          className={`library-preview${mobile ? " library-device-pair" : ""}`}
        >
          <div className="library-device-browser">
            <div className="library-device-toolbar" aria-hidden="true">
              <span className="library-device-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="library-device-title">{title}</span>
            </div>
            <div className="library-device-screen">
              <Image
                src={project.cover}
                alt={`Strona ${title} w wersji desktopowej`}
                fill
                sizes={
                  mobile
                    ? "(max-width: 639px) calc(75vw - 40px), (max-width: 1279px) calc(37.5vw - 38px), 430px"
                    : "(max-width: 639px) calc(100vw - 64px), (max-width: 1279px) calc(50vw - 60px), 550px"
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
                  sizes="(max-width: 639px) calc(25vw - 16px), (max-width: 1279px) calc(12.5vw - 18px), 124px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="work-caption">
        <div>
          <span className="eyebrow">
            {project.category} /{" "}
            {project.kind === "demo" ? "PROJEKT AUTORSKI" : project.client}
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
    </Link>
  );
}
