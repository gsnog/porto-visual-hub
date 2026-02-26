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
import { motion } from "framer-motion"
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Building2, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Receipt, BarChart3, Filter,
  LayoutGrid, UserRoundPlus
} from "lucide-react"
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, Label
} from "recharts"
import VisaoGeralComercial from "@/pages/comercial/VisaoGeral"
import VisaoGeralRH from "@/pages/gestao-pessoas/VisaoGeralRH"

type DashboardType = "geral" | "meu-perfil" | "financeiro" | "estoque" | "patrimonio" | "operacional" | "comercial" | "rh"
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

// ===== PREMIUM SHARED COMPONENTS =====
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-muted/70 dark:bg-muted/60 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-2xl">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-bold text-foreground">
            {entry.name}: {typeof entry.value === 'number' && entry.value > 100 ? formatCurrency(entry.value) : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Animation wrapper
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
)

const ChartCard = ({ title, children, className = "", action, delay = 0 }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode; delay?: number }) => (
  <FadeIn delay={delay}>
    <div className={`bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.06] dark:hover:shadow-black/30 ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
        {action}
      </div>
      <div className="h-64">{children}</div>
    </div>
  </FadeIn>
)

const AlertCard = ({ title, count, type, delay = 0 }: { title: string; count: number; type: "warning" | "danger" | "info"; delay?: number }) => {
  const config = {
    danger: { bg: "bg-rose-500/5 dark:bg-rose-500/8", icon: "text-rose-500", text: "text-rose-600 dark:text-rose-400", shadow: "shadow-rose-500/5" },
    warning: { bg: "bg-amber-500/5 dark:bg-amber-500/8", icon: "text-amber-500", text: "text-amber-600 dark:text-amber-400", shadow: "shadow-amber-500/5" },
    info: { bg: "bg-blue-500/5 dark:bg-blue-500/8", icon: "text-blue-500", text: "text-blue-600 dark:text-blue-400", shadow: "shadow-blue-500/5" },
  }[type]

  return (
    <FadeIn delay={delay}>
      <div className={`relative overflow-hidden flex items-center gap-4 p-6 rounded-2xl ${config.bg} shadow-sm ${config.shadow} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
        <div className={`p-3 rounded-xl ${config.bg}`}>
          <AlertTriangle className={`h-5 w-5 ${config.icon}`} />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{title}</p>
          <p className={`text-3xl font-bold ${config.text} mt-1`}>{count}</p>
        </div>
      </div>
    </FadeIn>
  )
}

const FilterBar = ({ children }: { children: React.ReactNode }) => (
  <FadeIn>
    <div className="space-y-4">
      <div className="filter-card">
        <div className="flex flex-wrap gap-4 items-end">
          {children}
        </div>
      </div>
    </div>
  </FadeIn>
)

const PeriodFilter = ({ periodo, setPeriodo, options = ["1h", "24h", "7d", "30d", "90d", "1y"] }: { periodo: string; setPeriodo: (v: string) => void; options?: string[] }) => (
  <div className="flex flex-col gap-1.5 min-w-[200px]">
    <label className="filter-label">Período</label>
    <Select value={periodo} onValueChange={setPeriodo}>
      <SelectTrigger className="filter-input"><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
)

// Chart shared config — PREMIUM: no grid, minimal axes
const axisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 }

// Donut center label renderer
const renderDonutCenter = (text: string, subtext?: string) => (
  <>
    <text x="50%" y={subtext ? "46%" : "50%"} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-xl font-bold" style={{ fontSize: 18, fontWeight: 700 }}>
      {text}
    </text>
    {subtext && (
      <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>
        {subtext}
      </text>
    )}
  </>
)

