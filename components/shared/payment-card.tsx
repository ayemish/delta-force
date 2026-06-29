import { cad } from "@/lib/admin/payments";
import type { PayReady } from "@/lib/admin/payments";

type PendingProps = {
  payment: PayReady;
  onApprove: (inv: string) => void;
};

type ReleasedProps = {
  payment: PayReady;
};

type SectionProps = {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function PaymentSectionCard({ title, badge, children, footer }: SectionProps) {
  return (
    <div className="rounded-[var(--r2)] border border-[var(--bord)] bg-[var(--surf)]">
      <div className="flex items-center justify-between px-[22px] py-[20px]">
        <span className="text-[18px] font-bold text-[var(--t1)]">{title}</span>
        {badge}
      </div>
      <div className="border-t border-[var(--bord)] px-[22px]">{children}</div>
      {footer && (
        <div className="border-t border-[var(--bord)] px-[22px] py-[14px]">{footer}</div>
      )}
    </div>
  );
}

export function PendingPaymentRow({ payment: p, onApprove }: PendingProps) {
  return (
    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,.045)] py-[16px] last:border-0">
      <div>
        <div className="text-[14px] font-medium text-[var(--t1)]">{p.v}</div>
        <div className="mt-[2px] text-[12px] text-[var(--t3)]">
          {p.building} · {p.wo} · {cad(p.amt)}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-[8px]">
        <button className="rounded-xl border border-[var(--bord2)] bg-transparent px-[14px] py-[7px] text-[12.5px] font-semibold text-[var(--t1)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]">
          Review work
        </button>
        <button
          onClick={() => onApprove(p.inv)}
          className="rounded-xl bg-[var(--gold)] px-[14px] py-[7px] text-[12.5px] font-bold text-[#1A1305] transition-opacity hover:opacity-90"
        >
          Approve
        </button>
      </div>
    </div>
  );
}

export function ReleasedPaymentRow({ payment: p }: ReleasedProps) {
  return (
    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,.045)] py-[16px] last:border-0">
      <div>
        <div className="text-[14px] font-medium text-[var(--t1)]">{p.v}</div>
        <div className="mt-[2px] text-[12px] text-[var(--t3)]">{p.building} · {p.wo}</div>
      </div>
      <div className="text-right">
        <div className="text-[14px] font-semibold text-[var(--t1)]">{cad(p.amt)}</div>
        <div className="mt-[2px] text-[11px] text-[var(--grn)]">✓ Released to PM</div>
      </div>
    </div>
  );
}
