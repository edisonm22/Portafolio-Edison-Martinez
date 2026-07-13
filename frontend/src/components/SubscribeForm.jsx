import React, { useState } from 'react'

function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Ingresa un email válido')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      await new Promise(r => setTimeout(r, 1200))
      setStatus('success')
      setMessage('¡Gracias! Te avisaremos cuando abramos pre-orders.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Algo falló. Intenta de nuevo.')
    }
  }

  return (
    <section id='subscribe' className='subscribe'>
      <div className='subscribe__bg'>
        <div className='subscribe__blob subscribe__blob--1'></div>
        <div className='subscribe__blob subscribe__blob--2'></div>
        <div className='subscribe__blob subscribe__blob--3'></div>
      </div>

      <div className='container'>
        <div className='subscribe__content'>
          <div className='subscribe__info'>
            <div className='subscribe__badge'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
                <path d='M13.73 21a2 2 0 0 1-3.46 0' />
              </svg>
              <span>Acceso anticipado garantizado</span>
            </div>

            <h2 className='subscribe__title'>
              Sé el primero en tener<br />
              <span className='accent'>NebulaX Pro</span>
            </h2>

            <p className='subscribe__description'>
              Únete a 15,000+ suscriptores. Prioridad de reserva, descuento exclusivo
              de lanzamiento y contenido detrás de cámaras. Sin spam, solo valor.
            </p>

            <ul className='subscribe__benefits'>
              <li>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <polyline points='20 6 9 17 4 12' />
                </svg>
                <span>Acceso 48h antes al público general</span>
              </li>
              <li>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <polyline points='20 6 9 17 4 12' />
                </svg>
                <span>Descuento fundador -15% garantizado</span>
              </li>
              <li>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <polyline points='20 6 9 17 4 12' />
                </svg>
                <span>Invitación evento lanzamiento virtual</span>
              </li>
              <li>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <polyline points='20 6 9 17 4 12' />
                </svg>
                <span>Newsletter mensual: audio, tech, productividad</span>
              </li>
            </ul>

            <p className='subscribe__privacy'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
              </svg>
              Tu email nunca se comparte. Política de privacidad clara. Un clic para darte de baja.
            </p>
          </div>

          <form className='subscribe__form' onSubmit={handleSubmit} aria-label='Suscripción newsletter'>
            <div className='form-group'>
              <label htmlFor='email' className='visually-hidden'>Email</label>
              <div className='input-wrapper'>
                <svg className='input-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <rect x='2' y='4' width='20' height='16' rx='2' />
                  <path d='M22 6L12 13L2 6' />
                </svg>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='tu@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-input ${status === 'error' ? 'error' : ''}`}
                  required
                  autoComplete='email'
                  aria-describedby={status === 'error' ? 'email-error' : status === 'success' ? 'email-success' : undefined}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              {status === 'error' && (
                <p id='email-error' className='form-error' role='alert'>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <circle cx='12' cy='12' r='10' />
                    <line x1='12' y1='8' x2='12' y2='12' />
                    <line x1='12' y1='16' x2='12.01' y2='16' />
                  </svg>
                  {message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className={`btn btn--primary btn--glow btn--full ${status === 'loading' ? 'loading' : ''}`}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' && (
                <svg className='spinner' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='12' cy='12' r='10' strokeOpacity='0.25' />
                  <path d='M12 2a10 10 0 0 1 10 10' strokeLinecap='round' />
                </svg>
              )}
              {status === 'success' ? (
                <>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='btn__icon'>
                    <polyline points='20 6 9 17 4 12' />
                  </svg>
                  ¡Suscrito!
                </>
              ) : (
                <>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='btn__icon'>
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                  Reservar mi plaza
                </>
              )}
            </button>

            {status === 'success' && (
              <p id='email-success' className='form-success' role='status'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                  <polyline points='22 4 12 14.01 9 11.01' />
                </svg>
                {message}
              </p>
            )}
          </form>
        </div>

        <div className='subscribe__social-proof'>
          <p className='social-proof__text'>Ya confían en nosotros:</p>
          <div className='social-proof__avatars'>
            <span className='avatar' style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>JD</span>
            <span className='avatar' style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>MK</span>
            <span className='avatar' style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>AR</span>
            <span className='avatar' style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>SL</span>
            <span className='avatar' style={{ background: 'linear-gradient(135deg, #fa709a, #fee140)' }}>TP</span>
            <span className='avatar avatar--more'>+15K</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscribeForm