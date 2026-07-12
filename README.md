# Ligin Abraham — Portfolio

Ultra-premium, motion-driven personal portfolio. React 18 + Vite, GSAP/ScrollTrigger + Lenis for scroll-linked motion, React Three Fiber for the 3D hero, Framer Motion for modals, Tailwind for styling.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure

```
src/
├── components/       # Reusable UI (cursor, preloader, nav, modal, cards…)
│   └── three/        # Lazy-loaded 3D hero scene
├── sections/         # Page sections (Hero, About, Experience, Projects, Skills, Contact)
├── hooks/            # usePrefersReducedMotion, app-ready context
├── data/             # ← all content lives here
├── assets/lottie/    # Lottie micro-animations
└── lib/gsap.js       # Single GSAP plugin registration point
```

## Editing content

- **Projects** — add objects to `src/data/projects.js` (shape documented at the top of the file). Drop images in `public/projects/` and reference them by path. Cards, the horizontal gallery and the modal all scale automatically.
- **Experience / skills / bio / links** — `src/data/experience.js`, `src/data/skills.js`, `src/data/site.js`. The LinkedIn URL in `site.js` is a guess — update it.
- **Resume** — replace `public/resume.pdf` (current file is a generated placeholder).

## Motion & accessibility notes

- All scroll animation is GSAP + ScrollTrigger, synced to Lenis via the GSAP ticker.
- `prefers-reduced-motion` disables smooth scroll, the 3D scene, marquees, grain and the custom cursor; content renders statically.
- The project modal is focus-trapped, closes on Escape, and restores focus on close.
- Desktop shows a pinned horizontal project gallery; mobile falls back to a vertical stack.
# MyProfile
