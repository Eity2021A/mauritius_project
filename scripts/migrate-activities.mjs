/**
 * Migration script to add region and coordinates to activity-details.ts
 * Run with: node scripts/migrate-activities.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Activity coordinates and regions from ITINERARY_ACTIVITIES, location fields, and inferred positions
const ACTIVITY_DATA = {
  // Catamaran & Sea activities
  "catamaran-cruises": { region: "Various", coordinates: [-20.0122, 57.58] },
  "catamaran-ile-aux-benitiers": { region: "West", coordinates: [-20.4167, 57.3333] },
  "catamaran-ile-aux-cerfs": { region: "East", coordinates: [-20.27222, 57.80417] },
  "catamaran-live-aboard": { region: "Various", coordinates: [-20.0074, 57.5783] },
  "swim-with-dolphins": { region: "West", coordinates: [-20.32, 57.37] },
  "sunset-cruise": { region: "North", coordinates: [-20.0074, 57.5783] },
  "whale-watching": { region: "West", coordinates: [-20.32, 57.37] },
  "snorkeling-blue-bay": { region: "South East", coordinates: [-20.4342, 57.7242] },
  "scuba-diving": { region: "Various", coordinates: [-20.2824, 57.3625] },
  
  // Air activities
  "helicopter-tour": { region: "Various", coordinates: [-20.16, 57.5] },
  "seaplane-le-morne": { region: "South West", coordinates: [-20.452424, 57.312697] },
  "seaplane-north": { region: "North", coordinates: [-20.0074, 57.5783] },
  "skydiving": { region: "Various", coordinates: [-20.23, 57.53] },
  "parasailing": { region: "West", coordinates: [-20.28, 57.36] },
  
  // Land activities
  "quad-biking": { region: "South", coordinates: [-20.44, 57.41] },
  "horse-riding-le-morne": { region: "South West", coordinates: [-20.455, 57.32] },
  "horse-riding": { region: "Various", coordinates: [-20.452424, 57.312697] },
  
  // Hiking
  "hiking-le-morne": { region: "South West", coordinates: [-20.46, 57.31] },
  "hiking-le-pouce": { region: "Central", coordinates: [-20.2167, 57.5167] },
  "seven-cascades": { region: "South West", coordinates: [-20.375, 57.435] },
  "seven-waterfalls": { region: "South West", coordinates: [-20.375, 57.435] },
  
  // Water sports
  "underwater-scooter": { region: "Various", coordinates: [-20.0074, 57.5783] },
  "underwater-waterfall": { region: "South West", coordinates: [-20.452424, 57.312697] },
  "undersea-walk": { region: "North", coordinates: [-20.0074, 57.5783] },
  "kayaking-ile-dambre": { region: "North East", coordinates: [-20.02, 57.68] },
  "stand-up-paddle": { region: "Various", coordinates: [-20.325, 57.367] },
  "seakart-adventure": { region: "West", coordinates: [-20.2824, 57.3625] },
  
  // Islands
  "ile-aux-cerfs": { region: "East", coordinates: [-20.27222, 57.80417] },
  "ile-aux-benitiers": { region: "West", coordinates: [-20.4167, 57.3333] },
  "ile-au-phare": { region: "East", coordinates: [-20.405, 57.705] },
  "ile-aux-aigrettes": { region: "South East", coordinates: [-20.42, 57.72] },
  "ilot-gabriel": { region: "North East", coordinates: [-19.8833, 57.6667] },
  "speedboat-ilot-gabriel": { region: "North East", coordinates: [-19.8833, 57.6667] },
  
  // Nature & Attractions
  "la-vallee-des-couleurs": { region: "South", coordinates: [-20.45, 57.50] },
  "chamarel-waterfall": { region: "South West", coordinates: [-20.440229, 57.373342] },
  "seven-coloured-earth": { region: "South West", coordinates: [-20.44028, 57.37333] },
  "blue-bay-marine-park": { region: "South East", coordinates: [-20.442138, 57.719016] },
  "pamplemousses-botanical-garden": { region: "North", coordinates: [-20.1049, 57.573] },
  "black-river-gorges": { region: "South West", coordinates: [-20.41, 57.42] },
  "la-vanille-nature-park": { region: "South", coordinates: [-20.48, 57.55] },
  "grand-bassin": { region: "South", coordinates: [-20.4083, 57.4917] },
  "gris-gris": { region: "South", coordinates: [-20.515, 57.518] },
  "le-souffleur": { region: "South", coordinates: [-20.49, 57.62] },
  "rochester-falls": { region: "South", coordinates: [-20.50262, 57.51695] },
  "alexandra-falls": { region: "South West", coordinates: [-20.402, 57.452] },
  "albion-lighthouse": { region: "West", coordinates: [-20.2111, 57.4011] },
  "jardin-telfair": { region: "South", coordinates: [-20.5167, 57.5167] },
  "maconde-viewpoint": { region: "South West", coordinates: [-20.434, 57.358] },
  "caverne-patate": { region: "Various", coordinates: [-19.75, 63.42] }, // Rodrigues
  
  // Port Louis
  "port-louis": { region: "North", coordinates: [-20.1619, 57.4989] },
};

// Read activity-details.ts
const filePath = join(rootDir, 'src/data/activity-details.ts');
let content = readFileSync(filePath, 'utf-8');

// Function to add region and coordinates after name line
function addDataToActivity(content, slug, data) {
  // Find the activity entry and add region + coordinates after name line
  const namePattern = new RegExp(
    `("${slug}":\\s*\\{\\s*slug:\\s*"[^"]+",\\s*name:\\s*"[^"]+")`,
    's'
  );
  
  const match = content.match(namePattern);
  if (match) {
    const dataStr = `${match[1]},\n    region: "${data.region}",\n    coordinates: [${data.coordinates[0]}, ${data.coordinates[1]}]`;
    content = content.replace(match[1], dataStr);
    return { content, found: true };
  }
  return { content, found: false };
}

// Process each activity
let processed = 0;
let notFound = [];

for (const [slug, data] of Object.entries(ACTIVITY_DATA)) {
  const result = addDataToActivity(content, slug, data);
  content = result.content;
  if (result.found) {
    processed++;
  } else {
    notFound.push(slug);
  }
}

// Write updated content
writeFileSync(filePath, content, 'utf-8');
console.log(`Processed ${processed} activities`);
if (notFound.length > 0) {
  console.log(`Not found: ${notFound.join(', ')}`);
}
console.log('Migration complete!');
