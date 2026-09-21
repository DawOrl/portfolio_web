"use client";
export default function PanelError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="dashboard-root dash-error-page">
      <h1>Nie udało się wczytać panelu</h1>
      <p>
        Dane nie zostały zastąpione pustą listą. Sprawdź połączenie, migrację
        bazy i konfigurację administratora.
      </p>
      <button className="dash-button" onClick={reset}>
        Spróbuj ponownie
      </button>
    </main>
  );
}
