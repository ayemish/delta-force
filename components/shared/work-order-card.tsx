import { Building } from "lucide-react";
import type { WorkOrder } from "@/lib/types";
import { StatusPill, UrgencyBadge } from "@/components/shared/status-pill";
import { SlaBar } from "@/components/shared/sla-bar";

type WorkOrderCardProps = {
  wo: WorkOrder;
  showDetails?: boolean;
  onOpen?: () => void;
};

const urgencyBorder: Record<WorkOrder["urgency"], string> = {
  emergency: "border-l-[var(--red)]",
  urgent: "border-l-[var(--amb)]",
  routine: "border-l-[var(--t3)]",
};

export default function WorkOrderCard({ wo, showDetails = true, onOpen }: WorkOrderCardProps) {
  return (
    <div
      onClick={onOpen}
      className={`wo-card flex cursor-pointer items-center gap-5 rounded-[var(--r2)] border border-[var(--bord)] border-l-[3px] bg-[linear-gradient(160deg,rgba(26,26,26,.82),rgba(20,20,20,.82))] p-5 shadow-[var(--sh1)] backdrop-blur-[8px] transition-all duration-200 ease-[var(--ease)] hover:-translate-y-0.5 hover:border-[var(--bord2)] hover:shadow-[var(--sh2)] lg:px-6 ${urgencyBorder[wo.urgency]}`}
    >
      <div className="wo-card-main min-w-0 flex-1">
        <div className="wo-card-top mb-2 flex flex-wrap items-center gap-2.5">
          <span className="wo-id font-mono text-[13px] font-semibold text-[var(--gold)]">
            {wo.id.replace("WO-2026-", "#")}
          </span>
          <UrgencyBadge urgency={wo.urgency} />
          {showDetails && <span className="tag">{wo.trade}</span>}
        </div>
        <div className="wo-issue mb-1.5 text-[17px] font-semibold leading-[1.3] tracking-[-0.2px] text-[var(--t1)]">
          {wo.issue}
        </div>
        <div className="wo-loc flex items-center gap-1.5 text-[13px] text-[var(--t3)]">
          <Building size={13} className="opacity-70" />
          {wo.building}
          {showDetails && <> · {wo.unit}</>}
          {showDetails && <> · {wo.owner}</>}
        </div>
      </div>
      <div className="wo-card-right flex shrink-0 items-center gap-4 lg:gap-5">
        <div className="wo-status-wrap flex min-w-[130px] justify-end">
          <StatusPill status={wo.status} lg />
        </div>
        <div className="wo-sla min-w-[120px]">
          <SlaBar pct={wo.slaP} label={wo.slaR} />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.();
          }}
          className="rounded-[11px] border border-[var(--bord)] bg-transparent px-3 py-1.5 text-[13px] font-semibold text-[var(--t1)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
        >
          Open
        </button>
      </div>
    </div>
  );
}
