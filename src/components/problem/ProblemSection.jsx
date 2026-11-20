import React from 'react';

export default function ProblemSection() {
  const problems = [
    {
      stat: 'Ventes',
      statLabel: 'chiffre d’affaires, panier moyen, évolution',
      title: 'Une activité difficile à lire',
      desc: 'Les chiffres sont dispersés entre la caisse, les fichiers et les notes. Sans vue d’ensemble, il est difficile de savoir ce qui progresse et ce qui ralentit.',
      indicator: 'PERFORMANCE',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      )
    },
    {
      stat: 'Stock',
      statLabel: 'quantités, valeur et rythme de rotation',
      title: 'Un stock sans indicateurs clairs',
      desc: 'Sans rapprochement avec les ventes, les niveaux de stock sont difficiles à interpréter et les changements de rythme passent inaperçus.',
      indicator: 'NIVEAUX DE STOCK',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      stat: 'Tendances',
      statLabel: 'croissances et variations inhabituelles',
      title: 'Les signaux se perdent dans les données',
      desc: 'Comparer les périodes et repérer une variation atypique à travers des centaines de lignes prend du temps. Les évolutions importantes méritent d’être visibles.',
      indicator: 'ÉVOLUTIONS',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
          <polyline points="17 18 23 18 23 12"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section className="problem-section" id="problem">
      <div className="container">
        <div className="section-header">
          <div className="section-pill">Le constat</div>
          <h2 className="section-title">
            Vos chiffres racontent l’activité. <br />
            <span className="highlight">Encore faut-il pouvoir les lire.</span>
          </h2>
          <p className="section-subtitle">
            Ventes et stocks réunis dans une même analyse pour suivre les indicateurs, comprendre les variations et repérer les tendances du marché.
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((item, idx) => (
            <div key={idx} className="problem-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="problem-card-icon">{item.icon}</div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-critical)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                  [{item.indicator}]
                </span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <div className="problem-stat">{item.stat}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.15rem' }}>
                  {item.statLabel}
                </div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
