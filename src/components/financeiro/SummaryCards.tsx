import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Receipt, CreditCard, DollarSign, PiggyBank } from "lucide-react";
import { GradientCard, type GradientCardProps } from "./GradientCard";

export const SummaryCards = () => {
  const summaryData: GradientCardProps[] = [
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

  const secondaryData: GradientCardProps[] = [
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
          <GradientCard key={index} {...item} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {secondaryData.map((item, index) => (
          <GradientCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
