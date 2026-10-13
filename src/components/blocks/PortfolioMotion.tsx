"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  createRibbonFilm,
  RIBBON_ASPECT,
  RIBBON_FPS,
  RIBBON_FRAMES,
  RIBBON_PAD,
  type RibbonFilm,
} from "./intro-ribbon";
import { INTRO_SEEN } from "./intro-cover";
import "./portfolio-motion.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Each word names the stage the Blender film is in: line, form, finished site.
const INTRO_WORDS = ["kreska", "forma", "strona"];
const FILM = RIBBON_FRAMES / RIBBON_FPS;
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
      let watchdog: gsap.core.Tween | undefined;
      let running = false;
      let previousOverflow = "";
      let previousPadding = "";
      let previousFocus: HTMLElement | null = null;
      let film: RibbonFilm | undefined;
      let run = 0;

      const animatePage = contextSafe((enterHero = false) => {
        pageMedia?.revert();
        reveals.clear();
        heroEntrance = undefined;
        pageMedia = gsap.matchMedia();
        pageMedia.add(
          {
            desktop: "(min-width: 761px)",
            wide: "(min-width: 1101px)",
            motion: "(prefers-reduced-motion: no-preference)",
          },
          (mediaContext) => {
            if (!mediaContext.conditions?.motion) return;
            const desktop = mediaContext.conditions.desktop;
            const wide = mediaContext.conditions.wide;
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
              heroEntrance.from(
                signatureEntry,
                {
                  y: 24,
                  rotation: 2,
                  autoAlpha: 0,
                  transformOrigin: "50% 55%",
                  duration: 0.85,
                  clearProps: "transform,transform-origin,opacity,visibility",
                },
                0.18,
              );
            }

            // One-shot entrances keep functional content available during a fast scroll.
            // Phones often rest content on the bottom edge, so there it starts later and lighter.
            const reveal = (element: HTMLElement, vars: gsap.TweenVars) => {
              if (
                element.getBoundingClientRect().top <
                window.innerHeight * 0.8
              )
                return;
              const tween = gsap.from(element, {
                duration: 0.9,
                ease: "power3.out",
                autoAlpha: desktop ? 0.35 : 0.6,
                clearProps: "transform,transform-origin,opacity,visibility",
                ...vars,
                scrollTrigger: {
                  trigger: element,
                  start: desktop ? "top 88%" : "top 96%",
                  once: true,
                },
              });
              reveals.set(element, tween);
            };

            if (desktop) {
              // Sculpture entry and scroll use separate wrappers; the text stays still.
              gsap.to(".hero-signature-stage", {
                y: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.65,
                },
              });
            }

            content
              .querySelectorAll<HTMLElement>(
                ".section-heading, .faq-layout > div:first-child",
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
                // Below 1100px the names sit inset by a short drift that keeps them inside the gutters.
                const [enter, exit] = wide ? [70, 24] : [16, 16];
                gsap.fromTo(
                  ".about-first-name",
                  { x: -enter },
                  {
                    x: exit,
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
                  { x: enter },
                  {
                    x: -exit,
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

      const finish = contextSafe((landed = false) => {
        if (!running) return;
        running = false;
        watchdog?.kill();
        film?.destroy();
        film = undefined;
        overlay.close();
        introContext?.revert();
        introContext = undefined;
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = previousPadding;
        try {
          window.sessionStorage.setItem(INTRO_SEEN, "1");
        } catch {
          /* Storage may be disabled. */
        }
        // A landed intro has already placed the hero; a skipped one hands over to its entrance.
        animatePage(!landed && window.scrollY < 100);
        if (previousFocus?.isConnected && previousFocus !== document.body) {
          previousFocus.focus({ preventScroll: true });
          if (previousFocus.closest(".hero")) heroEntrance?.progress(1).kill();
        }
      });
      dismiss.current = finish;

      const ribbon = overlay.querySelector<HTMLElement>(".intro-ribbon")!;
      const finalWord = overlay.querySelector<HTMLElement>(
        ".intro-word-final .intro-word-text",
      )!;
      const heroForm = content.querySelector<HTMLElement>(
        ".hero-signature-entry",
      )!;
      const heroLines = gsap.utils.toArray<HTMLElement>(
        ".hero-line-inner",
        content,
      );
      const heroLastLine = heroLines[heroLines.length - 1];

      // The ribbon and the last word fly onto the hero form and headline they become.
      const land = () => {
        const textBox = (element: HTMLElement) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return range.getBoundingClientRect();
        };
        // The hero still is the central 1 / PAD of a frame, drawn with object-fit: contain.
        const from = ribbon.getBoundingClientRect();
        const stage = heroForm.getBoundingClientRect();
        const formWidth = Math.min(stage.width, stage.height * RIBBON_ASPECT);
        // The last word may still be finishing its rise; land where that rise ends.
        const lift =
          ((gsap.getProperty(finalWord, "yPercent") as number) / 100) *
          finalWord.offsetHeight;
        const wordBox = finalWord.getBoundingClientRect();
        const wordText = textBox(finalWord);
        const target = textBox(heroLastLine);
        const fontScale =
          parseFloat(getComputedStyle(heroLastLine).fontSize) /
          parseFloat(getComputedStyle(finalWord).fontSize);

        gsap
          .timeline({
            onComplete: () => rootContext.ignore(() => finish(true)),
          })
          .to(
            ".intro-top, .intro-bottom",
            { autoAlpha: 0, duration: 0.35, ease: "power2.out" },
            0,
          )
          .set(finalWord.parentElement!, { overflow: "visible" }, 0)
          .to(
            ribbon,
            {
              x: stage.left + stage.width / 2 - (from.left + from.width / 2),
              y: stage.top + stage.height / 2 - (from.top + from.height / 2),
              scale: (formWidth * RIBBON_PAD) / from.width,
              rotation: -5,
              duration: 1.15,
              ease: "expo.inOut",
            },
            0,
          )
          .to(
            finalWord,
            {
              x:
                target.left -
                wordBox.left -
                (wordText.left - wordBox.left) * fontScale,
              y:
                target.top -
                (wordBox.top - lift) -
                (wordText.top - wordBox.top) * fontScale,
              scale: fontScale,
              transformOrigin: "0 0",
              duration: 1.1,
              ease: "expo.inOut",
            },
            0.05,
          )
          .to(
            [overlay, ".intro-sheet"],
            {
              backgroundColor: "rgba(29, 29, 29, 0)",
              duration: 0.6,
              ease: "power2.inOut",
            },
            0.25,
          )
          .from(
            heroLines.slice(0, -1),
            {
              yPercent: 110,
              rotation: 1.5,
              duration: 1,
              stagger: 0.1,
              ease: "power4.out",
            },
            0.5,
          )
          .from(
            content.querySelectorAll(
              ".site-header, .hero-meta, .hero-bottom > div",
            ),
            {
              y: 22,
              autoAlpha: 0,
              duration: 0.8,
              stagger: 0.07,
              ease: "power3.out",
            },
            0.6,
          )
          .set([heroForm, heroLastLine], { visibility: "visible" }, 1.15)
          .set([ribbon, finalWord], { autoAlpha: 0 }, 1.15);
      };

      const sequence = (playing: boolean) => {
        const words = gsap.utils.toArray<HTMLElement>(
          ".intro-word-text",
          overlay,
        );
        const stages = gsap.utils.toArray<HTMLElement>(".intro-stage", overlay);
        const counter = overlay.querySelector<HTMLElement>(".intro-counter b")!;
        const frame = { value: 0 };
        const timeline = gsap.timeline();
        if (!playing)
          timeline.fromTo(
            ".intro-ribbon-fallback",
            { autoAlpha: 0, scale: 0.82, rotation: 14 },
            {
              autoAlpha: 1,
              scale: 1,
              rotation: 0,
              duration: FILM,
              ease: "expo.out",
            },
            0,
          );
        timeline
          .to(
            ".intro-progress-fill",
            { scaleX: 1, duration: FILM, ease: "none" },
            0,
          )
          .to(
            frame,
            {
              value: RIBBON_FRAMES,
              duration: FILM,
              ease: "none",
              onUpdate: () => {
                counter.textContent = String(Math.round(frame.value)).padStart(
                  3,
                  "0",
                );
              },
            },
            0,
          );
        // Beats follow the film: the line is drawn, the band unfurls, the form settles.
        const beats = [0.05, 0.92, 1.72];
        words.forEach((word, index) => {
          timeline
            .to(
              word,
              { yPercent: 0, duration: 0.85, ease: "expo.out" },
              beats[index],
            )
            .to(stages[index], { opacity: 1, duration: 0.3 }, beats[index]);
          if (index < words.length - 1)
            timeline
              .to(
                word,
                { yPercent: -108, duration: 0.42, ease: "power3.in" },
                beats[index + 1] - 0.36,
              )
              .to(
                stages[index],
                { opacity: 0.4, duration: 0.3 },
                beats[index + 1],
              );
        });
        // The flight overlaps the film's last, almost still frames.
        timeline.call(() => introContext?.add(land), [], FILM - 0.3);
      };

      const play = contextSafe(() => {
        if (running || preference.matches) return;
        previousFocus =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        previousOverflow = document.body.style.overflow;
        previousPadding = document.body.style.paddingRight;
        // Keep the scrollbar's width, or the page under the landing ribbon shifts on close.
        const gutter = window.innerWidth - document.documentElement.clientWidth;
        if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
        overlay.showModal();
        running = true;
        const token = ++run;
        document.body.style.overflow = "hidden";
        // GSAP time, not the wall clock: it stops with the sequence when the tab is hidden.
        watchdog = gsap.delayedCall(9, finish);
        overlay.querySelector(".intro-counter b")!.textContent = "000";
        introContext = gsap.context(() => {
          gsap.set([heroForm, heroLastLine], { visibility: "hidden" });
          gsap.set(".intro-word-text", { yPercent: 108 });
          gsap.set(".intro-stage", { opacity: 0.4 });
          gsap.set(".intro-progress-fill", {
            scaleX: 0,
            transformOrigin: "left",
          });
          gsap.set(".intro-ribbon-fallback", { autoAlpha: 0 });
          gsap.from(".intro-top, .intro-bottom", {
            autoAlpha: 0,
            y: (index) => (index ? 12 : -12),
            duration: 0.7,
            ease: "power3.out",
          });
        }, overlay);

        const pixels = ribbon.offsetWidth * window.devicePixelRatio;
        const current = createRibbonFilm(
          ribbon.querySelector("canvas")!,
          pixels > 700 ? 960 : 640,
        );
        film = current;
        // A slow connection or blocked autoplay gets the still form instead of the film.
        const loaded = Promise.race([
          current.ready.then(
            () => true,
            () => false,
          ),
          new Promise<boolean>((resolve) => setTimeout(resolve, 2600, false)),
        ]);
        const settle = new Promise((resolve) => setTimeout(resolve, 350));
        void Promise.all([loaded, settle])
          .then(([ok]) =>
            ok && token === run && running
              ? current.play().then(
                  () => true,
                  () => false,
                )
              : false,
          )
          .then((playing) => {
            if (token === run && running)
              introContext?.add(() => sequence(playing));
          });
      });

      const start = () => {
        let seen = true;
        try {
          seen = window.sessionStorage.getItem(INTRO_SEEN) === "1";
        } catch {
          /* Without storage the intro would repeat on every visit. */
        }
        if (
          !seen &&
          !window.location.hash &&
          window.scrollY < 100 &&
          !preference.matches &&
          !window.matchMedia("(forced-colors: active)").matches
        )
          play();
        else
          animatePage(!window.location.hash || window.location.hash === "#top");
        // The open dialog (or the decision to skip it) replaces the pre-paint cover.
        document.documentElement.classList.remove("intro-pending");
      };
      // A tab opened in the background keeps its intro until it is first seen.
      const onVisible = () => {
        if (document.visibilityState !== "visible") return;
        document.removeEventListener("visibilitychange", onVisible);
        start();
      };
      if (document.visibilityState === "visible") start();
      else document.addEventListener("visibilitychange", onVisible);

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
        watchdog?.kill();
        document.removeEventListener("visibilitychange", onVisible);
        content.removeEventListener("focusin", onFocus);
        window.removeEventListener(REPLAY_EVENT, play);
        preference.removeEventListener("change", onPreference);
        if (running) {
          overlay.close();
          document.body.style.overflow = previousOverflow;
          document.body.style.paddingRight = previousPadding;
        }
        // Pending film loads of this run must not animate a remounted page.
        running = false;
        run++;
        film?.destroy();
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
          <div className="intro-words" aria-hidden="true">
            {INTRO_WORDS.map((word, index) => (
              <span
                key={word}
                className={
                  index === INTRO_WORDS.length - 1
                    ? "intro-word intro-word-final"
                    : "intro-word"
                }
              >
                <span className="intro-word-text">
                  {word}
                  <i>.</i>
                </span>
              </span>
            ))}
          </div>
          <div className="intro-bottom" aria-hidden="true">
            <ol className="intro-stages">
              {INTRO_WORDS.map((word, index) => (
                <li key={word} className="intro-stage">
                  <span>0{index + 1}</span>
                  {word}
                </li>
              ))}
            </ol>
            <div className="intro-progress">
              <span className="intro-progress-fill" />
            </div>
            <span className="intro-counter">
              <b>000</b> / {String(RIBBON_FRAMES).padStart(3, "0")}
            </span>
          </div>
        </div>
        <div className="intro-ribbon" aria-hidden="true">
          <canvas />
          <Image
            className="intro-ribbon-fallback"
            src="/hero-form-blender.webp"
            alt=""
            width={1000}
            height={1100}
            loading="eager"
            unoptimized
          />
        </div>
      </dialog>
      <div className="motion-content">{children}</div>
    </div>
  );
}
