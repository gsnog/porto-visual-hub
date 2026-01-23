import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PortfolioChart } from "@/components/PortfolioChart"
import { SummaryCards } from "@/components/financeiro/SummaryCards"
import { StatusBadge } from "@/components/StatusBadge"
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Building2, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Receipt, BarChart3, Filter
} from "lucide-react"
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts"

type DashboardType = "geral" | "financeiro" | "estoque" | "patrimonio"
type PeriodoType = "1h" | "24h" | "7d" | "30d" | "90d" | "1y"
type TipoType = "todos" | "financeiro" | "estoque" | "patrimonio"

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

const contasReceberData = [
  { codigo: "CR001", cliente: "Cliente ABC", vencimento: "20/01/2026", valor: "R$ 15.000,00", status: "Em Aberto" },
  { codigo: "CR002", cliente: "Cliente XYZ", vencimento: "25/01/2026", valor: "R$ 8.500,00", status: "Em Aberto" },
  { codigo: "CR003", cliente: "Cliente DEF", vencimento: "15/01/2026", valor: "R$ 12.000,00", status: "Vencida" },
  { codigo: "CR004", cliente: "Cliente GHI", vencimento: "10/01/2026", valor: "R$ 21.500,00", status: "Recebida" },
]

const contasPagarData = [
  { codigo: "CP001", beneficiario: "Fornecedor A", vencimento: "22/01/2026", valor: "R$ 8.000,00", status: "Em Aberto" },
  { codigo: "CP002", beneficiario: "Fornecedor B", vencimento: "18/01/2026", valor: "R$ 5.500,00", status: "Vencida" },
  { codigo: "CP003", beneficiario: "Fornecedor C", vencimento: "28/01/2026", valor: "R$ 14.500,00", status: "Em Aberto" },
  { codigo: "CP004", beneficiario: "Fornecedor D", vencimento: "05/01/2026", valor: "R$ 10.000,00", status: "Paga" },
]

const documentosFiscaisData = [
  { numero: "NF-001234", tipo: "NF-e", emissao: "10/01/2026", valor: "R$ 25.000,00", status: "Processada" },
  { numero: "NF-001235", tipo: "NF-e", emissao: "12/01/2026", valor: "R$ 18.500,00", status: "Processada" },
  { numero: "XML-5678", tipo: "XML", emissao: "14/01/2026", valor: "R$ 32.000,00", status: "Pendente" },
  { numero: "NI-0089", tipo: "NI", emissao: "15/01/2026", valor: "R$ 5.200,00", status: "Processada" },
]

const tipoDocumentoData = [
  { name: "NF-e", value: 65, color: "hsl(var(--primary))" },
  { name: "XML", value: 25, color: "hsl(var(--success))" },
  { name: "NI", value: 10, color: "hsl(var(--chart-3))" },
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
  { item: "Parafuso M8", quantidade: 2500, unidade: "Almoxarifado SP", valor: "R$ 1.250,00", status: "Normal" },
  { item: "Cabo HDMI", quantidade: 85, unidade: "TI Central", valor: "R$ 2.125,00", status: "Normal" },
  { item: "Óleo Lubrificante", quantidade: 120, unidade: "Manutenção", valor: "R$ 5.400,00", status: "Crítico" },
  { item: "Papel A4", quantidade: 500, unidade: "Administrativo", valor: "R$ 1.500,00", status: "Normal" },
  { item: "Tinta Impressora", quantidade: 8, unidade: "TI Central", valor: "R$ 640,00", status: "Crítico" },
]

const estoqueEvolutionData = [
  { month: "Jan", quantidade: 3200, valor: 280000 },
  { month: "Fev", quantidade: 3350, valor: 295000 },
  { month: "Mar", quantidade: 3180, valor: 285000 },
  { month: "Abr", quantidade: 3420, valor: 310000 },
  { month: "Mai", quantidade: 3380, valor: 315000 },
  { month: "Jun", quantidade: 3485, valor: 320000 },
]

