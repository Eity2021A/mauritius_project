export type ItineraryLocale = "en" | "fr" | "de" | "it" | "es" | "ru";

const enItineraryTranslations = {
  metadata: {
    title: "Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans (2026 Guide)",
    description:
      "Complete Mauritius itinerary guide for 3, 5, 7 and 10 day trips. Plan beaches, activities, waterfalls and culture across the north, west, east and south of the island.",
    ogAlt: "Aerial view of Le Morne, Mauritius",
  },
  schema: {
    itemListName: "Mauritius Itinerary Routes",
    itemListDescription:
      "Four Mauritius travel route options for 3, 5, 7 and 10 day trips.",
    breadcrumbHome: "Home",
    breadcrumbItineraries: "Itineraries",
    breadcrumbCurrent: "Mauritius Itineraries",
  },
  hero: {
    imageAlt: "Aerial view of Le Morne, Mauritius - itinerary planning hub",
    kicker: "2026 Travel Guide",
    title: "Mauritius Itinerary: 3, 5, 7 & 10 Day Travel Plans",
    subtitle:
      "Plan the perfect trip to Mauritius - beaches, waterfalls, mountains and culture, structured by trip length.",
  },
  intro: {
    paragraph1Before: "Planning a trip to Mauritius? This complete",
    highlight: "Mauritius itinerary guide",
    paragraph1After:
      "is designed to help you plan the perfect trip, whether you have 3 days, 5 days, 1 week, or 10 days on the island. From white sandy beaches and turquoise lagoons to waterfalls, mountains, and cultural landmarks, Mauritius offers one of the most diverse travel experiences in the Indian Ocean. This page acts as your central hub, guiding you to detailed itineraries tailored to different trip lengths, travel styles, and must-see highlights.",
    paragraph2Parts: {
      beforeNorth: "Mauritius is relatively small, but each region offers something completely different. The",
      north: "north",
      afterNorth: "is vibrant and lively, the",
      west: "west",
      afterWest: "is known for sunsets and dolphins, the",
      east: "east",
      afterEast: "is home to luxury resorts and pristine beaches, and the",
      south: "south",
      afterSouth:
        "reveals a wild and untouched coastline. A well-planned itinerary ensures you experience the best of each region without wasting time travelling back and forth. This guide helps you structure your days efficiently while linking to full detailed itineraries you can follow step by step.",
    },
  },
  days: {
    title: "How Many Days Do You Need in Mauritius?",
    body:
      "The ideal duration depends on your travel style. A short stay of 3 days allows you to explore key highlights, while 5 days gives a more balanced mix of beaches and inland attractions. A 7-day itinerary is perfect for a full island experience, and 10 days allows for a relaxed and immersive journey with time to explore hidden gems.",
    dayLabel: "{days} days in Mauritius",
    descriptions: [
      "Quick highlights and beach time",
      "Balanced itinerary with key attractions",
      "Complete island experience",
      "Ultimate itinerary with hidden gems",
    ],
  },
  feature: {
    title: "The Ultimate 3-5-7-10 Day Trip",
    subtitle:
      "Ten days, three regions - turquoise north, wild south and golden west, at an easy pace.",
    stats: ["Days", "Regions", "Coastline", "Interior"],
    body:
      "One island, four ready-made drives. Pick the length that fits your trip - each route builds on the last, so from three to ten days you still loop the island and cover its main regions. Follow the Drive Route pages for exact, day-by-day directions.",
    choose: "Choose your trip length",
    mapAlt: "Mauritius map route",
    mapCaption: "Every route loops the island",
    taxiTitle: "Taxi",
    taxiText: "Airport transfers & day driver hire.",
    carTitle: "Car Rental",
    carText: "15% Discount - use promo code MEXP26",
    book: "Book - mauritiusexplored.com",
    planSmart: "Plan smart",
  },
  routeSection: {
    kicker: "03 - Itineraries | Drive Route",
    driveRoute: "Drive Route",
    stops: "Stops",
    onRoad: "On the road",
    descriptions: {
      three:
        "A short island lap - north beaches, the wild west, and the east-to-south coast, all by car.",
      five:
        "A balanced loop of beaches, nature, culture and a lagoon day - unhurried, one leg a day.",
      seven:
        "The complete island lap - every coast, waterfalls, an island boat day and the inland highlands.",
      ten:
        "The full island at an easy pace - coast to interior and back, discovering one region a day.",
    },
  },
  sections: {
    bestPlacesTitle: "Best Places to Include in Your Mauritius Itinerary",
    bestPlacesBody:
      "No matter how long you stay, these locations should be part of your itinerary:",
    explorePlaces: "Explore all places to visit",
    stayTitle: "Where to Stay in Mauritius",
    stayBody:
      "Choosing where to stay is key to optimizing your itinerary. Each region offers a different experience:",
    tipsTitle: "Travel Tips for Your Mauritius Itinerary",
    finalTitle: "Final Thoughts",
    finalBody:
      "This Mauritius itinerary hub is designed to help you plan your trip efficiently while discovering the best the island has to offer. Whether you are staying for a few days or more than a week, these itineraries provide a clear structure to maximize your experience. By following these travel plans and exploring each region, you will enjoy a perfect balance of beaches, nature, culture, and adventure in one unforgettable destination.",
    ctaTitle: "Ready to Build Your Own Itinerary?",
    ctaBody:
      "Pick beaches, activities and places - see your route on the map, then save and share your trip.",
    ctaButton: "Create your itinerary",
  },
  roadtripPage: {
    metadataTitle: "Mauritius Itineraries - Plan Your Trip",
    metadataDescription:
      "Plan Mauritius road trips and itineraries with beaches, sights, and scenic drives.",
    heroAlt: "Plan your Mauritius itinerary",
    title: "Your Mauritius Itinerary",
    subtitle: "Beaches, activities, and nature spots on one map",
    createTitle: "Create your itineraries",
    createAlt: "Create your itinerary",
    createCardTitle: "Create your itinerary",
    newBadge: "New",
    createCardDescription: "Add your own stops and build a custom map",
    createButton: "Create on your own",
    communityTitle: "Itineraries created by fellow travelers",
    communitySubtitle: "Discover trips shared by the Mauritius Explored community",
    emptyTitle: "No itineraries shared yet",
    emptyDescription: "Be the first - create yours and share it with the community.",
    by: "by",
    stopSingular: "stop",
    stopPlural: "stops",
    categories: "Categories",
    filters: {
      all: "All Itineraries",
      region: "Region",
      discovery: "Discovery",
      culture: "Culture",
      explore: "Explore",
      fullDay: "Full day",
    },
    itinerarySingular: "itinerary",
    itineraryPlural: "itineraries",
    noCategoryResults: "No itineraries found in this category.",
  },
  detailUi: {
    backToAll: "Back to all Itineraries",
    map: "Map",
    stops: "Stops",
    stopsOnItinerary: "Stops on this itinerary",
    emptyStops: "Stop details will be added here.",
    stopDetails: "Stop details",
    zoomOnMap: "Zoom on map",
    toNextStop: "to next stop",
    tips: "Tips",
    mapForItinerary: "Map for this itinerary",
    otherItineraries: "Other itineraries",
    close: "Close",
    previousImage: "Previous image",
    nextImage: "Next image",
    photo: "photo",
    by: "by",
    stopSingular: "stop",
    stopPlural: "stops",
  },
  builderUi: {
    loading: "Loading your itinerary...",
    myStops: "My stops",
    browseAdd: "Browse & add",
    trip: "Trip",
    setTripDate: "Set Trip Date (optional)",
    date: "Date",
    clearDates: "Clear dates",
    noStops: "No stops yet",
    noStopsHint: "Browse and add beaches, activities or places",
    totalDriving: "Total driving",
    saving: "Saving...",
    viewOnMap: "View on map",
    exportPdf: "Export PDF",
    searchPlaceholder: "Search places, beaches, activities...",
    all: "All",
    beaches: "Beaches",
    activities: "Activities",
    places: "Places",
    loadingPool: "Loading {beaches} beaches, {activities} activities, and {places} places...",
    justMoment: "Just a moment",
    noResults: "No results found",
    added: "Added",
    add: "+ Add",
    yourRoute: "Your route",
    closeMap: "Close map",
    editTitle: "Edit your itinerary",
    createTitle: "Create your itinerary",
    editSubtitle: "Update your stops, reorder, and save your changes",
    createSubtitle: "Add beaches, activities, and places - then see your route on the map",
    printTitle: "My Mauritius Itinerary",
  },
  guides: [
    {
      days: 3,
      anchor: "3-day",
      title: "3 Day Mauritius Itinerary",
      subtitle: "Short Stay Guide",
      description:
        "If you are visiting Mauritius for a short stay, this itinerary focuses on the must-see highlights. Expect a mix of beaches, scenic viewpoints, and cultural experiences. A typical 3-day plan includes exploring Port Louis for markets and culture, relaxing on the beaches of the north such as Mont Choisy, and discovering the southwest region including Le Morne Brabant and Chamarel.",
    },
    {
      days: 5,
      anchor: "5-day",
      title: "5 Day Mauritius Itinerary",
      subtitle: "Best Highlights",
      description:
        "A 5-day itinerary allows you to experience the main highlights of Mauritius without rushing. You can explore the north coast beaches, enjoy a full day in the west for dolphin watching in Tamarin Bay, visit Ile aux Cerfs on the east coast, and discover inland attractions such as Black River Gorges National Park.",
    },
    {
      days: 7,
      anchor: "7-day",
      title: "7 Day Mauritius Itinerary",
      subtitle: "Perfect Week Plan",
      description:
        "Spending one week in Mauritius gives you enough time to explore each region in depth. A 7-day itinerary includes beaches, waterfalls, nature parks, and cultural stops such as Grand Bassin. You can combine relaxation with activities like snorkeling at Blue Bay Marine Park and excursions to islands like Ile aux Benitiers.",
    },
    {
      days: 10,
      anchor: "10-day",
      title: "10 Day Mauritius Itinerary",
      subtitle: "Ultimate Guide",
      description:
        "A 10-day itinerary is the best way to fully experience Mauritius at a relaxed pace. This plan includes all major highlights plus hidden gems such as La Cambuse and Riambel Beach. It allows time for both exploration and relaxation, ensuring a complete and memorable island experience.",
    },
  ],
  topPlaces: [
    { name: "Le Morne Brabant", description: "Iconic mountain and beach" },
    { name: "Chamarel", description: "Waterfall and viewpoints" },
    { name: "Ile aux Cerfs", description: "Lagoon and activities" },
    { name: "Blue Bay Marine Park", description: "Best snorkeling spot" },
    { name: "Port Louis", description: "Culture and markets" },
    { name: "Tamarin Bay", description: "Dolphins and sunsets" },
  ],
  stayRegions: [
    { name: "North (Grand Baie)", description: "Nightlife, restaurants, easy access" },
    { name: "West (Flic en Flac, Le Morne)", description: "Sunsets, beaches, activities" },
    { name: "East (Belle Mare)", description: "Luxury resorts, quiet beaches" },
    { name: "South", description: "Nature, wild landscapes, fewer crowds" },
  ],
  travelTips: [
    "Renting a car is the best way to explore the island",
    "Start early for popular attractions to avoid crowds",
    "Plan activities by region to reduce travel time",
    "Combine beach days with inland exploration",
    "Always check weather conditions for snorkeling and boat trips",
  ],
  routeSummary: [
    { days: "3", title: "3-Day Route", description: "North beaches, the wild west & south coast." },
    { days: "5", title: "5-Day Route", description: "Beaches, nature, culture & a lagoon day." },
    { days: "7", title: "7-Day Route", description: "Every coast, waterfalls & an island boat day." },
    { days: "10", title: "10-Day Route", description: "Coast to interior and back, one region a day." },
  ],
  planSmartTips: [
    { title: "Self-drive freedom", description: "a rental reaches secluded spots, drive on the left." },
    { title: "Stay in 2+ bases", description: "split North and South/West to cut driving." },
    { title: "Go digital", description: "complete the mandatory travel form before you fly." },
    { title: "More than beaches", description: "from street dholl puri to fine dining." },
  ],
  roadTips: {
    three: [
      { title: "Drive on the left", description: "roads are well-signed; an automatic is easiest." },
      { title: "Start early", description: "beat the traffic, heat and crowds." },
      { title: "Book ahead", description: "reserve boat trips & catamaran days." },
      { title: "Rent from ~$21/day", description: "your own pace, full island freedom." },
    ],
    five: [
      { title: "North first", description: "start with Grand Baie and Cap Malheureux before the longer coast drives." },
      { title: "Boat day buffer", description: "keep Ile aux Cerfs flexible in case wind or rain changes departures." },
      { title: "Pack light", description: "carry swimwear, reef-safe sunscreen and a dry bag between stops." },
      { title: "Book dinner", description: "reserve popular west-coast sunset tables before you arrive." },
    ],
  },
  faqs: [
    {
      question: "How many days do I need in Mauritius?",
      answer:
        "Seven to ten days is ideal for a balanced Mauritius itinerary, but three to five days can still cover beaches, Port Louis, Le Morne, Chamarel and one island excursion.",
    },
    {
      question: "What is the best Mauritius itinerary for first-time visitors?",
      answer:
        "A first trip should mix north beaches, Port Louis, the west coast, Chamarel, Le Morne and either Ile aux Cerfs or Blue Bay depending on your base.",
    },
    {
      question: "Should I rent a car for a Mauritius itinerary?",
      answer:
        "A car helps if you want flexible road trips, but taxis and private transfers are easier if you prefer not to drive on narrow left-side roads.",
    },
  ],
};

