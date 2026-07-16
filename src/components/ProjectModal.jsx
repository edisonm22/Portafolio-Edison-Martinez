import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { getTechColor } from '../utils/techColors.js'

/**
 * ProjectModal — Modal de proyecto con shared‑element transition,
 * focus trap real y operabilidad total por teclado.
 *
 * @param {Object}   props
 * @param {Object}   props.project    — Datos del proyecto
 * @param {number}   props.cardIndex  — Índice para gradiente
 * @param {Function} props.onClose    — Cierra el modal
 */
export default function ProjectModal({ project, cardIndex = 0, onClose }) {
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  /* ── Capturar foco anterior y abrir con transición ── */
  useEffect(() => {
    previousFocusRef.current = document.activeElement

    // Si ViewTransition API disponible, usarla para la entrada
    if (document.startViewTransition) {
      // La transición ya fue iniciada desde Projects.jsx
    }
  }, [])

  /* ── Focus trap + Escape ── */
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    const focusable = modal.querySelectorAll(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]

    // Foco al primer elemento (el botón cerrar)
    if (first) {
      first.focus()
    } else {
      modal.setAttribute('tabindex', '-1')
      modal.focus()
    }

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        // Cerrar con transición si disponible
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            flushSync(() => { onClose() })
          })
        } else {
          onClose()
        }
        return
      }

      if (e.key === 'Tab') {
        const active = document.activeElement
        if (e.shiftKey) {
          if (active === first || !focusable.length) {
            e.preventDefault()
            if (last) last.focus()
          }
        } else {
          if (active === last || !focusable.length) {
            e.preventDefault()
            if (first) first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  /* ── Cerrar al hacer clic en el backdrop ── */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const gradientIndex = (cardIndex ?? 0) % 5
  const gradients = [
    'from-primary/20 via-accent/10 to-transparent',
    'from-accent/20 via-primary/10 to-transparent',
    'from-cyan-500/20 via-primary/10 to-transparent',
    'from-rose-500/20 via-accent/10 to-transparent',
    'from-amber-500/20 via-primary/10 to-transparent',
  ]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Proyecto: ${project.title}`}
      ref={modalRef}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-md animate-modal-fadeIn"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface-900 border border-surface-800 rounded-2xl shadow-2xl animate-modal-slideUp"
        style={{
          viewTransitionName: 'project-modal',
        }}
      >
        {/* Gradient header */}
        <div className="relative h-48 sm:h-56 rounded-t-2xl overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} opacity-80`} />
          <div className="absolute inset-0 bg-surface-950/40" />

          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-xl bg-surface-900/80 border border-surface-700/60 text-surface-400 hover:text-light hover:border-surface-500 hover:bg-surface-800 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 focus:outline-none"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h2
              className="text-2xl sm:text-3xl font-display font-bold text-light tracking-tight"
              style={{ viewTransitionName: 'project-title' }}
            >
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Full description */}
          <div>
            <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase mb-2 block">
              Descripción
            </span>
            <p className="text-surface-300 text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase mb-3 block">
              Tecnologías
            </span>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || ['React', 'Node', 'MongoDB']).map((tech) => (
                <span
                  key={tech}
                  className="tech-tag px-3 py-1 text-xs font-mono font-medium rounded-lg border"
                  style={{
                    backgroundColor: `${getTechColor(tech)}15`,
                    borderColor: `${getTechColor(tech)}30`,
                    color: getTechColor(tech),
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Acción: Botón destacado y repo */}
          {project.demoUrl && project.demoUrl !== '#' && (
            <div className="pt-2">
              <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase mb-3 block">
                Enlaces
              </span>
              <div className="flex flex-wrap gap-3">
                {/* Demo live */}
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-semibold text-sm rounded-xl hover:shadow-button-glow transition-all duration-300 hover:scale-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Demo en vivo
                </a>

                {/* Repositorio */}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-surface-700 text-surface-300 font-semibold text-sm rounded-xl hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Código fuente
                </a>
              </div>
            </div>
          )}

          {/* Badge de proyecto destacado */}
          {project.featured && (
            <div className="pt-2 border-t border-surface-800">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Proyecto destacado
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
