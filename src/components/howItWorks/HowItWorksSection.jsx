import React from 'react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Saisis ou importe tes données',
      desc: 'Ajoute tes ventes et tes niveaux de stock manuellement ou importe un fichier Excel ou CSV de ta caisse.',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Données structurées',
      desc: 'Mon Radar organise les dates, produits, quantités et montants pour rapprocher les ventes des niveaux de stock.',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      num: '03',
      title: 'Calculs et tendances',
      desc: 'Les indicateurs se mettent à jour automatiquement : évolutions des ventes, rotation du stock, croissance et variations inhabituelles.',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"></circle>
          <circle cx="12" cy="12" r="3"></circle>
          <line x1="12" y1="3" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      num: '04',
      title: 'Synthèse sur WhatsApp',
      desc: 'Reçois les tendances à suivre et les anomalies détectées dans un résumé clair, directement sur WhatsApp.',
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-pill">Processus</div>
          <h2 className="section-title">
            De tes données à une vision claire. <br />
            <span className="highlight">Les calculs se font automatiquement.</span>
          </h2>
          <p className="section-subtitle">
            Saisis tes ventes et ton stock, puis retrouve les indicateurs utiles pour comprendre l’évolution de ton activité.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="step-number">{step.num}</div>
                <div style={{ color: 'var(--radar-green)' }}>{step.svg}</div>
              </div>
              <h3 style={{ marginTop: '0.5rem' }}>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
