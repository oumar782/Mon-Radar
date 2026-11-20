export const COMMERCE_DATA = {
  epicerie: {
    id: 'epicerie',
    name: 'Épicerie & Alimentation',
    subtitle: 'Commerce de proximité, supérette bio, primeur',
    kpis: [
      { label: 'Ventes du jour', value: '1 845 €', change: '+12%', type: 'positive' },
      { label: 'Évolution semaine', value: '+8%', change: 'vs semaine passée', type: 'positive' },
      { label: 'Valeur du stock', value: '18 420 €', change: 'à date', type: 'warning' },
      { label: 'Variations à suivre', value: '2 signaux', change: 'ventes & stock', type: 'critical' }
    ],
    salesHistory: [
      { day: 'Lun', sales: 1420, normal: 1400 },
      { day: 'Mar', sales: 1530, normal: 1500 },
      { day: 'Mer', sales: 980, normal: 1450, anomaly: true, reason: 'Rupture Lait & Boissons (-32%)' },
      { day: 'Jeu', sales: 1610, normal: 1580 },
      { day: 'Ven', sales: 2150, normal: 2000 },
      { day: 'Sam', sales: 2480, normal: 2350 },
      { day: 'Dim', sales: 1845, normal: 1750 }
    ],
    radarPoints: [
      { id: 'ep-1', x: 68, y: 32, level: 'critical', label: 'Lait demi-écrémé' },
      { id: 'ep-2', x: 28, y: 72, level: 'critical', label: 'Café Bio Colombie' },
      { id: 'ep-3', x: 80, y: 65, level: 'warning', label: 'Baisse Rayon Frais' },
      { id: 'ep-4', x: 42, y: 22, level: 'success', label: 'Huile Olive +40%' }
    ],
    morningSummary: "Bonjour Marc. Voici l’analyse de votre activité :\n• Ventes en hausse de 8% cette semaine\n• Huile d’olive bio : progression de 40%\n• Rayon Boissons : recul inhabituel de 27%\n• Valeur du stock saisi : 18 420 €\n\nSouhaitez-vous consulter le détail d’une tendance ?",
    alerts: [
      {
        id: 'ep-alert-1',
        title: 'Rupture imminente dans 4 jours',
        desc: 'Le lait demi-écrémé s\'écoule à 38 unités/jour (stock : 150). Délai fournisseur moyen : 5 jours.',
        level: 'critical',
        badge: 'Critique',
        time: 'Il y a 12 min',
        actionText: 'Commander 120 unités',
        waMessage: '[CRITIQUE - RUPTURE] Le lait demi-écrémé s\'écoule à 38 unités/jour. Stock restant : 150 unités. Délai fournisseur contractuel : 5 jours. Sans commande validée ce jour, le stock sera épuisé jeudi à 11h30.'
      },
      {
        id: 'ep-alert-2',
        title: 'Baisse de rendement sur le rayon Boissons',
        desc: 'Ventes en recul de -27% vs N-1. Cause analysée : indisponibilité de la référence phare.',
        level: 'warning',
        badge: 'Vigilance',
        time: 'Il y a 35 min',
        actionText: 'Consulter l\'analyse',
        waMessage: '[VIGILANCE - RAYON] Les ventes du rayon Boissons enregistrent un recul de 27% sur 7 jours. Diagnostic IA : l\'eau minérale 1L a été indisponible pendant 48 heures. Cette référence génère habituellement 42% du CA de la catégorie.'
      },
      {
        id: 'ep-alert-3',
        title: 'Trésorerie immobilisée : 1 240 € de stock dormant',
        desc: '12 références n\'ont généré aucun mouvement depuis plus de 60 jours.',
        level: 'warning',
        badge: 'Trésorerie',
        time: 'Il y a 1h',
        actionText: 'Planifier un déstockage',
        waMessage: '[STOCK DORMANT] 12 références d\'épicerie fine n\'ont enregistré aucune rotation depuis 60 jours. Montant d\'achat immobilisé : 1 240 €. Recommandation : activer une opération de déstockage groupé ce week-end.'
      },
      {
        id: 'ep-alert-4',
        title: 'Accélération des ventes : Huile d\'olive bio',
        desc: '+40% de ventes constatées ce week-end. Couverture de stock résiduelle : 9 jours.',
        level: 'success',
        badge: 'Opportunité',
        time: 'Il y a 2h',
        actionText: 'Anticiper le réassort',
        waMessage: '[OPPORTUNITÉ - SURPERFORMANCE] La référence Huile d\'olive bio progresse de +40% ce week-end. Au rythme d\'écoulement actuel, la rupture interviendra dans 9 jours contre 25 initialement prévus. Réassort recommandé.'
      }
    ],
    quickQuestions: [
      {
        q: "Quelles sont les meilleures ventes cette semaine ?",
        reply: "Rapport hebdomadaire des ventes :\n1. Baguette Tradition : 420 unités (588 €)\n2. Œufs plein air boîte de 6 : 280 unités (784 €)\n3. Huile d'olive extra 75cl : 94 unités (progression +40%)\n\nPanier moyen constaté : 19,40 € (+1,80 € vs mois précédent)."
      },
      {
        q: "Quelles commandes passer aujourd'hui ?",
        reply: "Priorités d'achat immédiates pour sécuriser les linéaires :\n1. Lait demi-écrémé : 120 unités (seuil de rupture : 4 jours)\n2. Café Colombie 250g : 40 unités (couverture : 8 jours)\n3. Beurre doux fermier : 50 unités.\nMontant prévisionnel HT fournisseur : 485 €."
      },
      {
        q: "Pourquoi les ventes baissent-elles sur les boissons ?",
        reply: "Diagnostic analytique : Le recul de 27% du rayon s'explique par 48h de rupture sur l'eau gazeuse 1L. 62% des clients achetant habituellement cette référence sont repartis sans produit de substitution."
      }
    ]
  },

  mode: {
    id: 'mode',
    name: 'Boutique de Mode & Prêt-à-porter',
    subtitle: 'Vêtements, chaussures, maroquinerie, accessoires',
    kpis: [
      { label: 'Ventes semaine', value: '14 280 €', change: '+8%', type: 'positive' },
      { label: 'Panier moyen', value: '88,50 €', change: '+6%', type: 'positive' },
      { label: 'Valeur du stock', value: '36 800 €', change: 'à date', type: 'warning' },
      { label: 'Tendances repérées', value: '4 modèles', change: 'en évolution', type: 'critical' }
    ],
    salesHistory: [
      { day: 'Lun', sales: 950, normal: 900 },
      { day: 'Mar', sales: 1100, normal: 1050 },
      { day: 'Mer', sales: 1850, normal: 1800 },
      { day: 'Jeu', sales: 820, normal: 1300, anomaly: true, reason: 'Rupture Tailles S & M Chemise Lin (-37%)' },
      { day: 'Ven', sales: 2600, normal: 2400 },
      { day: 'Sam', sales: 3950, normal: 3800 },
      { day: 'Dim', sales: 1200, normal: 1100 }
    ],
    radarPoints: [
      { id: 'mo-1', x: 74, y: 28, level: 'critical', label: 'Robes Lin Taille 38' },
      { id: 'mo-2', x: 30, y: 60, level: 'critical', label: 'Sneakers Blanches 41' },
      { id: 'mo-3', x: 82, y: 70, level: 'warning', label: 'Pulls Hiver dormants' },
      { id: 'mo-4', x: 40, y: 35, level: 'success', label: 'Veste Kimono x2.5' }
    ],
    morningSummary: "Bonjour Sarah. Voici l’analyse de votre boutique :\n• Ventes en hausse de 8% cette semaine\n• Panier moyen : 88,50 €, en progression de 6%\n• Veste Kimono : ventes multipliées par 2,5\n• Valeur du stock saisi : 36 800 €\n\nSouhaitez-vous voir les tendances par modèle ?",
    alerts: [
      {
        id: 'mo-alert-1',
        title: 'Rupture sur les tailles médianes (38 et 40)',
        desc: 'La Robe Chemise Lin n\'est plus disponible en 38 ni en 40. 9 essayages sans achat hier.',
        level: 'critical',
        badge: 'Manque à gagner',
        time: 'Il y a 18 min',
        actionText: 'Demander réassort atelier',
        waMessage: '[CRITIQUE - RUPTURE TAILLES] La Robe Chemise Lin est en rupture sur les tailles 38 et 40. Neuf clientes ont essayé le modèle hier sans conversion. Manque à gagner estimé : 720 € sur 48h.'
      },
      {
        id: 'mo-alert-2',
        title: 'Trésorerie immobilisée : collection passée',
        desc: '42 pièces automne/hiver occupent 15% des linéaires sans rotation depuis 45 jours.',
        level: 'warning',
        badge: 'Surface & Cash',
        time: 'Il y a 45 min',
        actionText: 'Organiser vente privée',
        waMessage: '[STOCK DORMANT] 42 pièces de la collection passée immobilisent 3 850 € de trésorerie et encombrent les portants. Action recommandée : planifier une invitation ventes privées -30% ce jeudi.'
      },
      {
        id: 'mo-alert-3',
        title: 'Clientèle premium inactive : Sophie V.',
        desc: 'Panier moyen de 340 €, 1 800 € d\'achats annuels. Aucune visite depuis 60 jours.',
        level: 'warning',
        badge: 'Fidélisation',
        time: 'Il y a 1h30',
        actionText: 'Envoyer invitation',
        waMessage: '[FIDÉLISATION] La cliente Sophie V. (3e contributrice annuelle au chiffre d\'affaires, panier moyen 340 €) n\'a réalisé aucun achat depuis 60 jours, contre une fréquence moyenne de 20 jours. Proposition d\'invitation personnalisée prête.'
      },
      {
        id: 'mo-alert-4',
        title: 'Forte accélération : Veste Kimono',
        desc: 'Ventes multipliées par 2,5 en 4 jours. Stock restant : 6 pièces en rayon.',
        level: 'success',
        badge: 'Bestseller',
        time: 'Il y a 3h',
        actionText: 'Sécuriser 25 pièces',
        waMessage: '[BESTSELLER] La Veste Kimono enregistre une accélération de +150% en 4 jours. Stock résiduel : 6 unités. Sans commande de réapprovisionnement sous 24h, le modèle sera épuisé dès vendredi après-midi.'
      }
    ],
    quickQuestions: [
      {
        q: "Quelles sont les meilleures ventes cette semaine ?",
        reply: "Classement hebdomadaire Prêt-à-porter :\n1. Veste Kimono imprimée : 18 pièces (1 422 €)\n2. Pantalon Flare brut : 14 pièces (1 190 €)\n3. Foulard Soie 70x70 : 22 pièces (550 €)\nPanier moyen en hausse à 88,50 €."
      },
      {
        q: "Que commander en priorité ?",
        reply: "Réassort prioritaire conseillé :\n1. Tailles 38 et 40 Robe Chemise (15 pièces)\n2. Sneakers cuir pointures 38 et 39 (8 paires)\nCoût réassort estimé : 890 € pour 2 400 € de ventes sécurisées."
      },
      {
        q: "Pourquoi les ventes ont-elles fléchi jeudi ?",
        reply: "Analyse des facteurs de performance : Intempéries continues tout l'après-midi combinées à l'exposition en vitrine de deux modèles dont les tailles médianes étaient épuisées en réserve."
      }
    ]
  },

  restaurant: {
    id: 'restaurant',
    name: 'Restaurant & Brasserie',
    subtitle: 'Bistrot, brasserie, restaurant traditionnel, traiteur',
    kpis: [
      { label: 'Ventes semaine', value: '8 650 €', change: '+11%', type: 'positive' },
      { label: 'Ticket moyen', value: '32,80 €', change: '+4%', type: 'positive' },
      { label: 'Valeur du stock', value: '4 280 €', change: 'à date', type: 'warning' },
      { label: 'Variations à suivre', value: '2 signaux', change: 'ventes & stock', type: 'critical' }
    ],
    salesHistory: [
      { day: 'Lun', sales: 1200, normal: 1150 },
      { day: 'Mar', sales: 1350, normal: 1300 },
      { day: 'Mer', sales: 1600, normal: 1550 },
      { day: 'Jeu', sales: 1800, normal: 1750 },
      { day: 'Ven', sales: 3400, normal: 3200 },
      { day: 'Sam', sales: 2100, normal: 3900, anomaly: true, reason: 'Rupture Entrecôte & Saumon au 2e service (-46%)' },
      { day: 'Dim', sales: 2200, normal: 2100 }
    ],
    radarPoints: [
      { id: 're-1', x: 65, y: 35, level: 'critical', label: 'Entrecôte Black Angus' },
      { id: 're-2', x: 25, y: 65, level: 'critical', label: 'Bar sauvage (DLC 24h)' },
      { id: 're-3', x: 78, y: 62, level: 'warning', label: 'Dessert Choco sous-facturé' },
      { id: 're-4', x: 45, y: 25, level: 'success', label: 'Cocktail Signature +60%' }
    ],
    morningSummary: "Bonjour Julien. Voici l’analyse de votre restaurant :\n• Ventes en hausse de 11% cette semaine\n• Ticket moyen : 32,80 €, en progression de 4%\n• Service du samedi : ventes sous la tendance habituelle\n• Valeur du stock saisi : 4 280 €\n\nConsultez le détail des variations depuis votre tableau de bord.",
    alerts: [
      {
        id: 're-alert-1',
        title: 'Rupture de viande prévisible avant le second service',
        desc: 'Stock actuel : 18 portions d\'entrecôte. Consommation moyenne constatée le vendredi : 42 portions.',
        level: 'critical',
        badge: 'Service critique',
        time: 'Il y a 10 min',
        actionText: 'Contacter le fournisseur',
        waMessage: '[CRITIQUE - SERVICE DU SOIR] Stock résiduel d\'Entrecôte : 18 portions. La moyenne d\'écoulement du vendredi soir s\'élève à 42 couverts. Sans livraison d\'appoint de 25 portions avant 18h, le plat principal sera refusé dès 21h15.'
      },
      {
        id: 're-alert-2',
        title: 'Date limite courte : 14 filets de Bar sauvage',
        desc: 'Échéance fixée à demain soir. Valeur d\'achat : 210 €. Risque direct de démarque inconnue.',
        level: 'warning',
        badge: 'Gestion des pertes',
        time: 'Il y a 40 min',
        actionText: 'Passer en suggestion',
        waMessage: '[GESTION DES PERTES] 14 portions de Bar sauvage arrivent à échéance demain soir (valeur d\'achat : 210 €). Recommandation : valoriser le produit en suggestion du chef à 24 € dès ce midi. Chiffre d\'affaires préservé : 336 €.'
      },
      {
        id: 're-alert-3',
        title: 'Érosion du taux de marge : Tarte Tatin',
        desc: 'L\'inflation des matières premières a fait chuter la marge brute à 49% (cible : 72%).',
        level: 'warning',
        badge: 'Rentabilité',
        time: 'Il y a 2h',
        actionText: 'Ajuster le tarif de 0,50 €',
        waMessage: '[RENTABILITÉ] Sous l\'effet de la hausse du beurre AOP, la marge brute sur la Tarte Tatin s\'établit à 49% au lieu des 72% cibles. Un ajustement tarifaire de 7,50 € à 8,00 € permet de rétablir le ratio standard.'
      },
      {
        id: 're-alert-4',
        title: 'Excellente rentabilité : Spritz Signature',
        desc: '38 verres servis hier (+60%). Marge brute nette mesurée à 84%.',
        level: 'success',
        badge: 'Forte marge',
        time: 'Il y a 3h',
        actionText: 'Conserver en mise en avant',
        waMessage: '[SURPERFORMANCE] Le Spritz Signature a enregistré 38 ventes hier soir. Ce produit génère le meilleur coefficient de marge de la carte (84% net). Brief de salle conseillé pour maintenir la proposition en apéritif d\'accueil.'
      }
    ],
    quickQuestions: [
      {
        q: "Quelles sont les meilleures ventes cette semaine ?",
        reply: "Volumes de commandes par plat :\n1. Entrecôte frites maison : 184 commandes (4 232 €)\n2. Burger artisanal : 142 commandes (2 414 €)\n3. Tiramisu maison : 110 commandes (825 €)\nTicket moyen par couvert : 32,80 €."
      },
      {
        q: "Que commander pour le week-end ?",
        reply: "Commandes de réapprovisionnement prioritaires :\n1. Boucherie : 30 kg d'entrecôte et 15 kg de bavette\n2. Produits laitiers : 20L de crème liquide 35% et 10 plaquettes de beurre AOP\n3. Marée : 25 portions de cabillaud frais."
      },
      {
        q: "Pourquoi le chiffre de samedi dernier était-il inférieur aux prévisions ?",
        reply: "Cause formellement identifiée : Rupture sur l'entrecôte et le saumon dès 21h15 samedi. 18 tables n'ont pas commandé de plat de viande ou ont écourté leur repas (-1 800 € de chiffre d'affaires non réalisé)."
      }
    ]
  }
};
