import type { EVProject, EVStage } from "@/lib/types";
import EvStageTrack from "./ev-stage-track";

const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
  on_track:        { label: "On Track",        color: "var(--grn)",  bg: "rgba(76,175,125,.14)"  },
  action_needed:   { label: "Action Needed",   color: "var(--amb)",  bg: "rgba(224,178,87,.16)"  },
  waiting_council: { label: "Awaiting Council",color: "var(--blu)",  bg: "rgba(111,168,199,.16)" },
  done:            { label: "Complete",         color: "var(--teal)", bg: "rgba(95,179,168,.14)"  },
  not_started:     { label: "Not Started",     color: "var(--t3)",   bg: "rgba(140,140,140,.12)" },
};

type Props = {
  name: string;
  project: EVProject;
  stages: EVStage[];
};

export default function EvProjectCard({ name, project, stages }: Props) {
  const meta      = statusMeta[project.status] ?? statusMeta.not_started;
  const stage     = stages[project.stage - 1];
  const nextStage = stages[project.stage]; // undefined when on last stage
  const isComplete = project.status === "done" || project.stage > stages.length;

  return (
    <div className="rounded-[var(--r2)] border border-[var(--bord)] bg-[linear-gradient(160deg,rgba(26,26,26,.82),rgba(20,20,20,.82))] p-6 shadow-[var(--sh1)] backdrop-blur-[8px] mb-3.5 transition-all duration-300 hover:shadow-[var(--sh2)]">

      {/* Card header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-[22px] font-bold tracking-[-0.4px] text-[var(--t1)]">{name}</span>
            {project.priority && (
              <span className="text-[11px] font-bold text-[var(--amb)] bg-[rgba(224,178,87,.16)] px-[9px] py-[3px] rounded-[6px]">
                ⚡ Priority
              </span>
            )}
          </div>
          <div className="text-[12px] text-[var(--t3)] mt-[4px]">Started {project.started}</div>
        </div>
        <span
          className="inline-flex items-center rounded-[20px] px-[13px] py-1.5 text-[13px] font-semibold tracking-[0.2px] whitespace-nowrap shrink-0"
          style={{ color: meta.color, background: meta.bg }}
        >
          {meta.label}
        </span>
      </div>

      {/* Stage track */}
      <EvStageTrack stages={stages} current={project.stage} status={project.status} />

      {/* Current stage description */}
      <div className="mt-4 rounded-[10px] border border-[var(--bord)] bg-[rgba(255,255,255,.025)] px-[18px] py-[14px]">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.6px] text-[var(--gold)]">
            {isComplete ? "Project complete" : `Stage ${project.stage} of 10`}
          </span>
          <span className="text-[15px] font-bold text-[var(--t1)]">
            {isComplete ? "Post-Installation handoff done" : stage?.name}
          </span>
        </div>
        <div className="text-[13px] text-[var(--t2)] leading-[1.55] mt-[8px]">{project.note}</div>
      </div>

      {/* Next step */}
      {!isComplete && (
        <div className="mt-3 px-[16px] py-[13px] bg-[rgba(201,161,74,.06)] border border-[rgba(201,161,74,.15)] rounded-[10px] leading-[1.6]">
          <span className="text-[11px] font-bold uppercase tracking-[0.6px] text-[var(--amb)] mr-2">
            Next Step
          </span>
          <span className="text-[13.5px] font-semibold text-[var(--t1)]">{project.next}</span>
          {nextStage && (
            <span className="text-[13px] text-[var(--t3)]">
              {" "}(advances to Stage {nextStage.n} — {nextStage.name})
            </span>
          )}
        </div>
      )}

      {/* Footer action */}
      <div className="flex justify-end mt-3.5">
        {isComplete ? (
          <span className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-[var(--teal)] bg-[rgba(95,179,168,.12)] border border-[rgba(95,179,168,.25)] px-[14px] py-2 rounded-[20px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            All 10 stages complete
          </span>
        ) : (
          <button className="gold-btn inline-flex items-center gap-[7px] rounded-[11px] px-[15px] py-[9px] text-[13px] font-semibold text-[#1A1305] transition-all hover:-translate-y-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1305" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {project.stage === stages.length ? "Complete project" : `Mark Stage ${project.stage} complete`}
          </button>
        )}
      </div>
    </div>
  );
}
