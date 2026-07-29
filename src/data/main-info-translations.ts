export type InfoLocale = "en" | "fr" | "de" | "it" | "es" | "ru";

type AboutSection = { title: string; paragraphs: string[] };

export const infoLocales = ["en", "fr", "de", "it", "es", "ru"] as const;

function localeOf(locale: string): InfoLocale {
  return infoLocales.includes(locale as InfoLocale) ? (locale as InfoLocale) : "en";
}

export const contactInfo = {
  en: {
    metadata: { title: "Contact Us", description: "Get in touch with Mauritius Explored. Contact us via email or WhatsApp for travel inquiries." },
    heroAlt: "Contact Mauritius Explored",
    title: "Get In Touch",
    email: "Email Us:",
    whatsapp: "WhatsApp:",
    note: "Whether you have questions about planning your trip, need recommendations, or want to learn more about our services, we're here to help. Reach out to us anytime!",
  },
  fr: {
    metadata: { title: "Nous contacter", description: "Contactez Mauritius Explored par e-mail ou WhatsApp pour vos questions de voyage." },
    heroAlt: "Contacter Mauritius Explored",
    title: "Contactez-nous",
    email: "E-mail :",
    whatsapp: "WhatsApp :",
    note: "Que vous prépariez votre voyage, cherchiez des recommandations ou vouliez en savoir plus sur nos services, nous sommes là pour aider.",
  },
  de: {
    metadata: { title: "Kontakt", description: "Kontaktieren Sie Mauritius Explored per E-Mail oder WhatsApp für Reiseanfragen." },
    heroAlt: "Mauritius Explored kontaktieren",
    title: "Kontakt aufnehmen",
    email: "E-Mail:",
    whatsapp: "WhatsApp:",
    note: "Ob Sie Fragen zur Reiseplanung haben, Empfehlungen brauchen oder mehr über unsere Services erfahren möchten: Wir helfen gern.",
  },
  it: {
    metadata: { title: "Contatti", description: "Contatta Mauritius Explored via email o WhatsApp per domande di viaggio." },
    heroAlt: "Contatta Mauritius Explored",
    title: "Contattaci",
    email: "Email:",
    whatsapp: "WhatsApp:",
    note: "Se hai domande sulla pianificazione del viaggio, vuoi consigli o maggiori informazioni sui nostri servizi, siamo qui per aiutarti.",
  },
  es: {
    metadata: { title: "Contacto", description: "Contacta con Mauritius Explored por email o WhatsApp para consultas de viaje." },
    heroAlt: "Contactar con Mauritius Explored",
    title: "Ponte en contacto",
    email: "Email:",
    whatsapp: "WhatsApp:",
    note: "Si tienes preguntas para planificar tu viaje, necesitas recomendaciones o quieres saber más sobre nuestros servicios, estamos aquí para ayudarte.",
  },
  ru: {
    metadata: { title: "Контакты", description: "Свяжитесь с Mauritius Explored по email или WhatsApp по вопросам путешествий." },
    heroAlt: "Связаться с Mauritius Explored",
    title: "Свяжитесь с нами",
    email: "Email:",
    whatsapp: "WhatsApp:",
    note: "Если у вас есть вопросы по планированию поездки, нужны рекомендации или информация о наших услугах, мы поможем.",
  },
};

export const mediaKitInfo = {
  en: {
    metadata: { title: "Mauritius Explored Media Kit", description: "Media kit for Mauritius Explored, including audience, partnership options, featured listings and sponsored content enquiries." },
    ogDescription: "Audience and partnership information for hotels, operators and travel brands working with Mauritius Explored.",
    kicker: "Partnerships / Media",
    title: "Mauritius Explored Media Kit",
    intro: "A clear starting point for hotels, tour operators and travel brands that want to reach an engaged Mauritius travel audience.",
    stats: [{ value: "316K+", label: "Facebook community" }, { value: "533K+", label: "Instagram audience" }, { value: "2011", label: "Project started" }],
    optionsTitle: "Partnership options",
    offers: ["Featured hotel and operator listings", "Sponsored guide placements with clear disclosure", "Content collaborations for Mauritius travel topics", "Audience packages for launches, events and seasonal campaigns"],
    disclosure: "Commercial placements are disclosed clearly and must fit the guide content. We do not sell hidden links or low-quality link placements.",
    cta: "Contact Mauritius Explored",
  },
  fr: {
    metadata: { title: "Kit média Mauritius Explored", description: "Kit média Mauritius Explored : audience, partenariats, listings sponsorisés et contenus commerciaux." },
    ogDescription: "Informations d'audience et de partenariat pour hôtels, opérateurs et marques de voyage.",
    kicker: "Partenariats / Média",
    title: "Kit média Mauritius Explored",
    intro: "Un point de départ clair pour les hôtels, opérateurs et marques qui veulent toucher une audience voyage engagée à Maurice.",
    stats: [{ value: "316K+", label: "Communauté Facebook" }, { value: "533K+", label: "Audience Instagram" }, { value: "2011", label: "Début du projet" }],
    optionsTitle: "Options de partenariat",
    offers: ["Listings d'hôtels et d'opérateurs mis en avant", "Emplacements sponsorisés avec mention claire", "Collaborations de contenu sur le voyage à Maurice", "Packages audience pour lancements, événements et saisons"],
    disclosure: "Les placements commerciaux sont clairement signalés et doivent rester utiles au guide. Nous ne vendons pas de liens cachés ni de placements de faible qualité.",
    cta: "Contacter Mauritius Explored",
  },
  de: {
    metadata: { title: "Mauritius Explored Media Kit", description: "Media Kit von Mauritius Explored mit Zielgruppe, Partnerschaften und gesponserten Inhalten." },
    ogDescription: "Zielgruppen- und Partnerinformationen für Hotels, Anbieter und Reisemarken.",
    kicker: "Partnerschaften / Medien",
    title: "Mauritius Explored Media Kit",
    intro: "Ein klarer Einstieg für Hotels, Touranbieter und Reisemarken, die eine engagierte Mauritius-Reisezielgruppe erreichen möchten.",
    stats: [{ value: "316K+", label: "Facebook-Community" }, { value: "533K+", label: "Instagram-Zielgruppe" }, { value: "2011", label: "Projektstart" }],
    optionsTitle: "Partnerschaftsoptionen",
    offers: ["Hervorgehobene Hotel- und Anbieterprofile", "Gesponserte Guide-Platzierungen mit klarer Kennzeichnung", "Content-Kooperationen zu Mauritius-Reisethemen", "Audience-Pakete für Launches, Events und Saisonkampagnen"],
    disclosure: "Kommerzielle Platzierungen werden klar offengelegt und müssen zum Guide passen. Wir verkaufen keine versteckten Links oder minderwertigen Linkplätze.",
    cta: "Mauritius Explored kontaktieren",
  },
  it: {
    metadata: { title: "Media Kit Mauritius Explored", description: "Media kit di Mauritius Explored con audience, partnership, listing e contenuti sponsorizzati." },
    ogDescription: "Informazioni su audience e partnership per hotel, operatori e brand travel.",
    kicker: "Partnership / Media",
    title: "Media Kit Mauritius Explored",
    intro: "Un punto di partenza chiaro per hotel, tour operator e brand che vogliono raggiungere un pubblico interessato a Mauritius.",
    stats: [{ value: "316K+", label: "Community Facebook" }, { value: "533K+", label: "Audience Instagram" }, { value: "2011", label: "Progetto avviato" }],
    optionsTitle: "Opzioni di partnership",
    offers: ["Listing in evidenza per hotel e operatori", "Inserimenti sponsorizzati con disclosure chiara", "Collaborazioni editoriali sui viaggi a Mauritius", "Pacchetti audience per lanci, eventi e campagne stagionali"],
    disclosure: "Le inserzioni commerciali sono indicate chiaramente e devono essere coerenti con il contenuto della guida. Non vendiamo link nascosti o placement di bassa qualità.",
    cta: "Contatta Mauritius Explored",
  },
  es: {
    metadata: { title: "Media Kit Mauritius Explored", description: "Media kit de Mauritius Explored con audiencia, opciones de colaboración y contenido patrocinado." },
    ogDescription: "Información de audiencia y colaboración para hoteles, operadores y marcas de viaje.",
    kicker: "Colaboraciones / Media",
    title: "Media Kit Mauritius Explored",
    intro: "Un punto de partida claro para hoteles, operadores turísticos y marcas que quieren llegar a una audiencia interesada en Mauricio.",
    stats: [{ value: "316K+", label: "Comunidad Facebook" }, { value: "533K+", label: "Audiencia Instagram" }, { value: "2011", label: "Inicio del proyecto" }],
    optionsTitle: "Opciones de colaboración",
    offers: ["Listados destacados de hoteles y operadores", "Ubicaciones patrocinadas con aviso claro", "Colaboraciones de contenido sobre Mauricio", "Paquetes de audiencia para lanzamientos, eventos y campañas de temporada"],
    disclosure: "Las ubicaciones comerciales se indican claramente y deben encajar con el contenido. No vendemos enlaces ocultos ni placements de baja calidad.",
    cta: "Contactar con Mauritius Explored",
  },
  ru: {
    metadata: { title: "Медиа-кит Mauritius Explored", description: "Медиа-кит Mauritius Explored: аудитория, партнерства, рекламные размещения и спонсорский контент." },
    ogDescription: "Информация об аудитории и партнерствах для отелей, операторов и travel-брендов.",
    kicker: "Партнерства / Медиа",
    title: "Медиа-кит Mauritius Explored",
    intro: "Понятная отправная точка для отелей, туроператоров и travel-брендов, которые хотят обратиться к активной аудитории путешественников по Маврикию.",
    stats: [{ value: "316K+", label: "Facebook-сообщество" }, { value: "533K+", label: "Instagram-аудитория" }, { value: "2011", label: "Старт проекта" }],
    optionsTitle: "Варианты партнерства",
    offers: ["Выделенные карточки отелей и операторов", "Спонсорские размещения с ясной маркировкой", "Контентные сотрудничества о путешествиях по Маврикию", "Пакеты аудитории для запусков, событий и сезонных кампаний"],
    disclosure: "Коммерческие размещения ясно обозначаются и должны соответствовать содержанию гида. Мы не продаем скрытые ссылки или низкокачественные размещения.",
    cta: "Связаться с Mauritius Explored",
  },
};

