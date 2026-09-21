/** Simplified perspective and strong faces keep the block legible at tab size. */
export function BrandBlockIcon({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      color="#f4f0eb"
    >
      <defs>
        <linearGradient
          id="block-front"
          x1="5"
          y1="14"
          x2="49"
          y2="59"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b31a40" />
          <stop offset="0.55" stopColor="#a00c30" />
          <stop offset="1" stopColor="#790b27" />
        </linearGradient>
        <linearGradient
          id="block-top"
          x1="15"
          y1="3"
          x2="58"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d197a5" />
          <stop offset="1" stopColor="#91324c" />
        </linearGradient>
        <linearGradient
          id="block-side"
          x1="48"
          y1="18"
          x2="62"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6b2035" />
          <stop offset="1" stopColor="#370c1a" />
        </linearGradient>
      </defs>
      <path d="m5 14 11-11 45 6-12 11Z" fill="url(#block-top)" />
      <path d="m49 20 12-11v39L49 60Z" fill="url(#block-side)" />
      <path d="m5 14 44 6v40L5 54Z" fill="url(#block-front)" />
      <path
        d="m5 14 44 6L61 9M49 20v40"
        stroke="#f1c1cd"
        strokeOpacity="0.42"
        strokeWidth="0.7"
      />
      <g transform="matrix(.46 .062 0 .46 7 22)">
        <path
          d="M34 8v36a14 14 0 1 1-14-14h14"
          stroke="#f4f0eb"
          strokeWidth="8"
        />
        <circle cx="61" cy="44" r="14" stroke="#f4f0eb" strokeWidth="8" />
        <path d="M77 8h8v8h-8z" fill="#9FC5D3" />
      </g>
    </svg>
  );
}
