# Uruchomienie prywatnej pracowni

Panel: `/panel`. Obsługuje klientów, projekty, listę i tablicę etapów, zadania, notatki, link do materiałów, jednorazowy brief, oferty do wydruku/PDF, ręczne wpłaty i eksport JSON. Dane są zapisywane w Supabase, nie w localStorage ani plikach Vercela.

## 1. Projekt Supabase

Utwórz projekt w swoim koncie. Wybierz region Europe, zapisz silne hasło bazy, pozostaw Data API włączone. Wyłącz automatyczne udostępnianie nowych tabel, włącz automatyczne RLS. Migracja jawnie nadaje potrzebne uprawnienia i polityki.

Jeśli GitHub został połączony, sprawdź Project Settings → Integrations. Na czas ręcznej konfiguracji wyłącz „Deploy to production” oraz „Automatic branching”, ewentualnie odłącz integrację. Nie stosuj jednocześnie ręcznej migracji i automatycznej migracji z GitHuba. Samo połączenie nie wymaga tworzenia projektu od nowa.

## 2. Utworzenie bazy

W SQL Editor otwórz nową kartę, wklej CAŁĄ zawartość pliku `supabase/migrations/202609210001_dashboard.sql` i uruchom raz. Skrypt jest transakcją: błąd nie powinien pozostawić częściowo utworzonych tabel. Jeśli tabele `crm_*` już istnieją, sprawdź czy migracji nie wdrożyła integracja. Nie usuwaj danych i nie uruchamiaj skryptu ponownie w ciemno.

Następnie uruchom `supabase/migrations/202609210002_explicit_privileges.sql`. Ten drugi skrypt można uruchomić ponownie; jawnie ogranicza domyślne uprawnienia tabel.

Powstaje siedem tabel `crm_*`. Wszystkie mają RLS. Użytkownik anonimowy nie ma do nich dostępu. Uwierzytelniony użytkownik musi być wpisany do `crm_admins`; widzi wyłącznie własne rekordy. Relacje złożone blokują przypisanie danych do cudzego projektu.

## 3. Konto właściciela

1. Authentication → Users → Add user → Create new user.
2. Wpisz swój adres e-mail (np. contact@dorlowski.dev) i silne, unikalne hasło. Włącz potwierdzenie adresu, jeśli formularz oferuje „Auto Confirm User”.
3. Skopiuj UUID utworzonego użytkownika.
4. Authentication → Sign In / Providers (nazwy mogą się różnić): wyłącz publiczną rejestrację („Allow new users to sign up”). Logowanie e-mail/hasło pozostaje włączone.
5. W SQL Editor wykonaj poniższe, zastępując tekst prawdziwym UUID:

```sql
insert into public.crm_admins (user_id)
values ('TU_UUID_UZYTKOWNIKA')
on conflict do nothing;
```

Nie wpisuj tutaj identyfikatora konta GitHub ani organizacji. UUID musi pochodzić z Authentication → Users tego projektu. Włączenie konta w bazie i wskazanie UUID w aplikacji to dwa niezależne zabezpieczenia. Dodanie innego konta w Supabase nie daje mu automatycznie dostępu do aplikacji.

Odzyskanie hasła: przez administrację Supabase Auth. Panel celowo nie ma publicznej rejestracji ani samodzielnego resetowania hasła. Zabezpiecz też samo konto Supabase uwierzytelnianiem wieloskładnikowym.

## 4. Zmienne środowiskowe

Vercel → portfolio-web → Settings → Environment Variables, środowisko Production:

| Nazwa | Wartość | Typ |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Project URL z Connect / API settings | Config |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Publishable key (lub starszy anon key) | Config |
| SUPABASE_SERVICE_ROLE_KEY | Secret key lub legacy service_role key | Secret |
| DASHBOARD_ADMIN_USER_ID | UUID z punktu 3 | Config |
| NEXT_PUBLIC_SITE_URL | https://dorlowski.dev | Config |

Sekretu serwera i haseł nie wklejaj do czatu, repozytorium ani zmiennych z prefiksem NEXT_PUBLIC_. Klucz publishable/anon może być publiczny — dane chronią polityki RLS. Panel używa sesji w cookies HttpOnly, a tożsamość jest sprawdzana na serwerze.

Analogiczne wartości możesz dodać do ignorowanego `.env.local` podczas testów lokalnych. Nie zastępuj działających zmiennych SMTP i Turnstile. Do testów ustaw NEXT_PUBLIC_SITE_URL na faktyczny lokalny adres serwera; generowane linki briefów korzystają właśnie z tej wartości.