type ItineraryTranslations = typeof enItineraryTranslations;
type ItineraryOverrides = {
  metadata?: Partial<ItineraryTranslations["metadata"]>;
  schema?: Partial<ItineraryTranslations["schema"]>;
  hero?: Partial<ItineraryTranslations["hero"]>;
  intro?: Partial<ItineraryTranslations["intro"]>;
  days?: Partial<ItineraryTranslations["days"]>;
  feature?: Partial<ItineraryTranslations["feature"]>;
  routeSection?: Partial<ItineraryTranslations["routeSection"]>;
  sections?: Partial<ItineraryTranslations["sections"]>;
  roadtripPage?: Partial<ItineraryTranslations["roadtripPage"]>;
  detailUi?: Partial<ItineraryTranslations["detailUi"]>;
  builderUi?: Partial<ItineraryTranslations["builderUi"]>;
  guides?: ItineraryTranslations["guides"];
  topPlaces?: ItineraryTranslations["topPlaces"];
  stayRegions?: ItineraryTranslations["stayRegions"];
  travelTips?: ItineraryTranslations["travelTips"];
  routeSummary?: ItineraryTranslations["routeSummary"];
  planSmartTips?: ItineraryTranslations["planSmartTips"];
  roadTips?: ItineraryTranslations["roadTips"];
  faqs?: ItineraryTranslations["faqs"];
};

