"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import assets from "@/assets";
import PopBackground from "@/components/ui/PopBackground";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Flavor = {
  name: string;
  sponge: string;
  cream: string;
  frosting: string;
  topping: string;
};

const FLAVORS: Flavor[] = [
  {
    name: "Strawberry",
    sponge: "#F3C98F",
    cream: "#FFF6EC",
    frosting: "#F8A9B9",
    topping: "#E0302A",
  },
  {
    name: "Blueberry",
    sponge: "#F6DDA8",
    cream: "#FFF6EC",
    frosting: "#C8B8F4",
    topping: "#363A8C",
  },
  {
    name: "Chocolate",
    sponge: "#7B4A2D",
    cream: "#FFF1E0",
    frosting: "#4B2418",
    topping: "#C8281E",
  },
];

const STEPS = [
  "Baking the sponge",
  "Whipping the cream",
  "Frosting and drips",
  "Adding the toppings",
  "Lighting the candle",
  "Ready for the party",
];
// when each caption appears, in ms
const STEP_AT = [0, 1500, 2800, 3900, 5300, 6600];
const CYCLE_MS = 12000;

const TICKER = [
  "Desserts",
  "Birthday cakes",
  "Hampers",
  "Party orders",
  "Home delivery",
  "Pre-orders open",
  "NRT Nagar, Theni",
];

const TOPPING_SPOTS = [
  { x: 102, y: 120 },
  { x: 138, y: 112 },
  { x: 168, y: 122 },
  { x: 232, y: 122 },
  { x: 262, y: 112 },
  { x: 298, y: 120 },
];

const DRIPS = [
  { x: 84, h: 30 },
  { x: 118, h: 44 },
  { x: 156, h: 26 },
  { x: 236, h: 34 },
  { x: 270, h: 48 },
  { x: 304, h: 28 },
];

const SPRINKLES = [
  { x: 92, y: 152, r: 20, c: "#F4B83A" },
  { x: 128, y: 164, r: -40, c: "#FFFFFF" },
  { x: 176, y: 150, r: 65, c: "#F4B83A" },
  { x: 220, y: 160, r: -15, c: "#FFFFFF" },
  { x: 252, y: 148, r: 50, c: "#F4B83A" },
  { x: 296, y: 162, r: -60, c: "#FFFFFF" },
];

const CONFETTI = Array.from({ length: 14 }, (_, k) => {
  const a = (k / 14) * Math.PI * 2;
  const dist = 90 + (k % 3) * 28;
  return {
    dx: Math.cos(a) * dist,
    dy: Math.sin(a) * dist - 30,
    c: ["#F4B83A", "#FFFFFF", "#F8A9B9", "#C8281E"][k % 4],
    r: k * 47,
  };
});

/* ------------------------------------------------------------------ */
/*  The cake                                                           */
/* ------------------------------------------------------------------ */

const fillBox = { transformBox: "fill-box" as const };