const topItensEstoqueData = [
  { codigo: "EST001", item: "Parafuso M8", quantidade: 2500, valor: "R$ 1.250,00" },
  { codigo: "EST002", item: "Porca Sextavada", quantidade: 1800, valor: "R$ 900,00" },
  { codigo: "EST003", item: "Arruela Lisa", quantidade: 1500, valor: "R$ 450,00" },
  { codigo: "EST004", item: "Cabo Elétrico 2.5mm", quantidade: 1200, valor: "R$ 3.600,00" },
  { codigo: "EST005", item: "Papel A4", quantidade: 500, valor: "R$ 1.500,00" },
  { codigo: "EST006", item: "Lubrificante WD-40", quantidade: 450, valor: "R$ 2.250,00" },
  { codigo: "EST007", item: "Fita Isolante", quantidade: 380, valor: "R$ 570,00" },
  { codigo: "EST008", item: "Conector RJ45", quantidade: 350, valor: "R$ 175,00" },
  { codigo: "EST009", item: "Óleo Hidráulico", quantidade: 120, valor: "R$ 5.400,00" },
  { codigo: "EST010", item: "Cabo HDMI", quantidade: 85, valor: "R$ 2.125,00" },
]

const topItensConsumidosData = [
  { codigo: "EST001", item: "Parafuso M8", consumo: 850, setor: "Produção" },
  { codigo: "EST003", item: "Arruela Lisa", consumo: 620, setor: "Produção" },
  { codigo: "EST004", item: "Cabo Elétrico 2.5mm", consumo: 480, setor: "Manutenção" },
  { codigo: "EST006", item: "Lubrificante WD-40", consumo: 320, setor: "Manutenção" },
  { codigo: "EST002", item: "Porca Sextavada", consumo: 280, setor: "Produção" },
  { codigo: "EST005", item: "Papel A4", consumo: 250, setor: "Administrativo" },
  { codigo: "EST009", item: "Óleo Hidráulico", consumo: 45, setor: "Manutenção" },
  { codigo: "EST007", item: "Fita Isolante", consumo: 120, setor: "TI" },
  { codigo: "EST008", item: "Conector RJ45", consumo: 95, setor: "TI" },
  { codigo: "EST010", item: "Cabo HDMI", consumo: 28, setor: "TI" },
]

const historicoMovimentacoesEstoque = [
  { data: "16/01/2026", tipo: "Entrada", item: "Parafuso M8", quantidade: 500, requisitante: "João Silva", setor: "Produção" },
  { data: "15/01/2026", tipo: "Saída", item: "Cabo Elétrico 2.5mm", quantidade: 50, requisitante: "Maria Santos", setor: "Manutenção" },
  { data: "15/01/2026", tipo: "Saída", item: "Óleo Hidráulico", quantidade: 10, requisitante: "Carlos Lima", setor: "Manutenção" },
  { data: "14/01/2026", tipo: "Entrada", item: "Papel A4", quantidade: 100, requisitante: "Ana Costa", setor: "Administrativo" },
  { data: "14/01/2026", tipo: "Saída", item: "Conector RJ45", quantidade: 25, requisitante: "Pedro Alves", setor: "TI" },
]

const historicoPatrimonio = [
  { data: "05/01/2026", codigo: "0089", item: "Notebook Dell", tipo: "Equipamentos", valor: "R$ 8.500,00" },
  { data: "28/12/2025", codigo: "0088", item: "Impressora HP", tipo: "Equipamentos", valor: "R$ 3.200,00" },
  { data: "15/12/2025", codigo: "0087", item: "Ar Condicionado", tipo: "Equipamentos", valor: "R$ 4.800,00" },
  { data: "01/12/2025", codigo: "0086", item: "Mesa Escritório", tipo: "Mobiliário", valor: "R$ 1.200,00" },
  { data: "20/11/2025", codigo: "0085", item: "Cadeira Ergonômica", tipo: "Mobiliário", valor: "R$ 2.100,00" },
  { data: "10/11/2025", codigo: "0084", item: "Monitor 27\"", tipo: "Equipamentos", valor: "R$ 1.800,00" },
]

