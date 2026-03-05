"use client";
import { motion } from "framer-motion";

// Logiczny podział technologii bez sztucznych procentów
const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5", "CSS3", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "MongoDB"],
  },
  {
    title: "Aplikacje Mobilne",
    skills: ["Flutter", "React Native", "Dart"],
  },
  {
    title: "Języki Obiektowe & Skryptowe",
    skills: ["Java", "Python", "C++", "JavaScript", "SQL"],
  },
  {
    title: "Narzędzia & Inne",
    skills: ["Git", "Docker", "AWS", "Linux", "Kubernetes"],
  },
  {
    title: "Organizacja & Biuro",
    skills: ["Iterable", "Beehiiv", "Ghost", "Amazon S3", "Google Workspace"],
  }
];

export function TechStack() {
  return (
    <div className="w-full bg-card/40 border border-border rounded-xl p-6 md:p-10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-8 w-2 bg-primary rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Stack Technologiczny</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="flex flex-col p-6 rounded-2xl bg-black/20 border border-border/50 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.05)] transition-all duration-500"
          >
            <h3 className="text-lg font-semibold text-foreground/90 mb-6 tracking-wide border-b border-border/50 pb-4">
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIdx) => (
                <span
                  key={skillIdx}
                  className="px-4 py-2 text-sm font-mono text-muted-foreground bg-background/50 border border-border/50 rounded-lg hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}