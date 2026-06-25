import type { Inspection } from "@/lib/types";

export const INSPECTIONS: Inspection[] = [
  { b: "The Observatory", tr: "HVAC", v: "Arctic Air Systems", vid: "v-001", d: "Jun 3", sc: 94, res: "pass", act: "None" },
  { b: "Riverside Towers", tr: "Plumbing", v: "Rapid Plumb Ltd.", vid: "v-002", d: "Jun 4", sc: 91, res: "pass", act: "None" },
  { b: "Cedar Heights", tr: "Electrical", v: "Voltec Services", vid: "v-003", d: "Jun 5", sc: 97, res: "pass", act: "None" },
  { b: "Maple Court", tr: "Façade & Painting", v: "ProFaçade Ltd.", vid: "v-007", d: "Jun 5", sc: 79, res: "conditional", act: "Re-inspection in 14 days. PIP issued." },
  { b: "The Observatory", tr: "Janitorial", v: "FloorMaster", vid: "v-010", d: "Jun 7", sc: 76, res: "conditional", act: "PIP issued Jun 7. Bi-weekly cadence." },
  { b: "Riverside Towers", tr: "Window Cleaning", v: "ClearView Windows", vid: "v-004", d: "Jun 8", sc: 89, res: "pass", act: "None" },
];
