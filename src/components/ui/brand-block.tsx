import { BrandMark } from "./brand-mark";
import "./brand-block.css";

/** A small physical plaque for navigation; the flat mark stays shared with icons. */
export function BrandBlock() {
  return (
    <span className="brand-block" aria-hidden="true">
      <span className="brand-block-shadow" />
      <span className="brand-block-solid">
        <span className="brand-block-face brand-block-face--back" />
        <span className="brand-block-face brand-block-face--left" />
        <span className="brand-block-face brand-block-face--right" />
        <span className="brand-block-face brand-block-face--top" />
        <span className="brand-block-face brand-block-face--bottom" />
        <span className="brand-block-face brand-block-face--front">
          <BrandMark />
        </span>
      </span>
    </span>
  );
}
