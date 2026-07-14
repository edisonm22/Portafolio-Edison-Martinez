import SectionHeading from './SectionHeading.jsx'

export default function CVExperience({ data }) {
  return (
    <div className="mb-10">
      <SectionHeading
        icon={
          <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
        title="Experiencia"
      />
      <div className="space-y-6">
        {data.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  )
}

function ExperienceItem({ exp }) {
  return (
    <div className="border-l-2 border-[#2d3a4f] pl-6 pb-6 relative">
      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0ea5e9] border-2 border-[#0a0f1a]" />
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <div>
          <h4 className="text-lg font-bold text-[#f1f5f9]">{exp.role}</h4>
          <span className="text-[#0ea5e9] font-medium">{exp.company}</span>
        </div>
        <span className="text-sm text-[#64748b]">{exp.period}</span>
      </div>
      <p className="text-[#94a3b8] text-sm leading-relaxed mb-3">
        {exp.description}
      </p>
      <ul className="space-y-1 mb-3">
        {exp.achievements.map((a, i) => (
          <li
            key={i}
            className="text-[#94a3b8] text-sm flex items-start gap-2"
          >
            <span className="text-[#0ea5e9]">&#9655;</span>
            {a}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {exp.technologies.map((t) => (
          <span
            key={t}
            className="px-2 py-1 bg-[#111827] text-[#94a3b8] text-xs rounded-full border border-[#2d3a4f]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
