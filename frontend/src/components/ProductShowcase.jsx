import React, { useState, useCallback, useEffect } from 'react'

const showcaseImages = [
  {
    id: 1,
    src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="%230a0a0f" width="800" height="600"/><ellipse cx="400" cy="280" rx="180" ry="120" fill="%231a1a2e"/><ellipse cx="400" cy="280" rx="160" ry="100" fill="%230f0f1a"/><ellipse cx="320" cy="260" rx="50" ry="35" fill="%232a2a4a"/><ellipse cx="480" cy="260" rx="50" ry="35" fill="%232a2a4a"/><rect x="270" y="380" width="260" height="8" rx="4" fill="%233a3a5a"/><circle cx="400" cy="260" r="8" fill="%2300d4ff" opacity="0.8"/></svg>',
    alt: 'NebulaX Pro - Vista frontal',
    caption: 'Diseño simétrico. Diadema fibra de carbono.',
  },
  {
    id: 2,
    src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="%230a0a0f" width="800" height="600"/><ellipse cx="400" cy="300" rx="200" ry="80" fill="%231a1a2e"/><ellipse cx="400" cy="300" rx="180" ry="60" fill="%230f0f1a"/><ellipse cx="250" cy="280" rx="70" ry="45" fill="%232a2a4a"/><ellipse cx="550" cy="280" rx="70" ry="45" fill="%232a2a4a"/><rect x="200" y="350" width="400" height="6" rx="3" fill="%233a3a5a"/><circle cx="250" cy="280" r="12" fill="%2300d4ff" opacity="0.6"/></svg>',
    alt: 'NebulaX Pro - Vista lateral',
    caption: 'Perfil ultra-delgado. 248g totales.',
  },
  {
    id: 3,
    src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="%230a0a0f" width="800" height="600"/><ellipse cx="400" cy="300" rx="150" ry="140" fill="%231a1a2e"/><ellipse cx="400" cy="300" rx="130" ry="120" fill="%230f0f1a"/><circle cx="400" cy="300" r="60" fill="%232a2a4a"/><circle cx="400" cy="300" r="40" fill="%231a1a2e"/><circle cx="400" cy="300" r="8" fill="%2300d4ff"/><circle cx="400" cy="300" r="60" fill="none" stroke="%2300d4ff" strokeWidth="1" opacity="0.3"/></svg>',
    alt: 'NebulaX Pro - Detalle driver 40mm grafeno',
    caption: 'Driver 40mm grafeno. Respuesta 10Hz-40kHz.',
  },
  {
    id: 4,
    src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="%230a0a0f" width="800" height="600"/><rect x="200" y="150" width="400" height="300" rx="20" fill="%231a1a2e"/><rect x="220" y="170" width="360" height="260" rx="12" fill="%230f0f1a"/><rect x="240" y="190" width="320" height="80" rx="8" fill="%232a2a4a"/><text x="400" y="240" text-anchor="middle" fill="%2300d4ff" font-size="14" font-family="monospace">NebulaX App v2.4</text><rect x="260" y="300" width="280" height="60" rx="8" fill="%232a2a4a"/><text x="400" y="338" text-anchor="middle" fill="%23fff" font-size="12">EQ Adaptativo IA - Activo</text><rect x="260" y="380" width="130" height="44" rx="8" fill="%2300d4ff"/><text x="325" y="408" text-anchor="middle" fill="%23000" font-size="11" font-weight="bold">ANC: Auto-AI</text><rect x="410" y="380" width="130" height="44" rx="8" fill="%232a2a4a"/><text x="475" y="408" text-anchor="middle" fill="%23fff" font-size="11" font-weight="bold">Transparencia</text></svg>',
    alt: 'NebulaX App - Interfaz control',
    caption: 'App nativa. EQ IA. Actualizaciones OTA.',
  },
  {
    id: 5,
    src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="%230a0a0f" width="800" height="600"/><g fill="none" stroke="%2300d4ff" stroke-width="1.5" opacity="0.6"><path d="M100 300 Q200 200 300 250 T500 300 T700 250" stroke-dasharray="8 4"/><path d="M100 350 Q200 450 300 400 T500 350 T700 400" stroke-dasharray="8 4"/></g><ellipse cx="400" cy="300" rx="180" ry="50" fill="%231a1a2e"/><ellipse cx="400" cy="300" rx="160" ry="35" fill="%230f0f1a"/><ellipse cx="320" cy="290" rx="50" ry="30" fill="%232a2a4a"/><ellipse cx="480" cy="290" rx="50" ry="30" fill="%232a2a4a"/><text x="400" y="380" text-anchor="middle" fill="%2300d4ff" font-size="12">Cancelación Híbrida: -45dB</text></svg>',
    alt: 'NebulaX Pro - Tecnología ANC',
    caption: '8 micrófonos. ANC adaptativo tiempo real.',
  },
  {
    id: 6,
    src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect fill="%230a0a0f" width="800" height="600"/><rect x="150" y="200" width="500" height="200" rx="16" fill="%231a1a2e"/><rect x="170" y="220" width="460" height="160" rx="12" fill="%230f0f1a"/><rect x="190" y="240" width="140" height="120" rx="8" fill="%232a2a4a"/><circle cx="260" cy="300" r="24" fill="%2300d4ff" opacity="0.2"/><circle cx="260" cy="300" r="16" fill="%2300d4ff"/><text x="450" y="280" fill="%23fff" font-size="18" font-weight="bold">Estuche Carga</text><text x="450" y="310" fill="%23888" font-size="13">USB-C PD 3.0 / Wireless Qi2</text><text x="450" y="335" fill="%2300d4ff" font-size="12">+4 cargas completas = 200h totales</text></svg>',
    alt: 'NebulaX Pro - Estuche carga',
    caption: 'Estuche premium. Carga inalámbrica Qi2.',
  },
]

