import { useState } from 'react';
import './TechnologyCard.css';

const TechnologyCard = ({ technology, onStatusChange, onNotesChange }) => {
  const [showNotes, setShowNotes] = useState(false);
  const { id, title, description, status, notes, category } = technology;

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

  const handleStatusClick = () => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onStatusChange(id, statusOrder[nextIndex]);
  };

  const handleNotesChange = (newNotes) => {
    onNotesChange(id, newNotes);
  };

  return (
    <div 
      className={`technology-card technology-card--${status}`}
      onClick={handleStatusClick}
    >
      <div className="technology-card__header">
        <div className="technology-card__info">
          <h3 className="technology-card__title">{title}</h3>
          <span className="technology-card__category">{category}</span>
        </div>
        <span className="technology-card__status-icon">{getStatusIcon()}</span>
      </div>
      
      <p className="technology-card__description">{description}</p>
      
      <div className="technology-card__footer">
        <span className={`technology-card__status technology-card__status--${status}`}>
          {getStatusText()}
        </span>
        
        <button 
          className="technology-card__notes-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowNotes(!showNotes);
          }}
        >
          📝 Заметки
        </button>
      </div>

      {showNotes && (
        <div className="technology-card__notes" onClick={(e) => e.stopPropagation()}>
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Добавьте заметки по этой технологии..."
            className="technology-card__notes-textarea"
          />
          <button 
            className="technology-card__notes-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowNotes(false);
            }}
          >
            Закрыть
          </button>
        </div>
      )}
      
      <div className="technology-card__hint">Нажмите для смены статуса</div>
    </div>
  );
};

export default TechnologyCard;