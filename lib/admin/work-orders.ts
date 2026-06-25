import { WOs } from "@/lib/data/work-orders";
import type { WorkOrder } from "@/lib/types";

export type AdminWorkOrderFilter =
  | "all"
  | "emergency"
  | "urgent"
  | "routine"
  | "escalated"
  | "pending";

export function getAdminWorkOrders(): WorkOrder[] {
  return WOs;
}

export function getAdminWorkOrderCounts() {
  const wos = WOs;
  let active = 0;
  let attention = 0;
  let done = 0;
  for (const w of wos) {
    const st = w.status;
    if (st === "closed_v" || st === "closed_f") done++;
    else if (st === "escalated" || st === "pending" || st === "review") attention++;
    else active++;
  }
  return { active, attention, done };
}

export function filterAdminWorkOrders(
  wos: WorkOrder[],
  filter: AdminWorkOrderFilter
): WorkOrder[] {
  if (filter === "all") return wos;
  if (filter === "emergency") return wos.filter((w) => w.urgency === "emergency");
  if (filter === "urgent") return wos.filter((w) => w.urgency === "urgent");
  if (filter === "routine") return wos.filter((w) => w.urgency === "routine");
  if (filter === "escalated") return wos.filter((w) => w.status === "escalated");
  return wos.filter((w) => w.status === "pending" || w.status === "review");
}
