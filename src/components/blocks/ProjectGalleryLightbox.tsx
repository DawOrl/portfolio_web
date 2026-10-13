"use client";
/* eslint-disable @next/next/no-img-element */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxItem = {
  src: string;
  alt: string;
  caption: string;
  device: "desktop" | "mobile";
};

type LightboxApi = {
  dialogId: string;
  open: (index: number, trigger: HTMLButtonElement) => void;
};

const LightboxContext = createContext<LightboxApi | null>(null);

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Powiększenie zrzutów case study. Przyciski (ProjectGalleryTrigger) mogą stać
 * w dowolnym miejscu treści przekazanej jako children; podgląd przechodzi
 * strzałkami przez wszystkie ujęcia projektu.
 */
export function ProjectGalleryLightbox({
  items,
  title,
  children,
}: {
  items: readonly LightboxItem[];
  title: string;
  children: ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const dialogId = useId();
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

  const open = useCallback((index: number, button: HTMLButtonElement) => {
    trigger.current = button;
    setSelectedIndex(index);
  }, []);
  const api = useMemo(() => ({ dialogId, open }), [dialogId, open]);

  const move = (direction: number) => {
    setSelectedIndex((index) =>
      index === null ? null : (index + direction + items.length) % items.length,
    );
  };
  const current = selectedIndex === null ? null : items[selectedIndex];

  return (
    <LightboxContext value={api}>
      {children}

      <dialog
        ref={dialog}
        id={dialogId}
        className="case-gallery-dialog"
        data-device={current?.device}
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={`${dialogId}-instructions`}
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
          if (items.length < 2) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="case-gallery-dialog-header">
          <h2 id={`${dialogId}-title`}>{title}</h2>
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Zamknij podgląd"
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <p id={`${dialogId}-instructions`} className="sr-only">
          {items.length > 1 && "Strzałki w lewo i w prawo zmieniają ujęcie. "}
          Escape zamyka podgląd.
        </p>
        <div className="case-gallery-dialog-image">
          {current && <img src={current.src} alt={current.alt} />}
        </div>
        <div className="case-gallery-dialog-footer">
          <p role="status" aria-live="polite" aria-atomic="true">
            <span className="case-gallery-dialog-count">
              <span className="sr-only">Ujęcie </span>
              {pad((selectedIndex ?? 0) + 1)} / {pad(items.length)}
              <span className="sr-only">. </span>
            </span>
            <span>{current?.caption}</span>
          </p>
          {items.length > 1 && (
            <div className="case-gallery-dialog-navigation">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Poprzednie ujęcie"
              >
                <ArrowLeft size={19} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Następne ujęcie"
              >
                <ArrowRight size={19} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </LightboxContext>
  );
}

/** Przycisk otwierający podgląd ujęcia o danym indeksie (wewnątrz ProjectGalleryLightbox). */
export function ProjectGalleryTrigger({
  index,
  label,
  className,
  children,
}: {
  index: number;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const lightbox = useContext(LightboxContext);
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      aria-haspopup="dialog"
      aria-controls={lightbox?.dialogId}
      onClick={(event) => lightbox?.open(index, event.currentTarget)}
    >
      {children}
    </button>
  );
}
