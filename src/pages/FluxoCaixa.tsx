import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react" // Ícone para o filtro de data

// Componentes de Card de Sumário Simples (para consistência visual)
const SummaryCard = ({ title, value, colorClass }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const FluxoCaixa = () => {
  const transacoes = [
    {
      dataVencimento: "02/06/2025",
      dataPagamento: "02/06/2025", 
      beneficiario: "Fornecedor Alpha",
      cnpj: "99.999.999/9999-99",
      tipo: "Saída",
      status: "Pendente",
      valorTotal: "R$ 10.000,00",
      saldo: "R$ 87.939,88"
    },
    {
      dataVencimento: "15/06/2025",
      dataPagamento: "15/06/2025",
      beneficiario: "Cliente Beta", 
      cnpj: "88.888.888/8888-88",
      tipo: "Entrada",
      status: "Efetuado",
      valorTotal: "R$ 5.000,00",
      saldo: "R$ 92.939,88"
    },
    {
      dataVencimento: "20/06/2025",
      dataPagamento: "-",
      beneficiario: "Aluguel Junho", 
      cnpj: "77.777.777/7777-77", 
      tipo: "Saída",
      status: "Vencido",
      valorTotal: "R$ 2.500,00",
      saldo: "R$ 90.439,88"
    },
    {
      dataVencimento: "25/06/2025",
      dataPagamento: "25/06/2025",
      beneficiario: "Serviço Gama",
      cnpj: "66.666.666/6666-66",
      tipo: "Entrada",
      status: "Efetuado", 
      valorTotal: "R$ 1.500,00",
      saldo: "R$ 91.939,88"
    },
  ]

  // Função auxiliar para definir a cor do status
  const getStatusColor = (status) => {
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

  // Função auxiliar para definir a cor da linha com base no tipo (Entrada/Saída)
  const getRowClass = (tipo) => {
    if (tipo === 'Entrada') {
      return 'bg-green-50 hover:bg-green-100 transition-colors'; // Fundo levemente verde para entrada
    } else if (tipo === 'Saída') {
      return 'bg-red-50 hover:bg-red-100 transition-colors'; // Fundo levemente vermelho para saída
    }
    return 'bg-white hover:bg-[#22265B] hover:text-white transition-colors';
  }


  return (
    // Estrutura do container principal copiada
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Fluxo de Caixa</h1>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="Total de Entradas" 
            value="R$ 94.439,88" 
            colorClass="bg-green-500" // Cor para Entradas
          />
          
          <SummaryCard 
            title="Total de Saídas" 
            value="R$ 12.500,00" 
            colorClass="bg-red-500" // Cor para Saídas
          />
          
          <SummaryCard 
            title="Saldo Atual" 
            value="R$ 81.939,88" 
            colorClass="bg-blue-500" // Cor Primária
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {/* Estilização dos botões copiada (laranja, rounded-full) */}
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Adicionar Transação
          </Button>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap">
          {/* Filtro de Tipo (Select) */}
          <div className="w-48">
            <Select>
              {/* Estilização do SelectTrigger copiada */}
              <SelectTrigger 
                className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg"
              >
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Input de CNPJ/Beneficiário */}
          <Input 
            placeholder="Beneficiário/CNPJ" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg"
          />

          {/* Input de Data de Vencimento/Pagamento com Ícone */}
          <div className="relative">
            <Input 
              placeholder="Data Inicial" 
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-lg pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="relative">
            <Input 
              placeholder="Data Final" 
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-lg pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Botão de Filtrar */}
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Tabela de Transações */}
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Transações Recentes</h2>
        
        <div className="rounded-lg overflow-x-auto border border-[#E3E3E3]">
          <Table>
            <TableHeader className="whitespace-nowrap">
              {/* Estilização do cabeçalho da tabela copiada */}
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Data Venc.</TableHead>
                <TableHead className="!text-black font-medium">Data Pag.</TableHead>
                <TableHead className="!text-black font-medium">Tipo</TableHead>
                <TableHead className="!text-black font-medium">Beneficiário/Cliente</TableHead>
                <TableHead className="!text-black font-medium">CNPJ</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead>
                <TableHead className="!text-black font-medium">Valor Total</TableHead>
                <TableHead className="!text-black font-medium">Saldo Parcial</TableHead>
                <TableHead className="!text-black font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {transacoes.map((transacao, index) => (
                // Estilização das linhas com cores condicionais e hover consistente
                <TableRow 
                  key={index} 
                  className={getRowClass(transacao.tipo) + ' text-black'}
                >
                  <TableCell className="text-center">{transacao.dataVencimento}</TableCell>
                  <TableCell className="text-center">{transacao.dataPagamento}</TableCell>
                  <TableCell>
                    <span className={transacao.tipo === 'Entrada' ? 'text-green-700' : 'text-red-700'}>
                      {transacao.tipo}
                    </span>
                  </TableCell>
                  <TableCell>{transacao.beneficiario}</TableCell>
                  <TableCell>{transacao.cnpj}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(transacao.status)}>{transacao.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className={transacao.tipo === 'Entrada' ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                      {transacao.valorTotal}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">{transacao.saldo}</TableCell>
                  <TableCell className="text-center">
                    {/* Estilização do botão de Ações na tabela copiada */}
                    <Button size="sm" className="rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-xs">
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