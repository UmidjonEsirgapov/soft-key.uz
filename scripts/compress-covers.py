"""Crop generated covers to 16:9 and save them as compressed WebP.

Usage: python3 scripts/compress-covers.py <source-dir>
Source files are named softkey-<slug>.png; output goes to public/covers/<slug>.webp.
"""
import sys
from pathlib import Path

from PIL import Image

WIDTH, HEIGHT = 1200, 675
QUALITY = 78
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "covers"


def convert(src: Path) -> Path:
    slug = src.stem.removeprefix("softkey-")
    img = Image.open(src).convert("RGB")
    ratio = WIDTH / HEIGHT
    w, h = img.size
    if w / h > ratio:
        new_w = round(h * ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = round(w / ratio)
        # Generated scenes sit high in the frame; trim more from the bottom shadow.
        top = round((h - new_h) * 0.25)
        img = img.crop((0, top, w, top + new_h))
    img = img.resize((WIDTH, HEIGHT), Image.LANCZOS)
    out = OUT_DIR / f"{slug}.webp"
    img.save(out, "WEBP", quality=QUALITY, method=6)
    return out


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for path in sorted(Path(sys.argv[1]).glob("softkey-*.png")):
        out = convert(path)
        print(f"{out.name}: {out.stat().st_size // 1024} KB")
