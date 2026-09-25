"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BrandBlock } from "@/components/ui/brand-block";
import "./navbar.css";

const links = [
  { label: "Realizacje", href: "/realizacje" },
  { label: "Usługi", href: "/#uslugi" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Cennik", href: "/#cennik" },
];
const mobileLinks = [
  ...links,
  { label: "Proces", href: "/#proces" },
  { label: "Kontakt", href: "/#kontakt" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = ["uslugi", "o-mnie", "proces", "cennik", "kontakt"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      for (const element of sections) {
        if (element.getBoundingClientRect().top <= window.innerHeight * 0.3) {
          current = element.id;
        }
      }
      setSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const closeOutside = (e: PointerEvent) => {
      if (e.target instanceof Node && !header.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", close);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const currentFor = (href: string) => {
    if (href === "/realizacje" && pathname.startsWith("/realizacje")) {
      return "page" as const;
    }
    if (pathname === "/" && section && href === `/#${section}`) {
      return "location" as const;
    }
    return undefined;
  };

  return (
    <header
      ref={header}
      className="site-header"
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setOpen(false);
        }
      }}
    >
      <nav className="nav-inner" aria-label="Nawigacja główna">
        <Link
          href="/#top"
          className="brand"
          aria-label="Dawid Orłowski, strona główna"
          onClick={() => setOpen(false)}
        >
          <BrandBlock />
          <span>
            Dawid Orłowski<small>Design & development</small>
          </span>
        </Link>
        <div className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={currentFor(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link
            className="nav-contact"
            href="/#kontakt"
            onClick={() => setOpen(false)}
          >
            Porozmawiajmy <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          >
            <span>{open ? "Zamknij" : "Menu"}</span>
            <span className="menu-toggle-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </nav>
      <nav
        id="mobile-menu"
        className="mobile-nav"
        aria-label="Nawigacja mobilna"
        hidden={!open}
      >
        {mobileLinks.map((l, index) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={currentFor(l.href)}
            onClick={() => setOpen(false)}
          >
            <span className="mobile-nav-index" aria-hidden="true">
              0{index + 1}
            </span>
            <span>{l.label}</span>
            {l.href === "/#kontakt" && (
              <ArrowUpRight size={24} aria-hidden="true" />
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}
