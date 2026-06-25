import type { EVProject, EVStage } from "@/lib/types";

export const EV_STAGES: EVStage[] = [
  { n: 1, name: "Initiation", short: "Initiation", desc: "Engage the PM/council, gather building basics, decide EPR vs. lighter audit, confirm Delta Force role." },
  { n: 2, name: "Data Collection", short: "Data", desc: "Compile the intake package: electrical drawings, switchgear specs, 24 months of utility history, parking layout, bylaws, reserve fund context." },
  { n: 3, name: "Engineering Phase", short: "Engineering", desc: "Engage a qualified electrical engineering firm (P.Eng. for Part 3 towers), hand over the data package, monitor progress." },
  { n: 4, name: "EPR Completion", short: "EPR", desc: "Review the Electrical Planning Report and prepare a plain-English summary of capacity, headroom and required upgrades for the council." },
  { n: 5, name: "EV-Ready Planning", short: "EV-Ready Plan", desc: "Develop the EV Ready Plan: infrastructure architecture, how many stalls now and how to scale, metering/billing, phased rollout. Required to unlock rebates." },
  { n: 6, name: "Proposal Development", short: "Proposal", desc: "Prepare a clear, costed proposal with phased options, budget ranges, funding models (CRF, special levy, user-pay) and rebate scenarios." },
  { n: 7, name: "Council Presentation", short: "Presentation", desc: "Present findings and options to the council with decision-ready materials: deck, one-pager, owner FAQ and recommended motion language." },
  { n: 8, name: "Approval Process", short: "Approval", desc: "Guide the council through Strata Property Act approvals (council motion / SGM vote) and secure rebate pre-approval before any eligible work begins." },
  { n: 9, name: "Implementation", short: "Implementation", desc: "Competitive contractor bid, permits with municipality and BC Hydro, scheduling to minimise disruption, installation quality oversight." },
  { n: 10, name: "Post-Installation", short: "Post-Install", desc: "Clean handoff: as-builts, permits and warranties delivered, residents onboarded, billing/metering activated, maintenance & expansion plan set." },
];

export const EV_PROJECTS: Record<string, EVProject> = {
  "Riverside Towers": {
    stage: 5,
    status: "on_track",
    started: "Mar 4, 2026",
    note: "EV Ready Plan in development. Capacity headroom confirmed for 18 stalls at launch.",
    next: "Finalise infrastructure architecture and metering model, then move to proposal.",
    priority: false,
  },
  "Cedar Heights": {
    stage: 8,
    status: "waiting_council",
    started: "Jan 20, 2026",
    note: "Proposal presented. Awaiting council motion + rebate pre-approval before implementation.",
    next: "Chase rebate pre-approval — do not let any eligible work begin until confirmed.",
    priority: true,
  },
  "The Observatory": {
    stage: 2,
    status: "action_needed",
    started: "May 28, 2026",
    note: "Intake underway. Missing 24 months of utility history and panel schedules.",
    next: "Collect missing electrical drawings & utility bills so engineering can start.",
    priority: true,
  },
};

export const EV_BUILDINGS = ["The Observatory", "Riverside Towers", "Cedar Heights", "Maple Court"];
export const EV_PM_BUILDINGS = { "Riverside Towers": true, "Maple Court": true };
