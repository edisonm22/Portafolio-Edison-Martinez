import { useEffect, useRef } from 'react'

/**
 * HeroThreeScene — Escena Three.js premium.
 * Torus Knot wireframe + partículas + mouse tracking.
 *
 * Three.js se importa dinámicamente para mantener el bundle pequeño.
 */
export default function HeroThreeScene({ reduced = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (reduced) return

    const container = containerRef.current
    if (!container) return

    let scene, camera, renderer
    let knot, wireframe, stars, innerParticles
    let knotMat
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let rafId
    let mounted = true

    /* ── Guardamos listeners para cleanup seguro ── */
    const listeners = { mouse: null, leave: null, resize: null }

    async function init() {
      const THREE = await import('three')
      if (!mounted) return   // ← salir si ya desmontó

      scene = new THREE.Scene()

      const width = container.clientWidth
      const height = container.clientHeight

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      camera.position.z = 6

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x0a0f1a, 0)
      container.appendChild(renderer.domElement)

      /* ── Starfield ── */
      const starCount = 600
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
      stars = new THREE.Points(starGeo, starMat)
      scene.add(stars)

      /* ── Torus Knot ── */
      const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 24)
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

      knotMat = new THREE.PointsMaterial({
        size: 0.035, vertexColors: true, transparent: true, opacity: 0.7,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
      })
      knot = new THREE.Points(knotGeo, knotMat)
      knot.position.y = 0.2
      scene.add(knot)

      /* ── Wireframe ── */
      const wireGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 12)
      const edges = new THREE.EdgesGeometry(wireGeo)
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x0ea5e9, transparent: true, opacity: 0.08,
        blending: THREE.AdditiveBlending,
      })
      wireframe = new THREE.LineSegments(edges, wireMat)
      wireframe.position.y = 0.2
      scene.add(wireframe)

      /* ── Inner particles ── */
      const innerCount = 120
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
      innerParticles = new THREE.Points(innerGeo, innerMat)
      scene.add(innerParticles)

      /* ── Mouse tracking ── */
      listeners.mouse = (e) => {
        const rect = container.getBoundingClientRect()
        mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1
      }
      listeners.leave = () => { mouse.targetX = 0; mouse.targetY = 0 }
      container.addEventListener('mousemove', listeners.mouse)
      container.addEventListener('mouseleave', listeners.leave)

      /* ── Resize ── */
      listeners.resize = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', listeners.resize)

      /* ── Animation ── */
      const clock = new THREE.Clock()
      function animate() {
        if (!mounted) return
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
        rafId = requestAnimationFrame(animate)
      }
      animate()
    }

    init()

    return () => {
      mounted = false
      if (rafId) cancelAnimationFrame(rafId)
      if (listeners.mouse) container.removeEventListener('mousemove', listeners.mouse)
      if (listeners.leave) container.removeEventListener('mouseleave', listeners.leave)
      if (listeners.resize) window.removeEventListener('resize', listeners.resize)
      if (renderer) {
        renderer.dispose()
        if (scene) scene.clear()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    }
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
