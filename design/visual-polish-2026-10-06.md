# Dopracowanie portfolio z main · 6 października 2026

## Kierunek

Punktem wyjścia jest commit `de12f38` na main. Zachowujemy tożsamość portfolio Dawida: Montserrat, autorski znak do., przestrzenny monogram, osobisty portret, intro i karuzelę. Strona ma pomóc klientowi obejrzeć konkretne realizacje i rozpocząć rozmowę o projekcie.

Paleta: grafit `#1d1d1d`, powierzchnia `#252525`, krem `#f4f0eb`, bordo `#a00c30`, błękit `#9fc5d3`. Montserrat prowadzi nagłówki i treść, Georgia pozostaje istniejącym akcentem. Duże nagłówki wyrównane do lewej; informacje pomocnicze mają mniejszą skalę, ale pozostają czytelne.

Końcowe doprecyzowanie typografii: teksty wcześniej wyróżnione kursywą mają teraz prosty dziedziczony krój i kolor burgundowy. Dotyczy to nagłówków, intro, podpisów monogramu i usług oraz tekstowego SVG. Georgia pozostała jedynie w istniejących zwykłych tekstach ilustracji. Nagłówek usług otrzymał grafitową powierzchnię, a rozmiar kontaktu na telefonie dostosowano do szerszej typografii Montserrat. Kontrola 320/390 px potwierdziła brak przepełnienia; wszystkie wyróżnienia nagłówków mają `font-style: normal` i kolor `rgb(160, 12, 48)`.

Kompozycja: hero z osobną kolumną dla planszy monogramu, następnie istniejąca przestrzenna galeria. Rytm usług, portretu, procesu, cennika i kontaktu pozostaje rozpoznawalny. Na telefonie treść i działania poprzedzają planszę znaku.

Zgodnie z doprecyzowaniem właściciela podglądy komputerowy i mobilny w bibliotece są widoczne jednocześnie: telefon przy prawym górnym rogu ramki przeglądarki. Wszystkie screenshoty zachowują pełny kadr przez `object-fit: contain`. W karuzeli uruchamiany podgląd telefonu jest mniejszą ramką w rogu zamiast zasłaniać całą kartę. Dodatkowy duży blok TopAuto nad karuzelą został usunięty na prośbę właściciela, ponieważ powtarzał tę samą realizację.

```text
desktop                             telefon
nawigacja                           nawigacja
nagłówek          plansza do.        nagłówek
podpis            opis + kontakt    podpis / opis / kontakt
monogram 3D                         plansza do. / monogram 3D
przestrzenna karuzela               przestrzenna karuzela
```

## Referencje i decyzje

