import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Building2, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Receipt, BarChart3
} from "lucide-react"
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts"

type DashboardType = "geral" | "financeiro" | "estoque" | "patrimonio"

// Mock Data
const evolutionData = [
  { month: "Jan", entradas: 45000, saidas: 32000, saldo: 13000 },
  { month: "Fev", entradas: 52000, saidas: 38000, saldo: 27000 },
  { month: "Mar", entradas: 48000, saidas: 35000, saldo: 40000 },
  { month: "Abr", entradas: 61000, saidas: 42000, saldo: 59000 },
  { month: "Mai", entradas: 55000, saidas: 48000, saldo: 66000 },
  { month: "Jun", entradas: 67000, saidas: 45000, saldo: 88000 },
]

const consumoSetorData = [
  { setor: "Produção", valor: 25000 },
  { setor: "Manutenção", valor: 18000 },
  { setor: "TI", valor: 12000 },
  { setor: "Administrativo", valor: 8000 },
  { setor: "Operacional", valor: 15000 },
]

const patrimonioTipoData = [
  { name: "Automóveis", value: 450000, color: "hsl(var(--primary))" },
  { name: "Equipamentos", value: 280000, color: "hsl(var(--success))" },
  { name: "Mobiliário", value: 95000, color: "hsl(var(--chart-3))" },
  { name: "Software", value: 75000, color: "hsl(var(--chart-4))" },
]

const contasStatusData = [
  { status: "Em Aberto", receber: 45000, pagar: 28000 },
  { status: "Vencidas", receber: 12000, pagar: 8000 },
  { status: "Pagas/Recebidas", receber: 85000, pagar: 62000 },
]

const estoqueUnidadeData = [
  { unidade: "Almoxarifado SP", valor: 125000 },
  { unidade: "TI Central", valor: 85000 },
  { unidade: "Manutenção", valor: 45000 },
  { unidade: "Almoxarifado RJ", valor: 65000 },
]

const topCustosData = [
  { codigo: "0001", item: "Automóvel Ford", valor: "R$ 85.000,00" },
  { codigo: "0015", item: "Servidor Dell", valor: "R$ 45.000,00" },
  { codigo: "0023", item: "Equipamento CNC", valor: "R$ 38.000,00" },
  { codigo: "0008", item: "Veículo Utilitário", valor: "R$ 32.000,00" },
  { codigo: "0042", item: "Sistema ERP", valor: "R$ 28.000,00" },
]

const topPatrimonioData = [
  { codigo: "0001", item: "Automóvel Ford Ranger", valor: "R$ 185.000,00" },
  { codigo: "0002", item: "Caminhão Mercedes", valor: "R$ 320.000,00" },
  { codigo: "0003", item: "Equipamento Industrial", valor: "R$ 95.000,00" },
  { codigo: "0004", item: "Servidor Principal", valor: "R$ 75.000,00" },
  { codigo: "0005", item: "Mobiliário Escritório", valor: "R$ 45.000,00" },
]

const ultimasMovimentacoes = [
  { tipo: "Pagamento", descricao: "Fornecedor ABC", valor: "R$ 5.430,00", data: "há 2 horas" },
  { tipo: "Recebimento", descricao: "Cliente XYZ", valor: "R$ 12.800,00", data: "há 4 horas" },
  { tipo: "Saída Estoque", descricao: "Parafusos M8 - 500un", valor: "R$ 250,00", data: "há 6 horas" },
  { tipo: "Pagamento", descricao: "Energia Elétrica", valor: "R$ 3.200,00", data: "ontem" },
  { tipo: "Recebimento", descricao: "Cliente ABC", valor: "R$ 8.500,00", data: "ontem" },
]

const inventarioData = [
  { item: "Parafuso M8", quantidade: 2500, unidade: "Almoxarifado SP", valor: "R$ 1.250,00" },
  { item: "Cabo HDMI", quantidade: 85, unidade: "TI Central", valor: "R$ 2.125,00" },
  { item: "Óleo Lubrificante", quantidade: 120, unidade: "Manutenção", valor: "R$ 5.400,00" },
  { item: "Papel A4", quantidade: 500, unidade: "Administrativo", valor: "R$ 1.500,00" },
]

