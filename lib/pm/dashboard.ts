import { WOs } from "@/lib/data/work-orders";
import { PRIOR_MONTH } from "@/lib/data/constants";
import type { WorkOrder } from "@/lib/types";

export const PM_BUILDINGS = ["Riverside Towers", "Maple Court"];

export function getPmScopedWOs(): WorkOrder[] {
  return WOs.filter((w) => PM_BUILDINGS.includes(w.building));
}

export type PmDashboardMetrics = {
  wos: WorkOrder[];
  open: WorkOrder[];
  done: WorkOrder[];
  verified: WorkOrder[];
  urgent: WorkOrder[];
  pendingProof: WorkOrder[];
  resolutionPct: number;
  openCount: number;
  urgentCount: number;
  pendingProofCount: number;
};

export function getPmDashboardMetrics(): PmDashboardMetrics {
  const wos = getPmScopedWOs();
  const open = wos.filter((w) => w.status !== "closed_v" && w.status !== "closed_f");
  const done = wos.filter((w) => w.status === "closed_v" || w.status === "closed_f");
  const verified = wos.filter((w) => w.status === "closed_v");
  const urgent = wos.filter(
    (w) =>
      (w.urgency === "emergency" || w.urgency === "urgent") &&
      w.status !== "closed_v" &&
      w.status !== "closed_f"
  );
  const pendingProof = wos.filter((w) => w.status === "pending" || w.status === "review");
  const resolutionPct = wos.length ? Math.round((verified.length / wos.length) * 100) : 0;

  return {
    wos,
    open,
    done,
    verified,
    urgent,
    pendingProof,
    resolutionPct,
    openCount: open.length,
    urgentCount: urgent.length,
    pendingProofCount: pendingProof.length,
  };
}

export function priorFor(metric: keyof (typeof PRIOR_MONTH)["pm"]): number | undefined {
  return PRIOR_MONTH.pm[metric];
}

