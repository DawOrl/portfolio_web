"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, ZoomIn } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const projects = cvData.projects;
type Project = (typeof projects)[number];

// Kategorie wyliczane dynamicznie z danych
const categories = ["Wszystkie", ...Array.from(new Set(projects.map((p) => p.category)))];

export function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("Wszystkie");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Blokowanie scrolla strony pod modalem / lightboxem
  useEffect(() => {
    if (selectedProject || selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject, selectedImage]);

  const filteredProjects = projects.filter(
    (project) => activeTab === "Wszystkie" || project.category === activeTab
  );

  return (
    <Section id="realizacje">
      <SectionHeading
        eyebrow="02 — Realizacje"
        title="Wybrane projekty"
        subtitle="Kilka realizacji pokazujących podejście do designu, kodu i konkretnego efektu dla klienta."
      />

      {/* Filtry — tylko gdy jest realnie z czego wybierać */}
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Siatka projektów */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, type: "spring", bounce: 0.2 }}
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
            >
              <div className="relative h-48 w-full overflow-hidden border-b border-border">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 block font-mono text-xs text-primary">
                  {project.tech}
                </span>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>
                <Button
                  variant="outline"
                  className="mt-auto w-full"
                  onClick={() => setSelectedProject(project)}
                >
                  Szczegóły projektu
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Karta-CTA — utrzymuje siatkę pełną i zachęca do kontaktu */}
        <motion.a
          layout
          href="#kontakt"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, type: "spring", bounce: 0.2 }}
          className="group flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center transition-colors duration-300 hover:border-primary/50 hover:bg-card/50"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight size={22} />
          </span>
          <span className="font-display text-lg font-semibold text-foreground">
            Twój projekt może być tutaj
          </span>
          <span className="max-w-xs text-sm text-muted-foreground">
            Porozmawiajmy o Twojej stronie — bezpłatna wycena.
          </span>
        </motion.a>
      </motion.div>

      {/* Modal ze szczegółami */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-popover shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Zamknij"
              >
                <X size={18} />
              </button>

              <div className="max-h-[90vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div
                  className="group relative flex h-64 w-full cursor-zoom-in items-center justify-center overflow-hidden border-b border-border bg-background md:h-96"
                  onClick={() => setSelectedImage(selectedProject.mainImage)}
                >
                  <img
                    src={selectedProject.mainImage}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/30">
                    <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-5 py-2 font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <ZoomIn size={16} /> Powiększ
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-8 p-6 md:p-10">
                  <div>
                    <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                      {selectedProject.tech}
                    </span>
                    <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
                      {selectedProject.title}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {selectedProject.desc}
                    </p>
                    {selectedProject.result && (
                      <p className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/90">
                        <span className="font-semibold text-primary">Efekt: </span>
                        {selectedProject.result}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-4 font-display text-xl font-semibold text-foreground">
                      Galeria
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {selectedProject.gallery.map((img, i) => (
                        <div
                          key={i}
                          className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-xl border border-border bg-background"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img
                            src={img}
                            alt={`${selectedProject.title} — ujęcie ${i + 1}`}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/30">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                              <ZoomIn size={13} /> Powiększ
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 border-t border-border pt-6">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none"
                    >
                      <Button size="lg" variant="outline" className="w-full">
                        <Github size={18} /> Kod na GitHub
                      </Button>
                    </a>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none"
                    >
                      <Button size="lg" className="group w-full">
                        Odwiedź stronę
                        <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox pełnoekranowy */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex cursor-zoom-out items-center justify-center bg-background/95 p-4 backdrop-blur-xl md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:bg-muted md:right-8 md:top-8"
              aria-label="Zamknij podgląd"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              src={selectedImage}
              alt="Powiększenie"
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
