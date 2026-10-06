"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Check, Menu } from "lucide-react";
import "./process-build.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const stages = [
  {
    label: "Szkic",
    title: "Najpierw dobry układ.",
    description:
      "Ustalam, co odwiedzający ma zobaczyć i zrobić. Zanim pojawią się kolory, treść dostaje swoje miejsce.",
  },
  {
    label: "Design",
    title: "Potem własny charakter.",
    description:
      "Dobieram typografię, kolory i proporcje. Ten sam układ nabiera charakteru Twojej marki, także na telefonie.",
  },
  {
    label: "Strona",
    title: "Na koniec wszystko działa.",
    description:
      "Składam projekt w gotową stronę. Nawigacja, przyciski i treści tworzą spójną całość na każdym ekranie.",
  },
] as const;

function BuildWireframe({ mobile = false }: { mobile?: boolean }) {
  const paths = mobile
    ? [
        "M18 20H48V42H18Z M170 25H200 M170 35H200",
        "M18 70H188 M18 90H168 M18 110H185",
        "M18 135H185 M18 146H165",
        "M18 168H126V194H18Z",
        "M68 216L110 193L151 216V264L110 288L68 264Z M68 216L110 240L151 216 M110 240V288",
        "M18 312H202 M18 332H150 M18 348H185 M18 367H140",
      ]
    : [
        "M32 24H70V51H32Z M454 32H508 M530 32H581 M606 32H672 M695 20H768V49H695Z",
        "M32 92H438 M32 127H412 M32 162H448",
        "M32 199H364 M32 216H312",
        "M32 248H177V288H32Z M210 264H330",
        "M547 124L613 86L680 124V201L613 239L547 201Z M547 124L613 163L680 124 M613 163V239",
        "M32 322H768 M32 350H240 M293 350H502 M555 350H768 M32 375H180 M293 375H440 M555 375H718",
      ];

  return (
    <svg
      className="process-build-wireframe"
      viewBox={mobile ? "0 0 220 400" : "0 0 800 420"}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect width="100%" height="100%" className="build-wireframe-paper" />
      {paths.map((path) => (
        <path key={path} d={path} pathLength="1" />
      ))}
    </svg>
  );
}

function BuildWebsite({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`build-website${mobile ? " build-website-mobile" : ""}`}>
      <div className="build-site-nav build-content-part">
        <span className="build-site-brand">
          do<span>.</span>
        </span>
        {mobile ? (
          <Menu size={16} strokeWidth={1.5} />
        ) : (
          <div className="build-site-nav-links">
            <span>Realizacje</span>
            <span>Usługi</span>
            <span>
              Kontakt <ArrowUpRight size={10} />
            </span>
          </div>
        )}
      </div>
      <div className="build-site-hero">
        <div className="build-site-copy">
          <p className="build-site-intro build-content-part">Dawid Orłowski</p>
          <div className="build-site-headline build-content-part">
            Dobry design.
            <br />
            Jeszcze lepsza
            <br />
            strona<span>.</span>
          </div>
          <p className="build-site-description build-content-part">
            Strony, które mają charakter.
            <br />I pomagają Twojej firmie.
          </p>
          <span className="build-site-action build-ready-part">
            Porozmawiajmy <ArrowUpRight size={12} strokeWidth={1.75} />
          </span>
        </div>
        <svg
          className="build-site-art build-content-part"
          viewBox="0 0 180 180"
          fill="none"
          aria-hidden="true"
        >
          <path d="M40 136L92 165L143 136L92 107Z" fill="#00000045" />
          <path d="M35 65L88 35L141 65L88 96Z" fill="#c95271" />
          <path d="M35 65L88 96V153L35 122Z" fill="#770a26" />
          <path d="M88 96L141 65V122L88 153Z" fill="#a00c30" />
          <path d="M106 25L125 14L144 25L125 36Z" fill="#d7e9ef" />
          <path d="M106 25L125 36V57L106 46Z" fill="#698e9c" />
          <path d="M125 36L144 25V46L125 57Z" fill="#9fc5d3" />
          <path
            d="M102 115L122 103M102 123L115 115"
            stroke="#f4f0eb"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="build-site-projects build-ready-part">
        <div>
          <span>01</span>
          <strong>Strona firmowa</strong>
          <ArrowUpRight size={12} />
        </div>
        <div>
          <span>02</span>
          <strong>Landing page</strong>
          <ArrowUpRight size={12} />
        </div>
        {!mobile && (
          <div>
            <span>03</span>
            <strong>Aplikacja</strong>
            <ArrowUpRight size={12} />
          </div>
        )}
      </div>
    </div>
  );
}

