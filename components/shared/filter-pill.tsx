type FilterPillProps = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[20px] border px-4 py-2 text-[12.5px] font-medium transition-all duration-200 cursor-pointer font-[inherit] ${
        active
          ? "border-[rgba(201,161,74,.4)] bg-[rgba(201,161,74,.12)] text-[var(--gold)] font-semibold"
          : "border-[var(--bord)] bg-[var(--surf2)] text-[var(--t2)] hover:border-[var(--bord2)] hover:text-[var(--t1)]"
      }`}
    >
      {label}
    </button>
  );
}
