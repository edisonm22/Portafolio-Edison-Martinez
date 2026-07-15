import { useEffect, useRef } from 'react'

/**
 * HeroThreeScene — Único sistema 3D del Hero.
 *
 * Torus Knot wireframe + starfield + partículas internas.
 * — WebGL detection antes de importar Three.js
 * — Dimension container > 0 con retry (max 5 frames)
 * — Todo envuelto en try/catch, fallo silencioso
 * — Dynamic import de Three.js (no bloquea bundle inicial)
 * — 400 estrellas en vez de 600, geometría reducida (140, 16)
 */
export default function HeroThreeScene({ reduced = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (reduced) return

    const container = containerRef.current
    if (!container) return

    let mounted = true
    let rafId = null
    let cleanup = () => {}

    async function init() {
      try {
        /* ── 1. Detectar WebGL antes de hacer nada ── */
        const testCanvas = document.createElement('canvas')
        const webglSupported = !!(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
        if (!webglSupported) {
          /* eslint-disable-next-line no-console */
          if (import.meta.env.DEV) console.warn('[Hero3D] WebGL no disponible, omitiendo escena 3D')
          return
        }

        /* ── 2. Esperar dimensiones del contenedor (max 5 frames) ── */
        let retries = 0
        const MAX_RETRIES = 5

        function getDimensions() {
          return { w: container.clientWidth, h: container.clientHeight }
        }

        let { w, h } = getDimensions()
        while ((w <= 0 || h <= 0) && retries < MAX_RETRIES && mounted) {
          await new Promise((resolve) => { rafId = requestAnimationFrame(resolve) })
          const dims = getDimensions()
          w = dims.w
          h = dims.h
          retries++
        }

        if (w <= 0 || h <= 0) {
          /* eslint-disable-next-line no-console */
          if (import.meta.env.DEV) console.warn('[Hero3D] Contenedor sin dimensiones después de reintentos, abortando')
          return
        }

        /* ── 3. Cargar Three.js dinámicamente ── */
        const THREE = await import('three')
        if (!mounted) return

        /* ── 4. Setup Scene ── */
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
        camera.position.z = 6

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x0a0f1a, 0)
        container.appendChild(renderer.domElement)

        /* ── 5. Starfield (400 estrellas) ── */
        const starCount = 400
        const starGeo = new THREE.BufferGeometry()
        const starPos = new Float32Array(starCount * 3)
        for (let i = 0; i < starCount * 3; i += 3) {
          const r = 15 + Math.random() * 20
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          starPos[i]     = r * Math.sin(phi) * Math.cos(theta)
          starPos[i + 1] = r * Math.sin(phi) * Math.sin(theta)
          starPos[i + 2] = r * Math.cos(phi)
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))

        const starMat = new THREE.PointsMaterial({
          color: 0x0ea5e9, size: 0.04, transparent: true, opacity: 0.4,
          blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
        })
        const stars = new THREE.Points(starGeo, starMat)
        scene.add(stars)

        /* ── 6. Torus Knot (geometría reducida: 140 segmentos en vez de 180) ── */
        const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 140, 16)
        const knotPos = knotGeo.attributes.position
        const colors = new Float32Array(knotPos.count * 3)
        for (let i = 0; i < knotPos.count; i++) {
          const y = knotPos.getY(i)
          const t = (y + 1.5) / 3
          colors[i * 3]     = 0.05 + t * 0.55
          colors[i * 3 + 1] = 0.65 - t * 0.40
          colors[i * 3 + 2] = 0.91 - t * 0.20
        }
        knotGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const knotMat = new THREE.PointsMaterial({
          size: 0.035, vertexColors: true, transparent: true, opacity: 0.7,
          blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
        })
        const knot = new THREE.Points(knotGeo, knotMat)
        knot.position.y = 0.2
        scene.add(knot)

        /* ── 7. Wireframe overlay ── */
        const wireGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 90, 10)
        const edges = new THREE.EdgesGeometry(wireGeo)
        const wireMat = new THREE.LineBasicMaterial({
          color: 0x0ea5e9, transparent: true, opacity: 0.08,
          blending: THREE.AdditiveBlending,
        })
        const wireframe = new THREE.LineSegments(edges, wireMat)
        wireframe.position.y = 0.2
        scene.add(wireframe)

        /* ── 8. Inner glow particles (80 en vez de 120) ── */
        const innerCount = 80
        const innerGeo = new THREE.BufferGeometry()
        const innerPos = new Float32Array(innerCount * 3)
        for (let i = 0; i < innerCount * 3; i += 3) {
          const r = 1.6 + Math.random() * 2.5
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          innerPos[i]     = r * Math.sin(phi) * Math.cos(theta)
          innerPos[i + 1] = r * Math.sin(phi) * Math.sin(theta)
          innerPos[i + 2] = r * Math.cos(phi)
        }
        innerGeo.setAttribute('position', new THREE.BufferAttribute(innerPos, 3))

        const innerMat = new THREE.PointsMaterial({
          color: 0xa855f7, size: 0.015, transparent: true, opacity: 0.25,
          blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
        })
        const innerParticles = new THREE.Points(innerGeo, innerMat)
        scene.add(innerParticles)

        /* ── 9. Mouse tracking ── */
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

        const onMouse = (e) => {
          try {
            const rect = container.getBoundingClientRect()
            mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
            mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1
          } catch { /* ignore */ }
        }
        const onLeave = () => { mouse.targetX = 0; mouse.targetY = 0 }
        container.addEventListener('mousemove', onMouse)
        container.addEventListener('mouseleave', onLeave)

        /* ── 10. Resize ── */
        const onResize = () => {
          try {
            const cw = container.clientWidth
            const ch = container.clientHeight
            if (cw > 0 && ch > 0) {
              camera.aspect = cw / ch
              camera.updateProjectionMatrix()
              renderer.setSize(cw, ch)
            }
          } catch { /* ignore */ }
        }
        window.addEventListener('resize', onResize)

        /* ── 11. Animation loop ── */
        const clock = new THREE.Clock()
        function animate() {
          if (!mounted) return
          try {
            const elapsed = clock.getElapsedTime()
            mouse.x += (mouse.targetX - mouse.x) * 0.05
            mouse.y += (mouse.targetY - mouse.y) * 0.05
            const autoRotY = elapsed * 0.08
            const autoRotX = elapsed * 0.03
            knot.rotation.x = autoRotX + mouse.y * 0.4
            knot.rotation.y = autoRotY + mouse.x * 0.6
            wireframe.rotation.x = knot.rotation.x
            wireframe.rotation.y = knot.rotation.y
            stars.rotation.y = elapsed * 0.008
            stars.rotation.x = elapsed * 0.004
            innerParticles.rotation.x = elapsed * 0.02 + mouse.y * 0.1
            innerParticles.rotation.y = elapsed * 0.04 + mouse.x * 0.15
            knotMat.opacity = 0.6 + Math.sin(elapsed * 0.5) * 0.15
            renderer.render(scene, camera)
          } catch { /* fallo silencioso en frame */ }
          rafId = requestAnimationFrame(animate)
        }
        animate()

        /* ── Guardar cleanup ── */
        cleanup = () => {
          mounted = false
          if (rafId) cancelAnimationFrame(rafId)
          try {
            container.removeEventListener('mousemove', onMouse)
            container.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('resize', onResize)
            renderer.dispose()
            scene.clear()
            if (container.contains(renderer.domElement)) {
              container.removeChild(renderer.domElement)
            }
          } catch { /* ignore en cleanup */ }
        }

      } catch (err) {
        // Error completo: abortar silenciosamente, no romper la página
        /* eslint-disable-next-line no-console */
        if (import.meta.env.DEV) console.warn('[Hero3D] Error inicializando escena:', err)
        cleanup = () => { mounted = false }
      }
    }

    init()

    return () => cleanup()
  }, [reduced])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto"
      style={{
        zIndex: 0,
        opacity: 0.75,
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  )
}