export const eventsInfo = {
  en: {
    metadata: { title: "Events in Mauritius | Concerts, Parties & What's On", description: "Discover upcoming events in Mauritius - parties, concerts, and cultural dates. Plan around the calendar and grab tickets early." },
    ogTitle: "Events in Mauritius | What's On",
    ogDescription: "Upcoming events, posters, and dates across Mauritius.",
    ogAlt: "Events in Mauritius - nightlife and parties",
    heroAlt: "Events in Mauritius",
    title: "Events in Mauritius",
    subtitle: "What's on - concerts, parties, and special nights across the island",
    sectionTitle: "What's happening in Mauritius",
    interactive: {
      detailsTitle: "Event Details",
      venue: "Venue:",
      lineup: "Line-up",
      ticketsTitle: "Tickets & access",
      exclusive: "Exclusive event",
      partnerFallback: "see ticketing partner.",
      tickets: "Tickets:",
      phone: "Tel:",
      getTickets: "Get tickets",
      noEventsTitle: "No events on this day",
      noEventsText: "Try another date, or pick an orange day on the calendar when an event is listed.",
      selectDate: "Select a date in the calendar below to see event details here.",
      calendarTitle: "Events Calendar",
      calendarHint: "Orange days have a scheduled event. Tap any date to see details above.",
      posterAltPrefix: "Poster:",
    },
    moreTitle: "More to explore",
    moreText: "Pair your night out with beaches, activities, and island culture.",
  },
  fr: {
    metadata: { title: "Événements à Maurice | Concerts, soirées et agenda", description: "Découvrez les événements à venir à Maurice : soirées, concerts et dates culturelles." },
    ogTitle: "Événements à Maurice | Agenda",
    ogDescription: "Événements, affiches et dates à venir à Maurice.",
    ogAlt: "Événements à Maurice - vie nocturne et soirées",
    heroAlt: "Événements à Maurice",
    title: "Événements à Maurice",
    subtitle: "L'agenda : concerts, soirées et nuits spéciales partout sur l'île",
    sectionTitle: "Ce qui se passe à Maurice",
    interactive: {
      detailsTitle: "Détails de l'événement",
      venue: "Lieu :",
      lineup: "Programme",
      ticketsTitle: "Billets et accès",
      exclusive: "Événement exclusif",
      partnerFallback: "voir le partenaire billetterie.",
      tickets: "Billets :",
      phone: "Tél. :",
      getTickets: "Obtenir des billets",
      noEventsTitle: "Aucun événement ce jour-là",
      noEventsText: "Essayez une autre date ou choisissez un jour orange dans le calendrier lorsqu'un événement est listé.",
      selectDate: "Sélectionnez une date dans le calendrier ci-dessous pour voir les détails ici.",
      calendarTitle: "Calendrier des événements",
      calendarHint: "Les jours orange ont un événement prévu. Touchez une date pour voir les détails ci-dessus.",
      posterAltPrefix: "Affiche :",
    },
    moreTitle: "Plus à explorer",
    moreText: "Associez votre soirée aux plages, activités et à la culture de l'île.",
  },
  de: {
    metadata: { title: "Events auf Mauritius | Konzerte, Partys & Termine", description: "Entdecken Sie kommende Events auf Mauritius: Partys, Konzerte und Kulturtermine." },
    ogTitle: "Events auf Mauritius | Was los ist",
    ogDescription: "Kommende Events, Poster und Termine auf Mauritius.",
    ogAlt: "Events auf Mauritius - Nachtleben und Partys",
    heroAlt: "Events auf Mauritius",
    title: "Events auf Mauritius",
    subtitle: "Was los ist: Konzerte, Partys und besondere Nächte auf der Insel",
    sectionTitle: "Was auf Mauritius passiert",
    interactive: {
      detailsTitle: "Eventdetails",
      venue: "Ort:",
      lineup: "Line-up",
      ticketsTitle: "Tickets und Zugang",
      exclusive: "Exklusives Event",
      partnerFallback: "siehe Ticketpartner.",
      tickets: "Tickets:",
      phone: "Tel.:",
      getTickets: "Tickets buchen",
      noEventsTitle: "Keine Events an diesem Tag",
      noEventsText: "Wählen Sie ein anderes Datum oder einen orange markierten Tag im Kalender, wenn ein Event eingetragen ist.",
      selectDate: "Wählen Sie unten im Kalender ein Datum aus, um hier Eventdetails zu sehen.",
      calendarTitle: "Eventkalender",
      calendarHint: "Orange Tage haben ein geplantes Event. Tippen Sie auf ein Datum, um oben Details zu sehen.",
      posterAltPrefix: "Poster:",
    },
    moreTitle: "Mehr entdecken",
    moreText: "Kombinieren Sie den Abend mit Stränden, Aktivitäten und Inselkultur.",
  },
  it: {
    metadata: { title: "Eventi a Mauritius | Concerti, feste e cosa fare", description: "Scopri gli eventi in arrivo a Mauritius: feste, concerti e date culturali." },
    ogTitle: "Eventi a Mauritius | Cosa succede",
    ogDescription: "Eventi, poster e date in arrivo a Mauritius.",
    ogAlt: "Eventi a Mauritius - nightlife e feste",
    heroAlt: "Eventi a Mauritius",
    title: "Eventi a Mauritius",
    subtitle: "Cosa succede: concerti, feste e serate speciali in tutta l'isola",
    sectionTitle: "Cosa succede a Mauritius",
    interactive: {
      detailsTitle: "Dettagli evento",
      venue: "Luogo:",
      lineup: "Line-up",
      ticketsTitle: "Biglietti e accesso",
      exclusive: "Evento esclusivo",
      partnerFallback: "vedi partner di biglietteria.",
      tickets: "Biglietti:",
      phone: "Tel:",
      getTickets: "Acquista biglietti",
      noEventsTitle: "Nessun evento in questo giorno",
      noEventsText: "Prova un'altra data o scegli un giorno arancione nel calendario quando c'è un evento.",
      selectDate: "Seleziona una data nel calendario qui sotto per vedere i dettagli dell'evento.",
      calendarTitle: "Calendario eventi",
      calendarHint: "I giorni arancioni hanno un evento programmato. Tocca una data per vedere i dettagli sopra.",
      posterAltPrefix: "Poster:",
    },
    moreTitle: "Altro da esplorare",
    moreText: "Abbina la tua serata a spiagge, attività e cultura dell'isola.",
  },
  es: {
    metadata: { title: "Eventos en Mauricio | Conciertos, fiestas y agenda", description: "Descubre próximos eventos en Mauricio: fiestas, conciertos y fechas culturales." },
    ogTitle: "Eventos en Mauricio | Qué hacer",
    ogDescription: "Próximos eventos, carteles y fechas en Mauricio.",
    ogAlt: "Eventos en Mauricio - vida nocturna y fiestas",
    heroAlt: "Eventos en Mauricio",
    title: "Eventos en Mauricio",
    subtitle: "Qué pasa: conciertos, fiestas y noches especiales por toda la isla",
    sectionTitle: "Qué está pasando en Mauricio",
    interactive: {
      detailsTitle: "Detalles del evento",
      venue: "Lugar:",
      lineup: "Programa",
      ticketsTitle: "Entradas y acceso",
      exclusive: "Evento exclusivo",
      partnerFallback: "consulta el socio de entradas.",
      tickets: "Entradas:",
      phone: "Tel:",
      getTickets: "Comprar entradas",
      noEventsTitle: "No hay eventos este día",
      noEventsText: "Prueba otra fecha o elige un día naranja en el calendario cuando haya un evento listado.",
      selectDate: "Selecciona una fecha en el calendario de abajo para ver los detalles del evento aquí.",
      calendarTitle: "Calendario de eventos",
      calendarHint: "Los días naranjas tienen un evento programado. Toca una fecha para ver los detalles arriba.",
      posterAltPrefix: "Cartel:",
    },
    moreTitle: "Más para explorar",
    moreText: "Combina tu noche con playas, actividades y cultura de la isla.",
  },
  ru: {
    metadata: { title: "События на Маврикии | Концерты, вечеринки и афиша", description: "Смотрите ближайшие события на Маврикии: вечеринки, концерты и культурные даты." },
    ogTitle: "События на Маврикии | Афиша",
    ogDescription: "Ближайшие события, постеры и даты на Маврикии.",
    ogAlt: "События на Маврикии - ночная жизнь и вечеринки",
    heroAlt: "События на Маврикии",
    title: "События на Маврикии",
    subtitle: "Афиша: концерты, вечеринки и особые ночи по всему острову",
    sectionTitle: "Что происходит на Маврикии",
    interactive: {
      detailsTitle: "Детали события",
      venue: "Место:",
      lineup: "Программа",
      ticketsTitle: "Билеты и доступ",
      exclusive: "Эксклюзивное событие",
      partnerFallback: "см. билетного партнера.",
      tickets: "Билеты:",
      phone: "Тел.:",
      getTickets: "Купить билеты",
      noEventsTitle: "В этот день событий нет",
      noEventsText: "Попробуйте другую дату или выберите оранжевый день в календаре, когда событие есть в списке.",
      selectDate: "Выберите дату в календаре ниже, чтобы увидеть детали события здесь.",
      calendarTitle: "Календарь событий",
      calendarHint: "Оранжевые дни означают запланированное событие. Нажмите дату, чтобы увидеть детали выше.",
      posterAltPrefix: "Постер:",
    },
    moreTitle: "Еще для изучения",
    moreText: "Совместите вечер с пляжами, активностями и культурой острова.",
  },
};

