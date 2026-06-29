"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import Card from "@/components/shared/card";
import ProofCard from "@/components/shared/proof-card";
import { getProofToCloseWOs, getProofCounts } from "@/lib/admin/proof-to-close";

export default function ProofToClosePage() {
  const [proofWOs, setProofWOs] = useState(getProofToCloseWOs);
  const counts = getProofCounts();

  function handleApprove(id: string) {
    setProofWOs((prev) => prev.filter((w) => w.id !== id));
  }

  function handleRequestFix(id: string) {
    setProofWOs((prev) => prev.filter((w) => w.id !== id));
  }

  function handleDetails(_id: string) {
    // placeholder — detail panel will be wired up in a later pass
  }

  return (
    <div className="p-6 lg:p-8 lg:pb-12">
      <PageHeader
        title="Proof to Close"
        subtitle="Review vendor evidence and decide — approve, request a fix, or fail the job"
      />

      {/* SLA reminder banner */}
      <div className="mb-5 flex items-center gap-2 rounded-[var(--r2)] border border-[var(--bord)] bg-[var(--surf)] px-[14px] py-[10px] text-[11px] text-[var(--t3)]">
        <span className="text-[var(--amb)]">ℹ</span>
        Review SLAs: Emergency — 1hr · Urgent — 4hr · Routine — 8hr
      </div>

      {/* Proof cards or empty state */}
      {proofWOs.length === 0 ? (
        <div className="mx-auto max-w-[420px] py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(201,161,74,.25)] bg-[rgba(201,161,74,.1)] text-[var(--gold)]">
            <CheckCircle size={26} />
          </div>
          <div className="mb-2 text-[17px] font-bold text-[var(--t1)]">All caught up</div>
          <div className="text-[14px] leading-[1.6] text-[var(--t2)]">
            No proofs are waiting on you right now. New submissions land here the moment a vendor completes a job.
          </div>
        </div>
      ) : (
        <div>
          {proofWOs.map((wo) => (
            <ProofCard
              key={wo.id}
              wo={wo}
              onApprove={handleApprove}
              onRequestFix={handleRequestFix}
              onDetails={handleDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
