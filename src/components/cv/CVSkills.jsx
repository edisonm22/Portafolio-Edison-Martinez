import SectionHeading from './SectionHeading.jsx'

export default function CVSkills({ data }) {
  return (
    <div className="mb-10">
      <SectionHeading
        icon={
          <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        }
        title="Habilidades técnicas"
      />

      {/* Technical skills */}
      {data.technical.map((skill) => (
        <div key={skill.name} className="flex items-center gap-3 mb-3">
          <span className="text-sm text-[#f1f5f9] w-40 shrink-0">
            {skill.name}
          </span>
          <div className="flex-1 h-2 bg-[#0a0f1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0ea5e9] to-purple-500 rounded-full"
              style={{ width: skill.level + '%' }}
            />
          </div>
          <span className="text-xs text-[#64748b] w-8 text-right">
            {skill.level}%
          </span>
        </div>
      ))}

      {/* Soft skills */}
      <div className="flex flex-wrap gap-2 mt-6">
        {data.soft.map((s) => (
          <span
            key={s.name}
            className="px-3 py-1.5 bg-[#1e293b] border border-[#2d3a4f] rounded-full text-xs text-[#94a3b8]"
          >
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}
