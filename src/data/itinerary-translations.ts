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
    dayTitle: "{days}-Day",
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
  driveStops: {
    three: [
      { route: "Port Louis -> Cap Malheureux", region: "North", stops: "Central Market - Mont Choisy - Pereybere - red-roof church" },
      { route: "Tamarin Bay -> Chamarel", region: "West", stops: "Dolphin trip - Flic en Flac - Le Morne - Chamarel Falls - sunset" },
      { route: "Ile aux Cerfs -> Gris Gris", region: "South-West", stops: "GRSE Waterfall - Blue Bay snorkel - Gris Gris cliffs" },
    ],
    five: [
      { route: "Port Louis -> Cap Malheureux", region: "North", stops: "Central Market - Caudan - Mont Choisy - Pereybere" },
      { route: "Tamarin Bay -> Albion", region: "West", stops: "Dolphin watching - Flic en Flac - Albion Beach" },
      { route: "Le Morne -> Chamarel", region: "South-West", stops: "Le Morne Brabant - Chamarel Falls - Black River Gorges viewpoint" },
      { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "East", stops: "Ile aux Cerfs - GRSE Waterfall - full lagoon day" },
      { route: "Blue Bay -> Souillac", region: "South", stops: "Blue Bay - Mahebourg - Gris Gris - Souillac (+ Grand Bassin)" },
    ],
    seven: [
      { route: "Airport -> Grand Baie", region: "North", stops: "Settle in - Mont Choisy - Grand Baie by night" },
      { route: "Grand Baie -> Cap Malheureux", region: "North", stops: "Central Market - Caudan - Pereybere - sunset church" },
      { route: "Tamarin -> Flic en Flac", region: "West", stops: "Dolphin watching - Flic en Flac beach" },
      { route: "Flic en Flac -> Chamarel", region: "South-West", stops: "Le Morne - Chamarel Falls - scenic viewpoints" },
      { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "East", stops: "Ile aux Cerfs - GRSE Waterfall - boat day" },
      { route: "Blue Bay -> Gris Gris", region: "South", stops: "Blue Bay snorkel - Mahebourg - Gris Gris cliffs" },
      { route: "Grand Bassin -> Black River Gorges", region: "Inland", stops: "Sacred crater lake - gorge hikes and viewpoints" },
    ],
    ten: [
      { route: "Airport -> Your resort", region: "North", stops: "Settle in - first swim - sunset" },
      { route: "Resort -> Le Morne", region: "West", stops: "Casela park - Flic en Flac - Tamarin - Le Morne" },
      { route: "West coast -> Blue Bay", region: "East", stops: "Blue Bay Marine Park - Ile aux Aigrettes" },
      { route: "Coast -> Highlands", region: "South-West", stops: "Seven Waterfalls or Black River Gorges" },
      { route: "Interior -> Gris Gris", region: "South", stops: "La Vanille - Bel Ombre - Gris Gris - Natural Bridge" },
      { route: "Chamarel -> Black River", region: "Inland", stops: "7 Coloured Earth - Chamarel Falls - Rum Distillery" },
      { route: "Coast -> Ile aux Cerfs", region: "East", stops: "Ile aux Cerfs - GRSE Waterfall - Ile de la Passe" },
      { route: "Beaches -> Port Louis", region: "North", stops: "Central Market - Caudan - Aapravasi Ghat" },
      { route: "Port Louis -> Grand Baie", region: "North", stops: "Mont Choisy - Trou aux Biches - Grand Baie - Pereybere" },
      { route: "Resort -> Airport", region: "West", stops: "Beach walk - spa - final swim before you fly" },
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
  driveStops?: ItineraryTranslations["driveStops"];
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

Object.assign(itineraryTranslations.de, {
  intro: {
    paragraph1Before: "Planen Sie eine Reise nach Mauritius? Dieser komplette",
    highlight: "Mauritius-Reiseroutenführer",
    paragraph1After:
      "hilft Ihnen, die perfekte Reise zu planen, egal ob Sie 3 Tage, 5 Tage, eine Woche oder 10 Tage auf der Insel haben. Von weißen Sandstränden und türkisfarbenen Lagunen bis zu Wasserfällen, Bergen und Kulturorten bietet Mauritius eine der abwechslungsreichsten Reiseerfahrungen im Indischen Ozean. Diese Seite ist Ihr zentraler Ausgangspunkt für detaillierte Routen nach Reisedauer, Stil und wichtigsten Highlights.",
    paragraph2Parts: {
      beforeNorth: "Mauritius ist relativ klein, aber jede Region bietet etwas ganz anderes. Der",
      north: "Norden",
      afterNorth: "ist lebendig und quirlig, der",
      west: "Westen",
      afterWest: "ist bekannt für Sonnenuntergänge und Delfine, der",
      east: "Osten",
      afterEast: "bietet Luxusresorts und ruhige Strände, und der",
      south: "Süden",
      afterSouth:
        "zeigt eine wilde, unberührte Küste. Eine gut geplante Route hilft Ihnen, jede Region sinnvoll zu erleben, ohne Zeit mit unnötigen Fahrten zu verlieren.",
    },
  },
  guides: [
    { ...enItineraryTranslations.guides[0], title: "3 Tage Mauritius Reiseroute", subtitle: "Kurzreise-Guide", description: "Für einen kurzen Aufenthalt konzentriert sich diese Route auf die wichtigsten Highlights: Port Louis, die Strände im Norden, Le Morne und Chamarel." },
    { ...enItineraryTranslations.guides[1], title: "5 Tage Mauritius Reiseroute", subtitle: "Beste Highlights", description: "Fünf Tage ermöglichen eine gute Mischung aus Nordstränden, Westküste, Ile aux Cerfs und Naturorten wie Black River Gorges." },
    { ...enItineraryTranslations.guides[2], title: "7 Tage Mauritius Reiseroute", subtitle: "Perfekte Woche", description: "Eine Woche gibt genug Zeit für jede Region: Strände, Wasserfälle, Naturparks, Grand Bassin, Blue Bay und Insel-Ausflüge." },
    { ...enItineraryTranslations.guides[3], title: "10 Tage Mauritius Reiseroute", subtitle: "Ultimativer Guide", description: "Zehn Tage bieten das entspannteste Tempo für Klassiker und ruhigere Orte wie La Cambuse oder Riambel." },
  ],
  topPlaces: [
    { name: "Le Morne Brabant", description: "Ikonischer Berg und Strand" },
    { name: "Chamarel", description: "Wasserfall und Aussichtspunkte" },
    { name: "Ile aux Cerfs", description: "Lagune und Aktivitäten" },
    { name: "Blue Bay Marine Park", description: "Top-Spot zum Schnorcheln" },
    { name: "Port Louis", description: "Kultur und Märkte" },
    { name: "Tamarin Bay", description: "Delfine und Sonnenuntergänge" },
  ],
  stayRegions: [
    { name: "Norden (Grand Baie)", description: "Nachtleben, Restaurants, einfache Wege" },
    { name: "Westen (Flic en Flac, Le Morne)", description: "Sonnenuntergänge, Strände, Aktivitäten" },
    { name: "Osten (Belle Mare)", description: "Luxusresorts und ruhige Strände" },
    { name: "Süden", description: "Natur, wilde Landschaften, weniger Besucher" },
  ],
  travelTips: [
    "Ein Mietwagen ist die flexibelste Art, die Insel zu erkunden",
    "Starten Sie früh, um Hitze und Besucherandrang zu vermeiden",
    "Planen Sie nach Regionen, um Fahrzeiten zu reduzieren",
    "Kombinieren Sie Strandtage mit Ausflügen ins Inselinnere",
    "Prüfen Sie das Wetter für Schnorchel- und Bootsausflüge",
  ],
  routeSummary: [
    { days: "3", title: "3-Tage-Route", description: "Nordstrände, wilder Westen und Südküste." },
    { days: "5", title: "5-Tage-Route", description: "Strände, Natur, Kultur und ein Lagunentag." },
    { days: "7", title: "7-Tage-Route", description: "Jede Küste, Wasserfälle und ein Bootstag." },
    { days: "10", title: "10-Tage-Route", description: "Von Küste zu Inland und zurück, eine Region pro Tag." },
  ],
  planSmartTips: [
    { title: "Freiheit mit Mietwagen", description: "ein Mietwagen erreicht abgelegene Orte; links fahren." },
    { title: "2+ Basen wählen", description: "teilen Sie Norden und Süden/Westen, um Fahrten zu verkürzen." },
    { title: "Digital vorbereiten", description: "füllen Sie Pflichtformulare vor dem Flug aus." },
    { title: "Mehr als Strände", description: "von Dholl Puri auf der Straße bis Fine Dining." },
  ],
  roadTips: {
    three: [
      { title: "Links fahren", description: "Straßen sind gut beschildert; Automatik ist am einfachsten." },
      { title: "Früh starten", description: "vermeiden Sie Verkehr, Hitze und Menschenmengen." },
      { title: "Vorab buchen", description: "reservieren Sie Bootsausflüge und Katamaran-Tage." },
      { title: "Mietwagen ab ca. 21 USD/Tag", description: "eigenes Tempo und volle Inselfreiheit." },
    ],
    five: [
      { title: "Zuerst der Norden", description: "beginnen Sie mit Grand Baie und Cap Malheureux vor längeren Küstenfahrten." },
      { title: "Puffer für Bootstag", description: "halten Sie Ile aux Cerfs flexibel, falls Wind oder Regen Abfahrten ändern." },
      { title: "Leicht packen", description: "Badesachen, riffsichere Sonnencreme und Dry Bag mitnehmen." },
      { title: "Abendessen buchen", description: "beliebte Westküsten-Tische zum Sonnenuntergang vorab reservieren." },
    ],
  },
  faqs: [
    { question: "Wie viele Tage brauche ich auf Mauritius?", answer: "Sieben bis zehn Tage sind ideal, aber drei bis fünf Tage reichen für Strände, Port Louis, Le Morne, Chamarel und einen Ausflug." },
    { question: "Welche Route eignet sich für den ersten Besuch?", answer: "Kombinieren Sie Nordstrände, Port Louis, Westküste, Chamarel, Le Morne und je nach Unterkunft Ile aux Cerfs oder Blue Bay." },
    { question: "Sollte ich ein Auto mieten?", answer: "Ein Auto ist gut für flexible Roadtrips; Taxis und private Transfers sind einfacher, wenn Sie nicht links fahren möchten." },
  ],
});

Object.assign(itineraryTranslations.it, {
  intro: {
    paragraph1Before: "Stai pianificando un viaggio a Mauritius? Questa completa",
    highlight: "guida agli itinerari di Mauritius",
    paragraph1After:
      "ti aiuta a organizzare il viaggio perfetto, che tu abbia 3 giorni, 5 giorni, una settimana o 10 giorni sull'isola. Dalle spiagge bianche e lagune turchesi a cascate, montagne e luoghi culturali, Mauritius offre un'esperienza molto varia nell'Oceano Indiano.",
    paragraph2Parts: {
      beforeNorth: "Mauritius è piccola, ma ogni regione offre qualcosa di diverso. Il",
      north: "nord",
      afterNorth: "è vivace, l'",
      west: "ovest",
      afterWest: "è famoso per tramonti e delfini, l'",
      east: "est",
      afterEast: "ospita resort di lusso e spiagge tranquille, e il",
      south: "sud",
      afterSouth: "rivela una costa selvaggia e poco toccata. Un itinerario ben pianificato ti fa vedere il meglio di ogni zona senza perdere tempo in spostamenti inutili.",
    },
  },
  topPlaces: [
    { name: "Le Morne Brabant", description: "Montagna e spiaggia iconiche" },
    { name: "Chamarel", description: "Cascata e punti panoramici" },
    { name: "Ile aux Cerfs", description: "Laguna e attività" },
    { name: "Blue Bay Marine Park", description: "Miglior spot per snorkeling" },
    { name: "Port Louis", description: "Cultura e mercati" },
    { name: "Tamarin Bay", description: "Delfini e tramonti" },
  ],
  stayRegions: [
    { name: "Nord (Grand Baie)", description: "Vita notturna, ristoranti, accesso facile" },
    { name: "Ovest (Flic en Flac, Le Morne)", description: "Tramonti, spiagge, attività" },
    { name: "Est (Belle Mare)", description: "Resort di lusso e spiagge tranquille" },
    { name: "Sud", description: "Natura, paesaggi selvaggi, meno folla" },
  ],
  routeSummary: [
    { days: "3", title: "Itinerario 3 giorni", description: "Spiagge del nord, ovest selvaggio e costa sud." },
    { days: "5", title: "Itinerario 5 giorni", description: "Spiagge, natura, cultura e laguna." },
    { days: "7", title: "Itinerario 7 giorni", description: "Ogni costa, cascate e una giornata in barca." },
    { days: "10", title: "Itinerario 10 giorni", description: "Dalla costa all'interno, una regione al giorno." },
  ],
  planSmartTips: [
    { title: "Libertà in auto", description: "un noleggio raggiunge luoghi isolati; guida a sinistra." },
    { title: "Scegli 2+ basi", description: "dividi nord e sud/ovest per ridurre gli spostamenti." },
    { title: "Preparati online", description: "compila i moduli richiesti prima del volo." },
    { title: "Oltre le spiagge", description: "dal dholl puri di strada alla cucina raffinata." },
  ],
  roadTips: enItineraryTranslations.roadTips,
  faqs: [
    { question: "Quanti giorni servono a Mauritius?", answer: "Sette-dieci giorni sono ideali, ma tre-cinque giorni coprono già spiagge, Port Louis, Le Morne, Chamarel e un'escursione." },
    { question: "Quale itinerario scegliere la prima volta?", answer: "Unisci spiagge del nord, Port Louis, costa ovest, Chamarel, Le Morne e Ile aux Cerfs o Blue Bay." },
    { question: "Conviene noleggiare un'auto?", answer: "L'auto aiuta per road trip flessibili; taxi e transfer sono più semplici se non vuoi guidare a sinistra." },
  ],
});

Object.assign(itineraryTranslations.es, {
  intro: {
    paragraph1Before: "¿Planeas un viaje a Mauricio? Esta completa",
    highlight: "guía de itinerario por Mauricio",
    paragraph1After:
      "te ayuda a planificar el viaje perfecto, ya tengas 3 días, 5 días, una semana o 10 días en la isla. Desde playas blancas y lagunas turquesas hasta cascadas, montañas y cultura, Mauricio ofrece una experiencia muy variada en el océano Índico.",
    paragraph2Parts: {
      beforeNorth: "Mauricio es pequeño, pero cada región ofrece algo diferente. El",
      north: "norte",
      afterNorth: "es animado, el",
      west: "oeste",
      afterWest: "es conocido por atardeceres y delfines, el",
      east: "este",
      afterEast: "tiene resorts de lujo y playas tranquilas, y el",
      south: "sur",
      afterSouth: "muestra una costa salvaje e intacta. Un buen itinerario te permite ver lo mejor de cada zona sin perder tiempo en trayectos innecesarios.",
    },
  },
  travelTips: [
    "Alquilar coche es la forma más flexible de explorar la isla",
    "Empieza temprano para evitar calor y multitudes",
    "Planifica por regiones para reducir trayectos",
    "Combina días de playa con exploración interior",
    "Revisa el tiempo para snorkel y salidas en barco",
  ],
  planSmartTips: [
    { title: "Libertad con coche", description: "un alquiler llega a lugares aislados; se conduce por la izquierda." },
    { title: "Usa 2+ bases", description: "divide norte y sur/oeste para conducir menos." },
    { title: "Todo digital", description: "completa los formularios obligatorios antes de volar." },
    { title: "Más que playas", description: "de dholl puri callejero a alta cocina." },
  ],
  roadTips: enItineraryTranslations.roadTips,
  topPlaces: itineraryTranslations.fr.topPlaces.map((p, index) => [
    { name: "Le Morne Brabant", description: "Montaña y playa icónicas" },
    { name: "Chamarel", description: "Cascada y miradores" },
    { name: "Ile aux Cerfs", description: "Laguna y actividades" },
    { name: "Blue Bay Marine Park", description: "Mejor lugar para snorkel" },
    { name: "Port Louis", description: "Cultura y mercados" },
    { name: "Tamarin Bay", description: "Delfines y atardeceres" },
  ][index]),
  stayRegions: [
    { name: "Norte (Grand Baie)", description: "Vida nocturna, restaurantes, acceso fácil" },
    { name: "Oeste (Flic en Flac, Le Morne)", description: "Atardeceres, playas, actividades" },
    { name: "Este (Belle Mare)", description: "Resorts de lujo y playas tranquilas" },
    { name: "Sur", description: "Naturaleza, paisajes salvajes, menos gente" },
  ],
  faqs: [
    { question: "¿Cuántos días necesito en Mauricio?", answer: "Siete a diez días es ideal, pero tres a cinco días cubren playas, Port Louis, Le Morne, Chamarel y una excursión." },
    { question: "¿Cuál es el mejor itinerario para una primera visita?", answer: "Mezcla playas del norte, Port Louis, costa oeste, Chamarel, Le Morne e Ile aux Cerfs o Blue Bay." },
    { question: "¿Debo alquilar un coche?", answer: "El coche ayuda en road trips flexibles; taxis y transfers son más fáciles si prefieres no conducir por la izquierda." },
  ],
});

Object.assign(itineraryTranslations.ru, {
  intro: {
    paragraph1Before: "Планируете поездку на Маврикий? Этот полный",
    highlight: "гид по маршрутам Маврикия",
    paragraph1After:
      "поможет спланировать идеальное путешествие, будь то 3 дня, 5 дней, неделя или 10 дней на острове. Белые пляжи, бирюзовые лагуны, водопады, горы и культурные места делают Маврикий очень разнообразным направлением.",
    paragraph2Parts: {
      beforeNorth: "Маврикий сравнительно небольшой, но каждый регион отличается. ",
      north: "север",
      afterNorth: "живой и активный, ",
      west: "запад",
      afterWest: "известен закатами и дельфинами, ",
      east: "восток",
      afterEast: "подходит для спокойных пляжей и роскошных resorts, а ",
      south: "юг",
      afterSouth: "открывает дикую и нетронутую береговую линию. Хороший маршрут помогает увидеть лучшее в каждом регионе без лишних переездов.",
    },
  },
  topPlaces: [
    { name: "Le Morne Brabant", description: "Знаковая гора и пляж" },
    { name: "Chamarel", description: "Водопад и смотровые площадки" },
    { name: "Ile aux Cerfs", description: "Лагуна и активности" },
    { name: "Blue Bay Marine Park", description: "Лучшее место для снорклинга" },
    { name: "Port Louis", description: "Культура и рынки" },
    { name: "Tamarin Bay", description: "Дельфины и закаты" },
  ],
  stayRegions: [
    { name: "Север (Grand Baie)", description: "Ночная жизнь, рестораны, удобный доступ" },
    { name: "Запад (Flic en Flac, Le Morne)", description: "Закаты, пляжи, активности" },
    { name: "Восток (Belle Mare)", description: "Роскошные resorts и спокойные пляжи" },
    { name: "Юг", description: "Природа, дикие пейзажи, меньше людей" },
  ],
  travelTips: [
    "Аренда авто - самый гибкий способ исследовать остров",
    "Начинайте рано, чтобы избежать жары и толп",
    "Планируйте по регионам, чтобы сократить переезды",
    "Сочетайте пляжные дни с поездками вглубь острова",
    "Проверяйте погоду для снорклинга и лодочных туров",
  ],
  routeSummary: [
    { days: "3", title: "Маршрут 3 дня", description: "Северные пляжи, дикий запад и южное побережье." },
    { days: "5", title: "Маршрут 5 дней", description: "Пляжи, природа, культура и день в лагуне." },
    { days: "7", title: "Маршрут 7 дней", description: "Все побережья, водопады и день на лодке." },
    { days: "10", title: "Маршрут 10 дней", description: "От побережья к центру острова, по региону в день." },
  ],
  planSmartTips: [
    { title: "Свобода с авто", description: "аренда довезет до уединенных мест; движение левостороннее." },
    { title: "2+ базы", description: "разделите север и юг/запад, чтобы меньше ездить." },
    { title: "Цифровая подготовка", description: "заполните обязательные формы до вылета." },
    { title: "Больше чем пляжи", description: "от уличного dholl puri до fine dining." },
  ],
  roadTips: enItineraryTranslations.roadTips,
  faqs: [
    { question: "Сколько дней нужно на Маврикии?", answer: "Лучше 7-10 дней, но за 3-5 дней можно увидеть пляжи, Port Louis, Le Morne, Chamarel и одну экскурсию." },
    { question: "Какой маршрут выбрать для первой поездки?", answer: "Сочетайте северные пляжи, Port Louis, западное побережье, Chamarel, Le Morne и Ile aux Cerfs или Blue Bay." },
    { question: "Нужно ли арендовать машину?", answer: "Авто удобно для гибких road trip; такси и трансферы проще, если не хотите водить слева." },
  ],
});

Object.assign(itineraryTranslations.fr.routeSection, { dayTitle: "{days} jours" });
itineraryTranslations.fr.driveStops = {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "Nord", stops: "Marche central - Mont Choisy - Pereybere - eglise au toit rouge" },
    { route: "Tamarin Bay -> Chamarel", region: "Ouest", stops: "Sortie dauphins - Flic en Flac - Le Morne - cascade de Chamarel - coucher de soleil" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "Sud-ouest", stops: "Cascade GRSE - snorkeling a Blue Bay - falaises de Gris Gris" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "Nord", stops: "Marche central - Caudan - Mont Choisy - Pereybere" },
    { route: "Tamarin Bay -> Albion", region: "Ouest", stops: "Observation des dauphins - Flic en Flac - plage d'Albion" },
    { route: "Le Morne -> Chamarel", region: "Sud-ouest", stops: "Le Morne Brabant - cascade de Chamarel - point de vue des Gorges de Riviere Noire" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Est", stops: "Ile aux Cerfs - cascade GRSE - journee lagon complete" },
    { route: "Blue Bay -> Souillac", region: "Sud", stops: "Blue Bay - Mahebourg - Gris Gris - Souillac (+ Grand Bassin)" },
  ],
  seven: [
    { route: "Aeroport -> Grand Baie", region: "Nord", stops: "Installation - Mont Choisy - Grand Baie le soir" },
    { route: "Grand Baie -> Cap Malheureux", region: "Nord", stops: "Marche central - Caudan - Pereybere - eglise au coucher du soleil" },
    { route: "Tamarin -> Flic en Flac", region: "Ouest", stops: "Observation des dauphins - plage de Flic en Flac" },
    { route: "Flic en Flac -> Chamarel", region: "Sud-ouest", stops: "Le Morne - cascade de Chamarel - points de vue panoramiques" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Est", stops: "Ile aux Cerfs - cascade GRSE - journee bateau" },
    { route: "Blue Bay -> Gris Gris", region: "Sud", stops: "Snorkeling a Blue Bay - Mahebourg - falaises de Gris Gris" },
    { route: "Grand Bassin -> Black River Gorges", region: "Interieur", stops: "Lac sacre de cratere - randonnees et points de vue dans les gorges" },
  ],
  ten: [
    { route: "Aeroport -> Votre resort", region: "Nord", stops: "Installation - premiere baignade - coucher de soleil" },
    { route: "Resort -> Le Morne", region: "Ouest", stops: "Parc Casela - Flic en Flac - Tamarin - Le Morne" },
    { route: "Cote ouest -> Blue Bay", region: "Est", stops: "Blue Bay Marine Park - Ile aux Aigrettes" },
    { route: "Cote -> Hauts plateaux", region: "Sud-ouest", stops: "Sept Cascades ou Gorges de Riviere Noire" },
    { route: "Interieur -> Gris Gris", region: "Sud", stops: "La Vanille - Bel Ombre - Gris Gris - Natural Bridge" },
    { route: "Chamarel -> Black River", region: "Interieur", stops: "Terre des 7 Couleurs - cascade de Chamarel - rhumerie" },
    { route: "Cote -> Ile aux Cerfs", region: "Est", stops: "Ile aux Cerfs - cascade GRSE - Ile de la Passe" },
    { route: "Plages -> Port Louis", region: "Nord", stops: "Marche central - Caudan - Aapravasi Ghat" },
    { route: "Port Louis -> Grand Baie", region: "Nord", stops: "Mont Choisy - Trou aux Biches - Grand Baie - Pereybere" },
    { route: "Resort -> Aeroport", region: "Ouest", stops: "Balade sur la plage - spa - derniere baignade avant le vol" },
  ],
};

Object.assign(itineraryTranslations.de.routeSection, { dayTitle: "{days}-Tage" });
itineraryTranslations.de.driveStops = {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "Norden", stops: "Central Market - Mont Choisy - Pereybere - Kirche mit rotem Dach" },
    { route: "Tamarin Bay -> Chamarel", region: "Westen", stops: "Delfintour - Flic en Flac - Le Morne - Chamarel-Wasserfall - Sonnenuntergang" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "Sudwesten", stops: "GRSE-Wasserfall - Schnorcheln in Blue Bay - Klippen von Gris Gris" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "Norden", stops: "Central Market - Caudan - Mont Choisy - Pereybere" },
    { route: "Tamarin Bay -> Albion", region: "Westen", stops: "Delfinbeobachtung - Flic en Flac - Albion Beach" },
    { route: "Le Morne -> Chamarel", region: "Sudwesten", stops: "Le Morne Brabant - Chamarel-Wasserfall - Aussichtspunkt Black River Gorges" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Osten", stops: "Ile aux Cerfs - GRSE-Wasserfall - ganzer Lagunentag" },
    { route: "Blue Bay -> Souillac", region: "Suden", stops: "Blue Bay - Mahebourg - Gris Gris - Souillac (+ Grand Bassin)" },
  ],
  seven: [
    { route: "Flughafen -> Grand Baie", region: "Norden", stops: "Ankommen - Mont Choisy - Grand Baie am Abend" },
    { route: "Grand Baie -> Cap Malheureux", region: "Norden", stops: "Central Market - Caudan - Pereybere - Kirche zum Sonnenuntergang" },
    { route: "Tamarin -> Flic en Flac", region: "Westen", stops: "Delfinbeobachtung - Strand von Flic en Flac" },
    { route: "Flic en Flac -> Chamarel", region: "Sudwesten", stops: "Le Morne - Chamarel-Wasserfall - Aussichtspunkte" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Osten", stops: "Ile aux Cerfs - GRSE-Wasserfall - Bootstag" },
    { route: "Blue Bay -> Gris Gris", region: "Suden", stops: "Schnorcheln in Blue Bay - Mahebourg - Klippen von Gris Gris" },
    { route: "Grand Bassin -> Black River Gorges", region: "Inland", stops: "Heiliger Kratersee - Wanderungen und Aussichtspunkte in den Schluchten" },
  ],
  ten: [
    { route: "Flughafen -> Ihr Resort", region: "Norden", stops: "Ankommen - erstes Schwimmen - Sonnenuntergang" },
    { route: "Resort -> Le Morne", region: "Westen", stops: "Casela Park - Flic en Flac - Tamarin - Le Morne" },
    { route: "Westkuste -> Blue Bay", region: "Osten", stops: "Blue Bay Marine Park - Ile aux Aigrettes" },
    { route: "Kuste -> Hochland", region: "Sudwesten", stops: "Sieben Wasserfalle oder Black River Gorges" },
    { route: "Inland -> Gris Gris", region: "Suden", stops: "La Vanille - Bel Ombre - Gris Gris - Natural Bridge" },
    { route: "Chamarel -> Black River", region: "Inland", stops: "7 Coloured Earth - Chamarel-Wasserfall - Rumdestillerie" },
    { route: "Kuste -> Ile aux Cerfs", region: "Osten", stops: "Ile aux Cerfs - GRSE-Wasserfall - Ile de la Passe" },
    { route: "Strande -> Port Louis", region: "Norden", stops: "Central Market - Caudan - Aapravasi Ghat" },
    { route: "Port Louis -> Grand Baie", region: "Norden", stops: "Mont Choisy - Trou aux Biches - Grand Baie - Pereybere" },
    { route: "Resort -> Flughafen", region: "Westen", stops: "Strandspaziergang - Spa - letztes Schwimmen vor dem Flug" },
  ],
};

Object.assign(itineraryTranslations.it.routeSection, { dayTitle: "{days} giorni" });
itineraryTranslations.it.driveStops = {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "Nord", stops: "Mercato centrale - Mont Choisy - Pereybere - chiesa dal tetto rosso" },
    { route: "Tamarin Bay -> Chamarel", region: "Ovest", stops: "Escursione delfini - Flic en Flac - Le Morne - Cascate di Chamarel - tramonto" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "Sud-ovest", stops: "Cascata GRSE - snorkeling a Blue Bay - scogliere di Gris Gris" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "Nord", stops: "Mercato centrale - Caudan - Mont Choisy - Pereybere" },
    { route: "Tamarin Bay -> Albion", region: "Ovest", stops: "Avvistamento delfini - Flic en Flac - Albion Beach" },
    { route: "Le Morne -> Chamarel", region: "Sud-ovest", stops: "Le Morne Brabant - Cascate di Chamarel - belvedere Black River Gorges" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Est", stops: "Ile aux Cerfs - Cascata GRSE - intera giornata in laguna" },
    { route: "Blue Bay -> Souillac", region: "Sud", stops: "Blue Bay - Mahebourg - Gris Gris - Souillac (+ Grand Bassin)" },
  ],
  seven: [
    { route: "Aeroporto -> Grand Baie", region: "Nord", stops: "Sistemazione - Mont Choisy - Grand Baie di sera" },
    { route: "Grand Baie -> Cap Malheureux", region: "Nord", stops: "Mercato centrale - Caudan - Pereybere - chiesa al tramonto" },
    { route: "Tamarin -> Flic en Flac", region: "Ovest", stops: "Avvistamento delfini - spiaggia di Flic en Flac" },
    { route: "Flic en Flac -> Chamarel", region: "Sud-ovest", stops: "Le Morne - Cascate di Chamarel - punti panoramici" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Est", stops: "Ile aux Cerfs - Cascata GRSE - giornata in barca" },
    { route: "Blue Bay -> Gris Gris", region: "Sud", stops: "Snorkeling a Blue Bay - Mahebourg - scogliere di Gris Gris" },
    { route: "Grand Bassin -> Black River Gorges", region: "Interno", stops: "Lago sacro nel cratere - trekking e belvedere nelle gole" },
  ],
  ten: [
    { route: "Aeroporto -> Il tuo resort", region: "Nord", stops: "Sistemazione - primo bagno - tramonto" },
    { route: "Resort -> Le Morne", region: "Ovest", stops: "Parco Casela - Flic en Flac - Tamarin - Le Morne" },
    { route: "Costa ovest -> Blue Bay", region: "Est", stops: "Blue Bay Marine Park - Ile aux Aigrettes" },
    { route: "Costa -> Altopiani", region: "Sud-ovest", stops: "Sette Cascate o Black River Gorges" },
    { route: "Interno -> Gris Gris", region: "Sud", stops: "La Vanille - Bel Ombre - Gris Gris - Natural Bridge" },
    { route: "Chamarel -> Black River", region: "Interno", stops: "7 Coloured Earth - Cascate di Chamarel - distilleria di rum" },
    { route: "Costa -> Ile aux Cerfs", region: "Est", stops: "Ile aux Cerfs - Cascata GRSE - Ile de la Passe" },
    { route: "Spiagge -> Port Louis", region: "Nord", stops: "Mercato centrale - Caudan - Aapravasi Ghat" },
    { route: "Port Louis -> Grand Baie", region: "Nord", stops: "Mont Choisy - Trou aux Biches - Grand Baie - Pereybere" },
    { route: "Resort -> Aeroporto", region: "Ovest", stops: "Passeggiata in spiaggia - spa - ultimo bagno prima del volo" },
  ],
};

Object.assign(itineraryTranslations.es.routeSection, { dayTitle: "{days} dias" });
itineraryTranslations.es.driveStops = {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "Norte", stops: "Mercado central - Mont Choisy - Pereybere - iglesia de techo rojo" },
    { route: "Tamarin Bay -> Chamarel", region: "Oeste", stops: "Excursion con delfines - Flic en Flac - Le Morne - cascada de Chamarel - atardecer" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "Suroeste", stops: "Cascada GRSE - snorkel en Blue Bay - acantilados de Gris Gris" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "Norte", stops: "Mercado central - Caudan - Mont Choisy - Pereybere" },
    { route: "Tamarin Bay -> Albion", region: "Oeste", stops: "Avistamiento de delfines - Flic en Flac - playa de Albion" },
    { route: "Le Morne -> Chamarel", region: "Suroeste", stops: "Le Morne Brabant - cascada de Chamarel - mirador de Black River Gorges" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Este", stops: "Ile aux Cerfs - cascada GRSE - dia completo de laguna" },
    { route: "Blue Bay -> Souillac", region: "Sur", stops: "Blue Bay - Mahebourg - Gris Gris - Souillac (+ Grand Bassin)" },
  ],
  seven: [
    { route: "Aeropuerto -> Grand Baie", region: "Norte", stops: "Instalarse - Mont Choisy - Grand Baie de noche" },
    { route: "Grand Baie -> Cap Malheureux", region: "Norte", stops: "Mercado central - Caudan - Pereybere - iglesia al atardecer" },
    { route: "Tamarin -> Flic en Flac", region: "Oeste", stops: "Avistamiento de delfines - playa de Flic en Flac" },
    { route: "Flic en Flac -> Chamarel", region: "Suroeste", stops: "Le Morne - cascada de Chamarel - miradores panoramicos" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Este", stops: "Ile aux Cerfs - cascada GRSE - dia en barco" },
    { route: "Blue Bay -> Gris Gris", region: "Sur", stops: "Snorkel en Blue Bay - Mahebourg - acantilados de Gris Gris" },
    { route: "Grand Bassin -> Black River Gorges", region: "Interior", stops: "Lago sagrado del crater - caminatas y miradores en las gargantas" },
  ],
  ten: [
    { route: "Aeropuerto -> Tu resort", region: "Norte", stops: "Instalarse - primer bano - atardecer" },
    { route: "Resort -> Le Morne", region: "Oeste", stops: "Parque Casela - Flic en Flac - Tamarin - Le Morne" },
    { route: "Costa oeste -> Blue Bay", region: "Este", stops: "Blue Bay Marine Park - Ile aux Aigrettes" },
    { route: "Costa -> Tierras altas", region: "Suroeste", stops: "Siete Cascadas o Black River Gorges" },
    { route: "Interior -> Gris Gris", region: "Sur", stops: "La Vanille - Bel Ombre - Gris Gris - Natural Bridge" },
    { route: "Chamarel -> Black River", region: "Interior", stops: "7 Coloured Earth - cascada de Chamarel - destileria de ron" },
    { route: "Costa -> Ile aux Cerfs", region: "Este", stops: "Ile aux Cerfs - cascada GRSE - Ile de la Passe" },
    { route: "Playas -> Port Louis", region: "Norte", stops: "Mercado central - Caudan - Aapravasi Ghat" },
    { route: "Port Louis -> Grand Baie", region: "Norte", stops: "Mont Choisy - Trou aux Biches - Grand Baie - Pereybere" },
    { route: "Resort -> Aeropuerto", region: "Oeste", stops: "Paseo por la playa - spa - ultimo bano antes del vuelo" },
  ],
};

Object.assign(itineraryTranslations.ru.routeSection, { dayTitle: "{days} дней" });
itineraryTranslations.ru.driveStops = {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "Север", stops: "Центральный рынок - Mont Choisy - Pereybere - церковь с красной крышей" },
    { route: "Tamarin Bay -> Chamarel", region: "Запад", stops: "Поездка к дельфинам - Flic en Flac - Le Morne - водопад Chamarel - закат" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "Юго-запад", stops: "Водопад GRSE - снорклинг в Blue Bay - скалы Gris Gris" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "Север", stops: "Центральный рынок - Caudan - Mont Choisy - Pereybere" },
    { route: "Tamarin Bay -> Albion", region: "Запад", stops: "Наблюдение за дельфинами - Flic en Flac - пляж Albion" },
    { route: "Le Morne -> Chamarel", region: "Юго-запад", stops: "Le Morne Brabant - водопад Chamarel - смотровая Black River Gorges" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Восток", stops: "Ile aux Cerfs - водопад GRSE - полный день в лагуне" },
    { route: "Blue Bay -> Souillac", region: "Юг", stops: "Blue Bay - Mahebourg - Gris Gris - Souillac (+ Grand Bassin)" },
  ],
  seven: [
    { route: "Аэропорт -> Grand Baie", region: "Север", stops: "Размещение - Mont Choisy - вечерний Grand Baie" },
    { route: "Grand Baie -> Cap Malheureux", region: "Север", stops: "Центральный рынок - Caudan - Pereybere - церковь на закате" },
    { route: "Tamarin -> Flic en Flac", region: "Запад", stops: "Наблюдение за дельфинами - пляж Flic en Flac" },
    { route: "Flic en Flac -> Chamarel", region: "Юго-запад", stops: "Le Morne - водопад Chamarel - живописные смотровые" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "Восток", stops: "Ile aux Cerfs - водопад GRSE - день на лодке" },
    { route: "Blue Bay -> Gris Gris", region: "Юг", stops: "Снорклинг в Blue Bay - Mahebourg - скалы Gris Gris" },
    { route: "Grand Bassin -> Black River Gorges", region: "Центр", stops: "Священное кратерное озеро - походы и смотровые в ущельях" },
  ],
  ten: [
    { route: "Аэропорт -> Ваш resort", region: "Север", stops: "Размещение - первое купание - закат" },
    { route: "Resort -> Le Morne", region: "Запад", stops: "Парк Casela - Flic en Flac - Tamarin - Le Morne" },
    { route: "Западное побережье -> Blue Bay", region: "Восток", stops: "Blue Bay Marine Park - Ile aux Aigrettes" },
    { route: "Побережье -> Высокогорье", region: "Юго-запад", stops: "Семь водопадов или Black River Gorges" },
    { route: "Центр -> Gris Gris", region: "Юг", stops: "La Vanille - Bel Ombre - Gris Gris - Natural Bridge" },
    { route: "Chamarel -> Black River", region: "Центр", stops: "7 Coloured Earth - водопад Chamarel - ромовая дистиллерия" },
    { route: "Побережье -> Ile aux Cerfs", region: "Восток", stops: "Ile aux Cerfs - водопад GRSE - Ile de la Passe" },
    { route: "Пляжи -> Port Louis", region: "Север", stops: "Центральный рынок - Caudan - Aapravasi Ghat" },
    { route: "Port Louis -> Grand Baie", region: "Север", stops: "Mont Choisy - Trou aux Biches - Grand Baie - Pereybere" },
    { route: "Resort -> Аэропорт", region: "Запад", stops: "Прогулка по пляжу - spa - последнее купание перед вылетом" },
  ],
};

Object.assign(itineraryTranslations.it, {
  guides: [
    { ...enItineraryTranslations.guides[0], title: "Itinerario Mauritius di 3 giorni", subtitle: "Guida per soggiorni brevi", description: "Per un soggiorno breve, questo itinerario punta sui luoghi essenziali: Port Louis, le spiagge del nord, Le Morne e Chamarel." },
    { ...enItineraryTranslations.guides[1], title: "Itinerario Mauritius di 5 giorni", subtitle: "Migliori highlights", description: "Cinque giorni permettono un buon equilibrio tra spiagge del nord, costa ovest, Ile aux Cerfs e natura come Black River Gorges." },
    { ...enItineraryTranslations.guides[2], title: "Itinerario Mauritius di 7 giorni", subtitle: "Settimana perfetta", description: "Una settimana offre tempo per ogni regione: spiagge, cascate, parchi naturali, Grand Bassin, Blue Bay e uscite in barca." },
    { ...enItineraryTranslations.guides[3], title: "Itinerario Mauritius di 10 giorni", subtitle: "Guida completa", description: "Dieci giorni danno il ritmo piu rilassato per classici e luoghi piu tranquilli come La Cambuse o Riambel." },
  ],
  travelTips: [
    "Noleggiare un'auto e il modo piu flessibile per esplorare l'isola",
    "Parti presto per evitare caldo e folla",
    "Pianifica per regioni per ridurre i tempi di guida",
    "Alterna giornate in spiaggia e visite nell'interno",
    "Controlla il meteo per snorkeling e uscite in barca",
  ],
  roadTips: {
    three: [
      { title: "Guida a sinistra", description: "le strade sono ben segnalate; un'auto automatica e la scelta piu semplice." },
      { title: "Parti presto", description: "evita traffico, caldo e gruppi numerosi." },
      { title: "Prenota prima", description: "blocca in anticipo escursioni in barca e giornate in catamarano." },
      { title: "Auto da circa 21 USD/giorno", description: "ritmo personale e massima liberta sull'isola." },
    ],
    five: [
      { title: "Nord per primo", description: "inizia da Grand Baie e Cap Malheureux prima delle tratte costiere piu lunghe." },
      { title: "Margine per la barca", description: "tieni Ile aux Cerfs flessibile se vento o pioggia cambiano le partenze." },
      { title: "Viaggia leggero", description: "porta costume, crema reef-safe e dry bag." },
      { title: "Cena prenotata", description: "riserva in anticipo i tavoli della costa ovest al tramonto." },
    ],
  },
});

Object.assign(itineraryTranslations.es, {
  guides: [
    { ...enItineraryTranslations.guides[0], title: "Itinerario de Mauricio de 3 dias", subtitle: "Guia para estancia corta", description: "Para una visita breve, este itinerario se centra en lo esencial: Port Louis, las playas del norte, Le Morne y Chamarel." },
    { ...enItineraryTranslations.guides[1], title: "Itinerario de Mauricio de 5 dias", subtitle: "Mejores destacados", description: "Cinco dias permiten combinar playas del norte, costa oeste, Ile aux Cerfs y naturaleza como Black River Gorges." },
    { ...enItineraryTranslations.guides[2], title: "Itinerario de Mauricio de 7 dias", subtitle: "Semana perfecta", description: "Una semana da tiempo para cada region: playas, cascadas, parques naturales, Grand Bassin, Blue Bay y salidas a islas." },
    { ...enItineraryTranslations.guides[3], title: "Itinerario de Mauricio de 10 dias", subtitle: "Guia completa", description: "Diez dias ofrecen el ritmo mas relajado para clasicos y lugares tranquilos como La Cambuse o Riambel." },
  ],
  routeSummary: [
    { days: "3", title: "Ruta de 3 dias", description: "Playas del norte, oeste salvaje y costa sur." },
    { days: "5", title: "Ruta de 5 dias", description: "Playas, naturaleza, cultura y un dia de laguna." },
    { days: "7", title: "Ruta de 7 dias", description: "Cada costa, cascadas y un dia en barco." },
    { days: "10", title: "Ruta de 10 dias", description: "De la costa al interior, una region por dia." },
  ],
  roadTips: {
    three: [
      { title: "Conduce por la izquierda", description: "las carreteras estan bien senalizadas; automatico es lo mas facil." },
      { title: "Empieza temprano", description: "evita trafico, calor y multitudes." },
      { title: "Reserva antes", description: "asegura excursiones en barco y dias de catamaran." },
      { title: "Coche desde aprox. 21 USD/dia", description: "tu propio ritmo y libertad total en la isla." },
    ],
    five: [
      { title: "Primero el norte", description: "empieza por Grand Baie y Cap Malheureux antes de trayectos costeros largos." },
      { title: "Deja margen para barco", description: "mantén Ile aux Cerfs flexible si viento o lluvia cambian salidas." },
      { title: "Equipaje ligero", description: "lleva banador, protector reef-safe y bolsa seca." },
      { title: "Reserva cena", description: "los restaurantes del oeste al atardecer se llenan rapido." },
    ],
  },
});

Object.assign(itineraryTranslations.ru, {
  guides: [
    { ...enItineraryTranslations.guides[0], title: "Маршрут по Маврикию на 3 дня", subtitle: "Гид для короткой поездки", description: "Для короткого отдыха маршрут показывает главное: Port Louis, северные пляжи, Le Morne и Chamarel." },
    { ...enItineraryTranslations.guides[1], title: "Маршрут по Маврикию на 5 дней", subtitle: "Лучшие места", description: "Пять дней дают хороший баланс: северные пляжи, западное побережье, Ile aux Cerfs и природа Black River Gorges." },
    { ...enItineraryTranslations.guides[2], title: "Маршрут по Маврикию на 7 дней", subtitle: "Идеальная неделя", description: "Неделя позволяет увидеть каждый регион: пляжи, водопады, природные парки, Grand Bassin, Blue Bay и островные экскурсии." },
    { ...enItineraryTranslations.guides[3], title: "Маршрут по Маврикию на 10 дней", subtitle: "Полный гид", description: "Десять дней дают спокойный темп для главных мест и тихих уголков вроде La Cambuse или Riambel." },
  ],
  roadTips: {
    three: [
      { title: "Движение слева", description: "дороги хорошо обозначены; автоматическая коробка проще." },
      { title: "Начинайте рано", description: "так легче избежать пробок, жары и толп." },
      { title: "Бронируйте заранее", description: "особенно лодочные экскурсии и катамараны." },
      { title: "Авто от примерно 21 USD/день", description: "свободный темп и максимум гибкости по острову." },
    ],
    five: [
      { title: "Сначала север", description: "начните с Grand Baie и Cap Malheureux перед длинными поездками вдоль побережья." },
      { title: "Запас для лодочного дня", description: "оставьте Ile aux Cerfs гибким, если ветер или дождь меняют расписание." },
      { title: "Берите немного вещей", description: "купальник, reef-safe крем и сухой мешок очень пригодятся." },
      { title: "Бронируйте ужин", description: "столики на западном побережье к закату лучше резервировать заранее." },
    ],
  },
});

function applyDriveRouteLabels(
  locale: Exclude<ItineraryLocale, "en">,
  labels: ItineraryTranslations["driveStops"],
) {
  (["three", "five", "seven", "ten"] as const).forEach((duration) => {
    itineraryTranslations[locale].driveStops[duration].forEach((stop, index) => {
      stop.route = labels[duration][index]?.route ?? stop.route;
    });
  });
}

applyDriveRouteLabels("fr", {
  three: [
    { route: "Port-Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Baie de Tamarin -> Chamarel", region: "", stops: "" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "", stops: "" },
  ],
  five: [
    { route: "Port-Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Baie de Tamarin -> Albion", region: "", stops: "" },
    { route: "Le Morne -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Souillac", region: "", stops: "" },
  ],
  seven: [
    { route: "Aeroport -> Grand Baie", region: "", stops: "" },
    { route: "Grand Baie -> Cap Malheureux", region: "", stops: "" },
    { route: "Tamarin -> Flic en Flac", region: "", stops: "" },
    { route: "Flic en Flac -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Gris Gris", region: "", stops: "" },
    { route: "Grand Bassin -> Gorges de Riviere Noire", region: "", stops: "" },
  ],
  ten: [
    { route: "Aeroport -> Votre hotel", region: "", stops: "" },
    { route: "Hotel -> Le Morne", region: "", stops: "" },
    { route: "Cote ouest -> Blue Bay", region: "", stops: "" },
    { route: "Cote -> Hauts plateaux", region: "", stops: "" },
    { route: "Interieur -> Gris Gris", region: "", stops: "" },
    { route: "Chamarel -> Riviere Noire", region: "", stops: "" },
    { route: "Cote -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Plages -> Port-Louis", region: "", stops: "" },
    { route: "Port-Louis -> Grand Baie", region: "", stops: "" },
    { route: "Hotel -> Aeroport", region: "", stops: "" },
  ],
});

applyDriveRouteLabels("de", {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Bucht von Tamarin -> Chamarel", region: "", stops: "" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "", stops: "" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Bucht von Tamarin -> Albion", region: "", stops: "" },
    { route: "Le Morne -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Souillac", region: "", stops: "" },
  ],
  seven: [
    { route: "Flughafen -> Grand Baie", region: "", stops: "" },
    { route: "Grand Baie -> Cap Malheureux", region: "", stops: "" },
    { route: "Tamarin -> Flic en Flac", region: "", stops: "" },
    { route: "Flic en Flac -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Gris Gris", region: "", stops: "" },
    { route: "Grand Bassin -> Black River Gorges", region: "", stops: "" },
  ],
  ten: [
    { route: "Flughafen -> Ihr Hotel", region: "", stops: "" },
    { route: "Hotel -> Le Morne", region: "", stops: "" },
    { route: "Westkueste -> Blue Bay", region: "", stops: "" },
    { route: "Kueste -> Hochland", region: "", stops: "" },
    { route: "Inland -> Gris Gris", region: "", stops: "" },
    { route: "Chamarel -> Black River", region: "", stops: "" },
    { route: "Kueste -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Straende -> Port Louis", region: "", stops: "" },
    { route: "Port Louis -> Grand Baie", region: "", stops: "" },
    { route: "Hotel -> Flughafen", region: "", stops: "" },
  ],
});

