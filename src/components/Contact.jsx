import { useState } from 'react'
import { SectionWrapper } from './SectionWrapper.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

/* ============================================================
   CONSTANTS — NO modifiques con datos personales reales
   ============================================================ */
const WEB3FORMS_ACCESS_KEY = 'TU_ACCESS_KEY_AQUI' // TODO: obtener key real en web3forms.com y reemplazar antes de publicar
const EMAIL = 'edison86233268@gmail.com'
const LOCATION = 'TODO'     /* ← Reemplazar con ubicación real antes de producción */

/* ============================================================ */

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [sending, setSending] = useState(false)
  const sectionRef = useScrollReveal()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status.msg) setStatus({ type: '', msg: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    /* ── Validación cliente ── */
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', msg: 'Todos los campos obligatorios deben estar completos.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus({ type: 'error', msg: 'Ingresa un correo electrónico válido.' })
      return
    }

    setSending(true)
    setStatus({ type: '', msg: '' })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || 'Nuevo mensaje desde portafolio',
          message: form.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus({ type: 'success', msg: '¡Mensaje enviado con éxito! Te responderé pronto.' })
        setForm(initialForm)
      } else {
        setStatus({ type: 'error', msg: data.message || 'Error al enviar el mensaje. Intenta de nuevo.' })
      }
    } catch {
      setStatus({ type: 'error', msg: 'Error de conexión. Verifica tu internet e intenta de nuevo.' })
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3.5 bg-surface-900 border border-surface-800 rounded-xl text-light text-sm placeholder:text-surface-700 transition-all duration-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 focus:bg-surface-850'

  return (
    <SectionWrapper
      id="contact"
      title="Contacto"
      eyebrow="CONTACTO"
      subtitle="Hablemos sobre tu próximo proyecto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
        {/* ── Formulario ── */}
        <form onSubmit={handleSubmit} noValidate ref={sectionRef} className="reveal space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre *"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              autoComplete="name"
              aria-label="Nombre"
              required
              disabled={sending}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo *"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              autoComplete="email"
              aria-label="Correo electrónico"
              required
              disabled={sending}
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Asunto (opcional)"
            value={form.subject}
            onChange={handleChange}
            className={inputClass}
            aria-label="Asunto"
            disabled={sending}
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Mensaje *"
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
            aria-label="Mensaje"
            required
            disabled={sending}
          />

          <p className="text-caption text-surface-700 -mt-2">
            * Campos obligatorios
          </p>

          <button
            type="submit"
            disabled={sending}
            className="group relative w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold text-base rounded-xl transition-all duration-300 hover:shadow-button-glow hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              {sending ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensaje
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </span>
          </button>

          {/* Status message */}
          {status.msg && (
            <div
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                status.type === 'success'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/15 text-red-400 border border-red-500/20'
              }`}
              role="alert"
            >
              {status.msg}
            </div>
          )}
        </form>

        {/* ── Info de contacto ── */}
        <div className="space-y-8 reveal" data-reveal-delay="200">
          <div>
            <h3 className="text-h3 text-light mb-2">Información de contacto</h3>
            <p className="text-muted text-body-sm leading-relaxed">
              Estoy abierto a nuevas oportunidades, colaboraciones y proyectos
              desafiantes. No dudes en escribirme.
            </p>
          </div>

          <div className="space-y-4">
            <ContactItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
              label="Correo"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
            />
            <ContactItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              }
              label="Ubicación"
              value={LOCATION}
            />
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            <SocialLink href="https://github.com/edisonm22" label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </SocialLink>
            <SocialLink href="TU_LINKEDIN_AQUI" label="LinkedIn"> {/* TODO: reemplazar con tu URL real de LinkedIn */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialLink>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ── Componentes auxiliares ── */

function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3 px-4 py-3.5 bg-surface-900/40 border border-surface-800 rounded-xl transition-all duration-300 hover:bg-surface-900 hover:border-primary/20">
      <span className="shrink-0 w-10 h-10 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-caption text-surface-600 uppercase tracking-wider">{label}</p>
        <p className="text-body-sm text-light font-medium truncate">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return <a href={href} className="block group">{content}</a>
  }
  return content
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-900 border border-surface-800 text-surface-500 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:text-primary hover:shadow-glow-primary"
    >
      {children}
    </a>
  )
}
