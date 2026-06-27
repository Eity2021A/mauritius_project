/**
 * Comprehensive place details for individual place pages
 * Data sourced from mauritiusexplored.com
 */

import { Region, Coordinates, PlaceCategory } from "@/types/content";

export interface PlaceDetails {
  slug: string;
  name: string;
  region: Region;
  coordinates: Coordinates;
  categories: PlaceCategory[];
  tagline: string;
  description: string[];
  tips: string[];
  images: string[];
  heroImage?: string;
  info: {
    location: string;
    openHours?: string;
    admission?: string;
    bestTime?: string;
  };
}

export const PLACE_DETAILS: Record<string, PlaceDetails> = {
  // ============ WATERFALLS ============
  "cascade-leon": {
    slug: "cascade-leon",
    name: "Cascade Leon",
    region: "South",
    coordinates: [-20.498, 57.518],
    categories: ["nature", "waterfalls", "hideaways"],
    tagline: "If you love waterfalls as much as we do, this is a 'not-to-be-missed'!",
    description: [
      "Cascade Leon is deep in the sugarcane fields in the South. Strolling around this wondrously imaginative setting, you'll find it hard to believe you're on planet Earth!",
      "The surroundings of the waterfalls depict a real jungle book and promise tranquility and peacefulness while you enjoy one of the best places to see in Mauritius."
    ],
    tips: [
      "Low clearance car not advised to go there – rocky road",
      "Visit Gris Gris after"
    ],
    images: [
      "cascade-leon-view-point.jpg",
      "cascade-leon-in-the-south.jpg",
      "cascade-leon-swing-rope.jpg",
      "cascade-leon-start-trail.jpg",
      "leon-waterfall.jpg"
,
      "leon-1.jpg",
      "leon-2.jpg",
      "leon-3.jpg"
    ],
    info: {
      location: "Chamarel",
      bestTime: "Morning for best light"
    }
  },

  "chamarel-waterfall": {
    slug: "chamarel-waterfall",
    name: "Chamarel Waterfall",
    region: "South West",
    coordinates: [-20.440229, 57.373342],
    categories: ["nature", "waterfalls", "local"],
    tagline: "One of the most spectacular waterfalls in Mauritius, plunging 100 meters into a gorge.",
    description: [
      "Chamarel Waterfall is the highest waterfall in Mauritius, with water cascading nearly 100 meters down a stunning cliff face into the gorge below.",
      "Located within the Chamarel Nature Reserve, the waterfall is surrounded by lush vegetation and offers breathtaking views from the viewing platform.",
      "The falls are fed by two rivers that merge before making their dramatic plunge, creating a spectacular sight especially after rainfall."
    ],
    tips: [
      "Best visited in the morning to avoid crowds",
      "Combine with a visit to the Seven Coloured Earth nearby",
      "Entry fee applies as it's within the nature reserve"
    ],
    images: [
      "chamarel-waterfall.jpg",
      "chamarel-waterfall-view-point.jpg",
      "chamarel-waterfall-hike.jpg"
    ],
    info: {
      location: "Chamarel",
      openHours: "7:00 AM - 5:00 PM",
      admission: "Included in Chamarel Nature Reserve ticket"
    }
  },

  "rochester-falls": {
    slug: "rochester-falls",
    name: "Rochester Falls",
    region: "South",
    coordinates: [-20.50262, 57.51695],
    categories: ["nature", "waterfalls", "hideaways", "local"],
    tagline: "Unique rectangular rock formations make this waterfall unlike any other in Mauritius.",
    description: [
      "Rochester Falls is known for its unusual rectangular rock formations created by volcanic activity thousands of years ago.",
      "The waterfall drops about 10 meters into a natural pool where you can swim (with caution). The surrounding rocks are perfectly geometric, resembling man-made structures.",
      "Local legend says the rocks were carved by nature to resemble organ pipes, giving the falls their distinctive appearance."
    ],
    tips: [
      "Swimming is possible but be careful of slippery rocks",
      "Hire a local guide to show you the best viewpoints",
      "Visit early morning for fewer crowds"
    ],
    images: [
      "rochester-fall-in-the-south.jpg",
      "rochester-falls-top.jpg",
      "rochester-falls.jpg"
,
      "rochester-fall-1.jpg",
      "rochester-fall-2.jpg"
    ],
    info: {
      location: "Souillac",
      admission: "Free"
    }
  },

  "seven-waterfall": {
    slug: "seven-waterfall",
    name: "Seven Waterfalls (7 Cascades)",
    region: "South West",
    coordinates: [-20.375, 57.435],
    categories: ["nature", "waterfalls", "hideaways"],
    tagline: "An adventurous hike through the jungle to discover seven stunning waterfalls.",
    description: [
      "The Seven Waterfalls, also known as Tamarind Falls or 7 Cascades, is a series of stunning waterfalls connected by hiking trails through the Black River Gorges.",
      "This is one of the most popular adventure activities in Mauritius, offering both easy viewpoint walks and challenging canyoning expeditions.",
      "The full trail takes you past all seven waterfalls, with opportunities to swim in natural pools along the way."
    ],
    tips: [
      "Book a guided tour for the full experience",
      "Wear proper hiking shoes - the terrain is challenging",
      "Bring swimwear if you want to swim in the pools"
    ],
    images: [
      "seven-waterfall.jpg",
      "7-cascades-in-mauritius.jpg",
      "7-waterfalls-bird-eye-view.jpg",
      "7-waterfalls-hike-mauritius.jpg",
      "under-a-waterfall-in-mauritius.jpg",
      "7-waterfall-hike.jpg",
      "hiking-7-cascades.jpg",
      "under-the-waterfall-at-7-cascades.jpg",
      "7-waterfalls-view-points.jpg"
,
      "7-cascades-hike-in-mauritius.jpg",
      "7-waterfall-bottom-shot.jpg",
      "7-waterfall-hike-2.jpg",
      "7-waterfalls-1.jpg",
      "7-waterfalls-2.jpg",
      "7-waterfalls-3.jpg",
      "7-waterfalls-4.jpg",
      "7-waterfalls-5.jpg",
      "7-waterfalls-6.jpg",
      "7-waterfalls-hike-view-point.jpg",
      "full-day-hike-at-7-waterfall.jpg"
    ],
    info: {
      location: "Black River Gorges",
      bestTime: "During or after rainy season for best water flow"
    }
  },

  "alexandra-falls": {
    slug: "alexandra-falls",
    name: "Alexandra Falls",
    region: "South West",
    coordinates: [-20.402, 57.452],
    categories: ["nature", "waterfalls"],
    tagline: "A stunning viewpoint offering panoramic views of one of Mauritius's most scenic waterfalls.",
    description: [
      "Alexandra Falls is a beautiful waterfall located in the Black River Gorges National Park, accessible from an easy viewpoint along the main road.",
      "The falls cascade through dense tropical forest, and on clear days you can see all the way to the coast.",
      "This is one of the most accessible waterfalls in Mauritius, perfect for those who want stunning views without a challenging hike."
    ],
    tips: [
      "Visit early morning for the best photos",
      "Combine with a visit to the Black River Gorges viewpoint nearby"
    ],
    images: [
      "alexandra-falls.jpg",
      "alexandra-falls-view-point.jpg",
      "alexandra-falls-2.jpg"
    ],
    info: {
      location: "Black River Gorges National Park",
      admission: "Free"
    }
  },

  "eau-bleu-waterfall": {
    slug: "eau-bleu-waterfall",
    name: "Eau Bleue Waterfall",
    region: "East",
    coordinates: [-20.382, 57.648],
    categories: ["nature", "waterfalls", "hideaways", "local"],
    tagline: "A hidden gem in the heart of Mauritius with crystal-clear blue pools.",
    description: [
      "Eau Bleue (Blue Water) Waterfall is one of Mauritius's best-kept secrets, featuring stunning turquoise pools surrounded by lush vegetation.",
      "Located near Cluny in the east, this waterfall requires a short hike to reach but rewards visitors with pristine natural pools perfect for swimming.",
      "The water gets its distinctive blue color from minerals in the riverbed, creating an otherworldly swimming experience."
    ],
    tips: [
      "Bring water shoes for the slippery rocks",
      "Best visited during the week to avoid crowds",
      "Local guides can help you find the hidden swimming spots"
    ],
    images: [
      "eau-bleue-waterfall-in-cluney.jpg",
      "iconic-eau-bleu-waterfall.jpg",
      "each-bleue-waterfall.jpg"
,
      "eau-bleue-waterfall-in-mauritius.jpg"
    ],
    info: {
      location: "Cluny, East Coast",
      admission: "Free"
    }
  },

  // ============ NATURE & LANDMARKS ============
  "7-coloured-earth": {
    slug: "7-coloured-earth",
    name: "Seven Coloured Earth",
    region: "South West",
    coordinates: [-20.44028, 57.37333],
    categories: ["nature", "discover"],
    tagline: "A geological wonder where sand dunes display seven distinct colors.",
    description: [
      "The Seven Coloured Earth of Chamarel is one of Mauritius's most unique attractions, featuring sand dunes in seven distinct colors - red, brown, violet, green, blue, purple, and yellow.",
      "This natural phenomenon was created by volcanic rock cooling at different temperatures, creating a surreal landscape that looks like a painter's palette.",
      "Interestingly, if you mix the different colored sands together, they will eventually separate back into distinct layers."
    ],
    tips: [
      "Visit in the morning for the most vibrant colors",
      "Combine with Chamarel Waterfall - both are in the same park",
      "Don't miss the giant tortoises at the park"
    ],
    images: [
      "seven-coloured-earth.jpg",
      "seven-coloured-earth-2.jpg",
      "the-seven-coloured-earth.jpg",
      "the-seven-coloured-earth-in-chamarel.jpg"
,
      "coloured-earth-1.jpg"
    ],
    info: {
      location: "Chamarel",
      openHours: "8:30 AM - 5:00 PM",
      admission: "Paid entry"
    }
  },

  "pamplemousses-botanical-garden": {
    slug: "pamplemousses-botanical-garden",
    coordinates: [-20.106840692591195, 57.57966756788923],
    name: "Pamplemousses Botanical Garden",
    region: "North",
    categories: ["nature", "discover"],
    tagline: "One of the oldest botanical gardens in the Southern Hemisphere, home to giant water lilies.",
    description: [
      "The Sir Seewoosagur Ramgoolam Botanical Garden, commonly known as Pamplemousses, is one of the most popular tourist attractions in Mauritius.",
      "Founded in 1770, the garden spans 37 hectares and features an impressive collection of indigenous and exotic plants, including the famous giant Victoria Amazonica water lilies.",
      "The garden is also home to giant tortoises, deer, and a variety of bird species, making it a perfect destination for nature lovers."
    ],
    tips: [
      "Hire a guide at the entrance for the best experience",
      "Visit in the morning when the giant water lilies are in bloom",
      "Don't miss the baobab trees and spice garden"
    ],
    images: [
      "pamplemousses-botanical-garden.jpg",
      "pamplemousses-garden-lilly-pond.jpg",
      "pamplemousses-garden-giant-lilly-pond.jpg",
      "pamplemousses-garden-giant-baobab.jpg",
      "national-botanical-garden.jpg"
,
      "lilly-pond-of-pamplemousses-botanical-garden.jpg",
      "pamplemousse-botanical-garden.jpg",
      "pamplemousses-1.jpg",
      "pamplemousses-2.jpg",
      "pamplemousses-3.jpg",
      "pamplemousses-4.jpg",
      "pamplemousses-5.jpg",
      "pamplemousses-6.jpg",
      "pamplemousses-7.jpg"
    ],
    info: {
      location: "Pamplemousses",
      openHours: "8:30 AM - 5:30 PM",
      admission: "Paid entry"
    }
  },

  "black-river-gorges": {
    slug: "black-river-gorges",
    name: "Black River Gorges",
    region: "South West",
    coordinates: [-20.41, 57.42],
    categories: ["nature"],
    tagline: "Mauritius's only national park, covering 67 square kilometers of pristine forest.",
    description: [
      "Black River Gorges National Park is Mauritius's largest national park, protecting the island's remaining native forests and endemic wildlife.",
      "The park offers numerous hiking trails ranging from easy walks to challenging treks, with stunning viewpoints overlooking deep gorges and the coastline.",
      "It's home to many endemic species including the Mauritius Kestrel, Pink Pigeon, and Echo Parakeet - all of which were saved from extinction."
    ],
    tips: [
      "Start early for the best hiking conditions",
      "Bring plenty of water and snacks",
      "Stop at the viewpoints for spectacular panoramic photos"
    ],
    images: [
      "black-river-gorges-view-point.jpg"
,
      "black-river-gorges-view-point-1.jpg"
    ],
    info: {
      location: "Black River",
      openHours: "7:00 AM - 5:00 PM",
      admission: "Free"
    }
  },

  "grand-bassin": {
    slug: "grand-bassin",
    name: "Grand Bassin (Ganga Talao)",
    region: "South",
    coordinates: [-20.4083, 57.4917],
    categories: ["nature", "local"],
    tagline: "A sacred crater lake and the most important Hindu pilgrimage site outside India.",
    description: [
      "Grand Bassin, also known as Ganga Talao, is a sacred crater lake situated in an isolated mountain area. It is one of the most important Hindu pilgrimage sites outside of India.",
      "The lake is home to several temples dedicated to Lord Shiva and other Hindu deities. A massive statue of Shiva, standing 33 meters tall, guards the entrance to the site.",
      "During the Maha Shivaratri festival, hundreds of thousands of devotees walk from all parts of Mauritius to Grand Bassin to pay tribute to Lord Shiva."
    ],
    tips: [
      "Dress modestly out of respect for the religious site",
      "Visit during Maha Shivaratri for an incredible cultural experience",
      "Watch out for the friendly monkeys!"
    ],
    images: [
      "grand-bassin-shiva-statue.jpg",
      "shiv-statute-grand-bassin.jpg",
      "grand-bassin-statue.jpg",
      "grand-bassin-scupture.jpg",
      "grand-bassin-ganga-talao-lake.jpg",
      "grand-bassin-sacred-lake-offerings.jpg",
      "grand-bassin-temple-mauritius.jpg",
      "grand-bassin-temple-mauritius-2.jpg",
      "monkeys-at-grand-bassin.jpg"
,
      "grand-bassin-1.jpg",
      "grand-bassin-2.jpg",
      "grand-bassin-3.jpg",
      "grand-bassin-4.jpg",
      "grand-bassin-5.jpg"
    ],
    info: {
      location: "Savanne District",
      admission: "Free"
    }
  },

  // ============ HISTORIC & CULTURAL ============
  "cap-malheureux": {
    slug: "cap-malheureux",
    name: "Notre Dame Auxiliatrice at Cap Malheureux",
    region: "North",
    coordinates: [-19.986529, 57.62228],
    categories: ["discover", "local"],
    tagline: "The most photographed church in Mauritius, with its iconic red roof overlooking the sea.",
    description: [
      "The chapel with the red roof, Notre Dame Auxiliatrice, at Cap Malheureux, is very famous and probably one of the most well-known photography spots in Mauritius.",
      "Located at the most northerly point of Mauritius, this is where the British first landed before laying claim to the island in 1810.",
      "The church offers stunning views of Coin de Mire island and is a popular spot for wedding photos."
    ],
    tips: [
      "Visit at sunset for the most dramatic photos",
      "The church interior is worth seeing - respectful visitors welcome",
      "Try the Table du Chateau restaurant nearby"
    ],
    images: [
      "church-at-cap-malheureux.jpg",
      "cap-malheureux-swing.jpg",
      "cap-malheureux-swing-coin-de-mire.jpg"
,
      "cap-malheureux-1.jpg"
    ],
    info: {
      location: "Cap Malheureux, North",
      admission: "Free"
    }
  },

  "bois-des-amourettes": {
    slug: "bois-des-amourettes",
    name: "Bois des Amourettes",
    region: "East",
    coordinates: [-20.365, 57.72],
    categories: ["local", "nature"],
    tagline: "A peaceful village with a famous jetty offering views of historic islands.",
    description: [
      "Bois des Amourettes, translated as 'Lovers' Forest', is a peaceful and tiny village in the east of Mauritius.",
      "The center of attraction of this village is its famous lovely jetty which was constructed during the naval war of Vieux Grand Port.",
      "The beautiful jetty makes approximately 190 meters and from it you are able to see the amazing Ile au Phare, Ile de la Passe, Ile aux Aigrettes and some other little islands as well."
    ],
    tips: [
      "Drive south to visit the Dutch first landing in Mauritius",
      "Visit the village of Mahebourg",
      "Finish the day at Blue Bay"
    ],
    images: [
      "bois-des-amourettes-jetty.jpg",
      "bois-des-amourettes.jpg"
    ],
    info: {
      location: "Grand Port"
    }
  },

  "chateau-de-bel-ombre": {
    slug: "chateau-de-bel-ombre",
    name: "Chateau de Bel Ombre",
    region: "South",
    coordinates: [-20.501982, 57.412754],
    categories: ["discover"],
    tagline: "An enchanting 18th-century sugar plantation house set in beautiful French gardens.",
    description: [
      "Dating back to 1765, Heritage Bel Ombre (formerly Domaine de Bel Ombre) immerses its guests through the rich heritage of Mauritius.",
      "Embark on a journey through time at Heritage Le Château, an enchanting former sugar plantation style house, set in typical French Gardens.",
      "The Château was honoured for its high gastronomy by TripAdvisor with the Certificate of Excellence, offering sophisticated cuisine that combines farm-to-fork dining with locavorism."
    ],
    tips: [
      "Book afternoon tea in the beautiful historic apartment",
      "Spend some time exploring the beaches of Bel Ombre, St Felix and Riambel"
    ],
    images: [
      "chateau-de-bel-ombre-1.jpg",
      "chateau-de-bel-ombre-2.jpg",
      "chateau-de-bel-ombre-3.jpg",
      "chateau-de-bel-ombre-4.jpg",
      "chateau-de-bel-ombre-5.jpg"
    ],
    info: {
      location: "Bel Ombre",
      openHours: "9:00 AM - 5:00 PM"
    }
  },

  "chateau-de-labourdonnais": {
    slug: "chateau-de-labourdonnais",
    name: "Chateau de Labourdonnais",
    region: "North",
    coordinates: [-20.0736, 57.6176],
    categories: ["discover", "history"],
    tagline: "Discover Mauritius's long and rich history at this 1856 colonial estate with gardens, distillery, and Creole cuisine.",
    description: [
      "Looking for places to discover the long and rich history of Mauritius and its people? Look no further and head over to Le Chateau de Labourdonnais. By now, you're probably aware of Mauritius's multiculturalism and its influence from past colonies, but the island's history is much more than that. Spending a day at Le Chateau de Labourdonnais reveals all that is unknown to you – several facts about the major island of Mauritius.",
      "Experience, learn and immerse yourself in what makes the island so unique in its history, fine arts and people. Le Chateau de Labourdonnais is itself an encyclopedia of history – it dates back to 1856.",
      "At Le Chateau de Labourdonnais, you get to stroll around beautiful colonial architecture and exquisite landscapes as the estate features an array of endemic plants. On-site you will also find a distillery and a few orchards producing jams, fruit jellies and juices, and rum. Your visit is inclusive of a tasting session as well. You can even purchase all of these fresh and locally produced items to bring back with you – they make great and savoury gifts.",
      "Le Chateau de Labourdonnais is located within the Domaine which extends over hectares of land and features offices, schools, orchards, a distillery, a yoga barn and much more.",
      "Your visit should also count in a lunch stop at the restaurant which specializes in local delicacies – the authentic Mauritian Creole cuisine that is to die for. Le Chateau de Labourdonnais is also an ideal location for special events, parties and weddings – the setting at night is so dreamy that you'll feel like it is straight out of a fairy-tale."
    ],
    tips: [
      "You will fall in love with their fruit jellies – be sure to stock up on tons of them to bring back home.",
      "Enjoy the Table du Chateau restaurant, a few meters away from the Chateau."
    ],
    images: [
      "chateau-labourdonnais-in-mauritius.jpg",
      "chateau-labourdonnais-in-mauritius-2.jpg"
    ],
    info: {
      location: "Mapou",
      openHours: "9:00 AM - 5:00 PM"
    }
  },

  "aapravasi-ghat": {
    slug: "aapravasi-ghat",
    name: "Aapravasi Ghat",
    region: "North",
    coordinates: [-20.158611, 57.503056],
    categories: ["nature", "discover"],
    tagline: "A UNESCO World Heritage Site marking the beginning of the indentured labor system.",
    description: [
      "Aapravasi Ghat is a UNESCO World Heritage Site in Port Louis, marking the location where indentured laborers first arrived in Mauritius in 1834.",
      "Over half a million indentured laborers from India, as well as workers from China, East Africa, and Madagascar, passed through this immigration depot.",
      "The site stands as an important reminder of human migration and the development of modern Mauritius."
    ],
    tips: [
      "Take a guided tour to understand the historical significance",
      "Combine with a visit to the nearby Port Louis market"
    ],
    images: [
      "aapravasi-ghat-1.jpg",
      "aapravasi-ghat-2.jpg"
    ],
    info: {
      location: "Port Louis",
      openHours: "9:00 AM - 4:00 PM",
      admission: "Free"
    }
  },

  // ============ HIDEAWAYS & SECRET SPOTS ============
  "albion-lighthouse": {
    slug: "albion-lighthouse",
    name: "Albion Lighthouse & Caves",
    region: "West",
    coordinates: [-20.2111, 57.4011],
    categories: ["hideaways", "local", "nature"],
    tagline: "Dramatic sea cliffs, a historic lighthouse, and hidden caves on the wild west coast.",
    description: [
      "The Albion lighthouse and surrounding cliffs offer some of the most dramatic coastal scenery in Mauritius.",
      "The lighthouse, built in 1910, stands on rugged volcanic cliffs that drop dramatically into the ocean, creating a stark contrast to the gentle beaches found elsewhere on the island.",
      "Nearby, you can explore Pointe aux Caves, sea caves carved by centuries of wave action into the volcanic rock."
    ],
    tips: [
      "Visit at sunset for spectacular photos",
      "Be careful near the cliff edges - there are no barriers",
      "Explore the caves at low tide"
    ],
    images: [
      "albion-lighthouse.jpg",
      "albion-light-house.jpg",
      "albion-lighhouse-view.jpg",
      "albion-lighthouse-2.jpg",
      "albion-lighthouse-3.jpg",
      "pointe-aux-caves-in-albion.jpg"
,
      "albion-caves-and-light-house-1.jpg",
      "albion-caves-and-light-house-2.jpg",
      "albion-caves-and-light-house-3.jpg",
      "albion-caves-and-light-house-4.jpg",
      "albion-caves-and-light-house-5.jpg",
      "albion-caves-and-light-house-6.jpg"
    ],
    info: {
      location: "Albion, West Coast"
    }
  },

  "secret-cave-gris-gris": {
    slug: "secret-cave-gris-gris",
    name: "Secret Cave at Gris Gris",
    region: "South",
    coordinates: [-20.515, 57.518],
    categories: ["hideaways", "nature"],
    tagline: "A hidden sea cave accessible only by those who know where to look.",
    description: [
      "Near the dramatic cliffs of Gris Gris lies a secret cave, hidden from most tourists but known to adventurous locals.",
      "This natural cave offers a unique perspective on the powerful waves that crash against the southern coast of Mauritius.",
      "The cave is best visited during calm weather and at low tide for safe exploration."
    ],
    tips: [
      "Only visit with a local guide who knows the safe path",
      "Check tide times before visiting",
      "Wear sturdy shoes for the rocky terrain"
    ],
    images: [
      "gris-gris-cave-in-the-south.jpg",
      "cave-in-mauritius.jpg"
    ],
    info: {
      location: "Gris Gris, South Coast"
    }
  },

  "natural-bridge": {
    slug: "natural-bridge",
    name: "Natural Bridge",
    region: "South",
    coordinates: [-20.479444, 57.658056],
    categories: ["hideaways", "nature"],
    tagline: "A stunning rock arch carved by the sea on Mauritius's wild southern coast.",
    description: [
      "The Natural Bridge, also known as Pont Naturel, is a spectacular rock arch carved by centuries of wave action on the southern coast.",
      "Located near the small village of Point d'Esny on the south coast, this dramatic formation is one of Mauritius's most impressive natural landmarks.",
      "The bridge frames the crashing waves and offers a unique photo opportunity, especially during high seas."
    ],
    tips: [
      "Visit during rough weather for the most dramatic wave action",
      "Be extremely careful - there are no safety barriers",
      "Best photographed in the morning light"
    ],
    images: [
      "natural-bridge-in-mauritius.jpg",
      "natural-bridge-in-the-south.jpg",
      "natural-bridge-in-the-south-of-mauritius.jpg"
    ],
    info: {
      location: "South Coast"
    }
  },

  "les-salines-salt-pans": {
    slug: "les-salines-salt-pans",
    name: "Les Salines Salt Pans",
    region: "West",
    coordinates: [-20.325, 57.3667],
    categories: ["discover", "local"],
    tagline: "Historic salt pans in Tamarin offering a glimpse into traditional salt harvesting.",
    description: [
      "Les Salines de Tamarin are traditional salt pans that have been in operation for generations, producing some of Mauritius's finest sea salt.",
      "Located along the beautiful west coast, the salt pans create a unique landscape of geometric pools that change color with the sun.",
      "Salt harvesting here still follows traditional methods, with workers raking the crystallized salt by hand during the dry season."
    ],
    tips: [
      "Visit during the dry season (May-November) for salt harvesting",
      "Early morning or late afternoon offers the best photography light",
      "You can purchase locally produced salt as a souvenir"
    ],
    images: [
      "les-salines.jpg",
      "les-salines-salt-pans.jpg",
      "les-salines-in-tamarin.jpg",
      "les-salines-in-black-river.jpg"
    ],
    info: {
      location: "Tamarin, West Coast"
    }
  },

  "maconde": {
    slug: "maconde",
    name: "Macondé Viewpoint",
    region: "South West",
    coordinates: [-20.434, 57.358],
    categories: ["discover", "hideaways"],
    tagline: "A dramatic viewpoint where mountains meet the sea on a winding coastal road.",
    description: [
      "Macondé is one of the most spectacular viewpoints in Mauritius, offering panoramic views of the dramatic coastline where the mountains plunge into the sea.",
      "Located on the scenic coastal road between Le Morne and Baie du Cap, this viewpoint is a favorite stop for photographers and nature lovers.",
      "The area showcases the raw beauty of Mauritius's southern coast, with its rugged cliffs and powerful ocean swells."
    ],
    tips: [
      "Stop at the viewpoint parking area for photos",
      "Drive the entire coastal road from Le Morne to Bel Ombre",
      "Be careful driving - the road is winding"
    ],
    images: [
      "maconde-view-point.jpg",
      "maconde-view-point-and-bay.jpg",
      "maconde-point-in-mauritius.jpg"
,
      "maconde-1.jpg",
      "maconde-viewpoint.jpg"
    ],
    info: {
      location: "Between Le Morne and Baie du Cap"
    }
  },

  // ============ HIKES & MOUNTAINS ============
  "le-morne-mountain": {
    slug: "le-morne-mountain",
    name: "Le Morne Mountain Hike",
    region: "South West",
    coordinates: [-20.452424, 57.312697],
    categories: ["nature", "local"],
    tagline: "A UNESCO World Heritage Site with a challenging hike offering incredible views.",
    description: [
      "Le Morne Brabant is a UNESCO World Heritage Site, recognized for its historical significance as a refuge for escaped slaves.",
      "The mountain rises 556 meters above the lagoon and offers one of the most rewarding hikes in Mauritius, with panoramic views of the west coast and the underwater waterfall illusion.",
      "The hike is challenging but achievable, taking about 3-4 hours round trip with a guide."
    ],
    tips: [
      "A guide is mandatory - book in advance",
      "Start early morning to avoid the midday heat",
      "Bring plenty of water and wear hiking shoes"
    ],
    images: [
      "le-morne-hike-start.jpg",
      "view-on-top-of-le-morne.jpg",
      "le-morne-mountain-climbing.jpg",
      "le-morne-hike-cross.jpg",
      "boat-tour-at-le-morne.jpg",
      "horse-riding-at-le-morne-mauritius.jpg",
      "horse-riding-at-le-morne.jpg",
      "horse-riding-in-the-morningat-le-morne.jpg",
      "horse-riding-le-morne.jpg",
      "horse-riding-on-the-beach-in-mauritius.jpg",
      "horseriding-activity-in-mauritius-le-morne.jpg",
      "horseriding-on-the-beach-in-mauritius.jpg",
      "le-morne-hike-1.jpg",
      "le-morne-hike-2.jpg",
      "le-morne-le-paradis-snorkling-spot.jpg",
      "underwater-waterfall-in-mauritius.jpg"
    ],
    info: {
      location: "Le Morne Peninsula",
      bestTime: "Early morning"
    }
  },

  "le-pouce-mountain": {
    slug: "le-pouce-mountain",
    name: "Le Pouce Mountain",
    region: "Central",
    coordinates: [-20.2167, 57.5167],
    categories: ["nature", "local"],
    tagline: "The third highest peak in Mauritius, shaped like a thumb pointing to the sky.",
    description: [
      "Le Pouce, meaning 'The Thumb', is Mauritius's third highest mountain at 812 meters. Its distinctive shape makes it one of the most recognizable peaks on the island.",
      "The hike to the summit is moderate and takes about 2-3 hours, rewarding climbers with spectacular 360-degree views of Port Louis, Moka, and the central plateau.",
      "On clear days, you can see all the way to the coast and even neighboring islands."
    ],
    tips: [
      "Start early to avoid afternoon clouds",
      "No guide required but helpful for first-timers",
      "Bring snacks and plenty of water"
    ],
    images: [
      "le-pouce-mountain.jpg",
      "le-pouce-hike.jpg",
      "hiking-le-pouce-mountain.jpg"
,
      "climbing-le-pouce-mountain.jpg",
      "le-pouce-1.jpg",
      "le-pouce-2.jpg",
      "le-pouce-3.jpg",
      "view-from-piton-mountain.jpg"
    ],
    info: {
      location: "Moka District"
    }
  },

  // ============ ISLANDS ============
  "ile-aux-cerfs": {
    slug: "ile-aux-cerfs",
    name: "Ile aux Cerfs",
    region: "East",
    coordinates: [-20.27222, 57.80417],
    categories: ["islands", "nature", "hideaways"],
    tagline: "A stunning island paradise with pristine beaches and crystal-clear lagoons.",
    description: [
      "Ile aux Cerfs is perhaps the most famous island in Mauritius, known for its stunning white sand beaches and turquoise waters.",
      "The island offers numerous water activities including parasailing, underwater walking, and glass-bottom boat rides.",
      "Originally a deer reserve (cerfs means deer in French), the island is now a popular day trip destination with restaurants and water sports facilities."
    ],
    tips: [
      "Book a speed boat or catamaran trip for the best experience",
      "Visit on weekdays to avoid crowds",
      "Walk to the less crowded beaches on the far side of the island"
    ],
    images: [
      "golf-beach-ile-aux-cerfs.jpg",
      "ile-aux-cerfs-beach.jpg",
      "ile-aux-cerfs-drone-shot.jpg",
      "ile-aux-cerfs-golf-beach-cabana.jpg",
      "ile-aux-cerfs-golf-beach.jpg"
,
      "dolphin-boat-tours.jpg",
      "dolphin-experince-in-mauritius.jpg",
      "dolphin-in-mauritius.jpg",
      "dolphin-swim-experince.jpg",
      "dolphin-swim-in-mauritius-on-the-west-coast.jpg",
      "dolphin-swim-in-mauritius.jpg",
      "ile-aux-benitiers-2.jpg",
      "ile-aux-benitiers-in-mauritius.jpg",
      "ile-aux-benitiers-morning.jpg",
      "le-morne-speedboat-tours.jpg",
      "speed-boat-one-love.jpg",
      "speedboat-tours-in-mauritius.jpg",
      "swim-with-dolphins.jpg",
      "swimming-with-dolphins.jpg"
    ],
    info: {
      location: "East Coast, off Trou d'Eau Douce"
    }
  },

  "ile-aux-benitiers": {
    slug: "ile-aux-benitiers",
    name: "Ile aux Benitiers",
    region: "West",
    coordinates: [-20.4167, 57.3333],
    categories: ["islands", "hideaways", "nature"],
    tagline: "A small pristine island near the famous Crystal Rock and underwater waterfall.",
    description: [
      "Ile aux Benitiers is a small island off the west coast, famous for its proximity to the Crystal Rock and views of the underwater waterfall illusion.",
      "The island offers a perfect escape from the mainland, with unspoiled beaches and excellent snorkeling opportunities.",
      "Most visitors come on boat trips that include stops at the Crystal Rock and lunch on the island."
    ],
    tips: [
      "Book a boat trip that includes snorkeling and lunch",
      "Don't miss the Crystal Rock for photos",
      "Best visited in calm weather"
    ],
    images: [
      "ile-aux-benitiers.jpg",
      "crystal-rock-with-le-morne-behind.jpg",
      "ile-aux-benitiers-crystal-rock.jpg"
    ],
    info: {
      location: "West Coast, Le Morne"
    }
  },

  "ile-au-phare": {
    slug: "ile-au-phare",
    name: "Ile au Phare (Lighthouse Island)",
    region: "East",
    coordinates: [-20.405, 57.705],
    categories: ["islands", "nature"],
    tagline: "A historic lighthouse island marking the site of the famous Battle of Grand Port.",
    description: [
      "Ile au Phare, also known as Ile de la Passe, is a historic island that played a crucial role in the only naval battle won by Napoleon against the British.",
      "The lighthouse that gives the island its name was built to guide ships through the treacherous reef passage.",
      "Today, visitors can explore the ruins of the old fortress and enjoy stunning views of the surrounding lagoon."
    ],
    tips: [
      "Book a kayak or boat tour from Mahebourg",
      "Combine with a visit to Ile aux Aigrettes",
      "Bring snorkeling gear for the clear waters"
    ],
    images: [
      "ile-au-phare.jpg"
,
      "ile-aux-phare-1.jpg",
      "ile-aux-phare-2.jpg",
      "ile-aux-phare-3.jpg",
      "ile-aux-phare-4.jpg",
      "ile-aux-phare-5.jpg",
      "ile-aux-phare-6.jpg"
    ],
    info: {
      location: "Grand Port, East Coast"
    }
  },

  // ============ PORT LOUIS & TOWNS ============
  "port-louis": {
    slug: "port-louis",
    name: "Port Louis",
    region: "North",
    coordinates: [-20.1619, 57.4989],
    categories: ["discover", "local"],
    tagline: "The vibrant capital city offering markets, museums, and waterfront dining.",
    description: [
      "Port Louis is the capital and largest city of Mauritius, offering a fascinating blend of history, culture, and modern development.",
      "The city is home to many attractions including the Central Market, Caudan Waterfront, Citadel Fort, and numerous museums.",
      "Wandering through the streets, you'll discover colonial architecture, street food vendors, and the multicultural heart of Mauritius."
    ],
    tips: [
      "Visit the Central Market for local produce and souvenirs",
      "Explore the Caudan Waterfront for shopping and dining",
      "Take the cable car or hike to the Citadel for panoramic views"
    ],
    images: [
      "caudan-umbrella-alley-in-port-louis-caudan-waterfront.jpg",
      "port-louis-1.jpg",
      "port-louis-2.jpg",
      "port-louis-3.jpg",
      "port-louis-4.jpg",
      "marina-park-in-mauritius.jpg"
    ],
    info: {
      location: "Port Louis District"
    }
  },

  "mahebourg-village": {
    slug: "mahebourg-village",
    name: "Mahebourg",
    region: "South East",
    coordinates: [-20.40806, 57.7],
    categories: ["discover", "local"],
    tagline: "A charming coastal village steeped in history with an authentic local atmosphere.",
    description: [
      "Mahebourg is a historic coastal village on the southeast coast, offering an authentic glimpse into local Mauritian life.",
      "The village is home to the Naval Museum, which chronicles the famous Battle of Grand Port, the only naval victory inscribed on the Arc de Triomphe in Paris.",
      "The Monday market and waterfront promenade are highlights, offering local food, crafts, and beautiful views of the bay."
    ],
    tips: [
      "Visit on Monday for the local market",
      "Explore the Naval Museum for fascinating history",
      "Try local street food along the waterfront"
    ],
    images: [
      "mahebourg-waterfront.jpg",
      "mahebourg-grand-port.jpg",
      "mahebourg-regata.jpg",
      "naval-museum-in-mahebourg.jpg",
      "old-tin-house-at-mahebourg.jpg"
,
      "lion-mountain-in-mahebourg.jpg",
      "mahebourg-village-1.jpg",
      "mahebourg-village-2.jpg",
      "mahebourg-village-3.jpg",
      "mahebourg-waterfront-in-the-south.jpg",
      "market-at-maheborg.jpg"
    ],
    info: {
      location: "Grand Port District"
    }
  },

  "rhumerie-de-chamarel": {
    slug: "rhumerie-de-chamarel",
    name: "Rhumerie de Chamarel",
    region: "South West",
    coordinates: [-20.435, 57.385],
    categories: ["discover"],
    tagline: "A premium rum distillery offering tours and tastings of award-winning agricultural rum.",
    description: [
      "Rhumerie de Chamarel is Mauritius's only rum distillery producing 100% agricultural rum from freshly pressed sugarcane juice.",
      "The distillery offers guided tours explaining the rum-making process from cane to bottle, followed by tastings of their award-winning rums.",
      "The on-site restaurant, L'Alchimiste, serves excellent Mauritian cuisine with stunning views over the distillery and surrounding mountains."
    ],
    tips: [
      "Book a tour that includes rum tasting",
      "The restaurant is excellent for lunch",
      "Purchase some rum to take home - great souvenir"
    ],
    images: [
      "rhumerie-de-chamarel.jpg"
,
      "rhumerie-1.jpg",
      "rhumerie-2.jpg"
    ],
    info: {
      location: "Chamarel",
      openHours: "9:30 AM - 5:00 PM"
    }
  },

  // ============ ADDITIONAL PLACES ============
  "500-feet-waterfall": {
    slug: "500-feet-waterfall",
    name: "500 Feet Waterfall (Cascade 500 Pieds)",
    region: "South",
    coordinates: [-20.405, 57.455],
    categories: ["nature", "waterfalls", "hideaways"],
    tagline: "A hidden waterfall deep in the sugarcane fields of the south.",
    description: [
      "Cascade 500 Pieds is one of Mauritius's lesser-known waterfalls, tucked away in the rural south of the island.",
      "The waterfall is named after its impressive height and offers a peaceful escape from the more touristy areas.",
      "Getting there is an adventure in itself, as you'll need to navigate through sugarcane fields and rural paths."
    ],
    tips: [
      "Hire a local guide to find the trail",
      "Wear sturdy shoes for the rocky path",
      "Best visited during the rainy season for more water flow"
    ],
    images: [
      "500-pieds-waterfall.jpg",
      "cascade-500-pieds-in-mauritius.jpg"
    ],
    info: {
      location: "South"
    }
  },

  "grse-waterfall": {
    slug: "grse-waterfall",
    name: "Grand River South East Waterfall",
    region: "East",
    coordinates: [-20.348, 57.758],
    categories: ["nature", "waterfalls"],
    tagline: "A stunning waterfall accessible by boat, set in lush tropical scenery.",
    description: [
      "The Grand River South East Waterfall (GRSE) is one of the most scenic waterfalls in Mauritius, best accessed by boat along the river.",
      "The journey up the river is part of the experience, passing through mangroves and lush vegetation before reaching the falls.",
      "Many visitors combine this with a trip to Ile aux Cerfs, as boat tours often include both attractions."
    ],
    tips: [
      "Book a boat tour that includes the waterfall",
      "Combine with a trip to Ile aux Cerfs",
      "Best in the morning when the light is good for photos"
    ],
    images: [
      "grse-waterfall-1.jpg"
    ],
    info: {
      location: "Grand River South East"
    }
  },

  "trou-aux-cerfs": {
    slug: "trou-aux-cerfs",
    name: "Trou aux Cerfs",
    region: "Central",
    coordinates: [-20.3167, 57.5167],
    categories: ["nature"],
    tagline: "A dormant volcanic crater offering panoramic views of central Mauritius.",
    description: [
      "Trou aux Cerfs is a dormant volcanic crater located in the town of Curepipe, standing at 605 meters above sea level.",
      "The crater is about 300 meters in diameter and 85 meters deep, now filled with a small lake and surrounded by a walking path.",
      "From the rim, you can enjoy 360-degree views of the island, including the mountains, coast, and central plateau."
    ],
    tips: [
      "Visit early morning for the clearest views",
      "Walk the full circumference for different perspectives",
      "Great spot for jogging - popular with locals"
    ],
    images: [
      "trou-aux-cerfs.jpg"
    ],
    info: {
      location: "Curepipe"
    }
  },

  "chamarel-view-point": {
    slug: "chamarel-view-point",
    name: "Chamarel Viewpoint",
    region: "South West",
    coordinates: [-20.438, 57.375],
    categories: ["nature", "discover"],
    tagline: "Spectacular viewpoint overlooking the southwest coast and Le Morne.",
    description: [
      "The Chamarel Viewpoint offers some of the most breathtaking panoramic views in Mauritius, looking out over the southwestern coast.",
      "From here, you can see Le Morne Brabant, the turquoise lagoon, and the dramatic coastline stretching into the distance.",
      "It's a popular stop on the way to or from the Seven Coloured Earth and Chamarel Waterfall."
    ],
    tips: [
      "Visit in the afternoon for the best light",
      "Combine with visits to Seven Coloured Earth and Chamarel Waterfall",
      "There's a small parking area by the viewpoint"
    ],
    images: [
      "chamarel-view-point.jpg",
      "chamarel-view-point-on-le-morne.jpg",
      "view-from-chamarel.jpg"
    ],
    info: {
      location: "Chamarel"
    }
  },

  "crystal-rock": {
    slug: "crystal-rock",
    name: "Crystal Rock",
    region: "West",
    coordinates: [-20.4167, 57.32],
    categories: ["nature", "discover"],
    tagline: "An iconic rock formation rising from the lagoon, popular for boat tours and photos.",
    description: [
      "Crystal Rock is a stunning coral formation that rises from the shallow turquoise waters near Ile aux Benitiers.",
      "The rock has become one of Mauritius's most photographed spots, especially at low tide when you can walk around it.",
      "Most visitors see Crystal Rock as part of a boat trip that also includes swimming, snorkeling, and views of the underwater waterfall illusion."
    ],
    tips: [
      "Visit at low tide for the best photos",
      "Book a boat tour from Le Morne or Black River",
      "Bring snorkeling gear for the clear waters"
    ],
    images: [
      "crystal-rock-with-le-morne-behind.jpg",
      "ile-aux-benitiers-crystal-rock.jpg",
      "boat-tours-ile-aux-benitiers.jpg"
    ],
    info: {
      location: "Near Ile aux Benitiers"
    }
  },

  "citadel-fort": {
    slug: "citadel-fort",
    name: "Citadel Fort (Fort Adelaide)",
    region: "North",
    coordinates: [-20.163658, 57.510166],
    categories: ["nature", "discover"],
    tagline: "A 19th-century fortress offering panoramic views over Port Louis.",
    description: [
      "The Citadel, also known as Fort Adelaide, is a historic fortress perched on a hill overlooking Port Louis, the capital of Mauritius.",
      "Built by the British in the 1830s, the fort was designed to protect the city and control the surrounding area.",
      "Today, it offers stunning 360-degree views of Port Louis, the harbor, and the surrounding mountains."
    ],
    tips: [
      "Visit late afternoon for sunset views",
      "The climb up can be hot - bring water",
      "Great for photography of Port Louis"
    ],
    images: [
      "la-citadel-fort.jpg",
      "citadel-fort-port-louis-view.jpg",
      "citadel-fort-fort-adelaide-mauritius.jpg"
    ],
    info: {
      location: "Port Louis"
    }
  },

  "domaine-saint-aubin": {
    slug: "domaine-saint-aubin",
    name: "Domaine Saint Aubin",
    region: "South",
    coordinates: [-20.485, 57.555],
    categories: ["discover", "nature"],
    tagline: "A beautifully preserved colonial estate showcasing Mauritian heritage.",
    description: [
      "Domaine Saint Aubin is a historic colonial estate in the south of Mauritius, offering visitors a glimpse into the island's sugar plantation past.",
      "The estate features a beautiful colonial house, tropical gardens, and a restaurant serving traditional Mauritian cuisine.",
      "Tours include visits to the vanilla plantation, anthurium greenhouses, and the historic rum distillery."
    ],
    tips: [
      "Book lunch at the restaurant for the full experience",
      "Don't miss the vanilla plantation tour",
      "Great place to learn about Mauritian colonial history"
    ],
    images: [
      "st-aubin-in-mauritius.jpg"
    ],
    info: {
      location: "Rivière des Anguilles",
      openHours: "9:00 AM - 5:00 PM"
    }
  },

  "telfair-garden": {
    slug: "telfair-garden",
    name: "Telfair Garden",
    region: "South",
    coordinates: [-20.5167, 57.5167],
    categories: ["nature", "local"],
    tagline: "A tranquil garden in Souillac featuring ancient banyan trees.",
    description: [
      "Telfair Garden is a peaceful public garden in the coastal town of Souillac, named after Charles Telfair, a 19th-century naturalist.",
      "The garden is famous for its magnificent banyan trees, whose aerial roots create a magical, cathedral-like atmosphere.",
      "It's a perfect spot to relax and enjoy the sea breeze after exploring the nearby Gris Gris cliffs."
    ],
    tips: [
      "Combine with a visit to nearby Gris Gris",
      "Great for a peaceful picnic",
      "The banyan trees are perfect for photography"
    ],
    images: [
      "telfair-garden-bayan-tress.jpg",
      "telfair-garden-in-souillac.jpg"
,
      "jardin-telfair.jpeg"
    ],
    info: {
      location: "Souillac"
    }
  },

  "le-soufleur": {
    slug: "le-soufleur",
    name: "Le Souffleur",
    region: "South",
    coordinates: [-20.49, 57.62],
    categories: ["nature", "hideaways"],
    tagline: "A dramatic blowhole where waves create spectacular water spouts.",
    description: [
      "Le Souffleur is a natural blowhole on the rugged south coast of Mauritius, where waves force water through a hole in the volcanic rocks.",
      "When conditions are right, water can shoot up to 20 meters into the air, creating a spectacular natural fountain.",
      "The surrounding cliffs and crashing waves make this one of the most dramatic natural sites on the island."
    ],
    tips: [
      "Best viewed during rough sea conditions",
      "Be careful on the slippery rocks",
      "Combine with a visit to nearby Gris Gris"
    ],
    images: [
      "le-soufleur.jpg",
      "le-soufleur-natural-point.jpg"
    ],
    info: {
      location: "L'Escalier, South Coast"
    }
  },

  "hindu-temple": {
    slug: "hindu-temple",
    name: "Hindu Temples of Mauritius",
    region: "Various",
    coordinates: [-20.25, 57.55],
    categories: ["local", "nature"],
    tagline: "Colorful and ornate temples showcasing Mauritius's rich Hindu heritage.",
    description: [
      "Mauritius is home to numerous beautiful Hindu temples, reflecting the island's large Hindu population descended from indentured laborers.",
      "These temples feature elaborate and colorful architecture, intricate sculptures of Hindu deities, and serve as active places of worship.",
      "Visitors are welcome to explore these sacred sites, but should dress modestly and remove shoes before entering."
    ],
    tips: [
      "Dress modestly - cover shoulders and knees",
      "Remove shoes before entering temples",
      "Be respectful during prayer times"
    ],
    images: [
      "temple-in-mauritius.jpg",
      "hindou-temple-in-mauritius.jpg",
      "temple-hindou-a-maurice.jpg"
,
      "hindu-temple-1.jpg"
    ],
    info: {
      location: "Throughout Mauritius"
    }
  },

  "la-nef": {
    slug: "la-nef",
    name: "La Nef",
    region: "South",
    coordinates: [-20.48, 57.55],
    categories: ["discover", "nature"],
    tagline: "A unique museum and cultural center in a former sugar factory.",
    description: [
      "La Nef is a cultural and artistic space housed in a beautifully restored former sugar mill in the south of Mauritius.",
      "The venue hosts exhibitions, cultural events, and offers visitors insight into Mauritius's industrial heritage.",
      "The architecture itself is striking, combining industrial elements with modern design."
    ],
    tips: [
      "Check their event calendar before visiting",
      "Great for photography enthusiasts",
      "Combine with exploring the southern coast"
    ],
    images: [
      "la-nef-museum.jpg",
      "la-nef-entrance.jpg"
,
      "la-nef-1.jpg"
    ],
    info: {
      location: "South"
    }
  },

  "moulin": {
    slug: "moulin",
    name: "Place du Moulin",
    region: "South",
    coordinates: [-20.5015, 57.413],
    categories: ["nature", "discover"],
    tagline: "A charming historic mill in the Heritage Bel Ombre estate.",
    description: [
      "Place du Moulin is a beautifully restored area within the Heritage Bel Ombre estate, featuring a historic sugar mill and surrounding grounds.",
      "The area serves as a focal point for the estate's cultural and gastronomic offerings, with restaurants and shops.",
      "Visitors can learn about the sugar industry's role in Mauritius's history while enjoying the scenic surroundings."
    ],
    tips: [
      "Great for a leisurely afternoon walk",
      "Dine at one of the estate restaurants",
      "Combine with beach time at Bel Ombre"
    ],
    images: [
      "le-moulin.jpg",
      "le-moulin-heritage-resort.jpg",
      "le-moulin-in-the-south.jpg"
,
      "moulin-1.jpg"
    ],
    info: {
      location: "Bel Ombre"
    }
  },

  "banyan-tree-la-gaulette": {
    slug: "banyan-tree-la-gaulette",
    name: "Giant Banyan Tree of La Gaulette",
    region: "West",
    coordinates: [-20.44, 57.34],
    categories: ["nature", "hideaways"],
    tagline: "A magnificent ancient banyan tree with sprawling aerial roots.",
    description: [
      "The giant banyan tree in La Gaulette is one of the most impressive natural landmarks on the west coast of Mauritius.",
      "This ancient tree has grown to enormous proportions, with aerial roots creating a forest-like canopy over a large area.",
      "It's a peaceful spot to stop and admire nature's architecture while exploring the Le Morne area."
    ],
    tips: [
      "Easy to miss - look for it along the main road",
      "Great for unique photography",
      "Combine with a visit to Le Morne beach"
    ],
    images: [
      "banyan-tree-la-gaulette.jpg"
,
      "banyan-tree-la-gaulette-1.jpg"
    ],
    info: {
      location: "La Gaulette, near Le Morne"
    }
  },

  "bassin-blanc": {
    slug: "bassin-blanc",
    name: "Bassin Blanc",
    region: "South",
    coordinates: [-20.42, 57.48],
    categories: ["nature", "hideaways"],
    tagline: "A serene crater lake hidden in the mountains of the south.",
    description: [
      "Bassin Blanc is a beautiful crater lake nestled in the mountains of southern Mauritius, surrounded by lush vegetation.",
      "The lake sits in an extinct volcanic crater and offers a peaceful escape from the more visited tourist sites.",
      "It's a popular spot for hiking and picnicking, with trails leading through the forest to various viewpoints."
    ],
    tips: [
      "Wear hiking shoes for the trail",
      "Bring a picnic to enjoy by the lake",
      "Best visited in the morning for clear views"
    ],
    images: [
      "bassin-blanc.jpg",
      "bassin-blanch-in-the-south.jpg"
    ],
    info: {
      location: "South, near Grand Bassin"
    }
  },

  "champ-de-mars": {
    slug: "champ-de-mars",
    name: "Champ de Mars",
    region: "North",
    coordinates: [-20.169159, 57.510089],
    categories: ["discover"],
    tagline: "The oldest horse racing track in the Southern Hemisphere.",
    description: [
      "Champ de Mars is the oldest horse racing track in the Southern Hemisphere, located in the heart of Port Louis since 1812.",
      "Racing season runs from March to December, with events drawing large crowds of enthusiastic locals and visitors.",
      "Beyond racing, the venue hosts various cultural events and offers a glimpse into an important aspect of Mauritian social life."
    ],
    tips: [
      "Check the racing calendar before visiting",
      "Racing typically happens on weekends during season",
      "Dress code applies for certain areas"
    ],
    images: [
      "champ-de-mars-1.jpg"
    ],
    info: {
      location: "Port Louis",
      bestTime: "March to December for racing"
    }
  },

  "mouchoir-rouge": {
    slug: "mouchoir-rouge",
    name: "Mouchoir Rouge",
    region: "East",
    coordinates: [-20.40543, 57.71191],
    categories: ["islands", "nature"],
    tagline: "A small pristine island off the east coast with crystal clear waters.",
    description: [
      "Mouchoir Rouge is a small island off the east coast of Mauritius, known for its pristine beaches and excellent snorkeling.",
      "The island is less visited than popular spots like Ile aux Cerfs, offering a more secluded beach experience.",
      "The surrounding waters are crystal clear, making it ideal for swimming and exploring marine life."
    ],
    tips: [
      "Book a private boat trip to visit",
      "Bring snorkeling gear",
      "Pack food and water as there are no facilities"
    ],
    images: [
      "mouchoir-rouge-in-mauritius.jpg"
,
      "mouchoir-rouge-1.jpg"
    ],
    info: {
      location: "Off the East Coast"
    }
  },

  "ilot-sancho": {
    slug: "ilot-sancho",
    name: "Ilot Sancho",
    region: "East",
    coordinates: [-20.5008, 57.4414],
    categories: ["islands", "local", "nature"],
    tagline: "A tiny island in a picturesque bay, perfect for peaceful escapes.",
    description: [
      "Ilot Sancho is a small island located in a beautiful bay on the east coast of Mauritius.",
      "The island and its surrounding waters offer a tranquil setting away from the crowds.",
      "It's a perfect spot for kayaking, swimming, and enjoying unspoiled natural beauty."
    ],
    tips: [
      "Kayak rental available nearby",
      "Best at high tide for swimming",
      "Great for photography at sunset"
    ],
    images: [
      "ilot-sancho-bay.jpg"
    ],
    info: {
      location: "East Coast"
    }
  },

  "ilot-flamants": {
    slug: "ilot-flamants",
    name: "Ilot Flamants",
    region: "South",
    coordinates: [-20.48, 57.6],
    categories: ["islands", "nature", "hideaways"],
    tagline: "A secluded islet in the southern lagoon, rarely visited by tourists.",
    description: [
      "Ilot Flamants is a small islet located off the south coast of Mauritius, one of the least visited islands around the main island.",
      "Named after the flamingos that once frequented the area, it offers pristine beaches and untouched natural beauty.",
      "Access is limited, making it one of the most exclusive beach experiences in Mauritius."
    ],
    tips: [
      "Arrange a private boat trip to visit",
      "Bring everything you need - there are no facilities",
      "Perfect for those seeking solitude"
    ],
    images: [
      "ilot-famant-in-the-south.jpg"
,
      "ilot-flamant-min.jpg",
      "ilot-flamant-oat-tour-min.jpg"
    ],
    info: {
      location: "Off the South Coast"
    }
  },

  "andrea-lodge-hike": {
    slug: "andrea-lodge-hike",
    name: "Andrea Lodge Hike",
    region: "South West",
    coordinates: [-20.44, 57.41],
    categories: ["nature", "hideaways"],
    tagline: "A scenic hike through forests to dramatic cliff viewpoints.",
    description: [
      "The Andrea Lodge trail is a scenic hiking route in the southwest of Mauritius, passing through forests and leading to spectacular cliff viewpoints.",
      "The hike offers incredible views of the coastline and the dramatic cliffs that characterize this part of the island.",
      "It's a moderately challenging hike that rewards visitors with some of the best views in Mauritius."
    ],
    tips: [
      "Wear sturdy hiking boots",
      "Start early to avoid midday heat",
      "Bring plenty of water"
    ],
    images: [
      "cliffs-at-andrea-lodge.jpg",
      "andrea-lodge-walk-green-forest.jpg",
      "andtrea-lodge-cliff.jpg"
,
      "andrea-lodge-hike-1.jpg",
      "andrea-lodge-hike-2.jpg",
      "andrea-lodge-hike-3.jpg",
      "lion-mountain-at-ferney.jpg"
    ],
    info: {
      location: "South West"
    }
  },

  "curepipe-botanical-garden": {
    slug: "curepipe-botanical-garden",
    name: "Curepipe Botanical Garden",
    region: "Central",
    coordinates: [-20.3167, 57.525],
    categories: ["local", "nature"],
    tagline: "A peaceful urban garden in the heart of Curepipe.",
    description: [
      "The Curepipe Botanical Garden is a tranquil green space in the heart of the island's main highland town.",
      "While smaller than Pamplemousses, it offers a peaceful retreat with well-maintained gardens and walking paths.",
      "The garden is popular with locals for morning walks and picnics."
    ],
    tips: [
      "Combine with a visit to nearby Trou aux Cerfs",
      "Good for a short stroll while exploring Curepipe",
      "Cooler climate than coastal areas"
    ],
    images: [
      "curepipe-botanical-garden.jpg"
    ],
    info: {
      location: "Curepipe"
    }
  },

  "curepipe-market": {
    slug: "curepipe-market",
    name: "Curepipe Market",
    region: "Central",
    coordinates: [-20.3167, 57.52],
    categories: ["local"],
    tagline: "Browse local produce, crafts, and everyday life in the highland town of Curepipe.",
    description: [
      "The market in Curepipe offers a glimpse into local Mauritian life, with stalls selling fresh produce, spices, and handicrafts. It's a good stop when exploring the central highlands."
    ],
    tips: ["Combine with Curepipe Botanical Garden", "Morning is busiest", "Cash is useful for small stalls"],
    images: [
      "curepipe-market.jpg"
    ],
    info: {
      location: "Curepipe"
    }
  },

  "ile-d-ambre": {
    slug: "ile-d-ambre",
    name: "Ile d'Ambre",
    region: "North East",
    coordinates: [-20.02, 57.68],
    categories: ["nature", "islands"],
    tagline: "A small island surrounded by mangroves, ideal for kayaking and nature trips.",
    description: [
      "Ile d'Ambre is a small island in the north-east lagoon, surrounded by mangroves and calm waters. It's a popular destination for kayaking tours and nature lovers."
    ],
    tips: ["Visit by kayak or boat tour", "Morning trips are calm", "Bring sunscreen and water"],
    images: [
      "ile-d-ambre-kayak-tour.jpg"
    ],
    info: {
      location: "North East lagoon"
    }
  },

  "temple-east-coast": {
    slug: "temple-east-coast",
    name: "Temple East Coast",
    region: "East",
    coordinates: [-20.2, 57.75],
    categories: ["local"],
    tagline: "A beautiful Hindu temple on the east coast of Mauritius.",
    description: [
      "The east coast of Mauritius is home to several Hindu temples. These colourful and ornate places of worship reflect the island's rich cultural heritage and offer a peaceful visit."
    ],
    tips: ["Dress modestly and remove shoes", "Ask before taking photos", "Respect worshippers"],
    images: [
      "temple-east-coast-1.jpg",
      "temple-east-coast-2.jpg",
      "temple-east-coast-3.jpg"
    ],
    info: {
      location: "East Coast"
    }
  },

  "petrin-forest": {
    slug: "petrin-forest",
    name: "Petrin Forest",
    region: "Central",
    coordinates: [-20.4, 57.45],
    categories: ["nature", "hideaways"],
    tagline: "A highland forest with endemic species and misty trails.",
    description: [
      "Petrin Forest is a highland forest reserve in central Mauritius, known for its endemic plant species and cooler climate.",
      "The forest trails offer a different experience from coastal attractions, with misty mornings and lush green vegetation.",
      "It's one of the best places to see Mauritius's native flora and experience the island's interior."
    ],
    tips: [
      "Bring a jacket - it can be cool and misty",
      "Great for bird watching",
      "Best visited in the morning"
    ],
    images: [
      "petrin-forest-1.jpg",
      "petrin-forest-2.jpg",
      "petrin-forest-3.jpg"
    ],
    info: {
      location: "Central Highlands"
    }
  },

  "balfour-waterfall": {
    slug: "balfour-waterfall",
    name: "Balfour Waterfall",
    region: "South",
    coordinates: [-20.228, 57.468],
    categories: ["nature", "waterfalls", "hideaways"],
    tagline: "A hidden waterfall requiring a jungle trek to discover.",
    description: [
      "Balfour Waterfall is one of Mauritius's hidden gems, requiring a trek through dense vegetation to reach.",
      "The waterfall is less visited than other falls on the island, offering a more adventurous and secluded experience.",
      "The journey to the falls is part of the adventure, passing through sugarcane fields and forest."
    ],
    tips: [
      "Hire a local guide - the trail is not marked",
      "Wear appropriate hiking shoes and clothing",
      "Best visited after rainfall"
    ],
    images: [
      "balfour-waterfall.jpg"
    ],
    info: {
      location: "South"
    }
  },

  "tamarin-river": {
    slug: "tamarin-river",
    name: "Tamarin River",
    region: "West",
    coordinates: [-20.325, 57.367],
    categories: ["nature"],
    tagline: "A scenic river perfect for kayaking and nature walks.",
    description: [
      "The Tamarin River flows through the west of Mauritius, offering beautiful scenery and opportunities for water activities.",
      "The river is popular for kayaking and stand-up paddleboarding, with calm waters perfect for beginners.",
      "The surrounding area is home to monkeys, and river tours often include wildlife spotting opportunities."
    ],
    tips: [
      "Book a kayak or SUP tour for the best experience",
      "Morning tours often include monkey sightings",
      "Combine with a visit to nearby Tamarin Bay"
    ],
    images: [
      "the-river-in-tamarin.jpg"
,
      "tamarin-river-1.jpg"
    ],
    info: {
      location: "Tamarin, West Coast"
    }
  },

  "leaping-rock": {
    slug: "leaping-rock",
    name: "Leaping Rock",
    region: "South",
    coordinates: [-20.5, 57.52],
    categories: ["nature", "hideaways"],
    tagline: "A natural rock formation perfect for cliff jumping into clear waters.",
    description: [
      "Leaping Rock is a popular spot for adventurous locals and visitors who enjoy cliff jumping into the crystal-clear waters below.",
      "The rock formation creates a natural platform from which to jump safely into the deep water.",
      "It's one of Mauritius's hidden adventure spots, known mainly to locals."
    ],
    tips: [
      "Check water conditions before jumping",
      "Only jump if you're a confident swimmer",
      "Best visited with locals who know the spot"
    ],
    images: [
      "leaping-rock.jpg"
    ],
    info: {
      location: "South Coast"
    }
  },

  "pton": {
    slug: "pton",
    name: "Piton Mountain",
    region: "Central",
    coordinates: [-20.25, 57.5],
    categories: ["nature", "local"],
    tagline: "A mountain offering panoramic views of the central plateau.",
    description: [
      "Piton Mountain is one of the prominent peaks in central Mauritius, offering hiking opportunities and scenic viewpoints.",
      "The mountain provides excellent views of the surrounding plateau and is popular with local hikers.",
      "At the summit, you'll find benches where you can rest and take in the panoramic scenery."
    ],
    tips: [
      "Start early for the best conditions",
      "Moderate fitness level required",
      "Bring snacks and water for the hike"
    ],
    images: [
      "mountain-piton.jpg",
      "bench-on-mt-piton.jpg"
,
      "pton-1.jpg"
    ],
    info: {
      location: "Central Mauritius"
    }
  },

  "grand-baie": {
    slug: "grand-baie",
    name: "Grand Baie",
    region: "North",
    coordinates: [-20.0102, 57.5831],
    categories: ["discover"],
    tagline: "The vibrant heart of northern Mauritius with shopping, dining, and nightlife.",
    description: [
      "Grand Baie is the most popular tourist area in northern Mauritius, known for its lively atmosphere and beautiful bay.",
      "The area offers excellent shopping, restaurants, bars, and nightclubs, making it the entertainment hub of the island.",
      "The bay itself is protected and perfect for swimming, with numerous water sports operators offering activities."
    ],
    tips: [
      "Visit the local market for souvenirs",
      "Great nightlife scene on weekends",
      "Book water activities from the beach"
    ],
    images: [
      "grand-baie-sunset-boulevard.jpg",
      "grand-baie-market.jpg"
    ],
    info: {
      location: "Grand Baie, North Coast"
    }
  },

  "caudan-waterfront": {
    slug: "caudan-waterfront",
    name: "Caudan Waterfront",
    region: "North",
    coordinates: [-20.161389, 57.498333],
    categories: ["discover"],
    tagline: "Port Louis's premier shopping and entertainment complex on the harbor.",
    description: [
      "Le Caudan Waterfront is Port Louis's main shopping and entertainment district, located along the harbor front.",
      "The complex features shops, restaurants, a cinema, casino, and regular cultural events.",
      "It's a great place to spend an afternoon or evening, combining shopping with harbor views."
    ],
    tips: [
      "Visit for shopping and dining",
      "Great for evening walks along the harbor",
      "The umbrella alley is perfect for photos"
    ],
    images: [
      "caudan-waterfront-port-louis-mauritius.jpg",
      "caudan-waterfront-port-louis.jpeg",
      "caudan-waterfront-port-louis-2.jpg",
      "caudan-waterfront-port-louis-3.jpg",
      "caudan-waterfront-port-louis-4.jpg",
      "caudan-waterfront-port-louis-5.jpg"
    ],
    info: {
      location: "Port Louis",
      openHours: "9:30 AM - 10:00 PM"
    }
  },

  "national-post": {
    slug: "national-post",
    name: "National Post",
    region: "North",
    coordinates: [-20.16, 57.50165],
    categories: ["history", "local"],
    tagline: "An iconic colonial-era post office in the heart of Port Louis, with a clock tower visible from miles away.",
    description: [
      "The National Post of Port Louis is an iconic building located in the heart of the city. Built in 1870, it is a colonial-era structure that has become a significant landmark in Mauritius.",
      "The post office is known for its striking architecture, which features a clock tower that is visible from miles away. The building is still used as a functioning post office, and visitors can send postcards and letters from there.",
      "It is also a popular tourist attraction, with many people stopping by to take photos and admire the beautiful building. The National Post of Port Louis is a testament to the island's rich history and is an important part of Mauritius's cultural heritage."
    ],
    tips: [
      "Send a postcard from the historic post office",
      "The clock tower is a great photo opportunity",
      "Combine with a visit to the Central Market nearby"
    ],
    images: [
      "national-post-port-louis-mauritius.jpg"
    ],
    info: {
      location: "Port Louis",
      openHours: "Open from 8:00 AM"
    }
  },

  "national-history-museum": {
    slug: "national-history-museum",
    name: "National History Museum",
    region: "North",
    coordinates: [-20.163167, 57.502361],
    categories: ["history", "local"],
    tagline: "Discover Mauritius's geology, wildlife, and human history from the Dutch era to the present day.",
    description: [
      "The National History Museum in Port Louis is a fascinating place to visit for anyone interested in the history of Mauritius. Housed in a beautiful colonial-era building, the museum features exhibits on the island's geology, flora and fauna, and the history of human settlements on the island from the time of the Dutch colonizers to the present day.",
      "Among the highlights of the museum are the displays on the extinct dodo bird, a unique species that once lived on the island but was hunted to extinction, and the replica of the famous Pamplemousses Garden, a stunning botanical garden that is a popular tourist attraction.",
      "The museum also features exhibits on the island's social and cultural history, including displays on the diverse ethnic groups that have made their home on Mauritius over the centuries. Overall, the National History Museum is a must-visit destination for anyone looking to gain a deeper understanding of the rich and diverse history of Mauritius."
    ],
    tips: [
      "Allow at least 1–2 hours for a full visit",
      "The dodo exhibits are a highlight",
      "Combine with a trip to Pamplemousses Botanical Garden"
    ],
    images: [
      "national-history-museum-port-louis-mauritius.jpg"
    ],
    info: {
      location: "Port Louis",
      openHours: "Open from 8:00 AM"
    }
  },

  "deux-cocos-island": {
    slug: "deux-cocos-island",
    name: "Ile des Deux Cocos",
    region: "East",
    coordinates: [-20.445, 57.72],
    categories: ["islands", "nature", "hideaways"],
    tagline: "A private island retreat with a colonial villa and pristine beaches.",
    description: [
      "Ile des Deux Cocos is a small private island located in the Blue Bay Marine Park, known for its beautiful beaches and historic villa.",
      "The island features a restored colonial villa that once served as a governor's retreat and is now available for day visits and private events.",
      "Visitors can enjoy pristine beaches, excellent snorkeling in the marine park, and a taste of island exclusivity."
    ],
    tips: [
      "Book in advance - access is limited",
      "Great snorkeling in the marine park",
      "Perfect for a romantic day trip"
    ],
    images: [
      "deux-cocos-island.jpg",
      "blue-bay-sea-turtle.jpg",
      "ile-des-deux-cocos-in-blue-bay-min.jpg",
      "ile-des-deux-cocos-min.jpg",
      "seaturtle-in-blue-bay.jpg",
      "snorkeling-and-boat-tours-blue-bay.jpg",
      "snorkeling-in-mauritius.jpg",
      "snorkeling-spot-at-le-morne.jpg",
      "snorkeling-spot-in-mauritius-le-morne.jpg"
    ],
    info: {
      location: "Blue Bay, East Coast"
    }
  }
};

// Helper functions
export function getPlaceBySlug(slug: string): PlaceDetails | undefined {
  return PLACE_DETAILS[slug];
}

export function getAllPlaceSlugs(): string[] {
  return Object.keys(PLACE_DETAILS);
}

export function getPlacesByCategory(category: PlaceCategory): PlaceDetails[] {
  return Object.values(PLACE_DETAILS).filter(place => 
    place.categories.includes(category)
  );
}

export function getPlacesByRegion(region: string): PlaceDetails[] {
  return Object.values(PLACE_DETAILS).filter(place => 
    place.region.toLowerCase() === region.toLowerCase()
  );
}

export function getAllPlaces(): PlaceDetails[] {
  return Object.values(PLACE_DETAILS);
}
