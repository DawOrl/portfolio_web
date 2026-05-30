import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

export function ProjectsTeaser() {
  const projects = getFeaturedProjects(3);

  return (
    <Section id="realizacje">
      <SectionHeading
        eyebrow="02 — Realizacje"
        title="Wybrane realizacje"
        subtitle="Kilka projektów pokazujących podejście do designu, kodu i konkretnego efektu dla klienta. Każdy to osobne case study."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/realizacje">
          <Button size="lg" variant="outline" className="group font-medium">
            Zobacz wszystkie realizacje
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}
