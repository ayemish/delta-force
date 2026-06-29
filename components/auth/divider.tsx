export default function Divider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--bord)]" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-[var(--surf2)] px-3 text-[var(--t3)] font-medium uppercase tracking-[0.5px]">
          Or
        </span>
      </div>
    </div>
  );
}
