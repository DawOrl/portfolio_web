# Playbook: start dorlowski.dev w social mediach

Tydzień 0 (14-18.10.2026): zakładasz konta. Potem 4 tygodnie publikacji: od poniedziałku 19.10 do niedzieli 15.11.2026. Kanały: strona na Facebooku, konto firmowe na Instagramie i ogłoszenie na OLX. Bez płatnych reklam.

Ten plik mówi, **co** robić i **kiedy**. Gotowe teksty są w `tresci/kampania.json`, grafiki w `grafiki/`, rolki w `wideo/`. Teksty do kont i szablony wiadomości są też na końcu tego pliku (Załącznik A i B), gotowe do skopiowania.

## Jak z tego korzystać

1. W tygodniu 0 przejdź listę z rozdziału 3, punkt po punkcie.
2. Od 19.10 zaglądaj do kalendarza (rozdział 5): co dziś publikujesz i jaką wrzucasz relację.
3. Codziennie 20-30 minut rutyny (rozdział 6). W niedzielę 15 minut przeglądu (rozdział 1).

**Jak wyciągnąć tekst posta z pliku JSON.** W terminalu, w katalogu repozytorium (zamiast `P04` wpisz numer posta):

```bash
python3 -c "import json,sys; d=json.load(open('design/marketing/2026-10-19-start/tresci/kampania.json')); c={p['id']:p for p in d['posts']}[sys.argv[1]]['copy']; print('FACEBOOK:\n'+c['facebook']+'\n\nINSTAGRAM:\n'+c['instagram']+'\n\n'+' '.join(c['hashtags'])+'\n\nPIERWSZY KOMENTARZ: '+c['firstComment']+'\nALT: '+c['alt'])" P04
```

Gdzie co jest w `kampania.json`:

| Czego szukasz | Gdzie w pliku |
| --- | --- |
| Tekst posta na Facebooka i Instagram | `posts → copy → facebook`, `instagram` |
| Hashtagi (tylko Instagram) | `posts → copy → hashtags` |
| Pierwszy komentarz z linkiem (Facebook) | `posts → copy → firstComment` |
| Tekst alternatywny | `posts → copy → alt` oraz `slides → alt` dla każdego slajdu |
| Teksty na grafikach | `posts → slides` (eyebrow, title, body, items, caption) |
| Rolki: napisy, okładka, opis | `reels` |
| Relacje | `stories` |
| Bio, opisy, OLX | `setup` (i Załącznik A) |
| Szablony wiadomości | `templates` (i Załącznik B) |

W tytułach na grafikach `*słowo*` to znacznik dla grafika (to słowo jest w kolorze akcentu). W postach go nie ma.

## 1. Cel i jak mierzymy

**Cel główny: rozmowy z firmami o konkretnej stronie.** Polubienia są miłe, ale liczą się wiadomości i wysłane wyceny.

Co jest realne na start od zera, bez reklam:

- **To, na co masz pełny wpływ (prawdziwy cel tych 4 tygodni):** 13 postów i około 20 relacji opublikowanych zgodnie z planem, rutyna co najmniej 5 dni w tygodniu, aktywne ogłoszenie OLX przez cały miesiąc, 10-20 osobistych wiadomości do znajomych.
- **Wynik, który uznamy za udany start:** 3-5 rozmów o konkretnej stronie i 1-2 wysłane wyceny. To cel roboczy, nie prognoza.
- **Jeśli po 4 tygodniach nie będzie ani jednej rozmowy,** to nie porażka, tylko sygnał: więcej czasu na grupy i polecenia (rozdział 4), mniej na dopieszczanie postów.

**Ważne: dorlowski.dev nie ma analityki** (świadomie, tak mówi polityka prywatności strony). Wejść na stronę nie sprawdzisz w Google Analytics. Liczymy je pośrednio, z kliknięć w link w statystykach Facebooka i Instagrama. Do tego w każdej rozmowie pytaj „skąd o mnie wiesz?” i zapisuj odpowiedź.

| Liczba | Gdzie ją znajdziesz |
| --- | --- |
| Obserwujący, zasięg i kliknięcia w link na Facebooku | Meta Business Suite → Statystyki |
| Obserwujący, konta, do których dotarłeś, kliknięcia w link w bio | Instagram → Twój profil → Panel profesjonalny → Statystyki |
| Wyświetlenia i wiadomości z OLX | OLX → Twoje konto → Ogłoszenia → statystyki ogłoszenia |
| Wiadomości, rozmowy, wyceny | ręcznie, w Twoim panelu na dorlowski.dev: klient + projekt, etap „Nowe zapytanie”, potem „Wycena”. W notatkach wpisz źródło (FB, IG, OLX, grupa, polecenie). |

### Przegląd tygodnia (niedziela, 15 minut)

| Tydzień | Obserwujący FB / IG | Zasięg FB / IG | Kliknięcia w link (FB + IG) | Wyświetlenia OLX | Wiadomości (FB / IG / OLX / mail / tel.) | Rozmowy o projekcie | Wysłane wyceny | Najlepszy post i dlaczego | Jedna zmiana na kolejny tydzień |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 (19-25.10) | | | | | | | | | |
| 2 (26.10-1.11) | | | | | | | | | |
| 3 (2-8.11) | | | | | | | | | |
| 4 (9-15.11) | | | | | | | | | |

Trzy pytania na przegląd:

1. Co przyniosło rozmowę albo wiadomość?
2. Co zajęło najwięcej czasu, a nic nie dało?
3. Jaką **jedną** rzecz zmieniam w przyszłym tygodniu?

## 2. Do kogo mówimy i co mówimy

**Najpierw:** małe, lokalne firmy z Krakowa i Małopolski, które mają tylko profil na Facebooku lub Instagramie, stronę sprzed lat albo nic. Właściciel sam decyduje i sam odpisuje.

**Potem:** firmy usługowe z całej Polski (pracujesz zdalnie), zwłaszcza te, które dostają dużo pytań „ile to kosztuje?”.

Branże w tej kolejności, bo do nich masz gotowe przykłady:

| Branża | Co im pokazujesz | Pakiet na start |
| --- | --- | --- |
| Warsztaty, serwisy, usługi lokalne | TopAuto Serwis (realizacja dla klienta) | Start albo Biznes |
| Gastronomia: restauracje, kawiarnie, bistro | Bella Cucina (demo) | Start albo Biznes, rezerwacje wyceniane osobno |
| Beauty: fryzjer, barber, kosmetyczka | Glow Studio (demo) | Biznes, rezerwacje wyceniane osobno |
| Usługi z wyceną: remonty, fotowoltaika, instalacje | EkoSolar i Kalkulator wyceny (demo) | Landing, automatyzacje wyceniane indywidualnie |
| Fotografowie i twórcy | Lena Czarnecka (demo) | Start albo Biznes |
| Małe sklepy, lokalne marki | Craft Coffee (demo) | wycena indywidualna |

**Przekaz w jednym zdaniu:** projektuję i koduję strony dla małych firm; rozmawiasz ze mną od pierwszej wiadomości do publikacji, a cenę i termin znasz przed startem.

Trzy rzeczy, które powtarzamy (bez przechwałek):

1. Jedna osoba od rozmowy do publikacji.
2. Jawny cennik od 990 zł i bezpłatna wycena z pełną kwotą przed startem.
3. Po rozliczeniu kod i strona należą do klienta. Każda strona działa na telefonie i ma podstawy SEO.

Podpis marki, który wolno cytować: „Dobry design. Jeszcze lepsza strona.”

**Konkurencja na OLX:** w kategorii „Tworzenie stron www” było 13.10.2026 kilkaset ogłoszeń, często z podobnymi cenami (np. „990 zł, gotowa w 5 dni”). Nie ścigamy się ceną. Wyróżnia Cię konkret: jawny zakres, rozmowa z jedną osobą i kod, który zostaje u klienta.