const patrimonioEvolutionData = [
  { month: "Jan", valor: 820000 },
  { month: "Fev", valor: 835000 },
  { month: "Mar", valor: 848000 },
  { month: "Abr", valor: 865000 },
  { month: "Mai", valor: 882000 },
  { month: "Jun", valor: 900000 },
]

const patrimonioQuantidadeData = [
  { name: "Automóveis", value: 12, color: "hsl(var(--primary))" },
  { name: "Equipamentos", value: 68, color: "hsl(var(--success))" },
  { name: "Mobiliário", value: 45, color: "hsl(var(--chart-3))" },
  { name: "Software", value: 31, color: "hsl(var(--chart-4))" },
]

const aquisicoesPorPeriodoData = [
  { month: "Jan", aquisicoes: 5, valor: 32000 },
  { month: "Fev", aquisicoes: 3, valor: 15000 },
  { month: "Mar", aquisicoes: 7, valor: 45000 },
  { month: "Abr", aquisicoes: 4, valor: 28000 },
  { month: "Mai", aquisicoes: 6, valor: 38000 },
  { month: "Jun", aquisicoes: 8, valor: 45000 },
]

const visaoGeralPatrimonioData = [
  { codigo: "0001", item: "Automóvel Ford Ranger", tipo: "Automóveis", valorUnit: "R$ 185.000,00", status: "Ativo" },
  { codigo: "0002", item: "Caminhão Mercedes", tipo: "Automóveis", valorUnit: "R$ 320.000,00", status: "Ativo" },
  { codigo: "0003", item: "Equipamento Industrial", tipo: "Equipamentos", valorUnit: "R$ 95.000,00", status: "Ativo" },
  { codigo: "0004", item: "Servidor Principal", tipo: "Equipamentos", valorUnit: "R$ 75.000,00", status: "Ativo" },
  { codigo: "0005", item: "Mobiliário Escritório", tipo: "Mobiliário", valorUnit: "R$ 45.000,00", status: "Ativo" },
  { codigo: "0006", item: "Sistema ERP", tipo: "Software", valorUnit: "R$ 28.000,00", status: "Ativo" },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

// Components
const GradientCard = ({ 
  title, value, icon: Icon, trend, variant = "info" 
}: { 
  title: string
  value: string
  icon: any
  trend?: { value: string; positive: boolean }
  variant?: "success" | "danger" | "info" | "warning" | "neutral"
}) => {
  const variantStyles = {
    success: {
      bg: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/25",
    },
    danger: {
      bg: "from-rose-500 to-rose-600",
      shadow: "shadow-rose-500/25",
    },
    info: {
      bg: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/25",
    },
    warning: {
      bg: "from-amber-500 to-amber-600",
      shadow: "shadow-amber-500/25",
    },
    neutral: {
      bg: "from-slate-500 to-slate-600",
      shadow: "shadow-slate-500/25",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div
      className={`relative overflow-hidden rounded bg-gradient-to-br ${styles.bg} p-5 text-white shadow-lg ${styles.shadow} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div className="rounded bg-white/20 p-2.5 backdrop-blur-sm">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
            {trend.positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {trend.value}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  )
}

const MetricCard = ({ 
  title, value, icon: Icon, trend, trendValue, color = "primary" 
}: { 
  title: string
  value: string
  icon: any
  trend?: "up" | "down"
  trendValue?: string
  color?: "primary" | "success" | "destructive" | "warning"
}) => {
  const iconColorClass = {
    primary: "text-primary",
    success: "text-success",
    destructive: "text-destructive",
    warning: "text-warning"
  }[color]

  return (
    <Card className="border border-border rounded hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded bg-opacity-10 ${color === "success" ? "bg-success/10" : color === "destructive" ? "bg-destructive/10" : color === "warning" ? "bg-warning/10" : "bg-primary/10"}`}>
          <Icon className={`h-4 w-4 ${iconColorClass}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {trend && trendValue && (
          <p className={`text-sm flex items-center gap-1.5 mt-1 font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
            {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

const AlertCard = ({ title, count, type }: { title: string; count: number; type: "warning" | "danger" | "info" }) => {
  const bgClass = type === "danger" ? "bg-destructive/15" : type === "warning" ? "bg-warning/15" : "bg-primary/15"
  const iconClass = type === "danger" ? "text-destructive" : type === "warning" ? "text-warning" : "text-primary"
  const textClass = type === "danger" ? "text-destructive" : type === "warning" ? "text-warning" : "text-primary"
  
  return (
    <div className={`flex items-center gap-4 p-4 rounded ${bgClass} transition-all duration-200 hover:scale-[1.02]`}>
      <div className={`p-2 rounded ${type === "danger" ? "bg-destructive/20" : type === "warning" ? "bg-warning/20" : "bg-primary/20"}`}>
        <AlertTriangle className={`h-5 w-5 ${iconClass}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className={`text-2xl font-bold ${textClass}`}>{count}</p>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded p-3 shadow-lg">
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
const DashboardGeral = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [setor, setSetor] = useState<string>("todos")
  const [tipo, setTipo] = useState<TipoType>("todos")

  const setores = ["todos", "Produção", "Manutenção", "TI", "Administrativo", "Operacional"]

  // Simulated filtered data based on filters (in real app, this would filter actual data)
  const periodoLabel = {
    "1h": "Última hora",
    "24h": "Últimas 24h",
    "7d": "Últimos 7 dias",
    "30d": "Últimos 30 dias",
    "90d": "Últimos 90 dias",
    "1y": "Último ano"
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
          </div>
          
          {/* Período */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Período:</span>
            <div className="flex gap-1">
              {(["1h", "24h", "7d", "30d", "90d", "1y"] as PeriodoType[]).map((p) => (
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

          {/* Setor */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Setor:</span>
            <Select value={setor} onValueChange={setSetor}>
              <SelectTrigger className="w-[160px] h-8">
                <SelectValue placeholder="Todos os setores" />
              </SelectTrigger>
              <SelectContent>
                {setores.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s === "todos" ? "Todos os setores" : s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Tipo:</span>
            <Select value={tipo} onValueChange={(v) => setTipo(v as TipoType)}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="estoque">Estoque</SelectItem>
                <SelectItem value="patrimonio">Patrimônio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Indicador de período ativo */}
          <div className="ml-auto">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Exibindo: {periodoLabel[periodo]}
            </span>
          </div>
        </div>
      </Card>

      {/* Cards - Financeiro */}
      {(tipo === "todos" || tipo === "financeiro") && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Financeiro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <GradientCard title="Total a Receber" value="R$ 57.000,00" icon={ArrowUpRight} variant="success" />
            <GradientCard title="Total a Pagar" value="R$ 36.000,00" icon={ArrowDownRight} variant="danger" />
            <GradientCard title="Resultado do Período" value="R$ 22.000,00" icon={TrendingUp} trend={{ value: "+8,3%", positive: true }} variant="success" />
            <GradientCard title="Saldo Atual em Caixa" value="R$ 87.939,88" icon={Wallet} trend={{ value: "+12,5%", positive: true }} variant="info" />
          </div>
        </div>
      )}

      {/* Cards - Estoque */}
      {(tipo === "todos" || tipo === "estoque") && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Estoque</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GradientCard title="Entradas no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+15%", positive: true }} variant="success" />
            <GradientCard title="Saídas no Período" value="R$ 32.000,00" icon={ArrowDownRight} trend={{ value: "-5,2%", positive: false }} variant="warning" />
            <GradientCard title="Valor Total em Estoque" value="R$ 320.000,00" icon={Package} variant="info" />
            <GradientCard title="Quantidade de Itens" value="3.485" icon={Package} variant="neutral" />
          </div>
        </div>
      )}

      {/* Cards - Patrimônio */}
      {(tipo === "todos" || tipo === "patrimonio") && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Patrimônio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GradientCard title="Aquisições no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+12%", positive: true }} variant="success" />
            <GradientCard title="Valor Total do Patrimônio" value="R$ 900.000,00" icon={Building2} trend={{ value: "+3,2%", positive: true }} variant="info" />
            <GradientCard title="Itens Patrimoniais" value="156" icon={Building2} variant="neutral" />
          </div>
        </div>
      )}

      {/* Gráfico Principal - Balanço do Portfólio */}
      {(tipo === "todos" || tipo === "financeiro") && <PortfolioChart />}

    {/* Gráficos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Evolução Financeira */}
      <Card className="border border-border rounded p-4">
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
      <Card className="border border-border rounded p-4">
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
      <Card className="border border-border rounded p-4">
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
      <Card className="border border-border rounded p-4">
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
    <Card className="border border-border rounded p-4">
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
      <Card className="border border-border rounded">
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

      <Card className="border border-border rounded">
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
    <Card className="border border-border rounded">
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
}

// Dashboard Financeiro
const DashboardFinanceiro = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [cliente, setCliente] = useState<string>("todos")
  const [beneficiario, setBeneficiario] = useState<string>("todos")
  const [documento, setDocumento] = useState<string>("todos")
  const [tipoMovimento, setTipoMovimento] = useState<string>("todos")
  const [status, setStatus] = useState<string>("todos")

  const clientes = ["todos", "Cliente ABC", "Cliente XYZ", "Cliente DEF", "Cliente GHI"]
  const beneficiarios = ["todos", "Fornecedor A", "Fornecedor B", "Fornecedor C", "Fornecedor D"]
  const documentos = ["todos", "NF-e", "XML", "NI"]
  const statusList = ["todos", "Em Aberto", "Vencida", "Paga", "Recebida", "Processada", "Pendente"]

  const periodoLabel = {
    "1h": "Última hora",
    "24h": "Últimas 24h",
    "7d": "Últimos 7 dias",
    "30d": "Últimos 30 dias",
    "90d": "Últimos 90 dias",
    "1y": "Último ano"
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
          </div>
          
          {/* Período */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Período:</span>
            <div className="flex gap-1">
              {(["1h", "24h", "7d", "30d", "90d", "1y"] as PeriodoType[]).map((p) => (
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

          {/* Cliente */}
          <Select value={cliente} onValueChange={setCliente}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              {clientes.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "todos" ? "Todos Clientes" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Beneficiário */}
          <Select value={beneficiario} onValueChange={setBeneficiario}>
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue placeholder="Beneficiário" />
            </SelectTrigger>
            <SelectContent>
              {beneficiarios.map((b) => (
                <SelectItem key={b} value={b}>
                  {b === "todos" ? "Todos Beneficiários" : b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Documento */}
          <Select value={documento} onValueChange={setDocumento}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Documento" />
            </SelectTrigger>
            <SelectContent>
              {documentos.map((d) => (
                <SelectItem key={d} value={d}>
                  {d === "todos" ? "Todos Docs" : d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tipo */}
          <Select value={tipoMovimento} onValueChange={setTipoMovimento}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="entrada">Entrada</SelectItem>
              <SelectItem value="saida">Saída</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "todos" ? "Todos Status" : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Indicador de período ativo */}
          <div className="ml-auto">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Exibindo: {periodoLabel[periodo]}
            </span>
          </div>
        </div>
      </Card>

      {/* Cards com gradiente */}
      <SummaryCards />

      {/* Gráficos - Linha 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Evolução do Fluxo de Caixa</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionData}>
                <defs>
                  <linearGradient id="colorSaldoFin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(var(--primary))" fill="url(#colorSaldoFin)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Entradas vs Saídas</CardTitle>
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
      </div>

      {/* Gráficos - Linha 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Contas a Receber por Status</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contasStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="status" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="receber" name="A Receber" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Contas a Pagar por Status</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contasStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="status" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pagar" name="A Pagar" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Distribuição por Tipo de Documento</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tipoDocumentoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {tipoDocumentoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Tabelas - Contas a Receber e Contas a Pagar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader>
            <CardTitle className="text-base">Contas a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contasReceberData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.vencimento}</TableCell>
                    <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border border-border rounded">
          <CardHeader>
            <CardTitle className="text-base">Contas a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Beneficiário</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contasPagarData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>{item.beneficiario}</TableCell>
                    <TableCell>{item.vencimento}</TableCell>
                    <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Fluxo de Caixa Detalhado */}
      <Card className="border border-border rounded">
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

      {/* Documentos Fiscais */}
      <Card className="border border-border rounded">
        <CardHeader>
          <CardTitle className="text-base">Documentos Fiscais (XML / NF-e)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosFiscaisData.map((doc) => (
                <TableRow key={doc.numero}>
                  <TableCell className="font-medium">{doc.numero}</TableCell>
                  <TableCell>
                    <StatusBadge status={doc.tipo} />
                  </TableCell>
                  <TableCell>{doc.emissao}</TableCell>
                  <TableCell className="text-right font-semibold">{doc.valor}</TableCell>
                  <TableCell>
                    <StatusBadge status={doc.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard Estoque
const DashboardEstoque = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [item, setItem] = useState<string>("todos")
  const [unidade, setUnidade] = useState<string>("todos")
  const [setor, setSetor] = useState<string>("todos")
  const [requisitante, setRequisitante] = useState<string>("todos")
  const [tipoMovimentacao, setTipoMovimentacao] = useState<string>("todos")
  const [status, setStatus] = useState<string>("todos")

  const itens = ["todos", "Parafuso M8", "Cabo HDMI", "Óleo Lubrificante", "Papel A4"]
  const unidades = ["todos", "Almoxarifado SP", "Almoxarifado RJ", "TI Central", "Manutenção"]
  const setores = ["todos", "Produção", "Manutenção", "TI", "Administrativo", "Operacional"]
  const requisitantes = ["todos", "João Silva", "Maria Santos", "Carlos Lima", "Ana Costa", "Pedro Alves"]
  const statusList = ["todos", "Normal", "Crítico", "Pendente"]

  const periodoLabel = {
    "1h": "Última hora",
    "24h": "Últimas 24h",
    "7d": "Últimos 7 dias",
    "30d": "Últimos 30 dias",
    "90d": "Últimos 90 dias",
    "1y": "Último ano"
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
          </div>
          
          {/* Período */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Período:</span>
            <div className="flex gap-1">
              {(["1h", "24h", "7d", "30d", "90d", "1y"] as PeriodoType[]).map((p) => (
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

          {/* Item */}
          <Select value={item} onValueChange={setItem}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Item" />
            </SelectTrigger>
            <SelectContent>
              {itens.map((i) => (
                <SelectItem key={i} value={i}>
                  {i === "todos" ? "Todos Itens" : i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Unidade */}
          <Select value={unidade} onValueChange={setUnidade}>
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue placeholder="Unidade" />
            </SelectTrigger>
            <SelectContent>
              {unidades.map((u) => (
                <SelectItem key={u} value={u}>
                  {u === "todos" ? "Todas Unidades" : u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Setor */}
          <Select value={setor} onValueChange={setSetor}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Setor" />
            </SelectTrigger>
            <SelectContent>
              {setores.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "todos" ? "Todos Setores" : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Requisitante */}
          <Select value={requisitante} onValueChange={setRequisitante}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Requisitante" />
            </SelectTrigger>
            <SelectContent>
              {requisitantes.map((r) => (
                <SelectItem key={r} value={r}>
                  {r === "todos" ? "Todos" : r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tipo Movimentação */}
          <Select value={tipoMovimentacao} onValueChange={setTipoMovimentacao}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Tipos</SelectItem>
              <SelectItem value="entrada">Entrada</SelectItem>
              <SelectItem value="saida">Saída</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "todos" ? "Todos Status" : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Indicador de período ativo */}
          <div className="ml-auto">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Exibindo: {periodoLabel[periodo]}
            </span>
          </div>
        </div>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GradientCard title="Entradas no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+15%", positive: true }} variant="success" />
        <GradientCard title="Saídas no Período" value="R$ 32.000,00" icon={ArrowDownRight} trend={{ value: "-8%", positive: false }} variant="warning" />
        <GradientCard title="Valor Total em Estoque" value="R$ 320.000,00" icon={DollarSign} variant="success" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GradientCard title="Itens em Estoque" value="3.485" icon={Package} variant="info" />
        <GradientCard title="Requisições Pendentes" value="12" icon={Receipt} variant="warning" />
        <GradientCard title="Itens Críticos" value="5" icon={AlertTriangle} variant="danger" />
      </div>

      {/* Gráficos - Linha 1: Evolução */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Evolução de Estoque no Tempo</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={estoqueEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${v}`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="quantidade" name="Quantidade" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Valor Financeiro do Estoque no Tempo</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={estoqueEvolutionData}>
                <defs>
                  <linearGradient id="colorValorEstoque" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="valor" name="Valor (R$)" stroke="hsl(var(--success))" fill="url(#colorValorEstoque)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Gráficos - Linha 2: Consumo e Unidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded p-4">
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

        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Estoque por Unidade / Almoxarifado</CardTitle>
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

      {/* Tabelas - Top 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader>
            <CardTitle className="text-base">Top 10 Itens em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topItensEstoqueData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell className="text-center">{item.quantidade}</TableCell>
                    <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border border-border rounded">
          <CardHeader>
            <CardTitle className="text-base">Top 10 Itens Mais Consumidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Consumo</TableHead>
                  <TableHead>Setor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topItensConsumidosData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell className="text-center">{item.consumo}</TableCell>
                    <TableCell>{item.setor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Inventário */}
      <Card className="border border-border rounded">
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
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventarioData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell className="text-center">{item.quantidade}</TableCell>
                  <TableCell>{item.unidade}</TableCell>
                  <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Histórico de Movimentações */}
      <Card className="border border-border rounded">
        <CardHeader>
          <CardTitle className="text-base">Histórico Consolidado de Movimentações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead>Requisitante</TableHead>
                <TableHead>Setor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicoMovimentacoesEstoque.map((mov, index) => (
                <TableRow key={index}>
                  <TableCell>{mov.data}</TableCell>
                  <TableCell>
                    <StatusBadge status={mov.tipo} />
                  </TableCell>
                  <TableCell className="font-medium">{mov.item}</TableCell>
                  <TableCell className="text-center">{mov.quantidade}</TableCell>
                  <TableCell>{mov.requisitante}</TableCell>
                  <TableCell>{mov.setor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard Patrimônio
const DashboardPatrimonio = () => {
  const [dataAquisicao, setDataAquisicao] = useState<string>("")
  const [codigoItem, setCodigoItem] = useState<string>("todos")
  const [tipoItem, setTipoItem] = useState<string>("todos")
  const [faixaValor, setFaixaValor] = useState<string>("todos")

  const tiposPatrimonio = ["todos", "Automóveis", "Equipamentos", "Mobiliário", "Software"]
  const faixasValor = [
    { value: "todos", label: "Todas as faixas" },
    { value: "0-10000", label: "Até R$ 10.000" },
    { value: "10000-50000", label: "R$ 10.000 - R$ 50.000" },
    { value: "50000-100000", label: "R$ 50.000 - R$ 100.000" },
    { value: "100000+", label: "Acima de R$ 100.000" },
  ]

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
          </div>
          
          {/* Data de Aquisição */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Data de Aquisição:</span>
            <input 
              type="date" 
              value={dataAquisicao}
              onChange={(e) => setDataAquisicao(e.target.value)}
              className="filter-input h-8 px-3 rounded border border-input bg-background text-sm"
            />
          </div>

          {/* Código do Item */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Código:</span>
            <Select value={codigoItem} onValueChange={setCodigoItem}>
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {visaoGeralPatrimonioData.map((p) => (
                  <SelectItem key={p.codigo} value={p.codigo}>{p.codigo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Item */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Tipo:</span>
            <Select value={tipoItem} onValueChange={setTipoItem}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {tiposPatrimonio.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "todos" ? "Todos os tipos" : t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Faixa de Valor */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Faixa de Valor:</span>
            <Select value={faixaValor} onValueChange={setFaixaValor}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Todas as faixas" />
              </SelectTrigger>
              <SelectContent>
                {faixasValor.map((f) => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <GradientCard 
          title="Valor Adquirido no Período" 
          value="R$ 45.000,00" 
          icon={ArrowUpRight}
          variant="success"
          trend={{ value: "+12%", positive: true }}
        />
        <GradientCard 
          title="Baixas no Período" 
          value="R$ 8.000,00" 
          icon={ArrowDownRight}
          variant="warning"
          trend={{ value: "-2%", positive: false }}
        />
        <GradientCard 
          title="Valor Total do Patrimônio" 
          value="R$ 900.000,00" 
          icon={DollarSign}
          variant="success"
          trend={{ value: "+5.2%", positive: true }}
        />
        <GradientCard 
          title="Total de Itens Patrimoniais" 
          value="156" 
          icon={Building2}
          variant="info"
        />
        <GradientCard 
          title="Tipos de Patrimônio Ativos" 
          value="4" 
          icon={BarChart3}
          variant="neutral"
        />
      </div>

      {/* Gráficos - Primeira linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução do Valor Patrimonial */}
        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Evolução do Valor Patrimonial</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patrimonioEvolutionData}>
                <defs>
                  <linearGradient id="patrimonioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="valor" name="Valor Patrimonial" stroke="hsl(var(--primary))" fill="url(#patrimonioGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Valor do Patrimônio por Tipo */}
        <Card className="border border-border rounded p-4">
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
      </div>

      {/* Gráficos - Segunda linha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quantidade por Tipo */}
        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Quantidade por Tipo</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patrimonioQuantidadeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {patrimonioQuantidadeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top 5 Itens por Valor Total */}
        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Top 5 Itens por Valor Total</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPatrimonioData.map(i => ({ ...i, valorNum: parseFloat(i.valor.replace(/[^\d,]/g, '').replace(',', '.')) * 1000 }))} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis type="category" dataKey="item" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="valorNum" name="Valor" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Aquisições por Período */}
        <Card className="border border-border rounded p-4">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base">Aquisições por Período</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aquisicoesPorPeriodoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="aquisicoes" name="Qtd. Aquisições" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="valor" name="Valor (R$)" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Tabelas */}
      <Card className="border border-border rounded">
        <CardHeader>
          <CardTitle className="text-base">Visão Geral do Patrimônio</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor Unitário</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visaoGeralPatrimonioData.map((item) => (
                <TableRow key={item.codigo}>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell className="text-right font-semibold">{item.valorUnit}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={item.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-border rounded">
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
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicoPatrimonio.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.data}</TableCell>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Dashboard Component
const Dashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>("geral")

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        {/* Seletor de Dashboard */}
        <div className="flex bg-secondary rounded p-1 w-fit">
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