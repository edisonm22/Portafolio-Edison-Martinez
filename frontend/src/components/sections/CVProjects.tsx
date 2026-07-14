interface CVProjectsProps {
  data: Array<{
    id: number
    name: string
    description: string
    role: string
    technologies: string[]
    demoUrl?: string
    repoUrl?: string
    highlights?: string[]
    featured?: boolean
    teamSize?: number
    period?: string
  }>
}

function ProjectCard({ project }: { project: CVProjectsProps['data'][number] }) {
  return (
    <article className="project-card">
      <div className="project-card__image">
        <div className="project-card__placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></div>
        {project.featured && <span className="project-card__badge">Destacado</span>}
        <div className="project-card__overlay">
          <div className="project-card__links">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg><span>Demo</span></a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg><span>Código</span></a>
            )}
          </div>
        </div>
        {project.featured && <span className="project-card__badge">Destacado</span>}
      </div>
      <div className="project-card__content">
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__tech">{project.technologies.map(tech => <span key={tech} className="tag">{tech}</span>)}</div>
        {project.highlights && <ul className="project-card__highlights">{project.highlights.map((h, i) => <li key={i}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>{h}</li>)}</ul>}
        <div className="project-card__meta">
          {project.role && <span className="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>{project.role}</span>}
          {project.teamSize && <span className="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>{project.teamSize} devs</span>}
          {project.period && <span className="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{project.period}</span>}
        </div>
      </div>
    </article>
  )
}

export function CVProjects({ data }: CVProjectsProps) {
  return (
    <section className="cv-section cv-projects">
      <h2 className="cv-section__title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
        Proyectos Destacados
      </h2>
      <div className="projects__grid">{data.map(project => <ProjectCard key={project.id} project={project} />)}</div>
    </section>
  )
}