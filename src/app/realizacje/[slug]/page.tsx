import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Target,
  Lightbulb,
  TrendingUp,
  Check,
} from "lucide-react";
import { Aurora } from "@/components/blocks/Aurora";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ProjectGalleryLightbox } from "@/components/blocks/ProjectGalleryLightbox";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

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
    title: `${project.title} — case study`,
    description: project.tagline,
    alternates: { canonical: `/realizacje/${project.slug}` },
    openGraph: {
      title: `${project.title} — case study`,
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

  const blocks = [
    { icon: Target, label: "Wyzwanie", text: project.problem, key: "problem" },
    { icon: Lightbulb, label: "Rozwiązanie", text: project.solution, key: "solution" },
    { icon: TrendingUp, label: "Efekt", text: project.result, key: "result" },
  ];

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-background">
        <Aurora />
      </div>

      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <Link
          href="/realizacje"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> Wszystkie realizacje
        </Link>

        {/* Nagłówek */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary">
              {project.category}
            </span>
            {project.year && <span>{project.year}</span>}
            {project.client && (
              <>
                <span>·</span>
                <span>{project.client}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="group font-semibold">
                  Zobacz na żywo
                  <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="font-medium">
                  <Github size={18} /> Kod na GitHub
                </Button>
              </a>
            )}
          </div>
        </Reveal>

        {/* Okładka */}
        <Reveal delay={0.1} className="mt-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover}
            alt={project.title}
            className="w-full rounded-3xl border border-border object-cover object-top shadow-2xl"
          />
        </Reveal>

        {/* Wyzwanie / Rozwiązanie / Efekt */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <b.icon size={20} strokeWidth={1.75} />
                </div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {b.label}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stack + zakres */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
              Technologie
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-background/50 px-3 py-1.5 font-mono text-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
              Zakres prac
            </h2>
            <ul className="flex flex-col gap-2.5">
              {project.scope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-foreground/90"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Galeria */}
        {project.gallery.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                Galeria
              </h2>
            </Reveal>
            <ProjectGalleryLightbox images={project.gallery} title={project.title} />
          </div>
        )}

        {/* CTA */}
        <Reveal delay={0.1} className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/60 p-8 text-center backdrop-blur-sm md:p-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Chcesz podobny projekt?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground md:text-lg">
              Opowiedz mi o swojej firmie — przygotuję bezpłatną wycenę i propozycję
              rozwiązania.
            </p>
            <Link href="/#kontakt" className="mt-6 inline-block">
              <Button size="lg" className="group font-semibold">
                Wyceń projekt
                <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </>
  );
}
