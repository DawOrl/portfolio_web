import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProjectShowcase } from "./ProjectShowcase";
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

      <div className="flex flex-col gap-16 md:gap-24">
        {projects.map((project, i) => (
          <ProjectShowcase key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="mt-14 flex justify-center md:mt-20">
        <Button asChild size="lg" variant="outline" className="group font-medium">
          <Link href="/realizacje">
            Zobacz wszystkie realizacje
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
