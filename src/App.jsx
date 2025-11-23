import { useState } from 'react'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import FilterTabs from './components/FilterTabs'
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

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started':
        return tech.status === 'not-started'
      case 'in-progress':
        return tech.status === 'in-progress'
      case 'completed':
        return tech.status === 'completed'
      default:
        return true
    }
  })

  return (
    <div className="app">
      <ProgressHeader technologies={technologies} />
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
        {filteredTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            onStatusChange={updateTechnologyStatus}
          />
        ))}
      </div>
    </div>
  )
}

export default App