export interface SlideContent {
  image: string;
  title: string;
  subtitle: string;
}

export const FIRST_HERO_QUALITY = 74;
export const FIRST_HERO_WIDTHS = [480, 720, 960, 1280];

export const SLIDES: SlideContent[] = [
  {
    image: "/images/banners/le-morne-beach-resort-sunset-mauritius.jpg",
    title: "Travel & Adventure",
    subtitle: "All you need to plan your holidays in Mauritius Island",
  },
  {
    image: "/images/banners/horse-riding-le-morne-beach-mauritius.jpg",
    title: "Beauty of Discovery",
    subtitle: "Mauritius will amaze you with its rich culture and heritage",
  },
  {
    image: "/images/banners/surfing-barrel-wave-mauritius.jpg",
    title: "Paradise Awaits",
    subtitle: "Pristine beaches, lush mountains, and unforgettable experiences",
  },
];
