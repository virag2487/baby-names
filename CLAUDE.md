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
- **Gender-neutral pastel palette** — nothing "blue for boy / pink for girl". Zoo/safari theme
  throughout: each Rashi is illustrated as its zodiac animal's "enclosure".
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

### Palette (pastel safari, gender-neutral)
| Role | Hex |
|------|-----|
| Cream (bg) | `#FBF3DE` |
| Paper (cards) | `#FFFEFA` |
| Ink (text) | `#4A3B2A` · soft `#8C7A63` |
| Gold accent (sun/savanna) | `#E0A83C` |
| Wood (signpost/borders) | `#8B5E3C` · deep `#5E3D24` |
| Mint (leaf green) | `#CFE8C0` · deep `#5F9E52` |
| Lavender (jungle orchid) | `#E3D3F0` · deep `#A67FC9` |
| Butter (savanna yellow) | `#FCE7A0` · deep `#E0AE2E` |
| Peach (terracotta/tan) | `#F5CBA3` · deep `#D9873E` |
| Sky (watering-hole blue) | `#CDE9F0` · deep `#5FA9C4` |
| Blush (flamingo pink) | `#F9C7D6` · deep `#E0779A` |

Each page picks one accent wash via `<body class="accent-...">` (mint / lavender / butter /
peach / sky / blush) — see `index.html` = lavender, `names.html` = mint, `suggest.html` = butter.
A faint site-wide paw-print texture sits on `body` (data-URI SVG, ~5% opacity) — the "animals
have walked through" ambient background the whole theme is built around.

### Typography (Google Fonts)
- Display: **Fredoka** (rounded, friendly — headings, buttons, name cards)
- Body / UI: **Nunito**

### Signature motifs
- 🦁 lion brand mark. Paw print (🐾) replaces the old star as the eyebrow icon and section
  divider glyph.
- **Two complementary mechanisms carry the "animals everywhere" theme — use the right one for
  the job:**
  - `.zoo-peek` (+ `.zoo-peek.sm` for smaller accents) — vivid animal/nature emoji *overlaid* on
    a hero, scattered in a zigzag across the full width, gentle bob animation (`peek-bob`,
    respects reduced-motion). Since this overlays real text, it's fragile by nature — see the
    safe-offset comment directly above `@keyframes peek-bob` in `style.css` before touching
    these. Short version: `.hero` carries **128px of top padding specifically so this layer has
    real room to work with** (128px 0 64px; 96px top on mobile) — don't shrink that padding back
    down without also re-checking every offset below it. Position with **fixed pixel offsets
    only** (`top:6px; left:2%`), never a percentage for the vertical axis — hero height varies a
    lot with how many lines the copy wraps to, so a `top:X%` that looks fine on desktop can land
    on top of a word on a narrow screen. Horizontal (`left:X%`) is safe as a percentage — it
    never changes which text line something lands on, only where along it. And the offset has to
    account for the emoji's *own height* eating into the padding, not just the offset value —
    a "big" emoji is ~45px tall, so against 128px padding, offsets up to ~65px are fine; a
    "small" one is ~24px tall, offsets up to ~85px. Different animal set per page (index =
    giraffe/monkey/parrot/elephant/bee/leaf/frog, names = zebra/peacock/turtle/lion/paw/leaf,
    suggest = koala/fox/panda/leaf/paw) so the site doesn't feel repetitive.
  - `.critter-strip` — the mechanism for getting animals **down the whole page**, not just the
    hero. A plain flex row sitting in **normal document flow** between sections (after `</header>`,
    between every `<section>`, before `<footer>`, occasionally inside a section like between the
    toolbar and the list on `names.html`) — not absolutely positioned, so it is structurally
    impossible for it to overlap text; it just takes up its own row of space, like a trail the
    animals left between exhibits. This is the one to reach for by default when adding more
    decoration somewhere — it needs zero safe-zone math. Each page has 2–3 strips with a
    different mix of animals/leaves so scrolling down keeps surfacing new ones.
