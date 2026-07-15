export function SectionWrapper({
  id,
  title,
  subtitle,
  eyebrow,
  sectionNum,
  children,
  className = '',
}) {
  const shapeIndex = (id?.length || 0) % 3

  return (
    <section
      id={id}
      className={`section-grid-bg relative py-section-mobile lg:py-section px-6 sm:px-8 lg:px-12 overflow-hidden ${className}`}
    >
      {/* Línea divisoria editorial */}
      <div className="section-divider mb-8 lg:mb-12" />

      {/* 3D floating shapes decorativas */}
      {shapeIndex === 0 && (
        <>
          <div className="floating-shape floating-shape-hex hidden lg:block" style={{ top: '15%', right: '8%' }} />
          <div className="floating-3d hidden lg:block" style={{ top: '60%', left: '5%' }}>
            <div className="w-12 h-12 border border-primary/15 rounded-lg animate-hex-3d" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(168,85,247,0.04))' }} />
          </div>
        </>
      )}
      {shapeIndex === 1 && (
        <>
          <div className="floating-shape floating-shape-diamond hidden lg:block" style={{ top: '20%', left: '5%' }} />
          <div className="floating-3d hidden lg:block" style={{ top: '55%', right: '8%' }}>
            <div className="w-10 h-10 border border-accent/15 rounded-lg animate-diamond-3d" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(6,182,212,0.04))' }} />
          </div>
        </>
      )}
      {shapeIndex === 2 && (
        <>
          <div className="floating-shape floating-shape-ring hidden lg:block" style={{ top: '12%', right: '12%' }} />
          <div className="floating-3d hidden lg:block" style={{ top: '65%', left: '10%' }}>
            <div className="w-14 h-14 border border-glow/15 rounded-lg animate-triangle-3d" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(14,165,233,0.04))' }} />
          </div>
        </>
      )}

      {/* Cabecera de sección — alineada a la izquierda */}
      <div className="relative z-10 mb-8 lg:mb-12">
        {sectionNum && eyebrow && (
          <span className="font-mono text-caption text-primary tracking-[0.15em] uppercase">
            {sectionNum} — {eyebrow}
          </span>
        )}
        <h2
          className="text-h2 text-light mt-2 font-display section-title-parallax"
          data-parallax-speed="0.08"
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-muted text-body-sm mt-3 leading-relaxed"
            style={{ maxWidth: '65ch' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
