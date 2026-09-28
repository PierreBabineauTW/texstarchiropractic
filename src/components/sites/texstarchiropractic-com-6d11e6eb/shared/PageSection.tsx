import { cn } from "@/lib/utils";

import { BODY, CARD, CONTAINER, H2, SECTION } from "./type-scale";

/**
 * Section wrapper for inner pages. `tone` selects the same washes the home page
 * uses so rhythm is consistent:
 *  - plain   white
 *  - cream   .ts-gradient-cream   (top -> bottom)
 *  - creamUp .ts-gradient-cream-up (bottom -> top)
 *  - footer  .ts-gradient-footer
 */
export function PageSection({
  id,
  tone = "plain",
  className,
  children,
}: {
  id?: string;
  tone?: "plain" | "cream" | "creamUp" | "footer";
  className?: string;
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "cream"
      ? "ts-gradient-cream"
      : tone === "creamUp"
        ? "ts-gradient-cream-up"
        : tone === "footer"
          ? "ts-gradient-footer"
          : "";

  return (
    <section id={id} className={cn(SECTION, toneClass, className)}>
      <div className={CONTAINER}>{children}</div>
    </section>
  );
}

/** Centred section heading with optional supporting line. */
export function SectionHeading({
  title,
  lede,
  align = "left",
  className,
}: {
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-[640px] text-center", className)}>
      <h2 className={cn(H2, "font-bold text-primary")}>{title}</h2>
      {lede ? <p className={cn(BODY, "mt-[15px] max-w-[62ch]", align === "center" && "mx-auto")}>{lede}</p> : null}
    </div>
  );
}

export { CARD };
