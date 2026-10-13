import { pl, plDeep } from "@/lib/typography";

/**
 * Copy used only on /cennik. Every comparison row restates an item from the
 * feature lists in cvData.pricing, so the table never promises more than the
 * package cards. Keys match the package names.
 */
export type ComparisonValue = boolean | string;

export type ComparisonGroup = {
  title: string;
  rows: { label: string; values: Record<string, ComparisonValue> }[];
};

export const includedInEveryPackage = plDeep([
  "Dwie rundy poprawek",
  "Drobna redakcja Twoich tekstów",
  "30 dni pomocy przy błędach wdrożenia",
]);

export const comparisonGroups: ComparisonGroup[] = plDeep([
  {
    title: "Zakres i wygląd",
    rows: [
      {
        label: "Zakres strony",
        values: {
          Start: "1 strona, do 5 sekcji",
          Biznes: "Do 5 stron, w tym główna",
          Landing: "1 strona, do 8 sekcji",
        },
      },
      {
        label: "Wygląd",
        values: {
          Start: "Dopasowany do marki",
          Biznes: "Indywidualny, pod markę",
          Landing: "Pod cel kampanii",
        },
      },
    ],
  },
  {
    title: "Treść strony",
    rows: [
      {
        label: "Prezentacja usług i realizacji",
        values: { Start: false, Biznes: true, Landing: false },
      },
      {
        label: "Uporządkowanie argumentów oferty",
        values: { Start: false, Biznes: false, Landing: true },
      },
      {
        label: "Wezwania do działania i FAQ",
        values: { Start: false, Biznes: false, Landing: true },
      },
    ],
  },
  {
    title: "Technika i publikacja",
    rows: [
      {
        label: "Wersja mobilna",
        values: { Start: true, Biznes: true, Landing: true },
      },
      {
        label: "Formularz kontaktowy",
        values: { Start: true, Biznes: true, Landing: true },
      },
      {
        label: "Podstawowe ustawienia SEO",
        values: { Start: true, Biznes: true, Landing: true },
      },
      {
        label: "Podpięcie domeny i publikacja",
        values: { Start: true, Biznes: true, Landing: true },
      },
    ],
  },
  {
    title: "W każdym pakiecie",
    rows: includedInEveryPackage.map((label) => ({
      label,
      values: { Start: true, Biznes: true, Landing: true },
    })),
  },
]);

export const pricingNotes = plDeep([
  {
    title: "Cena „od”",
    text: "Ceny wejściowe dotyczą opisanego zakresu. Końcową kwotę do zapłaty i termin potwierdzam w wycenie.",
  },
  {
    title: "Rozliczane osobno",
    text: "Domena, hosting i płatne usługi zewnętrzne. Pomogę je dobrać i skonfigurować, a koszty poznasz przed rozpoczęciem pracy.",
  },
  {
    title: "Wyceniane osobno",
    text: "CMS, sklep, rezerwacje oraz rozbudowane animacje wymagają dodatkowej wyceny.",
  },
]);

/** Questions from cvData.faq that are about money, time and ownership. */
export const pricingQuestions = [
  "Ile kosztuje strona internetowa?",
  "Jak długo trwa realizacja?",
  "Co z hostingiem i domeną?",
  "Czy będę mógł samodzielnie edytować treści?",
  "Czy kod strony należy do mnie?",
].map(pl);
