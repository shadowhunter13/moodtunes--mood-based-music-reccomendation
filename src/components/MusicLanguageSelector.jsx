import { musicLanguages } from '../data/musicDataByLanguage'
import './MusicLanguageSelector.css'

function MusicLanguageSelector({ currentMusicLanguage, onMusicLanguageChange }) {
  return (
    <div className="music-language-selector">
      <label htmlFor="music-lang">🎵 Music Language:</label>
      <select 
        id="music-lang"
        value={currentMusicLanguage} 
        onChange={(e) => onMusicLanguageChange(e.target.value)}
        className="music-lang-dropdown"
      >
        {musicLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MusicLanguageSelector
