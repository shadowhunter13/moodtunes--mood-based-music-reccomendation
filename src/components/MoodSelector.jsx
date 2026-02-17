import MoodCard from './MoodCard'
import { translations } from '../data/languages'

function MoodSelector({ onMoodSelect, moods, language }) {
  return (
    <div className="mood-selector">
      <div className="mood-intro">
        <h2>{translations[language].howAreYouFeeling}</h2>
        <p>{translations[language].chooseYourMood}</p>
      </div>
      
      <div className="mood-grid">
        {moods.map(mood => (
          <MoodCard
            key={mood.id}
            mood={mood}
            onClick={() => onMoodSelect(mood)}
          />
        ))}
      </div>
    </div>
  )
}

export default MoodSelector