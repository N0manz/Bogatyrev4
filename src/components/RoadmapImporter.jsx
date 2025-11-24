import { useState } from 'react';
import './RoadmapImporter.css';

function RoadmapImporter({ onImport, loading }) {
  const [importing, setImporting] = useState(false);

  const handleImportExample = async () => {
    try {
      setImporting(true);
      
      // Mock данные для примера roadmap
      const exampleRoadmap = [
        {
          title: 'Vue.js',
          description: 'Прогрессивный фреймворк для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://vuejs.org']
        },
        {
          title: 'PostgreSQL',
          description: 'Продвинутая реляционная база данных',
          category: 'database',
          difficulty: 'intermediate',
          resources: ['https://postgresql.org']
        },
        {
          title: 'Kubernetes',
          description: 'Система оркестрации контейнеров',
          category: 'devops',
          difficulty: 'advanced',
          resources: ['https://kubernetes.io']
        }
      ];
      
      await onImport(exampleRoadmap);
      alert(`Успешно импортировано ${exampleRoadmap.length} технологий`);
      
    } catch (err) {
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>📋 Импорт дорожной карты</h3>
      
      <div className="import-section">
        <p className="import-description">
          Добавьте готовый набор технологий для изучения
        </p>
        
        <div className="import-actions">
          <button 
            onClick={handleImportExample}
            disabled={loading || importing}
            className="import-button"
          >
            {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoadmapImporter;