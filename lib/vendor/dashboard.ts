import { WOs } from "@/lib/data/work-orders";
import { VENDORS } from "@/lib/data/vendors";
import { PAY_READY } from "@/lib/data/payments";
import { PRIOR_MONTH } from "@/lib/data/constants";
import type { WorkOrder, PayReady } from "@/lib/types";

// Example vendor user context for the dashboard
export const VENDOR_USER_ID = "v-001";

export function getVendorProfile(vid: string = VENDOR_USER_ID) {
  return VENDORS.find((v) => v.id === vid) ?? null;
}

export function getVendorScopedWOs(vid: string = VENDOR_USER_ID): WorkOrder[] {
  return WOs.filter((w) => w.vendorId === vid);
}

export type VendorDashboardMetrics = {
  me: ReturnType<typeof getVendorProfile>;
  jobs: WorkOrder[];
  active: WorkOrder[];
  ready: PayReady[];
  readyTotal: number;
  score: number;
  sla: number;
};

export function getVendorDashboardMetrics(vid: string = VENDOR_USER_ID): VendorDashboardMetrics {
  const me = getVendorProfile(vid);
  const jobs = getVendorScopedWOs(vid);
  const active = jobs.filter((w) => w.status !== "closed_v" && w.status !== "closed_f");
  const ready = PAY_READY.filter((p) => p.vid === vid);
  const readyTotal = ready.reduce((sum, p) => sum + p.amt, 0);

  return {
    me,
    jobs,
    active,
    ready,
    readyTotal,
    score: me?.score ?? 0,
    sla: me?.sla ?? 0,
  };
}

export function priorFor(metric: keyof (typeof PRIOR_MONTH)["vendor"]): number | undefined {
  return PRIOR_MONTH.vendor[metric];
}
