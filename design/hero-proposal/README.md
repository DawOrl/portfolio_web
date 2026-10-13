# Propozycja hero

Osobny podgląd kierunku wizualnego: duża typografia po lewej, jedna skręcona
wstęga po prawej i płynna, nieregularna dolna krawędź. Materiały nawiązują
do zaakceptowanego tła „O mnie”: satynowy grafit, burgund i chłodny metal.
Kierunek został wdrożony w pełnej aplikacji na http://127.0.0.1:3000/.
Ten katalog zachowuje pierwotny, osobny podgląd koncepcji i źródła Blendera.

Otwórz `index.html` lokalnie lub uruchom z tego katalogu:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Podgląd: http://127.0.0.1:8765/. Linki i miniatura portretu korzystają z
aplikacji uruchomionej na http://127.0.0.1:3000. Fonty i główny render
są zapisane lokalnie. Układ dostosowuje się do telefonu.

`hero-form.blend` zawiera osobną scenę; `scripts/blender/hero_proposal.py`
odtwarza transparentny render. Strona używa zoptymalizowanego,
przezroczystego `public/hero-form-blender.webp` (~45 KiB). Wdrożone animacje
to krótkie wejście formy i delikatny parallax przy przewijaniu na desktopie,
z nieruchomym widokiem dla `prefers-reduced-motion`. Podgląd HTML pozostaje
statyczny. Układ produkcyjny znajduje się w `src/app/hero-sculptural.css`.
