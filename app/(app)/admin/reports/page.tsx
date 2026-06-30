import PageHeader from "@/components/shared/page-header";
import Card from "@/components/shared/card";
import SlaTradeBar from "@/components/shared/sla-trade-bar";
import EscalationMetricCard from "@/components/shared/escalation-metric-card";
import TenantImpactTable from "@/components/shared/tenant-impact-table";
import { adminReports } from "@/lib/admin/reports";

export default function AdminReportsPage() {
  const { summaryMetrics, slaByTrade, escalationMetrics, tenantImpact } = adminReports;

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Reports & Analytics"
        subtitle="System-wide performance metrics — weekly exception review"
        actions={
          <button className="rounded-[11px] border border-[var(--bord2)] bg-[var(--surf2)] px-4 py-2 text-[12.5px] font-semibold text-[var(--t1)] transition-all hover:-translate-y-px hover:border-[var(--gold)] hover:text-[var(--gold)]">
            ⬇ Export Report
          </button>
        }
      />

      {/* Summary metric grid — 3-up, 2 rows = 6 cards total */}
      <div className="mb-8 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
        {summaryMetrics.map((m) => (
          <Card key={m.label}>
            <div className="text-center">
              <div
                className="text-[30px] font-extrabold leading-none tracking-[-1px] tabular-nums"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div className="mt-[6px] text-[11.5px] font-semibold uppercase tracking-[0.6px] text-[var(--t3)]">
                {m.label}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Two-column row: SLA by Trade + Escalation Metrics */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* SLA Compliance by Trade */}
        <Card title="SLA Compliance by Trade">
          <div>
            {slaByTrade.map((row) => (
              <SlaTradeBar key={row.trade} row={row} />
            ))}
          </div>
        </Card>

        {/* Escalation Metrics */}
        <Card title="Escalation Metrics — 30 Days">
          <div className="grid grid-cols-2 gap-[10px]">
            {escalationMetrics.map((m) => (
              <EscalationMetricCard key={m.label} metric={m} />
            ))}
          </div>
        </Card>
      </div>

      {/* Tenant Impact Metrics — full width table */}
      <div className="rounded-[var(--r2)] border border-[var(--bord)] bg-[linear-gradient(160deg,rgba(26,26,26,.82),rgba(20,20,20,.82))] shadow-[var(--sh1)] backdrop-blur-[8px]">
        <div className="border-b border-[var(--bord)] px-[14px] py-[14px]">
          <span className="text-[23px] font-bold tracking-[-0.4px] text-[var(--t1)]">
            Tenant Impact Metrics — All Buildings
          </span>
        </div>
        <div className="overflow-x-auto">
          <TenantImpactTable rows={tenantImpact} />
        </div>
      </div>
    </div>
  );
}
