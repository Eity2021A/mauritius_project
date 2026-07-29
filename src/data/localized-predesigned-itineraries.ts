import type { PreDesignedItinerary } from "@/data/predesigned-itineraries";
import type { ItineraryLocale } from "@/data/itinerary-translations";

type ItineraryCopy = Pick<PreDesignedItinerary, "title" | "subtitle" | "introParagraph" | "info">;

const regionLabels: Record<Exclude<ItineraryLocale, "en">, Record<string, string>> = {
  fr: { North: "Nord", South: "Sud", "South West": "Sud-Ouest", "South East": "Sud-Est", East: "Est", West: "Ouest", "Port Louis": "Port Louis" },
  de: { North: "Norden", South: "Süden", "South West": "Südwesten", "South East": "Südosten", East: "Osten", West: "Westen", "Port Louis": "Port Louis" },
  it: { North: "Nord", South: "Sud", "South West": "Sud-Ovest", "South East": "Sud-Est", East: "Est", West: "Ovest", "Port Louis": "Port Louis" },
  es: { North: "Norte", South: "Sur", "South West": "Suroeste", "South East": "Sureste", East: "Este", West: "Oeste", "Port Louis": "Port Louis" },
  ru: { North: "Север", South: "Юг", "South West": "Юго-запад", "South East": "Юго-восток", East: "Восток", West: "Запад", "Port Louis": "Порт-Луи" },
};

