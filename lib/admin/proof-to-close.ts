import { WOs } from "@/lib/data/work-orders";
import type { WorkOrder } from "@/lib/types";

export function getProofToCloseWOs(): WorkOrder[] {
  return WOs.filter(
    (w) => (w.status === "pending" || w.status === "review") && w.proof !== null
  );
}

export function getProofCounts() {
  const wos = getProofToCloseWOs();
  const pending = wos.filter((w) => w.status === "pending").length;
  const review = wos.filter((w) => w.status === "review").length;
  const incomplete = wos.filter((w) => {
    if (!w.proof) return false;
    return w.proof.checks.some((c) => !c.ok);
  }).length;
  return { pending, review, incomplete, total: wos.length };
}

export function countChecks(wo: WorkOrder) {
  if (!wo.proof) return { passed: 0, total: 0 };
  const total = wo.proof.checks.length;
  const passed = wo.proof.checks.filter((c) => c.ok).length;
  return { passed, total };
}
