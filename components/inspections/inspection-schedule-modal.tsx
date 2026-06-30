"use client";

import { useState } from "react";
import { ModalShell, ModalFooter } from "@/components/shared/modal-shell";
import { VENDORS } from "@/lib/data/vendors";
import { INSPECTION_BUILDINGS, INSPECTION_TYPES } from "@/lib/data/inspections";

type Props = {
  monthLabel: string;
  year: number;
  presetDay: number;
  daysInMonth: number;
  onClose: () => void;
  onSubmit: (building: string, vid: string, day: number, type: string) => void;
};

const selectClass =
  "w-full rounded-[10px] border border-[var(--bord2)] bg-[var(--surf3)] px-[13px] py-[11px] text-[14px] text-[var(--t1)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[rgba(201,161,74,.5)] focus:shadow-[0_0_0_3px_rgba(201,161,74,.1)]";
const labelClass =
  "mb-2 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[var(--t2)]";

export default function InspectionScheduleModal({
  monthLabel,
  year,
  presetDay,
  daysInMonth,
  onClose,
  onSubmit,
}: Props) {
  const [day, setDay] = useState(presetDay);
  const [building, setBuilding] = useState(INSPECTION_BUILDINGS[0]);
  const [vid, setVid] = useState(VENDORS[0]?.id ?? "");
  const [type, setType] = useState(INSPECTION_TYPES[0]);

  return (
    <ModalShell title={`Schedule Inspection — ${monthLabel} ${year}`} onClose={onClose}>
      <div className="px-6 py-6">
        <div className="mb-[18px]">
          <label className={labelClass}>Date</label>
          <select value={day} onChange={(e) => setDay(Number(e.target.value))} className={selectClass}>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>{monthLabel} {d}, {year}</option>
            ))}
          </select>
        </div>
        <div className="mb-[18px]">
          <label className={labelClass}>Building</label>
          <select value={building} onChange={(e) => setBuilding(e.target.value)} className={selectClass}>
            {INSPECTION_BUILDINGS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="mb-[18px]">
          <label className={labelClass}>Vendor</label>
          <select value={vid} onChange={(e) => setVid(e.target.value)} className={selectClass}>
            {VENDORS.map((v) => (
              <option key={v.id} value={v.id}>{v.name} ({v.trade})</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Inspection Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            {INSPECTION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <ModalFooter>
        <button
          onClick={onClose}
          className="rounded-[10px] border border-[var(--bord2)] bg-[var(--surf3)] px-[16px] py-[8px] text-[13px] font-semibold text-[var(--t2)] transition-colors hover:text-[var(--t1)]"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(building, vid, day, type)}
          className="rounded-[10px] bg-[var(--gold)] px-[16px] py-[8px] text-[13px] font-bold text-[#1A1305] transition-opacity hover:opacity-90"
        >
          Add to Calendar
        </button>
      </ModalFooter>
    </ModalShell>
  );
}
