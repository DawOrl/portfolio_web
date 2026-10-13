import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { ProjectsLibrary } from "@/components/blocks/ProjectsLibrary";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { getProjects, getProjectCategories } from "@/lib/projects";
import "./library.css";

export const metadata: Metadata = {
  title: "Realizacje - portfolio stron internetowych",
  description:
    "Biblioteka zrealizowanych projektów: strony firmowe, landing page i aplikacje webowe. Zobacz case studies - problem, rozwiązanie i efekt.",
  alternates: { canonical: "/realizacje" },
};

export default function RealizacjePage() {
  const projects = getProjects();
  const categories = getProjectCategories();

  return (
    <>
      <Navbar />

      <main id="main-content" className="library-page shell">
        <Link href="/#realizacje" className="library-back">
          <ArrowLeft size={16} aria-hidden="true" /> Strona główna
        </Link>

        <header className="library-header">
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
              aplikacji. Zobacz założenia, decyzje projektowe i&nbsp;możliwości
              poszczególnych rozwiązań.
            </p>
          </div>
        </header>

        <ProjectsLibrary projects={projects} categories={categories} />
      </main>

      <SiteFooter />
    </>
  );
}
