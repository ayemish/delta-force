import type { CalEvent, Inspection, ScheduledInspection } from "@/lib/types";

export const INSPECTIONS: Inspection[] = [
  { b: "The Observatory", tr: "HVAC", v: "Arctic Air Systems", vid: "v-001", d: "Jun 3", sc: 94, res: "pass", act: "None" },
  { b: "Riverside Towers", tr: "Plumbing", v: "Rapid Plumb Ltd.", vid: "v-002", d: "Jun 4", sc: 91, res: "pass", act: "None" },
  { b: "Cedar Heights", tr: "Electrical", v: "Voltec Services", vid: "v-003", d: "Jun 5", sc: 97, res: "pass", act: "None" },
  { b: "Maple Court", tr: "Façade & Painting", v: "ProFaçade Ltd.", vid: "v-007", d: "Jun 5", sc: 79, res: "conditional", act: "Re-inspection in 14 days. PIP issued." },
  { b: "The Observatory", tr: "Janitorial", v: "FloorMaster", vid: "v-010", d: "Jun 7", sc: 76, res: "conditional", act: "PIP issued Jun 7. Bi-weekly cadence." },
  { b: "Riverside Towers", tr: "Window Cleaning", v: "ClearView Windows", vid: "v-004", d: "Jun 8", sc: 89, res: "pass", act: "None" },
];

// Demo "today" — the calendar opens on June 2026 with Jun 10 highlighted.
export const INSPECTION_TODAY = { year: 2026, month: 5, day: 10 };

export const INSPECTION_BUILDINGS = [
  "The Observatory",
  "Riverside Towers",
  "Cedar Heights",
  "Maple Court",
];

export const INSPECTION_TYPES = [
  "Routine cadence",
  "PIP re-inspection",
  "Promotion review (3-consecutive)",
  "Final inspection (pre-termination)",
];

// Trade/type color mapping: type -> [background, text color]
export const TRADE_TYPE_COLORS: Record<string, [string, string]> = {
  "Routine cadence": ["rgba(111,168,199,.22)", "var(--blu)"],
  "PIP re-inspection": ["rgba(224,178,87,.2)", "var(--amb)"],
  "Promotion review (3-consecutive)": ["rgba(76,175,125,.2)", "var(--grn)"],
  "Final inspection (pre-termination)": ["rgba(216,124,114,.2)", "var(--red)"],
};

export const DEFAULT_TYPE_COLOR: [string, string] = [
  "rgba(201,162,74,.2)",
  "var(--gold)",
];

// Built-in recurring inspections for June 2026 (demo). Keyed by day-of-month.
export const BASE_INSPECTIONS_JUN2026: Record<number, CalEvent[]> = {
  3: [{ l: "HVAC", c: "rgba(111,168,199,.22)", t: "var(--blu)", b: "The Observatory", vid: "v-001", type: "Routine cadence" }],
  5: [{ l: "Plumbing", c: "rgba(95,179,168,.2)", t: "var(--teal)", b: "Riverside Towers", vid: "v-002", type: "Routine cadence" }],
  8: [{ l: "Windows", c: "rgba(95,179,168,.2)", t: "var(--teal)", b: "Riverside Towers", vid: "v-004", type: "Routine cadence" }],
  10: [
    { l: "QC Review", c: "rgba(201,162,74,.18)", t: "var(--gold)", b: "All", vid: null, type: "Weekly review" },
    { l: "Electrical", c: "rgba(224,178,87,.2)", t: "var(--amb)", b: "Cedar Heights", vid: "v-003", type: "Routine cadence" },
  ],
  12: [{ l: "HVAC", c: "rgba(111,168,199,.22)", t: "var(--blu)", b: "The Observatory", vid: "v-013", type: "Weekly — High Risk" }],
  15: [{ l: "Janitorial", c: "rgba(224,178,87,.2)", t: "var(--amb)", b: "The Observatory", vid: "v-010", type: "PIP re-inspection" }],
  17: [{ l: "Façade", c: "rgba(95,179,168,.2)", t: "var(--teal)", b: "Maple Court", vid: "v-007", type: "Conditional — bi-weekly" }],
  19: [{ l: "QC Review", c: "rgba(201,162,74,.18)", t: "var(--gold)", b: "All", vid: null, type: "Weekly review" }],
  22: [
    { l: "HVAC", c: "rgba(111,168,199,.22)", t: "var(--blu)", b: "Cedar Heights", vid: "v-001", type: "Bi-weekly — High Risk" },
    { l: "Plumbing", c: "rgba(95,179,168,.2)", t: "var(--teal)", b: "Cedar Heights", vid: "v-002", type: "Routine cadence" },
  ],
  24: [{ l: "Windows", c: "rgba(95,179,168,.2)", t: "var(--teal)", b: "Riverside Towers", vid: "v-004", type: "Routine cadence" }],
  26: [{ l: "QC Review", c: "rgba(201,162,74,.18)", t: "var(--gold)", b: "All", vid: null, type: "Weekly review" }],
  29: [{ l: "Electrical", c: "rgba(224,178,87,.2)", t: "var(--amb)", b: "Cedar Heights", vid: "v-003", type: "Routine cadence" }],
};

// Returns {day: CalEvent[]} for a given month, merging base (June 2026 only) + user-scheduled.
export function inspectionsForMonth(
  year: number,
  month: number,
  scheduled: ScheduledInspection[],
): Record<number, CalEvent[]> {
  const out: Record<number, CalEvent[]> = {};
  if (year === 2026 && month === 5) {
    for (const d of Object.keys(BASE_INSPECTIONS_JUN2026)) {
      const day = Number(d);
      out[day] = BASE_INSPECTIONS_JUN2026[day].slice();
    }
  }
  for (const s of scheduled) {
    if (s.year === year && s.month === month) {
      if (!out[s.day]) out[s.day] = [];
      out[s.day].push({
        l: s.l,
        c: s.c,
        t: s.t,
        b: s.b,
        vid: s.vid,
        type: s.type,
        vendorName: s.vendorName,
        added: true,
        schedId: s.id,
      });
    }
  }
  return out;
}
