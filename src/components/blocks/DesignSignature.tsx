"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

/** A small, interactive identity specimen: the geometry behind the personal mark. */
export function DesignSignature() {
  const [blueprint, setBlueprint] = useState(false);
  return (
    <div className={`design-signature ${blueprint ? "is-blueprint" : ""}`}>
      <div className="signature-header">
        <span>STUDIUM FORMY — 001</span>
        <span>DO / ↗</span>
      </div>
      <div className="signature-art" aria-hidden="true">
        <svg viewBox="0 0 320 260" fill="none">
          <g
            className="construction-lines"
            stroke="currentColor"
            strokeWidth=".6"
          >
            <path d="M0 58H320M0 130H320M0 202H320M52 0V260M140 0V260M166 0V260M254 0V260" />
            <circle cx="96" cy="158" r="62" />
            <circle cx="210" cy="158" r="62" />
            <path d="M0 0L320 260M320 0L0 260" />
            <path d="M45 225H260M45 220V230M260 220V230" />
          </g>
          <g className="signature-form" stroke="currentColor" strokeWidth="25">
            <path d="M140 58v100a44 44 0 1 1-44-44h44" />
            <circle cx="210" cy="158" r="44" />
          </g>
          <path
            className="signature-dot"
            d="M260 42h22v22h-22z"
            fill="currentColor"
          />
          <g className="signature-crosses" stroke="currentColor">
            <path d="M14 14h12m-6-6v12M294 14h12m-6-6v12M14 246h12m-6-6v12M294 246h12m-6-6v12" />
          </g>
        </svg>
        <span className="signature-note">
          {blueprint
            ? "Każda forma ma swój początek."
            : "Prosta forma. Własny charakter."}
        </span>
      </div>
      <div className="signature-bottom">
        <div className="signature-switch" aria-label="Widok monogramu">
          <button aria-pressed={blueprint} onClick={() => setBlueprint(true)}>
            Szkic
          </button>
          <button aria-pressed={!blueprint} onClick={() => setBlueprint(false)}>
            Forma
          </button>
        </div>
        <ArrowUpRight size={18} />
      </div>
      <span className="signature-caption">OSOBISTY ZNAK. ŚWIADOMY DESIGN.</span>
    </div>
  );
}