applyDriveRouteLabels("it", {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Baia di Tamarin -> Chamarel", region: "", stops: "" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "", stops: "" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Baia di Tamarin -> Albion", region: "", stops: "" },
    { route: "Le Morne -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Souillac", region: "", stops: "" },
  ],
  seven: [
    { route: "Aeroporto -> Grand Baie", region: "", stops: "" },
    { route: "Grand Baie -> Cap Malheureux", region: "", stops: "" },
    { route: "Tamarin -> Flic en Flac", region: "", stops: "" },
    { route: "Flic en Flac -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Gris Gris", region: "", stops: "" },
    { route: "Grand Bassin -> Black River Gorges", region: "", stops: "" },
  ],
  ten: [
    { route: "Aeroporto -> Il tuo hotel", region: "", stops: "" },
    { route: "Hotel -> Le Morne", region: "", stops: "" },
    { route: "Costa ovest -> Blue Bay", region: "", stops: "" },
    { route: "Costa -> Altopiani", region: "", stops: "" },
    { route: "Interno -> Gris Gris", region: "", stops: "" },
    { route: "Chamarel -> Black River", region: "", stops: "" },
    { route: "Costa -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Spiagge -> Port Louis", region: "", stops: "" },
    { route: "Port Louis -> Grand Baie", region: "", stops: "" },
    { route: "Hotel -> Aeroporto", region: "", stops: "" },
  ],
});

