import { GradientCard } from "@/components/financeiro/GradientCard";
import { Users, UserCheck, UserX, AlertTriangle, TrendingUp } from "lucide-react";
import { getEstatisticasRH } from "@/data/pessoas-mock";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const tooltipStyle = { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.5)', borderRadius: '12px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' };

export default function VisaoGeralRH() {
  const stats = getEstatisticasRH();

  const pieData = [
    { name: "Ativos", value: stats.ativos, color: "hsl(72 100% 50%)" },
    { name: "Afastados", value: stats.afastados, color: "hsl(45 100% 50%)" },
    { name: "Desligados", value: stats.desligados, color: "hsl(0 80% 60%)" },
  ];

  const barData = stats.porSetor.filter(s => s.quantidade > 0);

  const ultimasAlteracoes = [
    { id: 1, acao: "Cadastro criado", pessoa: "Gabriela Nunes", data: "04/02/2026 14:30", usuario: "Maria Oliveira" },
    { id: 2, acao: "Gestor alterado", pessoa: "Henrique Dias", data: "03/02/2026 11:15", usuario: "Maria Oliveira" },
    { id: 3, acao: "Status alterado para Afastado", pessoa: "Henrique Dias", data: "03/02/2026 10:00", usuario: "Maria Oliveira" },
    { id: 4, acao: "Salário atualizado", pessoa: "Pedro Piaes", data: "01/02/2026 09:45", usuario: "Maria Oliveira" },
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Total de Pessoas" value={stats.total.toString()} icon={Users} variant="info" />
        <GradientCard title="Ativos" value={stats.ativos.toString()} icon={UserCheck} variant="success" trend={{ value: "+3%", positive: true }} />
        <GradientCard title="Afastados" value={stats.afastados.toString()} icon={UserX} variant="warning" />
        <GradientCard title="Sem Gestor" value={stats.semGestor.toString()} icon={AlertTriangle} variant="danger" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Status */}
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-5">Distribuição por Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  cornerRadius={6}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pessoas por Setor */}
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-5">Pessoas por Setor</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <defs>
                  <linearGradient id="rhSetorGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="setor" type="category" width={100} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="quantidade" fill="url(#rhSetorGrad)" radius={[4, 12, 12, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Últimas Alterações */}
      <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
        <h3 className="text-sm font-semibold text-foreground mb-5">Últimas Alterações</h3>
        <div className="space-y-1">
          {ultimasAlteracoes.map((alt) => (
            <div key={alt.id} className="flex items-center justify-between py-3.5 border-b border-border/20 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-muted">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{alt.acao}</p>
                  <p className="text-xs text-muted-foreground">{alt.pessoa}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground">{alt.data}</p>
                <p className="text-xs text-muted-foreground">por {alt.usuario}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
