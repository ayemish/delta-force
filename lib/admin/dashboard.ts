export const adminDashboard = {
  kpiCards: [
    {
      id: "hero",
      hero: true,
      variant: "green" as const,
      label: "Value Recovered — This Month",
      value: "$2.9K",
      context: "2 deficiency bill-backs + 1 avoided callbacks",
      sparkline: {
        values: [17000, 23000, 29000, 34000, 39000, 42000],
        color: "var(--grn)",
        width: 220,
        height: 56,
      },
      delta: {
        text: "+$839 vs. last month",
        color: "text-[var(--grn)]",
        trend: "up" as const,
      },
    },
    {
      id: "onTime",
      variant: "blue" as const,
      label: "On-Time Completion",
      value: "100%",
      context: "1 of 1 completed within SLA",
      sparkline: {
        values: [72, 78, 80, 84, 90, 88],
        color: "var(--blu)",
      },
      delta: {
        text: "+12 pts vs. last month",
        color: "text-[var(--grn)]",
        trend: "up" as const,
      },
    },
    {
      id: "escalations",
      variant: "amber" as const,
      label: "Open Escalations",
      value: "1",
      context: "2 more at SLA risk · target 0",
      sparkline: {
        values: [1, 0, 1, 1, 2, 3],
        color: "var(--amb)",
      },
      delta: {
        text: "-1 vs. last month",
        color: "text-[var(--grn)]",
        trend: "down" as const,
      },
    },
    {
      id: "verified",
      variant: "teal" as const,
      label: "Work Verified & Closed",
      value: "100%",
      context: "1 of 1 closed jobs verified",
      sparkline: {
        values: [70, 74, 80, 82, 85, 92],
        color: "var(--teal)",
      },
      delta: {
        text: "+18 pts vs. last month",
        color: "text-[var(--grn)]",
        trend: "up" as const,
      },
    },
  ],
  attentionItems: [
    { text: "0089 escalated — The Observatory", color: "var(--red)" },
    { text: "0087 SLA at risk — 0:52 left", color: "var(--amb)" },
    { text: "FloorMaster blocked — needs replacement", color: "var(--red)" },
    { text: "JunkHaul Pro blocked — needs replacement", color: "var(--red)" },
  ],
};

export type AdminKpiCard = (typeof adminDashboard.kpiCards)[number];
export type AdminAttentionItem = (typeof adminDashboard.attentionItems)[number];

