import { useState, useMemo } from 'react'
import { musicDataByLanguage } from '../data/musicDataByLanguage'

const moods = [
  'happy', 'sad', 'energetic', 'calm', 'romantic', 'focused', 'nostalgic', 'adventurous'
]

const languages = ['english', 'hindi', 'spanish', 'french']

function PlaylistBuilder({ onPlaylistCreate, onCancel }) {
  const [playlistName, setPlaylistName] = useState('')
  const [selectedSongs, setSelectedSongs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('english')

  // Get all songs from all moods and languages
  const allSongs = useMemo(() => {
    const songs = []
    moods.forEach(mood => {
      languages.forEach(lang => {
        const moodSongs = musicDataByLanguage[mood]?.[lang] || []
        moodSongs.forEach(song => {
          songs.push({
            ...song,
            mood: mood.charAt(0).toUpperCase() + mood.slice(1),
            language: lang.charAt(0).toUpperCase() + lang.slice(1),
            id: `${mood}-${lang}-${song.title}-${song.artist}`
          })
        })
      })
    })
    return songs
  }, [])

  // Filter songs based on search, mood, and language
  const filteredSongs = useMemo(() => {
    return allSongs.filter(song => {
      const matchesSearch = searchTerm === '' || 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesMood = selectedMood === '' || song.mood === selectedMood
      const matchesLanguage = song.language === selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)
      
      return matchesSearch && matchesMood && matchesLanguage
    })
  }, [allSongs, searchTerm, selectedMood, selectedLanguage])

  const handleSongToggle = (songId) => {
    setSelectedSongs(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    )
  }

  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) {
      alert('Please enter a playlist name')
      return
    }

    if (selectedSongs.length === 0) {
      alert('Please select at least one song')
      return
    }

    const playlistSongs = selectedSongs.map(songId => 
      allSongs.find(song => song.id === songId)
    ).filter(Boolean)

    onPlaylistCreate({
      name: playlistName,
      songs: playlistSongs
    })
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      color: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Create Your Playlist</h2>
        <button 
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 100, 100, 0.3)',
            border: '1px solid rgba(255, 100, 100, 0.5)',
            color: '#FF6464',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Cancel
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Left Column - Playlist Info */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Playlist Details</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Playlist Name
            </label>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                color: 'white',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <strong>Selected Songs:</strong> {selectedSongs.length}
            </p>
            <div style={{
              maxHeight: '200px',
              overflowY: 'auto',
              marginTop: '0.75rem'
            }}>
              {selectedSongs.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                  No songs selected yet
                </p>
              ) : (
                selectedSongs.map(songId => {
                  const song = allSongs.find(s => s.id === songId)
                  return (
                    <div 
                      key={songId}
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '4px',
                        marginBottom: '0.5rem',
                        fontSize: '0.85rem'
                      }}
                    >
                      {song?.title} - {song?.artist}
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <button
            onClick={handleCreatePlaylist}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(76, 175, 80, 0.3)',
              border: '1px solid rgba(76, 175, 80, 0.5)',
              color: '#4CAF50',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            Create Playlist
          </button>
        </div>

        {/* Right Column - Filters and Song Selection */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Search & Filter</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang} style={{ color: '#000', background: '#fff' }}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Mood (Optional)
                </label>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="" style={{ color: '#000', background: '#fff' }}>All Moods</option>
                  {moods.map(mood => (
                    <option key={mood} value={mood.charAt(0).toUpperCase() + mood.slice(1)} style={{ color: '#000', background: '#fff' }}>
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Search Song
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Title or artist..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Songs List */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            maxHeight: '500px',
            overflowY: 'auto'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>
              Available Songs ({filteredSongs.length})
            </h3>
            
            {filteredSongs.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>No songs found</p>
            ) : (
              <div>
                {filteredSongs.map(song => (
                  <div
                    key={song.id}
                    onClick={() => handleSongToggle(song.id)}
                    style={{
                      padding: '1rem',
                      background: selectedSongs.includes(song.id) 
                        ? 'rgba(100, 200, 255, 0.2)' 
                        : 'rgba(255,255,255,0.05)',
                      border: selectedSongs.includes(song.id)
                        ? '2px solid rgba(100, 200, 255, 0.5)'
                        : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      marginBottom: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedSongs.includes(song.id)) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedSongs.includes(song.id)) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                      <input
                        type="checkbox"
                        checked={selectedSongs.includes(song.id)}
                        onChange={() => handleSongToggle(song.id)}
                        style={{
                          marginTop: '0.25rem',
                          cursor: 'pointer',
                          width: '18px',
                          height: '18px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>
                          {song.title}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                          {song.artist}
                        </p>
                        <p style={{ margin: '0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                          🎵 {song.mood} • 🌐 {song.language} • ⏱ {song.duration}
                        </p>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                          {song.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistBuilder
