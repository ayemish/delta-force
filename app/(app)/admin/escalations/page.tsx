"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import EscalationCard from "@/components/escalations/escalation-card";
import ElBadge from "@/components/escalations/el-badge";
import { getActiveEscalations, getEscalationFramework } from "@/lib/admin/escalations";

export default function AdminEscalationsPage() {
  const [escalations, setEscalations] = useState(getActiveEscalations);
  const fw = getEscalationFramework();

  function handleAdvance(id: string) {
    setEscalations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, resolved: true } : e))
    );
  }

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Escalations"
        subtitle="Level 1–4 tracking — automatic ownership transfer"
      />

      {/* Section header */}
      <div className="mb-[20px]">
        <h2 className="text-[20px] font-extrabold tracking-[-0.4px] text-[var(--t1)]">Active escalations</h2>
        <div className="text-[14px] text-[var(--t2)]">
          {escalations.length} open · jobs that need authority above the assigned owner.
        </div>
      </div>

      {/* Cards or empty state */}
      {escalations.length === 0 ? (
        <div className="mx-auto max-w-[420px] py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(76,175,125,.25)] bg-[rgba(76,175,125,.1)] text-[var(--grn)]">
            <AlertTriangle size={26} />
          </div>
          <div className="mb-2 text-[17px] font-bold text-[var(--t1)]">No active escalations</div>
          <div className="text-[14px] leading-[1.6] text-[var(--t2)]">
            All jobs are within SLA. Escalations appear here automatically when triggered.
          </div>
        </div>
      ) : (
        <div>
          {escalations.map((e) => (
            <EscalationCard key={e.id} e={e} onAdvance={handleAdvance} />
          ))}
        </div>
      )}

      {/* Escalation levels legend */}
      <div className="mt-[24px] rounded-[var(--r2)] border border-[var(--bord)] bg-[var(--surf)] px-[20px] py-[18px]">
        <div className="mb-[12px] text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--t3)]">Escalation levels</div>
        {fw.map((f, i) => (
          <div
            key={f.level}
            className={`flex items-center gap-[12px] py-[8px] ${i < fw.length - 1 ? "border-b border-[rgba(255,255,255,.045)]" : ""}`}
          >
            <ElBadge level={f.level} />
            <span className="text-[14px] text-[var(--t1)]">{f.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
