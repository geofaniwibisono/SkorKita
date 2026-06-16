#!/usr/bin/env python3
"""Run JavaScript syntax checks with system Node or the bundled Codex runtime."""

from pathlib import Path
import shutil
import subprocess
import sys
from typing import Optional


ROOT = Path(__file__).resolve().parents[1]
FILES = ("app.js", "scoreboard.js", "desktop-runtime.js")


def find_node() -> Optional[str]:
    system_node = shutil.which("node")
    if system_node:
        return system_node
    bundled = (
        Path.home()
        / ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
    )
    return str(bundled) if bundled.is_file() else None


def main() -> int:
    node = find_node()
    if not node:
        print(
            "Node.js tidak ditemukan. Pasang Node.js 20+ untuk syntax check dan Tauri CLI.",
            file=sys.stderr,
        )
        return 1
    for filename in FILES:
        subprocess.run([node, "--check", str(ROOT / filename)], check=True)
    print(f"JavaScript syntax OK ({len(FILES)} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
