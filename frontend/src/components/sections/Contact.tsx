import { useState } from 'react'
import axios from 'axios'
import { Input, Select } from '../ui/Input'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', content: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })
    try {
      await axios.post(`${API_URL}/api/messages`, form)
      setStatus({ type: 'success', message: '¡Mensaje enviado! Te responderé en < 24h.' })
      setForm({ name: '', email: '', subject: '', content: '' })
    } catch (err) {
      setStatus({ type: 'error', message: 'Error al enviar. Intenta de nuevo o escríbeme directo.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-text-primary relative inline-block mb-10">Contacto</h2>
        <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="animate-fade-up">
          <h3 className="text-2xl font-bold text-text-primary mb-4">Hablemos de tu proyecto</h3>
          <p className="text-text-secondary leading-relaxed mb-8">¿Tienes una idea en mente? ¿Necesitas un desarrollador para tu equipo? ¿Solo quieres saludar? Estoy siempre abierto a conversar.</p>
          
          <div className="space-y-4 mb-8">
            <a href="mailto:edison.martinez@email.com" className="flex items-center gap-4 p-4 bg-dark-card border border-dark-border rounded-xl transition-all hover:border-primary hover:bg-primary/5 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark-bg"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6L12 13L2 6"/></svg></div>
              <div><p className="text-xs text-text-muted uppercase tracking-wider">Email</p><p className="font-medium text-text-primary">edison.martinez@email.com</p></div>
            </a>
            <a href="https://github.com/edisonm22" target="_blank" rel="noopener" className="flex items-center gap-4 p-4 bg-dark-card border border-dark-border rounded-xl transition-all hover:border-primary hover:bg-primary/5 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark-bg"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></div>
              <div><p className="text-xs text-text-muted uppercase tracking-wider">GitHub</p><p className="font-medium text-text-primary">github.com/edisonm22</p></div>
            </a>
            <div className="flex items-center gap-4 p-4 bg-dark-card border border-dark-border rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div>
              <div><p className="text-xs text-text-muted uppercase tracking-wider">Ubicación</p><p className="font-medium text-text-primary">Madrid, España (Remoto/Híbrido)</p></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6 text-center animate-pulse-glow">
            <p className="font-bold text-text-primary mb-2">⚡ Disponible para nuevos proyectos</p>
            <p className="text-text-secondary text-sm">Respuesta <span className="text-primary font-semibold">&lt; 24h</span> • Modalidad: Remoto / Híbrido (Madrid)</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-up" style={{ animationDelay: '200ms' }} noValidate>
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input label="Nombre *" name="name" required placeholder="Tu nombre" value={form.name} onChange={handleChange} />
              <Input label="Email *" name="email" type="email" required placeholder="tu@email.com" value={form.email} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Select label="Asunto *" name="subject" required value={form.subject} onChange={handleChange} options={[
                { value: '', label: 'Selecciona un tema' },
                { value: 'job', label: 'Oportunidad laboral' },
                { value: 'freelance', label: 'Proyecto freelance' },
                { value: 'collaboration', label: 'Colaboración' },
                { value: 'other', label: 'Otro' }
              ]} />
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-2">Mensaje *</label>
              <textarea name="content" required value={form.content} onChange={handleChange} rows={5} placeholder="Cuéntame en qué puedo ayudarte..."
                className="w-full px-4 py-3 rounded-xl border border-dark-border bg-dark-surface text-text-primary placeholder:text-text-muted resize-y min-h-[160px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-4" disabled={loading}>
              {loading ? <> <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M12 2a10 10 0 0110 10"/></svg> Enviando... </> : 'Enviar Mensaje'}
            </button>
            
            {status.type && (
              <div className={`mt-6 p-4 rounded-xl animate-fade-up ${status.type === 'success' ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
                <div className="flex items-center gap-2">
                  {status.type === 'success' ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
                  <span>{status.message}</span>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}