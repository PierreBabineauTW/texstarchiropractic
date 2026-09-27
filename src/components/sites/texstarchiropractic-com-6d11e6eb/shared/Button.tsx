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
 * Every href on the live site is an absolute external URL or a `tel:`, so a plain
 * anchor is correct here (no `next/link`).
 */
const variants: Record<ButtonVariant, string> = {
  solidOrange: "bg-[#EA7600] font-normal leading-[1.2] text-white",
  solidWhite: "border-2 border-[#FDFCFA] bg-[#FDFCFA] font-semibold text-[#EA7600]",
  outlineWhite: "border-2 border-[#FDFCFA] bg-transparent font-semibold text-[#FDFCFA]",
  whiteOnOrange: "border-2 border-white bg-white font-normal text-[#EA7600]",
};

export function Button({ href, children, variant = "solidOrange", className }: ButtonProps) {
  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  );
}
