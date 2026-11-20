import React, { useEffect, useState } from 'react';

const API_BASE = (
  import.meta.env.VITE_DEMO_API_URL
  || (import.meta.env.PROD ? 'https://backradar.vercel.app/api/demo' : '/api/demo')
).replace(/\/$/, '');
const DEMO_SESSION_KEY = 'monradar-demo-session';
const DEMO_SESSION_DURATION = 15 * 60 * 1000;
const DEMO_EXPIRED_MESSAGE = 'Cette session de démonstration a expiré. Contactez l’équipe pour obtenir une nouvelle démo.';
let demoStartPromise;
const TABS = [
  { id: 'overview', label: 'Vue d’ensemble' },
  { id: 'profitability', label: 'Rentabilité' },
  { id: 'inventory', label: 'Stock & opérations' },
  { id: 'trends', label: 'Tendances' }
];

const numberValue = (value) => {
  if (typeof value === 'number') return value;
  const parsed = Number.parseFloat(String(value ?? '').replace(/[^\d,.-]/g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const moneyLabel = (value) => {
  if (typeof value === 'string' && /MAD/.test(value)) return value;
  return `${numberValue(value).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} MAD`;
};

const percentLabel = (value) => typeof value === 'string' && value.includes('%')
  ? value
  : `${numberValue(value).toLocaleString('fr-FR', { maximumFractionDigits: 2 })}%`;

function startDemoSession() {
  if (!demoStartPromise) {
    demoStartPromise = apiRequest('/demo/start', { method: 'POST' }).finally(() => {
      demoStartPromise = undefined;
    });
  }
  return demoStartPromise;
}

function updateSavedDemoSession(updates) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(DEMO_SESSION_KEY) || 'null');
    if (saved?.token) sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ ...saved, ...updates }));
  } catch {
    // Session storage is only a refresh recovery aid; the API token remains authoritative.
  }
}

const compactMoney = (value) => {
  const amount = numberValue(value);
  if (Math.abs(amount) >= 1_000_000) return `${(amount / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`;
  if (Math.abs(amount) >= 10_000) return `${(amount / 1_000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`;
  return amount.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
};

function Metric({ label, value, note, tone = 'green' }) {
  return (
    <article className={`analytics-metric ${tone}`}>
      <span className="analytics-metric-label">{label}</span>
      <strong>{value}</strong>
      {note && <span className="analytics-metric-note">{note}</span>}
    </article>
  );
}

function Panel({ title, eyebrow, action, children, className = '' }) {
  return (
    <section className={`analytics-panel ${className}`}>
      <div className="analytics-panel-heading">
        <div>
          {eyebrow && <span className="analytics-eyebrow">{eyebrow}</span>}
          <h3>{title}</h3>
        </div>
        {action && <span className="analytics-panel-action">{action}</span>}
      </div>
      {children}
    </section>
  );
}

