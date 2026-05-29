"use client";
/* eslint-disable @next/next/no-img-element */
import { Briefcase, BadgeCheck, Sparkles, Code2, Gauge, MessagesSquare } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const reasons = [
  {
    icon: Sparkles,
    title: "Spojrzenie marketingowca",
    text: "Z doświadczenia w marketingu wiem, co realnie sprzedaje online — projektuję strony pod cel: kontakt, zapytanie, sprzedaż, nie tylko ładny wygląd.",
  },
  {
    icon: Code2,
    title: "Kod i AI",
    text: "Jako Fullstack AI Developer buduję na Next.js i React, z integracjami AI i automatyzacjami. Strona jest szybka, bezpieczna i gotowa na rozwój.",
  },
  {
    icon: Gauge,
    title: "Wydajność i SEO",
    text: "Optymalizuję ładowanie i strukturę pod wyszukiwarki, żeby klienci łatwiej Cię znajdowali.",
  },
  {
    icon: MessagesSquare,
    title: "Bezpośredni kontakt",
    text: "Pracujesz ze mną, nie z działem obsługi. Jasne ustalenia i dotrzymane terminy.",
  },
];

export function AboutSection() {
  return (
    <Section id="o-mnie">
      <SectionHeading
        eyebrow="04 — O mnie"
        title="Łączę kod, AI i marketing"
        subtitle="Jako Fullstack AI Developer z przeszłością w marketingu wiem, co sprawia, że strona sprzedaje — i potrafię to samodzielnie zaprogramować."
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* Lewa: karta historia + dowód */}
        <Reveal>
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/50 p-6 md:p-8">
            {/* Nagłówek z avatarem i animowanym pierścieniem */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0">
                <div className="absolute -inset-[3px] animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--primary),transparent_40%,var(--primary))] motion-reduce:animate-none" />
                <img
                  src="/profile.jpg"
                  alt={cvData.personal.name}
                  className="absolute inset-0 h-full w-full rounded-full border-2 border-card object-cover"
                />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  {cvData.personal.name}
                </p>
                <p className="text-sm text-primary">{cvData.personal.role}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {cvData.personal.about}
            </p>

            {/* Doświadczenie */}
            <div className="rounded-2xl border border-border/60 bg-background/40 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <Briefcase size={16} /> Doświadczenie
              </div>
              <h3 className="font-display font-semibold text-foreground">
                {cvData.experience.role}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {cvData.experience.company} · {cvData.experience.period}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cvData.experience.description}
              </p>
            </div>

            {/* Certyfikaty */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                <BadgeCheck size={16} /> Certyfikaty
              </div>
              <ul className="flex flex-col gap-2">
                {cvData.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <BadgeCheck size={15} className="mt-0.5 shrink-0 text-primary" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Prawa: dlaczego warto */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
              Dlaczego warto pracować ze mną?
            </h3>
          </Reveal>
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.05 + i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
                <span className="pointer-events-none absolute right-3 top-1 font-display text-5xl font-bold text-foreground/[0.04] transition-colors duration-300 group-hover:text-primary/10">
                  0{i + 1}
                </span>
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <r.icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">
                      {r.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {r.text}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
