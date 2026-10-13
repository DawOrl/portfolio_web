import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./about-portrait.css";

export function AboutPortrait() {
  return (
    <div className="about-portrait-stage">
      <div className="about-portrait-top">
        <nav className="about-portrait-tabs" aria-label="Poznaj mnie">
          <span>O&nbsp;mnie</span>
          <a href="#moje-podejscie">Podejście</a>
          <a
            href="/Dawid_Orlowski_CV.pdf?v=2026-09-22"
            target="_blank"
            rel="noopener noreferrer"
          >
            Doświadczenie <ArrowUpRight size={12} />
          </a>
        </nav>
        <span className="about-portrait-index">03 / Człowiek za projektem</span>
      </div>

      <h2 id="about-heading" className="sr-only">
        Dawid Orłowski&nbsp;- designer i&nbsp;developer
      </h2>
      <span className="about-first-name" aria-hidden="true">
        DAWID
      </span>
      <div className="about-portrait-image">
        <Image
          src="/portrait-dawid-4k-pressed-20261012.webp"
          alt="Portret Dawida Orłowskiego"
          fill
          unoptimized
        />
      </div>
      <span className="about-last-name" aria-hidden="true">
        ORŁOWSKI
      </span>

      <p className="about-portrait-role">
        <i aria-hidden="true" />
        Designer z&nbsp;wyobraźnią.
        <br />
        Developer z&nbsp;konkretami.
      </p>
      <div className="about-portrait-bottom">
        <a href="#moje-podejscie">
          Poznaj mnie bliżej <ArrowDown size={16} />
        </a>
        <span>
          Kraków, Polska <i aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
