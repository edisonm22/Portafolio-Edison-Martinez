import SectionHeading from './SectionHeading.jsx'

export default function CVProjects({ data }) {
  return (
    <div className="mb-10">
      <SectionHeading
        icon={
          <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        }
        title="Proyectos Destacados"
      />
      <div className="space-y-4">
        {data.map((p) => (
          <ProjectItem key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}

function ProjectItem({ project }) {
  return (
    <div className="bg-[#1e293b] border border-[#2d3a4f] rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h4 className="text-lg font-bold text-[#f1f5f9]">{project.name}</h4>
        <span className="text-xs text-[#64748b] shrink-0">{project.role}</span>
      </div>
      <p className="text-[#94a3b8] text-sm leading-relaxed mb-3">
        {project.description}
      </p>
      <ul className="space-y-1 mb-3">
        {project.highlights.map((h, i) => (
          <li
            key={i}
            className="text-[#94a3b8] text-sm flex items-start gap-2"
          >
            <span className="text-[#0ea5e9]">&#9655;</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="px-2 py-1 bg-[#111827] text-[#94a3b8] text-xs rounded-full border border-[#2d3a4f]"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0ea5e9] hover:underline"
          >
            Demo
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0ea5e9] hover:underline"
          >
            Código
          </a>
        )}
      </div>
    </div>
  )
}
