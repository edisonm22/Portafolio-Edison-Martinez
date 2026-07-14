import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    content: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call — replace with actual endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStatus({
      type: 'success',
      message: '¡Mensaje enviado! Te responderé en < 24h.',
    })
    setForm({ name: '', email: '', subject: '', content: '' })
    setLoading(false)
  }

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-[#f1f5f9] mb-4">
          Contacto
        </h2>
        <div className="w-20 h-1 bg-[#0ea5e9] rounded-full mx-auto" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h3 className="text-2xl font-bold text-[#f1f5f9] mb-4">
            Hablemos de tu proyecto
          </h3>
          <p className="text-[#94a3b8] leading-relaxed mb-8">
            ¿Tienes una idea en mente? ¿Necesitas un desarrollador para tu
            equipo? Estoy siempre abierto a conversar.
          </p>

          <ContactInfo />
          <AvailabilityBadge />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] border border-[#2d3a4f] rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <FormField
              label="Nombre *"
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
            <FormField
              label="Email *"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#f1f5f9] mb-2">
              Asunto *
            </label>
            <select
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#2d3a4f] bg-[#111827] text-[#f1f5f9] transition-all focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
            >
              <option value="">Selecciona un tema</option>
              <option value="job">Oportunidad laboral</option>
              <option value="freelance">Proyecto freelance</option>
              <option value="collaboration">Colaboración</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#f1f5f9] mb-2">
              Mensaje *
            </label>
            <textarea
              name="content"
              required
              value={form.content}
              onChange={handleChange}
              rows={5}
              placeholder="Cuéntame en qué puedo ayudarte..."
              className="w-full px-4 py-3 rounded-xl border border-[#2d3a4f] bg-[#111827] text-[#f1f5f9] placeholder:text-[#64748b] resize-y min-h-[160px] transition-all focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full justify-center py-4"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>

          {status.type && <StatusMessage status={status} />}
        </form>
      </div>
    </section>
  )
}

/* ── Contact Info Block ── */
function ContactInfo() {
  const items = [
    {
      icon: 'email',
      label: 'Email',
      value: 'edison.martinez@email.com',
      href: 'mailto:edison.martinez@email.com',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'github.com/edisonm22',
      href: 'https://github.com/edisonm22',
    },
    {
      icon: 'location',
      label: 'Ubicación',
      value: 'Madrid, España (Remoto/Híbrido)',
    },
  ]

  return (
    <div className="space-y-4 mb-8">
      {items.map((item) => (
        <ContactInfoItem key={item.label} {...item} />
      ))}
    </div>
  )
}

function ContactInfoItem({ icon, label, value, href }) {
  const IconComponent = getIcon(icon)
  const content = (
    <div className="flex items-center gap-4 p-4 bg-[#1e293b] border border-[#2d3a4f] rounded-xl transition-all hover:border-[#0ea5e9] hover:bg-[#0ea5e9]/5 group">
      <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] group-hover:bg-[#0ea5e9] group-hover:text-black">
        <IconComponent />
      </div>
      <div>
        <p className="text-xs text-[#64748b] uppercase tracking-wider">
          {label}
        </p>
        <p className="font-medium text-[#f1f5f9]">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener' : undefined}
        className="block"
      >
        {content}
      </a>
    )
  }

  return content
}

function getIcon(name) {
  const icons = {
    email: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6L12 13L2 6" />
      </svg>
    ),
    github: () => (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    location: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  }
  return icons[name] || icons.email
}

/* ── Availability Badge ── */
function AvailabilityBadge() {
  return (
    <div className="bg-gradient-to-br from-[#0ea5e9]/10 to-purple-500/10 border border-[#0ea5e9]/20 rounded-2xl p-6 text-center">
      <p className="font-bold text-[#f1f5f9] mb-2">
        Disponible para nuevos proyectos
      </p>
      <p className="text-[#94a3b8] text-sm">
        Respuesta{' '}
        <span className="text-[#0ea5e9] font-semibold">&lt; 24h</span> &bull;
        Remoto / Híbrido (Madrid)
      </p>
    </div>
  )
}

/* ── Form Field ── */
function FormField({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#f1f5f9] mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-[#2d3a4f] bg-[#111827] text-[#f1f5f9] placeholder:text-[#64748b] transition-all focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
      />
    </div>
  )
}

/* ── Status Message ── */
function StatusMessage({ status }) {
  const isSuccess = status.type === 'success'
  return (
    <div
      className={`mt-6 p-4 rounded-xl flex items-center gap-2 ${
        isSuccess
          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
          : 'bg-red-500/15 text-red-400 border border-red-500/30'
      }`}
    >
      {isSuccess ? (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )}
      <span>{status.message}</span>
    </div>
  )
}
