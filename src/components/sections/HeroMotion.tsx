"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import assets from "@/assets";
import PopBackground from "@/components/ui/PopBackground";

// "every bite is a ___"
const WORDS = ["warm hug.", "sweet treat.", "cozy corner.", "good start."];

const MENU_CHIPS = [
  "Desserts",
  "Birthday cakes",
  "Hampers",
  "Party orders",
  "Home delivery",
];

const TICKER = [
  "Desserts",
  "Birthday cakes",
  "Hampers",
  "Party orders",
  "Home delivery",
  "Pre-orders open",
  "NRT Nagar, Theni",
];

// Same placements as before. Swap the images for your own food photos later.
const BITS = [
  { x: "8%", y: "18%", size: 260, rot: -15, depth: 40, delay: 0 },
  { x: "42%", y: "8%", size: 280, rot: 20, depth: 70, delay: 0.6 },
  { x: "88%", y: "22%", size: 290, rot: 12, depth: 30, delay: 0.3 },
  { x: "43%", y: "50%", size: 210, rot: 12, depth: 30, delay: 0.3 },
  { x: "6%", y: "70%", size: 200, rot: 25, depth: 60, delay: 0.9 },
  { x: "50%", y: "78%", size: 190, rot: -30, depth: 80, delay: 0.2 },
  { x: "92%", y: "72%", size: 180, rot: -10, depth: 50, delay: 0.5 },
];

function FoodImg({
  src,
  size,
}: {
  src: typeof assets.images.burger;
  size: number;
}) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt=""
      priority
      draggable={false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter: "drop-shadow(0 18px 16px rgba(74,14,10,0.35))",
      }}
    />
  );
}

function FloatingBit({
  b,
  mx,
  my,
}: {
  b: (typeof BITS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(mx, [-0.5, 0.5], [-b.depth, b.depth]);
  const y = useTransform(my, [-0.5, 0.5], [-b.depth, b.depth]);
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: b.x,
        top: b.y,
        x,
        y,
        cursor: "pointer",
        zIndex: 20,
      }}
      onClick={() => setClicked((p) => !p)}
    >
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
        transition={{
          duration: 5 + b.delay * 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: b.delay,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: "relative",
            width: b.size,
            height: b.size,
            rotate: b.rot,
            perspective: 600,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={clicked ? "out" : "in"}
              style={{ position: "absolute", inset: 0 }}
              initial={{ scale: 0.4, opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { type: "spring", stiffness: 260, damping: 16 },
              }}
              exit={{
                scale: 0.4,
                opacity: 0,
                y: -10,
                filter: "blur(6px)",
                transition: { duration: 0.18, ease: "easeIn" },
              }}
            >
              <FoodImg
                src={clicked ? assets.images.burger_open : assets.images.burger}
                size={b.size}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Sparkle({
  top,
  left,
  delay,
}: {
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <motion.svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      style={{ position: "absolute", top, left }}
      animate={{ scale: [0, 1, 0], rotate: [0, 90, 180] }}
      transition={{ duration: 2.4, repeat: Infinity, delay }}
    >
      <path
        d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
        className="fill-brand-yellow"
      />
    </motion.svg>
  );
}

export default function HeroMotion() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 15 });
  const smy = useSpring(my, { stiffness: 60, damping: 15 });
  const tiltX = useTransform(smy, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(smx, [-0.5, 0.5], [-8, 8]);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        onMouseMove={(e) => {
          mx.set(e.clientX / window.innerWidth - 0.5);
          my.set(e.clientY / window.innerHeight - 0.5);
        }}
      >
        <PopBackground variant="red" className="min-h-screen">
          {BITS.map((b, idx) => (
            <FloatingBit key={idx} b={b} mx={smx} my={smy} />
          ))}
          <Sparkle top="20%" left="55%" delay={0} />
          <Sparkle top="68%" left="46%" delay={0.8} />
          <Sparkle top="30%" left="92%" delay={1.5} />

          <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pb-40 pt-28 md:grid-cols-2">
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
                <div>
                  {["every", "bite", "is", "a"].map((w, k) => (
                    <motion.span
                      key={w}
                      className="mr-4 inline-block"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12 * k,
                        type: "spring",
                        stiffness: 110,
                      }}
                    >
                      {w}
                    </motion.span>
                  ))}
                </div>

                <div className="relative mt-1 h-[1.3em] overflow-hidden italic text-brand-yellow">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={WORDS[i]}
                      className="block"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                    >
                      {WORDS[i]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6 max-w-md text-lg leading-relaxed text-white/95"
              >
                A little corner of comfort &amp; good food. Desserts, birthday
                cakes, hampers and party orders, made fresh in NRT Nagar.
              </motion.p>

              {/* MENU CHIPS */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-5 flex max-w-lg flex-wrap gap-2"
              >
                {MENU_CHIPS.map((c) => (
                  <Link
                    key={c}
                    href="/menu"
                    className="rounded-full border border-white/50 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-brand-red"
                  >
                    {c}
                  </Link>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/menu"
                  className="rounded-full bg-brand-yellow px-8 py-3.5 font-bold text-ink shadow-[0_10px_24px_-8px_rgba(42,20,16,0.6)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  See the menu
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border-2 border-white px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-red"
                >
                  Find us
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="mt-6 text-sm font-semibold text-white/85"
              >
                Open 4pm to 10pm. Home delivery available.
              </motion.p>
            </div>

            {/* LOGO MEDALLION */}
            <div className="flex justify-center" style={{ perspective: 900 }}>
              <motion.div
                style={{ rotateX: tiltX, rotateY: tiltY }}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 12,
                  delay: 0.3,
                }}
                className="relative h-[300px] w-[300px] md:h-[420px] md:w-[420px]"
              >
                {/* slow-morphing blob, echoes the logo shape */}
                <motion.div
                  className="absolute -inset-10 bg-brand-red-dark/60"
                  animate={{
                    borderRadius: [
                      "58% 42% 61% 39% / 45% 55% 45% 55%",
                      "40% 60% 45% 55% / 60% 40% 60% 40%",
                      "58% 42% 61% 39% / 45% 55% 45% 55%",
                    ],
                    rotate: [0, 25, 0],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -inset-5 rounded-full border-2 border-dashed border-white/60"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-[0_30px_60px_-15px_rgba(42,20,16,0.6)]">
                  <Image
                    src={assets.images.logo}
                    alt="WakeCup"
                    fill
                    priority
                    className="object-contain p-6"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* LIQUID WAVE */}
          <svg
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
      </div>

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
