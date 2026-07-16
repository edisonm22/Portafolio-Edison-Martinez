import { useRef, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useTilt3D } from '../hooks/useTilt3D.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { SectionWrapper } from './SectionWrapper.jsx'
import { services } from '../data/services.js'

const gradientAccents = [
  'from-primary/20 to-accent/10',
  'from-accent/20 to-cyan-500/10',
  'from-amber-500/20 to-primary/10',
  'from-primary/20 to-rose-500/10',
]

export default function Services() {
  const sectionRef = useScrollReveal()
  const tilt0 = useTilt3D({ maxTilt: 6, scale: 1.02, speed: 400, glare: false })
  const tilt1 = useTilt3D({ maxTilt: 6, scale: 1.02, speed: 400, glare: false })
  const tilt2 = useTilt3D({ maxTilt: 6, scale: 1.02, speed: 400, glare: false })
  const tilt3 = useTilt3D({ maxTilt: 6, scale: 1.02, speed: 400, glare: false })
  const tiltRefs = [tilt0, tilt1, tilt2, tilt3]

  return (
    <SectionWrapper
      id="services"
      sectionNum="03"
      title="Servicios"
      eyebrow="SERVICIOS"
      subtitle="Soluciones integrales para tu proyecto digital"
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 reveal-3d-up"
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={index}
            tiltRef={tiltRefs[index]}
            gradientAccent={gradientAccents[index % gradientAccents.length]}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

/* ── ServiceCard sub‑component with hover‑reveal mask ── */
function ServiceCard({ service, index, tiltRef, gradientAccent }) {
  const cardRef = useRef(null)
  const revealRef = useRef(null)
  const stateRef = useRef({ mx: 50, my: 50, hover: false })
  const reduced = useReducedMotion()

  /* ── Hover reveal: clip-path circle from cursor entry (desktop only) ── */
  useEffect(() => {
    const card = cardRef.current
    const reveal = revealRef.current
    if (!card || !reveal || reduced || matchMedia('(pointer: coarse)').matches) return

    const state = stateRef.current

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      state.mx = ((e.clientX - rect.left) / rect.width) * 100
      state.my = ((e.clientY - rect.top) / rect.height) * 100
      // Always update clip path while hovering
      if (state.hover) {
        reveal.style.clipPath = `circle(150% at ${state.mx}% ${state.my}%)`
      }
    }

    const onEnter = () => {
      state.hover = true
      reveal.style.transition = 'clip-path 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      reveal.style.clipPath = `circle(150% at ${state.mx}% ${state.my}%)`
    }

    const onLeave = () => {
      state.hover = false
      reveal.style.transition = 'clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      reveal.style.clipPath = `circle(0% at ${state.mx}% ${state.my}%)`
    }

    card.addEventListener('mousemove', onMove, { passive: true })
    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)

    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <article
      key={service.title}
      ref={tiltRef}
      data-reveal-delay={index * 100}
      className="reveal-3d-left group relative rounded-[1.25rem]"
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
    >
      {/* Gradient border ring on hover */}
      <div className="absolute -inset-[1px] rounded-[calc(1.25rem+1px)] bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-border-shimmer" />

      <div
        ref={cardRef}
        className="card-spotlight relative z-10 bg-surface-900 rounded-[1.25rem] p-6 transition-all duration-500 group-hover:-translate-y-1 overflow-hidden"
      >
        {/* Hover reveal overlay: clip-path radial desde el cursor */}
        <div
          ref={revealRef}
          className={`absolute inset-0 bg-gradient-to-br ${gradientAccent} pointer-events-none`}
          style={{
            clipPath: 'circle(0% at 50% 50%)',
            willChange: 'clip-path',
          }}
        />

        {/* Icon */}
        <div className="relative mb-5 w-14 h-14 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/15 group-hover:border-primary/30 group-hover:shadow-glow-primary">
          <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
            {service.icon || getDefaultIcon(index)}
          </span>
        </div>

        <h3 className="relative text-h3 text-light mb-2 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>

        <p className="relative text-muted text-body-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tech tags */}
        <div className="relative flex flex-wrap gap-1.5">
          {(service.techs || defaultTechs(index)).map((tech, i) => (
            <span
              key={tech}
              className="tech-tag px-2 py-0.5 text-[11px] font-mono font-medium text-surface-400 bg-surface-950 rounded-full border border-surface-800"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

function getDefaultIcon(index) {
  const icons = ['⚡', '🎨', '📊', '⚙️']
  return icons[index % icons.length]
}

function defaultTechs(index) {
  const techs = [
    ['React', 'Next.js', 'Node'],
    ['Figma', 'Tailwind', 'Framer'],
    ['MongoDB', 'Postgres', 'AWS'],
    ['Docker', 'CI/CD', 'Git'],
  ]
  return techs[index % techs.length]
}
