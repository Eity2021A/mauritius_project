import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import PopularRoadTrips from "@/components/PopularRoadTrips";
import {
  localizeStaticPage,
  staticPageText,
} from "@/lib/static-page-localizer";
import type { LucideIcon } from "lucide-react";
import { Fish, MapPin, ShipWheel, Waves } from "lucide-react";
import CarRentalAdBannerInfo from "@/components/CarRentalAdBannerInfo";
import PocketAdBanner from "@/components/PocketAdBanner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Where to See Whales and Dolphins in Mauritius",
  description:
    "Whales and dolphins in Mauritius — swim with wild spinner dolphins and watch for whales off the west coast at Tamarin and Black River. When and how to go.",
  alternates: { canonical: "/whales-and-dolphins-in-mauritius" },
};

const ad = {
  desktopSrc:"/images/quick-trips/Swim-with-dolphins-in-Mauritius-Best-Prices.webp",
  href: "#",
  alt: "Swim with dolphins in Mauritius Best Prices",
};
const encounters: {
  title: string;
  label: string;
  icon: LucideIcon;
  color: string;
  rows: [string, string][];
}[] = [
  {
    title: "Swim with Dolphins",
    label: "Spinner & bottlenose - west coast",
    icon: Waves,
    color: "#1599a8",
    rows: [
      ["Where", "Black River - Tamarin - Le Morne"],
      ["When", "~6 AM start - year round - calm seas"],
      ["Trip", "2-3 hr private speedboat from La Balise Marina"],
      ["Swim", "in the water only when the crew says it's safe"],
    ],
  },
  {
    title: "Whale Watching",
    label: "Sperm & humpback whales - deep water",
    icon: ShipWheel,
    color: "#1d7aa8",
    rows: [
      ["Whales", "Sperm year round - humpbacks Jul-Sep"],
      ["Where", "Deep water off Tamarin & Black River"],
      ["When", "Early morning, when the ocean is calmest"],
      ["Note", "Observe only - swimming with whales is banned"],
    ],
  },
];

const encounterLinks = [
  "/top-activities-mauritius/dolphins-and-whales-excursion",
  "/top-activities-mauritius/swim-with-dolphins-west-coast",
] as const;

const quickTips = [
  ["Best season", "Dolphins all year - humpback whales Jul-Sep."],
  ["Start at dawn", "6 AM departures catch the calmest, clearest sea."],
  ["Bring", "Sun protection, a zoom camera & seasickness tabs."],
];

const goldenRules = [
  "Never touch, chase or feed the animals.",
  "No splashing, shouting or aggressive swimming.",
  "Don’t block their path — let them come to you.",
  "Enter the water only on the crew’s word.",
  "Choose ethical, licensed operators.",
  "Swimming with whales is prohibited by law.",
];

type SupportedWhaleLocale = "fr" | "de" | "it" | "es" | "ru";

const WHALE_PAGE_COPY: Record<
  SupportedWhaleLocale,
  {
    kicker: string;
    titleWhales: string;
    titleDolphins: string;
    intro: string;
    mapAlt: string;
    mapCaption: string;
    encounters: {
      title: string;
      label: string;
      rows: [string, string][];
    }[];
    quickTips: [string, string][];
    rulesTitle: string;
    goldenRules: string[];
  }
