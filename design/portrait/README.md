# Portret — 12 października 2026

Źródło: zdjęcie HEIC przekazane przez Dawida. Konwersja do PNG przez macOS `sips`, następnie wbudowane `imagegen`: usunięcie tła i kadr do ramion. Oryginał pozostaje bez zmian.

- `portrait-4k-pressed-2026-10-12.png`: aktualny szerszy kadr z wygładzonymi zagnieceniami koszulki, 3072 × 3840, z przezroczystością.
- `../../public/portrait-dawid-4k-pressed-20261012.webp`: aktualna wersja używana w sekcji O mnie i awatarze hero. WebP, jakość 95, bezstratny kanał alfa. Sekcja O mnie pokazuje obraz w czerni i bieli przez CSS i podaje duży plik bez pomniejszania przez Next Image; awatar zachowuje naturalny kolor i nie powiększa twarzy.
- Eksport 3072 × 3840 powstał przez upscaling `sips` z wygenerowanego mastera 1122 × 1402 (`portrait-pressed-master-2026-10-12.png`). To plik w rozmiarze 4K, **nie natywny render modelu w 4K**. Model zwrócił 1122 × 1402 mimo zadanego większego rozmiaru. Upscaling nie odtwarza wszystkich detali oryginalnego HEIC.
- `portrait-medium-2026-10-12.png` i `../../public/portrait-dawid-medium-20261012.webp`: zachowany wcześniejszy szerszy kadr z przezroczystością, 1122 × 1402.
- `portrait-shoulders-2026-10-12.png` i `../../public/portrait-dawid-20261012.webp`: zachowana wcześniejsza wersja z bliższym kadrem.

Polecenie pierwszego kadru użyte we wbudowanym narzędziu `imagegen`:

> Use case: background-extraction / crop adjustment.
> Input image 1 is the EDIT TARGET: the already background-removed original portrait of the user. Make ONLY a tighter photographic crop. Show the complete head and natural hair including flyaways, neck, both shoulders and just the upper chest of the dark t-shirt. Cut the image below the shoulder line at the upper chest, eliminating the long lower torso and forearms. Keep the person upright, centered with a small margin above the hair, approximately a 4:5 head-and-shoulders portrait composition. Preserve exactly the same face, expression, hairstyle, beard, skin, clothing, original pose and lighting; no retouching, beautification, redrawing, face regeneration or added body parts. This is a crop of the existing cutout, not a new photograph. Retain the genuine transparent alpha background with clean hair and clothing edges. No background, no shadow, no text, no checkerboard baked into pixels.

Polecenie dla szerszego kadru:

> Use case: background-extraction / crop adjustment. Asset: transparent photographic portrait for the About section of a portfolio.
> Image 1 is the original full upper-body cutout and is the EDIT TARGET, the actual person to preserve. Image 2 shows the current close head-and-shoulders crop and is ONLY a FRAMING REFERENCE: the user finds it slightly too close.
> Make a new crop about 20 percent wider than image 2, with a slightly more distant viewpoint purely by reframing image 1. Show the complete head and natural flyaway hair, neck, both shoulders and more of the upper chest, but no long lower torso or forearms. Head plus hair should occupy about 50 to 55 percent of the frame height. Center the person upright with a modest clear margin above the hair. Use an approximately 4:5 portrait composition. Preserve the original photographic person from image 1 exactly: same face, expression, hairstyle, beard, skin texture, dark t-shirt, pose, proportions, lighting and natural colors. Do not change camera angle, regenerate the face, beautify, retouch, add missing body parts or change clothing. This is a slightly wider crop of the existing cutout, not a new photograph. Keep actual transparent alpha and clean hair/clothing edges. No background, no shadow, no text and no baked-in checkerboard.

Finalne polecenie retuszu koszulki (wbudowane `imagegen`):

> Use case: identity-preserve / precise-object-edit / photographic resolution enhancement.
> Asset: FINAL HIGH-RESOLUTION transparent portrait for a large personal portfolio About section.
> Image 1 is the ORIGINAL HIGH-RESOLUTION PHOTOGRAPH and the identity/skin/hair/detail source. Image 2 is the CURRENT TRANSPARENT MEDIUM PORTRAIT and is the exact framing reference; keep that slightly wider head, shoulders and upper-chest composition, not the too-close earlier crop.
> Main requests: (1) produce a genuine high-resolution 4K portrait PNG canvas, preferably exactly 3072 x 3840 pixels (4:5 aspect, long edge 3840), with crisp natural photographic detail for a large Retina display; (2) make the same dark charcoal t-shirt look freshly ironed: remove distracting folds, creases and crumpled patches from the chest and shoulder fabric. Preserve the t-shirt's original fit, neckline, sleeve shape, seams, dark color and natural fine cotton texture. Keep a few gentle physically natural curves; do not make it plastic or change the garment type.
> Preserve the exact person from original image 1: same face, expression, facial geometry, eye direction, hair, beard, skin texture and marks, body proportions, pose, natural lighting and natural colors. Do not beautify, smooth skin, invent facial details, redraw facial features, change age, add makeup, change hairstyle or add missing body parts. Use image 1's actual high-resolution identity detail rather than amplifying artifacts from image 2. Keep the crop of image 2 at a slightly distant head-and-shoulders/upper-chest framing, with the complete hair and a small top margin.
> Remove the entire room/background from image 1, retaining genuinely transparent alpha. Clean natural hair and clothing edges, without background-colored halos. No backdrop, no shadows, no text, no baked-in checkerboard. High-resolution 4K output is essential, not a small preview enlargement. Keep the output in natural color; the website applies its black-and-white appearance separately.

Podgląd strony nie został sprawdzony wizualnie w przeglądarce: dostęp zablokowała polityka URL narzędzia. Sam wycięty obraz został obejrzany przed integracją.