const copy: Record<Exclude<ItineraryLocale, "en">, Record<string, ItineraryCopy>> = {
  fr: {
    "road-trip-north": {
      title: "Roadtrip Nord",
      subtitle: "Jardins, plages et Cap Malheureux",
      introParagraph: [
        "Le nord de Maurice réunit jardins tropicaux, patrimoine colonial et quelques-unes des plus belles plages de l'île en une journée facile.",
        "Partez tôt, mélangez culture le matin et lagons l'après-midi, puis terminez à l'église rouge de Cap Malheureux.",
      ],
      info: ["Visitez Port-Louis si vous venez de l'ouest ou du sud.", "L'entrée du jardin de Pamplemousses est payante.", "Déjeunez au restaurant du château.", "Commencez vers 9 h et terminez avant 18 h."],
    },
    "road-trip-south-coastal": {
      title: "Roadtrip Sud",
      subtitle: "Côte sud panoramique",
      introParagraph: ["La côte sud mêle falaises, cascades, villages historiques et lagons clairs.", "Roulez d'ouest en est à un rythme doux, avec du temps pour Blue Bay ou Mahébourg."],
      info: ["Prévoyez une journée complète.", "Gardez du temps pour les arrêts photo.", "Blue Bay est idéal par mer calme."],
    },
    "road-trip-south-west-south-east": {
      title: "Roadtrip du Sud-Ouest au Sud-Est",
      subtitle: "Le Morne, Chamarel et côte sud",
      introParagraph: ["Cette route relie les paysages les plus spectaculaires de Maurice, du Morne à Blue Bay.", "Elle convient aux voyageurs qui veulent montagne, cascades, littoral sauvage et villages côtiers en une seule boucle."],
      info: ["Commencez tôt au Morne.", "Réservez Chamarel si vous combinez cascade et Terres de Sept Couleurs.", "Gardez la baignade pour Blue Bay si la mer est calme."],
    },
    "road-trip-south-east": {
      title: "Roadtrip Sud-Est",
      subtitle: "Plages et monuments du sud-est",
      introParagraph: ["Le sud-est est plus calme, avec des plages sauvages, Mahébourg, Blue Bay et des sites historiques.", "C'est une route douce pour découvrir une Maurice plus locale."],
      info: ["Le lundi est bon pour le marché de Mahébourg.", "Prenez de l'eau et de la crème solaire.", "Évitez les routes isolées de nuit."],
    },
    "must-see-waterfalls-of-mauritius": {
      title: "Cascades incontournables de Maurice",
      subtitle: "Aventure et exploration",
      introParagraph: ["Maurice cache des cascades faciles d'accès et des bassins plus sauvages dans les gorges et forêts.", "Cette route réunit les plus beaux points d'eau pour une journée nature."],
      info: ["Portez de bonnes chaussures.", "Évitez les sentiers après de fortes pluies.", "Prenez un guide pour les chemins non balisés."],
    },
    "1-day-in-port-louis": {
      title: "1 jour à Port-Louis",
      subtitle: "Waterfront, patrimoine et musées",
      introParagraph: ["Port-Louis concentre marchés, musées, histoire et vie de rue en une journée compacte.", "C'est l'itinéraire idéal pour comprendre la capitale à pied."],
      info: ["Commencez tôt au marché central.", "Gardez de la monnaie pour les snacks.", "La marche est plus agréable le matin."],
    },
    "best-instagram-photo-location": {
      title: "Meilleurs spots photo Instagram",
      subtitle: "Jardins, waterfront, nature et vues aériennes",
      introParagraph: ["Ces arrêts rassemblent les décors les plus photogéniques de Maurice.", "Privilégiez la lumière du matin ou de fin d'après-midi pour des couleurs plus douces."],
      info: ["Chargez votre téléphone.", "Respectez les lieux et les habitants.", "Le drone peut être réglementé selon les zones."],
    },
  },
  de: {
    "road-trip-north": { title: "Roadtrip Norden", subtitle: "Gärten, Strände & Cap Malheureux", introParagraph: ["Der Norden verbindet Tropengärten, koloniales Erbe und einige der schönsten Strände der Insel.", "Starten Sie früh, planen Sie Kultur am Morgen und Lagunen am Nachmittag."], info: ["Port Louis passt gut, wenn Sie aus Westen oder Süden kommen.", "Für Pamplemousses fällt Eintritt an.", "Mittagessen im Schlossrestaurant ist eine gute Pause.", "Starten Sie gegen 9 Uhr und enden Sie vor 18 Uhr."] },
    "road-trip-south-coastal": { title: "Roadtrip Süden", subtitle: "Malerische Südküste", introParagraph: ["Die Südküste bringt Klippen, Wasserfälle, historische Dörfer und klare Lagunen zusammen.", "Fahren Sie entspannt von West nach Ost und lassen Sie Zeit für Blue Bay oder Mahébourg."], info: ["Planen Sie einen ganzen Tag.", "Nehmen Sie Zeit für Fotostopps.", "Blue Bay ist bei ruhiger See am besten."] },
    "road-trip-south-west-south-east": { title: "Roadtrip Südwesten bis Südosten", subtitle: "Le Morne, Chamarel & Südküste", introParagraph: ["Diese Route verbindet die dramatischsten Landschaften von Le Morne bis Blue Bay.", "Ideal für Berge, Wasserfälle, wilde Küste und Küstendörfer an einem Tag."], info: ["Starten Sie früh bei Le Morne.", "Buchen Sie Chamarel im Voraus.", "Heben Sie das Schwimmen für Blue Bay auf."] },
    "road-trip-south-east": { title: "Roadtrip Südosten", subtitle: "Strände & Wahrzeichen im Südosten", introParagraph: ["Der Südosten ist ruhiger, mit wilden Stränden, Mahébourg, Blue Bay und historischen Orten.", "Eine sanfte Route für ein lokaleres Mauritius."], info: ["Montag ist gut für den Markt in Mahébourg.", "Nehmen Sie Wasser und Sonnenschutz mit.", "Meiden Sie abgelegene Straßen nachts."] },
    "must-see-waterfalls-of-mauritius": { title: "Must-see Wasserfälle auf Mauritius", subtitle: "Abenteuer & Entdecken", introParagraph: ["Mauritius bietet leicht erreichbare Wasserfälle und wildere Becken in Schluchten und Wäldern.", "Diese Route bündelt die schönsten Wasserplätze für einen Naturtag."], info: ["Tragen Sie feste Schuhe.", "Meiden Sie Wege nach starkem Regen.", "Für unmarkierte Pfade lohnt sich ein Guide."] },
    "1-day-in-port-louis": { title: "1 Tag in Port Louis", subtitle: "Waterfront, Geschichte & Museen", introParagraph: ["Port Louis bündelt Märkte, Museen, Geschichte und Straßenleben in einem kompakten Tag.", "Ideal, um die Hauptstadt zu Fuß kennenzulernen."], info: ["Beginnen Sie früh am Central Market.", "Kleingeld für Snacks ist hilfreich.", "Zu Fuß ist es morgens angenehmer."] },
    "best-instagram-photo-location": { title: "Beste Instagram-Fotospots", subtitle: "Gärten, Waterfront, Natur & Luftblicke", introParagraph: ["Diese Stopps zeigen die fotogensten Seiten von Mauritius.", "Morgenlicht und später Nachmittag bringen weichere Farben."], info: ["Laden Sie Ihr Telefon.", "Respektieren Sie Orte und Menschen.", "Drohnen können je nach Zone eingeschränkt sein."] },
  },
  it: {
    "road-trip-north": { title: "Roadtrip Nord", subtitle: "Giardini, spiagge e Cap Malheureux", introParagraph: ["Il nord unisce giardini tropicali, patrimonio coloniale e alcune delle spiagge più belle dell'isola.", "Parti presto, combina cultura al mattino e lagune nel pomeriggio."], info: ["Port Louis è comoda se arrivi da ovest o sud.", "Il giardino di Pamplemousses è a pagamento.", "Pranza al ristorante dello château.", "Inizia verso le 9 e finisci prima delle 18."] },
    "road-trip-south-coastal": { title: "Roadtrip Sud", subtitle: "Costa sud panoramica", introParagraph: ["La costa sud mescola scogliere, cascate, villaggi storici e lagune limpide.", "Guida da ovest a est con calma e lascia tempo per Blue Bay o Mahébourg."], info: ["Calcola una giornata intera.", "Tieni tempo per le foto.", "Blue Bay rende meglio con mare calmo."] },
    "road-trip-south-west-south-east": { title: "Roadtrip dal Sud-Ovest al Sud-Est", subtitle: "Le Morne, Chamarel e costa sud", introParagraph: ["Questa rotta collega i paesaggi più spettacolari di Mauritius, da Le Morne a Blue Bay.", "Perfetta per montagne, cascate, costa selvaggia e villaggi in un solo giro."], info: ["Parti presto da Le Morne.", "Prenota Chamarel se fai cascata e Terre dei Sette Colori.", "Lascia il bagno per Blue Bay."] },
    "road-trip-south-east": { title: "Roadtrip Sud-Est", subtitle: "Spiagge e luoghi storici del sud-est", introParagraph: ["Il sud-est è più tranquillo, con spiagge selvagge, Mahébourg, Blue Bay e storia.", "Una rotta facile per vedere una Mauritius più locale."], info: ["Il lunedì è ottimo per il mercato di Mahébourg.", "Porta acqua e crema solare.", "Evita strade isolate di notte."] },
    "must-see-waterfalls-of-mauritius": { title: "Cascate imperdibili di Mauritius", subtitle: "Avventura ed esplorazione", introParagraph: ["Mauritius nasconde cascate accessibili e piscine più selvagge tra gole e foreste.", "Questa rotta riunisce i migliori spot d'acqua per una giornata natura."], info: ["Indossa scarpe adatte.", "Evita i sentieri dopo forti piogge.", "Usa una guida per percorsi non segnati."] },
    "1-day-in-port-louis": { title: "1 giorno a Port Louis", subtitle: "Waterfront, patrimonio e musei", introParagraph: ["Port Louis concentra mercati, musei, storia e vita di strada in una giornata compatta.", "Ideale per capire la capitale a piedi."], info: ["Inizia presto al Central Market.", "Porta contanti piccoli per gli snack.", "Camminare è meglio al mattino."] },
    "best-instagram-photo-location": { title: "Migliori spot fotografici Instagram", subtitle: "Giardini, waterfront, natura e viste aeree", introParagraph: ["Queste tappe raccolgono gli scenari più fotogenici di Mauritius.", "Mattina e tardo pomeriggio danno colori più morbidi."], info: ["Carica il telefono.", "Rispetta luoghi e persone.", "Il drone può essere limitato in alcune zone."] },
  },
  es: {
    "road-trip-north": { title: "Roadtrip Norte", subtitle: "Jardines, playas y Cap Malheureux", introParagraph: ["El norte combina jardines tropicales, herencia colonial y algunas de las mejores playas de la isla.", "Sal temprano, mezcla cultura por la mañana y lagunas por la tarde."], info: ["Port Louis encaja si vienes del oeste o del sur.", "Pamplemousses tiene entrada de pago.", "Almuerza en el restaurante del château.", "Empieza sobre las 9 y termina antes de las 18."] },
    "road-trip-south-coastal": { title: "Roadtrip Sur", subtitle: "Costa sur panorámica", introParagraph: ["La costa sur une acantilados, cascadas, pueblos históricos y lagunas claras.", "Conduce de oeste a este con calma y deja tiempo para Blue Bay o Mahébourg."], info: ["Reserva un día completo.", "Deja tiempo para fotos.", "Blue Bay es mejor con mar tranquilo."] },
    "road-trip-south-west-south-east": { title: "Roadtrip del Suroeste al Sureste", subtitle: "Le Morne, Chamarel y costa sur", introParagraph: ["Esta ruta conecta los paisajes más espectaculares de Mauricio, de Le Morne a Blue Bay.", "Perfecta para montaña, cascadas, costa salvaje y pueblos costeros."], info: ["Empieza temprano en Le Morne.", "Reserva Chamarel si visitas cascada y Siete Colores.", "Deja el baño para Blue Bay."] },
    "road-trip-south-east": { title: "Roadtrip Sureste", subtitle: "Playas y lugares del sureste", introParagraph: ["El sureste es más tranquilo, con playas salvajes, Mahébourg, Blue Bay e historia.", "Una ruta suave para ver una Mauricio más local."], info: ["El lunes es bueno para el mercado de Mahébourg.", "Lleva agua y protector solar.", "Evita carreteras aisladas de noche."] },
    "must-see-waterfalls-of-mauritius": { title: "Cascadas imprescindibles de Mauricio", subtitle: "Aventura y exploración", introParagraph: ["Mauricio esconde cascadas fáciles y pozas más salvajes entre gargantas y bosques.", "Esta ruta reúne los mejores lugares de agua para un día de naturaleza."], info: ["Usa buen calzado.", "Evita senderos tras lluvias fuertes.", "Contrata guía para rutas sin señalizar."] },
    "1-day-in-port-louis": { title: "1 día en Port Louis", subtitle: "Waterfront, patrimonio y museos", introParagraph: ["Port Louis reúne mercados, museos, historia y vida callejera en un día compacto.", "Ideal para entender la capital caminando."], info: ["Empieza temprano en el Mercado Central.", "Lleva efectivo pequeño para snacks.", "Caminar es mejor por la mañana."] },
    "best-instagram-photo-location": { title: "Mejores spots de foto para Instagram", subtitle: "Jardines, waterfront, naturaleza y vistas aéreas", introParagraph: ["Estas paradas reúnen los escenarios más fotogénicos de Mauricio.", "La mañana y el final de la tarde dan colores más suaves."], info: ["Carga el teléfono.", "Respeta lugares y personas.", "El dron puede estar limitado por zona."] },
  },
  ru: {
    "road-trip-north": { title: "Roadtrip Север", subtitle: "Сады, пляжи и Cap Malheureux", introParagraph: ["Север Маврикия объединяет тропические сады, колониальное наследие и лучшие пляжи острова.", "Начните рано: культура утром, лагуны днем и красная церковь Cap Malheureux в финале."], info: ["Port Louis удобно добавить, если вы едете с запада или юга.", "Вход в сад Pamplemousses платный.", "Обед в ресторане шато - хорошая пауза.", "Начинайте около 9:00 и заканчивайте до 18:00."] },
    "road-trip-south-coastal": { title: "Roadtrip Юг", subtitle: "Живописное южное побережье", introParagraph: ["Южное побережье сочетает скалы, водопады, исторические деревни и прозрачные лагуны.", "Едьте спокойно с запада на восток и оставьте время для Blue Bay или Mahébourg."], info: ["Планируйте полный день.", "Оставьте время на фото.", "Blue Bay лучше при спокойном море."] },
    "road-trip-south-west-south-east": { title: "Roadtrip с юго-запада на юго-восток", subtitle: "Le Morne, Chamarel и южное побережье", introParagraph: ["Этот маршрут соединяет самые драматичные пейзажи Маврикия от Le Morne до Blue Bay.", "Подходит для гор, водопадов, дикого берега и прибрежных деревень за один день."], info: ["Начните рано у Le Morne.", "Бронируйте Chamarel заранее.", "Купание оставьте для Blue Bay."] },
    "road-trip-south-east": { title: "Roadtrip Юго-восток", subtitle: "Пляжи и достопримечательности юго-востока", introParagraph: ["Юго-восток спокойнее: дикие пляжи, Mahébourg, Blue Bay и исторические места.", "Легкий маршрут, чтобы увидеть более локальный Маврикий."], info: ["Понедельник хорош для рынка Mahébourg.", "Возьмите воду и солнцезащитный крем.", "Избегайте удаленных дорог ночью."] },
    "must-see-waterfalls-of-mauritius": { title: "Главные водопады Маврикия", subtitle: "Приключения и исследование", introParagraph: ["На Маврикии есть доступные водопады и более дикие бассейны среди ущелий и лесов.", "Этот маршрут собирает лучшие водные места для дня на природе."], info: ["Наденьте удобную обувь.", "Не ходите по тропам после сильного дождя.", "Для немаркированных маршрутов лучше взять гида."] },
    "1-day-in-port-louis": { title: "1 день в Port Louis", subtitle: "Waterfront, наследие и музеи", introParagraph: ["Port Louis объединяет рынки, музеи, историю и уличную жизнь в компактный день.", "Идеально, чтобы понять столицу пешком."], info: ["Начните рано с Central Market.", "Возьмите мелкие наличные для перекусов.", "Гулять удобнее утром."] },
    "best-instagram-photo-location": { title: "Лучшие Instagram-фотоспоты", subtitle: "Сады, waterfront, природа и виды с воздуха", introParagraph: ["Эти остановки показывают самые фотогеничные стороны Маврикия.", "Утром и ближе к вечеру свет мягче и цвета лучше."], info: ["Зарядите телефон.", "Уважайте места и людей.", "Дрон может быть ограничен в отдельных зонах."] },
  },
};

export function localizePreDesignedItinerary(
  itinerary: PreDesignedItinerary,
  locale: string
): PreDesignedItinerary {
  if (locale === "en") return itinerary;
  const safeLocale = locale as Exclude<ItineraryLocale, "en">;
  const localized = copy[safeLocale]?.[itinerary.id];
  const labels = regionLabels[safeLocale];

  return {
    ...itinerary,
    ...localized,
    stops: itinerary.stops.map((stop) => ({
      ...stop,
      regionLabel: stop.regionLabel ? labels?.[stop.regionLabel] ?? stop.regionLabel : stop.regionLabel,
    })),
  };
}

export function localizePreDesignedItineraries(
  itineraries: PreDesignedItinerary[],
  locale: string
): PreDesignedItinerary[] {
  return itineraries.map((itinerary) => localizePreDesignedItinerary(itinerary, locale));
}
