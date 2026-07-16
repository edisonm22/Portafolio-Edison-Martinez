# Portfolio — Architecture Guide

## Overview

Single-page application built with **React 18.3 + Vite 6 + Tailwind v4**.  
The visual identity is a dark‑first, premium developer portfolio with Three.js 3D accent (hero only), smooth Lenis scrolling, and custom CSS animations — no secondary WebGL system.

No TypeScript, no route library (SPA, hash‑section navigation), no CMS.

## Folder Structure

```
src/
├── App.jsx                  # Root layout: Lenis, Loader, Sidebar, sections, Cursor, BackToTop
├── main.jsx                 # ReactDOM entry point
├── index.css                # Design tokens, @keyframes, component classes
│
├── components/
│   ├── layout/              # Page‑structure components
│   │   ├── Sidebar.jsx          # Sticky left nav: section numbers + links, active tracking
│   │   ├── SectionWrapper.jsx   # Consistent section header (eyebrow + H2 + subtitle)
│   │   └── index.js
│   │
│   ├── sections/            # Full‑page sections (order matches nav narrative)
│   │   ├── Hero.jsx             # Title (word‑reveal), subtitle, counters, ThreeScene, CTA
│   │   ├── Skills.jsx           # Skill bars + CodeShowcase tiles
│   │   ├── ExperienceTimeline.jsx  # Scroll‑linked SVG line + career milestones
│   │   ├── Projects.jsx         # ProjectCard grid + ProjectModal (ViewTransition)
│   │   ├── Services.jsx         # Service cards with hover‑reveal mask
│   │   ├── Contact.jsx          # Form (Web3Forms) + gradient border animation
│   │   └── index.js
│   │
│   ├── effects/             # Visual effects, not tied to a single section
│   │   ├── Cursor.jsx           # Decorative dot (mix‑blend‑mode difference, desktop only)
│   │   ├── HeroThreeScene.jsx   # Single WebGL system: torus‑knot + scroll‑linked camera
│   │   ├── Loader.jsx           # Entrance loader with letter‑reveal animation
│   │   ├── BackToTop.jsx        # Floating button (SVG progress ring)
│   │   └── index.js
│   │
│   ├── ui/                  # Small, reusable UI primitives
│   │   ├── ProjectCard.jsx      # Tilt + spotlight + tech tags
│   │   ├── ProjectModal.jsx     # Focus‑trapped modal with shared‑element transition
│   │   ├── SkillBar.jsx         # Animated progress bar
│   │   ├── CounterValue.jsx     # Animated number counter (intersection‑observer)
│   │   ├── CodeShowcase.jsx     # Syntax‑highlighted code block with line‑by‑line reveal
│   │   ├── InteractiveTerminal.jsx  # Typing‑effect CLI terminal
│   │   └── index.js
│   │
│   └── cv/                  # Disconnected CV page (not imported by App.jsx)
│       ├── CVLayout.jsx         # Grid layout
│       ├── CVHero.jsx           # CV header with photo
│       ├── CVAbout.jsx
│       ├── CVExperience.jsx
│       ├── CVEducation.jsx
│       ├── CVSkills.jsx
│       ├── CVProjects.jsx
│       ├── CVContact.jsx
│       └── SectionHeading.jsx
│
├── hooks/                   # Custom React hooks (shared, reusable)
│   ├── useReducedMotion.js      # prefers‑reduced‑motion + html.reduced‑motion class
│   ├── useScrollReveal.js       # Intersection‑observer for reveal effects
│   ├── useMagnetic.js           # Magnetic‑pull effect on mouse hover (rAF‑throttled)
│   └── useTilt3D.js             # Device‑orientation / mouse‑based tilt (touch‑safe)
│
├── data/
│   ├── navData.js               # Navigation item array (labels, IDs, sectionNum order)
│   ├── skills.js                 # Skill categories + items
│   ├── projects.js               # Project entries (FALLBACK_PROJECTS)
│   ├── services.js               # Service entries
│   └── cvData.js                 # CV data (not used by app — kept for /cv route)
│
└── utils/
    ├── helpers.js                # scrollToSection, scrollToSectionByIndex
    ├── threePreloader.js         # Dynamic import of Three.js + preload call
    └── techColors.js             # getTechColor mapping (language → color)
```

