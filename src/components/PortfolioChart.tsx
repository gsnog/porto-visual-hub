import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const mockData = [
  { month: "Jul", value: 85000 },
  { month: "Ago", value: 92000 },
  { month: "Set", value: 88000 },
  { month: "Out", value: 115000 },
  { month: "Nov", value: 108000 },
  { month: "Dez", value: 125000 },
  { month: "Jan", value: 142000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatYAxis = (value: number) => {
  return `R$${(value / 1000).toFixed(0)}k`;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-muted/70 dark:bg-muted/60 backdrop-blur-xl border border-border/50 rounded-xl p-3.5 shadow-2xl">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-bold text-foreground">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function PortfolioChart() {
  const totalValue = mockData[mockData.length - 1].value;
  const previousValue = mockData[mockData.length - 2].value;
  const percentChange = ((totalValue - previousValue) / previousValue) * 100;

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 bg-card border border-border shadow-xl shadow-black/5 dark:shadow-black/20">
      {/* Subtle glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">Balanço do Portfólio</p>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-bold tracking-tight text-foreground">
              {formatCurrency(totalValue)}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/20">
              +{percentChange.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative z-10 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity={0.08} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickFormatter={formatYAxis}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#heroGradient)"
              dot={false}
              activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
