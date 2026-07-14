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
            // Animar con un pequeño delay por índice
            setTimeout(() => {
              el.style.width = level + '%'
            }, index * 60)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [level, index])

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#94a3b8] font-medium">{name}</span>
        <span className="text-xs text-[#475569] font-semibold tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#0a0f1a] rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out-expo"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
          }}
        />
      </div>
    </div>
  )
}
