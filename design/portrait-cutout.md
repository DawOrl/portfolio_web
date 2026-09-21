# Portret do sekcji „O mnie”

- Źródło: `public/profile-editorial.png` (zachowane bez zmian).
- Wynik: `public/profile-cutout.png`, 1122 × 1402, PNG z przezroczystością.
- Narzędzie: wbudowany imagegen, tryb edycji obrazu.
- Zastosowanie: `src/components/blocks/AboutPortrait.tsx`.

## Prompt

Use case: background-extraction / identity-preserve. Edit target: the supplied black-and-white portrait of Dawid, a young adult man with wavy dark hair and short beard wearing a plain black crewneck sweatshirt. This is a background removal task for a professional portfolio website. Remove ONLY the off-white background and replace it with genuine alpha transparency (transparent PNG). Preserve the same person, same face, facial geometry, expression, hairstyle including flyaway hairs, beard, pose, clothes, grayscale treatment, lighting and photographic texture exactly. Do not beautify, age, relight, stylize, or redesign the person. Keep the full top of the hair with a small transparent margin. Keep both shoulders and the torso down to the bottom edge, do not narrow the shoulders. Match the existing portrait framing. Center the figure. High quality natural edge matting with no white fringe, halo or residual white background, suitable over a dark #1D1D1D website background. No text, no objects, no shadow behind the subject, no scenery. Output a portrait-oriented transparent PNG.
