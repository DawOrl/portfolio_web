# Robot w sekcji „O mnie”

## Kierunek

Zgodnie z doprecyzowaniem Dawida robot jest osobną, całkowicie mechaniczną postacią. Ma własną głowę, szyję, ramiona i tors. Nie wykorzystuje jego twarzy ani bluzy. Paleta pozostaje zgodna ze stroną: kremowa ceramika, grafit, burgundowe łączenia i błękitne soczewki. Referencja użytkownika służyła jako inspiracja konstrukcji robota, nie jako gotowy zasób do wklejenia.

## Wdrożenie

- Nowy komponent `PortraitReveal` korzysta z `useGSAP` i `gsap.matchMedia`.
- Mysz odsłania fragment pełnego robota w nieregularnej, płynnej masce. Zgodnie z kolejną uwagą Dawida okrąg został zastąpiony falującą krawędzią: kształt podąża za kursorem z bezwładnością, rozciąga się w kierunku ruchu i uspokaja po zatrzymaniu.
- Jeden kontur SVG z 24 punktów i krzywych Béziera jest współdzielony przez dwie przeciwne maski. Delikatne rozmycie zmiękcza krawędź. Warstwa portretu jest wycinana w tym samym miejscu, dzięki czemu postacie nie nakładają się przez przezroczystość grafiki.
- „Pokaż robota” odsłania i utrzymuje całą postać; „Pokaż portret” przywraca zdjęcie. Ten sam przycisk obsługuje telefon i klawiaturę.
- Przy ograniczonym ruchu przełączanie jest natychmiastowe, a śledzenie myszy wyłączone. Brak obsługi masek uruchamia prostą zmianę przezroczystości.
- Animacja działa wyłącznie po interakcji. Nie ma stałej pętli renderowania ani aktualizacji React przy każdym ruchu myszy. `quickTo` ponownie wykorzystuje tweens, a zmiany konturu są łączone w jeden zapis na klatkę. Kontekst usuwa tweens, nasłuchy i oczekującą klatkę przy demontażu lub zmianie preferencji.
- Robot jest ładowany leniwie przez `next/image`; przycisk czeka na obraz, a przy błędzie zdjęcie pozostaje dostępne.
- `overflow: clip` zapobiega wewnętrznemu przewijaniu sekcji po aktywowaniu przycisku. Na małym ekranie nazwisko jest wyżej, a dolny gradient zachowuje czytelność linków nad jasnym torsem.
- Istniejące intro i bezpośrednie pojawianie się hero pozostają bez zmian.

## Zasób

Wynik: `public/profile-android.png`, 1122 × 1402, PNG z kanałem alfa, około 1,7 MB przed optymalizacją Next.js.

Narzędzie: `image_gen.imagegen`. Ostateczna generacja używała wyłącznie dostarczonej referencji robota. Wcześniejsze próby z ludzką twarzą nie są używane na stronie.

Prompt ostatecznej generacji:

> Edit this reference humanoid robot into a complete premium 3D ROBOT bust for a dark portfolio website. It must be a wholly synthetic independent robotic character, NOT a person's face wearing robotic plates and NOT a cyborg. Keep the industrial elegance and segmented hard-surface ceramic design of the robot in the reference. Extend the image to a tall 4:5 transparent canvas, target 1122x1402 PNG, showing the complete robotic head, mechanical neck, broad shoulders and upper torso down to lower chest. ALL visible parts are robot: smooth pale ceramic cranial dome, abstract manufactured face with artificial nose bridge, precise thin mechanical mouth seam rather than human lips, dark optical sockets with small ice-blue camera lenses rather than human eyeballs, side mechanical ear modules, exposed graphite neck pistons, sculpted shoulder panels and a dark graphite mechanical torso with a few large elegant ceramic panels. No organic skin, no human facial features taken from a photo, no hair, no beard, no eyebrows, no human ears, no clothes, no fabric, no sweatshirt. Light cream/pearl ceramic #f4f0eb, graphite #1d1d1d, brushed titanium, restrained burgundy #a00c30 joint covers and small cool blue #9fc5d3 lens/inset details. No orange, no green, no neon flood glow. Design is sophisticated and calm, not combat armor, no weapons, no skull, no horror, no extra limbs. Studio light from upper left, detailed realistic PBR surfaces, crisp clean engineering, plain smooth chest without text. Composition: head centered slightly right of center around 51% of image width, a very subtle three-quarter view facing slightly toward viewer's left, head top at about 5% canvas height, eye line about 29% canvas height, chin near 51% canvas height, neck into broad shoulders around 62%, torso extends and is cropped at bottom edge. Shoulders fill the canvas width in its lower third. Keep generous transparent room beside head. True alpha transparency outside the entire robot silhouette, absolutely no white/black/gray background, no checkerboard baked into the image, no floor or outside shadows. No text, no watermark, no logo. The result must read immediately as a whole robot, not a human transformation.

## Weryfikacja

- ESLint, TypeScript i produkcyjny build Next.js przechodzą.
- Desktop 1440 px: odsłanianie kursorem, przełączenie całej postaci i powrót do portretu sprawdzone w przeglądarce.
- Enter aktywuje przełącznik; fokus ma błękitny obrys, a `aria-pressed` odpowiada stanowi.
- Widoki 390 i 320 px: brak poziomego przepełnienia, przycisk ma 44 px wysokości; obie strony przełącznika sprawdzone.
- Po poprawce kadrowania wewnętrzny `scrollTop` sekcji pozostaje równy zero.
- Reduced motion i błąd ładowania są obsługiwane w kodzie; nie emulowano ich w przeglądarce.
- Wersja płynna: odsłanianie twarzy i torsu, zmiana konturu po ruchu oraz całkowite zamknięcie po odsunięciu kursora potwierdzone w przeglądarce. Powtórzono przełącznik i kontrolę przepełnienia na 390/320 px. Powrót z biblioteki realizacji poprawnie uruchamia efekt ponownie; konsola bez błędów i ostrzeżeń.

## Przegląd wizualny

Antislop stosowany w trakcie pracy: jeden główny efekt na portrecie, bez nowych dekoracyjnych sekcji, sloganów, liczników i pętli animacji. Akcenty robota wynikają z istniejącej palety. Przycisk ma konkretną funkcję i pozostaje dostępny na małych ekranach. Gradient dolny służy czytelności kontaktu i lokalizacji nad jasną grafiką. Zakres przeglądu obejmuje tę interakcję, nie pełny audyt całego serwisu.

Dokumentacja implementacji: [GSAP w React](https://gsap.com/resources/React), [maski SVG w CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image#masking_with_svg_mask).
