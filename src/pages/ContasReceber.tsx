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

const mockContas = [
  { id: 1, dataLancamento: "12/05/2025", dataFaturamento: "30/04/2025", cliente: "ABEEMAR", documento: "NI", valorTitulo: "R$ 659,88", valorTotalRecebido: "R$ 659,88", proximoVencimento: "XX/XX/XXXX", status: "Efetuado" },
  { id: 2, dataLancamento: "12/05/2025", dataFaturamento: "30/04/2025", cliente: "ABEEMAR", documento: "NI", valorTitulo: "R$ 659,88", valorTotalRecebido: "R$ 659,88", proximoVencimento: "XX/XX/XXXX", status: "Em Aberto" },
  { id: 3, dataLancamento: "12/05/2025", dataFaturamento: "30/04/2025", cliente: "ALPHA TECNOLOGIA", documento: "NF 1234", valorTitulo: "R$ 12.345,00", valorTotalRecebido: "R$ 0,00", proximoVencimento: "15/12/2025", status: "Vencido" },
  { id: 4, dataLancamento: "10/05/2025", dataFaturamento: "28/04/2025", cliente: "BETA CORP", documento: "NF 5678", valorTitulo: "R$ 8.500,00", valorTotalRecebido: "R$ 4.250,00", proximoVencimento: "10/01/2026", status: "Pago Parcial" },
]

const ContasReceber = () => {
  const navigate = useNavigate()
  const [filterCliente, setFilterCliente] = useState("")
  const [filterDocumento, setFilterDocumento] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")

  const filteredContas = useMemo(() => {
    return mockContas.filter(conta => {
      const matchCliente = conta.cliente.toLowerCase().includes(filterCliente.toLowerCase())
      const matchDocumento = conta.documento.toLowerCase().includes(filterDocumento.toLowerCase())
      const matchDataInicio = filterDataInicio ? conta.dataFaturamento >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? conta.dataFaturamento <= filterDataFim.split("-").reverse().join("/") : true
      return matchCliente && matchDocumento && matchDataInicio && matchDataFim
    })
  }, [filterCliente, filterDocumento, filterDataInicio, filterDataFim])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Efetuado':
        return 'text-green-600 font-medium';
      case 'Em Aberto':
        return 'text-yellow-600 font-medium';
      case 'Vencido':
        return 'text-red-600 font-medium';
      case 'Pago Parcial':
        return 'text-blue-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Recebido" value="R$ 87.939,88" colorClass="bg-green-500" />
          <SummaryCard title="Total a Receber" value="R$ 12.345,00" colorClass="bg-red-500" />
          <SummaryCard title="Valor Total em Títulos" value="R$ 100.284,88" colorClass="bg-primary" />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/financeiro/contas-receber/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Adicionar Conta
          </Button>
          <Button onClick={() => navigate("/financeiro/contas-receber/relatorio")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Relatório
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Cliente",
              placeholder: "Buscar cliente...",
              value: filterCliente,
              onChange: setFilterCliente,
              width: "flex-1 min-w-[180px]"
            },
            {
              type: "text",
              label: "Documento",
              placeholder: "Número do documento...",
              value: filterDocumento,
              onChange: setFilterDocumento,
              width: "min-w-[160px]"
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
          resultsCount={filteredContas.length}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Lançamento</TableHead>
                <TableHead className="text-center">Faturamento</TableHead>
                <TableHead className="text-center">Cliente</TableHead>
                <TableHead className="text-center">Documento</TableHead>
                <TableHead className="text-center">Título</TableHead>
                <TableHead className="text-center">Recebido</TableHead>
                <TableHead className="text-center">Vencimento</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Nenhuma conta encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContas.map((conta) => (
                  <TableRow key={conta.id}>
                    <TableCell className="text-center">{conta.dataLancamento}</TableCell>
                    <TableCell className="text-center">{conta.dataFaturamento}</TableCell>
                    <TableCell className="text-center">{conta.cliente}</TableCell>
                    <TableCell className="text-center">{conta.documento}</TableCell>
                    <TableCell className="text-center">{conta.valorTitulo}</TableCell>
                    <TableCell className="text-center">{conta.valorTotalRecebido}</TableCell>
                    <TableCell className="text-center">{conta.proximoVencimento}</TableCell>
                    <TableCell className="text-center">
                      <span className={getStatusColor(conta.status)}>{conta.status}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        Ações
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

export default ContasReceber
