// DEMO DATA: names, prices and descriptions are placeholders until the
// real menu is ready. Replace `emoji` with an `image` later.

export const CATEGORIES = [
  "Desserts",
  "Birthday cakes",
  "Hampers",
  "Party orders",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: string;
  note?: string;
  emoji: string;
  tone: string; // tile background
  priceValue?: any;
};

export const MENU: MenuItem[] = [
  {
    id: "blueberry-cheesecake",
    name: "Blueberry cheesecake",
    category: "Desserts",
    description: "Creamy baked cheesecake with a blueberry compote.",
    price: "₹180",
    note: "per slice",
    emoji: "🫐",
    tone: "#E3DBFA",
  },
  {
    id: "chocolate-brownie",
    name: "Fudgy brownie",
    category: "Desserts",
    description: "Dense, gooey chocolate brownie, best served warm.",
    price: "₹120",
    note: "per piece",
    emoji: "🍫",
    tone: "#E9CDBD",
  },
  {
    id: "tiramisu-cup",
    name: "Tiramisu cup",
    category: "Desserts",
    description: "Coffee-soaked sponge layered with mascarpone cream.",
    price: "₹160",
    note: "per cup",
    emoji: "☕",
    tone: "#F4E2C8",
  },
  {
    id: "strawberry-cake",
    name: "Strawberry cake",
    category: "Birthday cakes",
    description: "Vanilla sponge, whipped cream and fresh strawberries.",
    price: "₹750",
    note: "per 500 g, pre-order",
    emoji: "🍓",
    tone: "#FAD3DA",
  },
  {
    id: "chocolate-truffle-cake",
    name: "Chocolate truffle cake",
    category: "Birthday cakes",
    description: "Rich chocolate sponge with silky ganache.",
    price: "₹800",
    note: "per 500 g, pre-order",
    emoji: "🎂",
    tone: "#E9CDBD",
  },
  {
    id: "custom-cake",
    name: "Custom message cake",
    category: "Birthday cakes",
    description: "Pick the flavour and tell us what to write on top.",
    price: "On request",
    note: "pre-order",
    emoji: "🎉",
    tone: "#FFE9A8",
  },
  {
    id: "festive-hamper",
    name: "Festive hamper",
    category: "Hampers",
    description: "A box of sweets and bakes, gift-wrapped for the season.",
    price: "₹999",
    note: "per hamper",
    emoji: "🎁",
    tone: "#FFE9A8",
  },
  {
    id: "thank-you-hamper",
    name: "Little thank-you box",
    category: "Hampers",
    description: "Small box of cookies and brownies for a thoughtful gift.",
    price: "₹449",
    note: "per box",
    emoji: "💌",
    tone: "#FAD3DA",
  },
  {
    id: "dessert-platter",
    name: "Dessert platter",
    category: "Party orders",
    description: "Assorted mini desserts for get-togethers.",
    price: "₹1,499",
    note: "serves 8 to 10, pre-order",
    emoji: "🍰",
    tone: "#F4E2C8",
  },
  {
    id: "cupcake-box",
    name: "Cupcake box",
    category: "Party orders",
    description: "Box of 12 cupcakes in flavours of your choice.",
    price: "₹899",
    note: "per box of 12, pre-order",
    emoji: "🧁",
    tone: "#E3DBFA",
  },
];