- [Dennis Snellenberg](https://dennissnellenberg.com/): skala tożsamości, wyraźne przejście do prac, spokojne podpisy. Prezentacja realizacji przez istniejącą karuzelę i bibliotekę.
- [Niccolò Miranda](https://www.niccolomiranda.com/): redakcyjna hierarchia i rytm. Lepsze proporcje nagłówków, opisów oraz marginesów; bez kopiowania papierowej stylistyki.
- [Henry Desroches](https://henry.codes/): własny charakter połączony z czytelnym katalogiem prac. Zachowanie monogramu i portretu przy prostszych tłach.
- [Rauno Freiberg](https://rauno.me/): oszczędna prezentacja tożsamości. Redukcja drobnych dekoracji, czytelne działania.

Sprawdzenie kierunku: nie dodajemy nowej palety, krojów, obcych zdjęć, statystyk ani fikcyjnych opinii. Podglądy korzystają z istniejących danych projektu. Bordo prowadzi kontakt, błękit oznacza szczegóły identyfikacji.

## Weryfikacja

- `npm run lint`, `npx tsc --noEmit` oraz końcowy `npm run build`: przeszły. Build generuje 19 stron wraz z istniejącymi trasami panelu i briefu.
- Strona główna: kontrola szerokości 320, 390, 820, 1024 i 1440 px. Szerokość dokumentu jest równa obszarowi strony; brak poziomego przepełnienia. Zmniejszono także kontur w sekcji kontaktu, który wcześniej wychodził poza tablet.
- Hero: pomiar tekstu trzech linii potwierdził, że mieszczą się w swoich kolumnach. Karta monogramu ma osobną kolumnę na desktopie i pozostaje pod działaniami na telefonie.
- Cennik: wszystkie trzy ceny mają tę samą pozycję pionową na desktopie i tablecie; na telefonie pakiety pozostają jeden pod drugim.
- Biblioteka: kontrola układu 320, 390, 640, 768 i 1440 px. Telefon i screenshot desktopowy mieszczą się w karcie; nie ma poziomego przepełnienia.
- Filtry: „Strona firmowa” pokazuje 2 projekty; „Wszystkie” pokazuje 8. Wybór przez Enter działa.
- Karuzela: następny projekt zmienia wybór na Bella Cucina; przycisk podglądu mobilnego ustawia `aria-pressed=true`.
- Menu mobilne: wybór sekcji zamyka menu; Escape zamyka je i przywraca fokus do przycisku otwierania.
- FAQ: pierwszy element otwiera się po wybraniu pytania.
- Pusty formularz: wyświetla błędy imienia, danych kontaktowych i opisu projektu. Nie wysyłano wiadomości.
- Konsola sprawdzonego podglądu: brak błędów.
- Istniejąca obsługa ograniczonego ruchu zachowana; nowe przejścia mają wariant `prefers-reduced-motion`. Sprawdzono kod, bez emulacji preferencji systemowej.

Zastosowane skille: redesign-existing-projects, frontend-design oraz Browser. Zmiany zapisane w katalogu roboczym main, bez commita i publikacji.

## Doprecyzowanie: navbar i scrollbar

Navbar pozostaje w normalnym układzie strony i znika wraz z przewijaniem. Usunięto pozycjonowanie sticky oraz nadmiarowe odstępy kotwic potrzebne wcześniej pod przyklejonym nagłówkiem. Cel `#top` znajduje się przed nawigacją, dzięki czemu link „Na górę” pokazuje ją ponownie.

Natywny scrollbar ma grafitową ścieżkę, zaokrąglony bordowy uchwyt, jaśniejszy hover i błękitny stan przeciągania. Reguły WebKit określają szerokość 12 px z 3 px marginesem wokół uchwytu. Przeglądarki bez tego selektora otrzymują wariant `scrollbar-color` / `scrollbar-width`; ukryty scrollbar karuzeli pozostaje zachowany.

Sprawdzono desktop 1280 px i telefon 390 px: navbar przewija się poza ekran, link powrotu przywraca początek strony, mobilne menu otwiera się i zamyka po wybraniu sekcji. Nie ma poziomego przepełnienia. Potwierdzono w przeglądarce szerokość scrollbara 12 px i nowy kolor uchwytu. `npm run lint`, `git diff --check` oraz produkcyjny `npm run build` przeszły. Wariant dla przeglądarek bez selektorów WebKit sprawdzono w kodzie.

## Pełne dopracowanie wizualne navbara

Kierunek: spokojna nawigacja autorskiego portfolio, wyrównana do osi `.shell` i oddzielona od hero jedną linią. Paleta i Montserrat pozostają zgodne z resztą strony. Zachowany przestrzenny znak ma mniejszą głębokość; czytelniejsze nazwisko i podpis tworzą jedną grupę. Linki i kontakt są po prawej, z regularnym rytmem i bordowym podkreśleniem aktywnej pozycji. Przycisk kontaktu ma proporcje dopasowane do nawigacji.

Na telefonie znak i nazwisko są po lewej, a przycisk menu o polu 44 × 44 px po prawej. Panel pod nagłówkiem mieści pięć prostych linków i wyróżniony kontakt; usunięto dekoracyjne numery. Na tablecie przycisk menu zachowuje podpis. Wszystkie reguły znaku i typografii są ograniczone do nagłówka.

```text
desktop:  znak + nazwisko             realizacje / usługi / o mnie / cennik   kontakt
          ─────────────────────────────────────────────────────────────────────────
telefon:  znak + nazwisko                                            przycisk menu
          ─────────────────────────────────────────────────────────────────────────
          panel: linki do sekcji + kontakt
```

Przegląd kierunku: hierarchia wynika z rzeczywistych działań — tożsamość, nawigacja, kontakt. Nie dodano nowych metadanych ani dekoracji. Wyrównanie z hero oraz monogram zachowują charakter tego portfolio; znikanie przy scrollu pozostaje bez zmian.

Weryfikacja końcowego navbara: 320, 390, 820, 1000, 1001, 1101 i 1440 px. Osie nagłówka pokrywają się z hero, grupy linków i działań nie nachodzą na siebie. Na telefonie panel mieści się w ekranie, wybór sekcji zamyka menu, a Escape przywraca fokus do przycisku. W bibliotece link „Realizacje” ma aktywny stan i bordowe podkreślenie. Nagłówek przewija się poza ekran. Podczas kontroli 320 px zmniejszono odstęp między kolumnami stopki, usuwając wcześniejsze przepełnienie o 1 px. Interakcje ruchowe respektują istniejące ustawienie ograniczenia ruchu.

Po usunięciu dodatkowej realizacji sekcja `#realizacje` zawiera nagłówek i jedną karuzelę. Usunięto komponent `FeaturedProject`, jego arkusz CSS oraz import i wybór projektu z głównej strony. Biblioteka nadal korzysta z jednoczesnego podglądu desktop/mobile.

## Motion GSAP i obsługa karuzeli

Zastosowane skille: GSAP, gsap-react, gsap-core, gsap-timeline, gsap-scrolltrigger oraz animate. Implementację oparto na istniejącym GSAP i Three.js, bez nowych zależności. Sprawdzono [zalecenia React](https://gsap.com/resources/React/), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) i [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

- Hero: sekwencja wejścia wierszy nagłówka, danych i planszy znaku. Wejście, scroll oraz hover mają osobnych właścicieli transformacji. Fokus kończy wejście elementu, dzięki czemu linki i karty pozostają użyteczne.
- Monogram: przewijanie obraca dodatkową grupę Three.js, niezależnie od ruchu sterowanego kursorem. Scena nadal renderuje na żądanie i wstrzymuje pracę poza ekranem.
- Typografia: na desktopie „Pomysł. Forma. Strona.” składa się w krótkiej sekwencji przypiętej do scrolla. Pierwsze słowo jest czytelne od początku. Na telefonie pozostaje zwykłe wejście bez pinowania.
- Portret: imię i nazwisko przesuwają się w przeciwnych kierunkach, a pojedynczy portret porusza się delikatnie w swoim kadrze. Karuzela, kontakt i stopka otrzymały osobne wejścia zgodne ze skalą sekcji.

Strzałki znajdują się po bokach sceny, a licznik numeryczny pod segmentowym paskiem. Usunięto zdanie o najechaniu na środkową kartę i stały blok opisu pod galerią. Kliknięcie dowolnej karty wybiera projekt i otwiera panel z prawej strony z podglądem desktopowym i mobilnym, kategorią, nazwą, opisem oraz linkiem do realizacji. Panel używa natywnego dialogu i portalu poza transformowanymi elementami; obsługuje Escape, zamknięcie przyciskiem i tłem oraz przywrócenie fokusu. Mobilny podgląd w samej karcie nadal można uruchomić przyciskiem.

Animacje są ograniczone przez `prefers-reduced-motion`, a `matchMedia` i konteksty GSAP przywracają style po zmianie breakpointu lub odmontowaniu. Wersja bez animacji zachowuje czytelną kompozycję. Link „Na górę” przewija do navbara również wtedy, gdy adres już kończy się na `#top`.

Weryfikacja: rzeczywista sekwencja hero, obrót monogramu i progres typografii sprawdzone w przeglądarce. Na desktopie pin trzyma pozycję, a po ukończeniu wszystkie trzy słowa są widoczne; link prowadzi do procesu z odstępem 24 px. Na 320/390 px pin nie występuje, dokument nie ma poziomego przepełnienia, a strzałki nie zasłaniają aktywnej karty. Potwierdzono zmianę projektu klawiaturą. Kliknięcie bocznej karty Bella Cucina otwiera właściwy opis; panel mieści się w 320 px, Escape i tło zamykają go, fokus wraca do karty. Link prowadzi do case study i usuwa dialog oraz blokadę przewijania. Preferencję ograniczenia ruchu sprawdzono w kodzie; nie emulowano ustawienia systemowego.

Końcowe `npm run lint`, `npx tsc --noEmit`, `git diff --check` oraz `npm run build` przeszły po wszystkich poprawkach motion, panelu i typografii. Konsola sprawdzonego podglądu nie zawiera błędów. Zmiany pozostają lokalne, bez commita i publikacji.

## Spójny ruch całego portfolio i portret bez robota

Wszystkie sekcje otrzymały wspólny rytm wejścia: nagłówki, lista usług, opis podejścia, kroki procesu, pakiety cenowe i pytania FAQ. Ruch odbywa się głównie przez transformację i przezroczystość; wejścia kończą się po pierwszym przewinięciu. Fokus na działaniu kończy animację jego rodzica, więc obsługa klawiaturą nie czeka na efekt wizualny.

`PortfolioFlow` prowadzi cienką ścieżkę w prawym marginesie przez dziesięć rozdziałów. Znacznik porusza się zgodnie z pozycją czytania, obraca przy zmianie kierunku scrolla i wskazuje aktualny rozdział. Pozycje uwzględniają spacer przypiętej typografii oraz zmianę wysokości po rozwinięciu FAQ. Punkty SVG są mierzone tylko przy odświeżeniu geometrii, a podczas scrolla używana jest ich zapisana próbka. Ścieżka nie przechwytuje interakcji. Na ekranach do 760 px, przy ograniczeniu ruchu i wymuszonych kolorach znika.

Usunięto wariant robota, przełącznik i maskę portretu. Przygotowano odrestaurowany przezroczysty portret oraz eksport 3072 × 3840; strona korzysta z responsywnego WebP w jakości 95. Źródło, sposób powiększenia i pełny prompt zapisano w [dokumencie portretu](./portrait-restoration-2026-10-06.md). Usunięto też ozdobny em dash przed „coś razem.”.

Zdiagnozowany `Maximum call stack size exceeded` wynikał z cyklu kontekstów GSAP: callback końca intro rejestrował kontekst rodzica we własnym kontekście potomnym. `rootContext.ignore(finish)` izoluje wywołanie zakończenia sekwencji i pozwala bezpiecznie odwrócić style. Pełne odświeżenie usuwa stary cykl pozostawiony w sesji HMR.

Kontrola nowej ścieżki: 761, 1440 i 3840 px, brak poziomego przepełnienia, poprawna pozycja przy pinie i zmiana kierunku po scrollu w górę. Rozwinięcie i zwinięcie FAQ aktualizuje wysokość SVG wraz z main. Na 320/390 px ścieżka i pin są wyłączone, portret pozostaje pojedynczym obrazem, a nagłówek kontaktu nie ma em dash. Preferencje systemowe sprawdzono w kodzie. `npm run lint`, `npx tsc --noEmit`, `git diff --check` i build 19 tras przeszły po integracji.

Po pełnym odświeżeniu dwukrotnie odtworzono całą sekwencję intro, następnie trzecią przerwano przez Escape. Każde zakończenie przywracało przewijanie i fokus; pin nie dublował się, a ścieżka pozostawała aktywna. Zmiana projektu strzałką i otwarcie panelu Bella Cucina działały. Przejście do case study usunęło dialog, ścieżkę i spacer GSAP, przywracając przewijanie. Powrót na portfolio ponownie utworzył jedną ścieżkę i jeden pin. Od początku końcowego sprawdzenia konsola nie zapisała nowych błędów ani ostrzeżeń.
