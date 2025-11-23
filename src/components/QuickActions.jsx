import './QuickActions.css';

const QuickActions = ({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) => {
  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length;
  const completedCount = technologies.filter(tech => tech.status === 'completed').length;

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-grid">
        <button 
          className="action-btn action-btn--complete"
          onClick={onMarkAllCompleted}
          disabled={completedCount === technologies.length}
        >
          ✅ Отметить все как выполненные
        </button>
        
        <button 
          className="action-btn action-btn--reset"
          onClick={onResetAll}
          disabled={completedCount === 0}
        >
          🔄 Сбросить все статусы
        </button>
        
        <button 
          className="action-btn action-btn--random"
          onClick={onRandomNext}
          disabled={notStartedCount === 0}
        >
          🎲 Случайный выбор следующей технологии
        </button>
      </div>
    </div>
  );
};

export default QuickActions;