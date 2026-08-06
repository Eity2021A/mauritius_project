import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/image-url";
import Navbar from "@/components/Navbar";
import { getVerandaHotelsListingData } from "@/lib/content";
import type { VerandaHotel } from "@/data/veranda-hotels";
import Footer from "@/components/Footer";
import { FAQJsonLd, HotelCollectionJsonLd, ItemListJsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants";
import { localizeStaticPage, staticPageText } from "@/lib/static-page-localizer";
import { normalizeLocale, type AppLocale } from "@/i18n/routing";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Veranda Hotels Mauritius: All 5 Compared (Prices & Styles)",
  description:
    "Discover all five Veranda hotels in Mauritius, from barefoot family beaches to adults-only romance and west-coast surf-town style.",
  openGraph: {
    title: "Veranda Hotels Mauritius: All 5 Compared",
    description:
      "Discover all five Veranda hotels in Mauritius, from barefoot family beaches to adults-only romance and west-coast surf-town style.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veranda Hotels Mauritius: All 5 Compared",
    description:
      "Discover all five Veranda hotels in Mauritius, from barefoot family beaches to adults-only romance and west-coast surf-town style.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  alternates: { canonical: "/veranda-hotels" },
};

const verandaHotelFaqs = [
  {
    question: "How many Veranda hotels are in Mauritius?",
    answer:
      "The Veranda collection has five Mauritius hotels, covering family beach stays, adults-only retreats, all-inclusive village energy and west-coast surf style.",
  },
  {
    question: "Which Veranda hotel is best for couples?",
    answer:
      "Couples should compare the adults-only and quieter beach options first, then choose by coast, dining style and activity plans.",
  },
  {
    question: "Are Veranda hotels good for families?",
    answer:
      "Yes, selected Veranda hotels suit families with beach access, kids' activities and easy resort facilities. Check each hotel style before booking.",
  },
];

const styleCards = [
  {
    title: "Family & Barefoot",
    description: "Kids' clubs, water sports and easy beach days.",
    icon: "family",
  },
  {
    title: "Adults-Only Romance",
    description: "Couples-only calm, spa time and sunset dinners.",
    icon: "heart",
  },
  {
    title: "Lively All-Inclusive",
    description: "In the heart of the village, with plenty included.",
    icon: "glass",
  },
  {
    title: "Surf & Bohemian",
    description: "Retro-chic surf town, dolphins and glowing sunsets.",
    icon: "palm",
  },
];

const verandaPageHeadings = {
  en: {
    heroKicker: "Authentic Island Living Across Five Mauritian Hotels",
    heroTitle: "Veranda Hotels in Mauritius",
    hotelListTitle: "The five Veranda hotels",
    mapTitle: "Where are the Veranda Hotels?",
    whyKicker: "Why book a Veranda hotel",
    whyTitle: "Made for a real island holiday",
    matchTitle: "Which Veranda is right for you?",
  },
  fr: {
    heroKicker: "Art de vivre insulaire authentique dans cinq hôtels mauriciens",
    heroTitle: "Hôtels Veranda à Maurice",
    hotelListTitle: "Les cinq hôtels Veranda",
    mapTitle: "Où se trouvent les hôtels Veranda ?",
    whyKicker: "Pourquoi réserver un hôtel Veranda",
    whyTitle: "Pensé pour de vraies vacances sur l'île",
    matchTitle: "Quel Veranda est fait pour vous ?",
  },
  de: {
    heroKicker: "Authentisches Inselleben in fünf mauritischen Hotels",
    heroTitle: "Veranda-Hotels auf Mauritius",
    hotelListTitle: "Die fünf Veranda-Hotels",
    mapTitle: "Wo liegen die Veranda-Hotels?",
    whyKicker: "Warum ein Veranda-Hotel buchen",
    whyTitle: "Gemacht für einen echten Inselurlaub",
    matchTitle: "Welches Veranda passt zu Ihnen?",
  },
  it: {
    heroKicker: "Vita autentica dell'isola in cinque hotel mauriziani",
    heroTitle: "Hotel Veranda a Mauritius",
    hotelListTitle: "I cinque hotel Veranda",
    mapTitle: "Dove si trovano gli hotel Veranda?",
    whyKicker: "Perché prenotare un hotel Veranda",
    whyTitle: "Pensato per una vera vacanza sull'isola",
    matchTitle: "Quale Veranda fa per te?",
  },
  es: {
    heroKicker: "Vida isleña auténtica en cinco hoteles mauricianos",
    heroTitle: "Hoteles Veranda en Mauricio",
    hotelListTitle: "Los cinco hoteles Veranda",
    mapTitle: "¿Dónde están los hoteles Veranda?",
    whyKicker: "Por qué reservar un hotel Veranda",
    whyTitle: "Hecho para unas auténticas vacaciones en la isla",
    matchTitle: "¿Qué Veranda es para ti?",
  },
  ru: {
    heroKicker: "Аутентичная островная жизнь в пяти маврикийских отелях",
    heroTitle: "Отели Veranda на Маврикии",
    hotelListTitle: "Пять отелей Veranda",
    mapTitle: "Где находятся отели Veranda?",
    whyKicker: "Почему стоит выбрать отель Veranda",
    whyTitle: "Создано для настоящего островного отдыха",
    matchTitle: "Какой Veranda подойдет вам?",
  },
} as const;

const verandaText: Record<Exclude<AppLocale, "en">, Record<string, string>> = {
  fr: {
    "5": "5",
    "3": "3",
    "3-4+": "3-4+",
    "4+": "4+",
    "/ night": "/ nuit",
    "Adults Only": "Adultes seulement",
    "Adults Only Wing": "Aile adultes seulement",
    "Adults-Only": "Adultes seulement",
    "Adults-Only Romance": "Romance adultes seulement",
    "All Inclusive": "All inclusive",
    "All-inclusive": "All inclusive",
    "A directory of Veranda hotels in Mauritius, including family beach stays, adults-only retreats, and west-coast resorts.": "Un guide des hôtels Veranda à Maurice, entre séjours plage en famille, retraites adultes et resorts de la côte ouest.",
    "A family-friendly resort on a long white-sand beach beside a calm, protected lagoon.": "Un resort familial sur une longue plage de sable blanc au bord d'un lagon calme et protégé.",
    "A laid-back, surf-inspired boutique on a bay famous for dolphins and golden sunsets.": "Une adresse boutique décontractée inspirée du surf, sur une baie connue pour ses dauphins et ses couchers de soleil dorés.",
    "A relaxed barefoot beach hotel with a dedicated adults-only wing, spa and freshwater pools.": "Un hôtel de plage pieds nus avec aile adultes seulement, spa et piscines d'eau douce.",
    "A sociable all-inclusive stay in the middle of Mauritius' best-known coastal town.": "Un séjour all inclusive convivial au cœur de la station balnéaire la plus connue de Maurice.",
    "An adults-only hideaway for slow mornings, spa rituals and romantic lagoon views.": "Une retraite adultes seulement pour des matins lents, des rituels spa et des vues romantiques sur le lagon.",
    "An easy-value east-coast beach stay on one of Mauritius' prettiest lagoon shores.": "Un séjour plage simple et avantageux sur l'un des plus beaux lagons de la côte est.",
    "Beach": "Plage",
    "Bohemian": "Bohème",
    "Boho": "Bohème",
    "Boutique": "Boutique",
    "Choose your style": "Choisissez votre style",
    "Coasts of the island": "Côtes de l'île",
    "Discover ->": "Découvrir ->",
    "Discover Veranda Grand Baie": "Découvrir Veranda Grand Baie",
    "Discover Veranda Palmar Beach": "Découvrir Veranda Palmar Beach",
    "Discover Veranda Paul & Virginie": "Découvrir Veranda Paul & Virginie",
    "Discover Veranda Pointe aux Biches": "Découvrir Veranda Pointe aux Biches",
    "Discover Veranda Tamarin": "Découvrir Veranda Tamarin",
    "East": "Est",
    "East Coast": "Côte est",
    "Explore by region": "Explorer par région",
    "Family": "Famille",
    "Family & Barefoot": "Famille et pieds nus",
    "Character-filled, home-grown hotels that make you feel genuinely Mauritian.": "Des hôtels locaux pleins de caractère qui vous font vraiment sentir mauricien.",
    "Chasing surf, sunsets and west-coast character?": "Envie de surf, de couchers de soleil et d'ambiance côte ouest ?",
    "Couples should compare the adults-only and quieter beach options first, then choose by coast, dining style and activity plans.": "Les couples devraient comparer d'abord les options adultes seulement et les plages plus calmes, puis choisir selon la côte, la restauration et les activités.",
    "Couples-only calm, spa time and sunset dinners.": "Calme réservé aux couples, spa et dîners au coucher du soleil.",
    "Eco-conscious credentials and a lighter-footprint approach across the collection.": "Des engagements écoresponsables et une approche plus légère dans toute la collection.",
    "Feel Mauritian, not just visit": "Vivre Maurice, pas seulement la visiter",
    "Find your match": "Trouvez votre hôtel",
    "Five relaxed, authentic and great-value island hotels, from barefoot family beaches to adults-only romance and laid-back surf-town cool.": "Cinq hôtels insulaires détendus, authentiques et d'un bon rapport qualité-prix, des plages familiales pieds nus à la romance adultes et à l'ambiance surf décontractée.",
    "Five relaxed, great-value island hotels, pick your coast and your style.": "Cinq hôtels détendus et avantageux : choisissez votre côte et votre style.",
    "Green Key": "Green Key",
    "Lively": "Animé",
    "Lively All-Inclusive": "All inclusive animé",
    "Great-value comfort across every star tier, so more of the budget goes to exploring.": "Un bon confort à chaque catégorie, pour garder plus de budget pour explorer.",
    "In the heart of the village, with plenty included.": "Au cœur du village, avec beaucoup d'inclus.",
    "Kids' clubs, water sports and easy beach days.": "Clubs enfants, sports nautiques et journées plage faciles.",
    "Map of Mauritius showing the locations of the five Veranda hotels": "Carte de Maurice indiquant les cinq hôtels Veranda",
    "North": "Nord",
    "North Coast": "Côte nord",
    "Pick your coast and your mood, then open the hotel that feels right for your trip.": "Choisissez votre côte et votre ambiance, puis ouvrez l'hôtel qui correspond à votre voyage.",
    "Planning a honeymoon or a romantic escape?": "Vous préparez une lune de miel ou une escapade romantique ?",
    "Relaxed Family Beach": "Plage familiale détendue",
    "Romance": "Romance",
    "Some hotels sell you Mauritius. Veranda Resorts lets you live it. This home-grown collection of five boutique hotels, part of the Mauritian group Rogers Hospitality, is built around one simple promise: to make you feel Mauritian.": "Certains hôtels vous vendent Maurice. Veranda Resorts vous la fait vivre. Cette collection locale de cinq hôtels boutique, issue du groupe mauricien Rogers Hospitality, repose sur une promesse simple : vous faire sentir mauricien.",
    "South Coast": "Côte sud",
    "Surf": "Surf",
    "Surf & Bohemian": "Surf et bohème",
    "Seven Colours Spa wellness": "Bien-être au spa Seven Colours",
    "Signature Seven Colours spas for rest, renewal and a slower island rhythm.": "Spas Seven Colours pour se reposer, se ressourcer et ralentir au rythme de l'île.",
    "The collection": "La collection",
    "Village Life": "Vie de village",
    "Want nightlife, shopping and all-inclusive convenience?": "Envie de vie nocturne, shopping et confort all inclusive ?",
    "West": "Ouest",
    "West Coast": "Côte ouest",
    "West-coast surf-town style with sunset energy and an easygoing boutique mood.": "Style surf de la côte ouest, énergie du coucher de soleil et ambiance boutique décontractée.",
    "Yes, selected Veranda hotels suit families with beach access, kids' activities and easy resort facilities. Check each hotel style before booking.": "Oui, certains hôtels Veranda conviennent aux familles avec accès plage, activités enfants et services faciles. Vérifiez le style de chaque hôtel avant de réserver.",
    "Whichever you choose, all five share the same Veranda DNA: warm, genuinely Mauritian service, a strong sense of place, eco-conscious Green Key credentials, and the flavours, music and easygoing spirit that make the island so easy to fall for.": "Quel que soit votre choix, les cinq partagent l'ADN Veranda : service chaleureux et mauricien, vraie identité locale, engagement Green Key, saveurs, musique et esprit décontracté de l'île.",
  },
  de: {
    "/ night": "/ Nacht",
    "Adults Only": "Nur Erwachsene",
    "Adults Only Wing": "Adults-only-Flügel",
    "Adults-Only": "Nur Erwachsene",
    "Adults-Only Romance": "Romantik nur für Erwachsene",
    "All Inclusive": "All-inclusive",
    "All-inclusive": "All-inclusive",
    "A directory of Veranda hotels in Mauritius, including family beach stays, adults-only retreats, and west-coast resorts.": "Ein Guide zu Veranda-Hotels auf Mauritius, mit Familien-Strandaufenthalten, Adults-only-Retreats und Westküsten-Resorts.",
    "A family-friendly resort on a long white-sand beach beside a calm, protected lagoon.": "Ein familienfreundliches Resort an einem langen weißen Sandstrand neben einer ruhigen, geschützten Lagune.",
    "A laid-back, surf-inspired boutique on a bay famous for dolphins and golden sunsets.": "Ein entspanntes, surf-inspiriertes Boutiquehotel an einer Bucht, die für Delfine und goldene Sonnenuntergänge bekannt ist.",
    "A relaxed barefoot beach hotel with a dedicated adults-only wing, spa and freshwater pools.": "Ein entspanntes Barfuß-Strandhotel mit eigenem Adults-only-Bereich, Spa und Süßwasserpools.",
    "A sociable all-inclusive stay in the middle of Mauritius' best-known coastal town.": "Ein geselliger All-inclusive-Aufenthalt mitten im bekanntesten Küstenort von Mauritius.",
    "An adults-only hideaway for slow mornings, spa rituals and romantic lagoon views.": "Ein Adults-only-Rückzugsort für langsame Morgen, Spa-Rituale und romantische Lagunenblicke.",
    "An easy-value east-coast beach stay on one of Mauritius' prettiest lagoon shores.": "Ein unkomplizierter Ostküsten-Strandaufenthalt mit gutem Preis-Leistungs-Verhältnis an einer der schönsten Lagunen von Mauritius.",
    "Beach": "Strand",
    "Bohemian": "Bohemian",
    "Boho": "Boho",
    "Boutique": "Boutique",
    "Choose your style": "Wählen Sie Ihren Stil",
    "Coasts of the island": "Küsten der Insel",
    "Discover ->": "Entdecken ->",
    "Discover Veranda Grand Baie": "Veranda Grand Baie entdecken",
    "Discover Veranda Palmar Beach": "Veranda Palmar Beach entdecken",
    "Discover Veranda Paul & Virginie": "Veranda Paul & Virginie entdecken",
    "Discover Veranda Pointe aux Biches": "Veranda Pointe aux Biches entdecken",
    "Discover Veranda Tamarin": "Veranda Tamarin entdecken",
    "East": "Osten",
    "East Coast": "Ostküste",
    "Explore by region": "Nach Region erkunden",
    "Family": "Familie",
    "Family & Barefoot": "Familie und Barfuß",
    "Character-filled, home-grown hotels that make you feel genuinely Mauritian.": "Charaktervolle, lokal gewachsene Hotels, in denen Sie Mauritius wirklich spüren.",
    "Chasing surf, sunsets and west-coast character?": "Suchen Sie Surf, Sonnenuntergänge und Westküsten-Charakter?",
    "Couples should compare the adults-only and quieter beach options first, then choose by coast, dining style and activity plans.": "Paare sollten zuerst die Adults-only- und ruhigeren Strandoptionen vergleichen und dann nach Küste, Gastronomie und Aktivitäten wählen.",
    "Couples-only calm, spa time and sunset dinners.": "Ruhe für Paare, Spa-Zeit und Abendessen zum Sonnenuntergang.",
    "Eco-conscious credentials and a lighter-footprint approach across the collection.": "Umweltbewusste Nachweise und ein leichterer Fußabdruck in der gesamten Kollektion.",
    "Feel Mauritian, not just visit": "Mauritius fühlen, nicht nur besuchen",
    "Find your match": "Finden Sie Ihr Hotel",
    "Five relaxed, authentic and great-value island hotels, from barefoot family beaches to adults-only romance and laid-back surf-town cool.": "Fünf entspannte, authentische Inselhotels mit gutem Preis-Leistungs-Verhältnis, von Barfuß-Familienstränden bis zu Adults-only-Romantik und lässigem Surfort-Flair.",
    "Five relaxed, great-value island hotels, pick your coast and your style.": "Fünf entspannte Inselhotels mit gutem Wert: Wählen Sie Ihre Küste und Ihren Stil.",
    "Green Key": "Green Key",
    "Great-value comfort across every star tier, so more of the budget goes to exploring.": "Guter Komfort in jeder Kategorie, damit mehr Budget fürs Erkunden bleibt.",
    "In the heart of the village, with plenty included.": "Im Herzen des Ortes, mit viel inklusive.",
    "Instead of vast, look-alike complexes, you get intimate, character-filled properties where local flavours, sega rhythms, barefoot ease and the warmth of island hospitality matter far more than marble lobbies.": "Statt riesiger, austauschbarer Anlagen finden Sie intime, charaktervolle Häuser, in denen lokale Aromen, Sega-Rhythmen, Barfuß-Leichtigkeit und mauritische Gastfreundschaft wichtiger sind als Marmorlobbys.",
    "Kids' clubs, water sports and easy beach days.": "Kinderclubs, Wassersport und unkomplizierte Strandtage.",
    "Lively": "Lebhaft",
    "Lively All-Inclusive": "Lebhaftes All-inclusive",
    "Map of Mauritius showing the locations of the five Veranda hotels": "Karte von Mauritius mit den Standorten der fünf Veranda-Hotels",
    "North": "Norden",
    "North Coast": "Nordküste",
    "Pick your coast and your mood, then open the hotel that feels right for your trip.": "Wählen Sie Ihre Küste und Stimmung, dann öffnen Sie das Hotel, das zu Ihrer Reise passt.",
    "Planning a honeymoon or a romantic escape?": "Planen Sie Flitterwochen oder eine romantische Auszeit?",
    "Relaxed Family Beach": "Entspannter Familienstrand",
    "Romance": "Romantik",
    "Some hotels sell you Mauritius. Veranda Resorts lets you live it. This home-grown collection of five boutique hotels, part of the Mauritian group Rogers Hospitality, is built around one simple promise: to make you feel Mauritian.": "Manche Hotels verkaufen Ihnen Mauritius. Veranda Resorts lässt Sie Mauritius erleben. Diese einheimische Kollektion aus fünf Boutiquehotels, Teil der mauritischen Gruppe Rogers Hospitality, folgt einem einfachen Versprechen: Sie sollen sich mauritisch fühlen.",
    "Signature Seven Colours spas for rest, renewal and a slower island rhythm.": "Seven-Colours-Spas für Ruhe, Erneuerung und einen langsameren Inselrhythmus.",
    "South Coast": "Südküste",
    "Surf": "Surf",
    "Surf & Bohemian": "Surf und Bohemian",
    "Seven Colours Spa wellness": "Wellness im Seven Colours Spa",
    "The collection": "Die Kollektion",
    "The five hotels span the whole spice-box of a Mauritian holiday, from relaxed 3-star retreats to polished 4-star-plus resorts, and from the buzzing north to the wild west and the postcard-perfect east.": "Die fünf Hotels decken die ganze Vielfalt eines Mauritius-Urlaubs ab: von entspannten 3-Sterne-Retreats bis zu gepflegten 4-Sterne-plus-Resorts, vom lebhaften Norden bis zum wilden Westen und dem postkartenschönen Osten.",
    "The Veranda collection has five Mauritius hotels, covering family beach stays, adults-only retreats, all-inclusive village energy and west-coast surf style.": "Die Veranda-Kollektion umfasst fünf Hotels auf Mauritius: Familien-Strandaufenthalte, Adults-only-Retreats, All-inclusive-Dorfenergie und Westküsten-Surfstil.",
    "Village Life": "Dorfleben",
    "West": "Westen",
    "West Coast": "Westküste",
    "West-coast surf-town style with sunset energy and an easygoing boutique mood.": "Westküsten-Surfort-Stil mit Sonnenuntergangsenergie und entspannter Boutique-Atmosphäre.",
    "Whichever you choose, all five share the same Veranda DNA: warm, genuinely Mauritian service, a strong sense of place, eco-conscious Green Key credentials, and the flavours, music and easygoing spirit that make the island so easy to fall for.": "Für welches Hotel Sie sich entscheiden: Alle fünf teilen dieselbe Veranda-DNA mit warmem, echt mauritischem Service, starkem Ortsgefühl, umweltbewusster Green-Key-Ausrichtung sowie den Aromen, der Musik und der entspannten Art, die Mauritius so liebenswert machen.",
    "Yes, selected Veranda hotels suit families with beach access, kids' activities and easy resort facilities. Check each hotel style before booking.": "Ja, ausgewählte Veranda-Hotels eignen sich für Familien mit Strandzugang, Kinderaktivitäten und unkomplizierten Resort-Einrichtungen. Prüfen Sie vor der Buchung den Stil jedes Hotels.",
  },
  it: {
    "/ night": "/ notte",
    "Adults Only": "Solo adulti",
    "Adults Only Wing": "Ala solo adulti",
    "Adults-Only": "Solo adulti",
    "Adults-Only Romance": "Romanticismo solo adulti",
    "All Inclusive": "All inclusive",
    "All-inclusive": "All inclusive",
    "A directory of Veranda hotels in Mauritius, including family beach stays, adults-only retreats, and west-coast resorts.": "Una guida agli hotel Veranda a Mauritius, tra soggiorni in spiaggia per famiglie, retreat solo adulti e resort della costa ovest.",
    "A family-friendly resort on a long white-sand beach beside a calm, protected lagoon.": "Un resort adatto alle famiglie su una lunga spiaggia di sabbia bianca accanto a una laguna calma e protetta.",
    "A laid-back, surf-inspired boutique on a bay famous for dolphins and golden sunsets.": "Un boutique hotel rilassato ispirato al surf, su una baia famosa per delfini e tramonti dorati.",
    "A relaxed barefoot beach hotel with a dedicated adults-only wing, spa and freshwater pools.": "Un hotel di spiaggia barefoot con ala solo adulti, spa e piscine d'acqua dolce.",
    "A sociable all-inclusive stay in the middle of Mauritius' best-known coastal town.": "Un soggiorno all inclusive conviviale nel cuore della località costiera più conosciuta di Mauritius.",
    "An adults-only hideaway for slow mornings, spa rituals and romantic lagoon views.": "Un rifugio solo adulti per mattine lente, rituali spa e viste romantiche sulla laguna.",
    "An easy-value east-coast beach stay on one of Mauritius' prettiest lagoon shores.": "Un soggiorno mare semplice e conveniente sulla costa est, lungo una delle lagune più belle di Mauritius.",
    "Beach": "Spiaggia",
    "Bohemian": "Bohemien",
    "Boho": "Boho",
    "Boutique": "Boutique",
    "Choose your style": "Scegli il tuo stile",
    "Coasts of the island": "Coste dell'isola",
    "Discover ->": "Scopri ->",
    "Discover Veranda Grand Baie": "Scopri Veranda Grand Baie",
    "Discover Veranda Palmar Beach": "Scopri Veranda Palmar Beach",
    "Discover Veranda Paul & Virginie": "Scopri Veranda Paul & Virginie",
    "Discover Veranda Pointe aux Biches": "Scopri Veranda Pointe aux Biches",
    "Discover Veranda Tamarin": "Scopri Veranda Tamarin",
    "East": "Est",
    "East Coast": "Costa est",
    "Explore by region": "Esplora per regione",
    "Family": "Famiglia",
    "Family & Barefoot": "Famiglia e barefoot",
    "Character-filled, home-grown hotels that make you feel genuinely Mauritian.": "Hotel locali pieni di carattere che ti fanno sentire davvero mauriziano.",
    "Chasing surf, sunsets and west-coast character?": "Cerchi surf, tramonti e carattere della costa ovest?",
    "Couples should compare the adults-only and quieter beach options first, then choose by coast, dining style and activity plans.": "Le coppie dovrebbero confrontare prima le opzioni solo adulti e le spiagge più tranquille, poi scegliere per costa, stile gastronomico e attività.",
    "Couples-only calm, spa time and sunset dinners.": "Calma per coppie, tempo in spa e cene al tramonto.",
    "Eco-conscious credentials and a lighter-footprint approach across the collection.": "Credenziali eco-consapevoli e un approccio a minore impatto in tutta la collezione.",
    "Feel Mauritian, not just visit": "Vivi Mauritius, non solo visitarla",
    "Find your match": "Trova il tuo hotel",
    "Five relaxed, authentic and great-value island hotels, from barefoot family beaches to adults-only romance and laid-back surf-town cool.": "Cinque hotel isolani rilassati, autentici e convenienti, dalle spiagge barefoot per famiglie al romanticismo solo adulti e allo stile surf più easy.",
    "Five relaxed, great-value island hotels, pick your coast and your style.": "Cinque hotel rilassati e convenienti: scegli la costa e lo stile.",
    "Green Key": "Green Key",
    "Great-value comfort across every star tier, so more of the budget goes to exploring.": "Comfort conveniente in ogni categoria, così resta più budget per esplorare.",
    "In the heart of the village, with plenty included.": "Nel cuore del villaggio, con molto incluso.",
    "Instead of vast, look-alike complexes, you get intimate, character-filled properties where local flavours, sega rhythms, barefoot ease and the warmth of island hospitality matter far more than marble lobbies.": "Invece di grandi complessi tutti uguali, trovi strutture intime e piene di carattere, dove sapori locali, ritmi sega, semplicità barefoot e calore mauriziano contano più delle lobby in marmo.",
    "Kids' clubs, water sports and easy beach days.": "Mini club, sport acquatici e giornate al mare facili.",
    "Lively": "Vivace",
    "Lively All-Inclusive": "All inclusive vivace",
    "Map of Mauritius showing the locations of the five Veranda hotels": "Mappa di Mauritius con le posizioni dei cinque hotel Veranda",
    "North": "Nord",
    "North Coast": "Costa nord",
    "Pick your coast and your mood, then open the hotel that feels right for your trip.": "Scegli costa e atmosfera, poi apri l'hotel più adatto al tuo viaggio.",
    "Planning a honeymoon or a romantic escape?": "Stai organizzando una luna di miele o una fuga romantica?",
    "Relaxed Family Beach": "Spiaggia familiare rilassata",
    "Romance": "Romanticismo",
    "Some hotels sell you Mauritius. Veranda Resorts lets you live it. This home-grown collection of five boutique hotels, part of the Mauritian group Rogers Hospitality, is built around one simple promise: to make you feel Mauritian.": "Alcuni hotel ti vendono Mauritius. Veranda Resorts te la fa vivere. Questa collezione locale di cinque boutique hotel, parte del gruppo mauriziano Rogers Hospitality, nasce da una promessa semplice: farti sentire mauriziano.",
    "Signature Seven Colours spas for rest, renewal and a slower island rhythm.": "Spa Seven Colours per riposo, rigenerazione e un ritmo isolano più lento.",
    "South Coast": "Costa sud",
    "Surf": "Surf",
    "Surf & Bohemian": "Surf e bohemien",
    "Seven Colours Spa wellness": "Benessere alla spa Seven Colours",
    "The collection": "La collezione",
    "The five hotels span the whole spice-box of a Mauritian holiday, from relaxed 3-star retreats to polished 4-star-plus resorts, and from the buzzing north to the wild west and the postcard-perfect east.": "I cinque hotel coprono tutta la varietà di una vacanza mauriziana: da retreat 3 stelle rilassati a resort 4 stelle plus più curati, dal nord vivace all'ovest selvaggio e all'est da cartolina.",
    "The Veranda collection has five Mauritius hotels, covering family beach stays, adults-only retreats, all-inclusive village energy and west-coast surf style.": "La collezione Veranda conta cinque hotel a Mauritius: soggiorni mare per famiglie, retreat solo adulti, energia all inclusive di villaggio e stile surf della costa ovest.",
    "Village Life": "Vita di villaggio",
    "West": "Ovest",
    "West Coast": "Costa ovest",
    "West-coast surf-town style with sunset energy and an easygoing boutique mood.": "Stile surf-town della costa ovest, energia del tramonto e atmosfera boutique rilassata.",
    "Whichever you choose, all five share the same Veranda DNA: warm, genuinely Mauritian service, a strong sense of place, eco-conscious Green Key credentials, and the flavours, music and easygoing spirit that make the island so easy to fall for.": "Qualunque sia la scelta, tutti e cinque condividono lo stesso DNA Veranda: servizio caldo e autenticamente mauriziano, forte senso del luogo, attenzione eco Green Key, sapori, musica e spirito rilassato dell'isola.",
    "Yes, selected Veranda hotels suit families with beach access, kids' activities and easy resort facilities. Check each hotel style before booking.": "Sì, alcuni hotel Veranda sono adatti alle famiglie con accesso alla spiaggia, attività per bambini e servizi resort semplici. Controlla lo stile di ogni hotel prima di prenotare.",
  },
  es: {
    "/ night": "/ noche",
    "Adults Only": "Solo adultos",
    "Adults Only Wing": "Ala solo adultos",
    "Adults-Only": "Solo adultos",
    "Adults-Only Romance": "Romance solo adultos",
    "All Inclusive": "Todo incluido",
    "All-inclusive": "Todo incluido",
    "A directory of Veranda hotels in Mauritius, including family beach stays, adults-only retreats, and west-coast resorts.": "Una guía de hoteles Veranda en Mauricio, con estancias de playa familiares, refugios solo adultos y resorts de la costa oeste.",
    "A family-friendly resort on a long white-sand beach beside a calm, protected lagoon.": "Un resort familiar en una larga playa de arena blanca junto a una laguna tranquila y protegida.",
    "A laid-back, surf-inspired boutique on a bay famous for dolphins and golden sunsets.": "Un boutique hotel relajado inspirado en el surf, en una bahía famosa por delfines y atardeceres dorados.",
    "A relaxed barefoot beach hotel with a dedicated adults-only wing, spa and freshwater pools.": "Un hotel de playa barefoot con ala solo adultos, spa y piscinas de agua dulce.",
    "A sociable all-inclusive stay in the middle of Mauritius' best-known coastal town.": "Una estancia todo incluido y sociable en el centro de la localidad costera más conocida de Mauricio.",
    "An adults-only hideaway for slow mornings, spa rituals and romantic lagoon views.": "Un refugio solo adultos para mañanas lentas, rituales de spa y vistas románticas a la laguna.",
    "An easy-value east-coast beach stay on one of Mauritius' prettiest lagoon shores.": "Una estancia de playa sencilla y con buena relación calidad-precio en una de las lagunas más bonitas de la costa este.",
    "Beach": "Playa",
    "Bohemian": "Bohemio",
    "Boho": "Boho",
    "Boutique": "Boutique",
    "Choose your style": "Elige tu estilo",
    "Coasts of the island": "Costas de la isla",
    "Discover ->": "Descubrir ->",
    "Discover Veranda Grand Baie": "Descubrir Veranda Grand Baie",
    "Discover Veranda Palmar Beach": "Descubrir Veranda Palmar Beach",
    "Discover Veranda Paul & Virginie": "Descubrir Veranda Paul & Virginie",
    "Discover Veranda Pointe aux Biches": "Descubrir Veranda Pointe aux Biches",
    "Discover Veranda Tamarin": "Descubrir Veranda Tamarin",
    "East": "Este",
    "East Coast": "Costa este",
    "Explore by region": "Explorar por región",
    "Family": "Familia",
    "Family & Barefoot": "Familia y barefoot",
    "Character-filled, home-grown hotels that make you feel genuinely Mauritian.": "Hoteles locales llenos de carácter que te hacen sentir realmente mauriciano.",
    "Chasing surf, sunsets and west-coast character?": "¿Buscas surf, atardeceres y carácter de la costa oeste?",
    "Couples should compare the adults-only and quieter beach options first, then choose by coast, dining style and activity plans.": "Las parejas deberían comparar primero las opciones solo adultos y las playas más tranquilas, y después elegir por costa, estilo gastronómico y actividades.",
    "Couples-only calm, spa time and sunset dinners.": "Calma para parejas, spa y cenas al atardecer.",
    "Eco-conscious credentials and a lighter-footprint approach across the collection.": "Credenciales eco y un enfoque de menor impacto en toda la colección.",
    "Feel Mauritian, not just visit": "Vive Mauricio, no solo lo visites",
    "Find your match": "Encuentra tu hotel",
    "Five relaxed, authentic and great-value island hotels, from barefoot family beaches to adults-only romance and laid-back surf-town cool.": "Cinco hoteles isleños relajados, auténticos y con buena relación calidad-precio, desde playas familiares barefoot hasta romance solo adultos y estilo surfero tranquilo.",
    "Five relaxed, great-value island hotels, pick your coast and your style.": "Cinco hoteles relajados y de gran valor: elige tu costa y tu estilo.",
    "Green Key": "Green Key",
    "Great-value comfort across every star tier, so more of the budget goes to exploring.": "Comodidad de buen valor en cada categoría, para dejar más presupuesto a la exploración.",
    "In the heart of the village, with plenty included.": "En el corazón del pueblo, con mucho incluido.",
    "Instead of vast, look-alike complexes, you get intimate, character-filled properties where local flavours, sega rhythms, barefoot ease and the warmth of island hospitality matter far more than marble lobbies.": "En lugar de complejos enormes y parecidos, encuentras alojamientos íntimos y con carácter, donde los sabores locales, los ritmos sega, la sencillez barefoot y la hospitalidad mauriciana importan más que los vestíbulos de mármol.",
    "Kids' clubs, water sports and easy beach days.": "Clubes infantiles, deportes acuáticos y días de playa sencillos.",
    "Lively": "Animado",
    "Lively All-Inclusive": "Todo incluido animado",
    "Map of Mauritius showing the locations of the five Veranda hotels": "Mapa de Mauricio con las ubicaciones de los cinco hoteles Veranda",
    "North": "Norte",
    "North Coast": "Costa norte",
    "Pick your coast and your mood, then open the hotel that feels right for your trip.": "Elige tu costa y tu ambiente, y abre el hotel que encaje con tu viaje.",
    "Planning a honeymoon or a romantic escape?": "¿Planeas una luna de miel o una escapada romántica?",
    "Relaxed Family Beach": "Playa familiar relajada",
    "Romance": "Romance",
    "Some hotels sell you Mauritius. Veranda Resorts lets you live it. This home-grown collection of five boutique hotels, part of the Mauritian group Rogers Hospitality, is built around one simple promise: to make you feel Mauritian.": "Algunos hoteles te venden Mauricio. Veranda Resorts te deja vivirlo. Esta colección local de cinco hoteles boutique, parte del grupo mauriciano Rogers Hospitality, nace de una promesa sencilla: hacerte sentir mauriciano.",
    "Signature Seven Colours spas for rest, renewal and a slower island rhythm.": "Spas Seven Colours para descansar, renovarse y entrar en un ritmo isleño más lento.",
    "South Coast": "Costa sur",
    "Surf": "Surf",
    "Surf & Bohemian": "Surf y bohemio",
    "Seven Colours Spa wellness": "Bienestar en Seven Colours Spa",
    "The collection": "La colección",
    "The five hotels span the whole spice-box of a Mauritian holiday, from relaxed 3-star retreats to polished 4-star-plus resorts, and from the buzzing north to the wild west and the postcard-perfect east.": "Los cinco hoteles cubren toda la variedad de unas vacaciones mauricianas: desde retiros relajados de 3 estrellas hasta resorts 4 estrellas plus más pulidos, del norte animado al oeste salvaje y el este de postal.",
    "The Veranda collection has five Mauritius hotels, covering family beach stays, adults-only retreats, all-inclusive village energy and west-coast surf style.": "La colección Veranda tiene cinco hoteles en Mauricio: estancias de playa familiares, retiros solo adultos, energía todo incluido de pueblo y estilo surfero de la costa oeste.",
    "Village Life": "Vida de pueblo",
    "West": "Oeste",
    "West Coast": "Costa oeste",
    "West-coast surf-town style with sunset energy and an easygoing boutique mood.": "Estilo surfero de la costa oeste, energía de atardecer y ambiente boutique relajado.",
    "Whichever you choose, all five share the same Veranda DNA: warm, genuinely Mauritian service, a strong sense of place, eco-conscious Green Key credentials, and the flavours, music and easygoing spirit that make the island so easy to fall for.": "Elijas el que elijas, los cinco comparten el ADN Veranda: servicio cálido y genuinamente mauriciano, fuerte sentido del lugar, credenciales Green Key, sabores, música y espíritu relajado.",
    "Yes, selected Veranda hotels suit families with beach access, kids' activities and easy resort facilities. Check each hotel style before booking.": "Sí, algunos hoteles Veranda son adecuados para familias con acceso a la playa, actividades infantiles y servicios de resort sencillos. Revisa el estilo de cada hotel antes de reservar.",
  },
  ru: {
    "/ night": "/ ночь",
    "Adults Only": "Только для взрослых",
    "Adults Only Wing": "Крыло только для взрослых",
    "Adults-Only": "Только для взрослых",
    "Adults-Only Romance": "Романтика для взрослых",
    "All Inclusive": "Все включено",
    "All-inclusive": "Все включено",
    "A directory of Veranda hotels in Mauritius, including family beach stays, adults-only retreats, and west-coast resorts.": "Гид по отелям Veranda на Маврикии: семейные пляжные отели, ретриты только для взрослых и курорты западного побережья.",
    "A family-friendly resort on a long white-sand beach beside a calm, protected lagoon.": "Семейный курорт на длинном белом пляже у спокойной защищенной лагуны.",
    "A laid-back, surf-inspired boutique on a bay famous for dolphins and golden sunsets.": "Расслабленный бутик-отель в серф-стиле на бухте, известной дельфинами и золотыми закатами.",
    "A relaxed barefoot beach hotel with a dedicated adults-only wing, spa and freshwater pools.": "Расслабленный пляжный отель в стиле barefoot с отдельным крылом для взрослых, спа и пресными бассейнами.",
    "A sociable all-inclusive stay in the middle of Mauritius' best-known coastal town.": "Общительный отдых все включено в самом известном прибрежном городе Маврикия.",
    "An adults-only hideaway for slow mornings, spa rituals and romantic lagoon views.": "Укрытие только для взрослых для медленных утр, спа-ритуалов и романтичных видов на лагуну.",
    "An easy-value east-coast beach stay on one of Mauritius' prettiest lagoon shores.": "Простой и выгодный пляжный отдых на восточном побережье у одной из самых красивых лагун Маврикия.",
    "Beach": "Пляж",
    "Bohemian": "Богемный",
    "Boho": "Бохо",
    "Boutique": "Бутик",
    "Choose your style": "Выберите стиль",
    "Coasts of the island": "Побережья острова",
    "Discover ->": "Открыть ->",
    "Discover Veranda Grand Baie": "Открыть Veranda Grand Baie",
    "Discover Veranda Palmar Beach": "Открыть Veranda Palmar Beach",
    "Discover Veranda Paul & Virginie": "Открыть Veranda Paul & Virginie",
    "Discover Veranda Pointe aux Biches": "Открыть Veranda Pointe aux Biches",
    "Discover Veranda Tamarin": "Открыть Veranda Tamarin",
    "East": "Восток",
    "East Coast": "Восточное побережье",
    "Explore by region": "По регионам",
    "Family": "Семья",
    "Family & Barefoot": "Семья и barefoot",
    "Character-filled, home-grown hotels that make you feel genuinely Mauritian.": "Местные отели с характером, где действительно чувствуешь Маврикий.",
    "Chasing surf, sunsets and west-coast character?": "Хотите серф, закаты и характер западного побережья?",
    "Couples should compare the adults-only and quieter beach options first, then choose by coast, dining style and activity plans.": "Парам сначала стоит сравнить варианты только для взрослых и более тихие пляжные отели, а затем выбирать по побережью, кухне и планам активностей.",
    "Couples-only calm, spa time and sunset dinners.": "Спокойствие для пар, спа и ужины на закате.",
    "Eco-conscious credentials and a lighter-footprint approach across the collection.": "Экологичный подход и более мягкий след по всей коллекции.",
    "Feel Mauritian, not just visit": "Почувствуйте Маврикий, а не просто посетите",
    "Find your match": "Найдите свой отель",
    "Five relaxed, authentic and great-value island hotels, from barefoot family beaches to adults-only romance and laid-back surf-town cool.": "Пять расслабленных, аутентичных островных отелей с хорошей ценой: от семейных пляжей barefoot до романтики для взрослых и серф-атмосферы.",
    "Five relaxed, great-value island hotels, pick your coast and your style.": "Пять спокойных отелей с хорошей ценой: выберите побережье и стиль.",
    "Green Key": "Green Key",
    "Great-value comfort across every star tier, so more of the budget goes to exploring.": "Комфорт с хорошей ценой в каждой категории, чтобы больше бюджета осталось на исследование острова.",
    "In the heart of the village, with plenty included.": "В сердце деревни, с множеством включенных услуг.",
    "Instead of vast, look-alike complexes, you get intimate, character-filled properties where local flavours, sega rhythms, barefoot ease and the warmth of island hospitality matter far more than marble lobbies.": "Вместо огромных похожих комплексов вы получаете камерные отели с характером, где местные вкусы, ритмы сега, легкость barefoot и теплота островного гостеприимства важнее мраморных лобби.",
    "Kids' clubs, water sports and easy beach days.": "Детские клубы, водные виды спорта и легкие пляжные дни.",
    "Lively": "Оживленный",
    "Lively All-Inclusive": "Оживленный all-inclusive",
    "Map of Mauritius showing the locations of the five Veranda hotels": "Карта Маврикия с расположением пяти отелей Veranda",
    "North": "Север",
    "North Coast": "Северное побережье",
    "Pick your coast and your mood, then open the hotel that feels right for your trip.": "Выберите побережье и настроение, затем откройте отель, который подходит вашей поездке.",
    "Planning a honeymoon or a romantic escape?": "Планируете медовый месяц или романтический отдых?",
    "Relaxed Family Beach": "Спокойный семейный пляж",
    "Romance": "Романтика",
    "Some hotels sell you Mauritius. Veranda Resorts lets you live it. This home-grown collection of five boutique hotels, part of the Mauritian group Rogers Hospitality, is built around one simple promise: to make you feel Mauritian.": "Некоторые отели продают вам Маврикий. Veranda Resorts дает его прожить. Эта местная коллекция из пяти бутик-отелей, часть маврикийской группы Rogers Hospitality, построена вокруг простого обещания: дать почувствовать себя по-маврикийски.",
    "Signature Seven Colours spas for rest, renewal and a slower island rhythm.": "Спа Seven Colours для отдыха, восстановления и более медленного островного ритма.",
    "South Coast": "Южное побережье",
    "Surf": "Серф",
    "Surf & Bohemian": "Серф и бохо",
    "Seven Colours Spa wellness": "Спа-уход Seven Colours",
    "The collection": "Коллекция",
    "The five hotels span the whole spice-box of a Mauritian holiday, from relaxed 3-star retreats to polished 4-star-plus resorts, and from the buzzing north to the wild west and the postcard-perfect east.": "Пять отелей охватывают весь вкус маврикийского отдыха: от расслабленных 3-звездочных ретритов до более изысканных 4-звездочных-plus курортов, от оживленного севера до дикого запада и открытки востока.",
    "The Veranda collection has five Mauritius hotels, covering family beach stays, adults-only retreats, all-inclusive village energy and west-coast surf style.": "Коллекция Veranda включает пять отелей на Маврикии: семейные пляжные остановки, ретриты только для взрослых, all-inclusive энергию деревни и стиль серфа западного побережья.",
    "Village Life": "Деревенская жизнь",
    "West": "Запад",
    "West Coast": "Западное побережье",
    "West-coast surf-town style with sunset energy and an easygoing boutique mood.": "Стиль серф-городка западного побережья, энергия заката и расслабленное бутик-настроение.",
    "Whichever you choose, all five share the same Veranda DNA: warm, genuinely Mauritian service, a strong sense of place, eco-conscious Green Key credentials, and the flavours, music and easygoing spirit that make the island so easy to fall for.": "Какой бы отель вы ни выбрали, все пять несут одну ДНК Veranda: теплый маврикийский сервис, ощущение места, экологичный подход Green Key, вкусы, музыка и легкий островной дух.",
    "Yes, selected Veranda hotels suit families with beach access, kids' activities and easy resort facilities. Check each hotel style before booking.": "Да, некоторые отели Veranda подходят семьям: пляжный доступ, детские активности и удобные курортные услуги. Проверьте стиль каждого отеля перед бронированием.",
  },
};

Object.assign(verandaText.fr, {
  "Which is right for me?": "Quel hôtel est fait pour moi ?",
  "Comfort tiers": "Catégories de confort",
  "Eco-certified": "Certification ecologique",
  "Authentic island style": "Style insulaire authentique",
  "Genuine, honest value": "Bon rapport qualité-prix",
  "Green Key certified": "Certifié Green Key",
  "Green Key": "Clef Verte",
  "Travelling as a family but still want adult time?": "Vous voyagez en famille mais voulez aussi du temps entre adultes ?",
  "After a stunning east-coast beach and great value?": "Vous cherchez une superbe plage de la côte est et un bon prix ?",
});

Object.assign(verandaText.de, {
  "Which is right for me?": "Welches Hotel passt zu mir?",
  "Comfort tiers": "Komfortklassen",
  "Eco-certified": "Öko-zertifiziert",
  "Authentic island style": "Authentischer Inselstil",
  "Genuine, honest value": "Ehrliches Preis-Leistungs-Verhältnis",
  "Green Key certified": "Green-Key-zertifiziert",
  "Green Key": "Grüner Schlüssel",
  "Travelling as a family but still want adult time?": "Reisen Sie als Familie, möchten aber auch Zeit nur für Erwachsene?",
  "After a stunning east-coast beach and great value?": "Suchen Sie einen schönen Ostküstenstrand mit gutem Preis-Leistungs-Verhältnis?",
});

Object.assign(verandaText.it, {
  "Which is right for me?": "Quale hotel fa per me?",
  "Comfort tiers": "Livelli di comfort",
  "Eco-certified": "Certificazione ecologica",
  "Authentic island style": "Stile autentico dell'isola",
  "Genuine, honest value": "Valore autentico e corretto",
  "Green Key certified": "Certificato Green Key",
  "Green Key": "Chiave Verde",
  "Travelling as a family but still want adult time?": "Viaggi in famiglia ma vuoi anche momenti solo adulti?",
  "After a stunning east-coast beach and great value?": "Cerchi una splendida spiaggia della costa est e un ottimo rapporto qualità-prezzo?",
});

Object.assign(verandaText.es, {
  "Which is right for me?": "¿Qué hotel es para mí?",
  "Comfort tiers": "Niveles de confort",
  "Eco-certified": "Certificación ecológica",
  "Authentic island style": "Estilo isleño auténtico",
  "Genuine, honest value": "Buena relación calidad-precio",
  "Green Key certified": "Certificado Green Key",
  "Green Key": "Llave Verde",
  "Travelling as a family but still want adult time?": "¿Viajas en familia pero también quieres momentos solo para adultos?",
  "After a stunning east-coast beach and great value?": "¿Buscas una playa espectacular en la costa este y buen precio?",
});

Object.assign(verandaText.ru, {
  "Which is right for me?": "Какой отель мне подойдет?",
  "Comfort tiers": "Уровни комфорта",
  "Eco-certified": "Эко-сертификация",
  "Authentic island style": "Аутентичный островной стиль",
  "Genuine, honest value": "Честное соотношение цены и качества",
  "Green Key certified": "Сертификат Green Key",
  "Green Key": "Зеленый ключ",
  "Travelling as a family but still want adult time?": "Путешествуете семьей, но хотите время только для взрослых?",
  "After a stunning east-coast beach and great value?": "Ищете красивый пляж восточного побережья и хорошую цену?",
});

function verandaTranslate(locale: AppLocale) {
  return (text: string): string => {
    if (locale === "en") return text;
    return verandaText[locale]?.[text] ?? staticPageText(locale, text);
  };
}

function getVerandaHotelLinkByName(
  hotels: VerandaHotel[],
  name: string,
): string {
  return `/veranda-hotels/${hotels.find((hotel) => hotel.name === name)?.slug ?? ""}`;
}

function formatHotelCardRating(rating: string): string {
  return rating.replace(/\s*stars?$/i, "");
}

function formatHotelCardPrice(priceFrom: string): string {
  return priceFrom.replace(/^from\s+/i, "");
}

function formatHotelTag(tag: string): string {
  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildHotelRegions(hotels: VerandaHotel[], t: (text: string) => string) {
  const regionMeta: Record<string, { label: string; order: number }> = {
    north: { label: "North Coast", order: 0 },
    west: { label: "West Coast", order: 1 },
    east: { label: "East Coast", order: 2 },
    south: { label: "South Coast", order: 3 },
    central: { label: "Central", order: 4 },
  };

  const groups = hotels.reduce<Record<string, VerandaHotel[]>>((acc, hotel) => {
    const key = hotel.region.toLowerCase();
    acc[key] ??= [];
    acc[key].push(hotel);
    return acc;
  }, {});

  return Object.entries(groups)
    .sort(
      (a, b) =>
        (regionMeta[a[0]]?.order ?? 99) - (regionMeta[b[0]]?.order ?? 99),
    )
    .map(([regionKey, regionHotels]) => ({
      name: t(regionMeta[regionKey]?.label ?? regionKey),
      hotels: regionHotels.map((hotel) => ({
        name: hotel.name,
        location: hotel.location,
        region: t(regionMeta[regionKey]?.label ?? regionKey),
        rating: formatHotelCardRating(hotel.rating),
        style: t(hotel.style),
        tagline: t(hotel.tagline),
        tags: hotel.tags.map((tag) => t(formatHotelTag(tag))),
        price: formatHotelCardPrice(hotel.priceFrom),
        heroImage: hotel.heroImage,
        gradient: hotel.accent,
        href: `/veranda-hotels/${hotel.slug}`,
      })),
    }));
}

function getChooseRows(hotels: VerandaHotel[], t: (text: string) => string) {
  return [
    {
      question: "Want nightlife, shopping and all-inclusive convenience?",
      answer: "Veranda Grand Baie",
    },
    {
      question: "Planning a honeymoon or a romantic escape?",
      answer: "Veranda Paul & Virginie",
    },
    {
      question: "Travelling as a family but still want adult time?",
      answer: "Veranda Pointe aux Biches",
    },
    {
      question: "Chasing surf, sunsets and west-coast character?",
      answer: "Veranda Tamarin",
    },
    {
      question: "After a stunning east-coast beach and great value?",
      answer: "Veranda Palmar Beach",
    },
  ].map((row) => ({
    ...row,
    question: t(row.question),
    href: getVerandaHotelLinkByName(hotels, row.answer),
  }));
}

const whyItems = [
  {
    title: "Authentic island style",
    description:
      "Character-filled, home-grown hotels that make you feel genuinely Mauritian.",
    icon: "heart",
  },
  {
    title: "Seven Colours Spa wellness",
    description:
      "Signature Seven Colours spas for rest, renewal and a slower island rhythm.",
    icon: "spark",
  },
  {
    title: "Genuine, honest value",
    description:
      "Great-value comfort across every star tier, so more of the budget goes to exploring.",
    icon: "badge",
  },
  {
    title: "Green Key certified",
    description:
      "Eco-conscious credentials and a lighter-footprint approach across the collection.",
    icon: "leaf",
  },
];

function VerandaIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const props = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "family":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M12 21c5-3 8-7 8-11a4 4 0 0 0-8-1 4 4 0 0 0-8 1c0 4 3 8 8 11Z" />
        </svg>
      );
    case "glass":
      return (
        <svg {...props}>
          <path d="M6 4h12l-6 7Z" />
          <path d="M12 11v7" />
          <path d="M8 21h8" />
        </svg>
      );
    case "palm":
      return (
        <svg {...props}>
          <path d="M4 20h16" />
          <path d="M12 20V9" />
          <path d="M12 9a7 7 0 0 1 8 4" />
          <path d="M12 9a7 7 0 0 0-8 4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7Z" />
          <path d="M19 16l.8 2 .2.2-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
        </svg>
      );
    case "badge":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2 0 0 1 5 0c0 1.5-2.5 1.6-2.5 3" />
          <path d="M12 16.5v.01" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...props}>
          <path d="M4 20c0-8 6-14 16-14 0 10-6 15-12 15a4 4 0 0 1-4-4Z" />
          <path d="M4 20c4-4 7-6 11-7" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    default:
      return null;
  }
}

