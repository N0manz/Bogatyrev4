const UserStats = ({ stats }) => {
  return (
    <div className="user-stats">
      <h3>Статистика</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.totalTechnologies}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Изучено</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats.notStarted}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>
      
    </div>
  )
}

export default UserStats