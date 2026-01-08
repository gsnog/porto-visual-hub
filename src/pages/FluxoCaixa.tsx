import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"

const SummaryCard = ({ title, value, colorClass }: { title: string; value: string; colorClass: string }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="border-t border-white/30 mb-3"></div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Efetuado':
        return 'text-green-600 font-medium';
      case 'Pendente':
        return 'text-yellow-600 font-medium';
      case 'Vencido':
        return 'text-red-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total de Entradas" value="R$ 94.439,88" colorClass="bg-green-500" />
          <SummaryCard title="Total de Saídas" value="R$ 12.500,00" colorClass="bg-red-500" />
          <SummaryCard title="Saldo Atual" value="R$ 81.939,88" colorClass="bg-blue-500" />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Adicionar Transação
          </Button>
          <Button onClick={() => navigate("/financeiro/fluxo-caixa/relatorio")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
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

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
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
                      <span className={transacao.tipo === 'Entrada' ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                        {transacao.tipo}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{transacao.beneficiario}</TableCell>
                    <TableCell className="text-center">
                      <span className={getStatusColor(transacao.status)}>{transacao.status}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={transacao.tipo === 'Entrada' ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                        {transacao.valorTotal}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{transacao.saldo}</TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default FluxoCaixa
