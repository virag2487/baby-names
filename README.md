# Our Baby Name Book

A lightweight static baby-name website (plain HTML/CSS/JS, no build step), hosted free on
**GitHub Pages**. Gender is a surprise, so it lists modern, short, Jain-meaning names for
**all 12 Rashis** (Vedic Moon-signs), for **both a boy and a girl** — since baby's name will
start with a sound set by their Rashi, known only once they're born.

## Preview it locally

```bash
cd /Users/virag/github-projects/baby-names
python3 -m http.server 8721
```

Then open http://localhost:8721 — note `names.html` fetches `assets/data/names.json`, which
needs a real server (not a plain `file://` open) to work.

## Push it live (run in your terminal, where `gh` is authenticated)

From inside this `baby-names` folder:

```bash
git init
git add .
git commit -m "Initial baby names site"
git branch -M main
gh repo create baby-names --public --source=. --remote=origin --push
```

If you'd rather create the GitHub repo yourself first, use this instead of `gh repo create`:

```bash
git remote add origin https://github.com/<your-username>/baby-names.git
git push -u origin main
```

## Turn on GitHub Pages

Easiest — the website toggle:
**Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/ (root)` → Save.**

Or via the CLI:

```bash
gh api --method POST /repos/<your-username>/baby-names/pages \
  -f "source[branch]=main" -f "source[path]=/"
```

(If the CLI command errors, just use the toggle above.)
Wait ~1 minute, then visit `https://<your-username>.github.io/baby-names/`

## Building more / editing names
See `CLAUDE.md` for the design system, and `PROJECT-CONTEXT.md` for background on where the
name list came from and what's still open. To add or edit names, just edit
`assets/data/names.json` — no rebuild needed, the page fetches it at runtime.

To generate pronunciation audio for any new names (macOS only):

```bash
python3 scripts/generate_audio.py
```

## Files
- `index.html` — homepage (hero, countdown, how Rashi-based naming works)
- `names.html` — the searchable Rashi directory (the main feature)
- `suggest.html` — "suggest a name" form (display-only until wired to a backend — see the
  comment inside the file)
- `assets/data/names.json` — all the name data, edit this to add names
- `assets/audio/` — pre-recorded pronunciation clips (one `.m4a` per name), played by the 🔊
  button on each name card; see `scripts/generate_audio.py` to regenerate
- `assets/css/style.css`, `assets/js/main.js` — shared styles/behaviour
- `CLAUDE.md` — design system + build instructions for Claude Code
- `PROJECT-CONTEXT.md` — background, decisions, open questions
- `.nojekyll` — serve files as-is on GitHub Pages
- `.claude/launch.json` — local dev server config (`python3 -m http.server 8721`)
