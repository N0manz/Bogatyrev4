import './SearchBar.css'

const SearchBar = ({ searchQuery, onSearchChange, resultsCount, totalCount }) => {
  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <div className="search-bar__input-wrapper">
          <input
            type="text"
            placeholder="Поиск по технологиям..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-bar__input"
          />
          <span className="search-bar__icon">🔍</span>
        </div>
        
        <div className="search-bar__results">
          Найдено: <strong>{resultsCount}</strong> из <strong>{totalCount}</strong> технологий
        </div>
      </div>
      
      {searchQuery && (
        <button 
          className="search-bar__clear"
          onClick={() => onSearchChange('')}
        >
          Очистить поиск
        </button>
      )}
    </div>
  )
}

export default SearchBar