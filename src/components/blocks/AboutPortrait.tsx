import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./about-portrait.css";

export function AboutPortrait() {
  return (
    <div className="about-portrait-stage">
      <div className="about-portrait-top">
        <nav className="about-portrait-tabs" aria-label="Poznaj mnie">
          <span>O mnie</span>
          <a href="#moje-podejscie">Podejście</a>
          <a
            href="/Dawid_Orlowski_CV.pdf?v=2026-09-22"
            target="_blank"
            rel="noopener noreferrer"
          >
            Doświadczenie <ArrowUpRight size={12} />
          </a>
        </nav>
        <span className="about-portrait-index">03 / CZŁOWIEK ZA PROJEKTEM</span>
      </div>

      <h2 id="about-heading" className="sr-only">
        Dawid Orłowski — designer i developer
      </h2>
      <span className="about-first-name" aria-hidden="true">
        DAWID
      </span>
      <div className="about-portrait-image">
        <Image
          src="/profile-cutout.png"
          alt="Portret Dawida Orłowskiego"
          fill
          sizes="(max-width: 760px) 460px, (max-width: 1100px) 65vw, 780px"
        />
      </div>
      <span className="about-last-name" aria-hidden="true">
        ORŁOWSKI
      </span>

      <p className="about-portrait-role">
        <i aria-hidden="true" />
        Designer z wyobraźnią.
        <br />
        Developer z konkretami.
      </p>
      <div className="about-portrait-bottom">
        <a href="#moje-podejscie">
          Poznaj mnie bliżej <ArrowDown size={16} />
        </a>
        <span>
          KRAKÓW, POLSKA <i aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
