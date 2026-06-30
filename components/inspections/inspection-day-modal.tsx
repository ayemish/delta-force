"use client";

import { ModalShell, ModalFooter } from "@/components/shared/modal-shell";
import type { CalEvent } from "@/lib/types";

type Props = {
  day: number;
  monthLabel: string;
  year: number;
  events: CalEvent[];
  isAdmin: boolean;
  onClose: () => void;
  onCancel: (schedId: string) => void;
  onSchedule: () => void;
};

export default function InspectionDayModal({
  day,
  monthLabel,
  year,
  events,
  isAdmin,
  onClose,
  onCancel,
  onSchedule,
}: Props) {
  return (
    <ModalShell title={`${monthLabel} ${day}, ${year}`} onClose={onClose}>
      <div className="px-6 py-6">
        {events.length > 0 ? (
          <>
            <div className="mb-[10px] text-[12px] font-bold uppercase tracking-[0.5px] text-[var(--t3)]">
              Scheduled ({events.length})
            </div>
            {events.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-white/[0.045] py-[13px] last:border-0"
              >
                <span className="h-[10px] w-[10px] shrink-0 rounded-[3px]" style={{ background: ev.t }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-[var(--t1)]">
                    {ev.l}
                    {ev.added && (
                      <span className="rounded-[3px] bg-[rgba(201,162,74,.15)] px-[5px] py-px text-[9px] font-bold text-[var(--gold)]">
                        ★ NEW
                      </span>
                    )}
                  </div>
                  <div className="mt-[2px] text-[12px] text-[var(--t3)]">
                    {ev.b}
                    {ev.type ? ` · ${ev.type}` : ""}
                    {ev.vendorName ? ` · ${ev.vendorName}` : ""}
                  </div>
                </div>
                {isAdmin && ev.added && ev.schedId && (
                  <button
                    onClick={() => onCancel(ev.schedId as string)}
                    className="rounded-[9px] border border-[var(--bord2)] bg-[var(--surf3)] px-[12px] py-[7px] text-[12px] font-semibold text-[var(--t2)] transition-colors hover:border-[var(--red)] hover:text-[var(--red)]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="py-[8px] text-[14px] text-[var(--t2)]">
            No inspections scheduled for this date.
          </div>
        )}
      </div>
      <ModalFooter>
        <button
          onClick={onClose}
          className="rounded-[10px] border border-[var(--bord2)] bg-[var(--surf3)] px-[16px] py-[8px] text-[13px] font-semibold text-[var(--t2)] transition-colors hover:text-[var(--t1)]"
        >
          Close
        </button>
        {isAdmin && (
          <button
            onClick={onSchedule}
            className="rounded-[10px] bg-[var(--gold)] px-[16px] py-[8px] text-[13px] font-bold text-[#1A1305] transition-opacity hover:opacity-90"
          >
            + Schedule inspection
          </button>
        )}
      </ModalFooter>
    </ModalShell>
  );
}
