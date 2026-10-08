import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>ABC Tent Services</h1>
        <p>
          Quality tents and chairs for weddings, funerals, and events across
          Baringo county
        </p>
        <div className="hero-actions">
          <Link to="/contact" className="cta-button">Book Now</Link>
          <a href="tel:0723842981" className="cta-button secondary">Call Us</a>
        </div>
      </section>

      <section className="services">
        <h2>What We Offer</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">⛺</div>
            <h3>Tents</h3>
            <p>Durable tents in various sizes for any event, big or small</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🪑</div>
            <h3>Chairs</h3>
            <p>Comfortable seating for your guests, delivered and set up</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🍽️</div>
            <h3>Tables</h3>
            <p>Sturdy tables to complete your event setup</p>
          </div>
        </div>
      </section>

      <section className="location">
        <h2>Where We're Located</h2>
        <p>📍 Toniok, Eldama Ravine, Baringo County</p>
      </section>
    </div>
  )
}

export default Home