import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Maximize2,
} from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import {
  ProjectGalleryLightbox,
  ProjectGalleryTrigger,
} from "@/components/blocks/ProjectGalleryLightbox";
import { ContactIntentLink } from "@/components/ui/contact-intent-link";
import { SectionTransition } from "@/components/ui/SectionTransition";
import {
  FEATURE_SIZE,
  getProjects,
  getProjectBySlug,
  projectFeatures,
  projectName,
  type FeatureStep,
  type ProjectFeature,
} from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import "./case-study.css";

const STORY_STEPS: { id: FeatureStep; title: string }[] = [
  { id: "challenge", title: "Wyzwanie" },
  { id: "solution", title: "Rozwiązanie" },
  { id: "result", title: "Efekt" },
];

const pad = (value: number) => String(value).padStart(2, "0");

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

function FeatureShot({
  feature,
  index,
}: {
  feature: ProjectFeature;
  index: number;
}) {
  const size = FEATURE_SIZE[feature.device];
  return (
    <figure className="case-shot" data-device={feature.device}>
      <ProjectGalleryTrigger
        index={index}
        label={`Powiększ: ${feature.alt}`}
        className="case-shot-frame"
      >
        <Image
          src={feature.src}
          alt={feature.alt}
          width={size.width}
          height={size.height}
          sizes={
            feature.device === "mobile"
              ? "(max-width: 760px) 52vw, 260px"
              : "(max-width: 1000px) calc(100vw - 40px), 800px"
          }
        />
        <span className="case-shot-zoom" aria-hidden="true">
          <Maximize2 size={14} strokeWidth={1.75} />
          <span>Powiększ</span>
        </span>
      </ProjectGalleryTrigger>
      <figcaption>
        <span className="case-shot-number" aria-hidden="true">
          {pad(index + 1)}
        </span>
        <span>{feature.caption}</span>
      </figcaption>
    </figure>
  );
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
  const features = projectFeatures(project);
  const publishedProjects = getProjects();
  const currentIndex = publishedProjects.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject =
    publishedProjects.length > 0 &&
    (publishedProjects.length > 1 || currentIndex === -1)
      ? publishedProjects[(currentIndex + 1) % publishedProjects.length]
      : undefined;

  const storyText: Record<FeatureStep, string> = {
    challenge: project.problem,
    solution: project.solution,
    result: project.result,
  };
  // Etapy ze zrzutami na zmianę: tekst po lewej, potem zrzuty po lewej.
  let mediaSteps = 0;
  const steps = STORY_STEPS.map((step, stepIndex) => {
    const shots = features
      .map((feature, index) => ({ feature, index }))
      .filter(({ feature }) => feature.step === step.id);
    const layout =
      shots.length === 0
        ? "text"
        : mediaSteps++ % 2 === 0
          ? "text-first"
          : "media-first";
    return { ...step, number: pad(stepIndex + 1), shots, layout };
  });

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
                    {pad(currentIndex + 1)} / {pad(publishedProjects.length)}
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
                <span className="case-dot">.</span>
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
                <a href="#case-story">
                  Zobacz, jak działa <ArrowDown size={15} aria-hidden="true" />
                </a>
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
                        preload
                        quality={95}
                        sizes={
                          mobile
                            ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 70vw, 1020px"
                            : "(max-width: 1100px) calc(100vw - 40px), 1280px"
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

          <section
            id="case-story"
            className="case-story-area"
            aria-labelledby="case-story-title"
          >
            <div className="shell">
              <div className="case-chapter-head">
                <h2 id="case-story-title">
                  Od wyzwania do&nbsp;efektu
                  <span className="case-dot">.</span>
                </h2>
                {features.length > 0 && (
                  <p>
                    Każdy etap pokazuję na&nbsp;zrzutach z&nbsp;działającej
                    wersji. Kliknij ujęcie, żeby je powiększyć.
                  </p>
                )}
              </div>

              <dl className="case-facts" aria-label="Informacje o projekcie">
                {project.client && (
                  <div>
                    <dt>Klient</dt>
                    <dd>{project.client}</dd>
                  </div>
                )}
                <div>
                  <dt>Technologie</dt>
                  <dd>
                    <ul className="case-tags">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Zakres projektu</dt>
                  <dd>
                    <ul className="case-tags">
                      {project.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <ProjectGalleryLightbox
                key={project.slug}
                items={features}
                title={title}
              >
                <div className="case-steps">
                  {steps.map((step) => (
                    <section
                      key={step.id}
                      className="case-step"
                      data-step={step.id}
                      data-layout={step.layout}
                      aria-labelledby={`case-${step.id}-title`}
                    >
                      <div className="case-step-copy">
                        <div className="case-step-heading">
                          <span className="case-step-index" aria-hidden="true">
                            {step.number}
                          </span>
                          <h3 id={`case-${step.id}-title`}>{step.title}</h3>
                        </div>
                        <p>{storyText[step.id]}</p>
                      </div>
                      {step.shots.length > 0 && (
                        <div className="case-step-media">
                          {step.shots.map(({ feature, index }) => (
                            <FeatureShot
                              key={feature.src}
                              feature={feature}
                              index={index}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              </ProjectGalleryLightbox>
            </div>
          </section>

          <SectionTransition from="paper" to="burgundy" shape="fold" />
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
            <section className="case-next" aria-labelledby="case-next-title">
              <div className="shell">
                <div className="case-next-navigation">
                  <span>Następna realizacja</span>
                  <Link href="/realizacje">Wszystkie projekty</Link>
                </div>
                <Link
                  className="case-next-project"
                  href={`/realizacje/${nextProject.slug}`}
                >
                  <div className="case-next-copy">
                    <span className="case-next-category">
                      {nextProject.category}
                    </span>
                    <h2 id="case-next-title">
                      {projectName(nextProject)}
                      <ArrowRight
                        className="case-next-arrow"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </h2>
                    <p>{nextProject.tagline}</p>
                  </div>
                  <div className="case-next-media">
                    <Image
                      src={nextProject.cover}
                      alt=""
                      fill
                      sizes="(max-width: 1000px) calc(100vw - 40px), 760px"
                    />
                  </div>
                </Link>
              </div>
            </section>
          )}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
