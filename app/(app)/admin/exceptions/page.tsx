"use client";

import PageHeader from "@/components/shared/page-header";
import KpiCard from "@/components/shared/kpi-card";
import ExceptionGroup from "@/components/shared/exception-group";
import { cad } from "@/lib/formatting";
import { adminExceptions } from "@/lib/admin/exceptions";
import type { ExceptionSeverity } from "@/lib/admin/exceptions";

const groups: { sev: ExceptionSeverity; label: string; color: string }[] = [
  { sev: "high", label: "High severity", color: "var(--red)" },
  { sev: "med", label: "Medium severity", color: "var(--amb)" },
];

export default function AdminExceptionsPage() {
  const exc = adminExceptions.items;
  const totalImpact = exc.reduce((sum, e) => sum + (e.impact || 0), 0);
  const high = exc.filter((e) => e.sev === "high").length;
  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Exception Inbox"
        subtitle="Vendors and work orders needing a human this week — surfaced automatically per SOP thresholds"
        actions={
          <button className="rounded-[11px] border border-[var(--bord)] bg-transparent px-4 py-2 text-[13px] font-semibold text-[var(--t1)] transition-colors hover:bg-[var(--surf3)]">
            ⬇ Export
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[180px]">
          <KpiCard label="Est. Exposure If Unaddressed" value={cad(totalImpact)} variant="red" />
        </div>
        <div className="flex-1 min-w-[180px]">
          <KpiCard label="Need Action Now" value={high.toString()} context="High-severity items" variant="red" valueClass="text-[var(--red)]" contextClass="text-[var(--red)]" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {groups.map((g) => (
          <ExceptionGroup
            key={g.sev}
            label={g.label}
            color={g.color}
            items={exc.filter((e) => e.sev === g.sev)}
            defaultOpen={false}
          />
        ))}
      </div>
    </div>
  );
}
