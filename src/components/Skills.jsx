import { skillCategories, levelMap } from '../data/skills.js'
import SkillBar from './SkillBar.jsx'
import { SectionWrapper } from './Projects.jsx'

function SkeletonSkills() {
  return (
    <div className="space-y-12">
      {skillCategories.map((cat, ci) => (
        <div key={ci} className="animate-pulse space-y-4">
          <h3 className="text-xl font-bold text-[#f1f5f9]">
            {cat.icon} {cat.name}
          </h3>
          <div className="space-y-3">
            {cat.skills.map((_, i) => (
              <div key={i} className="h-8 bg-[#111827] rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Skills({ loading = false }) {
  if (loading) {
    return (
      <SectionWrapper id="skills" title="Habilidades">
        <SkeletonSkills />
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="skills" title="Habilidades">
      <div className="space-y-12">
        {skillCategories.map((cat, ci) => (
          <div
            key={ci}
            className="animate-fade-up"
            style={{ animationDelay: ci * 0.15 + 's' }}
          >
            <h3 className="flex items-center gap-2 text-xl font-bold text-[#f1f5f9] mb-6">
              {cat.icon} {cat.name}
            </h3>
            <div className="space-y-4">
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
