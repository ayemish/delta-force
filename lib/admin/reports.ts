export const adminReports = {
  summaryMetrics: [
    { value: "91.4%", label: "SLA Compliance", color: "var(--grn)" },
    { value: "87.2%", label: "Proof-to-Close Rate", color: "var(--grn)" },
    { value: "2.6hr", label: "Avg Response", color: "var(--t1)" },
    { value: "1", label: "Repeat Issues (30d)", color: "var(--red)" },
    { value: "2", label: "Active Escalations", color: "var(--red)" },
    { value: "6", label: "Verified Vendors", color: "var(--t1)" },
  ],

  slaByTrade: [
    { trade: "Electrical", rate: 98 },
    { trade: "HVAC", rate: 96 },
    { trade: "Pressure Wash", rate: 95 },
    { trade: "Waste", rate: 94 },
    { trade: "Plumbing", rate: 93 },
    { trade: "Landscaping", rate: 92 },
    { trade: "Window", rate: 91 },
    { trade: "Snow & Ice", rate: 90 },
    { trade: "Façade", rate: 81 },
    { trade: "Janitorial", rate: 78 },
  ],

  escalationMetrics: [
    { value: "4", label: "Total Escalations (30d)", color: "var(--t1)" },
    { value: "2", label: "Currently Active", color: "var(--red)" },
    { value: "2.8hr", label: "Avg Resolution", color: "var(--t1)" },
    { value: "0", label: "Level 3+ Events", color: "var(--grn)" },
  ],

  tenantImpact: [
    {
      building: "The Observatory",
      risk: "High" as const,
      complaints: 8,
      repeatIssues: 0,
      resolutionRate: 94,
      trend: "↓ -22%",
      trendColor: "var(--grn)",
    },
    {
      building: "Riverside Towers",
      risk: "High" as const,
      complaints: 12,
      repeatIssues: 1,
      resolutionRate: 88,
      trend: "↑ +5%",
      trendColor: "var(--red)",
    },
    {
      building: "Cedar Heights",
      risk: "Medium" as const,
      complaints: 4,
      repeatIssues: 0,
      resolutionRate: 97,
      trend: "↓ -14%",
      trendColor: "var(--grn)",
    },
    {
      building: "Maple Court",
      risk: "Medium" as const,
      complaints: 6,
      repeatIssues: 0,
      resolutionRate: 92,
      trend: "→ stable",
      trendColor: "var(--t2)",
    },
  ],
};

export type SlaTradeRow = (typeof adminReports.slaByTrade)[number];
export type EscalationMetric = (typeof adminReports.escalationMetrics)[number];
export type TenantImpactRow = (typeof adminReports.tenantImpact)[number];
