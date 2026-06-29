export default function OwnerBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-[5px] rounded-[7px] border border-[rgba(201,161,74,.22)] bg-[rgba(201,161,74,.1)] px-[10px] py-[3px] text-[11px] text-[var(--gold)]">
      👤 {name}
    </span>
  );
}