**Zasady, których pilnujemy w każdym tekście:** demo zawsze podpisane jako „projekt autorski (demo)”, TopAuto to jedyna realizacja dla klienta, ceny zawsze z „od”, żadnych wymyślonych wyników, opinii, rabatów ani terminów „tylko do piątku”.

## 3. Tydzień 0: ustawienie kont (14-18.10)

### Środa 14.10: Facebook (około 45 minut)

- [ ] Włącz logowanie dwuetapowe na prywatnym koncie Facebooka (Ustawienia → Centrum kont → Hasło i zabezpieczenia). Strona firmowa jest tak bezpieczna jak Twoje prywatne konto.
- [ ] Utwórz stronę: Menu → Strony → Utwórz nową stronę. Nazwa, kategoria i wstęp: Załącznik A.
- [ ] Zdjęcie profilowe `grafiki/profil.png` (portret: do twarzy pisze się chętniej niż do logo) i okładka `grafiki/okladka-fb.png`.
- [ ] Dane kontaktowe: strona, e-mail, telefon. Lokalizacja: tylko Kraków, bez adresu domowego.
- [ ] Nazwa użytkownika (adres strony), przycisk „Wyślij wiadomość”, opis szczegółowy i usługi: Załącznik A.

### Czwartek 15.10: Instagram (około 45 minut)

- [ ] W aplikacji Instagram: Twój profil → nazwa konta u góry → Dodaj konto → Utwórz nowe konto. Nie przerabiaj prywatnego konta.
- [ ] Nazwa użytkownika z listy w Załączniku A (@dorlowski jest zajęte).
- [ ] Ustawienia → Typ konta i narzędzia → Przełącz na konto profesjonalne → **Firma**. Kategoria: Załącznik A.
- [ ] Edytuj profil: pole „Imię i nazwisko”, bio, linki, przyciski kontaktu (Załącznik A). Zdjęcie to samo co na Facebooku.
- [ ] Włącz logowanie dwuetapowe na Instagramie.
- [ ] Połącz Instagram ze stroną na Facebooku: w Meta Business Suite (business.facebook.com albo aplikacja Meta Business Suite) → Ustawienia → Konta → Konta na Instagramie → Połącz. Inna droga: w Instagramie Edytuj profil → Strona → Połącz.
- [ ] Sprawdź w Meta Business Suite, że u góry widać oba konta: stronę na Facebooku i Instagram.

### Piątek 16.10: wiadomości i OLX (około 60 minut)

- [ ] Meta Business Suite → Skrzynka odbiorcza → Automatyzacje: powitanie, natychmiastowa odpowiedź i 3 częste pytania (Załącznik A). Ustaw je dla Messengera i Instagrama.
- [ ] OLX: dodaj ogłoszenie (Załącznik A: tytuł, kategoria, opis, 5 zdjęć w podanej kolejności).
- [ ] **Przed publikacją na OLX sprawdź dwie rzeczy:** dokładną ścieżkę kategorii i opłatę. W kategorii Usługi OLX pobiera opłatę za samo wystawienie ogłoszenia (ceny są zmienne, kwotę zobaczysz w formularzu). To jedyny płatny element publikacji w tej kampanii (poza budżetem na grafiki w fal.ai). Nie dokupuj promowania.
- [ ] Wpisz do kalendarza datę wygaśnięcia ogłoszenia (zwykle 30 dni, czyli około 15.11).

### Sobota 17.10: plan tygodnia 1 (około 45 minut)

- [ ] Zaplanuj w Meta Business Suite: P01 (19.10, 18:00) i P03 (23.10, 18:00), na Facebooka i Instagram jednocześnie (rozdział 8).
- [ ] Rolkę R1 przygotuj w aplikacji Instagram z muzyką z biblioteki i zaplanuj na 21.10, 18:00, z włączonym udostępnianiem na Facebooku (rozdział 9).
- [ ] Z prywatnego profilu dołącz do 5-8 grup z rozdziału 4. Przeczytaj zasady każdej grupy i zapisz, kiedy i gdzie wolno się promować.

### Niedziela 18.10: test i porządki (około 30 minut)

- [ ] Wrzuć 5 relacji startowych i dodaj każdą do wyróżnionych z okładką `grafiki/H1.png` ... `H5.png` (szczegóły w Załączniku A). Dzięki temu profil nie wygląda na pusty.
- [ ] Poproś kogoś bliskiego, żeby napisał do strony na Facebooku i do konta na Instagramie. Sprawdź, czy działają automatyczne odpowiedzi.
- [ ] Kliknij wszystkie linki: w bio, na stronie na Facebooku i w OLX.
- [ ] Spisz 10-20 osób, do których napiszesz osobiście 24.10 (znajomi z firmami, rodzina, byli współpracownicy).

Google (Profil Firmy w Google) świadomie pomijamy w tym planie.

## 4. Gdzie publikować poza swoimi profilami

Nowy profil ma prawie zerowy zasięg. Pierwsze rozmowy najczęściej przychodzą z ludzi, którzy Cię znają, i z grup, w których ktoś akurat szuka pomocy. Dlatego grupy i polecenia są tu ważniejsze niż same posty.

### Grupy na Facebooku: zasady

- **Działasz z prywatnego profilu.** Ludzie ufają osobie, nie stronie. W wielu grupach strona i tak nie może pisać.
- **Najpierw zasady grupy.** Szukasz trzech rzeczy: czy wolno się reklamować, czy jest wątek lub dzień na promocję, czy wolno wstawiać linki.
- **Najpierw pomoc, potem oferta.** Na jeden wpis o sobie przypada co najmniej kilka pomocnych komentarzy bez linku.
- **Limit:** jedno przedstawienie się w grupie na start, potem najwyżej jeden wpis promocyjny w grupie na tydzień i tylko tam, gdzie wolno. Ten sam tekst nie trafia do wielu grup jednego dnia (Facebook traktuje to jak spam i może zablokować konto).
- **Ujawniaj, że to Ty.** Gdy polecasz siebie, pisz wprost: „sam robię strony, więc nie jestem neutralny”.
- **Demo zawsze jako demo.** Udostępniając Bella Cucina czy Glow Studio, dopisz „projekt autorski (demo)”.
- **Nie piszesz prywatnie do ludzi z grupy bez ich prośby.** Jeśli ktoś napisze „poproszę na priv”, wtedy tak.

### Grupy, które znalazłem (sprawdzone 13.10.2026)

„Istnieje” znaczy, że pod tym adresem jest grupa o tej nazwie. Nie da się bez logowania sprawdzić liczby członków, aktywności ani zasad: zrób to sam, zanim cokolwiek napiszesz.

