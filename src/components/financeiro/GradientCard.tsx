import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface GradientCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant: "success" | "danger" | "info" | "warning" | "neutral" | "orange";
}

const variantStyles = {
  success: {
    bg: "from-emerald-400/80 to-emerald-500/80",
    shadow: "shadow-emerald-400/20",
  },
  danger: {
    bg: "from-rose-400/80 to-rose-500/80",
    shadow: "shadow-rose-400/20",
  },
  info: {
    bg: "from-blue-400/80 to-blue-500/80",
    shadow: "shadow-blue-400/20",
  },
  warning: {
    bg: "from-amber-400/80 to-amber-500/80",
    shadow: "shadow-amber-400/20",
  },
  neutral: {
    bg: "from-slate-400/80 to-slate-500/80",
    shadow: "shadow-slate-400/20",
  },
  orange: {
    bg: "from-orange-400/80 to-orange-500/80",
    shadow: "shadow-orange-400/20",
  },
};

export const GradientCard = ({ title, value, icon: Icon, trend, variant }: GradientCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={`relative overflow-hidden rounded bg-gradient-to-br ${styles.bg} p-5 text-white shadow-lg ${styles.shadow} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div className="rounded bg-white/20 p-2.5 backdrop-blur-sm">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold bg-white/20 text-white"
          >
            {trend.positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {trend.value}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default GradientCard;