- Rounded pill buttons, soft card shadows, dashed-border circular "enclosure" badges.

### Reusable components
- `.rashi-card` accordion (see `names.html` + `assets/js/main.js`) — one per Rashi, holds
  boy/girl name-card grids, a starting-letters hint row, and empty-state prompts. The
  `.rashi-symbol` badge shows `rashi.animal` (a big emoji) inside a dashed wood-coloured ring;
  background colour cycles through the 6 accent tones via `nth-of-type(6n+1..6)` so the 12
  "enclosures" read as visually distinct habitats. Zodiac animal mapping (chosen for fit, not
  all literal — see PROJECT-CONTEXT.md): Mesh=Ram, Vrushabh=Bull, Mithun=Monkey, Kark=Crab,
  Sinh=Lion, Kanya=Peacock, Tula=Flamingo, Vrushik=Scorpion, Dhanu=Horse, Makar=Crocodile,
  Kumbh=Elephant, Meen=Fish.
- `.name-card` with a coloured `.tag` chip: `tag-classic` (sky), `tag-modern` (mint),
  `tag-virtue` (lavender), `tag-tirthankarainspired` (peach), `tag-familyfavourite` (blush).
- `.pronounce-btn` — the 🔊 icon on each name card. Plays a pre-recorded clip from
  `assets/audio/{slug}.m4a` (macOS's built-in Hindi female voice, "Lekha" — the closest Indian
  female voice available on-device; Apple ships no Indian-English female voice, and Lekha reads
  these Sanskrit/Hindi-origin names naturally). If a clip is missing (e.g. a name just added to
  `names.json` without regenerating audio), it falls back to the visitor's own browser
  `speechSynthesis`, preferring an `en-IN` voice if their device has one. Slug =
  `name.toLowerCase().replace(/[^a-z0-9]/g, "")` — must match between `main.js` and
  `scripts/generate_audio.py`.
- `.gender-toggle` (All/Boy/Girl pill switch) + `.search-box` — both live-filter the accordion,
  see `initNamesDirectory()` in `main.js`.
- `.countdown` — weeks/days-to-go widget, driven by `startCountdown()` in `main.js`.

### Voice
Warm, playful, family voice — "we", "our little one". Light and excited, never salesy.

## Content notes
- Names data source: `assets/data/names.json`. Each Rashi entry has `id`, `name`, `gujarati`,
  `zodiac` (Western sun-sign, shown only as a familiar reference point — **not** how Rashi
  actually works), `symbol` (astrological glyph, ♈ etc. — kept in the data but not displayed;
  `animal`/`animalName` are what's actually shown), `animal` (emoji) + `animalName` (e.g. "Ram"),
  `letters` (starting sounds), and `boys[]` / `girls[]` arrays of `{ name, meaning, tag, note? }`.
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
- **`style.css` and `main.js` are linked with a `?v=N` cache-busting query string** in every
  page's `<link>`/`<script>` tag. Python's `http.server` (and GitHub Pages) send no
  `Cache-Control` header, so browsers cache these aggressively — edits can silently not show up,
  even on a hard reload or in a brand-new tab, if the version query stays the same. **Bump `N` in
  all three HTML files whenever you change `style.css` or `main.js`.** If a change still doesn't
  show up while testing locally, try a fresh port for the dev server rather than assuming the
  code is wrong.
- After adding names to `names.json`, run `python3 scripts/generate_audio.py` (macOS only) to
  generate their pronunciation clips into `assets/audio/`. It skips names that already have a
  clip, so it's safe to re-run any time. Not strictly required — missing clips just fall back
  to the browser voice — but pre-recorded clips sound far more consistent.

## Deploy
Static site on GitHub Pages (branch `main`, folder `/root`). `.nojekyll` keeps GitHub from
processing files with Jekyll. Push to `main` to publish. See README.md for the exact commands.