| Grupa | Link | Dla kogo | Co tam robić | Pewność |
| --- | --- | --- | --- | --- |
| Biznes Kraków | facebook.com/groups/biznesKrakow | przedsiębiorcy z Krakowa | przedstawienie się, pomocne komentarze | istnieje; aktywność i zasady do weryfikacji |
| Firmy Kraków | facebook.com/groups/firmykrakow | lokalne firmy | przedstawienie się, promocja tylko jeśli dozwolona | istnieje; do weryfikacji |
| Ogłoszenia Kraków | facebook.com/groups/ogloszeniakrakow | lokalne ogłoszenia | krótkie ogłoszenie usług raz na tydzień, jeśli zasady pozwalają | istnieje; do weryfikacji |
| Gastronomia Pomoc Kraków - Porady, Rekomendacje, Praca, Sprzęt | facebook.com/groups/gastronomiakrakow | branża gastronomiczna w Krakowie | pomocne odpowiedzi o stronach lokali, P08 tylko jeśli wolno | istnieje; do weryfikacji. Najbardziej trafna grupa branżowa |
| Stowarzyszenie „Przyszłość Dla Gastronomii” - szukamy rozwiązań | facebook.com/groups/PrzyszloscDlaGastronomii | gastronomia w całej Polsce | czytanie, pomocne komentarze | istnieje; aktywność do weryfikacji (grupa powstała w 2020) |
| Przygody Przedsiębiorców (Biznes i Wideomarketing) | facebook.com/groups/przygodyprzedsiebiorcow | przedsiębiorcy w całej Polsce | pomocne komentarze w wątkach o stronach | istnieje; do weryfikacji |
| Biznesowo | facebook.com/groups/707966949544394 | przedsiębiorcy w całej Polsce (w 2020 pod nazwą „Rozmowy o działalności gospodarczej”) | pomocne komentarze | istnieje; charakter grupy do weryfikacji |
| Krakowskie wieści spożywcze | facebook.com/groups/jedzeniewkrakowie | miłośnicy jedzenia w Krakowie | tylko obserwacja: posty o nowych lokalach to sygnał, kto może potrzebować strony. Nie promuj się tam | istnieje |
| OMGKRK | facebook.com/groups/omgkrk | krakowska społeczność startupowa, głównie po angielsku | niski priorytet | istnieje |
| Professionals in Krakow / Krakow Expats | facebook.com/groups/professionalsinkrakow, facebook.com/groups/thekrakowexpats | obcokrajowcy w Krakowie, w tym prowadzący firmy | tylko jeśli chcesz obsługiwać klientów po angielsku | istnieją |
| Krakowska Gastronomia | facebook.com/groups/400514880141834 | właściciele lokali i dostawcy (wg artykułu z 2018) | | **nie udało się potwierdzić**: do weryfikacji |
| Kraków - sorry, że nie w temacie | facebook.com/groups/sorrykrakow | ogólna grupa krakowska (wg artykułu z 2018) | | **nie udało się potwierdzić**: do weryfikacji |

Nie dla Ciebie: grupy dla marketerów i programistów (tam są inni wykonawcy, nie klienci) oraz Beauty Razem (płatne członkostwo tylko dla branży beauty). Poza Facebookiem są też organizacje z darmowymi lub tanimi spotkaniami dla przedsiębiorców (np. Punkt Obsługi Przedsiębiorcy Urzędu Miasta Krakowa, Team Kraków, Krak-Business). To opcja na miesiąc 2.

### Jak znaleźć kolejne grupy (10 minut)

W wyszukiwarce Facebooka wpisz frazę i wybierz filtr „Grupy”:

- ogólne: „przedsiębiorcy Kraków”, „biznes Kraków”, „firmy Małopolska”, „kobiety w biznesie Kraków”, „mamy w biznesie Kraków”,
- branże: „gastronomia Kraków”, „restauratorzy”, „fryzjerzy Kraków”, „barber Kraków”, „kosmetyczki Kraków”, „mechanicy”, „warsztat samochodowy”, „fotografowie ślubni”, „fotowoltaika instalatorzy”,
- lokalne: nazwa dzielnicy lub miejscowości + „mieszkańcy” albo „polecam” (np. Ruczaj, Bronowice, Nowa Huta, Wieliczka, Niepołomice, Skawina, Zabierzów).

Dołącz, jeśli grupa spełnia 3 z 4 warunków: wpisy z ostatnich dni, aktywni administratorzy, jasne zasady promocji, członkowie to właściciele firm (a nie inni wykonawcy stron).

### Twój prywatny profil

- 19.10 udostępnij P01 z 1-2 zdaniami od siebie („Ruszam z własną działalnością...”). To naturalne ogłoszenie, nie reklama.
- Potem raz w tygodniu udostępnij jeden post, który pomaga (P05, P10, P12), a nie tylko sprzedaje.
- 24.10 napisz osobiście do 10-20 osób (szablon `networkMessage`). Każdą wiadomość zacznij od imienia i jednego zdania od siebie.
- Do polubienia strony zapraszaj tylko osoby, które coś znaczą dla tej strony (prowadzą firmę albo mogą polecić). Masowe zaproszenia do wszystkich znajomych psują statystyki.

### Lokalne grupy mieszkańców

W grupach dzielnic co jakiś czas ktoś pyta „polećcie kogoś do strony”. Reaguj tylko wtedy: szablon `groupHelpfulComment`. Nie wrzucaj tam reklam, chyba że grupa ma na to wyznaczony dzień.

### Poza zakresem tej kampanii

LinkedIn, płatne reklamy, Google. Do ewentualnego dodania w miesiącu 2.

## 5. Kalendarz 4 tygodni

Posty wychodzą o 18:00 jednocześnie na Facebooku i Instagramie. Relacje z naklejkami (ankieta, pytanie, quiz, link) wrzucasz z telefonu. „Udostępniony post” w relacji robisz w aplikacji Instagram (ikona samolotu pod postem → Dodaj do relacji). Na Facebooku relację z Instagrama możesz udostępnić automatycznie (ustawienie przy publikacji relacji).

Pliki: grafiki postów to `grafiki/<post>-<nr slajdu>.png` (np. `grafiki/P04-2.png`), rolki `wideo/R1.mp4` ... `R4.mp4`, relacje `grafiki/<relacja>-<nr planszy>.png`. Jeśli grafik nazwał pliki trochę inaczej, kieruj się numerem posta.

