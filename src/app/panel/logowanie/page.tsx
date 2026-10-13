import Link from "next/link";
import { dashboardConfigured } from "@/lib/dashboard/config";
import { login } from "@/lib/dashboard/actions";
import { ActionForm } from "@/components/dashboard/forms";
import { BrandMark } from "@/components/ui/brand-mark";
export default function LoginPage() {
  const ready = dashboardConfigured();
  return (
    <main id="main-content" className="dash-login">
      <section className="dash-login-intro">
        <Link href="/" className="dash-brand">
          <span className="dash-brand-mark" aria-hidden="true">
            <BrandMark />
          </span>
          <span>
            DAWID ORŁOWSKI<small>PRYWATNA PRACOWNIA</small>
          </span>
        </Link>
        <p className="dash-kicker">DOBRZE CIĘ WIDZIEĆ</p>
        <h1>
          Twoje projekty.
          <br />
          <em>W jednym miejscu.</em>
        </h1>
        <p>
          Zlecenia, klienci i ustalenia - od pierwszego zapytania do publikacji.
        </p>
      </section>
      <section
        className="dash-card dash-login-card"
        aria-labelledby="login-heading"
      >
        <p className="dash-kicker">DOSTĘP WŁAŚCICIELA</p>
        <h2 id="login-heading">
          {ready ? "Zaloguj się" : "Panel czeka na konfigurację"}
        </h2>
        {ready ? (
          <>
            <ActionForm action={login} label="Wejdź do pracowni">
              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="username"
                />
              </label>
              <label>
                Hasło
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  maxLength={128}
                  autoComplete="current-password"
                />
              </label>
            </ActionForm>
            <p className="dash-muted">
              Dostęp ma wyłącznie wskazane konto administratora. Odzyskanie
              dostępu odbywa się przez panel administracyjny Supabase.
            </p>
          </>
        ) : (
          <>
            <p>
              Po podłączeniu bazy i konta właściciela pojawi się tutaj
              logowanie. Dane klientów nie są jeszcze przyjmowane przez panel.
            </p>
            <Link className="dash-button secondary" href="/">
              Wróć do portfolio
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
