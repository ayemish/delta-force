import type { PayReady } from "@/lib/types";

type PayPending = {
  v: string;
  vid: string;
  wo: string;
  inv: string;
  amt: number;
  locked: boolean;
};

export const PAY_READY: PayReady[] = [
  { v: "Voltec Services", vid: "v-003", wo: "WO-2026-0081", inv: "INV-0291", amt: 3200, date: "Jun 10", building: "Cedar Heights", dfApproved: true },
  { v: "CleanForce BC", vid: "v-005", wo: "WO-2026-0085", inv: "INV-0290", amt: 1850, date: "Jun 10", building: "Riverside Towers", dfApproved: false },
  { v: "SnowBoss Inc.", vid: "v-006", wo: "WO-2026-0084", inv: "INV-0289", amt: 2400, date: "Jun 10", building: "Maple Court", dfApproved: true },
  { v: "TrashAway BC", vid: "v-009", wo: "WO-2026-0080", inv: "INV-0288", amt: 4100, date: "Jun 9", building: "The Observatory", dfApproved: false },
  { v: "Arctic Air Systems", vid: "v-001", wo: "WO-2026-0079", inv: "INV-0287", amt: 3270, date: "Jun 9", building: "Riverside Towers", dfApproved: true },
];

export const PAY_PEND: PayPending[] = [
  { v: "Rapid Plumb Ltd.", vid: "v-002", wo: "WO-2026-0088", inv: "INV-0292", amt: 2800, locked: false },
  { v: "ProFaçade Ltd.", vid: "v-007", wo: "WO-2026-0083", inv: "INV-0293", amt: 3100, locked: false },
  { v: "GreenThumb Landscape", vid: "v-008", wo: "WO-2026-0077", inv: "INV-0286", amt: 2340, locked: false },
  { v: "FloorMaster", vid: "v-010", wo: "WO-2026-0074", inv: "INV-0283", amt: 2100, locked: true },
];