function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % showcaseImages.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length)
  }, [])

  const goTo = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.touches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
      setTouchStart(null)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') setIsExpanded(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prev, next])

  const currentImage = showcaseImages[currentIndex]

  return (
    <section id='showcase' className='product-showcase'>
      <div className='container'>
        <div className='section-header'>
          <span className='section-tag'>Galería</span>
          <h2 className='section-title'>Cada ángulo<br />cuenta una historia</h2>
          <p className='section-description'>
            Ingeniería visible. Materiales premium. Detalles que marcan la diferencia.
          </p>
        </div>

        <div
          className='showcase__viewer'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onClick={() => setIsExpanded(true)}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsExpanded(true)}
          aria-label='Abrir galería en pantalla completa'
        >
          <div className='showcase__image-wrapper'>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className='showcase__image'
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
            />
          </div>

          <button
            className='showcase__nav showcase__nav--prev'
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label='Imagen anterior'
          >
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <polyline points='15 18 9 12 15 6' />
            </svg>
          </button>

          <button
            className='showcase__nav showcase__nav--next'
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label='Siguiente imagen'
          >
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </button>

          <div className='showcase__caption'>
            <span className='showcase__counter'>{currentIndex + 1} / {showcaseImages.length}</span>
            <p>{currentImage.caption}</p>
            <span className='showcase__expand-hint'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M15 3h6v6' />
                <path d='M9 21H3v-6' />
                <line x1='21' y1='3' x2='3' y2='21' />
              </svg>
              Ver grande
            </span>
          </div>

          <div className='showcase__thumbs' role='tablist' aria-label='Miniaturas'>
            {showcaseImages.map((img, i) => (
              <button
                key={img.id}
                className={`showcase__thumb ${i === currentIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
                role='tab'
                aria-selected={i === currentIndex}
                aria-label={`Ver imagen ${i + 1}: ${img.caption}`}
              >
                <img src={img.src} alt='' loading='lazy' />
              </button>
            ))}
          </div>
        </div>

        <div className='showcase__features'>
          {[
            { icon: <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><rect x='2' y='3' width='20' height='14' rx='2' /><path d='M8 21h8' /><path d='M12 17v4' /></svg>, title: 'Pantalla completa', desc: 'Galería inmersiva con zoom y navegación por teclado' },
            { icon: <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><polyline points='23 4 23 10 17 10' /><path d='M20.49 15a9 9 0 1 1-2.12-9.36L23 10' /></svg>, title: '360° interactivo', desc: 'Próximamente: vista rotativa WebGL del producto' },
            { icon: <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><rect x='2' y='3' width='20' height='14' rx='2' /><path d='M8 21h8' /><path d='M12 17v4' /></svg>, title: 'Modo AR', desc: 'Visualiza NebulaX Pro en tu espacio (iOS/Android)' },
          ].map((feature, i) => (
            <div key={i} className='showcase__feature'>
              <div className='showcase__feature-icon'>{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {isExpanded && (
        <div className='showcase__modal' onClick={() => setIsExpanded(false)} role='dialog' aria-modal='true' aria-label='Galería ampliada'>
          <button className='showcase__modal-close' onClick={(e) => { e.stopPropagation(); setIsExpanded(false) }} aria-label='Cerrar galería'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>

          <button className='showcase__modal-nav showcase__modal-nav--prev' onClick={(e) => { e.stopPropagation(); prev() }} aria-label='Anterior'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><polyline points='15 18 9 12 15 6' /></svg>
          </button>

          <div className='showcase__modal-content'>
            <img src={currentImage.src} alt={currentImage.alt} className='showcase__modal-image' />
            <p className='showcase__modal-caption'>{currentImage.caption}</p>
          </div>

          <button className='showcase__modal-nav showcase__modal-nav--next' onClick={(e) => { e.stopPropagation(); next() }} aria-label='Siguiente'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><polyline points='9 18 15 12 9 6' /></svg>
          </button>

          <div className='showcase__modal-thumbs'>
            {showcaseImages.map((img, i) => (
              <button
                key={img.id}
                className={`showcase__modal-thumb ${i === currentIndex ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); goTo(i) }}
              >
                <img src={img.src} alt='' />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductShowcase