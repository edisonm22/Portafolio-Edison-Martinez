import React from 'react'
import { useFadeIn } from '../hooks/useScrollSpy'

function Projects({ projects, loading }) {
  const [setRef, visible] = useFadeIn()
  if (loading) {
    return (
      <section id='projects' ref={setRef} className={`section fade-in${visible ? ' visible' : ''}`}>
        <h2 className='section-title'>Mis Proyectos</h2>
        <div className='grid'>
          {[1, 2, 3].map(i => (
            <div key={i} className='card skeleton'>
              <div className='skeleton-line' style={{ width: '60%' }}></div>
              <div className='skeleton-line' style={{ width: '80%' }}></div>
              <div className='skeleton-line' style={{ width: '40%' }}></div>
              <div className='tags'>
                <span className='tag skeleton-tag'></span>
                <span className='tag skeleton-tag'></span>
                <span className='tag skeleton-tag'></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id='projects' ref={setRef} className={`section fade-in${visible ? ' visible' : ''}`}>
      <h2 className='section-title'>Mis Proyectos</h2>
      <div className='grid'>
        {projects.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)' }}>No hay proyectos disponibles</p>
        ) : (
          projects.map(p => (
            <article key={p._id} className='card'>
              <div className='project-image' style={{ backgroundImage: `url(${p.imageUrl || '/placeholder-project.svg'})` }}></div>
              <div className='project-content'>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className='tags'>
                  {p.technologies.map(t => <span key={t} className='tag'>{t}</span>)}
                </div>
                <div className='project-links'>
                  {p.projectUrl && <a href={p.projectUrl} target='_blank' rel='noopener noreferrer' className='btn btn-sm'>Ver Demo</a>}
                  {p.repoUrl && <a href={p.repoUrl} target='_blank' rel='noopener noreferrer' className='btn btn-sm btn-outline'>Código</a>}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default Projects
