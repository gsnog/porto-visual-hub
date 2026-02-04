import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradientCard } from "@/components/financeiro/GradientCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Users, Target, FileText, TrendingUp, DollarSign, Calendar, Phone, 
  AlertTriangle, Filter, ArrowUpRight, ChevronRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, FunnelChart, Funnel, LabelList
} from "recharts";
import { useNavigate } from "react-router-dom";
import { 
  leadsMock, oportunidadesMock, atividadesMock, propostasMock,
  etapasFunil, getPipelineTotal, getForecastPonderado, getContaById
} from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { useState } from "react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export default function VisaoGeralComercial() {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState("30d");
  const [vendedor, setVendedor] = useState("__all__");

  // Métricas
  const leadsNovos = leadsMock.filter(l => l.status === 'novo').length;
  const opsAbertas = oportunidadesMock.filter(o => !['ganho', 'perdido'].includes(o.etapa)).length;
  const propostasPendentes = propostasMock.filter(p => p.status === 'enviada').length;
  const pipelineTotal = getPipelineTotal();
  const forecastMes = getForecastPonderado();
  const atividadesVencidas = atividadesMock.filter(a => 
    a.status === 'pendente' && new Date(a.data) < new Date()
  ).length;

  // Dados do funil
  const funilData = etapasFunil
    .filter(e => !['ganho', 'perdido'].includes(e.id))
    .map(etapa => ({
      name: etapa.nome,
      value: oportunidadesMock.filter(o => o.etapa === etapa.id).length,
      amount: oportunidadesMock
        .filter(o => o.etapa === etapa.id)
        .reduce((sum, o) => sum + o.valorEstimado, 0)
    }));

  // Ranking de vendedores
  const rankingVendedores = pessoasMock.slice(0, 5).map(p => {
    const ops = oportunidadesMock.filter(o => o.proprietarioId === p.id);
    const ganhas = ops.filter(o => o.etapa === 'ganho');
    const receita = ganhas.reduce((sum, o) => sum + o.valorEstimado, 0);
    const total = ops.length;
    const taxa = total > 0 ? (ganhas.length / total * 100) : 0;
    return {
      nome: p.nome.split(' ')[0],
      receita,
      taxa: taxa.toFixed(0),
      atividades: atividadesMock.filter(a => a.responsavelId === p.id).length
    };
  }).sort((a, b) => b.receita - a.receita);

  // Motivos de perda (mock)
  const motivosPerdaData = [
    { name: 'Preço', value: 35, color: 'hsl(var(--destructive))' },
    { name: 'Concorrência', value: 25, color: 'hsl(var(--warning))' },
    { name: 'Timing', value: 20, color: 'hsl(var(--primary))' },
    { name: 'Orçamento', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Outros', value: 5, color: 'hsl(var(--muted-foreground))' },
  ];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Período:</span>
            <div className="flex gap-1">
              {["7d", "30d", "90d", "1y"].map((p) => (
                <Button
                  key={p}
                  variant={periodo === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriodo(p)}
                  className="h-8 px-3"
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Vendedor:</span>
            <Select value={vendedor} onValueChange={setVendedor}>
              <SelectTrigger className="w-[180px] h-8">
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
          title="Leads Novos"
          value={leadsNovos.toString()}
          icon={Users}
          variant="info"
          trend={{ value: "+12%", positive: true }}
        />
        <GradientCard
          title="Oportunidades Abertas"
          value={opsAbertas.toString()}
          icon={Target}
          variant="warning"
          trend={{ value: "+5%", positive: true }}
        />
        <GradientCard
          title="Pipeline Total"
          value={formatCurrency(pipelineTotal)}
          icon={DollarSign}
          variant="success"
          trend={{ value: "+18%", positive: true }}
        />
        <GradientCard
          title="Forecast do Mês"
          value={formatCurrency(forecastMes)}
          icon={TrendingUp}
          variant="orange"
        />
      </div>

      {/* Segunda linha de cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border rounded p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/comercial/propostas')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Propostas Pendentes</p>
                <p className="text-2xl font-bold">{propostasPendentes}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>

        <Card className="border border-border rounded p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/comercial/atividades')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atividades Hoje</p>
                <p className="text-2xl font-bold">{atividadesMock.filter(a => a.data === '2026-02-04').length}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>

        <Card className="border border-border rounded p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Atividades Vencidas</p>
              <p className="text-2xl font-bold text-destructive">{atividadesVencidas}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funil de Vendas */}
        <Card className="border border-border rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Funil de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funilData} layout="vertical">
                <XAxis type="number" tickFormatter={(v) => `${v}`} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `${value} ops - ${formatCurrency(props.payload.amount)}`,
                    'Oportunidades'
                  ]}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ranking Vendedores */}
        <Card className="border border-border rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Ranking de Vendedores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rankingVendedores.map((v, i) => (
                <div key={v.nome} className="flex items-center justify-between p-3 rounded bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-semibold">
                      {i + 1}
                    </span>
                    <span className="font-medium">{v.nome}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{v.taxa}% conv.</span>
                    <span className="font-semibold">{formatCurrency(v.receita)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivos de Perda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Motivos de Perda</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={motivosPerdaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {motivosPerdaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Percentual']}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {motivosPerdaData.map(m => (
                <div key={m.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-xs text-muted-foreground">{m.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximas Atividades */}
        <Card className="border border-border rounded">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Próximas Atividades</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/comercial/atividades')}>
              Ver todas <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {atividadesMock.filter(a => a.status === 'pendente').slice(0, 5).map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 rounded border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${
                      a.tipo === 'reuniao' ? 'bg-primary/10' : 
                      a.tipo === 'ligacao' ? 'bg-success/10' : 'bg-warning/10'
                    }`}>
                      {a.tipo === 'reuniao' ? <Calendar className="h-4 w-4 text-primary" /> :
                       a.tipo === 'ligacao' ? <Phone className="h-4 w-4 text-success" /> :
                       <FileText className="h-4 w-4 text-warning" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{a.titulo}</p>
                      <p className="text-xs text-muted-foreground">{a.data} {a.hora && `às ${a.hora}`}</p>
                    </div>
                  </div>
                  <StatusBadge 
                    status={a.tipo === 'reuniao' ? 'Em andamento' : a.tipo === 'ligacao' ? 'Normal' : 'Processando'} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
