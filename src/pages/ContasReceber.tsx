import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const SummaryCard = ({ title, value, colorClass }: { title: string; value: string; colorClass: string }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="border-t border-white/30 mb-3"></div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ContasReceber = () => {
  const navigate = useNavigate()
  const contas = [
    {
      dataLancamento: "12/05/2025",
      dataFaturamento: "30/04/2025",
      cliente: "ABEEMAR",
      documento: "NI",
      valorTitulo: "R$ 659,88",
      valorTotalRecebido: "R$ 659,88",
      proximoVencimento: "XX/XX/XXXX",
      status: "Efetuado",
    },
    {
      dataLancamento: "12/05/2025",
      dataFaturamento: "30/04/2025",
      cliente: "ABEEMAR",
      documento: "NI",
      valorTitulo: "R$ 659,88",
      valorTotalRecebido: "R$ 659,88",
      proximoVencimento: "XX/XX/XXXX",
      status: "Em Aberto",
    },
    {
      dataLancamento: "12/05/2025",
      dataFaturamento: "30/04/2025",
      cliente: "ALPHA TECNOLOGIA",
      documento: "NF 1234",
      valorTitulo: "R$ 12.345,00",
      valorTotalRecebido: "R$ 0,00",
      proximoVencimento: "15/12/2025",
      status: "Vencido",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Efetuado':
        return 'text-green-600 font-medium';
      case 'Em Aberto':
        return 'text-yellow-600 font-medium';
      case 'Vencido':
        return 'text-red-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Contas a Receber</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Recebido" value="R$ 87.939,88" colorClass="bg-green-500" />
          <SummaryCard title="Total a Receber" value="R$ 12.345,00" colorClass="bg-red-500" />
          <SummaryCard title="Valor Total em Títulos" value="R$ 100.284,88" colorClass="bg-blue-500" />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/financeiro/contas-receber/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Adicionar Conta
          </Button>
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Relatório
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Cliente" 
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-52 rounded-lg"
          />
          <Input 
            placeholder="Documento" 
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-52 rounded-lg"
          />
          <Input 
            type="date"
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg"
          />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Lançamento</TableHead>
                <TableHead className="!text-white font-medium text-center">Faturamento</TableHead>
                <TableHead className="!text-white font-medium text-center">Cliente</TableHead>
                <TableHead className="!text-white font-medium text-center">Documento</TableHead>
                <TableHead className="!text-white font-medium text-center">Título</TableHead>
                <TableHead className="!text-white font-medium text-center">Recebido</TableHead>
                <TableHead className="!text-white font-medium text-center">Vencimento</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contas.map((conta, index) => (
                <TableRow key={index} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default ContasReceber