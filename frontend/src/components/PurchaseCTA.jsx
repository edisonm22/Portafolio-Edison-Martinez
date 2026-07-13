import React, { useState } from 'react'

const packages = [
  {
    id: 'solo',
    name: 'NebulaX Pro Solo',
    tagline: 'Para uso personal',
    price: 349,
    originalPrice: 399,
    savings: 50,
    features: [
      'Auriculares NebulaX Pro',
      'Estuche de transporte rígido',
      'Cable USB-C trenzado 1.5m',
      'Cable 3.5mm audio',
      'Adaptador avión',
      'Paño microfibra premium',
      'Garantía 2 años',
      'Envío gratis 24-48h',
      'Devolución 30 días',
    ],
    cta: 'Reservar Ahora',
    popular: false,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'duo',
    name: 'NebulaX Pro Duo',
    tagline: 'Mejor valor - Pareja/Equipo',
    price: 599,
    originalPrice: 798,
    savings: 199,
    features: [
      '2x NebulaX Pro (colores mixtos)',
      '2x Estuches rígidos',
      '2x Set cables completos',
      'Base carga inalámbrica dual',
      'Garantía extendida 3 años',
      'Soporte prioritario de por vida',
      'Envío express gratis',
      'Devolución 60 días',
    ],
    cta: 'Comprar Duo - Ahorra $199',
    popular: true,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'team',
    name: 'NebulaX Pro Team Pack',
    tagline: 'Para empresas/equipos (5+)',
    price: 1499,
    originalPrice: 1995,
    savings: 496,
    features: [
      '5x NebulaX Pro + 2 gratis (7 total)',
      'Gestión flota en dashboard admin',
      'Configuración masiva via NFC',
      'SLA soporte 4h empresarial',
      'Garantía 5 años + reemplazo advance',
      'Facturación consolidada mensual',
      'Onboarding técnico incluido',
      'API integración MDM/ITSM',
    ],
    cta: 'Contactar Ventas',
    popular: false,
    color: 'from-amber-500 to-orange-600',
    enterprise: true,
  },
]

const colors = [
  { id: 'obsidian', name: 'Obsidian', hex: '#0d0d0d', gradient: 'from-gray-900 to-black' },
  { id: 'arctic', name: 'Arctic', hex: '#f0f4f8', gradient: 'from-blue-50 to-white' },
  { id: 'nebula', name: 'Nebula', hex: '#1a1a2e', gradient: 'from-purple-900 via-blue-900 to-indigo-900' },
]

