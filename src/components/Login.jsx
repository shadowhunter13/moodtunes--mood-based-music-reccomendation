import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required')
      }

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('moodtunesUsers') || '[]')
      const user = users.find(u => u.email === formData.email)

      if (!user) {
        throw new Error('Invalid email or password')
      }

      // Verify password (in production, use bcrypt comparison)
      if (user.password !== formData.password) {
        throw new Error('Invalid email or password')
      }

      // Create token and save to localStorage
      const token = `local_token_${user.id}`
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({ 
        username: user.username, 
        email: user.email 
      }))

      // Dispatch custom event to notify App of login
      window.dispatchEvent(new Event('userLogin'))

      // Navigate to home
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your MoodTunes account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
