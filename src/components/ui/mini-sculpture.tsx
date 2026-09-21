import type { CSSProperties } from "react";
import "./mini-sculpture.css";

type Sculpture = "cube" | "steps" | "portal";
type Block = {
  size: [number, number, number];
  position: [number, number, number];
  wine?: boolean;
};

const shapes: Record<Sculpture, Block[]> = {
  cube: [
    { size: [39, 39, 39], position: [-4, 6, 0] },
    { size: [15, 15, 15], position: [28, -25, 8], wine: true },
  ],
  steps: [
    { size: [54, 13, 37], position: [-12, 20, 0] },
    { size: [54, 13, 37], position: [0, 1, 0], wine: true },
    { size: [54, 13, 37], position: [12, -18, 0] },
  ],
  portal: [
    { size: [54, 12, 24], position: [0, -24, 0] },
    { size: [54, 12, 24], position: [0, 24, 0] },
    { size: [12, 36, 24], position: [-21, 0, 0] },
    { size: [12, 36, 24], position: [21, 0, 0] },
    { size: [13, 13, 13], position: [0, -1, 24], wine: true },
  ],
};

/** Actual CSS 3D faces; small decorative objects need no additional WebGL scenes. */
export function MiniSculpture({
  shape = "cube",
  small = false,
  className = "",
}: {
  shape?: Sculpture;
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`mini-sculpture mini-sculpture--${shape} ${small ? "mini-sculpture--small" : ""} ${className}`}
      aria-hidden="true"
    >
      <span className="mini-sculpture-shadow" />
      <span className="mini-sculpture-world">
        {shapes[shape].map(
          ({ size: [width, height, depth], position, wine }, index) => (
            <span
              key={index}
              className="mini-prism"
              data-material={wine ? "wine" : "ice"}
              style={
                {
                  "--block-w": `${width}px`,
                  "--block-h": `${height}px`,
                  "--block-d": `${depth}px`,
                  transform: `translate3d(${position[0]}px, ${position[1]}px, ${position[2]}px)`,
                } as CSSProperties
              }
            >
              {["front", "back", "left", "right", "top", "bottom"].map(
                (side) => (
                  <span key={side} className={`mini-face mini-face--${side}`} />
                ),
              )}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
