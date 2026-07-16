# Noche de Mejoras — Portafolio Edison Martínez

## Commits realizados

| #  | Hash     | Mensaje                                                                 |
|----|----------|-------------------------------------------------------------------------|
| T1 | `94ead75` | feat(1): dead code cleanup - remove unused useCallback, typingDone, depthLayersRef |
| T2 | `cfef94d` | feat(2): responsive audit - add Escape key + focus trap for mobile menu |
| T3 | `336840c` | feat(3): scroll indicator - backdrop-blur, scroll-based fade, contrast improvements |
| T4 | `d1d978a` | feat(4): performance audit - fix useMagnetic rAF loop never starting on mouse enter |
| T5 | `05b4297` | feat(5): blur-to-sharp reveal on project card images via IntersectionObserver |
| T6 | `2118a94` | feat(6): form polish - per-field validation, aria-invalid, aria-describedby, blur validation |
| T7 | `a8a975b` | feat(7): reduced-motion audit - Lenis respects prefers-reduced-motion, CounterValue skips animation |
| T8 | —        | Open Graph image check (solo documentación) |
| T9 | `f6c5405` | feat(9): perf useTilt3D - remove getBoundingClientRect from onMove (layout thrashing) |
| T10| `86e8b1e` | feat(10): sidebar + Lenis - expose global lenis, use lenis.scrollTo for smooth nav |
| T11| —        | Entrance animation verification (sin cambios) |
| T12| `a38fc0d` | feat(12): magnetic buttons on touch - add pointer:coarse guard to useTilt3D |
| T13| `3f2d1e8` | feat(13): WCAG AA contrast audit - fix text colors to surface-400 across 8 files |
| T14| —        | Bundle size review (sin cambios) |
| T15| —        | Visual coherence check (sin cambios) |
| T16| `TBD`    | NOCHE_RESUMEN.md |

## Estado por tarea

| #  | Tarea                              | Estado     | Notas |
|----|------------------------------------|------------|-------|
| 1  | Dead code cleanup                  | ✅ Hecho   | Variables y hooks no usados eliminados |
| 2  | Responsive audit                   | ✅ Hecho   | Escape key + focus trap en menú mobile |
| 3  | Hero scroll indicator              | ✅ Hecho   | backdrop-blur, fade en scroll |
| 4  | Performance listeners              | ✅ Hecho   | useMagnetic rAF loop bug corregido |
| 5  | Blur-to-sharp ProjectCard          | ✅ Hecho   | IntersectionObserver + reduced-motion |
| 6  | Formulario contacto                | ✅ Hecho   | Validación inline, aria-invalid, blur |
| 7  | prefers-reduced-motion             | ✅ Hecho   | Lenis + CounterValue corregidos |
| 8  | Open Graph image                   | ⚠️ Documentado | og-image.jpg no existe (404) |
| 9  | useTilt3D performance              | ✅ Hecho   | Layout thrash eliminado en onMove |
| 10 | Sidebar + Lenis                    | ✅ Hecho   | lenis.scrollTo para navegación smooth |
| 11 | Torus knot entrance                | ✅ Verificado | 1.5s cubic ease-out OK |
| 12 | Botones magnéticos touch           | ✅ Hecho   | pointer:coarse guard en useTilt3D |
| 13 | Contraste WCAG AA                  | ✅ Hecho   | 8 archivos corregidos |
| 14 | Bundle size                        | ⚠️ Revisado | Three.js 734 kB raw, esperado |
| 15 | Coherencia visual                  | ✅ Verificado | Screenshots OK, 0 errores consola |
| 16 | NOCHE_RESUMEN.md                   | ✅ Hecho   | — |

## Auditoría prefers-reduced-motion

