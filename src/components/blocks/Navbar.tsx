"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/blocks/ScrollProgress";
import { BrandMark } from "@/components/ui/brand-mark";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Usługi", href: "/#uslugi" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Proces", href: "/#proces" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Cennik", href: "/#cennik" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <ScrollProgress />
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        {/* Logo */}
        <Link
          href="/#top"
          className="flex items-center gap-2.5 font-display text-xl font-bold lowercase tracking-tight text-foreground"
        >
          <BrandMark className="h-11 w-11 md:h-12 md:w-12" />
          <span>
            dorlowski<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Linki — desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA — desktop */}
        <div className="hidden md:block">
          <Button asChild className="font-medium">
            <Link href="/#kontakt">Wyceń projekt</Link>
          </Button>
        </div>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menu mobilne */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full font-medium">
                <Link href="/#kontakt" onClick={() => setOpen(false)}>
                  Wyceń projekt
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
