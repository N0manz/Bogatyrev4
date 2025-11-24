import { useState, useCallback } from 'react';

function useTechnologyDeadlines() {
  const [deadlines, setDeadlines] = useState({});
  const [errors, setErrors] = useState({});

  const validateDeadline = (techId, deadlineDate) => {
    const newErrors = { ...errors };
    
    if (!deadlineDate) {
      delete newErrors[techId];
      setErrors(newErrors);
      return true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(deadlineDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors[techId] = 'Дата не может быть в прошлом';
      setErrors(newErrors);
      return false;
    }

    delete newErrors[techId];
    setErrors(newErrors);
    return true;
  };

  const setDeadline = (techId, deadlineDate) => {
    if (validateDeadline(techId, deadlineDate)) {
      setDeadlines(prev => ({
        ...prev,
        [techId]: deadlineDate
      }));
      return true;
    }
    return false;
  };

  const removeDeadline = (techId) => {
    setDeadlines(prev => {
      const newDeadlines = { ...prev };
      delete newDeadlines[techId];
      return newDeadlines;
    });
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[techId];
      return newErrors;
    });
  };

  const getDeadline = (techId) => deadlines[techId];
  const getError = (techId) => errors[techId];

  const getUpcomingDeadlines = useCallback(() => {
    const today = new Date();
    return Object.entries(deadlines)
      .filter(([_, date]) => new Date(date) >= today)
      .sort(([_, a], [__, b]) => new Date(a) - new Date(b))
      .slice(0, 5);
  }, [deadlines]);

  const isOverdue = (techId) => {
    const deadline = deadlines[techId];
    if (!deadline) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    return deadlineDate < today;
  };

  return {
    deadlines,
    errors,
    setDeadline,
    removeDeadline,
    getDeadline,
    getError,
    getUpcomingDeadlines,
    isOverdue,
    validateDeadline
  };
}

export default useTechnologyDeadlines;