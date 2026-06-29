import { cad } from "@/lib/admin/payments";
import type { PayReady } from "@/lib/admin/payments";
import type { PayPending } from "@/lib/admin/payments";

type ReadyRowProps = {
  payment: PayReady;
  onApprove?: (inv: string) => void;
};

type PendingRowProps = {
  payment: PayPending;
};

export function PayReadyRow({ payment: p, onApprove }: ReadyRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,.045)] py-[14px] last:border-0">
      <div>
        <div className="text-[14px] font-medium text-[var(--t1)]">{p.v}</div>
        <div className="mt-[1px] text-[12px] text-[var(--t3)]">
          {p.building} · {p.wo} · {p.inv}
        </div>
      </div>
      {onApprove ? (
        <div className="flex items-center gap-[8px]">
          <button
            onClick={() => onApprove(p.inv)}
            className="rounded-[10px] border border-[var(--bord2)] bg-transparent px-[13px] py-[7px] text-[12px] font-semibold text-[var(--t1)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            Review work
          </button>
          <button
            onClick={() => onApprove(p.inv)}
            className="rounded-[10px] bg-[var(--gold)] px-[13px] py-[7px] text-[12px] font-bold text-[#1A1305] transition-opacity hover:opacity-90"
          >
            Approve
          </button>
        </div>
      ) : (
        <div className="text-right">
          <div className="text-[14px] font-semibold text-[var(--t1)]">{cad(p.amt)}</div>
          <div className="mt-[2px] text-[11px] text-[var(--grn)]">✓ Released to PM</div>
        </div>
      )}
    </div>
  );
}

export function PayPendingRow({ payment: p }: PendingRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,.045)] py-[14px] last:border-0">
      <div>
        <div className="text-[14px] font-medium text-[var(--t1)]">{p.v}</div>
        <div className="mt-[1px] text-[12px] text-[var(--t3)]">{p.wo} · {p.inv}</div>
      </div>
      <div className="text-right">
        <div className="text-[14px] font-semibold text-[var(--t1)]">{cad(p.amt)}</div>
        <div
          className="mt-[2px] text-[11px]"
          style={{ color: p.locked ? "var(--red)" : "var(--amb)" }}
        >
          {p.locked ? "🔒 Work rejected — rework required" : "⏳ Awaiting verification"}
        </div>
      </div>
    </div>
  );
}
