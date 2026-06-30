import type { CalEvent } from "@/lib/types";

// Buildings managed by the current PM (matches EV_PM_BUILDINGS in lib/data/ev.ts).
export const PM_SCOPED_BUILDINGS = ["Riverside Towers", "Maple Court"];

// PM sees inspections for their scoped buildings plus portfolio-wide ("All") events.
export function filterEventsForPM(events: CalEvent[]): CalEvent[] {
  return events.filter(
    (ev) => ev.b === "All" || PM_SCOPED_BUILDINGS.indexOf(ev.b) !== -1,
  );
}
