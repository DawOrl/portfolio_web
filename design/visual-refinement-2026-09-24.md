# Portfolio: dopracowanie wizualne, 24.09.2026

## Kierunek

Portfolio projektanta i developera dla klientów zamawiających strony. Wyrazista typografia, autorski monogram i spokojna prezentacja oferty. ENERGY 3 / RHYTHM 3 / MOTION 2. Kontrola antislop w trakcie pracy, zgodnie z wyborem Dawida.

Zastosowane skille: impeccable (polish i craft-floor), antislop, antislop-ui, better-typography, animate, gsap-react oraz browser do kontroli wizualnej. Automatyczny kontekst impeccable nie uruchomił się; podstawą były istniejący kod, podgląd i wcześniejsze decyzje właściciela.

## Wdrożone zmiany

| Obszar | Zmiana | Powód |
| --- | --- | --- |
| Hero | Monogram po opisie i przyciskach na telefonie; poprawiona kolejność także w DOM. Łagodniejszy tracking nagłówka. | Kontakt i realizacje dostępne przed dekoracją. Desktop zachowuje kompozycję. |
| Proces | Mobilna lista etapów z numerem i małą rzeźbą obok opisu zamiast dwóch wąskich kolumn. Opisy 14 px. | Można wygodnie przeczytać zakres każdego etapu. |
| Cennik | Nazwa pakietu jako nagłówek, duża kwota z mniejszym „od” i „zł”, cyfry tabelaryczne. Czytelniejsze opisy i listy. | Łatwiejsze porównanie trzech istniejących ofert. Ceny i zakresy pozostają te same. |
| Usługi | Opisy 15 px, szczegóły 12 px, krótsza reakcja elementów na wskazanie. Miękki cień planszy. | Większa czytelność i wyraźniejsze oddzielenie obiektu od tła. |
| Biblioteka | Krótszy nagłówek sekcji, filtry o wysokości 44 px, poziome przewijanie filtrów na telefonie, aktywny filtr w błękicie i licznik wyników. | Szybsze dotarcie do projektów i czytelny stan filtrowania. |
| Zaproszenie do kontaktu | Osobny szeroki wiersz pod projektami zamiast pustej karty z przerywaną ramką. | Zaproszenie jest zakończeniem galerii i nie udaje projektu. |
| Formularz | Pola 16 px, większe etykiety i błędy, wyższe pole wiadomości, błękitny fokus, spokojniejszy przycisk. | Czytelniejsze wpisywanie i mniej ryzyka automatycznego powiększenia pola na telefonie. |
| Nawigacja | Większe obszary linków, Escape przywraca fokus wyłącznie po otwarciu mobilnego menu. | Klawiatura nie traci fokusu przy zwykłym użyciu strony. |
| Ruch | Usunięte osobne wejścia usług, cen, etapów i „rysowanie” oznaczeń sekcji. Pozostałe wejścia skrócone do 0,45 s / 16 px. Filtry używają krótkiego przenikania zamiast skalowania i przestawiania kart. | Oferta jest dostępna od razu, a charakterystyczne sceny mają większe znaczenie. |
| Detale interakcji | Spójne, niewielkie przesunięcie strzałek; hover dla precyzyjnego wskaźnika i obsługa reduced motion. | Jedna reakcja na podobne działania zamiast różnych efektów w każdej sekcji. |

Zachowane: Montserrat, bordo #a00c30, grafit, krem i błękit #9fc5d3; intro, brak animacji wejścia hero, portret, monogram 3D, wycentrowany napis w stopce oraz pełne kadry zdjęć w galerii i karuzeli.

## Referencja: Lando Norris