| Data | Post na FB i IG | Pliki posta | Relacja na IG i FB | Dodatkowo |
| --- | --- | --- | --- | --- |
| **Tydzień 1: Poznajmy się** | | | | |
| 19.10 pon | **P01** 18:00, karuzela: Cześć, jestem Dawid (przypięty) | `grafiki/P01-1..4.png` | **S01** 18:15: Nowy profil, nowy start (Link) | Udostępnij P01 na prywatnym profilu FB z 1-2 zdaniami od siebie. Przypnij P01 na stronie FB i na IG. |
| 20.10 wt |  |  | **S02** 20:00: Wieczór nad projektem (Ankieta) `grafiki/S02-1.png` | Zaplanuj w MBS posty tygodnia 2 (P04, P05). Rolkę R2 przygotuj w aplikacji IG. |
| 21.10 śr | **P02** 18:00, rolka: Od kreski do strony | `wideo/R1.mp4` | **S03** 18:15: Od kreski do strony (Ankieta) |  |
| 22.10 czw |  |  | **S04** 09:00: Zapytaj o stronę (Pytanie) `grafiki/S04-1.png` | Grupy: tylko czytaj i zostaw 1-2 pomocne komentarze (bez linków). |
| 23.10 pt | **P03** 18:00, karuzela: TopAuto Serwis, realizacja dla klienta | `grafiki/P03-1..5.png` | **S05** 18:15: Realizacja dla klienta (Link) `grafiki/S05-2.png` |  |
| 24.10 sob |  |  |  | Wyślij 10-20 osobistych wiadomości do znajomych (szablon networkMessage). Zaproś na stronę FB tylko osoby, które mogą coś polecić. |
| 25.10 nd |  |  |  | Przegląd tygodnia 1 (15 min, tabela w rozdziale 1). |
| **Tydzień 2: Jak pracuję i ile to kosztuje** | | | | |
| 26.10 pon | **P04** 18:00, karuzela: Cennik bez gwiazdek | `grafiki/P04-1..6.png` | **S06** 18:15: Cennik bez gwiazdek (Link) | Przedstaw się w 2-3 grupach, które na to pozwalają (szablon groupIntroPost). Poproś TopAuto o opinię (szablon reviewRequestTopAuto). |
| 27.10 wt |  |  | **S07** 09:00: Ile trwa wizytówka? (Quiz, Link) `grafiki/S07-1.png, grafiki/S07-2.png` | OLX: statystyki i wiadomości. Zaplanuj w MBS P07 i P08, rolkę R3 przygotuj w aplikacji IG. |
| 28.10 śr | **P05** 18:00, karuzela: 5 rzeczy, które klient sprawdza na stronie | `grafiki/P05-1..7.png` | **S08** 18:15: Co klient sprawdza (Ankieta) | Udostępnij P05 na prywatnym profilu (to poradnik, nie reklama). |
| 29.10 czw |  |  | **S09** 09:00: Pytanie przed startem (Pytanie) `grafiki/S09-1.png, grafiki/S09-2.png` | Grupy: 2-3 pomocne komentarze. Odpisz osobom, które odpowiedziały na ankiety. |
| 30.10 pt | **P06** 18:00, rolka: Szkic, projekt, strona | `wideo/R2.mp4` | **S10** 18:15: Szkic, projekt, strona (Link) |  |
| 31.10 sob |  |  |  | Bez publikacji. Tylko wiadomości. |
| 1.11 nd |  |  |  | Wszystkich Świętych: bez publikacji i bez relacji. Wiadomości odpisuj normalnie. |
| **Tydzień 3: Strony dla konkretnych branż** | | | | |
| 2.11 pon | **P07** 18:00, karuzela: Współpraca w 4 krokach | `grafiki/P07-1..6.png` | **S11** 18:15: Współpraca w 4 krokach (Link) | Przegląd tygodnia 2 (przesunięty z 1.11). |
| 3.11 wt |  |  | **S12** 20:00: Zanim powstanie kod (Ankieta) `grafiki/S12-1.png, grafiki/S12-2.png` |  |
| 4.11 śr | **P08** 18:00, karuzela: Strona dla restauracji (Bella Cucina, demo) | `grafiki/P08-1..6.png` | **S13** 18:15: Strona dla restauracji (Ankieta) | P08 w grupie gastronomicznej tylko tam, gdzie zasady pozwalają (wątek lub dzień promocji), z dopiskiem „projekt demo”. |
| 5.11 czw |  |  | **S14** 09:00: Przeklikaj demo (Link) `grafiki/S14-1.png` | Zaplanuj w MBS P10, P11 i P12, rolkę R4 przygotuj w aplikacji IG. |
| 6.11 pt | **P09** 18:00, rolka: Salon: rezerwacja online (Glow Studio, demo) | `wideo/R3.mp4` | **S15** 18:15: Rezerwacja w salonie (Ankieta) | R3 w grupach beauty tylko tam, gdzie wolno, z dopiskiem „projekt demo”. |
| 7.11 sob |  |  |  |  |
| 8.11 nd |  |  |  | Przegląd tygodnia 3. |
| **Tydzień 4: Który pakiet i co dalej** | | | | |
| 9.11 pon | **P10** 18:00, karuzela: Wizytówka, landing czy strona firmowa? | `grafiki/P10-1..6.png` | **S16** 18:15: Którą stronę wybrać? (Ankieta) | OLX: statystyki. Ogłoszenie wygaśnie około 15.11: przygotuj decyzję. |
| 10.11 wt |  |  | **S17** 20:00: Od czego zaczynam wycenę (Pytanie) `grafiki/S17-1.png, grafiki/S17-2.png` | Przypomnienie do osób, którym wysłałeś wycenę (szablon followUp). |
| 11.11 śr |  |  |  | Narodowe Święto Niepodległości: bez postów i relacji sprzedażowych. Neutralna relacja z życzeniami jest opcjonalna. |
| 12.11 czw | **P11** 18:00, karuzela: Kalkulator wyceny (demo) | `grafiki/P11-1..5.png` | **S18** 18:15: Wycena w 60 sekund (Link) |  |
| 13.11 pt | **P12** 18:00, karuzela: Najczęstsze pytania | `grafiki/P12-1..7.png` | **S19** 18:15: Zanim zamówisz stronę (Pytanie) | Grupy: 2-3 pomocne komentarze. |
| 14.11 sob |  |  | **S20** 10:00: Wszystko w wyróżnionych (Link) `grafiki/S20-1.png` |  |
| 15.11 nd | **P13** 18:00, rolka: 8 projektów w 20 sekund | `wideo/R4.mp4` | **S21** 18:15: 8 projektów w 20 sekund (Link, Pytanie) `grafiki/S21-2.png` | Przegląd miesiąca (30 min). Decyzja o przedłużeniu OLX. Wybierz 4 pomysły na miesiąc 2 (rozdział 10). |

**Święta:** 1.11 (niedziela, Wszystkich Świętych) i 11.11 (środa, Narodowe Święto Niepodległości): bez postów i relacji sprzedażowych. Dlatego P11 jest w czwartek 12.11, a przegląd tygodnia 2 w poniedziałek 2.11.

**Godzina 18:00** to punkt startowy. Po 2 tygodniach sprawdź w statystykach (Instagram → Panel profesjonalny → Odbiorcy → Najaktywniejsze godziny), kiedy obserwujący są online, i przesuń publikacje.

## 6. Codzienna rutyna (20-30 minut)

| Minuty | Co | Jak |
| --- | --- | --- |
| 5 | Wiadomości: Messenger, Instagram, OLX, e-mail | Odpowiedz każdemu tego samego dnia (szablony w Załączniku B). Nowe zapytanie wpisz do panelu. |
| 5 | Komentarze pod Twoimi postami | Odpowiedz na każdy, pełnym zdaniem. Komentarz z pytaniem o cenę: odpowiedz krótko publicznie i zaproś do wiadomości. |
| 10 | Grupy | Przejrzyj 2-3 grupy. Szukaj pytań o strony, domeny, formularze. Zostaw 1-2 pomocne komentarze. |
| 5 | Instagram lokalnie | Obserwuj lokalne firmy z branż z rozdziału 2. Zostaw 2-3 sensowne komentarze (konkret, nie „super!”). |
| 2 | Relacja dnia | Według kalendarza. W dni bez relacji w kalendarzu nic nie musisz wrzucać. |

**Raz w tygodniu (niedziela, 15 minut):** przegląd z rozdziału 1 i zaplanowanie postów na kolejny tydzień.

## 7. Wiadomości: jak prowadzić rozmowę

1. **Pierwsza odpowiedź** tego samego dnia (szablon `firstReply`). Zawsze zapytaj, skąd o Tobie wie.
2. **Zbierz informacje** (szablon `quoteQuestions`). Gdy ktoś jest konkretny, wyślij link do briefu z panelu: Projekt → Utwórz link do briefu.
3. **Wycena na piśmie** (szablon `quoteMessage`): zakres, kwota, termin, co w cenie, co osobno. Zmień etap w panelu na „Wycena”.
4. **Przypomnienie** po 3 dniach roboczych (szablon `followUp.afterThreeDays`).
5. **Ostatnie przypomnienie** po tygodniu (szablon `followUp.lastOneAfterAWeek`). Potem koniec: zapisz status i nie naciskaj.
6. Gdy ktoś pyta tylko „ile kosztuje strona?”: szablon `priceReply`.
7. Gdy ktoś mówi „nie teraz”: szablon `notNow.clientSaysNotNow`. Gdy projekt nie jest dla Ciebie: `notNow.dawidDeclines`.

Rozmowa telefoniczna często załatwia więcej niż 10 wiadomości. Jeśli ktoś pisze konkretnie, zaproponuj 15 minut rozmowy.

## 8. Planowanie w Meta Business Suite

Meta Business Suite (business.facebook.com albo aplikacja na telefon) publikuje jednocześnie na Facebooku i Instagramie.

