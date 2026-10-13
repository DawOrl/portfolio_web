import "./section-transition.css";

const tones = {
  ink: "var(--background)",
  paper: "var(--foreground)",
  burgundy: "var(--primary)",
};

const contours = {
  swell:
    "M0 104 C160 104 220 146 410 146 C560 146 626 144 680 94 C742 36 816 80 878 48 C930 21 936 10 1000 10 V160 H0 Z",
  fold: "M0 12 C88 12 90 84 194 104 C288 123 366 64 464 80 C562 96 586 144 690 140 C820 135 846 78 1000 90 V160 H0 Z",
  ripple:
    "M0 60 C116 60 148 128 292 128 C438 128 426 26 578 26 C720 26 710 116 846 110 C922 106 952 46 1000 46 V160 H0 Z",
  scoop:
    "M0 25 C108 25 142 24 206 88 C266 148 354 146 454 132 C578 115 622 26 744 26 C864 26 908 72 1000 72 V160 H0 Z",
};

type SectionTransitionProps = {
  from: keyof typeof tones;
  to: keyof typeof tones;
  shape: keyof typeof contours;
  size?: "shallow" | "medium" | "deep";
};

export function SectionTransition({
  from,
  to,
  shape,
  size = "medium",
}: SectionTransitionProps) {
  const mask = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 160" preserveAspectRatio="none"><path d="${contours[shape]}" fill="black"/></svg>`,
  )}")`;

  return (
    <div
      className="section-transition"
      data-size={size}
      data-shape={shape}
      data-from={from}
      data-to={to}
      aria-hidden="true"
      style={{ backgroundColor: tones[from] }}
    >
      <div
        className="section-transition-fill"
        style={{ backgroundColor: tones[to], maskImage: mask }}
      />
    </div>
  );
}
