"use client";

import Image, { getImageProps } from "next/image";
import { useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  X,
} from "lucide-react";
import { projectName, type Project } from "@/lib/projects";
import { ProjectMotionPreview } from "./ProjectMotionPreview";
import {
  ProjectCaseLink,
  useProjectJourney,
} from "@/components/ui/project-journey";
import "./carousel-navigation.css";
import "./carousel-project-preview.css";

gsap.registerPlugin(useGSAP);

/** Same breakpoint as the phone layout in globals.css. */
const PHONE_MEDIA = "(max-width: 760px)";

type PreviewOrigin = {
  left: number;
  top: number;
  width: number;
  height: number;
  src: string;
  /** The card showed the portrait phone screenshot, so it lands in the phone frame. */
  portrait: boolean;
};

/** A desktop page shrunk into a phone-sized card is unreadable, so phones get the portrait shot. */
function CardCover({ project, mobile }: { project: Project; mobile?: string }) {
  const alt = `Podgląd strony ${projectName(project)}`;
  const { props: desktop } = getImageProps({
    src: project.cover,
    alt,
    fill: true,
    sizes: "360px",
  });
  // 210px matches the phone frame in the details panel, so opening it reuses this file.
  const phone =
    mobile && getImageProps({ src: mobile, alt, fill: true, sizes: "210px" });
  return (
    <picture>
      {phone && (
        <source
          media={PHONE_MEDIA}
          srcSet={phone.props.srcSet}
          sizes={phone.props.sizes}
        />
      )}
      <img {...desktop} alt={alt} draggable={false} />
    </picture>
  );
}

