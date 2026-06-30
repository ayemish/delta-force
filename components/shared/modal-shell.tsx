"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

// Shared modal scaffolding (mirrors components/settings-modal.tsx).
export function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

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
        <div className="pointer-events-none absolute left-6 right-6 top-0 z-[1] h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)]" />
        <div className="flex items-center justify-between border-b border-[var(--bord)] px-6 py-[22px]">
          <span className="text-[18px] font-bold tracking-[-0.3px] text-[var(--t1)]">{title}</span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--t2)] transition-colors hover:bg-[var(--surf3)] hover:text-[var(--t1)]"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end gap-[10px] border-t border-[var(--bord)] px-6 py-[18px]">
      {children}
    </div>
  );
}
