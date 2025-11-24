import { useState, useEffect } from 'react'
import useTechnologies from './hooks/useTechnologies'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import SearchBar from './components/SearchBar'
import FilterTabs from './components/FilterTabs'
import ThemeToggle from './components/ThemeToggle'
import UserStats from './components/UserStats'
import './App.css'

const App = () => {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    markAllAsCompleted, 
    resetAllStatuses, 
    progress 
  } = useTechnologies()

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // Инициализация темы из localStorage или системных настроек
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
  }

  const filteredTechnologies = technologies.filter(tech => {
    const statusMatch = activeFilter === 'all' || tech.status === activeFilter
    const searchMatch = searchQuery === '' || 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    return statusMatch && searchMatch
  })

  // Статистика для UserStats
  const userStats = {
    totalTechnologies: technologies.length,
    completed: technologies.filter(tech => tech.status === 'completed').length,
    inProgress: technologies.filter(tech => tech.status === 'in-progress').length,
    notStarted: technologies.filter(tech => tech.status === 'not-started').length,
    favoriteCategory: getFavoriteCategory(),
    completionRate: progress.percentage
  }

  function getFavoriteCategory() {
    const categories = technologies.map(tech => tech.category)
    const categoryCount = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {})
    
    return Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b, 'None'
    )
  }

  return (
    <div className="app">
      <div className="app-header">
        <ProgressHeader technologies={technologies} progress={progress} />
        <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
      </div>
      
      <div className="main-content">
        <div className="sidebar">
          <UserStats stats={userStats} />
          <QuickActions 
            onMarkAllCompleted={markAllAsCompleted}
            onResetAll={resetAllStatuses}
            onRandomNext={randomNextTechnology}
            technologies={technologies}
          />
        </div>
        
        <div className="content">
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
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App