import type { InfoLocale } from "./main-info-translations";
import { infoLocales } from "./main-info-translations";

export type FAQEntry = {
  question: string;
  paragraphs: string[];
  bullets?: string[];
};

const faqBase = {
  en: {
    heroAlt: "FAQ about Mauritius",
    title: "Frequently Asked Questions",
    introBefore: "Here are the most common questions about visiting Mauritius. If you don't find your answer below, feel free to",
    introLink: "contact us",
    introAfter: ".",
    ctaTitle: "Still have questions?",
    ctaText: "We're here to help you plan your perfect Mauritius adventure.",
    ctaButton: "Get In Touch",
    faqs: [
      { question: "What is the best time to come to Mauritius?", paragraphs: ["The best all-round months are April, May, September and October: warm, bright and usually less humid.", "Summer runs from November to April and is hotter and more humid, with cyclone risk from January to March.", "Winter from May to August is comfortable on the coast but cooler and windier, especially in the east, south and highlands."] },
      { question: "What is the weather like?", paragraphs: ["Summer is sunny, hot and humid, often around 28-30°C in the day with warm nights and short tropical showers.", "April-May and September-October are warm shoulder months with less humidity.", "Winter is usually 20-25°C on the coast, cooler in the highlands, and can be windy on the east and south coasts."] },
      { question: "When is the rainy season?", paragraphs: ["Mauritius does not have a classic monsoon season. Rain can happen year-round, but summer brings heavier showers and cyclone risk.", "Winter rain is usually lighter, with drizzle or cloudy periods, especially in the highlands."] },
      { question: "What are the best beaches to visit?", paragraphs: ["For calm lagoon swimming and classic white sand, start with Trou aux Biches, Pereybere, Belle Mare, Flic en Flac, Le Morne and Pointe d'Esny."], bullets: ["Le Morne - South West Coast", "Trou aux Biches - North Coast", "Pereybere - North Coast", "Flic en Flac - West Coast", "Belle Mare - East Coast", "Pointe d'Esny - South East Coast"] },
      { question: "What is the main religion?", paragraphs: ["Mauritius is multi-religious. Hinduism is the largest religion, followed by Christianity and Islam.", "You will see temples, churches, mosques and festivals across the island, including Maha Shivaratree and Diwali."] },
      { question: "Is it safe to travel alone?", paragraphs: ["Yes, Mauritius is generally safe for solo travellers, including women, but normal travel awareness still matters.", "Avoid scams, agree prices before tours or taxis, and keep valuables secure at beaches and markets."] },
      { question: "Where to stay outside hotels?", paragraphs: ["Villas, guesthouses, lodges and small B&Bs are common options outside resorts.", "Nature lodges and quieter stays are increasingly available inland and in coastal villages."] },
      { question: "What are the best hotels?", paragraphs: ["The best hotel depends on your coast, beach style, budget and preferred atmosphere.", "Luxury options cluster around Le Morne, Belle Mare, Grand Gaube, Flic en Flac and the south-west resorts."] },
      { question: "What are the best activities?", paragraphs: ["Top activities include catamaran cruises, dolphin watching, hiking, snorkeling, diving, helicopter flights, zip lines and cultural visits.", "Choose one or two major activities for a one-week trip so the holiday still feels relaxed."] },
      { question: "Should I rent a car or use a taxi or public transport?", paragraphs: ["Rent a car if you want flexibility and plan to explore different coasts.", "Use taxis, private drivers or day tours if you prefer not to drive. Public transport is cheap but slow and less useful at night or along some coast roads."] },
      { question: "Can I use dollars or euros in Mauritius?", paragraphs: ["Most everyday payments are in Mauritian Rupees. Exchange money at banks, exchange offices or ATMs in main towns and resort areas."] },
      { question: "Can I work during my holidays?", paragraphs: ["Tourist visitors are not allowed to work on a tourist visa. For work permits, check the official Mauritian authorities before travelling."] },
    ] satisfies FAQEntry[],
  },
};

