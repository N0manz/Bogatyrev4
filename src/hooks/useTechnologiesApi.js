import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

// Mock API сервис для имитации реального API
const mockApiService = {
  async fetchTechnologies() {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: [
        {
          id: 1,
          title: 'Быть клоуном',
          description: 'Цирковое искусство и стиль жизни',
          category: 'soft-skills',
          difficulty: 'beginner',
          resources: ['https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.youtube.com/channel/UCM7-8EfoIv0T9cCI4FhHbKQ&ved=2ahUKEwj5j7a63IqRAxWsBxAIHecpABcQFnoECF4QAQ&usg=AOvVaw2axohhXpZ1bNq0hTcPJr1i', 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.youtube.com/channel/UCUzkWdUCkVrkKCcmut9epTQ&ved=2ahUKEwiBtr3S3IqRAxUAKxAIHSC1HBQQFnoECAwQAQ&usg=AOvVaw3eBJZRVlppAKF4gsRrtGyZ'],
          status: 'not-started',
          notes: ''
        },
        {
          id: 2,
          title: 'Алкоголизм',
          description: 'Паралельно со вкатом в айти, ну че они со своими hr-фильтрами',
          category: 'backend', 
          difficulty: 'intermediate',
          resources: ['https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.youtube.com/%40om_nazarov&ved=2ahUKEwiK2sX53IqRAxW1AxAIHS85EHsQFnoECAwQAQ&usg=AOvVaw2sRXzYf7tLopVSw8a6XQMi'],
          status: 'not-started',
          notes: ''
        },
        {
          id: 3,
          title: 'Spring Framework',
          description: 'Нормальный такой фреймворчик базовый',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://spring.io/projects/spring-framework'],
          status: 'not-started',
          notes: ''
        },
        {
          id: 4,
          title: 'Обман HR',
          description: 'Понарожают hr-фильтров лол',
          category: 'soft-skills',
          difficulty: 'intermediate',
          resources: ['https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.youtube.com/%40om_nazarov&ved=2ahUKEwiK2sX53IqRAxW1AxAIHS85EHsQFnoECAwQAQ&usg=AOvVaw2sRXzYf7tLopVSw8a6XQMi'],
          status: 'not-started',
          notes: ''
        }
      ]
    };
  },

  async searchTechnologies(query) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allTechs = [
      {
        id: 5,
        title: 'Vue.js',
        description: 'Прогрессивный фреймворк для создания пользовательских интерфейсов',
        category: 'frontend',
        difficulty: 'beginner',
        resources: ['https://vuejs.org']
      },
      {
        id: 6,
        title: 'PostgreSQL',
        description: 'Продвинутая реляционная база данных',
        category: 'database',
        difficulty: 'intermediate',
        resources: ['https://postgresql.org']
      },
      {
        id: 7,
        title: 'Kubernetes',
        description: 'Система оркестрации контейнеров',
        category: 'devops',
        difficulty: 'advanced',
        resources: ['https://kubernetes.io']
      }
    ];

    const filtered = allTechs.filter(tech => 
      tech.title.toLowerCase().includes(query.toLowerCase()) ||
      tech.description.toLowerCase().includes(query.toLowerCase()) ||
      tech.category.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      data: filtered
    };
  },

  async fetchAdditionalResources(techId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const resourcesMap = {
      1: ['https://reactpatterns.com', 'https://github.com/enaqx/awesome-react'],
      2: ['https://nodejsdesignpatterns.com', 'https://github.com/sindresorhus/awesome-nodejs'],
      3: ['https://basarat.gitbook.io/typescript', 'https://github.com/dzharii/awesome-typescript'],
      4: ['https://docker-curriculum.com', 'https://github.com/veggiemonk/awesome-docker'],
      5: ['https://www.howtographql.com', 'https://github.com/chentsulin/awesome-graphql']
    };

    return {
      success: true,
      data: resourcesMap[techId] || []
    };
  }
};

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Загрузка технологий из API
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await mockApiService.fetchTechnologies();
      
      if (response.success) {
        // Объединяем с существующими технологиями, избегая дубликатов
        setTechnologies(prev => {
          const existingIds = new Set(prev.map(tech => tech.id));
          const newTechs = response.data.filter(tech => !existingIds.has(tech.id));
          return [...prev, ...newTechs];
        });
      }
      
    } catch (err) {
      setError('Не удалось загрузить технологии из API');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  // Поиск технологий
  const searchTechnologies = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await mockApiService.searchTechnologies(query);
      
      if (response.success) {
        setSearchResults(response.data);
      }
    } catch (err) {
      console.error('Ошибка поиска:', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Добавление технологии из поиска
  const addTechnology = async (techData) => {
    try {
      const newTech = {
        ...techData,
        id: Date.now(),
        status: 'not-started',
        notes: '',
        createdAt: new Date().toISOString()
      };
      
      setTechnologies(prev => {
        const exists = prev.find(tech => tech.title === techData.title);
        return exists ? prev : [...prev, newTech];
      });
      
      return newTech;
    } catch (err) {
      throw new Error('Не удалось добавить технологию');
    }
  };

  // Загрузка дополнительных ресурсов
  const fetchAdditionalResources = async (techId) => {
    try {
      const response = await mockApiService.fetchAdditionalResources(techId);
      
      if (response.success) {
        setTechnologies(prev =>
          prev.map(tech =>
            tech.id === techId
              ? { 
                  ...tech, 
                  resources: [...(tech.resources || []), ...response.data] 
                }
              : tech
          )
        );
        
        return response.data;
      }
    } catch (err) {
      console.error('Ошибка загрузки ресурсов:', err);
      throw err;
    }
  };

  // Импорт roadmap
  const importRoadmap = async (roadmapData) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTechnologies = roadmapData.map(tech => ({
        ...tech,
        id: Date.now() + Math.random(),
        status: 'not-started',
        notes: ''
      }));
      
      setTechnologies(prev => [...prev, ...newTechnologies]);
      
      return newTechnologies;
    } catch (err) {
      setError('Ошибка импорта дорожной карты');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Локальные операции (обновление статуса, заметок)
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

  // Вычисление прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  // Статистика
  const getStats = () => {
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    
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
    loading,
    error,
    searchResults,
    searchLoading,
    fetchTechnologies,
    searchTechnologies,
    addTechnology,
    fetchAdditionalResources,
    importRoadmap,
    updateStatus,
    updateNotes,
    markAllAsCompleted,
    resetAllStatuses,
    progress: calculateProgress(),
    stats: getStats()
  };
}

export default useTechnologiesApi;