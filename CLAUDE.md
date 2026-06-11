# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js) at http://localhost:3000
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

There is no test setup in this project.

## Architecture

Single-page **services landing page** built with **Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + framer-motion**. It sells web-development services to businesses (hybrid positioning: offer first, personal CV as credibility). One page, no routing beyond `/`.

- **`src/app/page.tsx`** composes the whole site as an ordered stack of sections (Hero → Services → Projects → Process → CTA → About → TechStack → Pricing → FAQ → Contact → SocialLinks → Footer). It is a **server component** (no `"use client"`) — each section is its own client component. To add/reorder a section, edit this file. Section anchors (`#uslugi`, `#realizacje`, `#proces`, `#cennik`, `#o-mnie`, `#faq`, `#kontakt`) are the nav/CTA scroll targets. Scrolling is normal smooth scroll with per-section reveal animations — a fullpage/scroll-snap experiment was tried and reverted (sections are too content-dense to fit one viewport on typical laptop heights, which forced internal scrollbars and janky snapping).
- **`src/data/cv-data.ts`** is the single source of truth for all content (`cvData`): `personal` (incl. `headline`/`subheadline`/`availability`), `highlights`, `services`, `processSteps`, `pricing`, `testimonials`, `faq`, `projects`, plus the original CV fields (`experience`, `education`, `certifications`, `skills`, `otherExperience`). Section icons are stored as **string names** mapped to lucide components in the consuming component (e.g. `InfiniteMarquee`'s `iconMap`; `ServicesSection` no longer renders icons — its bento cards use big typographic numbers instead). `projects` was moved here from `ProjectGallery`.
- **Tech-stack logos:** `TechStack` (an interactive "logo cloud" — logo tiles grouped into 3 categories, name shown in a hover tooltip) and `InfiniteMarquee` use real **brand-colour SVG logos** from `public/icons/*.svg` via `<img src="/icons/<name>.svg">`, not lucide. Those SVGs were pulled from devicon (colour) + simple-icons CDN (AI tools / white versions of black logos like Next.js, Vercel); `api.svg` and `nano-banana.svg` are hand-drawn. To add a tool: drop a `<name>.svg` in `public/icons/` and reference it.
- **`src/components/ui/`** — shared primitives: shadcn `button`/`card` (New York style), plus **`Section`/`SectionHeading`** (consistent section padding, max-width, anchor offset, eyebrow+title+subtitle), **`Reveal`** (standard scroll-reveal wrapper that respects `prefers-reduced-motion` via `useReducedMotion`) and **`Magnetic`** (cursor-following spring wrapper used on hero CTAs; inert for touch and reduced-motion). Reuse these for any new section instead of re-implementing motion. **Note:** `button`'s `outline`/`ghost` variants were deliberately changed from the shadcn defaults (`hover:bg-muted hover:text-foreground`) — the stock `hover:text-accent-foreground` rendered dark text on a dark hover bg in this theme. Don't revert.
- **`src/components/blocks/`** — section components (`Navbar`, `Hero`, `ServicesSection`, `ProcessSection`, `CtaBand`, `AboutSection`, `PricingSection`, `FaqSection`, `ContactSection`, `ProjectGallery`, `ProjectShowcase`, `TechStack`, `SocialLinks`, `InfiniteMarquee`, `ScrollProgress`, `Aurora`). `Hero` is a cinematic intro: line-mask kinetic headline (`KineticLine`), SVG marker underline accent, clip-path photo reveal, scroll-driven parallax/fade (`useScroll`), magnetic CTAs. `ProjectsTeaser` renders alternating full-width `ProjectShowcase` rows (image parallax inside a mask); the card grid (`ProjectCard`) is still used on `/realizacje`. `CtaBand` is a full-bleed marquee band (giant typography, whole band links to `#kontakt`, pauses on hover). `ServicesSection` is a 7/5–5/7 bento grid with amber flood-inversion hover. A film-grain overlay (`.bg-noise` utility) sits over the fixed background in `page.tsx`. `Testimonials` exists and is wired to `cvData.testimonials` but is **not** rendered in `page.tsx` (no real client opinions yet — re-add when available). `DevOpsTerminal`/`EmailDashboard`/`MacbookProject`/`Squares` also remain unused (legacy).
- **`ContactSection`** form: sends via **Web3Forms** (no backend) when `WEB3FORMS_ACCESS_KEY` is set; falls back to a `mailto:` link when empty.
- **SEO:** `src/app/robots.ts` + `sitemap.ts` (use `SITE_URL` from `src/lib/site.ts`, overridable via `NEXT_PUBLIC_SITE_URL`); rich metadata + `ProfessionalService` JSON-LD live in `layout.tsx`. No OG image asset yet (next/og default font drops Polish glyphs — add a static `public/og.png` instead).
- **`Aurora`** — the page background: soft blurred amber/rose glow blobs (`bg-primary`/`#f43f5e`) drifting via CSS `@keyframes aurora-*` in `globals.css`, fixed behind everything in `page.tsx`, with `motion-reduce:animate-none`. Replaced the old `Squares` grid (the `Squares.jsx`/`blocks/Squares.tsx` canvas files remain in the repo but are no longer used).

### Flexbox text-wrap gotcha
In a column flex with `items-center`, a text element with **no `max-width`** takes its `max-content` width and overflows on mobile. Headings/paragraphs in such columns must carry a width cap (`max-w-full`/`max-w-xl`). This bit the Hero headline during the rebuild.

## Theming & styling

- **Tailwind v4** is configured entirely in CSS — there is **no `tailwind.config.js`**. Theme tokens live in `src/app/globals.css` under `@theme` and CSS variables. PostCSS uses `@tailwindcss/postcss`.
- App is **dark-mode-first**: `layout.tsx` hardcodes `defaultTheme="dark"` with `enableSystem={false}` via `next-themes`. The light palette in `:root` is a fallback. Brand palette is **amber `#F59E0B` on warm charcoal `#0C0A09`** (the `.dark` block); the `.text-gradient` accent runs amber→rose `#F43F5E`. Fonts: **Sora** (`--font-display`) for headings, **Inter** (`--font-sans`) for body, both loaded via `next/font` with `latin-ext` for Polish glyphs.
- Use the **`cn()`** helper (`src/lib/utils.ts`, clsx + tailwind-merge) for conditional class composition.
- Path alias **`@/*` → `src/*`**. Component/util aliases are defined in `components.json` for shadcn (`@/components`, `@/components/ui`, `@/lib/utils`).
- Content is in **Polish** (`<html lang="pl">`); keep UI copy consistent with that.

## Adding shadcn components

`components.json` registers a custom registry `@react-bits` (`https://reactbits.dev/r/{name}.json`) alongside the default shadcn registry. Icon library is **lucide-react**.
