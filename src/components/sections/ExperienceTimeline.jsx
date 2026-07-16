import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { SectionWrapper } from '../layout/SectionWrapper.jsx'

const MILESTONES = [
  {
    year: 'TODO_2021',
    title: 'Inicio como Freelancer',
    subtitle: 'TODO_Proyectos iniciales',
    description: 'TODO_Descripción de los primeros proyectos freelance y experiencias adquiridas.',
  },
  {
    year: 'TODO_2022',
    title: 'Proyecto Destacado',
    subtitle: 'TODO_Cliente importante',
    description: 'TODO_Descripción del proyecto destacado y su impacto en la carrera profesional.',
  },
  {
    year: 'TODO_2023',
    title: 'Certificación Profesional',
    subtitle: 'TODO_Nombre de certificación',
    description: 'TODO_Descripción de la certificación obtenida y nuevas habilidades adquiridas.',
  },
  {
    year: 'TODO_2024',
    title: 'Meta Profesional',
    subtitle: 'TODO_Objetivo alcanzado',
    description: 'TODO_Descripción del logro profesional más reciente y objetivos futuros.',
  },
]

/**
 * ExperienceTimeline — Timeline vertical con SVG line scroll‑linked.
 * La línea se dibuja progresivamente conforme el usuario hace scroll
 * dentro de la sección.
 */
export default function ExperienceTimeline() {
  const reduced = useReducedMotion()
  const [lineProgress, setLineProgress] = useState(0)
  const lineRef = useRef(null)
  const containerRef = useRef(null)

  /* ── Scroll‑linked SVG line ── */
  useEffect(() => {
    if (reduced) {
      setLineProgress(1)
      return
    }

    const container = containerRef.current
    if (!container) return

    const update = () => {
      const rect = container.getBoundingClientRect()
      const viewHeight = window.innerHeight
      const sectionHeight = rect.height

      // Progress: 0 cuando la sección entra, 1 cuando sale completamente
      const offset = viewHeight - rect.top
      const total = sectionHeight + viewHeight
      const progress = Math.max(0, Math.min(1, offset / total))

      setLineProgress(progress)
    }

    /* ── Throttled scroll handler ── */
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('lenis-scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('lenis-scroll', onScroll)
    }
  }, [reduced])

  /* ── Calcular longitud de la línea SVG ── */
  const [lineLength, setLineLength] = useState(0)

  useEffect(() => {
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength()
      setLineLength(length)
    }
  }, [])

  return (
    <SectionWrapper
      id="experience"
      sectionNum="02"
      title="Experiencia"
      eyebrow="TRAYECTORIA"
      subtitle="Hitos profesionales que han marcado mi camino como desarrollador."
    >

      {/* Timeline */}
      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto">
        {/* SVG line */}
        <svg
          className="absolute left-[19px] sm:left-1/2 sm:-translate-x-px top-0 h-full w-0.5 z-0 pointer-events-none"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          <line
            ref={lineRef}
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="url(#timeline-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={lineLength}
            strokeDashoffset={lineLength * (1 - lineProgress)}
          />
          <defs>
            <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(14,165,233,0.1)" />
              <stop offset="50%" stopColor="rgba(14,165,233,0.8)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.6)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Items */}
        <div className="relative z-10 flex flex-col gap-12 sm:gap-16">
          {MILESTONES.map((item, idx) => {
            const isLeft = idx % 2 === 0

            return (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8"
                data-reveal-delay={idx * 100}
              >
                {/* Dot en la línea */}
                <div
                  className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 w-[14px] h-[14px] rounded-full border-[3px] border-primary bg-surface-950 z-10 mt-2 transition-all duration-500"
                  style={{
                    boxShadow: lineProgress > (idx + 0.5) / MILESTONES.length
                      ? '0 0 12px rgba(14,165,233,0.4)'
                      : 'none',
                  }}
                />

                {/* Contenido: alterna izquierda/derecha */}
                <div
                  className={`pl-10 sm:pl-0 sm:w-[calc(50%-24px)] ${
                    isLeft ? 'sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8'
                  }`}
                >
                  <span className="font-mono text-xs text-primary tracking-[0.15em] uppercase">
                    {item.year}
                  </span>
                  <h3 className="text-h3 text-light mt-1 font-display">
                    {item.title}
                  </h3>
                  <p className="text-surface-400 text-sm font-mono mt-1">
                    {item.subtitle}
                  </p>
                  <p className="text-muted text-body-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Espaciador para la otra columna en desktop */}
                <div className="hidden sm:block sm:w-[calc(50%-24px)]" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Blur fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface-950 to-transparent pointer-events-none z-20" />
    </SectionWrapper>
  )
}
