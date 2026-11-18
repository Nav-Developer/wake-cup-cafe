"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import assets from "@/assets";
import PopBackground from "@/components/ui/PopBackground";
import { ADDRESS, HOURS, RECIPIENT_NAME } from "@/data/constant";

/* ---------------- EDIT THESE ---------------- */
// Swap these for the real owner photos when you have them.
// Until then they use existing placeholder images from your assets.
const OWNER_PHOTO = assets.images.founder;
const OWNER_PHOTO_2 = assets.images.second;

const OWNER_NAME = RECIPIENT_NAME; // change if the owner's name differs
const OWNER_ROLE = "Owner and baker, WakeCup";
const OWNER_QUOTE =
  "We would rather make a few things really well than a lot of things okay.";

const OWNER_STORY = [
  "WakeCup started as a small idea: a quiet corner in NRT Nagar where good food and a warm cup feel like home.",
  "Everything on the menu has been tasted, tweaked and tasted again. We spent six months fine-tuning it before calling it ready, and we are still learning with every order.",
  "Birthday cakes, hampers and party orders are made to order, so each one gets proper attention.",
];

const VALUES = [
  {
    label: "Short menu",
    title: "Quality before quantity",
    text: "A small, carefully curated menu so every item gets done right.",
  },
  {
    label: "Made to order",
    title: "Baked for your day",
    text: "Pre-order cakes, hampers and party boxes and we will make them fresh.",
  },
  {
    label: "Close to home",
    title: "Comfort, delivered",
    text: "Stay in or drop by. Home delivery is available around Theni.",
  },
];

const SOFT_SHADOW = "shadow-[0_14px_32px_-14px_rgba(122,23,18,0.4)]";
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};
/* -------------------------------------------- */

export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/* HERO */}
        <PopBackground variant="blush" className="pb-16 pt-36">
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white"
            >
              About WakeCup
            </motion.p>

            <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
              {["a little corner of", "comfort and good food."].map((l, k) => (
                <span key={l} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className={`block ${k === 1 ? "italic text-brand-red" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.12 * k + 0.1,
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
              transition={{ delay: 0.7 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80"
            >
              WakeCup is a friendly neighbourhood café in NRT Nagar, Theni. Come
              by, say hello and settle in.
            </motion.p>
          </div>
        </PopBackground>

        {/* OWNER */}
        <section className="bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
            {/* photo: arch, same language as the story page */}
            <motion.div {...fade} className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2rem] bg-brand-yellow"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-white">
                <Image
                  src={OWNER_PHOTO}
                  alt={`${OWNER_NAME}, owner of WakeCup`}
                  fill
                  priority
                  sizes="(min-width:768px) 24rem, 90vw"
                  className="object-cover object-top"
                />
              </div>

              <motion.div
                aria-hidden
                className={`absolute -right-4 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-2xl text-brand-yellow ring-4 ring-white md:h-20 md:w-20 ${SOFT_SHADOW}`}
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✦
              </motion.div>

              {/* name card */}
              <div
                className={`absolute -bottom-6 left-6 right-6 rounded-3xl bg-white px-5 py-3 ${SOFT_SHADOW}`}
              >
                <p className="font-display text-xl font-semibold text-ink">
                  {OWNER_NAME}
                </p>
                <p className="text-sm text-ink/70">{OWNER_ROLE}</p>
              </div>
            </motion.div>

            {/* text */}
            <motion.div {...fade} className="mt-8 md:mt-0">
              <p className="mb-4 inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white">
                Meet the owner
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">
                hi, I&apos;m {OWNER_NAME}.
              </h2>

              <svg
                aria-hidden
                className="my-5 w-40 text-brand-red"
                viewBox="0 0 160 12"
                fill="none"
              >
                <path
                  d="M2 6 Q 22 -2 42 6 T 82 6 T 122 6 T 158 6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="max-w-xl space-y-4 text-base leading-relaxed text-ink/85 md:text-lg">
                {OWNER_STORY.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <blockquote
                className={`mt-8 max-w-xl rounded-3xl bg-white p-6 ${SOFT_SHADOW}`}
              >
                <p className="font-display text-xl italic leading-snug text-ink md:text-2xl">
                  &ldquo;{OWNER_QUOTE}&rdquo;
                </p>
                <footer className="mt-3 text-sm font-semibold text-brand-red">
                  {OWNER_NAME}
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* WIDE PHOTO + STORY */}
        <section className="bg-cream px-6 pb-20 md:pb-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <motion.div {...fade} className="relative order-2 md:order-1">
              <div
                aria-hidden
                className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[2rem] bg-brand-yellow"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white">
                <Image
                  src={OWNER_PHOTO_2}
                  alt="Inside WakeCup, preparing an order"
                  fill
                  sizes="(min-width:768px) 42rem, 90vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            <motion.div {...fade} className="order-1 md:order-2">
              <p className="mb-4 inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white">
                Our story
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">
                six months of tasting, then we opened the doors
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/85 md:text-lg">
                We observed, experimented and tweaked week after week. Now the
                menu is standardised, and we are still new to hospitality and
                loving every bit of the learning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-cream px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <motion.h2
              {...fade}
              className="font-display max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl"
            >
              what we care about
            </motion.h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {VALUES.map((v, k) => (
                <motion.div
                  key={v.title}
                  {...fade}
                  transition={{ ...fade.transition, delay: k * 0.1 }}
                  className={`rounded-3xl bg-white p-7 ${SOFT_SHADOW}`}
                >
                  <span className="inline-block rounded-full bg-brand-red/10 px-3 py-0.5 text-xs font-bold text-brand-red">
                    {v.label}
                  </span>
                  <h3 className="font-display mt-3 text-2xl font-semibold leading-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-base">
                    {v.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <PopBackground variant="red" className="py-20">
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
            <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
              planning something sweet?
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/90">
              Pre-order a cake, a hamper or a party box. We are open {HOURS} at{" "}
              {ADDRESS}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
            </div>
          </div>
        </PopBackground>
      </main>
    </MotionConfig>
  );
}
