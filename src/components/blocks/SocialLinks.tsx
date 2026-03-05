"use client";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react";

const socials = [
  { 
    name: "LinkedIn", 
    icon: Linkedin, 
    url: "https://www.linkedin.com/in/dawid-orłowski-3264a1216/", 
    colorClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]" 
  },
  { 
    name: "GitHub", 
    icon: Github, 
    url: "https://github.com/DawOrl", 
    colorClass: "hover:text-white hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
  },
  { 
    name: "X (Twitter)", 
    icon: Twitter, 
    url: "https://x.com/DawOrl02", 
    colorClass: "hover:text-neutral-300 hover:border-neutral-300/50 hover:shadow-[0_0_20px_rgba(163,163,163,0.3)]" 
  },
  { 
    name: "Instagram", 
    icon: Instagram, 
    url: "https://www.instagram.com/dorlowski10/", 
    colorClass: "hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:shadow-[0_0_20px_rgba(225,48,108,0.3)]" 
  },
  { 
    name: "Facebook", 
    icon: Facebook, 
    url: "https://www.facebook.com/profile.php?id=100009765611800", 
    colorClass: "hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:shadow-[0_0_20px_rgba(24,119,242,0.3)]" 
  },
];

export function SocialLinks() {
  return (
    <div className="w-full flex flex-col items-center py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
        Znajdź mnie w sieci
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 md:p-5 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 text-muted-foreground transition-colors duration-300 ${social.colorClass}`}
              aria-label={social.name}
            >
              <Icon size={28} strokeWidth={1.5} />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}