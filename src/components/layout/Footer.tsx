import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import PopBackground from "@/components/ui/PopBackground";

// TODO: replace the placeholders marked below with the cafe's real details.
const CONFIG = {
  about:
    "A little corner of comfort & good food. Desserts, birthday cakes, hampers and party orders, made fresh for the neighbourhood.",
  address: "NRT Nagar, Theni, Tamil Nadu", // TODO: add full street address
  phone: "+91 00000 00000", // TODO: real phone number
  email: "hello@example.com", // TODO: real email (or delete this line)
  hours: "4pm to 10pm",
  mapsUrl: "https://maps.app.goo.gl/MGokmzZXcCxY19CA6",
  instagram: "https://www.instagram.com/wakecup.ind/",
  note: "Birthday cakes and party orders are pre-order only. Home delivery available.",
};

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Order ahead",
    links: [
      { label: "Birthday cakes", href: "/menu" },
      { label: "Hampers", href: "/menu" },
      { label: "Party orders", href: "/menu" },
      { label: "Desserts", href: "/menu" },
    ],
  },
];

const heading = "mb-5 font-display text-2xl font-semibold text-brand-yellow";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PinIcon = ({ className = "" }: { className?: string }) => (
  <svg {...iconProps} className={className} aria-hidden>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const ClockIcon = ({ className = "" }: { className?: string }) => (
  <svg {...iconProps} className={className} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg {...iconProps} className={className} aria-hidden>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer>
      <PopBackground variant="deep" className="text-white">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* BRAND */}
          <div>
            <Link href="/" className="inline-block" aria-label="WakeCup home">
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white shadow-[0_16px_30px_-12px_rgba(0,0,0,0.6)]">
                <Image
                  src={assets.images.logo}
                  alt="WakeCup"
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </div>
            </Link>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/90">
              {CONFIG.about}
            </p>

            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-red transition hover:bg-brand-yellow hover:text-ink"
            >
              <Image
                src={assets.images.instagram}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
              />
              @wakecup.ind
            </a>
          </div>

          {/* LINK COLUMNS */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className={heading}>{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-medium text-white/90 transition hover:text-brand-yellow"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* VISIT */}
          <div>
            <h3 className={heading}>Visit us</h3>
            <ul className="space-y-4 text-sm font-medium text-white/90">
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 shrink-0 text-brand-yellow" />
                <span>Open {CONFIG.hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 shrink-0 text-brand-yellow" />
                <span>
                  {CONFIG.address}
                  <br />
                  <a
                    href={CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-yellow underline underline-offset-4"
                  >
                    Get directions
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="shrink-0 text-brand-yellow" />
                <a
                  href={`tel:${CONFIG.phone.replace(/\s/g, "")}`}
                  className="font-bold transition hover:text-brand-yellow"
                >
                  {CONFIG.phone}
                </a>
              </li>
            </ul>

            <Link
              href="/reservation"
              className="mt-6 inline-block rounded-full bg-brand-yellow px-6 py-3 font-bold text-ink transition hover:-translate-y-0.5 hover:bg-white"
            >
              Pre-order a cake
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="relative z-10 bg-black/25">
          <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">
            <div className="flex flex-col justify-between gap-3 text-sm text-white/75 md:flex-row md:items-center">
              <p>
                © {new Date().getFullYear()} WakeCup Cafe, Theni. All rights
                reserved.
              </p>
              <p className="max-w-xl italic md:text-right">{CONFIG.note}</p>
            </div>

            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/60">
              <span>Designed by</span>
              <a
                href="https://www.instagram.com/nk_freaky/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-brand-yellow transition hover:opacity-80"
              >
                <Image
                  src={assets.images.instagram}
                  alt="Instagram"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain brightness-0 invert"
                />
                <span>nk_freaky</span>
              </a>
            </p>
          </div>
        </div>
      </PopBackground>
    </footer>
  );
}
