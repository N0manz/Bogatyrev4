import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import './App.css';

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
  ]);

  return (
    <div className="app">
      <ProgressHeader technologies={technologies} />
      <div className="technologies-list">
        {technologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
          />
        ))}
      </div>
    </div>
  );
};

export default App;