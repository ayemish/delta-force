import { ChevronUp, ChevronDown } from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import KpiCard from "@/components/shared/kpi-card";
import Card from "@/components/shared/card";
import AttentionItem from "@/components/dashboard/attention-item";
import EmptyState from "@/components/shared/empty-state";
import { adminDashboard } from "@/lib/admin/dashboard";
import { getTimeBasedGreeting } from "@/lib/greeting";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        greeting={
          <span>
            {getTimeBasedGreeting()},{" "}
            <span className="gold-text">Marcus</span>
          </span>
        }
        title="Command Center"
        titleClassName="text-[17px] font-semibold leading-[1.2] tracking-0 text-[var(--t2)]"
        subtitle="Portfolio at a glance — June 10, 2026"
        actions={
          <div className="flex gap-2">
            <button className="rounded-[11px] border border-[var(--bord)] bg-transparent px-4 py-2 text-[13px] font-semibold text-[var(--t1)] transition-colors hover:bg-[var(--surf3)]">
              ⬇ Export
            </button>
            <button className="gold-btn rounded-[11px] px-4 py-2 text-[13px] font-semibold transition-transform">
              + New Work Order
            </button>
          </div>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr] lg:grid-rows-[auto_auto]">
        {adminDashboard.kpiCards.map((kpi) => (
          <KpiCard
            key={kpi.id}
            hero={kpi.hero}
            variant={kpi.variant}
            label={kpi.label}
            value={kpi.value}
            context={kpi.context}
            sparkline={kpi.sparkline}
            delta={
              kpi.delta && (
                <div className={`mt-3 flex items-center gap-1.5 text-[12.5px] font-medium ${kpi.delta.color}`}>
                  {kpi.delta.trend === "up" && <ChevronUp className="h-4 w-4" />}
                  {kpi.delta.trend === "down" && <ChevronDown className="h-4 w-4" />}
                  {kpi.delta.text}
                </div>
              )
            }
          />
        ))}
      </div>

      <Card
        title="Needs You Now"
        action={
          <button className="border-0 bg-transparent text-[13px] font-semibold text-[var(--gold)] transition-colors hover:text-[var(--gold-l)]">
            Exception inbox →
          </button>
        }
      >
        {adminDashboard.attentionItems.length === 0 ? (
          <EmptyState title="All clear" line="Nothing needs your attention right now." />
        ) : (
          <div>
            {adminDashboard.attentionItems.slice(0, 5).map((item, index) => (
              <AttentionItem key={index} color={item.color} text={item.text} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
