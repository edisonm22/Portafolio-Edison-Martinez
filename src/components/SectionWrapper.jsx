export function SectionWrapper({ id, title, subtitle, eyebrow, children, className = '' }) {
  return (
    <section
      id={id}
      className={`py-section-mobile lg:py-section px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      <div className="text-center mb-16 lg:mb-20">
        {eyebrow && (
          <span className="inline-block text-caption text-primary tracking-[0.15em] uppercase mb-3">
            {eyebrow}
          </span>
        )}
        <h2 className="text-h2 text-light mb-4">{title}</h2>
        {subtitle && (
          <p className="text-muted text-body-sm max-w-xl mx-auto">{subtitle}</p>
        )}
        <div className="mt-6 mx-auto w-12 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
      </div>
      {children}
    </section>
  )
}
