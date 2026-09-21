/** Small editorial objects, drawn for this portfolio rather than stock icons. */
export function ServiceArtwork({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 400 360" fill="none" aria-hidden="true" focusable="false">
      <ellipse
        cx="202"
        cy="309"
        rx="115"
        ry="12"
        fill="#1d1d1d"
        opacity=".07"
      />
      {kind === "strony-firmowe" && (
        <>
          <g transform="translate(47 32) rotate(9 153 138)">
            <path d="M32 10H272V250H32z" fill="var(--accent-cool)" />
            <path
              d="M42 22H260M42 33H146M42 44H203"
              stroke="#f4f0eb"
              strokeOpacity=".25"
            />
          </g>
          <g transform="translate(61 43) rotate(-9 130 124)">
            <path
              d="M7 8H267V262H7z"
              fill="#c9bfb5"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <path
              d="M0 0H260V254H0z"
              fill="#faf7f1"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <path d="M0 26H260" stroke="#1d1d1d" strokeWidth=".7" />
            <circle cx="14" cy="13" r="2.5" fill="#a00c30" />
            <path d="M24 13H35M207 13H241" stroke="#1d1d1d" strokeWidth="2" />
            <text x="21" y="66" fill="#1d1d1d" fontSize="9" letterSpacing="2">
              TWOJA MARKA
            </text>
            <text
              x="18"
              y="111"
              fill="#1d1d1d"
              fontSize="46"
              fontFamily="Georgia, serif"
            >
              Dobry
            </text>
            <text
              x="18"
              y="153"
              fill="#1d1d1d"
              fontSize="46"
              fontFamily="Georgia, serif"
              fontStyle="italic"
            >
              początek.
            </text>
            <path d="M21 183H143M21 192H117" stroke="#a9a29a" strokeWidth="2" />
            <path d="M21 212H101V235H21z" fill="#a00c30" />
            <path d="M34 224H56M75 220H82V227M76 226L82 220" stroke="#faf7f1" />
            <circle
              cx="207"
              cy="206"
              r="25"
              stroke="#a00c30"
              strokeWidth="13"
            />
            <path d="M225 163H238V176H225z" fill="#a00c30" />
          </g>
          <path
            d="M38 288H108M38 284V292M108 284V292"
            stroke="#1d1d1d"
            strokeOpacity=".35"
          />
        </>
      )}
      {kind === "landing-page" && (
        <>
          <g transform="translate(67 47) rotate(-8 123 127)">
            <path
              d="M10 9H256V263H10z"
              fill="#c9bfb5"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <path
              d="M0 0H246V254H0z"
              fill="#faf7f1"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <path d="M0 25H246" stroke="#1d1d1d" strokeWidth=".7" />
            <circle cx="14" cy="13" r="2.5" fill="#a00c30" />
            <path d="M24 13H36M199 13H230" stroke="#1d1d1d" strokeWidth="2" />
            <text x="20" y="60" fill="#1d1d1d" fontSize="9" letterSpacing="2">
              JEDEN KIERUNEK.
            </text>
            <text
              x="17"
              y="114"
              fill="#1d1d1d"
              fontSize="51"
              fontFamily="Georgia, serif"
            >
              Twój cel.
            </text>
            <path d="M21 135H153M21 144H108" stroke="#a9a29a" strokeWidth="2" />
            <path d="M21 208H139V234H21z" fill="#1d1d1d" />
            <path
              d="M33 221H94M111 217H118V224M112 223L118 217"
              stroke="#faf7f1"
            />
          </g>
          <path
            d="M162 237L262 137H222V98H331V207H292V167L192 267z"
            fill="#680b25"
          />
          <path
            d="M151 226L251 126H211V87H320V196H281V156L181 256z"
            fill="#a00c30"
          />
          <path d="M211 87H320V196" stroke="#c3546e" />
          <circle
            cx="70"
            cy="272"
            r="17"
            stroke="#1d1d1d"
            strokeOpacity=".35"
          />
          <path
            d="M47 272H93M70 249V295"
            stroke="#1d1d1d"
            strokeOpacity=".35"
          />
        </>
      )}
      {kind === "sklepy" && (
        <>
          <g transform="translate(82 60) rotate(-15 103 119)">
            <path d="M0 0H192V237H0z" fill="#1d1d1d" />
            <path d="M14 19H74M14 32H48" stroke="#f4f0eb" strokeOpacity=".4" />
          </g>
          <g transform="translate(93 52) rotate(9 103 121)">
            <path
              d="M7 8H218V252H7z"
              fill="#c9bfb5"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <path
              d="M0 0H211V244H0z"
              fill="#faf7f1"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <text x="17" y="29" fill="#1d1d1d" fontSize="9" letterSpacing="2">
              DOBRY WYBÓR.
            </text>
            <path d="M16 45H195V184H16z" fill="#e9e2d9" />
            <ellipse
              cx="107"
              cy="167"
              rx="43"
              ry="5"
              fill="#1d1d1d"
              opacity=".09"
            />
            <circle
              cx="111"
              cy="113"
              r="38"
              stroke="#527587"
              strokeWidth="20"
            />
            <circle
              cx="104"
              cy="108"
              r="38"
              stroke="var(--accent-cool)"
              strokeWidth="20"
            />
            <path d="M17 204H89M17 216H59" stroke="#1d1d1d" strokeWidth="2" />
            <path d="M162 197H194V229H162z" fill="#1d1d1d" />
            <path d="M172 213H184M178 207V219" stroke="#faf7f1" />
          </g>
          <g transform="translate(258 229) rotate(-9)">
            <path d="M6 8H76V75H6z" fill="#680b25" />
            <path d="M0 0H70V67H0z" fill="#a00c30" />
            <path
              d="M24 0V-11a11 11 0 0 1 22 0V0"
              stroke="#a00c30"
              strokeWidth="5"
            />
            <path d="M25 33L32 40L46 26" stroke="#faf7f1" strokeWidth="2" />
          </g>
        </>
      )}
      {kind === "aplikacje" && (
        <>
          <path
            d="M132 115H265V259H136V175"
            stroke="#a59a91"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <path d="M132 115H265V199" stroke="#a00c30" strokeWidth="2" />
          <circle cx="265" cy="159" r="4" fill="#a00c30" />
          <g transform="translate(60 44) rotate(-8 70 58)">
            <path
              d="M7 8H154V124H7z"
              fill="#c9bfb5"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <path
              d="M0 0H147V116H0z"
              fill="#faf7f1"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <text x="16" y="26" fill="#1d1d1d" fontSize="9" letterSpacing="1.5">
              01 / POMYSŁ
            </text>
            <path
              d="M20 77L42 55M42 55H22M42 55V75"
              stroke="#a00c30"
              strokeWidth="3"
            />
            <path
              d="M62 58H129M62 68H106M62 78H119"
              stroke="#a9a29a"
              strokeWidth="2"
            />
          </g>
          <g transform="translate(198 192) rotate(8 70 54)">
            <path
              d="M7 8H156V120H7z"
              fill="#c9bfb5"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <path
              d="M0 0H149V112H0z"
              fill="#faf7f1"
              stroke="#1d1d1d"
              strokeWidth=".7"
            />
            <text x="16" y="27" fill="#1d1d1d" fontSize="9" letterSpacing="1.5">
              03 / GOTOWE
            </text>
            <rect
              x="18"
              y="48"
              width="75"
              height="37"
              rx="18.5"
              fill="var(--accent-cool)"
            />
            <circle cx="74" cy="66.5" r="13" fill="#faf7f1" />
            <path d="M109 67L115 73L130 58" stroke="#a00c30" strokeWidth="2" />
          </g>
          <g transform="translate(79 203) rotate(-8 52 44)">
            <path d="M7 8H116V101H7z" fill="#680b25" />
            <path d="M0 0H109V93H0z" fill="#a00c30" />
            <text x="13" y="22" fill="#faf7f1" fontSize="9" letterSpacing="1.5">
              02 / KOD
            </text>
            <path
              d="M34 43L20 57L34 71M75 43L89 57L75 71M62 37L48 77"
              stroke="#faf7f1"
              strokeWidth="2"
            />
          </g>
        </>
      )}
    </svg>
  );
}
