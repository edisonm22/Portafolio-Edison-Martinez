interface CVExperienceProps {
  data: Array<{
    id: number
    role: string
    company: string
    location: string
    period: string
    description: string
    achievements: string[]
    technologies: string[]
  }>
}

export function CVExperience({ data }: CVExperienceProps) {
  return (
    <section className="cv-section cv-experience">
      <h2 className="cv-section__title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
        Experiencia Profesional
      </h2>
      <div className="experience__timeline">
        {data.map((job, index) => (
          <article key={job.id} className="experience__item">
            <div className="experience__marker">
              <span className="experience__dot" />
              {index < data.length - 1 && <span className="experience__line" />}
            </div>
            <div className="experience__content">
              <div className="experience__header">
                <div className="experience__meta">
                  <span className="experience__period">{job.period}</span>
                  <span className="experience__location">{job.location}</span>
                </div>
              </div>
              <h3 className="experience__role">{job.role}</h3>
              <p className="experience__company">{job.company}</p>
              {job.description && <p className="experience__description">{job.description}</p>}
              {job.achievements && job.achievements.length > 0 && (
                <ul className="experience__achievements">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12" /></svg>{achievement}</li>
                  ))}
                </ul>
              )}
              {job.technologies && job.technologies.length > 0 && (
                <div className="experience__tech">
                  {job.technologies.map((tech, i) => <span key={i} className="tag">{tech}</span>)}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}