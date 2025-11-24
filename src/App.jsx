import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import useTechnologyDeadlines from './hooks/useTechnologyDeadlines';
import useNotifications from './hooks/useNotifications';
import createAppTheme from './theme/theme';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import ThemeToggle from './components/ThemeToggle';
import UserStats from './components/UserStats';
import TechnologySearch from './components/TechnologySearch';
import RoadmapImporter from './components/RoadmapImporter';
import DataManager from './components/DataManager';
import NotificationSnackbar from './components/NotificationSnackbar';
import './App.css';

const App = () => {
  const { 
    technologies,
    setTechnologies,
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
    progress,
    stats
  } = useTechnologiesApi()

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // Добавляем хук для уведомлений
  const {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  } = useNotifications();

  // Добавляем хук для сроков
  const {
    deadlines,
    errors: deadlineErrors,
    setDeadline,
    removeDeadline,
    getDeadline,
    getError: getDeadlineError,
    getUpcomingDeadlines,
    isOverdue
  } = useTechnologyDeadlines();

  // Создаем MUI тему
  const muiTheme = createAppTheme(isDarkTheme);

  // Инициализация темы
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkTheme(prefersDark)
    }
  }, [])

  // Применение темы
  useEffect(() => {
    const theme = isDarkTheme ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [isDarkTheme])

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  const randomNextTechnology = () => {
    const notStartedTech = technologies.filter(tech => tech.status === 'not-started')
    if (notStartedTech.length === 0) return
    
    const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)]
    updateStatus(randomTech.id, 'in-progress')
    addNotification(`Технология "${randomTech.title}" переведена в процесс изучения`, 'info');
  }

  const filteredTechnologies = technologies.filter(tech => {
    const statusMatch = activeFilter === 'all' || tech.status === activeFilter
    const searchMatch = searchQuery === '' || 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    return statusMatch && searchMatch
  })

  const handleAddTechnologyFromSearch = async (techData) => {
    try {
      await addTechnology(techData)
      addNotification(`Технология "${techData.title}" успешно добавлена`, 'success');
    } catch (err) {
      addNotification('Ошибка при добавлении технологии', 'error');
    }
  }

  const handleFetchResources = async (techId) => {
    try {
      await fetchAdditionalResources(techId)
      addNotification('Дополнительные ресурсы загружены', 'success');
    } catch (err) {
      addNotification('Ошибка при загрузке дополнительных ресурсов', 'error');
    }
  }

  const handleImportData = (importedTechnologies) => {
    setTechnologies(prev => {
      const existingIds = new Set(prev.map(tech => tech.id));
      const newTechs = importedTechnologies.filter(tech => !existingIds.has(tech.id));
      return [...prev, ...newTechs];
    });
    addNotification(`Импортировано ${importedTechnologies.length} технологий`, 'success');
  };

  const handleClearData = () => {
    setTechnologies([]);
    addNotification('Все данные очищены', 'warning');
  };

  const handleMarkAllCompleted = () => {
    markAllAsCompleted();
    addNotification('Все технологии отмечены как изученные', 'success');
  };

  const handleResetAllStatuses = () => {
    resetAllStatuses();
    addNotification('Статусы всех технологий сброшены', 'info');
  };

  const handleSetDeadline = (techId, deadline) => {
    const success = setDeadline(techId, deadline);
    if (success) {
      addNotification('Срок изучения установлен', 'success');
    }
    return success;
  };

  const handleRemoveDeadline = (techId) => {
    removeDeadline(techId);
    addNotification('Срок изучения удален', 'info');
  };

  if (loading && technologies.length === 0) {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div className="app-loading">
          <div className="spinner"></div>
          <p>Загрузка технологий...</p>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="app">
        <div className="app-header">
          <ProgressHeader technologies={technologies} progress={progress} stats={stats} />
          <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
        </div>
        
        <div className="main-content">
          <div className="sidebar">
            <UserStats stats={stats} />
            <QuickActions 
              onMarkAllCompleted={handleMarkAllCompleted}
              onResetAll={handleResetAllStatuses}
              onRandomNext={randomNextTechnology}
              technologies={technologies}
            />
            
            <RoadmapImporter 
              onImport={importRoadmap}
              loading={loading}
            />

            <DataManager
              technologies={technologies}
              onImportData={handleImportData}
              onClearData={handleClearData}
            />

            <div className="api-section">
              <button 
                onClick={fetchTechnologies}
                disabled={loading}
                className="api-button"
              >
                {loading ? 'Загрузка...' : 'Загрузить из API'}
              </button>
            </div>
          </div>
          
          <div className="content">
            <TechnologySearch
              onSearch={searchTechnologies}
              searchResults={searchResults}
              searchLoading={searchLoading}
              onAddTechnology={handleAddTechnologyFromSearch}
            />
            
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultsCount={filteredTechnologies.length}
              totalCount={technologies.length}
            />
            
            <FilterTabs 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              technologies={technologies}
            />
            
            {error && (
              <div className="error-message">
                {error}
                <button onClick={fetchTechnologies} className="retry-button">
                  Попробовать снова
                </button>
              </div>
            )}
            
            <div className="technologies-list">
              {filteredTechnologies.length === 0 ? (
                <div className="no-results">
                  <h3>Ничего не найдено</h3>
                  <p>Попробуйте изменить поисковый запрос или выбрать другой фильтр</p>
                </div>
              ) : (
                filteredTechnologies.map(tech => (
                  <TechnologyCard
                    key={tech.id}
                    technology={tech}
                    onStatusChange={updateStatus}
                    onNotesChange={updateNotes}
                    onFetchResources={handleFetchResources}
                    onSetDeadline={handleSetDeadline}
                    onRemoveDeadline={handleRemoveDeadline}
                    deadline={getDeadline(tech.id)}
                    deadlineError={getDeadlineError(tech.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Компонент уведомлений */}
        <NotificationSnackbar
          notifications={notifications}
          onRemoveNotification={removeNotification}
        />
      </div>
    </ThemeProvider>
  )
}

export default App