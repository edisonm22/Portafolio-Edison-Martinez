import { useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════════
   Hero3D — Escena interactiva de fondo
   ─ Canvas particle network (conexiones)
   ─ Formas geométricas CSS 3D flotantes
   ─ Mouse parallax multi-capa
   ═══════════════════════════════════════════
   Single lightweight effect for Hero.
   Falls back silently if Canvas APIs fail. */

const COLORS = {
  primary: '14, 165, 233',   // #0ea5e9
  accent:  '168, 85, 247',   // #a855f7
  cyan:    '6, 182, 212',    // #06b6d4
}

export default function Hero3D({ reduced = false }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  /* ────────────────────────────────────────────
     CANVAS: Particle Network (con try/catch)
     ──────────────────────────────────────────── */
  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    /* ── early exit si algo falla ── */
    let mounted = true
    let ctx = null
    let dpr = 1
    let w = 0, h = 0

    try {
      ctx = canvas.getContext('2d')
      if (!ctx) return // navegador sin soporte canvas 2D
    } catch {
      return // fallo silencioso
    }

    const P_COUNT = 60
    const CONN_DIST = 150
    const MOUSE_RADIUS = 180
    const PARTICLE_SPEED = 0.3

    function initParticles(width, height) {
      if (width <= 0 || height <= 0) return []
      return Array.from({ length: P_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 3 + 0.5,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        vz: (Math.random() - 0.5) * 0.06,
        r: Math.random() * 1.6 + 0.6,
        color: Math.random() > 0.5 ? COLORS.primary : COLORS.accent,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    /* ── Resize (seguro) ── */
    function resize() {
      if (!mounted) return
      try {
        const parent = canvas.parentElement
        if (!parent) return

        const rect = parent.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) return // invisible aún

        w = rect.width
        h = rect.height
        dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        if (!particlesRef.current.length) {
          particlesRef.current = initParticles(w, h)
        }
      } catch {
        // ignorar errores en resize
      }
    }
    resize()

    const mouse = mouseRef.current

    /* ── Draw ── */
    function draw(time) {
      if (!mounted) return
      try {
        ctx.clearRect(0, 0, w, h)

        mouse.x += (mouse.targetX - mouse.x) * 0.08
        mouse.y += (mouse.targetY - mouse.y) * 0.08

        const particles = particlesRef.current
        if (!particles.length) {
          rafRef.current = requestAnimationFrame(draw)
          return
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          p.x += p.vx + Math.sin(time * 0.0005 + p.phase) * 0.12
          p.y += p.vy + Math.cos(time * 0.0006 + p.phase) * 0.12
          p.z += p.vz + Math.sin(time * 0.0003 + p.phase * 1.5) * 0.04

          if (p.z < 0.3) p.z = 0.3
          if (p.z > 4) p.z = 4
          if (p.x < -20) p.x = w + 20
          if (p.x > w + 20) p.x = -20
          if (p.y < -20) p.y = h + 20
          if (p.y > h + 20) p.y = -20

          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.4
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
            p.z += (3 - p.z) * force * 0.02
          }
        }

        const sorted = [...particles].sort((a, b) => a.z - b.z)

        for (let i = 0; i < sorted.length; i++) {
          const a = sorted[i]
          const depthFactor = (a.z - 0.3) / 3.7
          const sizeMul = 1 + (1 - depthFactor) * 0.8
          const glowMul = (1 - depthFactor) * 0.6

          for (let j = i + 1; j < sorted.length; j++) {
            const b = sorted[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = dx * dx + dy * dy

            if (dist < CONN_DIST * CONN_DIST) {
              const alpha = (1 - Math.sqrt(dist) / CONN_DIST) * 0.25 * (1 - depthFactor * 0.5)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(${COLORS.primary}, ${alpha})`
              ctx.lineWidth = 0.4 + (1 - depthFactor) * 0.5
              ctx.stroke()
            }
          }

          const drawR = a.r * sizeMul
          ctx.beginPath()
          ctx.arc(a.x, a.y, drawR, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${a.color}, ${0.5})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(a.x, a.y, drawR * (2 + glowMul * 3), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${a.color}, ${0.04 + glowMul * 0.1})`
          ctx.fill()
        }

        rafRef.current = requestAnimationFrame(draw)
      } catch {
        // fallo silencioso en frame, no detener RAF
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    /* ── Mouse ── */
    const onMouse = (e) => {
      if (!mounted) return
      try {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.targetX = e.clientX - rect.left
        mouseRef.current.targetY = e.clientY - rect.top
      } catch { /* ignore */ }
    }

    const onLeave = () => {
      mouseRef.current.targetX = -1000
      mouseRef.current.targetY = -1000
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      mounted = false
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  /* ────────────────────────────────────────────
     MOUSE PARALLAX (CSS 3D shapes layers)
     ──────────────────────────────────────────── */
  const updateParallax = useCallback(() => {
    const scene = sceneRef.current
    if (!scene || reduced) return

    const layers = scene.querySelectorAll('.parallax-layer-3d')
    if (!layers.length) return

    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    let raf

    const tick = () => {
      const mx = mouseRef.current.targetX
      const my = mouseRef.current.targetY
      const nx = (mx - cx) / cx
      const ny = (my - cy) / cy

      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed) || 0.02
        const x = nx * 40 * speed
        const y = ny * 40 * speed
        const z = speed > 0.5 ? 'translateZ(30px)' : ''
        layer.style.transform = `translate3d(${x}px, ${y}px, 0) ${z}`
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    const cleanup = updateParallax()
    return () => cleanup?.()
  }, [updateParallax])

  return (
    <div ref={sceneRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Canvas particle network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Geometric CSS 3D Shapes */}
      <div className="absolute inset-0" style={{ perspective: '1000px', zIndex: 1 }}>
        {/* Large rotating hexagon */}
        <div
          className="parallax-layer-3d geo-hex absolute top-[12%] right-[6%] w-64 h-64 opacity-[0.07]"
          data-speed="0.3"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="w-full h-full animate-hex-3d"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(168,85,247,0.15))',
              border: '1px solid rgba(14,165,233,0.15)',
              transformStyle: 'preserve-3d',
            }}
          />
        </div>

        {/* Secondary diamond shape */}
        <div
          className="parallax-layer-3d geo-diamond absolute bottom-[28%] left-[3%] w-40 h-40 opacity-[0.05]"
          data-speed="0.5"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="w-full h-full animate-diamond-3d"
            style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              background: 'linear-gradient(180deg, rgba(6,182,212,0.25), rgba(14,165,233,0.1))',
              border: '1px solid rgba(6,182,212,0.12)',
              transformStyle: 'preserve-3d',
            }}
          />
        </div>

        {/* Small orbiting triangle */}
        <div
          className="parallax-layer-3d absolute top-[45%] left-[55%] w-20 h-20 opacity-[0.06]"
          data-speed="0.7"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="w-full h-full animate-triangle-3d"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(14,165,233,0.1))',
              border: '1px solid rgba(168,85,247,0.15)',
              transformStyle: 'preserve-3d',
            }}
          />
        </div>

        {/* Thin ring glow */}
        <div
          className="parallax-layer-3d absolute top-[18%] left-[60%] w-72 h-72 opacity-[0.04]"
          data-speed="0.2"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="w-full h-full rounded-full border border-primary/20 animate-ring-glow-3d"
            style={{
              boxShadow: '0 0 80px rgba(14,165,233,0.08), inset 0 0 80px rgba(168,85,247,0.04)',
              transformStyle: 'preserve-3d',
            }}
          />
        </div>

        {/* Vertical line grid */}
        <div
          className="parallax-layer-3d absolute inset-0 opacity-[0.015]"
          data-speed="0.1"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(14,165,233,0.5) 0px, transparent 1px, transparent 80px)',
            backgroundSize: '80px 100%',
          }}
        />
      </div>
    </div>
  )
}
