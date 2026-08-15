# CLAUDE.md — Our Baby Name Book

Project instructions for Claude Code. Read this before creating or editing any page.

> Background, decisions and open questions are in **PROJECT-CONTEXT.md** — read that too.

## What this is
A lightweight **static baby-name website** — gender is being kept a surprise, and per family
tradition the baby's name will start with a sound set by their **Rashi** (Vedic Moon-sign),
known only once they're born. So the site lists modern, short, Jain-meaning names for
**all 12 Rashis, for both a boy and a girl**, and invites family & friends to add their own.
Baby due **January 2027**. No framework, no build step — plain HTML/CSS/JS that GitHub Pages
serves directly.

## Golden rules
- **Gender-neutral pastel palette** — nothing "blue for boy / pink for girl". Moon & stars motif
  throughout (Rashi = Moon-sign, so it fits both literally and cutely).
- **Use relative links only** (`href="names.html"`, `assets/css/style.css`) — never
  leading-slash absolute paths — the site is served from the `/baby-names/` sub-path.
- **Placeholders in `[square brackets]`** for anything unknown (family name, exact due date).
  Never invent real personal facts — leave an editable placeholder.
- **Names data lives in `assets/data/names.json`**, not hardcoded in HTML — `names.html` fetches
  and renders it client-side. To add/edit names, edit the JSON only.
- **Be honest about the Rashi→letter mapping.** It's grouped per the family's own chart (see
  PROJECT-CONTEXT.md), not a universal rule — keep the on-page disclaimer that exact naming
  syllable should be confirmed with a pandit once baby's chart is ready.
- Keep it accessible: responsive to mobile, visible keyboard focus, honour
  `@media (prefers-reduced-motion: reduce)`.

## Design system

### Palette (pastel, gender-neutral)
| Role | Hex |
|------|-----|
| Cream (bg) | `#FFFBF3` |
| Paper (cards) | `#FFFFFF` |
| Ink (text) | `#4A4458` · soft `#8D8496` |
| Gold accent (moon/stars) | `#E7B34C` |
| Mint | `#CFEEE1` · deep `#7FC7A8` |
| Lavender | `#E4D9F7` · deep `#A98DDB` |
| Butter | `#FDECA6` · deep `#E4BC3D` |
| Peach | `#FCDAC7` · deep `#EFA37E` |
| Sky | `#CDE9F6` · deep `#7CBBDE` |
| Blush | `#F7D3DC` · deep `#E093A5` |

Each page picks one accent wash via `<body class="accent-...">` (mint / lavender / butter /
peach / sky / blush) — see `index.html` = lavender, `names.html` = mint, `suggest.html` = butter.

### Typography (Google Fonts)
- Display: **Fredoka** (rounded, friendly — headings, buttons, name cards)
- Body / UI: **Nunito**

### Signature motifs
- Crescent moon 🌙 brand mark + twinkling star (✦/✧) SVG/emoji sprinkles in hero sections
  (`.stars span`, respects reduced-motion).
- Rounded pill buttons, soft card shadows, circular Rashi zodiac-symbol badges.

### Reusable components
- `.rashi-card` accordion (see `names.html` + `assets/js/main.js`) — one per Rashi, holds
  boy/girl name-card grids, a starting-letters hint row, and empty-state prompts.
- `.name-card` with a coloured `.tag` chip: `tag-classic` (sky), `tag-modern` (mint),
  `tag-virtue` (lavender), `tag-tirthankarainspired` (peach), `tag-familyfavourite` (blush).
- `.pronounce-btn` — the 🔊 icon on each name card. Plays a pre-recorded clip from
  `assets/audio/{slug}.m4a` (an Indian-English voice, macOS's built-in "Rishi"). If a clip is
  missing (e.g. a name just added to `names.json` without regenerating audio), it falls back to
  the visitor's own browser `speechSynthesis`, preferring an `en-IN` voice if their device has
  one. Slug = `name.toLowerCase().replace(/[^a-z0-9]/g, "")` — must match between `main.js` and
  `scripts/generate_audio.py`.
- `.gender-toggle` (All/Boy/Girl pill switch) + `.search-box` — both live-filter the accordion,
  see `initNamesDirectory()` in `main.js`.
- `.countdown` — weeks/days-to-go widget, driven by `startCountdown()` in `main.js`.

### Voice
Warm, playful, family voice — "we", "our little one". Light and excited, never salesy.

## Content notes
- Names data source: `assets/data/names.json`. Each Rashi entry has `id`, `name`, `gujarati`,
  `zodiac` (Western sun-sign, shown only as a familiar reference point — **not** how Rashi
  actually works), `symbol` (emoji), `letters` (starting sounds), and `boys[]` / `girls[]` arrays
  of `{ name, meaning, tag, note? }`.
- Tags in use: `Classic`, `Modern`, `Virtue`, `Tirthankara-inspired`, `Family favourite ⭐`
  (the last marks names already on the family's own shortlist — Pahal, Shyla, Siya).
- The Rashi → starting-letter mapping came from the family's own spreadsheet/pandit chart —
  see PROJECT-CONTEXT.md for the source and caveats about transliteration precision.
- The **Suggest a Name** form (`suggest.html`) is **display-only** until wired to a backend —
  matches the same pattern as the sibling wedding site's RSVP page. See the HTML comment inside
  `suggest.html` for the three options discussed (Formspree / Google Form / GitHub Issues +
  Action auto-sync to `names.json`). Family decided to leave it as a placeholder for now.

## Structure & conventions
- Shared styles: `assets/css/style.css`. Shared script: `assets/js/main.js`. Every page links to
  both — edit the shared files, never inline per-page styles/scripts, to keep the site in sync.
- Every page uses identical `<nav>` and `<footer>` markup (static site, no includes/build step).
- Pages: `index.html` (hero + countdown + how-it-works), `names.html` (the searchable Rashi
  directory — the main feature), `suggest.html` (contribute form).
- To add a page: copy the nav/footer markup from an existing page, give it a relative link in
  every page's `.nav-links`, and pick an accent class.
- Local dev server: `.claude/launch.json` runs `python3 -m http.server 8721` — use that (or any
  static server) rather than opening `index.html` via `file://`, since `names.html` fetches
  `assets/data/names.json` and `file://` fetches are blocked by the browser.
- After adding names to `names.json`, run `python3 scripts/generate_audio.py` (macOS only) to
  generate their pronunciation clips into `assets/audio/`. It skips names that already have a
  clip, so it's safe to re-run any time. Not strictly required — missing clips just fall back
  to the browser voice — but pre-recorded clips sound far more consistent.

## Deploy
Static site on GitHub Pages (branch `main`, folder `/root`). `.nojekyll` keeps GitHub from
processing files with Jekyll. Push to `main` to publish. See README.md for the exact commands.
