"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { setContactIntent, type ContactIntent } from "@/lib/contact-intent";

type ContactIntentLinkProps = ComponentProps<typeof Link> & {
  intent: ContactIntent;
};

export function ContactIntentLink({
  intent,
  onClick,
  ...props
}: ContactIntentLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          (props.target && props.target !== "_self")
        )
          return;
        setContactIntent(intent);
      }}
    />
  );
}
