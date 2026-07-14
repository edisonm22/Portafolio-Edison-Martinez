import { useState } from 'react'
import axios from 'axios'
import { Input, Textarea, Select } from '../ui/Input'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export function CVContact({ data }: { data: { email: string; phone: string; location: string; linkedin: string; github: string } }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/api/messages`, formData)
      setStatus({ type: 'success', message: '¡Mensaje enviado! Te responderé en menos de 24h.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({ type: 'error', message: 'Error al enviar. Intenta de nuevo o escríbeme directamente por email.' })
    }
  }

  return (
    <section className="cv-section cv-contact" id="contact">
      <h2 className="cv-section__title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        Contacto
      </h2>

      <div className="cv-contact__grid">
        <div className="cv-contact__info">
          <p className="cv-contact__intro">¿Tienes un proyecto en mente? ¿Quieres colaborar? ¿Solo quieres saludar? Estoy siempre abierto a conversar sobre nuevas oportunidades.</p>

          <div className="cv-contact__methods">
            <a href={`mailto:${data.email}`} className="cv-contact__method">
              <div className="cv-contact__method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6L12 13L2 6" /></svg></div>
              <div className="cv-contact__method-content"><span className="cv-contact__method-label">Email</span><span className="cv-contact__method-value">{data.email}</span></div>
            </a>

            <a href={`tel:${data.phone}`} className="cv-contact__method">
              <div className="cv-contact__method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
              <div className="cv-contact__method-content"><span className="cv-contact__method-label">Teléfono</span><span className="cv-contact__method-value">{data.phone}</span></div>
            </a>

            <div className="cv-contact__method">
              <div className="cv-contact__method-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
              <div className="cv-contact__method-content"><span className="cv-contact__method-label">Ubicación</span><span className="cv-contact__method-value">{data.location}</span></div>
            </div>
          </div>

          <div className="cv-contact__social">
            <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <a href={`https://github.com/${data.github}`} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
          </div>
        </div>

        <form className="cv-contact__form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <Input label="Nombre *" name="name" required placeholder="Tu nombre" value={formData.name} onChange={handleChange} />
            <Input label="Email *" name="email" type="email" required placeholder="tu@email.com" value={formData.email} onChange={handleChange} />
          </div>
          <Select label="Asunto *" name="subject" value={formData.subject} onChange={handleChange} required options={[
            { value: '', label: 'Selecciona un tema' },
            { value: 'job', label: 'Oportunidad laboral' },
            { value: 'freelance', label: 'Proyecto freelance' },
            { value: 'collaboration', label: 'Colaboración' },
            { value: 'other', label: 'Otro' }
          ]} />
          <Textarea label="Mensaje *" name="message" required rows={5} placeholder="Cuéntame en qué puedo ayudarte..." value={formData.message} onChange={handleChange} />
          <button type="submit" className="btn btn--primary btn--full" disabled={status?.type === 'success'}>
            Enviar Mensaje
          </button>

          {status && (
            <div className={`form-${status.type} animate-fade-up`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                {status.type === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </>
                )}
              </svg>
              {status.message}
            </div>
          )}
        </form>
      </div>

      <div className="cv-contact__cta">
        <p>Disponible para nuevas oportunidades</p>
        <div className="cv-contact__cta-info">
          <span><strong>Sí</strong> - Tiempo de respuesta: {'<'} 24h</span>
          <span>Modalidad: <strong>Remoto / Híbrido (Madrid)</strong></span>
        </div>
      </div>
    </section>
  )
}