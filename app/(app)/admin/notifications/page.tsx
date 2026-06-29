"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import NotificationItem from "@/components/shared/notification-item";
import { useToast } from "@/components/toast-provider";
import { NOTIFS } from "@/lib/data/notifications";
import type { Notification } from "@/lib/data/notifications";

export default function AdminNotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(
    NOTIFS.filter((n) => n.roles.includes("admin"))
  );
  const { toast } = useToast();

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, r: true })));
    toast("All notifications marked as read", "ok");
  }

  const unreadCount = notifs.filter((n) => !n.r).length;

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Notifications"
        subtitle="Alerts with delivery + read receipts (✓✓ = recipient has seen it)"
        actions={
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="rounded-xl border border-[var(--bord2)] bg-transparent px-[16px] py-[8px] text-[13px] font-semibold text-[var(--t1)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Mark all read
          </button>
        }
      />

      {/* Notifications list */}
      <div className="overflow-hidden rounded-[var(--r2)] border border-[var(--bord)] bg-[var(--surf)]">
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(201,161,74,.25)] bg-[rgba(201,161,74,.08)] text-[24px]">
              🔔
            </div>
            <div className="mb-2 text-[17px] font-bold text-[var(--t1)]">You are all caught up</div>
            <div className="max-w-[300px] text-[13px] leading-[1.6] text-[var(--t2)]">
              No new notifications. Alerts about jobs, proofs, and escalations will appear here.
            </div>
          </div>
        ) : (
          notifs.map((n) => <NotificationItem key={n.id} notif={n} />)
        )}
      </div>
    </div>
  );
}
