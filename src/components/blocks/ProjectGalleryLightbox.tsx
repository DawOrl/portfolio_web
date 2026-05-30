"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

/** Galeria zdjęć projektu z pełnoekranowym lightboxem (case study). */
export function ProjectGalleryLightbox({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <motion.button
            key={img}
            type="button"
            onClick={() => setSelected(img)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-background"
          >
            <img
              src={img}
              alt={`${title} — ujęcie ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/30">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn size={13} /> Powiększ
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-60 flex cursor-zoom-out items-center justify-center bg-background/95 p-4 backdrop-blur-xl md:p-8"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Zamknij podgląd"
              className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:bg-muted md:right-8 md:top-8"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              src={selected}
              alt="Powiększenie"
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
