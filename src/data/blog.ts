/**
 * Blog data for the blog section
 * Content sourced from mauritiusexplored.com
 */

export type BlogCategory = 
  | "discover-mauritius" 
  | "beaches"
  | "nature" 
  | "activities" 
  | "culinary" 
  | "culture" 
  | "accommodation" 
  | "wedding";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  images?: string[];
  categories: BlogCategory[];
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number; // in minutes
  featured?: boolean;
  /**
   * Explicit featured slot on the blog listing:
   *   1 = big (primary) featured card
   *   2 / 3 = additional featured cards
   *   undefined / null = not in a featured slot (may still have featured=true
   *   on older data; see src/app/blog/page.tsx for the fallback logic).
   */
  featuredRank?: 1 | 2 | 3 | null;
}

export const BLOG_CATEGORIES: { id: BlogCategory; label: string }[] = [
  { id: "discover-mauritius", label: "Discover Mauritius" },
  { id: "beaches", label: "Beaches" },
  { id: "nature", label: "Nature" },
  { id: "activities", label: "Activities" },
  { id: "culinary", label: "Culinary" },
  { id: "culture", label: "Culture" },
  { id: "accommodation", label: "Where to Stay" },
  { id: "wedding", label: "Weddings" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "on-the-heights-of-chamarel",
    title: "On the Heights of Chamarel",
    excerpt: "Up in the lush mountains of the South West of Mauritius, lies the picturesque village of Chamarel. Known for the Seven Coloured Earth, its mesmerizing waterfall, its people, coffee and authentic Mauritian cuisine.",
    content: [
      "Up in the lush mountains of the South West of Mauritius, lies the picturesque village of Chamarel. Known for the Seven Coloured Earth, its mesmerizing waterfall, its people, coffee and authentic Mauritian cuisine, this unique sanctuary is a must-see when you visit the island.",
      "If you want to discover the heart itself of the island, you can spend a whole day in the village, starting off with delicious coffee with a view at Le Chamarel restaurant. With a peaceful bucolic atmosphere in a wonderful setting, 260 metres above sea level, you can enjoy a unique and sensational panoramic view over the west coast and the Indian Ocean, going all the way from Le Morne to La Tourelle with Bénitiers island, right in the middle.",
      "For lunch, embark on a Creole culinary journey with authentic local cooking at Le Chamarel Restaurant which offers everyday a unique lunch experience known as La Tab'Diri. Take a seat at one of the tables in the shade of big trees or on the deck overlooking the view and be ready to discover flavours you have never experienced before. With a plethora of authentic and delicious Mauritian Creole dishes in front of you, do not hesitate to just dive in and taste everything: rice, green papaya salad, octopus, freshly made chili sauce, chicken curry… There's no better way to discover the local food!",
      "After an amazing lunch, you can head to the Seven Coloured Earth, one of the most visited wonders of Mauritius. Located within a large, dense forest, these dunes of earth with several variations of colours, oscillating between ochre, brown, red and purple, are believed to be due to the presence of volcanic ash containing mineral oxides of different colours exposed by erosion over the centuries. This rare geological curiosity attracts hundreds of visitors every day. Take the time to check out the pen of the giant Aldabra tortoises…",
      "While you are at the park, you should also make a stop at the entrance to take a look at the impressive Chamarel waterfall, the highest one of Mauritius with its 100 metres. Surrounded by lush nature, with volcanic rock dating back millions of years and mountains in the background, it is without a doubt one the most beautiful waterfalls in Mauritius, the perfect spot for an outstanding Instagram picture. If you feel like exploring more in depth, you can take a walk to see it up close and take a dip in the fresh water pool.",
      "And to end this perfect day, why not head back to Le Chamarel restaurant to sip on a rum cocktail while nibbling on local snacks? We can assure you that it is one of the most wonderful spots in Mauritius to watch the sun setting on the ocean!"
    ],
    image: "chamarel-heights.jpg",
    categories: ["discover-mauritius", "nature", "culinary"],
    tags: ["chamarel", "seven coloured earth", "mauritius", "nature", "local food"],
    author: "Mauritius Explored",
    publishedAt: "2026-04-10",
    readTime: 5,
    featured: true,
  },
  {
    slug: "feel-the-south-of-mauritius-at-kazalala",
    title: "Feel the South of Mauritius at Kaz'Alala",
    excerpt: "Located at the heart of Heritage Bel Ombre in the south of Mauritius, Kaz'Alala Hosted B&B is an invitation to discover the authentic lifestyle of the island as well as its historical and natural heritage.",
    content: [
      "Located at the heart of Heritage Bel Ombre in the south of Mauritius, Kaz'Alala Hosted B&B is an invitation to discover the authentic lifestyle of the island as well as its historical and natural heritage. With a boutique hotel service, the guest house encourages you to make the most of your stay and to live unforgettable experiences with your loved ones!",
      "You can get behind the wheel of a Mini Moke and drive along the southern coast, exploring the picturesque villages of Bel Ombre and Baie du Cap, stop for a while and have a chat with a fisherman, you can take a break on the beautiful beach of La Prairie and watch the sun set on the Indian Ocean with Le Morne Brabant mountain as backdrop. You could also explore the Heritage Nature Reserve in a buggy or on a quad, doing some off-road through the sugarcane fields, enjoy a scrumptious picnic by the river before taking a dip next to the waterfall. And why not go next door from Kaz'Alala to the Château de Bel Ombre for a unique teatime with the view on the sumptuous French garden and the golf course?",
      "Kaz'Alala is uniquely Mauritian… It consists of four ancient buildings of the sugar estate which have been painted red, blue, yellow and green – the colours of the Mauritian flag – and transformed to accommodate twenty independent and modern guest rooms with en-suite bathrooms. They each have an outside access to a garden area but are all connected to common areas namely the Creole veranda, the dining room and the kitchen where you can meet and bond with your neighbours and spend lovely evenings cooking with them, chatting over a drink, having dinner or enjoying a carom game. Kaz'Alala's garden is also an invitation to appreciate the outdoor life and the incredible year-long good weather with hammocks and swings in the shade of fruit trees.",
      "You can also lounge next to the pool and work on your tan in the hot summer days and during the cool winter evenings, you will surely appreciate the fireplace to warm up and toast marshmallows.",
      "When staying at Kaz'Alala, you will get to know the simple yet warm Mauritian welcome for which the island is well-known. The staff will make you feel at home so fast that you will not want to leave. You will also taste mouth-watering Mauritian breakfast every morning with a special buffet at the restaurant. And if you wish to have dinner, you will be glad to know that the restaurant also offers this possibility with amazing traditional food such as fried rice with salted fish, grilled meat, curries or rougaille – a delicious sauce made with Mauritian tomatoes. And for good recommendation of things to do, to see and to eat in the region, the staff will be more than happy to help so don't hesitate to ask.",
      "If you are looking for an original and authentic place to stay at, if you are looking to make new experiences, to discover life as a local, Kaz'alala is without a doubt the place for you!"
    ],
    image: "kazalala-bel-ombre.jpg",
    categories: ["discover-mauritius", "accommodation", "nature"],
    tags: ["bel ombre", "kaz'alala", "mauritius", "b&b", "authentic"],
    author: "Mauritius Explored",
    publishedAt: "2026-04-10",
    readTime: 6,
  },
  {
    slug: "best-waterfalls-of-mauritius",
    title: "14 Best Must-Visit Waterfalls of Mauritius",
    excerpt: "After a few years of exploring Mauritius Island, we got to discover some of the best waterfalls the island has to offer. From the famous Chamarel Waterfall and Eau Bleu to Cascade Léon, 500 Pieds, and hidden gems across the island.",
    content: [
      "After a few years of exploring Mauritius Island, we got to (in great detail) some of the best waterfalls the island has to offer. This is what we do best and chances are most of you enjoy a good hike. In fact, as a local, this is something I thoroughly enjoy doing (especially when you've been to all the beaches around the island and now look like a grilled lobster).",
      "I know, now you think – \"But I thought Mauritius was all about beaches and luxury resorts?!\". …Well, friends, let me tell you that the paradise island is much more than what it is famous for. There are many reasons why Mauritius is known as 'heaven on Earth' – it is the ideal destination for thrill-seekers, nature lovers and anyone wanting to rediscover their sense of wonder for our planet's best islands. Mauritius got so much more to offer than Maldives or Seychelles.",
      "There are waterfalls (including one underwater), amazing mountains, treks and a collection of stunning natural wonders that remain virgin and unexplored.",
      "## Eau Bleu Waterfall\n\nWhen it comes to natural waterfall in Mauritius, Eau Bleu (or also known as Cascade La Source) definitely takes the spotlight. Though stunning, I would not say that it is the easiest to reach but one thing's for sure – it's worth all the travel and effort as this is where you get to bask in turquoise water! I mean, where can you find blue water at a waterfall? The waterfall originates from the nearby river and comes out on three different levels of the terrain.",
      "## Chamarel Waterfall\n\nWaterfalls in Mauritius have their own special magic but Chamarel Waterfall stands out from the lot – after all, it is the island's highest waterfall so you can expect it to be one of the most spectacular too! Needless to say, it is also a waterfall that is popular among Instagrammers. You'll be wandering through thick tropical forests before getting to the waterfall where you get to relish on water gushing down from some good 80 metres!",
      "## 7 Cascades (Tamarind Falls)\n\nYou said you wanted to visit at least one waterfall when in Mauritius, right? But how about 7 of them, all at once?! With an impressive scenery on offer, the natural wonder of 7 Cascades (or also known as Tamarind Falls) is stunningly hidden deep down a valley between the region of Curepipe and Black River. Although there are seven waterfalls in total, only three of them can be easily reached.",
      "## Rochester Falls\n\nAs you explore the tranquil village of Souillac in the south of Mauritius, don't miss out on a stop at Rochester Falls – a unique waterfall that gushes down on rectangular flank rocks. The natural wonder is unique on its own due to the rectangular flank rocks it features.",
      "## Alexandra Falls\n\nAvid trailers in Mauritius sure do know that the best routes often lead to the best waterfalls and this is the case for Alexandra Falls as this majestic drop sits right in the middle of beautiful natural landscapes. The wispy waterfall is best enjoyed from a viewpoint that's accessible on the way to the Ganga Talao crater lake.",
      "## Grand River South East Waterfall\n\nThere's no way you see the best of Mauritius if you do not sign up for a trip to the ever famous Ile aux Cerfs and if luck is on your side, your organised day tour might most likely include a visit to GRSE (Grand River South East) Waterfall which is mostly only accessible by boat.",
      "## Balfour Garden\n\nNestled in the heart of Beau Bassin-Rose Hill, Balfour Garden is a charming green oasis that offers a peaceful escape from the bustle of urban life. Known for its wide open lawns, shaded pathways, and collection of tropical trees, the garden is a favorite spot for locals to relax, exercise, or enjoy a quiet picnic. With its laid-back atmosphere and scenic surroundings, Balfour Garden perfectly reflects the tranquil beauty that makes Mauritius so special.",
      "## Cascade Léon\n\nHidden in the lush southwest of Mauritius near Chamarel, Cascade Léon is one of the island's most breathtaking and untouched waterfalls. Surrounded by dense forest and accessible via a scenic hike, this powerful cascade plunges dramatically into a rocky basin below, offering an unforgettable experience for nature lovers and adventure seekers. Far from the crowds, Cascade Léon captures the raw, wild beauty of Mauritius, making it a must-visit for those looking to explore beyond the usual tourist spots.",
      "## Cascade 500 Feet\n\nTucked away in the wild landscapes of Chamarel, Cascade 500 Pieds (500 Feet Waterfall) is one of the most spectacular and lesser-known natural wonders in Mauritius. As its name suggests, the waterfall drops dramatically from a towering height into a rugged valley below, creating a breathtaking sight surrounded by dense greenery. Reaching it requires a scenic and adventurous hike, making it a favorite for explorers seeking raw, untouched beauty far from the usual tourist trails.",
      "## Cascades Mamzel\n\nLocated in the lush south of Mauritius, Cascade Mamzel is a hidden gem known for its raw beauty and peaceful surroundings. Tucked deep within dense vegetation, this secluded waterfall offers a tranquil escape far from the usual tourist routes. Reaching it often involves a scenic hike, rewarding visitors with refreshing natural pools and the soothing sound of cascading water. Cascade Mamzel perfectly captures the untouched, wild charm of southern Mauritius.",
      "## Bonus: Underwater Waterfall\n\nLe Morne also offers a spectacular natural optical illusion that you can admire from the comfort of a helicopter or seaplane experience. The fine sand being carried by the running ocean water and underwater currents make it look like there is a waterfall right in the middle of the sea!"
    ],
    image: "mauritius-waterfalls.jpg",
    images: [
      "eau-bleue-waterfall-in-mauritius.jpg",
      "chamarel-waterfall.jpg",
      "7-waterfall-hike.jpg",
      "rochester-falls.jpg",
      "alexandra-falls.jpg",
      "grse-waterfall-1.jpg",
      "balfour-waterfall.jpg",
      "cascade-leon-view-point.jpg",
      "500-pieds-waterfall.jpg",
      "cascade-mamzel-1.jpg",
      "underwater-waterfall-in-mauritius.jpg",
    ],
    categories: ["nature", "activities"],
    tags: ["waterfalls", "hiking", "mauritius", "nature", "adventure"],
    author: "Mauritius Explored",
    publishedAt: "2026-04-10",
    readTime: 16,
    featured: true,
  },
  {
    slug: "chalets-chamarel-best-view-mauritius",
    title: "Chalets Chamarel: The Best View to Wake Up To",
    excerpt: "How would you like to plan a romantic getaway or a weekend with friends far from everything, up in the mountain with an amazing view on the Ocean?",
    content: [
      "How would you like to plan a romantic getaway or a weekend with friends far from everything, up in the mountain with an amazing view on the Ocean? Nestled on the mountain of Piton La Porte in Chamarel, the boutique hotel \"Chalets Chamarel\" offers a breath-taking panoramic view of the west coast of Mauritius, all the way from the mythical Le Morne to La Tourelle and Tamarin Bay with Bénitiers Island and the turquoise lagoon in between. It is, without a doubt, one of the most stunning views you will enjoy in Mauritius.",
      "Picture yourself sipping a cocktail in a sunbed next to the infinity pool facing this picturesque scenery as the sun is setting on the ocean…",
      "On the opposite side of the hotel, you can admire the lush green valleys of Chamarel forest all the way to Bel Ombre and the sea of the south coast. A view you cannot get enough of… Good thing because the beautiful 11 chalets of this boutique hotel – nine of which have one bedroom and two with two bedrooms – offer both those wonderful views with two terraces: one facing the view on the coast and the other one looking towards the forest.",
      "Stylish and modern but cosy at the same time, they each have their own kitchen and bathroom with a shower enclosed in glass with views on a small private garden. Nature is everywhere! And you do not need to worry about privacy; the chalets are built spaciously apart on the edge of the forest, for a perfectly intimate setting.",
      "And for an even greater nature immersion experience, you can take a long walk in Lavilleon Natural Forest, which is on the estate and houses beautiful patches of native vegetation with more than 80 different species of endemic trees including magnificent ebony trees that are over 300 years old. It is also home to a bird's sanctuary and if you are lucky, you can see some rare ones.",
      "For all the thrill-seekers out there who want an adrenaline rush, a 250m zip-line located 85 meters above a canyon will surely entertain you. You can also walk across a Nepalese bridge which offers an incredible view on a rampart and a superb waterfall on the other side. The estate also has an archery practice if you feel like shooting some arrows.",
      "Did all this action make you hungry? Great! The SeaForest Restaurant of Chalets Chamarel is perched on top of a hill in front of the pool and also offers a spectacular view. There, you will enjoy a mouth-watering Mauritian typical meal with venison meat and other delights from the estate, or take your pick from an international cuisine selection.",
      "There are also quite a few activities in the close surroundings of the boutique hotel: the Seven Coloured Earths and Chamarel Waterfall which share the same entrance as the estate, the small and quaint village of Chamarel perched in the mountains, the rum distillery, Black River Gorges Park… So many possibilities, but be sure to make it on time for the remarkable sunset at Chalets Chamarel!"
    ],
    image: "chalets-chamarel.jpg",
    categories: ["accommodation", "discover-mauritius", "nature"],
    tags: ["chamarel", "lodge", "mauritius", "nature", "luxury"],
    author: "Mauritius Explored",
    publishedAt: "2026-04-10",
    readTime: 6,
  },
  {
    slug: "say-i-do-in-mauritius",
    title: "Say \"I Do\" in Mauritius",
    excerpt: "Are you planning to get married on the paradise island of Mauritius? Great choice! With its amazing sandy beaches, lush mountains and ideal climate, there is no better place to say \"I do\".",
    content: [
      "Are you planning to get married on the paradise island of Mauritius? Great choice! With its amazing sandy beaches, lush mountains and ideal climate, there is no better place to say \"I do\". This tropical country offers countless possibilities depending on your preferences, your budget and the number of guests.",
      "## Choosing Your Venue\n\nWhen you think of your big day, where do you picture yourself celebrating your union with your partner? There are many options to choose from, each with their perks and setbacks. One of the most popular choices is getting married in a hotel. Which is not surprising since Mauritius is well-known for its hospitality industry and has a very wide range of hotels, from 2 to 5 stars. The best part of getting married in a hotel is that everything is taken care of, from the menu and the flowers, to the setup and the music.",
      "If you would rather walk down the aisle surrounded by nature, you can have your wedding in one of the domains, located mostly in the centre of the island. Since they are usually far from inhabited regions, you can party until the early hours of the morning and it can accommodate many guests.",
      "## Theme and Decorations\n\nWhat about the theme or the colours of your wedding? Professional event planners blend imagination, creativity and know-how to create unique and memorable wedding themes. They will plan the decoration of your wedding according to your desires while you remain stress free. You could also create some unique souvenirs of your wedding for your guests or for yourself.",
      "## Food and Drinks\n\nBut let's talk about an essential part of a wedding: food and drinks! Buying your own alcohol and beverages is the best and cheapest option. As for food, you have quite a few options depending on the time of the reception, the number of guests and your preferences. Would you rather have a seated dinner or a buffet? Or do you prefer cocktail-style receptions with canapés and hors d'oeuvres?",
      "## The Dress and Beauty\n\nYour reception is all taken care of, now, let's focus on you! What will you be wearing on the D Day? Whether your dream dress is modern, princess-like or just simply elegant, local designers offer a large number of services. Not only do they design and create a unique wedding dress for you, but they also accompany you in choosing the proper fabrics, help with the styling and accessories.",
      "## Capturing the Memories\n\nFor even more fond and fun memories to look at, don't forget to book a Photobooth! It will bring a crazy and funny ambiance. The best way to remember your big day? A video or a lot of photographs of course! Professional photographers know how to capture this day and put a smile on your faces!",
      "All is set, everything has been taken care of, you can now just sit back, relax and really enjoy your wedding with your loved ones!"
    ],
    image: "wedding-mauritius.jpg",
    categories: ["wedding", "discover-mauritius"],
    tags: ["wedding", "mauritius", "destination wedding", "planning"],
    author: "Mauritius Explored",
    publishedAt: "2026-04-10",
    readTime: 8,
  },
  {
    slug: "hiking-spots-in-mauritius",
    title: "Hiking Spots to Explore in Mauritius",
    excerpt: "Hiking in Mauritius is definitely something you should add to your bucket list. The tropical island has some picturesque natural panoramas to boast, and ideal weather conditions make it perfect for hikes.",
    content: [
      "Hiking in Mauritius is definitely something you should add to your bucket list. The tropical island has some picturesque natural panoramas to boast, and you will definitely wish to include to your memories. Ideal weather conditions on the island make it a good place for hikes. So, let us explore some of the most popular hiking spots of Mauritius.",
      "## Black River Gorges National Park\n\nThe first spot to visit, be it for hiking or just to admire the view, is Black River Gorges National Park. The best period of the year to plan a hike in the gorges is between April and September. As you probably know, there is not big risk of flash rainfalls during winter time in Mauritius. Seeing as the terrain can get pretty muddy in the gorges, it is best to trek there when the weather is sunny.",
      "When you trek through the gorges towards Mare Longue, you will have the possibility to walk along the Mare Aux Joncs waterfalls. Brace yourselves for lush green sceneries. All the information you need can be obtained from the Black River Information Centre, which is the starting point of this hiking course.",
      "## Sept Cascades (Tamarind Falls)\n\nSept Cascades, which is the colloquial name for Tamarin Falls hiking route, is a must for nature lovers. Luxuriant greenery and the iconic waterfalls make this spot perfect for group excursions. Ideally, you will want to visit Tamarin Falls with someone who knows the terrain. There are outdoor adventure companies in Mauritius that offer hiking packages for Sept Cascades.",
      "If you want to spice things up, outdoor adventure companies also offer activities such as zip lining, abseiling and canyoning. Whether you are local or visiting the island of Mauritius, a trip to Sept Cascades promises to be exhilarating.",
      "## Maccabee Forest\n\nThe endemic Maccabee Forest is one of the most memorable nature walks in Mauritius. This hiking and trekking course is connected to the Black River Gorges. On this particular trail, it is habitual to encounter rare endemic birds. Evidently, the more responsible and quiet hikers shall get more opportunities to see endemic animals such as Pink Pigeons, Echo Parakeets and wild macaques.",
      "You will get all the info you need for your hiking or trekking adventures in this area from the Petrin Information Centre."
    ],
    image: "hiking-mauritius.jpg",
    categories: ["activities", "nature"],
    tags: ["hiking", "mauritius", "nature", "adventure", "black river gorges"],
    author: "Mauritius Explored",
    publishedAt: "2026-04-10",
    readTime: 5,
  },
];

// Helper functions
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.slug === slug) || null;
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter(post => post.categories.includes(category));
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter(post => post.featured);
}

export function getRelatedBlogPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];
  
  // Find posts with matching categories or tags
  return BLOG_POSTS
    .filter(post => post.slug !== slug)
    .map(post => {
      const categoryMatches = post.categories.filter(c => currentPost.categories.includes(c)).length;
      const tagMatches = post.tags.filter(t => currentPost.tags.includes(t)).length;
      return { post, score: categoryMatches * 2 + tagMatches };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
