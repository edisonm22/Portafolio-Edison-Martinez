import React from 'react'

function CVSkills({ data }) {
  const categories = [
    { key: 'frontend', label: 'Frontend', color: 'var(--accent)' },
    { key: 'backend', label: 'Backend & APIs', color: 'var(--glow-purple)' },
    { key: 'cloud', label: 'Cloud & DevOps', color: 'var(--glow-pink)' },
    { key: 'quality', label: 'Quality & Tools', color: 'var(--glow-amber)' },
  ]

  return (
    <section className='cv-section cv-skills'>
      <h2 className='cv-skills__title'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='20' height='20'>
          <polyline points='16 18 22 12 16 6' />
          <polyline points='8 6 2 12 8 18' />
        </svg>
        Habilidades
      </h2>

      <div className='cv-skills__categories'>
        {categories.map(cat => {
          const skills = data.technical.filter(s => s.category === cat.key)
          return skills.length > 0 ? (
            <div key={cat.key} className='cv-skills__category'>
              <h3 className='cv-skills__category-title' style={{ '--cat-color': cat.color }}>
                {cat.label}
              </h3>
              <div className='cv-skills__bars'>
                {skills.map(skill => (
                  <div key={skill.name} className='skill-bar'>
                    <div className='skill-bar__header'>
                      <span className='skill-bar__name'>{skill.name}</span>
                      <span className='skill-bar__value'>{skill.level}%</span>
                    </div>
                    <div className='skill-bar__track'>
                      <div
                        className='skill-bar__fill'
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}dd)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        })}
      </div>

      <div className='cv-skills__soft'>
        <h3 className='cv-skills__category-title'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' width='20' height='20'>
            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
          </svg>
          Habilidades Blandas
        </h3>
        <div className='cv-skills__tags'>
          {data.soft.map(skill => (
            <div key={skill.name} className='soft-skill'>
              <span className='soft-skill__name'>{skill.name}</span>
              <div className='soft-skill__level'>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`soft-skill__dot ${i < Math.round(skill.level / 20) ? 'filled' : ''}`}
                    style={{ '--dot-color': 'var(--glow-cyan)' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CVSkills