#!/usr/bin/env python3
"""
Generate pronunciation audio clips for every name in assets/data/names.json,
using macOS's built-in Hindi female voice ("Lekha") — the closest Indian
female voice available on-device (Apple ships no Indian-English female
voice; Lekha reads these Sanskrit/Hindi-origin names naturally).

Run this whenever you add/edit names in names.json:
    python3 scripts/generate_audio.py

To pick a different installed voice (e.g. another Indian regional-language
female voice like Vani/ta_IN, Geeta/te_IN, Piya/bn_IN — run `say -v ?` to
see what's installed), just change VOICE below and delete the old clips in
assets/audio/ so they regenerate.

Requires macOS (uses the `say` and `afconvert` command-line tools — both
ship with the OS, nothing to install). Not needed to view the site — names
without a generated clip fall back to the visitor's own browser voice
automatically (see assets/js/main.js).
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "assets" / "data" / "names.json"
AUDIO_DIR = ROOT / "assets" / "audio"
VOICE = "Lekha"       # macOS built-in Hindi female voice
RATE = "155"          # words per minute — a touch slower than default, for clarity


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", name.lower())


def main():
    if sys.platform != "darwin":
        print("This script needs macOS (`say` / `afconvert`). Skipping.")
        return

    data = json.loads(DATA_FILE.read_text())
    names = {}
    for rashi in data["rashis"]:
        for entry in rashi["boys"] + rashi["girls"]:
            names[entry["name"]] = slugify(entry["name"])

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    made, skipped = 0, 0

    for name, slug in sorted(names.items()):
        out_m4a = AUDIO_DIR / f"{slug}.m4a"
        if out_m4a.exists():
            skipped += 1
            continue

        tmp_aiff = AUDIO_DIR / f"_tmp_{slug}.aiff"
        subprocess.run(["say", "-v", VOICE, "-r", RATE, "-o", str(tmp_aiff), name], check=True)
        subprocess.run(
            ["afconvert", "-f", "m4af", "-d", "aac", str(tmp_aiff), str(out_m4a)],
            check=True,
        )
        tmp_aiff.unlink()
        made += 1
        print(f"  ✓ {name} -> {out_m4a.relative_to(ROOT)}")

    print(f"\nDone. Generated {made} new clip(s), {skipped} already existed.")


if __name__ == "__main__":
    main()
