import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import { Link } from "@/i18n/navigation";
import {
  localizeStaticPage,
  staticPageText,
} from "@/lib/static-page-localizer";
import { normalizeLocale } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import { Anchor, Fish, Shell, ShieldCheck, Turtle, Waves } from "lucide-react";
import CarRentalAdBanner from "@/components/CarRentalAdBanner";
import PocketAdBanner from "@/components/PocketAdBanner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Swim with Sea Turtles in Mauritius",
  description:
    "Swim with sea turtles in Mauritius — where to snorkel with wild green and hawksbill turtles, the best lagoons, and how to do it safely and responsibly.",
  alternates: { canonical: "/swim-with-sea-turtles-in-mauritius" },
};

const turtleRegions = [
  ["North", "#2389c9"],
  ["West & South-West", "#f16522"],
  ["East & South", "#2f8e48"],
];

const turtleStyles = {
  North: "bg-[#eef8ff] text-[#2389c9]",
  "West & South-West": "bg-[#fff0e6] text-[#f16522]",
  "East & South": "bg-[#eaf6ed] text-[#2f8e48]",
};

const turtleSpotLinks = [
  "/beaches-in-mauritius/ilot-gabriel-ile-plate",
  "/beaches-in-mauritius/le-morne",
  "/beaches-in-mauritius/trou-aux-biches",
  "/beaches-in-mauritius/blue-bay",
  "/best-places-to-visit-in-mauritius/ile-aux-cerfs",
] as const;

const turtleSpots: {
  name: string;
  tag: string;
  region: string;
  type: "North" | "West & South-West" | "East & South";
  see: string;
  go: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Ile Plate (Flat Island)",
    tag: "Boat Trip",
    region: "North - Offshore",
    type: "North",
    see: "Remote island, clear water & healthy reefs - turtles often approach you.",
    go: "Boat excursion - quieter than the mainland.",
    icon: Turtle,
  },
  {
    name: "Le Morne Brabant",
    tag: "Shore Snorkel",
    region: "South-West",
    type: "West & South-West",
    see: "Shallow, calm lagoon with reef patches; frequent sightings by the coral.",
    go: "Swim from shore - go early for clear water.",
    icon: Turtle,
  },
  {
    name: "Trou aux Biches",
    tag: "Easy Lagoon",
    region: "North",
    type: "North",
    see: "A calm, beginners-friendly lagoon with a short swim out to the turtles' reef.",
    go: "Direct beach entry - best in the morning.",
    icon: Waves,
  },
  {
    name: "Blue Bay Marine Park",
    tag: "Marine Park",
    region: "South",
    type: "East & South",
    see: "A protected reserve - coral gardens, superb clarity and passing turtles.",
    go: "Take a guided tour - reef-safe sunscreen.",
    icon: Fish,
  },
  {
    name: "Ile aux Cerfs",
    tag: "Island Day Trip",
    region: "East",
    type: "East & South",
    see: "Clear lagoon with reef areas nearby - turtles among the snorkelling spots.",
    go: "Comes with most catamaran day trips.",
    icon: Shell,
  },
];

const extraSpots = [
  ["Belle Mare", "Quiet east-coast reef", "#2f8e48"],
  ["Flic en Flac", "Reef turtles when calm", "#f16522"],
  ["Mont Choisy", "Early-morning snorkel", "#2389c9"],
];

const respectTips = [
  ["Keep your distance", "Never touch or chase them."],
  ["Give them air", "Don't block their way up to breathe."],
  ["Don't feed them", "Let turtles behave naturally."],
  ["Reef-safe only", "Sunscreen that spares the coral."],
];

type SupportedTurtleLocale = "fr" | "de" | "it" | "es" | "ru";

const TURTLE_PAGE_COPY: Record<
  SupportedTurtleLocale,
  {
    kicker: string;
    titleMain: string;
    titleAccent: string;
    intro: string;
    regions: Record<string, string>;
    seeLabel: string;
    goLabel: string;
    spots: Record<
      string,
      { name: string; tag: string; region: string; see: string; go: string }
    >;
    extraTitle: string;
    extraSpots: Record<string, { name: string; detail: string }>;
    respectTitle: string;
    respectTips: [string, string][];
    finalNote: string;
  }
