import React from 'react';

export default function Header({ theme, toggleTheme }) {
  const scrollToDemo = (e) => {
    e.preventDefault();
    const demoEl = document.getElementById('demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo-brand">
            <svg className="logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" stroke="var(--radar-green)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
              <circle cx="18" cy="18" r="10" stroke="var(--radar-green)" strokeWidth="1.5" opacity="0.8"/>
              <circle cx="18" cy="18" r="4" fill="var(--radar-green)"/>
              <path d="M18 18L30 10" stroke="var(--radar-green)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="30" cy="10" r="2.5" fill="#EF4444"/>
            </svg>
            <span>Mon Radar</span>
          </a>

          <ul className="nav-links">
            <li><a href="#how-it-works" className="nav-link">Comment ça marche</a></li>
            <li><a href="#demo" className="nav-link" onClick={scrollToDemo}>Démo interactive</a></li>
            <li><a href="#packs" className="nav-link">Packs métier</a></li>
            <li><a href="#calculator" className="nav-link">Calculateur</a></li>
            <li><a href="#pricing" className="nav-link">Tarifs</a></li>
            <li><a href="#faq" className="nav-link">FAQ</a></li>
          </ul>

          <div className="header-actions">
            <div className="live-badge">
              <span className="pulse-dot"></span>
              <span>IA active</span>
            </div>

            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme} 
              aria-label="Basculer le mode clair/sombre"
              title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <a href="#demo" onClick={scrollToDemo} className="btn btn-primary btn-sm">
              Tester la démo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
