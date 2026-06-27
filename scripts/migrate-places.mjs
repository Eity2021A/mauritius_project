/**
 * Migration script to add coordinates to place-details.ts
 * Run with: node scripts/migrate-places.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Coordinates from PLACE_POSITIONS and other verified sources
const COORDINATES = {
  // Waterfalls
  "cascade-leon": [-20.498, 57.518],
  "chamarel-waterfall": [-20.440229, 57.373342],
  "rochester-falls": [-20.50262, 57.51695],
  "seven-waterfall": [-20.375, 57.435],
  "alexandra-falls": [-20.402, 57.452],
  "eau-bleu-waterfall": [-20.382, 57.648],
  "500-feet-waterfall": [-20.405, 57.455],
  "grse-waterfall": [-20.348, 57.758],
  "balfour-waterfall": [-20.228, 57.468],
  
  // Nature & Landmarks
  "7-coloured-earth": [-20.44028, 57.37333],
  "pamplemousses-botanical-garden": [-20.1049, 57.573],
  "black-river-gorges": [-20.41, 57.42],
  "grand-bassin": [-20.4083, 57.4917],
  "trou-aux-cerfs": [-20.3167, 57.5167],
  "chamarel-view-point": [-20.4380, 57.3750],
  "crystal-rock": [-20.4167, 57.3200],
  
  // Historic & Cultural
  "cap-malheureux": [-19.986529, 57.62228],
  "bois-des-amourettes": [-20.365, 57.720],
  "chateau-de-bel-ombre": [-20.501982, 57.412754],
  "chateau-de-labourdonnais": [-20.0736, 57.6176],
  "aapravasi-ghat": [-20.158611, 57.503056],
  "national-post": [-20.16, 57.50165],
  "national-history-museum": [-20.163167, 57.502361],
  "champ-de-mars": [-20.169159, 57.510089],
  
  // Hideaways & Secret Spots
  "albion-lighthouse": [-20.2111, 57.4011],
  "secret-cave-gris-gris": [-20.515, 57.518],
  "natural-bridge": [-20.480467, 57.669382],
  "les-salines-salt-pans": [-20.3250, 57.3667],
  "maconde": [-20.434, 57.358],
  
  // Mountains & Hikes
  "le-morne-mountain": [-20.452424, 57.312697],
  "le-pouce-mountain": [-20.2167, 57.5167],
  "andrea-lodge-hike": [-20.44, 57.41],
  "petrin-forest": [-20.40, 57.45],
  "pton": [-20.25, 57.50],
  
  // Islands
  "ile-aux-cerfs": [-20.27222, 57.80417],
  "ile-aux-benitiers": [-20.4167, 57.3333],
  "ile-au-phare": [-20.405, 57.705],
  "mouchoir-rouge": [-20.26, 57.78],
  "ilot-sancho": [-20.40, 57.72],
  "ilot-flamants": [-20.48, 57.60],
  "ile-d-ambre": [-20.02, 57.68],
  "deux-cocos-island": [-20.4450, 57.7200],
  
  // Port Louis & Towns
  "port-louis": [-20.1619, 57.4989],
  "mahebourg-village": [-20.405951, 57.703423],
  "caudan-waterfront": [-20.161389, 57.498333],
  "citadel-fort": [-20.163658, 57.510166],
  "grand-baie": [-20.0074, 57.5783],
  
  // South places
  "domaine-saint-aubin": [-20.485, 57.555],
  "telfair-garden": [-20.5167, 57.5167],
  "le-soufleur": [-20.49, 57.62],
  "la-nef": [-20.48, 57.55],
  "moulin": [-20.501, 57.413],
  "bassin-blanc": [-20.42, 57.48],
  "leaping-rock": [-20.50, 57.52],
  
  // West places
  "banyan-tree-la-gaulette": [-20.44, 57.34],
  "rhumerie-de-chamarel": [-20.435, 57.385],
  "tamarin-river": [-20.325, 57.367],
  
  // Central
  "curepipe-botanical-garden": [-20.3167, 57.5250],
  "curepipe-market": [-20.3167, 57.5200],
  
  // East
  "temple-east-coast": [-20.20, 57.75],
  
  // Various
  "hindu-temple": [-20.25, 57.55],
};

// Region fallbacks for places not in COORDINATES
const REGION_FALLBACKS = {
  "North": [-19.99, 57.6],
  "North West": [-20.02, 57.52],
  "West": [-20.3, 57.38],
  "South West": [-20.41, 57.39],
  "South": [-20.45, 57.54],
  "South East": [-20.42, 57.72],
  "East": [-20.2, 57.75],
  "Central": [-20.25, 57.53],
  "North East": [-20.02, 57.68],
  "Various": [-20.23, 57.53],
};

// Read place-details.ts
const filePath = join(rootDir, 'src/data/place-details.ts');
let content = readFileSync(filePath, 'utf-8');

// Function to add coordinates after region line
function addCoordinatesToPlace(content, slug, coords) {
  // Find the pattern: "slug": { ... region: "Region", and insert coordinates after
  const regionPattern = new RegExp(
    `("${slug}":\\s*\\{[^}]*?region:\\s*"[^"]+")`,
    's'
  );
  
  const match = content.match(regionPattern);
  if (match) {
    const coordStr = `${match[1]},\n    coordinates: [${coords[0]}, ${coords[1]}]`;
    content = content.replace(match[1], coordStr);
  }
  return content;
}

// Process each place
const placeSlugs = Object.keys(COORDINATES);
let processed = 0;

// First, handle places with known coordinates
for (const slug of placeSlugs) {
  const coords = COORDINATES[slug];
  content = addCoordinatesToPlace(content, slug, coords);
  processed++;
}

// Find any places that don't have coordinates yet
const missingPattern = /("([a-z0-9-]+)":\s*\{[^}]*?region:\s*"([^"]+)")/g;
let match;
const allMatches = [];

while ((match = missingPattern.exec(content)) !== null) {
  const [fullMatch, _, slug, region] = match;
  if (!fullMatch.includes('coordinates:')) {
    allMatches.push({ slug, region });
  }
}

// Add fallback coordinates for missing places
for (const { slug, region } of allMatches) {
  if (!COORDINATES[slug]) {
    const fallbackCoords = REGION_FALLBACKS[region] || REGION_FALLBACKS["Various"];
    console.log(`Adding fallback coordinates for ${slug} (region: ${region})`);
    content = addCoordinatesToPlace(content, slug, fallbackCoords);
    processed++;
  }
}

// Write updated content
writeFileSync(filePath, content, 'utf-8');
console.log(`\nProcessed ${processed} places`);
console.log('Migration complete!');
