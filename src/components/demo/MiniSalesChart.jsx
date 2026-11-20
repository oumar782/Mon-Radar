import React, { useState, useMemo } from 'react';

// Generates smooth cubic Bézier curve SVG path
function getCurvedPath(points) {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function MiniSalesChart({ salesHistory }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Generate real calendar dates for the 7 points ending today
  const enrichedData = useMemo(() => {
    if (!salesHistory || salesHistory.length === 0) return [];
    const count = salesHistory.length;
    const now = new Date();

    return salesHistory.map((item, idx) => {
      // Days offset from today
      const daysAgo = count - 1 - idx;
      const date = new Date(now);
      date.setDate(now.getDate() - daysAgo);

      const dayNum = date.getDate();
      const monthShort = date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
      const weekdayShort = date.toLocaleDateString('fr-FR', { weekday: 'short' });
      const fullDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      let shortLabel = `${weekdayShort.charAt(0).toUpperCase() + weekdayShort.slice(1)} ${dayNum}`;
      if (daysAgo === 0) shortLabel = 'Auj.';
      else if (daysAgo === 1) shortLabel = 'Hier';

      const diffPct = item.normal
        ? Math.round(((item.sales - item.normal) / item.normal) * 100)
        : 0;

      return {
        ...item,
        dateObj: date,
        fullDate: fullDate.charAt(0).toUpperCase() + fullDate.slice(1),
        shortLabel,
        monthShort,
        dayNum,
        diffPct
      };
    });
  }, [salesHistory]);

  if (enrichedData.length === 0) return null;

  // Chart dimensions & coordinates
  const width = 420;
  const height = 155;
  const padLeft = 46;
  const padRight = 20;
  const padTop = 18;
  const padBottom = 32;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const maxVal = Math.max(
    ...enrichedData.map((d) => Math.max(d.sales || 0, d.normal || 0))
  ) * 1.14;
  const minVal = 0;

  const getX = (idx) => padLeft + (idx / (enrichedData.length - 1)) * plotW;
  const getY = (val) => padTop + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;

  const salesPoints = enrichedData.map((d, i) => ({ x: getX(i), y: getY(d.sales) }));
  const normalPoints = enrichedData.map((d, i) => ({ x: getX(i), y: getY(d.normal) }));

  const curvedSalesPath = getCurvedPath(salesPoints);
  const curvedNormalPath = getCurvedPath(normalPoints);

  // Closed area polygon
  const areaPath = `${curvedSalesPath} L ${salesPoints[salesPoints.length - 1].x} ${padTop + plotH} L ${salesPoints[0].x} ${padTop + plotH} Z`;

  const anomalyItem = enrichedData.find((d) => d.anomaly);
  const activeItem = hoveredIdx !== null ? enrichedData[hoveredIdx] : null;
  const activePt = hoveredIdx !== null ? salesPoints[hoveredIdx] : null;

  // Y-axis grid values
  const yTicks = [
    Math.round(maxVal * 0.95),
    Math.round(maxVal * 0.55),
    Math.round(maxVal * 0.15)
  ];

  return (
    <div className="chart-container-pro">
      {/* Header */}
      <div className="chart-pro-header">
        <div className="chart-pro-title-wrap">
          <div className="chart-live-indicator">
            <span className="pulse-dot"></span>
            <h4>Activité des ventes & flux réel</h4>
          </div>
          <span className="chart-pro-subtitle">
            7 derniers jours synchronisés • Réel vs Prévisionnel
          </span>
        </div>

        {anomalyItem && (
          <div className="chart-anomaly-pill" title={anomalyItem.reason}>
            <span className="chart-anomaly-dot"></span>
            <span>Signal : {anomalyItem.reason}</span>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="chart-canvas-wrapper" onMouseLeave={() => setHoveredIdx(null)}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="chart-pro-svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Turf Green Gradient */}
            <linearGradient id="turfAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18BA4C" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#18BA4C" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#18BA4C" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing Stroke Filter */}
            <filter id="turfGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#18BA4C" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-labels */}
          {yTicks.map((tickVal, i) => {
            const y = getY(tickVal);
            return (
              <g key={i} className="chart-grid-group">
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  className="chart-grid-line"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="chart-y-label"
                >
                  {tickVal.toLocaleString('fr-FR')} €
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#turfAreaGrad)" />

          {/* Baseline (prévisionnel attendu) */}
          <path
            d={curvedNormalPath}
            fill="none"
            stroke="#64748B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.65"
          />

          {/* Main Sales Spline */}
          <path
            d={curvedSalesPath}
            fill="none"
            stroke="var(--turf-green-bright)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#turfGlow)"
          />

          {/* Active hover crosshair vertical guide */}
          {activePt && (
            <line
              x1={activePt.x}
              y1={padTop}
              x2={activePt.x}
              y2={padTop + plotH}
              stroke="rgba(24, 186, 76, 0.45)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}

          {/* Points & X-Labels */}
          {enrichedData.map((d, i) => {
            const pt = salesPoints[i];
            const isAnomaly = d.anomaly;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                className="chart-point-group"
                onMouseEnter={() => setHoveredIdx(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Hit area */}
                <rect
                  x={pt.x - 18}
                  y={padTop}
                  width="36"
                  height={plotH + padBottom}
                  fill="transparent"
                />

                {/* Pulsing anomaly ring */}
                {isAnomaly && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 10 : 8}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    opacity="0.9"
                  />
                )}

                {/* Point dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : isAnomaly ? 4.5 : 3.5}
                  fill={isAnomaly ? '#EF4444' : 'var(--turf-green-bright)'}
                  stroke="#070B14"
                  strokeWidth="2"
                  style={{ transition: 'all 0.15s ease' }}
                />

                {/* Real Date Label */}
                <text
                  x={pt.x}
                  y={height - 10}
                  textAnchor="middle"
                  className={`chart-x-date ${isHovered ? 'hovered' : ''} ${isAnomaly ? 'anomaly' : ''}`}
                >
                  {d.shortLabel}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip with Real Date & Accurate Figures */}
        {activeItem && activePt && (
          <div
            className="chart-pro-tooltip"
            style={{
              left: `${Math.min(Math.max(activePt.x, 80), width - 80)}px`,
              top: `${Math.max(10, activePt.y - 68)}px`
            }}
          >
            <div className="tooltip-date">{activeItem.fullDate}</div>
            <div className="tooltip-main-val">
              <span className="tooltip-amount">
                {activeItem.sales.toLocaleString('fr-FR')} €
              </span>
              <span
                className={`tooltip-diff ${activeItem.diffPct >= 0 ? 'pos' : 'neg'}`}
              >
                {activeItem.diffPct >= 0 ? `+${activeItem.diffPct}%` : `${activeItem.diffPct}%`}
              </span>
            </div>
            {activeItem.anomaly ? (
              <div className="tooltip-anomaly-note">
                Attention : {activeItem.reason}
              </div>
            ) : (
              <div className="tooltip-normal-note">
                Attendu : {activeItem.normal.toLocaleString('fr-FR')} €
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart Footer Legend */}
      <div className="chart-pro-legend">
        <div className="legend-entry">
          <span className="legend-turf-line"></span>
          <span>Ventes réelles enregistrées</span>
        </div>
        <div className="legend-entry">
          <span className="legend-dashed-line"></span>
          <span>Moyenne de référence</span>
        </div>
        <div className="legend-entry">
          <span className="legend-alert-dot"></span>
          <span>Anomalie détectée par IA</span>
        </div>
      </div>
    </div>
  );
}
