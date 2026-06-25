import type { WorkOrderStatus, Urgency } from "@/lib/types";

const statusMap: Record<WorkOrderStatus, { cls: string; label: string }> = {
  intake: { cls: "p-intake", label: "Intake" },
  assigned: { cls: "p-assigned", label: "Assigned" },
  inprogress: { cls: "p-inprog", label: "In Progress" },
  pending: { cls: "p-pending", label: "Pending Proof" },
  review: { cls: "p-review", label: "Under Review" },
  closed_v: { cls: "p-closedv", label: "Closed – Verified" },
  closed_f: { cls: "p-closedf", label: "Closed – Failed" },
  escalated: { cls: "p-escalated", label: "Escalated" },
};

const urgMap: Record<Urgency, { cls: string; label: string }> = {
  emergency: { cls: "u-em", label: "EMERGENCY" },
  urgent: { cls: "u-ur", label: "URGENT" },
  routine: { cls: "u-ro", label: "ROUTINE" },
};

export function StatusPill({ status, lg = false }: { status: WorkOrderStatus; lg?: boolean }) {
  const d = statusMap[status] || { cls: "p-intake", label: status };
  return (
    <span className={`pill ${d.cls} ${lg ? "pill-lg" : ""}`}>{d.label}</span>
  );
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const d = urgMap[urgency] || { cls: "u-ro", label: urgency };
  return <span className={`urg ${d.cls}`}>{d.label}</span>;
}
