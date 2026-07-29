import type { Metadata } from "next";

export type SystemLocale = "en" | "fr" | "de" | "it" | "es" | "ru";

export const systemLocales = ["en", "fr", "de", "it", "es", "ru"] as const;

export function getSystemLocale(locale?: string): SystemLocale {
  return systemLocales.includes(locale as SystemLocale) ? (locale as SystemLocale) : "en";
}

type MetadataText = {
  title: string;
  description?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
};

type SystemPageTranslations = {
  error: {
    title: string;
    heading: string;
    body: string;
    tryAgain: string;
    backHome: string;
  };
  notFound: {
    metadata: MetadataText;
    heading: string;
    body: string;
    backHome: string;
    exploreBeaches: string;
    popularPrompt: string;
    placesToVisit: string;
    activities: string;
    aboutMauritius: string;
    contactUs: string;
  };
  loading: {
    giveaway: string;
    itineraries: string;
  };
  metadata: Record<
    | "bestTimeToVisit"
    | "faqAboutMauritius"
    | "giveaway"
    | "mauritiusIsland"
    | "visaRequirements"
    | "aiItinerary"
    | "createItinerary",
    MetadataText
  >;
};

const systemPageTranslations: Record<SystemLocale, SystemPageTranslations> = {
  en: {
    error: {
      title: "Oops",
      heading: "Something went wrong",
      body: "We hit an unexpected issue. Please try again or head back to the homepage.",
      tryAgain: "Try Again",
      backHome: "Back to Home",
    },
    notFound: {
      metadata: {
        title: "Page Not Found",
        description: "The page you are looking for could not be found. Explore Mauritius beaches, activities, and more.",
        openGraphTitle: "Page Not Found",
        openGraphDescription: "The page you are looking for could not be found. Explore Mauritius beaches, activities, and more.",
      },
      heading: "Page Not Found",
      body: "Oops! It seems like this page has wandered off to explore the beaches. Let's get you back on track.",
      backHome: "Back to Home",
      exploreBeaches: "Explore Beaches",
      popularPrompt: "Or try one of these popular pages:",
      placesToVisit: "Places to Visit",
      activities: "Activities",
      aboutMauritius: "About Mauritius",
      contactUs: "Contact Us",
    },
    loading: {
      giveaway: "Loading giveaway",
      itineraries: "Loading itineraries...",
    },
    metadata: {
      bestTimeToVisit: {
        title: "Best Time to Visit Mauritius 2026 | Month by Month Weather Guide",
        description: "Plan the best time to visit Mauritius with month-by-month weather, seasons, and trip tips.",
        openGraphTitle: "Best Time to Visit Mauritius 2026",
        openGraphDescription: "Plan the best time to visit Mauritius with month-by-month weather, seasons, and trip tips.",
      },
      faqAboutMauritius: {
        title: "Mauritius FAQ - Frequently Asked Questions About Mauritius",
        description: "Find answers to common questions about visiting Mauritius. Travel tips, best time to visit, visa info, currency, and everything you need to know.",
        openGraphTitle: "Mauritius FAQ - Your Questions Answered",
        openGraphDescription: "Find answers to common questions about visiting Mauritius.",
      },
      giveaway: {
        title: "Giveaway - Win Unforgettable Mauritius Experiences",
        description: "Enter our exclusive giveaway: weekly draws from 19 April. Luxury experiences, stays, and adventures for two. Share on social media and submit your details.",
        openGraphTitle: "Giveaway - Unforgettable Mauritius Experiences",
        openGraphDescription: "Weekly draws from 19 April. Enter for a chance to win tours, stays, and adventures across Mauritius.",
      },
      mauritiusIsland: {
        title: "Mauritius Island: Your Complete Travel Guide",
        description: "Discover Mauritius with beaches, culture, activities, regions, and local travel tips.",
        openGraphTitle: "Mauritius Island: Your Complete Travel Guide",
        openGraphDescription: "Discover Mauritius with beaches, culture, activities, regions, and local travel tips.",
      },
      visaRequirements: {
        title: "Mauritius Visa Requirements 2026 - Entry Information by Country",
        description: "Check visa requirements for Mauritius by country. Find out if you need a visa, duration of stay, and entry requirements for your Mauritius trip.",
        openGraphTitle: "Mauritius Visa Requirements 2026",
        openGraphDescription: "Check visa requirements for Mauritius by country. Entry information for your trip.",
      },
      aiItinerary: { title: "AI Mauritius Itinerary Generator" },
      createItinerary: { title: "Create Your Mauritius Itinerary" },
    },
  },
  fr: {
    error: {
      title: "Oups",
      heading: "Un problème est survenu",
      body: "Une erreur inattendue s'est produite. Réessayez ou retournez à l'accueil.",
      tryAgain: "Réessayer",
      backHome: "Retour à l'accueil",
    },
    notFound: {
      metadata: {
        title: "Page introuvable",
        description: "La page recherchée est introuvable. Explorez les plages, activités et guides de Maurice.",
        openGraphTitle: "Page introuvable",
        openGraphDescription: "La page recherchée est introuvable. Explorez les plages, activités et guides de Maurice.",
      },
      heading: "Page introuvable",
      body: "Oups ! Cette page semble être partie explorer les plages. Remettons-vous sur la bonne route.",
      backHome: "Retour à l'accueil",
      exploreBeaches: "Explorer les plages",
      popularPrompt: "Essayez plutôt l'une de ces pages populaires :",
      placesToVisit: "Lieux à visiter",
      activities: "Activités",
      aboutMauritius: "À propos de Maurice",
      contactUs: "Nous contacter",
    },
    loading: {
      giveaway: "Chargement du concours",
      itineraries: "Chargement des itinéraires...",
    },
    metadata: {
      bestTimeToVisit: {
        title: "Meilleure période pour visiter Maurice 2026 | Guide météo mois par mois",
        description: "Préparez la meilleure période pour visiter Maurice avec la météo mois par mois, les saisons et des conseils de voyage.",
        openGraphTitle: "Meilleure période pour visiter Maurice 2026",
        openGraphDescription: "Préparez la meilleure période pour visiter Maurice avec météo, saisons et conseils mois par mois.",
      },
      faqAboutMauritius: {
        title: "FAQ Maurice - Questions fréquentes sur Maurice",
        description: "Trouvez les réponses aux questions fréquentes sur un voyage à Maurice : conseils, meilleure période, visa, monnaie et informations utiles.",
        openGraphTitle: "FAQ Maurice - Réponses à vos questions",
        openGraphDescription: "Trouvez les réponses aux questions fréquentes sur un voyage à Maurice.",
      },
      giveaway: {
        title: "Concours - Gagnez des expériences inoubliables à Maurice",
        description: "Participez à notre concours exclusif : tirages hebdomadaires dès le 19 avril, séjours, aventures et expériences pour deux.",
        openGraphTitle: "Concours - Expériences inoubliables à Maurice",
        openGraphDescription: "Tirages hebdomadaires dès le 19 avril. Tentez de gagner des tours, séjours et aventures à Maurice.",
      },
      mauritiusIsland: {
        title: "Île Maurice : votre guide de voyage complet",
        description: "Découvrez Maurice avec ses plages, sa culture, ses activités, ses régions et des conseils de voyage locaux.",
        openGraphTitle: "Île Maurice : votre guide de voyage complet",
        openGraphDescription: "Découvrez Maurice avec ses plages, sa culture, ses activités, ses régions et des conseils locaux.",
      },
      visaRequirements: {
        title: "Conditions de visa pour Maurice 2026 - Infos d'entrée par pays",
        description: "Vérifiez les conditions de visa pour Maurice par pays : visa requis, durée de séjour et exigences d'entrée.",
        openGraphTitle: "Conditions de visa pour Maurice 2026",
        openGraphDescription: "Vérifiez les conditions de visa pour Maurice par pays et préparez votre voyage.",
      },
      aiItinerary: { title: "Générateur d'itinéraire Maurice par IA" },
      createItinerary: { title: "Créer votre itinéraire à Maurice" },
    },
  },
  de: {
    error: {
      title: "Ups",
      heading: "Etwas ist schiefgelaufen",
      body: "Es ist ein unerwartetes Problem aufgetreten. Bitte versuchen Sie es erneut oder gehen Sie zurück zur Startseite.",
      tryAgain: "Erneut versuchen",
      backHome: "Zur Startseite",
    },
    notFound: {
      metadata: {
        title: "Seite nicht gefunden",
        description: "Die gesuchte Seite wurde nicht gefunden. Entdecken Sie Strände, Aktivitäten und Guides für Mauritius.",
        openGraphTitle: "Seite nicht gefunden",
        openGraphDescription: "Die gesuchte Seite wurde nicht gefunden. Entdecken Sie Strände, Aktivitäten und Guides für Mauritius.",
      },
      heading: "Seite nicht gefunden",
      body: "Ups! Diese Seite ist wohl selbst an den Strand gegangen. Wir bringen Sie zurück auf Kurs.",
      backHome: "Zur Startseite",
      exploreBeaches: "Strände entdecken",
      popularPrompt: "Oder probieren Sie eine dieser beliebten Seiten:",
      placesToVisit: "Sehenswürdigkeiten",
      activities: "Aktivitäten",
      aboutMauritius: "Über Mauritius",
      contactUs: "Kontakt",
    },
    loading: {
      giveaway: "Gewinnspiel wird geladen",
      itineraries: "Reisepläne werden geladen...",
    },
    metadata: {
      bestTimeToVisit: {
        title: "Beste Reisezeit für Mauritius 2026 | Wetterguide Monat für Monat",
        description: "Planen Sie die beste Reisezeit für Mauritius mit Wetter, Jahreszeiten und Reisetipps Monat für Monat.",
        openGraphTitle: "Beste Reisezeit für Mauritius 2026",
        openGraphDescription: "Planen Sie die beste Reisezeit für Mauritius mit Wetter, Jahreszeiten und Reisetipps.",
      },
      faqAboutMauritius: {
        title: "Mauritius FAQ - Häufige Fragen zu Mauritius",
        description: "Antworten auf häufige Fragen zu Mauritius: Reisetipps, beste Reisezeit, Visum, Währung und wichtige Infos.",
        openGraphTitle: "Mauritius FAQ - Ihre Fragen beantwortet",
        openGraphDescription: "Antworten auf häufige Fragen zu Reisen nach Mauritius.",
      },
      giveaway: {
        title: "Gewinnspiel - Unvergessliche Mauritius-Erlebnisse gewinnen",
        description: "Nehmen Sie am exklusiven Gewinnspiel teil: wöchentliche Ziehungen ab 19. April, Erlebnisse, Aufenthalte und Abenteuer für zwei.",
        openGraphTitle: "Gewinnspiel - Unvergessliche Mauritius-Erlebnisse",
        openGraphDescription: "Wöchentliche Ziehungen ab 19. April. Gewinnen Sie Touren, Aufenthalte und Abenteuer auf Mauritius.",
      },
      mauritiusIsland: {
        title: "Mauritius: Ihr kompletter Reiseführer",
        description: "Entdecken Sie Mauritius mit Stränden, Kultur, Aktivitäten, Regionen und lokalen Reisetipps.",
        openGraphTitle: "Mauritius: Ihr kompletter Reiseführer",
        openGraphDescription: "Entdecken Sie Mauritius mit Stränden, Kultur, Aktivitäten, Regionen und lokalen Reisetipps.",
      },
      visaRequirements: {
        title: "Mauritius Visabestimmungen 2026 - Einreiseinfos nach Land",
        description: "Prüfen Sie die Visabestimmungen für Mauritius nach Land: Visumpflicht, Aufenthaltsdauer und Einreiseanforderungen.",
        openGraphTitle: "Mauritius Visabestimmungen 2026",
        openGraphDescription: "Prüfen Sie die Visabestimmungen für Mauritius nach Land und planen Sie Ihre Reise.",
      },
      aiItinerary: { title: "KI-Reiseplan-Generator für Mauritius" },
      createItinerary: { title: "Mauritius-Reiseplan erstellen" },
    },
  },
  it: {
    error: {
      title: "Ops",
      heading: "Qualcosa è andato storto",
      body: "Si è verificato un problema inatteso. Riprova oppure torna alla homepage.",
      tryAgain: "Riprova",
      backHome: "Torna alla home",
    },
    notFound: {
      metadata: {
        title: "Pagina non trovata",
        description: "La pagina che cerchi non è stata trovata. Esplora spiagge, attività e guide di Mauritius.",
        openGraphTitle: "Pagina non trovata",
        openGraphDescription: "La pagina che cerchi non è stata trovata. Esplora spiagge, attività e guide di Mauritius.",
      },
      heading: "Pagina non trovata",
      body: "Ops! Sembra che questa pagina sia andata a esplorare le spiagge. Ti riportiamo sulla strada giusta.",
      backHome: "Torna alla home",
      exploreBeaches: "Esplora le spiagge",
      popularPrompt: "Oppure prova una di queste pagine popolari:",
      placesToVisit: "Luoghi da visitare",
      activities: "Attività",
      aboutMauritius: "Informazioni su Mauritius",
      contactUs: "Contattaci",
    },
    loading: {
      giveaway: "Caricamento giveaway",
      itineraries: "Caricamento itinerari...",
    },
    metadata: {
      bestTimeToVisit: {
        title: "Quando visitare Mauritius 2026 | Guida meteo mese per mese",
        description: "Pianifica il periodo migliore per visitare Mauritius con meteo mese per mese, stagioni e consigli di viaggio.",
        openGraphTitle: "Quando visitare Mauritius 2026",
        openGraphDescription: "Pianifica il periodo migliore per visitare Mauritius con meteo, stagioni e consigli.",
      },
      faqAboutMauritius: {
        title: "FAQ Mauritius - Domande frequenti su Mauritius",
        description: "Risposte alle domande più comuni su Mauritius: consigli di viaggio, periodo migliore, visto, valuta e informazioni utili.",
        openGraphTitle: "FAQ Mauritius - Risposte alle tue domande",
        openGraphDescription: "Risposte alle domande più comuni su un viaggio a Mauritius.",
      },
      giveaway: {
        title: "Giveaway - Vinci esperienze indimenticabili a Mauritius",
        description: "Partecipa al giveaway esclusivo: estrazioni settimanali dal 19 aprile, soggiorni, esperienze e avventure per due.",
        openGraphTitle: "Giveaway - Esperienze indimenticabili a Mauritius",
        openGraphDescription: "Estrazioni settimanali dal 19 aprile. Vinci tour, soggiorni e avventure a Mauritius.",
      },
      mauritiusIsland: {
        title: "Isola di Mauritius: la guida di viaggio completa",
        description: "Scopri Mauritius con spiagge, cultura, attività, regioni e consigli di viaggio locali.",
        openGraphTitle: "Isola di Mauritius: la guida di viaggio completa",
        openGraphDescription: "Scopri Mauritius con spiagge, cultura, attività, regioni e consigli locali.",
      },
      visaRequirements: {
        title: "Requisiti visto Mauritius 2026 - Informazioni d'ingresso per paese",
        description: "Controlla i requisiti di visto per Mauritius per paese: visto necessario, durata del soggiorno e regole d'ingresso.",
        openGraphTitle: "Requisiti visto Mauritius 2026",
        openGraphDescription: "Controlla i requisiti di visto per Mauritius per paese e prepara il viaggio.",
      },
      aiItinerary: { title: "Generatore itinerario Mauritius con IA" },
      createItinerary: { title: "Crea il tuo itinerario a Mauritius" },
    },
  },
  es: {
    error: {
      title: "Ups",
      heading: "Algo salió mal",
      body: "Hemos encontrado un problema inesperado. Inténtalo de nuevo o vuelve a la página de inicio.",
      tryAgain: "Intentar de nuevo",
      backHome: "Volver al inicio",
    },
    notFound: {
      metadata: {
        title: "Página no encontrada",
        description: "No se pudo encontrar la página que buscas. Explora playas, actividades y guías de Mauricio.",
        openGraphTitle: "Página no encontrada",
        openGraphDescription: "No se pudo encontrar la página que buscas. Explora playas, actividades y guías de Mauricio.",
      },
      heading: "Página no encontrada",
      body: "Ups! Parece que esta página se fue a explorar las playas. Vamos a ponerte de nuevo en camino.",
      backHome: "Volver al inicio",
      exploreBeaches: "Explorar playas",
      popularPrompt: "O prueba una de estas páginas populares:",
      placesToVisit: "Lugares para visitar",
      activities: "Actividades",
      aboutMauritius: "Sobre Mauricio",
      contactUs: "Contacto",
    },
    loading: {
      giveaway: "Cargando sorteo",
      itineraries: "Cargando itinerarios...",
    },
    metadata: {
      bestTimeToVisit: {
        title: "Mejor época para visitar Mauricio 2026 | Guía meteorológica mes a mes",
        description: "Planifica la mejor época para visitar Mauricio con clima mes a mes, estaciones y consejos de viaje.",
        openGraphTitle: "Mejor época para visitar Mauricio 2026",
        openGraphDescription: "Planifica la mejor época para visitar Mauricio con clima, estaciones y consejos.",
      },
      faqAboutMauritius: {
        title: "FAQ Mauricio - Preguntas frecuentes sobre Mauricio",
        description: "Encuentra respuestas sobre viajar a Mauricio: consejos, mejor época, visado, moneda y todo lo esencial.",
        openGraphTitle: "FAQ Mauricio - Tus preguntas respondidas",
        openGraphDescription: "Encuentra respuestas a preguntas frecuentes sobre viajar a Mauricio.",
      },
      giveaway: {
        title: "Sorteo - Gana experiencias inolvidables en Mauricio",
        description: "Participa en el sorteo exclusivo: sorteos semanales desde el 19 de abril, estancias, experiencias y aventuras para dos.",
        openGraphTitle: "Sorteo - Experiencias inolvidables en Mauricio",
        openGraphDescription: "Sorteos semanales desde el 19 de abril. Gana tours, estancias y aventuras en Mauricio.",
      },
      mauritiusIsland: {
        title: "Isla Mauricio: tu guía de viaje completa",
        description: "Descubre Mauricio con playas, cultura, actividades, regiones y consejos locales.",
        openGraphTitle: "Isla Mauricio: tu guía de viaje completa",
        openGraphDescription: "Descubre Mauricio con playas, cultura, actividades, regiones y consejos locales.",
      },
      visaRequirements: {
        title: "Requisitos de visa para Mauricio 2026 - Entrada por país",
        description: "Consulta los requisitos de visa para Mauricio por país: si necesitas visa, duración de estancia y requisitos de entrada.",
        openGraphTitle: "Requisitos de visa para Mauricio 2026",
        openGraphDescription: "Consulta los requisitos de visa para Mauricio por país y prepara tu viaje.",
      },
      aiItinerary: { title: "Generador de itinerarios de Mauricio con IA" },
      createItinerary: { title: "Crear tu itinerario de Mauricio" },
    },
  },
  ru: {
    error: {
      title: "Ой",
      heading: "Что-то пошло не так",
      body: "Возникла неожиданная ошибка. Попробуйте снова или вернитесь на главную страницу.",
      tryAgain: "Попробовать снова",
      backHome: "На главную",
    },
    notFound: {
      metadata: {
        title: "Страница не найдена",
        description: "Страница, которую вы ищете, не найдена. Откройте пляжи, развлечения и гиды по Маврикию.",
        openGraphTitle: "Страница не найдена",
        openGraphDescription: "Страница, которую вы ищете, не найдена. Откройте пляжи, развлечения и гиды по Маврикию.",
      },
      heading: "Страница не найдена",
      body: "Ой! Похоже, эта страница ушла исследовать пляжи. Давайте вернем вас на маршрут.",
      backHome: "На главную",
      exploreBeaches: "Открыть пляжи",
      popularPrompt: "Или попробуйте одну из популярных страниц:",
      placesToVisit: "Места для посещения",
      activities: "Развлечения",
      aboutMauritius: "О Маврикии",
      contactUs: "Контакты",
    },
    loading: {
      giveaway: "Загрузка розыгрыша",
      itineraries: "Загрузка маршрутов...",
    },
    metadata: {
      bestTimeToVisit: {
        title: "Лучшее время для поездки на Маврикий 2026 | Погода по месяцам",
        description: "Планируйте лучшее время для поездки на Маврикий с погодой по месяцам, сезонами и советами.",
        openGraphTitle: "Лучшее время для поездки на Маврикий 2026",
        openGraphDescription: "Планируйте лучшее время для поездки на Маврикий с погодой, сезонами и советами.",
      },
      faqAboutMauritius: {
        title: "FAQ по Маврикию - Частые вопросы о Маврикии",
        description: "Ответы на частые вопросы о поездке на Маврикий: советы, лучшее время, виза, валюта и важная информация.",
        openGraphTitle: "FAQ по Маврикию - Ответы на ваши вопросы",
        openGraphDescription: "Ответы на частые вопросы о поездке на Маврикий.",
      },
      giveaway: {
        title: "Розыгрыш - выиграйте незабываемые впечатления на Маврикии",
        description: "Участвуйте в эксклюзивном розыгрыше: еженедельные тиражи с 19 апреля, туры, проживание и приключения для двоих.",
        openGraphTitle: "Розыгрыш - незабываемые впечатления на Маврикии",
        openGraphDescription: "Еженедельные тиражи с 19 апреля. Выиграйте туры, проживание и приключения на Маврикии.",
      },
      mauritiusIsland: {
        title: "Остров Маврикий: полный путеводитель",
        description: "Откройте Маврикий: пляжи, культура, развлечения, регионы и местные советы для путешествия.",
        openGraphTitle: "Остров Маврикий: полный путеводитель",
        openGraphDescription: "Откройте Маврикий: пляжи, культура, развлечения, регионы и местные советы.",
      },
      visaRequirements: {
        title: "Визовые требования Маврикия 2026 - въезд по странам",
        description: "Проверьте визовые требования для Маврикия по странам: нужна ли виза, срок пребывания и правила въезда.",
        openGraphTitle: "Визовые требования Маврикия 2026",
        openGraphDescription: "Проверьте визовые требования для Маврикия по странам и подготовьте поездку.",
      },
      aiItinerary: { title: "Генератор маршрута по Маврикию с ИИ" },
      createItinerary: { title: "Создать маршрут по Маврикию" },
    },
  },
};

export function getSystemPageTranslations(locale?: string): SystemPageTranslations {
  return systemPageTranslations[getSystemLocale(locale)];
}

export function buildLocalizedMetadata(text: MetadataText, canonical?: string): Metadata {
  return {
    title: text.title,
    description: text.description,
    openGraph: {
      title: text.openGraphTitle ?? text.title,
      description: text.openGraphDescription ?? text.description,
    },
    alternates: canonical ? { canonical } : undefined,
  };
}
