type Locale = "en" | "fr" | "de" | "it" | "es" | "ru";

type DetailPageTranslations = {
  common: {
    home: string;
    photoGallery: string;
    information: string;
    location: string;
    openingHours: string;
    admission: string;
    bestTimeToVisit: string;
    tipsFromMauritiusExplored: string;
    reservationsPartner: string;
    noImage: string;
  };
  beach: {
    beachNotFound: string;
    beachSuffix: string;
    beachInMauritiusAlt: string;
    snorkeling: string;
    yes: string;
    no: string;
    beachAmenities: string;
    available: string;
    notAvailable: string;
    publicTransport: string;
    hotelsNearby: string;
    exploreMoreBeaches: string;
    moreBeachesIn: string;
    continueCoast: string;
  };
  activity: {
    notFound: string;
    activitiesInMauritius: string;
    commissionNote: string;
    transfer: string;
    reservationsPartner: string;
    highlights: string;
    included: string;
    whatToBring: string;
    pricing: string;
    duration: string;
    bestTime: string;
    difficulty: string;
    exploreMoreActivities: string;
    moreActivitiesLikeThis: string;
    continueActivities: string;
    whatsappMessage: string;
  };
  place: {
    notFound: string;
    placesToVisit: string;
    bestPlacesToVisit: string;
    exploreMorePlaces: string;
    morePlacesToDiscover: string;
    continueBest: string;
  };
  blog: {
    articleNotFound: string;
    share: string;
    shareFacebook: string;
    shareTwitter: string;
    shareLinkedIn: string;
    shareWhatsapp: string;
    minRead: string;
    tableOfContents: string;
    figureCaption: string;
    exploreThisTopic: string;
    emailTitle: string;
    emailBody: string;
    authorBio: string;
    authorCredentials: string;
    youMightAlsoLike: string;
    backToAllArticles: string;
    relatedArticles: string;
    topicMauritiusGuide: string;
    topicBeaches: string;
    topicPlaces: string;
    topicActivities: string;
  };
  giveaway: {
    shareTitle: string;
    shareText: string;
    copyPrompt: string;
    heroAlt: string;
    drawOn: string;
    mauritiusTime: string;
    enterTitle: string;
    enterBody: string;
    submittedTitle: string;
    submittedBody: string;
    fullName: string;
    fullNamePlaceholder: string;
    country: string;
    countryPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    shareInstruction: string;
    shareFacebook: string;
    shareInstagram: string;
    copiedInstagram: string;
    confirmPosts: string;
    participateBefore: string;
    participateAfter: string;
    facebookConfirmBefore: string;
    facebookConfirmAfter: string;
    instagramConfirmBefore: string;
    instagramConfirmAfter: string;
    agreeBefore: string;
    agreeAfter: string;
    terms: string;
    termsAndConditions: string;
    byParticipatingBefore: string;
    byParticipatingAfter: string;
    submitError: string;
    submittedAgreementBefore: string;
    submittedAgreementAfter: string;
  };
};

