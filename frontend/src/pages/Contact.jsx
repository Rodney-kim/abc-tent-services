import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventDate: '',
    details: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('Sending...')

  try {
    const response = await fetch('http://localhost:5000/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setStatus('Booking request sent! We will get back to you soon.')
      setFormData({ name: '', phone: '', eventDate: '', details: '' })
    } else {
      setStatus('Something went wrong. Please try again or call us directly.')
    }
  } catch (error) {
    setStatus('Could not reach the server. Please try again or call us directly.')
  }
}


  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Fill out the form below to request a booking, or reach us directly:</p>

      <div className="contact-info">
        <p>Phone: <a href="tel:0723842981">0723 842 981</a></p>
        <p>Location: Toniok, Eldama Ravine, Baringo</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Date
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Details
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="e.g. Need 1 large tent and 100 chairs for a wedding"
            required
          />
        </label>

        <button type="submit">Request Booking</button>
      </form>

      {status && <p className="status-message">{status}</p>}
    </div>
  )
}

export default Contact