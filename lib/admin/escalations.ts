import { ESC_ACTIVE, ESC_FW } from "@/lib/data/escalations";
import type { Escalation, EscalationFramework } from "@/lib/data/escalations";

export type { Escalation, EscalationFramework };

export function getActiveEscalations(): Escalation[] {
  return ESC_ACTIVE;
}

export function getEscalationFramework(): EscalationFramework[] {
  return ESC_FW;
}

export function getLevelColor(level: number): string {
  const fw = ESC_FW.find((f) => f.level === level);
  return fw?.color ?? "var(--t3)";
}

export function getLevelLabel(level: number): string {
  const fw = ESC_FW.find((f) => f.level === level);
  return fw?.title ?? `Level ${level}`;
}

export function getNextFramework(level: number): EscalationFramework | null {
  return ESC_FW.find((f) => f.level === level + 1) ?? null;
}
