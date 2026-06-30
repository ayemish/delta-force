import type { EVStage } from "@/lib/types";

const statusColor: Record<string, string> = {
  on_track:       "var(--grn)",
  action_needed:  "var(--amb)",
  waiting_council:"var(--blu)",
  done:           "var(--teal)",
  not_started:    "var(--bord2)",
};

type Props = {
  stages: EVStage[];
  current: number;
  status: string;
};

export default function EvStageTrack({ stages, current, status }: Props) {
  const activeColor = statusColor[status] ?? "var(--bord2)";

  return (
    <div className="flex w-full items-start py-2">
      {stages.map((st, i) => {
        const isDone = st.n < current;
        const isNow  = st.n === current;
        const col    = isDone ? "var(--grn)" : isNow ? activeColor : "rgba(255,255,255,.15)";
        const dotBg  = isDone ? "var(--grn)" : isNow ? activeColor : "transparent";

        return (
          <div key={st.n} className="flex flex-1 items-start">
            {/* node */}
            <div
              className="flex flex-col items-center gap-[6px] flex-1 min-w-0 text-center"
              title={`Stage ${st.n} — ${st.name}`}
            >
              <div
                className="w-[28px] h-[28px] rounded-full border-2 flex items-center justify-center transition-all duration-300"
                style={{ borderColor: col, background: dotBg }}
              >
                {isDone && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div
                className="text-[10px] font-semibold leading-[1.25] whitespace-pre-wrap"
                style={{ color: isNow ? activeColor : isDone ? "var(--t2)" : "var(--t3)" }}
              >
                {st.short}
              </div>
            </div>

            {/* connector line — vertically centered on the 28px dot */}
            {i < stages.length - 1 && (
              <div
                className="h-[2px] flex-1 min-w-[8px] mt-[13px] shrink-0"
                style={{ background: isDone ? "var(--grn)" : "rgba(255,255,255,.1)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
