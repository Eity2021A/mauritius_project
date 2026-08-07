import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import { localizeStaticPage, staticPageText } from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import {
  Car,
  Eye,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  TreePalm,
  Waves,
} from "lucide-react";
import Image from "next/image";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";
import PocketAdBanner from "@/components/PocketAdBanner";
import { normalizeLocale } from "@/i18n/routing";

export const revalidate = 3600;
const metadataSource: Metadata = {
  title: "Where to See Monkeys in Mauritius",
  description:
    "Where to see monkeys in Mauritius — spot wild macaques in the south-west highlands, Black River Gorges and beyond. Best places, tips and what to expect.",
  alternates: { canonical: "/where-to-see-monkeys-in-mauritius" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);

  return {
    ...metadataSource,
    title: staticPageText(activeLocale, String(metadataSource.title)),
    description: staticPageText(
      activeLocale,
      String(metadataSource.description),
    ),
  };
}

const ad = {
  desktopSrc:
    "/images/quick-trips/Seven-waterfall-hike-in-Mauritius-Best-Hike-best-Prices.webp",
  href: "/",
  alt: "Seven waterfall hike in Mauritius Best Hike best Prices",
};
const monkeySpots: {
  name: string;
  tag: string;
  region: string;
  see: string;
  tip: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    name: "Black River Gorges Viewpoint",
    tag: "Viewpoint - National Park",
    region: "South-west highlands",
    see: "Troops gather by the car park, railings and roadside trees - often curious and quick to approach.",
    tip: "Keep food hidden - allow 20-40 min.",
    icon: Eye,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
  {
    name: "Chamarel Viewpoint",
    tag: "Forest Roads",
    region: "Chamarel - South-West",
    see: "Seen along the cooler, greener highland roads and near the forested viewing areas.",
    tip: "Drive slowly - monkeys may cross suddenly.",
    icon: Car,
    color: "#f16522",
    bg: "#fff0e7",
  },
  {
    name: "Alexandra Falls Viewpoint",
    tag: "Waterfall Viewpoint",
    region: "Plaine Champagne",
    see: "Forest all around makes this a prime spot - monkeys near the parking, trees and walking paths.",
    tip: "Don't hold food in your hands while taking photos.",
    icon: Waves,
    color: "#2389c9",
    bg: "#eaf7ff",
  },
  {
    name: "Grand Bassin - Ganga Talao",
    tag: "Sacred Lake",
    region: "Central highlands",
    see: "Troops move through the trees around the temples, the lake and the parking areas.",
    tip: "Dress modestly - keep noise low - go early.",
    icon: Landmark,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
  {
    name: "Black River Gorges National Park",
    tag: "National Park",
    region: "South-West Mauritius",
    see: "The island's largest forest - spot them at roadsides, forest edges, picnic areas and viewpoints.",
    tip: "Bring water & good shoes - weather changes fast.",
    icon: Mountain,
    color: "#2f8e48",
    bg: "#edf8ef",
  },
];

const monkeySpotLinks: Record<string, string> = {
  "Black River Gorges Viewpoint": "/best-places-to-visit-in-mauritius/black-river-gorges",
  "Chamarel Viewpoint": "/best-places-to-visit-in-mauritius/chamarel-view-point",
  "Alexandra Falls Viewpoint": "/best-places-to-visit-in-mauritius/alexandra-falls",
  "Grand Bassin - Ganga Talao": "/best-places-to-visit-in-mauritius/grand-bassin",
  "Black River Gorges National Park": "/top-activities-mauritius/black-river-gorges",
};

const monkeyRules = [
  ["Never feed them", "Keep all food and snacks hidden and sealed."],
  ["Don't touch or tease", "Keep children close and give them space."],
  ["Secure your things", "Bags, phones and sunglasses are easily snatched."],
  ["Enjoy from a distance", "They are wild, not tame - watch and photograph, don't approach."],
];

type SupportedMonkeyLocale = "fr" | "de" | "it" | "es" | "ru";

const MONKEY_PAGE_COPY: Record<SupportedMonkeyLocale, {
  kicker: string;
  titleMain: string;
  titleAccent: string;
  intro: string;
  seeLabel: string;
  tipLabel: string;
  spots: Record<string, { name: string; tag: string; region: string; see: string; tip: string }>;
  loopTitle: string;
  loopText: string;
  rulesTitle: string;
  rules: [string, string][];
  finalNote: string;
}> = {
  fr: {
    kicker: "Faune - hauts plateaux du sud-ouest",
    titleMain: "Ou voir",
    titleAccent: "les singes",
    intro: "Les macaques sauvages des hauts plateaux du sud-ouest sont l'une des belles surprises de l'ile : observez-les a distance et ne les nourrissez jamais.",
    seeLabel: "Voir",
    tipLabel: "Conseil",
    spots: {
      "Black River Gorges Viewpoint": { name: "Point de vue des gorges de Riviere Noire", tag: "Point de vue - parc national", region: "Hauts plateaux du sud-ouest", see: "Les groupes se rassemblent pres du parking, des barrieres et des arbres en bord de route; ils sont souvent curieux et rapides a s'approcher.", tip: "Gardez la nourriture cachee - prevoyez 20 a 40 min." },
      "Chamarel Viewpoint": { name: "Point de vue de Chamarel", tag: "Routes forestieres", region: "Chamarel - Sud-Ouest", see: "On les voit le long des routes plus fraiches et verdoyantes des hauts plateaux, pres des zones de vue boisees.", tip: "Roulez lentement - les singes peuvent traverser brusquement." },
      "Alexandra Falls Viewpoint": { name: "Point de vue des chutes Alexandra", tag: "Point de vue cascade", region: "Plaine Champagne", see: "La foret tout autour en fait un excellent spot : singes pres du parking, des arbres et des sentiers.", tip: "Ne tenez pas de nourriture en main pendant les photos." },
      "Grand Bassin - Ganga Talao": { name: "Grand Bassin - Ganga Talao", tag: "Lac sacre", region: "Hauts plateaux du centre", see: "Les groupes se deplacent dans les arbres autour des temples, du lac et des parkings.", tip: "Habillez-vous modestement - restez discret - allez tot." },
      "Black River Gorges National Park": { name: "Parc national des gorges de Riviere Noire", tag: "Parc national", region: "Sud-ouest de Maurice", see: "La plus grande foret de l'ile : observez-les au bord des routes, lisieres, aires de pique-nique et points de vue.", tip: "Apportez de l'eau et de bonnes chaussures - la meteo change vite." },
    },
    loopTitle: "Faire une boucle dans les hauts plateaux",
    loopText: "Commencez a Grand Bassin, puis les chutes Alexandra, le point de vue des gorges de Riviere Noire et Chamarel : meilleures observations et paysages en une seule route.",
    rulesTitle: "Regarder, ne pas toucher",
    rules: [
      ["Ne jamais les nourrir", "Gardez toute nourriture et snacks caches et fermes."],
      ["Ne pas toucher ni taquiner", "Gardez les enfants pres de vous et laissez-leur de l'espace."],
      ["Securiser vos affaires", "Sacs, telephones et lunettes peuvent etre vite attrapes."],
      ["Observer a distance", "Ils sont sauvages, pas apprivoises : regardez et photographiez sans vous approcher."],
    ],
    finalNote: "Ils peuvent sembler joueurs, mais une morsure mene a l'hopital : admirez les macaques et laissez-les tranquilles.",
  },
  de: {
    kicker: "Tierwelt - sudwestliches Hochland",
    titleMain: "Wo man",
    titleAccent: "Affen sieht",
    intro: "Die wilden Makaken im sudwestlichen Hochland sind eine der schonsten Uberraschungen der Insel: Beobachten Sie sie aus sicherer Distanz und futtern Sie sie nie.",
    seeLabel: "Sehen",
    tipLabel: "Tipp",
    spots: {
      "Black River Gorges Viewpoint": { name: "Aussichtspunkt der Black-River-Schluchten", tag: "Aussichtspunkt - Nationalpark", region: "Sudwestliches Hochland", see: "Gruppen sammeln sich am Parkplatz, an Gelandern und Strassenbaumen; oft neugierig und schnell nah.", tip: "Essen versteckt halten - 20 bis 40 Min. einplanen." },
      "Chamarel Viewpoint": { name: "Aussichtspunkt Chamarel", tag: "Waldstrassen", region: "Chamarel - Sudwesten", see: "Entlang kuhlerer, gruner Hochlandstrassen und nahe bewaldeter Aussichtspunkte zu sehen.", tip: "Langsam fahren - Affen konnen plotzlich kreuzen." },
      "Alexandra Falls Viewpoint": { name: "Aussichtspunkt der Alexandra-Falle", tag: "Wasserfall-Aussichtspunkt", region: "Plaine Champagne", see: "Wald rundherum macht dies zu einem Top-Spot: Affen nahe Parkplatz, Baumen und Wegen.", tip: "Beim Fotografieren kein Essen in der Hand halten." },
      "Grand Bassin - Ganga Talao": { name: "Grand Bassin - Ganga Talao", tag: "Heiliger See", region: "Zentrales Hochland", see: "Gruppen bewegen sich in den Baumen rund um Tempel, See und Parkplatze.", tip: "Dezent kleiden - leise bleiben - fruh gehen." },
      "Black River Gorges National Park": { name: "Nationalpark Black River Gorges", tag: "Nationalpark", region: "Sudwest-Mauritius", see: "Der grosste Wald der Insel: an Strassenrandern, Waldrandern, Picknickplatzen und Aussichtspunkten.", tip: "Wasser und gute Schuhe mitbringen - das Wetter wechselt schnell." },
    },
    loopTitle: "Eine Hochlandrunde fahren",
    loopText: "Starten Sie bei Grand Bassin, dann bei den Alexandra-Fallen, dem Aussichtspunkt der Black-River-Schluchten und Chamarel: beste Sichtungen und Landschaft in einer Fahrt.",
    rulesTitle: "Beobachten, nicht anfassen",
    rules: [
      ["Nie futtern", "Alle Lebensmittel und Snacks versteckt und verschlossen halten."],
      ["Nicht anfassen oder reizen", "Kinder nah bei sich halten und Abstand geben."],
      ["Sachen sichern", "Taschen, Handys und Sonnenbrillen werden leicht geschnappt."],
      ["Aus der Distanz geniessen", "Sie sind wild, nicht zahm: beobachten und fotografieren, nicht nahern."],
    ],
    finalNote: "Sie sehen verspielt aus, aber ein Biss bedeutet Krankenhaus: Bewundern Sie die Makaken und lassen Sie sie in Ruhe.",
  },
  it: {
    kicker: "Fauna - altopiani sud-occidentali",
    titleMain: "Dove vedere",
    titleAccent: "le scimmie",
    intro: "I macachi selvatici degli altopiani sud-occidentali sono una delle sorprese piu belle dell'isola: osservali da distanza sicura e non dar loro mai da mangiare.",
    seeLabel: "Vedi",
    tipLabel: "Consiglio",
    spots: {
      "Black River Gorges Viewpoint": { name: "Belvedere delle gole di Black River", tag: "Belvedere - parco nazionale", region: "Altopiani sud-occidentali", see: "I gruppi si radunano vicino al parcheggio, alle ringhiere e agli alberi lungo la strada, spesso curiosi e veloci ad avvicinarsi.", tip: "Tieni il cibo nascosto - prevedi 20-40 min." },
      "Chamarel Viewpoint": { name: "Belvedere di Chamarel", tag: "Strade forestali", region: "Chamarel - Sud-Ovest", see: "Si vedono lungo le strade piu fresche e verdi degli altopiani e vicino alle aree panoramiche nel bosco.", tip: "Guida piano - le scimmie possono attraversare all'improvviso." },
      "Alexandra Falls Viewpoint": { name: "Belvedere delle cascate Alexandra", tag: "Belvedere cascata", region: "Plaine Champagne", see: "La foresta intorno rende questo un punto ideale: scimmie vicino al parcheggio, agli alberi e ai sentieri.", tip: "Non tenere cibo in mano mentre fai foto." },
      "Grand Bassin - Ganga Talao": { name: "Grand Bassin - Ganga Talao", tag: "Lago sacro", region: "Altopiani centrali", see: "I gruppi si muovono tra gli alberi intorno ai templi, al lago e ai parcheggi.", tip: "Vestiti con discrezione - tieni basso il rumore - vai presto." },
      "Black River Gorges National Park": { name: "Parco nazionale Black River Gorges", tag: "Parco nazionale", region: "Mauritius sud-occidentale", see: "La foresta piu grande dell'isola: cercale lungo le strade, ai margini del bosco, nelle aree picnic e ai belvedere.", tip: "Porta acqua e buone scarpe - il meteo cambia rapidamente." },
    },
    loopTitle: "Fai un anello negli altopiani",
    loopText: "Inizia da Grand Bassin, poi dalle cascate Alexandra, dal belvedere delle gole di Black River e da Chamarel: migliori avvistamenti e paesaggi in un solo giro.",
    rulesTitle: "Guarda, non toccare",
    rules: [
      ["Non dar loro da mangiare", "Tieni cibo e snack nascosti e chiusi."],
      ["Non toccare o provocare", "Tieni i bambini vicini e lascia spazio agli animali."],
      ["Metti al sicuro gli oggetti", "Borse, telefoni e occhiali vengono afferrati facilmente."],
      ["Osserva da lontano", "Sono selvatiche, non addomesticate: guarda e fotografa senza avvicinarti."],
    ],
    finalNote: "Possono sembrare giocose, ma un morso porta in ospedale: ammira i macachi e lasciali stare.",
  },
  es: {
    kicker: "Fauna - tierras altas del suroeste",
    titleMain: "Donde ver",
    titleAccent: "los monos",
    intro: "Los macacos salvajes de las tierras altas del suroeste son una de las sorpresas mas felices de la isla: disfrutalos desde una distancia segura y nunca los alimentes.",
    seeLabel: "Ver",
    tipLabel: "Consejo",
    spots: {
      "Black River Gorges Viewpoint": { name: "Mirador de las gargantas de Black River", tag: "Mirador - parque nacional", region: "Tierras altas del suroeste", see: "Los grupos se reunen junto al aparcamiento, barandillas y arboles de carretera; suelen ser curiosos y acercarse rapido.", tip: "Mantén la comida oculta - calcula 20-40 min." },
      "Chamarel Viewpoint": { name: "Mirador de Chamarel", tag: "Carreteras forestales", region: "Chamarel - Suroeste", see: "Se ven en las carreteras mas frescas y verdes de las tierras altas y cerca de zonas de mirador con bosque.", tip: "Conduce despacio - los monos pueden cruzar de repente." },
      "Alexandra Falls Viewpoint": { name: "Mirador de las cascadas Alexandra", tag: "Mirador de cascada", region: "Plaine Champagne", see: "El bosque alrededor hace de este un punto ideal: monos cerca del aparcamiento, arboles y senderos.", tip: "No tengas comida en la mano mientras haces fotos." },
      "Grand Bassin - Ganga Talao": { name: "Grand Bassin - Ganga Talao", tag: "Lago sagrado", region: "Tierras altas centrales", see: "Los grupos se mueven por los arboles alrededor de templos, lago y aparcamientos.", tip: "Viste con modestia - mantén poco ruido - ve temprano." },
      "Black River Gorges National Park": { name: "Parque nacional Black River Gorges", tag: "Parque nacional", region: "Suroeste de Mauricio", see: "El bosque mas grande de la isla: buscalos en bordes de carretera, limites del bosque, areas de picnic y miradores.", tip: "Lleva agua y buen calzado - el tiempo cambia rapido." },
    },
    loopTitle: "Haz un circuito por las tierras altas",
    loopText: "Empieza en Grand Bassin, luego por las cascadas Alexandra, el mirador de las gargantas de Black River y Chamarel: mejores avistamientos y paisajes en una ruta.",
    rulesTitle: "Mira, no toques",
    rules: [
      ["Nunca los alimentes", "Mantén comida y snacks ocultos y cerrados."],
      ["No toques ni provoques", "Mantén a los ninos cerca y dales espacio."],
      ["Asegura tus cosas", "Bolsos, telefonos y gafas se pueden arrebatar facilmente."],
      ["Disfruta desde lejos", "Son salvajes, no mansos: mira y fotografia sin acercarte."],
    ],
    finalNote: "Pueden parecer juguetones, pero una mordida implica hospital: admira los macacos y dejalos tranquilos.",
  },
  ru: {
    kicker: "Дикая природа - юго-западное нагорье",
    titleMain: "Где увидеть",
    titleAccent: "обезьян",
    intro: "Дикие макаки юго-западного нагорья - один из приятных сюрпризов острова: наблюдайте с безопасного расстояния и никогда не кормите их.",
    seeLabel: "Где смотреть",
    tipLabel: "Совет",
    spots: {
      "Black River Gorges Viewpoint": { name: "Смотровая площадка ущелий Блэк-Ривер", tag: "Смотровая - национальный парк", region: "Юго-западное нагорье", see: "Группы собираются у парковки, перил и деревьев у дороги; часто любопытны и быстро подходят.", tip: "Держите еду спрятанной - заложите 20-40 мин." },
      "Chamarel Viewpoint": { name: "Смотровая площадка Шамарель", tag: "Лесные дороги", region: "Шамарель - юго-запад", see: "Их видят вдоль более прохладных зеленых дорог нагорья и рядом с лесными смотровыми площадками.", tip: "Езжайте медленно - обезьяны могут внезапно перейти дорогу." },
      "Alexandra Falls Viewpoint": { name: "Смотровая площадка у водопада Александра", tag: "Смотровая у водопада", region: "Плен-Шампань", see: "Лес вокруг делает это место отличным: обезьяны рядом с парковкой, деревьями и тропами.", tip: "Не держите еду в руках, когда фотографируете." },
      "Grand Bassin - Ganga Talao": { name: "Гран-Бассен - Ганга-Талао", tag: "Священное озеро", region: "Центральное нагорье", see: "Группы перемещаются по деревьям вокруг храмов, озера и парковок.", tip: "Одевайтесь скромно - не шумите - приезжайте рано." },
      "Black River Gorges National Park": { name: "Национальный парк ущелий Блэк-Ривер", tag: "Национальный парк", region: "Юго-запад Маврикия", see: "Самый большой лес острова: ищите их у дорог, на опушках, в пикниковых зонах и на смотровых.", tip: "Возьмите воду и хорошую обувь - погода быстро меняется." },
    },
    loopTitle: "Сделайте кольцо по нагорью",
    loopText: "Начните с Гран-Бассена, затем посетите водопад Александра, смотровую площадку ущелий Блэк-Ривер и Шамарель: лучшие встречи и пейзажи за одну поездку.",
    rulesTitle: "Смотрите, не трогайте",
    rules: [
      ["Никогда не кормите", "Держите всю еду и снеки спрятанными и закрытыми."],
      ["Не трогайте и не дразните", "Держите детей рядом и оставляйте животным пространство."],
      ["Следите за вещами", "Сумки, телефоны и очки легко могут схватить."],
      ["Наблюдайте издалека", "Они дикие, не ручные: смотрите и фотографируйте, не подходите."],
    ],
    finalNote: "Они могут выглядеть игривыми, но укус означает поездку в больницу: любуйтесь макаками и не тревожьте их.",
  },
};

function getMonkeyPageCopy(locale: string) {
  return MONKEY_PAGE_COPY[locale as SupportedMonkeyLocale];
}

export default async function WhereToSeeMonkeysInMauritiusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const copy = getMonkeyPageCopy(activeLocale);
  const t = (text: string) => staticPageText(activeLocale, text);
  return localizeStaticPage((
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-7xl px-4 pt-24 pb-10 sm:px-6 lg:pt-28">
        <header>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-wide text-[#f16522]">
            {copy?.kicker ?? "Wildlife - South-West Highlands"}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.25rem,6vw,4rem)] font-bold leading-tight text-[#111d2a]">
            {copy?.titleMain ?? "Where to See"}{" "}
            <span className="font-serif font-normal italic text-[#f16522]">
              {copy?.titleAccent ?? "the Monkeys"}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            {copy?.intro ?? "The wild macaques of the southwest highlands are one of the island's happiest surprises - enjoy them from a safe distance, and never feed them."}
          </p>
        </header>

        <section className="mt-6 space-y-3">
          {monkeySpots.map((spot) => {
            const SpotIcon = spot.icon;
            const translatedSpot = copy?.spots[spot.name];
            const href = monkeySpotLinks[spot.name];

            return (
              <Link
                key={spot.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(36,54,67,.08)] sm:gap-5 sm:px-5"
              >
                <span
                  className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: spot.bg, color: spot.color }}
                >
                  <SpotIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-bold leading-tight text-[#152738] sm:text-xl">
                    {translatedSpot?.name ?? t(spot.name)}
                  </h2>
                  <p
                    className="mt-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: spot.color }}
                  >
                    {translatedSpot?.tag ?? t(spot.tag)}{" "}
                    <span className="normal-case tracking-normal text-[#8a9398]">
                      - {translatedSpot?.region ?? t(spot.region)}
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#000]">{copy?.seeLabel ?? t("See")}</strong>{" "}
                    {translatedSpot?.see ?? t(spot.see)}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#61707a] sm:text-sm">
                    <strong className="font-serif text-[#f16522]">{copy?.tipLabel ?? t("Tip")}</strong>{" "}
                    {translatedSpot?.tip ?? t(spot.tip)}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>

 
        <aside className="mt-4 flex gap-4 border-l-4 border-[#2f8e48] bg-[#eaf6ed] px-4 py-4 text-[#2f6f43] sm:items-center sm:px-5">
          <TreePalm className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
          <p className="text-xs leading-6 sm:text-sm">
            <strong className="font-serif text-[#1d5f34]">
              {copy?.loopTitle ?? "Make a highlands loop"}
            </strong>{" "}
            {copy?.loopText ?? "Start at Grand Bassin, then Alexandra Falls, Black River Gorges Viewpoint and Chamarel - best sightings and scenery in one drive."}
          </p>
        </aside>
       <section
          className="border-b border-gray-100 bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
          aria-label="Sponsored highlights"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
              <a
                href={ad.href}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <span className="relative block aspect-[1200/240] w-full">
                  <Image
                    src={ad.desktopSrc}
                    alt={ad.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="rounded-xl object-cover"
                    loading="lazy"
                  />
                </span>
              </a>
            </div>
          </div>
        </section>
        <section className="mt-6 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy?.rulesTitle ?? "Watch, don't touch"}
          </h2>
          <div className="mt-4 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {(copy?.rules ?? monkeyRules).map(([title, text]) => (
              <p key={title} className="text-xs leading-relaxed text-[#61707a] sm:text-sm">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f16522] align-middle" />
                <strong className="font-serif text-[#1d3144]">{title}</strong>{" "}
                - {text}
              </p>
            ))}
          </div>
          <p className="mt-4 font-serif text-sm italic leading-6 text-[#77848e]">
            {copy?.finalNote ?? "They may look playful, but a bite means a hospital trip - admire the macaques and let them be."}
          </p>
       
        </section>
      </article>
<PocketAdBanner />
<CarRentalAdBannerInfo />
      <PopularRoadTrips locale={activeLocale} />

      <Footer />
    </main>
  ), activeLocale);
}
