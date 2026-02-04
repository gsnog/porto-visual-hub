import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { GradientCard } from "@/components/financeiro/GradientCard";
import { 
  Target, TrendingUp, DollarSign, Users, Calendar, BarChart3
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";
import { metasMock, oportunidadesMock, etapasFunil, getForecastPonderado, getPipelineTotal } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export default function MetasForecast() {
  const [periodo, setPeriodo] = useState("2026-02");
  const [vendedor, setVendedor] = useState("__all__");

  // Métricas gerais
  const pipelineTotal = getPipelineTotal();
  const forecastPonderado = getForecastPonderado();
  
  // Meta total do período
  const metasPeriodo = metasMock.filter(m => m.periodo === periodo && m.tipo === 'receita');
  const metaTotal = metasPeriodo.reduce((sum, m) => sum + m.valorMeta, 0);
  const realizadoTotal = metasPeriodo.reduce((sum, m) => sum + m.valorRealizado, 0);
  const gapMeta = metaTotal - realizadoTotal;
  const progressoMeta = metaTotal > 0 ? (realizadoTotal / metaTotal) * 100 : 0;

  // Dados por vendedor
  const vendedoresData = pessoasMock.slice(0, 5).map(p => {
    const metas = metasMock.filter(m => m.vendedorId === p.id && m.periodo === periodo);
    const metaReceita = metas.find(m => m.tipo === 'receita');
    const ops = oportunidadesMock.filter(o => o.proprietarioId === p.id && !['ganho', 'perdido'].includes(o.etapa));
    const forecast = ops.reduce((sum, o) => sum + (o.valorEstimado * o.probabilidade / 100), 0);
    
    return {
      nome: p.nome.split(' ')[0],
      meta: metaReceita?.valorMeta || 0,
      realizado: metaReceita?.valorRealizado || 0,
      forecast,
      pipeline: ops.reduce((sum, o) => sum + o.valorEstimado, 0)
    };
  });

  // Evolução mensal (mock)
  const evolucaoData = [
    { mes: 'Jan', meta: 450000, realizado: 420000, forecast: 480000 },
    { mes: 'Fev', meta: 450000, realizado: realizadoTotal, forecast: forecastPonderado },
    { mes: 'Mar', meta: 500000, realizado: 0, forecast: 520000 },
    { mes: 'Abr', meta: 500000, realizado: 0, forecast: 510000 },
  ];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Período:</span>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026-01">Janeiro 2026</SelectItem>
                <SelectItem value="2026-02">Fevereiro 2026</SelectItem>
                <SelectItem value="2026-03">Março 2026</SelectItem>
                <SelectItem value="2026-Q1">Q1 2026</SelectItem>
                <SelectItem value="2026">Ano 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Vendedor:</span>
            <Select value={vendedor} onValueChange={setVendedor}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Todos</SelectItem>
                {pessoasMock.slice(0, 5).map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard
          title="Meta do Período"
          value={formatCurrency(metaTotal)}
          icon={Target}
          variant="info"
        />
        <GradientCard
          title="Realizado"
          value={formatCurrency(realizadoTotal)}
          icon={DollarSign}
          variant="success"
          trend={{ value: `${progressoMeta.toFixed(0)}%`, positive: progressoMeta >= 80 }}
        />
        <GradientCard
          title="Forecast Ponderado"
          value={formatCurrency(forecastPonderado)}
          icon={TrendingUp}
          variant="warning"
        />
        <GradientCard
          title="Gap para Meta"
          value={formatCurrency(gapMeta)}
          icon={BarChart3}
          variant={gapMeta > 0 ? "danger" : "success"}
        />
      </div>

      {/* Progresso da Meta */}
      <Card className="border border-border rounded">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Progresso da Meta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Realizado vs Meta</span>
              <span className="font-semibold">{progressoMeta.toFixed(1)}%</span>
            </div>
            <Progress value={progressoMeta} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-success">{formatCurrency(realizadoTotal)} realizado</span>
              <span className="text-muted-foreground">{formatCurrency(metaTotal)} meta</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metas por Vendedor */}
        <Card className="border border-border rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Metas por Vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendedoresData} layout="vertical">
                <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <YAxis dataKey="nome" type="category" width={80} tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Bar dataKey="meta" name="Meta" fill="hsl(var(--muted-foreground))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="realizado" name="Realizado" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Forecast por Vendedor */}
        <Card className="border border-border rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Forecast por Vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendedoresData.map(v => {
                const atingimento = v.meta > 0 ? ((v.realizado + v.forecast) / v.meta) * 100 : 0;
                return (
                  <div key={v.nome} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{v.nome}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Forecast: {formatCurrency(v.forecast)}
                        </span>
                        <span className={atingimento >= 100 ? 'text-success' : atingimento >= 80 ? 'text-warning' : 'text-destructive'}>
                          {atingimento.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div 
                        className="bg-success rounded-l"
                        style={{ width: `${Math.min(v.realizado / v.meta * 100, 100)}%` }}
                      />
                      <div 
                        className="bg-warning/60 rounded-r"
                        style={{ width: `${Math.min(v.forecast / v.meta * 100, 100 - (v.realizado / v.meta * 100))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evolução Mensal */}
      <Card className="border border-border rounded">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Evolução Meta vs Realizado vs Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolucaoData}>
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Line type="monotone" dataKey="meta" name="Meta" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="realizado" name="Realizado" stroke="hsl(var(--success))" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" name="Forecast" stroke="hsl(var(--warning))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
