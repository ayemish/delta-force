"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import VendorCard from "@/components/vendors/vendor-card";
import { getVendors, getVendorCounts, avatarColor } from "@/lib/admin/vendors";
import type { VendorFilter } from "@/lib/admin/vendors";

const FILTERS: { id: VendorFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "verified", label: "✅ Verified" },
  { id: "conditional", label: "⚠️ Conditional" },
  { id: "blocked", label: "❌ Blocked" },
];

export default function AdminVendorsPage() {
  const [filter, setFilter] = useState<VendorFilter>("all");
  const counts = getVendorCounts();
  const vendors = getVendors(filter);

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Vendor Directory"
        subtitle="Status: Verified / Conditional / Blocked — live compliance scoring"
        actions={
          <button className="rounded-[11px] bg-[var(--gold)] px-4 py-2 text-[13px] font-bold text-[#1A1305] transition-opacity hover:opacity-90">+ Add Vendor</button>
        }
      />

      {/* Filter pills */}
      <div className="mb-[22px] flex flex-wrap gap-[10px]">
        {FILTERS.map((f) => {
          const count = counts[f.id];
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="cursor-pointer rounded-[20px] border px-[16px] py-[8px] text-[12.5px] font-medium transition-all duration-200 hover:border-[var(--bord2)] hover:text-[var(--t1)]"
              style={{
                background: isActive ? "rgba(201,161,74,.12)" : "var(--surf2)",
                borderColor: isActive ? "rgba(201,161,74,.4)" : "var(--bord)",
                color: isActive ? "var(--gold)" : "var(--t2)",
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid or empty state */}
      {vendors.length === 0 ? (
        <div className="mx-auto max-w-[420px] py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(201,161,74,.25)] bg-[rgba(201,161,74,.1)] text-[var(--gold)]">
            <Users size={26} />
          </div>
          <div className="mb-2 text-[17px] font-bold text-[var(--t1)]">No vendors found</div>
          <div className="text-[14px] leading-[1.6] text-[var(--t2)]">
            No vendors match this filter right now.
          </div>
        </div>
      ) : (
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {vendors.map((v, i) => {
            const [bg, color] = avatarColor(i);
            return (
              <VendorCard
                key={v.id}
                vendor={v}
                avatarBg={bg}
                avatarColor={color}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
