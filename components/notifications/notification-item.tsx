import type { Notification } from "@/lib/data/notifications";

type Props = {
  notif: Notification;
};

export default function NotificationItem({ notif: n }: Props) {
  return (
    <div
      className="flex gap-[13px] border-b border-[rgba(255,255,255,.045)] px-[20px] py-[16px] transition-colors last:border-0 hover:bg-[rgba(255,255,255,.02)]"
      style={{ background: n.r ? "transparent" : "rgba(201,161,74,.03)" }}
    >
      {/* Icon */}
      <div
        className="mt-[1px] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[11px] text-[16px]"
        style={{ background: n.ic, color: n.it }}
      >
        {n.icon}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="mb-[3px] text-[12px] leading-[1.5] text-[var(--t1)]">{n.msg}</div>
        <div className="text-[10px] text-[var(--t3)]">{n.t}</div>

        {/* Read receipts (admin only) */}
        {n.recipients && n.recipients.length > 0 && (
          <div className="mt-[6px] flex flex-wrap gap-[10px] border-t border-[rgba(255,255,255,.04)] pt-[6px]">
            {n.recipients.map((rc, i) => (
              rc.seen ? (
                <span key={i} className="inline-flex items-center gap-[3px] text-[10px] text-[var(--grn)]">
                  ✓✓ {rc.name} · seen {rc.at}
                </span>
              ) : (
                <span key={i} className="inline-flex items-center gap-[3px] text-[10px] text-[var(--t3)]">
                  ✓ {rc.name} · delivered, not seen
                </span>
              )
            ))}
          </div>
        )}
      </div>

      {/* Unread dot */}
      {!n.r && (
        <div
          className="mt-[8px] h-[8px] w-[8px] shrink-0 rounded-full bg-[var(--gold)]"
          style={{ boxShadow: "0 0 8px rgba(201,161,74,.5)" }}
        />
      )}
    </div>
  );
}
