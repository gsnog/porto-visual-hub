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
  };

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
    </div>
  );
};

export const SummaryCards = () => {
  // Primeira linha: Entrada → Saída → Saldo Acumulado → Saldo Total → Quantidade
  const summaryData: SummaryCardProps[] = [
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
      title: "Saldo Atual em Caixa",
      value: "R$ 87.939,88",
      icon: Wallet,
      trend: { value: "+12,5%", positive: true },
      variant: "info",
    },
    {
      title: "Total Recebido",
      value: "R$ 285.000,00",
      icon: DollarSign,
      variant: "success",
    },
  ];

  // Segunda linha: Entrada → Saída → Saldo Acumulado → Saldo Total → Quantidade
  const secondaryData: SummaryCardProps[] = [
    {
      title: "Total a Receber",
      value: "R$ 57.000,00",
      icon: Receipt,
      variant: "info",
    },
    {
      title: "Total a Pagar",
      value: "R$ 36.000,00",
      icon: CreditCard,
      variant: "warning",
    },
    {
      title: "Total Pago",
      value: "R$ 210.000,00",
      icon: CreditCard,
      variant: "danger",
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
