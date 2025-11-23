import { useState } from 'react'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import FilterTabs from './components/FilterTabs'
import SearchBar from './components/SearchBar'
import './App.css'

const App = () => {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'Быть клоуном', 
      description: 'освоенно на 147%', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'Алкоголизм', 
      description: 'Совместно с попытками вкатиться на айти рынок', 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      title: 'Стать счастливым', 
      description: 'dr. pepper стоит 150 рублей за 0.3', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'Вкатиться на айти рынок', 
      description: 'мда понарожают hr-фильтров', 
      status: 'in-progress' 
    }
  ])

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Функция для изменения статуса технологии
  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          const statusOrder = ['not-started', 'in-progress', 'completed']
          const currentIndex = statusOrder.indexOf(tech.status)
          const nextIndex = (currentIndex + 1) % statusOrder.length
          return { ...tech, status: statusOrder[nextIndex] }
        }
        return tech
      })
    )
  }

  // Функции для быстрых действий
  const markAllAsCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    )
  }

  const resetAllStatuses = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    )
  }

  const randomNextTechnology = () => {
    const notStartedTech = technologies.filter(tech => tech.status === 'not-started')
    if (notStartedTech.length === 0) return
    
    const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)]
    updateTechnologyStatus(randomTech.id)
  }

  // Фильтрация технологий по статусу и поисковому запросу
  const filteredTechnologies = technologies.filter(tech => {
    // Фильтр по статусу
    const statusMatch = activeFilter === 'all' || tech.status === activeFilter
    
    // Фильтр по поисковому запросу
    const searchMatch = searchQuery === '' || 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return statusMatch && searchMatch
  })

  return (
    <div className="app">
      <ProgressHeader technologies={technologies} />
      
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultsCount={filteredTechnologies.length}
        totalCount={technologies.length}
      />
      
      <QuickActions 
        onMarkAllCompleted={markAllAsCompleted}
        onResetAll={resetAllStatuses}
        onRandomNext={randomNextTechnology}
        technologies={technologies}
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
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={updateTechnologyStatus}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App