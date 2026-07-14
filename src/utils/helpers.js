/**
 * Smooth scroll to a section by its id
 * @param {string} id - The element id to scroll to
 */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
