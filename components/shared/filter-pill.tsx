type FilterPillProps = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`fpill ${active ? "active" : ""}`}
    >
      {label}
    </button>
  );
}
