import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ContactIntentLink } from "@/components/ui/contact-intent-link";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { cvData } from "@/data/cv-data";
import { SITE_URL } from "@/lib/site";
import {
  comparisonGroups,
  includedInEveryPackage,
  pricingNotes,
  pricingQuestions,
  type ComparisonValue,
} from "./content";
import "./pricing.css";

const NBSP = " ";
const SCALE_MAX = 3000;
const SCALE_STEPS = [0, 500, 1000, 1500, 2000, 2500, 3000];

const formatAmount = (value: number) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);

const packages = cvData.pricing.map((plan) => {
  const amount = plan.price.replace(/^od\s+/, "").replace(/\s*zł$/, "");
  const value = Number(amount.replace(/\D/g, ""));
  return {
    ...plan,
    id: `pakiet-${plan.name.toLowerCase()}`,
    amount: formatAmount(value),
    value,
  };
});
const packagesByPrice = [...packages].sort((a, b) => a.value - b.value);

const packageList = packages
  .map((p) => `${p.name} (od ${p.amount.replace(NBSP, " ")} zł)`)
  .join(", ")
  .replace(/, ([^,]*)$/, " i $1");
const description = `Cennik stron internetowych: pakiety ${packageList}. Sprawdź, co obejmuje każdy pakiet, ile kosztują dodatki i jak powstaje wycena.`;

