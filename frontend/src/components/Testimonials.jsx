import React, { useState, useCallback, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    quote: 'La calidad de sonido es simplemente de otro nivel. Los graves son profundos pero controlados, los medios cristalinos y los agudos nunca fatigan. Es como tener un estudio en la cabeza.',
    author: 'David Chen',
    role: 'Productor Musical / Ingeniero de Mezcla',
    company: 'Sony Music',
    avatar: 'DC',
    initials: true,
    rating: 5,
    verified: true,
    highlight: 'Mejor ANC probado',
    usage: '8h/día en estudio',
    headphones: 'NebulaX Pro - Obsidian'
  },
  {
    id: 2,
    quote: 'Viajo 150k km al año. Estos son los únicos que aguardan vuelos transatlánticos con ANC activado y aún tienen batería para la conexión. El multipoint es un salvavidas.',
    author: 'Sarah Mitchell',
    role: 'VP Ingeniería',
    company: 'Stripe',
    avatar: 'SM',
    initials: true,
    rating: 5,
    verified: true,
    highlight: '40h reales con ANC',
    usage: 'Vuelos semanales',
    headphones: 'NebulaX Pro - Arctic'
  },
  {
    id: 3,
    quote: 'El modo transparencia es tan natural que olvido que los llevo puestos. La detección de voz para pausar automáticamente funciona perfecto en llamadas. Diseño pensado por usuarios, no por marketers.',
    author: 'Marcus Johnson',
    role: 'Desarrollador Senior',
    company: 'Vercel',
    avatar: 'MJ',
    initials: true,
    rating: 5,
    verified: true,
    highlight: 'Transparencia natural',
    usage: 'Remoto full-time',
    headphones: 'NebulaX Pro - Nebula'
  },
  {
    id: 4,
    quote: 'Como gamer competitivo, la latencia <30ms y el audio espacial con head-tracking me dan ventaja real. El micrófono retráctil suena mejor que mi Blue Yeti standalone.',
    author: 'Alex "Phantom" Rivera',
    role: 'Pro Player / Streamer',
    company: 'Team Liquid',
    avatar: 'AR',
    initials: true,
    rating: 5,
    verified: true,
    highlight: 'Latencia gaming <30ms',
    usage: '12h streaming/día',
    headphones: 'NebulaX Pro - Obsidian'
  },
  {
    id: 5,
    quote: 'Compré el Arctic para mi esposa (diseñadora UX) y terminamos pidiendo el segundo. El EQ adaptativo aprende tus preferencias. El cuero vegano no irrita piel sensible. Detalles que importan.',
    author: 'Elena Rodríguez',
    role: 'Diseñadora UX Principal',
    company: 'Figma',
    avatar: 'ER',
    initials: true,
    rating: 5,
    verified: true,
    highlight: 'EQ IA adaptativo',
    usage: 'Diseño + reuniones',
    headphones: 'NebulaX Pro - Arctic'
  },
  {
    id: 6,
    quote: 'La app companion es de las mejores que he visto. Actualizaciones OTA frecuentes agregan features reales, no solo fixes. El "Modo Enfoque" con ruido blanco generativo cambió mi productividad.',
    author: 'James Park',
    role: 'Fundador / CEO',
    company: 'Linear',
    avatar: 'JP',
    initials: true,
    rating: 5,
    verified: true,
    highlight: 'App + OTA exemplary',
    usage: 'Deep work sessions',
    headphones: 'NebulaX Pro - Nebula'
  }
]

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
  const maxIndex = testimonials.length - itemsPerView

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }, [maxIndex])

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.touches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
      setTouchStart(null)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
      const newMaxIndex = testimonials.length - newItemsPerView
      setCurrentIndex(prev => Math.min(prev, newMaxIndex))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section id='testimonials' className='testimonials'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className='container'>
        <div className='section-header'>
          <span className='section-tag'>Testimonios</span>
          <h2 className='section-title'>Confían en<br />NebulaX Pro</h2>
          <p className='section-description'>
            Profesionales de élite comparten su experiencia real.
          </p>
        </div>

        <div className='testimonials__wrapper'>
          <button
            className='testimonials__nav testimonials__nav--prev'
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label='Testimonial anterior'
          >
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <polyline points='15 18 9 12 15 6' />
            </svg>
          </button>

          <div className='testimonials__track' style={{ transform: `translateX(-${(currentIndex / Math.max(1, maxIndex)) * 100}%)` }}>
            <div className='testimonials__grid'>
              {testimonials.map((testimonial, i) => (
                <article key={testimonial.id} className='testimonial-card' style={{ width: `${100 / itemsPerView}%` }}>
                  <div className='testimonial-card__header'>
                    <div className='testimonial-card__rating'>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox='0 0 24 24' fill={i < testimonial.rating ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='2' className='star'>
                          <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                        </svg>
                      ))}
                    </div>
                    {testimonial.highlight && (
                      <span className='testimonial-card__badge'>{testimonial.highlight}</span>
                    )}
                  </div>

                  <blockquote className='testimonial-card__quote'>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className='testimonial-card__meta'>
                    <div className='testimonial-card__avatar'>{testimonial.avatar}</div>
                    <div className='testimonial-card__info'>
                      <cite className='testimonial-card__author'>
                        {testimonial.author}
                        {testimonial.verified && (
                          <svg className='verified' viewBox='0 0 24 24' fill='currentColor' width='16' height='16'>
                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                          </svg>
                        )}
                      </cite>
                      <p className='testimonial-card__role'>{testimonial.role} @ {testimonial.company}</p>
                    </div>
                  </div>

                  <div className='testimonial-card__details'>
                    <div className='detail'>
                      <span className='detail__label'>Uso</span>
                      <span className='detail__value'>{testimonial.usage}</span>
                    </div>
                    <div className='detail'>
                      <span className='detail__label'>Modelo</span>
                      <span className='detail__value'>{testimonial.headphones}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            className='testimonials__nav testimonials__nav--next'
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label='Siguiente testimonial'
          >
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </button>
        </div>

        <div className='testimonials__dots' role='tablist' aria-label='Navegación testimonios'>
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              role='tab'
              aria-selected={i === currentIndex}
              aria-label={`Ir al grupo ${i + 1} de testimonios`}
            />
          ))}
        </div>

        <div className='testimonials__stats'>
          <div className='stat'>
            <span className='stat__value'>4.9</span>
            <span className='stat__label'>Promedio en 2,847+ reseñas</span>
          </div>
          <div className='stat'>
            <span className='stat__value'>97%</span>
            <span className='stat__label'>Recomendarían a un colega</span>
          </div>
          <div className='stat'>
            <span className='stat__value'>40h+</span>
            <span className='stat__label'>Batería real verificada</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials