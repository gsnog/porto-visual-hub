import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
      <div className="bg-card border border-border rounded p-3 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
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
    <div className="bg-card border border-border rounded p-6">
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Balanço do Portfólio</p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              {formatCurrency(totalValue)}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-lime-400/10 text-lime-600 dark:bg-lime-400/15 dark:text-lime-400">
              +{percentChange.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
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
              strokeWidth={2.5}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
