import { GradientCard } from "@/components/financeiro/GradientCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Target, DollarSign, TrendingUp, Users, AlertTriangle, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { oportunidadesMock, etapasFunil, getPipelineTotal, getForecastPonderado, metasMock, atividadesMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const axisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded p-3 shadow-xl backdrop-blur-sm">
        <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardComercial() {
  const [periodo, setPeriodo] = useState("30d");
  const [vendedor, setVendedor] = useState("__all__");

  const pipelineTotal = getPipelineTotal();
  const forecastMes = getForecastPonderado();
  const metaTotal = metasMock.filter(m => m.tipo === 'receita').reduce((sum, m) => sum + m.valorMeta, 0);
  const realizadoTotal = metasMock.filter(m => m.tipo === 'receita').reduce((sum, m) => sum + m.valorRealizado, 0);
  const atividadesVencidas = atividadesMock.filter(a => a.status === 'pendente' && new Date(a.data) < new Date()).length;

  const funilData = etapasFunil.filter(e => !['ganho', 'perdido'].includes(e.id)).map(etapa => ({
    name: etapa.nome, value: oportunidadesMock.filter(o => o.etapa === etapa.id).length,
    amount: oportunidadesMock.filter(o => o.etapa === etapa.id).reduce((sum, o) => sum + o.valorEstimado, 0)
  }));

  const motivosPerdaData = [
    { name: 'Preço', value: 35, color: 'hsl(var(--destructive))' },
    { name: 'Concorrência', value: 25, color: 'hsl(45 90% 55%)' },
    { name: 'Timing', value: 20, color: 'hsl(var(--primary))' },
    { name: 'Outros', value: 20, color: 'hsl(var(--muted-foreground))' },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-card border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Período:</span>
            <div className="flex gap-1">
              {["7d", "30d", "90d"].map(p => (
                <Button key={p} variant={periodo === p ? "default" : "outline"} size="sm" onClick={() => setPeriodo(p)} className="h-7 px-2.5 text-xs">{p}</Button>
              ))}
            </div>
          </div>
          <Select value={vendedor} onValueChange={setVendedor}>
            <SelectTrigger className="w-[180px] h-7 text-xs"><SelectValue placeholder="Todos os vendedores" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Todos</SelectItem>
              {pessoasMock.slice(0, 5).map(p => <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Pipeline Total" value={formatCurrency(pipelineTotal)} icon={DollarSign} variant="info" trend={{ value: "+18%", positive: true }} />
        <GradientCard title="Forecast Ponderado" value={formatCurrency(forecastMes)} icon={TrendingUp} variant="warning" />
        <GradientCard title="Meta vs Realizado" value={`${(realizadoTotal/metaTotal*100).toFixed(0)}%`} icon={Target} variant="success" />
        <GradientCard title="Atividades Vencidas" value={atividadesVencidas.toString()} icon={AlertTriangle} variant="danger" />
      </div>

      {/* Hero Stat */}
      <div className="bg-card border border-border rounded p-6">
        <p className="text-sm text-muted-foreground mb-2">Valor Total no Pipeline</p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold tracking-tight text-foreground">{formatCurrency(pipelineTotal)}</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-lime-400/10 text-lime-600 dark:bg-lime-400/15 dark:text-lime-400">+18% vs mês anterior</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Pipeline por Etapa</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funilData} layout="vertical" barSize={18}>
                <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={110} tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number, n: string, p: any) => [`${v} — ${formatCurrency(p.payload.amount)}`, 'Oportunidades']}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px' }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Motivos de Perda</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={motivosPerdaData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {motivosPerdaData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`]}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-3">
            {motivosPerdaData.map(m => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-xs text-muted-foreground">{m.name} ({m.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
