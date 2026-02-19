import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import MoodSelector from './components/MoodSelector'
import MusicRecommendations from './components/MusicRecommendations'
import LanguageSelector from './components/LanguageSelector'
import PlaylistBuilder from './components/PlaylistBuilder'
import Login from './components/Login'
import Register from './components/Register'
import { translations } from './data/languages'
import './styles/MoodMusic.css'

// Import mood data to find mood by id
import { musicData } from './data/musicData'

// Moods array
const moods = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    color: '#FFD93D',
    description: 'Uplifting and joyful vibes',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)'
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    color: '#4ECDC4',
    description: 'Melancholic and reflective',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
  },
  {
    id: 'energetic',
    name: 'Energetic',
    emoji: '⚡',
    color: '#FF6B6B',
    description: 'High energy and motivation',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
  {
    id: 'calm',
    name: 'Calm',
    emoji: '🧘',
    color: '#A8E6CF',
    description: 'Peaceful and relaxing',
    gradient: 'linear-gradient(135deg, #A8E6CF 0%, #7FCDCD 100%)'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '💕',
    color: '#FFB6C1',
    description: 'Love and intimate moments',
    gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)'
  },
  {
    id: 'focused',
    name: 'Focused',
    emoji: '🎯',
    color: '#9B59B6',
    description: 'Concentration and productivity',
    gradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)'
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    emoji: '🌅',
    color: '#F39C12',
    description: 'Memories and reflection',
    gradient: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)'
  },
  {
    id: 'adventurous',
    name: 'Adventurous',
    emoji: '🗺️',
    color: '#3498DB',
    description: 'Exploration and discovery',
    gradient: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)'
  }
]

