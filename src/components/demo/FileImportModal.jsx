import React, { useState } from 'react';

export default function FileImportModal({ isOpen, onClose, onImportComplete, commerceName }) {
  const [importing, setImporting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleStartSim = () => {
    setImporting(true);
    setCurrentStep(1);

    setTimeout(() => {
      setCurrentStep(2);
    }, 1200);

    setTimeout(() => {
      setCurrentStep(3);
    }, 2400);

    setTimeout(() => {
      setImporting(false);
      setCurrentStep(0);
      onImportComplete();
      onClose();
    }, 3400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          Simulation d'intégration de fichier
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Déposez un export Excel, CSV ou rapport d'encaissement ({commerceName}). Le moteur modélise automatiquement vos flux.
        </p>

        {!importing ? (
          <div className="dropzone-box" onClick={handleStartSim}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--radar-green)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              Sélectionner le fichier modèle d'exemple
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Export_Ventes_et_Stocks_{commerceName.replace(/\s+/g, '_')}.xlsx (840 Ko)
            </p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: '1.25rem' }}>
              Lancer le traitement algorithmique
            </button>
          </div>
        ) : (
          <div className="sim-steps-container">
            <div className={`sim-step-item ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
              <span>[1/3]</span>
              <span>Analyse syntaxique et validation des colonnes de ventes...</span>
            </div>

            <div className={`sim-step-item ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
              <span>[2/3]</span>
              <span>Calcul des vélocités d'écoulement et des seuils de réassort...</span>
            </div>

            <div className={`sim-step-item ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}`}>
              <span>[3/3]</span>
              <span>Calibration terminée : Radar opérationnel activé.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