const privacyEnglish = {
  metadata: { title: "Privacy Policy", description: "Privacy Policy for Mauritius Explored - Learn how we collect, use, and protect your personal information." },
  heroAlt: "Privacy Policy",
  title: "Privacy Policy",
  effective: "Effective Date:",
  date: "25 August 2020",
  notice: "Planet Explored Ltd periodically reviews this Policy and may modify portions at any time. Amendments will be notified by posting an updated version on this website.",
  commitmentTitle: "Our Commitment to Privacy",
  commitment: "Planet Explored Ltd respects your privacy rights and is transparent about data collection, usage and sharing. We comply with applicable privacy and data protection laws, including GDPR where relevant.",
  sections: [
    { title: "About Us", paragraphs: ["Planet Explored Ltd is a Mauritian company registered under BRN C16136979.", "We operate online under the brand name Mauritius Explored. References to Mauritius Explored, we or us mean Planet Explored Ltd.", "Our mission is to provide sustainable travel ideas, useful destination information and customizable itineraries."] },
    { title: "Website Visitors", paragraphs: ["Like most website operators, we collect non-personal information such as browser type, language preference, referring site, and the date and time of visits.", "We use this information to understand how visitors use the website and improve performance."] },
    { title: "Personal Information", paragraphs: ["We collect personal information only when needed to provide a requested product or service, process communication, manage transactions or improve support.", "Visitors can refuse to provide personal information, but some website features may not work without it."] },
    { title: "Protection of Personal Information", paragraphs: ["We disclose personal information only to employees, contractors and affiliated organizations that need it to provide services on our behalf and agree not to disclose it.", "We do not rent or sell personal information and take reasonable measures to protect it from unauthorized access, use, alteration or destruction."] },
    { title: "Cookies", paragraphs: ["Cookies are small files stored by your browser. We use them to identify visitors, understand website usage and remember access preferences.", "You can refuse cookies in your browser, but some features may not function properly."] },
    { title: "Third-Party Cookies and Analytics", paragraphs: ["Third-party services such as social plugins, embedded media, advertising partners and analytics providers may set their own cookies.", "Google Analytics may collect anonymous usage data to help us monitor and improve website performance."] },
    { title: "Advertisements", paragraphs: ["Advertising partners may deliver ads and set cookies to understand ad performance and show relevant advertising."] },
    { title: "Business Transfers", paragraphs: ["If Mauritius Explored or its assets are acquired, user information may be transferred as part of that transaction."] },
    { title: "Privacy Policy Changes", paragraphs: ["We may update this Privacy Policy from time to time. Continued use of the site after changes means you accept the updated policy."] },
  ],
  termsTitle: "Terms of Service",
  termsIntro: ["These terms govern use of mauritiusexplored.com and the content, services and products available through the website.", "By using the website, you agree to these terms. The website is available only to individuals who are at least 13 years old."],
  terms: [
    { title: "Your Account", text: "You are responsible for maintaining the security of your account and for all activity under it." },
    { title: "Payment & Renewal", text: "Subscription payments are charged in advance and renew automatically unless cancelled before the end of the period." },
    { title: "Intellectual Property", text: "Mauritius Explored trademarks, logos and content remain the property of Mauritius Explored." },
    { title: "Termination", text: "Mauritius Explored may terminate access at any time, with or without notice." },
    { title: "Disclaimer of Warranties", text: "The website is provided as is, without warranties of any kind." },
    { title: "Governing Law", text: "This agreement is governed by the laws of Mauritius and disputes are settled in Mauritius courts." },
  ],
  ctaTitle: "Have Questions?",
  ctaText: "If you have any questions about this Privacy Policy, please don't hesitate to contact us.",
  cta: "Contact Us",
};