> = {
  fr: {
    kicker: "Rencontres marines sauvages",
    titleWhales: "Baleines",
    titleDolphins: "& dauphins",
    intro:
      "A l'aube sur la cote ouest, nagez pres des dauphins sauvages et observez les baleines dans les eaux profondes au large de Tamarin et Black River.",
    mapAlt:
      "Carte indiquant les zones de dauphins et de baleines sur la cote ouest",
    mapCaption: "Cote ouest - Black River, Tamarin et Le Morne",
    encounters: [
      {
        title: "Nager avec les dauphins",
        label: "Dauphins a long bec et grands dauphins - cote ouest",
        rows: [
          ["Ou", "Black River - Tamarin - Le Morne"],
          ["Quand", "Depart vers 6 h - toute l'annee - mer calme"],
          ["Sortie", "2 a 3 h en speedboat prive depuis La Balise Marina"],
          [
            "Nage",
            "Entrez dans l'eau seulement quand l'equipage dit que c'est sur",
          ],
        ],
      },
      {
        title: "Observation des baleines",
        label: "Cachalots et baleines a bosse - eaux profondes",
        rows: [
          [
            "Baleines",
            "Cachalots toute l'annee - baleines a bosse juil.-sept.",
          ],
          ["Ou", "Eaux profondes au large de Tamarin et Black River"],
          ["Quand", "Tot le matin, quand l'ocean est le plus calme"],
          [
            "Note",
            "Observation seulement - nager avec les baleines est interdit",
          ],
        ],
      },
    ],
    quickTips: [
      [
        "Meilleure saison",
        "Dauphins toute l'annee - baleines a bosse juil.-sept.",
      ],
      [
        "Partir a l'aube",
        "Les departs a 6 h profitent de la mer la plus calme et claire.",
      ],
      [
        "A apporter",
        "Protection solaire, appareil photo avec zoom et cachets contre le mal de mer.",
      ],
    ],
    rulesTitle: "Les regles d'or d'une rencontre sauvage",
    goldenRules: [
      "Ne touchez, poursuivez ou nourrissez jamais les animaux.",
      "Pas d'eclaboussures, de cris ni de nage agressive.",
      "Ne bloquez pas leur chemin - laissez-les venir a vous.",
      "Entrez dans l'eau uniquement sur instruction de l'equipage.",
      "Choisissez des operateurs ethique et licencies.",
      "Nager avec les baleines est interdit par la loi.",
    ],
  },
  de: {
    kicker: "Wilde Meeresbegegnungen",
    titleWhales: "Wale",
    titleDolphins: "& Delfine",
    intro:
      "Bei Sonnenaufgang an der Westkuste schwimmen Sie neben wilden Spinnerdelfinen und beobachten Wale im tiefen Wasser vor Tamarin und Black River.",
    mapAlt: "Karte mit Delfin- und Walgebieten an der Westkuste",
    mapCaption: "Westkuste - Black River, Tamarin und Le Morne",
    encounters: [
      {
        title: "Mit Delfinen schwimmen",
        label: "Spinner- und Grosse Tümmler - Westkuste",
        rows: [
          ["Wo", "Black River - Tamarin - Le Morne"],
          ["Wann", "Start ca. 6 Uhr - ganzjahrig - ruhige See"],
          ["Tour", "2-3 Std. privates Speedboat ab La Balise Marina"],
          ["Schwimmen", "Nur ins Wasser gehen, wenn die Crew es erlaubt"],
        ],
      },
      {
        title: "Walbeobachtung",
        label: "Pottwale und Buckelwale - tiefes Wasser",
        rows: [
          ["Wale", "Pottwale ganzjahrig - Buckelwale Juli-Sept."],
          ["Wo", "Tiefes Wasser vor Tamarin und Black River"],
          ["Wann", "Fruh morgens, wenn der Ozean am ruhigsten ist"],
          ["Hinweis", "Nur beobachten - Schwimmen mit Walen ist verboten"],
        ],
      },
    ],
    quickTips: [
      ["Beste Saison", "Delfine ganzjahrig - Buckelwale Juli-Sept."],
      [
        "Bei Tagesanbruch starten",
        "Abfahrten um 6 Uhr erwischen die ruhigste und klarste See.",
      ],
      [
        "Mitnehmen",
        "Sonnenschutz, Kamera mit Zoom und Tabletten gegen Seekrankheit.",
      ],
    ],
    rulesTitle: "Die goldenen Regeln einer wilden Begegnung",
    goldenRules: [
      "Tiere niemals berühren, jagen oder füttern.",
      "Kein Spritzen, Rufen oder aggressives Schwimmen.",
      "Den Weg nicht blockieren - lassen Sie sie zu Ihnen kommen.",
      "Nur auf Anweisung der Crew ins Wasser gehen.",
      "Ethische, lizenzierte Anbieter wählen.",
      "Schwimmen mit Walen ist gesetzlich verboten.",
    ],
  },
  it: {
    kicker: "Incontri marini selvatici",
    titleWhales: "Balene",
    titleDolphins: "& delfini",
    intro:
      "All'alba sulla costa ovest, nuota vicino ai delfini selvatici e osserva le balene nelle acque profonde al largo di Tamarin e Black River.",
    mapAlt: "Mappa delle zone di delfini e balene sulla costa ovest",
    mapCaption: "Costa ovest - Black River, Tamarin e Le Morne",
    encounters: [
      {
        title: "Nuotare con i delfini",
        label: "Spinner e tursiopi - costa ovest",
        rows: [
          ["Dove", "Black River - Tamarin - Le Morne"],
          ["Quando", "Partenza verso le 6 - tutto l'anno - mare calmo"],
          ["Tour", "2-3 ore in motoscafo privato da La Balise Marina"],
          [
            "Nuoto",
            "Entra in acqua solo quando l'equipaggio dice che e sicuro",
          ],
        ],
      },
      {
        title: "Osservazione delle balene",
        label: "Capodogli e megattere - acque profonde",
        rows: [
          ["Balene", "Capodogli tutto l'anno - megattere lug.-set."],
          ["Dove", "Acque profonde al largo di Tamarin e Black River"],
          ["Quando", "Mattina presto, quando l'oceano e piu calmo"],
          ["Nota", "Solo osservazione - nuotare con le balene e vietato"],
        ],
      },
    ],
    quickTips: [
      ["Stagione migliore", "Delfini tutto l'anno - megattere lug.-set."],
      [
        "Parti all'alba",
        "Le partenze alle 6 trovano il mare piu calmo e limpido.",
      ],
      [
        "Porta",
        "Protezione solare, fotocamera con zoom e compresse per il mal di mare.",
      ],
    ],
    rulesTitle: "Le regole d'oro di un incontro selvatico",
    goldenRules: [
      "Non toccare, inseguire o nutrire gli animali.",
      "Niente schizzi, urla o nuoto aggressivo.",
      "Non bloccare il loro percorso: lascia che si avvicinino loro.",
      "Entra in acqua solo su indicazione dell'equipaggio.",
      "Scegli operatori etici e autorizzati.",
      "Nuotare con le balene e vietato dalla legge.",
    ],
  },
  es: {
    kicker: "Encuentros marinos salvajes",
    titleWhales: "Ballenas",
    titleDolphins: "& delfines",
    intro:
      "Al amanecer en la costa oeste, nada junto a delfines salvajes y observa ballenas en aguas profundas frente a Tamarin y Black River.",
    mapAlt: "Mapa con zonas de delfines y ballenas en la costa oeste",
    mapCaption: "Costa oeste - Black River, Tamarin y Le Morne",
    encounters: [
      {
        title: "Nadar con delfines",
        label: "Delfines giradores y mulares - costa oeste",
        rows: [
          ["Donde", "Black River - Tamarin - Le Morne"],
          ["Cuando", "Salida sobre las 6 - todo el ano - mar tranquilo"],
          ["Excursion", "2-3 h en lancha privada desde La Balise Marina"],
          ["Nado", "Entra al agua solo cuando la tripulacion lo indique"],
        ],
      },
      {
        title: "Avistamiento de ballenas",
        label: "Cachalotes y ballenas jorobadas - aguas profundas",
        rows: [
          ["Ballenas", "Cachalotes todo el ano - jorobadas jul.-sep."],
          ["Donde", "Aguas profundas frente a Tamarin y Black River"],
          ["Cuando", "Temprano por la manana, con el oceano mas calmado"],
          ["Nota", "Solo observar - nadar con ballenas esta prohibido"],
        ],
      },
    ],
    quickTips: [
      ["Mejor temporada", "Delfines todo el ano - jorobadas jul.-sep."],
      [
        "Empieza al amanecer",
        "Las salidas de las 6 aprovechan el mar mas calmado y claro.",
      ],
      ["Lleva", "Proteccion solar, camara con zoom y pastillas para el mareo."],
    ],
    rulesTitle: "Las reglas de oro de un encuentro salvaje",
    goldenRules: [
      "Nunca toques, persigas ni alimentes a los animales.",
      "No salpiques, grites ni nades de forma agresiva.",
      "No bloquees su camino: deja que se acerquen ellos.",
      "Entra al agua solo cuando lo diga la tripulacion.",
      "Elige operadores eticos y autorizados.",
      "Nadar con ballenas esta prohibido por ley.",
    ],
  },
  ru: {
    kicker: "Дикие морские встречи",
    titleWhales: "Киты",
    titleDolphins: "& дельфины",
    intro:
      "На рассвете у западного побережья можно плыть рядом с дикими дельфинами и наблюдать китов в глубоких водах у Tamarin и Black River.",
    mapAlt: "Карта зон дельфинов и китов на западном побережье",
    mapCaption: "Западное побережье - Black River, Tamarin и Le Morne",
    encounters: [
      {
        title: "Плавание с дельфинами",
        label: "Дельфины-спиннеры и афалины - западное побережье",
        rows: [
          ["Где", "Black River - Tamarin - Le Morne"],
          ["Когда", "Старт около 6:00 - круглый год - спокойное море"],
          ["Тур", "2-3 часа на частном спидботе от La Balise Marina"],
          [
            "Плавание",
            "Входите в воду только когда экипаж скажет, что безопасно",
          ],
        ],
      },
      {
        title: "Наблюдение за китами",
        label: "Кашалоты и горбатые киты - глубокая вода",
        rows: [
          ["Киты", "Кашалоты круглый год - горбатые киты июль-сент."],
          ["Где", "Глубокая вода у Tamarin и Black River"],
          ["Когда", "Рано утром, когда океан самый спокойный"],
          ["Важно", "Только наблюдение - плавать с китами запрещено"],
        ],
      },
    ],
    quickTips: [
      ["Лучший сезон", "Дельфины круглый год - горбатые киты июль-сент."],
      [
        "Старт на рассвете",
        "Отправления в 6:00 дают самое спокойное и прозрачное море.",
      ],
      [
        "Возьмите",
        "Защиту от солнца, камеру с зумом и таблетки от морской болезни.",
      ],
    ],
    rulesTitle: "Золотые правила дикой встречи",
    goldenRules: [
      "Никогда не трогайте, не преследуйте и не кормите животных.",
      "Не брызгайтесь, не кричите и не плывите агрессивно.",
      "Не перекрывайте им путь - пусть они сами подплывут.",
      "Входите в воду только по команде экипажа.",
      "Выбирайте этичных лицензированных операторов.",
      "Плавание с китами запрещено законом.",
    ],
  },
};