const translations: Record<Locale, DetailPageTranslations> = {
  en: {
    common: {
      home: "Home",
      photoGallery: "Photo Gallery",
      information: "Information",
      location: "Location",
      openingHours: "Opening Hours",
      admission: "Admission",
      bestTimeToVisit: "Best Time to Visit",
      tipsFromMauritiusExplored: "Tips from Mauritius Explored",
      reservationsPartner: "Reservations are completed on partner sites.",
      noImage: "No image",
    },
    beach: {
      beachNotFound: "Beach Not Found",
      beachSuffix: "Beach",
      beachInMauritiusAlt: "{name} Beach in Mauritius",
      snorkeling: "Snorkeling",
      yes: "Yes",
      no: "No",
      beachAmenities: "Beach Amenities",
      available: "Available",
      notAvailable: "Not Available",
      publicTransport: "Public Transport",
      hotelsNearby: "Hotels Nearby",
      exploreMoreBeaches: "Explore More Beaches",
      moreBeachesIn: "More Beaches in {region}",
      continueCoast: "Continue exploring the beautiful {location} coast",
    },
    activity: {
      notFound: "Not Found",
      activitiesInMauritius: "Activities in Mauritius",
      commissionNote: "Some booking links may earn us a commission at no extra cost to you.",
      transfer: "Transfer",
      reservationsPartner: "Reservations are completed on partner sites.",
      highlights: "Highlights",
      included: "What's Included",
      whatToBring: "What to Bring",
      pricing: "Pricing",
      duration: "Duration",
      bestTime: "Best Time",
      difficulty: "Difficulty",
      exploreMoreActivities: "Explore More Activities",
      moreActivitiesLikeThis: "More Activities Like This",
      continueActivities: "Continue exploring activities in Mauritius",
      whatsappMessage: "Hi, I want to know more about {name} on Mauritius Explored: {url}",
    },
    place: {
      notFound: "Not Found",
      placesToVisit: "Places to Visit",
      bestPlacesToVisit: "Best Places to Visit",
      exploreMorePlaces: "Explore More Places",
      morePlacesToDiscover: "More Places to Discover",
      continueBest: "Continue exploring the best of Mauritius",
    },
    blog: {
      articleNotFound: "Article Not Found",
      share: "Share:",
      shareFacebook: "Share on Facebook",
      shareTwitter: "Share on Twitter",
      shareLinkedIn: "Share on LinkedIn",
      shareWhatsapp: "Share on WhatsApp",
      minRead: "min read",
      tableOfContents: "Table of contents",
      figureCaption: "{title} in Mauritius, featured in this local travel guide.",
      exploreThisTopic: "Explore this topic",
      emailTitle: "Get new Mauritius guides by email",
      emailBody: "Join the Mauritius Explored list for trip ideas, practical updates and downloadable planning help.",
      authorBio: "Written by the Mauritius Explored editorial team, a Mauritian travel guide focused on beaches, activities, local places, and practical island planning.",
      authorCredentials: "Local Mauritius travel research, itinerary planning, and destination coverage since 2011.",
      youMightAlsoLike: "You Might Also Like",
      backToAllArticles: "Back to all articles",
      relatedArticles: "Related Articles",
      topicMauritiusGuide: "Mauritius Travel Guide",
      topicBeaches: "Best Beaches in Mauritius",
      topicPlaces: "Best Places to Visit",
      topicActivities: "Tours & Activities",
    },
    giveaway: {
      shareTitle: "Mauritius Explored Giveaway",
      shareText: "Enter the Mauritius Explored giveaway for a chance to win unforgettable experiences!",
      copyPrompt: "Copy this link to share on Instagram:",
      heroAlt: "Win a weekend in Mauritius - Mauritius Explored giveaway",
      drawOn: "Draw on",
      mauritiusTime: "Mauritius time",
      enterTitle: "Enter the giveaway",
      enterBody: "Complete the form, confirm your social shares, and agree to the terms. One entry per person.",
      submittedTitle: "Entry submitted",
      submittedBody: "Thank you for participating! Weekly draws run from 19 April - we'll contact winners by email or social media. Good luck!",
      fullName: "Full name",
      fullNamePlaceholder: "Your full name",
      country: "Country",
      countryPlaceholder: "Select your country",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      shareInstruction: "Open the share links below, then confirm underneath that you've posted and tagged Mauritius Explored.",
      shareFacebook: "Share on Facebook",
      shareInstagram: "Share on Instagram",
      copiedInstagram: "Link copied - paste it into your Instagram story, reel, or bio, then tag @mauritius__explored.",
      confirmPosts: "Confirm your social posts",
      participateBefore: "To participate, share",
      participateAfter: "and tag Mauritius Explored as described below.",
      facebookConfirmBefore: "I have shared",
      facebookConfirmAfter: "on Facebook and tagged",
      instagramConfirmBefore: "I have shared",
      instagramConfirmAfter: "on Instagram and tagged",
      agreeBefore: "I agree to the",
      agreeAfter: "of this giveaway.",
      terms: "Terms & Conditions",
      termsAndConditions: "Terms and conditions",
      byParticipatingBefore: "By participating in this giveaway, you confirm that you have read and agree to our",
      byParticipatingAfter: ".",
      submitError: "Something went wrong. Please try again.",
      submittedAgreementBefore: "By submitting, you agree to our",
      submittedAgreementAfter: ".",
    },
  },
  fr: {
    common: {
      home: "Accueil",
      photoGallery: "Galerie photo",
      information: "Informations",
      location: "Localisation",
      openingHours: "Horaires d'ouverture",
      admission: "Entrée",
      bestTimeToVisit: "Meilleur moment pour visiter",
      tipsFromMauritiusExplored: "Conseils de Mauritius Explored",
      reservationsPartner: "Les réservations se terminent sur les sites partenaires.",
      noImage: "Aucune image",
    },
    beach: {
      beachNotFound: "Plage introuvable",
      beachSuffix: "Plage",
      beachInMauritiusAlt: "Plage de {name} à Maurice",
      snorkeling: "Snorkeling",
      yes: "Oui",
      no: "Non",
      beachAmenities: "Services de plage",
      available: "Disponible",
      notAvailable: "Non disponible",
      publicTransport: "Transport public",
      hotelsNearby: "Hôtels à proximité",
      exploreMoreBeaches: "Explorer plus de plages",
      moreBeachesIn: "Plus de plages dans la région {region}",
      continueCoast: "Continuez à explorer la belle côte de {location}",
    },
    activity: {
      notFound: "Introuvable",
      activitiesInMauritius: "Activités à Maurice",
      commissionNote: "Certains liens de réservation peuvent nous rapporter une commission sans frais supplémentaires pour vous.",
      transfer: "Transfert",
      reservationsPartner: "Les réservations se terminent sur les sites partenaires.",
      highlights: "Temps forts",
      included: "Ce qui est inclus",
      whatToBring: "À apporter",
      pricing: "Tarifs",
      duration: "Durée",
      bestTime: "Meilleur moment",
      difficulty: "Difficulté",
      exploreMoreActivities: "Explorer plus d'activités",
      moreActivitiesLikeThis: "Plus d'activités similaires",
      continueActivities: "Continuez à explorer les activités à Maurice",
      whatsappMessage: "Bonjour, je veux en savoir plus sur {name} sur Mauritius Explored : {url}",
    },
    place: {
      notFound: "Introuvable",
      placesToVisit: "Lieux à visiter",
      bestPlacesToVisit: "Meilleurs lieux à visiter",
      exploreMorePlaces: "Explorer plus de lieux",
      morePlacesToDiscover: "Plus de lieux à découvrir",
      continueBest: "Continuez à explorer le meilleur de Maurice",
    },
    blog: {
      articleNotFound: "Article introuvable",
      share: "Partager :",
      shareFacebook: "Partager sur Facebook",
      shareTwitter: "Partager sur Twitter",
      shareLinkedIn: "Partager sur LinkedIn",
      shareWhatsapp: "Partager sur WhatsApp",
      minRead: "min de lecture",
      tableOfContents: "Sommaire",
      figureCaption: "{title} à Maurice, présenté dans ce guide de voyage local.",
      exploreThisTopic: "Explorer ce sujet",
      emailTitle: "Recevez les nouveaux guides de Maurice par e-mail",
      emailBody: "Rejoignez la liste Mauritius Explored pour des idées de voyage, des mises à jour pratiques et des aides de planification à télécharger.",
      authorBio: "Rédigé par l'équipe éditoriale de Mauritius Explored, un guide mauricien consacré aux plages, activités, lieux locaux et conseils pratiques.",
      authorCredentials: "Recherche voyage locale à Maurice, planification d'itinéraires et couverture de destination depuis 2011.",
      youMightAlsoLike: "Vous aimerez aussi",
      backToAllArticles: "Retour à tous les articles",
      relatedArticles: "Articles liés",
      topicMauritiusGuide: "Guide de voyage de Maurice",
      topicBeaches: "Meilleures plages de Maurice",
      topicPlaces: "Meilleurs lieux à visiter",
      topicActivities: "Tours et activités",
    },
    giveaway: {
      shareTitle: "Concours Mauritius Explored",
      shareText: "Participez au concours Mauritius Explored pour tenter de gagner des expériences inoubliables !",
      copyPrompt: "Copiez ce lien pour le partager sur Instagram :",
      heroAlt: "Gagner un week-end à Maurice - concours Mauritius Explored",
      drawOn: "Tirage le",
      mauritiusTime: "heure de Maurice",
      enterTitle: "Participer au concours",
      enterBody: "Complétez le formulaire, confirmez vos partages sociaux et acceptez les conditions. Une participation par personne.",
      submittedTitle: "Participation envoyée",
      submittedBody: "Merci pour votre participation ! Les tirages hebdomadaires commencent le 19 avril - nous contacterons les gagnants par e-mail ou sur les réseaux sociaux. Bonne chance !",
      fullName: "Nom complet",
      fullNamePlaceholder: "Votre nom complet",
      country: "Pays",
      countryPlaceholder: "Sélectionnez votre pays",
      email: "E-mail",
      emailPlaceholder: "votre.email@exemple.com",
      shareInstruction: "Ouvrez les liens de partage ci-dessous, puis confirmez que vous avez publié et tagué Mauritius Explored.",
      shareFacebook: "Partager sur Facebook",
      shareInstagram: "Partager sur Instagram",
      copiedInstagram: "Lien copié - collez-le dans votre story, reel ou bio Instagram, puis taguez @mauritius__explored.",
      confirmPosts: "Confirmer vos publications",
      participateBefore: "Pour participer, partagez",
      participateAfter: "et taguez Mauritius Explored comme indiqué ci-dessous.",
      facebookConfirmBefore: "J'ai partagé",
      facebookConfirmAfter: "sur Facebook et tagué",
      instagramConfirmBefore: "J'ai partagé",
      instagramConfirmAfter: "sur Instagram et tagué",
      agreeBefore: "J'accepte les",
      agreeAfter: "de ce concours.",
      terms: "Conditions générales",
      termsAndConditions: "Conditions générales",
      byParticipatingBefore: "En participant à ce concours, vous confirmez avoir lu et accepté nos",
      byParticipatingAfter: ".",
      submitError: "Une erreur s'est produite. Veuillez réessayer.",
      submittedAgreementBefore: "En envoyant le formulaire, vous acceptez nos",
      submittedAgreementAfter: ".",
    },
  },
  de: {
    common: {
      home: "Startseite",
      photoGallery: "Fotogalerie",
      information: "Informationen",
      location: "Ort",
      openingHours: "Öffnungszeiten",
      admission: "Eintritt",
      bestTimeToVisit: "Beste Besuchszeit",
      tipsFromMauritiusExplored: "Tipps von Mauritius Explored",
      reservationsPartner: "Reservierungen werden auf Partnerseiten abgeschlossen.",
      noImage: "Kein Bild",
    },
    beach: {
      beachNotFound: "Strand nicht gefunden",
      beachSuffix: "Strand",
      beachInMauritiusAlt: "{name} Strand auf Mauritius",
      snorkeling: "Schnorcheln",
      yes: "Ja",
      no: "Nein",
      beachAmenities: "Strandausstattung",
      available: "Verfügbar",
      notAvailable: "Nicht verfügbar",
      publicTransport: "Öffentliche Verkehrsmittel",
      hotelsNearby: "Hotels in der Nähe",
      exploreMoreBeaches: "Mehr Strände entdecken",
      moreBeachesIn: "Mehr Strände in {region}",
      continueCoast: "Entdecken Sie weiter die schöne Küste von {location}",
    },
    activity: {
      notFound: "Nicht gefunden",
      activitiesInMauritius: "Aktivitäten auf Mauritius",
      commissionNote: "Einige Buchungslinks können uns eine Provision einbringen, ohne Mehrkosten für Sie.",
      transfer: "Transfer",
      reservationsPartner: "Reservierungen werden auf Partnerseiten abgeschlossen.",
      highlights: "Highlights",
      included: "Inklusive",
      whatToBring: "Was mitbringen",
      pricing: "Preise",
      duration: "Dauer",
      bestTime: "Beste Zeit",
      difficulty: "Schwierigkeit",
      exploreMoreActivities: "Mehr Aktivitäten entdecken",
      moreActivitiesLikeThis: "Ähnliche Aktivitäten",
      continueActivities: "Entdecken Sie weitere Aktivitäten auf Mauritius",
      whatsappMessage: "Hallo, ich möchte mehr über {name} auf Mauritius Explored erfahren: {url}",
    },
    place: {
      notFound: "Nicht gefunden",
      placesToVisit: "Sehenswürdigkeiten",
      bestPlacesToVisit: "Beste Sehenswürdigkeiten",
      exploreMorePlaces: "Mehr Orte entdecken",
      morePlacesToDiscover: "Weitere Orte entdecken",
      continueBest: "Entdecken Sie weiter das Beste von Mauritius",
    },
    blog: {
      articleNotFound: "Artikel nicht gefunden",
      share: "Teilen:",
      shareFacebook: "Auf Facebook teilen",
      shareTwitter: "Auf Twitter teilen",
      shareLinkedIn: "Auf LinkedIn teilen",
      shareWhatsapp: "Auf WhatsApp teilen",
      minRead: "Min. Lesezeit",
      tableOfContents: "Inhaltsverzeichnis",
      figureCaption: "{title} auf Mauritius, vorgestellt in diesem lokalen Reiseführer.",
      exploreThisTopic: "Dieses Thema entdecken",
      emailTitle: "Neue Mauritius-Guides per E-Mail erhalten",
      emailBody: "Abonnieren Sie Mauritius Explored für Reiseideen, praktische Updates und herunterladbare Planungshilfen.",
      authorBio: "Geschrieben vom Redaktionsteam von Mauritius Explored, einem mauritischen Reiseführer für Strände, Aktivitäten, lokale Orte und praktische Reiseplanung.",
      authorCredentials: "Lokale Mauritius-Recherche, Routenplanung und Destinationsberichte seit 2011.",
      youMightAlsoLike: "Das könnte Ihnen auch gefallen",
      backToAllArticles: "Zurück zu allen Artikeln",
      relatedArticles: "Verwandte Artikel",
      topicMauritiusGuide: "Mauritius Reiseführer",
      topicBeaches: "Beste Strände auf Mauritius",
      topicPlaces: "Beste Sehenswürdigkeiten",
      topicActivities: "Touren & Aktivitäten",
    },
    giveaway: {
      shareTitle: "Mauritius Explored Gewinnspiel",
      shareText: "Nehmen Sie am Mauritius Explored Gewinnspiel teil und gewinnen Sie unvergessliche Erlebnisse!",
      copyPrompt: "Kopieren Sie diesen Link, um ihn auf Instagram zu teilen:",
      heroAlt: "Ein Wochenende auf Mauritius gewinnen - Mauritius Explored Gewinnspiel",
      drawOn: "Ziehung am",
      mauritiusTime: "Mauritius-Zeit",
      enterTitle: "Am Gewinnspiel teilnehmen",
      enterBody: "Füllen Sie das Formular aus, bestätigen Sie Ihre Social Shares und akzeptieren Sie die Bedingungen. Eine Teilnahme pro Person.",
      submittedTitle: "Teilnahme gesendet",
      submittedBody: "Danke für Ihre Teilnahme! Die wöchentlichen Ziehungen starten am 19. April - Gewinner kontaktieren wir per E-Mail oder Social Media. Viel Glück!",
      fullName: "Vollständiger Name",
      fullNamePlaceholder: "Ihr vollständiger Name",
      country: "Land",
      countryPlaceholder: "Wählen Sie Ihr Land",
      email: "E-Mail",
      emailPlaceholder: "ihre.email@beispiel.com",
      shareInstruction: "Öffnen Sie die Teilen-Links unten und bestätigen Sie danach, dass Sie Mauritius Explored markiert haben.",
      shareFacebook: "Auf Facebook teilen",
      shareInstagram: "Auf Instagram teilen",
      copiedInstagram: "Link kopiert - fügen Sie ihn in Ihre Instagram Story, Ihr Reel oder Ihre Bio ein und markieren Sie @mauritius__explored.",
      confirmPosts: "Social Posts bestätigen",
      participateBefore: "Um teilzunehmen, teilen Sie",
      participateAfter: "und markieren Sie Mauritius Explored wie unten beschrieben.",
      facebookConfirmBefore: "Ich habe",
      facebookConfirmAfter: "auf Facebook geteilt und markiert",
      instagramConfirmBefore: "Ich habe",
      instagramConfirmAfter: "auf Instagram geteilt und markiert",
      agreeBefore: "Ich stimme den",
      agreeAfter: "dieses Gewinnspiels zu.",
      terms: "Teilnahmebedingungen",
      termsAndConditions: "Teilnahmebedingungen",
      byParticipatingBefore: "Mit der Teilnahme bestätigen Sie, dass Sie unsere",
      byParticipatingAfter: "gelesen haben und akzeptieren.",
      submitError: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      submittedAgreementBefore: "Mit dem Absenden stimmen Sie unseren",
      submittedAgreementAfter: "zu.",
    },
  },
  it: {
    common: {
      home: "Home",
      photoGallery: "Galleria fotografica",
      information: "Informazioni",
      location: "Posizione",
      openingHours: "Orari di apertura",
      admission: "Ingresso",
      bestTimeToVisit: "Periodo migliore per visitare",
      tipsFromMauritiusExplored: "Consigli di Mauritius Explored",
      reservationsPartner: "Le prenotazioni si completano sui siti partner.",
      noImage: "Nessuna immagine",
    },
    beach: {
      beachNotFound: "Spiaggia non trovata",
      beachSuffix: "Spiaggia",
      beachInMauritiusAlt: "Spiaggia di {name} a Mauritius",
      snorkeling: "Snorkeling",
      yes: "Sì",
      no: "No",
      beachAmenities: "Servizi in spiaggia",
      available: "Disponibile",
      notAvailable: "Non disponibile",
      publicTransport: "Trasporto pubblico",
      hotelsNearby: "Hotel nelle vicinanze",
      exploreMoreBeaches: "Esplora altre spiagge",
      moreBeachesIn: "Altre spiagge a {region}",
      continueCoast: "Continua a esplorare la splendida costa di {location}",
    },
    activity: {
      notFound: "Non trovato",
      activitiesInMauritius: "Attività a Mauritius",
      commissionNote: "Alcuni link di prenotazione possono farci guadagnare una commissione senza costi extra per te.",
      transfer: "Transfer",
      reservationsPartner: "Le prenotazioni si completano sui siti partner.",
      highlights: "Punti salienti",
      included: "Cosa è incluso",
      whatToBring: "Cosa portare",
      pricing: "Prezzi",
      duration: "Durata",
      bestTime: "Periodo migliore",
      difficulty: "Difficoltà",
      exploreMoreActivities: "Esplora altre attività",
      moreActivitiesLikeThis: "Altre attività simili",
      continueActivities: "Continua a esplorare le attività a Mauritius",
      whatsappMessage: "Ciao, vorrei saperne di più su {name} su Mauritius Explored: {url}",
    },
    place: {
      notFound: "Non trovato",
      placesToVisit: "Luoghi da visitare",
      bestPlacesToVisit: "Migliori luoghi da visitare",
      exploreMorePlaces: "Esplora altri luoghi",
      morePlacesToDiscover: "Altri luoghi da scoprire",
      continueBest: "Continua a esplorare il meglio di Mauritius",
    },
    blog: {
      articleNotFound: "Articolo non trovato",
      share: "Condividi:",
      shareFacebook: "Condividi su Facebook",
      shareTwitter: "Condividi su Twitter",
      shareLinkedIn: "Condividi su LinkedIn",
      shareWhatsapp: "Condividi su WhatsApp",
      minRead: "min di lettura",
      tableOfContents: "Indice",
      figureCaption: "{title} a Mauritius, presente in questa guida di viaggio locale.",
      exploreThisTopic: "Esplora questo argomento",
      emailTitle: "Ricevi nuove guide di Mauritius via email",
      emailBody: "Unisciti alla lista Mauritius Explored per idee di viaggio, aggiornamenti pratici e aiuti scaricabili per pianificare.",
      authorBio: "Scritto dal team editoriale di Mauritius Explored, una guida mauriziana dedicata a spiagge, attività, luoghi locali e pianificazione pratica.",
      authorCredentials: "Ricerca locale su Mauritius, pianificazione itinerari e copertura della destinazione dal 2011.",
      youMightAlsoLike: "Potrebbe piacerti anche",
      backToAllArticles: "Torna a tutti gli articoli",
      relatedArticles: "Articoli correlati",
      topicMauritiusGuide: "Guida di viaggio di Mauritius",
      topicBeaches: "Migliori spiagge di Mauritius",
      topicPlaces: "Migliori luoghi da visitare",
      topicActivities: "Tour e attività",
    },
    giveaway: {
      shareTitle: "Giveaway Mauritius Explored",
      shareText: "Partecipa al giveaway Mauritius Explored per vincere esperienze indimenticabili!",
      copyPrompt: "Copia questo link per condividerlo su Instagram:",
      heroAlt: "Vinci un weekend a Mauritius - giveaway Mauritius Explored",
      drawOn: "Estrazione il",
      mauritiusTime: "ora di Mauritius",
      enterTitle: "Partecipa al giveaway",
      enterBody: "Completa il modulo, conferma le condivisioni social e accetta i termini. Una partecipazione per persona.",
      submittedTitle: "Partecipazione inviata",
      submittedBody: "Grazie per aver partecipato! Le estrazioni settimanali iniziano il 19 aprile - contatteremo i vincitori via email o social. Buona fortuna!",
      fullName: "Nome completo",
      fullNamePlaceholder: "Il tuo nome completo",
      country: "Paese",
      countryPlaceholder: "Seleziona il tuo paese",
      email: "Email",
      emailPlaceholder: "tua.email@esempio.com",
      shareInstruction: "Apri i link di condivisione qui sotto, poi conferma di aver pubblicato e taggato Mauritius Explored.",
      shareFacebook: "Condividi su Facebook",
      shareInstagram: "Condividi su Instagram",
      copiedInstagram: "Link copiato - incollalo nella tua storia, reel o bio Instagram, poi tagga @mauritius__explored.",
      confirmPosts: "Conferma i tuoi post social",
      participateBefore: "Per partecipare, condividi",
      participateAfter: "e tagga Mauritius Explored come indicato sotto.",
      facebookConfirmBefore: "Ho condiviso",
      facebookConfirmAfter: "su Facebook e taggato",
      instagramConfirmBefore: "Ho condiviso",
      instagramConfirmAfter: "su Instagram e taggato",
      agreeBefore: "Accetto i",
      agreeAfter: "di questo giveaway.",
      terms: "Termini e condizioni",
      termsAndConditions: "Termini e condizioni",
      byParticipatingBefore: "Partecipando a questo giveaway confermi di aver letto e accettato i nostri",
      byParticipatingAfter: ".",
      submitError: "Qualcosa è andato storto. Riprova.",
      submittedAgreementBefore: "Inviando il modulo accetti i nostri",
      submittedAgreementAfter: ".",
    },
  },
  es: {
    common: {
      home: "Inicio",
      photoGallery: "Galería de fotos",
      information: "Información",
      location: "Ubicación",
      openingHours: "Horario de apertura",
      admission: "Entrada",
      bestTimeToVisit: "Mejor momento para visitar",
      tipsFromMauritiusExplored: "Consejos de Mauritius Explored",
      reservationsPartner: "Las reservas se completan en sitios asociados.",
      noImage: "Sin imagen",
    },
    beach: {
      beachNotFound: "Playa no encontrada",
      beachSuffix: "Playa",
      beachInMauritiusAlt: "Playa de {name} en Mauricio",
      snorkeling: "Snorkel",
      yes: "Sí",
      no: "No",
      beachAmenities: "Servicios de playa",
      available: "Disponible",
      notAvailable: "No disponible",
      publicTransport: "Transporte público",
      hotelsNearby: "Hoteles cercanos",
      exploreMoreBeaches: "Explorar más playas",
      moreBeachesIn: "Más playas en {region}",
      continueCoast: "Sigue explorando la hermosa costa de {location}",
    },
    activity: {
      notFound: "No encontrado",
      activitiesInMauritius: "Actividades en Mauricio",
      commissionNote: "Algunos enlaces de reserva pueden generarnos una comisión sin coste adicional para ti.",
      transfer: "Traslado",
      reservationsPartner: "Las reservas se completan en sitios asociados.",
      highlights: "Destacados",
      included: "Qué incluye",
      whatToBring: "Qué llevar",
      pricing: "Precios",
      duration: "Duración",
      bestTime: "Mejor momento",
      difficulty: "Dificultad",
      exploreMoreActivities: "Explorar más actividades",
      moreActivitiesLikeThis: "Más actividades similares",
      continueActivities: "Sigue explorando actividades en Mauricio",
      whatsappMessage: "Hola, quiero saber más sobre {name} en Mauritius Explored: {url}",
    },
    place: {
      notFound: "No encontrado",
      placesToVisit: "Lugares para visitar",
      bestPlacesToVisit: "Mejores lugares para visitar",
      exploreMorePlaces: "Explorar más lugares",
      morePlacesToDiscover: "Más lugares por descubrir",
      continueBest: "Sigue explorando lo mejor de Mauricio",
    },
    blog: {
      articleNotFound: "Artículo no encontrado",
      share: "Compartir:",
      shareFacebook: "Compartir en Facebook",
      shareTwitter: "Compartir en Twitter",
      shareLinkedIn: "Compartir en LinkedIn",
      shareWhatsapp: "Compartir en WhatsApp",
      minRead: "min de lectura",
      tableOfContents: "Índice",
      figureCaption: "{title} en Mauricio, incluido en esta guía de viaje local.",
      exploreThisTopic: "Explorar este tema",
      emailTitle: "Recibe nuevas guías de Mauricio por email",
      emailBody: "Únete a la lista de Mauritius Explored para ideas de viaje, actualizaciones prácticas y ayuda descargable para planificar.",
      authorBio: "Escrito por el equipo editorial de Mauritius Explored, una guía mauriciana centrada en playas, actividades, lugares locales y planificación práctica.",
      authorCredentials: "Investigación local de Mauricio, planificación de itinerarios y cobertura del destino desde 2011.",
      youMightAlsoLike: "También te puede gustar",
      backToAllArticles: "Volver a todos los artículos",
      relatedArticles: "Artículos relacionados",
      topicMauritiusGuide: "Guía de viaje de Mauricio",
      topicBeaches: "Mejores playas de Mauricio",
      topicPlaces: "Mejores lugares para visitar",
      topicActivities: "Tours y actividades",
    },
    giveaway: {
      shareTitle: "Sorteo Mauritius Explored",
      shareText: "Participa en el sorteo de Mauritius Explored para ganar experiencias inolvidables.",
      copyPrompt: "Copia este enlace para compartirlo en Instagram:",
      heroAlt: "Gana un fin de semana en Mauricio - sorteo Mauritius Explored",
      drawOn: "Sorteo el",
      mauritiusTime: "hora de Mauricio",
      enterTitle: "Participa en el sorteo",
      enterBody: "Completa el formulario, confirma tus publicaciones sociales y acepta los términos. Una participación por persona.",
      submittedTitle: "Participación enviada",
      submittedBody: "Gracias por participar. Los sorteos semanales empiezan el 19 de abril - contactaremos a los ganadores por email o redes sociales. ¡Suerte!",
      fullName: "Nombre completo",
      fullNamePlaceholder: "Tu nombre completo",
      country: "País",
      countryPlaceholder: "Selecciona tu país",
      email: "Email",
      emailPlaceholder: "tu.email@ejemplo.com",
      shareInstruction: "Abre los enlaces de compartir abajo y confirma después que publicaste y etiquetaste a Mauritius Explored.",
      shareFacebook: "Compartir en Facebook",
      shareInstagram: "Compartir en Instagram",
      copiedInstagram: "Enlace copiado - pégalo en tu historia, reel o bio de Instagram y etiqueta a @mauritius__explored.",
      confirmPosts: "Confirma tus publicaciones sociales",
      participateBefore: "Para participar, comparte",
      participateAfter: "y etiqueta a Mauritius Explored como se indica abajo.",
      facebookConfirmBefore: "He compartido",
      facebookConfirmAfter: "en Facebook y etiquetado a",
      instagramConfirmBefore: "He compartido",
      instagramConfirmAfter: "en Instagram y etiquetado a",
      agreeBefore: "Acepto los",
      agreeAfter: "de este sorteo.",
      terms: "Términos y condiciones",
      termsAndConditions: "Términos y condiciones",
      byParticipatingBefore: "Al participar en este sorteo confirmas que has leído y aceptas nuestros",
      byParticipatingAfter: ".",
      submitError: "Algo salió mal. Inténtalo de nuevo.",
      submittedAgreementBefore: "Al enviar, aceptas nuestros",
      submittedAgreementAfter: ".",
    },
  },
  ru: {
    common: {
      home: "Главная",
      photoGallery: "Фотогалерея",
      information: "Информация",
      location: "Местоположение",
      openingHours: "Часы работы",
      admission: "Вход",
      bestTimeToVisit: "Лучшее время для посещения",
      tipsFromMauritiusExplored: "Советы Mauritius Explored",
      reservationsPartner: "Бронирование завершается на сайтах партнеров.",
      noImage: "Нет изображения",
    },
    beach: {
      beachNotFound: "Пляж не найден",
      beachSuffix: "Пляж",
      beachInMauritiusAlt: "Пляж {name} на Маврикии",
      snorkeling: "Снорклинг",
      yes: "Да",
      no: "Нет",
      beachAmenities: "Удобства на пляже",
      available: "Доступно",
      notAvailable: "Недоступно",
      publicTransport: "Общественный транспорт",
      hotelsNearby: "Отели рядом",
      exploreMoreBeaches: "Смотреть больше пляжей",
      moreBeachesIn: "Больше пляжей в регионе {region}",
      continueCoast: "Продолжайте изучать красивое побережье {location}",
    },
    activity: {
      notFound: "Не найдено",
      activitiesInMauritius: "Активности на Маврикии",
      commissionNote: "Некоторые ссылки бронирования могут принести нам комиссию без дополнительных расходов для вас.",
      transfer: "Трансфер",
      reservationsPartner: "Бронирование завершается на сайтах партнеров.",
      highlights: "Главное",
      included: "Что включено",
      whatToBring: "Что взять с собой",
      pricing: "Цены",
      duration: "Длительность",
      bestTime: "Лучшее время",
      difficulty: "Сложность",
      exploreMoreActivities: "Смотреть больше активностей",
      moreActivitiesLikeThis: "Похожие активности",
      continueActivities: "Продолжайте изучать активности на Маврикии",
      whatsappMessage: "Здравствуйте, хочу узнать больше о {name} на Mauritius Explored: {url}",
    },
    place: {
      notFound: "Не найдено",
      placesToVisit: "Места для посещения",
      bestPlacesToVisit: "Лучшие места для посещения",
      exploreMorePlaces: "Смотреть больше мест",
      morePlacesToDiscover: "Больше мест для открытия",
      continueBest: "Продолжайте изучать лучшее на Маврикии",
    },
    blog: {
      articleNotFound: "Статья не найдена",
      share: "Поделиться:",
      shareFacebook: "Поделиться в Facebook",
      shareTwitter: "Поделиться в Twitter",
      shareLinkedIn: "Поделиться в LinkedIn",
      shareWhatsapp: "Поделиться в WhatsApp",
      minRead: "мин чтения",
      tableOfContents: "Содержание",
      figureCaption: "{title} на Маврикии, в этом местном путеводителе.",
      exploreThisTopic: "Изучить тему",
      emailTitle: "Получайте новые гиды по Маврикию на email",
      emailBody: "Подпишитесь на Mauritius Explored, чтобы получать идеи поездок, практические обновления и материалы для планирования.",
      authorBio: "Написано редакцией Mauritius Explored, маврикийским путеводителем по пляжам, активностям, местным местам и практическому планированию.",
      authorCredentials: "Локальное исследование Маврикия, планирование маршрутов и материалы о направлении с 2011 года.",
      youMightAlsoLike: "Вам также может понравиться",
      backToAllArticles: "Назад ко всем статьям",
      relatedArticles: "Похожие статьи",
      topicMauritiusGuide: "Путеводитель по Маврикию",
      topicBeaches: "Лучшие пляжи Маврикия",
      topicPlaces: "Лучшие места для посещения",
      topicActivities: "Туры и активности",
    },
    giveaway: {
      shareTitle: "Розыгрыш Mauritius Explored",
      shareText: "Участвуйте в розыгрыше Mauritius Explored и получите шанс выиграть незабываемые впечатления!",
      copyPrompt: "Скопируйте эту ссылку, чтобы поделиться в Instagram:",
      heroAlt: "Выиграйте уикенд на Маврикии - розыгрыш Mauritius Explored",
      drawOn: "Розыгрыш",
      mauritiusTime: "время Маврикия",
      enterTitle: "Участвовать в розыгрыше",
      enterBody: "Заполните форму, подтвердите публикации в соцсетях и примите условия. Одна заявка на человека.",
      submittedTitle: "Заявка отправлена",
      submittedBody: "Спасибо за участие! Еженедельные розыгрыши начинаются 19 апреля - мы свяжемся с победителями по email или в соцсетях. Удачи!",
      fullName: "Полное имя",
      fullNamePlaceholder: "Ваше полное имя",
      country: "Страна",
      countryPlaceholder: "Выберите страну",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      shareInstruction: "Откройте ссылки ниже, затем подтвердите, что вы опубликовали пост и отметили Mauritius Explored.",
      shareFacebook: "Поделиться в Facebook",
      shareInstagram: "Поделиться в Instagram",
      copiedInstagram: "Ссылка скопирована - вставьте ее в Instagram story, reel или bio и отметьте @mauritius__explored.",
      confirmPosts: "Подтвердите публикации",
      participateBefore: "Чтобы участвовать, поделитесь",
      participateAfter: "и отметьте Mauritius Explored, как указано ниже.",
      facebookConfirmBefore: "Я поделился/поделилась",
      facebookConfirmAfter: "в Facebook и отметил/отметила",
      instagramConfirmBefore: "Я поделился/поделилась",
      instagramConfirmAfter: "в Instagram и отметил/отметила",
      agreeBefore: "Я принимаю",
      agreeAfter: "этого розыгрыша.",
      terms: "Условия",
      termsAndConditions: "Условия",
      byParticipatingBefore: "Участвуя в этом розыгрыше, вы подтверждаете, что прочитали и принимаете наши",
      byParticipatingAfter: ".",
      submitError: "Что-то пошло не так. Попробуйте еще раз.",
      submittedAgreementBefore: "Отправляя форму, вы соглашаетесь с нашими",
      submittedAgreementAfter: ".",
    },
  },
};

export function getDetailPageTranslations(locale: string) {
  return translations[(locale as Locale) in translations ? (locale as Locale) : "en"];
}

export function formatLabel(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
