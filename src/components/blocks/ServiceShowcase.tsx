"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ServiceArtwork } from "./ServiceArtwork";
import { ContactIntentLink } from "@/components/ui/contact-intent-link";
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

  return (
    <div className="service-showcase">
      <div className="service-list">
        {services.map((service, index) => (
          <ContactIntentLink
            href="/#kontakt"
            intent={{
              kind: "service",
              label: service.title,
              value: service.title,
            }}
            key={service.id}
            className="service-row"
            data-active={active === index}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocus={() => setActive(index)}
          >
            <h3>{service.title}</h3>
            <div className="service-description">
              <p>{service.description}</p>
              <span>{service.features.slice(0, 3).join(" / ")}</span>
            </div>
            <ArrowUpRight
              className="service-arrow"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </ContactIntentLink>
        ))}
      </div>
      <div className="service-study" aria-hidden="true">
        <div className="service-study-stage">
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
        <p className="service-study-foot">{captions[services[active]?.id]}</p>
      </div>
    </div>
  );
}
