import type { StaticImageData } from "next/image";
import assets from "@/assets";

export type Chapter = {
  tag: string;
  title: string;
  text: string;
  text2?: string;
  image?: StaticImageData;
  aspect?: "tall" | "wide";
  points?: { label: string; title: string; text: string }[];
  stats?: { label: string; value: number; suffix?: string }[];
};

// Copy is based on WakeCup's own Instagram bio and channel note.
// Images are placeholders: swap in your real photos when ready.
export const chapters: Chapter[] = [
  {
    tag: "Hello, Theni",
    title: "a little corner of comfort & good food",
    text: "WakeCup is a friendly neighbourhood café in NRT Nagar. Come by, say hello and settle in.",
    image: assets.images.first,
    aspect: "wide",
  },
  {
    tag: "Our menu",
    title: "less is more",
    text: "Quality always comes before quantity. That is why our menu is short and carefully curated.",
    text2: "We would rather make a few things really well.",
    image: assets.images.second,
    aspect: "tall",
  },
  {
    tag: "Six months of tasting",
    title: "tweaked week after week",
    text: "We spent six months observing, experimenting and fine-tuning with new additions, little tweaks and specials.",
    text2:
      "Now the menu is finally standardised. We are still new to hospitality, and loving every bit of the learning.",
  },
  {
    tag: "Made for your moments",
    title: "cakes, hampers & parties",
    text: "Planning a celebration? Pre-order and we will take care of the sweet part.",
    points: [
      {
        label: "Pre-order",
        title: "Birthday cakes",
        text: "Order ahead for birthdays and special days.",
      },
      {
        label: "Gifting",
        title: "Hampers",
        text: "Thoughtful hampers for festivals and friends.",
      },
      {
        label: "Pre-order",
        title: "Party orders",
        text: "Desserts and bites for get-togethers, big or small.",
      },
    ],
  },
  {
    tag: "Visit us",
    title: "come by this evening",
    text: "Home delivery is available if you would rather stay in.",
    stats: [
      { label: "we open", value: 4, suffix: "pm" },
      { label: "we close", value: 10, suffix: "pm" },
    ],
  },
];
