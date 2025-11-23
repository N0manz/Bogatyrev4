import { useState } from 'react'
import useTechnologies from './hooks/useTechnologies'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import SearchBar from './components/SearchBar'
import FilterTabs from './components/FilterTabs'
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

  return (
    <div className="app">
      <ProgressHeader technologies={technologies} progress={progress} />
      
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
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App