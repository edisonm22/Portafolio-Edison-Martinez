# Diagnóstico de Espaciado y Superposición — Post Ronda 3

## Hallazgos

### 1. Selector `.reveal[data-reveal-delay]` duplicado en `index.css`

**Archivo**: `src/index.css` (post‑reorganización T6)

**Problema**: El selector `.reveal[data-reveal-delay]` aparecía en **dos bloques separados**:

```
.reveal[data-reveal-delay] {           /* Bloque A — línea ~268 */
  transition-delay: calc(var(--reveal-delay, 0) * 1ms);
}

.reveal[data-reveal-delay] {           /* Bloque B — línea ~273 */
  transform: translateY(var(--reveal-distance, 40px)) scale(0.97);
}
```

**Riesgo**: Ambos tienen la misma especificidad (0,1,0) y declaran propiedades distintas. Funcionalmente no hay conflicto porque cada uno declara propiedades diferentes (`transition-delay` vs `transform`). Sin embargo, es frágil: si en el futuro alguien añade una tercera propiedad a uno de los dos, o cambia el orden, podría haber comportamientos inesperados donde un bloque sobrescriba propiedades del otro sin que sea obvio.

**Corrección**: Unificados en un solo bloque:

```css
.reveal[data-reveal-delay] {
  transform: translateY(var(--reveal-distance, 40px)) scale(0.97);
  transition-delay: calc(var(--reveal-delay, 0) * 1ms);
}
```

**Commit**: `75f09c1 fix(css): merge duplicate .reveal[data-reveal-delay] selector blocks`

---

### 2. `SectionWrapper.shapeIndex` — selección de forma decorativa por longitud de string

**Archivo**: `src/components/layout/SectionWrapper.jsx`

**Problema original**:
```js
const shapeIndex = (id?.length || 0) % 3
```

Esto calcula el índice de la forma decorativa basándose en la **longitud del string `id`**. Como resultado:
- `'projects'` (8 chars) y `'services'` (8 chars) → mismo índice
- `'home'` (4) y `'experience'` (10) → mismo índice (4%3=1, 10%3=1)
- Secciones adyacentes podían mostrar la misma forma decorativa, reduciendo la variedad visual

**Corrección** — mapeo explícito con distribución alternada:
```js
const SHAPE_BY_SECTION = {
  home: 0,        // hex
  skills: 1,      // diamond
  experience: 2,  // ring
  projects: 0,    // hex
  services: 1,    // diamond
  contact: 2,     // ring
}
const shapeIndex = SHAPE_BY_SECTION[id] ?? 0
```

Ninguna sección adyacente comparte la misma forma.

**Commit**: `0a18800 fix(config): restore base path + SectionWrapper shapeIndex as explicit map`

---

### 3. Revisión de espaciado duplicado entre secciones

**Archivos**: Todas las secciones en `src/components/sections/*.jsx`

**Análisis**: Cada sección (excepto Hero) usa `<SectionWrapper>` como único contenedor. `SectionWrapper` aplica:
- `py-section-mobile lg:py-section` (4rem / 7rem de padding vertical)
- `relative overflow-hidden`

Se verificó que **ninguna sección añade clases `mt-`, `mb-`, `py-`, `pt-`, o `pb-`** a nivel de contenedor raíz. El espaciado vertical está centralizado en `SectionWrapper`.

**Conclusión**: No hay espaciado duplicado entre secciones.

---

### 4. Revisión de cascada CSS — orden de `@keyframes` y reduced‑motion

**Análisis**: Se comparó el orden de todos los selectores entre la versión pre‑T6 y post‑T6 usando `git diff`. Los bloques de `@keyframes` y sus clases asociadas mantienen el mismo orden relativo:
1. `@theme` (design tokens)
2. `@utility` (sombras)
3. Global styles (`:root`, html, body, scrollbar)
4. Layout helpers (`.section-grid-bg`, `.noise-overlay`, `.section-divider`, `.scroll-progress-*`)
5. Reveal utilities (`.reveal`, `.reveal[data-reveal-delay]`, `.reveal-3d-*`)
6. Todos los `@keyframes` agrupados
7. Component classes (layout → effects → sections → UI)
8. Reduced‑motion overrides (`.html.reduced-motion`) — **después** de todas las clases base
9. `@media (prefers-reduced-motion)` — al final
10. CV layout (disconnected)

Las reglas `html.reduced-motion` tienen alta especificidad y están colocadas **después** de todas las clases base que sobrescriben, por lo que no hay riesgo de que una regla base anule el override.

**Conclusión**: No hay conflictos de cascada introducidos por la reorganización.

---

## Resumen de Correcciones

| # | Problema | Archivo | Tipo | Commit |
|---|----------|---------|------|--------|
| 1 | `.reveal[data-reveal-delay]` duplicado | `index.css` | Calidad / fragilidad | `75f09c1` |
| 2 | `shapeIndex` por longitud de string | `SectionWrapper.jsx` | Determinismo visual | `0a18800` |
| 3 | Espaciado duplicado | 6 secciones | No se encontró | — |
| 4 | Cascada CSS | `index.css` | No se encontró | — |

## Pendiente: Verificación Visual

El autor debe realizar la verificación visual local porque este entorno no permite mantener un servidor en vivo. Pasos:

1. `npm run dev` (o `npm run build && npm run preview`)
2. Abrir en navegador (desktop 1440px y mobile 375px)
3. Recorrer las 6 secciones (Hero, Skills, Experience, Projects, Services, Contact)
4. Verificar: ¿espacios en blanco normales? ¿elementos superpuestos?
5. Si se encuentra algún problema, inspeccionar con DevTools y buscar:
   - `margin` o `padding` inesperado en el contenedor de la sección
   - `position: absolute` con contexto de apilamiento incorrecto
   - Reglas CSS tachadas (sobrescritas) que no deberían estarlo
