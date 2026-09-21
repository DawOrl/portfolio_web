import { requireAdmin } from "@/lib/dashboard/server";
import { dashboardServiceConfigured } from "@/lib/dashboard/config";
export default async function SettingsPage() {
  const { user } = await requireAdmin();
  return (
    <>
      <header className="dash-heading">
        <div>
          <p className="dash-kicker">USTAWIENIA PRACOWNI</p>
          <h1>Dane pod kontrolą</h1>
          <p>Twoje konto, eksport i konfiguracja integracji.</p>
        </div>
      </header>
      <div className="dash-columns">
        <section className="dash-card">
          <h2>Konto właściciela</h2>
          <p>{user.email}</p>
          <p className="dash-muted">
            Panel nie udostępnia rejestracji. Dostęp ogranicza wskazany
            identyfikator właściciela i polityki dostępu w bazie.
          </p>
          <h3>Integracja zapytań i briefów</h3>
          <p
            className={
              dashboardServiceConfigured() ? "dash-success" : "dash-error"
            }
          >
            {dashboardServiceConfigured()
              ? "Klucz serwerowy jest ustawiony. Sprawdź działanie testowym briefem i zapytaniem."
              : "Brakuje klucza serwerowego Supabase. Briefy i automatyczny zapis zapytań nie będą działać."}
          </p>
          <p className="dash-muted">
            Jeśli zapis zapytania do bazy się nie powiedzie, wiadomość nadal
            trafia na e-mail. Błąd CRM_CAPTURE_FAILED pojawi się w logach
            Vercela — takie zapytanie dodaj ręcznie.
          </p>
        </section>
        <section className="dash-card">
          <h2>Eksport danych</h2>
          <p>
            Pobierz klientów, projekty, zadania, wpłaty, oferty i odpowiedzi z
            briefów w pliku JSON. Eksport nie zawiera haseł ani tokenów dostępu.
          </p>
          <a href="/api/panel/export" className="dash-button">
            Pobierz eksport JSON
          </a>
          <p className="dash-muted">
            Zapisuj eksport w bezpiecznym miejscu. To kopia danych biznesowych,
            nie pełny backup Supabase. Panel nie ma automatycznego importu;
            odtworzenie eksportu wymaga migracji przez administratora.
          </p>
          <h3>Kopie i porządkowanie</h3>
          <p className="dash-muted">
            Wykonuj eksport regularnie i przed usuwaniem danych. Kopie bazy i
            możliwość odtwarzania skonfiguruj osobno u dostawcy. Niepotrzebne
            projekty i kontakty możesz usunąć w ich kartach.
          </p>
        </section>
      </div>
    </>
  );
}
