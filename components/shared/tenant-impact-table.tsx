import type { TenantImpactRow } from "@/lib/admin/reports";

type Props = {
  rows: TenantImpactRow[];
};

const riskStyles: Record<"High" | "Medium", { color: string; bg: string }> = {
  High:   { color: "var(--red)", bg: "rgba(216,124,114,.16)" },
  Medium: { color: "var(--amb)", bg: "rgba(224,178,87,.14)" },
};

function complaintsColor(n: number) {
  if (n > 10) return "var(--red)";
  if (n > 5) return "var(--amb)";
  return "var(--grn)";
}

export default function TenantImpactTable({ rows }: Props) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-[var(--bord)]">
          <th className="pb-[14px] pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-[var(--t3)] whitespace-nowrap">Building</th>
          <th className="pb-[14px] pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-[var(--t3)] whitespace-nowrap">Risk</th>
          <th className="pb-[14px] pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-[var(--t3)] whitespace-nowrap">Complaints (30d)</th>
          <th className="pb-[14px] pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-[var(--t3)] whitespace-nowrap">Repeat Issues</th>
          <th className="pb-[14px] pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-[var(--t3)] whitespace-nowrap">Resolution Rate</th>
          <th className="pb-[14px] pl-4 pr-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-[var(--t3)] whitespace-nowrap">30d Trend</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.building}
            className="cursor-pointer border-b border-white/[0.045] transition-colors last:border-0 hover:[&>td]:bg-[rgba(201,161,74,.04)] hover:[&>td]:text-[var(--t1)]"
          >
            <td className="px-4 py-[15px] text-[12px] font-medium text-[var(--t1)]">
              {row.building}
            </td>
            <td className="px-4 py-[15px]">
              <span
                className="inline-flex items-center gap-1.5 rounded-[20px] px-[13px] py-1.5 text-[13px] font-semibold tracking-[0.2px]"
                style={{ color: riskStyles[row.risk].color, background: riskStyles[row.risk].bg }}
              >
                <span
                  className="h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ background: riskStyles[row.risk].color }}
                />
                {row.risk}
              </span>
            </td>
            <td className="px-4 py-[15px] text-[13px] font-bold" style={{ color: complaintsColor(row.complaints) }}>
              {row.complaints}
            </td>
            <td className="px-4 py-[15px] text-[13px] font-bold" style={{ color: row.repeatIssues > 0 ? "var(--red)" : "var(--grn)" }}>
              {row.repeatIssues}
            </td>
            <td className="px-4 py-[15px] text-[13px] font-bold !text-[var(--grn)]">
              {row.resolutionRate}%
            </td>
            <td className="px-4 py-[15px] text-[12px] font-medium" style={{ color: row.trendColor }}>
              {row.trend}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
