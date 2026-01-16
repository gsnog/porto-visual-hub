import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Receipt, CreditCard, DollarSign, BarChart3, PiggyBank } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant: "success" | "danger" | "info" | "warning" | "neutral";
}

const SummaryCard = ({ title, value, icon: Icon, trend, variant }: SummaryCardProps) => {
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
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${styles.bg} p-5 text-white shadow-lg ${styles.shadow} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-white/20 p-2.5 backdrop-blur-sm">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              trend.positive
                ? "bg-white/20 text-white"
                : "bg-white/20 text-white"
            }`}
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

export const SummaryCards = () => {
  const summaryData: SummaryCardProps[] = [
    {
      title: "Saldo Atual em Caixa",
      value: "R$ 87.939,88",
      icon: Wallet,
      trend: { value: "+12,5%", positive: true },
      variant: "info",
    },
    {
      title: "Total de Entradas",
      value: "R$ 328.000,00",
      icon: ArrowUpRight,
      trend: { value: "+18,3%", positive: true },
      variant: "success",
    },
    {
      title: "Total de Saídas",
      value: "R$ 240.000,00",
      icon: ArrowDownRight,
      trend: { value: "-5,2%", positive: false },
      variant: "danger",
    },
    {
      title: "Resultado do Período",
      value: "R$ 88.000,00",
      icon: TrendingUp,
      trend: { value: "+8,3%", positive: true },
      variant: "success",
    },
    {
      title: "Total Recebido",
      value: "R$ 285.000,00",
      icon: DollarSign,
      variant: "success",
    },
  ];

  const secondaryData: SummaryCardProps[] = [
    {
      title: "Total a Receber",
      value: "R$ 57.000,00",
      icon: Receipt,
      variant: "info",
    },
    {
      title: "Total Pago",
      value: "R$ 210.000,00",
      icon: CreditCard,
      variant: "danger",
    },
    {
      title: "Total a Pagar",
      value: "R$ 36.000,00",
      icon: CreditCard,
      variant: "warning",
    },
    {
      title: "Títulos a Receber",
      value: "R$ 43.000,00",
      icon: Receipt,
      variant: "neutral",
    },
    {
      title: "Títulos a Pagar",
      value: "R$ 28.000,00",
      icon: PiggyBank,
      variant: "warning",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {secondaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
