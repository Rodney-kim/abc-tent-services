import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()

      if (response.ok) {
        sessionStorage.setItem('adminToken', data.token)
        navigate('/admin/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch {
      setError('Could not reach the server')
    }
  }

  return (
    <div className="admin-box">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log in</button>
      </form>
      {error && <p className="status-message">{error}</p>}
    </div>
  )
}

export default AdminLogin