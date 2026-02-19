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
      <div className="bg-card/98 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-2xl shadow-black/10 dark:shadow-black/30">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
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
      <div className="bg-card rounded-2xl p-4 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
        <div className="flex flex-wrap items-center gap-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Período:</span>
            <div className="flex gap-1 bg-muted/50 rounded-xl p-0.5">
              {["7d", "30d", "90d"].map(p => (
                <Button key={p} variant={periodo === p ? "default" : "ghost"} size="sm" onClick={() => setPeriodo(p)} className="h-7 px-2.5 text-xs rounded-lg">{p}</Button>
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

      {/* Hero Dark Accent Card */}
      <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-[#0B0D0F] via-[#131619] to-[#0B0D0F] shadow-xl shadow-black/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
        <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2">Valor Total no Pipeline</p>
        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-bold tracking-tight text-white">{formatCurrency(pipelineTotal)}</span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-lime-400/15 text-lime-400 border border-lime-400/20">+18% vs mês anterior</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-5">Pipeline por Etapa</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funilData} layout="vertical" barSize={18}>
                <defs>
                  <linearGradient id="comFunilGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={110} tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number, n: string, p: any) => [`${v} — ${formatCurrency(p.payload.amount)}`, 'Oportunidades']}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.5)', borderRadius: '12px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="url(#comFunilGrad)" radius={[4, 12, 12, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-5">Motivos de Perda</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={motivosPerdaData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" cornerRadius={6}>
                  {motivosPerdaData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`]}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.5)', borderRadius: '12px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }} />
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
