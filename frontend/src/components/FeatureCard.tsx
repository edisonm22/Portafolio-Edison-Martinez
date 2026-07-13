import { forwardRef } from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
  variant?: 'default' | 'highlight'
  className?: string
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, href, variant = 'default', className = '', ...props }, ref) => {
    const baseStyles = 'group relative overflow-hidden rounded-2xl p-6 transition-all duration-300'
    const variantStyles = variant === 'highlight'
      ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 shadow-lg shadow-primary/10'
      : 'bg-dark-card border border-dark-border hover:border-primary hover:shadow-xl hover:shadow-primary/10'

    const content = (
      <div className={`${baseStyles} ${variantStyles} ${className}`} ref={ref} {...props}>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-dark-bg transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
          <p className="text-text-secondary leading-relaxed">{description}</p>
          {href && (
            <a href={href} className="inline-flex items-center gap-1 mt-4 text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
              Ver más
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    )

    return href ? <a href={href}>{content}</a> : content
  }
)

FeatureCard.displayName = 'FeatureCard'