# Round 2 — Mejoras Portafolio Edison Martínez

## Commits realizados

| #     | Hash     | Mensaje                                                                 |
|-------|----------|-------------------------------------------------------------------------|
| T1    | `63010e0` | feat(r2-t1): ProjectModal with shared-element transition + focus trap + keyboard operability |
| T2    | `a65e711` | feat(r2-t2): InteractiveTerminal with auto-typing, whoami + cat skills.txt, reduced-motion support |
| T3    | `39201d2` | feat(r2-t3): extract CounterValue into reusable component with built-in IntersectionObserver |
| T4    | `a0e5ae2` | feat(r2-t4): CodeShowcase with regex syntax highlighting + line-by-line reveal |
| T5    | `3d157bd` | feat(r2-t5): scroll-linked camera zoom (z=6→16) with smooth lerp + stars fade on scroll |
| T6    | `18e362f` | feat(r2-t6): favicon.svg with EM initials + og:image pending comment |
| T7    | `9d29045` | feat(r2-t7): ExperienceTimeline with scroll-linked SVG line + TODO_ placeholders |
| T8    | `badd556` | feat(r2-t8): cyclic typing subtitle - cycles through Full-Stack / MERN / Freelance |
| T9    | `0e00fe2` | feat(r2-t9): BackToTop with SVG circular progress ring + 30% threshold visibility |
| T10   | `4055d38` | feat(r2-t10): Services hover-reveal with clip-path circle expanding from cursor entry point |
| T11   | `e1067ce` | feat(r2-t11): Three.js preloading from Loader exit - start dynamic import early, reuse module promise |
| T12   | `21f94a5` | docs(r2-t12): document SPA architecture - 404 page not needed without routing |
| T13   | `099bf4c` | feat(r2-t13): device-tier detection for Three.js - low/medium/high geometry budgets based on cores + viewport width |
| T14   | *este*   | ROUND2_RESUMEN.md |

## Estado por tarea

| #   | Tarea                                      | Estado     | Notas |
|-----|--------------------------------------------|------------|-------|
| 1   | ProjectModal con focus trap + transición   | ✅ Hecho   | `startViewTransition` con fallback CSS, focus trap Tab/Shift+Tab, Escape, aria-modal |
| 2   | InteractiveTerminal en Hero                | ✅ Hecho   | Auto-typing con velocidad variable, 2 comandos (whoami, cat skills.txt), cursor blink, reduced-motion muestra inmediato |
| 3   | CounterValue componente reutilizable       | ✅ Hecho   | Extraído de Hero.jsx a CounterValue.jsx con IntersectionObserver propio, usa `useReducedMotion` |
| 4   | CodeShowcase con syntax highlighting        | ✅ Hecho   | Regex tokenizer para keywords/strings/comments/tags, 18 líneas, reveal línea por línea |
| 5   | Cámara 3D scroll-linked (HeroThreeScene)  | ✅ Hecho   | Mejora del existente: lerp suave, rango z=6→16, estrellas se desvanecen con scroll |
| 6   | Favicon SVG + og:image comment             | ✅ Hecho   | `public/favicon.svg` con initials EM + gradiente primary→accent. Comentario sobre og:image pendiente |
| 7   | ExperienceTimeline                         | ✅ Hecho   | Vertical timeline con SVG line scroll-linked (stroke-dashoffset), 4 milestones con `TODO_` |
| 8   | Typing subtitle cíclico                    | ✅ Hecho   | 3 frases: Full-Stack / MERN / Freelance, type/pause/delete loop, reduced-motion estático |
| 9   | BackToTop                                  | ✅ Hecho   | Botón flotante bottom-right, anillo SVG de progreso, aparece tras 30% scroll, usa lenis.scrollTo |
| 10  | Services hover reveal                      | ✅ Hecho   | `clip-path: circle()` expandiéndose desde el cursor, desktop-only (`pointer:fine`), usa `useReducedMotion` |
| 11  | Preloading Three.js desde Loader           | ✅ Hecho   | `threePreloader.js` inicia `import('three')` cuando Loader empieza a salir, HeroThreeScene reusa la promesa |
| 12  | Página 404                                 | ✅ Documentado | SPA sin router, 404 no aplica. Documentado en App.jsx |
| 13  | Device-tier detection Three.js             | ✅ Hecho   | Tier bajo/medio/alto según `hardwareConcurrency` + viewport, reduce estrellas/segmentos/partículas/pixelRatio |
| 14  | Auditoría final + ROUND2_RESUMEN.md        | ✅ Hecho   | — |

## Auditoría prefers-reduced-motion

