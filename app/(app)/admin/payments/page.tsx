"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import KpiCard from "@/components/shared/kpi-card";
import { PaymentSectionCard, PendingPaymentRow, ReleasedPaymentRow } from "@/components/payments/payment-card";
import { getPending, getReleased, cad, cadShort } from "@/lib/admin/payments";
import type { PayReady } from "@/lib/admin/payments";

function StripeBadge() {
  return (
    <span className="inline-flex items-center gap-[5px] rounded-[8px] border border-[rgba(120,110,255,.28)] bg-[rgba(120,110,255,.12)] px-[11px] py-[5px] text-[11.5px] font-semibold text-[#a59dff]">
      ⚡ Powered by Stripe
    </span>
  );
}

export default function AdminPaymentsPage() {
  const [pendingList, setPendingList] = useState<PayReady[]>(getPending);
  const [releasedList, setReleasedList] = useState<PayReady[]>(getReleased);

  const pendingTotal = pendingList.reduce((s, p) => s + p.amt, 0);
  const releasedTotal = releasedList.reduce((s, p) => s + p.amt, 0);

  function handleApprove(inv: string) {
    const found = pendingList.find((p) => p.inv === inv);
    setPendingList((prev) => prev.filter((p) => p.inv !== inv));
    if (found) setReleasedList((prev) => [...prev, { ...found, dfApproved: true }]);
  }

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Payments"
        subtitle="Quality approval gate — release payments to PMs once work meets standard"
        actions={<StripeBadge />}
      />

      {/* KPI row */}
      <div className="mb-[20px] grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          label="Pending Your Approval"
          value={cadShort(pendingTotal)}
          context={`${pendingList.length} awaiting quality sign-off`}
          variant="amber"
        />
        <KpiCard
          label="Approved & Released"
          value={cadShort(releasedTotal)}
          context={`${releasedList.length} sent to PMs`}
          contextClass="text-[var(--grn)]"
          variant="green"
        />
        <KpiCard
          label="Paid This Month"
          value={cadShort(41600)}
          context="↑ 12% vs. May"
          contextClass="text-[var(--grn)]"
          variant="blue"
        />
      </div>

      {/* Two-column cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PaymentSectionCard
          title="Pending Quality Approval"
          footer={
            pendingList.length > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[var(--t2)]">Pending your approval</span>
                <span className="text-[17px] font-bold text-[var(--amb)]">{cad(pendingTotal)}</span>
              </div>
            ) : undefined
          }
        >
          {pendingList.length === 0 ? (
            <div className="py-[20px] text-center text-[13px] text-[var(--t3)]">
              All reviewed — every verified payment has been approved.
            </div>
          ) : (
            pendingList.map((p) => <PendingPaymentRow key={p.inv} payment={p} onApprove={handleApprove} />)
          )}
        </PaymentSectionCard>

        <PaymentSectionCard
          title="Approved — Released to PMs"
          badge={<StripeBadge />}
        >
          {releasedList.length === 0 ? (
            <div className="py-[20px] text-center text-[13px] text-[var(--t3)]">
              No payments released yet.
            </div>
          ) : (
            releasedList.map((p) => <ReleasedPaymentRow key={p.inv} payment={p} />)
          )}
        </PaymentSectionCard>
      </div>

      {/* Delta Force rule */}
      <div className="mt-5 rounded-[var(--r2)] border border-[rgba(201,161,74,.25)] bg-[rgba(201,161,74,.06)] px-[18px] py-[14px] text-[13px] leading-[1.6] text-[var(--t2)]">
        <strong className="text-[var(--amb)]">DELTA FORCE RULE:</strong> Delta Force is the quality gate. Approving a payment confirms the work is{" "}
        <strong className="text-[var(--gold)]">Closed – Verified</strong> to standard and releases it to the PM to process. Payments never clear without this sign-off.
      </div>
    </div>
  );
}
