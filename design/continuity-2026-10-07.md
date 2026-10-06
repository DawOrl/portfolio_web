# Ciągłość portfolio - 7 października 2026

## Plan

Właściciel zaakceptował cztery rozwinięcia: przejście z karty do projektu i powrót do tej samej karty, autorskie podstrony realizacji, makietę powstającą przy przewijaniu oraz kontakt zapamiętujący wybraną ofertę. Makieta zastępuje sekcję „Pomysł. Forma. Strona.” przed procesem współpracy.

Paleta pozostaje własna: grafit #1d1d1d, powierzchnia #252525, krem #f4f0eb, burgund #a00c30 i błękit #9fc5d3. Montserrat prowadzi całość, bez kursywy i em dash. Duża lewa typografia, istniejące osie shell i rzeczywiste materiały projektów.

```text
karuzela -> ten sam screenshot w panelu -> okładka case study
                                           |
powrót <- ta sama karta i pozycja scrolla <--+

o mnie -> szkic / design / gotowa witryna -> proces -> pakiet -> kontakt
```

Podstrony korzystają z jednej dużej sceny desktop/mobile i dłuższej opowieści o decyzjach. Makieta ma własną scenę i etapy powiązane z rzeczywistym procesem projektowania. Działania na ofertach i realizacjach przenoszą tylko kontekst do formularza, bez zapisywania danych osobowych ani nadpisywania wpisanej wiadomości.

## Przegląd przed wdrożeniem

Przejścia mają pokazać ciągłość wybranego projektu, a nie być osobnymi dekoracjami. Najmocniejszy moment scrolla skupia się na powstawaniu strony; zastępuje istniejący blok zamiast wydłużać portfolio o kolejną sekcję. Treść case study korzysta wyłącznie z istniejących danych, a podglądy pokazują równocześnie desktop i telefon. Zachowujemy obecne navbar, karuzelę, portret i paletę.

## Wdrożone

- Karta karuzeli przechodzi do prawego panelu, a jej screenshot do okładki realizacji. Powrót przez „Wybrane projekty” przywraca wybraną kartę, pozycję przewijania i fokus. Animacja przejścia ma sprzątanie i ograniczony czas oczekiwania na podstronę.
- Wszystkie osiem realizacji korzysta z własnego układu: duży tytuł, jednoczesny desktop i telefon, wyzwanie, rozwiązanie, zakres, efekt i galeria. Materiały i opis pochodzą z danych projektu.
- `ProcessBuild` zastępuje usunięty `TypeInterlude` przed sekcją procesu. Na desktopie przewijanie buduje autorską makietę od szkicu do designu i gotowej strony. Przyciski pozwalają wybrać etap. Na telefonie scena pozostaje w normalnym przepływie dokumentu.
- Oferta i realizacja przekazują wybór do formularza kontaktowego. Wybór można zmienić lub usunąć. Wpisana wiadomość oraz ręcznie wybrana usługa zachowują pierwszeństwo. Przechowywany jest tylko kontekst, bez danych formularza.

Przegląd przejść wykrył i usunął trzy problemy: pozostający klon okładki po zmianie preferencji ruchu, deformację pośredniej okładki na niskim ekranie i brak przeniesienia fokusu na tytuł realizacji. Preferencja ograniczenia ruchu pomija przejście między stronami i przypinanie makiety; tę ścieżkę sprawdzono w kodzie, bez emulacji przeglądarki.

## Wspólna typografia

Po dodatkowej prośbie właściciela typografia otrzymała wspólne role w `src/app/typography.css`. Ta sama rola ma ten sam rozmiar i interlinię we wszystkich sekcjach, panelu projektu, bibliotece i podstronach realizacji.

| Rola | Zakres mobile - desktop | Interlinia |
| --- | --- | --- |
| Etykiety | 12 px | 1.4 |
| Podpisy i pomocnicza treść | 14 px | 1.6 |
| Przyciski i linki nawigacyjne | 14 px / 500 | 1.4 |
| Akapity | 16 - 18 px | 1.6 |
| Wyróżniony akapit | 18 - 22 px | 1.6 |
| Tytuły kart / kroków / pakietów | 20 - 24 px / 500 | 1.1 |
| Podnagłówki | 28 - 36 px / 500 | 1.1 |
| Nagłówki sekcji | 32 - 60 px / 500 | 1.1 |
| Tytuły podstron | 40 - 96 px / 500 | 1.1 |

Hero oraz końcowe zaproszenie mają własne role display dopasowane do ich kompozycji. Duże imię, znak i teksty wewnątrz miniaturowej makiety są elementami graficznymi. Nagłówki używają Montserrat, zwykłego kroju, trackingu -0.04em i burgundowych akcentów. Wraz ze zmianą skali zwiększono miejsce na nazwy kart oraz zmieniono mobilną stopkę, żeby nie tworzyła poziomego przewijania.

## Sprawdzenie

- Przegląd w przeglądarce przy 1440 × 900, 1024 × 600, 390 × 844 oraz 320 × 780. Na 320 px teksty, etapy makiety i długi tytuł kalkulatora nie wychodzą poza ekran.
- Wyliczone style: przy 1440 px nagłówki sekcji mają 60 px / 66 px, akapity 18 px / 28.8 px, wszystkie główne CTA 14 px. Przy 320 px nagłówki sekcji mają 32 px, akapity 16 px, CTA pozostają 14 px.
- Szkic, design i gotowa strona sprawdzone przyciskami i przewijaniem. Przy 1024 × 600 cała przypięta scena mieści się w widoku, dolny opis kończy się przed krawędzią ekranu.
- Bella Cucina: karta -> panel -> realizacja -> powrót. Wybrana karta i pozycja pozostały identyczne (scroll 1640 px, początek sceny 250.945 px). Fokus trafił do tytułu realizacji, a po powrocie do tej samej karty. Klon okładki został ukryty, przypinanie i przewijanie odblokowane.
- Pakiet Biznes, usługa Landing page i realizacja Kalkulator wyceny przekazują właściwy kontekst do kontaktu. Wpisany tekst przetrwał zmianę wyboru. Usunięcie kontekstu nie usuwa wiadomości. Próbnych formularzy nie wysyłano.
- Izolowane sprawdzenia kontaktu obejmowały blokadę/uszkodzenie sessionStorage, preferencje ręcznej edycji, limit wiadomości, sukces/błąd i mailto przy zamockowanych odpowiedziach. Żadne wiadomości nie zostały wysłane.
- Build produkcyjny (19 stron), ESLint, TypeScript i `git diff --check` przechodzą. W końcowym przeglądzie nie pojawiły się nowe błędy ani ostrzeżenia przeglądarki.
- Pełne ponowne odtworzenie intro kończy się automatycznie, przywraca przewijanie i nie powoduje błędu stosu wywołań.