Po ustawieniu zmiennych trzeba wykonać nowe wdrożenie na Vercelu. Bez konfiguracji `/panel` pokazuje zamknięty ekran konfiguracji; nie ma demonstracyjnego konta ani furtki dostępu.

## 5. Sprawdzenie uruchomienia

1. Otwórz `/panel` w oknie prywatnym — powinno nastąpić przekierowanie na logowanie.
2. Zaloguj się kontem właściciela. Dodaj testowego klienta i projekt, zmień etap i odśwież stronę.
3. Dodaj zadanie, oznacz jako ukończone, dodaj wpłatę i sprawdź saldo. Są to ręczne wpisy, nie integracja z bankiem ani fakturowanie.
4. W projekcie utwórz link do briefu, skopiuj go od razu i otwórz w oknie prywatnym. Wypełnij i wyślij. Odpowiedzi powinny pojawić się w projekcie po odświeżeniu.
5. Ten sam link nie powinien przyjąć kolejnej odpowiedzi. Nowy link unieważnia wcześniejsze niewypełnione linki. Wysłane briefy pozostają w historii. Możesz też unieważnić link ręcznie.
6. Przygotuj ofertę. Uzupełnij realny termin, sposób rozliczenia i koszty utrzymania. Zapisz, a następnie wybierz Drukuj / zapisz PDF. Wyłącz nagłówki i stopki przeglądarki w oknie wydruku.
7. Zmiana danych projektu nie powinna zmienić zapisanej oferty. Status „zaakceptowana” to ręczna notatka, nie podpis klienta.
8. Pobierz eksport z ustawień i sprawdź, czy zawiera testowe dane. Eksport nie zawiera tokenów briefów ani haseł.
9. Wyślij pojedyncze testowe zapytanie z publicznego formularza. Sprawdź e-mail oraz nowy projekt z oznaczeniem „Formularz strony”.
10. Wyloguj się i upewnij się, że szczegóły projektu, oferty i eksport wymagają ponownego logowania. Usuń testowe dane.

Publiczny formularz zapisuje projekt po skutecznym wysłaniu e-maila. Awaria CRM nie zatrzymuje wiadomości: błąd `CRM_CAPTURE_FAILED` pojawi się w logach Vercela, a zapytanie należy wtedy dodać ręcznie z e-maila. Nie ma kolejki ponowień. Kolejne zapytanie tworzy osobny kontakt — istniejącego klienta można wybrać w edycji projektu i usunąć niepotrzebny duplikat.

## 6. Backup i utrzymanie

Eksport JSON jest ręczny. Nie zastępuje pełnego backupu bazy i nie ma automatycznego importu w interfejsie. Dane można odtworzyć skryptem administracyjnym w kolejności: klienci, projekty, zadania/wpłaty/oferty/briefy. Nowe linki briefów należy wygenerować ponownie. Eksport nie odtwarza użytkowników Auth ani uprawnień bazy.

Pełne kopie bazy konfiguruj osobno w Supabase albo poprzez `supabase db dump` na zaufanym urządzeniu i przechowuj je bezpiecznie. Wybierz częstotliwość adekwatną do liczby zmian i przetestuj odtworzenie. Nie zakładaj, że wybrany plan ma automatyczne backupy lub gwarantowany czas dostępności — sprawdź bieżący plan i dokumentację dostawcy.

Włącz obserwowanie błędów wdrożeń Vercela. Regularnie usuwaj niepotrzebne dane zgodnie z polityką prywatności. Linki briefów zawierają klucz dostępu — nie publikuj ich; nie dołączaj pełnych URL-i do analityki ani publicznych zgłoszeń błędów. Odpowiedzi są trzymane tylko w bazie, nie w localStorage klienta.

## Weryfikacja kodu

```sh
npm run lint
npm run build
node --test tests/contact.test.mjs tests/dashboard.test.mjs
```

Test SQL uruchamia migrację w lokalnym PostgreSQL przez PGlite i sprawdza role, RLS, obce rekordy, wygaśnięcie, unieważnianie oraz jednorazowość briefów. Nie łączy się z produkcyjną bazą. Konieczny jest również test z punktu 5 na rzeczywistym projekcie Supabase.

## Dokumentacja dostawcy

- https://supabase.com/docs/guides/auth/server-side/nextjs
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/deployment/branching/github-integration
- https://supabase.com/docs/guides/platform/backups
