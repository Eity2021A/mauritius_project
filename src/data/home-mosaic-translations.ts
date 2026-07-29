import type { AppLocale } from "@/i18n/routing";

export const HOME_MOSAIC_TRANSLATIONS: Record<
  AppLocale,
  {
    kicker: string;
    title: string;
    subtitle: string;
  }
> = {
  en: {
    kicker: "Empowering sustainable tourism & travel for Mauritius",
    title: "Best of Mauritius Island 2026",
    subtitle: "All The Inspiration You Need To Start Planning Your Next Adventure",
  },
  fr: {
    kicker: "Pour un tourisme durable et des voyages responsables à Maurice",
    title: "Le meilleur de l'île Maurice 2026",
    subtitle:
      "Toute l'inspiration nécessaire pour commencer à planifier votre prochaine aventure",
  },
  de: {
    kicker: "Für nachhaltigen Tourismus und Reisen auf Mauritius",
    title: "Das Beste von Mauritius 2026",
    subtitle: "Die Inspiration, die Sie brauchen, um Ihr nächstes Abenteuer zu planen",
  },
  it: {
    kicker: "Per un turismo sostenibile e viaggi responsabili a Mauritius",
    title: "Il meglio dell'isola di Mauritius 2026",
    subtitle:
      "Tutta l'ispirazione che ti serve per iniziare a pianificare la tua prossima avventura",
  },
  es: {
    kicker: "Impulsando el turismo sostenible y los viajes responsables en Mauricio",
    title: "Lo mejor de la isla de Mauricio 2026",
    subtitle:
      "Toda la inspiración que necesitas para empezar a planificar tu próxima aventura",
  },
  ru: {
    kicker: "Развиваем устойчивый туризм и путешествия на Маврикии",
    title: "Лучшее на острове Маврикий 2026",
    subtitle:
      "Все идеи и вдохновение, чтобы начать планировать следующее приключение",
  },
};
