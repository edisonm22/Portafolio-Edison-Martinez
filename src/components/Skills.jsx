import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { skillCategories, levelMap } from '../data/skills.js'
import SkillBar from './SkillBar.jsx'
import { SectionWrapper } from './SectionWrapper.jsx'

function SkeletonSkills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((ci) => (
        <div key={ci} className="animate-pulse space-y-6 p-6 rounded-2xl bg-[#111827] border border-[#1e293b]">
          <div className="h-6 bg-[#0a0f1a] rounded-lg w-1/2" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((si) => (
              <div key={si} className="space-y-2">
                <div className="h-4 bg-[#0a0f1a] rounded w-1/3" />
                <div className="h-2 bg-[#0a0f1a] rounded-full w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Skills({ loading = false }) {
  const sectionRef = useScrollReveal()

  if (loading) {
    return (
      <SectionWrapper id="skills" title="Habilidades" subtitle="Tecnologías y herramientas con las que trabajo">
        <SkeletonSkills />
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper
      id="skills"
      title="Habilidades"
      subtitle="Tecnologías y herramientas con las que trabajo"
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {skillCategories.map((cat, ci) => (
          <div
            key={ci}
            className="reveal bg-[#111827] border border-[#1e293b] rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-[#0ea5e9]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
            data-reveal-delay={ci * 120}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-lg">
                {cat.icon}
              </span>
              <h3 className="text-h4 text-[#f1f5f9]">{cat.name}</h3>
            </div>
            <div className="space-y-5">
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill}
                  name={skill}
                  level={levelMap[skill] || 80}
                  index={si}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