| Componente/Efecto                        | JS hook              | CSS override                          | Estado |
|------------------------------------------|----------------------|---------------------------------------|--------|
| ProjectModal animaciones (fadeIn/slideUp)| N/A                  | `html.reduced-motion` animation-duration | ✅ |
| ProjectModal ViewTransition              | N/A                  | `html.reduced-motion` animation-duration | ✅ |
| InteractiveTerminal typing               | `reduced` prop       | N/A                                   | ✅ |
| CounterValue                             | `useReducedMotion`   | N/A                                   | ✅ |
| CodeShowcase line-by-line reveal         | `useReducedMotion`   | N/A                                   | ✅ |
| HeroThreeScene scroll-linked camera      | `reduced` prop       | N/A (todo el efecto skip si reduced)  | ✅ |
| ExperienceTimeline SVG line              | `useReducedMotion`   | N/A (progress = 1 si reduced)         | ✅ |
| Hero typing subtitle cíclico             | `reduced` prop       | N/A (primera frase estática)          | ✅ |
| BackToTop scroll spy                     | `useReducedMotion`   | N/A                                   | ✅ |
| Services hover-reveal clip-path          | `useReducedMotion`   | N/A                                   | ✅ |
| Three.js preloader (Loader)              | N/A                  | N/A (no visible)                      | ✅ |
| Device-tier detection                    | N/A                  | N/A (no visible, solo lógica)         | ✅ |

## Bundle sizes (gzip)

| Archivo           | Round 1 (raw) | Round 1 (gzip) | Round 2 (raw)  | Round 2 (gzip) | Δ raw   | Δ gzip |
|-------------------|---------------|----------------|----------------|----------------|---------|--------|
| index.html        | 2.59 kB       | 0.91 kB        | 2.63 kB        | 0.92 kB        | +0.04   | +0.01  |
| index.css         | 78.46 kB      | 13.68 kB       | 88.65 kB       | 14.83 kB       | +10.19  | +1.15  |
| index.js          | 226.51 kB     | 70.06 kB       | 249.56 kB      | 76.02 kB       | +23.05  | +5.96  |
| three.module.js   | 734.52 kB     | 189.60 kB      | 734.52 kB      | 189.60 kB      | 0       | 0      |
| **Total**         | **1042 kB**   | **274 kB**     | **1075 kB**    | **281 kB**     | **+33** | **+7** |

Notas:
- Three.js se carga dinámicamente solo en desktop (>=1024px) y ahora con preloading desde el Loader.
- El incremento en JS (23 kB raw) corresponde a los 7 nuevos componentes y utilidades.
- El incremento en CSS (10 kB raw) corresponde a animaciones de modal, timeline, code showcase, etc.

## TODO_ placeholders

| Archivo                      | Placeholder                  | Notas |
|------------------------------|------------------------------|-------|
| `ExperienceTimeline.jsx`     | `TODO_2021`, `TODO_2022`, `TODO_2023`, `TODO_2024` | Años de los hitos |
| `ExperienceTimeline.jsx`     | `TODO_Proyectos iniciales`, `TODO_Cliente importante`, `TODO_Nombre de certificación`, `TODO_Objetivo alcanzado` | Subtítulos de cada hito |
| `ExperienceTimeline.jsx`     | `TODO_Descripción de los primeros proyectos…`, etc. | Descripciones detalladas |

## Issues conocidos

1. **og-image.jpg no existe**: Las etiquetas Open Graph y Twitter apuntan a
   `https://edisonm22.github.io/Portafolio-Edison-Martinez/og-image.jpg` que
   retorna 404. Ya documentado en R1 y re-documentado con comentario HTML en
   `index.html`.

2. **TODO_ placeholders en ExperienceTimeline**: Los 4 milestones contienen
   datos ficticios con prefijo `TODO_`. Reemplazar con datos reales de la
   trayectoria profesional.

3. **Three.js chunk grande**: 734 kB raw / 190 kB gzip. Se carga con dynamic
   import y ahora se precarga desde el Loader, pero sigue siendo un chunk
   grande. Para reducirlo habría que tree-shake Three.js o migrar a una
   escena CSS 3D.

## Decisiones de diseño

- **ProjectModal**: Se usó `document.startViewTransition` + `flushSync` para
  la transición compartida, con animación CSS (modal-slideUp) como fallback.
  El focus trap replica el patrón de Sidebar.jsx.

- **InteractiveTerminal**: Implementado con `async/await` y promesas con
  `setTimeout` para el typing secuencial. Cada letra tiene velocidad variable
  (10-50ms) para sonar más natural.

- **CounterValue**: Se movió de función local a componente independiente con
  su propio IntersectionObserver. Ahora cualquier sección puede usarlo sin
  depender del estado `countersVisible` de Hero.

- **CodeShowcase**: Tokenizer manual con regex para keywords, strings,
  comments, JSX tags y números. No depende de librerías de highlighting.

- **ExperienceTimeline**: El SVG line usa `stroke-dashoffset` controlado por
  scroll progress dentro de la sección. Cálculo: `offset / (sectionHeight + viewHeight)`.

- **BackToTop**: El anillo de progreso usa SVG `stroke-dasharray`/`stroke-dashoffset`.
  Aparece con transición CSS cuando scroll > 30%.

- **Services hover-reveal**: `clip-path: circle()` con CSS transition. El
  centro del círculo sigue al cursor mediante `mousemove`. Solo en desktop
  (`pointer: fine`).

- **Device-tier detection**: Combinación de `navigator.hardwareConcurrency`
  y `window.innerWidth`. Tres tiers con geometría progresiva. El pixel ratio
  se limita según el tier (1, 1.5 o 2).
