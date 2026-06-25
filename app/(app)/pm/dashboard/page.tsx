import PageHeader from "@/components/shared/page-header";
import KpiCard from "@/components/shared/kpi-card";
import Card from "@/components/shared/card";
import AttentionItem from "@/components/shared/attention-item";
import EmptyState from "@/components/shared/empty-state";
import DeltaBadge from "@/components/shared/delta-badge";
import { getPmDashboardMetrics, priorFor } from "@/lib/pm/dashboard";

export default function PmDashboardPage() {
  const M = getPmDashboardMetrics();

  const attention: { text: string; sub: string; color: string }[] = [];
  for (const w of M.wos) {
    if ((w.status === "pending" || w.status === "review") && w.proof) {
      attention.push({
        text: `${w.id.replace("WO-2026-", "")} — proof ready to review`,
        sub: w.building,
        color: "var(--teal)",
      });
    } else if (
      w.slaP > 0 &&
      w.slaP <= 50 &&
      w.status !== "closed_v" &&
      w.status !== "closed_f"
    ) {
      attention.push({
        text: `${w.id.replace("WO-2026-", "")} — SLA at risk, ${w.slaR} left`,
        sub: w.building,
        color: "var(--amb)",
      });
    }
  }

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
      greeting={
          <span>
            Good evening,{" "}
            <span className="gold-text">
              Alex
            </span>
          </span>
        }
        title="Building Overview"
        titleClassName="text-[17px] font-semibold leading-[1.2] tracking-0 text-[var(--t2)]"
        subtitle="Riverside Towers & Maple Court — June 10, 2026"
        actions={
          <button className="gold-btn rounded-[11px] px-4 py-2 text-[13px] font-semibold transition-transform">
            + Request Work Order
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr] lg:grid-rows-[auto_auto]">
        <KpiCard
          hero
          variant="green"
          label="Resolution Rate"
          value={`${M.resolutionPct}%`}
          context={`${M.verified.length} of ${M.wos.length} jobs verified & closed`}
          sparkline={{ values: [60, 68, 74, 80, 85, M.resolutionPct], color: "var(--grn)", width: 220, height: 56 }}
          delta={<DeltaBadge cur={M.resolutionPct} prev={priorFor("resolutionPct")} unit=" pts" />}
        />
        <KpiCard
          variant="blue"
          label="Open Work Orders"
          value={String(M.openCount)}
          context="Across your 2 buildings"
          sparkline={{ values: [6, 5, 7, 6, 5, M.openCount], color: "var(--blu)" }}
          delta={<DeltaBadge cur={M.openCount} prev={priorFor("open")} higherIsBetter={false} />}
        />
        <KpiCard
          variant="amber"
          label="Urgent — Need Attention"
          value={String(M.urgentCount)}
          context="Emergency or urgent · target 0"
          sparkline={{ values: [2, 1, 2, 3, 2, M.urgentCount], color: "var(--amb)" }}
          delta={<DeltaBadge cur={M.urgentCount} prev={priorFor("urgent")} higherIsBetter={false} />}
        />
        <KpiCard
          variant="teal"
          label="Awaiting Your Review"
          value={String(M.pendingProofCount)}
          context="Proofs pending approval"
          sparkline={{ values: [1, 2, 1, 2, 1, M.pendingProofCount], color: "var(--teal)" }}
          delta={<DeltaBadge cur={M.pendingProofCount} prev={priorFor("pendingProof")} higherIsBetter={false} />}
        />
      </div>

      <Card
        title="Needs You Now"
        action={
          <button className="border-0 bg-transparent text-[13px] font-semibold text-[var(--gold)] transition-colors hover:text-[var(--gold-l)]">
            Review queue →
          </button>
        }
      >
        {attention.length === 0 ? (
          <EmptyState title="All caught up" line="No proofs or at-risk jobs need you right now." />
        ) : (
          <div>
            {attention.slice(0, 5).map((item, i) => (
              <AttentionItem key={i} color={item.color} text={item.text} sub={item.sub} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
