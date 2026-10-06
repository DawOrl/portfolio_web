"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./portfolio-motion.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  useGSAP(
    (rootContext, contextSafe) => {
      if (!contextSafe) return;
      const root = scope.current!;
      const overlay = dialog.current!;
      const content = root.querySelector<HTMLElement>(".motion-content")!;
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      let pageMedia: ReturnType<typeof gsap.matchMedia> | undefined;
      let heroEntrance: gsap.core.Timeline | undefined;
      const reveals = new Map<HTMLElement, gsap.core.Tween>();
      let active = true;
      let introContext: gsap.Context | undefined;
      let watchdog: ReturnType<typeof setTimeout> | undefined;
      let running = false;
      let previousOverflow = "";
      let previousFocus: HTMLElement | null = null;

      const animatePage = contextSafe((enterHero = false) => {
        pageMedia?.revert();
        reveals.clear();
        heroEntrance = undefined;
        pageMedia = gsap.matchMedia();
        pageMedia.add(
          {
            desktop: "(min-width: 761px)",
            motion: "(prefers-reduced-motion: no-preference)",
          },
          (mediaContext) => {
            if (!mediaContext.conditions?.motion) return;
            const desktop = mediaContext.conditions.desktop;
            const hero = content.querySelector<HTMLElement>(".hero")!;
            const signatureEntry = content.querySelector<HTMLElement>(
              ".hero-signature-entry",
            )!;

            // Only the first visible composition gets a full entrance sequence.
            if (enterHero && window.scrollY < 100) {
              enterHero = false;
              heroEntrance = gsap.timeline({
                defaults: { ease: "power4.out" },
              });
              heroEntrance
                .from(
                  ".hero-line-inner",
                  {
                    yPercent: 110,
                    rotation: 1.5,
                    duration: 1.05,
                    stagger: 0.11,
                    clearProps: "transform",
                  },
                  0,
                )
                .from(
                  ".hero-meta",
                  {
                    y: 14,
                    autoAlpha: 0,
                    duration: 0.55,
                    clearProps: "transform,opacity,visibility",
                  },
                  0.08,
                )
                .from(
                  ".hero-bottom > div",
                  {
                    y: 24,
                    autoAlpha: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    clearProps: "transform,opacity,visibility",
                  },
                  0.35,
                )
                .from(
                  ".hero-baseline",
                  {
                    autoAlpha: 0,
                    duration: 0.6,
                    clearProps: "opacity,visibility",
                  },
                  0.6,
                );
              if (desktop) {
                heroEntrance.from(
                  signatureEntry,
                  {
                    y: 72,
                    rotation: -10,
                    scale: 0.9,
                    autoAlpha: 0,
                    transformOrigin: "50% 55%",
                    duration: 1.2,
                    clearProps: "transform,transform-origin,opacity,visibility",
                  },
                  0.18,
                );
              }
            }

            // One-shot entrances keep functional content available during a fast scroll.
            const reveal = (element: HTMLElement, vars: gsap.TweenVars) => {
              if (
                element.getBoundingClientRect().top <
                window.innerHeight * 0.8
              )
                return;
              const tween = gsap.from(element, {
                duration: 0.9,
                ease: "power3.out",
                autoAlpha: 0.35,
                clearProps: "transform,transform-origin,opacity,visibility",
                ...vars,
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true,
                },
              });
              reveals.set(element, tween);
            };

            if (!desktop) {
              reveal(signatureEntry, { y: 48, rotation: -7, scale: 0.93 });
            } else {
              // Entry and scroll have separate transform owners, as does the card's hover.
              gsap.to(".hero-title-wrap", {
                y: -50,
                x: -24,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.65,
                },
              });
              gsap.to(".hero-signature-stage", {
                y: -90,
                rotation: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.65,
                },
              });
            }

            const designCopy = content.querySelector<HTMLElement>(
              ".design-interlude-copy",
            );
            if (designCopy) reveal(designCopy, { y: desktop ? 44 : 24 });

            content
              .querySelectorAll<HTMLElement>(
                ".section-heading, .faq-section > div:first-child",
              )
              .forEach((heading) => {
                reveal(heading, {
                  y: desktop ? 44 : 24,
                  x: desktop ? -12 : 0,
                });
              });

            content
              .querySelectorAll<HTMLElement>(".service-row")
              .forEach((row, index) => {
                reveal(row, {
                  y: desktop ? 36 : 22,
                  x: desktop ? -16 : 0,
                  duration: 0.75,
                  delay: desktop ? index * 0.065 : 0,
                });
              });

            const serviceStudy =
              content.querySelector<HTMLElement>(".service-study");
            if (serviceStudy) {
              reveal(serviceStudy, {
                y: desktop ? 38 : 20,
                scale: 0.96,
              });
            }

            content
              .querySelectorAll<HTMLElement>(".portrait-story > div")
              .forEach((column, index) => {
                reveal(column, {
                  y: desktop ? 32 : 22,
                  x: desktop ? (index === 0 ? -26 : 26) : 0,
                });
              });

            content
              .querySelectorAll<HTMLElement>(".process-grid > article")
              .forEach((step, index) => {
                reveal(step, {
                  y: desktop ? 52 : 26,
                  scale: desktop ? 0.96 : 1,
                  delay: desktop ? index * 0.08 : 0,
                });
              });

            content
              .querySelectorAll<HTMLElement>(".price-plan")
              .forEach((plan, index) => {
                reveal(plan, {
                  y: desktop ? 48 : 28,
                  scale: desktop ? 0.97 : 1,
                  duration: 0.85,
                  delay: desktop ? index * 0.075 : 0,
                });
              });

            content
              .querySelectorAll<HTMLElement>(
                ".pricing-included, .pricing-extras",
              )
              .forEach((details) => {
                reveal(details, { y: desktop ? 30 : 20 });
              });

            content
              .querySelectorAll<HTMLElement>(".faq-list > details")
              .forEach((question) => {
                reveal(question, {
                  y: desktop ? 28 : 18,
                  x: desktop ? 18 : 0,
                  duration: 0.72,
                });
              });

            const carouselStage =
              content.querySelector<HTMLElement>(".spatial-stage");
            if (carouselStage) {
              reveal(carouselStage, {
                y: desktop ? 64 : 28,
                scale: desktop ? 0.88 : 0.96,
                rotationX: desktop ? 10 : 0,
                transformPerspective: 1000,
                transformOrigin: "50% 70%",
                duration: 1.05,
              });
            }

            if (desktop) {
              const portrait = content.querySelector<HTMLElement>(
                ".about-portrait-stage",
              );
              if (portrait) {
                gsap.fromTo(
                  ".about-first-name",
                  { x: -70 },
                  {
                    x: 24,
                    ease: "none",
                    scrollTrigger: {
                      trigger: portrait,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.7,
                    },
                  },
                );
                gsap.fromTo(
                  ".about-last-name",
                  { x: 70 },
                  {
                    x: -24,
                    ease: "none",
                    scrollTrigger: {
                      trigger: portrait,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.7,
                    },
                  },
                );
                // The portrait moves within its fixed editorial composition.
                gsap.fromTo(
                  ".about-portrait-image img",
                  { yPercent: 2 },
                  {
                    yPercent: -2,
                    ease: "none",
                    scrollTrigger: {
                      trigger: portrait,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.7,
                    },
                  },
                );
              }
            }

            const invitation = content.querySelector<HTMLElement>(
              ".contact-invitation",
            );
            if (invitation) reveal(invitation, { y: desktop ? 42 : 22 });

            gsap.from(".footer-word", {
              yPercent: 22,
              autoAlpha: 0.4,
              ease: "none",
              scrollTrigger: {
                trigger: ".site-footer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.5,
              },
            });
            return () => {
              reveals.clear();
              heroEntrance = undefined;
            };
          },
          content,
        );
        ScrollTrigger.refresh();
      });

      const finish = contextSafe(() => {
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
        animatePage(window.scrollY < 100);
        if (previousFocus?.isConnected && previousFocus !== document.body) {
          previousFocus.focus({ preventScroll: true });
          if (previousFocus.closest(".hero")) heroEntrance?.progress(1).kill();
        }
      });
      dismiss.current = finish;

      const play = contextSafe(() => {
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
          gsap.set(".intro-stroke", {
            strokeDasharray: 1,
            strokeDashoffset: 1,
          });
          gsap.set(".intro-grid", { opacity: 0 });
          gsap.set(".intro-title span", { yPercent: 110 });
          gsap.set(".intro-accent", { scale: 0, transformOrigin: "81px 12px" });
          gsap.set(".intro-progress-fill", {
            scaleX: 0,
            transformOrigin: "left",
          });
          const sequence = gsap.timeline({
            // Completing a child context must not record its parent inside itself.
            onComplete: () => rootContext.ignore(finish),
          });
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
              {
                yPercent: 0,
                duration: 0.85,
                stagger: 0.16,
                ease: "power3.out",
              },
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
            .to(
              overlay,
              { backgroundColor: "transparent", duration: 0.01 },
              3.2,
            );
        }, overlay);
      });

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
      else
        animatePage(!window.location.hash || window.location.hash === "#top");

      const onPreference = () => {
        if (running) finish();
      };
      // Focusing a link or card completes its entrance without waiting for scroll.
      const onFocus = contextSafe((event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        if (event.target.closest(".hero")) heroEntrance?.progress(1).kill();
        const completeEntrance = (element: HTMLElement) => {
          const entrance = reveals.get(element);
          if (!entrance) return;
          entrance.progress(1);
          entrance.scrollTrigger?.kill();
          entrance.kill();
          reveals.delete(element);
        };
        for (
          let element: Element | null = event.target;
          element && element !== content;
          element = element.parentElement
        ) {
          if (element instanceof HTMLElement) completeEntrance(element);
        }
        const carouselStage = event.target
          .closest(".carousel-scene")
          ?.querySelector<HTMLElement>(".spatial-stage");
        if (carouselStage) completeEntrance(carouselStage);
      });
      void document.fonts.ready.then(() => {
        if (active) ScrollTrigger.refresh();
      });
      content.addEventListener("focusin", onFocus);
      window.addEventListener(REPLAY_EVENT, play);
      preference.addEventListener("change", onPreference);
      return () => {
        active = false;
        dismiss.current = () => {};
        clearTimeout(watchdog);
        content.removeEventListener("focusin", onFocus);
        window.removeEventListener(REPLAY_EVENT, play);
        preference.removeEventListener("change", onPreference);
        if (running) {
          overlay.close();
          document.body.style.overflow = previousOverflow;
        }
        introContext?.revert();
        pageMedia?.revert();
      };
    },
    { scope },
  );

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
                FIG. 001 - OSOBISTY ZNAK
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
            <span>STUDIUM FORMY - 04 S</span>
          </div>
        </div>
      </dialog>
      <div className="motion-content">{children}</div>
    </div>
  );
}
