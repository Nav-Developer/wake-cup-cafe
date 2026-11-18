import { forwardRef, type ReactNode } from "react";

type Variant = "red" | "deep" | "yellow" | "blush" | "paper";

const STYLES: Record<Variant, { bg: string; a: string; b: string }> = {
  red: { bg: "bg-brand-red", a: "bg-brand-red-dark/70", b: "bg-[#ff7a59]/35" },
  deep: {
    bg: "bg-brand-red-deep",
    a: "bg-brand-red/40",
    b: "bg-brand-red-dark/50",
  },
  yellow: { bg: "bg-brand-yellow", a: "bg-white/40", b: "bg-brand-red/15" },
  blush: { bg: "bg-blush", a: "bg-brand-yellow/45", b: "bg-brand-red/10" },
  paper: { bg: "bg-cream", a: "bg-blush", b: "bg-brand-yellow/30" },
};

const BLOB_RADIUS = "58% 42% 61% 39% / 45% 55% 45% 55%";

type Props = {
  variant?: Variant;
  blobs?: boolean;
  className?: string;
  children?: ReactNode;
};

/** Soft, logo-like organic blobs on a flat colour. Replaces the old pop pattern. */
const PopBackground = forwardRef<HTMLElement, Props>(function PopBackground(
  { variant = "paper", blobs = true, className = "", children },
  ref,
) {
  const s = STYLES[variant];
  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${s.bg} ${className}`}
    >
      {blobs && (
        <>
          <div
            aria-hidden
            className={`pointer-events-none absolute -left-32 -top-24 h-[28rem] w-[28rem] ${s.a}`}
            style={{ borderRadius: BLOB_RADIUS }}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute -bottom-40 -right-24 h-[34rem] w-[34rem] ${s.b}`}
            style={{ borderRadius: "42% 58% 40% 60% / 55% 45% 55% 45%" }}
          />
        </>
      )}
      {children}
    </section>
  );
});

export default PopBackground;