function PurchaseCTA() {
  const [selectedPackage, setSelectedPackage] = useState('duo')
  const [selectedColor, setSelectedColor] = useState('obsidian')
  const [billingCycle, setBillingCycle] = useState('once')

  const pkg = packages.find(p => p.id === selectedPackage)

  return (
    <section id='purchase' className='purchase-cta'>
      <div className='container'>
        <div className='section-header'>
          <span className='section-tag'>Reserva tu unidad</span>
          <h2 className='section-title'>Envíos<br />inician <span className='accent'>Q1 2025</span></h2>
          <p className='section-description'>
            Edición de lanzamiento limitada. Prioridad por orden de reserva.
          </p>
        </div>

        <div className='purchase__selector'>
          <div className='billing-toggle' role='radiogroup' aria-label='Ciclo de facturación'>
            <button
              role='radio'
              aria-checked={billingCycle === 'once'}
              onClick={() => setBillingCycle('once')}
              className={`billing-toggle__option ${billingCycle === 'once' ? 'active' : ''}`}
            >
              <span>Pago único</span>
              <span className='billing-toggle__price'>$349</span>
            </button>
            <button
              role='radio'
              aria-checked={billingCycle === 'monthly'}
              onClick={() => setBillingCycle('monthly')}
              className={`billing-toggle__option ${billingCycle === 'monthly' ? 'active' : ''}`}
            >
              <span>NebulaX Plan</span>
              <span className='billing-toggle__price'>$29/mes</span>
            </button>
          </div>
        </div>

        <div className='packages__grid'>
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`package-card ${pkg.id === selectedPackage ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className='package-card__badge'>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='badge__star'>
                    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                  </svg>
                  Más Popular
                </div>
              )}

              <div className='package-card__header' style={{ '--pkg-color': `var(--${pkg.color.replace('from-', '').replace('to-', '-')})` }}>
                <h3 className='package-card__name'>{pkg.name}</h3>
                <p className='package-card__tagline'>{pkg.tagline}</p>

                <div className='package-card__price'>
                  <span className='package-card__amount'>
                    <span className='currency'>$</span>
                    {pkg.price}
                    {billingCycle === 'monthly' && pkg.id !== 'team' && <span className='period'>/mes</span>}
                  </span>
                  {pkg.originalPrice > pkg.price && billingCycle === 'once' && (
                    <span className='package-card__original'>${pkg.originalPrice}</span>
                  )}
                </div>

                {pkg.savings && billingCycle === 'once' && (
                  <span className='package-card__savings'>
                    Ahorra ${pkg.savings}
                  </span>
                )}
              </div>

              <ul className='package-card__features'>
                {pkg.features.map((feature, i) => (
                  <li key={i}>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='feature__check'>
                      <polyline points='20 6 9 17 4 12' />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`btn btn--package ${pkg.id === selectedPackage ? 'btn--primary' : 'btn--outline'}`}
                onClick={(e) => { e.stopPropagation(); setSelectedPackage(pkg.id); }}
              >
                {pkg.enterprise ? (
                  <>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='btn__icon'>
                      <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                      <circle cx='12' cy='10' r='3' />
                    </svg>
                    Agendar Demo
                  </>
                ) : (
                  <>
                    {pkg.id === selectedPackage ? (
                      <>
                        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='btn__icon'>
                          <polyline points='20 6 9 17 4 12' />
                        </svg>
                        Seleccionado
                      </>
                    ) : (
                      pkg.cta
                    )}
                  </>
                )}
              </button>
            </article>
          ))}
        </div>

        <div className='purchase__customizer'>
          <h3 className='customizer__title'>Personaliza tu {selectedPackage === 'duo' ? 'pack' : 'NebulaX Pro'}</h3>

          <div className='color-selector'>
            <label className='color-selector__label'>Color</label>
            <div className='color-selector__options' role='radiogroup' aria-label='Seleccionar color'>
              {colors.map((color) => (
                <button
                  key={color.id}
                  role='radio'
                  aria-checked={selectedColor === color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`color-option ${selectedColor === color.id ? 'selected' : ''}`}
                  style={{
                    '--color-hex': color.hex,
                    '--color-gradient': `linear-gradient(135deg, ${color.gradient.replace('from-', '').replace('to-', '').replace('-500', '').replace('-600', '').replace('-900', '').replace('via-', '').replace(' ', ', ')})`
                  }}
                  aria-label={color.name}
                >
                  <span className='color-option__swatch' />
                  {selectedColor === color.id && (
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' className='color-option__check'>
                      <polyline points='20 6 9 17 4 12' />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className='purchase__summary'>
            <div className='summary__item'>
              <span>{pkg.name} — {colors.find(c => c.id === selectedColor).name}</span>
              <span>${pkg.price}</span>
            </div>
            <div className='summary__item summary__item--shipping'>
              <span>Envío</span>
              <span className='free'>Gratis</span>
            </div>
            <div className='summary__total'>
              <span>Total</span>
              <span>${pkg.price}</span>
            </div>

            <button className='btn btn--primary btn--glow btn--large btn--full'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='btn__icon'>
                <path d='M21 12V7H5' />
                <path d='M16 7l-4 5-4-5' />
                <rect x='3' y='7' width='18' height='16' rx='2' />
              </svg>
              {billingCycle === 'monthly' ? 'Suscribirse por $29/mes' : `Reservar por $${pkg.price}`}
            </button>

            <p className='purchase__guarantee'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
              </svg>
              Compra segura • 30 días devolución • Garantía 2 años
            </p>
          </div>
        </div>

        <div className='purchase__trust'>
          <div className='trust__badges'>
            <div className='trust__badge'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <rect x='2' y='5' width='20' height='14' rx='2' />
                <line x1='6' y1='5' x2='6' y2='19' />
                <line x1='10' y1='5' x2='10' y2='19' />
                <line x1='14' y1='5' x2='14' y2='19' />
                <line x1='18' y1='5' x2='18' y2='19' />
              </svg>
              <span>Pago seguro SSL 256-bit</span>
            </div>
            <div className='trust__badge'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
              </svg>
              <span>Apple Pay / Google Pay</span>
            </div>
            <div className='trust__badge'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M21 12V7H5' />
                <path d='M16 7l-4 5-4-5' />
                <rect x='3' y='7' width='18' height='16' rx='2' />
              </svg>
              <span>Envío 24-48h gratis</span>
            </div>
            <div className='trust__badge'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
              </svg>
              <span>Devolución 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PurchaseCTA