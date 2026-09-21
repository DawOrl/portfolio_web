"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandBlock } from "@/components/ui/brand-block";
const links = [
  { label: "Realizacje", href: "/realizacje" },
  { label: "Usługi", href: "/#uslugi" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Cennik", href: "/#cennik" },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <nav className="shell nav-inner" aria-label="Nawigacja główna">
        <Link
          href="/#top"
          className="brand"
          aria-label="Dawid Orłowski — strona główna"
        >
          <BrandBlock />
          <span>
            Dawid Orłowski<small>DESIGN & DEVELOPMENT</small>
          </span>
        </Link>
        <div className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link className="nav-contact" href="/#kontakt">
          Porozmawiajmy <ArrowUpRight size={17} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Nawigacja mobilna"
        >
          {[
            ...links,
            { label: "Proces", href: "/#proces" },
            { label: "Kontakt", href: "/#kontakt" },
          ].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
