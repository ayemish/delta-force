import type { EscalationMetric } from "@/lib/admin/reports";

type Props = {
  metric: EscalationMetric;
};

export default function EscalationMetricCard({ metric }: Props) {
  return (
    <div className="rounded-[6px] border border-[#333] bg-[#1E1E1E] p-3">
      <div className="text-[18px] font-bold leading-none" style={{ color: metric.color }}>
        {metric.value}
      </div>
      <div className="mt-[5px] text-[10px] uppercase tracking-[0.5px] text-[var(--t3)]">
        {metric.label}
      </div>
    </div>
  );
}
