# Ayat Sajadah · Sujud Tilawah

A local, working copy of the web app at:

- Preview: https://tilawah-sujud--6eg99sfe.preview.emergentagent.com/
- Static assets: https://tilawah-sujud--6eg99sfe.preview.static.emergentagent.com/

An Indonesian educational site about **Sujud Tilawah** (prostration of recitation):
"Ayat Sajadah: pengertian, dalil, hukum, dan tata cara sujud tilawah."
*Praktikum Al-Qur'an Kelompok 11.*

## What's in here

```
tilawah-sujud/
├── index.html                  entry point (asset paths are relative: ./…)
├── favicon.svg
├── package.json                deps + `npm run build`
├── build.mjs                   esbuild config (bundles src/ -> static/js/main.js)
├── static/
│   ├── css/main.f0e97c75.css   compiled styles (Tailwind)
│   └── js/main.js              app bundle (built from src/ with esbuild)
└── src/                        the React source (JSX)
    ├── App.js
    ├── index.js
    ├── index.css               placeholder for the Tailwind entry (see Notes)
    ├── components/             Hero, Navbar, AyatGrid, DalilList, HukumTabs,
    │                           TataCara, BacaanDoa, Hikmah, AlurKeputusan,
    │                           Kesimpulan, Pengertian, Marquee, StarField, ...
    ├── data/content.js         all page content/text
    ├── hooks/                  useReducedMotion, useTilt
    └── lib/                    lenis, utils
```

## Running it

It's a static site; serve the folder and open it:

```bash
npx serve .          # or:  python -m http.server 8000
```

## Rebuilding after editing `src/`

```bash
npm install --include=dev   # esbuild is a devDependency
npm run build               # writes static/js/main.js
```

## Notes

- `src/` is the original readable React source, reconstructed from the source map that
  shipped with the app.
- `static/js/main.js` is bundled with **esbuild** (`build.mjs`): JSX automatic runtime,
  `process.env.NODE_ENV` defined as `"production"`, and the `@/` import alias mapped to
  `src/`. Styles are not rebuilt — `static/css/main.f0e97c75.css` (the original compiled
  Tailwind output) is reused, so the design is byte-identical to the original.
- `src/index.css` (the Tailwind entry) and the Tailwind build config were **not** part of
  the published bundle, so they can't be recovered. The file here is a placeholder purely so
  the `@/index.css` import resolves; it is intentionally empty. Rebuilding the CSS would
  require recreating the original Tailwind config.
- Dependencies used by `src/`: `react`, `react-dom`, `@tanstack/react-query`, `lenis`,
  `gsap`, `@gsap/react`, `framer-motion`, `vanilla-tilt`, `clsx`, `tailwind-merge`,
  `@radix-ui/react-dialog`, `lucide-react`.
- The Emergent platform script and the PostHog analytics snippet were removed from
  `index.html` so the copy runs standalone without phoning home. Google Fonts
  (Amiri + Inter) are still loaded from the CDN.

## Fix applied vs. the original build

**"15 Ayat Sajadah" cards (`src/components/AyatGrid.jsx`) — hover/click flip.**

Original behaviour: hovering flipped a card to its back, but clicking it "pinned" the back
in a way that a second click could not undo while the pointer was still over the card —
so the card appeared stuck (the state kept `flipped = pinned || hover`, and releasing only
cleared the pin, not the hover).

Fix (two parts):

1. **Release on the second click.** On release the card now clears the hover state as well,
   so the second click flips the card back to the front even under the cursor.
2. **Separate, larger hitbox.** The pointer handlers used to sit on the element that rotates.
   As it turned edge-on mid-flip the pointer could drop off it, re-triggering hover so the
   card spun repeatedly — and the rounded corner was a dead zone. The handlers now live on a
   separate, non-rotating wrapper that is 6px larger than the card on every side
   (`style={{ padding: 6, margin: -6 }}` — inline, because the pre-built Tailwind CSS has no
   negative-margin utilities). The flip no longer moves the hit target, the hover area is a
   bit bigger than the card, and hovering the corner registers reliably.

Resulting interaction:

- **Hover** (over the card, just outside it, or on a corner) → flips once (a single 180° turn).
- **Click** → stays on the back.
- **Click again** → flips back to the front, even while still hovering.