function ProjectDetailsPanel({
  project,
  trigger,
  origin,
  onDismiss,
}: {
  project: Project;
  trigger: RefObject<HTMLButtonElement | null>;
  origin: PreviewOrigin | null;
  onDismiss: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const flight = useRef<HTMLDivElement>(null);
  const title = projectName(project);
  const mobile = project.gallery.find((src) => src.endsWith("/mobile.png"));

  useGSAP(
    () => {
      const panel = dialog.current;
      if (!panel) return;
      const returnFocus = trigger.current;
      const previousOverflow = document.body.style.overflow;
      panel.showModal();
      document.body.style.overflow = "hidden";

      const preference = gsap.matchMedia(panel);
      preference.add("(prefers-reduced-motion: no-preference)", () => {
        const portrait = Boolean(origin?.portrait);
        gsap.from(
          portrait
            ? ".carousel-detail-header, .carousel-detail-copy"
            : ".carousel-detail-header, .carousel-detail-phone, .carousel-detail-copy",
          {
            y: 16,
            opacity: 0.5,
            duration: 0.42,
            stagger: 0.045,
            delay: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
        // A portrait card lands on the phone screen, a desktop one in the browser frame.
        const cover = panel.querySelector<HTMLElement>(
          portrait
            ? ".carousel-detail-phone .project-preview-viewport"
            : ".carousel-detail-desktop-screen img",
        );
        const target = portrait
          ? panel.querySelector<HTMLElement>(".carousel-detail-phone")
          : cover;
        const moving = flight.current;
        if (
          !origin ||
          !moving ||
          !cover ||
          !target ||
          !origin.width ||
          !origin.height
        )
          return;
        const bounds = cover.getBoundingClientRect();
        moving.hidden = false;
        gsap.set(target, { autoAlpha: 0 });
        gsap.fromTo(
          moving,
          {
            x: origin.left,
            y: origin.top,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: "0 0",
          },
          {
            x: bounds.left,
            y: bounds.top,
            // Resizing keeps the top-cropped phone shot undistorted on its way down.
            ...(portrait
              ? { width: bounds.width, height: bounds.height }
              : {
                  scaleX: bounds.width / origin.width,
                  scaleY: bounds.height / origin.height,
                }),
            duration: 0.52,
            ease: "power3.inOut",
            onComplete: () => {
              target.style.removeProperty("opacity");
              target.style.removeProperty("visibility");
              moving.hidden = true;
            },
          },
        );
        return () => {
          moving.hidden = true;
        };
      });

      return () => {
        preference.revert();
        panel.close();
        document.body.style.overflow = previousOverflow;
        if (returnFocus?.isConnected)
          returnFocus.focus({ preventScroll: true });
      };
    },
    { scope: dialog },
  );

  return createPortal(
    <dialog
      ref={dialog}
      id="carousel-project-details"
      className="carousel-project-preview"
      aria-labelledby="carousel-detail-title"
      aria-describedby="carousel-detail-description"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          onDismiss();
        }
      }}
    >
      <div className="carousel-detail-header">
        <span>Podgląd projektu</span>
        <button
          type="button"
          className="carousel-detail-close"
          onClick={onDismiss}
          aria-label="Zamknij podgląd projektu"
        >
          <X size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      <div className="carousel-detail-content">
        <div className={`carousel-detail-media${mobile ? " has-mobile" : ""}`}>
          <div className="carousel-detail-browser">
            <div className="carousel-detail-toolbar" aria-hidden="true">
              <span className="carousel-detail-dots">
                <i />
                <i />
                <i />
              </span>
              <span>Wersja desktopowa</span>
            </div>
            <div className="carousel-detail-desktop-screen">
              <Image
                src={project.cover}
                alt={`Strona ${title} w wersji desktopowej`}
                fill
                sizes="(max-width: 600px) 70vw, 440px"
              />
            </div>
          </div>
          {mobile && (
            <div className="carousel-detail-phone">
              <ProjectMotionPreview
                src={mobile}
                id={`detail-preview-${project.slug}`}
                playing
              />
            </div>
          )}
        </div>
        <div className="carousel-detail-copy">
          <p className="carousel-detail-category">
            <span>{project.category}</span>
            <span>
              {project.kind === "demo"
                ? "Projekt autorski"
                : "Realizacja dla klienta"}
            </span>
          </p>
          <h2 id="carousel-detail-title">{title}</h2>
          <p
            id="carousel-detail-description"
            className="carousel-detail-description"
          >
            {project.tagline}
          </p>
          <ProjectCaseLink
            className="carousel-detail-link"
            project={project}
            onNavigate={onDismiss}
          >
            Zobacz projekt
            <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </ProjectCaseLink>
        </div>
      </div>
      {origin && (
        <div
          ref={flight}
          className={`carousel-cover-flight${origin.portrait ? " is-portrait" : ""}`}
          hidden
          aria-hidden="true"
          style={{ width: origin.width, height: origin.height }}
        >
          {/* The animation reuses the visible card image, then reveals the larger preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={origin.src} alt="" />
        </div>
      )}
    </dialog>,
    document.body,
  );
}

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const journey = useProjectJourney();
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      projects.findIndex((project) => project.slug === journey.selectedSlug),
    ),
  );
  const [preview, setPreview] = useState<number | null>(null);
  const [details, setDetails] = useState<number | null>(null);
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const [detailOrigin, setDetailOrigin] = useState<PreviewOrigin | null>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  if (!projects.length) return null;
  const selected = projects[active];
  const mobileCover = (project: Project) =>
    project.gallery.find((src) => src.endsWith("/mobile.png"));
  const select = (index: number) => {
    setActive(index);
    setPreview(null);
    journey.selectProject(projects[index].slug);
  };
  const move = (direction: number) => {
    select((active + direction + projects.length) % projects.length);
  };
  const offset = (index: number) => {
    let distance = (index - active + projects.length) % projects.length;
    if (distance > projects.length / 2) distance -= projects.length;
    return distance;
  };

  return (
    <div
      className="spatial-carousel carousel-with-side-navigation"
      role="region"
      aria-roledescription="karuzela"
      aria-label="Wybrane projekty"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setPreview(null);
        }
      }}
    >
      <div className="carousel-top">
        <span>WYBRANE PRACE / DESIGN & DEVELOPMENT</span>
        <span className="carousel-instruction">WYBIERZ SWOJĄ PERSPEKTYWĘ</span>
      </div>
      <div className="carousel-scene">
        <div
          className="spatial-stage"
          tabIndex={0}
          aria-label="Karuzela projektów - użyj strzałek w lewo i w prawo"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            gesture.current = { x: event.clientX, y: event.clientY };
            suppressClick.current = false;
            setPreview(null);
          }}
          onPointerUp={(event) => {
            const start = gesture.current;
            gesture.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
              suppressClick.current = true;
              move(dx < 0 ? 1 : -1);
            }
          }}
          onPointerCancel={() => {
            gesture.current = null;
          }}
          onPointerLeave={() => {
            gesture.current = null;
          }}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="spatial-orbit" aria-hidden="true" />
          {projects.map((project, index) => {
            const distance = offset(index);
            const mobile = mobileCover(project);
            return (
              <button
                key={project.slug}
                type="button"
                className="spatial-card"
                data-position={distance}
                data-active={index === active}
                style={{ zIndex: projects.length - Math.abs(distance) }}
                onClick={(event) => {
                  const source =
                    event.currentTarget.querySelector<HTMLImageElement>(
                      ".spatial-card-image img",
                    );
                  const bounds = source?.getBoundingClientRect();
                  setDetailOrigin(
                    source && bounds
                      ? {
                          left: bounds.left,
                          top: bounds.top,
                          width: bounds.width,
                          height: bounds.height,
                          src: source.currentSrc,
                          portrait:
                            Boolean(mobile) &&
                            window.matchMedia(PHONE_MEDIA).matches,
                        }
                      : null,
                  );
                  detailTrigger.current = event.currentTarget;
                  select(index);
                  setDetails(index);
                }}
                aria-label={`Otwórz podgląd projektu ${index + 1}: ${project.title}`}
                aria-pressed={index === active}
                aria-haspopup="dialog"
                aria-expanded={details === index}
                aria-controls={
                  details === index ? "carousel-project-details" : undefined
                }
              >
                <div
                  className={`spatial-card-image${mobile ? " has-mobile" : ""}`}
                >
                  <CardCover project={project} mobile={mobile} />
                </div>
                {index === active && mobile && (
                  <ProjectMotionPreview
                    key={project.slug}
                    src={mobile}
                    id={`preview-${project.slug}`}
                    playing={preview === active}
                  />
                )}
                <span className="spatial-card-label">
                  <span className="spatial-card-number">{project.year}</span>
                  <span className="spatial-card-name">
                    {projectName(project)}
                  </span>
                </span>
              </button>
            );
          })}
          <span className="spatial-stage-note" aria-hidden="true">
            PRZECIĄGNIJ LUB WYBIERZ KARTĘ
          </span>
        </div>
        {/* The arrows follow the stage so focus order matches phones, where they sit beneath it. */}
        <button
          type="button"
          className="carousel-side-button carousel-side-previous"
          onClick={() => move(-1)}
          aria-label="Poprzedni projekt"
        >
          <ArrowLeft size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <div className="carousel-side-next">
          <button
            type="button"
            className="carousel-side-button"
            onClick={() => move(1)}
            aria-label="Następny projekt"
          >
            <ArrowRight size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        className="carousel-progress carousel-scene-progress"
        role="group"
        aria-label="Wybór projektu"
      >
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => select(index)}
            aria-label={`Przejdź do projektu ${index + 1}: ${project.title}`}
            aria-current={active === index ? "true" : undefined}
          >
            <span />
          </button>
        ))}
      </div>
      <div className="carousel-scene-count" aria-hidden="true">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <span>/ {String(projects.length).padStart(2, "0")}</span>
      </div>
      <div className="carousel-preview-actions">
        {mobileCover(selected) && (
          <button
            type="button"
            className="carousel-preview-toggle"
            aria-pressed={preview === active}
            aria-controls={`preview-${selected.slug}`}
            onClick={() => {
              setPreview(preview === active ? null : active);
            }}
          >
            {preview === active ? <X size={13} /> : <Smartphone size={13} />}
            {preview === active ? "Zamknij podgląd" : "Podgląd mobilny"}
          </button>
        )}
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Projekt {active + 1} z {projects.length}: {projectName(selected)}.
      </p>
      {details !== null && (
        <ProjectDetailsPanel
          key={projects[details].slug}
          project={projects[details]}
          trigger={detailTrigger}
          origin={detailOrigin}
          onDismiss={() => setDetails(null)}
        />
      )}
    </div>
  );
}
