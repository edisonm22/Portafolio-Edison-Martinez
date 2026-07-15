/**
 * Smooth scroll to a section by its id
 * @param {string} id - The element id to scroll to
 */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
