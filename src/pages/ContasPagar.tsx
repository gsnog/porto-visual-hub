import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus, FileText } from "lucide-react"
import { TableActions } from "@/components/TableActions"

const SummaryCard = ({ title, value, colorClass }: { title: string; value: string; colorClass: string }) => (
  <div className={`summary-card ${colorClass}`}>
    <h3 className="summary-card-title">{title}</h3>
    <div className="summary-card-divider"></div>
    <p className="summary-card-value">{value}</p>
  </div>
);

const mockContas = [
  { id: 1, dataLancamento: "02/06/2025", dataFaturamento: "05/06/2025", proximoVencimento: "-", beneficiario: "Pedro Piaes", documento: "NI", valorTitulo: "R$ 1.500,00", valorTotal: "R$ 1.500,00", status: "Em Aberto" },
  { id: 2, dataLancamento: "02/06/2025", dataFaturamento: "05/06/2025", proximoVencimento: "20/12/2025", beneficiario: "Transportadora X", documento: "NF 987", valorTitulo: "R$ 250,00", valorTotal: "R$ 300,00", status: "Pago Parcial" },
  { id: 3, dataLancamento: "01/05/2025", dataFaturamento: "01/05/2025", proximoVencimento: "20/11/2025", beneficiario: "Fornecedor Y", documento: "BOL 101", valorTitulo: "R$ 5.000,00", valorTotal: "R$ 5.050,00", status: "Efetuado" },
  { id: 4, dataLancamento: "15/04/2025", dataFaturamento: "15/04/2025", proximoVencimento: "15/10/2025", beneficiario: "Aluguel Sede", documento: "REC 001", valorTitulo: "R$ 3.000,00", valorTotal: "R$ 3.000,00", status: "Vencido" },
]

const ContasPagar = () => {
  const navigate = useNavigate()
  const [filterBeneficiario, setFilterBeneficiario] = useState("")
  const [filterDocumento, setFilterDocumento] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")

  const filteredContas = useMemo(() => {
    return mockContas.filter(conta => {
      const matchBeneficiario = conta.beneficiario.toLowerCase().includes(filterBeneficiario.toLowerCase())
      const matchDocumento = conta.documento.toLowerCase().includes(filterDocumento.toLowerCase())
      const matchDataInicio = filterDataInicio ? conta.dataFaturamento >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? conta.dataFaturamento <= filterDataFim.split("-").reverse().join("/") : true
      return matchBeneficiario && matchDocumento && matchDataInicio && matchDataFim
    })
  }, [filterBeneficiario, filterDocumento, filterDataInicio, filterDataFim])
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Efetuado':
        return 'text-success font-semibold';
      case 'Em Aberto':
        return 'text-warning font-semibold';
      case 'Vencido':
        return 'text-destructive font-semibold';
      case 'Pago Parcial':
        return 'text-primary font-semibold';
      default:
        return 'text-muted-foreground';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Pago" value="R$ 87.939,88" colorClass="bg-success" />
          <SummaryCard title="Total a Pagar" value="R$ 1.800,00" colorClass="bg-destructive" />
          <SummaryCard title="Valor Total em Títulos" value="R$ 89.739,88" colorClass="bg-primary" />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/financeiro/contas-pagar/nova")} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Conta
          </Button>
          <Button onClick={() => navigate("/financeiro/contas-pagar/relatorio")} variant="outline" className="gap-2 border-border">
            <FileText className="w-4 h-4" />
            Relatório
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Beneficiário",
              placeholder: "Buscar beneficiário...",
              value: filterBeneficiario,
              onChange: setFilterBeneficiario,
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Lançamento</TableHead>
              <TableHead className="text-center">Faturamento</TableHead>
              <TableHead className="text-center">Beneficiário</TableHead>
              <TableHead className="text-center">Documento</TableHead>
              <TableHead className="text-center">Título</TableHead>
              <TableHead className="text-center">Total</TableHead>
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
                  <TableCell className="text-center">{conta.beneficiario}</TableCell>
                  <TableCell className="text-center">{conta.documento}</TableCell>
                  <TableCell className="text-center">{conta.valorTitulo}</TableCell>
                  <TableCell className="text-center">{conta.valorTotal}</TableCell>
                  <TableCell className="text-center">{conta.proximoVencimento}</TableCell>
                  <TableCell className="text-center">
                    <span className={getStatusColor(conta.status)}>{conta.status}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <TableActions 
                      onView={() => console.log('View', conta.id)}
                      onEdit={() => console.log('Edit', conta.id)}
                      onDelete={() => console.log('Delete', conta.id)}
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

export default ContasPagar
