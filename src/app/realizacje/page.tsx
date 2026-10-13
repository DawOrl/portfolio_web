import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { ProjectsLibrary } from "@/components/blocks/ProjectsLibrary";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { getProjects, getProjectCategories } from "@/lib/projects";
import "./library.css";

export const metadata: Metadata = {
  title: "Realizacje - portfolio stron internetowych",
  description:
    "Biblioteka zrealizowanych projektów: strony firmowe, landing page i aplikacje webowe. Zobacz case studies - problem, rozwiązanie i efekt.",
  alternates: { canonical: "/realizacje" },
};

export default function RealizacjePage() {
  const projects = getProjects();
  const categories = getProjectCategories();
  const years = [...new Set(projects.map((project) => project.year))].sort();
  const span =
    years.length > 1 ? `${years[0]}-${years[years.length - 1]}` : years[0];

  return (
    <>
      <Navbar />

      <main id="main-content" className="library-page">
        <div className="shell">
          <Link href="/#realizacje" className="library-back">
            <ArrowLeft size={16} aria-hidden="true" /> Strona główna
          </Link>

          <header className="library-header">
            <div className="library-header-main">
              <p className="library-eyebrow">
                <span>Portfolio</span>
                <span aria-hidden="true">/</span>
                <span>{span}</span>
              </p>
              <h1>
                Biblioteka
                <br />
                <span>projektów.</span>
              </h1>
              <div className="library-header-copy">
                <p className="library-project-total">
                  <strong>{String(projects.length).padStart(2, "0")}</strong>
                  <span>projektów w&nbsp;bibliotece</span>
                </p>
                <p>
                  Realizacje dla klientów i&nbsp;autorskie projekty stron oraz
                  aplikacji. Zobacz założenia, decyzje projektowe
                  i&nbsp;możliwości poszczególnych rozwiązań.
                </p>
              </div>
            </div>

            <div className="library-hero-art" aria-hidden="true">
              <picture>
                <source
                  media="(max-width: 760px)"
                  srcSet="/art/library-fan-mobile.webp"
                  width={760}
                  height={652}
                />
                <Image
                  src="/art/library-fan.webp"
                  alt=""
                  width={1400}
                  height={1200}
                  loading="eager"
                  fetchPriority="high"
                  unoptimized
                />
              </picture>
            </div>
          </header>

          <ProjectsLibrary projects={projects} categories={categories} />
        </div>

        <SectionTransition from="ink" to="burgundy" shape="fold" />
        <section
          className="library-closing"
          aria-labelledby="library-closing-title"
        >
          <div className="library-closing-inner shell">
            <div className="library-closing-copy">
              <p className="library-closing-eyebrow">
                Wolne miejsce w&nbsp;bibliotece
              </p>
              <h2 id="library-closing-title">
                Twój projekt może być następny.
              </h2>
              <p>
                Opowiedz mi o&nbsp;swojej firmie. Przygotuję bezpłatną wycenę
                i&nbsp;propozycję rozwiązania.
              </p>
              <div className="library-closing-actions">
                <Link href="/#kontakt" className="library-closing-link">
                  Wyceń projekt <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/cennik" className="library-closing-secondary">
                  Zobacz cennik <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="library-closing-art" aria-hidden="true">
              <Image
                src="/art/library-vacancy.webp"
                alt=""
                width={1000}
                height={819}
                unoptimized
              />
            </div>
          </div>
        </section>
        <SectionTransition
          from="burgundy"
          to="ink"
          shape="ripple"
          size="shallow"
        />
      </main>

      <SiteFooter />
    </>
  );
}
