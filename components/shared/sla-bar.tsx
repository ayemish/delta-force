export function SlaBar({ pct, label }: { pct: number; label: string }) {
  if (pct === 100 || label === "—") {
    return <span className="text-[10px] text-[var(--t3)]">—</span>;
  }
  const c = pct > 75 ? "sla-ok" : pct > 50 ? "sla-warn" : "sla-breach";
  return (
    <div>
      <div className="sla-wrap">
        <div className={`sla-fill ${c}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="sla-lbl">{label}</div>
    </div>
  );
}
