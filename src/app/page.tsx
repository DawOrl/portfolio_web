import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Plus } from "lucide-react";
import { ProjectsCarousel } from "@/components/blocks/ProjectsCarousel";
import { AboutPortrait } from "@/components/blocks/AboutPortrait";
import { ProcessBuild } from "@/components/blocks/ProcessBuild";
import { ServiceShowcase } from "@/components/blocks/ServiceShowcase";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ContactSection } from "@/components/blocks/ContactSection";
import { PortfolioFlow } from "@/components/blocks/PortfolioFlow";
import { SectionTransition } from "@/components/ui/SectionTransition";
import {
  PortfolioMotion,
  IntroReplay,
} from "@/components/blocks/PortfolioMotion";
import { smtpContactEnabled } from "@/lib/contact-config";
import { cvData } from "@/data/cv-data";
import { getProjects } from "@/lib/projects";
import "./portfolio-atmosphere.css";
import "./hero-sculptural.css";
import "./portfolio-chapters.css";
export default function Home() {
  const projects = getProjects();
  return (
    <PortfolioMotion>
      <div id="top" />
      <Navbar />
      <main id="main-content" className="portfolio-home">
        <section
          className="hero hero-sculptural"
          aria-labelledby="hero-heading"
        >
          <svg className="hero-clip-defs" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id="hero-contour" clipPathUnits="objectBoundingBox">
                <path d="M0,0 H1 V.69 C.95,.71 .96,.82 .91,.85 C.86,.88 .81,.86 .77,.93 C.72,1 .57,.96 .48,.96 H0 Z" />
              </clipPath>
              <clipPath
                id="hero-contour-mobile"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M0,0 H1 V.84 C.94,.85 .94,.90 .88,.91 C.81,.92 .84,.975 .68,.98 C.45,.99 .25,.96 0,.96 Z" />
              </clipPath>
            </defs>
          </svg>
          <div className="hero-field" aria-hidden="true" />
          <div className="hero-content shell">
            <div className="hero-meta">
              <span>INDEPENDENT WEB DESIGNER & DEVELOPER</span>
              <span className="availability">
                <i aria-hidden="true" />
                {cvData.personal.availability}
              </span>
            </div>
            <div className="hero-title-wrap">
              <h1 id="hero-heading">
                <span className="hero-line">
                  <span className="hero-line-inner">Dobry design.</span>
                </span>{" "}
                <span className="hero-line">
                  <span className="hero-line-inner hero-line-accent">
                    Jeszcze lepsza
                  </span>
                </span>{" "}
                <span className="hero-line">
                  <span className="hero-line-inner">
                    strona<span className="hero-dot">.</span>
                  </span>
                </span>
              </h1>
            </div>
            <div className="hero-bottom">
              <div className="hero-intro">
                <p>
                  Projektuję i&nbsp;tworzę strony, które oddają charakter Twojej
                  marki. Przemyślane wizualnie. Dopracowane w&nbsp;kodzie.
                </p>
                <div className="hero-actions">
                  <a className="action action-brand" href="#kontakt">
                    Porozmawiajmy o&nbsp;projekcie <ArrowUpRight size={19} />
                  </a>
                  <a className="text-link" href="#realizacje">
                    Zobacz realizacje <ArrowDown size={16} />
                  </a>
                </div>
              </div>
              <div className="hero-signature-footer">
                <div className="hero-signature">
                  <span className="hero-avatar">
                    <Image
                      src="/portrait-dawid-4k-pressed-20261012.webp"
                      width={36}
                      height={36}
                      alt="Dawid Orłowski"
                    />
                  </span>
                  <div>
                    Dawid Orłowski<span>Kraków · pracuję zdalnie</span>
                  </div>
                </div>
                <div className="hero-baseline">
                  <IntroReplay />
                </div>
              </div>
            </div>
          </div>
          <div className="hero-signature-stage" aria-hidden="true">
            <div className="hero-signature-entry">
              <Image
                src="/hero-form-blender.webp"
                alt=""
                width={1000}
                height={1100}
                loading="eager"
                fetchPriority="high"
                unoptimized
              />
            </div>
          </div>
        </section>
        <section id="realizacje" className="work-section work-section-featured">
          <div className="shell">
            <div className="section-topline">
              <span className="eyebrow">
                <b>01</b> / WYBRANE PROJEKTY
              </span>
              <span>KAŻDA MARKA MA SWÓJ CHARAKTER.</span>
            </div>
            <div className="section-heading">
              <h2>
                Pomysły, które nabrały <em>kształtu.</em>
              </h2>
              <div>
                <p>
                  Od pierwszego szkicu do ostatniej linijki kodu. <br />
                  Zobacz, jak podchodzę do różnych wyzwań.
                </p>
                <Link className="text-link" href="/realizacje">
                  Wszystkie projekty <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
            <ProjectsCarousel projects={projects} />
          </div>
        </section>
        <SectionTransition
          from="paper"
          to="burgundy"
          shape="fold"
          size="deep"
        />
        <section id="uslugi" className="services-section">
          <div className="shell">
            <div className="section-topline">
              <span className="eyebrow">
                <b>02</b> / W&nbsp;CZYM MOGĘ POMÓC
              </span>
              <span>TWÓJ CEL. MOJE ROZWIĄZANIE.</span>
            </div>
            <div className="section-heading">
              <h2>
                Od wizytówki
                <br />
                <em>po aplikację.</em>
              </h2>
              <p>
                Potrzebujesz miejsca dla swojej marki w&nbsp;sieci? Połączmy
                estetykę z&nbsp;tym, co naprawdę przyda się Twojej firmie.
              </p>
            </div>
            <ServiceShowcase services={cvData.services} />
          </div>
        </section>
        <SectionTransition
          from="burgundy"
          to="ink"
          shape="scoop"
          size="shallow"
        />
        <section
          id="o-mnie"
          className="about-editorial-section"
          aria-labelledby="about-heading"
        >
          <AboutPortrait />
          <div id="moje-podejscie" className="portrait-story shell">
            <div>
              <span className="eyebrow">DWA SPOJRZENIA. JEDEN PROJEKT.</span>
              <h3>
                Myślę jak projektant.
                <br />
                <em>Działam jak programista.</em>
              </h3>
            </div>
            <div className="portrait-story-copy">
              <p>
                Na co dzień pracuję jako Fullstack AI Developer. Wcześniej
                zajmowałem się email marketingiem&nbsp;- dlatego patrzę na
                stronę zarówno od strony kodu, jak i&nbsp;potrzeb biznesu.
              </p>
              <p>
                Lubię prostotę, przemyślane detale i&nbsp;rozwiązania, które
                mają sens. Pracujesz bezpośrednio ze mną: od pierwszej rozmowy,
                przez projekt, aż po publikację.
              </p>
              <a
                className="text-link"
                href="/Dawid_Orlowski_CV.pdf?v=2026-09-22"
                target="_blank"
                rel="noopener noreferrer"
              >
                Poznaj moje doświadczenie <ArrowUpRight size={18} />
              </a>
              <div className="portrait-tools">
                <span>MÓJ WARSZTAT</span>
                <p>Next.js / React / TypeScript / Node.js</p>
              </div>
            </div>
          </div>
        </section>
        <SectionTransition from="ink" to="paper" shape="swell" size="deep" />
        <section
          id="proces"
          className="process-section"
          aria-labelledby="process-heading"
        >
          <div className="shell">
            <div className="section-topline">
              <span className="eyebrow">
                <b>04</b> / WSPÓŁPRACA KROK PO KROKU
              </span>
              <span>OD PIERWSZEJ ROZMOWY DO PUBLIKACJI.</span>
            </div>
            <div className="section-heading process-chapter-heading">
              <div>
                <h2 id="process-heading">
                  Zawsze wiesz,
                  <br />
                  <em>na czym stoimy.</em>
                </h2>
                <p>
                  Ustalamy zakres, zatwierdzasz projekt, a&nbsp;potem koduję
                  i&nbsp;publikuję stronę. Bez niespodzianek po drodze.
                </p>
              </div>
              <div className="process-chapter-form" aria-hidden="true">
                <Image
                  src="/process-form-blender.webp"
                  alt=""
                  width={1100}
                  height={800}
                  unoptimized
                />
              </div>
            </div>
            <ProcessBuild />
            <div className="process-grid">
              {cvData.processSteps.map((s) => (
                <article key={s.step}>
                  <span className="process-number">{s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <SectionTransition from="paper" to="ink" shape="ripple" />
        <section
          id="cennik"
          className="pricing-section"
          aria-labelledby="pricing-heading"
        >
          <div className="shell">
            <div className="section-topline">
              <span className="eyebrow">
                <b>05</b> / CENNIK
              </span>
              <span>ZAKRES ZNASZ. DECYZJA NALEŻY DO CIEBIE.</span>
            </div>
            <div className="section-heading pricing-teaser">
              <h2 id="pricing-heading">
                Znasz cenę,
                <br />
                <em>zanim zaczniemy.</em>
              </h2>
              <p>
                Trzy pakiety od 990&nbsp;zł, dodatki i&nbsp;zasady współpracy
                w&nbsp;jednym miejscu.
              </p>
              <ul className="pricing-teaser-list">
                {cvData.pricing.map((p) => (
                  <li key={p.name}>
                    <Link href="/cennik">
                      <span className="pricing-teaser-name">
                        {p.name}
                        {p.featured && <small>POLECANY</small>}
                      </span>
                      <span className="pricing-teaser-tagline">
                        {p.tagline}
                      </span>
                      <span className="pricing-teaser-price">
                        <small>od</small>{" "}
                        {p.price.replace(/^od\s+/, "").replace(/\s+zł$/, "")}{" "}
                        <small>zł</small>
                      </span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="action action-brand" href="/cennik">
                Zobacz cennik <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
        </section>
        <SectionTransition from="ink" to="paper" shape="fold" size="shallow" />
        <section id="faq" className="faq-section" aria-labelledby="faq-heading">
          <div className="shell">
            <div className="section-topline">
              <span className="eyebrow">
                <b>06</b> / WARTO WIEDZIEĆ
              </span>
              <span>ODPOWIEDZI BEZ DROBNEGO DRUKU.</span>
            </div>
            <div className="faq-layout">
              <div>
                <h2 id="faq-heading">
                  Jeszcze jakieś
                  <br />
                  <em>pytania?</em>
                </h2>
                <p className="faq-intro">
                  Kilka konkretów na start. Jeśli Twojego pytania nie ma na
                  liście, odezwij się.
                </p>
                <a className="text-link" href="#kontakt">
                  Po prostu napisz <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="faq-list">
                {cvData.faq.map((f) => (
                  <details key={f.q}>
                    <summary>
                      <span className="faq-question">{f.q}</span>
                      <Plus size={20} />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <SectionTransition
          from="paper"
          to="burgundy"
          shape="scoop"
          size="deep"
        />
        <ContactSection smtpEnabled={smtpContactEnabled()} />
        <SectionTransition
          from="burgundy"
          to="ink"
          shape="swell"
          size="shallow"
        />
        <PortfolioFlow />
      </main>
      <SiteFooter variant="home" />
    </PortfolioMotion>
  );
}
