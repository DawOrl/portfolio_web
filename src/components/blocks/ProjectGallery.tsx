"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Strona Mechanika Samochodowego",
    category: "Web",
    tech: "React, Next.js, Tailwind CSS",
    desc: "Strona zbudowana przy pomocy React, Next.js oraz Tailwind CSS, z dynamicznym ładowaniem treści i animacjami. Zoptymalizowana pod kątem SEO i szybkości ładowania.",
    mainImage: "/mechanic-main.png",
    gallery: ["/mechanic-photo1.png", "/mechanic-photo2.png", "/mechanic-photo3.png", "/mechanic-photo4.png", "/mechanic-photo5.png"],
    githubUrl: "https://github.com/DawOrl/mechanic-website",
    liveUrl: "https://mechanic-website-rose.vercel.app/"
  },
  {
    id: 2,
    title: "System Automatyzacji E-mail",
    category: "Marketing",
    tech: "HTML/CSS, JS, Iterable",
    desc: "Zestaw responsywnych szablonów e-mail zoptymalizowanych pod kątem Dark Mode dla klientów pocztowych. Podpięty pod zaawansowane testy A/B.",
    mainImage: "/twoj-screen-glowny-2.jpg",
    gallery: ["/detal-4.jpg", "/detal-5.jpg"],
    githubUrl: "https://github.com/twoj-profil",
    liveUrl: "https://twoj-projekt.vercel.app"
  },
  {
    id: 3,
    title: "Infrastruktura K8s",
    category: "DevOps",
    tech: "Kubernetes, Docker, Linux",
    desc: "Sklastrowane środowisko do wdrażania aplikacji mikroserwisowych, z automatycznym load-balancingiem i monitoringiem logów.",
    mainImage: "/twoj-screen-glowny-3.jpg",
    gallery: ["/detal-6.jpg", "/detal-7.jpg"],
    githubUrl: "https://github.com/twoj-profil",
    liveUrl: "https://twoj-projekt.vercel.app"
  }
];

const categories = ["Wszystkie", "Web", "Marketing", "DevOps"];

export function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("Wszystkie");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  // NOWOŚĆ: Stan przechowujący aktualnie powiększone zdjęcie
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Blokowanie scrollowania strony pod spodem dla obu okien
  useEffect(() => {
    if (selectedProject || selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject, selectedImage]);

  const filteredProjects = projects.filter(
    (project) => activeTab === "Wszystkie" || project.category === activeTab
  );

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-24">
      
      {/* Menu Filtrowania */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 z-10 relative">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === category
              ? "bg-primary text-black shadow-[0_0_15px_rgba(20,184,166,0.4)]"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Siatka Projektów */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full z-10 relative">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring" }}
              key={project.id}
            >
              <Card className="h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="h-48 w-full bg-black/60 border-b border-border/50 relative flex items-center justify-center overflow-hidden">
                   <img 
                      src={project.mainImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                   />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-mono text-primary mb-2 block">{project.tech}</span>
                  <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">{project.desc}</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/20 hover:bg-primary/10 mt-auto"
                    onClick={() => setSelectedProject(project)}
                  >
                    Szczegóły Projektu
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Wyskakujące Okno Modala z detalami projektu */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)} 
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-[#090E17] border border-[#1F2937] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-primary hover:text-black transition-colors z-50 shadow-lg"
              >
                ✕
              </button>

              <div className="w-full h-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none][scrollbar-width:none]">
                
                {/* ZMIANA: Klikalne zdjęcie główne */}
                <div 
                  className="w-full h-64 md:h-96 bg-[#05080f] relative flex items-center justify-center border-b border-[#1F2937] overflow-hidden cursor-zoom-in group"
                  onClick={() => setSelectedImage(selectedProject.mainImage)}
                >
                   <img 
                      src={selectedProject.mainImage} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                     <span className="opacity-0 group-hover:opacity-100 text-white bg-black/60 px-5 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300 font-medium">
                       Powiększ zdjęcie
                     </span>
                   </div>
                </div>

                <div className="p-6 md:p-10 flex flex-col gap-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-mono mb-4">
                      {selectedProject.tech}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{selectedProject.title}</h2>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      {selectedProject.desc}
                    </p>
                  </div>

                  {/* ZMIANA: Klikalne zdjęcia z galerii */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">Galeria ujęć</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#111827][&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/60 transition-colors">
                      {selectedProject.gallery.map((img, i) => (
                        <div 
                          key={i} 
                          className="min-w-[240px] md:min-w-[300px] h-40 bg-[#111827] border border-[#1F2937] rounded-xl flex items-center justify-center flex-shrink-0 snap-center overflow-hidden cursor-zoom-in group relative"
                          onClick={() => setSelectedImage(img)}
                        >
                           <img 
                             src={img} 
                             alt={`Galeria ${i + 1}`} 
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                           />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-[#1F2937]">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none">
                      <Button size="lg" variant="outline" className="w-full text-foreground border-border hover:border-primary/50 hover:text-primary">
                        Kod na GitHub
                      </Button>
                    </a>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none">
                      <Button size="lg" className="w-full bg-primary text-black hover:bg-primary/80 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                        Odwiedź Stronę
                      </Button>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOWOŚĆ: Fullscreen Lightbox dla zdjęć (wyświetla się najwyżej) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-50"
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Powiększenie"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Zapobiega zamykaniu po kliknięciu prosto w zdjęcie
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}