> = {
  fr: {
    kicker: "Récifs, lagons et vie marine",
    titleMain: "Nager avec",
    titleAccent: "les tortues marines",
    intro:
      "Où partager l'eau avec des tortues vertes et imbriquées sauvages, des lagons faciles depuis la plage aux récifs isolés accessibles en bateau.",
    regions: {
      North: "Nord",
      "West & South-West": "Ouest et sud-ouest",
      "East & South": "Est et sud",
    },
    seeLabel: "Voir",
    goLabel: "Y aller",
    spots: {
      "Ile Plate (Flat Island)": {
        name: "Tortues de l'île Plate",
        tag: "Sortie bateau",
        region: "Nord - au large",
        see: "Île isolée, eau claire et récifs sains; les tortues s'approchent souvent.",
        go: "Excursion en bateau - plus calme que la côte principale.",
      },
      "Le Morne Brabant": {
        name: "Lagon du Morne",
        tag: "Snorkeling depuis la plage",
        region: "Sud-ouest",
        see: "Lagon peu profond et calme avec zones récifales; observations fréquentes près du corail.",
        go: "Nage depuis la plage - allez tôt pour une eau claire.",
      },
      "Trou aux Biches": {
        name: "Récif de Trou aux Biches",
        tag: "Lagon facile",
        region: "Nord",
        see: "Un lagon calme, adapté aux débutants, avec une courte nage vers le récif des tortues.",
        go: "Entrée directe depuis la plage - meilleur le matin.",
      },
      "Blue Bay Marine Park": {
        name: "Parc marin de Blue Bay",
        tag: "Parc marin",
        region: "Sud",
        see: "Réserve protégée avec jardins coralliens, très belle clarté et tortues de passage.",
        go: "Prenez une sortie guidée - crème solaire respectueuse des récifs.",
      },
      "Ile aux Cerfs": {
        name: "Récifs de l'île aux Cerfs",
        tag: "Journée sur une île",
        region: "Est",
        see: "Lagon clair avec zones récifales proches; tortues parmi les spots de snorkeling.",
        go: "Inclus dans la plupart des sorties catamaran à la journée.",
      },
    },
    extraTitle: "À voir aussi",
    extraSpots: {
      "Belle Mare": {
        name: "Belle Mare",
        detail: "Récif calme de la côte est",
      },
      "Flic en Flac": {
        name: "Flic en Flac",
        detail: "Tortues de récif quand la mer est calme",
      },
      "Mont Choisy": { name: "Mont Choisy", detail: "Snorkeling tôt le matin" },
    },
    respectTitle: "Nager avec respect",
    respectTips: [
      ["Gardez vos distances", "Ne les touchez et ne les poursuivez jamais."],
      ["Laissez-les respirer", "Ne bloquez pas leur remontée pour respirer."],
      [
        "Ne les nourrissez pas",
        "Laissez les tortues se comporter naturellement.",
      ],
      [
        "Respectueux des récifs seulement",
        "Utilisez une crème solaire qui épargne le corail.",
      ],
    ],
    finalNote:
      "Il n'y a jamais de garantie avec les animaux sauvages, et c'est justement ce qui rend une vraie rencontre si spéciale.",
  },
  de: {
    kicker: "Riffe, Lagunen und Meeresleben",
    titleMain: "Schwimmen mit",
    titleAccent: "Meeresschildkröten",
    intro:
      "Wo man das Wasser mit wilden grünen Meeresschildkröten und Karettschildkröten teilt: von einfachen Strandlagunen bis zu abgelegenen Riffen per Boot.",
    regions: {
      North: "Norden",
      "West & South-West": "Westen und Südwesten",
      "East & South": "Osten und Süden",
    },
    seeLabel: "Sehen",
    goLabel: "Hin",
    spots: {
      "Ile Plate (Flat Island)": {
        name: "Schildkröten bei Île Plate",
        tag: "Bootsausflug",
        region: "Norden - vor der Küste",
        see: "Abgelegene Insel, klares Wasser und gesunde Riffe; Schildkröten kommen oft nahe.",
        go: "Bootsausflug - ruhiger als das Festland.",
      },
      "Le Morne Brabant": {
        name: "Lagune von Le Morne",
        tag: "Schnorcheln vom Strand",
        region: "Südwesten",
        see: "Flache, ruhige Lagune mit Riffstellen; häufige Sichtungen am Korallensaum.",
        go: "Vom Strand schwimmen - früh gehen für klares Wasser.",
      },
      "Trou aux Biches": {
        name: "Schildkrötenriff Trou aux Biches",
        tag: "Einfache Lagune",
        region: "Norden",
        see: "Ruhige, anfängerfreundliche Lagune mit kurzem Schwimmen zum Schildkrötenriff.",
        go: "Direkter Strandeinstieg - morgens am besten.",
      },
      "Blue Bay Marine Park": {
        name: "Meerespark Blue Bay",
        tag: "Meerespark",
        region: "Süden",
        see: "Geschütztes Reservat mit Korallengärten, sehr klarer Sicht und vorbeiziehenden Schildkröten.",
        go: "Geführte Tour nehmen - riffschonende Sonnencreme.",
      },
      "Ile aux Cerfs": {
        name: "Riffe der Île aux Cerfs",
        tag: "Inseltag",
        region: "Osten",
        see: "Klare Lagune mit nahen Riffbereichen; Schildkröten unter den Schnorchelspots.",
        go: "Bei den meisten Katamaran-Tagesausflügen dabei.",
      },
    },
    extraTitle: "Auch einen Blick wert",
    extraSpots: {
      "Belle Mare": { name: "Belle Mare", detail: "Ruhiges Ostküstenriff" },
      "Flic en Flac": {
        name: "Flic en Flac",
        detail: "Riffschildkröten bei ruhiger See",
      },
      "Mont Choisy": {
        name: "Mont Choisy",
        detail: "Schnorcheln am frühen Morgen",
      },
    },
    respectTitle: "Mit Respekt schwimmen",
    respectTips: [
      ["Abstand halten", "Niemals berühren oder verfolgen."],
      ["Luft lassen", "Den Weg nach oben zum Atmen nicht blockieren."],
      ["Nicht füttern", "Schildkröten natürlich handeln lassen."],
      ["Nur riffschonend", "Sonnencreme verwenden, die Korallen schont."],
    ],
    finalNote:
      "Bei wilden Tieren gibt es keine Garantie - genau das macht eine echte Begegnung so besonders.",
  },
  it: {
    kicker: "Barriere coralline, lagune e vita marina",
    titleMain: "Nuotare con",
    titleAccent: "le tartarughe marine",
    intro:
      "Dove condividere l'acqua con tartarughe verdi e embricate selvatiche, dalle lagune facili dalla spiaggia alle barriere coralline remote raggiunte in barca.",
    regions: {
      North: "Nord",
      "West & South-West": "Ovest e sud-ovest",
      "East & South": "Est e sud",
    },
    seeLabel: "Vedi",
    goLabel: "Vai",
    spots: {
      "Ile Plate (Flat Island)": {
        name: "Tartarughe all'isola Plate",
        tag: "Escursione in barca",
        region: "Nord - al largo della costa",
        see: "Isola remota, acqua chiara e barriere sane; le tartarughe spesso si avvicinano.",
        go: "Uscita in barca - più tranquilla rispetto alla costa principale.",
      },
      "Le Morne Brabant": {
        name: "Laguna del Morne",
        tag: "Snorkeling dalla riva",
        region: "Sud-ovest",
        see: "Laguna bassa e calma con zone di barriera corallina; avvistamenti frequenti vicino al corallo.",
        go: "Nuota dalla riva - vai presto per trovare acqua limpida.",
      },
      "Trou aux Biches": {
        name: "Barriera di Trou aux Biches",
        tag: "Laguna facile",
        region: "Nord",
        see: "Laguna calma e adatta ai principianti, con una breve nuotata fino alla barriera delle tartarughe.",
        go: "Ingresso diretto dalla spiaggia - meglio al mattino.",
      },
      "Blue Bay Marine Park": {
        name: "Parco marino di Blue Bay",
        tag: "Parco marino",
        region: "Sud",
        see: "Riserva protetta con giardini di corallo, grande visibilità e tartarughe di passaggio.",
        go: "Scegli un'escursione guidata - crema solare sicura per la barriera corallina.",
      },
      "Ile aux Cerfs": {
        name: "Barriere dell'isola aux Cerfs",
        tag: "Gita sull'isola",
        region: "Est",
        see: "Laguna limpida con barriere vicine; tartarughe tra i punti per lo snorkeling.",
        go: "Inclusa nella maggior parte delle gite in catamarano.",
      },
    },
    extraTitle: "Da considerare anche",
    extraSpots: {
      "Belle Mare": {
        name: "Belle Mare",
        detail: "Barriera tranquilla della costa est",
      },
      "Flic en Flac": {
        name: "Flic en Flac",
        detail: "Tartarughe della barriera quando il mare è calmo",
      },
      "Mont Choisy": {
        name: "Mont Choisy",
        detail: "Snorkeling nelle prime ore del mattino",
      },
    },
    respectTitle: "Nuota con rispetto",
    respectTips: [
      ["Mantieni la distanza", "Non toccarle e non inseguirle mai."],
      ["Lasciale respirare", "Non bloccare la risalita per respirare."],
      ["Non nutrirle", "Lascia che le tartarughe si comportino naturalmente."],
      ["Solo prodotti sicuri per i coralli", "Crema solare che rispetta il corallo."],
    ],
    finalNote:
      "Con gli animali selvatici non ci sono garanzie, ed è proprio questo che rende speciale un vero incontro.",
  },
  es: {
    kicker: "Arrecifes, lagunas y vida marina",
    titleMain: "Nadar con",
    titleAccent: "tortugas marinas",
    intro:
      "Donde compartir el agua con tortugas verdes y carey salvajes, desde lagunas fáciles junto a la playa hasta arrecifes remotos accesibles en barco.",
    regions: {
      North: "Norte",
      "West & South-West": "Oeste y suroeste",
      "East & South": "Este y sur",
    },
    seeLabel: "Ver",
    goLabel: "Ir",
    spots: {
      "Ile Plate (Flat Island)": {
        name: "Tortugas en Île Plate",
        tag: "Excursión en barco",
        region: "Norte - mar adentro",
        see: "Isla remota, agua clara y arrecifes sanos; las tortugas suelen acercarse.",
        go: "Excursión en barco - más tranquila que la costa principal.",
      },
      "Le Morne Brabant": {
        name: "Laguna de Le Morne",
        tag: "Snorkel desde la orilla",
        region: "Suroeste",
        see: "Laguna poco profunda y tranquila con zonas de arrecife; avistamientos frecuentes junto al coral.",
        go: "Nada desde la playa - ve temprano para agua clara.",
      },
      "Trou aux Biches": {
        name: "Arrecife de Trou aux Biches",
        tag: "Laguna fácil",
        region: "Norte",
        see: "Laguna tranquila y apta para principiantes, con un nado corto hasta el arrecife de tortugas.",
        go: "Entrada directa desde la playa - mejor por la mañana.",
      },
      "Blue Bay Marine Park": {
        name: "Parque marino Blue Bay",
        tag: "Parque marino",
        region: "Sur",
        see: "Reserva protegida con jardines coralinos, gran claridad y tortugas de paso.",
        go: "Toma un tour guiado - protector solar seguro para arrecifes.",
      },
      "Ile aux Cerfs": {
        name: "Arrecifes de Île aux Cerfs",
        tag: "Día de isla",
        region: "Este",
        see: "Laguna clara con zonas de arrecife cercanas; tortugas entre los puntos de snorkel.",
        go: "Incluido en la mayoría de excursiones de catamarán.",
      },
    },
    extraTitle: "También merece una mirada",
    extraSpots: {
      "Belle Mare": {
        name: "Belle Mare",
        detail: "Arrecife tranquilo de la costa este",
      },
      "Flic en Flac": {
        name: "Flic en Flac",
        detail: "Tortugas de arrecife cuando el mar está calmado",
      },
      "Mont Choisy": {
        name: "Mont Choisy",
        detail: "Snorkel temprano por la mañana",
      },
    },
    respectTitle: "Nada con respeto",
    respectTips: [
      ["Mantén la distancia", "Nunca las toques ni persigas."],
      ["Dales aire", "No bloquees su camino para subir a respirar."],
      ["No las alimentes", "Deja que las tortugas se comporten naturalmente."],
      ["Solo seguro para arrecifes", "Protector solar que no daña el coral."],
    ],
    finalNote:
      "No hay garantías con animales salvajes, y eso es exactamente lo que hace tan especial un encuentro real.",
  },
  ru: {
    kicker: "Рифы, лагуны и морская жизнь",
    titleMain: "Плавание с",
    titleAccent: "морскими черепахами",
    intro:
      "Где разделить воду с дикими зелеными и биссовыми черепахами: от простых лагун у пляжа до удаленных рифов, доступных на лодке.",
    regions: {
      North: "Север",
      "West & South-West": "Запад и юго-запад",
      "East & South": "Восток и юг",
    },
    seeLabel: "Где смотреть",
    goLabel: "Как ехать",
    spots: {
      "Ile Plate (Flat Island)": {
        name: "Черепахи у Иль-Плат",
        tag: "Лодочная экскурсия",
        region: "Север - у берега",
        see: "Удаленный остров, чистая вода и здоровые рифы; черепахи часто подплывают близко.",
        go: "Экскурсия на лодке - спокойнее, чем у основного берега.",
      },
      "Le Morne Brabant": {
        name: "Лагуна Ле-Морн",
        tag: "Сноркелинг с берега",
        region: "Юго-запад",
        see: "Мелкая спокойная лагуна с участками рифа; частые встречи у кораллов.",
        go: "Плывите с берега - приезжайте рано для прозрачной воды.",
      },
      "Trou aux Biches": {
        name: "Черепаший риф Тру-о-Биш",
        tag: "Легкая лагуна",
        region: "Север",
        see: "Спокойная лагуна для начинающих с коротким заплывом к черепашьему рифу.",
        go: "Прямой вход с пляжа - лучше утром.",
      },
      "Blue Bay Marine Park": {
        name: "Морской парк Блю-Бэй",
        tag: "Морской парк",
        region: "Юг",
        see: "Охраняемый заповедник: коралловые сады, отличная видимость и проходящие черепахи.",
        go: "Возьмите тур с гидом - используйте крем, безопасный для рифов.",
      },
      "Ile aux Cerfs": {
        name: "Рифы Иль-о-Серф",
        tag: "День на острове",
        region: "Восток",
        see: "Чистая лагуна с близкими рифами; черепахи встречаются среди мест для сноркелинга.",
        go: "Есть в большинстве дневных катамаран-туров.",
      },
    },
    extraTitle: "Также стоит посмотреть",
    extraSpots: {
      "Belle Mare": {
        name: "Belle Mare",
        detail: "Тихий риф восточного побережья",
      },
      "Flic en Flac": {
        name: "Flic en Flac",
        detail: "Рифовые черепахи в спокойную погоду",
      },
      "Mont Choisy": { name: "Mont Choisy", detail: "Сноркелинг ранним утром" },
    },
    respectTitle: "Плавайте с уважением",
    respectTips: [
      ["Держите дистанцию", "Никогда не трогайте и не преследуйте их."],
      ["Дайте им воздух", "Не перекрывайте путь наверх для дыхания."],
      ["Не кормите", "Позвольте черепахам вести себя естественно."],
      ["Только безопасно для рифов", "Солнцезащитный крем, который бережет кораллы."],
    ],
    finalNote:
      "С дикими животными нет гарантий - именно это делает настоящую встречу такой особенной.",
  },
};

