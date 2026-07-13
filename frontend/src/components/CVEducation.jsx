import React from 'react'

function CVEducation({ data }) {
  return (
    <section className='cv-section cv-education'>
      <h2 className='cv-section__title'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='20' height='20'>
          <path d='M22 10v6M2 10l10-5 10 5-10 5z' />
          <path d='M6 12v5c3 3 9 3 12 0v-5' />
        </svg>
        Formación Académica
      </h2>

      <div className='education__list'>
        {data.education.map((edu, index) => (
          <article key={edu.id} className='education__item'>
            <div className='education__icon'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M22 10v6M2 10l10-5 10 5-10 5z' />
                <path d='M6 12v5c3 3 9 3 12 0v-5' />
              </svg>
            </div>
            <div className='education__content'>
              <div className='education__header'>
                <h3 className='education__degree'>{edu.degree}</h3>
                <span className='education__year'>{edu.year}</span>
              </div>
              <p className='education__institution'>{edu.institution}</p>
              <p className='education__location'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='14' height='14'>
                  <circle cx='12' cy='12' r='3' />
                  <path d='M12 2v2M12 20v2M2 12h2M20 12h2' />
                </svg>
                {edu.location}
              </p>
              {edu.honors && (
                <div className='education__honors'>
                  <svg viewBox='0 0 24 24' fill='currentColor' width='14' height='14'>
                    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                  </svg>
                  <span>{edu.honors}</span>
                </div>
              )}
              {edu.details && (
                <ul className='education__details'>
                  {edu.details.map((detail, i) => (
                    <li key={i}>
                      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='14' height='14'>
                        <polyline points='20 6 9 17 4 12' />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>

      <h2 className='cv-section__title' style={{ marginTop: '3rem' }}>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='20' height='20'>
          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
          <polyline points='22 4 12 14.01 9 11.01' />
        </svg>
        Certificaciones
      </h2>

      <div className='certifications__grid'>
        {data.certifications.map(cert => (
          <article key={cert.id} className='certification__card'>
            <div className='certification__icon'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                <polyline points='14 2 14 8 20 8' />
                <line x1='16' y1='13' x2='8' y2='13' />
                <line x1='16' y1='17' x2='8' y2='17' />
                <polyline points='10 9 9 9 8 9' />
              </svg>
            </div>
            <div className='certification__content'>
              <h3 className='certification__name'>{cert.name}</h3>
              <p className='certification__issuer'>{cert.issuer}</p>
              <div className='certification__meta'>
                <span className='certification__date'>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='14' height='14'>
                    <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                    <line x1='16' y1='2' x2='16' y2='6' />
                    <line x1='8' y1='2' x2='8' y2='6' />
                    <line x1='3' y1='10' x2='21' y2='10' />
                  </svg>
                  {cert.date}
                </span>
                {cert.credentialId && (
                  <span className='certification__id'>{cert.credentialId}</span>
                )}
              </div>
            </div>
            {cert.verifyUrl && (
              <a href={cert.verifyUrl} target='_blank' rel='noopener noreferrer' className='certification__verify'>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='16' height='16'>
                  <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                  <polyline points='15 3 21 3 21 9' />
                  <line x1='10' y1='14' x2='21' y2='3' />
                </svg>
                Verificar
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default CVEducation