export default function CVHero({ data }) {
  return (
    <div className="text-center pb-8 border-b border-[#2d3a4f]">
      {/* Avatar */}
      <div className="w-28 h-28 rounded-full mx-auto mb-6 bg-gradient-to-br from-[#0ea5e9] to-purple-500 flex items-center justify-center text-black font-black text-4xl shadow-[0_8px_30px_rgba(14,165,233,0.3)]">
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={data.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>EM</span>
        )}
      </div>

      <h2 className="text-2xl font-black text-[#f1f5f9] mb-1">{data.name}</h2>
      <p className="text-[#0ea5e9] font-semibold mb-1">{data.title}</p>
      <p className="text-sm text-[#64748b] leading-relaxed mb-6">
        {data.tagline}
      </p>

      {/* Contact details */}
      <div className="flex flex-col gap-3 mb-6">
        <ContactRow
          icon={
            <svg className="w-4 h-4 shrink-0 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6L12 13L2 6" />
            </svg>
          }
          text={data.email}
        />
        <ContactRow
          icon={
            <svg className="w-4 h-4 shrink-0 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
          text={data.phone}
        />
        <ContactRow
          icon={
            <svg className="w-4 h-4 shrink-0 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          text={data.location}
        />
      </div>

      {/* Social links */}
      <div className="flex justify-center gap-3">
        {['github', 'linkedin', 'twitter'].map((social) => (
          <a
            key={social}
            href={`https://${social}.com/edisonmartinez`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#0a0f1a] border border-[#2d3a4f] flex items-center justify-center text-[#94a3b8] transition-all hover:bg-[#0ea5e9] hover:border-[#0ea5e9] hover:text-black hover:-translate-y-1"
            aria-label={social}
          >
            {social[0].toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  )
}

function ContactRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0f1a] border border-[#2d3a4f] rounded-xl text-[#94a3b8] text-sm">
      {icon}
      {text}
    </div>
  )
}
