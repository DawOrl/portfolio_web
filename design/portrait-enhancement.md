# Poprawa portretu — 24.09.2026

- Źródło: `public/profile-cutout.png` (zachowane bez zmian).
- Wersja używana w sekcji „O mnie”: `public/profile-cutout-enhanced.png`.
- Narzędzie: `image_gen.imagegen`, edycja z obrazem referencyjnym.
- Obie wersje mają 1122 × 1402 px i przezroczyste tło. Narzędzie nie zwiększyło wymiarów do żądanych 2240 × 2800 px. Rezultat poprawia widoczną ostrość i fakturę, nie jest zdjęciem o wyższej natywnej rozdzielczości.
- Porównanie wizualne: zachowane kadr, monochromatyczna kolorystyka, poza i rozpoznawalność twarzy; wyraźniejsze włosy i zarost. Edycja generatywna może rekonstruować drobne szczegóły.
- `next/image`: jakość portretu 95 zamiast domyślnego 75; pozostałe obrazy zachowują dotychczasowe ustawienie.
- Deklarowana szerokość na tablecie dopasowana do rzeczywistego kontenera (542 px). Nowa nazwa pliku oddziela cache poprzedniej wersji.

## Weryfikacja

- ESLint zmienionego komponentu i konfiguracji: bez błędów.
- Produkcyjny build Next.js wraz z TypeScript: poprawny.
- Podgląd 1440 px i 390 px: nowy obraz wczytuje się poprawnie z `q=95`, przezroczyste tło i układ zachowane; brak poziomego przewijania na telefonie i błędów konsoli.
- Zmiana pozostaje lokalna, bez publikacji.

## Prompt

Use case: identity-preserve / photographic restoration and resolution enhancement. Edit target: the supplied black-and-white transparent cutout portrait of Dawid. This is a faithful high-resolution restoration of THIS EXACT EXISTING PHOTO for a large Retina-screen website portrait, not a new portrait. Produce a genuinely higher-detail portrait-oriented transparent PNG at 2240 x 2800 pixels or higher with the same approximately 4:5 canvas and full silhouette. Keep the same young man's exact recognizable face and facial proportions, eye shape and gaze, nose, mouth, jaw, beard boundaries, tousled dark wavy hairstyle, expression, slight head angle, ear, plain black crewneck sweatshirt, shoulder width, pose, camera framing, headroom, monochrome tonality and lighting. Keep the subject at the same scale and position in the frame, reaching the bottom edge. Improve only resolution and photographic clarity: resolve compression/block artifacts and soft edges; restore restrained believable fine strands of hair, beard texture, natural skin detail and sweatshirt fabric. Preserve skin imperfections and natural softness, do not add plastic retouching or excessive pore noise, no sharpening halos, no beautification, no aging, no facial redesign, no new objects, no text, no watermark. Background must remain genuinely alpha-transparent, with clean natural hair edges, no white/gray fringe, no checkerboard baked into pixels and no background shadow. The output must be visibly clearer at a large display size while still looking like the exact source photo. Preserve identity over invented detail.
