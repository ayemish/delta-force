import type { SlaTradeRow } from "@/lib/admin/reports";

type Props = {
  row: SlaTradeRow;
};

function barColor(rate: number) {
  if (rate >= 90) return "var(--grn)";
  if (rate >= 80) return "var(--amb)";
  return "var(--red)";
}

export default function SlaTradeBar({ row }: Props) {
  const color = barColor(row.rate);
  return (
    <div className="flex items-center gap-2 border-b border-white/[0.04] py-[5px] last:border-0">
      <div className="w-[110px] shrink-0 text-[11px] text-[var(--t2)]">{row.trade}</div>
      <div className="h-[5px] flex-1 overflow-hidden rounded-[3px] bg-[#252525]">
        <div
          className="h-full rounded-[3px] transition-all duration-500"
          style={{ width: `${row.rate}%`, background: color }}
        />
      </div>
      <div className="w-[34px] shrink-0 text-right text-[12px] font-semibold" style={{ color }}>
        {row.rate}%
      </div>
    </div>
  );
}
