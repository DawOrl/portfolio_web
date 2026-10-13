# Tło sekcji „O mnie” z Blendera

Autorska scena proceduralna: skręcone, satynowe wstęgi z grafitowym metalem,
burgundowym wnętrzem i chłodną, wypolerowaną krawędzią. Portret zostaje osobnym
elementem strony. Środek kadru zachowuje spokojne, ciemne tło za twarzą.

Skrypt `scripts/blender/about_background.py` tworzy niezależne kompozycje
desktop i mobile, materiały, kamery oraz światło studyjne. Nie wymaga MCP,
dodatków, modeli ani tekstur. MCP służy do późniejszej edycji w otwartym Blenderze.

## Render

Uruchom z katalogu projektu. Na macOS binarka to
`/Applications/Blender.app/Contents/MacOS/Blender`.

```sh
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/about_background.py -- --preview

blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/about_background.py
```

Opcje skryptu:

- `--preview`: 40% rozdzielczości i 24 próbki.
- `--output-dir /ścieżka`: katalog na render i plik `.blend`.
- `--samples 64`: liczba próbek finalnego renderu.
- `--device CPU`: render bez akceleracji Metal; domyślnie Metal na macOS, CPU na innych systemach.
- `--only desktop` / `--only mobile`: render jednej kompozycji.

Wyniki w `design/blender/`:

- `about-background.blend`: dwie edytowalne sceny „About · Desktop” i „About · Mobile”.
- `about-background-desktop.png`: 2560 × 1440.
- `about-background-mobile.png`: 780 × 1300.

## Obrazy do strony

```sh
cwebp -q 88 -m 6 design/blender/about-background-desktop.png \
  -o public/about-background-blender-desktop.webp
cwebp -q 88 -m 6 design/blender/about-background-mobile.png \
  -o public/about-background-blender-mobile.webp
```

Zmiana kompozycji: położenia i rozmiary wstęg znajdują się w `create_scene()`.
Zmiana ich formy: szerokość, skręt oraz grubość w `ribbon()`.
Wartości kolorów materiałów są przekazywane w sRGB i przeliczane na przestrzeń
liniową Blendera. Render korzysta z Cycles, AgX i odszumiania.

## Zobacz etapy budowy w Blenderze

W konsoli Pythona Blendera (`Shift + F4`) uruchom:

```python
import runpy
runpy.run_path('/Users/dawid/Dev/Praca/portfolio_web/scripts/blender/show_about_process.py')
```

Otworzy się osobna scena „About · Proces powstawania”. Animacja pokazuje
geometrię, drugi element, materiały i światło. Jest to odtworzenie etapów
gotowej sceny. Znaczniki na osi czasu pozwalają przejść do konkretnego etapu;
Spacja uruchamia i zatrzymuje odtwarzanie. Pokaz zatrzymuje się na finalnym kadrze.
Własne sceny pozostają dostępne w selektorze scen.
