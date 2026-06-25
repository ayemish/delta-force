export type NavItem = {
  id: string;
  label: string;
  badge?: { n: number; cls: "nb-red" | "nb-gold" };
  ev?: boolean;
};

export type RoleConfig = {
  label: string;
  context: string;
  showEscIcon: boolean;
  avatarInitial: string;
  pillStyle: string;
  avatarStyle: string;
  nav: { section: string; items: NavItem[] }[];
  defaultPage: string;
};

export type RoleId = "admin" | "pm" | "vendor";

export const roles: { id: RoleId; label: string }[] = [
  { id: "admin", label: "Admin" },
  { id: "pm", label: "Property Mgr" },
  { id: "vendor", label: "Vendor" },
];

export const roleConfig: Record<RoleId, RoleConfig> = {
  admin: {
    label: "ADMIN",
    context: "Command Center",
    showEscIcon: true,
    avatarInitial: "M",
    pillStyle:
      "border border-[rgba(201,161,74,.3)] bg-[rgba(201,161,74,.12)] text-[var(--gold)]",
    avatarStyle:
      "border-2 border-[rgba(201,161,74,.55)] bg-[rgba(201,161,74,.14)] text-[var(--gold)]",
    nav: [
      {
        section: "Operations",
        items: [
          { id: "dashboard", label: "Dashboard" },
          { id: "exceptions", label: "Exception Inbox", badge: { n: 5, cls: "nb-red" } },
          { id: "work-orders", label: "Work Orders", badge: { n: 7, cls: "nb-red" } },
          { id: "proof-to-close", label: "Proof to Close", badge: { n: 2, cls: "nb-red" } },
          { id: "escalations", label: "Escalations", badge: { n: 2, cls: "nb-red" } },
        ],
      },
      {
        section: "Management",
        items: [
          { id: "vendors", label: "Vendors", badge: { n: 14, cls: "nb-gold" } },
          { id: "inspections", label: "Inspections" },
          { id: "ev-readiness", label: "EV Readiness", ev: true },
          { id: "payments", label: "Payments", badge: { n: 5, cls: "nb-gold" } },
        ],
      },
      {
        section: "Intelligence",
        items: [
          { id: "reports", label: "Reports" },
          { id: "notifications", label: "Notifications" },
        ],
      },
    ],
    defaultPage: "dashboard",
  },
  pm: {
    label: "PROP MGR",
    context: "Property Manager",
    showEscIcon: false,
    avatarInitial: "A",
    pillStyle:
      "border border-[rgba(111,168,199,.3)] bg-[rgba(111,168,199,.12)] text-[var(--blu)]",
    avatarStyle:
      "border-2 border-[rgba(111,168,199,.55)] bg-[rgba(111,168,199,.14)] text-[var(--blu)]",
    nav: [
      {
        section: "My Buildings",
        items: [
          { id: "dashboard", label: "Overview" },
          { id: "work-orders", label: "Work Orders", badge: { n: 3, cls: "nb-red" } },
          { id: "proof-to-close", label: "Proof to Close", badge: { n: 2, cls: "nb-red" } },
          { id: "payments", label: "Payments" },
          { id: "ev-readiness", label: "EV Readiness", ev: true },
          { id: "inspections", label: "Inspections" },
        ],
      },
      {
        section: "Performance",
        items: [
          { id: "leaderboard", label: "Leaderboard" },
          { id: "vendors", label: "Vendors" },
          { id: "reports", label: "Building Reports" },
          { id: "notifications", label: "Notifications" },
        ],
      },
    ],
    defaultPage: "dashboard",
  },
  vendor: {
    label: "VENDOR",
    context: "ThermalPro HVAC",
    showEscIcon: false,
    avatarInitial: "T",
    pillStyle:
      "border border-[rgba(95,179,168,.3)] bg-[rgba(95,179,168,.12)] text-[var(--teal)]",
    avatarStyle:
      "border-2 border-[rgba(95,179,168,.55)] bg-[rgba(95,179,168,.14)] text-[var(--teal)]",
    nav: [
      {
        section: "My Work",
        items: [
          { id: "dashboard", label: "Dashboard" },
          { id: "my-jobs", label: "My Jobs", badge: { n: 2, cls: "nb-red" } },
          { id: "escalations", label: "Escalation Offers", ev: true },
          { id: "proof-to-close", label: "My Submissions" },
        ],
      },
      {
        section: "My Account",
        items: [
          { id: "leaderboard", label: "Leaderboard" },
          { id: "vendors", label: "My Profile" },
          { id: "payments", label: "My Payments" },
          { id: "notifications", label: "Notifications" },
        ],
      },
    ],
    defaultPage: "dashboard",
  },
};
