import { useState, useRef } from 'react';
import './DataManager.css';

const DataManager = ({ technologies, onImportData }) => {
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef(null);

  const exportData = () => {
    const data = {
      technologies,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Валидация данных
        if (!data.technologies || !Array.isArray(data.technologies)) {
          throw new Error('Неверный формат файла');
        }

        // Проверяем обязательные поля
        const validTechnologies = data.technologies.every(tech => 
          tech.title && tech.description && tech.category
        );

        if (!validTechnologies) {
          throw new Error('В файле отсутствуют обязательные поля');
        }

        setImportError('');
        onImportData(data.technologies);
        
        // Сбрасываем input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        alert(`Успешно импортировано ${data.technologies.length} технологий`);
      } catch (error) {
        setImportError(`Ошибка импорта: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setImportError('Ошибка чтения файла');
    };

    reader.readAsText(file);
  };

  return (
    <div className="data-manager">
      <h3 className="data-manager__title">Управление данными</h3>
      
      <div className="data-manager__actions">
        <button
          onClick={exportData}
          className="data-manager__button data-manager__button--export"
          aria-describedby="export-description"
        >
          📤 Экспорт данных
        </button>
        <div id="export-description" className="data-manager__description">
          Скачайте резервную копию ваших технологий в JSON формате
        </div>

        <div className="data-manager__import-section">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="data-manager__file-input"
            id="import-file"
            aria-describedby="import-description"
          />
          <label htmlFor="import-file" className="data-manager__button data-manager__button--import">
            📥 Импорт данных
          </label>
          <div id="import-description" className="data-manager__description">
            Загрузите JSON файл с технологиями
          </div>
        </div>
      </div>

      {importError && (
        <div 
          className="data-manager__error"
          role="alert"
          aria-live="polite"
        >
          {importError}
        </div>
      )}

      <div className="data-manager__info">
        <strong>Формат файла:</strong> JSON с массивом technologies
        <br />
        <strong>Обязательные поля:</strong> title, description, category
      </div>
    </div>
  );
};

export default DataManager;