1. Planer (Planner) → Utwórz post.
2. Zaznacz oba miejsca: stronę na Facebooku i Instagram.
3. Dodaj grafiki w kolejności slajdów (`P04-1.png`, `P04-2.png`, ...).
4. Wklej tekst. Włącz „Dostosuj tekst dla każdej platformy”: na Facebooka wklej `copy.facebook`, na Instagram `copy.instagram` + hashtagi.
5. Tekst alternatywny: przy każdym zdjęciu (Edytuj → Tekst alternatywny) wklej `slides → alt`.
6. Zaplanuj → wybierz datę i 18:00.
7. Po publikacji na Facebooku dodaj pierwszy komentarz z linkiem (`copy.firstComment`).

Warto wiedzieć:

- Na Facebooku kilka zdjęć w jednym poście wyświetla się jako mozaika, a nie karuzela. To normalne: pierwszy slajd jest okładką, reszta otwiera się po kliknięciu.
- Rolki planuj w aplikacji Instagram (rozdział 9), bo tylko tam dodasz muzykę z biblioteki.
- Relacje z naklejkami (ankieta, pytanie, quiz, link) wrzucaj z telefonu na bieżąco. Zaplanowane relacje w Business Suite zwykle nie mają tych naklejek.

## 9. Rolki, hashtagi, tekst alternatywny

**Rolki**

- Muzyka tylko z biblioteki Instagrama lub Facebooka. Konta firmowe mają mniejszy wybór utworów: to normalne, wybierz spokojny utwór dostępny w aplikacji. Muzyki spoza biblioteki nie dodawaj (wyciszenie, blokada).
- Przygotowanie w aplikacji Instagram: + → Rolka → wybierz `wideo/R1.mp4` → Dźwięk → wybierz utwór (głośność niska, napisy mają być czytelne bez dźwięku) → Dalej → opis z `copy.instagram` + hashtagi → Okładka (kadr z napisem z `coverTitle` albo grafika okładki z folderu `wideo/`, jeśli jest) → włącz „Poleć na Facebooku” → Ustawienia zaawansowane → Zaplanuj.
- Ustaw okładkę tak, żeby tytuł był czytelny w siatce profilu (środek kadru 4:5).
- Pierwsze 2 sekundy decydują: dlatego każda rolka zaczyna się od pytania albo napisu.

**Hashtagi**

- Instagram: 4-8 na post, gotowe w `copy.hashtags`. Wklej je na końcu opisu.
- Facebook: bez hashtagów (najwyżej 1-2).
- Nie używaj ogólnych tagów typu #love #instagood. Nie podmieniaj gotowych tagów na najpopularniejsze (z milionami postów): lokalne i branżowe trafiają do właściwych ludzi.

**Tekst alternatywny (alt)**

- Opisuje grafikę osobom niewidomym i pomaga wyszukiwarce Instagrama.
- Instagram: przed publikacją Ustawienia zaawansowane → Ułatwienia dostępu → Napisz tekst alternatywny (osobno dla każdego slajdu karuzeli). W Business Suite: przy każdym zdjęciu.
- Gotowe teksty: `slides → alt` (dla każdego slajdu) i `copy.alt` (okładka).

## 10. Pomysły na miesiąc 2

1. **EkoSolar (demo):** landing z kalkulatorem oszczędności. Post dla firm usługowych, które płacą za reklamy, a kierują ruch na ogólną stronę.
2. **Craft Coffee (demo):** co musi mieć mały sklep internetowy (filtry, karta produktu, koszyk). Uczciwie: sklep wyceniam indywidualnie.
3. **Lena Czarnecka (demo):** portfolio dla fotografa i twórcy. Galeria z filtrami i pakiety z ceną „od”.
4. **Asystent AI (demo):** chatbot, który odpowiada klientom po godzinach. Wyraźnie: demo, wycena indywidualna.
5. **Domena i hosting bez tajemnic:** czym się różnią, kto za co płaci, co warto mieć na siebie.
6. **Jak przygotować teksty i zdjęcia do strony:** lista kontrolna oparta na pytaniach z briefu.
7. **Mit czy fakt:** „wystarczy mi Facebook”, „strona to wydatek na raz”, „strona musi być droga”. Spokojnie i bez straszenia.
8. **Rolka: jeden detal w zbliżeniu,** np. przycisk Zadzwoń przypięty na dole telefonu w TopAuto.
9. **Szablon a strona od zera:** czym się różnią, kiedy szablon wystarczy (uczciwie).
10. **Opinia TopAuto Serwis,** jeśli ją dostaniesz: post z cytatem, tylko za zgodą i bez dopisywania czegokolwiek.

## 11. Czego nie robić

- Nie kupuj obserwujących, polubień ani komentarzy. Nie dołączaj do grup „lajk za lajk”.
- Nie wystawiaj sobie opinii i nie proś znajomych o opinie, które udają klientów. Przykładowe opinie z kodu strony (`testimonials` w `cv-data.ts`) to szablony: nigdzie ich nie używaj.
- Nie przedstawiaj projektu demo jako realizacji dla klienta. TopAuto Serwis to jedyna realizacja dla klienta.
- Nie podawaj wyników ani liczb, których nie masz („strona zwiększy sprzedaż o 30%”, „setki zadowolonych klientów”).
- Nie obiecuj pierwszego miejsca w Google.
- Bez presji: żadnych „ostatnich wolnych terminów”, „promocji do piątku”, liczników czasu i wymyślonych rabatów.
- Nie spamuj: ten sam post w wielu grupach jednego dnia, reklamy pod postami innych firm, masowe wiadomości do obcych.
- Nie używaj muzyki spoza biblioteki platformy.
- Nie publikuj zrzutów rozmów z klientami ani ich danych bez zgody.
- Nie podpisuj zdjęć z fal.ai jako prawdziwych (np. „moje biurko”). To ilustracje.
- Nie kasuj krytycznych komentarzy. Odpowiedz spokojnie i rzeczowo, a obraźliwe ukryj.

## 12. Do decyzji Dawida

- [ ] **Faktura:** jak wystawiasz rachunki (działalność, VAT, ceny brutto czy netto)? Klienci zapytają o to w pierwszej rozmowie, a szablon wyceny ma na to miejsce.
- [ ] **Czas odpowiedzi:** czy chcesz obiecywać „odpowiadam tego samego dnia”? Teraz automatyczna odpowiedź mówi tylko „najszybciej, jak to możliwe”.
- [ ] **OLX:** czy akceptujesz opłatę za ogłoszenie w kategorii Usługi (jedyny płatny element publikacji)? Sprawdź kwotę w formularzu.
- [ ] **@dorlowski na Instagramie** jest zajęte przez profil „David Orlowski”. Czy to Twoje konto? Jeśli tak, możesz rozważyć zwolnienie nazwy, ale nie przerabiaj prywatnego konta na firmowe.
- [ ] **Opinia TopAuto:** w danych projektu właściciel warsztatu ma to samo nazwisko co Ty. Jeśli to rodzina, opinia wciąż może być prawdziwa, ale przy publikacji uczciwie to zaznacz.
- [ ] **Ceny automatyzacji** (kalkulator, chatbot, rezerwacje): na razie „wycena indywidualna”. Jeśli ustalisz ceny „od”, dopisz je do P11 i do usług na Facebooku.
- [ ] **Zdjęcie profilowe:** portret jest teraz odtworzony przez AI. Jeśli zrobisz prawdziwą sesję, podmień zdjęcie na wszystkich profilach.
- [ ] **Panel na dorlowski.dev:** czy zapisywanie zapytań i linki do briefu działają (klucz Supabase)? Jeśli nie, prowadź listę zapytań w zwykłej tabelce.

## Załącznik A: teksty do kont

### Facebook

