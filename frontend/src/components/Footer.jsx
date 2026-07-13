import React from 'react'

function Footer() {
  return (
    <footer className='footer'>
      <p>© {new Date().getFullYear()} Edison Martinez. Desarrollador Full-Stack.</p>
      <div className='social'>
        <a href='https://github.com/edisonmartinez' target='_blank' rel='noreferrer'>GitHub</a>
        <a href='https://linkedin.com/in/edisonmartinez' target='_blank' rel='noreferrer'>LinkedIn</a>
        <a href='https://twitter.com/edisonmartinez' target='_blank' rel='noreferrer'>Twitter</a>
        <a href='https://es.fiverr.com/edisonmartnez' target='_blank' rel='noreferrer'>Fiverr</a>
      </div>
    </footer>
  )
}

export default Footer
