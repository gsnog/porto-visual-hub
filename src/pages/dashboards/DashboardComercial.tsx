import { GradientCard } from "@/components/financeiro/GradientCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Target, DollarSign, TrendingUp, Users, BarChart3, Filter, Calendar, Phone, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { oportunidadesMock, etapasFunil, getPipelineTotal, getForecastPonderado, metasMock, atividadesMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

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
    { name: 'Concorrência', value: 25, color: 'hsl(var(--warning))' },
    { name: 'Timing', value: 20, color: 'hsl(var(--primary))' },
    { name: 'Outros', value: 20, color: 'hsl(var(--muted-foreground))' },
  ];

  return (
    <div className="space-y-6">
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Período:</span>
          <div className="flex gap-1">
            {["7d", "30d", "90d"].map(p => (
              <Button key={p} variant={periodo === p ? "default" : "outline"} size="sm" onClick={() => setPeriodo(p)} className="h-8 px-3">{p}</Button>
            ))}
          </div>
          <Select value={vendedor} onValueChange={setVendedor}>
            <SelectTrigger className="w-[180px] h-8"><SelectValue placeholder="Todos os vendedores" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Todos</SelectItem>
              {pessoasMock.slice(0, 5).map(p => <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Pipeline Total" value={formatCurrency(pipelineTotal)} icon={DollarSign} variant="info" trend={{ value: "+18%", positive: true }} />
        <GradientCard title="Forecast Ponderado" value={formatCurrency(forecastMes)} icon={TrendingUp} variant="warning" />
        <GradientCard title="Meta vs Realizado" value={`${(realizadoTotal/metaTotal*100).toFixed(0)}%`} icon={Target} variant="success" />
        <GradientCard title="Atividades Vencidas" value={atividadesVencidas.toString()} icon={AlertTriangle} variant="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Pipeline por Etapa</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={funilData} layout="vertical">
                <XAxis type="number" tickFormatter={(v) => `${v}`} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number, n: string, p: any) => [`${v} - ${formatCurrency(p.payload.amount)}`, 'Oportunidades']} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border rounded">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Motivos de Perda</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={motivosPerdaData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {motivosPerdaData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {motivosPerdaData.map(m => (
                <div key={m.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} /><span className="text-xs">{m.name}</span></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