const historicoPatrimonio = [
  { data: "05/01/2026", codigo: "0089", item: "Notebook Dell", valor: "R$ 8.500,00" },
  { data: "28/12/2025", codigo: "0088", item: "Impressora HP", valor: "R$ 3.200,00" },
  { data: "15/12/2025", codigo: "0087", item: "Ar Condicionado", valor: "R$ 4.800,00" },
  { data: "01/12/2025", codigo: "0086", item: "Mesa Escritório", valor: "R$ 1.200,00" },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

// Components
const MetricCard = ({ 
  title, value, icon: Icon, trend, trendValue, color = "primary" 
}: { 
  title: string
  value: string
  icon: any
  trend?: "up" | "down"
  trendValue?: string
  color?: "primary" | "success" | "destructive" | "warning"
}) => (
  <Card className="border border-border rounded-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && trendValue && (
        <p className={`text-xs flex items-center gap-1 ${trend === "up" ? "text-success" : "text-destructive"}`}>
          {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trendValue}
        </p>
      )}
    </CardContent>
  </Card>
)

const AlertCard = ({ title, count, type }: { title: string; count: number; type: "warning" | "danger" | "info" }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg ${
    type === "danger" ? "bg-destructive/10" : type === "warning" ? "bg-warning/10" : "bg-primary/10"
  }`}>
    <AlertTriangle className={`h-5 w-5 ${
      type === "danger" ? "text-destructive" : type === "warning" ? "text-warning" : "text-primary"
    }`} />
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className={`text-lg font-bold ${
        type === "danger" ? "text-destructive" : type === "warning" ? "text-warning" : "text-primary"
      }`}>{count}</p>
    </div>
  </div>
)

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Dashboard Geral
const DashboardGeral = () => (
  <div className="space-y-6">
    {/* Cards - Financeiro */}
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Financeiro</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Saldo Atual em Caixa" value="R$ 87.939,88" icon={Wallet} trend="up" trendValue="+12.5% mês" />
        <MetricCard title="Resultado do Período" value="R$ 22.000,00" icon={TrendingUp} trend="up" trendValue="+8.3% mês" color="success" />
        <MetricCard title="Total a Receber" value="R$ 57.000,00" icon={ArrowUpRight} color="success" />
        <MetricCard title="Total a Pagar" value="R$ 36.000,00" icon={ArrowDownRight} color="destructive" />
      </div>
    </div>

    {/* Cards - Estoque */}
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Estoque</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Valor Total em Estoque" value="R$ 320.000,00" icon={Package} />
        <MetricCard title="Quantidade de Itens" value="3.485" icon={Package} />
        <MetricCard title="Saídas no Período" value="R$ 45.000,00" icon={TrendingDown} trend="down" trendValue="-5.2% mês" color="warning" />
      </div>
    </div>

    {/* Cards - Patrimônio */}
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Patrimônio</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard title="Valor Total do Patrimônio" value="R$ 900.000,00" icon={Building2} trend="up" trendValue="+3.2% mês" />
        <MetricCard title="Itens Patrimoniais" value="156" icon={Building2} />
      </div>
    </div>

    {/* Gráficos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Evolução Financeira */}
      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Evolução Financeira no Tempo</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="entradas" name="Entradas" stroke="hsl(var(--success))" strokeWidth={2} />
              <Line type="monotone" dataKey="saidas" name="Saídas" stroke="hsl(var(--destructive))" strokeWidth={2} />
              <Line type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Entradas vs Saídas */}
      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Entradas vs Saídas por Período</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="entradas" name="Entradas" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" name="Saídas" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Consumo por Setor */}
      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Consumo de Estoque por Setor</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consumoSetorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis type="category" dataKey="setor" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" name="Consumo" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Distribuição Patrimônio */}
      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Distribuição do Patrimônio por Tipo</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={patrimonioTipoData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {patrimonioTipoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Alertas */}
    <Card className="border border-border rounded-lg p-4">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-base">Alertas</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AlertCard title="Contas a Pagar em Aberto" count={8} type="danger" />
        <AlertCard title="Contas a Receber em Aberto" count={12} type="warning" />
        <AlertCard title="Itens de Estoque Críticos" count={5} type="info" />
      </div>
    </Card>

    {/* Tabelas */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-border rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">Top 5 Maiores Custos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustosData.map((item) => (
                <TableRow key={item.codigo}>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-border rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">Top 5 Ativos Patrimoniais</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPatrimonioData.map((item) => (
                <TableRow key={item.codigo}>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

    {/* Últimas Movimentações */}
    <Card className="border border-border rounded-lg">
      <CardHeader>
        <CardTitle className="text-base">Últimas Movimentações Relevantes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ultimasMovimentacoes.map((mov, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  mov.tipo === "Recebimento" ? "bg-success" : mov.tipo === "Pagamento" ? "bg-destructive" : "bg-warning"
                }`} />
                <div>
                  <p className="font-medium text-sm">{mov.tipo}</p>
                  <p className="text-xs text-muted-foreground">{mov.descricao}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${
                  mov.tipo === "Recebimento" ? "text-success" : mov.tipo === "Pagamento" ? "text-destructive" : ""
                }`}>{mov.valor}</p>
                <p className="text-xs text-muted-foreground">{mov.data}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

// Dashboard Financeiro
const DashboardFinanceiro = () => (
  <div className="space-y-6">
    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard title="Saldo Atual em Caixa" value="R$ 87.939,88" icon={Wallet} trend="up" trendValue="+12.5%" />
      <MetricCard title="Total de Entradas" value="R$ 328.000,00" icon={ArrowUpRight} color="success" />
      <MetricCard title="Total de Saídas" value="R$ 240.000,00" icon={ArrowDownRight} color="destructive" />
      <MetricCard title="Resultado do Período" value="R$ 88.000,00" icon={TrendingUp} trend="up" trendValue="+8.3%" color="success" />
      <MetricCard title="Total Recebido" value="R$ 285.000,00" icon={DollarSign} color="success" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard title="Total a Receber" value="R$ 57.000,00" icon={Receipt} />
      <MetricCard title="Total Pago" value="R$ 210.000,00" icon={CreditCard} color="destructive" />
      <MetricCard title="Total a Pagar" value="R$ 36.000,00" icon={CreditCard} color="warning" />
      <MetricCard title="Títulos a Receber" value="R$ 43.000,00" icon={Receipt} />
      <MetricCard title="Títulos a Pagar" value="R$ 28.000,00" icon={Receipt} color="warning" />
    </div>

    {/* Gráficos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Evolução do Fluxo de Caixa</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionData}>
              <defs>
                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(var(--primary))" fill="url(#colorSaldo)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Contas por Status</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contasStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="status" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="receber" name="A Receber" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pagar" name="A Pagar" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Tabelas */}
    <Card className="border border-border rounded-lg">
      <CardHeader>
        <CardTitle className="text-base">Fluxo de Caixa Detalhado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ultimasMovimentacoes.filter(m => m.tipo !== "Saída Estoque").map((mov, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${mov.tipo === "Recebimento" ? "bg-success" : "bg-destructive"}`} />
                <div>
                  <p className="font-medium text-sm">{mov.tipo}</p>
                  <p className="text-xs text-muted-foreground">{mov.descricao}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${mov.tipo === "Recebimento" ? "text-success" : "text-destructive"}`}>
                  {mov.tipo === "Recebimento" ? "+" : "-"}{mov.valor}
                </p>
                <p className="text-xs text-muted-foreground">{mov.data}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

// Dashboard Estoque
const DashboardEstoque = () => (
  <div className="space-y-6">
    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard title="Itens em Estoque" value="3.485" icon={Package} />
      <MetricCard title="Valor Total em Estoque" value="R$ 320.000,00" icon={DollarSign} />
      <MetricCard title="Entradas no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend="up" trendValue="+15%" color="success" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard title="Saídas no Período" value="R$ 32.000,00" icon={ArrowDownRight} trend="down" trendValue="-8%" color="warning" />
      <MetricCard title="Requisições Pendentes" value="12" icon={Receipt} color="warning" />
      <MetricCard title="Itens Críticos" value="5" icon={AlertTriangle} color="destructive" />
    </div>

    {/* Gráficos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Consumo por Setor</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consumoSetorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis type="category" dataKey="setor" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" name="Consumo" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Estoque por Unidade</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={estoqueUnidadeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="unidade" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" name="Valor" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Tabela Inventário */}
    <Card className="border border-border rounded-lg">
      <CardHeader>
        <CardTitle className="text-base">Visão Geral do Inventário</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventarioData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell className="text-center">{item.quantidade}</TableCell>
                <TableCell>{item.unidade}</TableCell>
                <TableCell className="text-right font-semibold">{item.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
)

// Dashboard Patrimônio
const DashboardPatrimonio = () => (
  <div className="space-y-6">
    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard title="Total de Itens" value="156" icon={Building2} />
      <MetricCard title="Valor Total" value="R$ 900.000,00" icon={DollarSign} />
      <MetricCard title="Novos Bens no Período" value="8" icon={ArrowUpRight} trend="up" trendValue="+4 mês" color="success" />
      <MetricCard title="Valor Adquirido" value="R$ 45.000,00" icon={TrendingUp} />
      <MetricCard title="Tipos Ativos" value="4" icon={BarChart3} />
    </div>

    {/* Gráficos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Valor do Patrimônio por Tipo</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={patrimonioTipoData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {patrimonioTipoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="border border-border rounded-lg p-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-base">Top 5 Itens por Valor</CardTitle>
        </CardHeader>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topPatrimonioData.map(i => ({ ...i, valorNum: parseFloat(i.valor.replace(/[^\d,]/g, '').replace(',', '.')) * 1000 }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis type="category" dataKey="item" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valorNum" name="Valor" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Tabelas */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-border rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">Visão Geral do Patrimônio</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPatrimonioData.map((item) => (
                <TableRow key={item.codigo}>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-border rounded-lg">
        <CardHeader>
          <CardTitle className="text-base">Histórico de Aquisições</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicoPatrimonio.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.data}</TableCell>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Main Dashboard Component
const Dashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>("geral")
  const [filterPeriodo, setFilterPeriodo] = useState("")
  const [filterSetor, setFilterSetor] = useState("")

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        {/* Seletor de Dashboard */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-secondary rounded-lg p-1">
            {(["geral", "financeiro", "estoque", "patrimonio"] as DashboardType[]).map((type) => (
              <Button
                key={type}
                variant="ghost"
                size="sm"
                onClick={() => setActiveDashboard(type)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  activeDashboard === type
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-transparent"
                }`}
              >
                {type === "patrimonio" ? "Patrimônio" : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          {/* Filtros */}
          <div className="flex gap-2 ml-auto">
            <Input
              type="date"
              value={filterPeriodo}
              onChange={(e) => setFilterPeriodo(e.target.value)}
              className="filter-input w-40"
              placeholder="Período"
            />
            <Select value={filterSetor} onValueChange={setFilterSetor}>
              <SelectTrigger className="filter-input w-40">
                <SelectValue placeholder="Setor" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="producao">Produção</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="ti">TI</SelectItem>
                <SelectItem value="administrativo">Administrativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeDashboard === "geral" && <DashboardGeral />}
        {activeDashboard === "financeiro" && <DashboardFinanceiro />}
        {activeDashboard === "estoque" && <DashboardEstoque />}
        {activeDashboard === "patrimonio" && <DashboardPatrimonio />}
      </div>
    </div>
  )
}

export default Dashboard