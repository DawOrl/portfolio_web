import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { ProjectsLibrary } from "@/components/blocks/ProjectsLibrary";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { getProjects, getProjectCategories } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Realizacje — portfolio stron internetowych",
  description:
    "Biblioteka zrealizowanych projektów: strony firmowe, landing page i aplikacje webowe. Zobacz case studies — problem, rozwiązanie i efekt.",
  alternates: { canonical: "/realizacje" },
};

export default function RealizacjePage() {
  const projects = getProjects();
  const categories = getProjectCategories();

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="portfolio-inner mx-auto w-full max-w-6xl px-6 pb-24 pt-32 md:px-10 md:pt-40"
      >
        <Link
          href="/#realizacje"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> Strona główna
        </Link>

        <header className="mb-12 max-w-3xl md:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-primary">
            <span className="h-px w-8 bg-primary/50" />
            Realizacje
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Biblioteka projektów
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Realizacje dla klientów i autorskie projekty stron oraz aplikacji.
            Zobacz założenia, decyzje projektowe i możliwości poszczególnych
            rozwiązań.
          </p>
        </header>

        <ProjectsLibrary projects={projects} categories={categories} />
      </main>

      <SiteFooter />
    </>
  );
}
