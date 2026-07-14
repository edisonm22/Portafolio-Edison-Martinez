import SectionHeading from './SectionHeading.jsx'

export default function CVEducation({ data }) {
  return (
    <div className="mb-10">
      <SectionHeading
        icon={
          <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7l-5-3m5 3l5-3m-5 3V9" />
          </svg>
        }
        title="Educación"
      />

      <div className="space-y-6">
        {data.education.map((edu) => (
          <EducationItem key={edu.id} edu={edu} />
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-8 pt-8 border-t border-[#2d3a4f]">
        <h4 className="text-sm font-semibold text-[#64748b] uppercase tracking-wider mb-4">
          Certificaciones
        </h4>
        {data.certifications.map((cert) => (
          <CertificationItem key={cert.name} cert={cert} />
        ))}
      </div>
    </div>
  )
}

function EducationItem({ edu }) {
  return (
    <div className="border-l-2 border-[#2d3a4f] pl-6 pb-6 last:pb-0 relative">
      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0ea5e9] border-2 border-[#0a0f1a]" />
      <h4 className="font-bold text-[#f1f5f9]">{edu.degree}</h4>
      <p className="text-[#0ea5e9] font-medium text-sm">{edu.institution}</p>
      <p className="text-xs text-[#64748b]">
        {edu.year} | {edu.location}
      </p>
      {edu.honors && (
        <p className="text-amber-500 text-xs font-medium">{edu.honors}</p>
      )}
      <ul className="mt-2 space-y-1">
        {edu.details.map((d, i) => (
          <li key={i} className="text-[#94a3b8] text-sm">
            {d}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CertificationItem({ cert }) {
  return (
    <div className="bg-[#1e293b] border border-[#2d3a4f] rounded-xl p-4 mb-3">
      <p className="text-[#f1f5f9] font-medium text-sm">{cert.name}</p>
      <p className="text-[#64748b] text-xs">
        {cert.issuer} &bull; {cert.date} &bull; {cert.credentialId}
      </p>
    </div>
  )
}
