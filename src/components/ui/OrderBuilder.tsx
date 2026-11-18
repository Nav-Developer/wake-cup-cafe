"use client";

import { CATEGORIES, type MenuItem } from "@/data/menu";
import { formatINR, summarize, totalText, type Line } from "@/lib/order";

type Props = {
  menu: MenuItem[];
  lines: Line[];
  onChange: (lines: Line[]) => void;
};

const MAX_QTY = 99;

export default function OrderBuilder({ menu, lines, onChange }: Props) {
  const { rows, total, hasCustom, count } = summarize(lines, menu);

  const add = (id: string) => {
    if (!id) return;
    const exists = lines.some((l) => l.id === id);
    onChange(
      exists
        ? lines.map((l) =>
            l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + 1) } : l,
          )
        : [...lines, { id, qty: 1 }],
    );
  };

  const setQty = (id: string, qty: number) => {
    if (qty < 1) return onChange(lines.filter((l) => l.id !== id));
    onChange(
      lines.map((l) =>
        l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l,
      ),
    );
  };

  return (
    <div>
      <label className="sr-only" htmlFor="add-item">
        Add an item from our menu
      </label>
      <select
        id="add-item"
        value=""
        onChange={(e) => add(e.target.value)}
        className="w-full cursor-pointer rounded-2xl border border-ink/20 bg-white px-4 py-3 font-semibold text-ink focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/15"
      >
        <option value="">+ Add an item from our menu</option>
        {CATEGORIES.map((cat) => (
          <optgroup key={cat} label={cat}>
            {menu
              .filter((m) => m.category === cat)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.emoji} {m.name} · {m.price}
                </option>
              ))}
          </optgroup>
        ))}
      </select>

      {rows.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-ink/25 px-4 py-5 text-center text-sm text-ink/60">
          Nothing added yet. Choose items above and set how many you need.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {rows.map(({ item, qty }) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-3 shadow-[0_8px_20px_-14px_rgba(122,23,18,0.5)]"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl"
                style={{ background: item.tone }}
              >
                {item.emoji}
              </span>

              <span className="min-w-0 flex-1">
                <strong className="block truncate text-sm text-ink">
                  {item.name}
                </strong>
                <span className="text-xs text-ink/60">
                  {item.price}
                  {item.note ? ` · ${item.note}` : ""}
                </span>
              </span>

              <span
                className="flex items-center rounded-full bg-cream ring-1 ring-ink/15"
                role="group"
                aria-label={`Quantity of ${item.name}`}
              >
                <button
                  type="button"
                  onClick={() => setQty(item.id, qty - 1)}
                  aria-label={qty === 1 ? `Remove ${item.name}` : "Decrease"}
                  className="h-8 w-8 rounded-full text-lg font-bold text-ink transition hover:bg-brand-yellow"
                >
                  {qty === 1 ? "×" : "−"}
                </button>
                <span className="w-7 text-center text-sm font-bold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(item.id, qty + 1)}
                  aria-label="Increase"
                  className="h-8 w-8 rounded-full text-lg font-bold text-ink transition hover:bg-brand-yellow"
                >
                  +
                </button>
              </span>

              <span className="hidden w-16 text-right text-sm font-bold text-ink sm:block">
                {item.priceValue !== undefined
                  ? formatINR(item.priceValue * qty)
                  : "On request"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {rows.length > 0 && (
        <p className="mt-3 flex items-center justify-between rounded-2xl bg-blush px-4 py-3 text-sm">
          <span className="font-semibold text-ink/80">
            {count} {count === 1 ? "item" : "items"}, estimated total
          </span>
          <strong className="font-display text-xl text-brand-red">
            {totalText(total, hasCustom)}
          </strong>
        </p>
      )}
    </div>
  );
}
