import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus, FileText, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react"
import { TableActions } from "@/components/TableActions"
import { GradientCard } from "@/components/financeiro/GradientCard"
import { StatusBadge } from "@/components/StatusBadge"

const mockTransacoes = [
  { id: 1, dataVencimento: "02/06/2025", dataPagamento: "02/06/2025", beneficiario: "Fornecedor Alpha", tipo: "Saída", status: "Pendente", valorTotal: "R$ 10.000,00", saldo: "R$ 87.939,88" },
  { id: 2, dataVencimento: "15/06/2025", dataPagamento: "15/06/2025", beneficiario: "Cliente Beta", tipo: "Entrada", status: "Efetuado", valorTotal: "R$ 5.000,00", saldo: "R$ 92.939,88" },
  { id: 3, dataVencimento: "20/06/2025", dataPagamento: "-", beneficiario: "Aluguel Junho", tipo: "Saída", status: "Vencido", valorTotal: "R$ 2.500,00", saldo: "R$ 90.439,88" },
  { id: 4, dataVencimento: "25/06/2025", dataPagamento: "25/06/2025", beneficiario: "Venda Produto X", tipo: "Entrada", status: "Efetuado", valorTotal: "R$ 15.000,00", saldo: "R$ 105.439,88" },
]

const FluxoCaixa = () => {
  const navigate = useNavigate()
  const [filterTipo, setFilterTipo] = useState("")
  const [filterBeneficiario, setFilterBeneficiario] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")

  const filteredTransacoes = useMemo(() => {
    return mockTransacoes.filter(trans => {
      const matchTipo = filterTipo && filterTipo !== "todos" 
        ? trans.tipo.toLowerCase() === filterTipo 
        : true
      const matchBeneficiario = trans.beneficiario.toLowerCase().includes(filterBeneficiario.toLowerCase())
      const matchDataInicio = filterDataInicio ? trans.dataVencimento >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? trans.dataVencimento <= filterDataFim.split("-").reverse().join("/") : true
      return matchTipo && matchBeneficiario && matchDataInicio && matchDataFim
    })
  }, [filterTipo, filterBeneficiario, filterDataInicio, filterDataFim])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GradientCard title="Total de Entradas" value="R$ 94.439,88" icon={ArrowUpRight} variant="success" />
          <GradientCard title="Total de Saídas" value="R$ 12.500,00" icon={ArrowDownRight} variant="danger" />
          <GradientCard title="Saldo Atual" value="R$ 81.939,88" icon={Wallet} variant="orange" />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Transação
          </Button>
          <Button onClick={() => navigate("/financeiro/fluxo-caixa/relatorio")} variant="outline" className="gap-2 border-border">
            <FileText className="w-4 h-4" />
            Relatório
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "select",
              label: "Tipo",
              placeholder: "Selecione o tipo",
              value: filterTipo,
              onChange: setFilterTipo,
              options: [
                { value: "todos", label: "Todos" },
                { value: "entrada", label: "Entrada" },
                { value: "saída", label: "Saída" }
              ],
              width: "min-w-[160px]"
            },
            {
              type: "text",
              label: "Beneficiário",
              placeholder: "Buscar beneficiário...",
              value: filterBeneficiario,
              onChange: setFilterBeneficiario,
              width: "flex-1 min-w-[180px]"
            },
            {
              type: "date",
              label: "Data Início",
              value: filterDataInicio,
              onChange: setFilterDataInicio,
              width: "min-w-[160px]"
            },
            {
              type: "date",
              label: "Data Fim",
              value: filterDataFim,
              onChange: setFilterDataFim,
              width: "min-w-[160px]"
            }
          ]}
          resultsCount={filteredTransacoes.length}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Vencimento</TableHead>
              <TableHead className="text-center">Pagamento</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Beneficiário</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Valor</TableHead>
              <TableHead className="text-center">Saldo</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransacoes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransacoes.map((transacao) => (
                <TableRow key={transacao.id}>
                  <TableCell className="text-center">{transacao.dataVencimento}</TableCell>
                  <TableCell className="text-center">{transacao.dataPagamento}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={transacao.tipo} />
                  </TableCell>
                  <TableCell className="text-center">{transacao.beneficiario}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={transacao.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={transacao.tipo === 'Entrada' ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                      {transacao.valorTotal}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{transacao.saldo}</TableCell>
                  <TableCell className="text-center">
                    <TableActions 
                      onView={() => console.log('View', transacao.id)}
                      onEdit={() => console.log('Edit', transacao.id)}
                      onDelete={() => console.log('Delete', transacao.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default FluxoCaixa
