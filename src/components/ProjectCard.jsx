import { forwardRef, useRef, useEffect } from 'react'
import { getTechColor } from '../utils/techColors.js'
import { useTilt3D } from '../hooks/useTilt3D.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const gradientMeshes = [
  'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(168,85,247,0.08), rgba(14,165,233,0.04))',
  'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(14,165,233,0.08), rgba(168,85,247,0.04))',
  'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(59,130,246,0.08), rgba(6,182,212,0.04))',
  'linear-gradient(135deg, rgba(236,72,153,0.10), rgba(168,85,247,0.08), rgba(236,72,153,0.04))',
  'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(99,102,241,0.08), rgba(34,211,238,0.04))',
]

const ProjectCard = forwardRef(function ProjectCard({ project, index = 0 }, ref) {
  const cardRef = useRef(null)
  const tiltRef = useTilt3D({ maxTilt: 6, scale: 1.02, speed: 500 })
  const techs = project.technologies || ['React', 'Node', 'MongoDB']
  const mesh = gradientMeshes[index % gradientMeshes.length]
  const imageRef = useRef(null)
  const imageParallax = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const reduced = useReducedMotion()
  const blurRevealed = useRef(false)

  /* ── Merge forwarded ref with tilt ref for scroll reveal ── */
  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') ref(tiltRef.current)
    else ref.current = tiltRef.current
    return () => {
      if (typeof ref === 'function') ref(null)
      else if (ref) ref.current = null
    }
  }, [ref])

  /* ── 3D parallax hover en el área de imagen ── */
  useEffect(() => {
    const img = imageRef.current
    if (!img || matchMedia('(pointer: coarse)').matches) return

    let rafId = null
    const p = imageParallax.current

    const onMove = (e) => {
      const rect = img.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      p.targetX = x * 8
      p.targetY = y * 8
    }

    const onLeave = () => {
      p.targetX = 0
      p.targetY = 0
    }

    const animate = () => {
      p.x += (p.targetX - p.x) * 0.1
      p.y += (p.targetY - p.y) * 0.1
      img.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scale(1.08)`
      rafId = requestAnimationFrame(animate)
    }

    img.addEventListener('mousemove', onMove, { passive: true })
    img.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(animate)

    return () => {
      img.removeEventListener('mousemove', onMove)
      img.removeEventListener('mouseleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
      img.style.transform = ''
    }
  }, [])

  /* ── Spotlight effect (desktop only) ── */
  useEffect(() => {
    const card = cardRef.current
    if (!card || matchMedia('(pointer: coarse)').matches) return

    const handleMouse = (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--spotlight-x', `${x}%`)
      card.style.setProperty('--spotlight-y', `${y}%`)
    }

    card.addEventListener('mousemove', handleMouse)
    return () => card.removeEventListener('mousemove', handleMouse)
  }, [])

  /* ── Blur-to-sharp reveal on scroll into view ── */
  useEffect(() => {
    const imgContainer = imageRef.current
    if (!imgContainer) return

    // Reduced motion: never blur
    if (reduced) {
      imgContainer.style.filter = ''
      return
    }
    if (blurRevealed.current) return

    // Start blurred
    imgContainer.style.filter = 'blur(12px)'
    imgContainer.style.transition = 'filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          blurRevealed.current = true
          requestAnimationFrame(() => {
            imgContainer.style.filter = 'blur(0px)'
          })
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0 }
    )

    observer.observe(imgContainer)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <article
      ref={tiltRef}
      data-reveal-delay={index * 100}
      className="reveal group relative rounded-[1.25rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] [transform-style:preserve-3d]"
      style={{ perspective: '800px' }}
    >
      {/* Gradient border ring on hover */}
      <div
        className="absolute -inset-[1px] rounded-[calc(1.25rem+1px)] rounded-tr-[calc(0.5rem+1px)] rounded-bl-[calc(0.5rem+1px)] bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-border-shimmer"
        style={{ transform: 'translateZ(10px)' }}
      />

      {/* Card content with spotlight */}
      <div
        ref={cardRef}
        className="card-spotlight relative z-10 bg-surface-900 rounded-[1.25rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] overflow-hidden transition-all duration-500 group-hover:-translate-y-1"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glare shine overlay — sigue el ángulo del ratón (useTilt3D) */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(var(--glare-angle, 0deg), rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)',
          }}
        />
        {/* Image area with 3D parallax + breathing background */}
        <div ref={imageRef} className="relative aspect-[16/10] overflow-hidden will-change-transform project-image-bg" style={{ background: mesh }}>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/95 via-surface-950/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover actions — siempre visibles en móvil, hover en desktop */}
          <div className="absolute bottom-4 left-4 right-4 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-400 flex gap-3 justify-center">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-[140px] px-4 py-2.5 bg-primary text-black font-semibold text-sm rounded-lg text-center transition-all duration-200 hover:bg-primary-dark hover:shadow-button-glow active:scale-95"
              >
                Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-[140px] px-4 py-2.5 border border-primary/50 text-primary font-semibold text-sm rounded-lg text-center transition-all duration-200 hover:bg-primary hover:text-black active:scale-95"
              >
                Código
              </a>
            )}
          </div>

          {/* Featured badge */}
          {project.featured && (
            <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-amber-500/20 text-amber-400 text-[11px] font-bold rounded-full uppercase tracking-widest border border-amber-500/20 backdrop-blur-sm">
              Destacado
            </span>
          )}

          {/* Icono decorativo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 md:group-hover:opacity-10 transition-opacity duration-500">
            <svg className="w-20 h-20 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <div className="absolute -inset-2 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-h3 text-light">{project.title}</h3>
            {project.featured && (
              <span className="shrink-0 w-4 h-4 text-amber-400">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
            )}
          </div>

          {/* Tags técnicos en monospace con hover animado */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techs.map((tech, i) => (
              <span
                key={i}
                className={`tech-tag px-2.5 py-1 text-[11px] font-mono font-medium rounded-full ${getTechColor(tech)}`}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-muted text-body-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1.5 border-t border-surface-800 pt-4 mt-1">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-surface-400 text-sm"
                >
                  <svg
                    className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
})

export { ProjectCard }
