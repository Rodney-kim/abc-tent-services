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

  const handleSubmit = (e) => {
    e.preventDefault()
    // We'll hook this up to the backend next
    console.log('Form submitted:', formData)
    setStatus('Booking request sent! We will get back to you soon.')
  }

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Fill out the form below to request a booking, or reach us directly:</p>

      <div className="contact-info">
        <p>Phone: 0723 842 981</p>
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