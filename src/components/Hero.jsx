import { useReveal } from '../hooks/useScrollReveal.js'

export default function Hero() {
  const revealRef = useReveal()

  return (
    <header
      id="home"
      ref={revealRef}
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden reveal"
      style={{
        background:
          'radial-gradient(ellipse 80% 45% at 50% -15%, rgba(14, 165, 233, 0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 75% 90%, rgba(168, 85, 247, 0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 35% at 25% 90%, rgba(14, 165, 233, 0.05) 0%, transparent 55%), #0a0f1a',
      }}
    >
      {/* Gradiente de fondo animado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0ea5e9]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#a855f7]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Fade bottom overlay */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0f1a] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0ea5e9]/8 border border-[#0ea5e9]/25 rounded-full text-sm font-medium text-[#0ea5e9] mb-8"
          data-reveal-delay="0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inset-0 h-full w-full rounded-full bg-[#0ea5e9] opacity-60" />
            <span className="relative block h-full w-full rounded-full bg-[#0ea5e9]" />
          </span>
          Disponible para nuevos proyectos
        </div>

        {/* Headline principal — estilo editorial */}
        <h1 className="mb-4" data-reveal-delay="100">
          <span className="block text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.04] tracking-[-0.03em] text-[#f1f5f9]">
            Hola, soy{' '}
            <span className="relative inline-block">
              <span
                className="bg-gradient-to-r from-[#f1f5f9] via-[#0ea5e9] to-[#a855f7] bg-clip-text text-transparent"
              >
                Edison Martinez
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0ea5e9]/60 to-[#a855f7]/60 rounded-full blur-[2px]" />
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl text-[#64748b] font-medium max-w-2xl mx-auto mb-3"
          data-reveal-delay="200"
        >
          Desarrollador Web Full-Stack
        </p>
        <p
          className="text-[#475569] text-sm sm:text-base max-w-xl mx-auto mb-10"
          data-reveal-delay="250"
        >
          React &middot; Node.js &middot; MongoDB &middot; Arquitectura Cloud
        </p>

        {/* Description */}
        <p
          className="text-[#64748b] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
          data-reveal-delay="300"
        >
          Construyo productos digitales escalables, performantes y con excelente
          experiencia de desarrollo. 5+ años transformando ideas en soluciones
          robustas.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          data-reveal-delay="400"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-[#0ea5e9] text-black font-bold text-base rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Contratarme</span>
            <svg
              className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-8 py-4 border border-[#1e293b] text-[#94a3b8] font-semibold text-base rounded-xl transition-all duration-300 hover:border-[#0ea5e9]/30 hover:text-[#f1f5f9] hover:bg-[#0ea5e9]/5 active:scale-[0.98]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Ver Proyectos
          </a>
        </div>

        {/* Stats — glassmorphism */}
        <div
          className="mt-20 inline-flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-8 py-4 rounded-2xl bg-[#ffffff]/[0.02] border border-[#ffffff]/[0.05] backdrop-blur-sm"
          data-reveal-delay="500"
        >
          <StatItem value="5+" label="años exp." />
          <div className="hidden sm:block w-px h-6 bg-[#1e293b]" />
          <StatItem value="15+" label="proyectos" />
          <div className="hidden sm:block w-px h-6 bg-[#1e293b]" />
          <StatItem value="100%" label="satisfacción" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#334155]" data-reveal-delay="600">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V4" />
        </svg>
      </div>
    </header>
  )
}

function StatItem({ value, label }) {
  return (
    <div className="text-center">
      <span className="block text-xl font-black text-[#f1f5f9]">{value}</span>
      <span className="text-xs text-[#475569] font-medium">{label}</span>
    </div>
  )
}
