import { useState, useCallback } from 'react';

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, severity = 'info', duration = 6000) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      severity,
      duration,
      open: true
    };

    setNotifications(prev => [...prev, notification]);

    // Автоматическое закрытие
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
}

export default useNotifications;