import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { getProjects, projectName } from "@/lib/projects";
import "./not-found.css";

const routes = [
  { href: "/", label: "Strona główna", note: "Zacznij od początku" },
  { href: "/realizacje", label: "Realizacje", note: "Biblioteka projektów" },
  { href: "/#uslugi", label: "Usługi", note: "Strony, sklepy i aplikacje" },
  { href: "/#kontakt", label: "Kontakt", note: "Bezpłatna wycena projektu" },
];

export default function NotFound() {
  const latest = getProjects()[0];

  return (
    <>
      <Navbar />
      <main id="main-content" className="not-found-page">
        <section className="nf-hero shell" aria-labelledby="nf-title">
          <div className="nf-art" aria-hidden="true">
            <span className="nf-code">404</span>
            <picture className="nf-layer">
              <source
                media="(max-width: 760px)"
                srcSet="/art/broken-link-mobile.webp"
                width={800}
                height={550}
              />
              <Image
                src="/art/broken-link.webp"
                alt=""
                width={1500}
                height={1032}
                loading="eager"
                fetchPriority="high"
                unoptimized
              />
            </picture>
            <picture className="nf-layer nf-fragment">
              <source
                media="(max-width: 760px)"
                srcSet="/art/broken-link-fragment-mobile.webp"
                width={800}
                height={550}
              />
              <Image
                src="/art/broken-link-fragment.webp"
                alt=""
                width={1500}
                height={1032}
                loading="eager"
                unoptimized
              />
            </picture>
          </div>

          <div className="nf-copy">
            <p className="nf-eyebrow">
              <span>Błąd 404</span>
              <span aria-hidden="true">/</span>
              <span>Nie znaleziono strony</span>
            </p>
            <h1 id="nf-title">
              Połączenie
              <br />
              <em>zerwane.</em>
            </h1>
            <p className="nf-lead">
              Ten adres nie prowadzi do żadnej strony. Link może być nieaktualny
              albo zawierać literówkę. Wybierz, dokąd chcesz przejść dalej.
            </p>
            <nav className="nf-routes" aria-label="Dokąd dalej">
              <ul>
                {routes.map((route) => (
                  <li key={route.href}>
                    <Link href={route.href}>
                      <span className="nf-route-label">
                        {route.label}
                        <small>{route.note}</small>
                      </span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {latest && (
          <section
            className="nf-latest shell"
            aria-labelledby="nf-latest-title"
          >
            <div className="nf-latest-topline">
              <span>Najnowsza realizacja</span>
              <Link href="/realizacje">Wszystkie projekty</Link>
            </div>
            <Link
              href={`/realizacje/${latest.slug}`}
              className="nf-latest-card"
            >
              <div className="nf-latest-media">
                <Image
                  src={latest.cover}
                  alt=""
                  fill
                  sizes="(max-width: 760px) calc(100vw - 40px), 420px"
                />
              </div>
              <div className="nf-latest-copy">
                <span>{latest.category}</span>
                <h2 id="nf-latest-title">{projectName(latest)}</h2>
                <p>{latest.tagline}</p>
              </div>
              <ArrowUpRight
                className="nf-latest-arrow"
                size={28}
                aria-hidden="true"
              />
            </Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
