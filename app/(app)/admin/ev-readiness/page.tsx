import PageHeader from "@/components/shared/page-header";
import Card from "@/components/shared/card";
import KpiCard from "@/components/shared/kpi-card";
import EvProjectCard from "@/components/ev/ev-project-card";
import { EV_STAGES, EV_PROJECTS, EV_BUILDINGS } from "@/lib/data/ev";

export default function AdminEVReadinessPage() {
  const active = Object.entries(EV_PROJECTS)
    .map(([name, p]) => ({ name, p }))
    .sort((a, c) => (c.p.priority ? 1 : 0) - (a.p.priority ? 1 : 0) || a.p.stage - c.p.stage);

  const notStarted = EV_BUILDINGS.filter((b) => !EV_PROJECTS[b]);
  const priorities = active.filter((x) => x.p.priority);

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="EV Readiness"
        subtitle="EPR & EV-ready infrastructure across the portfolio — what to action next"
      />

      {/* Info banner */}
      <div className="mb-[22px] flex items-start gap-3 rounded-[var(--r2)] border border-[rgba(201,161,74,.25)] bg-[linear-gradient(135deg,rgba(201,161,74,.07),rgba(201,161,74,.02))] px-[18px] py-4 text-[12.5px] text-[var(--t2)] leading-[1.7]">
        <svg
          className="shrink-0 mt-[1px]"
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="13 2 4 14 11 14 10 22 19 9 12 9 13 2" />
        </svg>
        <div>
          Under BC&apos;s Strata Property Act, most stratas need an{" "}
          <strong className="text-[var(--gold)]">Electrical Planning Report (EPR)</strong>{" "}
          assessing capacity for EV charging and future electrification. Delta Force coordinates
          the full 10-stage process end-to-end — the portfolio and priorities are below.
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="mb-[22px] grid grid-cols-1 gap-[18px] sm:grid-cols-3">
        <KpiCard
          variant="green"
          label="Active Projects"
          value={String(active.length)}
          context="Buildings in the EV pipeline"
        />
        <KpiCard
          variant="amber"
          label="Need Action Now"
          value={String(priorities.length)}
          context="Flagged to prioritise"
        />
        <KpiCard
          variant="blue"
          label="Not Yet Started"
          value={String(notStarted.length)}
          context="Awaiting a PM request"
        />
      </div>

      {/* Prioritise Next */}
      {priorities.length > 0 && (
        <Card
          title="Prioritise Next"
          action={
            <span className="inline-flex items-center rounded-[6px] border border-[var(--bord)] bg-[var(--surf3)] px-[9px] py-[3px] text-[11px] font-medium text-[var(--t2)]">
              {priorities.length} flagged
            </span>
          }
        >
          <div>
            {priorities.map((it) => {
              const stg = EV_STAGES[it.p.stage - 1];
              return (
                <div
                  key={it.name}
                  className="flex items-start gap-3 border-b border-white/[0.045] py-[13px] last:border-0"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[rgba(224,178,87,.14)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--amb)" stroke="none">
                      <polygon points="13 2 4 14 11 14 10 22 19 9 12 9 13 2" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-[var(--t1)]">
                      {it.name}{" "}
                      <span className="text-[12px] font-normal text-[var(--t3)]">
                        · Stage {it.p.stage}, {stg?.name}
                      </span>
                    </div>
                    <div className="mt-[3px] text-[13px] text-[var(--amb)]">→ {it.p.next}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* All EV projects */}
      <div className="mt-6 mb-3 text-[12.5px] font-bold uppercase tracking-[0.8px] text-[var(--t3)]">
        All EV Projects
      </div>
      {active.map(({ name, p }) => (
        <EvProjectCard key={name} name={name} project={p} stages={EV_STAGES} />
      ))}

      {/* Not yet requested */}
      {notStarted.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.8px] text-[var(--t3)]">
            Not Yet Requested
          </div>
          <div className="flex flex-wrap gap-2.5">
            {notStarted.map((b) => (
              <span
                key={b}
                className="rounded-[20px] border border-[var(--bord)] bg-[var(--surf2)] px-4 py-[7px] text-[13px] text-[var(--t2)]"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-2 text-[12px] text-[var(--t3)]">
            These buildings can be initiated by their Property Manager from the PM EV Readiness tab.
          </div>
        </div>
      )}
    </div>
  );
}
