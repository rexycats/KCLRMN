/**
 * KCLRMN — Werken beheren
 * ════════════════════════════════════════════════════
 * Om een nieuw werk toe te voegen:
 *   1. Zet je afbeelding in de map  images/
 *   2. Voeg onderaan dit array een nieuw object toe
 *   3. Klaar — de site toont het automatisch
 *
 * Velden:
 *   slug        unieke naam, kleine letters, koppeltekens (wordt URL)
 *   titleNl     Nederlandse titel
 *   titleEn     Engelse titel
 *   image       pad naar je afbeelding, bv. "images/mijnwerk.jpg"
 *   mat         standaard materiaal (Canvas / Glasdruk / Acrylglas / Aluminium)
 *   matKey      filtersleutel: canvas | glas | acryl | aluminium
 *   styles      array van stijlen: abstract | geometrisch | organisch | minimaal
 *   year        jaar als tekst, bv. "2024"
 *   ar          beeldverhouding: "3/4" | "16/9" | "1/1" | "4/5" | "2/3"
 *   edition     max exemplaren per formaat (optioneel)
 *   descNl      Nederlandse beschrijving
 *   descEn      Engelse beschrijving
 *   seed / style  intern voor gegenereerde placeholders (verwijder als je echte afbeeldingen hebt)
 * ════════════════════════════════════════════════════
 */

const WORKS = [
  {
    slug:      "nachtsequentie",
    titleNl:   "Nachtsequentie",
    titleEn:   "Night Sequence",
    image:     "images/nachtsequentie.jpg",
    mat:       "Canvas",
    matKey:    "canvas",
    styles:    ["abstract", "organisch"],
    year:      "2024",
    ar:        "3/4",
    edition:   10,
    descNl:    "Een stroom van vloeiende lijnen die de overgang van dag naar nacht evoceren. Elke lijn is uniek, elk werk een origineel.",
    descEn:    "A flow of fluid lines evoking the transition from day to night. Every line is unique, every piece an original.",
    seed: 1234, style: "waves"
  },
  {
    slug:      "blauw-systeem",
    titleNl:   "Blauw Systeem",
    titleEn:   "Blue System",
    image:     "images/blauw-systeem.jpg",
    mat:       "Glasdruk",
    matKey:    "glas",
    styles:    ["abstract", "organisch"],
    year:      "2024",
    ar:        "1/1",
    edition:   10,
    descNl:    "Concentrische cirkels die trillen als golven. Het blauw straalt het meest op glas.",
    descEn:    "Concentric circles vibrating like waves. The blue radiates most on glass.",
    seed: 5512, style: "circles"
  },
  {
    slug:      "fractuur",
    titleNl:   "Fractuur",
    titleEn:   "Fracture",
    image:     "images/fractuur.jpg",
    mat:       "Acrylglas",
    matKey:    "acryl",
    styles:    ["geometrisch", "abstract"],
    year:      "2024",
    ar:        "4/5",
    edition:   10,
    descNl:    "Geometrische scherven die een nieuw geheel vormen. Breuk als schoonheid.",
    descEn:    "Geometric shards forming a new whole. Fracture as beauty.",
    seed: 8831, style: "geo"
  },
  {
    slug:      "puls",
    titleNl:   "Puls",
    titleEn:   "Pulse",
    image:     "images/puls.jpg",
    mat:       "Aluminium",
    matKey:    "aluminium",
    styles:    ["organisch", "abstract"],
    year:      "2024",
    ar:        "3/4",
    edition:   10,
    descNl:    "De ritmische beweging van energie, gevangen in een stilstaand beeld.",
    descEn:    "The rhythmic movement of energy, captured in a still image.",
    seed: 3341, style: "waves"
  },
  {
    slug:      "diepte",
    titleNl:   "Diepte",
    titleEn:   "Depth",
    image:     "images/diepte.jpg",
    mat:       "Canvas",
    matKey:    "canvas",
    styles:    ["geometrisch", "minimaal"],
    year:      "2024",
    ar:        "16/9",
    edition:   10,
    descNl:    "Een rasterstructuur die diepte suggereert via kleur en contrast.",
    descEn:    "A grid structure suggesting depth through colour and contrast.",
    seed: 7793, style: "grid"
  },
  {
    slug:      "stilte",
    titleNl:   "Stilte",
    titleEn:   "Silence",
    image:     "images/stilte.jpg",
    mat:       "Glasdruk",
    matKey:    "glas",
    styles:    ["minimaal", "abstract"],
    year:      "2023",
    ar:        "2/3",
    edition:   10,
    descNl:    "Rust in duizenden punten. Stilte heeft een textuur.",
    descEn:    "Calm in thousands of dots. Silence has texture.",
    seed: 4456, style: "dots"
  }
  {
  slug:      "highlander",
  titleNl:   "Highlander",
  titleEn:   "Highlander",
  image:     "images/Highlander.png",
  mat:       "Canvas",
  matKey:    "canvas",
  styles:    ["organisch"],
  year:      "2025",
  ar:        "3/4",
  edition:   10,
  descNl:    "Een Schotse hooglander in aquarel — wild van haar, zacht van blik. De bloemenkroon contrasteert met de rauwe kracht van het dier. Gedrukt op canvas straalt dit werk warmte en karakter uit.",
  descEn:    "A Scottish Highland cow in watercolour — wild of hair, gentle of gaze. The flower crown contrasts with the raw power of the animal. Printed on canvas, this piece radiates warmth and character.",
},
];

