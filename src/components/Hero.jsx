export default function Hero() {
  return (
    <header
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 60%), #0a0f1a',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1a] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-4xl">
        {/* Availability badge */}
        <span
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0ea5e9]/10 border border-[#0ea5e9] rounded-full text-sm font-semibold text-[#0ea5e9] mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inset-0 h-full w-full rounded-full bg-[#0ea5e9] opacity-75" />
            <span className="relative block h-full w-full rounded-full bg-[#0ea5e9]" />
          </span>
          Disponible para nuevos proyectos
        </span>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 animate-fade-up"
          style={{
            animationDelay: '0.2s',
            background: 'linear-gradient(135deg, #f1f5f9, #0ea5e9, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Hola, soy{' '}
          <span className="relative">
            Edison Martinez
            <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-[#0ea5e9]/50" />
          </span>
        </h1>

        {/* Subtitle */}
        <h2
          className="text-xl sm:text-2xl font-medium text-[#94a3b8] mb-6 max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          Desarrollador Web Full-Stack &bull; React &bull; Node.js &bull; MongoDB
          &bull; Arquitectura Cloud
        </h2>

        {/* Description */}
        <p
          className="text-[#94a3b8] text-lg leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Construyo productos digitales escalables, performantes y con excelente
          DX. 5+ años transformando ideas en soluciones robustas.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href="#contact"
            className="btn btn-primary group inline-flex items-center gap-2 px-8 py-4 text-lg"
          >
            Contratarme{' '}
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
            className="btn btn-outline inline-flex items-center gap-2 px-8 py-4 text-lg"
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
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Ver Proyectos
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[#64748b] animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#0ea5e9]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>5+ años exp.</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#0ea5e9]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <span>15+ proyectos</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#0ea5e9]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>100% satisfacción</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#64748b]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V4"
          />
        </svg>
      </div>
    </header>
  )
}
