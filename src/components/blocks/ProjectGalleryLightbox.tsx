"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";

export function ProjectGalleryLightbox({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const galleryId = useId();
  const isOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const panel = dialog.current;
    if (!panel) return;
    const returnFocus = trigger.current;
    const previousOverflow = document.body.style.overflow;
    panel.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      panel.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, [isOpen]);

  if (!images.length) return null;

  const move = (direction: number) => {
    setSelectedIndex((index) =>
      index === null
        ? null
        : (index + direction + images.length) % images.length,
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image, index) => {
          const view = image.endsWith("/mobile.png")
            ? "Wersja mobilna"
            : image.endsWith("/desktop.png")
              ? "Wersja desktopowa"
              : `Ujęcie ${index + 1}`;
          return (
            <button
              key={image}
              type="button"
              className="case-gallery-thumb"
              aria-label={`Powiększ: ${title}, ${view.toLowerCase()}`}
              aria-haspopup="dialog"
              aria-controls={galleryId}
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelectedIndex(index);
              }}
            >
              <img
                src={image}
                alt={`${title}, ${view.toLowerCase()}`}
                loading="lazy"
              />
              <span className="case-gallery-thumb-caption" aria-hidden="true">
                <span>{view}</span>
                <span>
                  <ZoomIn size={14} strokeWidth={1.75} /> Powiększ
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        id={galleryId}
        className="case-gallery-dialog"
        aria-labelledby={`${galleryId}-title`}
        aria-describedby={`${galleryId}-instructions`}
        onCancel={(event) => {
          event.preventDefault();
          setSelectedIndex(null);
        }}
        onClose={() => setSelectedIndex(null)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            setSelectedIndex(null);
          }
        }}
        onKeyDown={(event) => {
          if (images.length < 2) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="case-gallery-dialog-header">
          <div className="case-gallery-dialog-title">
            <h3 id={`${galleryId}-title`}>{title}</h3>
            <p role="status" aria-live="polite" aria-atomic="true">
              Ujęcie {selectedIndex === null ? 1 : selectedIndex + 1} /{" "}
              {images.length}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Zamknij podgląd projektu"
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <p id={`${galleryId}-instructions`} className="sr-only">
          {images.length > 1 && "Strzałki w lewo i w prawo zmieniają ujęcie. "}
          Escape zamyka podgląd.
        </p>
        <div className="case-gallery-dialog-image">
          {selectedIndex !== null && (
            <img
              src={images[selectedIndex]}
              alt={`${title}, ujęcie ${selectedIndex + 1}`}
            />
          )}
        </div>
        {images.length > 1 && (
          <div className="case-gallery-dialog-navigation">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Poprzednie ujęcie"
            >
              <ArrowLeft size={19} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <span>Zmień ujęcie</span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Następne ujęcie"
            >
              <ArrowRight size={19} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
