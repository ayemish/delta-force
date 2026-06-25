import type { ComponentType } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  CheckCircle,
  TriangleAlert,
  Briefcase,
  Camera,
  Users,
  Calendar,
  CreditCard,
  Zap,
  Bell,
  CircleAlert,
  TrendingUp,
  Trophy,
  Settings,
  BarChart2,
} from "lucide-react";

const iconMap: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  dashboard: LayoutDashboard,
  "work-orders": ClipboardCheck,
  "proof-to-close": CheckCircle,
  escalations: TriangleAlert,
  "my-jobs": Briefcase,
  "field-capture": Camera,
  vendors: Users,
  inspections: Calendar,
  payments: CreditCard,
  "ev-readiness": Zap,
  reports: BarChart2,
  notifications: Bell,
  exceptions: CircleAlert,
  value: TrendingUp,
  leaderboard: Trophy,
  benchmarks: Trophy,
  settings: Settings,
};

export function navIcon(id: string) {
  const Icon = iconMap[id] || CircleAlert;
  return <Icon size={19} strokeWidth={1.5} />;
}
