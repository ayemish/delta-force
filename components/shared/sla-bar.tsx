export function SlaBar({ pct, label }: { pct: number; label: string }) {
  if (pct === 100 || label === "—") {
    return <span className="text-[10px] text-[var(--t3)]">—</span>;
  }
  const fill =
    pct > 75
      ? "linear-gradient(90deg,#6fd6a0,var(--grn))"
      : pct > 50
      ? "linear-gradient(90deg,#f0cd82,var(--amb))"
      : "linear-gradient(90deg,#e8a59d,var(--red))";
  return (
    <div>
      <div className="h-[6px] w-[84px] overflow-hidden rounded-[4px] bg-[var(--surf3)]">
        <div
          className="h-full rounded-[4px] transition-[width] duration-500"
          style={{ width: `${pct}%`, background: fill }}
        />
      </div>
      <div className="mt-[5px] font-mono text-[11px] text-[var(--t3)] tabular-nums">{label}</div>
    </div>
  );
}
