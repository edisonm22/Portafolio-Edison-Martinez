import React from 'react'
import { useFadeIn } from '../hooks/useScrollSpy'

function Hero() {
  const [setRef, visible] = useFadeIn()
  return (
    <header id='home' ref={setRef} className={`hero fade-in${visible ? ' visible' : ''}`}>
      <div className='hero-content'>
        <h1>Hola, soy <span className='accent'>Edison Martinez</span></h1>
        <h2>Desarrollador Web Full-Stack</h2>
        <p>Creo soluciones web completas, modernas y funcionales con React, Node.js y MongoDB.</p>
        <a href='#contact' className='btn'>Contrátame</a>
      </div>
    </header>
  )
}

export default Hero
