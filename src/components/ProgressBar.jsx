function ProgressBar({
  progress,
  label = '',
  color = '#4CAF50',
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
          backgroundColor: '#2a2a2a',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #333'
        }}
      >
        <div
          className={`progress-bar-inner ${animated ? 'animated' : ''}`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: color,
            height: '100%',
            transition: animated ? 'width 0.5s ease-in-out' : 'none',
            borderRadius: '10px'
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;