- **Nazwa strony:** Dawid Orłowski - Strony internetowe (zapasowo: Dawid Orłowski | dorlowski.dev; dorlowski.dev - Dawid Orłowski)
- **Kategoria:** Projektant stron internetowych (po angielsku Web Designer). Jeśli Facebook nie podpowie tej nazwy, wpisz „stron” i wybierz najbliższą kategorię. Druga kategoria (opcjonalnie): Firma informatyczna.
- **Nazwa użytkownika:** dorlowski.dev (adres facebook.com/dorlowski.dev). Zapasowo: dorlowskidev. Dostępność sprawdzisz dopiero w ustawieniach strony.
- **Przycisk akcji:** Wyślij wiadomość. **Przypięty post:** P01.
- **Zdjęcie profilowe:** grafiki/profil.png (720 x 720, portret; ten sam plik na FB i IG). **Okładka:** grafiki/okladka-fb.png (1640 x 924).
- **Kontakt:** https://dorlowski.dev, contact@dorlowski.dev, 739 258 786. Tylko miasto: Kraków (bez adresu ulicy). Obszar działalności: Kraków i cała Polska zdalnie. Godziny: Brak godzin pracy albo Tylko po umówieniu.

**Wstęp (bio, maks. 101 znaków, ten ma 89):**

```text
Projektuję i koduję strony dla firm. Kraków i zdalnie. Cenę i termin znasz przed startem.
```

**Informacje szczegółowe (opis strony):**

```text
Jestem Dawid Orłowski. Projektuję i koduję strony internetowe dla małych firm: wizytówki, landing page i strony firmowe. Mieszkam w Krakowie, z firmami z całej Polski pracuję zdalnie.

Pracujesz bezpośrednio ze mną, od pierwszej rozmowy do publikacji. Na co dzień pracuję jako Fullstack AI Developer, wcześniej zajmowałem się email marketingiem. Dlatego patrzę na stronę od strony kodu i od strony klienta, który ma z niej do Ciebie napisać.

Pakiety: Start (wizytówka) od 990 zł, Landing od 1 490 zł, Biznes (strona firmowa) od 1 990 zł. Każda strona ma wersję mobilną i podstawy SEO. Po rozliczeniu kod i strona należą do Ciebie. Pełną kwotę i termin znasz z bezpłatnej wyceny przed startem.

Cennik: dorlowski.dev/cennik
Realizacje: dorlowski.dev/realizacje
```

**Usługi:**

| Usługa | Cena | Opis |
| --- | --- | --- |
| Strona wizytówka (pakiet Start) | od 990 zł | Jedna strona do 5 sekcji, wygląd dopasowany do marki, wersja mobilna, formularz kontaktowy, podstawowe SEO, podpięcie domeny i publikacja. |
| Landing page (pakiet Landing) | od 1 490 zł | Jedna strona do 8 sekcji pod jedną ofertę lub kampanię: argumenty, wezwania do działania, formularz i FAQ, wersja mobilna, podstawowe SEO, domena i publikacja. |
| Strona firmowa (pakiet Biznes) | od 1 990 zł | Do 5 stron, w tym główna. Indywidualny wygląd, prezentacja usług i realizacji, wersja na wszystkie ekrany, formularz, podstawowe SEO, domena i publikacja. |
| Sklepy internetowe | wycena indywidualna | Lekkie sklepy i strony produktowe. Zakres i cenę ustalamy w bezpłatnej wycenie. |
| Aplikacje i automatyzacje | wycena indywidualna | Na przykład kalkulator wyceny, chatbot odpowiadający na pytania klientów, integracje. Wyceniane indywidualnie. |

**Automatyczne odpowiedzi** (Meta Business Suite → Skrzynka odbiorcza → Automatyzacje):

Powitanie (widoczne, zanim ktoś zacznie rozmowę):

```text
Cześć! Tu Dawid. Napisz, czym zajmuje się Twoja firma i jakiej strony potrzebujesz. Odpowiem osobiście.
```

Natychmiastowa odpowiedź:

```text
Dzięki za wiadomość! Odpiszę osobiście najszybciej, jak to możliwe. W międzyczasie możesz zajrzeć do cennika: dorlowski.dev/cennik
```

Często zadawane pytania (przyciski do kliknięcia):


Ile kosztuje strona?

```text
Wizytówka od 990 zł, landing od 1 490 zł, strona firmowa od 1 990 zł. Domena i hosting osobno. Pełną kwotę i termin podam w bezpłatnej wycenie. Szczegóły: dorlowski.dev/cennik
```

Ile trwa realizacja?

```text
Wizytówka one-page około 7 dni, większe strony zwykle 2-4 tygodnie. Dużo zależy od tego, jak szybko mamy teksty i zdjęcia.
```

Jak zacząć?

```text
Napisz w 2-3 zdaniach, czym zajmuje się Twoja firma i czego oczekujesz od strony. Jeśli masz obecną stronę albo przykłady, które Ci się podobają, wklej linki. Resztę ustalimy w rozmowie.
```

### Instagram

- **Nazwa użytkownika (pierwsza wolna z listy):** @dorlowski.dev, @dorlowskidev, @dawidorlowski.dev. @dorlowski jest zajęte (13.10.2026 pod tym adresem jest profil „David Orlowski”). Jeśli to Twoje prywatne konto, nie przerabiaj go: załóż osobne konto firmowe. Pod @dorlowski.dev, @dorlowskidev i @dawidorlowski.dev nie było profilu, ale dostępność potwierdzi dopiero aplikacja.
- **Pole „Imię i nazwisko” (wyszukiwalne, limit 64 znaki, to ma 34):** Dawid Orłowski | Strony www Kraków
- **Typ konta:** Konto profesjonalne: Firma. **Kategoria:** Projektant stron internetowych (Web Designer). Jeśli jej nie ma, wybierz najbliższą: Strona internetowa lub Usługi informatyczne. Wyświetlanie kategorii na profilu: włączone.
- **Linki:** Strona: https://dorlowski.dev, Cennik: https://dorlowski.dev/cennik, Realizacje: https://dorlowski.dev/realizacje (pierwszy jest główny).
- **Przyciski kontaktu:** E-mail (contact@dorlowski.dev) i Zadzwoń (739 258 786). Bez adresu. Przycisk Wiadomość jest domyślnie.
- **Kolejność wyróżnionych:** Realizacje, Cennik, Proces, O mnie, Kontakt.
- **Pierwsze 3 posty:** P01, P02, P03. Te trzy posty wychodzą 19, 21 i 23.10. Do grup i do znajomych z prośbą o polecenie idziesz dopiero, gdy są na profilu (od 24.10). Wyjątek: udostępnienie P01 na Twoim prywatnym profilu w dniu startu.

**Bio (maks. 150 znaków, to ma 138):**

```text
Projektuję i koduję strony dla firm
Kraków i zdalnie w całej Polsce
Wizytówka od 990 zł, cena znana przed startem
Napisz: bezpłatna wycena
```

**Wyróżnione relacje: start 18.10**

- **Realizacje** (okładka `grafiki/H1.png`): 18.10: wrzuć do relacji grafikę grafiki/P03-1.png (TopAuto, realizacja dla klienta) z naklejką Link: dorlowski.dev/realizacje i dodaj ją do wyróżnionych Realizacje. Potem dokładaj: S05, S13, S14, S15, S18, S21.
- **Cennik** (okładka `grafiki/H2.png`): 18.10: wrzuć do relacji grafikę grafiki/P04-1.png z naklejką Link: dorlowski.dev/cennik i dodaj ją do wyróżnionych Cennik. Potem dokładaj: S06, S07, S09, S16.
- **Proces** (okładka `grafiki/H3.png`): 18.10: wrzuć do relacji grafikę grafiki/P07-1.png i dodaj ją do wyróżnionych Proces. Potem dokładaj: S10, S11, S12, S17.
- **O mnie** (okładka `grafiki/H4.png`): 18.10: wrzuć do relacji grafikę grafiki/P01-1.png (portret) i dodaj ją do wyróżnionych O mnie. Potem dokładaj: S01, S02, S03.
- **Kontakt** (okładka `grafiki/H5.png`): 18.10: wrzuć do relacji grafikę grafiki/P01-4.png (kontakt) z naklejką Link: dorlowski.dev i dodaj ją do wyróżnionych Kontakt. Potem dokładaj: S04, S19, S20, S21.

