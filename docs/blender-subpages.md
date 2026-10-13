# Rzeźby podstron z Blendera

Trzy podstrony mają własne, proceduralne rzeźby w tych samych materiałach co
strona główna (satynowy grafit, burgundowa emalia, wypolerowana lodowa krawędź),
ale w innych formach niż wstęgi:

| Podstrona                      | Kompozycja | Pomysł                                                                                                                                           |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/realizacje` (hero)           | `library`  | Wachlarz sześciu ramek-ekranów na jednym nicie, jak wzornik kolorów. Przód burgundowy, z tyłu chrom.                                             |
| `/realizacje` (pasek na końcu) | `vacancy`  | Jedna pusta ramka wyjęta z wachlarza: wolne miejsce na kolejny projekt. Oświetlona pod burgundowe tło.                                           |
| `/polityka-prywatnosci`        | `privacy`  | Kłódka z trzech warstw (grafit, burgundowy rdzeń, grafit). Przez dziurkę od klucza widać emalię, front ma koncentryczne szlify jak tarcza sejfu. |
| strona 404                     | `broken`   | Ogniwa z sekcji kontaktu: jedno pęknięte, z burgundowymi przełomami, i odłamek w szczelinie.                                                     |

Skrypt `scripts/blender/subpages_art.py` buduje wszystko od zera: geometrię,
materiały (dziedziczone z `contact_link.py` i `lower_sections.py`), kamery
i światło. Nie potrzebuje modeli, tekstur, dodatków ani MCP.

## Render

Z katalogu projektu (`blender` to `/opt/homebrew/bin/blender`):

```sh
# szybki podgląd: pół rozdzielczości, 24 próbki, bez eksportu WebP
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/subpages_art.py -- --preview

# finał: PNG do design/blender/subpages/ i WebP do public/art/
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/subpages_art.py
```

Opcje:

- `--only library|vacancy|privacy|broken`: jedna kompozycja (można powtórzyć).
  `broken` zawsze renderuje obie warstwy 404.
- `--samples 128`: liczba próbek finału.
- `--output-dir /ścieżka`: katalog na PNG (domyślnie `design/blender/subpages`).
- `--webp-dir /ścieżka`: katalog na WebP (domyślnie `public/art`).
- `--no-webp`: tylko PNG.
- `--save-blend`: zapisuje też edytowalny `subpages-art.blend` obok PNG.

Pełny render wszystkich scen na Metal trwa około minuty.

## Pliki na stronie

Eksport robi sam skrypt (`cwebp -q 76-82 -alpha_q 90 -m 6 -sharp_yuv`).

| Plik                                    | Wymiary                 | Gdzie                                   |
| --------------------------------------- | ----------------------- | --------------------------------------- |
| `library-fan.webp` / `-mobile`          | 1400 × 1200 / 760 × 652 | hero `/realizacje`                      |
| `library-vacancy.webp`                  | 1000 × 819              | burgundowy pasek na końcu `/realizacje` |
| `privacy-lock.webp` / `-mobile`         | 1000 × 1000 / 640 × 640 | hero polityki prywatności               |
| `broken-link.webp` / `-mobile`          | 1500 × 1032 / 800 × 550 | 404, ogniwa                             |
| `broken-link-fragment.webp` / `-mobile` | 1500 × 1032 / 800 × 550 | 404, sam odłamek                        |

Warstwy 404 mają identyczną kamerę i wymiary, więc nakładają się co do piksela.
Dzięki temu CSS może delikatnie kołysać samym odłamkiem (`.nf-fragment`).
Przy zmianie kadru w skrypcie zmień też `width`/`height` w komponentach,
żeby strona nie przeskakiwała przy ładowaniu.

## Jak to jest zrobione

- Płyty (ramki, kłódka) to krzywe 2D z otworami, wyciągnięte i zaokrąglone,
  potem zamienione na siatkę. Materiał ściany dobiera kąt normalnej: lico,
  fazka (lodowa), bok, wnętrze otworu.
- Pęknięcie to operacja Boolean z bryłą, której górna i dolna ściana są
  fasetowym przełomem (każda komórka Voronoi ma własną płaszczyznę).
  Różnica otwiera ogniwo, część wspólna daje odłamek, a powierzchnie przełomu
  dostają materiał tnącej bryły (burgundowa emalia).
- Kamery są perspektywiczne i same dopasowują kadr (`fit_camera`). Płaskie,
  polerowane lica dostają przez to gradient zamiast jednolitej plamy.
- Światła lustrzane (`mirror_light`) ustawiają się tam, gdzie odbija się
  promień kamery, a light linking w Cycles ogranicza je do wybranych ramek.
