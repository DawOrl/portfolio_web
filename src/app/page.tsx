import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Check, Plus } from "lucide-react";
import { ProjectsCarousel } from "@/components/blocks/ProjectsCarousel";
import { AboutPortrait } from "@/components/blocks/AboutPortrait";
import { ProcessBuild } from "@/components/blocks/ProcessBuild";
import { ServiceShowcase } from "@/components/blocks/ServiceShowcase";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ContactSection } from "@/components/blocks/ContactSection";
import { PortfolioFlow } from "@/components/blocks/PortfolioFlow";
import { ContactIntentLink } from "@/components/ui/contact-intent-link";
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
                  Projektuję i tworzę strony, które oddają charakter Twojej
                  marki. Przemyślane wizualnie. Dopracowane w kodzie.
                </p>
                <div className="hero-actions">
                  <a className="action action-brand" href="#kontakt">
                    Porozmawiajmy o projekcie <ArrowUpRight size={19} />
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
              <span className="eyebrow">01 / WYBRANE PROJEKTY</span>
              <span>KAŻDA MARKA MA SWÓJ CHARAKTER.</span>
            </div>
            <div className="section-heading">
              <h2>
                Pomysły, które nabrały <em>kształtu.</em>
              </h2>
              <div>
                <p>
                  Od pierwszego szkicu do ostatniej linijki kodu.
                  <br />
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
              <span className="eyebrow">02 / W CZYM MOGĘ POMÓC</span>
              <span>TWÓJ CEL. MOJE ROZWIĄZANIE.</span>
            </div>
            <div className="section-heading">
              <h2>
                Dobra strona to
                <br />
                <em>dobry początek.</em>
              </h2>
              <p>
                Potrzebujesz miejsca dla swojej marki w sieci? Połączmy estetykę
                z tym, co naprawdę przyda się Twojej firmie.
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
                zajmowałem się email marketingiem - dlatego patrzę na stronę
                zarówno od strony kodu, jak i potrzeb biznesu.
              </p>
              <p>
                Lubię prostotę, przemyślane detale i rozwiązania, które mają
                sens. Pracujesz bezpośrednio ze mną: od pierwszej rozmowy, przez
                projekt, aż po publikację.
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
              <span className="eyebrow">04 / WSPÓŁPRACA KROK PO KROKU</span>
              <span>OD PIERWSZEJ ROZMOWY DO PUBLIKACJI.</span>
            </div>
            <div className="section-heading process-chapter-heading">
              <div>
                <h2 id="process-heading">
                  Jasny plan.
                  <br />
                  <em>Spokojna głowa.</em>
                </h2>
                <p>
                  Wiesz, co robimy, na jakim jesteśmy etapie i czego możesz się
                  spodziewać.
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
              <span className="eyebrow">05 / INWESTYCJA W TWOJĄ MARKĘ</span>
              <span>ZAKRES ZNASZ. DECYZJA NALEŻY DO CIEBIE.</span>
            </div>
            <div className="section-heading">
              <h2 id="pricing-heading">
                Dobry projekt.
                <br />
                <em>Uczciwe zasady.</em>
              </h2>
              <p>
                Wybierz zakres dopasowany do swojej firmy. Pełną wycenę poznasz
                przed rozpoczęciem pracy.
              </p>
            </div>
            <div className="pricing-grid">
              {cvData.pricing.map((p, i) => (
                <article
                  key={p.name}
                  className={`price-plan ${p.featured ? "price-featured" : ""}`}
                >
                  <div className="plan-index">
                    <span>0{i + 1} / PAKIET</span>
                    {p.featured && <span>POLECANY</span>}
                  </div>
                  <div className="plan-top">
                    <h3>{p.name}</h3>
                  </div>
                  <div className="plan-heading">
                    <p>{p.tagline}</p>
                  </div>
                  <p className="plan-price">
                    <span>od</span>{" "}
                    <strong>
                      {p.price.replace(/^od\s+/, "").replace(/\s+zł$/, "")}
                    </strong>{" "}
                    <span>zł</span>
                  </p>
                  <p className="plan-description">{p.description}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={15} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ContactIntentLink
                    className="action"
                    href="/#kontakt"
                    intent={{ kind: "package", label: p.name, value: p.name }}
                  >
                    {p.cta}
                    <ArrowUpRight size={18} />
                  </ContactIntentLink>
                </article>
              ))}
            </div>
            <div className="pricing-included">
              <span className="eyebrow">W KAŻDYM PAKIECIE</span>
              <p>
                Dwie rundy poprawek · Drobna redakcja Twoich tekstów · 30 dni
                pomocy przy błędach wdrożenia
              </p>
            </div>
            <div className="pricing-extras">
              <div>
                <h3>Teksty? Wybór należy do Ciebie.</h3>
                <p>
                  Możesz dostarczyć własne lub zlecić mi ich przygotowanie na
                  podstawie informacji o Twojej firmie. Pisanie tekstów obejmuje
                  jedną rundę korekty.
                </p>
              </div>
              <dl>
                {cvData.pricingExtras.map((extra) => (
                  <div key={extra.name}>
                    <dt>
                      {extra.name}
                      <span>{extra.detail}</span>
                    </dt>
                    <dd>{extra.price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="pricing-note">
              Ceny wejściowe dotyczą opisanego zakresu. Końcową kwotę do zapłaty
              i termin potwierdzam w wycenie. Domena, hosting i płatne usługi
              zewnętrzne są rozliczane osobno. CMS, sklep, rezerwacje oraz
              rozbudowane animacje wymagają dodatkowej wyceny.
            </p>
          </div>
        </section>
        <SectionTransition from="ink" to="paper" shape="fold" size="shallow" />
        <section id="faq" className="faq-section" aria-labelledby="faq-heading">
          <div className="shell faq-layout">
            <div>
              <span className="eyebrow">06 / WARTO WIEDZIEĆ</span>
              <h2 id="faq-heading">
                Jeszcze jakieś
                <br />
                <em>pytania?</em>
              </h2>
              <p className="faq-intro">
                Kilka konkretów, zanim zaczniemy. Jeśli Twojego pytania nie ma
                na liście, odezwij się.
              </p>
              <a className="text-link" href="#kontakt">
                Po prostu napisz <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="faq-list">
              {cvData.faq.map((f, i) => (
                <details key={f.q}>
                  <summary>
                    <span className="faq-number">0{i + 1}</span>
                    <span className="faq-question">{f.q}</span>
                    <Plus size={20} />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
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
