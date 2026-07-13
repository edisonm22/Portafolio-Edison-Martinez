import React from 'react'

const specs = [
  { category: 'Audio', items: [
    { label: 'Drivers', value: '40mm Graphene-enhanced' },
    { label: 'Respuesta Frecuencia', value: '10Hz - 40kHz' },
    { label: 'Impedancia', value: '32 Ω' },
    { label: 'Sensibilidad', value: '105 dB SPL/mW' },
    { label: 'Audio Espacial', value: 'Head-tracking 6-ejes' },
    { label: 'Codecs', value: 'LDAC, aptX Adaptive, AAC, SBC' },
  ]},
  { category: 'Cancelación de Ruido', items: [
    { label: 'Tipo', value: 'Híbrida Adaptativa (8 micrófonos)' },
    { label: 'Reducción', value: 'Hasta -45 dB (ANC)' },
    { label: 'Modos', value: 'Transparencia / ANC / Auto-AI' },
    { label: 'Viento', value: 'Algoritmo anti-viento 3.0' },
  ]},
  { category: 'Conectividad', items: [
    { label: 'Bluetooth', value: '5.4 Multipoint (2 dispositivos)' },
    { label: 'Alcance', value: '30m (línea de vista)' },
    { label: 'Latencia', value: '<30ms (Modo Gaming)' },
    { label: 'Cable', value: 'USB-C Audio + 3.5mm analógico' },
  ]},
  { category: 'Batería y Carga', items: [
    { label: 'Duración (ANC On)', value: '40 horas' },
    { label: 'Duración (ANC Off)', value: '60 horas' },
    { label: 'Carga Rápida', value: '5 min = 1.5h / 15 min = 4h' },
    { label: 'Carga Completa', value: '1.5h (USB-C PD 3.0)' },
  ]},
  { category: 'Diseño y Materiales', items: [
    { label: 'Peso', value: '248g' },
    { label: 'Diadema', value: 'Fibra de carbono + memoria' },
    { label: 'Almohadillas', value: 'Cuero vegano + memory foam' },
    { label: 'Certificación', value: 'IPX4 / MIL-STD-810H' },
    { label: 'Colores', value: 'Obsidian, Arctic, Nebula' },
  ]},
  { category: 'Smart Features', items: [
    { label: 'Asistente Voz', value: 'Alexa / Google / Siri nativo' },
    { label: 'App Companion', value: 'iOS / Android / Desktop' },
    { label: 'EQ Personalizado', value: '10 bandas + perfiles IA' },
    { label: 'Find My', value: 'Red global + UWB precision' },
    { label: 'Actualizaciones', value: 'OTA automáticas' },
  ]},
]

function ProductSpecs() {
  return (
    <section id='specs' className='product-specs'>
      <div className='container'>
        <div className='section-header'>
          <span className='section-tag'>Especificaciones</span>
          <h2 className='section-title'>Ingeniería<br />sin compromisos</h2>
          <p className='section-description'>
            Cada componente elegido por rendimiento, no por costo.
          </p>
        </div>

        <div className='specs__grid'>
          {specs.map((group, i) => (
            <article key={group.category} className='specs__card' style={{ '--i': i }}>
              <div className='specs__card-header'>
                <span className='specs__category'>{group.category}</span>
                <svg className='specs__icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <rect x='3' y='3' width='18' height='18' rx='2' />
                  <path d='M9 9h6v6H9z' />
                </svg>
              </div>
              <dl className='specs__list'>
                {group.items.map((item, idx) => (
                  <div key={idx} className='specs__item'>
                    <dt className='specs__label'>{item.label}</dt>
                    <dd className='specs__value'>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className='specs__compare'>
          <a href='#compare' className='btn btn--outline'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='btn__icon'>
              <polyline points='18 16 12 22 6 16' />
              <line x1='12' y1='22' x2='12' y2='4' />
            </svg>
            Comparar con modelos anteriores
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProductSpecs