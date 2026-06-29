import { VENDORS } from "@/lib/data/vendors";
import type { Vendor } from "@/lib/types";

export type VendorFilter = "all" | "verified" | "conditional" | "blocked";

export function getVendors(filter: VendorFilter = "all"): Vendor[] {
  if (filter === "all") return VENDORS;
  return VENDORS.filter((v) => v.status === filter);
}

export function getVendorCounts() {
  return {
    all: VENDORS.length,
    verified: VENDORS.filter((v) => v.status === "verified").length,
    conditional: VENDORS.filter((v) => v.status === "conditional").length,
    blocked: VENDORS.filter((v) => v.status === "blocked").length,
  };
}

export function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export function scoreColor(score: number): string {
  return score >= 90 ? "var(--grn)" : score >= 80 ? "var(--amb)" : "var(--red)";
}

// Cycling avatar background colors, matching app.js
const AVATAR_COLORS: [string, string][] = [
  ["rgba(52,152,219,.15)", "var(--blu)"],
  ["rgba(155,89,182,.15)", "var(--pur)"],
  ["rgba(243,156,18,.15)", "var(--amb)"],
  ["rgba(26,188,156,.15)", "var(--teal)"],
  ["rgba(46,204,113,.15)", "var(--grn)"],
  ["rgba(231,76,60,.15)", "var(--red)"],
  ["rgba(201,162,74,.15)", "var(--gold)"],
];

export function avatarColor(index: number): [string, string] {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}
