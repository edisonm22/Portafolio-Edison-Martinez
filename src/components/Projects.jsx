import { useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { ProjectCard } from './ProjectCard.jsx'
import { FALLBACK_PROJECTS } from '../data/projects.js'
import { SectionWrapper } from './SectionWrapper.jsx'
import ProjectModal from './ProjectModal.jsx'

function SkeletonCard() {
  return (
    <article className="bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-surface-950" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-surface-950 rounded-lg w-3/4" />
        <div className="h-4 bg-surface-950 rounded-lg w-1/2" />
        <div className="h-4 bg-surface-950 rounded-lg w-1/3" />
      </div>
    </article>
  )
}

export default function Projects({ projects = FALLBACK_PROJECTS, loading = false }) {
  const sectionRef = useScrollReveal()
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  /* ── Abrir modal con shared‑element transition ── */
  const openModal = useCallback((project, index) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setSelectedProject(project)
          setSelectedIndex(index)
        })
      })
    } else {
      setSelectedProject(project)
      setSelectedIndex(index)
    }
  }, [])

  /* ── Cerrar modal con shared‑element transition ── */
  const closeModal = useCallback(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setSelectedProject(null)
        })
      })
    } else {
      setSelectedProject(null)
    }
  }, [])

  if (loading) {
    return (
      <SectionWrapper id="projects" sectionNum="03" title="Proyectos" eyebrow="PORTAFOLIO" subtitle="Trabajos seleccionados que reflejan mi experiencia">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper
      id="projects"
      sectionNum="03"
      title="Proyectos"
      eyebrow="PORTAFOLIO"
      subtitle="Trabajos seleccionados que reflejan mi experiencia"
    >
      <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="col-span-full text-center text-surface-400 py-16 font-medium">
            No hay proyectos disponibles actualmente
          </p>
        ) : (
          projects.map((p, i) => (
            <ProjectCard
              key={p._id}
              project={p}
              index={i}
              onOpen={() => openModal(p, i)}
            />
          ))
        )}
      </div>

      {/* Modal de proyecto */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          cardIndex={selectedIndex}
          onClose={closeModal}
        />
      )}
    </SectionWrapper>
  )
}
