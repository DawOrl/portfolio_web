"""R1: the site's intro film (scripts/blender/intro_sequence.py) re-rendered with more frames.

Same scene, geometry, lights and timeline as design/intro/frames/001-072.png, only
stretched in time, so the line can draw for three seconds instead of one.

  blender --background --factory-startup --python-exit-code 1 \
    --python design/marketing/2026-10-19-start/narzedzia/wideo/blender_intro.py -- \
    --output-dir design/marketing/2026-10-19-start/narzedzia/wideo/tmp/intro-long

Env INTRO_FRAMES sets the length (default 195 = 6.5 s at 30 fps). Output is 1080 x 1188 RGBA.
"""

import importlib.util
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[5]
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location("intro_sequence", ROOT / "scripts" / "blender" / "intro_sequence.py")
intro = importlib.util.module_from_spec(spec)
spec.loader.exec_module(intro)
intro.FRAMES = int(os.environ.get("INTRO_FRAMES", "195"))
# Rendered 1.125x larger than the site film (same 10:11 framing) so it stays crisp at 1080 px.
intro.SIZE = (1080, 1188)
intro.main()
