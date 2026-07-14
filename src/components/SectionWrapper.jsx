export function SectionWrapper({
  id,
  title,
  subtitle,
  eyebrow,
  sectionNum,
  children,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`py-section-mobile lg:py-section px-6 sm:px-8 lg:px-12 ${className}`}
    >
      {/* Línea divisoria editorial */}
      <div className="section-divider mb-12" />

      {/* Cabecera de sección — alineada a la izquierda */}
      <div className="mb-12">
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

      {children}
    </section>
  )
}
