import { useState } from 'react'
import { musicDataByLanguage } from '../data/musicDataByLanguage'
import { translations } from '../data/languages'
import MusicLanguageSelector from './MusicLanguageSelector'

function MusicRecommendations({ mood, onBack, language, onOpenPlaylistBuilder, onViewPlaylists }) {
  const [musicLanguage, setMusicLanguage] = useState('english')
  const recommendations = musicDataByLanguage[mood.id]?.[musicLanguage] || []

  const generateStreamingLinks = (title, artist) => {
    const query = `${artist} ${title}`
    const encodedQuery = encodeURIComponent(query)
    
    return {
      YouTube: `https://www.youtube.com/results?search_query=${encodedQuery}`,
      youtubeMusic: `https://music.youtube.com/search?q=${encodedQuery}`,
      spotify: `https://open.spotify.com/search/${encodedQuery}`,
      appleMusic: `https://music.apple.com/search?term=${encodedQuery}`,
    }
  }

  return (
    <div className="music-recommendations">
      <div className="recommendations-header">
        <button type="button" className="back-button" onClick={onBack}>
          ← {translations[language].backToMoods}
        </button>
        <div className="mood-info">
          <span className="current-mood-emoji">{mood.emoji}</span>
          <h2>{translations[language].perfectFor} {mood.name.toLowerCase()}</h2>
          <p>{mood.description}</p>
        </div>
      </div>

      <div className="recommendations-content">
        <MusicLanguageSelector 
          currentMusicLanguage={musicLanguage} 
          onMusicLanguageChange={setMusicLanguage}
        />
        <h3>{translations[language].recommendedForYou}</h3>
        <div className="music-grid">
          {recommendations.map((item, index) => {
            const links = generateStreamingLinks(item.title, item.artist)
            return (
              <div key={index} className="music-card">
                <div className="music-card-header">
                  <div className="music-icon">🎵</div>
                  <div className="music-info">
                    <h4 className="song-title">{item.title}</h4>
                    <p className="artist-name">{item.artist}</p>
                  </div>
                </div>
                <div className="music-details">
                  <span className="genre-tag">{item.genre}</span>
                  <span className="duration">{item.duration}</span>
                </div>
                <div className="music-description">
                  <p>{item.description}</p>
                </div>
                <div className="music-streaming-links">
                  <a href={links.youtubeMusic} target="_blank" rel="noopener noreferrer" className="stream-btn youtube-music" title="Listen on YouTube Music">
                    ▶️ YouTube Music
                  </a>
                  <a href={links.spotify} target="_blank" rel="noopener noreferrer" className="stream-btn spotify" title="Listen on Spotify">
                    🎵 Spotify
                  </a>
                  <a href={links.appleMusic} target="_blank" rel="noopener noreferrer" className="stream-btn apple-music" title="Listen on Apple Music">
                    🎧 Apple Music
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <div className="playlist-suggestion">
          <h3>{translations[language].curatedPlaylist}</h3>
          <div className="playlist-card">
            <div className="playlist-icon">🎧</div>
            <div className="playlist-info">
              <h4>{mood.name} {translations[language].vibesPlaylist}</h4>
              <p>{translations[language].perfectMix} {recommendations.length} {translations[language].songsToMatch} {mood.name.toLowerCase()} {translations[language].mood}</p>
              
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  className="create-playlist-btn" 
                  onClick={onOpenPlaylistBuilder}
                >
                  {translations[language].createPlaylist}
                </button>
                <button 
                  type="button" 
                  className="create-playlist-btn"
                  onClick={onViewPlaylists}
                  style={{ background: 'rgba(100, 200, 255, 0.3)', border: '1px solid rgba(100, 200, 255, 0.5)' }}
                >
                  📋 View Playlists
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicRecommendations