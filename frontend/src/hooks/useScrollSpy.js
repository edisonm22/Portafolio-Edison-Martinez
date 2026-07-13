import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const observers = []
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px 0px`, threshold: 0.1 }
    )

    elements.forEach(el => observer.observe(el))
    observers.push(observer)

    return () => observers.forEach(obs => obs.disconnect())
  }, [sectionIds, offset])

  return activeSection
}

export function useFadeIn(options = {}) {
  const [ref, setRef] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || '0px' }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options.threshold, options.rootMargin])

  return [setRef, visible]
}