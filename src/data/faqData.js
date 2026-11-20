export const FAQ_DATA = [
  {
    id: 'faq-1',
    question: "Quelles données puis-je analyser ?",
    answer: "Tu peux saisir ou importer tes ventes et tes niveaux de stock. Mon Radar les organise par date et par produit pour calculer des indicateurs de suivi et faire ressortir les évolutions de ton activité."
  },
  {
    id: 'faq-2',
    question: "Quels calculs sont faits automatiquement ?",
    answer: "À partir des données fournies, tu peux suivre le chiffre d’affaires, les variations de ventes, les tendances par produit et la rotation du stock. Les résultats se mettent à jour lorsque tes données sont actualisées."
  },
  {
    id: 'faq-3',
    question: "Comment les tendances et les anomalies sont-elles repérées ?",
    answer: "Mon Radar compare les ventes et les stocks entre différentes périodes. Une croissance, un recul ou une variation inhabituelle ressort dans les indicateurs et peut être signalé dans la synthèse WhatsApp."
  },
  {
    id: 'faq-4',
    question: "Comment les alertes arrivent-elles sur WhatsApp ?",
    answer: "Les synthèses mettent en avant les évolutions importantes et les anomalies détectées pour garder un œil sur les données sans devoir consulter chaque ligne de vente."
  },
  {
    id: 'faq-5',
    question: "Puis-je utiliser mes fichiers de caisse et de stock ?",
    answer: "La démo présente l’import de fichiers Excel et CSV. Les colonnes de ventes, dates, produits et quantités servent de base aux analyses ; les formats disponibles dépendent des données exportées par ton outil."
  }
];

export const DIFFERENTIATORS = [
  {
    tag: 'INTEGRATION',
    title: 'Ventes et stock réunis',
    desc: 'Saisis tes données ou pars de fichiers de vente et de stock pour obtenir une vue cohérente de l’activité.'
  },
  {
    tag: 'FLUIDITE',
    title: 'Des indicateurs faciles à suivre',
    desc: 'Retrouve les chiffres clés et les évolutions de ton activité dans un tableau de bord lisible et une synthèse WhatsApp.'
  },
  {
    tag: 'ANTICIPATION',
    title: 'Les évolutions mises en évidence',
    desc: 'Compare les périodes pour repérer les croissances, les baisses et les changements inhabituels dans tes ventes et ton stock.'
  },
  {
    tag: 'DECISION',
    title: 'Les tendances sur WhatsApp',
    desc: 'Reçois un résumé des indicateurs et des anomalies à suivre directement dans l’application que tu consultes au quotidien.'
  }
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Pour suivre les ventes et le stock d’un commerce indépendant.',
    monthlyPrice: 19,
    annualPrice: 15,
    popular: false,
    cta: 'Sélectionner l\'offre Starter',
    features: [
      'Saisie et import des données de vente et de stock',
      'Indicateurs de ventes et d’évolution',
      'Suivi de la valeur et de la rotation du stock',
      'Synthèse des tendances sur WhatsApp',
      'Suivi de variations inhabituelles'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'Analyses détaillées pour les commerces qui suivent de nombreuses références.',
    monthlyPrice: 49,
    annualPrice: 39,
    popular: true,
    cta: 'Démarrer l\'essai Pro (14 jours)',
    features: [
      'Historique de ventes et de stock approfondi',
      'Comparaison des périodes et des tendances',
      'Alertes WhatsApp sur les anomalies',
      'Analyses par produit et catégorie',
      'Indicateurs adaptés au secteur',
      'Synthèses régulières de l’activité'
    ]
  },
  {
    id: 'enterprise',
    name: 'Multi-magasins',
    desc: 'Pour les réseaux de boutiques, groupements et enseignes multi-sites.',
    monthlyPrice: 'Sur devis',
    annualPrice: 'Sur devis',
    popular: false,
    cta: 'Demander un devis réseau',
    features: [
      'Vue consolidée des points de vente',
      'Comparaison des ventes et stocks par site',
      'Tendances globales et par magasin',
      'Synthèses WhatsApp par responsable',
      'Accompagnement à la structuration des données'
    ]
  }
];
