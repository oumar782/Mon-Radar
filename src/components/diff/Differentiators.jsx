import React from 'react';
import { DIFFERENTIATORS } from '../../data/faqData';

export default function Differentiators() {
  const getIcon = (tag) => {
    switch (tag) {
      case 'INTEGRATION':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        );
      case 'FLUIDITE':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
          </svg>
        );
      case 'ANTICIPATION':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        );
    }
  };

  return (
    <section className="diff-section" id="differentiators">
      <div className="container">
        <div className="section-header">
          <div className="section-pill">Avantages Compétitifs</div>
          <h2 className="section-title">
            Conçu pour le terrain, <br />
            <span className="highlight">orienté rentabilité immédiate.</span>
          </h2>
          <p className="section-subtitle">
            Pourquoi les commerces indépendants choisissent Mon Radar plutôt que des tableaux de bord analytiques complexes.
          </p>
        </div>

        <div className="diff-grid">
          {DIFFERENTIATORS.map((item, idx) => (
            <div key={idx} className="diff-card">
              <div className="diff-icon">{getIcon(item.tag)}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
