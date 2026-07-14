import { forwardRef } from 'react'

const techColors: Record<string, string> = {
  React: 'bg-blue-500/20 text-blue-400', Node: 'bg-green-500/20 text-green-400',
  MongoDB: 'bg-green-600/20 text-green-500', Express: 'bg-gray-500/20 text-gray-400',
  TypeScript: 'bg-blue-600/20 text-blue-300', Tailwind: 'bg-cyan-500/20 text-cyan-400',
  Next: 'bg-gray-800/50 text-gray-300', PostgreSQL: 'bg-blue-700/20 text-blue-500',
  Docker: 'bg-blue-400/20 text-blue-400', AWS: 'bg-orange-500/20 text-orange-400',
  Stripe: 'bg-purple-500/20 text-purple-400', GraphQL: 'bg-pink-500/20 text-pink-400',
  default: 'bg-dark-border text-text-secondary'
}

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  featured?: boolean
  demoUrl?: string
  repoUrl?: string
  highlights?: string[]
  imageUrl?: string
}

const ProjectCard = forwardRef<HTMLDivElement, { project: Project }>(
  ({ project }, ref) => {
    const techs = project.technologies || ['React', 'Node', 'MongoDB']
    return (
      <article ref={ref} className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] hover:-translate-y-2">
        <div className="relative aspect-video overflow-hidden bg-dark-surface">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 right-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-3 justify-center">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[140px] px-4 py-2.5 bg-primary text-dark-bg font-semibold rounded-lg text-center transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20">Demo</a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[140px] px-4 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg text-center transition-all hover:bg-primary hover:text-dark-bg">Código</a>
            )}
          </div>
          {project.featured && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-dark-bg text-xs font-bold rounded-full uppercase tracking-wider shadow-[0_4px_14px_rgba(245,158,11,0.3)]">Destacado</span>
          )}
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold text-text-primary flex-1">{project.title}</h3>
            {project.featured && <span className="flex-shrink-0 w-5 h-5 text-amber-500" aria-label="Destacado"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>}
          </div>
          <p className="text-text-secondary leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {techs.map((tech, i) => (
              <span key={i} className={`px-2.5 py-1 text-xs rounded-full ${techColors[tech] || techColors.default}`}>{tech}</span>
            ))}
          </div>
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-2 border-t border-dark-border/50 pt-4">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary"><svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{h}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'

interface ProjectsProps {
  projects: Project[]
  loading: boolean
}

export function Projects({ projects, loading }: ProjectsProps) {
  if (loading) return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
      <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-black text-text-primary relative inline-block mb-10">Mis Proyectos</h2><div className="w-20 h-1 bg-primary rounded-full mx-auto" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => <article key={i} className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden animate-pulse"><div className="aspect-video bg-dark-surface"/><div className="p-6 space-y-4"><div className="h-6 bg-dark-surface rounded w-3/4"/><div className="h-4 bg-dark-surface rounded w-1/2"/><div className="h-4 bg-dark-surface rounded w-1/3"/></div></article>)}
      </div>
    </section>
  )

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-text-primary relative inline-block mb-10">Mis Proyectos</h2>
        <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="col-span-full text-center text-text-muted py-12">No hay proyectos disponibles</p>
        ) : (
          projects.map(p => <ProjectCard key={p._id} project={p} />)
        )}
      </div>
    </section>
  )
}