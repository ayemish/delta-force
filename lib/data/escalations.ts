export type EscalationLog = {
  l: number;
  ev: string;
  a: string;
  t: string;
};

export type BackupState = "offered" | "assigned" | "external";

export type Escalation = {
  id: string;
  wo: string;
  b: string;
  issue: string;
  level: number;
  trigger: string;
  action: string;
  owner: string;
  from: string;
  fromId: string;
  backupChain: string[];
  chainIdx: number;
  backupId: string;
  slaPct: number;
  slaWindow: string;
  slaRemaining: string;
  backupState: BackupState;
  time: string;
  resolved?: boolean;
  log: EscalationLog[];
};

export type EscalationFramework = {
  level: number;
  title: string;
  color: string;
  triggers: string[];
  actions: string[];
};

export const ESC_ACTIVE: Escalation[] = [
  {
    id: "ESC-0012",
    wo: "WO-2026-0089",
    b: "The Observatory",
    issue: "HVAC cooling failure — PH-2",
    level: 1,
    trigger: "SLA breach + vendor non-acknowledgment at 75% window",
    action: "Auto-assigned to backup vendor pool. Command Center notified.",
    owner: "Command Center",
    from: "Arctic Air Systems",
    fromId: "v-001",
    backupChain: ["v-013", "v-015", "ext"],
    chainIdx: 0,
    backupId: "v-013",
    slaPct: 78,
    slaWindow: "2hr Emergency",
    slaRemaining: "26 min",
    backupState: "offered",
    time: "Jun 10, 10:51",
    log: [
      { l: 1, ev: "SLA clock started — 2hr Emergency window", a: "System", t: "Jun 10, 09:15" },
      { l: 1, ev: "Non-acknowledgment at 75% window. Level 1 auto-triggered.", a: "System (Auto)", t: "Jun 10, 10:51" },
      { l: 1, ev: "Ownership: Arctic Air → Command Center", a: "System (Auto)", t: "Jun 10, 10:51" },
      { l: 1, ev: "ThermalPro HVAC (backup) placed on standby.", a: "Command Center", t: "Jun 10, 10:52" },
    ],
  },
  {
    id: "ESC-0011",
    wo: "WO-2026-0076",
    b: "Riverside Towers",
    issue: "Repeat plumbing — Unit 210 (3rd occurrence in 30 days)",
    level: 2,
    trigger: "Repeat issue — same unit, same problem < 30 days",
    action: "CC rep assigned. PM notified. Root cause investigation ordered.",
    owner: "Command Center — Atlas",
    from: "Rapid Plumb Ltd.",
    fromId: "v-002",
    backupChain: ["v-014", "v-016", "ext"],
    chainIdx: 0,
    backupId: "v-014",
    slaPct: 55,
    slaWindow: "8hr Urgent",
    slaRemaining: "3hr 40 min",
    backupState: "offered",
    time: "Jun 8, 14:20",
    log: [
      { l: 2, ev: "3rd repeat issue — same unit, same trade", a: "System", t: "Jun 8, 14:20" },
      { l: 2, ev: "Level 2 triggered. CC rep assigned as owner.", a: "System (Auto)", t: "Jun 8, 14:20" },
      { l: 2, ev: "PM (Riverside Towers) notified", a: "Command Center", t: "Jun 8, 14:25" },
      { l: 2, ev: "Root cause meeting scheduled Jun 11", a: "Command Center", t: "Jun 8, 15:00" },
    ],
  },
];

export const ESC_FW: EscalationFramework[] = [
  {
    level: 1,
    title: "Level 1: Automatic System",
    color: "var(--blu)",
    triggers: [
      "SLA breach (clock expired)",
      "Vendor non-acknowledgment (2hr)",
      "Vendor no-show (tenant report)",
      "Proof rejection (critical work)",
    ],
    actions: [
      "Auto-assign to backup vendor",
      "Notify Command Center",
      "Document original vendor failure",
      "Update vendor compliance record",
    ],
  },
  {
    level: 2,
    title: "Level 2: Command Center Intervention",
    color: "var(--amb)",
    triggers: [
      "Repeat issue (same unit < 30 days)",
      "Tenant escalation to PM",
      "Vendor disputes scope / access",
      "Emergency — no verified vendor",
    ],
    actions: [
      "CC rep assigned as owner",
      "Direct vendor coordination",
      "Real-time problem solving",
      "PM notification + involvement",
    ],
  },
  {
    level: 3,
    title: "Level 3: Building PM Escalation",
    color: "var(--red)",
    triggers: [
      "Multiple vendor failures (>2)",
      "Tenant threatens legal action",
      "Safety issue unresolved > 4hrs",
      "Payment / scope dispute",
    ],
    actions: [
      "Formal escalation to PM",
      "Joint resolution meeting",
      "Alternative vendor sourcing",
      "Executive summary to ownership",
    ],
  },
  {
    level: 4,
    title: "Level 4: Director Escalation",
    color: "#FF4444",
    triggers: [
      "PM disputes CC enforcement",
      "Vendor threatens legal action",
      "Building-wide system failure",
      "Regulatory/safety involvement",
    ],
    actions: [
      "Director assumes command",
      "All parties notified",
      "Crisis management protocol",
      "Legal consultation if required",
    ],
  },
];
