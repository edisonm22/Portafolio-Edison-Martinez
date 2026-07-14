import { services } from '../data/services.js'

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-[#f1f5f9] mb-4">
          Servicios
        </h2>
        <div className="w-20 h-1 bg-[#0ea5e9] rounded-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <article
            key={s.name}
            className="group relative bg-[#1e293b] border border-[#2d3a4f] rounded-2xl p-8 transition-all duration-500 hover:border-[#0ea5e9]/50 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] hover:-translate-y-2 animate-fade-up"
            style={{ animationDelay: i * 0.15 + 's' }}
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] mb-6 transition-all group-hover:bg-[#0ea5e9] group-hover:text-black group-hover:scale-105 text-2xl">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-[#f1f5f9] mb-3">
                {s.name}
              </h3>
              <div className="text-2xl font-black text-[#0ea5e9] mb-4">
                {s.price}
              </div>
              <p className="text-[#94a3b8] leading-relaxed mb-6">{s.desc}</p>
              <div className="flex items-center gap-2 text-[#64748b] text-sm">
                <svg
                  className="w-4 h-4 text-[#0ea5e9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Entrega: {s.days}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
