import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <a href="#home" onClick={close}>
            ABC <span>Tent Services</span>
          </a>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>

        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          <li><a href="#home" onClick={close}>Home</a></li>
          <li><a href="#gallery" onClick={close}>Gallery</a></li>
          <li><a href="#contact" onClick={close}>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar