const levelBg: Record<number, string> = {
  1: "rgba(111,168,199,.16)",
  2: "rgba(224,178,87,.16)",
  3: "rgba(216,124,114,.16)",
  4: "rgba(216,124,114,.22)",
};

const levelColor: Record<number, string> = {
  1: "var(--blu)",
  2: "var(--amb)",
  3: "var(--red)",
  4: "#e8a59d",
};

export default function ElBadge({ level }: { level: number }) {
  return (
    <span
      className="inline-flex items-center rounded-[6px] px-[9px] py-[3px] text-[10.5px] font-bold"
      style={{
        color: levelColor[level] ?? "var(--t3)",
        background: levelBg[level] ?? "transparent",
      }}
    >
      L{level}
    </span>
  );
}
