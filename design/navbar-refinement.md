# Propozycja nawigacji

## Kierunek

Portfolio projektanta i developera dla klientów zamawiających strony. Autorski monogram 3D, grafit, burgund #a00c30, krem, błękit #9fc5d3 i Montserrat zgodnie z wyborem właściciela. ENERGY 2 / RHYTHM 2 / MOTION 1 w obrębie nawigacji. Antislop stosowany podczas pracy, zgodnie z wcześniejszą odpowiedzią użytkownika.

## Decyzje

- Osobny grafitowy pasek z marginesem: odróżnia nawigację od pełnych wizualnie sekcji i pozostaje dostępny podczas przewijania.
- Mniejszy istniejący monogram: zachowuje tożsamość i zostawia więcej miejsca na treść menu.
- Symetryczne boczne kolumny na desktopie: linki pozostają w geometrycznym środku paska.
- Wypełniony burgundowy kontakt: jedno wyraźne działanie; strzałka prowadzi do formularza, pozostałe linki jej nie powtarzają.
- Błękitne podkreślenie: pokazuje aktualną sekcję albo stronę realizacji; fokus klawiatury ma ten sam kolor.
- Montserrat i większa czytelność podpisu: konsekwencja istniejącej typografii bez bardzo małych wersalików.
- Matowe powierzchnie, promienie 8/4 px i delikatny cień: pasek oraz otwierany panel są warstwami nawigacji nad treścią; nie dodajemy rozmycia do całej strony.
- Numerowane pozycje mobilne: spis sześciu rzeczywistych sekcji/stron. Duże napisy ułatwiają wybór, menu nie przesuwa strony.
- Ruch 160–180 ms tylko przy interakcji: potwierdza wybór i otwarcie; wyłączony przy ograniczonym ruchu.
- Struktura i cele linków zachowują istniejące menu. Bez nowych danych marketingowych i bez nowych zasobów graficznych.

## Weryfikacja

- ESLint komponentu, TypeScript i produkcyjny build Next.js: bez błędów.
- Desktop 1440 px: pasek 82 px wysokości, linki po 44 px, przycisk kontaktu 48 px; sticky pozostaje 16 px od góry.
- Widoki 320, 390, 768, 1001 i 1440 px: brak poziomego przepełnienia. Mobilne wiersze po 65 px. Zmiana szerokości na desktop zamyka menu.
- Desktop: logo prowadzi do `/#top`; Realizacje do `/realizacje`; Usługi do `/#uslugi`; O mnie do `/#o-mnie`; Cennik do `/#cennik`; Porozmawiajmy do `/#kontakt`.
- Mobilne menu: każda z sześciu pozycji sprawdzona kliknięciem. Te same cele co wyżej oraz Proces do `/#proces` i Kontakt do `/#kontakt`. Panel zamyka się po każdym przejściu.
- Aktywny stan po przewijaniu: osobno potwierdzone Usługi, O mnie i Cennik. Realizacje na podstronie mają `aria-current="page"`.
- Enter otwiera menu; Tab przechodzi do pierwszej pozycji; Escape z linku zamyka panel i zwraca fokus na przycisk. Fokus ma błękitny obrys. Zamykanie przyciskiem także sprawdzone.
- Kontrast tekstu: podpis 7,61:1; linki 9,14:1; błękit 8,51:1; biały na burgundzie 8,11:1, przy hover 6,83:1.
- Konsola: brak błędów i ostrzeżeń. Reduced motion sprawdzone w CSS, bez osobnej emulacji ustawienia systemowego.
- Zakres: nowa nawigacja; pozostałe funkcje strony nie były ponownie audytowane. Zmiana lokalna, bez publikacji.

## Bramka antislop: zakres nawigacji

### Hard Gate