function Cake({
  f,
  step,
  lit,
  onCandle,
}: {
  f: Flavor;
  step: number;
  lit: boolean;
  onCandle: () => void;
}) {
  const drop = (delay: number) => ({
    initial: { y: -140, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay, type: "spring" as const, stiffness: 140, damping: 14 },
  });
  const spread = (delay: number) => ({
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    style: { ...fillBox, transformOrigin: "center" },
  });

  return (
    <svg
      viewBox="0 0 400 430"
      role="img"
      aria-label={`${f.name} birthday cake being decorated`}
      className="relative w-full overflow-visible"
    >
      <defs>
        <linearGradient id="cyl" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* stand */}
      <ellipse cx="200" cy="404" rx="84" ry="11" fill="#fff" opacity="0.95" />
      <rect x="189" y="368" width="22" height="38" fill="#fff" />
      <ellipse
        cx="200"
        cy="358"
        rx="196"
        ry="24"
        fill="#4A0E0A"
        opacity="0.35"
      />
      <ellipse cx="200" cy="352" rx="196" ry="24" fill="#fff" />
      <ellipse cx="200" cy="349" rx="170" ry="17" fill="#FBE0D6" />

      {/* layer 1 */}
      <motion.g {...drop(0.2)}>
        <rect x="70" y="272" width="260" height="76" rx="14" fill={f.sponge} />
        <rect x="70" y="272" width="260" height="76" rx="14" fill="url(#cyl)" />
      </motion.g>
      <motion.rect
        x="64"
        y="262"
        width="272"
        height="16"
        rx="8"
        fill={f.cream}
        {...spread(0.9)}
      />

      {/* layer 2 */}
      <motion.g {...drop(1.5)}>
        <rect x="70" y="192" width="260" height="72" rx="14" fill={f.sponge} />
        <rect x="70" y="192" width="260" height="72" rx="14" fill="url(#cyl)" />
      </motion.g>
      <motion.rect
        x="64"
        y="182"
        width="272"
        height="16"
        rx="8"
        fill={f.cream}
        {...spread(2.2)}
      />

      {/* frosting top + drips */}
      <motion.g {...drop(2.8)}>
        <rect
          x="62"
          y="128"
          width="276"
          height="58"
          rx="24"
          fill={f.frosting}
        />
        <rect x="62" y="128" width="276" height="58" rx="24" fill="url(#cyl)" />
      </motion.g>
      {DRIPS.map((d, k) => (
        <motion.rect
          key={d.x}
          x={d.x}
          y={176}
          width="18"
          height={d.h}
          rx="9"
          fill={f.frosting}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 3.3 + k * 0.1, duration: 0.5, ease: "easeOut" }}
          style={{ ...fillBox, transformOrigin: "top" }}
        />
      ))}

      {/* sprinkles */}
      {SPRINKLES.map((s, k) => (
        <motion.rect
          key={k}
          x={s.x}
          y={s.y}
          width="12"
          height="4"
          rx="2"
          fill={s.c}
          transform={`rotate(${s.r} ${s.x + 6} ${s.y + 2})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.9 + k * 0.06, type: "spring", stiffness: 300 }}
          style={{ ...fillBox, transformOrigin: "center" }}
        />
      ))}

      {/* toppings */}
      {TOPPING_SPOTS.map((t, k) => (
        <motion.g
          key={k}
          initial={{ scale: 0, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            delay: 4.1 + k * 0.14,
            type: "spring",
            stiffness: 260,
            damping: 12,
          }}
          style={{ ...fillBox, transformOrigin: "center" }}
        >
          <circle cx={t.x} cy={t.y} r="14" fill={f.topping} />
          <circle cx={t.x - 4} cy={t.y - 5} r="4" fill="#fff" opacity="0.55" />
        </motion.g>
      ))}

      {/* candle */}
      <motion.g
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 5, duration: 0.5, ease: "easeOut" }}
        style={{ ...fillBox, transformOrigin: "bottom" }}
      >
        <rect x="195" y="70" width="10" height="62" rx="3" fill="#fff" />
        <rect x="195" y="84" width="10" height="6" fill="#C8281E" />
        <rect x="195" y="100" width="10" height="6" fill="#C8281E" />
        <rect x="195" y="116" width="10" height="6" fill="#C8281E" />
      </motion.g>

      {/* flame, tap to blow out */}
      <AnimatePresence>
        {step >= 4 && lit && (
          <motion.g
            key="flame"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, y: -14 }}
            style={{ ...fillBox, transformOrigin: "bottom" }}
          >
            <motion.circle
              cx="200"
              cy="56"
              r="26"
              fill="#F4B83A"
              animate={{ opacity: [0.25, 0.45, 0.25], r: [24, 30, 24] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <motion.path
              d="M200 36 C213 50 211 66 200 66 C189 66 187 50 200 36 Z"
              fill="#F4B83A"
              animate={{ scaleY: [1, 1.12, 0.94, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ ...fillBox, transformOrigin: "bottom" }}
            />
            <path
              d="M200 48 C206 55 205 62 200 62 C195 62 194 55 200 48 Z"
              fill="#FFF6EC"
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* confetti burst when the candle is lit */}
      {step >= 4 &&
        CONFETTI.map((c, k) => (
          <motion.rect
            key={k}
            x="198"
            y="50"
            width="8"
            height="5"
            rx="1.5"
            fill={c.c}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: c.dx, y: c.dy + 60, opacity: 0, rotate: c.r }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        ))}

      {/* tap target for the candle */}
      <rect
        x="170"
        y="26"
        width="60"
        height="110"
        fill="transparent"
        style={{ cursor: "pointer" }}
        onClick={onCandle}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function HeroCake() {
  const [flavor, setFlavor] = useState(0);
  const [run, setRun] = useState(0);
  const [step, setStep] = useState(0);
  const [lit, setLit] = useState(true);

  useEffect(() => {
    setStep(0);
    setLit(true);
    const timers = STEP_AT.map((ms, k) => setTimeout(() => setStep(k), ms));
    timers.push(
      setTimeout(() => setFlavor((p) => (p + 1) % FLAVORS.length), CYCLE_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [flavor, run]);

  const pick = (k: number) => {
    setFlavor(k);
    setRun((r) => r + 1);
  };

  const f = FLAVORS[flavor];

  return (
    <MotionConfig reducedMotion="user">
      <PopBackground variant="red" className="min-h-screen">
        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pb-40 pt-28 md:grid-cols-[1fr_1fr]">
          {/* TEXT */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur"
            >
              WakeCup Cafe · Theni
            </motion.span>

            <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              {["baked for your", "little big days."].map((l, k) => (
                <span key={l} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className={`block ${k === 1 ? "italic text-brand-yellow" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.15 * k + 0.1,
                      duration: 0.7,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-white/95"
            >
              Birthday cakes, hampers and party orders from our little corner of
              NRT Nagar. Pre-order and we will bake it for you.
            </motion.p>

            {/* flavour picker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6"
            >
              <p className="mb-2 text-sm font-semibold text-white/85">
                Pick a flavour and watch it come together
              </p>
              <div className="flex flex-wrap gap-2">
                {FLAVORS.map((fl, k) => (
                  <button
                    key={fl.name}
                    type="button"
                    aria-pressed={k === flavor}
                    onClick={() => pick(k)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                      k === flavor
                        ? "border-white bg-white text-brand-red"
                        : "border-white/50 bg-white/10 text-white hover:bg-white/25"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full ring-1 ring-black/10"
                      style={{ background: fl.frosting }}
                    />
                    {fl.name}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/reservation"
                className="rounded-full bg-brand-yellow px-8 py-3.5 font-bold text-ink shadow-[0_10px_24px_-8px_rgba(42,20,16,0.6)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pre-order a cake
              </Link>
              <Link
                href="/menu"
                className="rounded-full border-2 border-white px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-red"
              >
                See the menu
              </Link>
            </motion.div>

            <p className="mt-6 text-sm font-semibold text-white/85">
              Open 4pm to 10pm. Home delivery available.
            </p>
          </div>

          {/* CAKE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red-dark/50 blur-2xl"
            />

            <Cake
              key={`${flavor}-${run}`}
              f={f}
              step={step}
              lit={lit}
              onCandle={() => setLit((p) => !p)}
            />

            {/* logo sticker */}
            <motion.div
              className="absolute -right-2 top-0 h-24 w-24 md:h-28 md:w-28"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src={assets.images.logo}
                alt="WakeCup"
                fill
                priority
                sizes="112px"
                className="rounded-full bg-white object-contain p-2 shadow-[0_12px_24px_-8px_rgba(42,20,16,0.6)]"
              />
            </motion.div>

            {/* caption */}
            <div
              aria-live="polite"
              className="mt-2 flex items-center justify-center gap-3 text-sm font-semibold text-white"
            >
              <span className="flex gap-1.5">
                {STEPS.map((_, k) => (
                  <span
                    key={k}
                    className={`h-2 rounded-full transition-all ${
                      k <= step ? "w-5 bg-brand-yellow" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </span>
              <span>
                {f.name} · {STEPS[step]}
              </span>
            </div>
            {step >= 4 && (
              <p className="mt-1 text-center text-xs text-white/70">
                Tap the candle to blow it out
              </p>
            )}
          </motion.div>
        </div>

        {/* LIQUID WAVE */}
        <svg
          aria-hidden
          className="absolute bottom-0 left-0 z-10 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ height: 110 }}
        >
          <motion.path
            className="fill-cream"
            animate={{
              d: [
                "M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z",
                "M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z",
                "M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </PopBackground>

      {/* TICKER */}
      <div className="relative -mt-2 overflow-hidden bg-cream py-8">
        <div className="-rotate-1 bg-brand-yellow py-3">
          <motion.div
            className="font-display flex w-max whitespace-nowrap text-2xl italic text-ink"
            animate={{ x: ["0%", "-30%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 6 }).map((_, k) => (
              <span key={k} className="mx-6">
                {TICKER.map((t) => (
                  <span key={t}>
                    {t} <span className="text-brand-red">✦</span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
