import { useEffect, useState } from 'react'
import { reducedMotionNow } from '../../hooks/useReducedMotion.js'
import { preloadThree } from '../../utils/threePreloader.js'

const STAGES = { ENTERING: 0, VISIBLE: 1, EXITING: 2, DONE: 3 }

/* ── Timing (ms) ── */
const NORMAL = { enter: 600, hold: 300, exit: 400 }
const REDUCED = { enter: 50, hold: 100, exit: 50 }

export default function Loader({ onFinish }) {
  const [stage, setStage] = useState(STAGES.ENTERING)

  useEffect(() => {
    // Si ya se vio en esta sesión, salir inmediatamente
    if (sessionStorage.getItem('loader-seen')) {
      onFinish()
      return
    }

    const reduced = reducedMotionNow()
    const t = reduced ? REDUCED : NORMAL

    const t1 = setTimeout(() => setStage(STAGES.VISIBLE), t.enter)
    const t2 = setTimeout(() => {
      setStage(STAGES.EXITING)
      // Comenzar precarga de Three.js mientras el loader se desvanece
      preloadThree()
    }, t.enter + t.hold)
    const t3 = setTimeout(() => {
      sessionStorage.setItem('loader-seen', 'true')
      setStage(STAGES.DONE)
      onFinish()
    }, t.enter + t.hold + t.exit)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
    }
  }, [onFinish])

  if (stage === STAGES.DONE) return null

  return (
    <div className={`loader-overlay ${stage === STAGES.EXITING ? 'loader-exit' : ''}`}>
      <span className="text-[clamp(2.5rem,6vw,4rem)] font-display font-bold text-light tracking-tight">
        <span className="loader-letter">E</span>
        <span className="loader-letter">M</span>
        <span className="loader-letter">.</span>
      </span>
    </div>
  )
}
