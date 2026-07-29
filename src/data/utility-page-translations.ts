import type { InfoLocale } from "./main-info-translations";
import { infoLocales } from "./main-info-translations";

function localeOf(locale: string): InfoLocale {
  return infoLocales.includes(locale as InfoLocale) ? (locale as InfoLocale) : "en";
}

export const utilityPageInfo = {
  en: {
    beachFinder: {
      metadata: {
        title: "Mauritius Beach Finder",
        description: "Find the right Mauritius beach for swimming, sunsets, snorkelling, families and road trips with this quick beach finder.",
      },
      ogDescription: "Find the right Mauritius beach for swimming, sunsets, snorkelling, families and road trips.",
      kicker: "Linkable Asset / Beach Finder",
      title: "Mauritius Beach Finder",
      intro: "Match your trip style to the right beach, then open the full beach guide for location, tips and nearby ideas.",
      popularTitle: "Popular beach guides",
      picks: [
        { need: "Calm swimming", beach: "Trou aux Biches", href: "/beaches-in-mauritius/trou-aux-biches" },
        { need: "Sunsets", beach: "Flic en Flac", href: "/beaches-in-mauritius/flic-en-flac" },
        { need: "Snorkelling", beach: "Blue Bay", href: "/beaches-in-mauritius/blue-bay" },
        { need: "Iconic views", beach: "Le Morne", href: "/beaches-in-mauritius/le-morne" },
      ],
    },
    byCar: {
      metadata: {
        title: "Mauritius by Car",
        description: "Mauritius by car - everything you need to self-drive the island: car rental tips, driving on the left, road rules and the best scenic routes to take.",
      },
    },
    esim: {
      metadata: {
        title: "Mauritius eSIM & Internet Guide",
        description: "Plan mobile data in Mauritius with this practical guide to eSIMs, local SIM cards, Wi-Fi, coverage and traveller connectivity tips.",
      },
      kicker: "Connectivity / Travel Basics",
      title: "Mauritius eSIM & Internet Guide",
      intro: "A simple guide to staying connected in Mauritius, from eSIMs and local SIM cards to hotel Wi-Fi, maps, WhatsApp bookings and road-trip data needs.",
      options: [
        { title: "eSIM before you fly", description: "Best if your phone supports eSIM and you want data ready as soon as you land. Compare roaming speed, data allowance and hotspot rules before buying." },
        { title: "Local SIM card", description: "Good for longer trips and heavier data use. Bring your passport, check airport or mall availability, and keep your hotel address handy." },
        { title: "Hotel and villa Wi-Fi", description: "Useful for backups, uploads and planning, but do not rely on Wi-Fi alone for driving directions, hiking plans or beach-day changes." },
      ],
      checklistTitle: "Quick checklist",
      checklist: [
        "Check that your phone is unlocked before buying a local SIM or eSIM.",
        "Download offline Google Maps for Mauritius before long drives.",
        "Keep WhatsApp active, because many local operators confirm bookings there.",
        "Save key hotel, taxi and transfer contacts before leaving the airport.",
      ],
      transferCta: "Plan airport transfer",
      roadTripCta: "Plan a road trip",
    },
    roadTrips: {
      metadata: {
        title: "Mauritius Road Trips",
        description: "Mauritius road trips - the best self-drive routes around the island, day by day. Beaches, waterfalls, viewpoints and hidden gems, all reachable by car.",
      },
    },
    myTrips: {
      metadata: { title: "My Trips", description: "View and manage your saved Mauritius itineraries" },
      heroAlt: "My Trips - Mauritius Explored",
      title: "My Itineraries",
      subtitle: "Your saved Mauritius itineraries",
      emptySummary: "You haven't saved any itineraries yet",
      savedSummary: "{count} saved {label}",
      singularLabel: "itinerary",
      pluralLabel: "itineraries",
      savedPrefix: "Saved",
      noTripsTitle: "No trips yet",
      noTripsText: "Start building your perfect Mauritius itinerary by adding beaches, activities and places you want to visit.",
      stopSingular: "stop",
      stopPlural: "stops",
      publicLabel: "Public",
      publicAnonymousLabel: "Public (Anonymous)",
      viewEdit: "View/Edit",
      dateLocale: "en-GB",
    },
  },
  fr: {
    beachFinder: {
      metadata: {
        title: "Sélecteur de plages à Maurice",
        description: "Trouvez la plage de Maurice qui correspond à la baignade, aux couchers de soleil, au snorkeling, aux familles et aux road trips.",
      },
      ogDescription: "Trouvez la bonne plage à Maurice pour nager, voir le coucher du soleil, faire du snorkeling ou voyager en famille.",
      kicker: "Outil pratique / Sélecteur de plages",
      title: "Sélecteur de plages à Maurice",
      intro: "Associez votre style de voyage à la bonne plage, puis ouvrez le guide complet pour l'emplacement, les conseils et les idées à proximité.",
      popularTitle: "Guides de plages populaires",
      picks: [
        { need: "Baignade calme", beach: "Trou aux Biches", href: "/beaches-in-mauritius/trou-aux-biches" },
        { need: "Couchers de soleil", beach: "Flic en Flac", href: "/beaches-in-mauritius/flic-en-flac" },
        { need: "Snorkeling", beach: "Blue Bay", href: "/beaches-in-mauritius/blue-bay" },
        { need: "Vues iconiques", beach: "Le Morne", href: "/beaches-in-mauritius/le-morne" },
      ],
    },
    byCar: {
      metadata: {
        title: "Maurice en voiture",
        description: "Maurice en voiture : conseils de location, conduite à gauche, règles de route et meilleurs itinéraires panoramiques.",
      },
    },
    esim: {
      metadata: {
        title: "Guide eSIM et Internet à Maurice",
        description: "Préparez vos données mobiles à Maurice avec ce guide sur les eSIM, cartes SIM locales, Wi-Fi, couverture et conseils de connexion.",
      },
      kicker: "Connexion / Bases de voyage",
      title: "Guide eSIM et Internet à Maurice",
      intro: "Un guide simple pour rester connecté à Maurice, des eSIM et cartes SIM locales au Wi-Fi d'hôtel, cartes, réservations WhatsApp et besoins data en road trip.",
      options: [
        { title: "eSIM avant le départ", description: "Idéal si votre téléphone accepte l'eSIM et si vous voulez des données dès l'arrivée. Comparez vitesse, volume de données et règles de partage de connexion." },
        { title: "Carte SIM locale", description: "Pratique pour les longs séjours et une forte utilisation. Apportez votre passeport, vérifiez la disponibilité à l'aéroport ou en centre commercial et gardez l'adresse de l'hôtel." },
        { title: "Wi-Fi hôtel et villa", description: "Utile pour les sauvegardes, envois et planification, mais ne comptez pas uniquement dessus pour la route, les randonnées ou les changements de plage." },
      ],
      checklistTitle: "Checklist rapide",
      checklist: [
        "Vérifiez que votre téléphone est débloqué avant d'acheter une SIM locale ou eSIM.",
        "Téléchargez Google Maps hors ligne pour Maurice avant les longs trajets.",
        "Gardez WhatsApp actif, car beaucoup d'opérateurs locaux confirment les réservations là-bas.",
        "Enregistrez les contacts clés de l'hôtel, taxi et transfert avant de quitter l'aéroport.",
      ],
      transferCta: "Planifier le transfert aéroport",
      roadTripCta: "Planifier un road trip",
    },
    roadTrips: {
      metadata: {
        title: "Road trips à Maurice",
        description: "Road trips à Maurice : les meilleurs itinéraires en voiture, jour par jour, avec plages, cascades, points de vue et coins cachés.",
      },
    },
    myTrips: {
      metadata: { title: "Mes voyages", description: "Consultez et gérez vos itinéraires sauvegardés à Maurice" },
      heroAlt: "Mes voyages - Mauritius Explored",
      title: "Mes itinéraires",
      subtitle: "Vos itinéraires sauvegardés à Maurice",
      emptySummary: "Vous n'avez pas encore sauvegardé d'itinéraire",
      savedSummary: "{count} {label} sauvegardé(s)",
      singularLabel: "itinéraire",
      pluralLabel: "itinéraires",
      savedPrefix: "Sauvegardé",
      noTripsTitle: "Aucun voyage pour l'instant",
      noTripsText: "Commencez à créer votre itinéraire idéal à Maurice en ajoutant plages, activités et lieux à visiter.",
      stopSingular: "étape",
      stopPlural: "étapes",
      publicLabel: "Public",
      publicAnonymousLabel: "Public (anonyme)",
      viewEdit: "Voir/Modifier",
      dateLocale: "fr-FR",
    },
  },
  de: {
    beachFinder: {
      metadata: {
        title: "Mauritius Beach Finder",
        description: "Finden Sie den passenden Strand auf Mauritius zum Schwimmen, für Sonnenuntergänge, Schnorcheln, Familien und Roadtrips.",
      },
      ogDescription: "Finden Sie den passenden Mauritius-Strand zum Schwimmen, Schnorcheln, für Sonnenuntergänge und Familien.",
      kicker: "Planungshilfe / Beach Finder",
      title: "Mauritius Beach Finder",
      intro: "Ordnen Sie Ihren Reisestil dem richtigen Strand zu und öffnen Sie anschließend den vollständigen Strandguide mit Lage, Tipps und Ideen in der Nähe.",
      popularTitle: "Beliebte Strandguides",
      picks: [
        { need: "Ruhiges Schwimmen", beach: "Trou aux Biches", href: "/beaches-in-mauritius/trou-aux-biches" },
        { need: "Sonnenuntergänge", beach: "Flic en Flac", href: "/beaches-in-mauritius/flic-en-flac" },
        { need: "Schnorcheln", beach: "Blue Bay", href: "/beaches-in-mauritius/blue-bay" },
        { need: "Ikonische Ausblicke", beach: "Le Morne", href: "/beaches-in-mauritius/le-morne" },
      ],
    },
    byCar: {
      metadata: {
        title: "Mauritius mit dem Auto",
        description: "Mauritius mit dem Auto: Mietwagentipps, Linksverkehr, Verkehrsregeln und die schönsten Routen der Insel.",
      },
    },
    esim: {
      metadata: {
        title: "Mauritius eSIM- und Internet-Guide",
        description: "Planen Sie mobile Daten auf Mauritius mit Tipps zu eSIMs, lokalen SIM-Karten, WLAN, Netzabdeckung und Konnektivität.",
      },
      kicker: "Konnektivität / Reisebasics",
      title: "Mauritius eSIM- und Internet-Guide",
      intro: "Ein einfacher Guide, um auf Mauritius verbunden zu bleiben: eSIMs, lokale SIM-Karten, Hotel-WLAN, Karten, WhatsApp-Buchungen und Datenbedarf für Roadtrips.",
      options: [
        { title: "eSIM vor dem Flug", description: "Ideal, wenn Ihr Handy eSIM unterstützt und Sie direkt nach der Landung Daten nutzen möchten. Vergleichen Sie Geschwindigkeit, Datenvolumen und Hotspot-Regeln." },
        { title: "Lokale SIM-Karte", description: "Gut für längere Reisen und höhere Datennutzung. Nehmen Sie Ihren Reisepass mit, prüfen Sie Verfügbarkeit am Flughafen oder im Einkaufszentrum und halten Sie die Hoteladresse bereit." },
        { title: "Hotel- und Villa-WLAN", description: "Nützlich für Backups, Uploads und Planung, aber verlassen Sie sich nicht allein darauf für Navigation, Wanderpläne oder spontane Strandwechsel." },
      ],
      checklistTitle: "Schnelle Checkliste",
      checklist: [
        "Prüfen Sie, ob Ihr Handy entsperrt ist, bevor Sie eine lokale SIM oder eSIM kaufen.",
        "Laden Sie Offline-Karten für Mauritius vor längeren Fahrten herunter.",
        "Halten Sie WhatsApp aktiv, da viele lokale Anbieter Buchungen dort bestätigen.",
        "Speichern Sie wichtige Hotel-, Taxi- und Transferkontakte vor dem Verlassen des Flughafens.",
      ],
      transferCta: "Flughafentransfer planen",
      roadTripCta: "Roadtrip planen",
    },
    roadTrips: {
      metadata: {
        title: "Mauritius Roadtrips",
        description: "Mauritius Roadtrips: die besten Selbstfahrer-Routen mit Stränden, Wasserfällen, Aussichtspunkten und versteckten Orten.",
      },
    },
    myTrips: {
      metadata: { title: "Meine Reisen", description: "Sehen und verwalten Sie Ihre gespeicherten Mauritius-Routen" },
      heroAlt: "Meine Reisen - Mauritius Explored",
      title: "Meine Routen",
      subtitle: "Ihre gespeicherten Mauritius-Routen",
      emptySummary: "Sie haben noch keine Route gespeichert",
      savedSummary: "{count} gespeicherte {label}",
      singularLabel: "Route",
      pluralLabel: "Routen",
      savedPrefix: "Gespeichert",
      noTripsTitle: "Noch keine Reisen",
      noTripsText: "Starten Sie Ihre perfekte Mauritius-Route, indem Sie Strände, Aktivitäten und Orte hinzufügen.",
      stopSingular: "Stopp",
      stopPlural: "Stopps",
      publicLabel: "Öffentlich",
      publicAnonymousLabel: "Öffentlich (anonym)",
      viewEdit: "Ansehen/Bearbeiten",
      dateLocale: "de-DE",
    },
  },
  it: {
    beachFinder: {
      metadata: {
        title: "Trova spiagge a Mauritius",
        description: "Trova la spiaggia giusta a Mauritius per nuotare, tramonti, snorkeling, famiglie e road trip.",
      },
      ogDescription: "Trova la spiaggia giusta a Mauritius per nuoto, tramonti, snorkeling, famiglie e road trip.",
      kicker: "Strumento utile / Trova spiagge",
      title: "Trova spiagge a Mauritius",
      intro: "Abbina il tuo stile di viaggio alla spiaggia giusta, poi apri la guida completa con posizione, consigli e idee nei dintorni.",
      popularTitle: "Guide spiagge popolari",
      picks: [
        { need: "Nuoto tranquillo", beach: "Trou aux Biches", href: "/beaches-in-mauritius/trou-aux-biches" },
        { need: "Tramonti", beach: "Flic en Flac", href: "/beaches-in-mauritius/flic-en-flac" },
        { need: "Snorkeling", beach: "Blue Bay", href: "/beaches-in-mauritius/blue-bay" },
        { need: "Viste iconiche", beach: "Le Morne", href: "/beaches-in-mauritius/le-morne" },
      ],
    },
    byCar: {
      metadata: {
        title: "Mauritius in auto",
        description: "Mauritius in auto: consigli per il noleggio, guida a sinistra, regole stradali e migliori itinerari panoramici.",
      },
    },
    esim: {
      metadata: {
        title: "Guida eSIM e Internet a Mauritius",
        description: "Organizza i dati mobili a Mauritius con questa guida a eSIM, SIM locali, Wi-Fi, copertura e consigli di connessione.",
      },
      kicker: "Connettività / Basi di viaggio",
      title: "Guida eSIM e Internet a Mauritius",
      intro: "Una guida semplice per restare connessi a Mauritius: eSIM, SIM locali, Wi-Fi in hotel, mappe, prenotazioni WhatsApp e dati per i road trip.",
      options: [
        { title: "eSIM prima di partire", description: "Ideale se il telefono supporta eSIM e vuoi avere dati appena atterri. Confronta velocità, quantità di dati e regole hotspot prima dell'acquisto." },
        { title: "SIM locale", description: "Buona per viaggi più lunghi e uso intenso. Porta il passaporto, controlla disponibilità in aeroporto o nei centri commerciali e tieni pronto l'indirizzo dell'hotel." },
        { title: "Wi-Fi di hotel e ville", description: "Utile per backup, upload e pianificazione, ma non affidarti solo al Wi-Fi per indicazioni stradali, escursioni o cambi di programma in spiaggia." },
      ],
      checklistTitle: "Checklist rapida",
      checklist: [
        "Verifica che il telefono sia sbloccato prima di acquistare una SIM locale o eSIM.",
        "Scarica Google Maps offline per Mauritius prima dei tragitti lunghi.",
        "Mantieni WhatsApp attivo, perché molti operatori locali confermano le prenotazioni lì.",
        "Salva contatti di hotel, taxi e transfer prima di lasciare l'aeroporto.",
      ],
      transferCta: "Pianifica transfer aeroporto",
      roadTripCta: "Pianifica un road trip",
    },
    roadTrips: {
      metadata: {
        title: "Road trip a Mauritius",
        description: "Road trip a Mauritius: i migliori itinerari in auto con spiagge, cascate, punti panoramici e luoghi nascosti.",
      },
    },
    myTrips: {
      metadata: { title: "I miei viaggi", description: "Visualizza e gestisci i tuoi itinerari salvati a Mauritius" },
      heroAlt: "I miei viaggi - Mauritius Explored",
      title: "I miei itinerari",
      subtitle: "I tuoi itinerari salvati a Mauritius",
      emptySummary: "Non hai ancora salvato itinerari",
      savedSummary: "{count} {label} salvati",
      singularLabel: "itinerario",
      pluralLabel: "itinerari",
      savedPrefix: "Salvato",
      noTripsTitle: "Ancora nessun viaggio",
      noTripsText: "Inizia a creare il tuo itinerario perfetto a Mauritius aggiungendo spiagge, attività e luoghi da visitare.",
      stopSingular: "tappa",
      stopPlural: "tappe",
      publicLabel: "Pubblico",
      publicAnonymousLabel: "Pubblico (anonimo)",
      viewEdit: "Vedi/Modifica",
      dateLocale: "it-IT",
    },
  },
  es: {
    beachFinder: {
      metadata: {
        title: "Buscador de playas de Mauricio",
        description: "Encuentra la playa adecuada en Mauricio para nadar, ver atardeceres, hacer snorkel, viajar en familia y hacer road trips.",
      },
      ogDescription: "Encuentra la playa adecuada en Mauricio para nadar, atardeceres, snorkel, familias y road trips.",
      kicker: "Herramienta / Buscador de playas",
      title: "Buscador de playas de Mauricio",
      intro: "Relaciona tu estilo de viaje con la playa adecuada y abre la guía completa con ubicación, consejos e ideas cercanas.",
      popularTitle: "Guías de playas populares",
      picks: [
        { need: "Baño tranquilo", beach: "Trou aux Biches", href: "/beaches-in-mauritius/trou-aux-biches" },
        { need: "Atardeceres", beach: "Flic en Flac", href: "/beaches-in-mauritius/flic-en-flac" },
        { need: "Snorkel", beach: "Blue Bay", href: "/beaches-in-mauritius/blue-bay" },
        { need: "Vistas icónicas", beach: "Le Morne", href: "/beaches-in-mauritius/le-morne" },
      ],
    },
    byCar: {
      metadata: {
        title: "Mauricio en coche",
        description: "Mauricio en coche: consejos de alquiler, conducción por la izquierda, normas de tráfico y mejores rutas panorámicas.",
      },
    },
    esim: {
      metadata: {
        title: "Guía de eSIM e Internet en Mauricio",
        description: "Planifica tus datos móviles en Mauricio con esta guía de eSIM, SIM locales, Wi-Fi, cobertura y consejos de conexión.",
      },
      kicker: "Conectividad / Básicos de viaje",
      title: "Guía de eSIM e Internet en Mauricio",
      intro: "Una guía sencilla para estar conectado en Mauricio: eSIM, SIM locales, Wi-Fi de hotel, mapas, reservas por WhatsApp y datos para road trips.",
      options: [
        { title: "eSIM antes de volar", description: "Ideal si tu teléfono admite eSIM y quieres datos al aterrizar. Compara velocidad, cantidad de datos y reglas de hotspot antes de comprar." },
        { title: "SIM local", description: "Buena para viajes largos y mayor uso de datos. Lleva tu pasaporte, consulta disponibilidad en aeropuerto o centros comerciales y ten a mano la dirección del hotel." },
        { title: "Wi-Fi de hotel y villa", description: "Útil para copias, subidas y planificación, pero no dependas solo del Wi-Fi para conducir, hacer senderismo o cambiar planes de playa." },
      ],
      checklistTitle: "Checklist rápida",
      checklist: [
        "Comprueba que tu teléfono esté desbloqueado antes de comprar una SIM local o eSIM.",
        "Descarga Google Maps sin conexión para Mauricio antes de trayectos largos.",
        "Mantén WhatsApp activo, porque muchos operadores locales confirman reservas allí.",
        "Guarda contactos clave de hotel, taxi y transfer antes de salir del aeropuerto.",
      ],
      transferCta: "Planificar transfer aeropuerto",
      roadTripCta: "Planificar un road trip",
    },
    roadTrips: {
      metadata: {
        title: "Road trips en Mauricio",
        description: "Road trips en Mauricio: las mejores rutas en coche con playas, cascadas, miradores y lugares escondidos.",
      },
    },
    myTrips: {
      metadata: { title: "Mis viajes", description: "Consulta y gestiona tus itinerarios guardados en Mauricio" },
      heroAlt: "Mis viajes - Mauritius Explored",
      title: "Mis itinerarios",
      subtitle: "Tus itinerarios guardados en Mauricio",
      emptySummary: "Todavía no has guardado itinerarios",
      savedSummary: "{count} {label} guardados",
      singularLabel: "itinerario",
      pluralLabel: "itinerarios",
      savedPrefix: "Guardado",
      noTripsTitle: "Aún no hay viajes",
      noTripsText: "Empieza a crear tu itinerario perfecto en Mauricio añadiendo playas, actividades y lugares que quieres visitar.",
      stopSingular: "parada",
      stopPlural: "paradas",
      publicLabel: "Público",
      publicAnonymousLabel: "Público (anónimo)",
      viewEdit: "Ver/Editar",
      dateLocale: "es-ES",
    },
  },
  ru: {
    beachFinder: {
      metadata: {
        title: "Поиск пляжей Маврикия",
        description: "Найдите подходящий пляж на Маврикии для купания, закатов, снорклинга, семейного отдыха и road trip.",
      },
      ogDescription: "Найдите подходящий пляж на Маврикии для купания, закатов, снорклинга, семьи и поездок на машине.",
      kicker: "Полезный инструмент / Поиск пляжей",
      title: "Поиск пляжей Маврикия",
      intro: "Подберите пляж под стиль поездки, затем откройте полный гид с локацией, советами и идеями рядом.",
      popularTitle: "Популярные гиды по пляжам",
      picks: [
        { need: "Спокойное купание", beach: "Trou aux Biches", href: "/beaches-in-mauritius/trou-aux-biches" },
        { need: "Закаты", beach: "Flic en Flac", href: "/beaches-in-mauritius/flic-en-flac" },
        { need: "Снорклинг", beach: "Blue Bay", href: "/beaches-in-mauritius/blue-bay" },
        { need: "Знаковые виды", beach: "Le Morne", href: "/beaches-in-mauritius/le-morne" },
      ],
    },
    byCar: {
      metadata: {
        title: "Маврикий на машине",
        description: "Маврикий на машине: аренда авто, левостороннее движение, правила дорог и лучшие живописные маршруты.",
      },
    },
    esim: {
      metadata: {
        title: "eSIM и интернет на Маврикии",
        description: "Спланируйте мобильный интернет на Маврикии: eSIM, местные SIM-карты, Wi-Fi, покрытие и советы для связи.",
      },
      kicker: "Связь / Основы поездки",
      title: "eSIM и интернет на Маврикии",
      intro: "Простой гид по связи на Маврикии: eSIM, местные SIM-карты, Wi-Fi в отелях, карты, бронирования через WhatsApp и интернет для поездок на машине.",
      options: [
        { title: "eSIM до вылета", description: "Лучше всего, если телефон поддерживает eSIM и вы хотите интернет сразу после посадки. Сравните скорость, объем данных и правила раздачи." },
        { title: "Местная SIM-карта", description: "Хорошо для долгих поездок и активного интернета. Возьмите паспорт, проверьте наличие в аэропорту или ТЦ и держите адрес отеля под рукой." },
        { title: "Wi-Fi в отеле или вилле", description: "Полезен для резервного доступа, загрузок и планирования, но не полагайтесь только на Wi-Fi для навигации, походов или смены пляжа." },
      ],
      checklistTitle: "Быстрый чеклист",
      checklist: [
        "Проверьте, что телефон разблокирован, прежде чем покупать местную SIM или eSIM.",
        "Загрузите офлайн-карты Google для Маврикия перед длинными поездками.",
        "Оставьте WhatsApp активным, потому что многие местные операторы подтверждают бронирования там.",
        "Сохраните контакты отеля, такси и трансфера до выхода из аэропорта.",
      ],
      transferCta: "Спланировать трансфер",
      roadTripCta: "Спланировать road trip",
    },
    roadTrips: {
      metadata: {
        title: "Road trips по Маврикию",
        description: "Road trips по Маврикию: лучшие маршруты на машине с пляжами, водопадами, смотровыми точками и скрытыми местами.",
      },
    },
    myTrips: {
      metadata: { title: "Мои поездки", description: "Просматривайте и управляйте сохраненными маршрутами по Маврикию" },
      heroAlt: "Мои поездки - Mauritius Explored",
      title: "Мои маршруты",
      subtitle: "Ваши сохраненные маршруты по Маврикию",
      emptySummary: "Вы еще не сохранили маршруты",
      savedSummary: "{count} сохраненных {label}",
      singularLabel: "маршрут",
      pluralLabel: "маршрутов",
      savedPrefix: "Сохранено",
      noTripsTitle: "Поездок пока нет",
      noTripsText: "Начните создавать идеальный маршрут по Маврикию, добавляя пляжи, активности и места для посещения.",
      stopSingular: "остановка",
      stopPlural: "остановок",
      publicLabel: "Публичный",
      publicAnonymousLabel: "Публичный (анонимно)",
      viewEdit: "Смотреть/Редактировать",
      dateLocale: "ru-RU",
    },
  },
};

export function getUtilityPageInfo(locale: string) {
  return utilityPageInfo[localeOf(locale)];
}
