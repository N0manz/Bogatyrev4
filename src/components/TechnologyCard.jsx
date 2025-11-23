import './TechnologyCard.css';

const TechnologyCard = ({ title, description, status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'not-started':
        return '⏳';
      default:
        return '📚';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return 'Не определено';
    }
  };

  return (
    <div className={`technology-card technology-card--${status}`}>
      <div className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <span className="technology-card__status-icon">{getStatusIcon()}</span>
      </div>
      <p className="technology-card__description">{description}</p>
      <div className="technology-card__footer">
        <span className={`technology-card__status technology-card__status--${status}`}>
          {getStatusText()}
        </span>
      </div>
    </div>
  );
};

export default TechnologyCard;