export function ProcessBuild() {
  const section = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(2);
  const currentStage = useRef(2);
  const chooseStage = useRef<(index: number) => void>((index) => {
    currentStage.current = index;
    setStage(index);
  });

  useGSAP(
    () => {
      const root = section.current!;
      const media = gsap.matchMedia(root);

      media.add(
        {
          desktop: "(min-width: 1024px)",
          motion: "(prefers-reduced-motion: no-preference)",
          all: "all",
        },
        (context) => {
          const updateStage = (index: number) => {
            if (currentStage.current !== index) {
              currentStage.current = index;
              setStage(index);
            }
          };
          chooseStage.current = updateStage;
          updateStage(2);

          if (context.conditions?.desktop && context.conditions.motion) {
            root.dataset.scrub = "true";
            const timeline = gsap.timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * 0.95)}`,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            timeline
              .fromTo(
                ".process-build-wireframe path",
                { strokeDashoffset: 1 },
                {
                  strokeDashoffset: 0,
                  duration: 0.6,
                  stagger: 0.014,
                  ease: "none",
                },
                0,
              )
              .fromTo(
                ".process-build-wireframe",
                { autoAlpha: 1 },
                { autoAlpha: 0, duration: 0.48 },
                0.8,
              )
              .fromTo(
                ".build-content-part",
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.035 },
                0.9,
              )
              .fromTo(
                ".build-ready-part",
                { autoAlpha: 0, y: 8 },
                { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.04 },
                1.95,
              )
              .to({}, { duration: 0.3 }, 2.4);

            timeline.eventCallback("onUpdate", () => {
              const time = timeline.time();
              updateStage(time < 0.85 ? 0 : time < 1.95 ? 1 : 2);
            });

            updateStage(
              timeline.time() < 0.85 ? 0 : timeline.time() < 1.95 ? 1 : 2,
            );
            chooseStage.current = (index) => {
              // A click seeks this paused scrub timeline; the next scroll takes over.
              timeline.time([0.65, 1.72, 2.7][index]);
              updateStage(index);
            };

            return () => {
              delete root.dataset.scrub;
              chooseStage.current = updateStage;
            };
          }

          if (context.conditions?.motion) {
            gsap.from(".process-build-devices", {
              y: 22,
              autoAlpha: 0.45,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: { trigger: root, start: "top 85%", once: true },
            });
          }
        },
      );

      return () => media.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="od-pomyslu-do-strony"
      className="process-build"
      data-stage={stage}
      aria-labelledby="process-build-title"
    >
      <div className="shell process-build-stage">
        <div className="process-build-header">
          <div>
            <h2 id="process-build-title">Od szkicu do strony.</h2>
            <p>Jeden pomysł. Trzy etapy. Każdy ekran.</p>
          </div>
          <div
            className="process-build-stage-controls"
            role="group"
            aria-label="Etapy powstawania strony"
          >
            {stages.map((step, index) => (
              <button
                key={step.label}
                type="button"
                aria-pressed={stage === index}
                aria-controls="process-build-preview"
                onClick={() => chooseStage.current(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step.label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="process-build-preview"
          className="process-build-devices"
          aria-hidden="true"
        >
          <div className="process-build-browser">
            <div className="build-browser-toolbar">
              <span className="build-browser-signature">do.</span>
              <span>dorlowski.dev</span>
              <span>Desktop</span>
            </div>
            <div className="build-browser-screen">
              <BuildWebsite />
              <BuildWireframe />
            </div>
          </div>
          <div className="process-build-phone">
            <span className="build-phone-speaker" />
            <div className="build-phone-screen">
              <BuildWebsite mobile />
              <BuildWireframe mobile />
            </div>
          </div>
          <span className="process-build-ready build-ready-part">
            <Check size={13} />
            Gotowe do publikacji
          </span>
        </div>

        <div className="process-build-footer">
          <div
            className="process-build-caption"
            aria-live="polite"
            aria-atomic="true"
          >
            <span>{stages[stage].title}</span>
            <p>{stages[stage].description}</p>
          </div>
          <a href="#proces">
            Zobacz, jak pracuję <ArrowDown size={16} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </section>
  );
}
