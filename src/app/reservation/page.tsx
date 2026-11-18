"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PopBackground from "@/components/ui/PopBackground";
import OrderBuilder from "@/components/ui/OrderBuilder";
import { MENU } from "@/data/menu";
import {
  ADDRESS,
  CONTACT_EMAIL,
  HOURS,
  LEAD_DAYS,
  RECIPIENT_NAME,
  WHATSAPP_NUMBER,
} from "@/data/constant";
import {
  formatINR,
  orderLines,
  summarize,
  totalText,
  type Line,
} from "@/lib/order";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Festival",
  "Party or get-together",
  "Gift",
  "Just because",
];
const SLOTS = [
  "4:00 pm",
  "5:00 pm",
  "6:00 pm",
  "7:00 pm",
  "8:00 pm",
  "9:00 pm",
];

const input =
  "w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15";
const label = "mb-1.5 block text-sm font-bold text-ink";
const panel =
  "rounded-[2rem] bg-white/70 p-6 shadow-[0_14px_32px_-18px_rgba(122,23,18,0.45)] md:p-8";

const toLocalISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

function Section({
  n,
  title,
  hint,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className={panel}>
      <div className="mb-5 flex items-start gap-4">
        <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red text-lg font-semibold text-white">
          {n}
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            {title}
          </h2>
          {hint && <p className="text-sm text-ink/65">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function PreOrderPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(SLOTS[2]);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [cakeMsg, setCakeMsg] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + LEAD_DAYS);
    return toLocalISO(d);
  }, []);

  const { rows, total, hasCustom, count } = summarize(lines, MENU);
  const hasCake = rows.some((r) => r.item.category === "Birthday cakes");

  const problems: string[] = [];
  if (rows.length === 0) problems.push("Add at least one item");
  if (!name.trim()) problems.push("Your name");
  if (phone.replace(/\D/g, "").length < 10)
    problems.push("A 10-digit phone number");
  if (!date) problems.push("The date you need it");
  if (mode === "delivery" && !address.trim()) problems.push("Delivery address");
  const ready = problems.length === 0;

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  const compose = (bold: (s: string) => string) =>
    [
      `Hi ${RECIPIENT_NAME}, I would like to place a pre-order.`,
      ``,
      bold("Items"),
      ...orderLines(rows),
      bold(`Estimated total: ${totalText(total, hasCustom)}`),
      ``,
      bold("When"),
      `${prettyDate}, around ${time}`,
      `Occasion: ${occasion}`,
      ``,
      bold(mode === "pickup" ? "Pickup" : "Home delivery"),
      ...(mode === "delivery" ? [address.trim()] : [`Pickup from ${ADDRESS}`]),
      ...(hasCake && cakeMsg.trim()
        ? [``, bold("Message on the cake"), cakeMsg.trim()]
        : []),
      ...(notes.trim() ? [``, bold("Notes"), notes.trim()] : []),
      ``,
      bold("My details"),
      `${name.trim()}, ${phone.trim()}`,
      ``,
      `Please confirm availability and the final price. Thank you!`,
    ].join("\n");

  const send = (channel: "whatsapp" | "email") => {
    if (!ready) return;
    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          compose((s) => `*${s}*`),
        )}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `[WakeCup Pre-order] ${name.trim()}, ${prettyDate}`,
      )}&body=${encodeURIComponent(compose((s) => s))}`;
    }
    setSent(channel);
  };

  return (
    <main>
      <PopBackground variant="blush" className="pb-14 pt-36">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <p className="inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white">
            Pre-order
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
            order ahead, the easy way
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
            Choose your items, tell us when you need them, and send the order on
            WhatsApp or email. We will confirm the details with you.
          </p>
        </div>
      </PopBackground>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_380px]">
        {/* FORM */}
        <div className="space-y-6">
          <Section
            n={1}
            title="Your items"
            hint="Add as many as you like and set the quantity for each."
          >
            <OrderBuilder menu={MENU} lines={lines} onChange={setLines} />
          </Section>

          <Section
            n={2}
            title="When and how"
            hint={`Please order at least ${LEAD_DAYS} day${LEAD_DAYS > 1 ? "s" : ""} ahead. We are open ${HOURS}.`}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={label} htmlFor="occasion">
                  Occasion
                </label>
                <select
                  id="occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className={input}
                >
                  {OCCASIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="date">
                  Date needed
                </label>
                <input
                  id="date"
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={input}
                />
              </div>
              <div>
                <label className={label} htmlFor="time">
                  Around what time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={input}
                >
                  {SLOTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div
              className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-cream p-1.5 ring-1 ring-ink/10"
              role="group"
              aria-label="Pickup or delivery"
            >
              {(["pickup", "delivery"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => setMode(m)}
                  className={`rounded-full py-2.5 text-sm font-bold transition ${
                    mode === m
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-brand-yellow"
                  }`}
                >
                  {m === "pickup" ? "I will pick up" : "Home delivery"}
                </button>
              ))}
            </div>

            {mode === "delivery" ? (
              <div className="mt-4">
                <label className={label} htmlFor="address">
                  Delivery address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, street, landmark"
                  className={input}
                />
              </div>
            ) : (
              <p className="mt-4 text-sm text-ink/65">Pickup from {ADDRESS}.</p>
            )}
          </Section>

          <Section n={3} title="Your details">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={input}
                />
              </div>
              <div>
                <label className={label} htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className={input}
                />
              </div>
            </div>

            {hasCake && (
              <div className="mt-4">
                <label className={label} htmlFor="cakemsg">
                  Message on the cake (optional)
                </label>
                <input
                  id="cakemsg"
                  value={cakeMsg}
                  onChange={(e) => setCakeMsg(e.target.value)}
                  placeholder="Happy birthday, Priya!"
                  className={input}
                />
              </div>
            )}

            <div className="mt-4">
              <label className={label} htmlFor="notes">
                Anything else (optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Allergies, flavour changes, eggless, packing..."
                className={input}
              />
            </div>
          </Section>
        </div>

        {/* SUMMARY */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-ink p-6 text-white shadow-[0_24px_50px_-20px_rgba(42,20,16,0.8)] md:p-7">
            <h2 className="font-display text-2xl font-semibold">Your order</h2>

            {rows.length === 0 ? (
              <p className="mt-4 text-sm text-white/65">
                Your items will appear here.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-white/15 text-sm">
                {rows.map(({ item, qty }) => (
                  <li
                    key={item.id}
                    className="flex justify-between gap-3 py-2.5"
                  >
                    <span>
                      <span className="font-bold">{qty} ×</span> {item.name}
                    </span>
                    <span className="shrink-0 text-white/80">
                      {item.priceValue !== undefined
                        ? formatINR(item.priceValue * qty)
                        : "On request"}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex items-baseline justify-between border-t border-white/25 pt-4">
              <span className="text-sm text-white/75">
                Estimated total{count ? ` (${count})` : ""}
              </span>
              <strong className="font-display text-2xl text-brand-yellow">
                {rows.length ? totalText(total, hasCustom) : "—"}
              </strong>
            </div>

            {(date || mode) && rows.length > 0 && (
              <dl className="mt-4 space-y-1 text-sm text-white/80">
                <div className="flex justify-between gap-3">
                  <dt>When</dt>
                  <dd className="text-right">
                    {date ? `${prettyDate}, ${time}` : "Choose a date"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>How</dt>
                  <dd>{mode === "pickup" ? "Pickup" : "Home delivery"}</dd>
                </div>
              </dl>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="button"
                disabled={!ready}
                onClick={() => send("whatsapp")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1FA855] py-3.5 font-bold text-white transition hover:bg-[#168A44] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <WhatsAppIcon fontSize="small" /> Send on WhatsApp
              </button>
              <button
                type="button"
                disabled={!ready}
                onClick={() => send("email")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 font-bold text-brand-red transition hover:bg-brand-yellow hover:text-ink disabled:cursor-not-allowed disabled:opacity-45"
              >
                <EmailIcon fontSize="small" /> Send by email
              </button>
            </div>

            {!ready && (
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Still needed: {problems.join(", ")}.
              </p>
            )}
            {sent && (
              <p
                role="status"
                className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/90"
              >
                Your order is ready in{" "}
                {sent === "whatsapp" ? "WhatsApp" : "your email app"}. Press
                send there to finish. We will confirm the details with you.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
