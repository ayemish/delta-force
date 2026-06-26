import type { WorkOrderStatus, Urgency } from "@/lib/types";

const statusMap: Record<WorkOrderStatus, { color: string; bg: string; label: string }> = {
  intake:    { color: "#9a9a9a", bg: "rgba(140,140,140,.14)", label: "Intake" },
  assigned:  { color: "var(--blu)", bg: "rgba(111,168,199,.14)", label: "Assigned" },
  inprogress:{ color: "var(--pur)", bg: "rgba(155,139,196,.14)", label: "In Progress" },
  pending:   { color: "var(--amb)", bg: "rgba(224,178,87,.14)", label: "Pending Proof" },
  review:    { color: "var(--teal)", bg: "rgba(95,179,168,.14)", label: "Under Review" },
  closed_v:  { color: "var(--grn)", bg: "rgba(76,175,125,.14)", label: "Closed – Verified" },
  closed_f:  { color: "var(--red)", bg: "rgba(216,124,114,.14)", label: "Closed – Failed" },
  escalated: { color: "var(--red)", bg: "rgba(216,124,114,.16)", label: "Escalated" },
};

const urgMap: Record<Urgency, { color: string; bg: string; label: string }> = {
  emergency: { color: "#e8a59d", bg: "rgba(216,124,114,.18)", label: "EMERGENCY" },
  urgent:    { color: "#f0cd82", bg: "rgba(224,178,87,.16)",  label: "URGENT" },
  routine:   { color: "var(--t2)", bg: "rgba(140,140,140,.12)", label: "ROUTINE" },
};

export function StatusPill({ status, lg = false }: { status: WorkOrderStatus; lg?: boolean }) {
  const d = statusMap[status] ?? statusMap.intake;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[20px] font-semibold tracking-[0.2px] ${
        lg ? "px-4 py-2 text-[15px] font-bold" : "px-[13px] py-1.5 text-[13px]"
      }`}
      style={{ color: d.color, background: d.bg }}
    >
      <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: d.color }} />
      {d.label}
    </span>
  );
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const d = urgMap[urgency] ?? urgMap.routine;
  return (
    <span
      className="inline-flex items-center rounded-[7px] px-[10px] py-1 text-[10.5px] font-bold tracking-[0.6px]"
      style={{ color: d.color, background: d.bg }}
    >
      {d.label}
    </span>
  );
}
