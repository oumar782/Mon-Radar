import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Hero from './components/hero/Hero';
import ProblemSection from './components/problem/ProblemSection';
import HowItWorksSection from './components/howItWorks/HowItWorksSection';
import InteractiveDemo from './components/demo/InteractiveDemo';
import BusinessPacks from './components/packs/BusinessPacks';
import Differentiators from './components/diff/Differentiators';
import PricingSection from './components/pricing/PricingSection';
import ValueCalculator from './components/calculator/ValueCalculator';
import FaqSection from './components/faq/FaqSection';
import FinalCta from './components/cta/FinalCta';
import Footer from './components/common/Footer';

// Global styles
import './styles/variables.css';
import './styles/global.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/demo.css';
import './styles/sections.css';
import './styles/calculator-pricing.css';

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-root">
      {/* 1. Header & Navigation */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Le Problème (Constat terrain) */}
        <ProblemSection />

        {/* 4. Comment ça marche (4 étapes) */}
        <HowItWorksSection />

        {/* 5. Démo Interactive (Cœur du prototype) */}
        <InteractiveDemo />

        {/* 6. Alertes universelles + Packs métier */}
        <BusinessPacks />

        {/* 7. Ce qui nous différencie (4 piliers) */}
        <Differentiators />

        {/* 8. Tarifs & Offre Pro mise en avant */}
        <PricingSection />

        {/* 9. Calculateur de valeur & ROI */}
        <ValueCalculator />

        {/* 10. FAQ (5 questions incontournables) */}
        <FaqSection />

        {/* 11. Appel à l'action final & Inscription */}
        <FinalCta />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
