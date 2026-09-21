import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, ArrowRight, Check, Plus } from "lucide-react";
import { ProjectsCarousel } from "@/components/blocks/ProjectsCarousel";
import { DesignSignature } from "@/components/blocks/DesignSignature";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ContactSection } from "@/components/blocks/ContactSection";
import { PortfolioMotion, IntroReplay } from "@/components/blocks/PortfolioMotion";
import { smtpContactEnabled } from "@/lib/contact-config";
import { cvData } from "@/data/cv-data";
import { getProjects } from "@/lib/projects";
export default function Home() {
  const projects = getProjects();
  return (
    <PortfolioMotion>
      <Navbar />
      <main id="main-content">
        <div id="top" />
        <section className="hero shell" aria-labelledby="hero-heading">
          <div className="hero-meta">
            <span>INDEPENDENT WEB DESIGNER & DEVELOPER</span>
            <span className="availability">
              <i />
              {cvData.personal.availability}
            </span>
          </div>
          <div className="hero-title-wrap">
            <h1 id="hero-heading">
              <span className="hero-line"><span className="hero-line-inner">Dobry design.</span></span>{" "}
              <span className="hero-line"><span className="hero-line-inner hero-line-accent">Jeszcze lepsza</span></span>{" "}
              <span className="hero-line"><span className="hero-line-inner">strona<span className="hero-dot">.</span></span></span>
            </h1>
            <DesignSignature />
          </div>
          <div className="hero-bottom">
            <div className="hero-signature">
              <Image
                src="/profile.jpg"
                width={52}
                height={52}
                alt="Dawid Orłowski"
                priority
              />
              <div>
                Dawid Orłowski<span>Kraków · pracuję zdalnie</span>
              </div>
            </div>
            <div className="hero-intro">
              <p>
                Projektuję i tworzę strony, które oddają charakter Twojej marki.
                Przemyślane wizualnie. Dopracowane w kodzie. Gotowe na Twój
                biznes.
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
          </div>
          <div className="hero-baseline">
            <span>STRATEGIA / DESIGN / DEVELOPMENT</span>
            <IntroReplay />
            <span>
              PRZEWIŃ, ŻEBY ZOBACZYĆ WIĘCEJ <ArrowDown size={13} />
            </span>
          </div>
        </section>
        <section
          className="design-interlude shell"
          aria-label="Design dopracowany w detalach"
        >
          <div className="design-interlude-copy">
            <span className="eyebrow">FORMA MA ZNACZENIE</span>
            <h2>
              Detal, który
              <br />
              <em>robi różnicę.</em>
            </h2>
            <p>
              Charakter marki zaczyna się tam,
              <br />
              gdzie kończą się gotowe rozwiązania.
            </p>
          </div>
          <div className="design-sculpture" aria-hidden="true">
            <Image
              src="/design-sculpture-burgundy.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 95vw, 55vw"
            />
            <span className="sculpture-coordinate sculpture-coordinate-a">
              FIG. 01 / STUDIUM FORMY
            </span>
            <span className="sculpture-coordinate sculpture-coordinate-b">
              GRAFIT × BURGUND
            </span>
          </div>
        </section>
        <section id="realizacje" className="work-section shell">
          <div className="section-topline">
            <span className="eyebrow">01 / WYBRANE PROJEKTY</span>
            <span>KAŻDA MARKA MA SWÓJ CHARAKTER.</span>
          </div>
          <div className="section-heading">
            <h2>
              Pomysły, które
              <br />
              nabrały <em>kształtu.</em>
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
        </section>
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
                Potrzebujesz miejsca dla swojej marki w sieci?
                <br />
                Połączmy estetykę z tym, co naprawdę
                <br />
                przyda się Twojej firmie.
              </p>
            </div>
            <div className="service-list">
              {cvData.services.map((s, i) => (
                <a href="#kontakt" key={s.id} className="service-row">
                  <span className="service-number">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <div>
                    <p>{s.description}</p>
                    <span>{s.features.slice(0, 3).join(" / ")}</span>
                  </div>
                  <ArrowUpRight className="service-arrow" strokeWidth={1} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <section
          id="o-mnie"
          className="portrait-section shell"
          aria-labelledby="about-heading"
        >
          <div className="portrait-stage">
            <div className="portrait-topline">
              <span>03 / CZŁOWIEK ZA PROJEKTEM</span>
              <span>KRAKÓW, POLSKA ↗</span>
            </div>
            <div className="portrait-editorial-image">
              <Image
                src="/profile-editorial.png"
                alt="Czarno-biały portret Dawida Orłowskiego"
                fill
                sizes="(max-width: 760px) 90vw, 55vw"
              />
            </div>
            <div className="portrait-greeting">
              <span className="portrait-kicker">
                DESIGNER Z WYOBRAŹNIĄ.
                <br />
                DEVELOPER Z KONKRETAMI.
              </span>
              <h2 id="about-heading">
                Cześć<span>.</span>
              </h2>
              <p>
                Jestem Dawid Orłowski.
                <br />
                <em>Miło Cię poznać.</em>
              </p>
            </div>
            <div className="portrait-side-label" aria-hidden="true">
              MNIEJ PRZYPADKU. WIĘCEJ CHARAKTERU.
            </div>
            <a href="#moje-podejscie" className="portrait-discover">
              Poznaj mnie bliżej <ArrowDown size={15} />
            </a>
            <span className="portrait-signature" aria-hidden="true">
              Dawid O.
            </span>
          </div>
          <div id="moje-podejscie" className="portrait-story">
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
                zajmowałem się email marketingiem — dlatego patrzę na stronę
                zarówno od strony kodu, jak i potrzeb biznesu.
              </p>
              <p>
                Lubię prostotę, przemyślane detale i rozwiązania, które mają
                sens. Pracujesz bezpośrednio ze mną: od pierwszej rozmowy, przez
                projekt, aż po publikację.
              </p>
              <a
                className="text-link"
                href="/Dawid_Orlowski_CV.pdf"
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
        <section id="proces" className="process-section shell">
          <div className="section-topline">
            <span className="eyebrow">04 / WSPÓŁPRACA KROK PO KROKU</span>
          </div>
          <div className="section-heading">
            <h2>
              Jasny plan.
              <br />
              <em>Spokojna głowa.</em>
            </h2>
            <p>
              Wiesz, co robimy, na jakim jesteśmy etapie
              <br />i czego możesz się spodziewać.
            </p>
          </div>
          <div className="process-grid">
            {cvData.processSteps.map((s) => (
              <article key={s.step}>
                <span className="process-number">
                  {s.step}
                  <ArrowRight size={20} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="cennik" className="pricing-section shell">
          <div className="section-topline">
            <span className="eyebrow">05 / INWESTYCJA W TWOJĄ MARKĘ</span>
          </div>
          <div className="section-heading">
            <h2>
              Dobry projekt.
              <br />
              <em>Uczciwe zasady.</em>
            </h2>
            <p>
              Wybierz zakres dopasowany do swojej firmy.
              <br />
              Pełną wycenę poznasz przed rozpoczęciem pracy.
            </p>
          </div>
          <div className="pricing-grid">
            {cvData.pricing.map((p, i) => (
              <article
                key={p.name}
                className={`price-plan ${p.featured ? "price-featured" : ""}`}
              >
                <div className="plan-top">
                  <span>
                    0{i + 1} / {p.name}
                  </span>
                  {p.featured && <span>POLECANY</span>}
                </div>
                <h3>{p.tagline}</h3>
                <p className="plan-price">
                  {p.price}
                </p>
                <p>{p.description}</p>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a className="action" href="#kontakt">
                  {p.cta}
                  <ArrowUpRight size={18} />
                </a>
              </article>
            ))}
          </div>
          <div className="pricing-included">
            <span className="eyebrow">W KAŻDYM PAKIECIE</span>
            <p>Dwie rundy poprawek · Drobna redakcja Twoich tekstów · 30 dni pomocy przy błędach wdrożenia</p>
          </div>
          <div className="pricing-extras">
            <div>
              <h3>Teksty? Wybór należy do Ciebie.</h3>
              <p>Możesz dostarczyć własne lub zlecić mi ich przygotowanie na podstawie informacji o Twojej firmie. Pisanie tekstów obejmuje jedną rundę korekty.</p>
            </div>
            <dl>
              {cvData.pricingExtras.map((extra) => (
                <div key={extra.name}>
                  <dt>{extra.name}<span>{extra.detail}</span></dt>
                  <dd>{extra.price}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="pricing-note">
            Ceny wejściowe dotyczą opisanego zakresu. Końcową kwotę do zapłaty i termin potwierdzam w wycenie.
            Domena, hosting i płatne usługi zewnętrzne są rozliczane osobno.
            CMS, sklep, rezerwacje oraz rozbudowane animacje wymagają dodatkowej wyceny.
          </p>
        </section>
        <section id="faq" className="faq-section shell">
          <div>
            <span className="eyebrow">06 / WARTO WIEDZIEĆ</span>
            <h2>
              Jeszcze jakieś
              <br />
              <em>pytania?</em>
            </h2>
            <a className="text-link" href="#kontakt">
              Po prostu napisz <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="faq-list">
            {cvData.faq.map((f, i) => (
              <details key={f.q}>
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  {f.q}
                  <Plus size={20} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <ContactSection smtpEnabled={smtpContactEnabled()} />
      </main>
      <SiteFooter />
    </PortfolioMotion>
  );
}
