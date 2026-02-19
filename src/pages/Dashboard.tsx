import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioChart } from "@/components/PortfolioChart"
import { SummaryCards } from "@/components/financeiro/SummaryCards"
import { GradientCard } from "@/components/financeiro/GradientCard"
import { StatusBadge } from "@/components/StatusBadge"
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Building2, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Receipt, BarChart3, Filter,
  LayoutGrid, UserRoundPlus
} from "lucide-react"
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from "recharts"
import VisaoGeralComercial from "@/pages/comercial/VisaoGeral"
import VisaoGeralRH from "@/pages/gestao-pessoas/VisaoGeralRH"

type DashboardType = "geral" | "financeiro" | "estoque" | "patrimonio" | "comercial" | "rh"
type PeriodoType = "1h" | "24h" | "7d" | "30d" | "90d" | "1y"
type TipoType = "todos" | "financeiro" | "estoque" | "patrimonio"

// ===== MOCK DATA (unchanged) =====
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
  { name: "Equipamentos", value: 280000, color: "hsl(72 80% 60%)" },
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
  { name: "XML", value: 25, color: "hsl(var(--chart-3))" },
  { name: "NI", value: 10, color: "hsl(var(--chart-4))" },
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
  { name: "Equipamentos", value: 68, color: "hsl(72 80% 60%)" },
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

// ===== SHARED COMPONENTS =====
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded p-3 shadow-xl backdrop-blur-sm">
        <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.value > 100 ? formatCurrency(entry.value) : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const ChartCard = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-card border border-border rounded p-5 ${className}`}>
    <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
    <div className="h-64">{children}</div>
  </div>
)

const AlertCard = ({ title, count, type }: { title: string; count: number; type: "warning" | "danger" | "info" }) => {
  const config = {
    danger: { bg: "bg-rose-400/10 dark:bg-rose-500/10", icon: "text-rose-500", text: "text-rose-600 dark:text-rose-400", border: "border-l-rose-400" },
    warning: { bg: "bg-amber-400/10 dark:bg-amber-500/10", icon: "text-amber-500", text: "text-amber-600 dark:text-amber-400", border: "border-l-amber-400" },
    info: { bg: "bg-blue-400/10 dark:bg-blue-500/10", icon: "text-blue-500", text: "text-blue-600 dark:text-blue-400", border: "border-l-blue-400" },
  }[type]

  return (
    <div className={`flex items-center gap-4 p-4 rounded ${config.bg} border-l-[3px] ${config.border} transition-all duration-200 hover:scale-[1.01]`}>
      <div className={`p-2 rounded ${config.bg}`}>
        <AlertTriangle className={`h-5 w-5 ${config.icon}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className={`text-2xl font-bold ${config.text}`}>{count}</p>
      </div>
    </div>
  )
}

const FilterBar = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded p-4">
    <div className="flex flex-wrap items-center gap-4">
      <Filter className="h-4 w-4 text-muted-foreground" />
      {children}
    </div>
  </div>
)

const PeriodFilter = ({ periodo, setPeriodo, options = ["1h", "24h", "7d", "30d", "90d", "1y"] }: { periodo: string; setPeriodo: (v: string) => void; options?: string[] }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-muted-foreground font-medium">Período:</span>
    <div className="flex gap-1">
      {options.map((p) => (
        <Button
          key={p}
          variant={periodo === p ? "default" : "outline"}
          size="sm"
          onClick={() => setPeriodo(p)}
          className="h-7 px-2.5 text-xs"
        >
          {p}
        </Button>
      ))}
    </div>
  </div>
)

// Chart shared config
const axisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 }
const gridStroke = "hsl(var(--border))"

