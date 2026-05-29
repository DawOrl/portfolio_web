"use client";
/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion } from "framer-motion";

const skillCategories = [
  {
    title: "Tworzenie stron",
    skills: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    title: "Backend, integracje & automatyzacje",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Python", icon: "python" },
      { name: "REST API", icon: "api" },
      { name: "Git", icon: "git" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
  {
    title: "AI & workflow",
    skills: [
      { name: "Claude", icon: "claude" },
      { name: "Claude Code", icon: "claude-code" },
      { name: "Claude Design", icon: "claude-design" },
      { name: "Gemini", icon: "gemini" },
      { name: "Nano Banana 2", icon: "nano-banana" },
      { name: "Obsidian", icon: "obsidian" },
    ],
  },
];

export function TechStack() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-10">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-2 rounded-full bg-primary" />
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Stack technologiczny
        </h2>
      </div>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground md:text-base">
        Narzędzia, których używam na co dzień — od frontu strony, przez
        integracje, po systemy AI.
      </p>

      <div className="flex flex-col gap-10">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <span className="h-px w-6 bg-primary/50" />
              {category.title}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: reduce ? {} : { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  className="group flex h-26 w-24 flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-background/40 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/10 md:w-28"
                >
                  <img
                    src={`/icons/${skill.icon}.svg`}
                    alt={skill.name}
                    className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9"
                  />
                  <span className="text-xs font-medium leading-tight text-foreground/85 transition-colors group-hover:text-foreground md:text-sm">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
