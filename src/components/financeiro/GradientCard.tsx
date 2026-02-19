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
    iconBg: "bg-lime-400/10 dark:bg-lime-500/15",
    iconColor: "text-lime-600 dark:text-lime-400",
    trendColor: "text-lime-600 dark:text-lime-400",
    accentBar: "from-lime-400 to-lime-300",
    shadow: "hover:shadow-lime-500/5 dark:hover:shadow-lime-400/5",
  },
  danger: {
    iconBg: "bg-rose-400/10 dark:bg-rose-500/15",
    iconColor: "text-rose-600 dark:text-rose-400",
    trendColor: "text-rose-600 dark:text-rose-400",
    accentBar: "from-rose-400 to-rose-300",
    shadow: "hover:shadow-rose-500/5 dark:hover:shadow-rose-400/5",
  },
  info: {
    iconBg: "bg-blue-400/10 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
    trendColor: "text-blue-600 dark:text-blue-400",
    accentBar: "from-blue-400 to-blue-300",
    shadow: "hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5",
  },
  warning: {
    iconBg: "bg-amber-400/10 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    trendColor: "text-amber-600 dark:text-amber-400",
    accentBar: "from-amber-400 to-amber-300",
    shadow: "hover:shadow-amber-500/5 dark:hover:shadow-amber-400/5",
  },
  neutral: {
    iconBg: "bg-slate-400/10 dark:bg-slate-500/15",
    iconColor: "text-slate-600 dark:text-slate-400",
    trendColor: "text-slate-600 dark:text-slate-400",
    accentBar: "from-slate-400 to-slate-300",
    shadow: "hover:shadow-slate-500/5 dark:hover:shadow-slate-400/5",
  },
  orange: {
    iconBg: "bg-orange-400/10 dark:bg-orange-500/15",
    iconColor: "text-orange-600 dark:text-orange-400",
    trendColor: "text-orange-600 dark:text-orange-400",
    accentBar: "from-orange-400 to-orange-300",
    shadow: "hover:shadow-orange-500/5 dark:hover:shadow-orange-400/5",
  },
};

export const GradientCard = ({ title, value, icon: Icon, trend, variant }: GradientCardProps) => {
  const config = variantConfig[variant];

  return (
    <div
      className={`relative overflow-hidden bg-card rounded-2xl p-6 transition-all duration-300 shadow-sm shadow-black/[0.04] dark:shadow-black/20 hover:shadow-xl ${config.shadow} hover:-translate-y-1 group`}
    >
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${config.accentBar} opacity-80`} />
      
      <div className="flex items-start justify-between mb-4">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{title}</p>
        <div className={`p-2.5 rounded-xl ${config.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`h-4 w-4 ${config.iconColor}`} />
        </div>
      </div>
      
      <p className="text-3xl font-bold tracking-tight text-foreground leading-none mb-3">{value}</p>
      
      {trend && (
        <div className={`flex items-center gap-1.5 text-xs font-semibold ${config.trendColor}`}>
          {trend.positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          <span>{trend.value}</span>
          <span className="text-muted-foreground font-normal ml-1">vs período anterior</span>
        </div>
      )}
    </div>
  );
};

export default GradientCard;
