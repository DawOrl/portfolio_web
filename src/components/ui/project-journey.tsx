"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./project-journey.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type JourneyProject = { slug: string; title: string; cover: string };
type Journey = {
  selectedSlug: string | null;
  selectProject: (slug: string) => void;
  openProject: (
    project: JourneyProject,
    source: HTMLImageElement | null,
  ) => void;
};
type ReturnPosition = { scroll: number; stageTop: number | null };
const JourneyContext = createContext<Journey | null>(null);

export function useProjectJourney() {
  const journey = useContext(JourneyContext);
  if (!journey) throw new Error("Project journey requires its provider.");
  return journey;
}

export function ProjectJourneyProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const layer = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const previousPath = useRef(pathname);
  const returnPosition = useRef<ReturnPosition | null>(null);
  const start = useRef<Journey["openProject"]>(() => {});
  const arrive = useRef<(path: string) => void>(() => {});

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return;
      const overlay = layer.current!;
      const floating = photo.current!;
      const picture = image.current!;
      let sequence: gsap.core.Timeline | undefined;
      let pending: JourneyProject | null = null;
      let frame = 0;
      let timeout: ReturnType<typeof setTimeout> | undefined;
      let destination: HTMLImageElement | null = null;
      let previousVisibility = "";
      let sourceWidth = 1;
      let sourceHeight = 1;
      let focusTarget: string | null = null;

      const focusProject = () => {
        if (focusTarget === window.location.pathname) {
          document
            .querySelector<HTMLElement>("#case-title")
            ?.focus({ preventScroll: true });
        }
        focusTarget = null;
      };

      const finish = () => {
        sequence?.kill();
        sequence = undefined;
        cancelAnimationFrame(frame);
        clearTimeout(timeout);
        if (destination) destination.style.visibility = previousVisibility;
        destination = null;
        pending = null;
        overlay.hidden = true;
        overlay.removeAttribute("data-active");
        focusProject();
      };

      start.current = contextSafe(
        (project: JourneyProject, source: HTMLImageElement | null) => {
          if (pending) return;
          const scene = document.querySelector<HTMLElement>(".carousel-scene");
          if (window.location.pathname === "/") {
            returnPosition.current = {
              scroll: window.scrollY,
              stageTop: scene?.getBoundingClientRect().top ?? null,
            };
          }
          const url = `/realizacje/${project.slug}`;
          focusTarget = url;
          if (
            !source ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            router.push(url);
            return;
          }
          const bounds = source.getBoundingClientRect();
          if (!bounds.width || !bounds.height) {
            router.push(url);
            return;
          }
          pending = project;
          sourceWidth = bounds.width;
          sourceHeight = bounds.height;
          picture.src = source.currentSrc || project.cover;
          floating.style.width = `${sourceWidth}px`;
          floating.style.height = `${sourceHeight}px`;
          overlay.hidden = false;
          overlay.dataset.active = "true";
          source.closest("dialog")?.close();
          const scale = Math.min(
            960 / sourceWidth,
            (window.innerWidth - 40) / sourceWidth,
            (window.innerHeight * 0.65) / sourceHeight,
          );
          const width = sourceWidth * scale;
          const height = sourceHeight * scale;
          gsap.set(overlay, { backgroundColor: "rgba(29,29,29,0)" });
          gsap.set(floating, {
            x: bounds.left,
            y: bounds.top,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            borderRadius: 4,
            transformOrigin: "0 0",
          });
          sequence = gsap.timeline();
          sequence
            .to(
              overlay,
              { backgroundColor: "rgba(29,29,29,1)", duration: 0.24 },
              0,
            )
            .to(
              floating,
              {
                x: (window.innerWidth - width) / 2,
                y: (window.innerHeight - height) / 2,
                scaleX: width / sourceWidth,
                scaleY: height / sourceHeight,
                duration: 0.42,
                ease: "power3.inOut",
                onComplete: () => router.push(url),
              },
              0,
            );
          // Navigation can fail or be interrupted; the visual layer must never trap the page.
          timeout = setTimeout(finish, 3500);
        },
      );

      arrive.current = contextSafe((path: string) => {
        if (!pending) {
          if (focusTarget === path) frame = requestAnimationFrame(focusProject);
          else focusTarget = null;
          return;
        }
        if (path !== `/realizacje/${pending.slug}`) {
          finish();
          return;
        }
        let attempts = 0;
        const match = contextSafe(() => {
          const target = document.querySelector<HTMLImageElement>(
            "img[data-project-cover]",
          );
          if (!target || target.dataset.projectSlug !== pending?.slug) {
            if (++attempts < 30) frame = requestAnimationFrame(match);
            else finish();
            return;
          }
          const bounds = target.getBoundingClientRect();
          if (!bounds.width || !bounds.height) {
            finish();
            return;
          }
          destination = target;
          previousVisibility = target.style.visibility;
          target.style.visibility = "hidden";
          sequence?.kill();
          sequence = gsap.timeline({ onComplete: finish });
          sequence
            .to(
              floating,
              {
                x: bounds.left,
                y: bounds.top,
                scaleX: bounds.width / sourceWidth,
                scaleY: bounds.height / sourceHeight,
                borderRadius: 0,
                duration: 0.46,
                ease: "power3.inOut",
              },
              0,
            )
            .to(
              overlay,
              { backgroundColor: "rgba(29,29,29,0)", duration: 0.32 },
              0.08,
            )
            .to(floating, { opacity: 0, duration: 0.12 }, 0.46);
          sequence.call(
            () => {
              if (destination)
                destination.style.visibility = previousVisibility;
            },
            [],
            0.46,
          );
        });
        frame = requestAnimationFrame(match);
      });

      return () => {
        finish();
        start.current = () => {};
        arrive.current = () => {};
      };
    },
    { scope: layer },
  );

  useEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;
    let frame = requestAnimationFrame(() => arrive.current(pathname));
    let active = true;
    if (
      pathname === "/" &&
      previous.startsWith("/realizacje/") &&
      returnPosition.current &&
      ["", "#realizacje"].includes(window.location.hash)
    ) {
      const restore = () => {
        if (!active) return;
        ScrollTrigger.refresh();
        const saved = returnPosition.current!;
        const stage = document.querySelector<HTMLElement>(".carousel-scene");
        const top =
          stage && saved.stageTop !== null
            ? window.scrollY +
              stage.getBoundingClientRect().top -
              saved.stageTop
            : saved.scroll;
        window.scrollTo({ top, behavior: "instant" });
        ScrollTrigger.update();
        document
          .querySelector<HTMLButtonElement>('.spatial-card[data-active="true"]')
          ?.focus({ preventScroll: true });
      };
      void document.fonts.ready.then(() => {
        if (active) frame = requestAnimationFrame(restore);
      });
    }
    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const openProject = useCallback<Journey["openProject"]>(
    (project, source) => start.current(project, source),
    [],
  );
  const value = useMemo(
    () => ({ selectedSlug, selectProject: setSelectedSlug, openProject }),
    [selectedSlug, openProject],
  );

  return (
    <JourneyContext.Provider value={value}>
      {children}
      <div
        ref={layer}
        className="project-journey-layer"
        hidden
        aria-hidden="true"
      >
        <div ref={photo} className="project-journey-photo">
          {/* This temporary image reuses the already loaded responsive preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={image} alt="" />
        </div>
      </div>
    </JourneyContext.Provider>
  );
}

export function ProjectCaseLink({
  project,
  children,
  className,
  onNavigate,
}: {
  project: JourneyProject;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const journey = useProjectJourney();
  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    const source =
      event.currentTarget
        .closest("dialog")
        ?.querySelector<HTMLImageElement>(
          ".carousel-detail-desktop-screen img",
        ) ?? null;
    journey.openProject(project, source);
    onNavigate?.();
  }
  return (
    <Link
      href={`/realizacje/${project.slug}`}
      className={className}
      onClick={open}
    >
      {children}
    </Link>
  );
}
