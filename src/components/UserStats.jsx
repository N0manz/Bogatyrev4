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
      
      <div className="stats-details">
        <div className="stat-detail">
          <span>Прогресс:</span>
          <span>{Math.round(stats.completionRate)}%</span>
        </div>
        
        <div className="stat-detail">
          <span>Любимая категория:</span>
          <span>{stats.favoriteCategory}</span>
        </div>
      </div>
    </div>
  )
}

export default UserStats