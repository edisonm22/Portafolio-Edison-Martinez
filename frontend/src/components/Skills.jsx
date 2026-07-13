import React from 'react'
import { useFadeIn } from '../hooks/useScrollSpy'

const skillCategories = [
  { name: 'Frontend', skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { name: 'Backend', skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL', 'JWT Auth'] },
  { name: 'Tools & DevOps', skills: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'AWS', 'Linux', 'VS Code', 'Postman'] }
]

function Skills({ skills, loading }) {
  const [setRef, visible] = useFadeIn()
  const getLevel = (name) => {
    const skill = skills.find(s => s.name === name)
    return skill ? skill.level : 0
  }

  return (
    <section id='skills' ref={setRef} className={`section fade-in${visible ? ' visible' : ''}`}>
      <h2 className='section-title'>Habilidades</h2>
      <div className='skills-categories'>
        {skillCategories.map(cat => (
          <div key={cat.name} className='skill-category'>
            <h3 className='category-title'>{cat.name}</h3>
            <div className='skill-grid'>
              {cat.skills.map(s => (
                <div key={s} className='skill'>
                  <span className='skill-name'>{s}</span>
                  <div className='bar'><div className='bar-fill' style={{ width: getLevel(s) + '%' }}></div></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
