/** Map database codes to safe diagnostics; never expose SQL, records or provider details. */
export function databaseErrorMessage(error: unknown) {
  const code =
    error && typeof error === "object" && "code" in error
      ? String(error.code)
      : "";
  switch (code) {
    case "42501":
      return "Baza odrzuciła zapis z powodu uprawnień. Sprawdź, czy UID zalogowanego konta jest w public.crm_admins i czy wykonano oba skrypty konfiguracji. Nie wyłączaj RLS.";
    case "23505":
      return "Taki rekord już istnieje. Jeśli zapisujesz ofertę, użyj nowego, unikalnego numeru.";
    case "23503":
      return "Nie można wykonać operacji z powodu powiązanych danych. Sprawdź klienta i projekt; przed usunięciem klienta usuń jego projekty.";
    case "42P01":
    case "PGRST205":
    case "PGRST202":
      return "W bazie brakuje tabeli lub funkcji panelu. Sprawdź, czy migracje zostały uruchomione w projekcie wskazanym w Vercelu.";
    case "PGRST301":
    case "PGRST303":
      return "Sesja wygasła. Wyloguj się i zaloguj ponownie.";
    default:
      return "Nie udało się zapisać danych. Zachowaliśmy wpisane wartości — sprawdź połączenie i spróbuj ponownie.";
  }
}
