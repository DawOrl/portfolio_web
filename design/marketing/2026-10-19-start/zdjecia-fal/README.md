# Zdjęcia z fal.ai (kampania start dorlowski.dev)

Model: `fal-ai/flux-pro/v1.1-ultra`, tryb `raw: true`, proporcje 4:5, rozmiar 1856 x 2304 px. Cena 0,06 USD za obraz. Każde zdjęcie: plik `<id>.webp` (jakość 85) i oryginał `<id>-original.png`.

Wszystkie prompty były po angielsku, każdy zawierał: "no people, no text, no logos". Dla każdego zdjęcia wygenerowano 2 warianty w jednym wywołaniu, wybrano lepszy.

## restauracja
- Wybrany: wariant 2 z zapytania 01a13696-0c39-7153-8e0b-124cb0c106cf, seed 405973738.
- Koszt: 0,12 USD (2 obrazy).
- Prompt: Editorial photograph, 35mm lens, shallow depth of field, a small table in an intimate Italian restaurant in the evening, a plate of tagliatelle with simple tomato sauce, a glass of red wine, crumpled linen napkin in deep burgundy, worn wooden table, warm candle and pendant light, graphite dark shadows, cream highlights, film grain, natural imperfections, empty dark wall and soft bokeh in the upper third, no people, no text, no logos
- Odrzucony wariant 1: butelka z nieczytelną etykietą (pseudotekst).

## warsztat
- Wybrany: wariant 1 z zapytania 01a13697-e2d3-7313-ac0d-70e1763c3f7c (druga próba), seed 3232451351.
- Koszt: 0,12 USD (pierwsza próba, odrzucona w całości) + 0,12 USD (druga) = 0,24 USD.
- Prompt: Editorial photograph, 40mm lens, shallow depth of field, corner of a clean car workshop, a closed plain dark graphite roller tool cabinet with a few wrenches resting on top, a single car tyre leaning against a bare concrete wall, a small burgundy red oil can on the cabinet, soft diffused window light from the left, slightly worn concrete floor, warm graphite shadows and cream highlights, film grain, large empty plain wall in the upper half, no people, no text, no letters, no logos, no stickers, no labels
- Uwaga: opona wygląda trochę jak pusty pierścień (felga bez piasty). Do tła i relacji wystarczy, ale to najsłabsze zdjęcie z zestawu.
- Pierwsza próba (seed 2377613385, zapytanie 01a13696-75c4-7933-9e75-cd544dd2c651): odrzucona, bo na szafce były napisy/logo i chaotyczne klucze. Drugi wariant drugiej próby odrzucony: czytelny numer "405-217".

## salon
- Wybrany: wariant 2 z zapytania 01a13696-cace-7f93-9723-f66167bf6ddd, seed 20531969.
- Koszt: 0,12 USD.
- Prompt: Editorial interior photograph, 35mm lens, shallow depth of field, a modern minimalist hair salon, one leather barber chair in muted burgundy, large round mirror with thin frame, green plants in ceramic pots, calm natural daylight from a window, cream plaster walls, graphite floor, warm neutral colour grade, subtle film grain, empty wall space in the upper left, no people, no text, no logos
- Uwaga: bardziej "czyste" niż reportażowe, ale bez artefaktów.

## kawiarnia
- Wybrany: wariant 1 z zapytania 01a13697-1bb6-7163-a87f-cf94f2a41841, seed 3751967795.
- Koszt: 0,12 USD.
- Prompt: Editorial photograph, 50mm lens, shallow depth of field, a coffee roastery counter in the morning, an open burlap sack of roasted coffee beans, a ceramic mug in deep burgundy glaze, a hand coffee grinder in dark wood and steel, soft side light from a window, worn wooden counter with coffee dust, graphite shadows and cream highlights, film grain, blurred plain wall in the upper third, no people, no text, no logos, no labels
- Odrzucony wariant 2: worek z pseudotekstem ("CREVORRINGS").

## biurko
- Wybrany: wariant 2 z zapytania 01a13697-6766-7431-b6f0-5f54c9179935, seed 682010342.
- Koszt: 0,12 USD.
- Prompt: Editorial photograph, 35mm lens, shallow depth of field, a designer's desk in the evening, a closed-angle laptop with a dark abstract screen glow, an open notebook with a pencil sketch of a website grid layout wireframe, a cream ceramic mug, a small desk lamp casting warm light, a burgundy notebook cover or pen, graphite dark room, cream highlights, subtle icy blue light from the screen edge, film grain, dark empty space in the upper third, no people, no readable text, no logos
- Uwaga: w notesie są drobne, nieczytelne bazgroły przy szkicu siatki (przy pełnym kadrze nie rzucają się w oczy; przy wycięciu zbliżenia notesu lepiej je zasłonić). Odrzucony wariant 1: ekran z widocznym wzorem i wyraźnymi napisami w notesie.

## warsztat (wersja końcowa)
- Model: fal-ai/nano-banana-pro, 2K, 4:5 (1856 x 2304), zapytanie 01a13699-84ac-7011-af1e-5685fb280014, wariant 1.
- Koszt: 0,30 USD (2 obrazy po 0,15 USD).
- Powód: wersja z flux (teraz warsztat-flux.webp) była zbyt pusta i sterylna. Wybrany wariant nie pokazuje tablicy rejestracyjnej ani logotypów; drugi odrzucony przez rozmytą tablicę z pseudo-napisami.
- Prompt: Editorial documentary photograph inside a small, real, well-kept independent car repair workshop in Poland, late afternoon. Foreground on the right: a mechanic's rolling tool cart in deep burgundy paint with a few worn wrenches and a torque wrench laid neatly on a shop towel. Mid-ground: a silver hatchback raised on a two-post lift, front wheel removed, brake disc visible, slightly out of focus. A stack of two used tyres leaning against a concrete wall with honest wear. Soft warm daylight from a high window mixing with cool fluorescent light, natural dust in the air, oil-stained concrete floor, believable imperfections. Shot on a 35mm lens at f/2.8, shallow depth of field, muted warm graphite and cream tones with the burgundy cart as the only strong colour. Calm empty wall area in the upper left third for a headline. No people, no faces, no hands. Absolutely no text, letters, numbers, logos, brand names, signage, posters or license plates anywhere in the image. Not CGI, not glossy, looks like a real photograph.

## Koszt łączny
- flux-pro ultra: 6 zapytań x 0,12 USD = 0,72 USD
- nano-banana-pro (warsztat, wersja końcowa): 0,30 USD
- Razem: 1,02 USD (limit kampanii: 15 USD).
