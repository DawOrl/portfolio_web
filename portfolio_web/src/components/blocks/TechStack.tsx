"use client";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS/SCSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 70 },
  { name: "Node.js", level: 70 },
  { name: "Tailwind CSS", level: 70 },
  { name: "Python", level: 60 },
  { name: "Java", level: 60 },
  { name: "C++", level: 50 },
];

export function TechStack() {
  return (
    <div className="w-full bg-card/40 border border-border rounded-xl p-6 md:p-10 backdrop-blur-sm hover:border-primary/30 transition-colors duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-2 bg-primary rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Technologie i Języki</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <div className="flex justify-between text-sm font-medium px-1">
              <span className="text-foreground/90 tracking-wide">{skill.name}</span>
              <span className="text-primary/90 font-mono">{skill.level}%</span>
            </div>
            {/* Tło paska */}
            <div className="h-2.5 w-full bg-background/80 rounded-full overflow-hidden border border-border/50">
              {/* Animowany wypełniacz paska */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full relative"
              >
                {/* Delikatny błysk na końcu paska */}
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px] rounded-full"></div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}