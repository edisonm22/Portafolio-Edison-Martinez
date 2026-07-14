import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { services } from '../data/services.js'
import { SectionWrapper } from './SectionWrapper.jsx'

export default function Services() {
  const sectionRef = useScrollReveal()

  return (
    <SectionWrapper
      id="services"
      title="Servicios"
      subtitle="Soluciones adaptadas a tu proyecto, con entrega rápida y calidad garantizada"
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {services.map((s, i) => {
          const isMiddle = i === 1
          return (
            <article
              key={s.name}
              data-reveal-delay={i * 120}
              className={`reveal group relative rounded-2xl p-8 transition-all duration-500 ${
                isMiddle
                  ? 'bg-gradient-to-b from-[#0ea5e9]/10 via-[#0ea5e9]/5 to-transparent border-2 border-[#0ea5e9]/30 shadow-[0_0_30px_rgba(14,165,233,0.06)] scale-[1.02] md:scale-105 z-10'
                  : 'bg-[#111827] border border-[#1e293b] hover:border-[#0ea5e9]/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]'
              } hover:-translate-y-1`}
            >
              {/* Badge "Recomendado" en la tarjeta del medio */}
              {isMiddle && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-black text-xs font-bold rounded-full uppercase tracking-widest shadow-[0_4px_14px_rgba(14,165,233,0.3)]">
                  Recomendado
                </span>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 transition-all duration-300 group-hover:scale-110 ${
                  isMiddle
                    ? 'bg-[#0ea5e9] text-black shadow-[0_4px_14px_rgba(14,165,233,0.25)]'
                    : 'bg-[#0ea5e9]/10 text-[#0ea5e9]'
                }`}>
                  {s.icon}
                </div>

                <h3 className="text-h3 text-[#f1f5f9] mb-2">{s.name}</h3>

                <div className={`text-2xl font-black mb-4 ${
                  isMiddle ? 'text-[#0ea5e9]' : 'text-[#0ea5e9]'
                }`}>
                  {s.price}
                </div>

                <p className="text-[#64748b] text-body-sm leading-relaxed mb-6">
                  {s.desc}
                </p>

                <div className="flex items-center gap-2 text-[#475569] text-sm">
                  <svg className="w-4 h-4 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Entrega: <span className="text-[#94a3b8] font-medium">{s.days}</span></span>
                </div>
              </div>

              {/* Optional "pill" de acción al hover */}
              <div className={`mt-6 pt-6 border-t border-[#1e293b] text-center ${
                isMiddle ? 'border-[#0ea5e9]/15' : ''
              }`}>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5 ${
                    isMiddle ? 'text-[#0ea5e9]' : 'text-[#475569] hover:text-[#0ea5e9]'
                  }`}
                >
                  Solicitar cotización
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
