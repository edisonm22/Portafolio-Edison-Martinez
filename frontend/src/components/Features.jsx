import React from 'react'

const features = [
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <rect x='2' y='3' width='20' height='14' rx='2' />
        <path d='M8 21h8' />
        <path d='M12 17v4' />
      </svg>
    ),
    title: 'Interfaz Intuitiva',
    description: 'Diseño limpio y minimalista que se adapta a tu flujo de trabajo. Zero curva de aprendizaje.',
    highlight: 'Nuevo'
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <circle cx='12' cy='12' r='10' />
        <path d='M12 6v6l4 2' />
      </svg>
    ),
    title: 'Sincronización Instantánea',
    description: 'Tus datos siempre actualizados en todos tus dispositivos. Funciona offline y sincroniza al reconectar.',
    highlight: 'Mejorado'
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      </svg>
    ),
    title: 'Seguridad Bancaria',
    description: 'Cifrado AES-256, autenticación biométrica y 2FA. Tus datos solo tuyos, siempre.',
    highlight: null
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
      </svg>
    ),
    title: 'Analytics Avanzados',
    description: 'Reportes en tiempo real, métricas personalizadas y exportación a CSV/PDF con un clic.',
    highlight: 'Pro'
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <circle cx='12' cy='12' r='3' />
        <path d='M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
      </svg>
    ),
    title: 'Modo Oscuro Nativo',
    description: 'Cambio automático según horario o preferencia del sistema. Diseñado para cuidar tu vista.',
    highlight: null
  },
  {
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
        <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      </svg>
    ),
    title: 'Colaboración en Equipo',
    description: 'Espacios de trabajo compartidos, comentarios en tiempo real y control de versiones.',
    highlight: 'Equipos'
  }
]

function Features() {
  return (
    <section id='features' className='features'>
      <div className='container'>
        <div className='section-header'>
          <span className='section-tag'>Características</span>
          <h2 className='section-title'>Todo lo que necesitas<br />en una sola app</h2>
          <p className='section-description'>
            Hemos reconstruido cada detalle pensando en ti. Potencia, simplicidad y belleza.
          </p>
        </div>
        <div className='features__grid'>
          {features.map((feature, index) => (
            <article key={index} className='feature-card'>
              <div className='feature-card__icon'>
                {feature.icon}
              </div>
              {feature.highlight && (
                <span className='feature-card__badge'>{feature.highlight}</span>
              )}
              <h3 className='feature-card__title'>{feature.title}</h3>
              <p className='feature-card__description'>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features