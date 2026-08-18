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
  but with its own distinct look rather than copying the wedding toran/floral theme.
- **Live since 2026-08-15** at `https://virag2487.github.io/baby-names/`, repo
  `github.com/virag2487/baby-names` (public). Deployed via `gh repo create ... --push` +
  `gh api .../pages`, same flow as the wedding site.
- **Theme pivot (2026-08-17):** originally launched with a moon/stars motif (Rashi = Moon-sign).
  Virag asked for a fun **circus or zoo** redesign with animals "hanging around" the pages; we
  picked **zoo/safari** (over circus) specifically because 8 of the 12 Rashis are literally
  zodiac animals, so each Rashi card could become a themed "enclosure" — a much stronger fit
  than circus would have been. See the CLAUDE.md Design System section for the resulting
  palette/motifs. The old moon/stars look is gone from the UI but the *concept* (Rashi = Moon
  sign) is still explained in copy — that's the actual mechanic the whole site is built around
  and shouldn't get lost in a future re-theme.

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

## Pronunciation feature
- Added 2026-08-15/17: a 🔊 button on every name card plays a pre-recorded clip from
  `assets/audio/{slug}.m4a`. Generated via `scripts/generate_audio.py` (macOS `say` +
  `afconvert`, needs no install). Voice went through two rounds: started with "Rishi"
  (macOS's only built-in Indian-**English** voice, male) — Virag asked for a woman's voice
  instead, and since macOS ships no Indian-English female voice, we switched to **"Lekha"**
  (Hindi female) which reads these Sanskrit/Hindi-origin names naturally. If asked to change the
  voice again, check `say -v ?` for what's installed on **that** machine — regional Indian
  voices vary by macOS version (this machine also has Geeta/te_IN, Piya/bn_IN, Vani/ta_IN,
  Soumya/kn_IN as other Indian-language options).

## Still open / things to fill in
- `[Family]` placeholder in `index.html`'s hero kicker — swap for the actual family/surname
  name once decided.
- Exact due date is unknown (only "January 2027" was given) — `index.html`'s countdown script
  currently targets `2027-01-15` as a placeholder midpoint. Update
  `startCountdown("countdown", new Date("2027-01-15T00:00:00"))` in `index.html` once (or if)
  a more specific date is known — or leave as-is, since the exact day is private anyway.
- Names list is intentionally starter-sized (~90 names across 12 Rashis × 2 genders, uneven
  coverage — some Rashi/gender combos only have 2 names). It's designed to grow via family
  contribution once `suggest.html` is wired up, or via direct edits to `names.json` (+ re-run
  `scripts/generate_audio.py` for new names' pronunciation clips).
- `suggest.html` is still a display-only placeholder — no contribution backend chosen yet.