function makeItineraryTranslations(overrides: ItineraryOverrides): ItineraryTranslations {
  return {
    ...enItineraryTranslations,
    ...overrides,
    metadata: { ...enItineraryTranslations.metadata, ...overrides.metadata },
    schema: { ...enItineraryTranslations.schema, ...overrides.schema },
    hero: { ...enItineraryTranslations.hero, ...overrides.hero },
    intro: { ...enItineraryTranslations.intro, ...overrides.intro },
    days: { ...enItineraryTranslations.days, ...overrides.days },
    feature: { ...enItineraryTranslations.feature, ...overrides.feature },
    routeSection: { ...enItineraryTranslations.routeSection, ...overrides.routeSection },
    sections: { ...enItineraryTranslations.sections, ...overrides.sections },
    roadtripPage: { ...enItineraryTranslations.roadtripPage, ...overrides.roadtripPage },
    detailUi: { ...enItineraryTranslations.detailUi, ...overrides.detailUi },
    builderUi: { ...enItineraryTranslations.builderUi, ...overrides.builderUi },
  };
}

const sharedRoutes = enItineraryTranslations.routeSummary;

const itineraryTranslations: Record<ItineraryLocale, ItineraryTranslations> = {
  en: enItineraryTranslations,
  fr: makeItineraryTranslations({
    metadata: {
      title: "Itinéraire Maurice : plans de voyage 3, 5, 7 et 10 jours (guide 2026)",
      description:
        "Guide complet d'itinéraires à Maurice pour 3, 5, 7 et 10 jours : plages, activités, cascades et culture du nord au sud.",
      ogAlt: "Vue aérienne du Morne, Maurice",
    },
    schema: {
      itemListName: "Itinéraires à Maurice",
      itemListDescription: "Quatre options de voyage à Maurice pour 3, 5, 7 et 10 jours.",
      breadcrumbHome: "Accueil",
      breadcrumbItineraries: "Itinéraires",
      breadcrumbCurrent: "Itinéraires Maurice",
    },
    hero: {
      imageAlt: "Vue aérienne du Morne, Maurice - hub de planification d'itinéraire",
      kicker: "Guide de voyage 2026",
      title: "Itinéraire Maurice : plans de voyage 3, 5, 7 et 10 jours",
      subtitle:
        "Planifiez le voyage parfait à Maurice - plages, cascades, montagnes et culture, organisés selon la durée.",
    },
    intro: {
      paragraph1Before: "Vous préparez un voyage à Maurice ? Ce",
      highlight: "guide d'itinéraire à Maurice",
      paragraph1After:
        "vous aide à organiser le séjour idéal, que vous ayez 3 jours, 5 jours, une semaine ou 10 jours sur l'île. Plages de sable blanc, lagons turquoise, cascades, montagnes et sites culturels : Maurice offre une expérience très variée dans l'océan Indien.",
      paragraph2Parts: {
        beforeNorth: "Maurice est petite, mais chaque région a son caractère. Le",
        north: "nord",
        afterNorth: "est animé, l'",
        west: "ouest",
        afterWest: "est connu pour les couchers de soleil et les dauphins, l'",
        east: "est",
        afterEast: "abrite des resorts et plages paisibles, et le",
        south: "sud",
        afterSouth:
          "révèle une côte sauvage. Un bon itinéraire permet de voir chaque région sans perdre du temps en allers-retours.",
      },
    },
    days: {
      title: "Combien de jours faut-il à Maurice ?",
      body:
        "La durée idéale dépend de votre style de voyage. Trois jours couvrent les grands incontournables, cinq jours équilibrent plages et intérieur, sept jours donnent une vraie boucle de l'île, et dix jours permettent un rythme plus détendu.",
      dayLabel: "{days} jours à Maurice",
      descriptions: ["Essentiel rapide et plage", "Itinéraire équilibré", "Expérience complète de l'île", "Itinéraire ultime avec coins secrets"],
    },
    feature: {
      title: "Le grand voyage 3-5-7-10 jours",
      subtitle: "Dix jours, trois régions - nord turquoise, sud sauvage et ouest doré.",
      stats: ["Jours", "Régions", "Côte", "Intérieur"],
      body:
        "Une île, quatre trajets prêts à suivre. Choisissez la durée adaptée : chaque route complète la précédente pour faire le tour de l'île à votre rythme.",
      choose: "Choisissez la durée",
      mapAlt: "Carte de route à Maurice",
      mapCaption: "Chaque route fait une boucle de l'île",
      taxiText: "Transferts aéroport et chauffeur à la journée.",
      carTitle: "Location de voiture",
      carText: "15 % de réduction - utilisez le code MEXP26",
      book: "Réserver - mauritiusexplored.com",
      planSmart: "Planifiez malin",
    },
    routeSection: {
      kicker: "03 - Itinéraires | Route en voiture",
      driveRoute: "Route en voiture",
      stops: "Arrêts",
      onRoad: "Sur la route",
      descriptions: {
        three: "Une courte boucle - plages du nord, ouest sauvage et côte est-sud, en voiture.",
        five: "Une boucle équilibrée de plages, nature, culture et lagon, sans se presser.",
        seven: "La boucle complète - chaque côte, cascades, sortie en bateau et hauts plateaux.",
        ten: "L'île complète à rythme doux - côte, intérieur et retour, une région par jour.",
      },
    },
    sections: {
      bestPlacesTitle: "Meilleurs lieux à inclure dans votre itinéraire à Maurice",
      bestPlacesBody: "Peu importe la durée, ces lieux méritent une place dans votre itinéraire :",
      explorePlaces: "Explorer tous les lieux à visiter",
      stayTitle: "Où séjourner à Maurice",
      stayBody: "Le choix de la région change beaucoup votre itinéraire. Chaque côte a son ambiance :",
      tipsTitle: "Conseils pour votre itinéraire à Maurice",
      finalTitle: "Dernières pensées",
      finalBody:
        "Ce hub d'itinéraires vous aide à planifier efficacement tout en découvrant le meilleur de Maurice. Que vous restiez quelques jours ou plus d'une semaine, ces routes donnent une structure claire.",
      ctaTitle: "Prêt à créer votre propre itinéraire ?",
      ctaBody: "Choisissez plages, activités et lieux - voyez la route sur la carte, puis sauvegardez et partagez.",
      ctaButton: "Créer votre itinéraire",
    },
    roadtripPage: {
      metadataTitle: "Itinéraires Maurice - Planifier votre voyage",
      metadataDescription: "Planifiez des road trips et itinéraires à Maurice avec plages, sites et routes panoramiques.",
      heroAlt: "Planifier votre itinéraire à Maurice",
      title: "Votre itinéraire à Maurice",
      subtitle: "Plages, activités et sites nature sur une seule carte",
      createTitle: "Créer vos itinéraires",
      createAlt: "Créer votre itinéraire",
      createCardTitle: "Créer votre itinéraire",
      newBadge: "Nouveau",
      createCardDescription: "Ajoutez vos propres arrêts et construisez une carte personnalisée",
      createButton: "Créer vous-même",
      communityTitle: "Itinéraires créés par d'autres voyageurs",
      communitySubtitle: "Découvrez les voyages partagés par la communauté Mauritius Explored",
      emptyTitle: "Aucun itinéraire partagé pour le moment",
      emptyDescription: "Soyez le premier - créez le vôtre et partagez-le avec la communauté.",
      by: "par",
      stopSingular: "arrêt",
      stopPlural: "arrêts",
      categories: "Catégories",
      filters: { all: "Tous les itinéraires", region: "Région", discovery: "Découverte", culture: "Culture", explore: "Explorer", fullDay: "Journée complète" },
      itinerarySingular: "itinéraire",
      itineraryPlural: "itinéraires",
      noCategoryResults: "Aucun itinéraire trouvé dans cette catégorie.",
    },
    detailUi: {
      backToAll: "Retour à tous les itinéraires",
      map: "Carte",
      stops: "Arrêts",
      stopsOnItinerary: "Arrêts de cet itinéraire",
      emptyStops: "Les détails des arrêts seront ajoutés ici.",
      stopDetails: "Détails de l'arrêt",
      zoomOnMap: "Voir sur la carte",
      toNextStop: "jusqu'au prochain arrêt",
      tips: "Conseils",
      mapForItinerary: "Carte de cet itinéraire",
      otherItineraries: "Autres itinéraires",
      close: "Fermer",
      previousImage: "Image précédente",
      nextImage: "Image suivante",
      photo: "photo",
      by: "par",
      stopSingular: "arrêt",
      stopPlural: "arrêts",
    },
    builderUi: {
      loading: "Chargement de votre itinéraire...",
      myStops: "Mes arrêts",
      browseAdd: "Parcourir et ajouter",
      trip: "Voyage",
      setTripDate: "Définir la date du voyage (facultatif)",
      date: "Date",
      clearDates: "Effacer les dates",
      noStops: "Aucun arrêt pour le moment",
      noStopsHint: "Parcourez et ajoutez des plages, activités ou lieux",
      totalDriving: "Conduite totale",
      saving: "Enregistrement...",
      viewOnMap: "Voir sur la carte",
      exportPdf: "Exporter en PDF",
      searchPlaceholder: "Rechercher lieux, plages, activités...",
      all: "Tous",
      beaches: "Plages",
      activities: "Activités",
      places: "Lieux",
      loadingPool: "Chargement de {beaches} plages, {activities} activités et {places} lieux...",
      justMoment: "Un instant",
      noResults: "Aucun résultat trouvé",
      added: "Ajouté",
      add: "+ Ajouter",
      yourRoute: "Votre route",
      closeMap: "Fermer la carte",
      editTitle: "Modifier votre itinéraire",
      createTitle: "Créer votre itinéraire",
      editSubtitle: "Mettez à jour vos arrêts, réorganisez et enregistrez vos changements",
      createSubtitle: "Ajoutez plages, activités et lieux - puis voyez votre route sur la carte",
      printTitle: "Mon itinéraire à Maurice",
    },
    guides: [
      { ...enItineraryTranslations.guides[0], title: "Itinéraire Maurice 3 jours", subtitle: "Guide court séjour", description: "Pour un court séjour, cet itinéraire vise les incontournables : Port Louis, plages du nord, Le Morne et Chamarel." },
      { ...enItineraryTranslations.guides[1], title: "Itinéraire Maurice 5 jours", subtitle: "Meilleurs temps forts", description: "Cinq jours permettent de profiter des plages du nord, de l'ouest, d'Ile aux Cerfs et des sites intérieurs comme Black River Gorges." },
      { ...enItineraryTranslations.guides[2], title: "Itinéraire Maurice 7 jours", subtitle: "Semaine parfaite", description: "Une semaine laisse le temps d'explorer chaque région : plages, cascades, parcs naturels, Grand Bassin, Blue Bay et sorties vers les îles." },
      { ...enItineraryTranslations.guides[3], title: "Itinéraire Maurice 10 jours", subtitle: "Guide ultime", description: "Dix jours offrent le meilleur rythme pour les grands classiques et des coins plus calmes comme La Cambuse ou Riambel." },
    ],
    topPlaces: [
      { name: "Le Morne Brabant", description: "Montagne et plage iconiques" },
      { name: "Chamarel", description: "Cascade et points de vue" },
      { name: "Ile aux Cerfs", description: "Lagon et activités" },
      { name: "Blue Bay Marine Park", description: "Meilleur spot de snorkeling" },
      { name: "Port Louis", description: "Culture et marchés" },
      { name: "Tamarin Bay", description: "Dauphins et couchers de soleil" },
    ],
    stayRegions: [
      { name: "Nord (Grand Baie)", description: "Vie nocturne, restaurants, accès facile" },
      { name: "Ouest (Flic en Flac, Le Morne)", description: "Couchers de soleil, plages, activités" },
      { name: "Est (Belle Mare)", description: "Resorts de luxe et plages calmes" },
      { name: "Sud", description: "Nature, paysages sauvages, moins de foule" },
    ],
    travelTips: [
      "Louer une voiture reste le moyen le plus flexible d'explorer l'île",
      "Commencez tôt pour éviter chaleur et foule",
      "Planifiez par région pour réduire les trajets",
      "Combinez journées plage et découvertes à l'intérieur",
      "Vérifiez toujours la météo pour snorkeling et sorties bateau",
    ],
    routeSummary: [
      { days: "3", title: "Route 3 jours", description: "Plages du nord, ouest sauvage et côte sud." },
      { days: "5", title: "Route 5 jours", description: "Plages, nature, culture et journée lagon." },
      { days: "7", title: "Route 7 jours", description: "Chaque côte, cascades et journée bateau." },
      { days: "10", title: "Route 10 jours", description: "De la côte à l'intérieur, une région par jour." },
    ],
    planSmartTips: [
      { title: "Liberté en voiture", description: "une location atteint les coins isolés, conduite à gauche." },
      { title: "Deux bases ou plus", description: "séparez nord et sud/ouest pour réduire la route." },
      { title: "Passez au digital", description: "complétez les formalités avant le vol." },
      { title: "Plus que des plages", description: "du dholl puri de rue aux bonnes tables." },
    ],
    faqs: [
      { question: "Combien de jours faut-il à Maurice ?", answer: "Sept à dix jours sont idéaux, mais trois à cinq jours couvrent déjà plages, Port Louis, Le Morne, Chamarel et une excursion." },
      { question: "Quel itinéraire choisir pour une première visite ?", answer: "Mélangez plages du nord, Port Louis, ouest, Chamarel, Le Morne et Ile aux Cerfs ou Blue Bay selon votre base." },
      { question: "Faut-il louer une voiture ?", answer: "Une voiture aide pour les road trips flexibles; taxi et transferts privés sont plus simples si vous ne voulez pas conduire à gauche." },
    ],
  }),
  de: makeItineraryTranslations({
    metadata: { title: "Mauritius Reiseroute: 3, 5, 7 & 10 Tage (Guide 2026)", description: "Kompletter Mauritius-Routenführer für 3, 5, 7 und 10 Tage mit Stränden, Aktivitäten, Wasserfällen und Kultur.", ogAlt: "Luftaufnahme von Le Morne, Mauritius" },
    schema: { itemListName: "Mauritius Reiserouten", itemListDescription: "Vier Mauritius-Reiserouten für 3, 5, 7 und 10 Tage.", breadcrumbHome: "Startseite", breadcrumbItineraries: "Reiserouten", breadcrumbCurrent: "Mauritius Reiserouten" },
    hero: { imageAlt: "Luftaufnahme von Le Morne, Mauritius - Routenplanung", kicker: "Reiseführer 2026", title: "Mauritius Reiseroute: 3, 5, 7 & 10 Tage", subtitle: "Planen Sie die perfekte Mauritius-Reise - Strände, Wasserfälle, Berge und Kultur nach Reisedauer sortiert." },
    days: { title: "Wie viele Tage braucht man auf Mauritius?", body: "Die ideale Dauer hängt vom Reisestil ab. Drei Tage zeigen Highlights, fünf Tage bringen mehr Balance, sieben Tage ergeben eine Inselrunde und zehn Tage erlauben ein entspanntes Tempo.", dayLabel: "{days} Tage auf Mauritius", descriptions: ["Kurze Highlights und Strandzeit", "Ausgewogene Route mit Highlights", "Komplette Inselerfahrung", "Ultimative Route mit Geheimtipps"] },
    feature: { title: "Die ultimative 3-5-7-10-Tage-Reise", subtitle: "Zehn Tage, drei Regionen - türkisfarbener Norden, wilder Süden und goldener Westen.", stats: ["Tage", "Regionen", "Küste", "Inland"], body: "Eine Insel, vier fertige Routen. Wählen Sie die passende Dauer; jede Route baut auf der vorherigen auf.", choose: "Reisedauer wählen", mapAlt: "Mauritius Routenkarte", mapCaption: "Jede Route umrundet die Insel", taxiText: "Flughafentransfers und Tagesfahrer.", carTitle: "Mietwagen", carText: "15 % Rabatt - Promocode MEXP26", book: "Buchen - mauritiusexplored.com", planSmart: "Klug planen" },
    routeSection: { kicker: "03 - Reiserouten | Fahrroute", driveRoute: "Fahrroute", stops: "Stopps", onRoad: "Unterwegs", descriptions: { three: "Eine kurze Inselrunde - Nordstrände, wilder Westen und Ost-Süd-Küste.", five: "Eine ausgewogene Runde aus Stränden, Natur, Kultur und Lagunentag.", seven: "Die komplette Inselrunde - alle Küsten, Wasserfälle, Bootstag und Hochland.", ten: "Die ganze Insel in ruhigem Tempo - Küste, Inland und zurück." } },
    sections: { bestPlacesTitle: "Beste Orte für Ihre Mauritius-Route", bestPlacesBody: "Unabhängig von der Dauer sollten diese Orte dazugehören:", explorePlaces: "Alle Sehenswürdigkeiten ansehen", stayTitle: "Wo übernachten auf Mauritius", stayBody: "Die richtige Region hilft, Ihre Route zu optimieren:", tipsTitle: "Tipps für Ihre Mauritius-Route", finalTitle: "Fazit", finalBody: "Dieser Routen-Hub hilft Ihnen, die Reise effizient zu planen und die besten Seiten der Insel zu entdecken.", ctaTitle: "Bereit für Ihre eigene Route?", ctaBody: "Wählen Sie Strände, Aktivitäten und Orte - sehen Sie die Route auf der Karte und speichern Sie Ihre Reise.", ctaButton: "Route erstellen" },
    roadtripPage: { metadataTitle: "Mauritius Reiserouten - Reise planen", metadataDescription: "Planen Sie Mauritius-Roadtrips und Reiserouten mit Stränden, Sehenswürdigkeiten und Panoramastraßen.", heroAlt: "Mauritius-Reiseroute planen", title: "Ihre Mauritius-Reiseroute", subtitle: "Strände, Aktivitäten und Naturorte auf einer Karte", createTitle: "Reiserouten erstellen", createAlt: "Reiseroute erstellen", createCardTitle: "Reiseroute erstellen", newBadge: "Neu", createCardDescription: "Fügen Sie eigene Stopps hinzu und erstellen Sie eine persönliche Karte", createButton: "Selbst erstellen", communityTitle: "Reiserouten von anderen Reisenden", communitySubtitle: "Entdecken Sie Trips der Mauritius-Explored-Community", emptyTitle: "Noch keine Reiserouten geteilt", emptyDescription: "Seien Sie die erste Person - erstellen und teilen Sie Ihre Route.", by: "von", stopSingular: "Stopp", stopPlural: "Stopps", categories: "Kategorien", filters: { all: "Alle Reiserouten", region: "Region", discovery: "Entdeckung", culture: "Kultur", explore: "Erkunden", fullDay: "Ganzer Tag" }, itinerarySingular: "Reiseroute", itineraryPlural: "Reiserouten", noCategoryResults: "Keine Reiserouten in dieser Kategorie gefunden." },
    detailUi: { backToAll: "Zurück zu allen Reiserouten", map: "Karte", stops: "Stopps", stopsOnItinerary: "Stopps auf dieser Reiseroute", emptyStops: "Stoppdetails werden hier hinzugefügt.", stopDetails: "Stoppdetails", zoomOnMap: "Auf Karte anzeigen", toNextStop: "bis zum nächsten Stopp", tips: "Tipps", mapForItinerary: "Karte für diese Reiseroute", otherItineraries: "Weitere Reiserouten", close: "Schließen", previousImage: "Vorheriges Bild", nextImage: "Nächstes Bild", photo: "Foto", by: "von", stopSingular: "Stopp", stopPlural: "Stopps" },
    builderUi: { loading: "Ihre Reiseroute wird geladen...", myStops: "Meine Stopps", browseAdd: "Suchen & hinzufügen", trip: "Reise", setTripDate: "Reisedatum festlegen (optional)", date: "Datum", clearDates: "Daten löschen", noStops: "Noch keine Stopps", noStopsHint: "Suchen und fügen Sie Strände, Aktivitäten oder Orte hinzu", totalDriving: "Gesamte Fahrzeit", saving: "Speichern...", viewOnMap: "Auf Karte anzeigen", exportPdf: "PDF exportieren", searchPlaceholder: "Orte, Strände, Aktivitäten suchen...", all: "Alle", beaches: "Strände", activities: "Aktivitäten", places: "Orte", loadingPool: "{beaches} Strände, {activities} Aktivitäten und {places} Orte werden geladen...", justMoment: "Einen Moment", noResults: "Keine Ergebnisse gefunden", added: "Hinzugefügt", add: "+ Hinzufügen", yourRoute: "Ihre Route", closeMap: "Karte schließen", editTitle: "Reiseroute bearbeiten", createTitle: "Reiseroute erstellen", editSubtitle: "Aktualisieren, sortieren und speichern Sie Ihre Stopps", createSubtitle: "Fügen Sie Strände, Aktivitäten und Orte hinzu - dann sehen Sie Ihre Route auf der Karte", printTitle: "Meine Mauritius-Reiseroute" },
    routeSummary: sharedRoutes.map((route) => ({ ...route, title: route.title.replace("Route", "Route") })),
  }),
  it: makeItineraryTranslations({
    metadata: { title: "Itinerario Mauritius: 3, 5, 7 e 10 giorni (guida 2026)", description: "Guida completa agli itinerari di Mauritius per 3, 5, 7 e 10 giorni con spiagge, attività, cascate e cultura.", ogAlt: "Vista aerea di Le Morne, Mauritius" },
    hero: { imageAlt: "Vista aerea di Le Morne, Mauritius - pianificazione itinerario", kicker: "Guida viaggio 2026", title: "Itinerario Mauritius: piani di 3, 5, 7 e 10 giorni", subtitle: "Organizza il viaggio perfetto a Mauritius - spiagge, cascate, montagne e cultura in base alla durata." },
    days: { title: "Quanti giorni servono a Mauritius?", body: "La durata ideale dipende dal tuo stile. Tre giorni coprono gli highlights, cinque giorni sono più equilibrati, sette giorni fanno vivere tutta l'isola e dieci giorni permettono un ritmo rilassato.", dayLabel: "{days} giorni a Mauritius", descriptions: ["Highlights rapidi e spiaggia", "Itinerario equilibrato", "Esperienza completa dell'isola", "Itinerario definitivo con gemme nascoste"] },
    feature: { title: "Il viaggio definitivo 3-5-7-10 giorni", subtitle: "Dieci giorni, tre regioni - nord turchese, sud selvaggio e ovest dorato.", stats: ["Giorni", "Regioni", "Costa", "Interno"], body: "Un'isola, quattro percorsi pronti. Scegli la durata giusta: ogni route amplia la precedente.", choose: "Scegli la durata", mapAlt: "Mappa itinerario Mauritius", mapCaption: "Ogni percorso fa il giro dell'isola", taxiText: "Transfer aeroporto e autista giornaliero.", carTitle: "Noleggio auto", carText: "15% di sconto - codice MEXP26", book: "Prenota - mauritiusexplored.com", planSmart: "Pianifica bene" },
    routeSection: { kicker: "03 - Itinerari | Percorso in auto", driveRoute: "Percorso in auto", stops: "Tappe", onRoad: "Sulla strada", descriptions: { three: "Un breve giro dell'isola - spiagge del nord, ovest selvaggio e costa est-sud.", five: "Un loop equilibrato tra spiagge, natura, cultura e laguna.", seven: "Il giro completo - ogni costa, cascate, barca e altopiani.", ten: "L'isola intera con ritmo facile - costa, interno e ritorno." } },
    sections: { bestPlacesTitle: "Luoghi migliori da includere nell'itinerario", bestPlacesBody: "Qualunque sia la durata, questi luoghi meritano spazio:", explorePlaces: "Esplora tutti i luoghi", stayTitle: "Dove soggiornare a Mauritius", stayBody: "Scegliere la zona giusta ottimizza l'itinerario:", tipsTitle: "Consigli per il tuo itinerario", finalTitle: "Considerazioni finali", finalBody: "Questo hub ti aiuta a pianificare il viaggio in modo efficiente e a scoprire il meglio dell'isola.", ctaTitle: "Pronto a creare il tuo itinerario?", ctaBody: "Scegli spiagge, attività e luoghi - guarda la rotta sulla mappa, salva e condividi.", ctaButton: "Crea il tuo itinerario" },
    roadtripPage: { metadataTitle: "Itinerari Mauritius - Pianifica il viaggio", metadataDescription: "Pianifica road trip e itinerari a Mauritius con spiagge, luoghi e strade panoramiche.", heroAlt: "Pianifica il tuo itinerario a Mauritius", title: "Il tuo itinerario a Mauritius", subtitle: "Spiagge, attività e natura su una sola mappa", createTitle: "Crea i tuoi itinerari", createAlt: "Crea il tuo itinerario", createCardTitle: "Crea il tuo itinerario", newBadge: "Nuovo", createCardDescription: "Aggiungi le tue tappe e crea una mappa personalizzata", createButton: "Crea da solo", communityTitle: "Itinerari creati da altri viaggiatori", communitySubtitle: "Scopri i viaggi condivisi dalla community Mauritius Explored", emptyTitle: "Nessun itinerario ancora condiviso", emptyDescription: "Sii il primo: crea il tuo e condividilo con la community.", by: "di", stopSingular: "tappa", stopPlural: "tappe", categories: "Categorie", filters: { all: "Tutti gli itinerari", region: "Regione", discovery: "Scoperta", culture: "Cultura", explore: "Esplora", fullDay: "Giornata intera" }, itinerarySingular: "itinerario", itineraryPlural: "itinerari", noCategoryResults: "Nessun itinerario trovato in questa categoria." },
    detailUi: { backToAll: "Torna a tutti gli itinerari", map: "Mappa", stops: "Tappe", stopsOnItinerary: "Tappe di questo itinerario", emptyStops: "I dettagli delle tappe saranno aggiunti qui.", stopDetails: "Dettagli tappa", zoomOnMap: "Zoom sulla mappa", toNextStop: "alla prossima tappa", tips: "Consigli", mapForItinerary: "Mappa di questo itinerario", otherItineraries: "Altri itinerari", close: "Chiudi", previousImage: "Immagine precedente", nextImage: "Immagine successiva", photo: "foto", by: "di", stopSingular: "tappa", stopPlural: "tappe" },
    builderUi: { loading: "Caricamento del tuo itinerario...", myStops: "Le mie tappe", browseAdd: "Sfoglia e aggiungi", trip: "Viaggio", setTripDate: "Imposta data viaggio (facoltativo)", date: "Data", clearDates: "Cancella date", noStops: "Ancora nessuna tappa", noStopsHint: "Sfoglia e aggiungi spiagge, attività o luoghi", totalDriving: "Guida totale", saving: "Salvataggio...", viewOnMap: "Vedi sulla mappa", exportPdf: "Esporta PDF", searchPlaceholder: "Cerca luoghi, spiagge, attività...", all: "Tutti", beaches: "Spiagge", activities: "Attività", places: "Luoghi", loadingPool: "Caricamento di {beaches} spiagge, {activities} attività e {places} luoghi...", justMoment: "Un momento", noResults: "Nessun risultato trovato", added: "Aggiunto", add: "+ Aggiungi", yourRoute: "Il tuo percorso", closeMap: "Chiudi mappa", editTitle: "Modifica il tuo itinerario", createTitle: "Crea il tuo itinerario", editSubtitle: "Aggiorna le tappe, riordina e salva le modifiche", createSubtitle: "Aggiungi spiagge, attività e luoghi - poi vedi il percorso sulla mappa", printTitle: "Il mio itinerario a Mauritius" },
  }),
  es: makeItineraryTranslations({
    metadata: { title: "Itinerario Mauricio: 3, 5, 7 y 10 días (guía 2026)", description: "Guía completa de itinerarios de Mauricio para 3, 5, 7 y 10 días con playas, actividades, cascadas y cultura.", ogAlt: "Vista aérea de Le Morne, Mauricio" },
    hero: { imageAlt: "Vista aérea de Le Morne, Mauricio - planificación de itinerario", kicker: "Guía de viaje 2026", title: "Itinerario Mauricio: planes de 3, 5, 7 y 10 días", subtitle: "Planifica el viaje perfecto a Mauricio - playas, cascadas, montañas y cultura según la duración." },
    days: { title: "¿Cuántos días necesitas en Mauricio?", body: "La duración ideal depende de tu estilo. Tres días cubren lo esencial, cinco días dan más equilibrio, siete días permiten una vuelta completa y diez días ofrecen un ritmo relajado.", dayLabel: "{days} días en Mauricio", descriptions: ["Highlights rápidos y playa", "Itinerario equilibrado", "Experiencia completa de la isla", "Itinerario definitivo con joyas ocultas"] },
    feature: { title: "El viaje definitivo de 3-5-7-10 días", subtitle: "Diez días, tres regiones - norte turquesa, sur salvaje y oeste dorado.", stats: ["Días", "Regiones", "Costa", "Interior"], body: "Una isla, cuatro rutas listas. Elige la duración que encaje; cada ruta amplía la anterior.", choose: "Elige la duración", mapAlt: "Mapa de ruta de Mauricio", mapCaption: "Cada ruta rodea la isla", taxiText: "Traslados aeropuerto y conductor por día.", carTitle: "Alquiler de coche", carText: "15% de descuento - código MEXP26", book: "Reservar - mauritiusexplored.com", planSmart: "Planifica bien" },
    routeSection: { kicker: "03 - Itinerarios | Ruta en coche", driveRoute: "Ruta en coche", stops: "Paradas", onRoad: "En la carretera", descriptions: { three: "Una vuelta corta - playas del norte, oeste salvaje y costa este-sur.", five: "Un circuito equilibrado de playas, naturaleza, cultura y laguna.", seven: "La vuelta completa - cada costa, cascadas, día en barco y tierras altas.", ten: "La isla entera a ritmo fácil - costa, interior y regreso." } },
    sections: { bestPlacesTitle: "Mejores lugares para incluir en tu itinerario", bestPlacesBody: "Sin importar la duración, estos lugares deberían estar:", explorePlaces: "Explorar todos los lugares", stayTitle: "Dónde alojarse en Mauricio", stayBody: "Elegir la zona correcta ayuda a optimizar la ruta:", tipsTitle: "Consejos para tu itinerario", finalTitle: "Conclusión", finalBody: "Este hub te ayuda a planificar mejor y descubrir lo mejor de la isla.", ctaTitle: "¿Listo para crear tu propio itinerario?", ctaBody: "Elige playas, actividades y lugares - ve la ruta en el mapa, guarda y comparte.", ctaButton: "Crear itinerario" },
    roadtripPage: { metadataTitle: "Itinerarios Mauricio - Planifica tu viaje", metadataDescription: "Planifica road trips e itinerarios por Mauricio con playas, lugares y rutas panorámicas.", heroAlt: "Planifica tu itinerario por Mauricio", title: "Tu itinerario por Mauricio", subtitle: "Playas, actividades y naturaleza en un solo mapa", createTitle: "Crea tus itinerarios", createAlt: "Crea tu itinerario", createCardTitle: "Crea tu itinerario", newBadge: "Nuevo", createCardDescription: "Añade tus propias paradas y crea un mapa personalizado", createButton: "Crear por tu cuenta", communityTitle: "Itinerarios creados por otros viajeros", communitySubtitle: "Descubre viajes compartidos por la comunidad Mauritius Explored", emptyTitle: "Aún no hay itinerarios compartidos", emptyDescription: "Sé el primero: crea el tuyo y compártelo con la comunidad.", by: "por", stopSingular: "parada", stopPlural: "paradas", categories: "Categorías", filters: { all: "Todos los itinerarios", region: "Región", discovery: "Descubrimiento", culture: "Cultura", explore: "Explorar", fullDay: "Día completo" }, itinerarySingular: "itinerario", itineraryPlural: "itinerarios", noCategoryResults: "No se encontraron itinerarios en esta categoría." },
    detailUi: { backToAll: "Volver a todos los itinerarios", map: "Mapa", stops: "Paradas", stopsOnItinerary: "Paradas de este itinerario", emptyStops: "Los detalles de las paradas se añadirán aquí.", stopDetails: "Detalles de la parada", zoomOnMap: "Ver en el mapa", toNextStop: "hasta la siguiente parada", tips: "Consejos", mapForItinerary: "Mapa de este itinerario", otherItineraries: "Otros itinerarios", close: "Cerrar", previousImage: "Imagen anterior", nextImage: "Imagen siguiente", photo: "foto", by: "por", stopSingular: "parada", stopPlural: "paradas" },
    builderUi: { loading: "Cargando tu itinerario...", myStops: "Mis paradas", browseAdd: "Buscar y añadir", trip: "Viaje", setTripDate: "Definir fecha del viaje (opcional)", date: "Fecha", clearDates: "Borrar fechas", noStops: "Aún no hay paradas", noStopsHint: "Busca y añade playas, actividades o lugares", totalDriving: "Conducción total", saving: "Guardando...", viewOnMap: "Ver en el mapa", exportPdf: "Exportar PDF", searchPlaceholder: "Buscar lugares, playas, actividades...", all: "Todo", beaches: "Playas", activities: "Actividades", places: "Lugares", loadingPool: "Cargando {beaches} playas, {activities} actividades y {places} lugares...", justMoment: "Un momento", noResults: "No se encontraron resultados", added: "Añadido", add: "+ Añadir", yourRoute: "Tu ruta", closeMap: "Cerrar mapa", editTitle: "Editar tu itinerario", createTitle: "Crear tu itinerario", editSubtitle: "Actualiza tus paradas, reordena y guarda los cambios", createSubtitle: "Añade playas, actividades y lugares - luego ve tu ruta en el mapa", printTitle: "Mi itinerario por Mauricio" },
  }),
  ru: makeItineraryTranslations({
    metadata: { title: "Маршрут по Маврикию: 3, 5, 7 и 10 дней (гид 2026)", description: "Полный гид по маршрутам Маврикия на 3, 5, 7 и 10 дней: пляжи, активности, водопады и культура.", ogAlt: "Вид с воздуха на Ле-Морн, Маврикий" },
    hero: { imageAlt: "Вид с воздуха на Ле-Морн, Маврикий - планирование маршрута", kicker: "Путеводитель 2026", title: "Маршрут по Маврикию: 3, 5, 7 и 10 дней", subtitle: "Спланируйте идеальную поездку на Маврикий - пляжи, водопады, горы и культура по длительности отдыха." },
    days: { title: "Сколько дней нужно на Маврикии?", body: "Идеальная длительность зависит от стиля поездки. Три дня покажут главное, пять дней дадут баланс, семь дней подойдут для полного круга по острову, а десять дней позволят ехать спокойно.", dayLabel: "{days} дней на Маврикии", descriptions: ["Быстрые highlights и пляж", "Сбалансированный маршрут", "Полное знакомство с островом", "Максимальный маршрут с скрытыми местами"] },
    feature: { title: "Лучшее путешествие на 3-5-7-10 дней", subtitle: "Десять дней, три региона - бирюзовый север, дикий юг и золотой запад.", stats: ["Дни", "Регионы", "Побережье", "Внутри острова"], body: "Один остров, четыре готовых маршрута. Выберите нужную длительность: каждый маршрут расширяет предыдущий.", choose: "Выберите длительность", mapAlt: "Карта маршрута Маврикия", mapCaption: "Каждый маршрут делает круг по острову", taxiText: "Трансферы из аэропорта и водитель на день.", carTitle: "Аренда авто", carText: "Скидка 15% - код MEXP26", book: "Бронировать - mauritiusexplored.com", planSmart: "Планируйте умно" },
    routeSection: { kicker: "03 - Маршруты | Поездка на авто", driveRoute: "Маршрут на авто", stops: "Остановки", onRoad: "В дороге", descriptions: { three: "Короткий круг по острову - северные пляжи, дикий запад и восточно-южное побережье.", five: "Сбалансированный круг: пляжи, природа, культура и лагуна.", seven: "Полный круг - все побережья, водопады, лодочный день и центральные высоты.", ten: "Весь остров в спокойном темпе - побережье, центр и обратно." } },
    sections: { bestPlacesTitle: "Лучшие места для маршрута по Маврикию", bestPlacesBody: "Независимо от длительности, эти места стоит включить:", explorePlaces: "Смотреть все места", stayTitle: "Где остановиться на Маврикии", stayBody: "Выбор региона помогает оптимизировать маршрут:", tipsTitle: "Советы для маршрута по Маврикию", finalTitle: "Итог", finalBody: "Этот раздел помогает планировать поездку эффективно и увидеть лучшее на острове.", ctaTitle: "Готовы создать свой маршрут?", ctaBody: "Выберите пляжи, активности и места - смотрите маршрут на карте, сохраняйте и делитесь.", ctaButton: "Создать маршрут" },
    roadtripPage: { metadataTitle: "Маршруты по Маврикию - план поездки", metadataDescription: "Планируйте road trip и маршруты по Маврикию с пляжами, достопримечательностями и живописными дорогами.", heroAlt: "План маршрута по Маврикию", title: "Ваш маршрут по Маврикию", subtitle: "Пляжи, активности и природные места на одной карте", createTitle: "Создайте свои маршруты", createAlt: "Создать маршрут", createCardTitle: "Создать маршрут", newBadge: "Новое", createCardDescription: "Добавляйте свои остановки и создавайте личную карту", createButton: "Создать самостоятельно", communityTitle: "Маршруты от других путешественников", communitySubtitle: "Откройте поездки, которыми делится сообщество Mauritius Explored", emptyTitle: "Пока нет общих маршрутов", emptyDescription: "Будьте первым - создайте свой маршрут и поделитесь им.", by: "от", stopSingular: "остановка", stopPlural: "остановок", categories: "Категории", filters: { all: "Все маршруты", region: "Регион", discovery: "Открытия", culture: "Культура", explore: "Исследовать", fullDay: "Полный день" }, itinerarySingular: "маршрут", itineraryPlural: "маршрутов", noCategoryResults: "В этой категории маршруты не найдены." },
    detailUi: { backToAll: "Назад ко всем маршрутам", map: "Карта", stops: "Остановки", stopsOnItinerary: "Остановки этого маршрута", emptyStops: "Детали остановок появятся здесь.", stopDetails: "Детали остановки", zoomOnMap: "Показать на карте", toNextStop: "до следующей остановки", tips: "Советы", mapForItinerary: "Карта этого маршрута", otherItineraries: "Другие маршруты", close: "Закрыть", previousImage: "Предыдущее изображение", nextImage: "Следующее изображение", photo: "фото", by: "от", stopSingular: "остановка", stopPlural: "остановок" },
    builderUi: { loading: "Загрузка маршрута...", myStops: "Мои остановки", browseAdd: "Искать и добавить", trip: "Поездка", setTripDate: "Указать дату поездки (необязательно)", date: "Дата", clearDates: "Очистить даты", noStops: "Пока нет остановок", noStopsHint: "Ищите и добавляйте пляжи, активности или места", totalDriving: "Всего за рулем", saving: "Сохранение...", viewOnMap: "Показать на карте", exportPdf: "Экспорт PDF", searchPlaceholder: "Искать места, пляжи, активности...", all: "Все", beaches: "Пляжи", activities: "Активности", places: "Места", loadingPool: "Загрузка: {beaches} пляжей, {activities} активностей и {places} мест...", justMoment: "Один момент", noResults: "Ничего не найдено", added: "Добавлено", add: "+ Добавить", yourRoute: "Ваш маршрут", closeMap: "Закрыть карту", editTitle: "Редактировать маршрут", createTitle: "Создать маршрут", editSubtitle: "Обновите остановки, измените порядок и сохраните", createSubtitle: "Добавьте пляжи, активности и места - затем посмотрите маршрут на карте", printTitle: "Мой маршрут по Маврикию" },
  }),
};

export function getItineraryTranslations(locale: string) {
  return itineraryTranslations[locale as ItineraryLocale] ?? itineraryTranslations.en;
}
