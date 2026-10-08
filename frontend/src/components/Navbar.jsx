import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <Link to="/" onClick={close}>
            ABC <span>Tent Services</span>
          </Link>
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
          <li><Link to="/" onClick={close}>Home</Link></li>
          <li><Link to="/gallery" onClick={close}>Gallery</Link></li>
          <li><Link to="/contact" onClick={close}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar