import './ProgressHeader.css';

const ProgressHeader = ({ technologies }) => {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  const getProgressColor = () => {
    if (progressPercentage < 30) return '#808080ff';
    if (progressPercentage < 70) return '#ffffffff';
    return '#10b981';
  };

  return (
    <div className="progress-header">
      <h1>Трекер изучения технологий</h1>
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-number">{totalTechnologies}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTechnologies}</span>
          <span className="stat-label">Изучено</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{progressPercentage}%</span>
          <span className="stat-label">Прогресс</span>
        </div>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: getProgressColor()
          }}
        ></div>
      </div>
      <div className="progress-text">
        {progressPercentage === 100 
          ? '🎉 Поздравляем! Вы изучили все технологии!' 
          : `Продолжайте в том же духе! Осталось изучить ${totalTechnologies - completedTechnologies} технологий.`
        }
      </div>
    </div>
  );
};

export default ProgressHeader;