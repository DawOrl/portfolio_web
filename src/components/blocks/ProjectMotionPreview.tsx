"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Smartphone } from "lucide-react";
import { gsap } from "gsap";
import "./project-motion-preview.css";

/** A real mobile screenshot, revealed once on intent; no autoplaying video. */
export function ProjectMotionPreview({
  src,
  playing,
  id,
}: {
  src: string;
  playing: boolean;
  id: string;
}) {
  const viewport = useRef<HTMLSpanElement>(null);
  const screen = useRef<HTMLImageElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!playing || !ready) return;
    const image = screen.current!;
    const frame = viewport.current!;
    const line = progress.current!;
    const preference = gsap.matchMedia();
    preference.add("(prefers-reduced-motion: no-preference)", () => {
      let sequence: gsap.core.Timeline | undefined;
      const animate = () => {
        sequence?.kill();
        sequence = gsap.timeline({ delay: 0.6 });
        gsap.set(image, { y: 0 });
        gsap.set(line, { scaleX: 0, transformOrigin: "left" });
        sequence
          .to(image, {
            y: -Math.max(0, image.offsetHeight - frame.clientHeight),
            duration: 6,
            ease: "power1.inOut",
          })
          .to(line, { scaleX: 1, duration: 6, ease: "power1.inOut" }, 0);
      };
      const observer = new ResizeObserver(animate);
      observer.observe(frame);
      observer.observe(image);
      return () => {
        observer.disconnect();
        sequence?.kill();
        gsap.set([image, line], {
          clearProps: "transform",
        });
      };
    });
    return () => preference.revert();
  }, [playing, ready]);

  return (
    <span
      id={id}
      className="project-motion-preview"
      data-playing={playing && ready}
      aria-hidden="true"
    >
      <span className="project-preview-bar">
        <Smartphone size={11} strokeWidth={1.5} />
        WERSJA MOBILNA
        <span>↓</span>
      </span>
      <span className="project-preview-viewport" ref={viewport}>
        <Image
          ref={screen}
          src={src}
          alt=""
          width={390}
          height={844}
          sizes="(max-width: 760px) 210px, 320px"
          draggable={false}
          onLoad={() => setReady(true)}
          className="project-preview-screen"
        />
      </span>
      <span className="project-preview-progress">
        <span ref={progress} />
      </span>
    </span>
  );
}
