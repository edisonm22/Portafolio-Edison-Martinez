import { ProjectCard } from './ProjectCard.jsx'
import { FALLBACK_PROJECTS } from '../data/projects.js'

function SkeletonCard() {
  return (
    <article className="bg-[#1e293b] border border-[#2d3a4f] rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-[#111827]" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-[#111827] rounded w-3/4" />
        <div className="h-4 bg-[#111827] rounded w-1/2" />
        <div className="h-4 bg-[#111827] rounded w-1/3" />
      </div>
    </article>
  )
}

export default function Projects({ projects = FALLBACK_PROJECTS, loading = false }) {
  if (loading) {
    return (
      <SectionWrapper id="projects" title="Mis Proyectos">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="projects" title="Mis Proyectos">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="col-span-full text-center text-[#64748b] py-12">
            No hay proyectos disponibles
          </p>
        ) : (
          projects.map((p) => <ProjectCard key={p._id} project={p} />)
        )}
      </div>
    </SectionWrapper>
  )
}

/* ── Reusable Section Wrapper ── */
function SectionWrapper({ id, title, children }) {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-[#f1f5f9] mb-4">
          {title}
        </h2>
        <div className="w-20 h-1 bg-[#0ea5e9] rounded-full mx-auto" />
      </div>
      {children}
    </section>
  )
}

export { SectionWrapper }
