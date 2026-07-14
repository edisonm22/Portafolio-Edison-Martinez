const services = [
  { name: 'Landing Page', price: 'Desde $300', desc: 'Sitio de una sola página, moderno y responsive con alta conversión. Incluye animaciones, formulario de contacto y SEO básico.', days: '5 días', icon: '🎯' },
  { name: 'Sitio Web 5 Páginas', price: 'Desde $800', desc: 'Web completa y personalizada para tu marca: Home, Sobre mí, Servicios, Portfolio, Contacto. CMS incluido para edición autónoma.', days: '10 días', icon: '🌐' },
  { name: 'App Full-Stack / E-commerce', price: 'Desde $2,000', desc: 'Aplicación completa o tienda online con backend, base de datos, autenticación, panel admin, pagos (Stripe) y despliegue CI/CD.', days: '14 días', icon: '⚡' }
]

export function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-up">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-text-primary relative inline-block mb-10">Servicios</h2>
        <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        <p className="mt-4 text-text-secondary max-w-2xl mx-auto">Soluciones a medida, código limpio, entregas a tiempo y soporte post-lanzamiento.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <article key={s.name} className="group relative bg-dark-card border border-dark-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] hover:-translate-y-2 animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-all group-hover:bg-primary group-hover:text-dark-bg group-hover:scale-105">{s.icon}</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{s.name}</h3>
              <div className="text-2xl font-black text-primary mb-4">{s.price}</div>
              <p className="text-text-secondary leading-relaxed mb-6">{s.desc}</p>
              <div className="flex items-center gap-2 text-text-muted text-sm"><svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Entrega: {s.days}</span></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}