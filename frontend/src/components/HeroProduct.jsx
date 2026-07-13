import React from 'react'

function HeroProduct() {
  return (
    <header id='home' className='hero-product'>
      <div className='hero-product__bg'>
        <div className='hero-product__glow'></div>
        <div className='hero-product__grid'></div>
      </div>

      <div className='container hero-product__container'>
        <nav className='hero-product__nav' aria-label='Navegación principal'>
          <div className='logo'>
            <svg viewBox='0 0 32 32' fill='none' className='logo__mark'>
              <rect x='4' y='4' width='24' height='24' rx='6' stroke='currentColor' strokeWidth='2' />
              <path d='M10 16h12M10 12h8M10 20h6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
            </svg>
            <span className='logo__text'>Nebula<span>X</span></span>
          </div>
          <ul className='nav__links'>
            <li><a href='#specs'>Especificaciones</a></li>
            <li><a href='#showcase'>Galería</a></li>
            <li><a href='#reviews'>Reseñas</a></li>
            <li><a href='#subscribe'>Actualizaciones</a></li>
          </ul>
          <a href='#purchase' className='btn btn--glow'>Comprar Ahora</a>
        </nav>

        <div className='hero-product__content'>
          <span className='hero-product__badge'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='badge__icon'>
              <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
            </svg>
            Nuevo Lanzamiento
          </span>

          <h1 className='hero-product__title'>
            El futuro del audio<br />
            <span className='hero-product__accent'>en tus manos</span>
          </h1>

          <p className='hero-product__description'>
            NebulaX Pro redefine la cancelación de ruido adaptativa con IA.
            40hrs batería, audio espacial 360°, y diseño sostenible.
          </p>

          <div className='hero-product__cta'>
            <a href='#purchase' className='btn btn--primary btn--glow btn--large'>
              <svg className='btn__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='9' cy='21' r='1' />
                <circle cx='20' cy='21' r='1' />
                <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
              </svg>
              Reservar - $349
            </a>
            <a href='#specs' className='btn btn--ghost btn--large'>
              Ver Especificaciones
              <svg className='btn__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <line x1='5' y1='12' x2='19' y2='12' />
                <polyline points='12 5 19 12 12 19' />
              </svg>
            </a>
          </div>

          <div className='hero-product__highlights'>
            <div className='highlight'>
              <svg className='highlight__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z' />
                <path d='M12 6v6l4 2' />
              </svg>
              <span>40h Batería</span>
            </div>
            <div className='highlight'>
              <svg className='highlight__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <polygon points='12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2' />
                <line x1='12' y1='22' x2='12' y2='15.5' />
                <polyline points='22 8.5 12 15.5 2 8.5' />
              </svg>
              <span>Audio Espacial 360°</span>
            </div>
            <div className='highlight'>
              <svg className='highlight__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='12' cy='12' r='3' />
                <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
              </svg>
              <span>IA Adaptativa</span>
            </div>
            <div className='highlight'>
              <svg className='highlight__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
              </svg>
              <span>Eco-Friendly</span>
            </div>
          </div>
        </div>

        <div className='hero-product__visual' aria-label='NebulaX Pro auriculares'>
          <div className='product-3d'>
            <div className='product-3d__ring'></div>
            <div className='product-3d__ring product-3d__ring--2'></div>
            <div className='product-3d__ring product-3d__ring--3'></div>
            <div className='product-3d__device'>
              <div className='device__headband'></div>
              <div className='device__earcup device__earcup--left'>
                <div className='earcup__light'></div>
              </div>
              <div className='device__earcup device__earcup--right'>
                <div className='earcup__light'></div>
              </div>
            </div>
            <div className='product-3d__shadow'></div>
          </div>
          <div className='hero-product__badges'>
            <div className='badge badge--award'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='12' cy='8' r='7' />
                <polyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88' />
              </svg>
              <span>Best of CES 2024</span>
            </div>
            <div className='badge badge--rating'>
              <div className='rating'>
                <svg viewBox='0 0 24 24' fill='currentColor' className='star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' /></svg>
                <span>4.9</span>
              </div>
              <span>(2,847 reseñas)</span>
            </div>
          </div>
        </div>
      </div>

      <div className='hero-product__scroll' aria-label='Desplazarse hacia abajo'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <polyline points='6 9 12 15 18 9' />
        </svg>
      </div>
    </header>
  )
}

export default HeroProduct