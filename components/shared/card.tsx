import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function Card({ title, action, children }: CardProps) {
  return (
    <div className="rounded-[var(--r2)] border border-[var(--bord)] bg-[linear-gradient(160deg,rgba(26,26,26,.82),rgba(20,20,20,.82))] p-6 shadow-[var(--sh1)] backdrop-blur-[8px] transition-all duration-300 ease-[var(--ease)] hover:shadow-[var(--sh2)]">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between border-b border-[var(--bord)] pb-4">
          {title && (
            <div className="text-[23px] font-bold tracking-[-0.4px] text-[var(--t1)]">{title}</div>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