- R-02 PASS: nowe etykiety nie zawierają em dash.
- R-03 PASS: sprawdzone pięć szerokości, brak przepełnienia; cele dotykowe 44–65 px.
- R-17 PASS: brak statystyk; cyfry oznaczają tylko kolejność sześciu pozycji.
- R-18 PASS: brak referencji i nowych wizerunków.
- R-23 PASS: istniejący monogram oraz te same cele menu; użytkownik zlecił jego wizualne przeprojektowanie.
- R-24 PASS: wszystkie cele otwarte kliknięciem, lista powyżej.
- R-25 PASS: zmierzone kontrasty 6,83–9,14:1.
- R-26 PASS: wszystkie odnośniki i przełącznik menu sprawdzone.
- R-27 PASS: nawigacja nie pobiera danych; stan otwarty, zamknięty i aktywna pozycja są obsługiwane.
- R-28 PASS: nie dodawano FAQ.
- R-32 PASS: Enter, Tab, Escape oraz obrys i powrót fokusu sprawdzone w przeglądarce.
- R-33 PASS: bezpośrednie zmiany w komponencie i jego CSS.
- R-34 PASS: zachowany jedyny istniejący motyw, brak nowego przełącznika.
- R-35 PASS: build i kliknięcia opisane powyżej, konsola bez błędów.
- R-36 PASS: bez nowych twierdzeń marketingowych.
- R-37 PASS: kierunek zapisany przed wdrożeniem na podstawie ustalonej identyfikacji.
- R-38 PASS: nazwa właściciela, monogram i cele pochodzą z istniejącej strony.

### Purpose Gate

- R-01 PASS: istniejąca paleta; burgund wyróżnia kontakt, błękit rzeczywisty stan.
- R-04 PASS: dwie kreski sygnalizują menu, krzyżyk zamknięcie, istniejąca strzałka akcję kontaktu.
- R-06 PASS: Montserrat jest wyborem właściciela; podpis zwiększony i bez szerokich wersalików.
- R-07 PASS: brak dodanego wzoru tła.
- R-08 PASS: strzałka tylko przy kontakcie, pozostałe linki tekstowe.
- R-09 PASS: brak badge'y.
- R-10 PASS: matowe powierzchnie; usunięto rozmycie starego paska.
- R-12 PASS: cień oddziela przypiętą nawigację od przewijanej treści.
- R-13 PASS: brak poświat.
- R-14 PASS: brak kart ofert lub powielonych ikon.
- R-19 PASS: krótki ruch potwierdza otwarcie i wskazanie, bez pętli; reduced motion respektowane.
- R-22 PASS: zachowano autorski, wcześniej zaakceptowany monogram.

### Liveliness

- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 1, zgodne z paskiem i krótkimi reakcjami.
- Rytm PASS: kompaktowy poziomy pasek i czytelny pionowy spis mobilny.
- Hierarchia PASS: pojedynczy mocny przycisk kontaktu, spokojniejsze linki.
- Przestrzeń PASS: równy środek desktopu, oddzielne obszary marki, linków i kontaktu.
- Akcent PASS: burgund dla akcji, błękit dla aktywnego stanu i fokusu.
- Tożsamość PASS: monogram 3D oraz ustalona typografia i paleta.
- Design Read PASS: zapisany kierunek poprzedzał kodowanie.

### Craftsmanship i Quality Locks

- C-1 PASS: powód każdej decyzji zapisany na początku dokumentu.
- C-2 PASS: brak martwych kontrolek; komplet przejść przetestowany.
- C-3 PASS: zachowana rzeczywista struktura strony, bez nowych sekcji.
- C-4 PASS: desktop, tablet, telefon i klawiatura sprawdzone; panel ma limit wysokości i przewijanie.
- C-5 PASS: brak fikcyjnych danych.
- R-05 PASS: kompozycja paska dostosowana do istniejących czterech linków i kontaktu.
- R-11 PASS: promienie 8 px dla warstwy nawigacji, 4 px dla przycisku.
- R-15 PASS: konkretne istniejące „Porozmawiajmy”.
- R-16 PASS: brak nowych sloganów i buzzwordów.
- R-20 PASS: własny monogram i identyfikacja utrzymane.
- R-21 PASS: ciemny motyw zgodny z wcześniejszą decyzją właściciela.
- R-29 PASS: wyłącznie ustalona paleta.
- R-30 PASS: bez kopiowania innego navbaru ani zasobów referencji.
- R-31 PASS: uzasadnienia koloru, typografii, przestrzeni, ikon i ruchu zapisane.

### Uzupełnienie antislop-ui

- PASS: paleta i akcenty wynikają z marki i stanu menu, bez emoji, badgów i nieuzasadnionych kropek.
- PASS: panel jest spisem istniejących odnośników, bez fikcyjnych danych, kart i dekoracyjnych sekcji.
- PASS: brak dodatkowego szkła lub glow, cienie dotyczą tylko warstw nawigacji; brak ciągłych animacji.
- PASS: brak nowych formularzy, tabel i stanów pobierania danych w zakresie tej zmiany.
- PASS: sprawdzone szerokości, stan otwarty/zamknięty i klawiatura opisane powyżej.