function DataTable({ columns, rows, emptyText = 'Aucune donnée disponible pour cette analyse.' }) {
  if (!rows?.length) return <div className="analytics-empty-inline">{emptyText}</div>;
  return (
    <div className="analytics-table-wrap">
      <table className="analytics-table">
        <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.id ?? row.sku ?? row.name ?? row.month ?? row.store_name ?? 'row'}-${index}`}>
              {columns.map((column) => (
                <td key={column.key} className={column.className || ''}>
                  {column.render ? column.render(row[column.key], row) : (row[column.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MonthlyTrendChart({ rows = [] }) {
  const data = [...rows].sort((a, b) => String(a.month || '').localeCompare(String(b.month || '')));
  if (!data.length) return <div className="analytics-empty-inline">Pas encore assez d’historique mensuel.</div>;

  const width = 720;
  const height = 250;
  const left = 48;
  const right = 18;
  const top = 18;
  const bottom = 38;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const values = data.flatMap((item) => [numberValue(item.revenue), numberValue(item.profit)]);
  const minValue = Math.min(0, ...values);
  const maxValue = Math.max(1, ...values);
  const valueRange = maxValue - minValue || 1;
  const pointFor = (value, index) => ({
    x: left + (data.length === 1 ? plotWidth / 2 : (index / (data.length - 1)) * plotWidth),
    y: top + ((maxValue - numberValue(value)) / valueRange) * plotHeight
  });
  const revenuePath = data.map((item, index) => {
    const point = pointFor(item.revenue, index);
    return `${index ? 'L' : 'M'} ${point.x} ${point.y}`;
  }).join(' ');
  const profitPath = data.map((item, index) => {
    const point = pointFor(item.profit, index);
    return `${index ? 'L' : 'M'} ${point.x} ${point.y}`;
  }).join(' ');

  return (
    <div className="analytics-chart-area">
      <div className="analytics-chart-legend">
        <span><i className="legend-revenue" />Chiffre d’affaires</span>
        <span><i className="legend-profit" />Profit brut</span>
      </div>
      <svg className="analytics-line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Évolution mensuelle du chiffre d’affaires et du profit brut">
        {[0, 1, 2, 3].map((step) => {
          const y = top + (plotHeight / 3) * step;
          const value = maxValue - (valueRange * step / 3);
          return <g key={step}><line className={Math.abs(value) < valueRange / 1000 ? 'chart-zero-line' : ''} x1={left} x2={width - right} y1={y} y2={y} /><text x={left - 8} y={y + 4} textAnchor="end">{compactMoney(value)}</text></g>;
        })}
        <path className="chart-revenue-line" d={revenuePath} />
        <path className="chart-profit-line" d={profitPath} />
        {data.map((item, index) => {
          const revenue = pointFor(item.revenue, index);
          const profit = pointFor(item.profit, index);
          const monthLabel = item.month ? `${item.month.slice(5)}/${item.month.slice(2, 4)}` : `P${index + 1}`;
          return <g key={item.month || index}>
            <circle className="chart-revenue-point" cx={revenue.x} cy={revenue.y} r="4"><title>{monthLabel} · CA : {moneyLabel(item.revenue)}</title></circle>
            <circle className="chart-profit-point" cx={profit.x} cy={profit.y} r="3.5"><title>{monthLabel} · Profit : {moneyLabel(item.profit)}</title></circle>
            {(data.length <= 8 || index % 2 === 0 || index === data.length - 1) && <text className="chart-month-label" x={revenue.x} y={height - 10} textAnchor="middle">{monthLabel}</text>}
          </g>;
        })}
      </svg>
    </div>
  );
}

function CategoryChart({ rows = [] }) {
  const data = [...rows].sort((a, b) => numberValue(b.profit) - numberValue(a.profit)).slice(0, 6);
  if (!data.length) return <div className="analytics-empty-inline">Aucune catégorie à comparer.</div>;
  const max = Math.max(1, ...data.map((item) => Math.abs(numberValue(item.profit))));
  return (
    <div className="analytics-bars">
      {data.map((item) => {
        const value = numberValue(item.profit);
        return (
          <div className="analytics-bar-row" key={item.category || 'Sans catégorie'}>
            <span className="analytics-bar-label" title={item.category}>{item.category || 'Sans catégorie'}</span>
            <div className="analytics-bar-track" role="meter" aria-label={`Profit ${item.category || 'Sans catégorie'}`} aria-valuemin={0} aria-valuemax={max} aria-valuenow={Math.abs(value)}><span className={value < 0 ? 'negative' : ''} style={{ width: `${Math.max(3, (Math.abs(value) / max) * 100)}%` }} /></div>
            <strong>{moneyLabel(item.profit)}</strong>
          </div>
        );
      })}
    </div>
  );
}

function Recommendations({ rows = [] }) {
  if (!rows.length) return <div className="analytics-empty-inline">Aucune recommandation générée.</div>;
  return (
    <div className="recommendation-list">
      {rows.map((item, index) => (
        <article className="recommendation-row" key={`${item.category}-${index}`}>
          <span className={`recommendation-priority ${String(item.priority).toLowerCase()}`}>{item.priority}</span>
          <div><strong>{item.category}</strong><p>{item.action}</p><small>{item.impact}</small></div>
        </article>
      ))}
    </div>
  );
}

function Overview({ data }) {
  const summary = data.executive_summary || {};
  const abcRows = data.abc_analysis?.products || [];
  return (
    <div className="analytics-view">
      <div className="analytics-metrics-grid">
        <Metric label="Chiffre d’affaires" value={summary.total_revenue || '0,00 MAD'} note="Ventes enregistrées" tone="green" />
        <Metric label="Marge brute" value={summary.gross_margin || '0,00 MAD'} note={summary.gross_margin_pct || '0,00%'} tone="blue" />
        <Metric label="Panier moyen" value={summary.average_ticket || '0,00 MAD'} note={`${summary.total_transactions || 0} transactions`} tone="gold" />
        <Metric label="Marge nette" value={summary.net_margin || '0,00 MAD'} note={summary.net_margin_pct || '0,00%'} tone="coral" />
      </div>
      <div className="analytics-overview-grid">
        <Panel title="Trajectoire mensuelle" eyebrow="Performance" action={`${data.monthly_trends?.length || 0} mois`} className="analytics-span-2">
          <MonthlyTrendChart rows={data.monthly_trends} />
        </Panel>
        <Panel title="Répartition ABC" eyebrow="Contribution au CA" action="Pareto">
          <div className="abc-summary">
            {[
              ['A', abcRows.filter((item) => item.abc_class?.startsWith('A')).length, 'Classe A'],
              ['B', abcRows.filter((item) => item.abc_class?.startsWith('B')).length, 'Classe B'],
              ['C', abcRows.filter((item) => item.abc_class?.startsWith('C')).length, 'Classe C']
            ].map(([letter, count, label]) => <div className={`abc-count abc-${letter.toLowerCase()}`} key={letter}><strong>{count}</strong><span>{label}</span></div>)}
          </div>
          <DataTable columns={[
            { key: 'name', label: 'Produit' },
            { key: 'revenue', label: 'CA', render: moneyLabel },
            { key: 'abc_class', label: 'Classe', render: (value) => <span className={`class-tag ${String(value).charAt(0).toLowerCase()}`}>{String(value || '—').split(' ')[0]}</span> }
          ]} rows={abcRows.slice(0, 5)} />
        </Panel>
        <Panel title="À retenir" eyebrow="Recommandations stratégiques" className="analytics-span-3">
          <Recommendations rows={data.strategic_recommendations} />
        </Panel>
      </div>
    </div>
  );
}

function Profitability({ data }) {
  return (
    <div className="analytics-view">
      <div className="analytics-two-col">
        <Panel title="Profit par catégorie" eyebrow="Comparatif des performances"><CategoryChart rows={data.category_profitability} /></Panel>
        <Panel title="Concentration du chiffre d’affaires" eyebrow="Répartition des ventes">
          <p className="analytics-insight">{data.sales_concentration?.insight || 'Répartition indisponible.'}</p>
          <DataTable columns={[{ key: 'segment', label: 'Segment' }, { key: 'nb_products', label: 'Produits' }, { key: 'total_revenue', label: 'CA', render: moneyLabel }]} rows={data.sales_concentration?.segments} />
        </Panel>
      </div>
      <Panel title="Rentabilité par produit" eyebrow="Classement détaillé">
        <DataTable columns={[
          { key: 'name', label: 'Produit' }, { key: 'category', label: 'Catégorie' }, { key: 'qty_sold', label: 'Qté vendue' },
          { key: 'revenue', label: 'CA', render: moneyLabel }, { key: 'gross_profit', label: 'Profit brut', render: moneyLabel },
          { key: 'margin_pct', label: 'Marge', render: percentLabel }, { key: 'profitability_status', label: 'Diagnostic', render: (value) => <span className="status-chip">{value || '—'}</span> }
        ]} rows={data.product_profitability} />
      </Panel>
      <div className="analytics-two-col">
        <Panel title="Performance par magasin" eyebrow="Comparaison réseau">
          <DataTable columns={[{ key: 'store_name', label: 'Magasin' }, { key: 'nb_transactions', label: 'Transactions' }, { key: 'revenue', label: 'CA', render: moneyLabel }, { key: 'profit', label: 'Profit', render: moneyLabel }]} rows={data.store_profitability} />
        </Panel>
        <Panel title="Produits vendus à perte" eyebrow="Action prioritaire">
          <DataTable columns={[{ key: 'name', label: 'Produit' }, { key: 'qty_sold', label: 'Qté' }, { key: 'loss_per_unit', label: 'Perte / unité', render: moneyLabel }, { key: 'total_loss', label: 'Perte totale', render: moneyLabel }]} rows={data.loss_making_products} />
        </Panel>
      </div>
      <div className="analytics-two-col">
        <Panel title="Marge par tranche de prix" eyebrow="Structure tarifaire">
          <DataTable columns={[{ key: 'price_range', label: 'Tranche' }, { key: 'qty_sold', label: 'Quantités' }, { key: 'revenue', label: 'CA', render: moneyLabel }, { key: 'margin_pct', label: 'Marge', render: percentLabel }]} rows={data.margin_by_price_range} />
        </Panel>
        <Panel title="Meilleurs leviers" eyebrow="Marge × volume">
          <DataTable columns={[{ key: 'name', label: 'Produit' }, { key: 'volume', label: 'Volume' }, { key: 'profit', label: 'Profit', render: moneyLabel }, { key: 'strategic_position', label: 'Position' }]} rows={data.top_performers} />
        </Panel>
      </div>
      <Panel title="Positionnement prix-volume" eyebrow="Lecture du portefeuille">
        <DataTable columns={[{ key: 'name', label: 'Produit' }, { key: 'avg_price', label: 'Prix moyen', render: moneyLabel }, { key: 'total_qty', label: 'Quantité' }, { key: 'total_revenue', label: 'CA estimé', render: moneyLabel }, { key: 'market_position', label: 'Positionnement' }]} rows={data.price_volume_correlation} />
      </Panel>
    </div>
  );
}

function Inventory({ data }) {
  const hidden = data.hidden_costs || {};
  return (
    <div className="analytics-view">
      <div className="analytics-metrics-grid">
        <Metric label="Remises accordées" value={hidden.total_discounts || '0,00 MAD'} note={`${hidden.discount_rate_pct || '0%'} du CA`} tone="gold" />
        <Metric label="Pertes de stock" value={hidden.inventory_loss_cost || '0,00 MAD'} note="Coût déclaré des pertes" tone="coral" />
        <Metric label="Remise moyenne" value={hidden.avg_discount || '0,00 MAD'} note={`${hidden.nb_discounted_sales || 0} ventes remisées`} tone="blue" />
        <Metric label="Articles vendus" value={data.executive_summary?.total_items_sold || 0} note="Unités cumulées" tone="green" />
      </div>
      <Panel title="Mouvements de stock" eyebrow="Flux et valorisation">
        <DataTable columns={[{ key: 'movement_type', label: 'Type de mouvement' }, { key: 'nb_movements', label: 'Opérations' }, { key: 'total_quantity', label: 'Quantité nette' }, { key: 'total_value', label: 'Valeur', render: moneyLabel }, { key: 'avg_quantity_per_movement', label: 'Moyenne / mouvement' }]} rows={data.stock_movements_analysis} />
      </Panel>
      <div className="analytics-two-col">
        <Panel title="Stock dormant" eyebrow="Capital immobilisé">
          <DataTable columns={[{ key: 'name', label: 'Produit' }, { key: 'category', label: 'Catégorie' }, { key: 'estimated_stock', label: 'Stock estimé' }, { key: 'tied_capital', label: 'Capital', render: moneyLabel }]} rows={data.dead_stock} />
        </Panel>
        <Panel title="Taux d’écoulement" eyebrow="Ventes vs réceptions">
          <DataTable columns={[{ key: 'name', label: 'Produit' }, { key: 'total_received', label: 'Reçu' }, { key: 'total_sold', label: 'Vendu' }, { key: 'sell_through_rate', label: 'Écoulement', render: percentLabel }, { key: 'performance', label: 'Niveau' }]} rows={data.conversion_rates} />
        </Panel>
      </div>
      <Panel title="Vitesse de vente" eyebrow="Unités par jour">
        <DataTable columns={[{ key: 'name', label: 'Produit' }, { key: 'sku', label: 'Référence' }, { key: 'total_qty_sold', label: 'Quantité vendue' }, { key: 'active_days', label: 'Jours actifs' }, { key: 'avg_daily_velocity', label: 'Vitesse / jour' }, { key: 'velocity_status', label: 'Rythme' }]} rows={data.sales_velocity} />
      </Panel>
    </div>
  );
}

function Trends({ data }) {
  return (
    <div className="analytics-view">
      <Panel title="Chiffre d’affaires et profit" eyebrow="Historique mensuel"><MonthlyTrendChart rows={data.monthly_trends} /></Panel>
      <div className="analytics-two-col">
        <Panel title="Seuil de rentabilité" eyebrow="Résultat par mois">
          <DataTable columns={[{ key: 'month', label: 'Mois' }, { key: 'revenue', label: 'CA', render: moneyLabel }, { key: 'profit', label: 'Profit', render: moneyLabel }, { key: 'status', label: 'Statut' }]} rows={data.break_even_analysis?.monthly_data} />
        </Panel>
        <Panel title="Variabilité des prix" eyebrow="Élasticité observée">
          <DataTable columns={[{ key: 'name', label: 'Produit' }, { key: 'min_price', label: 'Min.', render: moneyLabel }, { key: 'max_price', label: 'Max.', render: moneyLabel }, { key: 'price_range_pct', label: 'Écart', render: percentLabel }, { key: 'pricing_strategy', label: 'Stabilité' }]} rows={data.price_elasticity} />
        </Panel>
      </div>
      <div className="analytics-two-col">
        <Panel title="Activité par jour" eyebrow="Rythme commercial">
          <DataTable columns={[{ key: 'day_name', label: 'Jour' }, { key: 'nb_transactions', label: 'Transactions' }, { key: 'revenue', label: 'CA', render: moneyLabel }, { key: 'avg_ticket', label: 'Ticket moyen', render: moneyLabel }]} rows={data.best_days} />
        </Panel>
        <Panel title="Saisonnalité" eyebrow="Performance par saison">
          <DataTable columns={[{ key: 'season', label: 'Saison' }, { key: 'nb_transactions', label: 'Transactions' }, { key: 'revenue', label: 'CA', render: moneyLabel }, { key: 'profit', label: 'Profit', render: moneyLabel }]} rows={data.seasonality} />
        </Panel>
      </div>
      <Panel title="Marge par heure" eyebrow="Répartition intrajournalière">
        <DataTable columns={[{ key: 'hour', label: 'Heure' }, { key: 'nb_transactions', label: 'Transactions' }, { key: 'revenue', label: 'CA', render: moneyLabel }, { key: 'profit', label: 'Profit', render: moneyLabel }, { key: 'margin_pct', label: 'Marge', render: percentLabel }]} rows={data.margin_by_hour} />
      </Panel>
      <Panel title="Indicateurs clients" eyebrow="Valeur transactionnelle">
        <div className="customer-metrics">
          {Object.entries(data.customer_lifetime_value || {}).map(([key, value]) => (
            <div key={key}><span>{key.replaceAll('_', ' ')}</span><strong>{String(value)}</strong></div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function apiRequest(path, { method = 'GET', token, body, signal } = {}) {
  if (token) {
    try {
      const savedSession = JSON.parse(sessionStorage.getItem(DEMO_SESSION_KEY) || 'null');
      if (savedSession?.token === token && savedSession.expiresAt <= Date.now()) {
        throw new Error(DEMO_EXPIRED_MESSAGE);
      }
    } catch (error) {
      if (error.message === DEMO_EXPIRED_MESSAGE) throw error;
    }
  }
  return fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: {
      ...(token ? { 'x-demo-token': token } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal
  }).then(async (response) => {
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) {
      const error = new Error(
        (['DEMO_EXPIRED', 'DEMO_SESSION_EXPIRED', 'DEMO_TOKEN_EXPIRED'].includes(result.code)
          || (token && [401, 403].includes(response.status) && result.code !== 'DEMO_ALREADY_USED')) ? DEMO_EXPIRED_MESSAGE
          : result.message || result.error || (response.status === 404
            ? `Route introuvable : ${method} ${API_BASE}${path} (HTTP 404).`
            : `La requête ${method} ${API_BASE}${path} a échoué (HTTP ${response.status}).`)
      );
      error.status = response.status;
      error.code = result.code;
      throw error;
    }
    return result;
  });
}

function LoadingState({ message = 'Préparation de votre espace de saisie…' }) {
  return (
    <div className="analytics-state" aria-live="polite">
      <div className="analytics-loader" />
      <span>Connexion à Mon Radar</span>
      <p>{message}</p>
      <div className="analytics-loading-bars"><i /><i /><i /><i /></div>
    </div>
  );
}

function Field({ label, children, className = '' }) {
  return <label className={`entry-field ${className}`}><span>{label}</span>{children}</label>;
}

function StepHeading({ number, title, detail, count }) {
  return (
    <div className="entry-step-heading">
      <span className="entry-step-number">{number}</span>
      <div><h3>{title}</h3><p>{detail}</p></div>
      {count !== undefined && <span className="entry-step-count">{count}</span>}
    </div>
  );
}

function nextSaleReference() {
  return `VENTE-${Date.now()}`;
}

function DataEntry({
  stores, products, storeId, salesCreated, onCreateStore,
  pendingOpeningBalances, onRetryOpeningBalance, onCreateProduct, onCreateSale, onAnalyze, onSessionExpired, busy, analyzing
}) {
  const [storeName, setStoreName] = useState('');
  const [timezone, setTimezone] = useState('Africa/Casablanca');
  const [sku, setSku] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('goods');
  const [unitLabel, setUnitLabel] = useState('unit');
  const [tracksStock, setTracksStock] = useState(true);
  const [referenceCost, setReferenceCost] = useState('');
  const [initialStock, setInitialStock] = useState('1');
  const [saleReference, setSaleReference] = useState(nextSaleReference);
  const [items, setItems] = useState([{ product_id: '', quantity: '1', unit_price: '' }]);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [saving, setSaving] = useState('');

  const storeProducts = products.filter((product) => String(product.store_id) === String(storeId));
  const selectedStore = stores.find((store) => String(store.id) === String(storeId));
  const saleTotal = items.reduce((total, item) => total + Number(item.quantity || 0) * Number(item.unit_price || 0), 0);

  const runSave = async (action, callback, reset) => {
    setActionError('');
    setActionSuccess('');
    setSaving(action);
    try {
      await callback();
      reset?.();
      if (action === 'sale') setActionSuccess('Enregistrement confirmé.');
    } catch (requestError) {
      if (requestError.message === DEMO_EXPIRED_MESSAGE) {
        onSessionExpired?.();
        return;
      }
      if (requestError.productCreated) reset?.();
      setActionError(requestError.message || 'Enregistrement impossible.');
    } finally {
      setSaving('');
    }
  };

  const updateSaleItem = (index, key, value) => {
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  };

  const submitSale = (event) => {
    event.preventDefault();
    const validItems = items.filter((item) => item.product_id && Number(item.quantity) > 0 && Number(item.unit_price) >= 0);
    if (!validItems.length) {
      setActionError('Ajoutez au moins un article avec une quantité et un prix valides.');
      return;
    }
    runSave('sale', () => onCreateSale({
      sale_reference: saleReference,
      store_id: storeId,
      status: 'completed',
      currency: 'MAD',
      items: validItems.map((item) => ({
        product_id: item.product_id,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price)
      }))
    }), () => {
      setSaleReference(nextSaleReference());
      setItems([{ product_id: '', quantity: '1', unit_price: '' }]);
    });
  };

  return (
    <div className="entry-workspace">
      <div className="entry-intro-row">
        <div><span className="analytics-eyebrow">Espace de saisie</span><h2>Commencez par vos données</h2><p>Les données affichées et analysées sont chargées depuis la base par l’API pour le magasin isolé de cet essai.</p></div>
        <div className="entry-db-status"><span className="analytics-live-dot ready" /><span>Connecté à la base</span></div>
      </div>

      <div className="entry-progress" aria-label="Étapes de saisie">
        <span className="complete"><i>1</i> Magasin</span><b />
        <span className={storeId ? 'complete' : ''}><i>2</i> Produits</span><b />
        <span className={salesCreated ? 'complete' : ''}><i>3</i> Ventes</span><b />
        <span><i>4</i> Analyse</span>
      </div>

      <div className="entry-steps">
        <Panel title="Point de vente" eyebrow="Étape 01 · Organisation" action={selectedStore?.name || 'À sélectionner'}>
          {selectedStore ? (
            <div className="entry-store-lock">
              <strong>{selectedStore.name}</strong>
              <span>Magasin isolé pour cet essai. Les produits, ventes et analyses resteront liés à lui.</span>
            </div>
          ) : (
            <>
              <p className="entry-hint">Créez le magasin unique de cet essai pour enregistrer ses produits et ses ventes.</p>
              <form className="entry-form entry-store-form" onSubmit={(event) => {
                event.preventDefault();
                if (!storeName.trim()) return;
                runSave('store', () => onCreateStore({ name: storeName.trim(), timezone }), () => setStoreName(''));
              }}>
                <Field label="Nom de l’entreprise" className="entry-grow">
                  <input value={storeName} onChange={(event) => setStoreName(event.target.value)} placeholder="Ex. Épicerie Al Amal" required />
                </Field>
                <Field label="Fuseau horaire">
                  <select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
                    <option value="Africa/Casablanca">Africa/Casablanca</option>
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="UTC">UTC</option>
                  </select>
                </Field>
                <button className="entry-secondary-button" type="submit" disabled={Boolean(saving) || !storeName.trim()}>{saving === 'store' ? 'Enregistrement…' : 'Enregistrer'}</button>
              </form>
            </>
          )}
        </Panel>

        <Panel title="Catalogue produits" eyebrow="Étape 02 · Références" action={`${storeProducts.length} produit${storeProducts.length > 1 ? 's' : ''}`}>
          <form className="entry-form entry-product-form" onSubmit={(event) => {
            event.preventDefault();
            runSave('product', () => onCreateProduct({
              store_id: storeId,
              sku: sku.trim(),
              name: productName.trim(),
              category: category.trim() || 'Général',
              product_type: productType,
              unit_label: unitLabel.trim() || 'unité',
              tracks_stock: tracksStock,
              reference_cost: referenceCost === '' ? null : Number(referenceCost)
            }, {
              initial_stock: tracksStock ? Number(initialStock) : null,
              unit_cost: referenceCost === '' ? null : Number(referenceCost)
            }), () => { setSku(''); setProductName(''); setReferenceCost(''); setInitialStock('1'); });
          }}>
            <Field label="SKU / Référence"><input value={sku} onChange={(event) => setSku(event.target.value)} placeholder="EX-001" required disabled={!storeId} /></Field>
            <Field label="Nom du produit" className="entry-grow"><input value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="Nom du produit" required disabled={!storeId} /></Field>
            <Field label="Catégorie"><input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Épicerie" disabled={!storeId} /></Field>
            <Field label="Type">
              <select value={productType} onChange={(event) => {
                setProductType(event.target.value);
                if (event.target.value === 'service') {
                  setTracksStock(false);
                  setReferenceCost('');
                } else {
                  setTracksStock(true);
                }
              }} required disabled={!storeId}>
                <option value="goods">Marchandise</option>
                <option value="service">Service</option>
              </select>
            </Field>
            <Field label="Unité"><input value={unitLabel} onChange={(event) => setUnitLabel(event.target.value)} placeholder="unité" disabled={!storeId} /></Field>
            <Field label={`Coût de référence (MAD)${productType === 'service' ? ' · facultatif' : ''}`}><input type="number" min="0" step="0.01" value={referenceCost} onChange={(event) => setReferenceCost(event.target.value)} placeholder={productType === 'service' ? 'Non applicable' : '0,00'} required={productType !== 'service'} disabled={!storeId} /></Field>
            <label className="entry-check"><input type="checkbox" checked={tracksStock} onChange={(event) => setTracksStock(event.target.checked)} disabled={!storeId} /><span>Suivre le stock</span></label>
            {tracksStock && productType !== 'service' && <Field label="Stock initial"><input type="number" min="0" step="0.01" value={initialStock} onChange={(event) => setInitialStock(event.target.value)} required disabled={!storeId} /></Field>}
            <button className="entry-secondary-button" type="submit" disabled={Boolean(saving) || !storeId || !sku.trim() || !productName.trim() || (productType !== 'service' && referenceCost === '') || (tracksStock && productType !== 'service' && initialStock === '')}>{saving === 'product' ? 'Enregistrement…' : 'Ajouter le produit'}</button>
          </form>
          <div className="entry-existing-list">
            {storeProducts.length ? storeProducts.slice(0, 4).map((product) => <div key={product.id}><span>{product.name}</span><small>{product.sku} · {product.category || 'Sans catégorie'}</small></div>) : <span>Les produits ajoutés pendant cet essai apparaîtront ici.</span>}
          </div>
          {pendingOpeningBalances.map((pending) => (
            <div className="entry-pending-stock" key={pending.idempotency_key}>
              <span>Stock initial de {pending.product_name} ({pending.quantity} unités) à confirmer.</span>
              <button className="entry-secondary-button" type="button" disabled={Boolean(saving)} onClick={() => runSave('stock', () => onRetryOpeningBalance(pending))}>
                {saving === 'stock' ? 'Enregistrement…' : 'Réessayer le stock initial'}
              </button>
            </div>
          ))}
        </Panel>

        <Panel title="Nouvelle vente" eyebrow="Étape 03 · Transactions" action={`${salesCreated} vente${salesCreated > 1 ? 's' : ''} ajoutée${salesCreated > 1 ? 's' : ''}`}>
          {storeProducts.length === 0 ? <p className="entry-hint">Ajoutez d’abord au moins un produit à ce magasin.</p> : (
            <form className="entry-sale-form" onSubmit={submitSale}>
              <Field label="Référence de vente">
                <input value={saleReference} onChange={(event) => setSaleReference(event.target.value)} required disabled={!storeId} />
              </Field>
              <div className="entry-sale-items">
                {items.map((item, index) => (
                  <div className="entry-sale-line" key={index}>
                    <Field label={`Produit ${index + 1}`} className="entry-grow">
                      <select value={item.product_id} onChange={(event) => updateSaleItem(index, 'product_id', event.target.value)} required>
                        <option value="" disabled>Sélectionner</option>
                        {storeProducts.map((product) => <option key={product.id} value={product.id}>{product.name} · {product.sku}</option>)}
                      </select>
                    </Field>
                    <Field label="Quantité"><input type="number" min="0.01" step="0.01" value={item.quantity} onChange={(event) => updateSaleItem(index, 'quantity', event.target.value)} required /></Field>
                    <Field label="Prix unitaire (MAD)"><input type="number" min="0" step="0.01" value={item.unit_price} onChange={(event) => updateSaleItem(index, 'unit_price', event.target.value)} placeholder="0,00" required /></Field>
                    {items.length > 1 && <button className="entry-remove-line" type="button" aria-label={`Supprimer le produit ${index + 1}`} onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}>×</button>}
                  </div>
                ))}
              </div>
              <div className="entry-sale-actions">
                <button className="entry-text-button" type="button" onClick={() => setItems((current) => [...current, { product_id: '', quantity: '1', unit_price: '' }])}>+ Ajouter un article</button>
                <strong>Total estimé <span>{moneyLabel(saleTotal)}</span></strong>
              </div>
              <button className="entry-secondary-button" type="submit" disabled={Boolean(saving) || !storeId}>{saving === 'sale' ? 'Enregistrement…' : 'Enregistrer la vente en base'}</button>
            </form>
          )}
        </Panel>
      </div>

      {actionSuccess && <div className="entry-success" role="status"><strong>{actionSuccess}</strong></div>}
      {actionError && <div className="entry-error" role="alert"><strong>Enregistrement non confirmé</strong><span>{actionError}</span></div>}
      <div className="entry-analysis-bar">
        <div><span className="entry-analysis-icon">↗</span><div><strong>Vos données sont prêtes ?</strong><p>L’analyse portera uniquement sur le magasin sélectionné et les données de cette session.</p></div></div>
        <div className="entry-analysis-buttons">
          <button className="entry-analyze-button" type="button" onClick={onAnalyze} disabled={salesCreated === 0 || Boolean(busy) || analyzing}>
            {analyzing ? 'Analyse en cours…' : 'Analyser les données'}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      {salesCreated === 0 && <p className="entry-analysis-note">Enregistrez au moins une vente pour lancer l’analyse. Les écritures restent sauvegardées dans la base.</p>}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [phase, setPhase] = useState('loading');
  const [token, setToken] = useState('');
  const [sessionExpiresAt, setSessionExpiresAt] = useState(0);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [pendingOpeningBalances, setPendingOpeningBalances] = useState([]);
  const [storeId, setStoreId] = useState('');
  const [salesCreated, setSalesCreated] = useState(0);
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const expireSession = () => {
    sessionStorage.removeItem(DEMO_SESSION_KEY);
    setToken('');
    setStores([]);
    setProducts([]);
    setPendingOpeningBalances([]);
    setStoreId('');
    setReport(null);
    setError(DEMO_EXPIRED_MESSAGE);
    setPhase('expired');
  };

  useEffect(() => {
    const initialize = async () => {
      setPhase('loading');
      setError('');
      setStores([]);
      setProducts([]);
      setPendingOpeningBalances([]);
      setStoreId('');
      setSalesCreated(0);
      setReport(null);
      try {
        let session;
        const savedSession = JSON.parse(sessionStorage.getItem(DEMO_SESSION_KEY) || 'null');
        if (savedSession?.token) {
          if (savedSession.expiresAt <= Date.now()) {
            sessionStorage.removeItem(DEMO_SESSION_KEY);
            setToken('');
            setSessionExpiresAt(0);
            setError(DEMO_EXPIRED_MESSAGE);
            setPhase('expired');
            return;
          }
          session = { token: savedSession.token, expiresAt: savedSession.expiresAt };
          setSalesCreated(Number(savedSession.salesCreated || 0));
        } else {
          sessionStorage.removeItem(DEMO_SESSION_KEY);
          session = await startDemoSession();
        }
        if (!session.token) throw new Error(session.message || 'Le serveur n’a pas fourni de jeton de démo.');
        const expiresAt = Number(session.expiresAt || (session.expires_at ? Date.parse(session.expires_at) : 0)) || Date.now() + DEMO_SESSION_DURATION;
        if (expiresAt <= Date.now()) {
          setError(DEMO_EXPIRED_MESSAGE);
          setPhase('expired');
          return;
        }
        if (!savedSession?.token) {
          sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ token: session.token, expiresAt, salesCreated: 0, pendingOpeningBalances: [] }));
        } else {
          sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({
            token: session.token,
            expiresAt,
            salesCreated: Number(savedSession.salesCreated || 0),
            pendingOpeningBalances: savedSession.pendingOpeningBalances || []
          }));
        }
        setToken(session.token);
        setSessionExpiresAt(expiresAt);
        const [storeResult, productResult] = await Promise.all([
          apiRequest('/stores', { token: session.token }),
          apiRequest('/products', { token: session.token })
        ]);
        const sessionStores = storeResult.data || [];
        if (sessionStores.length > 1) {
          throw new Error('La session doit renvoyer un seul magasin. Aucune donnée n’a été affichée.');
        }
        const sessionStore = sessionStores[0] || null;
        const sessionStoreId = String(sessionStore?.id || '');
        const sessionProducts = productResult.data || [];
        if (sessionProducts.some((product) => String(product.store_id) !== sessionStoreId)) {
          throw new Error('L’API a renvoyé des produits hors du magasin de cette session. Aucune donnée n’a été affichée.');
        }
        const savedPending = savedSession?.pendingOpeningBalances || [];
        const currentProductIds = new Set(sessionProducts.map((product) => String(product.id)));
        const sessionPending = savedPending.filter((item) => currentProductIds.has(String(item.product_id))
          && String(item.store_id) === sessionStoreId);
        setStores(sessionStore ? [sessionStore] : []);
        setProducts(sessionProducts);
        setStoreId(sessionStoreId);
        setPendingOpeningBalances(sessionPending);
        updateSavedDemoSession({ pendingOpeningBalances: sessionPending });
        setPhase('entry');
      } catch (requestError) {
        if (requestError.code === 'DEMO_ALREADY_USED') {
          setError('La démo a déjà été utilisée sur ce navigateur.');
          setPhase('used');
          return;
        }
        if (requestError.message === DEMO_EXPIRED_MESSAGE) {
          sessionStorage.removeItem(DEMO_SESSION_KEY);
          setError(DEMO_EXPIRED_MESSAGE);
          setPhase('expired');
          return;
        }
        setError(requestError.message || 'Impossible de charger les données de la base.');
        setPhase('error');
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (!token || !sessionExpiresAt) return undefined;
    const timer = window.setTimeout(expireSession, Math.max(0, sessionExpiresAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [token, sessionExpiresAt]);

  const createStore = async (payload) => {
    const result = await apiRequest('/stores', { method: 'POST', token, body: payload });
    if (!result.data?.id) throw new Error('L’API n’a pas confirmé la création du magasin.');
    setStores([result.data]);
    setStoreId(String(result.data.id));
  };

  const createProduct = async (payload, openingBalance) => {
    const result = await apiRequest('/products', { method: 'POST', token, body: payload });
    const product = result.data;
    if (!product?.id || String(product.store_id) !== String(payload.store_id)) {
      throw new Error('L’API n’a pas confirmé que le produit appartient au magasin de cet essai. Le produit n’a pas été affiché.');
    }
    setProducts((current) => [...current, product]);
    if (payload.tracks_stock && openingBalance?.initial_stock !== null) {
      const pending = {
        idempotency_key: globalThis.crypto?.randomUUID?.() || `opening-${product.id}-${Date.now()}`,
        store_id: payload.store_id,
        product_id: product.id,
        product_name: product.name,
        movement_type: 'opening_balance',
        quantity: openingBalance.initial_stock,
        unit_cost: openingBalance.unit_cost
      };
      try {
        await apiRequest('/stock-movements', { method: 'POST', token, body: pending });
      } catch (requestError) {
        if (requestError.message === DEMO_EXPIRED_MESSAGE) throw requestError;
        setPendingOpeningBalances((current) => {
          const updated = [...current, pending];
          updateSavedDemoSession({ pendingOpeningBalances: updated });
          return updated;
        });
        const error = new Error(`Produit créé, mais stock initial non confirmé : ${requestError.message}`);
        error.productCreated = true;
        throw error;
      }
    }
  };

  const retryOpeningBalance = async (pending) => {
    await apiRequest('/stock-movements', { method: 'POST', token, body: pending });
    setPendingOpeningBalances((current) => {
      const updated = current.filter((item) => item.idempotency_key !== pending.idempotency_key);
      updateSavedDemoSession({ pendingOpeningBalances: updated });
      return updated;
    });
  };

  const createSale = async (payload) => {
    await apiRequest('/sales', { method: 'POST', token, body: payload });
    setSalesCreated((current) => {
      updateSavedDemoSession({ salesCreated: current + 1 });
      return current + 1;
    });
  };

  const runAnalysis = async () => {
    const activeStore = stores.find((store) => String(store.id) === String(storeId));
    if (!activeStore) {
      setError('Sélectionnez un magasin avant de lancer l’analyse.');
      return;
    }
    setBusy(true);
    setPhase('analyzing');
    setError('');
    try {
      const payload = await apiRequest(`/analytics/complete?store_id=${encodeURIComponent(storeId)}`, { token });
      const responseStoreId = payload.store_id || payload.store_scope?.store_id;
      if (payload.scope_confirmed !== true || String(responseStoreId) !== String(activeStore.id)) {
        const returnedStore = responseStoreId == null ? 'absent' : String(responseStoreId);
        throw new Error(`Le magasin ne correspond pas à la session. Confirmation reçue : ${String(payload.scope_confirmed)} ; magasin renvoyé : ${returnedStore} ; magasin attendu : ${String(activeStore.id)}. Aucune analyse n’a été affichée.`);
      }
      const analysisData = payload.data ?? payload.analysis;
      if (!analysisData || typeof analysisData !== 'object') {
        throw new Error('La réponse de l’API ne contient pas de données analytiques exploitables.');
      }
      setReport({ ...payload, data: analysisData });
      setActiveTab('overview');
      setPhase('report');
    } catch (requestError) {
      if (requestError.message === DEMO_EXPIRED_MESSAGE) {
        expireSession();
        return;
      }
      setError(requestError.message || 'L’analyse a échoué.');
      setPhase('entry');
    } finally {
      setBusy(false);
    }
  };

  const data = report?.data;
  const statusLabel = phase === 'report' ? 'Analyse terminée' : phase === 'used' ? 'Démo déjà utilisée' : phase === 'expired' ? 'Session expirée' : phase === 'error' ? 'Connexion interrompue' : phase === 'loading' ? 'Chargement depuis la base' : phase === 'analyzing' ? 'Calcul des indicateurs' : 'Session de saisie active';

  return (
    <section className="demo-section analytics-demo" id="demo">
      <div className="container">
        <div className="section-header analytics-intro">
          <div className="section-pill">Mon Radar · Démonstration live</div>
          <h2 className="section-title">Vos chiffres. <span className="highlight">Vos décisions.</span></h2>
          <p className="section-subtitle">Saisissez vos magasins, produits et ventes. Les données sont sauvegardées en base avant le calcul des indicateurs.</p>
        </div>

        <div className="analytics-toolbar">
          <div className="analytics-live-status">
            <span className={`analytics-live-dot ${phase === 'error' ? 'error' : phase === 'report' ? 'ready' : ''}`} />
            <div><strong>{statusLabel}</strong><span>{phase === 'report' && report?.timestamp ? new Date(report.timestamp).toLocaleString('fr-FR') : token && sessionExpiresAt ? `Session valable jusqu’à ${new Date(sessionExpiresAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : 'Données chargées depuis l’API Mon Radar'}</span></div>
          </div>
        </div>

        {(phase === 'loading' || phase === 'analyzing') && <LoadingState message={phase === 'analyzing' ? 'Calcul des indicateurs à partir des données enregistrées…' : 'Chargement des magasins et produits existants…'} />}
        {(phase === 'error' || phase === 'used' || phase === 'expired') && (
          <div className="analytics-error" role="alert">
            <span className="analytics-error-icon">!</span>
            <div><strong>{phase === 'used' ? 'Démo déjà utilisée sur ce navigateur' : phase === 'expired' ? 'Votre session de démonstration est terminée' : 'La démo est indisponible'}</strong><p>{error}</p>{phase === 'error' && <small>Vérifiez que l’API est disponible à travers le proxy /api configuré dans Vite.</small>}</div>
          </div>
        )}
        {phase === 'entry' && token && (
          <>
            <DataEntry
              stores={stores}
              products={products}
              storeId={storeId}
              salesCreated={salesCreated}
              pendingOpeningBalances={pendingOpeningBalances}
              onRetryOpeningBalance={retryOpeningBalance}
              onCreateStore={createStore}
              onCreateProduct={createProduct}
              onCreateSale={createSale}
              onAnalyze={runAnalysis}
              onSessionExpired={expireSession}
              busy={busy}
              analyzing={false}
            />
            {error && <div className="entry-error" role="alert"><strong>Analyse non terminée</strong><span>{error}</span></div>}
          </>
        )}
        {phase === 'report' && data && (
          <>
            {report.message && <div className="analytics-report-note">{report.message}</div>}
            <nav className="analytics-tabs" aria-label="Sections du rapport">
              {TABS.map((tab) => <button key={tab.id} type="button" className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}
            </nav>
            {activeTab === 'overview' && <Overview data={data} />}
            {activeTab === 'profitability' && <Profitability data={data} />}
            {activeTab === 'inventory' && <Inventory data={data} />}
            {activeTab === 'trends' && <Trends data={data} />}
            <footer className="analytics-footer"><span>Rapport calculé par l’API Mon Radar</span><span>{report.demo_consumed ? 'Session de démonstration utilisée' : 'Données synchronisées'}</span></footer>
          </>
        )}
      </div>
    </section>
  );
}
