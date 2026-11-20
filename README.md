# Mon Radar — Analyse des ventes et des stocks

> **« Comprends ton activité. Décide avec tes données. »**  
> Suis les ventes, le stock et les tendances avec des indicateurs calculés automatiquement et des synthèses sur WhatsApp.

Bienvenue dans le prototype de **Mon Radar**, un outil d’analyse commerciale qui transforme les données de ventes et de stock en indicateurs, tendances et alertes. La démo interactive associe un tableau de bord à un aperçu WhatsApp.

---

## 🚀 Deux Façons de Tester le Prototype

### Option 1 : Démo Immédiate Zéro-Config (Double-Clic)
Pour tester immédiatement sans installer Node.js ni aucune dépendance :
- Ouvre simplement le fichier [`demo-direct.html`](./demo-direct.html) dans ton navigateur (Google Chrome, Edge, Safari, Firefox).
- La démo présente un radar animé, des indicateurs de ventes et de stock par secteur, une simulation WhatsApp, un calculateur de rotation et une bascule clair/sombre.

### Option 2 : Projet React + JSX + Pure CSS (Arborescence Modulaire)
Pour lancer le projet React moderne avec Vite :
```bash
npm install
npm run dev
```
Puis ouvre [http://localhost:5173](http://localhost:5173).

---

## 📁 Arborescence du Projet

```text
Monradar Frontend/
├── demo-direct.html             # Fichier autonome exécutable immédiatement sans terminal
├── index.html                   # Entrée HTML principale (Google Fonts & balises SEO)
├── package.json                 # Configuration des dépendances React & scripts Vite
├── vite.config.js               # Configuration Vite sans Tailwind (CSS pur)
├── README.md                    # Documentation complète du projet
└── src/
    ├── main.jsx                 # Point d'ancrage React
    ├── App.jsx                  # Assemblage des 11 sections et gestion du thème
    ├── data/
    │   ├── mockData.js          # Données riches (Épicerie, Mode, Resto, Pharma, etc.)
    │   └── faqData.js           # FAQ, piliers différenciateurs & plans tarifaires
    ├── components/
    │   ├── common/
    │   │   ├── Header.jsx       # En-tête avec logo SVG animé, navigation & switch thème
    │   │   ├── Footer.jsx       # Footer complet avec mentions & statut du réseau
    │   │   └── Badge.jsx        # Badges d'urgence (critique, vigilance, opportunité)
    │   ├── hero/
    │   │   ├── Hero.jsx         # Titre percutant, sous-titre & CTA doubles
    │   │   └── RadarHeroVisual.jsx # Grand radar rotatif + aperçu flottant WhatsApp
    │   ├── problem/
    │   │   └── ProblemSection.jsx  # 3 cartes du problème avec chiffres d'impact
    │   ├── howItWorks/
    │   │   └── HowItWorksSection.jsx # Les 4 étapes illustrées
    │   ├── demo/
    │   │   ├── InteractiveDemo.jsx # Orchestrateur de la démo & sélecteur de commerces
    │   │   ├── RadarCanvas.jsx     # Visualisation des variations et tendances
    │   │   ├── MiniSalesChart.jsx  # Graphique SVG d'évolution des ventes
    │   │   ├── AlertList.jsx       # Alertes du jour avec actions en un clic
    │   │   ├── KpiCards.jsx        # Indicateurs de ventes, stock et évolution
    │   │   ├── FileImportModal.jsx # Modale de simulation d'import en 3 étapes
    │   │   └── WhatsAppPhone.jsx   # Mockup iPhone ultra-réaliste avec chat et frappe IA
    │   ├── packs/
    │   │   └── BusinessPacks.jsx   # Sélecteur métier dynamique (Épicerie, Mode, Resto...)
    │   ├── diff/
    │   │   └── Differentiators.jsx # 4 piliers d'excellence (Universel, Zéro friction...)
    │   ├── pricing/
    │   │   └── PricingSection.jsx  # Grille tarifaire (Starter 19€, Pro 49€, Réseaux)
    │   ├── calculator/
    │   │   └── ValueCalculator.jsx # Calculateur interactif de rotation et couverture de stock
    │   ├── faq/
    │   │   └── FaqSection.jsx      # Accordéon interactif de 5 questions clés
    │   └── cta/
    │       └── FinalCta.jsx        # Formulaire d'accès anticipé & confirmation visuelle
    └── styles/
        ├── variables.css           # Thème sombre/clair, palette radar vert #22E3A1
        ├── global.css              # Reset, typographie Plus Jakarta Sans & utilitaires
        ├── header.css              # Navigation sticky et glassmorphism
        ├── hero.css                # Styles du radar animé et faisceau de balayage
        ├── demo.css                # Dashboard de surveillance et interface WhatsApp
        ├── sections.css            # Styles du problème, packs et FAQ
        └── calculator-pricing.css  # Styles des grilles tarifaires et sliders
```

---

## 🎨 Direction Artistique & Expérience Utilisateur
- **Palette** : Fond sombre ardoise (`#080C15`, `#0E1424`), Vert Radar lumineux (`#22E3A1`), Rouge Corail critique (`#F43F5E`), Orange vigilance (`#F59E0B`).
- **Mode Clair & Sombre** : Bascule instantanée avec variables CSS dynamiques.
- **Micro-interactions** : Faisceau radar animé en CSS pur (`@keyframes radar-spin`), indicateur de frappe WhatsApp réaliste, graphique vectoriel SVG sans bibliothèque externe lourde.
- **Storytelling** : Focus sur la lecture des données commerciales, les évolutions de ventes et le suivi des stocks.