applyDriveRouteLabels("es", {
  three: [
    { route: "Port Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Bahia de Tamarin -> Chamarel", region: "", stops: "" },
    { route: "Ile aux Cerfs -> Gris Gris", region: "", stops: "" },
  ],
  five: [
    { route: "Port Louis -> Cap Malheureux", region: "", stops: "" },
    { route: "Bahia de Tamarin -> Albion", region: "", stops: "" },
    { route: "Le Morne -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Souillac", region: "", stops: "" },
  ],
  seven: [
    { route: "Aeropuerto -> Grand Baie", region: "", stops: "" },
    { route: "Grand Baie -> Cap Malheureux", region: "", stops: "" },
    { route: "Tamarin -> Flic en Flac", region: "", stops: "" },
    { route: "Flic en Flac -> Chamarel", region: "", stops: "" },
    { route: "Trou d'Eau Douce -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Blue Bay -> Gris Gris", region: "", stops: "" },
    { route: "Grand Bassin -> Black River Gorges", region: "", stops: "" },
  ],
  ten: [
    { route: "Aeropuerto -> Tu hotel", region: "", stops: "" },
    { route: "Hotel -> Le Morne", region: "", stops: "" },
    { route: "Costa oeste -> Blue Bay", region: "", stops: "" },
    { route: "Costa -> Tierras altas", region: "", stops: "" },
    { route: "Interior -> Gris Gris", region: "", stops: "" },
    { route: "Chamarel -> Black River", region: "", stops: "" },
    { route: "Costa -> Ile aux Cerfs", region: "", stops: "" },
    { route: "Playas -> Port Louis", region: "", stops: "" },
    { route: "Port Louis -> Grand Baie", region: "", stops: "" },
    { route: "Hotel -> Aeropuerto", region: "", stops: "" },
  ],
});