function getWhalePageCopy(locale: string) {
  return WHALE_PAGE_COPY[locale as SupportedWhaleLocale];
}

export default async function WhalesAndDolphinsInMauritiusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageCopy = getWhalePageCopy(locale);
  const t = (text: string) => staticPageText(locale, text);
  const translatedEncounters =
    pageCopy?.encounters ??
    encounters.map((item) => ({
      ...item,
      title: t(item.title),
      label: t(item.label),
      rows: item.rows.map(
        ([term, detail]) => [t(term), t(detail)] as [string, string],
      ),
    }));
  const translatedQuickTips =
    pageCopy?.quickTips ??
    quickTips.map(([title, text]) => [t(title), t(text)] as [string, string]);
  const translatedGoldenRules = pageCopy?.goldenRules ?? goldenRules.map(t);

  return localizeStaticPage(
    <main id="main-content" className="min-h-screen bg-white text-[#1c2a2e]">
      <Navbar />

      <article className="mx-auto w-full max-w-7xl px-0 pt-24 pb-10 sm:px-6 lg:pt-28">
        <header>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-wide text-[#f16522]">
            {pageCopy?.kicker ?? "Wild Marine Encounters"}
          </p>
          <h1 className="mt-2 font-serif text-[clamp(1.5rem,6vw,2.4rem)] sm:text-[clamp(2.4rem,6vw,3rem)] font-bold leading-tight text-[#111d2a]">
            {pageCopy?.titleWhales ?? "Whales"}{" "}
            <span className="font-serif font-normal italic text-[#f16522]">
              {pageCopy?.titleDolphins ?? "& Dolphins"}
            </span>
          </h1>
          <p className="mt-4 max-w-4xl font-serif text-sm italic leading-7 text-[#687887] sm:text-base">
            {pageCopy?.intro ??
              "Dawn on the west coast - swim beside wild spinner dolphins and watch for whales in the deep water off Tamarin and Black River."}
          </p>
        </header>

        <section className="mt-8 grid gap-7 lg:grid-cols-[1fr_.58fr] lg:items-start">
          <div className="space-y-5">
            {translatedEncounters.map(({ title, label, rows }, index) => {
              const Icon = encounters[index]?.icon ?? Waves;
              const color = encounters[index]?.color ?? "#1599a8";
              return (
                <Link
                  key={title}
                  href={encounterLinks[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-[#e7dfd6] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(36,54,67,.045)] transition-colors hover:border-[#1599a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1599a8] sm:px-6"
                >
                  <div className="flex items-center gap-5">
                    <span
                      className="mt-1 grid h-14 w-14 shrink-0 place-items-center rounded-md text-white"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="h-8 w-8" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight text-[#111d2a]">
                        {title}
                      </h2>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#1599a8]">
                        {label}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-5 space-y-3">
                    {rows.map(([term, detail]) => (
                      <div
                        key={term}
                        className="grid gap-1 font-serif text-sm leading-6 text-[#5f6f7b] sm:grid-cols-[86px_1fr]"
                      >
                        <dt className="text-[11px] font-bold tracking-wide text-[#2389c9]">
                          {term}
                        </dt>
                        <dd>{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              );
            })}
          </div>

          <aside className="grid gap-4">
            <figure className="mx-auto w-full max-w-[330px]">
              <Image
                src="/images/quick-trips/whales_&_dolphins.png"
                alt={
                  pageCopy?.mapAlt ??
                  "Map marking west coast dolphin and whale areas"
                }
                width={1196}
                height={1200}
                className="h-auto w-full"
                priority
              />
              <figcaption className="mt-2 text-center font-serif text-xs italic text-[#8a8f91]">
                {pageCopy?.mapCaption ??
                  "West coast - Black River, Tamarin & Le Morne"}
              </figcaption>
            </figure>

            {translatedQuickTips.map(([title, text]) => (
              <section
                key={title}
                className="rounded-md bg-[#f5f2ef] px-5 py-5"
              >
                <h2 className="font-serif text-lg font-bold text-[#f16522]">
                  {title}
                </h2>
                <p className="mt-3 font-serif text-xs leading-6 text-[#61707a] sm:text-sm">
                  {text}
                </p>
              </section>
            ))}
          </aside>
        </section>

        <section
          className=" bg-white py-3 md:py-5 dark:border-neutral-800 dark:bg-neutral-900"
          aria-label="Sponsored highlights"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-xl bg-[#052028] shadow-sm ring-1 ring-gray-200 dark:ring-neutral-700">
              <a
                href={ad.href}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <span className="relative block aspect-[1200/260] w-full">
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

        <section className="mt-10 rounded-md bg-[#f5f2ef] px-5 py-6 sm:px-7">
          <div className="flex items-center gap-3">
            <Fish className="h-5 w-5 text-[#f16522]" strokeWidth={2} />
            <h2 className="font-serif text-2xl font-bold text-[#f16522]">
              {pageCopy?.rulesTitle ?? "The golden rules of a wild encounter"}
            </h2>
          </div>
          <div className="mt-5 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {translatedGoldenRules.map((rule) => (
              <p
                key={rule}
                className="font-serif text-sm leading-6 text-[#5b6975]"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f16522] align-middle" />
                {rule}
              </p>
            ))}
          </div>
        </section>
      </article>
      <PocketAdBanner />
      <CarRentalAdBannerInfo />
      <PopularRoadTrips locale={locale} />

      <Footer />
    </main>,
    locale,
  );
}
