"use client";

import { createContext, useCallback, useContext, useState, useRef } from "react";
import type { ReactNode } from "react";

type ToastVariant = "ok" | "warn" | "info";

type ToastItem = {
  id: number;
  msg: string;
  variant: ToastVariant;
  exiting: boolean;
};

type ToastContextValue = {
  toast: (msg: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const ICONS: Record<ToastVariant, string> = {
  ok: "✓",
  warn: "⚠",
  info: "ℹ",
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const toast = useCallback((msg: string, variant: ToastVariant = "ok") => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, msg, variant, exiting: false }]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 280);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[400] flex flex-col gap-[10px]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex min-w-[260px] max-w-[360px] items-start gap-[10px] rounded-[11px] border border-[var(--bord2)] px-[18px] py-[14px] text-[13.5px] font-medium text-[var(--t1)] shadow-[var(--sh3)] ${
              t.exiting ? "animate-[toastout_.25s_var(--ease)_forwards]" : "animate-[toastin_.3s_var(--ease)]"
            }`}
            style={{
              background: "linear-gradient(160deg, var(--surf3), var(--surf2))",
              borderLeft: `3px solid ${t.variant === "ok" ? "var(--grn)" : t.variant === "warn" ? "var(--amb)" : "var(--blu)"}`,
            }}
          >
            <span className="shrink-0" style={{ color: t.variant === "ok" ? "var(--grn)" : t.variant === "warn" ? "var(--amb)" : "var(--blu)" }}>
              {ICONS[t.variant]}
            </span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
