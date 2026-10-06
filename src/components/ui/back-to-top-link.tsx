"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";

export function BackToTopLink() {
  return (
    <Link
      href="/#top"
      onClick={(event) => {
        if (window.location.pathname !== "/") return;
        event.preventDefault();
        window.history.replaceState(window.history.state, "", "/#top");
        document
          .querySelector<HTMLAnchorElement>(".site-header .brand")
          ?.focus({ preventScroll: true });
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      }}
    >
      Na górę <ArrowUp size={14} />
    </Link>
  );
}
