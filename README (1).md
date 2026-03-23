# KCLRMN — Website

Jouw portfolio website. Geen backend, geen server, geen abonnement.  
Alles werkt via twee bestanden: `index.html` en `works.js`.

---

## Mapstructuur

```
/
├── index.html       ← de website (niet aanraken)
├── works.js         ← jouw werken beheren (dit is het enige bestand dat je aanpast)
├── CNAME            ← domeinnaam voor GitHub (niet aanraken)
└── images/
    ├── nachtsequentie.jpg
    ├── blauw-systeem.jpg
    ├── fractuur.jpg
    └── ...
```

---

## Een nieuw werk toevoegen — 3 stappen

### Stap 1 — Afbeelding uploaden
Sleep je afbeelding naar de map `images/` in GitHub.  
Gebruik een duidelijke naam zonder spaties, bv. `mijn-nieuwe-werk.jpg`.  
Aanbevolen formaat: **JPG of WebP, minimaal 1200px breed**.

### Stap 2 — Werk toevoegen in works.js
Open `works.js` en voeg onderaan het array een nieuw object toe:

```js
{
  slug:      "mijn-nieuwe-werk",        // unieke naam, kleine letters, koppeltekens
  titleNl:   "Mijn Nieuwe Werk",        // Nederlandse titel
  titleEn:   "My New Work",             // Engelse titel
  image:     "images/mijn-nieuwe-werk.jpg",
  mat:       "Canvas",                  // Canvas / Glasdruk / Acrylglas / Aluminium
  matKey:    "canvas",                  // canvas / glas / acryl / aluminium
  styles:    ["abstract", "organisch"], // combinatie uit: abstract, geometrisch, organisch, minimaal
  year:      "2025",
  ar:        "3/4",                     // beeldverhouding: "3/4" / "16/9" / "1/1" / "4/5" / "2/3"
  descNl:    "Korte beschrijving in het Nederlands.",
  descEn:    "Short description in English.",
  priceFrom: "Vanaf €95"               // optioneel — weglaten als je geen prijs wil tonen
},
```

### Stap 3 — Opslaan
Klik op "Commit changes" in GitHub. De site is binnen 1-2 minuten bijgewerkt.

---

## GitHub Pages instellen (eenmalig)

1. Maak een account op [github.com](https://github.com) als je dat nog niet hebt
2. Maak een nieuw repository aan — noem het `kclrmn` of iets anders
3. Upload alle bestanden (index.html, works.js, CNAME, de map images/)
4. Ga naar **Settings → Pages**
5. Kies bij "Source": **Deploy from a branch → main → / (root)**
6. Klik Save. GitHub geeft je een gratis URL zoals `gebruikersnaam.github.io/kclrmn`

---

## Eigen domein koppelen (junda.nl)

### Bij je domeinnaamregistrar (waar je junda.nl beheert):

Voeg deze DNS-records toe:

| Type  | Naam | Waarde                    |
|-------|------|---------------------------|
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |
| CNAME | www  | jouwgebruikersnaam.github.io |

### In GitHub:
1. Ga naar **Settings → Pages → Custom domain**
2. Vul in: `www.junda.nl`
3. Klik Save
4. Vink **Enforce HTTPS** aan (kan 10-30 min duren)

Het bestand `CNAME` in je repository bevat al de juiste waarde.

---

## Formulier activeren via Formspree (gratis, geen backend)

1. Ga naar [formspree.io](https://formspree.io) en maak een gratis account
2. Maak een nieuw formulier aan
3. Kopieer je Form ID (ziet eruit als `xpwzknab`)
4. Open `index.html` en zoek naar `YOUR_FORM_ID`
5. Vervang `YOUR_FORM_ID` door jouw ID
6. Aanvragen komen rechtstreeks in je e-mail

Gratis plan: 50 aanvragen per maand. Meer dan genoeg om te starten.

---

## Snelkoppelingen

| Actie | Bestand |
|-------|---------|
| Werk toevoegen | `works.js` |
| Afbeelding toevoegen | `images/` map |
| Prijzen aanpassen | `works.js` → `priceFrom` |
| Beschrijving aanpassen | `works.js` → `descNl` / `descEn` |
| Contact e-mail aanpassen | `index.html` → zoek op `hello@kclrmn.art` |
| Social links aanpassen | `index.html` → zoek op `instagram.com/kclrmn` |
