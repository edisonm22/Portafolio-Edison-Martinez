import { useEffect, useRef } from 'react'

export default function SkillBar({ name, level, index }) {
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.width = level + '%'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [level])

  return (
    <div style={{ animationDelay: index * 80 + 'ms' }}>
      <div className="flex justify-between mb-1.5">
        <span className="text-[#f1f5f9] font-medium">{name}</span>
        <span className="text-[#0ea5e9] font-bold text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-[#111827] rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-[#0ea5e9] to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}
