import { ChevronUp, ChevronDown, Minus } from "lucide-react";

type DeltaBadgeProps = {
  cur: number;
  prev?: number;
  higherIsBetter?: boolean;
  unit?: string;
  formatter?: (n: number) => string;
};

export default function DeltaBadge({
  cur,
  prev,
  higherIsBetter = true,
  unit = "",
  formatter,
}: DeltaBadgeProps) {
  if (prev === undefined || prev === null) return null;

  const diff = cur - prev;
  const flat = diff === 0;
  const good = higherIsBetter ? diff > 0 : diff < 0;
  const colorClass = flat
    ? "text-[var(--t3)]"
    : good
      ? "text-[var(--grn)]"
      : "text-[var(--red)]";
  const mag = formatter ? formatter(Math.abs(diff)) : `${Math.abs(diff)}${unit}`;
  const word = flat ? "no change" : diff > 0 ? `+${mag}` : `−${mag}`;
  const TrendIcon = flat ? Minus : diff > 0 ? ChevronUp : ChevronDown;

  return (
    <div className={`mt-3 flex items-center gap-1.5 text-[12.5px] font-medium ${colorClass}`}>
      <TrendIcon className="h-4 w-4" />
      <span>{word} vs. last month</span>
    </div>
  );
}