const faqTranslations: Record<Exclude<InfoLocale, "en">, typeof faqBase.en> = {
  fr: {
    heroAlt: "FAQ sur Maurice", title: "Questions fréquentes", introBefore: "Voici les questions les plus fréquentes sur un voyage à Maurice. Si vous ne trouvez pas votre réponse, vous pouvez", introLink: "nous contacter", introAfter: ".", ctaTitle: "Encore des questions ?", ctaText: "Nous sommes là pour vous aider à préparer votre aventure à Maurice.", ctaButton: "Nous contacter",
    faqs: [
      { question: "Quelle est la meilleure période pour venir à Maurice ?", paragraphs: ["Les meilleurs mois équilibrés sont avril, mai, septembre et octobre : chauds, lumineux et moins humides.", "L'été va de novembre à avril, avec plus de chaleur, d'humidité et un risque cyclonique de janvier à mars.", "L'hiver, de mai à août, reste agréable sur la côte mais plus frais et venteux à l'est, au sud et dans les hauts plateaux."] },
      { question: "Quel temps fait-il ?", paragraphs: ["L'été est chaud et humide, souvent autour de 28-30°C, avec des nuits chaudes et des averses tropicales.", "Avril-mai et septembre-octobre sont des mois doux avec moins d'humidité.", "L'hiver est souvent à 20-25°C sur la côte, plus frais dans les hauts plateaux et venteux à l'est et au sud."] },
      { question: "Quand est la saison des pluies ?", paragraphs: ["Maurice n'a pas de mousson classique. Il peut pleuvoir toute l'année, mais l'été apporte les averses les plus fortes et le risque cyclonique.", "En hiver, la pluie est généralement plus légère, surtout dans les hauts plateaux."] },
      { question: "Quelles sont les meilleures plages ?", paragraphs: ["Pour les lagons calmes et le sable blanc, commencez par Trou aux Biches, Pereybere, Belle Mare, Flic en Flac, Le Morne et Pointe d'Esny."], bullets: ["Le Morne - Sud-Ouest", "Trou aux Biches - Nord", "Pereybere - Nord", "Flic en Flac - Ouest", "Belle Mare - Est", "Pointe d'Esny - Sud-Est"] },
      { question: "Quelle est la religion principale ?", paragraphs: ["Maurice est multireligieuse. L'hindouisme est la religion la plus représentée, suivie du christianisme et de l'islam.", "On trouve temples, églises, mosquées et fêtes dans toute l'île, dont Maha Shivaratree et Diwali."] },
      { question: "Est-ce sûr de voyager seul ?", paragraphs: ["Oui, Maurice est généralement sûre pour les voyageurs seuls, y compris les femmes, mais la vigilance habituelle reste importante.", "Évitez les arnaques, confirmez les prix à l'avance et gardez vos objets de valeur en sécurité."] },
      { question: "Où loger hors des hôtels ?", paragraphs: ["Villas, maisons d'hôtes, lodges et petits B&B sont des options courantes hors resorts.", "Des lodges nature et séjours plus calmes existent aussi à l'intérieur de l'île et dans les villages côtiers."] },
      { question: "Quels sont les meilleurs hôtels ?", paragraphs: ["Le meilleur hôtel dépend de la côte, du style de plage, du budget et de l'ambiance recherchée.", "Les options luxe se trouvent notamment vers Le Morne, Belle Mare, Grand Gaube, Flic en Flac et le sud-ouest."] },
      { question: "Quelles sont les meilleures activités ?", paragraphs: ["Les activités phares incluent catamaran, dauphins, randonnée, snorkeling, plongée, hélicoptère, tyrolienne et visites culturelles.", "Pour une semaine, choisissez une ou deux grandes activités afin de garder un rythme détendu."] },
      { question: "Louer une voiture, taxi ou bus ?", paragraphs: ["Louez une voiture si vous voulez explorer plusieurs côtes librement.", "Choisissez taxi, chauffeur ou excursion si vous ne voulez pas conduire. Le bus est économique mais lent et moins pratique le soir."] },
      { question: "Puis-je utiliser dollars ou euros ?", paragraphs: ["Les paiements courants se font en roupies mauriciennes. Changez dans les banques, bureaux de change ou distributeurs."] },
      { question: "Puis-je travailler pendant mes vacances ?", paragraphs: ["Les visiteurs touristiques ne peuvent pas travailler avec un visa touristique. Pour un permis de travail, consultez les autorités officielles."] },
    ],
  },
  de: {
    heroAlt: "FAQ über Mauritius", title: "Häufig gestellte Fragen", introBefore: "Hier sind die häufigsten Fragen zu einer Reise nach Mauritius. Wenn Ihre Antwort fehlt, können Sie uns gern", introLink: "kontaktieren", introAfter: ".", ctaTitle: "Noch Fragen?", ctaText: "Wir helfen Ihnen, Ihre perfekte Mauritius-Reise zu planen.", ctaButton: "Kontakt aufnehmen",
    faqs: [
      { question: "Wann ist die beste Reisezeit für Mauritius?", paragraphs: ["Die besten Allround-Monate sind April, Mai, September und Oktober: warm, hell und meist weniger feucht.", "Der Sommer von November bis April ist heißer und feuchter, mit Zyklonrisiko von Januar bis März.", "Der Winter von Mai bis August ist an der Küste angenehm, aber im Osten, Süden und Hochland kühler und windiger."] },
      { question: "Wie ist das Wetter?", paragraphs: ["Der Sommer ist sonnig, heiß und feucht, oft 28-30°C tagsüber mit warmen Nächten und kurzen tropischen Schauern.", "April-Mai und September-Oktober sind warme Übergangsmonate mit weniger Feuchtigkeit.", "Im Winter liegen die Küsten oft bei 20-25°C; das Hochland ist kühler und Ost- und Südküste können windig sein."] },
      { question: "Wann ist Regenzeit?", paragraphs: ["Mauritius hat keine klassische Monsunzeit. Regen ist ganzjährig möglich, aber im Sommer sind Schauer stärker und Zyklone wahrscheinlicher.", "Winterregen ist meist leichter, oft als Nieselregen oder bewölkte Phasen im Hochland."] },
      { question: "Welche Strände sind die besten?", paragraphs: ["Für ruhige Lagunen und weißen Sand starten Sie mit Trou aux Biches, Pereybere, Belle Mare, Flic en Flac, Le Morne und Pointe d'Esny."], bullets: ["Le Morne - Südwestküste", "Trou aux Biches - Nordküste", "Pereybere - Nordküste", "Flic en Flac - Westküste", "Belle Mare - Ostküste", "Pointe d'Esny - Südostküste"] },
      { question: "Was ist die Hauptreligion?", paragraphs: ["Mauritius ist multireligiös. Hinduismus ist am größten, gefolgt von Christentum und Islam.", "Überall gibt es Tempel, Kirchen, Moscheen und Feste wie Maha Shivaratree und Diwali."] },
      { question: "Ist allein reisen sicher?", paragraphs: ["Ja, Mauritius ist allgemein sicher für Alleinreisende, auch für Frauen, normale Vorsicht bleibt aber wichtig.", "Vermeiden Sie Betrug, klären Sie Preise vorher und sichern Sie Wertsachen an Stränden und Märkten."] },
      { question: "Wo kann man außerhalb von Hotels wohnen?", paragraphs: ["Villen, Gästehäuser, Lodges und kleine B&Bs sind übliche Alternativen zu Resorts.", "Natur-Lodges und ruhigere Aufenthalte gibt es zunehmend im Inland und in Küstendörfern."] },
      { question: "Welche Hotels sind am besten?", paragraphs: ["Das beste Hotel hängt von Küste, Strandstil, Budget und gewünschter Atmosphäre ab.", "Luxusoptionen liegen rund um Le Morne, Belle Mare, Grand Gaube, Flic en Flac und den Südwesten."] },
      { question: "Welche Aktivitäten sind am besten?", paragraphs: ["Top-Aktivitäten sind Katamaran, Delfine, Wandern, Schnorcheln, Tauchen, Helikopter, Zipline und Kultur.", "Bei einer Woche reichen ein oder zwei große Aktivitäten, damit die Reise entspannt bleibt."] },
      { question: "Auto mieten, Taxi oder Bus?", paragraphs: ["Mieten Sie ein Auto, wenn Sie flexibel mehrere Küsten erkunden möchten.", "Nutzen Sie Taxi, Fahrer oder Tagestour, wenn Sie nicht selbst fahren möchten. Busse sind günstig, aber langsam und abends weniger praktisch."] },
      { question: "Kann ich Dollar oder Euro verwenden?", paragraphs: ["Alltägliche Zahlungen erfolgen in Mauritius-Rupien. Wechseln Sie Geld in Banken, Wechselstuben oder an Geldautomaten."] },
      { question: "Kann ich im Urlaub arbeiten?", paragraphs: ["Mit einem Touristenvisum dürfen Besucher nicht arbeiten. Für Arbeitsgenehmigungen prüfen Sie die offiziellen mauritischen Behörden."] },
    ],
  },
  it: {
    heroAlt: "FAQ su Mauritius", title: "Domande frequenti", introBefore: "Ecco le domande più comuni su un viaggio a Mauritius. Se non trovi la risposta, puoi", introLink: "contattarci", introAfter: ".", ctaTitle: "Hai ancora domande?", ctaText: "Siamo qui per aiutarti a pianificare la tua avventura a Mauritius.", ctaButton: "Contattaci",
    faqs: [
      { question: "Qual è il periodo migliore per andare a Mauritius?", paragraphs: ["I mesi migliori in generale sono aprile, maggio, settembre e ottobre: caldi, luminosi e di solito meno umidi.", "L'estate va da novembre ad aprile ed è più calda e umida, con rischio cicloni da gennaio a marzo.", "L'inverno da maggio ad agosto è piacevole sulla costa ma più fresco e ventoso a est, sud e negli altopiani."] },
      { question: "Com'è il meteo?", paragraphs: ["L'estate è soleggiata, calda e umida, spesso 28-30°C di giorno, con notti calde e brevi piogge tropicali.", "Aprile-maggio e settembre-ottobre sono mesi caldi di mezza stagione con meno umidità.", "In inverno la costa resta spesso sui 20-25°C; gli altopiani sono più freschi e le coste est e sud più ventose."] },
      { question: "Quando è la stagione delle piogge?", paragraphs: ["Mauritius non ha un monsone classico. Può piovere tutto l'anno, ma in estate gli acquazzoni sono più forti e c'è rischio cicloni.", "In inverno la pioggia è di solito più leggera, spesso negli altopiani."] },
      { question: "Quali sono le migliori spiagge?", paragraphs: ["Per lagune calme e sabbia bianca, inizia da Trou aux Biches, Pereybere, Belle Mare, Flic en Flac, Le Morne e Pointe d'Esny."], bullets: ["Le Morne - Sud-Ovest", "Trou aux Biches - Nord", "Pereybere - Nord", "Flic en Flac - Ovest", "Belle Mare - Est", "Pointe d'Esny - Sud-Est"] },
      { question: "Qual è la religione principale?", paragraphs: ["Mauritius è multireligiosa. L'induismo è la religione più diffusa, seguito da cristianesimo e islam.", "Templi, chiese, moschee e feste come Maha Shivaratree e Diwali sono presenti in tutta l'isola."] },
      { question: "È sicuro viaggiare da soli?", paragraphs: ["Sì, Mauritius è generalmente sicura per chi viaggia da solo, anche per le donne, ma serve normale prudenza.", "Evita truffe, concorda i prezzi prima e tieni al sicuro gli oggetti di valore su spiagge e mercati."] },
      { question: "Dove alloggiare fuori dagli hotel?", paragraphs: ["Ville, guesthouse, lodge e piccoli B&B sono alternative comuni ai resort.", "Lodge nella natura e soggiorni più tranquilli sono sempre più presenti nell'interno e nei villaggi costieri."] },
      { question: "Quali sono i migliori hotel?", paragraphs: ["Il miglior hotel dipende da costa, tipo di spiaggia, budget e atmosfera desiderata.", "Le opzioni di lusso si concentrano intorno a Le Morne, Belle Mare, Grand Gaube, Flic en Flac e nel sud-ovest."] },
      { question: "Quali sono le migliori attività?", paragraphs: ["Le attività migliori includono catamarano, delfini, trekking, snorkeling, immersioni, elicottero, zip line e visite culturali.", "Per una settimana scegli una o due attività principali, così il viaggio resta rilassato."] },
      { question: "Meglio noleggiare auto, taxi o bus?", paragraphs: ["Noleggia un'auto se vuoi flessibilità e vuoi esplorare più coste.", "Taxi, autista o tour giornalieri sono migliori se non vuoi guidare. Il bus è economico ma lento e poco pratico di sera."] },
      { question: "Posso usare dollari o euro?", paragraphs: ["I pagamenti quotidiani sono in rupie mauriziane. Cambia denaro in banca, uffici cambio o bancomat."] },
      { question: "Posso lavorare durante le vacanze?", paragraphs: ["Con un visto turistico non è permesso lavorare. Per permessi di lavoro consulta le autorità mauriziane ufficiali."] },
    ],
  },
  es: {
    heroAlt: "FAQ sobre Mauricio", title: "Preguntas frecuentes", introBefore: "Estas son las preguntas más comunes sobre visitar Mauricio. Si no encuentras tu respuesta, puedes", introLink: "contactarnos", introAfter: ".", ctaTitle: "¿Todavía tienes preguntas?", ctaText: "Estamos aquí para ayudarte a planificar tu aventura perfecta en Mauricio.", ctaButton: "Ponte en contacto",
    faqs: [
      { question: "¿Cuál es la mejor época para ir a Mauricio?", paragraphs: ["Los mejores meses en general son abril, mayo, septiembre y octubre: cálidos, luminosos y normalmente menos húmedos.", "El verano va de noviembre a abril y es más caluroso y húmedo, con riesgo de ciclones de enero a marzo.", "El invierno de mayo a agosto es cómodo en la costa, pero más fresco y ventoso en el este, sur y tierras altas."] },
      { question: "¿Cómo es el clima?", paragraphs: ["El verano es soleado, caluroso y húmedo, a menudo 28-30°C durante el día, con noches cálidas y lluvias tropicales cortas.", "Abril-mayo y septiembre-octubre son meses cálidos con menos humedad.", "En invierno la costa suele estar entre 20-25°C; las tierras altas son más frescas y el este y sur pueden ser ventosos."] },
      { question: "¿Cuándo es la temporada de lluvias?", paragraphs: ["Mauricio no tiene un monzón clásico. Puede llover todo el año, pero el verano trae chubascos más fuertes y riesgo de ciclón.", "La lluvia de invierno suele ser más ligera, especialmente en las tierras altas."] },
      { question: "¿Cuáles son las mejores playas?", paragraphs: ["Para lagunas tranquilas y arena blanca, empieza por Trou aux Biches, Pereybere, Belle Mare, Flic en Flac, Le Morne y Pointe d'Esny."], bullets: ["Le Morne - Suroeste", "Trou aux Biches - Norte", "Pereybere - Norte", "Flic en Flac - Oeste", "Belle Mare - Este", "Pointe d'Esny - Sureste"] },
      { question: "¿Cuál es la religión principal?", paragraphs: ["Mauricio es multirreligioso. El hinduismo es la religión más grande, seguido por cristianismo e islam.", "Verás templos, iglesias, mezquitas y festivales como Maha Shivaratree y Diwali por toda la isla."] },
      { question: "¿Es seguro viajar solo?", paragraphs: ["Sí, Mauricio es generalmente seguro para viajeros solos, incluidas mujeres, pero conviene mantener precauciones normales.", "Evita estafas, acuerda precios antes y cuida tus objetos de valor en playas y mercados."] },
      { question: "¿Dónde alojarse fuera de hoteles?", paragraphs: ["Villas, casas de huéspedes, lodges y pequeños B&B son alternativas comunes a los resorts.", "También hay lodges de naturaleza y estancias tranquilas en el interior y pueblos costeros."] },
      { question: "¿Cuáles son los mejores hoteles?", paragraphs: ["El mejor hotel depende de la costa, estilo de playa, presupuesto y ambiente que buscas.", "Las opciones de lujo se concentran cerca de Le Morne, Belle Mare, Grand Gaube, Flic en Flac y el suroeste."] },
      { question: "¿Cuáles son las mejores actividades?", paragraphs: ["Las mejores actividades incluyen catamarán, delfines, senderismo, snorkel, buceo, helicóptero, tirolina y visitas culturales.", "Para una semana, elige una o dos actividades grandes para mantener un ritmo relajado."] },
      { question: "¿Alquilar coche, taxi o bus?", paragraphs: ["Alquila coche si quieres flexibilidad para explorar varias costas.", "Usa taxi, conductor o excursiones si prefieres no conducir. El bus es barato pero lento y menos útil de noche."] },
      { question: "¿Puedo usar dólares o euros?", paragraphs: ["Los pagos diarios se hacen en rupias mauricianas. Cambia dinero en bancos, casas de cambio o cajeros."] },
      { question: "¿Puedo trabajar durante las vacaciones?", paragraphs: ["No se puede trabajar con visa de turista. Para permisos de trabajo, consulta a las autoridades oficiales de Mauricio."] },
    ],
  },
  ru: {
    heroAlt: "FAQ о Маврикии", title: "Частые вопросы", introBefore: "Здесь собраны самые частые вопросы о поездке на Маврикий. Если вы не нашли ответ, вы можете", introLink: "связаться с нами", introAfter: ".", ctaTitle: "Остались вопросы?", ctaText: "Мы поможем спланировать ваше идеальное путешествие по Маврикию.", ctaButton: "Связаться",
    faqs: [
      { question: "Когда лучше ехать на Маврикий?", paragraphs: ["Лучшие универсальные месяцы - апрель, май, сентябрь и октябрь: тепло, светло и обычно меньше влажности.", "Лето длится с ноября по апрель: жарче и влажнее, с риском циклонов с января по март.", "Зима с мая по август комфортна на побережье, но прохладнее и ветренее на востоке, юге и в высокогорье."] },
      { question: "Какая погода на Маврикии?", paragraphs: ["Лето солнечное, жаркое и влажное, часто 28-30°C днем, с теплыми ночами и короткими тропическими ливнями.", "Апрель-май и сентябрь-октябрь теплые и менее влажные.", "Зимой на побережье обычно 20-25°C; в высокогорье прохладнее, а восток и юг могут быть ветренными."] },
      { question: "Когда сезон дождей?", paragraphs: ["На Маврикии нет классического муссона. Дождь возможен круглый год, но летом ливни сильнее и есть риск циклонов.", "Зимой дождь обычно легче, особенно в высокогорье."] },
      { question: "Какие пляжи лучшие?", paragraphs: ["Для спокойных лагун и белого песка начните с Trou aux Biches, Pereybere, Belle Mare, Flic en Flac, Le Morne и Pointe d'Esny."], bullets: ["Le Morne - юго-запад", "Trou aux Biches - север", "Pereybere - север", "Flic en Flac - запад", "Belle Mare - восток", "Pointe d'Esny - юго-восток"] },
      { question: "Какая главная религия?", paragraphs: ["Маврикий многорелигиозен. Индуизм - крупнейшая религия, далее христианство и ислам.", "По острову есть храмы, церкви, мечети и праздники, включая Maha Shivaratree и Diwali."] },
      { question: "Безопасно ли путешествовать одному?", paragraphs: ["Да, Маврикий в целом безопасен для одиночных путешественников, включая женщин, но обычная осторожность важна.", "Избегайте мошенничества, заранее согласуйте цены и берегите ценные вещи на пляжах и рынках."] },
      { question: "Где жить вне отелей?", paragraphs: ["Виллы, гостевые дома, лоджи и небольшие B&B - популярные альтернативы курортам.", "Тихие природные лоджи и размещения доступны в глубине острова и прибрежных деревнях."] },
      { question: "Какие отели лучшие?", paragraphs: ["Лучший отель зависит от побережья, типа пляжа, бюджета и атмосферы.", "Люксовые варианты часто находятся у Le Morne, Belle Mare, Grand Gaube, Flic en Flac и на юго-западе."] },
      { question: "Какие активности лучшие?", paragraphs: ["Лучшие активности: катамаран, дельфины, походы, сноркелинг, дайвинг, вертолет, зиплайн и культурные визиты.", "Для недели выберите одну-две крупные активности, чтобы отдых оставался спокойным."] },
      { question: "Арендовать авто, брать такси или автобус?", paragraphs: ["Берите авто, если хотите свободу и планируете исследовать разные побережья.", "Такси, водитель или дневные туры удобнее, если вы не хотите водить. Автобус дешевый, но медленный и неудобен вечером."] },
      { question: "Можно ли платить долларами или евро?", paragraphs: ["Обычные платежи идут в маврикийских рупиях. Деньги можно обменять в банках, обменниках или банкоматах."] },
      { question: "Можно ли работать во время отпуска?", paragraphs: ["По туристической визе работать нельзя. Для рабочих разрешений обращайтесь к официальным властям Маврикия."] },
    ],
  },
};

const translatedFaqs: Record<InfoLocale, typeof faqBase.en> = {
  en: faqBase.en,
  ...faqTranslations,
};

export function getFAQInfo(locale: string) {
  const safeLocale = infoLocales.includes(locale as InfoLocale) ? (locale as InfoLocale) : "en";
  return translatedFaqs[safeLocale];
}
