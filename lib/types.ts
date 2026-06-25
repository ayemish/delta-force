export type WorkOrderStatus =
  | "intake"
  | "assigned"
  | "inprogress"
  | "pending"
  | "review"
  | "closed_v"
  | "closed_f"
  | "escalated";

export type Urgency = "emergency" | "urgent" | "routine";

export type TimelineEvent = {
  ts: string;
  ev: string;
  a: string;
};

export type ProofPhoto = {
  kind: string;
  label: string;
  ts: string;
};

export type ProofCheck = {
  l: string;
  ok: boolean;
};

export type Proof = {
  notes: string;
  photos: ProofPhoto[];
  checks: ProofCheck[];
};

export type WorkOrder = {
  id: string;
  building: string;
  unit: string;
  issue: string;
  trade: string;
  urgency: Urgency;
  status: WorkOrderStatus;
  owner: string;
  vendor: string;
  vendorId: string | null;
  slaP: number;
  slaR: string;
  created: string;
  notes: string;
  tl: TimelineEvent[];
  proof: Proof | null;
};

export type Vendor = {
  id: string;
  name: string;
  trade: string;
  status: string;
  score: number;
  sla: number;
  resp: string;
  jobs: number;
  city: string;
  flags: string[];
  ins: boolean;
};

export type Inspection = {
  b: string;
  tr: string;
  v: string;
  vid: string;
  d: string;
  sc: number;
  res: string;
  act: string;
};

export type PayReady = {
  v: string;
  vid: string;
  wo: string;
  inv: string;
  amt: number;
  date: string;
  building: string;
  dfApproved: boolean;
};

export type EVProject = {
  stage: number;
  status: string;
  started: string;
  note: string;
  next: string;
  priority: boolean;
};

export type EVStage = {
  n: number;
  name: string;
  short: string;
  desc: string;
};

