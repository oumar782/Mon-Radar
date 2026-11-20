import React, { useState } from 'react';

export default function ValueCalculator() {
  const [monthlySales, setMonthlySales] = useState(28000);
  const [stockValue, setStockValue] = useState(12400);
  const averageDailySales = monthlySales / 30;
  const estimatedStockCoverage = Math.round(stockValue / averageDailySales);
  const salesToStockRatio = monthlySales / stockValue;

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">
        <div className="section-header">
          <div className="section-pill">Indicateurs d’activité</div>
          <h2 className="section-title">
            Ventes et stock, mis en perspective. <br />
            <span className="highlight">Les ratios se calculent automatiquement.</span>
          </h2>
          <p className="section-subtitle">
            Ajuste les valeurs pour voir comment le chiffre d’affaires et le stock se traduisent en indicateurs de suivi.
          </p>
        </div>

        <div className="calc-wrapper">
          <div className="calc-sliders">
            {/* Slider 1: Monthly sales */}
            <div className="slider-group">
              <div className="slider-label-row">
                <span className="slider-label">Ventes mensuelles :</span>
                <span className="slider-value-display">{monthlySales.toLocaleString('fr-FR')} €</span>
              </div>
              <input
                type="range"
                min="5000"
                max="120000"
                step="1000"
                value={monthlySales}
                onChange={(e) => setMonthlySales(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>5 000 €</span>
                <span>50 000 €</span>
                <span>120 000 €</span>
              </div>
            </div>

            {/* Slider 2: Current stock value */}
            <div className="slider-group">
              <div className="slider-label-row">
                <span className="slider-label">Valeur du stock actuel :</span>
                <span className="slider-value-display">{stockValue.toLocaleString('fr-FR')} €</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={stockValue}
                onChange={(e) => setStockValue(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>1 000 €</span>
                <span>50 000 €</span>
                <span>100 000 €</span>
              </div>
            </div>

            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Estimation indicative : ventes et stock doivent être saisis sur une base de valorisation comparable.
            </p>
          </div>

          <div className="calc-result-box">
            <div className="calc-result-title">Ratio mensuel ventes / stock</div>
            <div className="calc-result-number">
              {salesToStockRatio.toFixed(1)}×
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block' }}>
                ventes rapportées au stock
              </span>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--radar-green)', fontWeight: 700, marginBottom: '1rem' }}>
              Couverture théorique du stock : environ {estimatedStockCoverage} jours
            </div>

            <div className="calc-breakdown">
              <div className="calc-breakdown-item">
                <span>Ventes mensuelles :</span>
                <span>{monthlySales.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="calc-breakdown-item">
                <span>Valeur du stock :</span>
                <span>{stockValue.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="calc-breakdown-item">
                <span>Ventes moyennes par jour :</span>
                <span>{Math.round(averageDailySales).toLocaleString('fr-FR')} €</span>
              </div>
            </div>

            <a href="#demo" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '1.5rem' }}>
              Explorer l’analyse interactive
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