/* ════════════════════════════════════════════════════
   PRIJSLOGICA
   ────────────────────────────────────────────────────
   Wil je prijzen aanpassen? Verander de getallen hier.
   De calculator herberekent automatisch.
   ════════════════════════════════════════════════════ */
const PRICING = {

  /* Basisprijzen canvas (referentie 30×40cm = ~€149) */
  basePricePerCm2: 0.18,
  sizeExponent:    0.72,   /* <1 = grote formaten relatief goedkoper */
  baseArea:        1200,   /* 30×40 cm */

  /* Minimumprijs per materiaal */
  minPrice: { canvas: 149, glas: 219, acryl: 259, aluminium: 239 },

  /* Materiaal-multipliers op canvas basisprijs */
  materialMultiplier: {
    canvas:    1.00,
    glas:      1.55,   /* glasdruk: +55% */
    acryl:     1.85,   /* acrylglas: +85% — meest exclusief */
    aluminium: 1.65    /* aluminium: +65% */
  },

  materialLabel: {
    canvas:    { nl: "Canvas",    en: "Canvas" },
    glas:      { nl: "Glasdruk",  en: "Glass print" },
    acryl:     { nl: "Acrylglas", en: "Acrylic" },
    aluminium: { nl: "Aluminium", en: "Aluminium" }
  },

  materialDesc: {
    canvas:    { nl: "Gespannen op houten frame. Warm en tijdloos.",       en: "Stretched on wooden frame. Warm and timeless." },
    glas:      { nl: "Achter helder glas. Maximale kleurdiepte.",          en: "Behind clear glass. Maximum colour depth." },
    acryl:     { nl: "Direct op transparant acryl. Kleuren spatten eraf.", en: "Directly on transparent acrylic. Colours pop." },
    aluminium: { nl: "Geborsteld aluminium. Radicaal anders.",             en: "Brushed aluminium. Radically different." }
  },

  /* Preset formaten in de calculator */
  presetSizes: [
    { w: 30,  h: 40,  label: "30 × 40 cm" },
    { w: 40,  h: 60,  label: "40 × 60 cm" },
    { w: 50,  h: 70,  label: "50 × 70 cm" },
    { w: 60,  h: 80,  label: "60 × 80 cm" },
    { w: 70,  h: 100, label: "70 × 100 cm" },
    { w: 80,  h: 120, label: "80 × 120 cm" },
    { w: 100, h: 140, label: "100 × 140 cm" },
    { w: 120, h: 160, label: "120 × 160 cm" },
    { w: 150, h: 200, label: "150 × 200 cm" }
  ]
};

/* Prijsberekening — gebruikt door calculator en werkpagina */
function calcPrice(widthCm, heightCm, matKey) {
  const area  = widthCm * heightCm;
  const ratio = area / PRICING.baseArea;
  const base  = PRICING.basePricePerCm2 * PRICING.baseArea * Math.pow(ratio, PRICING.sizeExponent);
  const mult  = PRICING.materialMultiplier[matKey] || 1;
  const raw   = base * mult;
  const min   = PRICING.minPrice[matKey] || 149;
  /* Afronden op psychologische prijs (eindigt op 9) */
  return Math.ceil(Math.max(min, raw) / 10) * 10 - 1;
}