Przegląd: [landonorris.com](https://landonorris.com/), desktop i telefon. Obejrzałem hero z warstwami kasku, przejście do treści, fotograficzną galerię, kolekcję kasków oraz pełnoekranowe menu. To analiza wizualna, bez kopiowania zasobów lub implementacji.

Najważniejsze obserwacje: powracające kontury, jeden charakterystyczny obiekt, duża różnica skali między kadrami, zmiany jasnych i ciemnych powierzchni oraz menu zaprojektowane jako część całej strony.

Proponowany następny etap, **jeszcze niewdrożony**:

1. **Scena monogram → realizacje.** Wykorzystać istniejący obiekt „do.” jako łącznik: krótki obrót podczas przewijania i odsłonięcie projektów. Uruchamiana po hero, bez kolejnego wejścia nagłówka. Na telefonie krótszy przebieg; przy ograniczonym ruchu zwykły układ.
2. **Jedna rozbudowana prezentacja projektu.** Duży widok desktopowy, obok detal mobilny i krótka decyzja projektowa. Wybrać rzeczywistą realizację, np. TopAuto. Zachować pełne zdjęcia i jasne przejście do biblioteki.
3. **Motyw z własnego znaku.** Powtarzać geometrię „do.” w podziałach i konturach. Nie kopiować wzoru kasków ani limonkowej kolorystyki.
4. **Menu jako kompozycja.** Duże czytelne odnośniki, jeden podgląd realizacji i kontakt. Rozważyć dopiero jako osobną zmianę, z poprawnym fokusem i obsługą Escape.

Rekomendacja: najpierw scena monogramu i jeden dopracowany projekt. Jakość referencji wynika także z materiałów fotograficznych i modelu 3D; same dodatkowe animacje nie odtworzą tego efektu.

## Weryfikacja i granice

- ESLint, TypeScript i build produkcyjny: przeszły.
- Kontrola wizualna: hero, proces, cennik, biblioteka oraz formularz; desktop 1440 px i telefon 390 px. Biblioteka dodatkowo 320 px.
- Brak poziomego przepełnienia w sprawdzonych widokach. Wszystkie trzy kwoty w desktopowym cenniku mają wspólną linię początku.
- Filtr „Strona firmowa”: 2 wyniki; „Wszystkie”: 8. Filtrowanie działa także przez Enter. Filtry mają 44 px wysokości; wszystkie obrazy biblioteki nadal używają contain.
- Mobilne menu: otwarcie, przejście do sekcji, zamknięcie Escape i powrót fokusu.
- Pusty formularz: trzy właściwe błędy walidacji. Pola mają 16 px i błękitną linię fokusu. Nie wysyłano wiadomości testowej.
- Konsola sprawdzonego podglądu: brak błędów i ostrzeżeń.
- Reduced motion sprawdzone w kodzie GSAP, Framer Motion i CSS; nie wykonano osobnej emulacji ustawienia systemowego.
- Kontrola dotyczy publicznego portfolio i tej zmiany, nie panelu CRM ani pełnego audytu wszystkich podstron.

## Bramka antislop, zakres: ta zmiana

### Hard Gate

- R-02 PASS: nowe teksty nie dodają pauz em dash; wcześniejsza zaakceptowana treść zachowana.
- R-03 PASS: brak przepełnienia w sprawdzonych widokach 320/390/1440 px.
- R-17 PASS: nie dodano statystyk ani niepotwierdzonych liczb marketingowych; licznik pochodzi z wyników filtrowania.
- R-18 PASS: nie dodano referencji ani fikcyjnych klientów.
- R-23 PASS: wykorzystano istniejące, zaakceptowane zdjęcia i znak marki.
- R-24 PASS: nawigacja prowadzi do istniejących stron i sekcji; przetestowano przejścia do procesu, cennika, kontaktu i realizacji.
- R-25 PASS: sprawdzone pary kolorów mają kontrast 5,79–14,61:1; tekst na przycisku bordo 8,11:1, aktywny filtr 9,15:1.
- R-26 PASS: zmienione filtry, menu, odnośniki i walidacja mają rzeczywiste działanie.
- R-27 PASS: zachowano stany formularza; wyniki filtra mają komunikat statusu. Kategorie pochodzą z rzeczywistych projektów.
- R-28 PASS: nie zmieniano pytań FAQ dotyczących zakresu, ceny i realizacji stron.
- R-32 PASS: sprawdzono Enter w filtrze oraz Escape i fokus menu; pola mają widoczny fokus.
- R-33 PASS: zmiany zapisano bezpośrednio w komponentach i CSS; brak skryptu modyfikującego stronę w runtime.
- R-34 PASS: brak przełącznika motywu w zmienianym interfejsie.
- R-35 PASS: aplikacja zbudowana i uruchomiona; udokumentowane sprawdzenia interakcji objętych zmianą powyżej.
- R-36 PASS: nie dodano obietnic bezpieczeństwa, zgodności ani wydajności.
- R-37 PASS: kierunek zadeklarowany przed zmianami na podstawie istniejącej marki i preferencji właściciela.
- R-38 PASS: wykorzystano rzeczywiste dane projektów i dotychczasową ofertę.

### Purpose Gate

- R-01 PASS: zachowane tło i oświetlenie obiektów wynikają z zaakceptowanej palety marki.
- R-04 PASS: istniejące strzałki wskazują odnośniki, checki oznaczają zakres oferty; nie dodano losowych ikon.
- R-06 PASS: Montserrat wynika z wyboru właściciela, Georgia podkreśla wybrane hasła.
- R-07 PASS: zachowana siatka jest tłem studium własnego monogramu, wcześniej zamówionym przez właściciela.
- R-08 PASS: strzałki wskazują kontynuację do projektu lub kontaktu; wspólna reakcja wzmacnia rozpoznanie linków.
- R-09 PASS: wyróżnienie „Polecany” dotyczy konkretnego pakietu; filtr pokazuje rzeczywisty wybór.
- R-10 PASS: nie dodano szklanych kart ani kolejnych warstw blur.
- R-12 PASS: cień dotyczy planszy usług jako pojedynczego obiektu ponad powierzchnią.
- R-13 PASS: nie dodano systemu poświat.
- R-14 PASS: trzy kolumny cennika porównują trzy istniejące pakiety; Biznes ma odrębne wyróżnienie.
- R-19 PASS: zredukowano powtarzalne wejścia; zachowano tylko wybrane akcenty i informację o interakcji.
- R-22 PASS: rzeźby i monogram pochodzą z istniejącej identyfikacji, nie z nowej biblioteki dekoracji.

### Liveliness

- Dials PASS: ENERGY 3 / RHYTHM 3 / MOTION 2.
- Rytm PASS: duże hero, przestrzenna galeria, oferta, portret i formularz mają różne kompozycje.
- Hierarchia PASS: nagłówek prowadzi hero, kwota prowadzi pakiet, projekt prowadzi kartę biblioteki.
- Odstępy PASS: skrócono pustą przestrzeń nad biblioteką; oddzielono jej zakończenie od kart projektów.
- Akcent PASS: bordo prowadzi działania, błękit pokazuje wybrany filtr i fokus pól.
- Tożsamość PASS: własny monogram, kontury, portret i ustalona typografia pozostają rozpoznawalne.
- Design Read PASS: kierunek określony przed wdrożeniem.

### Craftsmanship & Quality Locks

- C-1 PASS: powód każdej większej decyzji znajduje się w tabeli zmian.
- C-2 PASS: brak nowych atrap kontrolek; zachowana rzeczywista nawigacja i formularz.
- C-3 PASS: nie dodano sekcji wypełniających szablon.
- C-4 PASS: sprawdzone widoki mobilne, desktopowe, fokus, filtrowanie i błędy formularza są czytelne.
- C-5 PASS: nie dodano fikcyjnych dowodów jakości.
- R-05 PASS: zachowano zróżnicowane kompozycje i rzeczywistą trzyczęściową ofertę właściciela.
- R-11 PASS: kontrolki, zdjęcia i obiekty marki zachowują różne, uzasadnione geometrie.
- R-15 PASS: działania nazywają rezultat: zapytanie o pakiet, kontakt lub obejrzenie projektu.
- R-16 PASS: nie dodano ogólnych sloganów marketingowych.
- R-20 PASS: własny znak, portret i projekty pozostają podstawą strony.
- R-21 PASS: ciemna paleta wynika z zaakceptowanej identyfikacji.
- R-29 PASS: grafit i krem z bordo oraz błękitem, bez dodatkowego koloru.
- R-30 PASS: z referencji przyjęto zasady kompozycji; nie skopiowano jej układu ani zasobów.
- R-31 PASS: większe decyzje mają zapisane uzasadnienie w tabeli.
