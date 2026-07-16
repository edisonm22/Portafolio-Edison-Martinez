import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useTilt3D } from '../hooks/useTilt3D.js'
import { SectionWrapper } from './SectionWrapper.jsx'
import SkillBar from './SkillBar.jsx'
import CodeShowcase from './CodeShowcase.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { skillCategories } from '../data/skills.js'

function SkeletonSkillBar() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 bg-surface-950 rounded w-28" />
        <div className="h-4 bg-surface-950 rounded w-10" />
      </div>
      <div className="h-2 bg-surface-950 rounded-full">
        <div className="h-full w-0" />
      </div>
    </div>
  )
}

export default function Skills({ loading = false }) {
  const sectionRef = useScrollReveal()
  const reduced = useReducedMotion()
  const tilt0 = useTilt3D({ maxTilt: 4, scale: 1.01, speed: 400, glare: false })
  const tilt1 = useTilt3D({ maxTilt: 4, scale: 1.01, speed: 400, glare: false })
  const tilt2 = useTilt3D({ maxTilt: 4, scale: 1.01, speed: 400, glare: false })
  const tiltRefs = [tilt0, tilt1, tilt2]

  if (loading) {
    return (
      <SectionWrapper id="skills" sectionNum="01" title="Stack Técnico" eyebrow="STACK TÉCNICO" subtitle="Tecnologías con las que construyo productos digitales">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((cat) => (
            <div key={cat} className="bg-surface-900 border border-surface-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-950" />
                <div>
                  <div className="h-5 bg-surface-950 rounded w-32 mb-1" />
                  <div className="h-4 bg-surface-950 rounded w-20" />
                </div>
              </div>
              {[1, 2, 3, 4].map((bar) => <SkeletonSkillBar key={bar} />)}
            </div>
          ))}
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper
      id="skills"
      sectionNum="01"
      title="Stack Técnico"
      eyebrow="STACK TÉCNICO"
      subtitle="Tecnologías con las que construyo productos digitales"
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 xl:grid-cols-3 gap-8 reveal-3d-up"
      >
        {skillCategories.map((cat, index) => (
          <article
            key={cat.category}
            ref={tiltRefs[index] || null}
            data-reveal-delay={index * 100}
            className="reveal-3d-scale bg-surface-900 border border-surface-800 rounded-2xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-card-hover"
            style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl">{cat.icon}</span>
              </div>
              <div>
                <h3 className="text-h3 text-light">{cat.category}</h3>
                <p className="text-surface-400 text-sm font-mono">
                  {cat.skills.length} tecnologías
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {cat.skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* ── Code showcase ── */}
      <div className="mt-10 lg:mt-14 max-w-3xl mx-auto reveal" data-reveal-delay="400">
        <CodeShowcase reduced={reduced} />
      </div>
    </SectionWrapper>
  )
}
