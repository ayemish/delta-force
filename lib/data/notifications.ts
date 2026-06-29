export type Recipient = {
  role: string;
  name: string;
  seen: boolean;
  at: string | null;
};

export type Notification = {
  id: string;
  icon: string;
  msg: string;
  t: string;
  r: boolean;
  ic: string;
  it: string;
  roles: string[];
  vendorId?: string;
  escId?: string;
  recipients?: Recipient[];
};

export const NOTIFS: Notification[] = [
  {
    id: "n1", icon: "⚠", msg: "WO-2026-0089 auto-escalated — Arctic Air non-acknowledgment at 75% SLA window",
    t: "2 min ago", r: false, ic: "rgba(231,76,60,.12)", it: "var(--red)", roles: ["admin"],
    recipients: [{ role: "vendor", name: "Arctic Air Systems", seen: true, at: "1 min ago" }],
  },
  {
    id: "n3", icon: "📋", msg: "Proof submitted for WO-2026-0088 — Riverside Towers. 4/5 checklist items complete.",
    t: "38 min ago", r: false, ic: "rgba(243,156,18,.12)", it: "var(--amb)", roles: ["admin"],
    recipients: [{ role: "pm", name: "PM — Riverside/Maple", seen: true, at: "20 min ago" }],
  },
  {
    id: "n5", icon: "🔍", msg: "FloorMaster scored 76/100 at The Observatory — Conditional. PIP issued.",
    t: "3hr ago", r: false, ic: "rgba(243,156,18,.12)", it: "var(--amb)", roles: ["admin"],
  },
  {
    id: "n6", icon: "💳", msg: "Invoice INV-0291 unlocked — Voltec Services. $3,200 ready for Stripe payout.",
    t: "2hr ago", r: true, ic: "rgba(46,204,113,.12)", it: "var(--grn)", roles: ["admin"],
  },
  {
    id: "n8", icon: "✓", msg: "WO-2026-0085 closed – verified. Pressure wash complete at Riverside Towers.",
    t: "5hr ago", r: true, ic: "rgba(46,204,113,.12)", it: "var(--grn)", roles: ["admin"],
    recipients: [{ role: "pm", name: "PM — Riverside/Maple", seen: true, at: "4hr ago" }],
  },
  {
    id: "n10", icon: "⚠", msg: "Level 2 escalation: Repeat plumbing — Riverside Towers Unit 210 (3rd occurrence).",
    t: "Jun 8", r: true, ic: "rgba(243,156,18,.12)", it: "var(--amb)", roles: ["admin"],
    recipients: [{ role: "pm", name: "PM — Riverside/Maple", seen: false, at: null }],
  },
  {
    id: "n11", icon: "👥", msg: "ProFaçade Ltd. scored 79/100 — Conditional. Bi-weekly inspection cadence enforced.",
    t: "Jun 5", r: true, ic: "rgba(243,156,18,.12)", it: "var(--amb)", roles: ["admin"],
    recipients: [{ role: "vendor", name: "ProFaçade Ltd.", seen: true, at: "Jun 5" }],
  },
  {
    id: "n13", icon: "👥", msg: "Voltec Services scored 97/100 at Cedar Heights — Verified status maintained.",
    t: "Jun 5", r: true, ic: "rgba(46,204,113,.12)", it: "var(--grn)", roles: ["admin"],
    recipients: [{ role: "vendor", name: "Voltec Services", seen: false, at: null }],
  },
  {
    id: "n14", icon: "⛔", msg: "JunkHaul Pro insurance documentation lapsed — 7-day remediation window triggered.",
    t: "Jun 4", r: true, ic: "rgba(231,76,60,.12)", it: "var(--red)", roles: ["admin"],
    recipients: [{ role: "vendor", name: "JunkHaul Pro", seen: false, at: null }],
  },
];
