import SectionHeading from './SectionHeading.jsx'

export default function CVAbout({ summary }) {
  return (
    <div className="mb-10">
      <SectionHeading
        icon={
          <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
        title="Sobre mí"
      />
      <p className="text-[#94a3b8] leading-relaxed">{summary}</p>
    </div>
  )
}
