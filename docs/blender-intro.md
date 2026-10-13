# Intro strony głównej z Blendera

Intro to krótki film 3D tej samej wstęgi, która stoi w hero. Najpierw rysuje
się jedna świecąca, lodowa kreska z jasnym punktem pióra na czubku. Potem kreska
rozdziela się na dwie krawędzie, a między nimi wypełnia się burgundowo-grafitowa
bryła. Kamera robi przy tym „dolly zoom”: podjeżdża z szerokim obiektywem
i odjeżdża na długi. Ostatnia klatka to dokładnie kadr z hero.

Na stronie film łączy się z typografią „kreska. / forma. / strona.”.
Każde słowo pojawia się razem z etapem formy, który nazywa. Na końcu wstęga
przelatuje na swoje miejsce w hero, a słowo „strona.” wskakuje w trzecią linię
nagłówka. Dopiero wtedy intro się zamyka, więc nie ma cięcia.

## Pliki

| Plik | Rola |
| --- | --- |
| `scripts/blender/intro_sequence.py` | Scena, animacja i render klatek oraz kadru hero |
| `scripts/blender/encode_intro.sh` | Pakuje klatki do dwóch plików MP4 |
| `design/intro/intro-sequence.blend` | Edytowalna scena (stan ostatniej klatki) |
| `design/intro/hero-form.png` | Kadr hero w pełnej jakości |
| `design/intro/frames/` | 72 klatki PNG z przezroczystością, poza gitem |
| `public/intro/ribbon-960.mp4`, `ribbon-640.mp4` | Film na stronę, ok. 320 KB i 170 KB |
| `public/hero-form-blender.webp` | Kadr hero na stronę |
| `src/components/blocks/intro-ribbon.ts` | Odtwarzacz WebGL |
| `src/components/blocks/PortfolioMotion.tsx` | Scena intro i przejście do hero |
| `src/components/blocks/intro-cover.tsx` | Zasłona przed pierwszym malowaniem strony |

Geometria pochodzi z `about_background.py` i `hero_proposal.py`, więc wstęga
w intro, w hero i w tle „O mnie” ma te same materiały i światła.

## Render

Uruchom z katalogu projektu (na M1 Pro cały render trwa kilka minut):

```sh
# szybki podgląd: 35% rozdzielczości, 10 próbek, design/intro/frames-preview/
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/intro_sequence.py -- --preview

# sprawdzenie, czy forma w żadnej klatce nie dotyka krawędzi kadru
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/intro_sequence.py -- --check

# 72 klatki 960 × 1056 i plik .blend
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/intro_sequence.py

# kadr hero 1000 × 1100
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/intro_sequence.py -- --hero
```

Dodatkowe opcje: `--frames 1,36,72` renderuje wybrane klatki, `--samples 40`
zmienia liczbę próbek.

Potem film i obraz hero:

```sh
sh scripts/blender/encode_intro.sh
cwebp -q 86 -alpha_q 90 -m 6 -sharp_yuv design/intro/hero-form.png \
  -o public/hero-form-blender.webp
```

Po każdej zmianie animacji wyrenderuj od nowa także kadr hero. Ostatnia klatka
filmu i obraz hero muszą pochodzić z tej samej wersji skryptu.

## Jak to działa

- **Ruch.** Funkcja `timeline()` w skrypcie opisuje wszystkie wartości w czasie:
  rysowanie kreski (`grow`), rozwijanie bryły (`unfurl`), obrót, przechylenie,
  dolly zoom, żarzenie kreski i przelot pasa światła. Geometria zmienia się
  w handlerze `frame_change_pre`, więc działa rozmycie ruchu z Cycles.
- **Kadr z zapasem.** Klatki obejmują 1,3 raza większy obszar niż kadr hero
  (`PAD`). Forma może się swobodnie obracać i nigdy nie jest ucięta krawędzią.
  Kadr hero to dokładnie środek ostatniej klatki: ta sama pozycja kamery,
  obiektyw dłuższy 1,3 raza.
- **Przezroczystość w MP4.** H.264 nie ma kanału alfa. Każda klatka filmu ma
  więc kolor po lewej i maskę alfa po prawej (1920 × 1056, poziom 4.0). Ten
  rozmiar mieści się w sprzętowych dekoderach telefonów, także tych z limitem
  1920 × 1088 na Androidzie. WebGL składa obie połowy z powrotem. Taki film
  jest kilkukrotnie lżejszy od sekwencji WebP i nie zajmuje setek MB pamięci.
- **Synchronizacja.** Strona pobiera cały plik, dopiero potem startuje.
  Jeśli film nie zdąży w 2,6 s albo przeglądarka zablokuje odtwarzanie
  (np. tryb oszczędzania energii na iPhonie), intro pokazuje nieruchomą wstęgę
  i dalej ląduje w hero.
- **Lądowanie.** Wstęga leci na obraz w hero, a „strona.” na trzecią linię
  nagłówka. Pozycje są mierzone w chwili lądowania, więc działają na każdym
  ekranie. Po lądowaniu podmiana na prawdziwe elementy strony jest niewidoczna.

## Kiedy intro się pokazuje

Raz na sesję przeglądarki, przy wejściu na górę strony głównej, bez kotwicy
w adresie. Nie pokazuje się przy włączonym ograniczeniu ruchu. „Pomiń intro”,
Escape i przycisk „Odtwórz intro” w hero działają jak wcześniej.
