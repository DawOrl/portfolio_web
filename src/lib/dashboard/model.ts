import { z } from "zod";

export const stages = {
  inquiry: "Nowe zapytanie",
  quote: "Wycena",
  accepted: "Zaakceptowane",
  progress: "Realizacja",
  review: "Poprawki",
  completed: "Zakończone",
  archived: "Archiwum",
} as const;
export type Stage = keyof typeof stages;
export const packages = {
  start: { label: "Start", amount: 99000 },
  business: { label: "Biznes", amount: 199000 },
  landing: { label: "Landing", amount: 149000 },
  custom: { label: "Indywidualny", amount: 0 },
} as const;
export const money = (cents: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(
    cents / 100,
  );
export const dateLabel = (date?: string | null) =>
  date
    ? new Intl.DateTimeFormat("pl-PL", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Europe/Warsaw",
      }).format(new Date(date))
    : "Nie ustalono";
export const uuid = z.string().uuid();
export const text = (max = 200) => z.string().trim().max(max);
export const date = z.union([
  z.literal(""),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (v) =>
        !isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v,
      "Nieprawidłowa data",
    ),
]);
export const amount = z
  .string()
  .trim()
  .regex(
    /^\d{1,7}([.,]\d{1,2})?$/,
    "Wpisz kwotę z maksymalnie dwoma miejscami po przecinku",
  )
  .transform((v) => Math.round(Number(v.replace(",", ".")) * 100))
  .refine((v) => v <= 100000000, "Kwota przekracza limit");
export const clientSchema = z.object({
  name: text(120).min(2),
  company: text(160),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]),
  phone: text(40).regex(/^[+\d ()-]*$/),
  notes: text(5000),
});
export const projectSchema = z.object({
  title: text(160).min(3),
  client_id: uuid,
  package: z.enum(["start", "business", "landing", "custom"]),
  stage: z.enum([
    "inquiry",
    "quote",
    "accepted",
    "progress",
    "review",
    "completed",
    "archived",
  ]),
  amount,
  due_date: date,
  scope: text(12000),
  notes: text(12000),
  materials_url: z.union([
    z.literal(""),
    z
      .string()
      .url()
      .max(2000)
      .refine((v) => /^https?:\/\//.test(v), "Użyj linku http lub https"),
  ]),
});
export const briefQuestions = [
  [
    "business",
    "Czym zajmuje się Twoja firma?",
    "Oferta, odbiorcy i obszar działania.",
  ],
  [
    "goal",
    "Co ma zrobić odwiedzający?",
    "Np. zadzwonić, wysłać zapytanie lub zarezerwować termin.",
  ],
  [
    "package",
    "Jakiej strony potrzebujesz?",
    "Wizytówka, strona firmowa, landing lub do ustalenia.",
  ],
  [
    "scope",
    "Co musi znaleźć się na stronie?",
    "Sekcje, podstrony, języki, CMS i inne funkcje.",
  ],
  [
    "advantages",
    "Co wyróżnia Twoją ofertę?",
    "Konkretne zalety, realizacje i prawdziwe opinie.",
  ],
  [
    "materials",
    "Jakie materiały masz?",
    "Logo, zdjęcia i link do folderu. Nie przesyłaj haseł.",
  ],
  [
    "copy",
    "Kto przygotuje teksty?",
    "Dostarczę teksty / zlecę ich napisanie / do ustalenia.",
  ],
  [
    "style",
    "Jaki wygląd Ci odpowiada?",
    "Linki do inspiracji i to, czego chcesz uniknąć.",
  ],
  [
    "budget",
    "Jaki masz budżet i termin?",
    "Termin publikacji i dostępność materiałów.",
  ],
  [
    "setup",
    "Co z domeną, hostingiem i akceptacją?",
    "Co już masz i kto będzie zatwierdzał projekt?",
  ],
] as const;
export const briefSchema = z
  .object(Object.fromEntries(briefQuestions.map(([key]) => [key, text(3000)])))
  .refine(
    (v) =>
      typeof v.business === "string" &&
      v.business.length >= 3 &&
      typeof v.goal === "string" &&
      v.goal.length >= 3,
    "Opisz firmę i cel strony (minimum 3 znaki). Pozostałe pola możesz zostawić puste.",
  );
export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string;
};
export type Project = {
  id: string;
  client_id: string;
  title: string;
  package: keyof typeof packages;
  stage: Stage;
  amount: number;
  due_date: string | null;
  scope: string;
  notes: string;
  materials_url: string;
  source: string;
  created_at: string;
  updated_at: string;
};
export type Task = {
  id: string;
  project_id: string;
  title: string;
  due_date: string | null;
  done: boolean;
};
export type Payment = {
  id: string;
  project_id: string;
  label: string;
  amount: number;
  paid_at: string;
  created_at: string;
};
export type Offer = {
  id: string;
  project_id: string;
  number: string;
  title: string;
  scope: string;
  terms: string;
  amount: number;
  deposit_percent: number;
  valid_until: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  client_snapshot: Client;
  created_at: string;
};
export type Brief = {
  id: string;
  project_id: string;
  expires_at: string;
  revoked: boolean;
  submitted_at: string | null;
  answers: Record<string, string> | null;
  created_at: string;
};
export type ActionState = { error?: string; success?: string; link?: string };
export function totals(projects: Project[], payments: Payment[]) {
  const active = projects.filter((p) => p.stage !== "archived");
  const agreed = active.filter((p) =>
    ["accepted", "progress", "review", "completed"].includes(p.stage),
  );
  const sumPaid = (id: string) =>
    payments
      .filter((p) => p.project_id === id)
      .reduce((s, p) => s + p.amount, 0);
  return {
    pipeline: active
      .filter((p) => ["inquiry", "quote"].includes(p.stage))
      .reduce((s, p) => s + p.amount, 0),
    agreed: agreed.reduce((s, p) => s + p.amount, 0),
    paid: payments.reduce((s, p) => s + p.amount, 0),
    remaining: agreed.reduce(
      (s, p) => s + Math.max(0, p.amount - sumPaid(p.id)),
      0,
    ),
  };
}