export const metadata: Metadata = {
  title: "Cennik stron internetowych",
  description,
  alternates: { canonical: `${SITE_URL}/cennik` },
  openGraph: {
    title: "Cennik stron internetowych | Dawid Orłowski",
    description,
    url: `${SITE_URL}/cennik`,
    siteName: "Dawid Orłowski",
    locale: "pl_PL",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const faq = pricingQuestions.flatMap((question) => {
  const entry = cvData.faq.find((item) => item.q === question);
  return entry ? [entry] : [];
});

function ComparisonCell({ value }: { value: ComparisonValue | undefined }) {
  if (typeof value === "string") {
    return <span className="cp-cell-text">{value}</span>;
  }
  return value ? (
    <>
      <Check className="cp-cell-yes" size={18} aria-hidden="true" />
      <span className="sr-only">W&nbsp;pakiecie</span>
    </>
  ) : (
    <>
      <Minus className="cp-cell-no" size={18} aria-hidden="true" />
      <span className="sr-only">Poza pakietem</span>
    </>
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pricing-page">
        <header className="cp-hero shell">
          <Link href="/" className="cp-back">
            <ArrowLeft size={16} aria-hidden="true" /> Strona główna
          </Link>
          <div className="cp-hero-grid">
            <div>
              <p className="cp-eyebrow">DORLOWSKI.DEV / CENNIK</p>
              <h1>
                Cenę znasz przed pierwszym szkicem
                <span className="cp-dot">.</span>
              </h1>
            </div>
            <div className="cp-hero-copy">
              <p>
                Trzy pakiety z&nbsp;ceną wejściową i&nbsp;jasnym zakresem.
                Wybierz ten, który pasuje do Twojej firmy. Pełną kwotę
                i&nbsp;termin dostaniesz w&nbsp;bezpłatnej wycenie, zanim
                zaczniemy pracę.
              </p>
              <a className="cp-text-link" href="#porownanie">
                Porównaj pakiety <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="cp-scale">
            <ol
              className="cp-scale-lanes"
              aria-label="Pakiety od najniższej ceny wejściowej"
            >
              {packagesByPrice.map((p, i) => (
                <li
                  key={p.name}
                  className="cp-lane"
                  data-featured={p.featured || undefined}
                  style={
                    {
                      "--at": `${(p.value / SCALE_MAX) * 100}%`,
                      "--delay": `${200 + i * 140}ms`,
                    } as CSSProperties
                  }
                >
                  <a href={`#${p.id}`}>
                    <span className="cp-lane-label">
                      <span className="cp-lane-name">{p.name}</span>
                      <span className="cp-lane-price">
                        od {p.amount}&nbsp;zł
                      </span>
                    </span>
                    <span className="cp-lane-track" aria-hidden="true">
                      <span className="cp-lane-lead" />
                      <span className="cp-lane-range" />
                      <span className="cp-lane-dot" />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="cp-scale-axis" aria-hidden="true">
              <span className="cp-scale-unit">zł</span>
              <div>
                {SCALE_STEPS.map((step) => (
                  <span
                    key={step}
                    data-minor={step % 1000 !== 0 || undefined}
                    style={
                      { "--x": `${(step / SCALE_MAX) * 100}%` } as CSSProperties
                    }
                  >
                    {formatAmount(step)}
                  </span>
                ))}
              </div>
            </div>
            <figcaption>
              Każdy pakiet zaczyna się od ceny wejściowej. Większy zakres
              przesuwa kwotę dalej na skali, a&nbsp;dokładną poznasz
              w&nbsp;wycenie.
            </figcaption>
          </figure>
        </header>

        <section
          id="pakiety"
          className="cp-packages shell"
          aria-labelledby="cp-packages-title"
        >
          <div className="cp-topline">
            <span className="cp-eyebrow">01 / PAKIETY</span>
            <span>ZAKRES ZNASZ. DECYZJA NALEŻY DO CIEBIE.</span>
          </div>
          <div className="cp-chapter-head">
            <h2 id="cp-packages-title">Który pakiet pasuje do Ciebie?</h2>
            <p>
              Wybierz zakres dopasowany do swojej firmy. Dodatki znajdziesz
              niżej, a&nbsp;pełną wycenę poznasz przed rozpoczęciem pracy.
            </p>
          </div>
          <div className="cp-plans">
            {packages.map((p) => (
              <article
                key={p.name}
                id={p.id}
                className="cp-plan"
                data-featured={p.featured || undefined}
                aria-labelledby={`${p.id}-name`}
              >
                <div className="cp-plan-index">
                  <span>PAKIET</span>
                  {p.featured && <span>POLECANY</span>}
                </div>
                <h3 id={`${p.id}-name`}>{p.name}</h3>
                <p className="cp-plan-tagline">{p.tagline}</p>
                <p className="cp-plan-price">
                  <span>od</span> <strong>{p.amount}</strong> <span>zł</span>
                </p>
                <p className="cp-plan-description">{p.description}</p>
                <ul className="cp-plan-features">
                  {p.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ContactIntentLink
                  className="cp-plan-cta"
                  href="/#kontakt"
                  intent={{ kind: "package", label: p.name, value: p.name }}
                >
                  {p.cta}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </ContactIntentLink>
              </article>
            ))}
          </div>
          <div className="cp-included">
            <h3 className="cp-eyebrow">W&nbsp;KAŻDYM PAKIECIE</h3>
            <ul>
              {includedInEveryPackage.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SectionTransition from="ink" to="paper" shape="swell" />

        <section
          id="porownanie"
          className="cp-paper cp-compare-section"
          aria-labelledby="cp-compare-title"
        >
          <div className="shell">
            <div className="cp-topline">
              <span className="cp-eyebrow">02 / PORÓWNANIE</span>
              <span>NA PODSTAWIE ZAKRESU KAŻDEGO PAKIETU</span>
            </div>
            <div className="cp-chapter-head">
              <h2 id="cp-compare-title">Porównaj pakiety punkt po punkcie</h2>
              <p>
                Wszystkie trzy mają wersję mobilną, formularz, podstawowe SEO
                i&nbsp;publikację. Różnią się zakresem i&nbsp;tym, co strona ma
                pokazać.
              </p>
            </div>

            <table className="cp-compare" role="table">
              <caption className="sr-only">
                Porównanie zakresu pakietów Start, Biznes i&nbsp;Landing
              </caption>
              <colgroup>
                <col className="cp-col-feature" />
                {packages.map((p) => (
                  <col key={p.name} />
                ))}
              </colgroup>
              <thead role="rowgroup">
                <tr role="row">
                  <td className="cp-compare-corner" role="cell" />
                  {packages.map((p) => (
                    <th
                      key={p.name}
                      scope="col"
                      role="columnheader"
                      data-featured={p.featured || undefined}
                    >
                      <span className="cp-compare-name">{p.name}</span>
                      <span className="cp-compare-price">
                        od {p.amount}&nbsp;zł
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {comparisonGroups.map((group) => (
                <tbody key={group.title} role="rowgroup">
                  <tr className="cp-compare-group" role="row">
                    <th scope="rowgroup" role="rowheader">
                      {group.title}
                    </th>
                    {packages.map((p) => (
                      <td
                        key={p.name}
                        role="cell"
                        data-featured={p.featured || undefined}
                      />
                    ))}
                  </tr>
                  {group.rows.map((row) => (
                    <tr
                      key={row.label}
                      role="row"
                      data-text={
                        Object.values(row.values).some(
                          (value) => typeof value === "string",
                        ) || undefined
                      }
                    >
                      <th scope="row" role="rowheader">
                        {row.label}
                      </th>
                      {packages.map((p) => (
                        <td
                          key={p.name}
                          role="cell"
                          data-label={p.name}
                          data-featured={p.featured || undefined}
                        >
                          <ComparisonCell value={row.values[p.name]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
              <tfoot role="rowgroup">
                <tr role="row">
                  <td className="cp-compare-corner" role="cell" />
                  {packages.map((p) => (
                    <td
                      key={p.name}
                      role="cell"
                      data-featured={p.featured || undefined}
                    >
                      <ContactIntentLink
                        className="cp-compare-cta"
                        href="/#kontakt"
                        intent={{
                          kind: "package",
                          label: p.name,
                          value: p.name,
                        }}
                      >
                        Wybierz {p.name}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </ContactIntentLink>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <SectionTransition from="paper" to="ink" shape="fold" size="shallow" />

        <section
          id="dodatki"
          className="cp-extras-section"
          aria-labelledby="cp-extras-title"
        >
          <div className="shell">
            <div className="cp-topline">
              <span className="cp-eyebrow">03 / DODATKI I&nbsp;ZASADY</span>
              <span>TEKSTY I&nbsp;PODSTRONY</span>
            </div>
            <div className="cp-chapter-head">
              <h2 id="cp-extras-title">Dodatki, gdy potrzebujesz więcej</h2>
              <p>
                Kwoty, które doliczasz do pakietu tylko wtedy, gdy ich
                potrzebujesz.
              </p>
            </div>
            <div className="cp-extras">
              <div className="cp-extras-intro">
                <h3>Teksty? Wybór należy do Ciebie.</h3>
                <p>
                  Możesz dostarczyć własne lub zlecić mi ich przygotowanie na
                  podstawie informacji o&nbsp;Twojej firmie. Pisanie tekstów
                  obejmuje jedną rundę korekty.
                </p>
              </div>
              <dl className="cp-extras-list">
                {cvData.pricingExtras.map((extra) => (
                  <div key={extra.name}>
                    <dt>
                      {extra.name}
                      <span>{extra.detail}</span>
                    </dt>
                    <dd>{extra.price.replace(/\s/g, NBSP)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="cp-notes">
              <h3 id="cp-notes-title">Jak czytać ceny</h3>
              <dl>
                {pricingNotes.map((note) => (
                  <div key={note.title}>
                    <dt>{note.title}</dt>
                    <dd>{note.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <SectionTransition from="ink" to="paper" shape="ripple" />

        <section
          id="pytania"
          className="cp-paper cp-faq-section"
          aria-labelledby="cp-faq-title"
        >
          <div className="shell cp-faq">
            <div className="cp-faq-intro">
              <span className="cp-eyebrow">04 / PYTANIA</span>
              <h2 id="cp-faq-title">Pytania o&nbsp;koszty i&nbsp;terminy</h2>
              <p>
                Najczęstsze pytania przed wyceną. Jeśli Twojego nie ma na
                liście, po prostu napisz.
              </p>
              <Link className="cp-text-link" href="/#kontakt">
                Zadaj pytanie <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="cp-faq-list">
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    <span>{item.q}</span>
                    <Plus size={20} aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
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

        <section className="cp-cta" aria-labelledby="cp-cta-title">
          <div className="shell cp-cta-inner">
            <div>
              <p className="cp-eyebrow">BEZPŁATNA WYCENA</p>
              <h2 id="cp-cta-title">
                Zacznijmy od rozmowy o&nbsp;Twojej stronie
              </h2>
              <p>
                Nie wiesz, który pakiet wybrać? Opisz, czego potrzebujesz.
                Doradzę najlepsze rozwiązanie i&nbsp;przygotuję bezpłatną,
                konkretną wycenę.
              </p>
            </div>
            <Link href="/#kontakt" className="cp-cta-link">
              Porozmawiajmy o&nbsp;projekcie
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <SectionTransition
          from="burgundy"
          to="ink"
          shape="swell"
          size="shallow"
        />
      </main>
      <SiteFooter />
    </>
  );
}
