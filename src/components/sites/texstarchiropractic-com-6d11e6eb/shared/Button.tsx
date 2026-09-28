import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "solidOrange" | "solidWhite" | "outlineWhite" | "whiteOnOrange";

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[2px] px-5 py-4 text-base";

/**
 * Internal paths go through next/link so navigation stays client-side and gets
 * prefetched; `tel:`, `mailto:` and absolute URLs stay plain anchors.
 */
function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

const variants: Record<ButtonVariant, string> = {
  solidOrange: "bg-[#EA7600] font-normal leading-[1.2] text-white",
  solidWhite: "border-2 border-[#FDFCFA] bg-[#FDFCFA] font-semibold text-[#EA7600]",
  outlineWhite: "border-2 border-[#FDFCFA] bg-transparent font-semibold text-[#FDFCFA]",
  whiteOnOrange: "border-2 border-white bg-white font-normal text-[#EA7600]",
};

export function Button({ href, children, variant = "solidOrange", className }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (isInternal(href)) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  /*
   * External destinations (the booking scheduler, tel:, mailto:) stay plain
   * anchors and stay in the same tab, which is how the reference site behaves.
   * If you later add a link that does open in a new tab, give it
   * rel="noopener noreferrer" — that is what the attribute is for, and forcing
   * every outbound link into a new tab would change approved behaviour.
   */
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
