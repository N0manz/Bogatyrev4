const ThemeToggle = ({ isDarkTheme, onToggle }) => {
  return (
    <button 
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDarkTheme ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      <div className={`toggle-track ${isDarkTheme ? 'dark' : 'light'}`}>
        <div className="toggle-thumb">
          {isDarkTheme ? '🌙' : '☀️'}
        </div>
      </div>
      <span className="toggle-label">
        {isDarkTheme ? 'Темная тема' : 'Светлая тема'}
      </span>
    </button>
  )
}

export default ThemeToggle