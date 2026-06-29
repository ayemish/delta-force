"use client";

import { Clock } from "lucide-react";
import type { WorkOrder, ProofPhoto } from "@/lib/types";
import { countChecks } from "@/lib/admin/proof-to-close";

const photoStyle: Record<string, { g1: string; g2: string; icon: string; tag: string; color: string }> = {
  before: { g1: "#2a1f1f", g2: "#1a1414", icon: "📷", tag: "BEFORE", color: "var(--red)" },
  after:  { g1: "#1f2a1f", g2: "#141a14", icon: "✅", tag: "AFTER",  color: "var(--grn)" },
  test:   { g1: "#1f2232", g2: "#141422", icon: "🧪", tag: "TEST",   color: "var(--blu)" },
  detail: { g1: "#2a2618", g2: "#1a1812", icon: "🔍", tag: "DETAIL", color: "var(--gold)" },
};

function PhotoThumb({ photo }: { photo: ProofPhoto }) {
  const st = photoStyle[photo.kind] ?? photoStyle.detail;
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-[8px] border border-white/70 p-[10px] transition-all duration-150 hover:scale-[1.02] hover:border-[var(--photo-color)]"
      style={{ background: `linear-gradient(135deg, ${st.g1}, ${st.g2})`, ['--photo-color' as any]: st.color }}
    >
      <div className="flex items-start justify-between">
        <span
          className="rounded-[3px] px-[6px] py-[2px] text-[9px] font-bold tracking-[0.5px]"
          style={{ color: st.color, background: "rgba(0,0,0,0.45)" }}
        >
          {st.tag}
        </span>
        <span className="text-[16px]">{st.icon}</span>
      </div>
      <div className="mt-auto">
        <div className="text-[11px] font-medium leading-[1.3] text-[var(--t1)]">{photo.label}</div>
        <div className="mt-[2px] text-[9px] text-[#999]">📍 {photo.ts}</div>
      </div>
    </div>
  );
}

type ProofCardProps = {
  wo: WorkOrder;
  onApprove: (id: string) => void;
  onRequestFix: (id: string) => void;
  onDetails: (id: string) => void;
};

export default function ProofCard({ wo, onApprove, onRequestFix, onDetails }: ProofCardProps) {
  if (!wo.proof) return null;

  const { passed, total } = countChecks(wo);
  const allOk = passed === total;
  const checksColor = allOk ? "var(--grn)" : "var(--amb)";
  const checksSummary = allOk ? `All ${total} checks passed` : `${passed} of ${total} checks passed`;

  const slaColor =
    wo.slaP <= 50 ? "var(--red)" : wo.slaP <= 75 ? "var(--amb)" : "var(--t2)";

  return (
    <div className="proof-card mb-[18px] overflow-hidden rounded-[var(--r2)] border border-[var(--bord)] bg-[var(--surf)] transition-colors hover:border-[var(--bord2)]">

      {/* Header — issue title + location, SLA clock */}
      <div className="proof-hd flex items-center justify-between gap-4 border-b border-[var(--bord)] bg-[var(--surf2)] px-[18px] py-4">
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-[var(--t1)]">{wo.issue}</div>
          <div className="mt-[3px] text-[12px] text-[var(--t3)]">
            {wo.building} · {wo.vendor}
          </div>
        </div>
        {wo.slaR !== "—" && (
          <div
            className="shrink-0 rounded-[7px] border px-[10px] py-1 font-mono text-[12px] font-semibold"
            style={{
              color: slaColor,
              borderColor: `color-mix(in srgb, ${slaColor} 40%, transparent)`,
              background: `color-mix(in srgb, ${slaColor} 8%, transparent)`,
            }}
          >
            <Clock size={11} className="mr-1 inline" />
            {wo.slaR}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="proof-body px-[18px] py-[18px]">

        {/* Photo strip */}
        {wo.proof.photos.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 text-[10px] font-semibold tracking-[0.6px] text-[var(--t3)] uppercase">
              Submitted Photos ({wo.proof.photos.length}) — Tap to enlarge
            </div>
            <div
              className="grid gap-[6px]"
              style={{
                gridTemplateColumns: `repeat(${Math.min(3, wo.proof.photos.length)}, 1fr)`,
                gridAutoRows: wo.proof.photos.length === 1 ? "420px" : wo.proof.photos.length === 2 ? "360px" : "280px",
              }}
            >
              {wo.proof.photos.map((photo, i) => (
                <PhotoThumb key={i} photo={photo} />
              ))}
            </div>
          </div>
        )}

        {/* Checks summary */}
        <div className="mb-4 text-[13px] font-semibold" style={{ color: checksColor }}>
          {checksSummary}
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--bord)] pt-[14px]">
          <button
            onClick={() => onApprove(wo.id)}
            className="rounded-[10px] border px-[15px] py-[9px] text-[12.5px] font-semibold transition-all hover:opacity-90"
            style={{ color: 'var(--grn)', borderColor: 'var(--grn)', background: 'rgba(76, 175, 125, 0.14)' }}
          >
            Approve
          </button>
          <button
            onClick={() => onRequestFix(wo.id)}
            className="rounded-[10px] border px-[15px] py-[9px] text-[12.5px] font-semibold transition-all hover:opacity-90"
            style={{ color: 'var(--gold)', borderColor: 'var(--gold)', background: 'rgba(201, 161, 74, 0.14)' }}
          >
            Request fix
          </button>
          <button
            onClick={() => onDetails(wo.id)}
            className="rounded-[11px] border border-[var(--bord)] bg-transparent px-[15px] py-[9px] text-[12.5px] font-semibold text-[var(--t1)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
