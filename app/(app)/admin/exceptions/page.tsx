"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import KpiCard from "@/components/shared/kpi-card";
import { ChevronDown } from "lucide-react";
import { cad } from "@/lib/formatting";
import { adminExceptions } from "@/lib/admin/exceptions";
import type { Exception, ExceptionSeverity } from "@/lib/admin/exceptions";

const groups: { sev: ExceptionSeverity; label: string; color: string }[] = [
  { sev: "high", label: "High severity", color: "var(--red)" },
  { sev: "med", label: "Medium severity", color: "var(--amb)" },
];

export default function AdminExceptionsPage() {
  const exc = adminExceptions.items;
  const totalImpact = exc.reduce((sum, e) => sum + (e.impact || 0), 0);
  const high = exc.filter((e) => e.sev === "high").length;
  const [open, setOpen] = useState<Record<ExceptionSeverity, boolean>>({
    high: true,
    med: false,
  });

  const toggle = (sev: ExceptionSeverity) => {
    setOpen((prev) => ({ ...prev, [sev]: !prev[sev] }));
  };

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
        {groups.map((g) => {
          const items = exc.filter((e) => e.sev === g.sev);
          const groupImpact = items.reduce((s, e) => s + (e.impact || 0), 0);
          const isOpen = open[g.sev];
          return (
            <div key={g.sev} className="rounded-[var(--r2)] border border-[var(--bord)] overflow-hidden">
              <button
                onClick={() => toggle(g.sev)}
                className="exc-group-hd flex w-full items-center gap-3 px-5 py-4 text-left"
                style={{ "--exc-c": g.color } as any}
              >
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: g.color, boxShadow: `0 0 8px ${g.color}` }} />
                <span className="exc-group-title" style={{ color: g.color }}>{g.label}</span>
                <span className="ml-2 rounded-[20px] px-2 py-0.5 text-[10.5px] font-bold text-[var(--t1)] bg-[var(--surf3)] border border-[var(--bord)]">
                  {items.length}
                </span>
                <span className="ml-auto text-[13px] font-semibold" style={{ color: g.color }}>
                  ~{cad(groupImpact)} at risk
                </span>
              </button>
              {isOpen && (
                <div className="exc-group-body border-t border-[var(--bord)] p-4">
                  {items.length === 0 ? (
                    <div className="text-[13px] text-[var(--t3)] px-1 py-2">Nothing in this category.</div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {items.map((x, i) => (
                        <div
                          key={i}
                          className="flex gap-4 rounded-[var(--r2)] border border-[var(--bord)] border-l-[3px] bg-[var(--surf)] p-4"
                          style={{ borderLeftColor: g.color }}
                        >
                          <div className="text-[20px] shrink-0">{x.icon}</div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-2.5 mb-1">
                              <span className="text-[15px] font-semibold text-[var(--t1)]">{x.title}</span>
                              <span className="text-[13px] font-bold text-[var(--amb)]">~{cad(x.impact)} at risk</span>
                            </div>
                            <div className="text-[13px] leading-[1.55] text-[var(--t2)] mb-2" dangerouslySetInnerHTML={{ __html: x.detail }} />
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--t3)]">
                              <span className="tag">{x.meta}</span>
                              <span>Owner: {x.owner}</span>
                            </div>
                          </div>
                          <button className="shrink-0 rounded-[11px] border border-[rgba(201,161,74,.3)] bg-[rgba(201,161,74,.12)] px-3 py-1.5 text-[12.5px] font-semibold text-[var(--gold)] transition-colors hover:bg-[rgba(201,161,74,.22)]">
                            {x.action}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
