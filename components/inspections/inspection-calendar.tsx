"use client";

import { useState } from "react";
import { useToast } from "@/components/toast-provider";
import { VENDORS } from "@/lib/data/vendors";
import {
  DEFAULT_TYPE_COLOR,
  INSPECTION_TODAY,
  TRADE_TYPE_COLORS,
  inspectionsForMonth,
} from "@/lib/data/inspections";
import { filterEventsForPM } from "@/lib/pm/inspections";
import InspectionDayModal from "@/components/inspections/inspection-day-modal";
import InspectionScheduleModal from "@/components/inspections/inspection-schedule-modal";
import type { CalEvent, ScheduledInspection } from "@/lib/types";

type Role = "admin" | "pm";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let SCHED_COUNTER = 0;

export default function InspectionCalendar({ role }: { role: Role }) {
  const { toast } = useToast();
  const [calMonth, setCalMonth] = useState(INSPECTION_TODAY.month);
  const [calYear, setCalYear] = useState(INSPECTION_TODAY.year);
  const [scheduled, setScheduled] = useState<ScheduledInspection[]>([]);

  // null = closed; number = open day-detail; "schedule" = open schedule modal
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [scheduleDay, setScheduleDay] = useState<number | null>(null);

  const isAdmin = role === "admin";

  function scopeEvents(events: CalEvent[]): CalEvent[] {
    return isAdmin ? events : filterEventsForPM(events);
  }

  const eventsByDay = inspectionsForMonth(calYear, calMonth, scheduled);

  function calShift(delta: number) {
    let m = calMonth + delta;
    let y = calYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setCalMonth(m);
    setCalYear(y);
  }

  function addInspection(building: string, vid: string, day: number, type: string) {
    const vendor = VENDORS.find((v) => v.id === vid) ?? null;
    const trade = vendor ? vendor.trade.split(" ")[0] : "Inspection";
    const [bg, tcolor] = TRADE_TYPE_COLORS[type] ?? DEFAULT_TYPE_COLOR;
    const id = `sched-${++SCHED_COUNTER}`;
    setScheduled((prev) => [
      ...prev,
      {
        id,
        year: calYear,
        month: calMonth,
        day,
        l: trade,
        c: bg,
        t: tcolor,
        b: building,
        vid,
        type,
        vendorName: vendor ? vendor.name : "Unassigned",
        added: true,
      },
    ]);
    setScheduleDay(null);
    toast(`Inspection added — ${building} on ${MONTH_ABBR[calMonth]} ${day}`, "ok");
  }

  function cancelInspection(schedId: string) {
    setScheduled((prev) => prev.filter((s) => s.id !== schedId));
    setOpenDay(null);
    toast("Inspection cancelled", "ok");
  }

  // ── Calendar grid ──
  const firstWeekday = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const isCurMonth =
    calYear === INSPECTION_TODAY.year && calMonth === INSPECTION_TODAY.month;

  const cells: { day: number | null; events: CalEvent[]; isToday: boolean }[] = [];
  for (let b = 0; b < firstWeekday; b++) cells.push({ day: null, events: [], isToday: false });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      events: scopeEvents(eventsByDay[d] ?? []),
      isToday: isCurMonth && d === INSPECTION_TODAY.day,
    });
  }

  const hint = isAdmin
    ? "Click any date to schedule an inspection. Click a date with an inspection to view details or cancel it."
    : "Click a date to view scheduled inspection details.";

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-[14px]">
        <button
          onClick={() => calShift(-1)}
          aria-label="Previous month"
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] border border-[var(--bord2)] bg-[var(--surf2)] text-[var(--t1)] transition-all duration-150 hover:border-[var(--gold)] hover:bg-[var(--surf3)] hover:text-[var(--gold)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="min-w-[230px] text-[26px] font-extrabold tracking-[-0.6px] text-[var(--t1)]">
          {MONTH_NAMES[calMonth]} {calYear}
        </div>
        <button
          onClick={() => calShift(1)}
          aria-label="Next month"
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[11px] border border-[var(--bord2)] bg-[var(--surf2)] text-[var(--t1)] transition-all duration-150 hover:border-[var(--gold)] hover:bg-[var(--surf3)] hover:text-[var(--gold)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="flex-1" />
        <select
          value={calMonth}
          onChange={(e) => setCalMonth(Number(e.target.value))}
          className="cursor-pointer rounded-[10px] border border-[var(--bord2)] bg-[var(--surf2)] px-[12px] py-[9px] text-[14px] text-[var(--t1)] outline-none focus:border-[rgba(201,161,74,.5)]"
        >
          {MONTH_NAMES.map((m, i) => (
            <option key={m} value={i}>{m}</option>
          ))}
        </select>
        <select
          value={calYear}
          onChange={(e) => setCalYear(Number(e.target.value))}
          className="cursor-pointer rounded-[10px] border border-[var(--bord2)] bg-[var(--surf2)] px-[12px] py-[9px] text-[14px] text-[var(--t1)] outline-none focus:border-[rgba(201,161,74,.5)]"
        >
          {[2025, 2026, 2027, 2028].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Hint */}
      <div className="mb-5 flex items-center gap-[9px] text-[14px] text-[var(--t2)]">
        <svg className="shrink-0 text-[var(--gold)]" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        {hint}
      </div>

      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-2">
        {DAY_LABELS.map((d) => (
          <div key={d} className="p-1 text-center text-[13px] font-bold uppercase tracking-[0.5px] text-[var(--t3)]">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell, i) => {
          if (cell.day === null) {
            return <div key={`empty-${i}`} className="min-h-[118px] rounded-[12px]" />;
          }
          const showPlus = isAdmin && cell.events.length === 0;
          return (
            <button
              key={cell.day}
              onClick={() => setOpenDay(cell.day)}
              className={`group flex min-h-[118px] flex-col rounded-[12px] border bg-[var(--surf2)] p-3 text-left transition-all duration-150 hover:-translate-y-[2px] hover:border-[var(--gold)] hover:bg-[var(--surf3)] hover:shadow-[var(--sh1)] ${
                cell.isToday
                  ? "border-[var(--gold)] shadow-[0_0_0_3px_rgba(201,161,74,.12)]"
                  : "border-[var(--bord)]"
              }`}
            >
              <div className={`mb-2 text-[16px] font-bold ${cell.isToday ? "text-[var(--gold)]" : "text-[var(--t2)]"}`}>
                {cell.day}
              </div>
              {cell.events.map((ev, ei) => (
                <div
                  key={ei}
                  className="mb-[5px] overflow-hidden text-ellipsis whitespace-nowrap rounded-[7px] px-[9px] py-1 text-[11px] font-semibold"
                  style={{ background: ev.c, color: ev.t }}
                >
                  {ev.added ? "★ " : ""}{ev.l}
                </div>
              ))}
              {showPlus && (
                <div className="mt-auto self-end text-[20px] leading-none text-[var(--t3)] opacity-0 transition-opacity duration-150 group-hover:opacity-60">
                  +
                </div>
              )}
            </button>
          );
        })}
      </div>

      {openDay !== null && (
        <InspectionDayModal
          day={openDay}
          monthLabel={MONTH_NAMES[calMonth]}
          year={calYear}
          events={scopeEvents(eventsByDay[openDay] ?? [])}
          isAdmin={isAdmin}
          onClose={() => setOpenDay(null)}
          onCancel={cancelInspection}
          onSchedule={() => {
            const d = openDay;
            setOpenDay(null);
            setScheduleDay(d);
          }}
        />
      )}

      {scheduleDay !== null && isAdmin && (
        <InspectionScheduleModal
          monthLabel={MONTH_NAMES[calMonth]}
          year={calYear}
          presetDay={scheduleDay}
          daysInMonth={daysInMonth}
          onClose={() => setScheduleDay(null)}
          onSubmit={addInspection}
        />
      )}
    </div>
  );
}