function getTurtlePageCopy(locale: string) {
  const activeLocale = normalizeLocale(locale);
  return TURTLE_PAGE_COPY[activeLocale as SupportedTurtleLocale];
}

export default async function SwimWithSeaTurtlesInMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = normalizeLocale(locale);
  const copy = getTurtlePageCopy(activeLocale);
  const t = (text: string) => staticPageText(activeLocale, text);
  return localizeStaticPage(
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-5xl px-4 pt-24 pb-20 sm:px-6 lg:pt-28">
        <header>
          {/* <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-[#ec5f25]">
            <div className="flex items-center gap-2 normal-case tracking-normal">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f16522] text-white">
                <Anchor className="h-4 w-4 fill-white" strokeWidth={2} />
              </span>
              <span className="border-b border-[#f16522] text-[13px] font-bold text-[#1d3144]">
                Mauritius<span className="text-[#f16522]">Explored</span>
              </span>
            </div>
            <p>Wildlife - Ocean</p>
          </div> */}

          <p className="mt-8 text-[11px] font-bold uppercase tracking-wide text-[#f16522]">
            {copy?.kicker ?? "Reefs, Lagoons & Marine Life"}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(2.4rem,6vw,4rem)] font-bold leading-tight text-[#111d2a]">
            {copy?.titleMain ?? "Swim with"}{" "}
            <span className="font-serif font-normal italic text-[#f16522]">
              {copy?.titleAccent ?? "Sea Turtles"}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            {copy?.intro ??
              "Where to share the water with wild green and hawksbill turtles - from easy lagoons off the beach to remote reefs reached by boat."}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#445465]">
            {turtleRegions.map(([label, color]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {copy?.regions[label] ?? t(label)}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-6 space-y-3">
          {turtleSpots.map(
            ({ name, tag, region, type, see, go, icon: Icon }, index) => {
              const translatedSpot = copy?.spots[name];
              const href = turtleSpotLinks[index];
              return (
                <div
                  key={name}
                  className="flex gap-4 rounded-md border border-[#e7dfd6] bg-white px-4 py-4 shadow-[0_2px_7px_rgba(36,54,67,.035)] sm:gap-5 sm:px-5"
                >
                  <span
                    className={`mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full ${turtleStyles[type]}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold leading-tight text-[#111d2a]">
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-[#f16522]"
                      >
                        {translatedSpot?.name ?? t(name)}
                      </Link>
                    </h2>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#2389c9]">
                      {translatedSpot?.tag ?? t(tag)}
                      <span className="font-serif font-normal normal-case tracking-normal text-[#7c8791]">
                        {" "}
                        - {translatedSpot?.region ?? t(region)}
                      </span>
                    </p>
                    <p className="mt-2 font-serif text-sm leading-6 text-[#5b6975]">
                      <span className="font-bold text-[#000]">
                        {copy?.seeLabel ?? t("See")}
                      </span>{" "}
                      {translatedSpot?.see ?? t(see)}
                    </p>
                    <p className="mt-1 font-serif text-sm italic leading-6 text-[#6d7b85]">
                      <span className="font-bold text-[#f16522]">
                        {copy?.goLabel ?? t("Go")}
                      </span>{" "}
                      {translatedSpot?.go ?? t(go)}
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </section>

        <section className="mt-3 rounded-md border border-[#e7dfd6] bg-white px-4 py-3 sm:px-5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#2f8e48]">
            {copy?.extraTitle ?? "Also Worth a Look"}
          </p>
          <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
            {extraSpots.map(([name, detail, color]) => (
              <p key={name} className="font-serif text-[#5b6975]">
                <span
                  className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-bold text-[#111d2a]">
                  {copy?.extraSpots[name]?.name ?? t(name)}
                </span>{" "}
                - {copy?.extraSpots[name]?.detail ?? t(detail)}
              </p>
            ))}
          </div>
        </section>
        <CarRentalAdBanner />
        <section className="mt-6 rounded-md bg-[#f5f3ef] px-5 py-5 sm:px-6">
          <h2 className="font-serif text-xl font-bold text-[#f16522]">
            {copy?.respectTitle ?? "Swim with respect"}
          </h2>
          <div className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {(copy?.respectTips ?? respectTips).map(([title, text]) => (
              <p
                key={title}
                className="font-serif text-sm leading-6 text-[#5b6975]"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f16522] align-middle" />
                <span className="font-bold text-[#111d2a]">{title}</span> -{" "}
                {text}
              </p>
            ))}
          </div>
          <p className="mt-4 font-serif text-sm italic leading-6 text-[#77848e]">
            {copy?.finalNote ??
              "There are no guarantees with wild animals - and that's exactly what makes a real encounter so special."}
          </p>
        </section>
      </article>

      <PopularRoadTrips locale={activeLocale} />
      <PocketAdBanner />
      <Footer />
    </main>,
    activeLocale,
  );
}
