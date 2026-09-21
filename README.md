# portfolio_web — Dawid Orłowski

Jednostronicowa **wizytówka / landing page** sprzedająca usługi tworzenia stron internetowych dla firm. Pozycjonowanie hybrydowe: oferta na froncie, doświadczenie i kompetencje jako dowód zaufania.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · framer-motion · shadcn/ui · lucide-react

---

## Szybki start

```bash
npm install      # instalacja zależności
npm run dev      # serwer deweloperski → http://localhost:3000
npm run build    # build produkcyjny
npm run start    # serwowanie buildu produkcyjnego
npm run lint     # ESLint
```

Wymagany Node.js 20+.

---

## Funkcje

- **Sekcje sprzedażowe:** Hero z propozycją wartości, Oferta/Usługi, Realizacje (z modalem i lightboxem), Proces współpracy, O mnie, Cennik, FAQ, Formularz kontaktowy.
- **Animacje:** wejścia na scroll (`Reveal`), kinetyczny hero, pasek postępu przewijania, animowane tło „Aurora" — wszystko z poszanowaniem `prefers-reduced-motion`.
- **Branding:** ciemny motyw premium — amber `#F59E0B` na ciepłym węglu `#0C0A09`, akcenty w gradiencie amber→róż.
- **Responsywność:** mobile-first, sticky navbar z menu mobilnym.
- **SEO:** metadane + Open Graph + Twitter Card, dane strukturalne JSON-LD (schema.org), `robots.txt` i `sitemap.xml`, treść po polsku (`lang="pl"`).

---

## Struktura

```
src/
├── app/
│   ├── layout.tsx        # fonty (next/font), metadane, JSON-LD, ThemeProvider
│   ├── page.tsx          # kompozycja całej strony (kolejność sekcji)
│   ├── globals.css       # tokeny motywu (@theme), paleta, keyframes
│   ├── robots.ts         # robots.txt
│   └── sitemap.ts        # sitemap.xml
├── components/
│   ├── blocks/           # sekcje: Hero, ServicesSection, ProjectGallery, FaqSection, ...
│   └── ui/               # prymitywy: button, card, Section, Reveal
├── data/
│   └── cv-data.ts        # JEDNO źródło treści (cvData)
└── lib/
    ├── site.ts           # bazowy adres serwisu (SEO)
    └── utils.ts          # helper cn()
```

---

## Jak edytować

| Co chcesz zmienić | Gdzie |
|---|---|
| Treści (oferta, cennik, FAQ, projekty, dane osobowe) | `src/data/cv-data.ts` |
| Kolejność / dodanie sekcji | `src/app/page.tsx` |
| Kolory, fonty, promienie | `src/app/globals.css` (blok `.dark` + `@theme`) |
| Tło (Aurora) | `src/components/blocks/Aurora.tsx` |
| Logo technologii (stack/marquee) | pliki SVG w `public/icons/` + mapy w `TechStack.tsx` / `InfiniteMarquee.tsx` |
| Klucz formularza (Web3Forms) | zmienna `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` |
| Adres serwisu (SEO, sitemap) | zmienna `NEXT_PUBLIC_SITE_URL` lub `src/lib/site.ts` |

### Formularz kontaktowy

Formularz obsługuje dwa warianty:

- **OVH SMTP + Turnstile:** własny szablon HTML w kolorach portfolio, wersja tekstowa i odpowiedź bezpośrednio do klienta. Instrukcja aktywacji: [konfiguracja poczty](design/contact-email-setup.md). Hasła wyłącznie w zmiennych serwerowych.
- **Web3Forms:** dotychczasowa wysyłka działa do czasu skonfigurowania SMTP i Turnstile. Publiczny klucz ustaw w zmiennej `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, nie w kodzie. Przy braku obu konfiguracji formularz otwiera program pocztowy.

Zmiana konfiguracji wymaga nowego wdrożenia. Testy bez wysyłania wiadomości: `node --test tests/contact.test.mjs`.

---

## Wdrożenie

Projekt ma statyczne strony oraz serwerową trasę `/api/contact` (Node.js) i jest gotowy do wdrożenia na **Vercel** (zalecane dla Next.js) — wystarczy podłączyć repozytorium. W ustawieniach środowiska warto ustawić `NEXT_PUBLIC_SITE_URL` na docelową domenę (używane w metadanych, `sitemap.xml` i danych strukturalnych).

---

## Do uzupełnienia

- [ ] Klucz `WEB3FORMS_ACCESS_KEY` (aktywacja wysyłki formularza).
- [ ] `NEXT_PUBLIC_SITE_URL` po wyborze domeny.
- [ ] Zdjęcia projektów 2 i 3 (brakujące pliki w `public/`).
- [ ] Potwierdzenie kwot w cenniku.
- [ ] (Opcjonalnie) sekcja opinii klientów — komponent `Testimonials.tsx` jest gotowy, wystarczy uzupełnić `cvData.testimonials` i dodać `<Testimonials />` w `page.tsx`, gdy pojawią się realne opinie.
- [ ] (Opcjonalnie) statyczny obraz Open Graph `public/og.png` + odwołanie w `metadata`.

---

© Dawid Orłowski. Wszelkie prawa zastrzeżone.
