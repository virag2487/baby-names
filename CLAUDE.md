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
- **Live, moving animals — `.critter-lane` — is the theme's main mechanism.** This is the
  fourth iteration; each earlier one was tried, shown to the user, and replaced based on
  specific feedback. Know this history before changing it, so you don't casually re-introduce
  an already-rejected idea:
  1. *Static animals only in the hero* → user wanted them down the whole page.
  2. *Evenly-spaced static strips between every section* (`.critter-strip` full of plain
     `<span>`s) → covered the page, but read as a designed rhythm, not chance — correctly
     rejected as "not actually random."
  3. *Static animals scattered at irregular positions within each section*, using a low-opacity
     `.ghost` variant so they could sit near/behind text safely → still static. User clarified
     what they'd actually wanted from the start: **real movement** — "light animation of
     animals, birds etc." — not clever placement of motionless icons.
  4. *Current version*: animals that fly and walk **across** the page inside `.critter-lane`
     bands. This is the one to imitate.
  - `.critter-lane` — a fixed-height (`74px`, `56px` mobile; `.tall` variant `96px`/`72px`),
    `overflow:hidden` band in **normal document flow** (never absolutely overlaid on text) —
    structurally impossible to cover a word regardless of how far something inside it travels.
    One lane sits after the hero, one between/within each major section, one before the footer
    on every page — this is what makes the motion feel like it's "throughout the page," not just
    the banner.
  - `.flyer` (+ nested `.flap` span) — travels the lane's full width left→right on an infinite
    loop (`fly-across`, animates `left` from `-12%` to `112%` plus a wandering vertical drift);
    `.flap` adds an independent, faster wing-flutter rotation on top, so the two motions combine
    into a natural-looking flight. `.walker` (+ nested `.step`) is the ground equivalent —
    travels in a straight line along the lane's bottom edge, `.step` adds a quick footstep
    bounce. Only `top`/`bottom` need setting per instance (fixed px, safe-zone rules below still
    apply) plus `animation-duration`/`animation-delay` for variety — horizontal position is
    entirely driven by the animation, not set per instance.
  - The hero has its own two lanes built into its padding rather than a separate element: a
    **sky lane** using the top padding (several `.flyer`s) and, where there's room, a **ground
    lane** using the bottom padding (one `.walker`). `.hero` carries **128px of top padding
    specifically so the sky lane has real room to work with** (128px 0 64px; 96px top on
    mobile) — don't shrink that without rechecking every `top` offset below it. Same safe-zone
    math as before: offset + the creature's own height must stay inside the padding — a flyer
    is ~32px tall (1.5rem mobile), a walker ~37px (1.8rem mobile) — and `names.html`/
    `suggest.html` override the hero's bottom padding down to `24px`, too tight for a ground
    walker, so those two heroes are sky-only.
  - `prefers-reduced-motion: reduce` stops every animation and parks each creature at a fixed
    `left:42%` rather than hiding them, so the theme still reads even with motion off.
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