applyDriveRouteLabels("ru", {
  three: [
    { route: "Порт-Луи -> Кап-Малёрё", region: "", stops: "" },
    { route: "Бухта Тамарин -> Шамарель", region: "", stops: "" },
    { route: "Иль-о-Серф -> Гри-Гри", region: "", stops: "" },
  ],
  five: [
    { route: "Порт-Луи -> Кап-Малёрё", region: "", stops: "" },
    { route: "Бухта Тамарин -> Альбион", region: "", stops: "" },
    { route: "Ле-Морн -> Шамарель", region: "", stops: "" },
    { route: "Тру-д'О-Дус -> Иль-о-Серф", region: "", stops: "" },
    { route: "Блу-Бей -> Суйяк", region: "", stops: "" },
  ],
  seven: [
    { route: "Аэропорт -> Гранд-Бэй", region: "", stops: "" },
    { route: "Гранд-Бэй -> Кап-Малёрё", region: "", stops: "" },
    { route: "Тамарин -> Флик-ан-Флак", region: "", stops: "" },
    { route: "Флик-ан-Флак -> Шамарель", region: "", stops: "" },
    { route: "Тру-д'О-Дус -> Иль-о-Серф", region: "", stops: "" },
    { route: "Блу-Бей -> Гри-Гри", region: "", stops: "" },
    { route: "Гран-Бассен -> ущелья Блэк-Ривер", region: "", stops: "" },
  ],
  ten: [
    { route: "Аэропорт -> Ваш отель", region: "", stops: "" },
    { route: "Отель -> Ле-Морн", region: "", stops: "" },
    { route: "Западное побережье -> Блу-Бей", region: "", stops: "" },
    { route: "Побережье -> высокогорье", region: "", stops: "" },
    { route: "Центр острова -> Гри-Гри", region: "", stops: "" },
    { route: "Шамарель -> Блэк-Ривер", region: "", stops: "" },
    { route: "Побережье -> Иль-о-Серф", region: "", stops: "" },
    { route: "Пляжи -> Порт-Луи", region: "", stops: "" },
    { route: "Порт-Луи -> Гранд-Бэй", region: "", stops: "" },
    { route: "Отель -> аэропорт", region: "", stops: "" },
  ],
});

export function getItineraryTranslations(locale: string) {
  return itineraryTranslations[locale as ItineraryLocale] ?? itineraryTranslations.en;
}
