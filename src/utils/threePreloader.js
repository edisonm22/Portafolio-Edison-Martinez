/**
 * threePreloader — Inicia la carga dinámica de Three.js lo antes posible.
 *
 * Uso:
 *   1. Llamar a `preloadThree()` cuando el Loader empiece a salir.
 *   2. HeroThreeScene usa `getThreeModule()` en vez de `import('three')`.
 *
 * Así la descarga del chunk de Three.js ocurre en paralelo con la animación
 * de salida del Loader, reduciendo el tiempo percibido de espera.
 */

let threePromise = null

/**
 * Inicia (o retorna) la promesa de importación de Three.js.
 */
export function preloadThree() {
  if (!threePromise) {
    threePromise = import('three')
  }
  return threePromise
}

/**
 * Retorna la promesa de Three.js. Garantiza que la importación
 * ya fue iniciada por `preloadThree()` si se llamó antes.
 */
export function getThreeModule() {
  return threePromise || preloadThree()
}

/**
 * Resetea el preloader (solo útil en tests).
 */
export function resetThreePreloader() {
  threePromise = null
}
