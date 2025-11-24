import { useState, useEffect } from 'react';
import './DeadlineForm.css';

const DeadlineForm = ({ technology, onSetDeadline, onRemoveDeadline, existingDeadline, error }) => {
  const [deadline, setDeadline] = useState(existingDeadline || '');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setDeadline(existingDeadline || '');
  }, [existingDeadline]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    
    if (!deadline.trim()) {
      if (existingDeadline) {
        onRemoveDeadline(technology.id);
      }
      return;
    }

    const success = onSetDeadline(technology.id, deadline);
    if (success) {
      setTouched(false);
    }
  };

  const handleRemove = () => {
    onRemoveDeadline(technology.id);
    setDeadline('');
    setTouched(false);
  };

  const showError = touched && error;

  return (
    <form onSubmit={handleSubmit} className="deadline-form" noValidate>
      <div className="deadline-form__group">
        <label htmlFor={`deadline-${technology.id}`} className="deadline-form__label">
          Установить срок изучения:
        </label>
        
        <div className="deadline-form__input-group">
          <input
            id={`deadline-${technology.id}`}
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            onBlur={() => setTouched(true)}
            className={`deadline-form__input ${showError ? 'deadline-form__input--error' : ''}`}
            aria-describedby={showError ? `error-${technology.id}` : undefined}
            min={new Date().toISOString().split('T')[0]}
          />
          
          <button 
            type="submit" 
            className="deadline-form__submit"
            aria-label="Установить срок"
          >
            ✅
          </button>
          
          {existingDeadline && (
            <button 
              type="button"
              onClick={handleRemove}
              className="deadline-form__remove"
              aria-label="Удалить срок"
            >
              ❌
            </button>
          )}
        </div>

        {showError && (
          <div 
            id={`error-${technology.id}`}
            className="deadline-form__error"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {existingDeadline && !error && (
          <div className="deadline-form__info">
            Срок установлен: {new Date(existingDeadline).toLocaleDateString('ru-RU')}
          </div>
        )}
      </div>
    </form>
  );
};

export default DeadlineForm;