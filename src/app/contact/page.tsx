"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PopBackground from "@/components/ui/PopBackground";
import EnquiryDialog, {
  type EnquiryChannel,
} from "@/components/ui/EnquiryDialog";
import { MENU } from "@/data/menu";
import {
  ADDRESS,
  CONTACT_EMAIL,
  HOURS,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  RECIPIENT_NAME,
  WHATSAPP_NUMBER,
} from "@/data/constant";

const card =
  "rounded-[2rem] bg-white p-7 shadow-[0_14px_32px_-16px_rgba(122,23,18,0.45)]";

export default function ContactPage() {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<EnquiryChannel>("whatsapp");

  const start = (c: EnquiryChannel) => {
    setChannel(c);
    setOpen(true);
  };

  return (
    <main>
      <PopBackground variant="red" className="pb-24 pt-36">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl"
          >
            come by, or say hello from home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/95"
          >
            Ask about a cake, plan a party order or just check what is fresh
            today. Message us on WhatsApp or send an email.
          </motion.p>
        </div>
      </PopBackground>

      <section className="relative z-10 mx-auto -mt-12 grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-2">
        {/* ENQUIRY */}
        <div className={card}>
          <h2 className="font-display text-3xl font-semibold text-ink">
            Send an enquiry
          </h2>
          <p className="mt-2 text-ink/75">
            Choose how you would like to reach us. We will open the message
            ready for you to send.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => start("whatsapp")}
              className="flex items-center justify-center gap-3 rounded-full bg-[#1FA855] px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#168A44]"
            >
              <WhatsAppIcon /> Message us on WhatsApp
            </button>
            <button
              type="button"
              onClick={() => start("email")}
              className="flex items-center justify-center gap-3 rounded-full bg-brand-red px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
            >
              <EmailIcon /> Send us an email
            </button>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-3 rounded-full border-2 border-ink px-6 py-3.5 font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              <CallIcon /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* DETAILS */}
        <div className={card}>
          <h2 className="font-display text-3xl font-semibold text-ink">
            Visit us
          </h2>

          <ul className="mt-6 space-y-5">
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-ink">
                <ScheduleIcon />
              </span>
              <span>
                <strong className="block">Opening hours</strong>
                <span className="text-ink/75">{HOURS}</span>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-ink">
                <PlaceIcon />
              </span>
              <span>
                <strong className="block">Find us</strong>
                <span className="text-ink/75">{ADDRESS}</span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-bold text-brand-red underline underline-offset-4"
                >
                  Open in Google Maps
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-ink">
                <EmailIcon />
              </span>
              <span>
                <strong className="block">Email</strong>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-ink/75 underline-offset-4 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </span>
            </li>
          </ul>

          <p className="mt-7 rounded-2xl bg-blush px-5 py-4 text-sm leading-relaxed text-ink/80">
            Home delivery is available. Birthday cakes and party orders are
            pre-order only, so please message us a few days ahead. You can also
            follow{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-red underline underline-offset-4"
            >
              @wakecup.ind
            </a>{" "}
            on Instagram.
          </p>
        </div>
      </section>

      <EnquiryDialog
        open={open}
        onClose={() => setOpen(false)}
        enquiryLabel="General enquiry"
        menuOptions={MENU}
        defaultChannel={channel}
        whatsappNumber={WHATSAPP_NUMBER}
        email={CONTACT_EMAIL}
        recipientName={RECIPIENT_NAME}
      />
    </main>
  );
}
