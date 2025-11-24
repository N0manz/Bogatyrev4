import { useState } from 'react';
import DeadlineForm from './DeadlineForm';
import './TechnologyCard.css';

const TechnologyCard = ({ 
  technology, 
  onStatusChange, 
  onNotesChange, 
  onFetchResources,
  onSetDeadline,
  onRemoveDeadline,
  deadline,
  deadlineError 
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [loadingResources, setLoadingResources] = useState(false);
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

  const handleFetchResources = async (e) => {
    e.stopPropagation();
    
    if (!showResources && technology.resources && technology.resources.length > 0) {
      setShowResources(true);
      return;
    }

    if (!technology.resources || technology.resources.length <= 2) {
      setLoadingResources(true);
      try {
        await onFetchResources(technology.id);
        setShowResources(true);
      } catch (err) {
        // Ошибка уже обработана в App.jsx
      } finally {
        setLoadingResources(false);
      }
    } else {
      setShowResources(!showResources);
    }
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
        
        <div className="technology-card__actions">
          <button 
            className="technology-card__notes-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowNotes(!showNotes);
            }}
          >
            📝 Заметки
          </button>
          
          <button 
            className="technology-card__resources-btn"
            onClick={handleFetchResources}
            disabled={loadingResources}
          >
            {loadingResources ? '⏳' : '📚'} Ресурсы
          </button>
        </div>
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
      
      {showResources && technology.resources && technology.resources.length > 0 && (
        <div className="technology-card__resources" onClick={(e) => e.stopPropagation()}>
          <h4 className="technology-card__resources-title">Ресурсы для изучения:</h4>
          <ul className="technology-card__resources-list">
            {technology.resources.map((resource, index) => (
              <li key={index} className="technology-card__resource-item">
                <a 
                  href={resource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="technology-card__resource-link"
                >
                  {resource}
                </a>
              </li>
            ))}
          </ul>
          <button 
            className="technology-card__resources-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowResources(false);
            }}
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Добавляем форму установки сроков */}
      <DeadlineForm
        technology={technology}
        onSetDeadline={onSetDeadline}
        onRemoveDeadline={onRemoveDeadline}
        existingDeadline={deadline}
        error={deadlineError}
      />
      
      <div className="technology-card__hint">Нажмите для смены статуса</div>
    </div>
  );
};

export default TechnologyCard;