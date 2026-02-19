import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('All fields are required')
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Invalid email format')
      }

      // Check if user already exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('moodtunesUsers') || '[]')
      if (existingUsers.some(u => u.email === formData.email || u.username === formData.username)) {
        throw new Error('Username or email already exists')
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password // In production, hash this!
      }

      // Save user to localStorage
      existingUsers.push(newUser)
      localStorage.setItem('moodtunesUsers', JSON.stringify(existingUsers))

      // Create token (simple token for local auth)
      const token = `local_token_${newUser.id}`
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({ 
        username: newUser.username, 
        email: newUser.email 
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
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join MoodTunes and create your playlists</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

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
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register
