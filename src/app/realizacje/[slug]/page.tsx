import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ProjectGalleryLightbox } from "@/components/blocks/ProjectGalleryLightbox";
import { ContactIntentLink } from "@/components/ui/contact-intent-link";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { getProjects, getProjectBySlug, projectName } from "@/lib/projects";
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

  const title = projectName(project);
  const mobile = project.gallery.find((src) => src.endsWith("/mobile.png"));
  const hasGallery = project.gallery.length > 0;
  const publishedProjects = getProjects();
  const currentIndex = publishedProjects.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject =
    publishedProjects.length > 0 &&
    (publishedProjects.length > 1 || currentIndex === -1)
      ? publishedProjects[(currentIndex + 1) % publishedProjects.length]
      : undefined;

  return (
    <>
      <Navbar />

      <main id="main-content" className="case-study">
        <nav className="case-navigation shell" aria-label="Nawigacja projektów">
          <Link href="/#realizacje">
            <ArrowLeft size={16} aria-hidden="true" /> Wybrane projekty
          </Link>
          <Link href="/realizacje">Wszystkie realizacje</Link>
        </nav>

        <article aria-labelledby="case-title">
          <header className="case-header shell">
            <div className="case-meta">
              <span className="case-index">
                Case study
                {currentIndex >= 0 && (
                  <span>
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(publishedProjects.length).padStart(2, "0")}
                  </span>
                )}
              </span>
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

          <SectionTransition from="ink" to="paper" shape="swell" />
          <section
            className="case-device-scene"
            aria-label={`Podgląd projektu ${title}`}
          >
            <div className="shell">
              <div className="case-scene-topline">
                <span>Projekt na ekranie</span>
                {hasGallery && (
                  <a href="#case-gallery">
                    Zobacz detale <ArrowDown size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
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
                            ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 70vw, 1020px"
                            : "(max-width: 1100px) calc(100vw - 40px), 1280px"
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
                          sizes="(max-width: 760px) 240px, 220px"
                        />
                      </div>
                    </div>
                    <figcaption>Wersja mobilna</figcaption>
                  </figure>
                )}
              </div>
            </div>
          </section>

          <div className="case-narrative-area">
            <div className="case-narrative shell">
              <aside className="case-facts" aria-label="Informacje o projekcie">
                <p className="case-facts-label">O&nbsp;projekcie</p>
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
                <section
                  className="case-story-step"
                  aria-labelledby="case-challenge-title"
                >
                  <span className="case-story-index" aria-hidden="true">
                    01
                  </span>
                  <div>
                    <h2 id="case-challenge-title">Wyzwanie</h2>
                    <p>{project.problem}</p>
                  </div>
                </section>
                <section
                  className="case-story-step"
                  aria-labelledby="case-solution-title"
                >
                  <span className="case-story-index" aria-hidden="true">
                    02
                  </span>
                  <div>
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
                  </div>
                </section>
                <section
                  className="case-story-step case-result"
                  aria-labelledby="case-result-title"
                >
                  <span className="case-story-index" aria-hidden="true">
                    03
                  </span>
                  <div>
                    <h2 id="case-result-title">Efekt</h2>
                    <p>{project.result}</p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {hasGallery ? (
            <>
              <SectionTransition from="paper" to="ink" shape="fold" />
              <section
                id="case-gallery"
                className="case-gallery shell"
                aria-labelledby="case-gallery-title"
                data-mobile-second={
                  Boolean(mobile && project.gallery[1] === mobile) || undefined
                }
                data-gallery-count={project.gallery.length}
              >
                <div className="case-gallery-heading">
                  <h2 id="case-gallery-title">Galeria projektu</h2>
                  <p>
                    Wybierz widok, żeby zobaczyć go w&nbsp;pełnym rozmiarze.
                  </p>
                </div>
                <ProjectGalleryLightbox
                  key={project.slug}
                  images={project.gallery}
                  title={project.title}
                />
              </section>
              <SectionTransition
                from="ink"
                to="burgundy"
                shape="scoop"
                size="shallow"
              />
            </>
          ) : (
            <SectionTransition from="paper" to="burgundy" shape="fold" />
          )}

          <section
            className="case-contact"
            aria-labelledby="case-contact-title"
          >
            <div className="case-contact-inner shell">
              <div>
                <h2 id="case-contact-title">Chcesz podobny projekt?</h2>
                <p>
                  Opowiedz mi o&nbsp;swojej firmie. Przygotuję bezpłatną wycenę
                  i&nbsp;propozycję rozwiązania.
                </p>
              </div>
              <ContactIntentLink
                href="/#kontakt"
                className="case-contact-link"
                intent={{ kind: "project", label: title, value: project.slug }}
              >
                Wyceń projekt <ArrowUpRight size={18} aria-hidden="true" />
              </ContactIntentLink>
            </div>
          </section>

          <SectionTransition
            from="burgundy"
            to="ink"
            shape="ripple"
            size="shallow"
          />
          {nextProject && (
            <section
              className="case-next shell"
              aria-labelledby="case-next-title"
            >
              <div className="case-next-navigation">
                <span>Następna realizacja</span>
                <Link href="/realizacje">Wszystkie projekty</Link>
              </div>
              <Link
                className="case-next-project"
                href={`/realizacje/${nextProject.slug}`}
              >
                <div className="case-next-media">
                  <Image
                    src={nextProject.cover}
                    alt=""
                    fill
                    sizes="(max-width: 760px) calc(100vw - 40px), 420px"
                  />
                </div>
                <div className="case-next-copy">
                  <span>{nextProject.category}</span>
                  <h2 id="case-next-title">{projectName(nextProject)}</h2>
                  <p>{nextProject.tagline}</p>
                </div>
                <ArrowUpRight size={32} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </section>
          )}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
