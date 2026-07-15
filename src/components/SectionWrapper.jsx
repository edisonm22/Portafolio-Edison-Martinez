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
        <div className="floating-shape floating-shape-hex hidden lg:block" style={{ top: '15%', right: '8%' }} />
      )}
      {shapeIndex === 1 && (
        <div className="floating-shape floating-shape-diamond hidden lg:block" style={{ top: '20%', left: '5%' }} />
      )}
      {shapeIndex === 2 && (
        <div className="floating-shape floating-shape-ring hidden lg:block" style={{ top: '12%', right: '12%' }} />
      )}

      {/* Cabecera de sección — alineada a la izquierda */}
      <div className="relative z-10 mb-8 lg:mb-12">
        {sectionNum && eyebrow && (
          <span className="font-mono text-caption text-primary tracking-[0.15em] uppercase">
            {sectionNum} — {eyebrow}
          </span>
        )}
        <h2 className="text-h2 text-light mt-2 font-display">{title}</h2>
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
