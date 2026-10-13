// Shared by the capture script (Node) and the compositor page (browser).

export const FPS = 30;
export const W = 1080;
export const H = 1920;
/** Text stays inside this box: 250 px from the top, 340 px from the bottom, 80 px sides. */
export const SAFE = { top: 250, bottom: H - 340, left: 80, right: W - 80 };

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, p) => a + (b - a) * p;

export const ease = {
  linear: (x) => x,
  inOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
  outCubic: (x) => 1 - (1 - x) ** 3,
  inCubic: (x) => x ** 3,
  inOutCubic: (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2),
  outQuart: (x) => 1 - (1 - x) ** 4,
  inOutQuart: (x) => (x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2),
  outQuint: (x) => 1 - (1 - x) ** 5,
  outExpo: (x) => (x >= 1 ? 1 : 1 - 2 ** (-10 * x)),
  inOutExpo: (x) =>
    x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 2 ** (20 * x - 10) / 2 : (2 - 2 ** (-20 * x + 10)) / 2,
  inQuad: (x) => x * x,
};

/** 0..1 progress of t between t0 and t1, eased. */
export const ramp = (t, t0, t1, fn = ease.linear) => fn(clamp((t - t0) / (t1 - t0)));

/** Piecewise value from [[time, value, easeName?], ...] keys, eased between neighbours. */
export function keys(t, points, fn = ease.inOutCubic) {
  if (t <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [t1, v1, name] = points[i];
    const [t0, v0] = points[i - 1];
    if (t <= t1) return lerp(v0, v1, (name ? ease[name] : fn)(clamp((t - t0) / (t1 - t0 || 1))));
  }
  return points[points.length - 1][1];
}

/**
 * R2: position of the ProcessBuild scrub timeline (0..2.7, see ProcessBuild.tsx) at reel time t.
 * Szkic draws by 0.76, Projekt fills in by 1.8, Strona is complete at 2.7.
 */
export const PROCESS_SCRUB = [
  [2.35, 0.28], // the live mock-up shows nothing before ~0.3 (its line draw does not animate)
  [5.2, 0.76, "inOutSine"],
  [6.15, 0.76],
  [8.85, 1.8, "inOutSine"],
  [9.65, 1.8],
  [11.9, 2.7, "inOutSine"],
];
export const processScrubAt = (t) => Math.round(keys(t, PROCESS_SCRUB) * 2000) / 2000;

const LONG_DASH = String.fromCharCode(0x2014);

/** Polish typesetting: glue one-letter words and list numbers to the next word, no long dash. */
export function polish(text) {
  return String(text)
    .split(LONG_DASH)
    .join("-")
    .replace(/(^|[\s (])([aiouwzAIOUWZ])\s+/g, "$1$2 ")
    .replace(/(^|[\s (])([aiouwzAIOUWZ])\s+/g, "$1$2 ")
    .replace(/(^|\s)(\d+\.)\s+/g, "$1$2 ");
}
