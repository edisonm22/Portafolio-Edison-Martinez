import React from 'react'

const services = [
  { name: 'Landing Page', price: 'Desde $300', desc: 'Sitio de una sola página, moderno y responsive con alta conversión.', days: '5 días' },
  { name: 'Sitio 5 Páginas', price: 'Desde $800', desc: 'Web completa y personalizada para tu marca.', days: '10 días' },
  { name: 'Full-Stack / E-commerce', price: 'Desde $2,000', desc: 'App completa o tienda con backend y base de datos.', days: '14 días' }
]

function Services() {
  return (
    <section id='services' className='section'>
      <h2 className='section-title'>Servicios</h2>
      <div className='grid'>
        {services.map(s => (
          <div key={s.name} className='card service'>
            <h3>{s.name}</h3>
            <p className='price'>{s.price}</p>
            <p>{s.desc}</p>
            <small>Entrega: {s.days}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
