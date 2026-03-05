"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function MacbookProject() {
  const ref = useRef<HTMLDivElement>(null);

  // Śledzenie przewijania strony dla tego konkretnego elementu
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Animacja 1: Otwieranie klapy laptopa (od -50 stopni do 0) w pierwszej fazie scrolla
  const rotateX = useTransform(scrollYProgress, [0, 0.4], ["-50deg", "0deg"]);
  
  // Animacja 2: Przewijanie wnętrza ekranu w drugiej fazie scrolla
  const translateY = useTransform(scrollYProgress, [0.4, 1], ["0%", "-50%"]);
  
  // Animacja 3: Płynne pojawianie się z cienia
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div className="w-full flex flex-col items-center py-24 border-t border-border/30 mt-10">
      
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Wybrane Projekty</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Zobacz moje realizacje w akcji. Przewijaj w dół, aby eksplorować ekran.</p>
      </div>

      {/* Kontener perspektywy dla efektu 3D */}
      <div ref={ref} className="relative flex flex-col items-center w-full" style={{ perspective: "2000px" }}>
        
        {/* Ekran Laptopa */}
        <motion.div
          style={{
            rotateX,
            opacity,
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="w-[90%] max-w-200 aspect-16/10 bg-[#09090b] rounded-t-2xl md:rounded-t-3xl border-[6px] md:border-12 border-[#27272a] relative overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Kamerka na środku ramki */}
          <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black border border-[#3f3f46] z-20"></div>

          {/* Wnętrze ekranu (Przewijany obszar) */}
          <motion.div style={{ y: translateY }} className="w-full h-[200%] relative bg-card">
            
            {/* W TYM MIEJSCU W PRZYSZŁOŚCI WSTAWISZ ZDJĘCIE PROJEKTU */}
            {/* <img src="/moj-projekt.jpg" alt="Projekt" className="w-full object-cover" /> */}
            
            {/* Tymczasowy zastępczy design projektu */}
            <div className="w-full h-full bg-linear-to-b from-blue-900/40 via-primary/10 to-background flex flex-col items-center pt-16 md:pt-24 px-6 md:px-12 text-center">
              <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 border border-primary/20">E-Commerce / SaaS</span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Nowoczesna Platforma Webowa</h3>
              <p className="text-white/70 max-w-md text-sm md:text-base">Aplikacja zrealizowana przy pomocy React, Next.js oraz Tailwind CSS, zintegrowana z systemami automatyzacji e-mail.</p>
              
              {/* Makiety udające interfejs aplikacji wewnątrz ekranu */}
              <div className="w-full h-32 md:h-48 bg-black/40 mt-8 rounded-xl border border-white/10 shadow-lg flex gap-4 p-4">
                <div className="w-1/3 h-full bg-white/5 rounded-md"></div>
                <div className="w-2/3 h-full flex flex-col gap-2">
                   <div className="w-full h-8 bg-white/5 rounded-md"></div>
                   <div className="w-full h-full bg-white/5 rounded-md"></div>
                </div>
              </div>
              <div className="w-full h-32 md:h-48 bg-black/40 mt-4 rounded-xl border border-white/10 shadow-lg"></div>
            </div>

          </motion.div>
        </motion.div>

        {/* Baza Laptopa (Dolna część z klawiaturą) */}
        <motion.div 
          style={{ opacity }}
          className="w-[95%] max-w-212.5 h-3 md:h-6 bg-[#3f3f46] rounded-b-2xl md:rounded-b-3xl relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-center"
        >
          {/* Wycięcie na palec do otwierania klapy */}
          <div className="w-20 md:w-32 h-1 md:h-2 bg-[#27272a] rounded-b-xl absolute top-0"></div>
        </motion.div>

        {/* Przyciski akcji pod laptopem */}
        <motion.div style={{ opacity }} className="mt-12 flex gap-4">
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-black">Kod na GitHub</Button>
          <Button className="bg-primary text-black hover:bg-primary/80">Odwiedź stronę</Button>
        </motion.div>

      </div>
    </div>
  );
}