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
    bg: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/25",
  },
  danger: {
    bg: "from-rose-500 to-rose-600",
    shadow: "shadow-rose-500/25",
  },
  info: {
    bg: "from-primary to-orange-500",
    shadow: "shadow-primary/25",
  },
  warning: {
    bg: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-500/25",
  },
  neutral: {
    bg: "from-slate-500 to-slate-600",
    shadow: "shadow-slate-500/25",
  },
  orange: {
    bg: "from-orange-500 to-orange-600",
    shadow: "shadow-orange-500/25",
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
      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-white/10" />
    </div>
  );
};

export default GradientCard;
