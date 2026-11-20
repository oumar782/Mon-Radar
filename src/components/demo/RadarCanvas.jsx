import React from 'react';

export default function RadarCanvas({ points, onSelectPoint, selectedPointId }) {
  return (
    <div className="mini-radar-container">
      <div className="mini-radar">
        <div className="radar-circle radar-circle-1" style={{ width: 45, height: 45 }}></div>
        <div className="radar-circle radar-circle-2" style={{ width: 90, height: 90 }}></div>
        <div className="radar-circle radar-circle-3" style={{ width: 135, height: 135 }}></div>
        <div className="radar-crosshair-x"></div>
        <div className="radar-crosshair-y"></div>
        
        {/* Sweep beam */}
        <div className="radar-sweep"></div>

        {/* Dynamic points */}
        {points.map((pt) => {
          let color = '#18BA4C';
          if (pt.level === 'critical') color = '#EF4444';
          if (pt.level === 'warning') color = '#F59E0B';

          const isSelected = selectedPointId === pt.id;

          return (
            <div
              key={pt.id}
              onClick={() => onSelectPoint(pt)}
              style={{
                position: 'absolute',
                top: `${pt.y}%`,
                left: `${pt.x}%`,
                transform: 'translate(-50%, -50%)',
                width: isSelected ? 16 : 12,
                height: isSelected ? 16 : 12,
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: `0 0 ${isSelected ? 16 : 10}px ${color}`,
                cursor: 'pointer',
                zIndex: 4,
                border: isSelected ? '2px solid white' : 'none',
                transition: 'all 0.2s ease'
              }}
              title={`${pt.label} (${pt.level})`}
            />
          );
        })}
      </div>

      <div className="mini-radar-legend">
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#EF4444' }}></span>
          Critique
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#F59E0B' }}></span>
          Vigilance
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#18BA4C' }}></span>
          Opportunité
        </span>
      </div>
    </div>
  );
}
