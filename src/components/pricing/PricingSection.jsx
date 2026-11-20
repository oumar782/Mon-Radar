import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/faqData';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-pill">Tarification Transparente</div>
          <h2 className="section-title">
            Une vision plus claire de l’activité. <br />
            <span className="highlight">Ventes, stock et tendances au même endroit.</span>
          </h2>
          <p className="section-subtitle">
            Sans engagement, sans frais cachés. Période d'évaluation de 14 jours incluse.
          </p>
        </div>

        {/* Annual / Monthly Toggle */}
        <div className="pricing-billing-toggle">
          <span 
            className={`billing-label ${!isAnnual ? 'active' : ''}`}
            onClick={() => setIsAnnual(false)}
          >
            Facturation mensuelle
          </span>
          <div 
            className={`toggle-switch ${isAnnual ? 'annual' : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
            role="switch"
            aria-checked={isAnnual}
          >
            <div className="toggle-knob"></div>
          </div>
          <span 
            className={`billing-label ${isAnnual ? 'active' : ''}`}
            onClick={() => setIsAnnual(true)}
          >
            Facturation annuelle
            <span className="annual-badge">-20% d'économie</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => {
            const price = typeof plan.monthlyPrice === 'number'
              ? (isAnnual ? plan.annualPrice : plan.monthlyPrice)
              : plan.monthlyPrice;

            return (
              <div key={plan.id} className={`pricing-card ${plan.popular ? 'featured' : ''}`}>
                {plan.popular && <div className="popular-badge">Recommandé — Choix majoritaire</div>}

                <div className="pricing-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.desc}</p>
                </div>

                <div className="plan-price-box">
                  {typeof price === 'number' ? (
                    <>
                      <span className="plan-price">{price} €</span>
                      <span className="plan-period">/ mois HT</span>
                    </>
                  ) : (
                    <span className="plan-price" style={{ fontSize: '2.2rem' }}>{price}</span>
                  )}
                </div>

                <ul className="pricing-features-list">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="pricing-feature-item">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="#cta" 
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* Slogan de valeur obligatoire */}
        <div className="pricing-value-banner">
          <strong>« Des données bien lues aident à prendre de meilleures décisions. »</strong>
        </div>
      </div>
    </section>
  );
}
