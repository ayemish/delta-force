import type { ReactNode } from "react";
import Sparkline from "./sparkline";

const variants = {
  green: { top: "linear-gradient(135deg, #6fd6a0, var(--grn))", color: "var(--grn)" },
  blue: { top: "linear-gradient(135deg, #9ccadf, var(--blu))", color: "var(--blu)" },
  amber: { top: "linear-gradient(135deg, #f0cd82, var(--amb))", color: "var(--amb)" },
  teal: { top: "linear-gradient(135deg, #8ad2c8, var(--teal))", color: "var(--teal)" },
  red: { top: "linear-gradient(135deg, #f5a9a0, var(--red))", color: "var(--red)" },
};

type KpiCardProps = {
  label: string;
  value: string;
  context?: string;
  valueClass?: string;
  contextClass?: string;
  sparkline?: { values: number[]; color: string; width?: number; height?: number };
  delta?: ReactNode;
  hero?: boolean;
  variant?: keyof typeof variants;
  onClick?: () => void;
};

export default function KpiCard({
  label,
  value,
  context,
  valueClass,
  contextClass,
  sparkline,
  delta,
  hero = false,
  variant = "green",
  onClick,
}: KpiCardProps) {
  const v = variants[variant];

  return (
    <div
      onClick={onClick}
      className={`group relative h-full cursor-pointer overflow-hidden rounded-[var(--r2)] border border-[var(--bord)] bg-[linear-gradient(160deg,rgba(26,26,26,.55),rgba(20,20,20,.55))] shadow-[var(--sh1)] backdrop-blur-[8px] transition-all duration-300 ease-[var(--ease)] hover:-translate-y-1 hover:border-[var(--bord2)] hover:shadow-[var(--sh2)] ${
        hero ? "row-span-2 flex flex-col justify-between p-7" : "p-6"
      }`}
    >
      <div
        className="absolute left-0 right-0 top-0 h-[2px] opacity-40 transition-all duration-300 group-hover:h-[3px] group-hover:opacity-100"
        style={{ background: v.top }}
      />
      <div>
        <div className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.4px] text-[var(--t2)]">
          {label}
        </div>
        <div
          className={`tabular-nums font-extrabold leading-none tracking-[-1.5px] ${
            valueClass ? valueClass : "text-[var(--t1)]"
          } ${hero ? "text-[54px] tracking-[-2px]" : "text-[40px]"}`}
        >
          {value}
        </div>
        {sparkline && !hero && (
          <div className="mt-3.5 h-[32px]">
            <Sparkline
              values={sparkline.values}
              color={sparkline.color}
              width={sparkline.width}
              height={sparkline.height}
            />
          </div>
        )}
        {context && (
          <div className={`mt-2.5 text-[12.5px] font-medium ${contextClass ? contextClass : "text-[var(--t3)]"}`}>{context}</div>
        )}
        {delta}
      </div>
      {sparkline && hero && (
        <div className="mt-4 h-[56px]">
          <Sparkline
            values={sparkline.values}
            color={sparkline.color}
            width={sparkline.width}
            height={sparkline.height}
          />
        </div>
      )}
    </div>
  );
}
