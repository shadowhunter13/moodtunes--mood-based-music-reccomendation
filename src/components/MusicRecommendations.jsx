import { musicData } from '../data/musicData'

function MusicRecommendations({ mood, onBack }) {
  const recommendations = musicData[mood.id] || []

  return (
    <div className="music-recommendations">
      <div className="recommendations-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Moods
        </button>
        <div className="mood-info">
          <span className="current-mood-emoji">{mood.emoji}</span>
          <h2>Perfect for when you're feeling {mood.name.toLowerCase()}</h2>
          <p>{mood.description}</p>
        </div>
      </div>

      <div className="recommendations-content">
        <h3>Recommended for you</h3>
        <div className="music-grid">
          {recommendations.map((item, index) => (
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
            </div>
          ))}
        </div>

        <div className="playlist-suggestion">
          <h3>Curated Playlist</h3>
          <div className="playlist-card">
            <div className="playlist-icon">🎧</div>
            <div className="playlist-info">
              <h4>{mood.name} Vibes Playlist</h4>
              <p>A perfect mix of {recommendations.length} songs to match your {mood.name.toLowerCase()} mood</p>
              <button className="create-playlist-btn">Create Playlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicRecommendations