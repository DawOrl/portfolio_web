"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./portfolio-motion.css";

const INTRO_SEEN = "dorlowski-intro-v1";
const REPLAY_EVENT = "dorlowski:replay-intro";

export function IntroReplay() {
  return (
    <button
      className="intro-replay"
      onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}
    >
      Odtwórz intro <span aria-hidden="true">↗</span>
    </button>
  );
}

/** Motion is progressive enhancement: the server-rendered page stays readable without JS. */
export function PortfolioMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dismiss = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const root = scope.current!;
    const overlay = dialog.current!;
    const content = root.querySelector<HTMLElement>(".motion-content")!;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    gsap.registerPlugin(ScrollTrigger);
    let pageContext: gsap.Context | undefined;
    let introContext: gsap.Context | undefined;
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    let running = false;
    let previousOverflow = "";
    let previousFocus: HTMLElement | null = null;

    const animatePage = () => {
      pageContext?.revert();
      pageContext = undefined;
      if (preference.matches) return;
      pageContext = gsap.context(() => {
        const reveal =
          ".section-heading, .design-interlude-copy, .portrait-story > div, .service-row, .process-grid article, .price-plan, .faq-section > div:first-child, .contact-invitation";
        gsap.utils.toArray<HTMLElement>(reveal, content).forEach((element) => {
          // Keep already visible content and direct anchor destinations immediately readable.
          if (element.getBoundingClientRect().top < window.innerHeight * 0.92)
            return;
          gsap.from(element, {
            y: 32,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
        gsap.utils
          .toArray<HTMLElement>(".section-topline", content)
          .forEach((element) => {
            if (element.getBoundingClientRect().top < window.innerHeight * 0.92)
              return;
            gsap.from(element, {
              clipPath: "inset(0 100% 0 0)",
              duration: 0.9,
              ease: "power2.inOut",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
              clearProps: "clipPath",
            });
          });
        if (window.matchMedia("(min-width: 761px)").matches) {
          gsap.fromTo(
            ".about-portrait-image img",
            { yPercent: 1 },
            {
              yPercent: -1,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-portrait-stage",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }
        gsap.utils
          .toArray<HTMLElement>(".type-word", content)
          .forEach((word, index) => {
            const direction = index === 1 ? -1 : 1;
            const distance = () =>
              Math.min(window.innerWidth * 0.025, 34) * direction;
            gsap.fromTo(
              word,
              { x: () => -distance() },
              {
                x: distance,
                ease: "none",
                scrollTrigger: {
                  trigger: ".type-interlude",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        gsap.from(".footer-word", {
          y: 30,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: ".site-footer",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
      }, content);
      ScrollTrigger.refresh();
    };

    const finish = () => {
      if (!running) return;
      running = false;
      clearTimeout(watchdog);
      overlay.close();
      introContext?.revert();
      introContext = undefined;
      document.body.style.overflow = previousOverflow;
      try {
        window.sessionStorage.setItem(INTRO_SEEN, "1");
      } catch {
        /* Storage may be disabled. */
      }
      if (previousFocus?.isConnected && previousFocus !== document.body)
        previousFocus.focus({ preventScroll: true });
      animatePage();
    };
    dismiss.current = finish;

    const play = () => {
      if (running || preference.matches) return;
      previousFocus =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      previousOverflow = document.body.style.overflow;
      overlay.showModal();
      running = true;
      document.body.style.overflow = "hidden";
      watchdog = setTimeout(finish, 4500);
      introContext = gsap.context(() => {
        gsap.set(".intro-stroke", { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(".intro-grid", { opacity: 0 });
        gsap.set(".intro-title span", { yPercent: 110 });
        gsap.set(".intro-accent", { scale: 0, transformOrigin: "81px 12px" });
        gsap.set(".intro-progress-fill", {
          scaleX: 0,
          transformOrigin: "left",
        });
        const sequence = gsap.timeline({ onComplete: finish });
        sequence
          .to(".intro-grid", { opacity: 1, duration: 0.6 }, 0)
          .to(
            ".intro-stroke",
            {
              strokeDashoffset: 0,
              duration: 1.45,
              stagger: 0.2,
              ease: "power2.inOut",
            },
            0.25,
          )
          .to(
            ".intro-title span",
            { yPercent: 0, duration: 0.85, stagger: 0.16, ease: "power3.out" },
            0.45,
          )
          .to(
            ".intro-accent",
            { scale: 1, duration: 0.5, ease: "back.out(1.7)" },
            1.85,
          )
          .set(".intro-stroke", { strokeDasharray: "none" }, 2)
          .to(".intro-grid", { opacity: 0.22, duration: 0.6 }, 2.1)
          .to(
            ".intro-progress-fill",
            { scaleX: 1, duration: 3.2, ease: "none" },
            0,
          )
          .to(
            ".intro-sheet",
            { yPercent: -102, duration: 0.8, ease: "power3.inOut" },
            3.2,
          )
          .to(overlay, { backgroundColor: "transparent", duration: 0.01 }, 3.2);
      }, overlay);
    };

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_SEEN) === "1";
    } catch {
      /* Still allow intro. */
    }
    if (
      !seen &&
      !window.location.hash &&
      window.scrollY < 100 &&
      !preference.matches
    )
      play();
    else animatePage();

    const onPreference = () => {
      if (running) finish();
      else animatePage();
    };
    // Keyboard users should never focus an element that is waiting for a scroll reveal.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>(
        ".service-row, .price-plan, .section-heading, .portrait-story > div, .faq-section > div, .contact-invitation",
      );
      if (target) {
        gsap.killTweensOf(target);
        gsap.set(target, { clearProps: "transform,opacity" });
      }
    };
    content.addEventListener("focusin", onFocus);
    window.addEventListener(REPLAY_EVENT, play);
    preference.addEventListener("change", onPreference);
    return () => {
      clearTimeout(watchdog);
      content.removeEventListener("focusin", onFocus);
      window.removeEventListener(REPLAY_EVENT, play);
      preference.removeEventListener("change", onPreference);
      if (running) {
        overlay.close();
        document.body.style.overflow = previousOverflow;
      }
      introContext?.revert();
      pageContext?.revert();
    };
  }, []);

  return (
    <div ref={scope}>
      <dialog
        ref={dialog}
        className="portfolio-intro"
        aria-labelledby="intro-label"
        onCancel={(event) => {
          event.preventDefault();
          dismiss.current();
        }}
      >
        <div className="intro-sheet">
          <div className="intro-top">
            <span id="intro-label">
              DAWID ORŁOWSKI <span className="intro-top-divider">/</span> DESIGN
              & DEVELOPMENT
            </span>
            <button
              type="button"
              className="intro-skip"
              onClick={() => dismiss.current()}
            >
              Pomiń intro <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="intro-composition" aria-hidden="true">
            <div className="intro-specimen">
              <span className="intro-annotation intro-annotation-top">
                FIG. 001 — OSOBISTY ZNAK
              </span>
              <svg
                className="intro-monogram"
                viewBox="-12 -12 112 96"
                fill="none"
              >
                <g
                  className="intro-grid"
                  stroke="currentColor"
                  strokeWidth="0.15"
                >
                  <path d="M-12 8H100M-12 30H100M-12 44H100M-12 58H100M6-12V84M34-12V84M47-12V84M75-12V84M-12-12L100 84M100-12L-12 84" />
                  <circle cx="20" cy="44" r="20" />
                  <circle cx="61" cy="44" r="20" />
                </g>
                <g stroke="currentColor" strokeWidth="8">
                  <path
                    className="intro-stroke"
                    pathLength="1"
                    d="M34 8v36a14 14 0 1 1-14-14h14"
                  />
                  <circle
                    className="intro-stroke"
                    pathLength="1"
                    cx="61"
                    cy="44"
                    r="14"
                  />
                </g>
                <path
                  className="intro-accent"
                  d="M77 8h8v8h-8z"
                  fill="var(--accent-cool)"
                />
              </svg>
              <span className="intro-annotation intro-annotation-bottom">
                PROPORCJA. RYTM. CHARAKTER.
              </span>
            </div>
            <div className="intro-title">
              <div>
                <span>Od kreski.</span>
              </div>
              <div>
                <span>
                  Do <em>charakteru.</em>
                </span>
              </div>
              <p>Dobry projekt zaczyna się od intencji.</p>
            </div>
          </div>
          <div className="intro-bottom">
            <span>KRAKÓW / PRACUJĘ ZDALNIE</span>
            <div className="intro-progress" aria-hidden="true">
              <span className="intro-progress-fill" />
            </div>
            <span>STUDIUM FORMY — 04 S</span>
          </div>
        </div>
      </dialog>
      <div className="motion-content">{children}</div>
    </div>
  );
}
