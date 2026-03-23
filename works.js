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
 * ════════════════════════════════════════════════════
 */

const WORKS = [
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
  {
    slug:      "highland-mist",
    titleNl:   "Highland Mist",
    titleEn:   "Highland Mist",
    image:     "images/HighlandMist.png",
    mat:       "Canvas",
    matKey:    "canvas",
    styles:    ["organisch"],
    year:      "2025",
    ar:        "3/4",
    edition:   10,
    descNl:    "Een Schotse hooglander kijkt je recht aan vanuit de mistige heuvels. Aquarel op zijn zachtst — warme vacht, koele bergen, één blik die blijft hangen.",
    descEn:    "A Scottish Highland cow stares back at you from the misty hills. Watercolour at its softest — warm coat, cool mountains, one gaze that lingers.",
  },
  {
    slug:      "midnight-strike",
    titleNl:   "Midnight Strike",
    titleEn:   "Midnight Strike",
    image:     "images/MidnightStrike.png",
    mat:       "Acrylglas",
    matKey:    "acryl",
    styles:    ["abstract", "organisch"],
    year:      "2025",
    ar:        "3/4",
    edition:   10,
    descNl:    "Een zwarte panter schiet door de regennacht. Inkt en aquarel spatten samen op — pure beweging, pure kracht. Op acrylglas branden de gele ogen.",
    descEn:    "A black panther cuts through the rainy night. Ink and watercolour splatter together — pure motion, pure power. On acrylic, the yellow eyes burn.",
  },
  /* ── Nieuw werk toevoegen: kopieer een blok hierboven en plak hier ── */
];

/* ════════════════════════════════════════════════════
   PRIJSLOGICA
   ────────────────────────────────────────────────────
   Wil je prijzen aanpassen? Verander de getallen hier.
   De calculator herberekent automatisch.
   ════════════════════════════════════════════════════ */
const PRICING = {

  basePricePerCm2: 0.18,
  sizeExponent:    0.72,
  baseArea:        1200,

  minPrice: { canvas: 149, glas: 219, acryl: 259, aluminium: 239 },

  materialMultiplier: {
    canvas:    1.00,
    glas:      1.55,
    acryl:     1.85,
    aluminium: 1.65
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
    aluminium: { nl: "Geborsteld aluminium. Radicaal anders.",             en: "Brushed aluminium. Radicaal anders." }
  },

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

function calcPrice(widthCm, heightCm, matKey) {
  const area  = widthCm * heightCm;
  const ratio = area / PRICING.baseArea;
  const base  = PRICING.basePricePerCm2 * PRICING.baseArea * Math.pow(ratio, PRICING.sizeExponent);
  const mult  = PRICING.materialMultiplier[matKey] || 1;
  const raw   = base * mult;
  const min   = PRICING.minPrice[matKey] || 149;
  return Math.ceil(Math.max(min, raw) / 10) * 10 - 1;
}