| Componente/Efecto              | JS hook | CSS override | Estado |
|--------------------------------|---------|-------------|--------|
| Loader animación               | ✅ `reducedMotionNow` | N/A | ✅ |
| Lenis smooth scroll            | ✅ `matchMedia` inline | N/A | ✅ |
| Hero word-reveal               | ✅ `useReducedMotion` | CSS class | ✅ |
| Hero typing subtitle           | ✅ `reduced` prop | CSS class | ✅ |
| Hero blob parallax             | ✅ `useReducedMotion` | CSS class | ✅ |
| Hero mouse parallax            | ✅ `useReducedMotion` | CSS class | ✅ |
| Hero animated counters         | ✅ `matchMedia` inline | N/A | ✅ |
| Hero scroll indicator          | ✅ `useReducedMotion` | CSS class | ✅ |
| Hero Three.js scene            | ✅ `reduced` prop | N/A | ✅ |
| Hero CSS particles             | CSS class | ✅ `html.reduced-motion` | ✅ |
| Skill bar transitions          | N/A | ✅ `html.reduced-motion` | ✅ |
| ProjectCard blur reveal        | ✅ `useReducedMotion` | N/A | ✅ |
| ProjectCard 3D parallax        | N/A (solo hover) | ✅ `html.reduced-motion` | ✅ |
| ProjectCard spotlight          | N/A (solo hover) | N/A (hover) | ✅ |
| Services tilt + border-shimmer | ✅ `useReducedMotion` | CSS class | ✅ |
| SectionWrapper 3D shapes       | N/A | ✅ `html.reduced-motion` | ✅ |
| Section title parallax         | ✅ scroll listener | N/A | ✅ |
| useTilt3D                      | ✅ `useReducedMotion` | N/A | ✅ |
| useMagnetic                    | ✅ `useReducedMotion` | N/A | ✅ |
| Cursor                         | ✅ `useReducedMotion` | CSS class | ✅ |
| Sidebar scroll progress        | ✅ `useReducedMotion` | N/A | ✅ |
| Sidebar section number         | N/A | CSS class | ✅ |
| Loader CSS letters             | N/A | ✅ `html.reduced-motion` | ✅ |
| Scroll reveal (useScrollReveal)| N/A | ✅ `html.reduced-motion` | ✅ |
| Gradient text animated         | N/A | CSS class | ✅ |
| Noise overlay                  | N/A | ✅ `html.reduced-motion` | ✅ |
| Form success animation         | N/A | CSS class | ✅ |
| Border shimmer (cards)         | N/A | CSS class | ✅ |

## Bundle sizes (gzip)

| Archivo           | Raw       | Gzip     |
|-------------------|-----------|----------|
| index.html        | 2.59 kB   | 0.91 kB  |
| index.css         | 78.46 kB  | 13.68 kB |
| index.js          | 226.51 kB | 70.06 kB |
| three.module.js   | 734.52 kB | 189.60 kB |
| **Total**         | **1042 kB** | **274 kB** |

Nota: Three.js se carga dinámicamente solo en desktop (>=1024px).

## Issues conocidos

1. **og-image.jpg no existe**: Las etiquetas Open Graph y Twitter apuntan a
   `https://edisonm22.github.io/Portafolio-Edison-Martinez/og-image.jpg` que
   retorna 404. No se generó imagen por restricción de spec.

2. **Chunk grande**: three.module.js pesa 734 kB raw / 190 kB gzip. Es una
   dependencia externa y se carga con dynamic import, pero podría optimizarse
   con tree-shaking o una escena más simple.

3. **Contraste**: text-surface-500 (#64748b) en surface-950 (#0a0f1a) da 4.29:1
   que está muy cerca pero justo por debajo de 4.5:1 AA. Se reemplazó por
   surface-400 en la mayoría de casos.

## Decisiones de diseño

- Se usó `window.__lenis` para exponer la instancia de Lenis globalmente
  (patrón común en SPAs con Lenis).
- Se prefirió `matchMedia('(pointer: coarse)')` sobre `ontouchstart` para
  detectar dispositivos táctiles, por ser más precisa y no depender de eventos.
- Los contrastes se corrigieron cambiando clases Tailwind en componentes
  individuales en vez de modificar los tokens de diseño, para no afectar
  backgrounds/borders donde los colores originales funcionan correctamente.
- El blur-to-sharp en ProjectCard usa IntersectionObserver con `requestAnimationFrame`
  para evitar el parpadeo típico de transiciones CSS en elementos que entran al viewport.