function HotelCard({
  hotel,
  translate,
}: {
  hotel: {
    name: string;
    location: string;
    region: string;
    rating: string;
    style: string;
    tagline: string;
    tags: string[];
    price: string;
    heroImage: string;
    gradient: string;
    href: string;
  };
  translate: (text: string) => string;
}) {
  const isExternal = hotel.href.startsWith("http");
  const content = (
    <>
      <div
        className={`relative aspect-[16/11] bg-gradient-to-br ${hotel.gradient}`}
      >
        {hotel.heroImage ? (
          <>
            <Image
              src={getImageUrl(hotel.heroImage, { width: 800, quality: 72 })}
              alt={hotel.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />
          </>
        ) : null}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#1c2a2e]">
          {hotel.name}
        </span>
        <span className="absolute right-3 top-3 text-xs tracking-[0.18em] text-white drop-shadow">
          {hotel.rating}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-[#e8601c] px-3 py-1 text-[11px] font-semibold text-white">
          {hotel.region}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-sans text-[21px] font-semibold leading-tight text-[#1c2a2e]">
          {hotel.name}
        </h3>
        <p className="flex-1 text-sm leading-6 text-[#5f7378]">
          {hotel.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {hotel.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f2f8f8] px-3 py-1 text-[11.5px] font-medium text-[#12909c]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-[#e4eeee] pt-4">
          <div>
            <span className="font-sans text-base font-semibold text-[#1c2a2e]">
              {translate("from")} {hotel.price}
            </span>
            <span className="ml-1 text-xs text-[#5f7378]">
              {translate("/ night")}
            </span>
          </div>
          <span className="text-sm font-semibold text-[#12909c]">
            {translate("Discover ->")}
          </span>
        </div>
      </div>
    </>
  );

  const className =
    "flex h-full flex-col overflow-hidden rounded-2xl border border-[#e4eeee] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(12,90,100,0.14)]";

  if (isExternal) {
    return (
      <a
        href={hotel.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={hotel.href} className={className}>
      {content}
    </Link>
  );
}

function ChoiceLink({
  href,
  question,
  answer,
  translate,
}: {
  href: string;
  question: string;
  answer: string;
  translate: (text: string) => string;
}) {
  const isExternal = href.startsWith("http");
  const className =
    "flex flex-col gap-2 rounded-2xl border border-[#e4eeee] bg-white px-5 py-4 transition duration-200 hover:translate-x-1 hover:shadow-[0_14px_30px_rgba(12,90,100,0.1)] sm:flex-row sm:items-center sm:justify-between sm:gap-4";

  const content = (
    <>
      <div className="text-[15.5px] font-medium text-[#1c2a2e]">{question}</div>
      <div className="whitespace-nowrap font-sans text-[14.5px] font-semibold text-[#12909c]">
        {translate(`Discover ${answer}`)}
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default async function VerandaCollectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const t = verandaTranslate(activeLocale);
  const headings = verandaPageHeadings[activeLocale] ?? verandaPageHeadings.en;
  const { allHotels } = await getVerandaHotelsListingData(activeLocale);
  const hotelRegions = buildHotelRegions(allHotels, t);
  const chooseRows = getChooseRows(allHotels, t);
  const translatedFaqs = verandaHotelFaqs.map((faq) => ({
    question: t(faq.question),
    answer: t(faq.answer),
  }));


  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <FAQJsonLd items={translatedFaqs} />
      <HotelCollectionJsonLd
        hotels={allHotels.map((hotel) => ({
          name: hotel.name,
          description: t(hotel.tagline),
          url: `${SITE_URL}/veranda-hotels/${hotel.slug}`,
          image: getImageUrl(hotel.heroImage, { width: 1200, quality: 80 }),
          priceRange: hotel.priceFrom,
          starRating: hotel.rating,
          addressLocality: hotel.location,
        }))}
      />
      <ItemListJsonLd
        name={t("Veranda Hotels in Mauritius")}
        description={t("A directory of Veranda hotels in Mauritius, including family beach stays, adults-only retreats, and west-coast resorts.")}
        itemType="Hotel"
        items={allHotels.map((hotel, index) => ({
          position: index + 1,
          name: hotel.name,
          url: `${SITE_URL}/veranda-hotels/${hotel.slug}`,
          image: getImageUrl(hotel.heroImage, { width: 800, quality: 75 }),
          description: t(hotel.tagline),
        }))}
      />
      <Navbar />
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0d6167,#137d86_58%,#2fa6b2)] px-4 pt-28 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl("/images/veranda-pointe-aux-biches-sunset-beach.webp", { width: 1800, quality: 78 })}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-00 scale-[1.05]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.38)_38%,rgba(0,0,0,0.46)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.72)_24%,rgba(0,0,0,0.48)_48%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0.08)_100%)]" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end pb-32 sm:min-h-[76vh] lg:min-h-[82vh]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]">
              {headings.heroKicker}
            </p>
            <h1 className="mt-4 font-sans text-4xl font-bold leading-[0.95] tracking-[-0.02em] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.34)] sm:text-5xl lg:text-[68px]">
              {headings.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/95 [text-shadow:0_2px_14px_rgba(0,0,0,0.32)] sm:text-lg sm:leading-8">
              {t("Five relaxed, authentic and great-value island hotels, from barefoot family beaches to adults-only romance and laid-back surf-town cool.")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#collection"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#e8601c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c94f12]"
              >
                {t("Choose your style")}
              </Link>
              <Link
                href="#choose"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e4eeee] bg-white px-6 py-3 text-sm font-semibold text-[#1c2a2e] transition hover:bg-[#f8fbfb]"
              >
                {t("Which is right for me?")}
              </Link>
            </div>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 h-[74px] w-full"
          viewBox="0 0 1440 74"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M0,18 C160,34 308,32 430,24 C576,14 695,8 842,18 C976,28 1102,40 1248,34 C1324,31 1388,24 1440,18 L1440,74 L0,74 Z"
          />
        </svg>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              {t("The collection")}
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold leading-tight text-[#1c2a2e] sm:text-4xl">
              {t("Feel Mauritian, not just visit")}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#42565b]">
              {t("Some hotels sell you Mauritius. Veranda Resorts lets you live it. This home-grown collection of five boutique hotels, part of the Mauritian group Rogers Hospitality, is built around one simple promise: to make you feel Mauritian.")}
            </p>
            <p className="mt-4 text-base leading-7 text-[#42565b]">
              {t("Instead of vast, look-alike complexes, you get intimate, character-filled properties where local flavours, sega rhythms, barefoot ease and the warmth of island hospitality matter far more than marble lobbies.")}
            </p>
            <p className="mt-4 text-base leading-7 text-[#42565b]">
              {t("The five hotels span the whole spice-box of a Mauritian holiday, from relaxed 3-star retreats to polished 4-star-plus resorts, and from the buzzing north to the wild west and the postcard-perfect east.")}
            </p>
          </div>

          <div className="grid gap-4 rounded-2xl border border-[#e4eeee] bg-[#f2f8f8] p-6 sm:grid-cols-2">
            {[
              { value: "5", label: "Boutique hotels" },
              { value: "3", label: "Coasts of the island" },
              { value: "3-4+", label: "Comfort tiers" },
              { value: "Green Key", label: "Eco-certified" },
            ].map((fact) => (
              <div key={fact.label}>
                <div className="font-sans text-3xl font-semibold text-[#12909c]">
                  {t(fact.value)}
                </div>
                <div className="mt-1 text-[12.5px] uppercase tracking-[0.07em] text-[#5f7378]">
                  {t(fact.label)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {styleCards.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#e4eeee] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(12,90,100,0.12)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f8f8] text-[#12909c]">
                <VerandaIcon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-sans text-base font-semibold text-[#1c2a2e]">
                {t(item.title)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5f7378]">
                {t(item.description)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="collection" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              {t("Explore by region")}
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              {headings.hotelListTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#5f7378]">
              {t("Pick your coast and your mood, then open the hotel that feels right for your trip.")}
            </p>
          </div>

          <div className="space-y-9">
            {hotelRegions.map((region) => (
              <div key={region.name}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8601c]">
                    {region.name}
                  </span>
                  <div className="h-px flex-1 bg-[#e4eeee]" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {region.hotels.map((hotel) => (
                    <HotelCard key={hotel.name} hotel={hotel} translate={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              {t("Where to stay")}
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              {headings.mapTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#5f7378]">
              {t("Five relaxed, great-value island hotels, pick your coast and your style.")}
            </p>
          </div>

          {/* <div className="hidden lg:block">
            <div className="mx-auto max-w-[1200px]">
              <svg
                viewBox="0 0 1200 600"
                className="h-auto w-full"
                aria-hidden="true"
              >
                <image
                  href="/images/map.png"
                  x="410"
                  y="120"
                  width="400"
                  height="400"
                  preserveAspectRatio="xMidYMid meet"
                />

                <path
                  d="M686.2,160.96 L767.1,160.96 L767.1,178 L848,178"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M484.6,207.76 L422.3,207.76 L422.3,208 L360,208"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M453.64,414.4 L406.82,414.4 L406.82,470 L360,470"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M772.6,348.16 L810.3,348.16 L810.3,444 L848,444"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {[
                  { x: 567.4, y: 149.44 },
                  { x: 686.2, y: 160.96 },
                  { x: 484.6, y: 207.76 },
                  { x: 453.64, y: 414.4 },
                  { x: 772.6, y: 348.16 },
                ].map((pin) => (
                  <g key={`${pin.x}-${pin.y}`}>
                    <circle
                      cx={pin.x}
                      cy={pin.y + 9}
                      r="8"
                      fill="rgba(20,40,45,.12)"
                    />
                    <circle cx={pin.x} cy={pin.y} r="15" fill="#E8601C" />
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="15"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5"
                    />
                    <circle cx={pin.x} cy={pin.y} r="5" fill="#fff" />
                  </g>
                ))}

                <foreignObject x="392" y="6" width="330" height="104">
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: ".16em",
                          color: "#12909C",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Lively &amp; All-Inclusive
                      </div>
                      <div
                        style={{
                          fontSize: "19px",
                          fontWeight: 600,
                          color: "#1C2A2E",
                          margin: "2px 0 4px",
                          lineHeight: 1.1,
                        }}
                      >
                        Veranda Grand Baie
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#5F7378",
                          lineHeight: 1.5,
                        }}
                      >
                        A bright all-inclusive hotel in the heart of the
                        island&apos;s most vibrant coastal village.
                      </div>
                      <div
                        style={{
                          marginTop: "7px",
                          fontWeight: 600,
                          fontSize: "13px",
                          color: "#1C2A2E",
                        }}
                      >
                        Grand Baie
                      </div>
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="848" y="132" width="344" height="126">
                  <div
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Adults-Only Romance
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Paul &amp; Virginie
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      An intimate, couples-only boutique beach retreat in an
                      authentic fishing village.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Grand Gaube
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="8" y="150" width="352" height="132">
                  <div
                    style={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Family &amp; Barefoot
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Pointe aux Biches
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      A relaxed barefoot beach hotel with a dedicated
                      adults-only wing, spa and freshwater pools.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Pointe aux Piments
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="8" y="432" width="352" height="118">
                  <div
                    style={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Surf &amp; Bohemian
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Tamarin
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      A laid-back, surf-inspired boutique on a bay famous for
                      dolphins and golden sunsets.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Tamarin Bay
                    </div>
                  </div>
                </foreignObject>

                <foreignObject x="848" y="398" width="344" height="126">
                  <div
                    style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: ".16em",
                        color: "#12909C",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Relaxed Family Beach
                    </div>
                    <div
                      style={{
                        fontSize: "19px",
                        fontWeight: 600,
                        color: "#1C2A2E",
                        margin: "2px 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      Veranda Palmar Beach
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#5F7378",
                        lineHeight: 1.5,
                      }}
                    >
                      A family-friendly resort on a long white-sand beach beside
                      a calm, protected lagoon.
                    </div>
                    <div
                      style={{
                        marginTop: "7px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#1C2A2E",
                      }}
                    >
                      Palmar / Belle Mare
                    </div>
                  </div>
                </foreignObject>

                <path
                  d="M567.4,118 L567.4,149.44"
                  fill="none"
                  stroke="#E8601C"
                  strokeWidth="2.4"
                  strokeDasharray="7 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div> */}

          <div>
            <Image
              src="/images/veranda_hotels_map.jpeg"
              alt={t("Map of Mauritius showing the locations of the five Veranda hotels")}
              width={1200}
              height={600}
              className=" h-auto w-full rounded-2xl"
            />
          </div>

          {/* <div className="lg:hidden">
            <div className="overflow-hidden rounded-3xl border border-[#e4eeee] bg-white">
              <div className="border-b border-[#e4eeee] bg-[#f8fbfb] p-4 sm:p-6">
                <div className="relative mx-auto aspect-[1.08] max-w-[680px] rounded-[28px] bg-[linear-gradient(180deg,#f8fbfb,#eef5f5)]">
                  <svg
                    viewBox="0 0 900 620"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M360 90 390 100 430 120 455 145 470 175 500 205 530 250 550 300 575 355 588 410 575 460 550 505 510 550 465 575 410 585 360 580 310 565 275 540 250 550 255 510 272 470 268 420 278 375 268 330 275 290 300 245 315 210 310 175 330 145Z"
                      fill="#dde6e6"
                      stroke="#c7d6d6"
                      strokeWidth="2"
                    />

                    {[
                      { x: 465, y: 135 },
                      { x: 565, y: 150 },
                      { x: 395, y: 205 },
                      { x: 375, y: 395 },
                      { x: 635, y: 330 },
                    ].map((pin) => (
                      <g key={`${pin.x}-${pin.y}`}>
                        <circle
                          cx={pin.x}
                          cy={pin.y + 10}
                          r="11"
                          fill="rgba(20,40,45,.12)"
                        />
                        <circle cx={pin.x} cy={pin.y} r="17" fill="#E8601C" />
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r="17"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="3"
                        />
                        <circle cx={pin.x} cy={pin.y} r="5" fill="#fff" />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {mapHotels.map((hotel) => (
                  <div
                    key={hotel.name}
                    className="rounded-2xl border border-[#e4eeee] bg-white p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12909c]">
                      {hotel.label}
                    </p>
                    <h3 className="mt-1 font-sans text-lg font-semibold text-[#1c2a2e]">
                      {hotel.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#5f7378]">
                      {hotel.description}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1c2a2e]">
                      <VerandaIcon
                        name="pin"
                        className="h-4 w-4 text-[#12909c]"
                      />
                      {hotel.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              {headings.whyKicker}
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              {headings.whyTitle}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {whyItems.map((item) => (
              <article key={item.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2f8f8] text-[#12909c]">
                  <VerandaIcon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-sans text-base font-semibold text-[#1c2a2e]">
                  {t(item.title)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5f7378]">
                  {t(item.description)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="choose" className="bg-[#f2f8f8] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12909c]">
              {t("Find your match")}
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-[#1c2a2e] sm:text-[34px]">
              {headings.matchTitle}
            </h2>
          </div>

          <div className="mx-auto flex max-w-4xl flex-col gap-3">
            {chooseRows.map((row) => (
              <ChoiceLink
                key={row.answer}
                href={row.href}
                question={row.question}
                answer={row.answer}
                translate={t}
              />
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-4xl text-center text-[15px] leading-7 text-[#42565b]">
            {t("Whichever you choose, all five share the same Veranda DNA: warm, genuinely Mauritian service, a strong sense of place, eco-conscious Green Key credentials, and the flavours, music and easygoing spirit that make the island so easy to fall for.")}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  ), activeLocale);
}
