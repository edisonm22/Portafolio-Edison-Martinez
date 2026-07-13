import React from 'react'

const footerLinks = {
  producto: [
    { label: 'Especificaciones', href: '#specs' },
    { label: 'Galería', href: '#showcase' },
    { label: 'Comparar modelos', href: '#compare' },
    { label: 'Accesorios', href: '#accessories' },
    { label: 'Compatibilidad', href: '#compatibility' },
  ],
  empresa: [
    { label: 'Nosotros', href: '#about' },
    { label: 'Blog / Lab', href: '#blog' },
    { label: 'Prensa', href: '#press' },
    { label: 'Carreras', href: '#careers' },
    { label: 'Sostenibilidad', href: '#sustainability' },
  ],
  soporte: [
    { label: 'Centro ayuda', href: '#help' },
    { label: 'Garantía', href: '#warranty' },
    { label: 'Envíos', href: '#shipping' },
    { label: 'Devoluciones', href: '#returns' },
    { label: 'Contacto', href: '#contact' },
  ],
  legal: [
    { label: 'Privacidad', href: '#privacy' },
    { label: 'Términos', href: '#terms' },
    { label: 'Cookies', href: '#cookies' },
    { label: 'Licencias', href: '#licenses' },
    { label: 'Accesibilidad', href: '#a11y' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: <svg viewBox='0 0 24 24' fill='currentColor'><path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' /></svg> },
  { name: 'Discord', href: '#', icon: <svg viewBox='0 0 24 24' fill='currentColor'><path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.38-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.078.078 0 0 0 .031.057 19.9 19.9 0 0 0 4.885 1.515.077.077 0 0 0 .079-.037c.21-.38.444-.864.608-1.25a18.284 18.284 0 0 0 5.487 0c.173.386.397.87.608 1.25a.077.077 0 0 0 .078.037 19.9 19.9 0 0 0 4.886-1.515.076.076 0 0 0 .032-.055c.413-4.61-1.56-9.107-3.67-13.725a.061.061 0 0 0-.031-.028zM8.97 14.69c-.61 0-1.1-.51-1.1-1.12 0-.65.55-1.15 1.19-1.15.64 0 1.17.51 1.13 1.16h-.01c0 .65-.55 1.16-1.21 1.16zm6.16 0c-.61 0-1.1-.51-1.1-1.12 0-.65.55-1.15 1.19-1.15.64 0 1.17.51 1.13 1.16h-.01c0 .65-.55 1.16-1.21 1.16z' /></svg> },
  { name: 'YouTube', href: '#', icon: <svg viewBox='0 0 24 24' fill='currentColor'><path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' /></svg> },
  { name: 'Instagram', href: '#', icon: <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><rect x='2' y='2' width='20' height='20' rx='5' ry='5' /><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' /><line x1='17.5' y1='6.5' x2='17.51' y2='6.5' /></svg> },
  { name: 'LinkedIn', href: '#', icon: <svg viewBox='0 0 24 24' fill='currentColor'><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' /></svg> },
  { name: 'GitHub', href: '#', icon: <svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' /></svg> },
]

function FooterProduct() {
  return (
    <footer id='contact' className='footer-product'>
      <div className='container'>
        <div className='footer__grid'>
          <div className='footer__brand'>
            <div className='logo'>
              <svg viewBox='0 0 32 32' fill='none' className='logo__mark'>
                <rect x='4' y='4' width='24' height='24' rx='6' stroke='currentColor' strokeWidth='2' />
                <path d='M10 16h12M10 12h8M10 20h6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              </svg>
              <span className='logo__text'>Nebula<span>X</span></span>
            </div>
            <p className='footer__tagline'>
              Audio del futuro, diseñado para hoy.
              Ingeniería obsesiva. Estética atemporal.
            </p>
            <div className='footer__social'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className='social-link'
                  aria-label={social.name}
                  rel='noopener noreferrer'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className='footer__nav' aria-label='Enlaces producto'>
            <h4 className='footer__heading'>Producto</h4>
            <ul>
              {footerLinks.producto.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav className='footer__nav' aria-label='Enlaces empresa'>
            <h4 className='footer__heading'>Empresa</h4>
            <ul>
              {footerLinks.empresa.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav className='footer__nav' aria-label='Enlaces soporte'>
            <h4 className='footer__heading'>Soporte</h4>
            <ul>
              {footerLinks.soporte.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav className='footer__nav' aria-label='Enlaces legales'>
            <h4 className='footer__heading'>Legal</h4>
            <ul>
              {footerLinks.legal.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='footer__bottom'>
          <div className='footer__newsletter-mini'>
            <span className='newsletter-mini__icon'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <rect x='2' y='4' width='20' height='16' rx='2' />
                <path d='M22 6L12 13L2 6' />
              </svg>
            </span>
            <div className='newsletter-mini__content'>
              <strong>Recibe novedades</strong>
              <span>Email ocasional. Solo lo importante.</span>
            </div>
            <a href='#subscribe' className='btn btn--ghost btn--sm'>Suscribirme</a>
          </div>

          <div className='footer__copyright'>
            <p>&copy; 2025 NebulaX. Todos los derechos reservados.</p>
            <p className='footer__made'>
              Diseñado con obsesión por el detalle.
              <a href='#' rel='noopener'>Ver créditos</a>
            </p>
          </div>

          <div className='footer__badges'>
            <img src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30"><text x="50" y="20" text-anchor="middle" font-size="10" fill="%23666">SSL Secure</text></svg>' alt='SSL Secure' loading='lazy' />
            <img src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30"><text x="50" y="20" text-anchor="middle" font-size="10" fill="%23666">PCI DSS</text></svg>' alt='PCI DSS' loading='lazy' />
            <img src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30"><text x="50" y="20" text-anchor="middle" font-size="10" fill="%23666">GDPR Ready</text></svg>' alt='GDPR Ready' loading='lazy' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterProduct