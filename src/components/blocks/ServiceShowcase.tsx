"use client";

import { useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { ServiceArtwork } from "./ServiceArtwork";
import "./service-showcase.css";

type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

const captions: Record<string, string> = {
  "strony-firmowe": "Miejsce dla Twojej marki.",
  "landing-page": "Uwaga zmienia się w działanie.",
  sklepy: "Od pierwszego spojrzenia do koszyka.",
  aplikacje: "Mniej powtórzeń. Więcej możliwości.",
};

export function ServiceShowcase({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const art = useRef<HTMLDivElement>(null);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !art.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    art.current.style.setProperty("--study-x", `${x * 10}deg`);
    art.current.style.setProperty("--study-y", `${-y * 8}deg`);
  }

  function reset() {
    art.current?.style.setProperty("--study-x", "0deg");
    art.current?.style.setProperty("--study-y", "0deg");
  }

  return (
    <div
      className="service-showcase"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="service-list">
        {services.map((service, index) => (
          <a
            href="#kontakt"
            key={service.id}
            className="service-row"
            data-active={active === index}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocus={() => {
              setActive(index);
              reset();
            }}
          >
            <span className="service-number">0{index + 1}</span>
            <h3>{service.title}</h3>
            <div className="service-description">
              <p>{service.description}</p>
              <span>{service.features.slice(0, 3).join(" / ")}</span>
            </div>
            <ArrowUpRight className="service-arrow" strokeWidth={1} />
            <span className="service-mobile-art" aria-hidden="true">
              <ServiceArtwork kind={service.id} />
            </span>
          </a>
        ))}
      </div>
      <div className="service-study" aria-hidden="true">
        <div className="service-study-head">
          <span>OD POMYSŁU DO FORMY</span>
          <span>DO / 0{active + 1}</span>
        </div>
        <div className="service-study-stage">
          <span className="service-study-registration" />
          <div className="service-study-tilt" ref={art}>
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-study-art"
                data-active={active === index}
              >
                <ServiceArtwork kind={service.id} />
              </div>
            ))}
          </div>
          <span className="service-study-scale">DESIGN + DEVELOPMENT</span>
        </div>
        <div className="service-study-foot">
          <span className="service-study-count">
            0{active + 1}
            <span> / 04</span>
          </span>
          <p>{captions[services[active]?.id]}</p>
          <ArrowUpRight size={18} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
