"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PopBackground from "@/components/ui/PopBackground";
import EnquiryDialog from "@/components/ui/EnquiryDialog";
import { CATEGORIES, MENU, type MenuItem } from "@/data/menu";
import {
  CONTACT_EMAIL,
  RECIPIENT_NAME,
  WHATSAPP_NUMBER,
} from "@/data/constant";

type Filter = "All" | (typeof CATEGORIES)[number];

export default function MenuPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const items = useMemo(
    () => (filter === "All" ? MENU : MENU.filter((m) => m.category === filter)),
    [filter],
  );

  return (
    <main>
      <PopBackground variant="blush" className="pb-16 pt-36">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <p className="inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white">
            Our menu
          </p>
          <h1 className="font-display mt-4 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
            a short menu, made with care
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
            Pick something you like and send us an enquiry on WhatsApp or email.
            Cakes and party orders are pre-order only.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {(["All", ...CATEGORIES] as Filter[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  filter === c
                    ? "bg-ink text-white"
                    : "bg-white text-ink hover:bg-brand-yellow"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </PopBackground>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((m) => (
              <motion.article
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_14px_32px_-16px_rgba(122,23,18,0.45)]"
              >
                <div
                  className="flex h-44 items-center justify-center text-7xl"
                  style={{ background: m.tone }}
                  aria-hidden
                >
                  {m.emoji}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold text-brand-red">
                    {m.category}
                  </p>
                  <h2 className="font-display mt-1 text-2xl font-semibold text-ink">
                    {m.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">
                    {m.description}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <p>
                      <span className="font-display text-2xl font-semibold text-ink">
                        {m.price}
                      </span>
                      {m.note && (
                        <span className="block text-xs text-ink/60">
                          {m.note}
                        </span>
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelected(m)}
                      className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-center text-sm text-ink/60">
          Items and prices shown are samples and will change.
        </p>
      </section>

      <EnquiryDialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        enquiryLabel={selected ? `${selected.category} enquiry` : "Enquiry"}
        menuOptions={MENU}
        defaultItemId={selected?.id ?? ""}
        whatsappNumber={WHATSAPP_NUMBER}
        email={CONTACT_EMAIL}
        recipientName={RECIPIENT_NAME}
      />
    </main>
  );
}
