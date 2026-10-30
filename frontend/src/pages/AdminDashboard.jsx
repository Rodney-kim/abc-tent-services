import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function AdminDashboard() {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('adminToken')

  const [images, setImages] = useState([])
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const logout = useCallback(() => {
    sessionStorage.removeItem('adminToken')
    navigate('/admin')
  }, [navigate])

  const loadImages = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery`)
      setImages(await response.json())
    } catch {
      setMessage('Could not load images')
    }
  }, [])

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }
    loadImages()
  }, [token, navigate, loadImages])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    const form = e.currentTarget
    setBusy(true)
    setMessage('')

    const formData = new FormData()
    formData.append('image', file)
    formData.append('caption', caption)

    try {
      const response = await fetch(`${API_URL}/api/gallery`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }, // no Content-Type here
        body: formData,
      })

      if (response.status === 401) return logout()

      if (response.ok) {
        form.reset()
        setFile(null)
        setCaption('')
        setMessage('Image uploaded')
        loadImages()
      } else {
        setMessage('Upload failed. Use an image under 5 MB.')
      }
    } catch {
      setMessage('Could not reach the server')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return

    try {
      const response = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) return logout()

      if (response.ok) {
        loadImages()
      } else {
        setMessage('Delete failed')
      }
    } catch {
      setMessage('Could not reach the server')
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Gallery Admin</h1>
        <button onClick={logout} className="logout-btn">Log out</button>
      </div>

      <form onSubmit={handleUpload} className="booking-form">
        <label>
          Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>
        <label>
          Caption (optional)
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </label>
        <button type="submit" disabled={busy}>
          {busy ? 'Uploading...' : 'Upload photo'}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}

      <h2>Current photos ({images.length})</h2>
      {images.length === 0 ? (
        <p>No photos yet. Upload your first one above.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((img) => (
            <div key={img._id} className="gallery-item">
              <img src={img.url} alt={img.caption || 'Gallery photo'} />
              <div className="admin-item-footer">
                <span>{img.caption}</span>
                <button onClick={() => handleDelete(img._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard