export default function SkillBar({ skill }) {
  const percentage = skill.percentage || Math.floor(40 + Math.random() * 55)

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13px] font-semibold text-surface-400 tracking-wide">
          {skill.name}
        </span>
        <span className="text-[12px] font-mono font-medium text-surface-600 tabular-nums">
          {percentage}%
        </span>
      </div>
      <div className="relative h-2 bg-surface-950 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out-expo"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
