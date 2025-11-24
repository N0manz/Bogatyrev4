function ProgressBar({
  progress,
  label = '',
  color = '#000000',
  height = 20,
  showPercentage = true,
  animated = false
}) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar-container">
      {(label || showPercentage) && (
        <div className="progress-bar-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}

      <div
        className="progress-bar-outer"
        style={{
          height: `${height}px`,
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          className={`progress-bar-inner ${animated ? 'animated' : ''}`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: color,
            height: '100%',
            transition: animated ? 'width 0.5s ease-in-out' : 'none',
            borderRadius: '10px',
            minWidth: normalizedProgress > 0 ? '2px' : '0'
          }}
        />
        
        {/* Показываем 0% текст если прогресс 0 */}
        {normalizedProgress === 0 && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            pointerEvents: 'none'
          }}>
            0%
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;