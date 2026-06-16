#!/usr/bin/env python3
"""Build the unchanged static web frontend for Tauri packaging."""

from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ASSETS = (
    "index.html",
    "scoreboard.html",
    "styles.css",
    "scoreboard.css",
    "app.js",
    "scoreboard.js",
    "desktop-runtime.js",
    "desktop.css",
)


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    for filename in ASSETS:
        shutil.copy2(ROOT / filename, DIST / filename)
    print(f"Built {len(ASSETS)} frontend assets in {DIST}")


if __name__ == "__main__":
    main()

