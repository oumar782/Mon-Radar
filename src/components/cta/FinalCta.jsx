import React, { useState } from 'react';

export default function FinalCta() {
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('epicerie');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="final-cta-section" id="cta">
      <div className="container">
        <div className="cta-box">
          <div className="section-pill" style={{ margin: '0 auto 1.5rem auto' }}>
            Accès Anticipé et Évaluation
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15 }}>
            Donnez du sens à vos chiffres. <br />
            <span className="highlight">Suivez votre activité au quotidien.</span>
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto' }}>
            Centralisez vos ventes et votre stock, suivez les évolutions et recevez les alertes utiles directement sur WhatsApp.
          </p>

          {!submitted ? (
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                className="cta-input"
                placeholder="Votre adresse email professionnelle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <select
                className="cta-select"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="epicerie">Épicerie / Alimentation</option>
                <option value="mode">Boutique de Mode</option>
                <option value="restaurant">Restaurant / Bar</option>
                <option value="pharmacie">Pharmacie</option>
                <option value="ecommerce">E-commerce</option>
                <option value="services">Services / Artisanat</option>
                <option value="autre">Autre commerce</option>
              </select>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.95rem 1.8rem' }}>
                Demander un accès prioritaire
              </button>
            </form>
          ) : (
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(34, 227, 161, 0.15)',
              border: '1px solid var(--radar-green)',
              maxWidth: '520px',
              margin: '2rem auto 0 auto'
            }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800 }}>
                Demande prise en compte
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                L'adresse <strong>{email}</strong> est enregistrée pour votre commerce. Vous recevrez une invitation WhatsApp pour connecter vos premières données.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <span>Chiffrement bancaire AES-256</span>
            <span>—</span>
            <span>Données hébergées en Europe (RGPD)</span>
            <span>—</span>
            <span>Annulation en un clic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
