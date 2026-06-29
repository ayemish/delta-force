"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/toast-provider";

type Props = {
  open: boolean;
  onClose: () => void;
  role: string;
};

export default function SettingsModal({ open, onClose, role }: Props) {
  const [notifPref, setNotifPref] = useState("All alerts");
  const [slaPref, setSlaPref] = useState("Countdown (default)");
  const backdropRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleSave() {
    toast("Settings saved", "ok");
    onClose();
  }

  const roleLabel =
    role === "admin" ? "Admin" : role === "pm" ? "Property Manager" : "Vendor";

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/55 p-6 backdrop-blur-[10px]"
      style={{ animation: "fadein .2s" }}
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      <div
        className="relative w-full max-w-[500px] overflow-y-auto rounded-[var(--r3)] border border-[var(--bord2)] bg-[var(--surf2)] shadow-[var(--sh3)]"
        style={{ maxHeight: "86vh", animation: "modalin .3s var(--ease)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top shimmer line */}
        <div className="pointer-events-none absolute left-6 right-6 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)] z-[1]" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--bord)] px-6 py-[22px]">
          <span className="text-[18px] font-bold tracking-[-0.3px] text-[var(--t1)]">Settings</span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--t2)] transition-colors hover:bg-[var(--surf3)] hover:text-[var(--t1)]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Active Role */}
          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[var(--t2)]">
              Active Role
            </label>
            <input
              value={roleLabel}
              disabled
              className="w-full rounded-[10px] border border-[var(--bord2)] bg-[var(--surf3)] px-[13px] py-[11px] text-[14px] text-[var(--t1)] opacity-60 outline-none"
            />
          </div>

          {/* Context */}
          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[var(--t2)]">
              Context
            </label>
            <input
              value="Command Center"
              disabled
              className="w-full rounded-[10px] border border-[var(--bord2)] bg-[var(--surf3)] px-[13px] py-[11px] text-[14px] text-[var(--t1)] opacity-60 outline-none"
            />
          </div>

          {/* Notifications */}
          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[var(--t2)]">
              Notifications
            </label>
            <select
              value={notifPref}
              onChange={(e) => setNotifPref(e.target.value)}
              className="w-full rounded-[10px] border border-[var(--bord2)] bg-[var(--surf3)] px-[13px] py-[11px] text-[14px] text-[var(--t1)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[rgba(201,161,74,.5)] focus:shadow-[0_0_0_3px_rgba(201,161,74,.1)]"
            >
              <option>All alerts</option>
              <option>Escalations only</option>
              <option>Muted</option>
            </select>
          </div>

          {/* SLA clock display */}
          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.5px] text-[var(--t2)]">
              SLA clock display
            </label>
            <select
              value={slaPref}
              onChange={(e) => setSlaPref(e.target.value)}
              className="w-full rounded-[10px] border border-[var(--bord2)] bg-[var(--surf3)] px-[13px] py-[11px] text-[14px] text-[var(--t1)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[rgba(201,161,74,.5)] focus:shadow-[0_0_0_3px_rgba(201,161,74,.1)]"
            >
              <option>Countdown (default)</option>
              <option>Deadline timestamp</option>
            </select>
          </div>

          {/* Note */}
          <p className="mt-1 text-[11px] leading-[1.5] text-[var(--t3)]">
            Role and permission scope are managed by Command Center and cannot be changed here. Use the role switcher in the top bar to preview other roles.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-[10px] border-t border-[var(--bord)] px-6 py-[18px]">
          <button
            onClick={handleSave}
            className="rounded-[10px] bg-[var(--gold)] px-[16px] py-[8px] text-[13px] font-bold text-[#1A1305] transition-opacity hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
