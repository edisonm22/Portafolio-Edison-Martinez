import { forwardRef } from 'react'
import { getTechColor } from '../utils/techColors.js'

const ProjectCard = forwardRef(function ProjectCard({ project }, ref) {
  const techs = project.technologies || ['React', 'Node', 'MongoDB']

  return (
    <article
      ref={ref}
      className="group relative bg-[#1e293b] border border-[#2d3a4f] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#0ea5e9]/50 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] hover:-translate-y-2"
    >
      {/* Image placeholder */}
      <div className="relative aspect-video overflow-hidden bg-[#111827]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0ea5e9]/10 to-purple-500/10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

        {/* Hover actions */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-3 justify-center">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[140px] px-4 py-2.5 bg-[#0ea5e9] text-black font-semibold rounded-lg text-center transition-all hover:bg-[#0284c7] hover:shadow-lg hover:shadow-[#0ea5e9]/20"
            >
              Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[140px] px-4 py-2.5 border-2 border-[#0ea5e9] text-[#0ea5e9] font-semibold rounded-lg text-center transition-all hover:bg-[#0ea5e9] hover:text-black"
            >
              Código
            </a>
          )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded-full uppercase tracking-wider shadow-[0_4px_14px_rgba(245,158,11,0.3)]">
            Destacado
          </span>
        )}

        {/* Placeholder icon */}
        <div className="w-full h-full flex items-center justify-center text-[#64748b]">
          <svg
            className="w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-[#f1f5f9] flex-1">
            {project.title}
          </h3>
          {project.featured && (
            <span className="flex-shrink-0 w-5 h-5 text-amber-500">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          )}
        </div>
        <p className="text-[#94a3b8] leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techs.map((tech, i) => (
            <span key={i} className={`px-2.5 py-1 text-xs rounded-full ${getTechColor(tech)}`}>
              {tech}
            </span>
          ))}
        </div>
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-2 border-t border-[#2d3a4f]/50 pt-4">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[#94a3b8]"
              >
                <svg
                  className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
})

export { ProjectCard }
