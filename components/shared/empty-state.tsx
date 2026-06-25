import { CheckCircle } from "lucide-react";

type EmptyStateProps = {
  title: string;
  line: string;
};

export default function EmptyState({ title, line }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-[420px] py-14 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(201,161,74,.25)] bg-[rgba(201,161,74,.1)] text-[var(--gold)]">
        <CheckCircle size={26} />
      </div>
      <div className="mb-2 text-[17px] font-bold text-[var(--t1)]">{title}</div>
      <div className="text-[14px] leading-[1.6] text-[var(--t2)]">{line}</div>
    </div>
  );
}
