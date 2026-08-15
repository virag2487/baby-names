# PROJECT-CONTEXT.md — Our Baby Name Book

Background and decisions behind this site, for future-Claude (or future-you) to pick up
without re-asking everything.

## The situation
- Virag and his wife are expecting a baby in **January 2027**.
- They're keeping the **gender a surprise** — so the site needs both boy and girl names, ready
  either way.
- Family tradition: the baby's name should start with a specific sound determined by their
  **Rashi** (Vedic Moon-sign) — which depends on the exact time, date and place of birth, so it
  will only be known once the baby arrives. This is *not* the same as the common Western
  "zodiac sign" (which is Sun-sign based on birth date alone) — the site should keep that
  distinction clear so guests don't get confused.
- Sibling project: **dhanya-riya-wedding** (Virag's brother's wedding site, same GitHub account,
  same static-site-on-GitHub-Pages pattern). This site intentionally reuses that project's
  conventions (no build step, CLAUDE.md design system, `.nojekyll`, RSVP-style placeholder form)
  but with its own distinct pastel palette and moon/star motif rather than copying the wedding
  toran/floral look.

## Name-list sourcing
- Virag had started a Google Sheet ("Baby Names") shortlisting names per Rashi. As of the sheet's
  last edit, it mainly held the **Rashi → starting-letter framework** (one row per Rashi, with
  Gujarati script + Latin transliteration for each starting sound) plus **three seed names**:
  - Kanya (Virgo) girl: **Pahal**
  - Kumbh (Aquarius) girl: **Shyla**, **Siya**
  - No boy names had been added yet.
  These three are marked `"tag": "Family favourite ⭐"` in `assets/data/names.json` — don't
  remove that tag if you regenerate the list.
- The rest of the starter list (~90 names) was researched and curated by Claude from public Jain
  baby-name references (stylesatlife.com, firstcry parenting, momjunction, pampers — see chat
  history for the specific fetches) plus well-established Jain philosophical terms (the
  Ratnatraya "three jewels", Tirthankara names/epithets, common Jain virtues like Karuna,
  Samyak, Bhavya, Sahaj). Meanings are "commonly cited" rather than scripturally verified —
  the on-page disclaimer says as much and invites family corrections.
- **Precision caveat:** the Rashi→letter mapping in the spreadsheet used Gujarati script; the
  Latin transliterations in `names.json` are a best-effort reading (confirmed via zoomed
  screenshots of the sheet, not OCR). Fine distinctions some traditions make — e.g. dental vs.
  retroflex T/D/N, or Cha vs. Chha — were **not** preserved; everything was grouped by the
  simpler Latin letter the family's own sheet used. This is called out explicitly in the
  `names.json` top-level `"note"` field and in the disclaimer banner on `names.html`. If the
  family's astrologer gives a more precise mapping later, update both.

## Open decisions (asked, and what was chosen)
1. **Name source**: family wanted **both** — their spreadsheet names imported *and* a freshly
   generated starter list to fill gaps. Done.
2. **Contribution mechanism**: GitHub Pages can't accept form submissions on its own. Options
   discussed: Formspree, Google Form, GitHub Issues + a GitHub Action to auto-append to
   `names.json`, or a plain `mailto:` link. **Decision: leave `suggest.html` as a display-only
   placeholder for now** (same as the wedding site's `rsvp.html`), to be wired up later. When
   that conversation happens again, the GitHub-Issues-plus-Action route is the one genuinely
   "file-backed" option (keeps `names.json` as the single source of truth with full git
   history) — worth suggesting first if asked again, but only if most contributors are
   expected to have (or don't mind making) a free GitHub account.

## Still open / things to fill in
- `[Family]` placeholder in `index.html`'s hero kicker — swap for the actual family/surname
  name once decided.
- Exact due date is unknown (only "January 2027" was given) — `index.html`'s countdown script
  currently targets `2027-01-15` as a placeholder midpoint. Update
  `startCountdown("countdown", new Date("2027-01-15T00:00:00"))` in `index.html` once (or if)
  a more specific date is known — or leave as-is, since the exact day is private anyway.
- No GitHub repo created yet as of this writing — see README.md for the push/Pages steps once
  Virag is ready to publish. Presumed repo name: `baby-names`, same GitHub account as the
  wedding site (`virag2487`), so expected URL: `https://virag2487.github.io/baby-names/`.
- Names list is intentionally starter-sized (~90 names across 12 Rashis × 2 genders, uneven
  coverage — some Rashi/gender combos only have 2 names). It's designed to grow via family
  contribution once `suggest.html` is wired up, or via direct edits to `names.json`.
