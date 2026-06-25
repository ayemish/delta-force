import PageHeader from "@/components/shared/page-header";
import KpiCard from "@/components/shared/kpi-card";
import Card from "@/components/shared/card";
import EmptyState from "@/components/shared/empty-state";
import DeltaBadge from "@/components/shared/delta-badge";
import { getVendorDashboardMetrics, VENDOR_USER_ID, priorFor } from "@/lib/vendor/dashboard";
import { cadShort } from "@/lib/formatting";

export default function VendorDashboardPage() {
  const M = getVendorDashboardMetrics(VENDOR_USER_ID);

  const actionJobs = M.jobs.filter(
    (j) => j.status === "assigned" || j.status === "inprogress" || j.status === "escalated"
  );

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
      greeting={
          <span>
            Good evening,{" "}
            <span className="gold-text">
              Jordan
            </span>
          </span>
        }
        title="Arctic Air Systems"
        titleClassName="text-[17px] font-semibold leading-[1.2] tracking-0 text-[var(--t2)]"
        subtitle="Your work at a glance — June 10, 2026"
        actions={
          <button className="gold-btn rounded-[11px] px-4 py-2 text-[13px] font-semibold transition-transform">
            📷 Submit Proof
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr] lg:grid-rows-[auto_auto]">
        <KpiCard
          hero
          variant="green"
          label="Your Compliance Score"
          value={`${M.score}`}
          context={`${M.me?.status ? M.me.status.charAt(0).toUpperCase() + M.me.status.slice(1) : ""} · target 90+ to hold status`}
          sparkline={{ values: [88, 90, 92, 93, M.score], color: "var(--grn)", width: 220, height: 56 }}
        />
        <KpiCard
          variant="blue"
          label="Active Jobs"
          value={String(M.active.length)}
          context="Assigned to you now"
          sparkline={{ values: [1, 2, 1, 2, 2, M.active.length], color: "var(--blu)" }}
        />
        <KpiCard
          variant="teal"
          label="Payment Ready"
          value={cadShort(M.readyTotal)}
          context={`${M.ready.length} invoice${M.ready.length !== 1 ? "s" : ""} verified`}
          sparkline={{ values: [2, 3, 2.5, 3.2, 3, M.readyTotal / 1000 || 0.1], color: "var(--teal)" }}
        />
        <KpiCard
          variant="amber"
          label="On-Time Rate"
          value={`${M.sla}%`}
          context="SLA met · target 95%"
          sparkline={{ values: [88, 90, 89, 91, 92, M.sla], color: "var(--amb)" }}
          delta={<DeltaBadge cur={M.sla} prev={priorFor("sla")} unit=" pts" />}
        />
      </div>

      <Card
        title="Jobs Needing Action"
        action={
          <button className="border-0 bg-transparent text-[13px] font-semibold text-[var(--gold)] transition-colors hover:text-[var(--gold-l)]">
            All my jobs →
          </button>
        }
      >
        {actionJobs.length === 0 ? (
          <EmptyState title="Nothing pending" line="No jobs need action right now. New dispatches appear here." />
        ) : (
          <div>
            {actionJobs.map((j) => (
              <div
                key={j.id}
                className="flex items-center gap-3 border-b border-[rgba(255,255,255,.045)] py-3 last:border-0"
              >
                <div className="flex-1">
                  <div className="text-[14px] text-[var(--t1)]">{j.issue}</div>
                  <div className="text-[12px] text-[var(--t3)]">
                    {j.building} — {j.unit}
                  </div>
                </div>
                <div className="rounded-full border border-[rgba(201,161,74,.3)] bg-[rgba(201,161,74,.18)] px-2 py-0.5 text-[11px] font-semibold text-[var(--gold)]">
                  {j.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
