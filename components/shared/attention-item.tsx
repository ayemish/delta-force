type AttentionItemProps = {
  color: string;
  text: string;
  sub?: string;
  onClick?: () => void;
};

export default function AttentionItem({ color, text, sub, onClick }: AttentionItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 border-b border-[rgba(255,255,255,.045)] py-3 last:border-0"
    >
      <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
      <div className="flex-1">
        <div className="text-[14px] text-[var(--t1)]">{text}</div>
        {sub && <div className="text-[12px] text-[var(--t3)]">{sub}</div>}
      </div>
      {onClick && <span className="text-[13px] text-[var(--gold)]">→</span>}
    </div>
  );
}