function AppLayout({ children, language, onLanguageChange, user, onLogout }) {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-top">
            <h1 className="app-title">
              <span className="music-note">♪</span>
              MoodTunes
              <span className="music-note">♫</span>
            </h1>
            <div className="header-controls">
              <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
              {user && (
                <div className="user-menu">
                  <span className="username">👤 {user.username}</span>
                  <button 
                    className="logout-btn"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="app-subtitle">{translations[language].appSubtitle}</p>
        </div>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 MoodTunes - Find your perfect soundtrack</p>
      </footer>
    </div>
  )
}

function PlaylistsPage({ playlists, onDeletePlaylist, language }) {
  const navigate = useNavigate()
  const [selectedSong, setSelectedSong] = useState(null)

  const generateStreamingLinks = (title, artist) => {
    const query = `${artist} ${title}`
    const encodedQuery = encodeURIComponent(query)
    
    return {
      youtubeMusic: `https://music.youtube.com/search?q=${encodedQuery}`,
      spotify: `https://open.spotify.com/search/${encodedQuery}`,
      appleMusic: `https://music.apple.com/search?term=${encodedQuery}`,
    }
  }

  if (playlists.length === 0) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
        <h2>No playlists created yet</h2>
        <p>Create your first playlist by selecting a mood!</p>
        <button 
          className="back-button" 
          onClick={() => navigate('/')}
          style={{ marginTop: '1rem' }}
        >
          ← Back to Moods
        </button>
      </div>
    )
  }

  return (
    <div className="playlists-page" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <button 
        className="back-button" 
        onClick={() => navigate('/')}
        style={{ marginBottom: '2rem' }}
      >
        ← Back to Moods
      </button>
      <h2 style={{ color: 'white', marginBottom: '2rem' }}>My Playlists ({playlists.length})</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {playlists.map((playlist) => (
          <div 
            key={playlist.id} 
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>🎧</p>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>{playlist.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
                {playlist.songs.length} songs • Created {playlist.createdAt}
              </p>
            </div>

            <div style={{ 
              maxHeight: '250px', 
              overflowY: 'auto', 
              marginBottom: '1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              padding: '0.75rem'
            }}>
              {playlist.songs.map((song, idx) => {
                const isSelected = selectedSong?.id === `${playlist.id}-${idx}`
                return (
                  <div key={idx}>
                    <div 
                      onClick={() => setSelectedSong({ 
                        ...song, 
                        id: `${playlist.id}-${idx}`,
                        playlistId: playlist.id 
                      })}
                      style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '0.75rem',
                        padding: '0.75rem',
                        background: isSelected ? 'rgba(100, 200, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: isSelected ? '1px solid rgba(100, 200, 255, 0.5)' : '1px solid transparent',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      }}
                    >
                      <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>
                        🎵 {song.title}
                      </p>
                      <p style={{ margin: '0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                        {song.artist}
                      </p>
                    </div>

                    {isSelected && (
                      <div style={{
                        background: 'rgba(100, 200, 255, 0.1)',
                        border: '1px solid rgba(100, 200, 255, 0.3)',
                        borderRadius: '6px',
                        padding: '0.75rem',
                        marginBottom: '0.75rem'
                      }}>
                        <p style={{ fontSize: '0.8rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                          Listen on:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {Object.entries(generateStreamingLinks(song.title, song.artist)).map(([platform, url]) => (
                            <a 
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '0.8rem',
                                color: '#64C8FF',
                                textDecoration: 'none',
                                padding: '0.4rem 0.75rem',
                                background: 'rgba(100, 200, 255, 0.2)',
                                borderRadius: '4px',
                                border: '1px solid rgba(100, 200, 255, 0.4)',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100, 200, 255, 0.4)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(100, 200, 255, 0.2)'}
                            >
                              {platform === 'youtubeMusic' && '▶️ YouTube Music'}
                              {platform === 'spotify' && '🎵 Spotify'}
                              {platform === 'appleMusic' && '🎧 Apple Music'}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => onDeletePlaylist(playlist.id)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,68,68,0.3)',
                border: '1px solid rgba(255,68,68,0.5)',
                color: '#FF4444',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,68,68,0.5)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,68,68,0.3)'}
            >
              Delete Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function MoodPage({ language }) {
  const navigate = useNavigate()

  const handleMoodSelect = (mood) => {
    navigate(`/mood/${mood.id}`)
  }

  return (
    <MoodSelector onMoodSelect={handleMoodSelect} moods={moods} language={language} />
  )
}

function RecommendationsPage({ language, playlistCount, onOpenPlaylistBuilder }) {
  const { moodId } = useParams()
  const navigate = useNavigate()
  
  const mood = moods.find(m => m.id === moodId)

  if (!mood) {
    return (
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h2>Mood not found</h2>
      </div>
    )
  }

  return (
    <MusicRecommendations 
      mood={mood} 
      onBack={() => navigate('/')}
      language={language}
      onOpenPlaylistBuilder={onOpenPlaylistBuilder}
      onViewPlaylists={() => navigate('/playlists')}
      playlistCount={playlistCount}
    />
  )
}

function App() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem('moodtunesPlaylists')
    return saved ? JSON.parse(saved) : []
  })
  const [showPlaylistBuilder, setShowPlaylistBuilder] = useState(false)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      if (token && userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
      setLoading(false)
    }
    
    checkAuth()
    
    // Listen for storage changes (from other tabs or login/logout)
    window.addEventListener('storage', checkAuth)
    
    // Listen for custom userLogin event from Login component
    window.addEventListener('userLogin', checkAuth)
    
    return () => {
      window.removeEventListener('storage', checkAuth)
      window.removeEventListener('userLogin', checkAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  // Redirect to login if not authenticated (except for login/register pages)
  useEffect(() => {
    // Re-check localStorage in case user just logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData && !user) {
      setUser(JSON.parse(userData))
    }
    
    if (!loading && !user && !['/login', '/register'].includes(window.location.pathname)) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const addPlaylist = (playlistData) => {
    const newPlaylist = {
      id: Date.now(),
      name: playlistData.name,
      songs: playlistData.songs,
      createdAt: new Date().toLocaleDateString()
    }
    const updatedPlaylists = [...playlists, newPlaylist]
    setPlaylists(updatedPlaylists)
    localStorage.setItem('moodtunesPlaylists', JSON.stringify(updatedPlaylists))
    setShowPlaylistBuilder(false)
    alert(`Playlist "${playlistData.name}" created successfully!`)
  }

  const deletePlaylist = (playlistId) => {
    const updatedPlaylists = playlists.filter(p => p.id !== playlistId)
    setPlaylists(updatedPlaylists)
    localStorage.setItem('moodtunesPlaylists', JSON.stringify(updatedPlaylists))
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {user && (
        <>
          <Route 
            path="/" 
            element={
              <AppLayout language={language} onLanguageChange={setLanguage} user={user} onLogout={handleLogout}>
                <MoodPage language={language} />
              </AppLayout>
            } 
          />
          <Route 
            path="/mood/:moodId" 
            element={
              <AppLayout language={language} onLanguageChange={setLanguage} user={user} onLogout={handleLogout}>
                {showPlaylistBuilder ? (
                  <PlaylistBuilder 
                    onPlaylistCreate={addPlaylist}
                    onCancel={() => setShowPlaylistBuilder(false)}
                  />
                ) : (
                  <RecommendationsPage 
                    language={language} 
                    playlistCount={playlists.length}
                    onOpenPlaylistBuilder={() => setShowPlaylistBuilder(true)}
                  />
                )}
              </AppLayout>
            } 
          />
          <Route 
            path="/playlists" 
            element={
              <AppLayout language={language} onLanguageChange={setLanguage} user={user} onLogout={handleLogout}>
                <PlaylistsPage playlists={playlists} onDeletePlaylist={deletePlaylist} language={language} />
              </AppLayout>
            } 
          />
        </>
      )}
    </Routes>
  )
}

export default App