## Section Order (Conversion Narrative)

The sections are intentionally ordered to tell a conversion story:

1. **Hero** — Hook: who I am, what I do, immediate value proposition
2. **Skills** — Credibility: technologies I master
3. **Experience** — Proof: career trajectory and milestones
4. **Projects** — Evidence: real work samples
5. **Services** — Offer: what I can do for you
6. **Contact** — Call to action: let's talk

This order is defined in `src/data/navData.js` (hardcoded) and consumed by both `App.jsx` (rendering order) and `Sidebar.jsx` (active‑section highlighting).

## Design System Tokens

All design tokens are defined in `src/index.css` inside the `@theme` block:

| Token Group     | Examples |
|-----------------|----------|
| Colors          | `--color-primary`, `--color-surface-*` |
| Fonts           | `--font-body` (Inter), `--font-display` (Space Grotesk), `--font-mono` (JetBrains Mono) |
| Typography      | `--text-display` through `--text-caption` |
| Spacing         | `--spacing-section`, `--spacing-block`, `--spacing-stack-*` |
| Border radius   | `--radius-sm` through `--radius-2xl` |
| Shadows         | `--shadow-card`, `--shadow-button-glow`, `--shadow-elevated` |
| Easing          | `--ease-out-expo`, `--ease-spring` |

Components use Tailwind utility classes (`text-h2`, `shadow-card`) and, where needed, arbitrary values reference CSS custom properties directly (`bg-[var(--color-primary)]`).

## Hook Catalog

| Hook | File | Purpose | Touch‑safe? | Reduced‑motion? |
|------|------|---------|-------------|-----------------|
| `useReducedMotion` | `hooks/useReducedMotion.js` | Returns boolean; adds `html.reduced-motion` class | — | — |
| `useScrollReveal` | `hooks/useScrollReveal.js` | Intersection‑observer for reveal‑on‑scroll animations | ✅ (native) | ✅ (CSS‑only) |
| `useMagnetic` | `hooks/useMagnetic.js` | Mouse‑following magnetic pull on element (rAF‑throttled) | ❌ (`pointer:coarse` guard) | ✅ |
| `useTilt3D` | `hooks/useTilt3D.js` | Mouse‑based 3D tilt / device‑orientation | ❌ (`pointer:coarse` guard) | ✅ |

## Accessibility (WCAG AA)

- **Contrast**: text vs. background ratio ≥ 4.5:1 (verified: `color-surface-400` on `surface-950` = 3.0:1 for muted text; primary text uses `surface-100` on `surface-950` = 14:1)
- **Focus visible**: `*:focus-visible` ring in `index.css`
- **Reduced motion**: `html.reduced-motion` disables all non‑essential animations
- **Semantic HTML**: `header`, `nav`, `main`, `section`, `article`, `footer`
- **Labels**: `aria-label`, `aria-invalid`, `aria-describedby` on form fields
- **Keyboard**: full Tab‑cycle focus trap in `Sidebar` (mobile menu) and `ProjectModal`

## Bundle & Performance

| Asset | Raw | Gzip | Notes |
|-------|-----|------|-------|
| `index.js` | ~249 kB | ~76 kB | All React + app code |
| `index.css` | ~89 kB | ~15 kB | Tailwind utility output + custom classes |
| `three.module.js` | ~735 kB | ~190 kB | Dynamic import (desktop only, medium/high tier) |

Three.js is loaded via `utils/threePreloader.js` — dynamically imported only when the browser is desktop and device tier is medium/high. This keeps the initial bundle lean.

## Development

```bash
npm run dev      # Vite dev server (localhost:5173)
npm run build    # Production build → dist/
npm run lint     # ESLint (src/ --ext .jsx,.js)
npm run preview  # Preview production build
```

## Dependencies (zero‑runtime additions)

- `react`, `react-dom` (18.3)
- `three` (0.185 — dynamic import only)
- `lenis` (1.3 — smooth scrolling)
- Tailwind v4 (CDN in `index.html` + `@tailwindcss/vite`)
- Vite 6 (bundler)
- ESLint + `eslint-plugin-react` (dev only)

No state management, no routing, no CSS‑in‑JS, no animation library beyond CSS + Three.js.
