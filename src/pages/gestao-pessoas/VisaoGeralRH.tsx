import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, AlertTriangle, Building2, TrendingUp } from "lucide-react";
import { getEstatisticasRH, pessoasMock } from "@/data/pessoas-mock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function VisaoGeralRH() {
  const stats = getEstatisticasRH();

  const pieData = [
    { name: "Ativos", value: stats.ativos, color: "hsl(var(--success))" },
    { name: "Afastados", value: stats.afastados, color: "hsl(var(--warning))" },
    { name: "Desligados", value: stats.desligados, color: "hsl(var(--destructive))" },
  ];

  const barData = stats.porSetor.filter(s => s.quantidade > 0);

  // Últimas alterações mockadas
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
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Pessoas</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded bg-green-500/10">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold text-green-600">{stats.ativos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded bg-yellow-500/10">
                <UserX className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Afastados</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.afastados}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded bg-red-500/10">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sem Gestor</p>
                <p className="text-2xl font-bold text-red-600">{stats.semGestor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Status */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pessoas por Setor */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Pessoas por Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="setor" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Últimas Alterações / Auditoria */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Últimas Alterações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ultimasAlteracoes.map((alt) => (
              <div key={alt.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-muted">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{alt.acao}</p>
                    <p className="text-sm text-muted-foreground">{alt.pessoa}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">{alt.data}</p>
                  <p className="text-xs text-muted-foreground">por {alt.usuario}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
