import MoodCard from './MoodCard'

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

function MoodSelector({ onMoodSelect }) {
  return (
    <div className="mood-selector">
      <div className="mood-intro">
        <h2>How are you feeling today?</h2>
        <p>Choose your current mood to get personalized music recommendations</p>
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