import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ProjectGalleryLightbox } from "@/components/blocks/ProjectGalleryLightbox";
import { ContactIntentLink } from "@/components/ui/contact-intent-link";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import "./case-study.css";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Nie znaleziono projektu" };

  return {
    title: `${project.title} - case study`,
    description: project.tagline,
    alternates: { canonical: `/realizacje/${project.slug}` },
    openGraph: {
      title: `${project.title} - case study`,
      description: project.tagline,
      images: [{ url: `${SITE_URL}${project.cover}` }],
      type: "article",
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const title = project.title.split(" - ")[0];
  const mobile = project.gallery.find((src) => src.endsWith("/mobile.png"));

  return (
    <>
      <Navbar />

      <main id="main-content" className="case-study shell">
        <nav className="case-navigation" aria-label="Nawigacja projektów">
          <Link href="/#realizacje">
            <ArrowLeft size={16} aria-hidden="true" /> Wybrane projekty
          </Link>
          <Link href="/realizacje">Biblioteka projektów</Link>
        </nav>

        <article aria-labelledby="case-title">
          <header className="case-header">
            <div className="case-meta">
              <span>{project.category}</span>
              <span className="case-project-kind">
                {project.kind === "demo"
                  ? "Projekt autorski"
                  : "Realizacja dla klienta"}
              </span>
              {project.year && (
                <span className="case-year">{project.year}</span>
              )}
            </div>
            <div className="case-heading-layout">
              <h1 id="case-title" tabIndex={-1}>
                {title}
              </h1>
              <div className="case-header-copy">
                <p>{project.tagline}</p>
                <div className="case-public-links">
                  {project.liveUrl && (
                    <a
                      className="case-live-link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Zobacz na żywo
                      <ArrowUpRight size={18} aria-hidden="true" />
                      <span className="sr-only"> (nowa karta)</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      className="case-code-link"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={17} aria-hidden="true" /> Kod na GitHub
                      <span className="sr-only"> (nowa karta)</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="case-device-scene">
            <div
              className={`case-devices${mobile ? " case-devices-pair" : ""}`}
            >
              <figure className="case-desktop">
                <div className="case-desktop-window">
                  <div className="case-device-toolbar" aria-hidden="true">
                    <span className="case-device-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{title}</span>
                  </div>
                  <div className="case-device-screen">
                    <Image
                      src={project.cover}
                      alt={`${title}, wersja desktopowa`}
                      fill
                      priority
                      quality={95}
                      sizes={
                        mobile
                          ? "(max-width: 760px) 70vw, (max-width: 1100px) 72vw, 1000px"
                          : "(max-width: 1100px) 90vw, 1200px"
                      }
                      data-project-cover
                      data-project-slug={project.slug}
                    />
                  </div>
                </div>
                <figcaption>Wersja desktopowa</figcaption>
              </figure>
              {mobile && (
                <figure className="case-phone">
                  <div className="case-phone-frame">
                    <div className="case-phone-screen">
                      <Image
                        src={mobile}
                        alt={`${title}, wersja mobilna`}
                        fill
                        quality={95}
                        sizes="(max-width: 760px) 22vw, 200px"
                      />
                    </div>
                  </div>
                  <figcaption>Wersja mobilna</figcaption>
                </figure>
              )}
            </div>
          </div>

          <div className="case-narrative">
            <aside className="case-facts" aria-label="Informacje o projekcie">
              <dl>
                {project.client && (
                  <div>
                    <dt>Klient</dt>
                    <dd>{project.client}</dd>
                  </div>
                )}
                <div>
                  <dt>Technologie</dt>
                  <dd>
                    <ul className="case-stack">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </aside>

            <div className="case-story">
              <section aria-labelledby="case-challenge-title">
                <h2 id="case-challenge-title">Wyzwanie</h2>
                <p>{project.problem}</p>
              </section>
              <section aria-labelledby="case-solution-title">
                <h2 id="case-solution-title">Rozwiązanie</h2>
                <p>{project.solution}</p>
                <div className="case-scope">
                  <h3>Zakres projektu</h3>
                  <ul>
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>

          <section className="case-result" aria-labelledby="case-result-title">
            <h2 id="case-result-title">Efekt</h2>
            <p>{project.result}</p>
          </section>

          {project.gallery.length > 0 && (
            <section
              className="case-gallery"
              aria-labelledby="case-gallery-title"
            >
              <div className="case-gallery-heading">
                <h2 id="case-gallery-title">Galeria projektu</h2>
                <p>Wybierz widok, żeby zobaczyć go w pełnym rozmiarze.</p>
              </div>
              <ProjectGalleryLightbox
                images={project.gallery}
                title={project.title}
              />
            </section>
          )}

          <section
            className="case-contact"
            aria-labelledby="case-contact-title"
          >
            <div>
              <h2 id="case-contact-title">Chcesz podobny projekt?</h2>
              <p>
                Opowiedz mi o swojej firmie. Przygotuję bezpłatną wycenę i
                propozycję rozwiązania.
              </p>
            </div>
            <ContactIntentLink
              href="/#kontakt"
              className="case-contact-link"
              intent={{ kind: "project", label: title, value: project.slug }}
            >
              Wyceń projekt <ArrowUpRight size={18} aria-hidden="true" />
            </ContactIntentLink>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
