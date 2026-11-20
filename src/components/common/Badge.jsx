import React from 'react';

export default function Badge({ level, children }) {
  let styleClass = 'badge-success';
  if (level === 'critical') styleClass = 'badge-critical';
  if (level === 'warning') styleClass = 'badge-warning';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      padding: '0.2rem 0.65rem',
      borderRadius: '9999px',
      fontSize: '0.725rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      backgroundColor: level === 'critical' ? 'var(--accent-critical-bg)' : level === 'warning' ? 'var(--accent-warning-bg)' : 'var(--accent-success-bg)',
      color: level === 'critical' ? 'var(--accent-critical)' : level === 'warning' ? 'var(--accent-warning)' : 'var(--accent-success)',
      border: `1px solid ${level === 'critical' ? 'var(--accent-critical-border)' : level === 'warning' ? 'var(--accent-warning-border)' : 'var(--accent-success-border)'}`
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: 'currentColor'
      }} />
      {children}
    </span>
  );
}
