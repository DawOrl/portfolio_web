"use client";
import { motion } from "framer-motion";
import { 
  Atom, 
  CodeXml, 
  Palette, 
  Globe, 
  FileCode, 
  Paintbrush, 
  Activity, 
  Server, 
  Terminal, 
  Database, 
  Smartphone, 
  Target, 
  Coffee, 
  Cpu, 
  Code, 
  Table, 
  GitBranch, 
  Box, 
  Cloud, 
  Boxes, 
  Mail, 
  Layout, 
  Ghost, 
  HardDrive, 
  Grid 
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: Atom },
      { name: "TypeScript", icon: CodeXml },
      { name: "Tailwind CSS", icon: Palette },
      { name: "Next.js", icon: Globe },
      { name: "HTML5", icon: FileCode },
      { name: "CSS3", icon: Paintbrush },
      { name: "Framer Motion", icon: Activity },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Python", icon: Terminal },
      { name: "MongoDB", icon: Database },
    ],
  },
  {
    title: "Aplikacje Mobilne",
    skills: [
      { name: "Flutter", icon: Smartphone },
      { name: "React Native", icon: Smartphone },
      { name: "Dart", icon: Target },
    ],
  },
  {
    title: "Języki Obiektowe & Skryptowe",
    skills: [
      { name: "Java", icon: Coffee },
      { name: "Python", icon: Terminal },
      { name: "C++", icon: Cpu },
      { name: "JavaScript", icon: Code },
      { name: "SQL", icon: Table },
    ],
  },
  {
    title: "Narzędzia & Inne",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "Docker", icon: Box },
      { name: "AWS", icon: Cloud },
      { name: "Linux", icon: Terminal },
      { name: "Kubernetes", icon: Boxes },
    ],
  },
  {
    title: "Organizacja & Biuro",
    skills: [
      { name: "Iterable", icon: Mail },
      { name: "Beehiiv", icon: Layout },
      { name: "Ghost", icon: Ghost },
      { name: "Amazon S3", icon: HardDrive },
      { name: "Google Workspace", icon: Grid },
    ]
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
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-mono text-muted-foreground bg-background/50 border border-border/50 rounded-lg hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors duration-300 cursor-default"
                >
                  <skill.icon size={14} className="opacity-70 group-hover:opacity-100" />
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}