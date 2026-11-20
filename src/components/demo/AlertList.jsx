import React from 'react';
import Badge from '../common/Badge';

export default function AlertList({ alerts, selectedAlertId, onSelectAlert, onSendAlertToChat }) {
  const renderAlertIcon = (level) => {
    if (level === 'critical') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      );
    }
    if (level === 'warning') {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      );
    }
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    );
  };

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <h4>
          <span>Radar opérationnel</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--radar-green)', fontWeight: 600 }}>
            {alerts.length} détections actives
          </span>
        </h4>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Sélectionnez une alerte pour l'adresser au canal WhatsApp
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {alerts.map((alert) => {
          const isSelected = selectedAlertId === alert.id;
          return (
            <div
              key={alert.id}
              className={`alert-card ${alert.level} ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                onSelectAlert(alert);
                onSendAlertToChat(alert);
              }}
            >
              <div className="alert-icon-wrapper">
                {renderAlertIcon(alert.level)}
              </div>

              <div className="alert-body">
                <div className="alert-top">
                  <span className="alert-title">{alert.title}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <p className="alert-desc">{alert.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <Badge level={alert.level}>{alert.badge}</Badge>
                  <button 
                    className="alert-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAlert(alert);
                      onSendAlertToChat(alert);
                    }}
                  >
                    <span>{alert.actionText}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
