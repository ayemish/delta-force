import type { Vendor } from "@/lib/types";
import VendorStatusPill from "@/components/shared/vendor-status-pill";
import { getInitials, scoreColor } from "@/lib/admin/vendors";

type Props = {
  vendor: Vendor;
  avatarBg: string;
  avatarColor: string;
};

export default function VendorCard({ vendor: v, avatarBg, avatarColor }: Props) {
  const initials = getInitials(v.name);
  const sColor = scoreColor(v.score);

  return (
    <div
      className="group flex cursor-pointer flex-col rounded-[var(--r2)] border border-[var(--bord)] p-5 shadow-[var(--sh1)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(201,161,74,.4)] hover:shadow-[var(--sh2)]"
      style={{ background: "linear-gradient(160deg, var(--surf2), var(--surf))" }}
    >
      {/* Avatar */}
      <div
        className="mb-[14px] flex h-[46px] w-[46px] items-center justify-center rounded-[13px] text-[15px] font-extrabold"
        style={{ background: avatarBg, color: avatarColor }}
      >
        {initials}
      </div>

      {/* Name + trade + city */}
      <div className="mb-[2px] text-[13px] font-semibold text-[var(--t1)]">{v.name}</div>
      <div className="mb-[8px] text-[10px] text-[var(--t3)]">{v.trade} · {v.city}</div>

      {/* Status pill */}
      <div className="mb-[10px]">
        <VendorStatusPill status={v.status} />
      </div>

      {/* Compliance score + bar */}
      <div className="mb-[3px] flex items-center justify-between">
        <span className="text-[10px] text-[var(--t3)]">Compliance score</span>
        <span className="text-[12px] font-bold" style={{ color: sColor }}>{v.score}/100</span>
      </div>
      <div className="h-[6px] overflow-hidden rounded-[4px] bg-[var(--surf3)]">
        <div
          className="h-full rounded-[4px] transition-[width] duration-500"
          style={{ width: `${v.score}%`, background: sColor }}
        />
      </div>

      {/* Stats row */}
      <div className="mt-[8px] flex gap-[12px] text-[10px] text-[var(--t3)]">
        <span>SLA: <strong className="text-[var(--t1)]">{v.sla}%</strong></span>
        <span>Jobs: <strong className="text-[var(--t1)]">{v.jobs}</strong></span>
        {v.resp !== "N/A" && (
          <span>Resp: <strong className="text-[var(--t1)]">{v.resp}</strong></span>
        )}
      </div>

      {/* Flags */}
      {v.flags.map((flag, i) => (
        <div key={i} className="mt-[5px] flex items-start gap-[5px] text-[11.5px] text-[var(--amb)]">
          ⚠ {flag}
        </div>
      ))}

      {/* Insurance warning */}
      {!v.ins && (
        <div className="mt-[4px] text-[10px] text-[var(--red)]">⛔ Insurance not verified</div>
      )}
    </div>
  );
}