### OLX

- **Tytuł (58 z 70 znaków):** Strony internetowe dla firm | Kraków i zdalnie | od 990 zł
- **Kategoria:** Usługi > Usługi informatyczne > Tworzenie stron www (taka ścieżka była na olx.pl 13.10.2026). Sprawdź ją w formularzu. W kategorii Usługi OLX pobiera opłatę za samo wystawienie ogłoszenia (ceny zmienne, zależne od pakietu); kwotę zobaczysz przed publikacją. Nie dokupuj promowania ani wyróżnień.
- **Lokalizacja:** Kraków
- **Cena:** Jeśli formularz ma pole ceny, wpisz 990 zł (cena wejściowa pakietu Start) i zaznacz opcję typu „cena od” lub „do negocjacji”, jeśli jest dostępna. Nie wpisuj 1 zł ani „za darmo”: to wprowadza w błąd. Cena „od 990 zł” jest też w tytule.
- **Zdjęcia w tej kolejności:** 1. `grafiki/olx-1-okladka.png` (okładka: usługa, Kraków i zdalnie, od 990 zł, dorlowski.dev); 2. `grafiki/olx-2-realizacje.png` (realizacje: TopAuto Serwis (realizacja dla klienta) i projekty oznaczone jako demo); 3. `grafiki/olx-3-cennik.png` (cennik: Start, Landing, Biznes, co w cenie i co osobno); 4. `grafiki/olx-4-proces.png` (proces: 4 kroki i czas realizacji); 5. `grafiki/olx-5-o-mnie.png` (o mnie: portret, kim jestem, kontakt).

**Opis ogłoszenia.** Jeśli formularz OLX odrzuci adres strony lub e-mail w treści, usuń je i zostaw telefon (wpisany też w polu kontaktowym).

```text
Potrzebujesz strony dla swojej firmy, usługi albo nowej oferty? Projektuję i koduję strony internetowe dopasowane do Twojej branży i zakresu, którego naprawdę potrzebujesz.

Nazywam się Dawid Orłowski. Mieszkam w Krakowie, z firmami z innych miast pracuję zdalnie. Robię wszystko sam: od rozmowy, przez projekt, po publikację. Przez cały czas rozmawiasz ze mną.

PAKIETY (ceny wejściowe dla opisanego zakresu)
- Start, wizytówka: od 990 zł. Jedna strona do 5 sekcji, wygląd dopasowany do marki, wersja na telefon, tablet i komputer, formularz kontaktowy, podstawowe SEO, podpięcie domeny i publikacja.
- Landing page: od 1 490 zł. Jedna strona do 8 sekcji pod jedną ofertę lub kampanię, wezwania do działania, formularz i FAQ, wersja mobilna, podstawowe SEO, domena i publikacja.
- Biznes, strona firmowa: od 1 990 zł. Do 5 stron, w tym główna, indywidualny wygląd, prezentacja usług i realizacji, wersja na wszystkie ekrany, formularz, podstawowe SEO, domena i publikacja.

W KAŻDYM PAKIECIE
- dwie rundy poprawek,
- drobna redakcja Twoich tekstów,
- 30 dni pomocy przy błędach wdrożenia,
- po rozliczeniu kod i strona należą do Ciebie.

DODATKI
- teksty na wizytówkę lub landing (do 1 000 słów): +350 zł,
- teksty na stronę firmową (do 2 500 słów): +700 zł,
- dodatkowa podstrona: +250 zł.

Domena, hosting i płatne usługi zewnętrzne są rozliczane osobno. CMS, sklep, rezerwacje i rozbudowane animacje wyceniam osobno. Pełną kwotę i termin znasz z bezpłatnej wyceny, zanim zaczniemy.

CZAS: wizytówka one-page około 7 dni, większe strony zwykle 2-4 tygodnie (zależnie od zakresu i tempa dostarczania treści).

REALIZACJE: dorlowski.dev/realizacje
Na zdjęciach: TopAuto Serwis to realizacja dla klienta. Pozostałe projekty to moje projekty autorskie (demo).

Napisz przez OLX albo zadzwoń. Opisz w kilku zdaniach, czym zajmuje się Twoja firma, a przygotuję bezpłatną wycenę.

Dawid Orłowski
739 258 786
contact@dorlowski.dev
```

**Rutyna OLX:**

- Włącz powiadomienia aplikacji OLX. Wiadomości sprawdzaj rano i wieczorem, odpowiadaj tego samego dnia (szablon firstReply.olx).
- Co poniedziałek zajrzyj do statystyk ogłoszenia (wyświetlenia, wiadomości) i wpisz je do tabeli przeglądu.
- Jeśli po 10 dniach jest dużo wyświetleń i zero wiadomości: zmień pierwsze zdjęcie albo pierwsze zdanie opisu. Jeśli mało wyświetleń: sprawdź kategorię i tytuł.
- Nie wystawiaj drugiego takiego samego ogłoszenia (duplikaty łamią zasady OLX). Nie kupuj odświeżeń ani wyróżnień w tej kampanii.
- Ogłoszenie wystawione 16.10 wygaśnie około 15.11. Tego dnia zdecyduj, czy je przedłużasz (to znów płatne), na podstawie liczby wiadomości z OLX.
- Spam i oferty typu „wypozycjonuję Twoje ogłoszenie” ignoruj. Nie podawaj nikomu kodów z SMS ani danych do logowania.

## Załącznik B: szablony wiadomości

Kwadratowe nawiasy `[...]` uzupełnij przed wysłaniem. Każdy szablon jest też w `kampania.json → templates`.


### Pierwsza odpowiedź: Facebook i Instagram

`templates.firstReply.facebookInstagram`

```text
Cześć [imię], dzięki za wiadomość! Tu Dawid. Chętnie pomogę.

Żeby przygotować wycenę, napisz proszę w kilku zdaniach:
1. Czym zajmuje się Twoja firma i gdzie działasz?
2. Jakiej strony potrzebujesz (wizytówka, landing, strona firmowa) albo co ma się na niej znaleźć?
3. Czy masz już stronę, logo, teksty i zdjęcia?
4. Na kiedy potrzebujesz strony?

Jeśli wolisz porozmawiać, podaj numer i dogodną porę, zadzwonię. Wycena jest bezpłatna i do niczego nie zobowiązuje.

I jeszcze z ciekawości: skąd o mnie wiesz?
```

### Pierwsza odpowiedź: OLX

`templates.firstReply.olx`

```text
Dzień dobry, dzięki za wiadomość z OLX! Tu Dawid Orłowski.

Chętnie przygotuję bezpłatną wycenę. Napisz proszę w kilku zdaniach, czym zajmuje się Twoja firma, jakiej strony potrzebujesz i na kiedy.

Moje projekty i cennik są na dorlowski.dev. Jeśli wolisz rozmowę, podaj numer i dogodną porę, zadzwonię.
```

### Krótka odpowiedź na „ile kosztuje strona?”

`templates.priceReply`

```text
Cześć! Wizytówka (jedna strona do 5 sekcji) od 990 zł, landing page od 1 490 zł, strona firmowa (do 5 podstron) od 1 990 zł. Domena i hosting osobno.

Dokładną kwotę podam po kilku pytaniach: czym zajmuje się Twoja firma i co ma się znaleźć na stronie? Cały cennik: dorlowski.dev/cennik
```

