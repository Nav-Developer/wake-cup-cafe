import type { MenuItem } from "@/data/menu";

export type Line = { id: string; qty: number };

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function summarize(lines: Line[], menu: MenuItem[]) {
  const rows = lines
    .map((l) => ({ item: menu.find((m) => m.id === l.id), qty: l.qty }))
    .filter((r): r is { item: MenuItem; qty: number } => Boolean(r.item));

  const total = rows.reduce(
    (sum, r) => sum + (r.item.priceValue ?? 0) * r.qty,
    0,
  );
  const hasCustom = rows.some((r) => r.item.priceValue === undefined);
  const count = rows.reduce((n, r) => n + r.qty, 0);
  return { rows, total, hasCustom, count };
}

export function orderLines(rows: { item: MenuItem; qty: number }[]) {
  return rows.map((r) => {
    const line =
      r.item.priceValue !== undefined
        ? ` = ${formatINR(r.item.priceValue * r.qty)}`
        : " (price on request)";
    return `• ${r.qty} x ${r.item.name} (${r.item.price})${line}`;
  });
}

export function totalText(total: number, hasCustom: boolean) {
  if (total === 0 && hasCustom) return "To be confirmed";
  return hasCustom ? `${formatINR(total)} + custom items` : formatINR(total);
}