const privacyTranslations: Record<InfoLocale, typeof privacyEnglish> = {
  en: privacyEnglish,
  fr: { ...privacyEnglish, metadata: { title: "Politique de confidentialité", description: "Politique de confidentialité de Mauritius Explored : collecte, utilisation et protection des données personnelles." }, heroAlt: "Politique de confidentialité", title: "Politique de confidentialité", effective: "Date d'entrée en vigueur :", notice: "Planet Explored Ltd révise périodiquement cette politique et peut la modifier. Toute mise à jour sera publiée sur ce site.", commitmentTitle: "Notre engagement envers la confidentialité", commitment: "Planet Explored Ltd respecte vos droits à la vie privée et explique clairement la collecte, l'utilisation et le partage des données.", termsTitle: "Conditions d'utilisation", ctaTitle: "Des questions ?", ctaText: "Si vous avez des questions sur cette politique de confidentialité, contactez-nous.", cta: "Nous contacter" },
  de: { ...privacyEnglish, metadata: { title: "Datenschutzrichtlinie", description: "Datenschutzrichtlinie von Mauritius Explored: wie wir personenbezogene Daten erfassen, nutzen und schützen." }, heroAlt: "Datenschutzrichtlinie", title: "Datenschutzrichtlinie", effective: "Gültig ab:", notice: "Planet Explored Ltd überprüft diese Richtlinie regelmäßig und kann sie ändern. Aktualisierungen werden auf dieser Website veröffentlicht.", commitmentTitle: "Unser Datenschutzversprechen", commitment: "Planet Explored Ltd respektiert Ihre Datenschutzrechte und informiert transparent über Erfassung, Nutzung und Weitergabe von Daten.", termsTitle: "Nutzungsbedingungen", ctaTitle: "Haben Sie Fragen?", ctaText: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns gern.", cta: "Kontakt" },
  it: { ...privacyEnglish, metadata: { title: "Privacy Policy", description: "Privacy Policy di Mauritius Explored: come raccogliamo, usiamo e proteggiamo i dati personali." }, heroAlt: "Privacy Policy", title: "Privacy Policy", effective: "Data di validità:", notice: "Planet Explored Ltd rivede periodicamente questa policy e può modificarla. Gli aggiornamenti saranno pubblicati su questo sito.", commitmentTitle: "Il nostro impegno per la privacy", commitment: "Planet Explored Ltd rispetta i tuoi diritti alla privacy e comunica in modo trasparente raccolta, uso e condivisione dei dati.", termsTitle: "Termini di servizio", ctaTitle: "Hai domande?", ctaText: "Se hai domande su questa Privacy Policy, contattaci.", cta: "Contattaci" },
  es: { ...privacyEnglish, metadata: { title: "Política de privacidad", description: "Política de privacidad de Mauritius Explored: cómo recopilamos, usamos y protegemos tus datos." }, heroAlt: "Política de privacidad", title: "Política de privacidad", effective: "Fecha de entrada en vigor:", notice: "Planet Explored Ltd revisa periódicamente esta política y puede modificarla. Las actualizaciones se publicarán en este sitio.", commitmentTitle: "Nuestro compromiso con la privacidad", commitment: "Planet Explored Ltd respeta tus derechos de privacidad y explica con transparencia la recopilación, uso y compartición de datos.", termsTitle: "Términos de servicio", ctaTitle: "¿Tienes preguntas?", ctaText: "Si tienes preguntas sobre esta política de privacidad, contáctanos.", cta: "Contactar" },
  ru: { ...privacyEnglish, metadata: { title: "Политика конфиденциальности", description: "Политика конфиденциальности Mauritius Explored: как мы собираем, используем и защищаем персональные данные." }, heroAlt: "Политика конфиденциальности", title: "Политика конфиденциальности", effective: "Дата вступления в силу:", notice: "Planet Explored Ltd периодически пересматривает эту политику и может вносить изменения. Обновления публикуются на сайте.", commitmentTitle: "Наше обязательство по конфиденциальности", commitment: "Planet Explored Ltd уважает ваши права на приватность и прозрачно объясняет сбор, использование и передачу данных.", termsTitle: "Условия использования", ctaTitle: "Есть вопросы?", ctaText: "Если у вас есть вопросы об этой политике конфиденциальности, свяжитесь с нами.", cta: "Связаться" },
};

Object.assign(privacyTranslations.fr, {
  sections: [
    { title: "À propos de nous", paragraphs: ["Planet Explored Ltd est une société mauricienne enregistrée sous le numéro BRN C16136979.", "Nous opérons en ligne sous la marque Mauritius Explored. Les références à Mauritius Explored, nous ou notre société désignent Planet Explored Ltd.", "Notre mission est de proposer des idées de voyage durable, des informations utiles et des itinéraires personnalisables."] },
    { title: "Visiteurs du site", paragraphs: ["Comme la plupart des sites, nous collectons des informations non personnelles telles que le type de navigateur, la langue, le site référent et la date des visites.", "Ces données nous aident à comprendre l'utilisation du site et à améliorer ses performances."] },
    { title: "Informations personnelles", paragraphs: ["Nous collectons des informations personnelles uniquement lorsque cela est nécessaire pour fournir un service, traiter une communication, gérer une transaction ou améliorer l'assistance.", "Vous pouvez refuser de fournir ces informations, mais certaines fonctions du site peuvent ne pas fonctionner."] },
    { title: "Protection des données personnelles", paragraphs: ["Nous partageons les données uniquement avec les personnes ou organisations qui en ont besoin pour fournir nos services et qui s'engagent à ne pas les divulguer.", "Nous ne louons ni ne vendons les données personnelles et prenons des mesures raisonnables pour les protéger."] },
    { title: "Cookies", paragraphs: ["Les cookies sont de petits fichiers stockés par votre navigateur. Nous les utilisons pour comprendre l'usage du site et mémoriser certaines préférences.", "Vous pouvez les refuser dans votre navigateur, mais certaines fonctions peuvent être limitées."] },
    { title: "Cookies tiers et analytics", paragraphs: ["Des services tiers comme les médias intégrés, plugins sociaux, publicités ou outils d'analyse peuvent placer leurs propres cookies.", "Google Analytics peut collecter des données anonymes d'utilisation pour améliorer le site."] },
    { title: "Publicités", paragraphs: ["Des partenaires publicitaires peuvent diffuser des annonces et utiliser des cookies pour mesurer les performances et afficher des publicités pertinentes."] },
    { title: "Transferts d'entreprise", paragraphs: ["Si Mauritius Explored ou ses actifs sont acquis, les informations utilisateur peuvent être transférées dans le cadre de cette opération."] },
    { title: "Modifications de la politique", paragraphs: ["Cette politique peut être mise à jour. L'utilisation continue du site après modification vaut acceptation de la nouvelle version."] },
  ],
  termsIntro: ["Ces conditions régissent l'utilisation de mauritiusexplored.com et de ses contenus, services et produits.", "En utilisant le site, vous acceptez ces conditions. Le site est réservé aux personnes âgées d'au moins 13 ans."],
  terms: [
    { title: "Votre compte", text: "Vous êtes responsable de la sécurité de votre compte et de toute activité associée." },
    { title: "Paiement et renouvellement", text: "Les abonnements sont payés à l'avance et renouvelés automatiquement sauf annulation." },
    { title: "Propriété intellectuelle", text: "Les marques, logos et contenus restent la propriété de Mauritius Explored." },
    { title: "Résiliation", text: "Mauritius Explored peut mettre fin à l'accès à tout moment." },
    { title: "Absence de garanties", text: "Le site est fourni tel quel, sans garantie." },
    { title: "Droit applicable", text: "Cet accord est régi par le droit mauricien et les litiges relèvent des tribunaux mauriciens." },
  ],
});

Object.assign(privacyTranslations.de, {
  sections: [
    { title: "Über uns", paragraphs: ["Planet Explored Ltd ist ein mauritisches Unternehmen, registriert unter BRN C16136979.", "Wir arbeiten online unter der Marke Mauritius Explored. Verweise auf Mauritius Explored oder wir meinen Planet Explored Ltd.", "Unsere Mission ist es, nachhaltige Reiseideen, nützliche Informationen und anpassbare Routen bereitzustellen."] },
    { title: "Website-Besucher", paragraphs: ["Wie die meisten Websites erfassen wir nicht-personenbezogene Informationen wie Browsertyp, Sprache, verweisende Website und Besuchszeit.", "Diese Daten helfen uns, die Nutzung der Website zu verstehen und die Leistung zu verbessern."] },
    { title: "Personenbezogene Daten", paragraphs: ["Wir erfassen personenbezogene Daten nur, wenn sie für einen Service, Kommunikation, Transaktionen oder Support nötig sind.", "Sie können die Angabe verweigern, doch einige Website-Funktionen funktionieren dann möglicherweise nicht."] },
    { title: "Schutz personenbezogener Daten", paragraphs: ["Wir teilen Daten nur mit Personen oder Organisationen, die sie zur Leistungserbringung benötigen und Vertraulichkeit zusagen.", "Wir vermieten oder verkaufen keine personenbezogenen Daten und schützen sie mit angemessenen Maßnahmen."] },
    { title: "Cookies", paragraphs: ["Cookies sind kleine Dateien im Browser. Wir nutzen sie, um die Website-Nutzung zu verstehen und Präferenzen zu speichern.", "Sie können Cookies im Browser ablehnen, einige Funktionen können dann eingeschränkt sein."] },
    { title: "Drittanbieter-Cookies und Analytics", paragraphs: ["Drittanbieter wie Social Plugins, eingebettete Medien, Werbung oder Analyse-Tools können eigene Cookies setzen.", "Google Analytics kann anonyme Nutzungsdaten erfassen, um die Website zu verbessern."] },
    { title: "Werbung", paragraphs: ["Werbepartner können Anzeigen ausliefern und Cookies nutzen, um Leistung und Relevanz zu messen."] },
    { title: "Unternehmensübertragungen", paragraphs: ["Wenn Mauritius Explored oder seine Vermögenswerte übernommen werden, können Nutzerdaten Teil dieser Transaktion sein."] },
    { title: "Änderungen der Richtlinie", paragraphs: ["Wir können diese Richtlinie aktualisieren. Die weitere Nutzung der Website nach Änderungen gilt als Zustimmung."] },
  ],
  termsIntro: ["Diese Bedingungen regeln die Nutzung von mauritiusexplored.com sowie der dort verfügbaren Inhalte, Dienste und Produkte.", "Mit der Nutzung der Website akzeptieren Sie diese Bedingungen. Die Website ist nur für Personen ab 13 Jahren bestimmt."],
  terms: [
    { title: "Ihr Konto", text: "Sie sind für die Sicherheit Ihres Kontos und alle Aktivitäten darunter verantwortlich." },
    { title: "Zahlung und Verlängerung", text: "Abonnements werden im Voraus berechnet und automatisch verlängert, sofern sie nicht gekündigt werden." },
    { title: "Geistiges Eigentum", text: "Marken, Logos und Inhalte bleiben Eigentum von Mauritius Explored." },
    { title: "Beendigung", text: "Mauritius Explored kann den Zugang jederzeit beenden." },
    { title: "Haftungsausschluss", text: "Die Website wird ohne Garantien bereitgestellt." },
    { title: "Anwendbares Recht", text: "Diese Vereinbarung unterliegt dem Recht von Mauritius; Streitigkeiten werden vor mauritischen Gerichten behandelt." },
  ],
});

Object.assign(privacyTranslations.it, {
  sections: [
    { title: "Chi siamo", paragraphs: ["Planet Explored Ltd è una società mauriziana registrata con numero BRN C16136979.", "Operiamo online con il marchio Mauritius Explored. I riferimenti a Mauritius Explored o a noi indicano Planet Explored Ltd.", "La nostra missione è offrire idee di viaggio sostenibile, informazioni utili e itinerari personalizzabili."] },
    { title: "Visitatori del sito", paragraphs: ["Come molti siti, raccogliamo informazioni non personali come browser, lingua, sito di provenienza e data delle visite.", "Usiamo questi dati per capire l'utilizzo del sito e migliorarne le prestazioni."] },
    { title: "Informazioni personali", paragraphs: ["Raccogliamo dati personali solo quando servono per fornire un servizio, gestire comunicazioni, transazioni o supporto.", "Puoi rifiutare di fornire dati personali, ma alcune funzioni potrebbero non funzionare."] },
    { title: "Protezione dei dati personali", paragraphs: ["Condividiamo dati solo con soggetti che ne hanno bisogno per fornire servizi per nostro conto e che accettano di non divulgarli.", "Non affittiamo né vendiamo dati personali e adottiamo misure ragionevoli per proteggerli."] },
    { title: "Cookie", paragraphs: ["I cookie sono piccoli file salvati dal browser. Li usiamo per comprendere l'uso del sito e ricordare preferenze.", "Puoi rifiutarli dal browser, ma alcune funzioni potrebbero essere limitate."] },
    { title: "Cookie di terze parti e analytics", paragraphs: ["Servizi terzi come social plugin, media incorporati, pubblicità e analytics possono impostare cookie propri.", "Google Analytics può raccogliere dati anonimi per migliorare il sito."] },
    { title: "Pubblicità", paragraphs: ["Partner pubblicitari possono mostrare annunci e usare cookie per misurare performance e rilevanza."] },
    { title: "Trasferimenti aziendali", paragraphs: ["Se Mauritius Explored o i suoi asset fossero acquisiti, le informazioni utente potrebbero essere trasferite."] },
    { title: "Modifiche alla policy", paragraphs: ["Possiamo aggiornare questa policy. L'uso continuato del sito dopo le modifiche indica accettazione."] },
  ],
  termsIntro: ["Questi termini regolano l'uso di mauritiusexplored.com e dei relativi contenuti, servizi e prodotti.", "Usando il sito accetti questi termini. Il sito è disponibile solo per persone di almeno 13 anni."],
  terms: [
    { title: "Il tuo account", text: "Sei responsabile della sicurezza del tuo account e di tutte le attività svolte tramite esso." },
    { title: "Pagamento e rinnovo", text: "Gli abbonamenti sono addebitati in anticipo e si rinnovano automaticamente salvo cancellazione prima della fine del periodo." },
    { title: "Proprietà intellettuale", text: "Marchi, loghi e contenuti di Mauritius Explored restano di proprietà di Mauritius Explored." },
    { title: "Chiusura", text: "Mauritius Explored può interrompere l'accesso in qualsiasi momento, con o senza preavviso." },
    { title: "Esclusione di garanzie", text: "Il sito è fornito così com'è, senza garanzie di alcun tipo." },
    { title: "Legge applicabile", text: "Questo accordo è regolato dalle leggi di Mauritius e le controversie sono trattate dai tribunali mauriziani." },
  ],
});

Object.assign(privacyTranslations.es, {
  sections: [
    { title: "Sobre nosotros", paragraphs: ["Planet Explored Ltd es una empresa mauriciana registrada con número BRN C16136979.", "Operamos online bajo la marca Mauritius Explored. Las referencias a Mauritius Explored o a nosotros significan Planet Explored Ltd.", "Nuestra misión es ofrecer ideas de viaje sostenible, información útil e itinerarios personalizables."] },
    { title: "Visitantes del sitio", paragraphs: ["Como la mayoría de sitios, recopilamos información no personal como navegador, idioma, sitio de referencia y fecha de visita.", "Usamos estos datos para entender el uso del sitio y mejorar su rendimiento."] },
    { title: "Información personal", paragraphs: ["Recopilamos datos personales solo cuando son necesarios para prestar un servicio, gestionar comunicaciones, transacciones o soporte.", "Puedes negarte a facilitar datos, pero algunas funciones pueden no estar disponibles."] },
    { title: "Protección de información personal", paragraphs: ["Compartimos datos solo con quienes los necesitan para prestar servicios en nuestro nombre y aceptan no divulgarlos.", "No alquilamos ni vendemos datos personales y tomamos medidas razonables para protegerlos."] },
    { title: "Cookies", paragraphs: ["Las cookies son pequeños archivos guardados por el navegador. Las usamos para entender el uso del sitio y recordar preferencias.", "Puedes rechazarlas en tu navegador, pero algunas funciones pueden limitarse."] },
    { title: "Cookies de terceros y analítica", paragraphs: ["Servicios externos como plugins sociales, medios incrustados, publicidad o analítica pueden establecer sus propias cookies.", "Google Analytics puede recopilar datos anónimos para mejorar el sitio."] },
    { title: "Publicidad", paragraphs: ["Socios publicitarios pueden mostrar anuncios y usar cookies para medir rendimiento y relevancia."] },
    { title: "Transferencias comerciales", paragraphs: ["Si Mauritius Explored o sus activos fueran adquiridos, la información de usuarios podría transferirse."] },
    { title: "Cambios de política", paragraphs: ["Podemos actualizar esta política. El uso continuado del sitio tras cambios implica aceptación."] },
  ],
  termsIntro: ["Estos términos regulan el uso de mauritiusexplored.com y sus contenidos, servicios y productos.", "Al usar el sitio aceptas estos términos. El sitio solo está disponible para mayores de 13 años."],
  terms: [
    { title: "Tu cuenta", text: "Eres responsable de mantener segura tu cuenta y de toda actividad realizada desde ella." },
    { title: "Pago y renovación", text: "Las suscripciones se cobran por adelantado y se renuevan automáticamente salvo cancelación antes del final del periodo." },
    { title: "Propiedad intelectual", text: "Las marcas, logotipos y contenidos de Mauritius Explored siguen siendo propiedad de Mauritius Explored." },
    { title: "Terminación", text: "Mauritius Explored puede terminar el acceso en cualquier momento, con o sin aviso." },
    { title: "Exclusión de garantías", text: "El sitio se proporciona tal cual, sin garantías de ningún tipo." },
    { title: "Ley aplicable", text: "Este acuerdo se rige por las leyes de Mauricio y las disputas se resuelven en tribunales de Mauricio." },
  ],
});

Object.assign(privacyTranslations.ru, {
  sections: [
    { title: "О нас", paragraphs: ["Planet Explored Ltd - маврикийская компания, зарегистрированная под номером BRN C16136979.", "Мы работаем онлайн под брендом Mauritius Explored. Упоминания Mauritius Explored или мы означают Planet Explored Ltd.", "Наша миссия - предлагать устойчивые идеи путешествий, полезную информацию и персональные маршруты."] },
    { title: "Посетители сайта", paragraphs: ["Как большинство сайтов, мы собираем неперсональные данные: тип браузера, язык, сайт-источник и дату визита.", "Эти данные помогают понимать использование сайта и улучшать его работу."] },
    { title: "Персональная информация", paragraphs: ["Мы собираем персональные данные только когда это нужно для услуги, коммуникации, транзакции или поддержки.", "Вы можете отказаться предоставить данные, но некоторые функции сайта могут не работать."] },
    { title: "Защита персональных данных", paragraphs: ["Мы передаем данные только тем, кому они нужны для оказания услуг от нашего имени и кто обязуется их не раскрывать.", "Мы не сдаем и не продаем персональные данные и принимаем разумные меры защиты."] },
    { title: "Cookies", paragraphs: ["Cookies - небольшие файлы в браузере. Мы используем их для анализа сайта и сохранения предпочтений.", "Вы можете отключить cookies в браузере, но часть функций может быть ограничена."] },
    { title: "Сторонние cookies и аналитика", paragraphs: ["Сторонние сервисы, включая социальные плагины, встроенные медиа, рекламу и аналитику, могут устанавливать свои cookies.", "Google Analytics может собирать анонимные данные для улучшения сайта."] },
    { title: "Реклама", paragraphs: ["Рекламные партнеры могут показывать объявления и использовать cookies для оценки эффективности и релевантности."] },
    { title: "Передача бизнеса", paragraphs: ["Если Mauritius Explored или его активы будут приобретены, пользовательская информация может быть передана."] },
    { title: "Изменения политики", paragraphs: ["Мы можем обновлять эту политику. Продолжение использования сайта после изменений означает согласие."] },
  ],
  termsIntro: ["Эти условия регулируют использование mauritiusexplored.com, его контента, сервисов и продуктов.", "Используя сайт, вы соглашаетесь с условиями. Сайт доступен только лицам от 13 лет."],
  terms: [
    { title: "Ваш аккаунт", text: "Вы отвечаете за безопасность своего аккаунта и за всю активность в нем." },
    { title: "Оплата и продление", text: "Подписки оплачиваются заранее и автоматически продлеваются, если не отменены до конца периода." },
    { title: "Интеллектуальная собственность", text: "Товарные знаки, логотипы и контент Mauritius Explored остаются собственностью Mauritius Explored." },
    { title: "Прекращение доступа", text: "Mauritius Explored может прекратить доступ в любое время, с уведомлением или без него." },
    { title: "Отказ от гарантий", text: "Сайт предоставляется как есть, без каких-либо гарантий." },
    { title: "Применимое право", text: "Это соглашение регулируется законами Маврикия, а споры рассматриваются судами Маврикия." },
  ],
});


export const aboutInfo = {
  en: {
    metadata: { title: "About Us", description: "Learn about Planet Explored Ltd and our mission to provide eco-friendly travel experiences in Mauritius." },
    heroAlt: "About Mauritius Explored",
    title: "About Us",
    subtitle: "Your trusted guide to eco-friendly travel in Mauritius since 2011",
    sections: [
      { title: "Planet Explored Ltd", paragraphs: ["Planet Explored Ltd is a fully owned Mauritian company, registered with the Registrar of Companies under the registration number BRN C16136979.", "We operate online under the brand name Mauritius Explored, accessible at mauritiusexplored.com. References to Mauritius Explored, we, or us mean Planet Explored Ltd."] },
      { title: "Our Mission", paragraphs: ["Our mission is to provide eco-friendly travel ideas and itineraries with relevant information on places to visit, activities, and customizable trips."] },
      { title: "Our Story", paragraphs: ["Founded in 2011 as a Facebook project, Mauritius Explored grew into a trusted island travel guide and remains dedicated to high-quality holiday information."] },
      { title: "Strategic Partnership", paragraphs: ["Mauritius Explored is building partnerships with selected local operators across accommodation, transport, tours, activities, restaurants and island experiences.", "The goal is to help travellers plan more easily while giving reliable local businesses better visibility."] },
    ] satisfies AboutSection[],
    stats: ["Facebook Fans", "Instagram Followers", "Instagram Followers"],
    editorialTitle: "Editorial Standards & Corrections",
    editorial: ["Mauritius Explored is created by a Mauritius-based team using local knowledge, operator information, official sources and recent checks where possible.", "We review prices, access notes, timings and route information before publishing major updates.", "If you spot an error or outdated recommendation, contact us and we will review it.", "Some pages include booking or partner links. These may earn a commission at no extra cost to you, but recommendations are written to be useful first."],
    sustainabilityTitle: "Sustainability & Ocean Protection",
    sustainabilityIntro: "At Planet Explored Ltd, we recognize a social and environmental responsibility to respect our island and our culture.",
    sustainabilityText: "We recognize the importance of preserving our natural environment, particularly our oceans, and strive to minimize our ecological footprint.",
    responsibilities: ["Protect the environment - its flora, fauna and landscapes", "Respect cultures, traditions, religions and heritage", "Benefit local communities economically and socially", "Conserve natural resources", "Minimize pollution, plastic use and waste", "Inform travellers about sustainable tourism", "Encourage responsible activities", "Work with suppliers and partners on sustainable goals"],
    initiativesTitle: "Our Initiatives",
    initiatives: ["Our initiatives include partnering with local organizations dedicated to ocean conservation, participating in beach clean-ups, and promoting eco-friendly practices.", "Through our itineraries and travel experiences, we aim to raise awareness about pollution, climate change and the need to protect Mauritius' natural resources."],
    ctaTitle: "Join Us in Our Mission",
    ctaText: "Together, we can ensure that future generations enjoy the beauty of Mauritius' beaches and marine environments.",
    start: "Start Exploring",
    privacy: "Privacy Policy",
  },
};

type AboutInfo = typeof aboutInfo.en;
const mutableAboutInfo = aboutInfo as Record<InfoLocale, AboutInfo>;

const aboutTranslations: Record<Exclude<InfoLocale, "en">, Partial<AboutInfo>> = {
  fr: { metadata: { title: "À propos", description: "Découvrez Planet Explored Ltd et notre mission pour un voyage plus responsable à Maurice." }, heroAlt: "À propos de Mauritius Explored", title: "À propos", subtitle: "Votre guide de confiance pour voyager à Maurice depuis 2011", sections: [{ title: "Planet Explored Ltd", paragraphs: ["Planet Explored Ltd est une société mauricienne enregistrée auprès du Registrar of Companies sous le numéro BRN C16136979.", "Nous opérons en ligne sous la marque Mauritius Explored, accessible sur mauritiusexplored.com."] }, { title: "Notre mission", paragraphs: ["Notre mission est de proposer des idées de voyage responsables, des itinéraires et des informations utiles sur les lieux, activités et séjours personnalisables."] }, { title: "Notre histoire", paragraphs: ["Né en 2011 comme projet Facebook, Mauritius Explored est devenu un guide de voyage de confiance consacré à des informations de vacances de qualité."] }, { title: "Partenariats stratégiques", paragraphs: ["Mauritius Explored construit des partenariats avec des opérateurs locaux sélectionnés dans l'hébergement, le transport, les tours, activités, restaurants et expériences.", "L'objectif est d'aider les voyageurs à planifier plus facilement tout en donnant plus de visibilité aux entreprises locales fiables."] }], stats: ["Fans Facebook", "Abonnés Instagram", "Abonnés Instagram"], editorialTitle: "Standards éditoriaux et corrections", sustainabilityTitle: "Durabilité et protection de l'océan", initiativesTitle: "Nos initiatives", ctaTitle: "Rejoignez notre mission", start: "Commencer à explorer", privacy: "Politique de confidentialité" },
  de: { metadata: { title: "Über uns", description: "Erfahren Sie mehr über Planet Explored Ltd und unsere Mission für nachhaltiges Reisen auf Mauritius." }, heroAlt: "Über Mauritius Explored", title: "Über uns", subtitle: "Ihr vertrauenswürdiger Guide für umweltbewusstes Reisen auf Mauritius seit 2011", sections: [{ title: "Planet Explored Ltd", paragraphs: ["Planet Explored Ltd ist ein mauritisches Unternehmen, registriert unter BRN C16136979.", "Online arbeiten wir unter der Marke Mauritius Explored auf mauritiusexplored.com."] }, { title: "Unsere Mission", paragraphs: ["Wir bieten umweltfreundliche Reiseideen, Routenvorschläge und hilfreiche Informationen zu Orten, Aktivitäten und anpassbaren Reisen."] }, { title: "Unsere Geschichte", paragraphs: ["2011 als Facebook-Projekt gegründet, wurde Mauritius Explored zu einem vertrauenswürdigen Insel-Guide."] }, { title: "Strategische Partnerschaften", paragraphs: ["Mauritius Explored baut Partnerschaften mit ausgewählten lokalen Anbietern auf.", "So planen Reisende leichter und verlässliche lokale Unternehmen erhalten mehr Sichtbarkeit."] }], stats: ["Facebook-Fans", "Instagram-Follower", "Instagram-Follower"], editorialTitle: "Redaktionelle Standards und Korrekturen", sustainabilityTitle: "Nachhaltigkeit und Meeresschutz", initiativesTitle: "Unsere Initiativen", ctaTitle: "Machen Sie mit", start: "Entdecken starten", privacy: "Datenschutzrichtlinie" },
  it: { metadata: { title: "Chi siamo", description: "Scopri Planet Explored Ltd e la nostra missione per viaggi responsabili a Mauritius." }, heroAlt: "Chi siamo Mauritius Explored", title: "Chi siamo", subtitle: "La tua guida fidata per viaggiare a Mauritius dal 2011", sections: [{ title: "Planet Explored Ltd", paragraphs: ["Planet Explored Ltd è una società mauriziana registrata con numero BRN C16136979.", "Operiamo online con il marchio Mauritius Explored, su mauritiusexplored.com."] }, { title: "La nostra missione", paragraphs: ["Offriamo idee di viaggio eco-friendly, itinerari e informazioni utili su luoghi, attività e viaggi personalizzabili."] }, { title: "La nostra storia", paragraphs: ["Nato nel 2011 come progetto Facebook, Mauritius Explored è diventato una guida affidabile dell'isola."] }, { title: "Partnership strategiche", paragraphs: ["Mauritius Explored costruisce partnership con operatori locali selezionati.", "Aiutiamo i viaggiatori a pianificare meglio e diamo più visibilità alle imprese locali affidabili."] }], stats: ["Fan Facebook", "Follower Instagram", "Follower Instagram"], editorialTitle: "Standard editoriali e correzioni", sustainabilityTitle: "Sostenibilità e protezione dell'oceano", initiativesTitle: "Le nostre iniziative", ctaTitle: "Unisciti alla nostra missione", start: "Inizia a esplorare", privacy: "Privacy Policy" },
  es: { metadata: { title: "Sobre nosotros", description: "Conoce Planet Explored Ltd y nuestra misión de ofrecer viajes responsables en Mauricio." }, heroAlt: "Sobre Mauritius Explored", title: "Sobre nosotros", subtitle: "Tu guía de confianza para viajar por Mauricio desde 2011", sections: [{ title: "Planet Explored Ltd", paragraphs: ["Planet Explored Ltd es una empresa mauriciana registrada con número BRN C16136979.", "Operamos online bajo la marca Mauritius Explored en mauritiusexplored.com."] }, { title: "Nuestra misión", paragraphs: ["Ofrecemos ideas de viaje eco-friendly, itinerarios e información útil sobre lugares, actividades y viajes personalizables."] }, { title: "Nuestra historia", paragraphs: ["Fundado en 2011 como proyecto de Facebook, Mauritius Explored se convirtió en una guía de confianza de la isla."] }, { title: "Alianzas estratégicas", paragraphs: ["Mauritius Explored crea alianzas con operadores locales seleccionados.", "Ayudamos a viajeros a planificar mejor y damos más visibilidad a negocios locales fiables."] }], stats: ["Fans de Facebook", "Seguidores de Instagram", "Seguidores de Instagram"], editorialTitle: "Estándares editoriales y correcciones", sustainabilityTitle: "Sostenibilidad y protección del océano", initiativesTitle: "Nuestras iniciativas", ctaTitle: "Únete a nuestra misión", start: "Empezar a explorar", privacy: "Política de privacidad" },
  ru: { metadata: { title: "О нас", description: "Узнайте о Planet Explored Ltd и нашей миссии ответственных путешествий по Маврикию." }, heroAlt: "О Mauritius Explored", title: "О нас", subtitle: "Ваш надежный гид по Маврикию с 2011 года", sections: [{ title: "Planet Explored Ltd", paragraphs: ["Planet Explored Ltd - маврикийская компания, зарегистрированная под номером BRN C16136979.", "Мы работаем онлайн под брендом Mauritius Explored на mauritiusexplored.com."] }, { title: "Наша миссия", paragraphs: ["Мы предлагаем экологичные идеи путешествий, маршруты и полезную информацию о местах, активностях и персональных поездках."] }, { title: "Наша история", paragraphs: ["Проект начался в Facebook в 2011 году и вырос в надежный гид по острову."] }, { title: "Стратегические партнерства", paragraphs: ["Mauritius Explored развивает партнерства с выбранными местными операторами.", "Мы помогаем путешественникам планировать проще, а надежным местным компаниям получать больше видимости."] }], stats: ["Фаны Facebook", "Подписчики Instagram", "Подписчики Instagram"], editorialTitle: "Редакционные стандарты и исправления", sustainabilityTitle: "Устойчивость и защита океана", initiativesTitle: "Наши инициативы", ctaTitle: "Присоединяйтесь к нашей миссии", start: "Начать исследовать", privacy: "Политика конфиденциальности" },
};

for (const locale of Object.keys(aboutTranslations) as Exclude<InfoLocale, "en">[]) {
  mutableAboutInfo[locale] = { ...aboutInfo.en, ...aboutTranslations[locale] };
}

Object.assign(mutableAboutInfo.fr, {
  editorial: ["Mauritius Explored est créé par une équipe basée à Maurice, à partir de connaissances locales, d'informations d'opérateurs, de sources officielles et de vérifications récentes lorsque possible.", "Nous révisons les prix, accès, horaires et informations d'itinéraire avant les grandes mises à jour.", "Si vous voyez une erreur ou une recommandation dépassée, contactez-nous et nous la vérifierons.", "Certaines pages incluent des liens de réservation ou partenaires. Ils peuvent générer une commission sans coût supplémentaire, mais nos recommandations restent d'abord utiles."],
  sustainabilityIntro: "Chez Planet Explored Ltd, nous reconnaissons notre responsabilité sociale et environnementale envers notre île et notre culture.",
  sustainabilityText: "Nous voulons préserver l'environnement naturel, en particulier l'océan, et réduire notre empreinte écologique.",
  responsibilities: ["Protéger l'environnement, sa flore, sa faune et ses paysages", "Respecter les cultures, traditions, religions et patrimoines", "Soutenir les communautés locales", "Préserver les ressources naturelles", "Réduire pollution, plastique et déchets", "Informer les voyageurs sur le tourisme durable", "Encourager des activités responsables", "Travailler avec partenaires et fournisseurs sur des objectifs durables"],
  initiatives: ["Nos initiatives incluent des partenariats avec des organisations locales de conservation, des nettoyages de plages et la promotion de pratiques éco-responsables.", "À travers nos itinéraires, nous sensibilisons à la pollution, au changement climatique et à la protection des ressources naturelles de Maurice."],
  ctaText: "Ensemble, nous pouvons préserver la beauté des plages et milieux marins de Maurice pour les générations futures.",
});
Object.assign(mutableAboutInfo.de, {
  editorial: ["Mauritius Explored wird von einem Team auf Mauritius erstellt, mit lokalem Wissen, Anbieterinformationen, offiziellen Quellen und aktuellen Prüfungen, wo möglich.", "Wir prüfen Preise, Zugänge, Zeiten und Routeninformationen vor größeren Updates.", "Wenn Sie einen Fehler oder veraltete Empfehlung sehen, kontaktieren Sie uns.", "Einige Seiten enthalten Buchungs- oder Partnerlinks. Diese können eine Provision bringen, ohne Mehrkosten für Sie; Empfehlungen sollen zuerst nützlich sein."],
  sustainabilityIntro: "Planet Explored Ltd erkennt seine soziale und ökologische Verantwortung gegenüber Insel und Kultur an.",
  sustainabilityText: "Wir wollen die natürliche Umwelt, besonders den Ozean, schützen und unseren ökologischen Fußabdruck reduzieren.",
  responsibilities: ["Umwelt, Flora, Fauna und Landschaft schützen", "Kulturen, Traditionen, Religionen und Erbe respektieren", "Lokale Gemeinschaften unterstützen", "Natürliche Ressourcen bewahren", "Verschmutzung, Plastik und Abfall reduzieren", "Reisende über nachhaltigen Tourismus informieren", "Verantwortliche Aktivitäten fördern", "Mit Partnern an nachhaltigen Zielen arbeiten"],
  initiatives: ["Unsere Initiativen umfassen Partnerschaften mit lokalen Naturschutzorganisationen, Strandreinigungen und die Förderung umweltfreundlicher Praktiken.", "Mit unseren Routen und Reiseerlebnissen schaffen wir Bewusstsein für Verschmutzung, Klimawandel und den Schutz der Naturressourcen von Mauritius."],
  ctaText: "Gemeinsam können wir die Schönheit der Strände und Meeresräume von Mauritius für kommende Generationen bewahren.",
});
Object.assign(mutableAboutInfo.it, {
  editorial: ["Mauritius Explored è creato da un team basato a Mauritius, usando conoscenza locale, informazioni degli operatori, fonti ufficiali e controlli recenti quando possibile.", "Verifichiamo prezzi, accessi, orari e informazioni di percorso prima degli aggiornamenti importanti.", "Se trovi un errore o un consiglio non aggiornato, contattaci.", "Alcune pagine includono link di prenotazione o partner: possono generare commissioni senza costi extra, ma i consigli restano prima di tutto utili."],
  sustainabilityIntro: "Planet Explored Ltd riconosce la propria responsabilità sociale e ambientale verso l'isola e la cultura locale.",
  sustainabilityText: "Vogliamo preservare l'ambiente naturale, in particolare l'oceano, e ridurre la nostra impronta ecologica.",
  responsibilities: ["Proteggere ambiente, flora, fauna e paesaggi", "Rispettare culture, tradizioni, religioni e patrimonio", "Sostenere le comunità locali", "Conservare le risorse naturali", "Ridurre inquinamento, plastica e rifiuti", "Informare i viaggiatori sul turismo sostenibile", "Promuovere attività responsabili", "Collaborare con partner su obiettivi sostenibili"],
  initiatives: ["Le nostre iniziative includono collaborazioni con organizzazioni locali, pulizie delle spiagge e pratiche eco-friendly.", "Attraverso itinerari ed esperienze sensibilizziamo su inquinamento, cambiamento climatico e protezione delle risorse naturali di Mauritius."],
  ctaText: "Insieme possiamo preservare la bellezza delle spiagge e degli ambienti marini di Mauritius per le generazioni future.",
});
Object.assign(mutableAboutInfo.es, {
  editorial: ["Mauritius Explored está creado por un equipo basado en Mauricio, usando conocimiento local, información de operadores, fuentes oficiales y revisiones recientes cuando es posible.", "Revisamos precios, accesos, horarios e información de rutas antes de grandes actualizaciones.", "Si ves un error o una recomendación desactualizada, contáctanos.", "Algunas páginas incluyen enlaces de reserva o partners. Pueden generar comisión sin coste extra, pero las recomendaciones se escriben para ser útiles primero."],
  sustainabilityIntro: "Planet Explored Ltd reconoce su responsabilidad social y ambiental hacia la isla y su cultura.",
  sustainabilityText: "Queremos preservar el entorno natural, especialmente el océano, y reducir nuestra huella ecológica.",
  responsibilities: ["Proteger el entorno, flora, fauna y paisajes", "Respetar culturas, tradiciones, religiones y patrimonio", "Apoyar a comunidades locales", "Conservar recursos naturales", "Reducir contaminación, plástico y residuos", "Informar sobre turismo sostenible", "Fomentar actividades responsables", "Trabajar con partners en objetivos sostenibles"],
  initiatives: ["Nuestras iniciativas incluyen alianzas con organizaciones locales, limpiezas de playa y prácticas eco-friendly.", "Con itinerarios y experiencias buscamos concienciar sobre contaminación, cambio climático y protección de los recursos naturales de Mauricio."],
  ctaText: "Juntos podemos preservar la belleza de las playas y entornos marinos de Mauricio para futuras generaciones.",
});
Object.assign(mutableAboutInfo.ru, {
  editorial: ["Mauritius Explored создается командой на Маврикии с использованием местных знаний, информации операторов, официальных источников и свежих проверок, где возможно.", "Мы проверяем цены, доступ, время работы и маршруты перед крупными обновлениями.", "Если вы заметили ошибку или устаревшую рекомендацию, свяжитесь с нами.", "Некоторые страницы содержат партнерские или бронировочные ссылки. Они могут приносить комиссию без доплаты для вас, но рекомендации пишутся прежде всего для пользы."],
  sustainabilityIntro: "Planet Explored Ltd признает социальную и экологическую ответственность перед островом и культурой.",
  sustainabilityText: "Мы стремимся сохранять природную среду, особенно океан, и снижать экологический след.",
  responsibilities: ["Защищать природу, флору, фауну и ландшафты", "Уважать культуры, традиции, религии и наследие", "Поддерживать местные сообщества", "Сохранять природные ресурсы", "Снижать загрязнение, пластик и отходы", "Информировать о устойчивом туризме", "Поощрять ответственные активности", "Работать с партнерами над устойчивыми целями"],
  initiatives: ["Наши инициативы включают партнерства с местными организациями, уборки пляжей и продвижение экологичных практик.", "Через маршруты и travel-опыт мы повышаем осведомленность о загрязнении, климате и защите природных ресурсов Маврикия."],
  ctaText: "Вместе мы можем сохранить красоту пляжей и морской среды Маврикия для будущих поколений.",
});

export function getContactInfo(locale: string) {
  return contactInfo[localeOf(locale)];
}

export function getMediaKitInfo(locale: string) {
  return mediaKitInfo[localeOf(locale)];
}

export function getEventsInfo(locale: string) {
  return eventsInfo[localeOf(locale)];
}

export function getAboutInfo(locale: string) {
  return mutableAboutInfo[localeOf(locale)];
}

export function getPrivacyInfo(locale: string) {
  return privacyTranslations[localeOf(locale)];
}