// ===== DASHBOARD GERAL =====
const DashboardGeral = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [setor, setSetor] = useState<string>("todos")
  const [tipo, setTipo] = useState<TipoType>("todos")

  const setores = ["todos", "Produção", "Manutenção", "TI", "Administrativo", "Operacional"]

  return (
    <div className="space-y-6">
      <FilterBar>
        <PeriodFilter periodo={periodo} setPeriodo={(v) => setPeriodo(v as PeriodoType)} />
        <Select value={setor} onValueChange={setSetor}>
          <SelectTrigger className="w-[160px] h-7 text-xs"><SelectValue placeholder="Todos os setores" /></SelectTrigger>
          <SelectContent>
            {setores.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos os setores" : s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={tipo} onValueChange={(v) => setTipo(v as TipoType)}>
          <SelectTrigger className="w-[130px] h-7 text-xs"><SelectValue placeholder="Todos" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="financeiro">Financeiro</SelectItem>
            <SelectItem value="estoque">Estoque</SelectItem>
            <SelectItem value="patrimonio">Patrimônio</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      {/* Financeiro Cards */}
      {(tipo === "todos" || tipo === "financeiro") && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Financeiro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <GradientCard title="Total a Receber" value="R$ 57.000,00" icon={ArrowUpRight} variant="success" />
            <GradientCard title="Total a Pagar" value="R$ 36.000,00" icon={ArrowDownRight} variant="danger" />
            <GradientCard title="Resultado do Período" value="R$ 22.000,00" icon={TrendingUp} trend={{ value: "+8,3%", positive: true }} variant="success" />
            <GradientCard title="Saldo Atual em Caixa" value="R$ 87.939,88" icon={Wallet} trend={{ value: "+12,5%", positive: true }} variant="info" />
          </div>
        </div>
      )}

      {/* Estoque Cards */}
      {(tipo === "todos" || tipo === "estoque") && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Estoque</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GradientCard title="Entradas no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+15%", positive: true }} variant="success" />
            <GradientCard title="Saídas no Período" value="R$ 32.000,00" icon={ArrowDownRight} trend={{ value: "-5,2%", positive: false }} variant="warning" />
            <GradientCard title="Valor Total em Estoque" value="R$ 320.000,00" icon={Package} variant="info" />
            <GradientCard title="Quantidade de Itens" value="3.485" icon={Package} variant="neutral" />
          </div>
        </div>
      )}

      {/* Patrimônio Cards */}
      {(tipo === "todos" || tipo === "patrimonio") && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Patrimônio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GradientCard title="Aquisições no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+12%", positive: true }} variant="success" />
            <GradientCard title="Valor Total do Patrimônio" value="R$ 900.000,00" icon={Building2} trend={{ value: "+3,2%", positive: true }} variant="info" />
            <GradientCard title="Itens Patrimoniais" value="156" icon={Building2} variant="neutral" />
          </div>
        </div>
      )}

      {/* Portfolio Chart */}
      {(tipo === "todos" || tipo === "financeiro") && <PortfolioChart />}

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução Financeira no Tempo">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="entradas" name="Entradas" stroke="hsl(72 100% 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="saidas" name="Saídas" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Entradas vs Saídas por Período">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolutionData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="entradas" name="Entradas" fill="hsl(72 100% 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" name="Saídas" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Consumo de Estoque por Setor">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consumoSetorData} layout="vertical" barSize={20}>
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="setor" tick={axisStyle} width={100} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="valor" name="Consumo" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribuição do Patrimônio por Tipo">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={patrimonioTipoData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {patrimonioTipoData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Alerts */}
      <div className="bg-card border border-border rounded p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Alertas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AlertCard title="Contas a Pagar em Aberto" count={8} type="danger" />
          <AlertCard title="Contas a Receber em Aberto" count={12} type="warning" />
          <AlertCard title="Itens de Estoque Críticos" count={5} type="info" />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader><CardTitle className="text-sm font-semibold">Top 5 Maiores Custos</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Item</TableHead><TableHead className="text-right">Valor</TableHead></TableRow></TableHeader>
              <TableBody>
                {topCustosData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                    <TableCell className="text-sm">{item.item}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{item.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border border-border rounded">
          <CardHeader><CardTitle className="text-sm font-semibold">Top 5 Ativos Patrimoniais</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Item</TableHead><TableHead className="text-right">Valor Total</TableHead></TableRow></TableHeader>
              <TableBody>
                {topPatrimonioData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                    <TableCell className="text-sm">{item.item}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{item.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Últimas Movimentações Relevantes</h3>
        <div className="space-y-1">
          {ultimasMovimentacoes.map((mov, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${mov.tipo === "Recebimento" ? "bg-lime-400" : mov.tipo === "Pagamento" ? "bg-rose-400" : "bg-amber-400"}`} />
                <div>
                  <p className="font-medium text-sm">{mov.tipo}</p>
                  <p className="text-xs text-muted-foreground">{mov.descricao}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${mov.tipo === "Recebimento" ? "text-lime-600 dark:text-lime-400" : mov.tipo === "Pagamento" ? "text-rose-600 dark:text-rose-400" : ""}`}>{mov.valor}</p>
                <p className="text-xs text-muted-foreground">{mov.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===== DASHBOARD FINANCEIRO =====
const DashboardFinanceiro = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [cliente, setCliente] = useState<string>("todos")
  const [beneficiario, setBeneficiario] = useState<string>("todos")
  const [status, setStatus] = useState<string>("todos")

  const clientes = ["todos", "Cliente ABC", "Cliente XYZ", "Cliente DEF", "Cliente GHI"]
  const beneficiarios = ["todos", "Fornecedor A", "Fornecedor B", "Fornecedor C", "Fornecedor D"]
  const statusList = ["todos", "Em Aberto", "Vencida", "Paga", "Recebida", "Processada", "Pendente"]

  return (
    <div className="space-y-6">
      <FilterBar>
        <PeriodFilter periodo={periodo} setPeriodo={(v) => setPeriodo(v as PeriodoType)} />
        <Select value={cliente} onValueChange={setCliente}>
          <SelectTrigger className="w-[140px] h-7 text-xs"><SelectValue placeholder="Cliente" /></SelectTrigger>
          <SelectContent>{clientes.map((c) => <SelectItem key={c} value={c}>{c === "todos" ? "Todos Clientes" : c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={beneficiario} onValueChange={setBeneficiario}>
          <SelectTrigger className="w-[150px] h-7 text-xs"><SelectValue placeholder="Beneficiário" /></SelectTrigger>
          <SelectContent>{beneficiarios.map((b) => <SelectItem key={b} value={b}>{b === "todos" ? "Todos Beneficiários" : b}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[130px] h-7 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>{statusList.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos Status" : s}</SelectItem>)}</SelectContent>
        </Select>
      </FilterBar>

      <SummaryCards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução do Fluxo de Caixa">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionData}>
              <defs>
                <linearGradient id="colorSaldoFin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(var(--primary))" fill="url(#colorSaldoFin)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Entradas vs Saídas">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolutionData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="entradas" name="Entradas" fill="hsl(72 100% 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" name="Saídas" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Contas a Receber por Status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contasStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="status" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="receber" name="A Receber" fill="hsl(72 100% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Contas a Pagar por Status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contasStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="status" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="pagar" name="A Pagar" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribuição por Tipo de Documento">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={tipoDocumentoData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {tipoDocumentoData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader><CardTitle className="text-sm font-semibold">Contas a Receber</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Cliente</TableHead><TableHead>Vencimento</TableHead><TableHead className="text-right">Valor</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {contasReceberData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                    <TableCell className="text-sm">{item.cliente}</TableCell>
                    <TableCell className="text-sm">{item.vencimento}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{item.valor}</TableCell>
                    <TableCell><StatusBadge status={item.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border border-border rounded">
          <CardHeader><CardTitle className="text-sm font-semibold">Contas a Pagar</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Beneficiário</TableHead><TableHead>Vencimento</TableHead><TableHead className="text-right">Valor</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {contasPagarData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                    <TableCell className="text-sm">{item.beneficiario}</TableCell>
                    <TableCell className="text-sm">{item.vencimento}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{item.valor}</TableCell>
                    <TableCell><StatusBadge status={item.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Detail */}
      <div className="bg-card border border-border rounded p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Fluxo de Caixa Detalhado</h3>
        <div className="space-y-1">
          {ultimasMovimentacoes.filter(m => m.tipo !== "Saída Estoque").map((mov, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${mov.tipo === "Recebimento" ? "bg-lime-400" : "bg-rose-400"}`} />
                <div>
                  <p className="font-medium text-sm">{mov.tipo}</p>
                  <p className="text-xs text-muted-foreground">{mov.descricao}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${mov.tipo === "Recebimento" ? "text-lime-600 dark:text-lime-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {mov.tipo === "Recebimento" ? "+" : "-"}{mov.valor}
                </p>
                <p className="text-xs text-muted-foreground">{mov.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fiscal Documents */}
      <Card className="border border-border rounded">
        <CardHeader><CardTitle className="text-sm font-semibold">Documentos Fiscais (XML / NF-e)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Número</TableHead><TableHead>Tipo</TableHead><TableHead>Emissão</TableHead><TableHead className="text-right">Valor</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {documentosFiscaisData.map((doc) => (
                <TableRow key={doc.numero}>
                  <TableCell className="font-medium text-xs">{doc.numero}</TableCell>
                  <TableCell><StatusBadge status={doc.tipo} /></TableCell>
                  <TableCell className="text-sm">{doc.emissao}</TableCell>
                  <TableCell className="text-right font-semibold text-sm">{doc.valor}</TableCell>
                  <TableCell><StatusBadge status={doc.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ===== DASHBOARD ESTOQUE =====
const DashboardEstoque = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [unidade, setUnidade] = useState<string>("todos")
  const [setor, setSetor] = useState<string>("todos")
  const [status, setStatus] = useState<string>("todos")

  const unidades = ["todos", "Almoxarifado SP", "Almoxarifado RJ", "TI Central", "Manutenção"]
  const setores = ["todos", "Produção", "Manutenção", "TI", "Administrativo", "Operacional"]
  const statusList = ["todos", "Normal", "Crítico", "Pendente"]

  return (
    <div className="space-y-6">
      <FilterBar>
        <PeriodFilter periodo={periodo} setPeriodo={(v) => setPeriodo(v as PeriodoType)} />
        <Select value={unidade} onValueChange={setUnidade}>
          <SelectTrigger className="w-[150px] h-7 text-xs"><SelectValue placeholder="Unidade" /></SelectTrigger>
          <SelectContent>{unidades.map((u) => <SelectItem key={u} value={u}>{u === "todos" ? "Todas Unidades" : u}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={setor} onValueChange={setSetor}>
          <SelectTrigger className="w-[130px] h-7 text-xs"><SelectValue placeholder="Setor" /></SelectTrigger>
          <SelectContent>{setores.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos Setores" : s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[120px] h-7 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>{statusList.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos Status" : s}</SelectItem>)}</SelectContent>
        </Select>
      </FilterBar>

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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução de Estoque no Tempo">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={estoqueEvolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="quantidade" name="Quantidade" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Valor Financeiro do Estoque no Tempo">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={estoqueEvolutionData}>
              <defs>
                <linearGradient id="colorValorEstoque" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(72 100% 50%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(72 100% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="valor" name="Valor (R$)" stroke="hsl(72 100% 50%)" fill="url(#colorValorEstoque)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Consumo por Setor">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consumoSetorData} layout="vertical" barSize={20}>
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="setor" tick={axisStyle} width={100} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="valor" name="Consumo" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Estoque por Unidade / Almoxarifado">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={estoqueUnidadeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="unidade" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="valor" name="Valor" fill="hsl(72 100% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader><CardTitle className="text-sm font-semibold">Top 10 Itens em Estoque</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Item</TableHead><TableHead className="text-center">Qtd</TableHead><TableHead className="text-right">Valor</TableHead></TableRow></TableHeader>
              <TableBody>
                {topItensEstoqueData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                    <TableCell className="text-sm">{item.item}</TableCell>
                    <TableCell className="text-center text-sm">{item.quantidade}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{item.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border border-border rounded">
          <CardHeader><CardTitle className="text-sm font-semibold">Top 10 Itens Mais Consumidos</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Item</TableHead><TableHead className="text-center">Consumo</TableHead><TableHead>Setor</TableHead></TableRow></TableHeader>
              <TableBody>
                {topItensConsumidosData.map((item) => (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                    <TableCell className="text-sm">{item.item}</TableCell>
                    <TableCell className="text-center text-sm">{item.consumo}</TableCell>
                    <TableCell className="text-sm">{item.setor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border rounded">
        <CardHeader><CardTitle className="text-sm font-semibold">Visão Geral do Inventário</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Item</TableHead><TableHead className="text-center">Quantidade</TableHead><TableHead>Unidade</TableHead><TableHead className="text-right">Valor</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {inventarioData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-sm">{item.item}</TableCell>
                  <TableCell className="text-center text-sm">{item.quantidade}</TableCell>
                  <TableCell className="text-sm">{item.unidade}</TableCell>
                  <TableCell className="text-right font-semibold text-sm">{item.valor}</TableCell>
                  <TableCell><StatusBadge status={item.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-border rounded">
        <CardHeader><CardTitle className="text-sm font-semibold">Histórico Consolidado de Movimentações</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Tipo</TableHead><TableHead>Item</TableHead><TableHead className="text-center">Quantidade</TableHead><TableHead>Requisitante</TableHead><TableHead>Setor</TableHead></TableRow></TableHeader>
            <TableBody>
              {historicoMovimentacoesEstoque.map((mov, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm">{mov.data}</TableCell>
                  <TableCell><StatusBadge status={mov.tipo} /></TableCell>
                  <TableCell className="font-medium text-sm">{mov.item}</TableCell>
                  <TableCell className="text-center text-sm">{mov.quantidade}</TableCell>
                  <TableCell className="text-sm">{mov.requisitante}</TableCell>
                  <TableCell className="text-sm">{mov.setor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ===== DASHBOARD PATRIMÔNIO =====
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
      <FilterBar>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Aquisição:</span>
          <input type="date" value={dataAquisicao} onChange={(e) => setDataAquisicao(e.target.value)}
            className="filter-input h-7 px-3 rounded border border-input bg-background text-xs" />
        </div>
        <Select value={codigoItem} onValueChange={setCodigoItem}>
          <SelectTrigger className="w-[130px] h-7 text-xs"><SelectValue placeholder="Código" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {visaoGeralPatrimonioData.map((p) => <SelectItem key={p.codigo} value={p.codigo}>{p.codigo}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={tipoItem} onValueChange={setTipoItem}>
          <SelectTrigger className="w-[140px] h-7 text-xs"><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>{tiposPatrimonio.map((t) => <SelectItem key={t} value={t}>{t === "todos" ? "Todos os tipos" : t}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={faixaValor} onValueChange={setFaixaValor}>
          <SelectTrigger className="w-[160px] h-7 text-xs"><SelectValue placeholder="Faixa de Valor" /></SelectTrigger>
          <SelectContent>{faixasValor.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
        </Select>
      </FilterBar>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <GradientCard title="Valor Adquirido no Período" value="R$ 45.000,00" icon={ArrowUpRight} variant="success" trend={{ value: "+12%", positive: true }} />
        <GradientCard title="Baixas no Período" value="R$ 8.000,00" icon={ArrowDownRight} variant="warning" trend={{ value: "-2%", positive: false }} />
        <GradientCard title="Valor Total do Patrimônio" value="R$ 900.000,00" icon={DollarSign} variant="success" trend={{ value: "+5.2%", positive: true }} />
        <GradientCard title="Total de Itens Patrimoniais" value="156" icon={Building2} variant="info" />
        <GradientCard title="Tipos de Patrimônio Ativos" value="4" icon={BarChart3} variant="neutral" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução do Valor Patrimonial">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={patrimonioEvolutionData}>
              <defs>
                <linearGradient id="patrimonioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="valor" name="Valor Patrimonial" stroke="hsl(var(--primary))" fill="url(#patrimonioGradient)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Valor do Patrimônio por Tipo">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={patrimonioTipoData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {patrimonioTipoData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Quantidade por Tipo">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={patrimonioQuantidadeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value"
                label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {patrimonioQuantidadeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 Itens por Valor Total">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topPatrimonioData.map(i => ({ ...i, valorNum: parseFloat(i.valor.replace(/[^\d,]/g, '').replace(',', '.')) * 1000 }))} layout="vertical" barSize={16}>
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="item" tick={{ ...axisStyle, fontSize: 9 }} width={100} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="valorNum" name="Valor" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Aquisições por Período">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aquisicoesPorPeriodoData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="aquisicoes" name="Qtd. Aquisições" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="valor" name="Valor (R$)" fill="hsl(72 80% 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <Card className="border border-border rounded">
        <CardHeader><CardTitle className="text-sm font-semibold">Visão Geral do Patrimônio</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Item</TableHead><TableHead>Tipo</TableHead><TableHead className="text-right">Valor Unitário</TableHead><TableHead className="text-center">Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {visaoGeralPatrimonioData.map((item) => (
                <TableRow key={item.codigo}>
                  <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                  <TableCell className="text-sm">{item.item}</TableCell>
                  <TableCell className="text-sm">{item.tipo}</TableCell>
                  <TableCell className="text-right font-semibold text-sm">{item.valorUnit}</TableCell>
                  <TableCell className="text-center"><StatusBadge status={item.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-border rounded">
        <CardHeader><CardTitle className="text-sm font-semibold">Histórico de Aquisições</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Código</TableHead><TableHead>Item</TableHead><TableHead>Tipo</TableHead><TableHead className="text-right">Valor</TableHead></TableRow></TableHeader>
            <TableBody>
              {historicoPatrimonio.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm">{item.data}</TableCell>
                  <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                  <TableCell className="text-sm">{item.item}</TableCell>
                  <TableCell className="text-sm">{item.tipo}</TableCell>
                  <TableCell className="text-right font-semibold text-sm">{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ===== MAIN DASHBOARD =====
const Dashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>("geral")

  const tabs: { key: DashboardType; label: string; icon: typeof LayoutGrid }[] = [
    { key: "geral", label: "Geral", icon: LayoutGrid },
    { key: "financeiro", label: "Financeiro", icon: DollarSign },
    { key: "estoque", label: "Estoque", icon: Package },
    { key: "patrimonio", label: "Patrimônio", icon: Building2 },
    { key: "comercial", label: "Comercial", icon: TrendingUp },
    { key: "rh", label: "RH", icon: UserRoundPlus },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6">
        {/* Tab Selector - Pill style with icons */}
        <Tabs value={activeDashboard} onValueChange={(v) => setActiveDashboard(v as DashboardType)}>
          <TabsList>
            {tabs.map(({ key, label, icon: Icon }) => (
              <TabsTrigger key={key} value={key} className="gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {activeDashboard === "geral" && <DashboardGeral />}
        {activeDashboard === "financeiro" && <DashboardFinanceiro />}
        {activeDashboard === "estoque" && <DashboardEstoque />}
        {activeDashboard === "patrimonio" && <DashboardPatrimonio />}
        {activeDashboard === "comercial" && <VisaoGeralComercial />}
        {activeDashboard === "rh" && <VisaoGeralRH />}
      </div>
    </div>
  )
}

export default Dashboard
