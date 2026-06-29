import { PAY_READY, PAY_PEND } from "@/lib/data/payments";
import type { PayReady } from "@/lib/types";

export type { PayReady };

export type PayPending = {
  v: string;
  vid: string;
  wo: string;
  inv: string;
  amt: number;
  locked: boolean;
};

export function getPending(): PayReady[] {
  return PAY_READY.filter((p) => !p.dfApproved);
}

export function getReleased(): PayReady[] {
  return PAY_READY.filter((p) => p.dfApproved);
}

export function getPendingTotal(): number {
  return getPending().reduce((s, p) => s + p.amt, 0);
}

export function getReleasedTotal(): number {
  return getReleased().reduce((s, p) => s + p.amt, 0);
}

export function getAllPending(): PayPending[] {
  return PAY_PEND;
}

export function cad(n: number): string {
  return "$" + n.toLocaleString("en-CA");
}

export function cadShort(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K";
  return cad(n);
}
