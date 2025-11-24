import { useState, useEffect, useCallback } from 'react';
import './TechnologySearch.css';

function TechnologySearch({ onSearch, searchResults, searchLoading, onAddTechnology }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce функция
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // Оптимизированная функция поиска
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        await onSearch(searchQuery);
        setIsSearching(false);
      }
    }, 500),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleAddTechnology = (tech) => {
    onAddTechnology(tech);
    setQuery('');
  };

  return (
    <div className="technology-search">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск технологий в базе данных..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {(searchLoading || isSearching) && (
          <div className="search-spinner"></div>
        )}
      </div>

      {query && (
        <div className="search-results">
          {searchResults.length > 0 ? (
            <div className="results-list">
              {searchResults.map(tech => (
                <div key={tech.id} className="search-result-item">
                  <div className="result-info">
                    <h4>{tech.title}</h4>
                    <p>{tech.description}</p>
                    <div className="result-meta">
                      <span className="category">{tech.category}</span>
                      <span className="difficulty">{tech.difficulty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddTechnology(tech)}
                    className="add-button"
                  >
                    Добавить
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !searchLoading && !isSearching && (
              <div className="no-results">
                Технологии не найдены
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologySearch;