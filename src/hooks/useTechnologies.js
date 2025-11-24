import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  // {
  //   id: 1,
  //   title: 'Быть клоуном',
  //   description: 'Изучение искусства быть клоуном',
  //   category: 'soft-skills',
  //   status: 'not-started',
  //   notes: '',
  //   category: 'soft-skills'
  // },
  // {
  //   id: 2,
  //   title: 'Алкоголизм',
  //   description: 'Понарожают hr фильтров',
  //   status: 'not-started',
  //   notes: '',
  //   category: 'backend'
  // },
  // {
  //   id: 3,
  //   title: 'Spring Framework',
  //   description: 'Работа с Spring Framework',
  //   status: 'not-started',
  //   notes: '',
  //   category: 'backend'
  // },
  // {
  //   id: 4,
  //   title: 'Обманывать HR',
  //   description: 'Ну че они ставят год опыта минимум на джуна',
  //   status: 'not-started',
  //   notes: '',
  //   category: 'soft'
  // }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  const markAllAsCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Новая функция для получения статистики
  const getStats = () => {
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    
    // Находим самую популярную категорию
    const categories = technologies.map(tech => tech.category);
    const categoryCount = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    
    const favoriteCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : 'Нет данных'
    , 'Нет данных');

    return {
      total: technologies.length,
      completed,
      inProgress,
      notStarted,
      favoriteCategory,
      completionRate: calculateProgress()
    };
  };

  return {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    markAllAsCompleted,
    resetAllStatuses,
    progress: calculateProgress(),
    stats: getStats() // Добавляем статистику
  };
}

export default useTechnologies;