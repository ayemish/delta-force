"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cad } from "@/lib/formatting";
import type { Exception } from "@/lib/admin/exceptions";

type ExceptionGroupProps = {
  label: string;
  color: string;
  items: Exception[];
  defaultOpen?: boolean;
};

export default function ExceptionGroup({
  label,
  color,
  items,
  defaultOpen = false,
}: ExceptionGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const groupImpact = items.reduce((s, e) => s + (e.impact || 0), 0);

  return (
    <div className="flex flex-col" style={{ "--exc-c": color } as React.CSSProperties}>
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex w-full items-center gap-3 rounded-[var(--r2)] border border-[var(--bord)] border-l-[3px] border-l-[var(--exc-c)] bg-[var(--surf2)] px-5 py-4 text-left transition-colors duration-150 hover:bg-[var(--surf3)] hover:border-l-[var(--surf3)]"
      >
        {isOpen ? (
          <ChevronDown size={16} className="shrink-0 text-[var(--t3)]" />
        ) : (
          <ChevronRight size={16} className="shrink-0 text-[var(--t3)]" />
        )}
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <span className="text-[17px] font-bold" style={{ color }}>
          {label}
        </span>
        <span
          className="rounded-[20px] px-[11px] py-0.5 text-[13px] font-bold"
          style={{
            color,
            background: `color-mix(in srgb, ${color} 16%, transparent)`,
          }}
        >
          {items.length}
        </span>
        <span className="ml-auto text-[13px] font-semibold" style={{ color }}>
          ~{cad(groupImpact)} at risk
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="text-[13px] text-[var(--t3)] px-1 py-2">
              Nothing in this category.
            </div>
          ) : (
            items.map((x, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-[var(--r2)] border border-[var(--bord)] border-l-[3px] p-4"
                style={{
                  borderLeftColor: color,
                  background:
                    "linear-gradient(160deg,rgba(26,26,26,.82),rgba(20,20,20,.82))",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-[20px] shrink-0">{x.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2.5 mb-1">
                    <span className="text-[15px] font-bold text-[var(--t1)]">
                      {x.title}
                    </span>
                    <span className="text-[13px] font-bold" style={{ color }}>
                      ~{cad(x.impact)} at risk
                    </span>
                  </div>
                  <div
                    className="text-[13px] leading-[1.55] text-[var(--t2)] mb-2"
                    dangerouslySetInnerHTML={{ __html: x.detail }}
                  />
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--t3)]">
                    <span className="inline-flex rounded-[6px] border border-[var(--bord)] bg-[var(--surf3)] px-[9px] py-[3px] text-[11px] font-medium text-[var(--t2)]">
                      {x.meta}
                    </span>
                    <span>Owner: {x.owner}</span>
                  </div>
                </div>
                <button
                  className="shrink-0 self-start rounded-[11px] px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-150 hover:opacity-80"
                  style={{
                    color,
                    background: `color-mix(in srgb, ${color} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                  }}
                >
                  {x.action}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
