import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/StatusBadge"
import { FileText, Download, X } from "lucide-react"
import { exportData } from "@/lib/exportData"

type TipoRelatorio = "contas-receber" | "contas-pagar" | "fluxo-caixa"
type TipoData = "vencimento" | "faturamento" | "pagamento"
type FiltroTempo = "anual" | "trimestral" | "mensal" | "diario" | "personalizado"

const mockContasReceber = [
  { codigo: "CR001", cliente: "Cliente ABC", vencimento: "20/01/2026", faturamento: "10/01/2026", pagamento: "-", valor: "R$ 15.000,00", status: "Em Aberto", categoria: "Serviços", contaBancaria: "Banco do Brasil", classificacao: "Receita Operacional" },
  { codigo: "CR002", cliente: "Cliente XYZ", vencimento: "25/01/2026", faturamento: "15/01/2026", pagamento: "-", valor: "R$ 8.500,00", status: "Em Aberto", categoria: "Produtos", contaBancaria: "Itaú", classificacao: "Receita Operacional" },
  { codigo: "CR003", cliente: "Cliente DEF", vencimento: "15/01/2026", faturamento: "05/01/2026", pagamento: "14/01/2026", valor: "R$ 12.000,00", status: "Recebida", categoria: "Serviços", contaBancaria: "Bradesco", classificacao: "Receita Operacional" },
  { codigo: "CR004", cliente: "Cliente GHI", vencimento: "10/01/2026", faturamento: "01/01/2026", pagamento: "10/01/2026", valor: "R$ 21.500,00", status: "Recebida", categoria: "Consultoria", contaBancaria: "Banco do Brasil", classificacao: "Receita Extra" },
  { codigo: "CR005", cliente: "Cliente JKL", vencimento: "05/02/2026", faturamento: "20/01/2026", pagamento: "-", valor: "R$ 5.800,00", status: "Vencida", categoria: "Produtos", contaBancaria: "Itaú", classificacao: "Receita Operacional" },
]

const mockContasPagar = [
  { codigo: "CP001", beneficiario: "Fornecedor A", vencimento: "22/01/2026", faturamento: "12/01/2026", pagamento: "-", valor: "R$ 8.000,00", status: "Em Aberto", categoria: "Material", contaBancaria: "Banco do Brasil", classificacao: "Despesa Operacional" },
  { codigo: "CP002", beneficiario: "Fornecedor B", vencimento: "18/01/2026", faturamento: "08/01/2026", pagamento: "17/01/2026", valor: "R$ 5.500,00", status: "Paga", categoria: "Serviços", contaBancaria: "Itaú", classificacao: "Despesa Operacional" },
  { codigo: "CP003", beneficiario: "Fornecedor C", vencimento: "28/01/2026", faturamento: "18/01/2026", pagamento: "-", valor: "R$ 14.500,00", status: "Em Aberto", categoria: "Equipamentos", contaBancaria: "Bradesco", classificacao: "Investimento" },
  { codigo: "CP004", beneficiario: "Energia Elétrica", vencimento: "05/01/2026", faturamento: "01/01/2026", pagamento: "04/01/2026", valor: "R$ 3.200,00", status: "Paga", categoria: "Utilidades", contaBancaria: "Banco do Brasil", classificacao: "Despesa Fixa" },
]

const mockFluxoCaixa = [
  { data: "01/01/2026", descricao: "Saldo Inicial", entrada: "R$ 150.000,00", saida: "-", saldo: "R$ 150.000,00", categoria: "Saldo", contaBancaria: "Todos" },
  { data: "05/01/2026", descricao: "Recebimento Cliente GHI", entrada: "R$ 21.500,00", saida: "-", saldo: "R$ 171.500,00", categoria: "Receita", contaBancaria: "Banco do Brasil" },
  { data: "05/01/2026", descricao: "Energia Elétrica", entrada: "-", saida: "R$ 3.200,00", saldo: "R$ 168.300,00", categoria: "Despesa", contaBancaria: "Banco do Brasil" },
  { data: "14/01/2026", descricao: "Recebimento Cliente DEF", entrada: "R$ 12.000,00", saida: "-", saldo: "R$ 180.300,00", categoria: "Receita", contaBancaria: "Bradesco" },
  { data: "17/01/2026", descricao: "Pgto Fornecedor B", entrada: "-", saida: "R$ 5.500,00", saldo: "R$ 174.800,00", categoria: "Despesa", contaBancaria: "Itaú" },
]

