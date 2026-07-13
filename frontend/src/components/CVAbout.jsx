import React from 'react'

function CVAbout({ data }) {
  return (
    <section className='cv-section cv-about'>
      <h2 className='cv-section__title'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='20' height='20'>
          <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
        </svg>
        Perfil Profesional
      </h2>

      <div className='cv-about__content'>
        <p className='cv-about__summary'>{data.summary}</p>

        <div className='cv-about__highlights'>
          <div className='highlight'>
            <span className='highlight__number'>5+</span>
            <span className='highlight__label'>Años experiencia</span>
          </div>
          <div className='highlight'>
            <span className='highlight__number'>15+</span>
            <span className='highlight__label'>Proyectos entregados</span>
          </div>
          <div className='highlight'>
            <span className='highlight__number'>8</span>
            <span className='highlight__label'>Tecnologías core</span>
          </div>
          <div className='highlight'>
            <span className='highlight__number'>100K+</span>
            <span className='highlight__label'>Usuarios impactados</span>
          </div>
        </div>

        <div className='cv-about__values'>
          <h3 className='cv-about__values-title'>Lo que me define</h3>
          <ul className='cv-about__values-list'>
            <li>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                <polyline points='22 4 12 14.01 9 11.01' />
              </svg>
              <span>Calidad sobre cantidad: código limpio, testeado y mantenible</span>
            </li>
            <li>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                <polyline points='22 4 12 14.01 9 11.01' />
              </svg>
              <span>Mentalidad de producto: entiendo el negocio, no solo el código</span>
            </li>
            <li>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                <polyline points='22 4 12 14.01 9 11.01' />
              </svg>
              <span>Aprendizaje continuo: siempre explorando nuevas tecnologías</span>
            </li>
            <li>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                <polyline points='22 4 12 14.01 9 11.01' />
              </svg>
              <span>Trabajo en equipo: mentoring, code reviews, conocimiento compartido</span>
            </li>
          </ul>
        </div>

        <div className='cv-about__cta'>
          <a href='#contact' className='btn btn--primary'>Contactar</a>
          <a href='#projects' className='btn btn-outline'>Ver Proyectos</a>
        </div>
      </div>
    </section>
  )
}

export default CVAbout