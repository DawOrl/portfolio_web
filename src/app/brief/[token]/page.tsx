import Link from "next/link";
import type { Metadata } from "next";
import { briefAvailable } from "@/lib/dashboard/brief";
import { BriefForm } from "@/components/dashboard/brief-form";
import "@/components/dashboard/dashboard.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Brief projektu",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  referrer: "no-referrer",
  alternates: { canonical: null },
};
export default async function BriefPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  let available = false;
  let failed = false;
  try {
    available = await briefAvailable(token);
  } catch {
    failed = true;
  }
  return (
    <div className="dashboard-root">
      <main id="main-content" className="dash-brief">
        <Link href="/" className="dash-brand">
          <b>
            do<span>.</span>
          </b>
          <span>
            DAWID ORŁOWSKI<small>DESIGN & DEVELOPMENT</small>
          </span>
        </Link>
        <header className="dash-heading">
          <div>
            <p className="dash-kicker">ZACZNIJMY OD TWOJEJ FIRMY</p>
            <h1>
              Opowiedz mi
              <br />
              <em>o swoim projekcie.</em>
            </h1>
            <p>
              Krótkie odpowiedzi pomogą mi przygotować zakres i wycenę. Jeśli
              czegoś jeszcze nie wiesz, wpisz „do ustalenia”. Pola oznaczone *
              są wymagane.
            </p>
          </div>
        </header>
        {available ? (
          <BriefForm token={token} />
        ) : (
          <section className="dash-card">
            <h2>
              {failed
                ? "Formularz chwilowo niedostępny"
                : "Ten link nie jest już aktywny"}
            </h2>
            <p>
              {failed
                ? "Spróbuj ponownie za chwilę. Jeśli problem się powtórzy, skontaktuj się ze mną."
                : "Link mógł wygasnąć, zostać zastąpiony nowym albo brief został już wysłany."}
            </p>
            <a href="mailto:contact@dorlowski.dev" className="dash-text-link">
              contact@dorlowski.dev ↗
            </a>
          </section>
        )}
        <footer>
          Dawid Orłowski ·{" "}
          <a href="/polityka-prywatnosci">Polityka prywatności</a>
        </footer>
      </main>
    </div>
  );
}
