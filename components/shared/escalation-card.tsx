"use client";

import { Send } from "lucide-react";
import ElBadge from "@/components/shared/el-badge";
import OwnerBadge from "@/components/shared/owner-badge";
import VendorStatusPill from "@/components/shared/vendor-status-pill";
import { getNextFramework } from "@/lib/admin/escalations";
import { VENDORS } from "@/lib/data/vendors";
import type { Escalation } from "@/lib/admin/escalations";

type Props = {
  e: Escalation;
  onAdvance: (id: string) => void;
};

export default function EscalationCard({ e, onAdvance }: Props) {
  const fromV = VENDORS.find((v) => v.id === e.fromId) ?? null;
  const backupV = VENDORS.find((v) => v.id === e.backupId) ?? null;
  const next = getNextFramework(e.level);
  const atBackupWindow = e.slaPct >= 75;
  const slaPassed = e.slaPct >= 100;

  const slaFill = slaPassed ? "var(--red)" : atBackupWindow ? "var(--amb)" : "var(--blu)";

  return (
    <div className="mb-[12px] overflow-hidden rounded-[var(--r2)] border border-[var(--bord)] bg-[var(--surf)]">

      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 px-[18px] py-[16px]">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[8px]">
            <ElBadge level={e.level} />
            <div className="text-[15px] font-semibold text-[var(--t1)]">{e.issue}</div>
          </div>
          <div className="mt-[2px] text-[13px] text-[var(--t3)]">{e.b} · {e.trigger}</div>
        </div>
        <div className="flex shrink-0 items-center gap-[10px]">
          <div className="text-right">
            <div className="mb-[4px] text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--t3)]">Owner</div>
            <OwnerBadge name={e.owner} />
          </div>
          <button className="rounded-xl border border-[var(--bord2)] bg-transparent px-[16px] py-[7px] text-[13px] font-semibold text-[var(--t1)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]">
            Open
          </button>
        </div>
      </div>

      {/* Backup vendor panel */}
      <div className="mx-[18px] mb-[14px] rounded-[10px] border border-[var(--bord)] bg-[var(--surf2)] px-[16px] py-[15px]">

        {/* Assigned vendor row */}
        <div className="flex flex-wrap items-center gap-[10px] py-[5px]">
          <span className="w-[110px] shrink-0 text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--t3)]">Assigned vendor</span>
          <span className="text-[14px] font-semibold text-[var(--t1)]">{fromV?.name ?? e.from}</span>
          {fromV && <VendorStatusPill status={fromV.status} />}
          <span className="ml-auto text-[11px] text-[var(--red)]">⚠ Non-acknowledgment</span>
        </div>

        {/* SLA bar */}
        <div className="my-[10px]">
          <div className="mb-[6px] flex justify-between text-[12px] text-[var(--t2)]">
            <span>{e.slaWindow} SLA</span>
            <span style={{ color: atBackupWindow ? "var(--amb)" : "var(--t2)" }}>
              {e.slaPct}% elapsed · {e.slaRemaining} left
            </span>
          </div>
          <div className="relative h-[8px] overflow-visible rounded-[5px] bg-[var(--surf3)]">
            <div
              className="h-full rounded-[5px] transition-[width] duration-[400ms]"
              style={{ width: `${Math.min(100, e.slaPct)}%`, background: slaFill }}
            />
            <div className="absolute top-[-3px] h-[14px] w-[2px] rounded-[2px] bg-[var(--t1)] opacity-50" style={{ left: "75%" }} />
          </div>
        </div>

        {/* Backup vendor row */}
        <div className="flex flex-wrap items-center gap-[10px] py-[5px]">
          <span className="w-[110px] shrink-0 text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--t3)]">Backup vendor</span>
          <span className="text-[14px] font-semibold text-[var(--t1)]">{backupV?.name ?? "—"}</span>
          {backupV && (
            <span className="text-[12px] text-[var(--t3)]">{backupV.score}/100 · {backupV.sla}% SLA</span>
          )}
        </div>

        {/* Standby state line */}
        {e.backupState === "assigned" ? (
          <div className="mt-[4px] flex items-center gap-[8px] rounded-[8px] bg-[rgba(76,175,125,.1)] px-[12px] py-[9px] text-[13px] font-medium text-[var(--grn)]">
            ✓ {e.owner} accepted &amp; assigned — now the active vendor.
          </div>
        ) : e.backupState === "external" ? (
          <div className="mt-[4px] flex items-center gap-[8px] rounded-[8px] bg-[rgba(224,178,87,.1)] px-[12px] py-[9px] text-[13px] font-medium text-[var(--amb)]">
            ⚠ All chain backups declined — Command Center sourcing externally via RFP.
          </div>
        ) : (
          <div className="mt-[4px] flex items-center gap-[8px] rounded-[8px] bg-[rgba(201,162,74,.08)] px-[12px] py-[9px] text-[13px] font-medium text-[var(--gold)]">
            <span className="esc-pulse h-[9px] w-[9px] shrink-0 rounded-full bg-[var(--gold)]" />
            Offered to {backupV?.name ?? "backup"} — awaiting accept/decline{atBackupWindow ? " (past 75% window)" : ""}. Auto-assigns if the {e.slaWindow} window passes.
          </div>
        )}
      </div>

      {/* Next step banner */}
      {e.resolved ? (
        <div className="mx-[18px] mb-[18px] flex items-center gap-[8px] rounded-[10px] border border-[rgba(76,175,125,.22)] bg-[rgba(76,175,125,.08)] px-[16px] py-[13px] text-[13px] font-semibold text-[var(--grn)]">
          ✓ Notification sent — {next?.title ?? "escalated"}
        </div>
      ) : next ? (
        <div className="mx-[18px] mb-[18px] flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[rgba(216,124,114,.2)] bg-[rgba(216,124,114,.06)] px-[16px] py-[13px] text-[13.5px] text-[var(--t1)]">
          <div>
            <span className="mr-[8px] text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--amb)]">Next step</span>
            Escalate to <strong>{next.title}</strong> — {next.actions[0]}.
          </div>
          <button
            onClick={() => onAdvance(e.id)}
            className="flex shrink-0 items-center gap-[6px] whitespace-nowrap rounded-[10px] bg-[var(--gold)] px-[14px] py-[8px] text-[12.5px] font-bold text-[#1A1305] transition-opacity hover:opacity-90"
          >
            <Send size={12} />
            Send {next.title.split(":")[0]} notice
          </button>
        </div>
      ) : (
        <div className="mx-[18px] mb-[18px] flex items-center gap-[8px] rounded-[10px] border border-[rgba(216,124,114,.25)] bg-[rgba(216,124,114,.06)] px-[16px] py-[13px] text-[13.5px] text-[var(--t1)]">
          <span className="mr-[8px] text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--red)]">Highest level</span>
          Director already engaged — crisis protocol active. No further escalation tier.
        </div>
      )}
    </div>
  );
}
