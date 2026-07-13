import { forwardRef } from 'react'

interface ProjectCardProps {
  image?: string
  title: string
  description: string
  technologies: string[]
  featured?: boolean
  demoUrl?: string
  repoUrl?: string
  highlights?: string[]
  className?: string
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({
    image,
    title,
    description,
    technologies,
    featured,
    demoUrl,
    repoUrl,
    highlights,
    className = '',
    ...props
  }, ref) => {
    return (
      <article
        ref={ref}
        className={`group relative overflow-hidden rounded-2xl bg-dark-card border border-dark-border transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 ${className}`}
        {...props}
      >
        <div className="relative aspect-video overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-dark-border">
              <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}

          {featured && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-dark-bg text-xs font-bold rounded-full">
              Destacado
            </span>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 justify-center">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-xs px-4 py-2 bg-primary text-dark-bg font-semibold rounded-lg text-center transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
              >
                Demo
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-xs px-4 py-2 border-2 border-primary text-primary font-semibold rounded-lg text-center transition-all hover:bg-primary hover:text-dark-bg"
              >
                Código
              </a>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold text-text-primary flex-1">{title}</h3>
            {featured && (
              <span className="flex-shrink-0 w-5 h-5 text-amber-500" aria-label="Featured">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </span>
            )}
          </div>

          <p className="text-text-secondary leading-relaxed mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, i) => (
              <span key={i} className="px-2.5 py-1 bg-dark-bg border border-dark-border text-text-secondary text-xs rounded-full transition-all hover:border-primary hover:text-primary">
                {tech}
              </span>
            ))}
          </div>

          {highlights && highlights.length > 0 && (
            <ul className="space-y-2 border-t border-dark-border/50 pt-4">
              {highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'