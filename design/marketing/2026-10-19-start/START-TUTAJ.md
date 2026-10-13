# Kampania startowa dorlowski.dev: zacznij tutaj

Pierwszy miesiąc w social mediach: tydzień 0 (14-18.10) na założenie kont, potem 4 tygodnie publikacji (19.10-15.11.2026). Facebook, Instagram i OLX, bez płatnych reklam.

## Gdzie co jest

| Co | Gdzie |
| --- | --- |
| Centrum kampanii: dziś, tydzień 0, kalendarz z grafikami i tekstami do skopiowania, rolki, teksty do kont, szablony wiadomości, grupy, przegląd wyników | https://claude.ai/artifact/11164uiMo3tRxuHQGmu2py (prywatna strona, odhaczanie i wyniki zapisują się automatycznie) |
| Pełna strategia i instrukcje krok po kroku | `PLAYBOOK.md` |
| Wszystkie teksty (jedno źródło) | `tresci/kampania.json` |
| Grafiki do publikacji (PNG) | `grafiki/` (posty `P..`, relacje `S..`, wyróżnione `H1-H5`, `profil.png`, `okladka-fb.png`, `olx-1..5`) |
| Rolki (MP4 bez muzyki) i ich okładki | `wideo/R1.mp4` ... `R4.mp4`, `R1-poster.jpg` ... |
| Zdjęcia z fal.ai (z promptami i kosztem 1,02 USD) | `zdjecia-fal/` |
| Brief kampanii (fakty, zasady, formaty) | `BRIEF.md` |

## Na start

1. Otwórz centrum kampanii i przejdź tydzień 0 (od środy 14.10).
2. Pliki do publikacji przenieś na telefon (AirDrop z `grafiki/` i `wideo/`) albo planuj posty w Meta Business Suite z komputera.
3. Od 19.10 zaczynaj dzień od sekcji „Dziś”.

## Zmiana tekstów, grafik lub rolek

Popraw tekst w `tresci/kampania.json`, potem z katalogu repozytorium:

```bash
node design/marketing/2026-10-19-start/narzedzia/grafiki/render.mjs          # wszystkie grafiki (np. --only P04,S12)
node design/marketing/2026-10-19-start/narzedzia/wideo/render.mjs            # wszystkie rolki (np. R2 R3), około 2 minut
```

Renderer grafik sam sprawdza ceny, telefon, e-mail, domenę, długie myślniki i jednoliterowe słowa na końcu linii. Rolki z nagraniami strony wymagają działającego `npm run dev` (localhost:3000).

## Zasady, których pilnujemy

- Demo zawsze jako „projekt autorski (demo)”. TopAuto Serwis to jedyna realizacja dla klienta.
- Żadnych wymyślonych opinii, wyników, rabatów ani presji czasu.
- Ceny zawsze z „od”: Start 990 zł, Landing 1 490 zł, Biznes 1 990 zł. Domena i hosting osobno.
