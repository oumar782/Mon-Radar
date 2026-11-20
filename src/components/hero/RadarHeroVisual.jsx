import React, { useState } from 'react';

export default function RadarHeroVisual() {
  const [activeBlip, setActiveBlip] = useState({
    title: 'Ventes en croissance (+12%)',
    desc: 'Épicerie • évolution de la semaine par rapport à la période précédente',
    color: '#EF4444',
    tag: 'TENDANCE'
  });

  const blips = [
    {
      id: 1,
      top: '32%',
      left: '70%',
      type: 'critical',
      title: 'Variation inhabituelle (-27%)',
      desc: 'Rayon Boissons : recul des ventes à comparer avec les périodes précédentes.',
      color: '#EF4444',
      tag: 'ANALYSE'
    },
    {
      id: 2,
      top: '68%',
      left: '26%',
      type: 'critical',
      title: 'Rotation du stock à suivre',
      desc: '12 références sans mouvement récent dans les données de stock.',
      color: '#EF4444',
      tag: 'STOCK'
    },
    {
      id: 3,
      top: '25%',
      left: '38%',
      type: 'warning',
      title: 'Tendance à la hausse (+40%)',
      desc: 'Huile d’olive bio : progression observée sur la période récente.',
      color: '#F59E0B',
      tag: 'CROISSANCE'
    },
    {
      id: 4,
      top: '72%',
      left: '68%',
      type: 'success',
      title: 'Croissance par catégorie (+18%)',
      desc: 'Une évolution positive se dessine dans les ventes de produits frais.',
      color: '#18BA4C',
      tag: 'TENDANCE'
    }
  ];

  return (
    <div className="hero-visual-container">
      <div className="radar-display">
        {/* HUD Compass / Range Marks */}
        <span className="radar-hud-label radar-hud-n">000°</span>
        <span className="radar-hud-label radar-hud-s">180°</span>
        <span className="radar-hud-label radar-hud-e">090°</span>
        <span className="radar-hud-label radar-hud-w">270°</span>

        <div className="radar-circle radar-circle-1"></div>
        <div className="radar-circle radar-circle-2"></div>
        <div className="radar-circle radar-circle-3"></div>
        <div className="radar-circle radar-circle-4"></div>
        
        <div className="radar-crosshair-x"></div>
        <div className="radar-crosshair-y"></div>

        {/* Continuous rotating beam */}
        <div className="radar-sweep"></div>

        {/* Pulsing Blips */}
        {blips.map((blip) => (
          <div
            key={blip.id}
            className={`radar-blip radar-blip-${blip.type}`}
            style={{ top: blip.top, left: blip.left }}
            onMouseEnter={() => setActiveBlip({ title: blip.title, desc: blip.desc, color: blip.color, tag: blip.tag })}
            title={blip.title}
          />
        ))}
      </div>

      {/* Floating WhatsApp Quick Preview Card */}
      <div className="hero-phone-floating">
        <div className="floating-wa-header">
          <div className="floating-wa-avatar">MR</div>
          <div className="floating-wa-info">
            <h5>Mon Radar</h5>
            <span>• En ligne sur WhatsApp</span>
          </div>
        </div>
        <div className="floating-wa-bubble" style={{ borderLeftColor: activeBlip.color }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: activeBlip.color, letterSpacing: '0.06em' }}>
              [{activeBlip.tag}]
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--wa-text-muted)' }}>08:02</span>
          </div>
          <strong style={{ color: activeBlip.color }}>{activeBlip.title}</strong>
          <p style={{ margin: 0, fontSize: '0.78rem' }}>{activeBlip.desc}</p>
        </div>
      </div>
    </div>
  );
}
