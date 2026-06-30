"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import Card from "@/components/shared/card";
import WorkOrderCard from "@/components/work-orders/work-order-card";
import FilterPill from "@/components/work-orders/filter-pill";
import EmptyState from "@/components/shared/empty-state";
import {
  getAdminWorkOrders,
  getAdminWorkOrderCounts,
  filterAdminWorkOrders,
  type AdminWorkOrderFilter,
} from "@/lib/admin/work-orders";

const filters: { id: AdminWorkOrderFilter; label: string }[] = [
  { id: "emergency", label: "Emergency" },
  { id: "urgent", label: "Urgent" },
  { id: "routine", label: "Routine" },
  { id: "escalated", label: "Escalated" },
  { id: "pending", label: "Awaiting proof" },
];

export default function AdminWorkOrdersPage() {
  const [filter, setFilter] = useState<AdminWorkOrderFilter>("all");
  const wos = getAdminWorkOrders();
  const counts = getAdminWorkOrderCounts();
  const filtered = filterAdminWorkOrders(wos, filter);

  const toggleFilter = (id: AdminWorkOrderFilter) => {
    setFilter((prev) => (prev === id ? "all" : id));
  };

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Work Orders"
        subtitle="Every active job, who owns it, and how its SLA clock is tracking"
        actions={
          <button className="gold-btn rounded-[11px] px-4 py-2 text-[13px] font-semibold transition-transform">
            + New Work Order
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-[13px] text-[var(--t2)]">In motion</div>
          <div className="text-[30px] font-extrabold tracking-[-1px] text-[var(--t1)]">
            {counts.active}
          </div>
          <div className="text-[12px] text-[var(--t3)]">Assigned or being worked</div>
        </Card>
        <Card>
          <div className="text-[13px] text-[var(--amb)]">Needs attention</div>
          <div className="text-[30px] font-extrabold tracking-[-1px] text-[var(--amb)]">
            {counts.attention}
          </div>
          <div className="text-[12px] text-[var(--t3)]">Awaiting proof or escalated</div>
        </Card>
        <Card>
          <div className="text-[13px] text-[var(--grn)]">Completed</div>
          <div className="text-[30px] font-extrabold tracking-[-1px] text-[var(--grn)]">
            {counts.done}
          </div>
          <div className="text-[12px] text-[var(--t3)]">Verified or closed</div>
        </Card>
      </div>

      <div className="filters mb-5 flex flex-wrap gap-2.5">
        {filters.map((f) => (
          <FilterPill
            key={f.id}
            label={f.label}
            active={filter === f.id}
            onClick={() => toggleFilter(f.id)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No jobs match this filter"
          line="Try “All jobs” to see everything on the board."
        />
      ) : (
        <div className="wo-cards flex flex-col gap-3">
          {filtered.map((wo) => (
            <WorkOrderCard key={wo.id} wo={wo} onOpen={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
