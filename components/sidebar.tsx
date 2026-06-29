"use client";

import {
  roleConfig,
  type RoleId,
  type NavItem,
} from "@/lib/role-config";
import { navIcon } from "@/lib/nav-icons";

type SidebarProps = {
  role: RoleId;
  activePage?: string;
  onNav?: (page: string) => void;
  open?: boolean;
  onClose?: () => void;
  onOpenSettings?: () => void;
};

const badgeClasses = (cls: "nb-red" | "nb-gold") =>
  cls === "nb-red"
    ? "bg-[var(--red)] text-[#1A0E0C]"
    : "border border-[rgba(201,161,74,.3)] bg-[rgba(201,161,74,.18)] text-[var(--gold)]";

export default function Sidebar({
  role,
  activePage = "dashboard",
  onNav,
  open,
  onClose,
  onOpenSettings,
}: SidebarProps) {
  const cfg = roleConfig[role];

  const handleNav = (page: string) => {
    onNav?.(page);
    onClose?.();
  };

  const NavContent = () => (
    <nav className="flex min-h-full flex-col">
      {cfg.nav.map((group) => (
        <div key={group.section}>
          <div className="px-[22px] pb-2 pt-[18px] text-[10px] font-bold uppercase tracking-[1.6px] text-[var(--t3)]">
            {group.section}
          </div>
          {group.items.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative mx-3 my-[2px] flex w-[calc(100%-24px)] items-center gap-[13px] rounded-[11px] border-0 bg-transparent px-[18px] py-[11px] text-left font-[inherit] text-[14px] font-medium transition-all duration-200 ease-[var(--ease)] ${
                  active
                    ? "bg-[linear-gradient(135deg,rgba(201,161,74,.16),rgba(201,161,74,.05))] text-[var(--gold)]"
                    : "text-[var(--t2)] hover:bg-[var(--surf3)] hover:text-[var(--t1)]"
                } ${item.ev ? "group overflow-hidden" : ""}`}
              >
                {active && (
                  <div
                    className="absolute left-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-r-[3px]"
                    style={{ background: "var(--gold-grad)" }}
                  />
                )}
                <span
                  className={`inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center text-[17px] [&>svg]:block ${
                    active ? "opacity-100" : "opacity-90"
                  }`}
                >
                  {navIcon(item.id)}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-auto rounded-[20px] px-2 py-0.5 text-[10.5px] font-bold ${badgeClasses(
                      item.badge.cls
                    )}`}
                  >
                    {item.badge.n}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
      <div className="mt-auto px-3 pb-2 pt-4">
        <button
          onClick={onOpenSettings}
          className="flex w-full items-center gap-[13px] rounded-[11px] border-0 bg-transparent px-[18px] py-[11px] text-left font-[inherit] text-[14px] font-medium text-[var(--t2)] transition-all duration-200 ease-[var(--ease)] hover:bg-[var(--surf3)] hover:text-[var(--t1)]"
        >
          <span className="inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center text-[17px] opacity-90 [&>svg]:block">
            {navIcon("settings")}
          </span>
          Settings
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="col-start-1 row-start-2 hidden h-full flex-col overflow-y-auto border-r border-[var(--bord)] bg-[rgba(18,18,18,.6)] py-2 backdrop-blur-[10px] lg:flex">
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-[100] w-[264px] flex-col overflow-y-auto border-r border-[var(--bord)] bg-[rgba(18,18,18,.6)] py-2 backdrop-blur-[10px] transition-transform duration-300 ease-[var(--ease)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NavContent />
      </aside>

      {/* Mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-[90] bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
