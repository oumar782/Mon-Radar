import React, { useState } from 'react';
import { COMMERCE_DATA } from '../../data/mockData';

export default function BusinessPacks() {
  const [activePackKey, setActivePackKey] = useState('epicerie');
  const commerce = COMMERCE_DATA[activePackKey];

  return (
    <section className="packs-section" id="packs">
      <div className="container">
        <div className="section-header">
          <div className="section-pill">Spécialisation Sectorielle</div>
          <h2 className="section-title">
            Un socle universel, <br />
            <span className="highlight">des analyses adaptées à votre secteur.</span>
          </h2>
          <p className="section-subtitle">
            Compare ventes, niveaux de stock et évolutions selon les indicateurs qui comptent dans ton activité.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="packs-selector">
          {Object.keys(COMMERCE_DATA).map((key) => {
            const item = COMMERCE_DATA[key];
            const isActive = activePackKey === key;
            return (
              <button
                key={key}
                className={`pack-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActivePackKey(key)}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Pack Content Showcase */}
        <div className="pack-content-grid">
          <div className="pack-details-card">
            <div>
              <h3>Pack Spécialisé : {commerce.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{commerce.subtitle}</p>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Mon Radar met en relation les ventes, les quantités disponibles et l’historique pour faire ressortir les indicateurs propres à {commerce.name.toLowerCase()}.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--radar-green)', fontWeight: 700 }}>—</span>
                <span>Suivi des ventes et des évolutions par produit</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--radar-green)', fontWeight: 700 }}>—</span>
                <span>Calcul automatique de la rotation et des niveaux de stock</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--radar-green)', fontWeight: 700 }}>—</span>
                <span>Repérage des croissances et variations inhabituelles</span>
              </div>
            </div>
          </div>

          <div className="pack-details-card" style={{ background: 'var(--bg-secondary)' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Signaux et alertes types générés :
            </h4>
            <div className="pack-examples-list">
              {commerce.alerts.map((al, idx) => (
                <div key={idx} className={`pack-example-item ${al.level}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{al.title}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--radar-green)', fontWeight: 600 }}>{al.badge}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{al.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
