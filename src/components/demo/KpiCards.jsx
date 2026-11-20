import React from 'react';

export default function KpiCards({ kpis }) {
  return (
    <div className="kpi-grid">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="kpi-card">
          <div className="kpi-header">
            <span>{kpi.label}</span>
          </div>
          <div className="kpi-value">{kpi.value}</div>
          <div className={`kpi-trend ${kpi.type}`}>
            {kpi.type === 'positive' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            )}
            {kpi.type === 'critical' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
              </svg>
            )}
            {kpi.type === 'warning' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polygon points="12 2 2 22 22 22 12 2"></polygon>
              </svg>
            )}
            <span>{kpi.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