// ===== DASHBOARD GERAL =====
const DashboardGeral = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [setor, setSetor] = useState<string>("todos")
  const [tipo, setTipo] = useState<TipoType>("todos")

  const setores = ["todos", "Produção", "Manutenção", "TI", "Administrativo", "Operacional"]

  const patrimonioTotal = patrimonioTipoData.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <FilterBar>
        <PeriodFilter periodo={periodo} setPeriodo={(v) => setPeriodo(v as PeriodoType)} />
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="filter-label">Setor</label>
          <Select value={setor} onValueChange={setSetor}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos os setores" /></SelectTrigger>
            <SelectContent>
              {setores.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos os setores" : s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[130px]">
          <label className="filter-label">Tipo</label>
          <Select value={tipo} onValueChange={(v) => setTipo(v as TipoType)}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="estoque">Estoque</SelectItem>
              <SelectItem value="patrimonio">Patrimônio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FilterBar>

      {/* ── FINANCEIRO SECTION ── */}
      {(tipo === "todos" || tipo === "financeiro") && (
        <>
          <FadeIn delay={1}>
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Financeiro</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <GradientCard title="Total a Receber" value="R$ 57.000,00" icon={ArrowUpRight} variant="success" delay={1} />
              <GradientCard title="Total a Pagar" value="R$ 36.000,00" icon={ArrowDownRight} variant="danger" delay={2} />
              <GradientCard title="Resultado do Período" value="R$ 22.000,00" icon={TrendingUp} trend={{ value: "+8,3%", positive: true }} variant="success" delay={3} />
              <GradientCard title="Saldo Atual em Caixa" value="R$ 87.939,88" icon={Wallet} trend={{ value: "+12,5%", positive: true }} variant="info" delay={4} />
            </div>
          </FadeIn>

          <FadeIn delay={2}><PortfolioChart /></FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Evolução Financeira no Tempo" delay={3}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="gradEntradas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(72 100% 50%)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="hsl(72 100% 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradSaidas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradSaldo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={false} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="entradas" name="Entradas" stroke="hsl(72 100% 50%)" fill="url(#gradEntradas)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "hsl(72 100% 50%)", stroke: "hsl(var(--background))", strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="saidas" name="Saídas" stroke="hsl(var(--destructive))" fill="url(#gradSaidas)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  <Area type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(var(--chart-3))" fill="url(#gradSaldo)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Entradas vs Saídas por Período" delay={4}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evolutionData} barGap={8}>
                  <defs>
                    <linearGradient id="barGradEntradas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(72 100% 55%)" />
                      <stop offset="100%" stopColor="hsl(72 100% 40%)" />
                    </linearGradient>
                    <linearGradient id="barGradSaidas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={false} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="entradas" name="Entradas" fill="url(#barGradEntradas)" radius={[4, 4, 4, 4]} />
                  <Bar dataKey="saidas" name="Saídas" fill="url(#barGradSaidas)" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertCard title="Contas a Pagar em Aberto" count={8} type="danger" delay={5} />
            <AlertCard title="Contas a Receber em Aberto" count={12} type="warning" delay={6} />
          </div>

          <FadeIn delay={7}>
            <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
              <div className="p-6 pb-2"><h3 className="text-sm font-semibold text-foreground">Top 5 Maiores Custos</h3></div>
              <div className="px-6 pb-6">
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
              </div>
            </div>
          </FadeIn>
        </>
      )}

      {/* ── ESTOQUE SECTION ── */}
      {(tipo === "todos" || tipo === "estoque") && (
        <>
          <FadeIn delay={8}>
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Estoque</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GradientCard title="Entradas no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+15%", positive: true }} variant="success" delay={3} />
              <GradientCard title="Saídas no Período" value="R$ 32.000,00" icon={ArrowDownRight} trend={{ value: "-5,2%", positive: false }} variant="warning" delay={4} />
              <GradientCard title="Valor Total em Estoque" value="R$ 320.000,00" icon={Package} variant="info" delay={5} />
              <GradientCard title="Quantidade de Itens" value="3.485" icon={Package} variant="neutral" delay={6} />
            </div>
          </FadeIn>

          <ChartCard title="Consumo de Estoque por Setor" delay={9}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumoSetorData} layout="vertical" barSize={20}>
                <defs>
                  <linearGradient id="barHorizGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="setor" tick={axisStyle} width={100} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={false} />
                <Bar dataKey="valor" name="Consumo" fill="url(#barHorizGrad)" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <AlertCard title="Itens de Estoque Críticos" count={5} type="info" delay={10} />
        </>
      )}

      {/* ── PATRIMÔNIO SECTION ── */}
      {(tipo === "todos" || tipo === "patrimonio") && (
        <>
          <FadeIn delay={11}>
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Patrimônio</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GradientCard title="Aquisições no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+12%", positive: true }} variant="success" delay={4} />
              <GradientCard title="Valor Total do Patrimônio" value="R$ 900.000,00" icon={Building2} trend={{ value: "+3,2%", positive: true }} variant="info" delay={5} />
              <GradientCard title="Itens Patrimoniais" value="156" icon={Building2} variant="neutral" delay={6} />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Distribuição do Patrimônio por Tipo" delay={12}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={patrimonioTipoData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={4} dataKey="value" cornerRadius={6}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {patrimonioTipoData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  {renderDonutCenter(formatCurrency(patrimonioTotal), "Total")}
                  <Tooltip content={<ChartTooltip />} cursor={false} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <FadeIn delay={13}>
              <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
                <div className="p-6 pb-2"><h3 className="text-sm font-semibold text-foreground">Top 5 Ativos Patrimoniais</h3></div>
                <div className="px-6 pb-6">
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
                </div>
              </div>
            </FadeIn>
          </div>
        </>
      )}

      {/* Recent Activity (Global) */}
      <FadeIn delay={14}>
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-5">Últimas Movimentações Relevantes</h3>
          <div className="space-y-1">
            {ultimasMovimentacoes.map((mov, index) => (
              <div key={index} className="flex items-center justify-between py-3.5 border-b border-border/20 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${mov.tipo === "Recebimento" ? "bg-lime-400" : mov.tipo === "Pagamento" ? "bg-rose-400" : "bg-amber-400"}`} />
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
      </FadeIn>
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

  const tipoDocTotal = tipoDocumentoData.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <FilterBar>
        <PeriodFilter periodo={periodo} setPeriodo={(v) => setPeriodo(v as PeriodoType)} />
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="filter-label">Cliente</label>
          <Select value={cliente} onValueChange={setCliente}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos Clientes" /></SelectTrigger>
            <SelectContent>{clientes.map((c) => <SelectItem key={c} value={c}>{c === "todos" ? "Todos Clientes" : c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="filter-label">Beneficiário</label>
          <Select value={beneficiario} onValueChange={setBeneficiario}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos Beneficiários" /></SelectTrigger>
            <SelectContent>{beneficiarios.map((b) => <SelectItem key={b} value={b}>{b === "todos" ? "Todos Beneficiários" : b}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[130px]">
          <label className="filter-label">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos Status" /></SelectTrigger>
            <SelectContent>{statusList.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos Status" : s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </FilterBar>

      <SummaryCards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução do Fluxo de Caixa" delay={1}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionData}>
              <defs>
                <linearGradient id="colorSaldoFin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Area type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(var(--primary))" fill="url(#colorSaldoFin)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Entradas vs Saídas" delay={2}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolutionData} barGap={8}>
              <defs>
                <linearGradient id="finBarEntradas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(72 100% 55%)" />
                  <stop offset="100%" stopColor="hsl(72 100% 40%)" />
                </linearGradient>
                <linearGradient id="finBarSaidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="entradas" name="Entradas" fill="url(#finBarEntradas)" radius={[4, 4, 4, 4]} />
              <Bar dataKey="saidas" name="Saídas" fill="url(#finBarSaidas)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Contas a Receber por Status" delay={3}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contasStatusData}>
              <defs>
                <linearGradient id="recStatusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(72 100% 55%)" />
                  <stop offset="100%" stopColor="hsl(72 100% 40%)" />
                </linearGradient>
              </defs>
              <XAxis dataKey="status" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="receber" name="A Receber" fill="url(#recStatusGrad)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Contas a Pagar por Status" delay={4}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contasStatusData}>
              <defs>
                <linearGradient id="pagStatusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <XAxis dataKey="status" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="pagar" name="A Pagar" fill="url(#pagStatusGrad)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribuição por Tipo de Documento" delay={5}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={tipoDocumentoData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" cornerRadius={6}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {tipoDocumentoData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              {renderDonutCenter(`${tipoDocTotal}`, "Documentos")}
              <Tooltip content={<ChartTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn delay={6}>
          <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
            <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Contas a Receber</h3></div>
            <div className="px-6 pb-6">
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
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={7}>
          <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
            <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Contas a Pagar</h3></div>
            <div className="px-6 pb-6">
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
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Recent Transactions */}
      <FadeIn delay={8}>
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-5">Últimas Movimentações</h3>
          <div className="space-y-1">
            {ultimasMovimentacoes.map((mov, index) => (
              <div key={index} className="flex items-center justify-between py-3.5 border-b border-border/20 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${mov.tipo === "Recebimento" ? "bg-lime-400" : mov.tipo === "Pagamento" ? "bg-rose-400" : "bg-amber-400"}`} />
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
      </FadeIn>

      {/* Fiscal Documents */}
      <FadeIn delay={9}>
        <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
          <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Documentos Fiscais</h3></div>
          <div className="px-6 pb-6">
            <Table>
              <TableHeader><TableRow><TableHead>Número</TableHead><TableHead>Tipo</TableHead><TableHead>Emissão</TableHead><TableHead className="text-right">Valor</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {documentosFiscaisData.map((doc) => (
                  <TableRow key={doc.numero}>
                    <TableCell className="font-medium text-xs">{doc.numero}</TableCell>
                    <TableCell className="text-sm">{doc.tipo}</TableCell>
                    <TableCell className="text-sm">{doc.emissao}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{doc.valor}</TableCell>
                    <TableCell><StatusBadge status={doc.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// ===== DASHBOARD ESTOQUE =====
const DashboardEstoque = () => {
  const [periodo, setPeriodo] = useState<PeriodoType>("30d")
  const [unidade, setUnidade] = useState<string>("todos")
  const [setor, setSetor] = useState<string>("todos")
  const [status, setStatus] = useState<string>("todos")

  const unidades = ["todos", "Almoxarifado SP", "TI Central", "Manutenção", "Almoxarifado RJ"]
  const setores = ["todos", "Produção", "Manutenção", "TI", "Administrativo"]
  const statusList = ["todos", "Normal", "Crítico"]

  return (
    <div className="space-y-6">
      <FilterBar>
        <PeriodFilter periodo={periodo} setPeriodo={(v) => setPeriodo(v as PeriodoType)} />
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="filter-label">Unidade</label>
          <Select value={unidade} onValueChange={setUnidade}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todas Unidades" /></SelectTrigger>
            <SelectContent>{unidades.map((u) => <SelectItem key={u} value={u}>{u === "todos" ? "Todas Unidades" : u}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[140px]">
          <label className="filter-label">Setor</label>
          <Select value={setor} onValueChange={setSetor}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos Setores" /></SelectTrigger>
            <SelectContent>{setores.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos Setores" : s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[130px]">
          <label className="filter-label">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos Status" /></SelectTrigger>
            <SelectContent>{statusList.map((s) => <SelectItem key={s} value={s}>{s === "todos" ? "Todos Status" : s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </FilterBar>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GradientCard title="Entradas no Período" value="R$ 45.000,00" icon={ArrowUpRight} trend={{ value: "+15%", positive: true }} variant="success" delay={1} />
        <GradientCard title="Saídas no Período" value="R$ 32.000,00" icon={ArrowDownRight} trend={{ value: "-8%", positive: false }} variant="warning" delay={2} />
        <GradientCard title="Valor Total em Estoque" value="R$ 320.000,00" icon={DollarSign} variant="success" delay={3} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GradientCard title="Itens em Estoque" value="3.485" icon={Package} variant="info" delay={4} />
        <GradientCard title="Requisições Pendentes" value="12" icon={Receipt} variant="warning" delay={5} />
        <GradientCard title="Itens Críticos" value="5" icon={AlertTriangle} variant="danger" delay={6} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução de Estoque no Tempo" delay={7}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={estoqueEvolutionData}>
              <defs>
                <linearGradient id="estQtdGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Area type="monotone" dataKey="quantidade" name="Quantidade" stroke="hsl(var(--primary))" fill="url(#estQtdGrad)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Valor Financeiro do Estoque no Tempo" delay={8}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={estoqueEvolutionData}>
              <defs>
                <linearGradient id="colorValorEstoque" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(72 100% 50%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(72 100% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Area type="monotone" dataKey="valor" name="Valor (R$)" stroke="hsl(72 100% 50%)" fill="url(#colorValorEstoque)" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Consumo por Setor" delay={9}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consumoSetorData} layout="vertical" barSize={20}>
              <defs>
                <linearGradient id="estSetorGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="setor" tick={axisStyle} width={100} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="valor" name="Consumo" fill="url(#estSetorGrad)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Estoque por Unidade / Almoxarifado" delay={10}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={estoqueUnidadeData}>
              <defs>
                <linearGradient id="estUnidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(72 100% 55%)" />
                  <stop offset="100%" stopColor="hsl(72 100% 40%)" />
                </linearGradient>
              </defs>
              <XAxis dataKey="unidade" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="valor" name="Valor" fill="url(#estUnidGrad)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn delay={11}>
          <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
            <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Top 10 Itens em Estoque</h3></div>
            <div className="px-6 pb-6">
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
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={12}>
          <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
            <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Top 10 Itens Mais Consumidos</h3></div>
            <div className="px-6 pb-6">
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
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={13}>
        <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
          <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Visão Geral do Inventário</h3></div>
          <div className="px-6 pb-6">
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
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={14}>
        <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
          <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Histórico Consolidado de Movimentações</h3></div>
          <div className="px-6 pb-6">
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
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

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

  const patrimonioTotal = patrimonioTipoData.reduce((s, d) => s + d.value, 0)
  const patrimonioQtdTotal = patrimonioQuantidadeData.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <FilterBar>
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="filter-label">Data de Aquisição</label>
          <input type="date" value={dataAquisicao} onChange={(e) => setDataAquisicao(e.target.value)}
            className="filter-input" />
        </div>
        <div className="flex flex-col gap-1.5 min-w-[130px]">
          <label className="filter-label">Código</label>
          <Select value={codigoItem} onValueChange={setCodigoItem}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {visaoGeralPatrimonioData.map((p) => <SelectItem key={p.codigo} value={p.codigo}>{p.codigo}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[150px]">
          <label className="filter-label">Tipo</label>
          <Select value={tipoItem} onValueChange={setTipoItem}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todos os tipos" /></SelectTrigger>
            <SelectContent>{tiposPatrimonio.map((t) => <SelectItem key={t} value={t}>{t === "todos" ? "Todos os tipos" : t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[170px]">
          <label className="filter-label">Faixa de Valor</label>
          <Select value={faixaValor} onValueChange={setFaixaValor}>
            <SelectTrigger className="filter-input"><SelectValue placeholder="Todas as faixas" /></SelectTrigger>
            <SelectContent>{faixasValor.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </FilterBar>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <GradientCard title="Valor Adquirido no Período" value="R$ 45.000,00" icon={ArrowUpRight} variant="success" trend={{ value: "+12%", positive: true }} delay={1} />
        <GradientCard title="Baixas no Período" value="R$ 8.000,00" icon={ArrowDownRight} variant="warning" trend={{ value: "-2%", positive: false }} delay={2} />
        <GradientCard title="Valor Total do Patrimônio" value="R$ 900.000,00" icon={DollarSign} variant="success" trend={{ value: "+5.2%", positive: true }} delay={3} />
        <GradientCard title="Total de Itens Patrimoniais" value="156" icon={Building2} variant="info" delay={4} />
        <GradientCard title="Tipos de Patrimônio Ativos" value="4" icon={BarChart3} variant="neutral" delay={5} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução do Valor Patrimonial" delay={6}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={patrimonioEvolutionData}>
              <defs>
                <linearGradient id="patrimonioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Area type="monotone" dataKey="valor" name="Valor Patrimonial" stroke="hsl(var(--primary))" fill="url(#patrimonioGradient)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Valor do Patrimônio por Tipo" delay={7}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={patrimonioTipoData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={4} dataKey="value" cornerRadius={6}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {patrimonioTipoData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              {renderDonutCenter(formatCurrency(patrimonioTotal), "Total")}
              <Tooltip content={<ChartTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Quantidade por Tipo" delay={8}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={patrimonioQuantidadeData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" cornerRadius={6}
                label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {patrimonioQuantidadeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              {renderDonutCenter(`${patrimonioQtdTotal}`, "Itens")}
              <Tooltip content={<ChartTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 Itens por Valor Total" delay={9}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topPatrimonioData.map(i => ({ ...i, valorNum: parseFloat(i.valor.replace(/[^\d,]/g, '').replace(',', '.')) * 1000 }))} layout="vertical" barSize={18}>
              <defs>
                <linearGradient id="patTopGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="item" tick={{ ...axisStyle, fontSize: 9 }} width={100} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="valorNum" name="Valor" fill="url(#patTopGrad)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Aquisições por Período" delay={10}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aquisicoesPorPeriodoData}>
              <defs>
                <linearGradient id="patAqGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="patAqGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(72 80% 60%)" stopOpacity={1} />
                  <stop offset="100%" stopColor="hsl(72 80% 60%)" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="aquisicoes" name="Qtd. Aquisições" fill="url(#patAqGrad1)" radius={[4, 4, 4, 4]} />
              <Bar yAxisId="right" dataKey="valor" name="Valor (R$)" fill="url(#patAqGrad2)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <FadeIn delay={11}>
        <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
          <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Visão Geral do Patrimônio</h3></div>
          <div className="px-6 pb-6">
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
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={12}>
        <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
          <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Histórico de Aquisições</h3></div>
          <div className="px-6 pb-6">
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
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// ===== DASHBOARD MEU PERFIL =====
const DashboardMeuPerfil = () => {
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null)

  const openPopup = (title: string, content: React.ReactNode) => {
    setPopupTitle(title)
    setPopupContent(content)
    setPopupOpen(true)
  }

  const accessCards = [
    { label: "Setores", value: "3", content: (
      <ul className="space-y-2">
        <li className="flex justify-between py-2 border-b border-border/30"><span>Operacional</span><span className="text-xs text-muted-foreground">Admin</span></li>
        <li className="flex justify-between py-2 border-b border-border/30"><span>Estoque</span><span className="text-xs text-muted-foreground">Editor</span></li>
        <li className="flex justify-between py-2"><span>Financeiro</span><span className="text-xs text-muted-foreground">Visualizador</span></li>
      </ul>
    )},
    { label: "Módulos", value: "12", content: (
      <div className="grid grid-cols-2 gap-2">{["Dashboard","Estoque","Financeiro","Operacional","Cadastro","Comercial","Patrimônio","Kanban","Chat","Agenda","Relatórios","Gestão de Pessoas"].map(m => (
        <span key={m} className="text-sm py-1.5 px-3 rounded-lg bg-muted/50">{m}</span>
      ))}</div>
    )},
    { label: "Equipe", value: "8", content: (
      <ul className="space-y-2">
        {["Ana Costa - Analista","Carlos Lima - Técnico","Maria Santos - Coordenadora","José Alves - Operador","Fernanda Souza - Assistente","Ricardo Mendes - Engenheiro","Paula Oliveira - Analista","Bruno Silva - Auxiliar"].map(p => (
          <li key={p} className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{p.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
            <span className="text-sm">{p}</span>
          </li>
        ))}
      </ul>
    )},
    { label: "Perfil", value: "Gestor", content: (
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Tipo</span><span className="font-medium">Gestor</span></div>
        <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Permissão</span><span className="font-medium">Leitura e Escrita</span></div>
        <div className="flex justify-between py-2"><span className="text-muted-foreground">Aprovação</span><span className="font-medium">Sim</span></div>
      </div>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeIn delay={1}>
          <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20 lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4">PP</div>
              <h3 className="text-lg font-bold text-foreground">Pedro Piaes</h3>
              <p className="text-sm text-muted-foreground">Gerente de Operações</p>
              <p className="text-xs text-muted-foreground mt-1">pedro.piaes@empresa.com</p>
              <div className="mt-4 w-full space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Setor</span><span className="font-medium">Operacional</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Vínculo</span><span className="font-medium">CLT</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Admissão</span><span className="font-medium">15/03/2022</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><span className="font-medium text-lime-600">Ativo</span></div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={2} className="lg:col-span-2">
          <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
            <h3 className="text-sm font-semibold text-foreground mb-4">Resumo de Acesso</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {accessCards.map((card) => (
                <button
                  key={card.label}
                  onClick={() => openPopup(card.label, card.content)}
                  className="text-center p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <p className="text-2xl font-bold text-primary">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Meu Time */}
      <FadeIn delay={2.5}>
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-4">Meu Time</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { nome: "Ana Costa", cargo: "Analista", status: "Ativo" },
              { nome: "Carlos Lima", cargo: "Técnico", status: "Ativo" },
              { nome: "Maria Santos", cargo: "Coordenadora", status: "Ativo" },
              { nome: "José Alves", cargo: "Operador", status: "Afastado" },
              { nome: "Fernanda Souza", cargo: "Assistente", status: "Ativo" },
              { nome: "Ricardo Mendes", cargo: "Engenheiro", status: "Ativo" },
              { nome: "Paula Oliveira", cargo: "Analista", status: "Ativo" },
              { nome: "Bruno Silva", cargo: "Auxiliar", status: "Ativo" },
            ].map((membro) => (
              <div key={membro.nome} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {membro.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium">{membro.nome}</p>
                  <p className="text-xs text-muted-foreground">{membro.cargo} · <span className={membro.status === "Ativo" ? "text-lime-600" : "text-amber-500"}>{membro.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={3}>
        <div className="bg-card rounded-2xl p-6 shadow-sm shadow-black/[0.04] dark:shadow-black/20">
          <h3 className="text-sm font-semibold text-foreground mb-5">Últimas Atividades</h3>
          <div className="space-y-1">
            {[
              { acao: "Criou Ordem de Compra #OC-2026-045", data: "há 2 horas", modulo: "Estoque" },
              { acao: "Editou cadastro de Fornecedor ABC", data: "há 4 horas", modulo: "Cadastro" },
              { acao: "Aprovou requisição #REQ-0089", data: "ontem", modulo: "Estoque" },
              { acao: "Criou nova conta a pagar", data: "ontem", modulo: "Financeiro" },
              { acao: "Atualizou dados da embarcação Alfa", data: "2 dias atrás", modulo: "Operacional" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-3.5 border-b border-border/20 last:border-0">
                <div>
                  <p className="font-medium text-sm">{item.acao}</p>
                  <p className="text-xs text-muted-foreground">{item.modulo}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.data}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Popup for access details */}
      {popupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setPopupOpen(false)}>
          <div className="bg-card rounded-2xl p-6 shadow-2xl w-full max-w-md mx-4 border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">{popupTitle}</h3>
              <button onClick={() => setPopupOpen(false)} className="text-muted-foreground hover:text-foreground text-xl leading-none">&times;</button>
            </div>
            {popupContent}
          </div>
        </div>
      )}
    </div>
  )
}

// ===== DASHBOARD OPERACIONAL =====
const DashboardOperacional = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Operações Ativas" value="12" icon={BarChart3} variant="info" delay={1} />
        <GradientCard title="Embarcações em Serviço" value="8" icon={Package} variant="success" delay={2} />
        <GradientCard title="Serviços em Andamento" value="15" icon={TrendingUp} variant="warning" delay={3} />
        <GradientCard title="Setores Operacionais" value="4" icon={Building2} variant="neutral" delay={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Operações por Setor" delay={5}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { setor: "Porto", operacoes: 5 },
              { setor: "Offshore", operacoes: 3 },
              { setor: "Manutenção", operacoes: 4 },
              { setor: "Logística", operacoes: 2 },
            ]}>
              <XAxis dataKey="setor" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="operacoes" name="Operações" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Embarcações por Status" delay={6}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={[
                { name: "Em Operação", value: 8, color: "hsl(var(--primary))" },
                { name: "Em Manutenção", value: 2, color: "hsl(var(--chart-3))" },
                { name: "Disponível", value: 3, color: "hsl(72 80% 60%)" },
              ]} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" cornerRadius={6}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {[
                  { name: "Em Operação", value: 8, color: "hsl(var(--primary))" },
                  { name: "Em Manutenção", value: 2, color: "hsl(var(--chart-3))" },
                  { name: "Disponível", value: 3, color: "hsl(72 80% 60%)" },
                ].map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<ChartTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <FadeIn delay={7}>
        <div className="bg-card rounded-2xl shadow-sm shadow-black/[0.04] dark:shadow-black/20 overflow-hidden">
          <div className="p-6 pb-2"><h3 className="text-sm font-semibold">Últimas Operações</h3></div>
          <div className="px-6 pb-6">
            <Table>
              <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Operação</TableHead><TableHead>Embarcação</TableHead><TableHead>Setor</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {[
                  { data: "16/01/2026", operacao: "Carga Porto Santos", embarcacao: "MV Alfa", setor: "Porto", status: "Em Andamento" },
                  { data: "15/01/2026", operacao: "Manutenção Preventiva", embarcacao: "MV Beta", setor: "Manutenção", status: "Concluída" },
                  { data: "14/01/2026", operacao: "Transporte Offshore", embarcacao: "MV Gama", setor: "Offshore", status: "Em Andamento" },
                  { data: "13/01/2026", operacao: "Descarga Terminal", embarcacao: "MV Delta", setor: "Porto", status: "Concluída" },
                ].map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-sm">{item.data}</TableCell>
                    <TableCell className="font-medium text-sm">{item.operacao}</TableCell>
                    <TableCell className="text-sm">{item.embarcacao}</TableCell>
                    <TableCell className="text-sm">{item.setor}</TableCell>
                    <TableCell><StatusBadge status={item.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

// ===== MAIN DASHBOARD =====
const Dashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>("meu-perfil")

  const tabs: { key: DashboardType; label: string; icon: typeof LayoutGrid }[] = [
    { key: "meu-perfil", label: "Meu Perfil", icon: UserRoundPlus },
    { key: "geral", label: "Geral", icon: LayoutGrid },
    { key: "financeiro", label: "Financeiro", icon: DollarSign },
    { key: "estoque", label: "Estoque", icon: Package },
    { key: "patrimonio", label: "Patrimônio", icon: Building2 },
    { key: "operacional", label: "Operacional", icon: BarChart3 },
    { key: "comercial", label: "Comercial", icon: TrendingUp },
    { key: "rh", label: "Gestão de Pessoas", icon: UserRoundPlus },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6">
        {/* Tab Selector */}
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
        {activeDashboard === "meu-perfil" && <DashboardMeuPerfil />}
        {activeDashboard === "financeiro" && <DashboardFinanceiro />}
        {activeDashboard === "estoque" && <DashboardEstoque />}
        {activeDashboard === "patrimonio" && <DashboardPatrimonio />}
        {activeDashboard === "operacional" && <DashboardOperacional />}
        {activeDashboard === "comercial" && <VisaoGeralComercial />}
        {activeDashboard === "rh" && <VisaoGeralRH />}
      </div>
    </div>
  )
}

export default Dashboard
