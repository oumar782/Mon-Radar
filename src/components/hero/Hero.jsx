import React from 'react';
import RadarHeroVisual from './RadarHeroVisual';

export default function Hero() {
  const scrollToDemo = (e) => {
    e.preventDefault();
    const demoEl = document.getElementById('demo');
    if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHow = (e) => {
    e.preventDefault();
    const howEl = document.getElementById('how-it-works');
    if (howEl) howEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="pulse-dot"></span>
              <span>Vos ventes et vos stocks, enfin lisibles</span>
            </div>

            <h1 className="hero-title">
              Comprends ton activité. <br />
              <span className="gradient-text">Décide avec tes données.</span>
            </h1>

            <p className="hero-subtitle">
              Saisis ou importe tes ventes et tes stocks : Mon Radar calcule tes indicateurs, révèle les tendances de ton marché et repère les évolutions inhabituelles. Tu reçois sur WhatsApp une synthèse claire pour garder un œil sur ton activité et agir au bon moment.
            </p>

            <div className="hero-cta-group">
              <a href="#demo" onClick={scrollToDemo} className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Essayer la démo interactive
              </a>
              <a href="#how-it-works" onClick={scrollToHow} className="btn btn-secondary">
                Voir comment ça marche
              </a>
            </div>

            <div className="hero-proof">
              <div className="hero-proof-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Sans logiciel à installer</span>
              </div>
              <div className="hero-proof-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Compatible Excel, CSV & Caisses</span>
              </div>
              <div className="hero-proof-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Direct sur WhatsApp</span>
              </div>
            </div>
          </div>

          <RadarHeroVisual />
        </div>
      </div>
    </section>
  );
}
