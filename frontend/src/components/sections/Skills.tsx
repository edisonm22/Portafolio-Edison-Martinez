import { useEffect, useRef } from 'react'

interface SkillsProps {
  loading: boolean
}

const skillCategories = [
  { name: 'Frontend', icon: '⚛️', skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'Next.js'] },
  { name: 'Backend', icon: '🟢', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL', 'JWT Auth'] },
  { name: 'DevOps & Tools', icon: '☁️', skills: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Linux', 'VS Code', 'Postman'] }
]

const levelMap: Record<string, number> = { 'React': 95, 'TypeScript': 92, 'JavaScript': 90, 'HTML5': 95, 'CSS3': 92, 'Tailwind CSS': 88, 'Next.js': 85, 'Vite': 90, 'Node.js': 90, 'Express': 88, 'MongoDB': 85, 'PostgreSQL': 80, 'REST APIs': 88, 'GraphQL': 82, 'JWT Auth': 85, 'Git': 95, 'GitHub Actions': 85, 'Docker': 82, 'AWS': 80, 'Vercel': 90, 'Linux': 85, 'VS Code': 95, 'Postman': 88 }

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.width = level + '%'
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [level])

  return (
    <div key={name} className="group" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex justify-between mb-1.5">
        <span className="text-text-primary font-medium">{name}</span>
        <span className="text-primary font-bold text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
        <div ref={barRef} className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '0%' }} />
      </div>
    </div>
  )
}

export function Skills({ loading }: SkillsProps) {
  if (loading) return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
      <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-black text-text-primary relative inline-block mb-10">Habilidades</h2><div className="w-20 h-1 bg-primary rounded-full mx-auto" /></div>
      <div className="space-y-12">{skillCategories.map((data, ci) => <div key={ci} className="animate-pulse space-y-4"><h3 className="text-xl font-bold text-text-primary">{data.icon} {data.name}</h3><div className="space-y-3">{data.skills.map((_s, i) => <div key={i} className="h-8 bg-dark-surface rounded-xl"/>)}</div></div>)}</div>
    </section>
  )

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-text-primary relative inline-block mb-10">Habilidades</h2>
        <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
      </div>
      <div className="space-y-12">
        {Object.entries(skillCategories).map(([cat, data], ci) => (
          <div key={cat} className="animate-fade-up" style={{ animationDelay: `${ci * 150}ms` }}>
            <h3 className="flex items-center gap-2 text-xl font-bold text-text-primary mb-6">{data.icon} {cat}</h3>
            <div className="space-y-4">
                {data.skills.map((skill, si) => {
                  const level = levelMap[skill] || 80
                  return <SkillBar key={skill} name={skill} level={level} index={si} />
                })}
              </div>
          </div>
        ))}
      </div>
    </section>
  )
}