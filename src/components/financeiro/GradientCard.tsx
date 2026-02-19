import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface GradientCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  helpText?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant: "success" | "danger" | "info" | "warning" | "neutral" | "orange";
}

const variantConfig = {
  success: {
    glow: "after:bg-lime-400/5 dark:after:bg-lime-400/8",
    iconBg: "bg-lime-400/10 dark:bg-lime-500/15",
    iconColor: "text-lime-600 dark:text-lime-400",
    trendColor: "text-lime-600 dark:text-lime-400",
    accentBar: "bg-lime-400",
  },
  danger: {
    glow: "after:bg-rose-400/5 dark:after:bg-rose-400/8",
    iconBg: "bg-rose-400/10 dark:bg-rose-500/15",
    iconColor: "text-rose-600 dark:text-rose-400",
    trendColor: "text-rose-600 dark:text-rose-400",
    accentBar: "bg-rose-400",
  },
  info: {
    glow: "after:bg-blue-400/5 dark:after:bg-blue-400/8",
    iconBg: "bg-blue-400/10 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
    trendColor: "text-blue-600 dark:text-blue-400",
    accentBar: "bg-blue-400",
  },
  warning: {
    glow: "after:bg-amber-400/5 dark:after:bg-amber-400/8",
    iconBg: "bg-amber-400/10 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    trendColor: "text-amber-600 dark:text-amber-400",
    accentBar: "bg-amber-400",
  },
  neutral: {
    glow: "after:bg-slate-400/5 dark:after:bg-slate-400/8",
    iconBg: "bg-slate-400/10 dark:bg-slate-500/15",
    iconColor: "text-slate-600 dark:text-slate-400",
    trendColor: "text-slate-600 dark:text-slate-400",
    accentBar: "bg-slate-400",
  },
  orange: {
    glow: "after:bg-orange-400/5 dark:after:bg-orange-400/8",
    iconBg: "bg-orange-400/10 dark:bg-orange-500/15",
    iconColor: "text-orange-600 dark:text-orange-400",
    trendColor: "text-orange-600 dark:text-orange-400",
    accentBar: "bg-orange-400",
  },
};

export const GradientCard = ({ title, value, icon: Icon, trend, variant }: GradientCardProps) => {
  const config = variantConfig[variant];

  return (
    <div
      className={`relative overflow-hidden bg-card border border-border rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-0.5 group`}
    >
      {/* Subtle accent bar at top */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${config.accentBar} opacity-60`} />
      
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-lg ${config.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className={`h-4 w-4 ${config.iconColor}`} />
        </div>
      </div>
      
      <p className="text-[1.75rem] font-bold tracking-tight text-foreground leading-none mb-2">{value}</p>
      
      {trend && (
        <div className={`flex items-center gap-1.5 text-xs font-semibold ${config.trendColor}`}>
          {trend.positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          <span>{trend.value}</span>
          <span className="text-muted-foreground font-normal ml-0.5">vs período anterior</span>
        </div>
      )}
    </div>
  );
};

export default GradientCard;
