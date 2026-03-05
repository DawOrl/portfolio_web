"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Pełna, poprawna tablica z projektami
const projects = [
  { id: 1, title: "Project 1", desc: "Description", tech: "React", category: "Web" },
  { id: 2, title: "Project 2", desc: "Description", tech: "TypeScript", category: "App" },
  { id: 3, title: "Project 3", desc: "Description", tech: "Next.js", category: "Web" },
  { id: 4, title: "Project 4", desc: "Description", tech: "Flutter", category: "App" },
];

// Kategorie do filtrowania
const categories = ["Wszystkie", "Web", "App"];

export function ProjectGallery() {
  const [activeTab, setActiveTab] = useState("Wszystkie");

const filteredProjects = projects.filter(
  (project) => activeTab === "Wszystkie" || project.category === activeTab
);

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-24">
      
      {/* Menu Filtrowania */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
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

      {/* Animowana Siatka Projektów */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      >
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
              <Card className="h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group overflow-hidden flex flex-col">
                
                {/* Miejsce na miniaturkę projektu */}
                <div className="h-48 w-full bg-black/60 border-b border-border/50 relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 bg-linear-to-t from-[#090E17] to-transparent z-10 opacity-60"></div>
                   {/* W przyszłości podmień to na <img src="/twoj-projekt.jpg" /> */}
                   <span className="text-muted-foreground/40 font-mono text-sm group-hover:scale-110 transition-transform duration-500">
                     [ Miniatura Projektu ]
                   </span>
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-mono text-primary mb-2 block">{project.tech}</span>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{project.desc}</p>
                  
                  <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 mt-auto group-hover:border-primary/50 transition-colors">
                    Szczegóły Projektu
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}