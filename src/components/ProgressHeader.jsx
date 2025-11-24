import ProgressBar from './ProgressBar';
import './ProgressHeader.css';

const ProgressHeader = ({ technologies, progress, stats }) => {
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;

  const getMostCommonStatus = () => {
    const statusCounts = {
      'completed': completedTechnologies,
      'in-progress': inProgressTechnologies,
      'not-started': notStartedTechnologies
    };
    
    return Object.keys(statusCounts).reduce((a, b) => 
      statusCounts[a] > statusCounts[b] ? a : b
    );
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return status;
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'backend': return 'Бэкенд';
      case 'soft': return 'Софт-скиллы';
      default: return category;
    }
  };

  return (
    <div className="progress-header">
      <div className="progress-header-main">
        <h1>Трекер изучения технологий</h1>
        
        <ProgressBar
          progress={progress}
          label="Общий прогресс "
          color="var(--accent-color)"
          height={20}
          animated={true}
          showPercentage={true}
        />
      </div>
      
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-number">{technologies.length}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTechnologies}</span>
          <span className="stat-label">Изучено</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{inProgressTechnologies}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{notStartedTechnologies}</span>
          <span className="stat-label">Не начато</span>
        </div>
      </div>

      <div className="detailed-stats">
        <div className="stat-detail">
          <strong>Преобладающий статус:</strong> {getStatusText(getMostCommonStatus())}
        </div>
        {stats && (
          <div className="stat-detail">
            <strong>Любимая категория:</strong> {getCategoryText(stats.favoriteCategory)}
          </div>
        )}
      </div>

      <div className="progress-text">
        {progress === 100 
          ? '🎉 Поздравляем! Вы изучили все технологии!' 
          : `Продолжайте в том же духе! Осталось изучить ${notStartedTechnologies} технологий.`
        }
      </div>
    </div>
  );
};

export default ProgressHeader;