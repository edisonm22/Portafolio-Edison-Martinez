export function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-dark-border py-12 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted text-sm">© {new Date().getFullYear()} Edison Martinez. Desarrollador Full-Stack.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/edisonm22" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors" aria-label="GitHub">GitHub</a>
            <a href="https://linkedin.com/in/edisonmartinez" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://twitter.com/edisonmartinez" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors" aria-label="Twitter">Twitter</a>
            <a href="mailto:edison.martinez@email.com" className="text-text-secondary hover:text-primary transition-colors" aria-label="Email">Email</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-dark-border/50 text-center">
          <p className="text-text-muted text-sm">Hecho con <span className="text-red-500">♥</span> y <span className="text-primary">React</span> • Desplegado en Vercel</p>
        </div>
      </div>
    </footer>
  )
}