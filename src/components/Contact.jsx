import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { SectionWrapper } from './SectionWrapper.jsx'

function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13L2 6" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function Contact() {
  const sectionRef = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', content: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Intento de envío vía mailto: como fallback siempre funcional
    const mailtoLink = `mailto:edison.martinez@email.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`De: ${form.name} (${form.email})\n\n${form.content}`)}`

    // Simular envío API (reemplazar con fetch real cuando haya backend)
    await new Promise((resolve) => setTimeout(resolve, 800))

    setStatus({
      type: 'success',
      message: '¡Mensaje recibido! Te responderé en menos de 24h.',
    })
    setForm({ name: '', email: '', subject: '', content: '' })

    // Abrir mailto como respaldo
    window.open(mailtoLink, '_blank')

    setLoading(false)
    setTimeout(() => setStatus({ type: '', message: '' }), 5000)
  }

  return (
    <SectionWrapper
      id="contact"
      title="Contacto"
      subtitle="Hablemos de tu proyecto — respondo en menos de 24h"
    >
      <div ref={sectionRef} className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        {/* Info — 2 columnas */}
        <div className="lg:col-span-2 space-y-8 reveal">
          <div>
            <h3 className="text-h3 text-[#f1f5f9] mb-4">
              Hablemos de tu proyecto
            </h3>
            <p className="text-[#64748b] text-body-sm leading-relaxed">
              ¿Tienes una idea en mente? ¿Necesitas un desarrollador para tu
              equipo? Estoy siempre abierto a conversar sin compromiso.
            </p>
          </div>

          <div className="space-y-4">
            <ContactCard
              icon={<MailIcon />}
              label="Email"
              value="edison.martinez@email.com"
              href="mailto:edison.martinez@email.com"
            />
            <ContactCard
              icon={<GitHubIcon />}
              label="GitHub"
              value="github.com/edisonm22"
              href="https://github.com/edisonm22"
            />
            <ContactCard
              icon={<LocationIcon />}
              label="Ubicación"
              value="Madrid, España (Remoto / Híbrido)"
            />
          </div>

          <AvailabilityBadge />
        </div>

        {/* Form — 3 columnas */}
        <div className="lg:col-span-3 reveal" data-reveal-delay="150">
          <form
            onSubmit={handleSubmit}
            className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6 lg:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <FormField
                label="Nombre"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handleChange}
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Asunto <span className="text-[#0ea5e9]">*</span>
              </label>
              <select
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#1e293b] bg-[#0a0f1a] text-[#f1f5f9] transition-all duration-200 focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/15 hover:border-[#2d3a4f] appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.25rem',
                }}
              >
                <option value="" className="bg-[#0a0f1a]">Selecciona un tema</option>
                <option value="job" className="bg-[#0a0f1a]">Oportunidad laboral</option>
                <option value="freelance" className="bg-[#0a0f1a]">Proyecto freelance</option>
                <option value="collaboration" className="bg-[#0a0f1a]">Colaboración</option>
                <option value="other" className="bg-[#0a0f1a]">Otro</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Mensaje <span className="text-[#0ea5e9]">*</span>
              </label>
              <textarea
                name="content"
                required
                value={form.content}
                onChange={handleChange}
                rows={5}
                placeholder="Cuéntame en qué puedo ayudarte..."
                className="w-full px-4 py-3 rounded-xl border border-[#1e293b] bg-[#0a0f1a] text-[#f1f5f9] placeholder:text-[#475569] resize-y min-h-[140px] transition-all duration-200 focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/15 hover:border-[#2d3a4f]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0ea5e9] text-black font-bold text-base rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <>
                    Enviar Mensaje
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {status.type && (
              <div
                className={`mt-5 p-4 rounded-xl flex items-start gap-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-green-500/8 text-green-400 border border-green-500/15'
                    : 'bg-red-500/8 text-red-400 border border-red-500/15'
                }`}
              >
                {status.type === 'success' ? (
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                )}
                <span>{status.message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ── Contact Card ── */
function ContactCard({ icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-4 p-4 bg-[#111827] border border-[#1e293b] rounded-xl transition-all duration-200 hover:border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/[0.02] group cursor-pointer">
      <div className="w-11 h-11 rounded-xl bg-[#0ea5e9]/8 flex items-center justify-center text-[#0ea5e9] transition-all duration-200 group-hover:bg-[#0ea5e9] group-hover:text-black">
        {icon}
      </div>
      <div>
        <p className="text-caption text-[#475569] uppercase tracking-widest">{label}</p>
        <p className="text-body-sm font-medium text-[#f1f5f9]">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">
        {content}
      </a>
    )
  }
  return content
}

/* ── Availability Badge ── */
function AvailabilityBadge() {
  return (
    <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#0ea5e9]/8 to-[#a855f7]/8 border border-[#0ea5e9]/15 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.06),transparent_70%)]" />
      <div className="relative">
        <p className="font-bold text-[#f1f5f9] mb-1">
          Disponible para nuevos proyectos
        </p>
        <p className="text-[#475569] text-sm">
          Respuesta{' '}
          <span className="text-[#0ea5e9] font-semibold">&lt; 24h</span>
          <span className="mx-2">&middot;</span>
          Remoto / Híbrido (Madrid)
        </p>
      </div>
    </div>
  )
}

/* ── Form Field ── */
function FormField({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#94a3b8] mb-2" htmlFor={name}>
        {label} <span className="text-[#0ea5e9]">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-[#1e293b] bg-[#0a0f1a] text-[#f1f5f9] placeholder:text-[#475569] transition-all duration-200 focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/15 hover:border-[#2d3a4f]"
      />
    </div>
  )
}
