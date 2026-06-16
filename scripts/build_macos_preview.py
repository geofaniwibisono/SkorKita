#!/usr/bin/env python3
"""Build an unsigned arm64 macOS preview app package without Tauri dependencies."""

from pathlib import Path
import shutil
import subprocess


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "outputs" / "macos-preview"
APP_NAME = "SkorKita Offline Preview"
APP = OUTPUT / f"{APP_NAME}.app"
CONTENTS = APP / "Contents"
MACOS = CONTENTS / "MacOS"
RESOURCES = CONTENTS / "Resources"
WEB = RESOURCES / "Web"
DMG = OUTPUT / "SkorKita-Offline-Preview-arm64.dmg"
DMG_ROOT = OUTPUT / "dmg-root"
ZIP = OUTPUT / "SkorKita-Offline-Preview-arm64.app.zip"


def run(*args: str) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def main() -> None:
    run("python3", "scripts/build_frontend.py")
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    MACOS.mkdir(parents=True)
    WEB.mkdir(parents=True)
    shutil.copy2(ROOT / "native/macos-preview/Info.plist", CONTENTS / "Info.plist")
    for asset in (ROOT / "dist").iterdir():
        if asset.is_file():
            shutil.copy2(asset, WEB / asset.name)

    executable = MACOS / APP_NAME
    run(
        "xcrun",
        "clang",
        "-fobjc-arc",
        "-O2",
        "-mmacosx-version-min=12.0",
        "-framework",
        "Cocoa",
        "-framework",
        "WebKit",
        str(ROOT / "native/macos-preview/main.m"),
        "-o",
        str(executable),
    )
    executable.chmod(0o755)
    run("codesign", "--force", "--deep", "--sign", "-", str(APP))

    DMG_ROOT.mkdir(parents=True)
    shutil.copytree(APP, DMG_ROOT / APP.name)
    applications_link = DMG_ROOT / "Applications"
    applications_link.symlink_to("/Applications")
    for artifact in (DMG, ZIP):
        if artifact.exists():
            artifact.unlink()
    try:
        run(
            "hdiutil",
            "create",
            "-volname",
            "SkorKita Offline Preview",
            "-srcfolder",
            str(DMG_ROOT),
            "-ov",
            "-format",
            "UDZO",
            str(DMG),
        )
    except subprocess.CalledProcessError:
        # Some sandboxed macOS environments cannot create mountable DMG files
        # because DiskImages services are unavailable. Keep the .app intact and
        # produce a Finder-safe zip instead of creating a misleading .dmg.
        run("ditto", "-c", "-k", "--keepParent", str(APP), str(ZIP))
    shutil.rmtree(DMG_ROOT)
    print(DMG if DMG.exists() else ZIP)


if __name__ == "__main__":
    main()
