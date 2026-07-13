import React from 'react'

function HeroApp() {
  return (
    <header id='home' className='hero-app'>
      <div className='hero-app__container'>
        <div className='hero-app__content'>
          <span className='hero-app__badge'>Nueva Versión 2.0</span>
          <h1 className='hero-app__title'>
            Tu App Favorita,<br />
            <span className='hero-app__accent'>Totalmente Reinventada</span>
          </h1>
          <p className='hero-app__description'>
            Diseñada para ser más rápida, intuitiva y hermosa. Descubre las nuevas
            funciones que transformarán tu experiencia diaria.
          </p>
          <div className='hero-app__cta'>
            <a href='#download' className='btn btn--primary'>
              <svg className='btn__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='7 10 12 15 17 10' />
                <line x1='12' y1='15' x2='12' y2='3' />
              </svg>
              Descargar Gratis
            </a>
            <a href='#features' className='btn btn--secondary'>
              Ver Características
              <svg className='btn__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <line x1='5' y1='12' x2='19' y2='12' />
                <polyline points='12 5 19 12 12 19' />
              </svg>
            </a>
          </div>
          <div className='hero-app__trust'>
            <span>Confiado por +50,000 usuarios</span>
            <div className='hero-app__stars'>
              <svg viewBox='0 0 24 24' fill='currentColor' className='star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              <svg viewBox='0 0 24 24' fill='currentColor' className='star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              <svg viewBox='0 0 24 24' fill='currentColor' className='star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              <svg viewBox='0 0 24 24' fill='currentColor' className='star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              <svg viewBox='0 0 24 24' fill='currentColor' className='star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              <svg viewBox='0 0 24 24' className='star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>
              <span>4.9/5</span>
            </div>
          </div>
        </div>
        <div className='hero-app__visual'>
          <div className='phone-mockup'>
            <div className='phone-mockup__frame'>
              <div className='phone-mockup__screen'>
                <div className='app-screen'>
                  <div className='app-screen__header'>
                    <div className='app-screen__avatar'></div>
                    <div className='app-screen__info'>
                      <h4>Bienvenido de vuelta</h4>
                      <span>3 tareas pendientes</span>
                    </div>
                  </div>
                  <div className='app-screen__content'>
                    <div className='stat-card'>
                      <span className='stat-card__value'>+24%</span>
                      <span className='stat-card__label'>Productividad</span>
                    </div>
                    <div className='stat-card'>
                      <span className='stat-card__value'>12h</span>
                      <span className='stat-card__label'>Ahorradas/mes</span>
                    </div>
                    <div className='stat-card'>
                      <span className='stat-card__value'>98%</span>
                      <span className='stat-card__label'>Satisfacción</span>
                    </div>
                  </div>
                  <div className='app-screen__chart'>
                    <canvas className='chart-placeholder'></canvas>
                  </div>
                  <div className='app-screen__nav'>
                    <button className='nav-item active'>
                      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><rect x='3' y='3' width='7' height='7' rx='1'/><rect x='14' y='3' width='7' height='7' rx='1'/><rect x='3' y='14' width='7' height='7' rx='1'/><rect x='14' y='14' width='7' height='7' rx='1'/></svg>
                    </button>
                    <button className='nav-item'>
                      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M9 11l3 3L22 4'/><path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'/></svg>
                    </button>
                    <button className='nav-item'>
                      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><circle cx='12' cy='12' r='10'/><line x1='12' y1='16' x2='12' y2='12'/><line x1='12' y1='8' x2='12.01' y2='8'/></svg>
                    </button>
                    <button className='nav-item'>
                      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='phone-mockup__shadow'></div>
          </div>
          <div className='floating-card card-1'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/></svg>
            <span>Rápido</span>
          </div>
          <div className='floating-card card-2'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><circle cx='12' cy='12' r='10'/><path d='M12 6v6l4 2'/></svg>
            <span>Intuitivo</span>
          </div>
          <div className='floating-card card-3'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><rect x='2' y='3' width='20' height='14' rx='2'/><path d='M8 21h8'/><path d='M12 17v4'/></svg>
            <span>Seguro</span>
          </div>
        </div>
      </div>
      <div className='hero-app__scroll'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><polyline points='6 9 12 15 18 9'/></svg>
      </div>
    </header>
  )
}

export default HeroApp