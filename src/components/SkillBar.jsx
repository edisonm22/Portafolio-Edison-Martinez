import { useEffect, useRef, useState } from 'react'

export default function SkillBar({ skill }) {
  const percentage = skill.percentage || Math.floor(40 + Math.random() * 55)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger basado en el índice dentro del padre
          const siblings = Array.from(el.parentElement?.children || [])
          const idx = siblings.indexOf(el)
          setTimeout(() => setVisible(true), idx * 60)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13px] font-semibold text-surface-400 tracking-wide">
          {skill.name}
        </span>
        <span className={`text-[12px] font-mono font-medium tabular-nums transition-all duration-700 ${visible ? 'text-primary' : 'text-surface-400'}`}>
          {visible ? percentage : 0}%
        </span>
      </div>
      <div className="relative h-2 bg-surface-950 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-[1200ms] ease-out-expo"
          style={{ width: visible ? `${percentage}%` : '0%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
