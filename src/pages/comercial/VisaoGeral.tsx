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
  PieChart, Pie, Cell
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

const tooltipStyle = { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.5)', borderRadius: '12px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' };

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

  // Motivos de perda
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
      <div className="bg-card rounded-2xl p-4 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Filtros:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Período:</span>
            <div className="flex gap-1 bg-muted/50 rounded-xl p-0.5">
              {["7d", "30d", "90d", "1y"].map((p) => (
                <Button
                  key={p}
                  variant={periodo === p ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriodo(p)}
                  className="h-7 px-2.5 text-xs rounded-lg"
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Vendedor:</span>
            <Select value={vendedor} onValueChange={setVendedor}>
              <SelectTrigger className="w-[180px] h-7 text-xs">
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
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Leads Novos" value={leadsNovos.toString()} icon={Users} variant="info" trend={{ value: "+12%", positive: true }} />
        <GradientCard title="Oportunidades Abertas" value={opsAbertas.toString()} icon={Target} variant="warning" trend={{ value: "+5%", positive: true }} />
        <GradientCard title="Pipeline Total" value={formatCurrency(pipelineTotal)} icon={DollarSign} variant="success" trend={{ value: "+18%", positive: true }} />
        <GradientCard title="Forecast do Mês" value={formatCurrency(forecastMes)} icon={TrendingUp} variant="orange" />
      </div>

      {/* Segunda linha de cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-5 shadow-sm shadow-black/[0.04] dark:shadow-black/20 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          onClick={() => navigate('/comercial/propostas')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">Propostas Pendentes</p>
                <p className="text-3xl font-bold mt-1">{propostasPendentes}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm shadow-black/[0.04] dark:shadow-black/20 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          onClick={() => navigate('/comercial/atividades')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">Atividades Hoje</p>
                <p className="text-3xl font-bold mt-1">{atividadesMock.filter(a => a.data === '2026-02-04').length}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">Atividades Vencidas</p>
              <p className="text-3xl font-bold text-destructive mt-1">{atividadesVencidas}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funil de Vendas */}
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold mb-5">Funil de Vendas</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funilData} layout="vertical">
                <defs>
                  <linearGradient id="visaoFunilGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis type="number" tickFormatter={(v) => `${v}`} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `${value} ops - ${formatCurrency(props.payload.amount)}`,
                    'Oportunidades'
                  ]}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="value" fill="url(#visaoFunilGrad)" radius={[4, 12, 12, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ranking Vendedores */}
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold mb-5">Ranking de Vendedores</h3>
          <div className="space-y-3">
            {rankingVendedores.map((v, i) => (
              <div key={v.nome} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
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
        </div>
      </div>

      {/* Motivos de Perda + Próximas Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold mb-5">Motivos de Perda</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={motivosPerdaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  cornerRadius={6}
                >
                  {motivosPerdaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Percentual']}
                  contentStyle={tooltipStyle}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {motivosPerdaData.map(m => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-xs text-muted-foreground">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Próximas Atividades */}
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold">Próximas Atividades</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/comercial/atividades')}>
              Ver todas <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {atividadesMock.filter(a => a.status === 'pendente').slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
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
        </div>
      </div>
    </div>
  );
}
