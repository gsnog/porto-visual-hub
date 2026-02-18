import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { HelpTooltip } from "@/components/HelpTooltip";

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
    border: "border-l-lime-400 dark:border-l-lime-400",
    iconBg: "bg-lime-400/10 dark:bg-lime-500/15",
    iconColor: "text-lime-600 dark:text-lime-400",
    trendBg: "bg-lime-400/10 text-lime-700 dark:bg-lime-400/15 dark:text-lime-400",
  },
  danger: {
    border: "border-l-rose-400 dark:border-l-rose-400",
    iconBg: "bg-rose-400/10 dark:bg-rose-500/15",
    iconColor: "text-rose-600 dark:text-rose-400",
    trendBg: "bg-rose-400/10 text-rose-700 dark:bg-rose-400/15 dark:text-rose-400",
  },
  info: {
    border: "border-l-blue-400 dark:border-l-blue-400",
    iconBg: "bg-blue-400/10 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
    trendBg: "bg-blue-400/10 text-blue-700 dark:bg-blue-400/15 dark:text-blue-400",
  },
  warning: {
    border: "border-l-amber-400 dark:border-l-amber-400",
    iconBg: "bg-amber-400/10 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    trendBg: "bg-amber-400/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-400",
  },
  neutral: {
    border: "border-l-slate-400 dark:border-l-slate-500",
    iconBg: "bg-slate-400/10 dark:bg-slate-500/15",
    iconColor: "text-slate-600 dark:text-slate-400",
    trendBg: "bg-slate-400/10 text-slate-700 dark:bg-slate-400/15 dark:text-slate-400",
  },
  orange: {
    border: "border-l-orange-400 dark:border-l-orange-400",
    iconBg: "bg-orange-400/10 dark:bg-orange-500/15",
    iconColor: "text-orange-600 dark:text-orange-400",
    trendBg: "bg-orange-400/10 text-orange-700 dark:bg-orange-400/15 dark:text-orange-400",
  },
};

export const GradientCard = ({ title, value, icon: Icon, trend, variant, helpText }: GradientCardProps) => {
  const config = variantConfig[variant];

  return (
    <div
      className={`relative bg-card border border-border ${config.border} border-l-[3px] rounded p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 group`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded ${config.iconBg}`}>
          <Icon className={`h-4 w-4 ${config.iconColor}`} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${config.trendBg}`}
          >
            {trend.positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {trend.value}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 mb-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <HelpTooltip text={helpText || `Indicador: ${title}.`} size={12} />
      </div>
      <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
    </div>
  );
};

export default GradientCard;
