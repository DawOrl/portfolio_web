"use client";
import { motion } from "framer-motion";
import { cvData } from "@/data/cv-data";
import { 
  FileCode, 
  Globe, 
  Smartphone, 
  Palette, 
  Monitor, 
  Grid, 
  HardDrive, 
  Mail, 
  Layout, 
  Ghost 
} from "lucide-react";

const skillIcons: Record<string, any> = {
  "HTML/CSS": FileCode,
  "Next.js": Globe,
  "React Native": Smartphone,
  "Tailwind CSS": Palette,
  "Flutter": Smartphone,
  "MS Office": Monitor,
  "Google Workspace": Grid,
  "Amazon S3": HardDrive,
  "Iterable": Mail,
  "Beehiiv": Layout,
  "Ghost": Ghost,
};

export function InfiniteMarquee() {
  // Pobieramy i formatujemy pozostałe doświadczenie oraz listę umiejętności
  const items = [...cvData.skills];

  // Powielamy tablicę, aby animacja była płynna i domykała się w idealnej pętli
  const duplicatedItems = [...items,...items,...items];

  return (
    <div className="relative w-full overflow-hidden bg-card/30 border border-border rounded-xl py-6 flex items-center">
      {/* Efekt płynnego zanikania po bokach (Cienie) */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-linear-to-r from-[#090E17] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-linear-to-l from-[#090E17] to-transparent z-10"></div>

      {/* Silnik animacji przesuwający element w osi X */}
      <motion.div
        className="flex whitespace-nowrap gap-6 md:gap-10 w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ ease: "linear", duration: 35, repeat: Infinity }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = skillIcons[item];
          return (
            <span
              key={index}
              className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm font-mono px-5 py-2 rounded-full border border-primary/20 bg-primary/5 shrink-0"
            >
              {Icon && <Icon size={14} className="text-primary/60" />}
              {item}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}