### Pytania do wyceny (mini-brief)

`templates.quoteQuestions`

Lista pytań do wyceny (to samo pytanie zadaje brief w Twoim panelu: Projekt → Utwórz link do briefu). Nie zadawaj wszystkich naraz w pierwszej wiadomości: zacznij od 1-4, resztę dopytaj albo wyślij link do briefu.

1. Czym zajmuje się Twoja firma? Oferta, klienci, obszar działania.
2. Co ma zrobić osoba na stronie? Zadzwonić, wysłać zapytanie, zarezerwować termin?
3. Jakiej strony potrzebujesz? Wizytówka, landing, strona firmowa, a może jeszcze nie wiesz?
4. Co musi znaleźć się na stronie? Sekcje, podstrony, języki, edycja treści (CMS), inne funkcje.
5. Co wyróżnia Twoją ofertę? Konkretne zalety, realizacje, prawdziwe opinie klientów.
6. Jakie masz materiały? Logo, zdjęcia, teksty, link do folderu. Bez haseł.
7. Kto przygotuje teksty? Ty, ja (dodatek +350 zł lub +700 zł) czy do ustalenia?
8. Jaki wygląd Ci odpowiada? 2-3 linki do stron, które lubisz, i to, czego chcesz uniknąć.
9. Jaki masz budżet i termin publikacji?
10. Co z domeną i hostingiem? Masz już domenę? Kto zatwierdza projekt?

Wiadomość z linkiem do briefu:

```text
Żeby nie przepisywać wszystkiego w czacie, wysyłam Ci link do krótkiego formularza: [link do briefu]. Na pierwsze dwa pytania odpowiedz koniecznie, resztę w miarę możliwości. Po wypełnieniu przygotuję wycenę.
```

### Wysłanie wyceny

`templates.quoteMessage`

```text
Cześć [imię], przesyłam wycenę strony dla [firma].

Zakres: [pakiet i co dokładnie wchodzi, np. jedna strona do 5 sekcji: ...]
Cena: [kwota] zł [ustal sam, jak podajesz kwotę: brutto/netto, zależnie od formy działalności]
Termin: [np. około 7 dni od otrzymania tekstów i zdjęć]
W cenie: dwie rundy poprawek, drobna redakcja tekstów, 30 dni pomocy przy błędach wdrożenia.
Osobno: domena i hosting (pomogę dobrać, koszt poznasz przed startem)[, inne pozycje].

Po rozliczeniu kod i strona należą do Ciebie. Jeśli coś chcesz zmienić w zakresie, napisz, dopasuję wycenę.
```

### Przypomnienie po wycenie (po 3 dniach roboczych)

`templates.followUp.afterThreeDays`

```text
Cześć [imię], wracam do wyceny strony, którą wysłałem [dzień]. Czy wszystko jest jasne? Jeśli coś w zakresie albo cenie nie pasuje, napisz, poszukamy wersji, która ma sens dla Twojej firmy. A jeśli to po prostu nie ten moment, też daj znać, żaden problem.
```

### Ostatnie przypomnienie (po tygodniu, potem koniec)

`templates.followUp.lastOneAfterAWeek`

```text
Cześć [imię], ostatni raz przypominam się w sprawie strony. Nie chcę zawracać głowy, więc to ostatnia wiadomość z mojej strony. Jeśli wrócisz do tematu za miesiąc czy za pół roku, po prostu napisz.
```

### Klient mówi „nie teraz”

`templates.notNow.clientSaysNotNow`

```text
Jasne, dzięki za szczerą odpowiedź. Jeśli przeszkodą jest budżet, możemy zacząć od mniejszej wersji, na przykład wizytówki (od 990 zł), i rozbudować stronę później. A jeśli to kwestia czasu, napisz, kiedy wrócisz do tematu, przygotuję wtedy aktualną wycenę.
```

### Ty odmawiasz projektu

`templates.notNow.dawidDeclines`

```text
Dzięki za zaufanie i za opis projektu. Uczciwie: [ten zakres / ten termin] to teraz dla mnie za dużo. Nie chcę brać projektu, którego nie dowiozę tak, jak trzeba. Jeśli plan się zmieni albo potrzebujesz czegoś mniejszego na start, napisz śmiało.
```

### Przedstawienie się w grupie na Facebooku

`templates.groupIntroPost`

```text
Cześć wszystkim! Jestem Dawid z Krakowa. Projektuję i koduję strony dla małych firm: wizytówki, landing page i strony firmowe.

Dołączyłem do grupy, żeby poznać lokalnych przedsiębiorców i pomóc, jeśli ktoś ma pytanie o stronę, domenę albo o to, czemu nikt nie pisze przez formularz.

Jeśli zastanawiasz się nad stroną, zapytaj w komentarzu. Odpowiem tutaj, konkretnie i bez wciskania czegokolwiek. Moje projekty i cennik są na dorlowski.dev.

Miłego dnia!
```

### Komentarz, gdy ktoś w grupie szuka osoby od stron

`templates.groupHelpfulComment.whenSomeoneAsksForWebDesigner`

```text
Cześć! Sam robię strony (Kraków, pracuję też zdalnie), więc nie będę udawał neutralnego. Zanim kogokolwiek wybierzesz, zapytaj każdego wykonawcę o trzy rzeczy:
1. jaka jest pełna cena, łącznie z domeną i hostingiem,
2. czy po zakończeniu kod i dostępy będą Twoje,
3. ile rund poprawek jest w cenie.
Jeśli chcesz porównać, chętnie wyślę Ci swoją wycenę. Projekty i cennik: dorlowski.dev
```

### Komentarz, gdy ktoś ma problem ze stroną

`templates.groupHelpfulComment.whenSomeoneHasAWebsiteProblem`

```text
Szybki test, który możesz zrobić sam: otwórz stronę na telefonie i sprawdź, czy tekst da się czytać bez powiększania, a przyciski (telefon, formularz) da się kliknąć kciukiem. Jeśli nie, strona prawdopodobnie nie ma dopracowanej wersji mobilnej. Jeśli chcesz, wrzuć link, napiszę, co poprawiłbym w pierwszej kolejności.
```

### Wiadomość do znajomych i rodziny z prośbą o polecenie

`templates.networkMessage`

```text
Cześć [imię]! Mam małą prośbę. Rozkręcam własną działalność: projektuję i koduję strony internetowe dla firm (wizytówki, landing page, strony firmowe).

Nie proszę o zamówienie, tylko o jedną rzecz: jeśli znasz kogoś, kto prowadzi firmę i nie ma strony albo narzeka na obecną, podeślij mu proszę mój profil albo dorlowski.dev.

Będzie mi też miło, jeśli zaobserwujesz moją stronę: [link do strony FB / profilu IG]. Dzięki!
Dawid
```

### Prośba o szczerą opinię: TopAuto Serwis

`templates.reviewRequestTopAuto`

```text
Cześć [imię]! Mam prośbę w sprawie strony TopAuto Serwis. Czy możesz napisać 2-3 zdania szczerej opinii o współpracy? Na przykład jak wyglądał kontakt, co było dla Ciebie ważne, co zrobiłbyś inaczej.

Nie musi to być laurka. Wolę prawdziwą, krótką opinię niż długą i ogólną. Jeśli się zgadzasz, najprościej będzie dodać rekomendację na mojej stronie na Facebooku: [link do strony FB → Recenzje / Rekomendacje].

Daj też znać, czy mogę zacytować Twoją opinię na dorlowski.dev z nazwą warsztatu. Jeśli wolisz nie, w ogóle nie ma sprawy. Dzięki!
```
