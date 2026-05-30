import Link from "next/link";
import { cvData } from "@/data/cv-data";
import { FooterWordmark } from "@/components/blocks/FooterWordmark";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Usługi", href: "/#uslugi" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Proces", href: "/#proces" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Cennik", href: "/#cennik" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60">
      {/* Ogromny napis w tle z animacją shimmer */}
      <FooterWordmark />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-32 pt-14 md:px-10 md:pb-40">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start">
          {/* Kolumna 1 — marka */}
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/#top"
              aria-label="dorlowski.dev — strona główna"
              className="font-display text-2xl font-bold lowercase tracking-tight text-foreground"
            >
              dorlowski<span className="text-primary">.dev</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Strony internetowe dla firm i działalności · {cvData.personal.location},
              zdalnie w całej Polsce.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {cvData.personal.availability}
            </span>
            <Link
              href="/#top"
              aria-label="dorlowski.dev — strona główna"
              className="mt-2"
            >
              <BrandMark className="h-30 w-30 transition-transform duration-300 hover:scale-105" />
            </Link>
          </div>

          {/* Kolumna 2 — nawigacja */}
          <div className="md:justify-self-center">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Nawigacja</h3>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kolumna 3 — CTA */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Masz pomysł na projekt?
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Napisz — przygotuję bezpłatną wycenę i podpowiem najlepsze rozwiązanie.
            </p>
            <Link href="/#kontakt">
              <Button className="group font-semibold">
                Wyceń projekt
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a
              href={`mailto:${cvData.personal.email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {cvData.personal.email}
            </a>
          </div>
        </div>
      </div>

      {/* Dolny pasek */}
      <div className="relative z-10 border-t border-border/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 font-mono text-xs text-muted-foreground sm:flex-row md:px-10">
          <span>
            © {new Date().getFullYear()} {cvData.personal.name}. Wszelkie prawa
            zastrzeżone.
          </span>
          <Link
            href="/#top"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Na górę
            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
