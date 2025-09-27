function MoodCard({ mood, onClick }) {
  return (
    <div 
      className="mood-card"
      onClick={onClick}
      style={{ '--mood-gradient': mood.gradient }}
    >
      <div className="mood-card-content">
        <div className="mood-emoji">{mood.emoji}</div>
        <h3 className="mood-name">{mood.name}</h3>
        <p className="mood-description">{mood.description}</p>
      </div>
      <div className="mood-card-overlay"></div>
    </div>
  )
}

export default MoodCard