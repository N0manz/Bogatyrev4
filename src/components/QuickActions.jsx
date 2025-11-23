import { useState } from 'react'
import Modal from './Modal'
import './QuickActions.css'

const QuickActions = ({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) => {
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportData, setExportData] = useState('')

  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length
  const completedCount = technologies.filter(tech => tech.status === 'completed').length

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      totalTechnologies: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length,
      technologies: technologies
    }
    
    const dataStr = JSON.stringify(data, null, 2)
    setExportData(dataStr)
    setShowExportModal(true)
  }

  const downloadExport = () => {
    const blob = new Blob([exportData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `technology-tracker-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportData)
      alert('Данные скопированы в буфер обмена!')
    } catch (err) {
      console.error('Ошибка копирования: ', err)
    }
  }

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-grid">
        <button 
          className="action-btn action-btn--complete"
          onClick={onMarkAllCompleted}
          disabled={completedCount === technologies.length}
        >
          ✅ Отметить все как выполненные
        </button>
        
        <button 
          className="action-btn action-btn--reset"
          onClick={onResetAll}
          disabled={completedCount === 0}
        >
          🔄 Сбросить все статусы
        </button>
        
        <button 
          className="action-btn action-btn--random"
          onClick={onRandomNext}
          disabled={notStartedCount === 0}
        >
          🎲 Случайный выбор следующей технологии
        </button>

        <button 
          className="action-btn action-btn--export"
          onClick={handleExport}
        >
          📤 Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="export-modal">
          <p>Данные успешно подготовлены для экспорта!</p>
          <div className="export-stats">
            <div>Всего технологий: <strong>{technologies.length}</strong></div>
            <div>Изучено: <strong>{completedCount}</strong></div>
            <div>В процессе: <strong>{technologies.filter(t => t.status === 'in-progress').length}</strong></div>
            <div>Не начато: <strong>{notStartedCount}</strong></div>
          </div>
          
          <div className="export-actions">
            <button 
              className="export-btn export-btn--download"
              onClick={downloadExport}
            >
              💾 Скачать JSON
            </button>
            <button 
              className="export-btn export-btn--copy"
              onClick={copyToClipboard}
            >
              📋 Копировать в буфер
            </button>
          </div>
          
          <details className="export-preview">
            <summary>Предпросмотр данных</summary>
            <pre className="export-data">{exportData}</pre>
          </details>
        </div>
      </Modal>
    </div>
  )
}

export default QuickActions