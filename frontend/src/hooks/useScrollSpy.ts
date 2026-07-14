import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

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

    return () => observer.disconnect()
  }, [sectionIds, offset])

  return activeSection
}
