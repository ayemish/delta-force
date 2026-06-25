import type { Vendor } from "@/lib/types";

export const VENDORS: Vendor[] = [
  { id: "v-001", name: "Arctic Air Systems", trade: "HVAC", status: "verified", score: 94, sla: 96, resp: "1.8hr", jobs: 42, city: "Surrey BC", flags: [], ins: true },
  { id: "v-002", name: "Rapid Plumb Ltd.", trade: "Plumbing", status: "verified", score: 91, sla: 93, resp: "2.1hr", jobs: 38, city: "Burnaby BC", flags: [], ins: true },
  { id: "v-003", name: "Voltec Services", trade: "Electrical", status: "verified", score: 97, sla: 98, resp: "1.2hr", jobs: 61, city: "Vancouver BC", flags: [], ins: true },
  { id: "v-004", name: "ClearView Windows", trade: "Window Cleaning", status: "verified", score: 89, sla: 91, resp: "3.4hr", jobs: 29, city: "Surrey BC", flags: [], ins: true },
  { id: "v-005", name: "CleanForce BC", trade: "Pressure Washing", status: "verified", score: 92, sla: 95, resp: "2.8hr", jobs: 55, city: "Langley BC", flags: [], ins: true },
  { id: "v-006", name: "SnowBoss Inc.", trade: "Snow & Ice", status: "verified", score: 88, sla: 90, resp: "2.2hr", jobs: 33, city: "Surrey BC", flags: [], ins: true },
  { id: "v-007", name: "ProFaçade Ltd.", trade: "Façade & Painting", status: "conditional", score: 79, sla: 81, resp: "4.1hr", jobs: 17, city: "Richmond BC", flags: ["Score 79 — PIP active", "Bi-weekly inspection cadence"], ins: true },
  { id: "v-008", name: "GreenThumb Landscape", trade: "Landscaping", status: "verified", score: 90, sla: 92, resp: "3.0hr", jobs: 44, city: "Surrey BC", flags: [], ins: true },
  { id: "v-009", name: "TrashAway BC", trade: "Waste & Recycling", status: "verified", score: 93, sla: 94, resp: "N/A", jobs: 71, city: "Delta BC", flags: [], ins: true },
  { id: "v-010", name: "FloorMaster", trade: "Janitorial", status: "conditional", score: 76, sla: 78, resp: "3.8hr", jobs: 22, city: "Vancouver BC", flags: ["Score 76 — Conditional", "PIP issued Jun 7"], ins: true },
  { id: "v-011", name: "GraffitiGone", trade: "Graffiti Removal", status: "conditional", score: 82, sla: 85, resp: "2.5hr", jobs: 14, city: "Surrey BC", flags: [], ins: true },
  { id: "v-012", name: "JunkHaul Pro", trade: "Junk Removal", status: "conditional", score: 77, sla: 80, resp: "4.5hr", jobs: 9, city: "Abbotsford BC", flags: ["Insurance expired — 7-day window"], ins: false },
  { id: "v-013", name: "ThermalPro HVAC", trade: "HVAC (Backup)", status: "verified", score: 86, sla: 88, resp: "2.6hr", jobs: 18, city: "Coquitlam BC", flags: [], ins: true },
  { id: "v-014", name: "SureFix Plumbing", trade: "Plumbing (Backup)", status: "verified", score: 85, sla: 87, resp: "2.9hr", jobs: 24, city: "Surrey BC", flags: [], ins: true },
  { id: "v-015", name: "PolarTech Mechanical", trade: "HVAC (Backup)", status: "verified", score: 84, sla: 86, resp: "3.1hr", jobs: 15, city: "Langley BC", flags: [], ins: true },
  { id: "v-016", name: "FlowRight Plumbing", trade: "Plumbing (Backup)", status: "verified", score: 83, sla: 85, resp: "3.2hr", jobs: 19, city: "Richmond BC", flags: [], ins: true },
];
