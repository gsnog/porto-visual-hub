import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"

const SummaryCard = ({ title, value, colorClass }: { title: string; value: string; colorClass: string }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="border-t border-white/30 mb-3"></div>
    <p className="text-2xl font-bold">{value}</p>
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
  const [filterData, setFilterData] = useState("")

  const filteredContas = useMemo(() => {
    return mockContas.filter(conta => {
      const matchBeneficiario = conta.beneficiario.toLowerCase().includes(filterBeneficiario.toLowerCase())
      const matchDocumento = conta.documento.toLowerCase().includes(filterDocumento.toLowerCase())
      const matchData = filterData ? conta.dataFaturamento.includes(filterData.split("-").reverse().join("/")) : true
      return matchBeneficiario && matchDocumento && matchData
    })
  }, [filterBeneficiario, filterDocumento, filterData])
  
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
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Contas a Pagar</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Pago" value="R$ 87.939,88" colorClass="bg-green-500" />
          <SummaryCard title="Total a Pagar" value="R$ 1.800,00" colorClass="bg-red-500" />
          <SummaryCard title="Valor Total em Títulos" value="R$ 89.739,88" colorClass="bg-blue-500" />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/financeiro/contas-pagar/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Adicionar Conta
          </Button>
          <Button onClick={() => navigate("/financeiro/contas-pagar/relatorio")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Relatório
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Beneficiário" 
            value={filterBeneficiario}
            onChange={(e) => setFilterBeneficiario(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-52 rounded-lg"
          />
          <Input 
            placeholder="Documento" 
            value={filterDocumento}
            onChange={(e) => setFilterDocumento(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-52 rounded-lg"
          />
          <Input 
            type="date"
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg"
          />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredContas.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Lançamento</TableHead>
                <TableHead className="!text-white font-medium text-center">Faturamento</TableHead>
                <TableHead className="!text-white font-medium text-center">Beneficiário</TableHead>
                <TableHead className="!text-white font-medium text-center">Documento</TableHead>
                <TableHead className="!text-white font-medium text-center">Título</TableHead>
                <TableHead className="!text-white font-medium text-center">Total</TableHead>
                <TableHead className="!text-white font-medium text-center">Vencimento</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
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
                  <TableRow key={conta.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
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

export default ContasPagar
