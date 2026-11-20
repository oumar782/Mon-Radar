import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-brand" style={{ marginBottom: '0.5rem' }}>
              <svg className="logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" stroke="var(--radar-green)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
                <circle cx="18" cy="18" r="10" stroke="var(--radar-green)" strokeWidth="1.5" opacity="0.8"/>
                <circle cx="18" cy="18" r="4" fill="var(--radar-green)"/>
                <path d="M18 18L30 10" stroke="var(--radar-green)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="30" cy="10" r="2.5" fill="#EF4444"/>
              </svg>
              <span>Mon Radar</span>
            </div>
            <p>
              L’outil d’analyse commerciale qui transforme tes données de ventes et de stock en indicateurs, tendances et alertes WhatsApp.
            </p>
          </div>

          <div className="footer-col">
            <h5>Produit</h5>
            <ul className="footer-links">
              <li><a href="#demo" className="footer-link">Démo interactive</a></li>
              <li><a href="#how-it-works" className="footer-link">Comment ça marche</a></li>
              <li><a href="#packs" className="footer-link">Packs métier</a></li>
              <li><a href="#pricing" className="footer-link">Tarifs</a></li>
              <li><a href="#calculator" className="footer-link">Calculateur de valeur</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Commerces</h5>
            <ul className="footer-links">
              <li><a href="#packs" className="footer-link">Épiceries & Bio</a></li>
              <li><a href="#packs" className="footer-link">Boutiques de mode</a></li>
              <li><a href="#packs" className="footer-link">Restaurants & Bars</a></li>
              <li><a href="#packs" className="footer-link">Pharmacies</a></li>
              <li><a href="#packs" className="footer-link">E-commerce & D2C</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Sécurité & Légal</h5>
            <ul className="footer-links">
              <li><a href="#faq" className="footer-link">Sécurité & Chiffrement</a></li>
              <li><a href="#faq" className="footer-link">Conformité RGPD</a></li>
              <li><a href="#faq" className="footer-link">Mentions légales</a></li>
              <li><a href="#faq" className="footer-link">Confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Mon Radar SAS — Fait avec passion pour les commerçants indépendants.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="pulse-dot"></span>
            Analyse des ventes et des stocks
          </p>
        </div>
      </div>
    </footer>
  );
}
