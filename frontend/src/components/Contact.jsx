import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', content: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      await axios.post(`${API_URL}/api/messages`, form)
      setStatus('Mensaje enviado correctamente')
      setForm({ name: '', email: '', subject: '', content: '' })
    } catch (err) {
      setStatus('Error al enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='contact' className='section'>
      <h2 className='section-title'>Contáctame</h2>
      <form className='contact-form' onSubmit={handleSubmit}>
        <input name='name' placeholder='Tu nombre' value={form.name} onChange={handleChange} required />
        <input name='email' type='email' placeholder='Tu email' value={form.email} onChange={handleChange} required />
        <input name='subject' placeholder='Asunto' value={form.subject} onChange={handleChange} />
        <textarea name='content' placeholder='Tu mensaje' value={form.content} onChange={handleChange} required />
        <button type='submit' className='btn' disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        {status && <p className={`status ${status.includes('Error') ? 'error' : 'success'}`}>{status}</p>}
      </form>
    </section>
  )
}

export default Contact
