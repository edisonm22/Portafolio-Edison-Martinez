export function Hero() {
  return (
    <header id="home" className="relative min-h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden animate-fade-up"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 60%), #0a0f1a' }}>
    
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg pointer-events-none opacity-50" />
    
    <div className="relative z-10 max-w-4xl">
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary rounded-full text-sm font-semibold text-primary mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <span className="relative flex h-2 w-2"><span className="animate-pulse absolute inset-0 h-full w-full rounded-full bg-primary opacity-75" /><span className="relative block h-full w-full rounded-full bg-primary" /></span>
        Disponible para nuevos proyectos
      </span>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 bg-gradient-to-r from-text-primary via-primary to-purple-500 bg-clip-text text-transparent animate-fade-up" style={{ animationDelay: '200ms' }}>
        Hola, soy <span className="relative"><span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-primary/50" /></span>Edison Martinez
      </h1>
      
      <h2 className="text-xl sm:text-2xl font-medium text-text-secondary mb-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '300ms' }}>
        Desarrollador Web Full-Stack • React • Node.js • MongoDB • Arquitectura Cloud
      </h2>
      
      <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '400ms' }}>
        Construyo productos digitales escalables, performantes y con excelente DX. 
        5+ años transformando ideas en soluciones robustas.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '500ms' }}>
        <a href="#contact" className="btn-primary group inline-flex items-center gap-2 px-8 py-4 text-lg">
          <span>Contratarme</span>
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
        <a href="#projects" className="btn-outline inline-flex items-center gap-2 px-8 py-4 text-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Ver Proyectos
        </a>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-text-muted animate-fade-up" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center gap-2"><svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><span>5+ años exp.</span></div>
        <div className="flex items-center gap-2"><svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg><span>15+ proyectos</span></div>
        <div className="flex items-center gap-2"><svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><span>100% satisfacción</span></div>
      </div>
    </div>
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V4" /></svg>
    </div>
  </header>
  )
}