"use client";

import { useEffect, useRef, useState } from "react";
import {
  roles,
  roleConfig,
  type RoleId,
} from "@/lib/role-config";
import { Search, TriangleAlert, Bell } from "lucide-react";

type TopbarProps = {
  role: RoleId;
  onRoleChange?: (role: RoleId) => void;
  onMenuClick?: () => void;
};

export default function Topbar({ role, onRoleChange, onMenuClick }: TopbarProps) {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const cfg = roleConfig[role];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className="relative z-[100] col-span-full flex h-16 items-center gap-[18px] border-b border-[var(--glass-bord)] px-[22px] backdrop-blur-[28px] backdrop-saturate-[180%]"
      style={{ background: "var(--glass-fill)" }}
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--glass-hi)_30%,var(--glass-hi)_70%,transparent)]" />

      <div className="flex w-auto shrink-0 items-center gap-[11px] lg:w-[242px]">
        <button
          className="block shrink-0 cursor-pointer border-0 bg-transparent px-1 py-0 font-[inherit] text-[22px] leading-none text-[var(--t1)] lg:hidden"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <div
          className="flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center rounded-[11px] text-[13px] font-extrabold tracking-[.5px] text-[#1A1305] shadow-[0_4px_14px_rgba(201,161,74,.3)]"
          style={{ background: "var(--gold-grad)" }}
        >
          DF
        </div>
        <div>
          <div className="text-[15px] font-extrabold leading-[1.05] tracking-[.4px] text-[var(--t1)]">
            DELTA FORCE
          </div>
          <div className="mt-[3px] text-[9.5px] font-semibold uppercase leading-none tracking-[2px] text-[var(--gold)]">
            {cfg.context}
          </div>
        </div>
      </div>

      <div className="relative hidden max-w-[420px] flex-1 lg:flex">
        <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[14px] text-[var(--t3)]">
          <Search size={15} />
        </span>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search jobs, vendors, properties…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="peer w-full rounded-[11px] border border-[var(--bord)] bg-[var(--surf2)] py-[10px] pr-[14px] pl-[38px] font-[inherit] text-[13.5px] text-[var(--t1)] outline-none transition-all duration-200 ease-[var(--ease)] placeholder:text-[var(--t3)] focus:border-[rgba(201,161,74,.5)] focus:bg-[var(--surf3)] focus:shadow-[0_0_0_4px_rgba(201,161,74,.08)]"
        />
        <span className="pointer-events-none absolute right-[12px] top-1/2 flex h-[20px] w-[20px] -translate-y-1/2 items-center justify-center rounded-[5px] border border-[var(--bord2)] font-['JetBrains_Mono',monospace] text-[11px] text-[var(--t3)] peer-focus:opacity-0">
          /
        </span>
      </div>

      <div className="hidden gap-[2px] rounded-[11px] border border-[var(--bord)] bg-[var(--surf2)] p-1 lg:flex">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => onRoleChange?.(r.id)}
            style={{
              background: role === r.id ? "var(--gold-grad)" : undefined,
            }}
            className={`cursor-pointer rounded-lg border-0 bg-transparent px-[15px] py-[7px] font-[inherit] text-[12.5px] transition-all duration-200 ease-[var(--ease)] ${
              role === r.id
                ? "font-bold text-[#1A1305] shadow-[0_2px_8px_rgba(201,161,74,.3)]"
                : "font-medium text-[var(--t2)] hover:text-[var(--t1)]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-4">
        {cfg.showEscIcon && (
          <span
            className="relative cursor-pointer text-[18px] text-[var(--t2)] transition-[color,transform] duration-200 ease-[var(--ease)] hover:-translate-y-px hover:text-[var(--gold)]"
            title="Escalations"
          >
            <TriangleAlert size={19} />
            <span className="absolute -top-[3px] -right-[3px] h-2 w-2 rounded-full border-2 border-[var(--surf)] bg-[var(--red)]" />
          </span>
        )}
        <span
          className="relative cursor-pointer text-[18px] text-[var(--t2)] transition-[color,transform] duration-200 ease-[var(--ease)] hover:-translate-y-px hover:text-[var(--gold)]"
          title="Notifications"
        >
          <Bell size={19} />
          <span className="absolute -top-[3px] -right-[3px] h-2 w-2 rounded-full border-2 border-[var(--surf)] bg-[var(--red)]" />
        </span>
        <span
          className={`rounded-[20px] px-[13px] py-[5px] text-[10px] font-bold uppercase tracking-[1px] ${cfg.pillStyle}`}
        >
          {cfg.label}
        </span>
        <div
          className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full text-[13px] font-bold transition-transform duration-200 ease-[var(--ease)] hover:scale-105 ${cfg.avatarStyle}`}
        >
          {cfg.avatarInitial}
        </div>
      </div>
    </header>
  );
}