const trimestres = [
  { value: "1", label: "1º Trimestre (Jan-Mar)" },
  { value: "2", label: "2º Trimestre (Abr-Jun)" },
  { value: "3", label: "3º Trimestre (Jul-Set)" },
  { value: "4", label: "4º Trimestre (Out-Dez)" },
]

const meses = [
  { value: "01", label: "Janeiro" }, { value: "02", label: "Fevereiro" }, { value: "03", label: "Março" },
  { value: "04", label: "Abril" }, { value: "05", label: "Maio" }, { value: "06", label: "Junho" },
  { value: "07", label: "Julho" }, { value: "08", label: "Agosto" }, { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" }, { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
]

export default function Relatorios() {
  const [tipo, setTipo] = useState<TipoRelatorio>("contas-receber")
  const [tipoData, setTipoData] = useState<TipoData>("vencimento")
  const [filtroTempo, setFiltroTempo] = useState<FiltroTempo>("anual")
  const [ano, setAno] = useState("2026")
  const [trimestre, setTrimestre] = useState("1")
  const [mes, setMes] = useState("01")
  const [dia, setDia] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")

  // Relacionados filters
  const [cliente, setCliente] = useState("")
  const [contaBancaria, setContaBancaria] = useState("")
  const [classificacao, setClassificacao] = useState("")
  const [categoria, setCategoria] = useState("")
  const [planoContas, setPlanoContas] = useState("")
  const [diretoria, setDiretoria] = useState("")
  const [area, setArea] = useState("")
  const [areaFinal, setAreaFinal] = useState("")
  const [centroReceita, setCentroReceita] = useState("")
  const [status, setStatus] = useState("")

  const [showPopup, setShowPopup] = useState(false)

  const getData = () => {
    if (tipo === "contas-receber") return mockContasReceber
    if (tipo === "contas-pagar") return mockContasPagar
    return mockFluxoCaixa
  }

  const getExportData = () => {
    const data = getData()
    return data.map(item => ({ ...item }))
  }

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    const label = tipo === "contas-receber" ? "Contas a Receber" : tipo === "contas-pagar" ? "Contas a Pagar" : "Fluxo de Caixa"
    exportData(getExportData() as Record<string, unknown>[], `Relatório ${label}`, format)
  }

  const SelectFilter = ({ label: lbl, value: val, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{lbl}</Label>
      <Select value={val} onValueChange={onChange}>
        <SelectTrigger className="w-full"><SelectValue placeholder="---" /></SelectTrigger>
        <SelectContent>{options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
        </div>

        <Card className="border-border">
          <CardContent className="p-6 space-y-6">
            {/* Primary filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SelectFilter label="Tipo:" value={tipo} onChange={(v) => setTipo(v as TipoRelatorio)} options={[
                { value: "contas-receber", label: "Contas a Receber" },
                { value: "contas-pagar", label: "Contas a Pagar" },
                { value: "fluxo-caixa", label: "Fluxo de Caixa" },
              ]} />
              <SelectFilter label="Data:" value={tipoData} onChange={(v) => setTipoData(v as TipoData)} options={[
                { value: "vencimento", label: "Data de Vencimento" },
                { value: "faturamento", label: "Data de Faturamento" },
                { value: "pagamento", label: "Data de Pagamento" },
              ]} />
              <SelectFilter label="Filtrar por:" value={filtroTempo} onChange={(v) => setFiltroTempo(v as FiltroTempo)} options={[
                { value: "anual", label: "Anual" },
                { value: "trimestral", label: "Trimestral" },
                { value: "mensal", label: "Mensal" },
                { value: "diario", label: "Diário" },
                { value: "personalizado", label: "Personalizado" },
              ]} />

              {/* Dynamic time filters */}
              {filtroTempo === "anual" && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Ano:</Label>
                  <Input value={ano} onChange={(e) => setAno(e.target.value)} placeholder="2026" />
                </div>
              )}
              {filtroTempo === "trimestral" && (
                <SelectFilter label="Trimestre:" value={trimestre} onChange={setTrimestre} options={trimestres} />
              )}
              {filtroTempo === "mensal" && (
                <SelectFilter label="Mês:" value={mes} onChange={setMes} options={meses} />
              )}
              {filtroTempo === "diario" && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Data:</Label>
                  <Input type="date" value={dia} onChange={(e) => setDia(e.target.value)} />
                </div>
              )}
              {filtroTempo === "personalizado" && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Data Início:</Label>
                  <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                </div>
              )}
            </div>

            {/* Extra row for trimestral/mensal year + personalizado end */}
            {(filtroTempo === "trimestral" || filtroTempo === "mensal") && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Ano:</Label>
                  <Input value={ano} onChange={(e) => setAno(e.target.value)} placeholder="2026" />
                </div>
              </div>
            )}
            {filtroTempo === "personalizado" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Data Fim:</Label>
                  <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                </div>
              </div>
            )}

            {/* Relacionados */}
            <div className="border-t border-border pt-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Relacionados</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectFilter label="Cliente:" value={cliente} onChange={setCliente} options={[
                  { value: "abc", label: "Cliente ABC" }, { value: "xyz", label: "Cliente XYZ" }, { value: "def", label: "Cliente DEF" },
                ]} />
                <SelectFilter label="Conta Bancária:" value={contaBancaria} onChange={setContaBancaria} options={[
                  { value: "bb", label: "Banco do Brasil" }, { value: "itau", label: "Itaú" }, { value: "bradesco", label: "Bradesco" },
                ]} />
                <SelectFilter label="Classificação:" value={classificacao} onChange={setClassificacao} options={[
                  { value: "receita-op", label: "Receita Operacional" }, { value: "receita-extra", label: "Receita Extra" }, { value: "despesa-op", label: "Despesa Operacional" },
                ]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <SelectFilter label="Categoria:" value={categoria} onChange={setCategoria} options={[
                  { value: "servicos", label: "Serviços" }, { value: "produtos", label: "Produtos" }, { value: "consultoria", label: "Consultoria" },
                ]} />
                <SelectFilter label="Plano de Contas:" value={planoContas} onChange={setPlanoContas} options={[
                  { value: "plano1", label: "Plano Principal" }, { value: "plano2", label: "Plano Auxiliar" },
                ]} />
                <SelectFilter label="Diretoria:" value={diretoria} onChange={setDiretoria} options={[
                  { value: "financeira", label: "Financeira" }, { value: "operacional", label: "Operacional" }, { value: "comercial", label: "Comercial" },
                ]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <SelectFilter label="Área:" value={area} onChange={setArea} options={[
                  { value: "adm", label: "Administrativo" }, { value: "ti", label: "TI" }, { value: "producao", label: "Produção" },
                ]} />
                <SelectFilter label="Área Final:" value={areaFinal} onChange={setAreaFinal} options={[
                  { value: "adm", label: "Administrativo" }, { value: "ti", label: "TI" }, { value: "producao", label: "Produção" },
                ]} />
                <SelectFilter label="Centro de Receita:" value={centroReceita} onChange={setCentroReceita} options={[
                  { value: "cr1", label: "Centro Principal" }, { value: "cr2", label: "Centro Secundário" },
                ]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <SelectFilter label="Status:" value={status} onChange={setStatus} options={[
                  { value: "em-aberto", label: "Em Aberto" }, { value: "paga", label: "Paga/Recebida" }, { value: "vencida", label: "Vencida" },
                ]} />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={() => setShowPopup(true)} className="gap-2">
                <FileText className="h-4 w-4" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowPopup(false)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[85vh] flex flex-col border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Relatório - {tipo === "contas-receber" ? "Contas a Receber" : tipo === "contas-pagar" ? "Contas a Pagar" : "Fluxo de Caixa"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {filtroTempo === "anual" ? `Ano ${ano}` : filtroTempo === "trimestral" ? `${trimestres.find(t => t.value === trimestre)?.label} - ${ano}` : filtroTempo === "mensal" ? `${meses.find(m => m.value === mes)?.label} - ${ano}` : filtroTempo === "diario" ? dia : `${dataInicio} a ${dataFim}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport('pdf')}>
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport('csv')}>
                  <Download className="h-3.5 w-3.5" /> CSV
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport('excel')}>
                  <Download className="h-3.5 w-3.5" /> XLSX
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowPopup(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {tipo === "contas-receber" && (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--sidebar-bg))] hover:bg-[hsl(var(--sidebar-bg))]">
                      <TableHead className="text-foreground font-semibold">Código</TableHead>
                      <TableHead className="text-foreground font-semibold">Cliente</TableHead>
                      <TableHead className="text-foreground font-semibold">Vencimento</TableHead>
                      <TableHead className="text-foreground font-semibold">Categoria</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Valor</TableHead>
                      <TableHead className="text-foreground font-semibold text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContasReceber.map((item) => (
                      <TableRow key={item.codigo}>
                        <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                        <TableCell>{item.cliente}</TableCell>
                        <TableCell>{item.vencimento}</TableCell>
                        <TableCell>{item.categoria}</TableCell>
                        <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                        <TableCell className="text-center"><StatusBadge status={item.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {tipo === "contas-pagar" && (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--sidebar-bg))] hover:bg-[hsl(var(--sidebar-bg))]">
                      <TableHead className="text-foreground font-semibold">Código</TableHead>
                      <TableHead className="text-foreground font-semibold">Beneficiário</TableHead>
                      <TableHead className="text-foreground font-semibold">Vencimento</TableHead>
                      <TableHead className="text-foreground font-semibold">Categoria</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Valor</TableHead>
                      <TableHead className="text-foreground font-semibold text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContasPagar.map((item) => (
                      <TableRow key={item.codigo}>
                        <TableCell className="font-medium text-xs">{item.codigo}</TableCell>
                        <TableCell>{item.beneficiario}</TableCell>
                        <TableCell>{item.vencimento}</TableCell>
                        <TableCell>{item.categoria}</TableCell>
                        <TableCell className="text-right font-semibold">{item.valor}</TableCell>
                        <TableCell className="text-center"><StatusBadge status={item.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {tipo === "fluxo-caixa" && (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[hsl(var(--sidebar-bg))] hover:bg-[hsl(var(--sidebar-bg))]">
                      <TableHead className="text-foreground font-semibold">Data</TableHead>
                      <TableHead className="text-foreground font-semibold">Descrição</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Entrada</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Saída</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockFluxoCaixa.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.data}</TableCell>
                        <TableCell>{item.descricao}</TableCell>
                        <TableCell className="text-right font-semibold text-lime-600">{item.entrada}</TableCell>
                        <TableCell className="text-right font-semibold text-rose-500">{item.saida}</TableCell>
                        <TableCell className="text-right font-bold">{item.saldo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* Summary */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Registros</p>
                  <p className="text-xl font-bold text-primary mt-1">{getData().length}</p>
                </div>
                {tipo !== "fluxo-caixa" && (
                  <>
                    <div className="p-4 rounded-xl bg-primary/5 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Em Aberto</p>
                      <p className="text-xl font-bold text-primary mt-1">{getData().filter((i: any) => i.status === "Em Aberto").length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{tipo === "contas-receber" ? "Recebidas" : "Pagas"}</p>
                      <p className="text-xl font-bold text-primary mt-1">{getData().filter((i: any) => i.status === "Recebida" || i.status === "Paga").length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Vencidas</p>
                      <p className="text-xl font-bold text-primary mt-1">{getData().filter((i: any) => i.status === "Vencida").length}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}