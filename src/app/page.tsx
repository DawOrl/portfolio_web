/* eslint-disable @next/next/no-img-element */
"use client";

import { cvData } from "@/data/cv-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { easeOut, motion } from "framer-motion";
import { DevOpsTerminal } from "@/components/blocks/DevOpsTerminal";
import { EmailDashboard } from "@/components/blocks/EmailDashboard";
import { InfiniteMarquee } from "@/components/blocks/InfiniteMarquee";
import { TechStack } from "@/components/blocks/TechStack";
import { MacbookProject } from "@/components/blocks/MacbookProject";
import { ProjectGallery } from "@/components/blocks/ProjectGallery";
import { SocialLinks } from "@/components/blocks/SocialLinks";
import Squares from "@/components/blocks/Squares";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
};

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#090E17]">
        <Squares 
            direction="diagonal"
            speed={0.4}
            squareSize={40}
            borderColor="#1F2937" 
            hoverFillColor="#14B8A6" 
        />
      </div>

      <main className="min-h-screen p-6 md:p-12 lg:p-24 max-w-6xl mx-auto flex flex-col gap-12 overflow-hidden">
        
        {/* Sekcja Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:mt-10"
        >
          {/* Lewa strona */}
          <div className="flex flex-col gap-5 max-w-2xl text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
              Cześć, jestem <br/>
              <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent pb-2 inline-block">
                {cvData.personal.name}
              </span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {cvData.personal.about}
            </p>
            <div className="pt-6">
              <a href="/Dawid_Orlowski_CV.pdf" download="Dawid_Orlowski_CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button size="lg" className="relative group font-semibold tracking-wide text-md px-8 py-6 shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] hover:-translate-y-1 transition-all duration-300">
                  Pobierz pełne CV
                  <div className="absolute inset-0 h-full w-full rounded-md bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </a>
            </div>
          </div>

          {/* Prawa strona */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative shrink-0 group"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-500"></div>
            {/* Ramka na zdjęcie */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border/50 shadow-2xl">
              <img
                src="/profile.jpg"
                alt="Dawid Orłowski"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </motion.header>

        {/* Siatka Bento Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
        >
          
          {/* Moduł 1: Doświadczenie */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="h-full bg-card/80 backdrop-blur-sm border-border flex flex-col hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl text-primary tracking-wide">01. Doświadczenie</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{cvData.experience.role}</h3>
                  <p className="text-muted-foreground font-mono mt-1">{cvData.experience.company} / {cvData.experience.period}</p>
                  <p className="text-foreground/80 mt-4 leading-relaxed">{cvData.experience.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <EmailDashboard />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kolumna boczna */}
          <div className="flex flex-col gap-6">
            {/* Moduł 2: DevOps */}
            <motion.div variants={cardVariants} className="flex-1">
              <Card className="h-full bg-card/80 backdrop-blur-sm border-border flex flex-col hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-lg tracking-wide">02. DevOps & Infrastruktura</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full gap-4">
                  <div className="flex-1">
                     <DevOpsTerminal />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Moduł 3: Edukacja */}
            <motion.div variants={cardVariants} className="flex-1">
              <Card className="h-full bg-card/80 backdrop-blur-sm border-border flex flex-col hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-lg tracking-wide">03. Edukacja</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-lg leading-tight">{cvData.education.school}</p>
                  <p className="text-sm text-primary mt-2 font-medium">{cvData.education.degree}</p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">{cvData.education.period}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Pas Kompetencji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <InfiniteMarquee />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TechStack />
        </motion.div>

        {/* Sekcja Projektów 3D */}
        <MacbookProject />

        {/* Galeria Pozostałych Projektów z Filtrami */}
        <ProjectGallery />

        {/* Sekcja Mediów Społecznościowych */}
        <SocialLinks />

        {/* Stopka */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 py-6 border-t border-border/30 text-center text-muted-foreground text-sm font-mono"
        >
          <p>© {new Date().getFullYear()} Dawid Orłowski. Wszelkie prawa zastrzeżone.</p>
          <p className="mt-1 opacity-60">Zbudowano z Next.js 15, Tailwind v4 & Framer Motion.</p>
        </motion.footer>

      </main>
    </>
  );
}