const styles: Record<string, { color: string; background: string }> = {
  verified:    { color: "var(--grn)",  background: "rgba(76,175,125,.14)" },
  conditional: { color: "var(--amb)",  background: "rgba(224,178,87,.14)" },
  blocked:     { color: "var(--red)",  background: "rgba(216,124,114,.14)" },
};

export default function VendorStatusPill({ status }: { status: string }) {
  const s = styles[status] ?? styles.blocked;
  return (
    <span
      className="inline-flex items-center gap-[6px] rounded-[20px] px-[13px] py-[6px] text-[13px] font-semibold tracking-[0.2px]"
      style={{ color: s.color, background: s.background }}
    >
      <span
        className="h-[7px] w-[7px] shrink-0 rounded-full"
        style={{ background: s.color }}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
