import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

const FluxoCaixa = () => {
  const navigate = useNavigate()
  const transacoes = [
    {
      dataVencimento: "02/06/2025",
      dataPagamento: "02/06/2025", 
      beneficiario: "Fornecedor Alpha",
      tipo: "Saída",
      status: "Pendente",
      valorTotal: "R$ 10.000,00",
      saldo: "R$ 87.939,88"
    },
    {
      dataVencimento: "15/06/2025",
      dataPagamento: "15/06/2025",
      beneficiario: "Cliente Beta", 
      tipo: "Entrada",
      status: "Efetuado",
      valorTotal: "R$ 5.000,00",
      saldo: "R$ 92.939,88"
    },
    {
      dataVencimento: "20/06/2025",
      dataPagamento: "-",
      beneficiario: "Aluguel Junho", 
      tipo: "Saída",
      status: "Vencido",
      valorTotal: "R$ 2.500,00",
      saldo: "R$ 90.439,88"
    },
  ]

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
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Fluxo de Caixa</h1>
        
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

        <div className="flex flex-wrap gap-4 items-center">
          <Select>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded-lg">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="entrada">Entrada</SelectItem>
              <SelectItem value="saida">Saída</SelectItem>
            </SelectContent>
          </Select>
          
          <Input 
            placeholder="Beneficiário" 
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-52 rounded-lg"
          />
          <Input 
            type="date"
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg"
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
                <TableHead className="!text-white font-medium text-center">Vencimento</TableHead>
                <TableHead className="!text-white font-medium text-center">Pagamento</TableHead>
                <TableHead className="!text-white font-medium text-center">Tipo</TableHead>
                <TableHead className="!text-white font-medium text-center">Beneficiário</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Valor</TableHead>
                <TableHead className="!text-white font-medium text-center">Saldo</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transacoes.map((transacao, index) => (
                <TableRow key={index} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default FluxoCaixa