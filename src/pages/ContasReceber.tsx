import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, DollarSign } from "lucide-react"

// Componentes de Card de Sumário Simples (para manter a funcionalidade original de Cards de Resumo)
const SummaryCard = ({ title, value, colorClass }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ContasReceber = () => {
  // Dados de exemplo (mantidos do original)
  const contas = [
    {
      dataLancamento: "12/05/2025",
      dataFaturamento: "30/04/2025",
      cliente: "ABEEMAR",
      documento: "NI",
      valorTitulo: "R$ 659,88",
      multa: "R$ 0,00",
      encargos: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotalRecebido: "R$ 659,88",
      totalParcelas: "1",
      parcelasPagas: "1",
      proximoVencimento: "XX/XX/XXXX",
      status: "Efetuado",
    },
    {
      dataLancamento: "12/05/2025",
      dataFaturamento: "30/04/2025",
      cliente: "ABEEMAR",
      documento: "NI",
      valorTitulo: "R$ 659,88",
      multa: "R$ 0,00",
      encargos: "R$ 0,00", 
      desconto: "R$ 0,00",
      valorTotalRecebido: "R$ 659,88",
      totalParcelas: "1",
      parcelasPagas: "1",
      proximoVencimento: "XX/XX/XXXX",
      status: "Em Aberto",
    },
    {
      dataLancamento: "12/05/2025",
      dataFaturamento: "30/04/2025",
      cliente: "ALPHA TECNOLOGIA",
      documento: "NF 1234",
      valorTitulo: "R$ 12.345,00",
      multa: "R$ 0,00",
      encargos: "R$ 123,45",
      desconto: "R$ 0,00",
      valorTotalRecebido: "R$ 0,00",
      totalParcelas: "3",
      parcelasPagas: "0",
      proximoVencimento: "15/12/2025",
      status: "Vencido",
    },
    {
      dataLancamento: "12/05/2025",
      dataFaturamento: "30/04/2025", 
      cliente: "BRAVO SERVICOS",
      documento: "FAT 567",
      valorTitulo: "R$ 2.000,00",
      multa: "R$ 0,00",
      encargos: "R$ 0,00",
      desconto: "R$ 100,00",
      valorTotalRecebido: "R$ 1.900,00",
      totalParcelas: "1",
      parcelasPagas: "1",
      proximoVencimento: "XX/XX/XXXX",
      status: "Efetuado",
    },
  ]

  // Função auxiliar para definir a cor do status
  const getStatusColor = (status) => {
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
    // Estrutura do container principal copiada de EstoqueSaidas
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Contas a Receber</h1>
        </div>

        {/* Cards de Sumário (Mantidos com classe de cor Tailwind) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Use cores mais vivas que simulam as classes bg-success/destructive/primary */}
          <SummaryCard 
            title="Total Recebido" 
            value="R$ 87.939,88" 
            colorClass="bg-green-500" // Cor para 'Efetuado' / 'Pago'
          />
          
          <SummaryCard 
            title="Total a Receber" 
            value="R$ 12.345,00" 
            colorClass="bg-red-500" // Cor para 'Vencido' / 'A Receber'
          />
          
          <SummaryCard 
            title="Valor Total em Títulos" 
            value="R$ 100.284,88" 
            colorClass="bg-blue-500" // Cor Primária
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-2">
          {/* Estilização dos botões copiada de EstoqueSaidas */}
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Adicionar Conta
          </Button>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center flex-wrap">
          {/* Adicionando text-black para garantir que o texto digitado seja preto */}
          <Input 
            placeholder="Cliente" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"
          />
          <Input 
            placeholder="Documento" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"
          />
          
          {/* Input de Valor com Ícone (como no Exemplo de Data) */}
          <div className="relative">
            <Input 
              placeholder="Valor Mínimo" 
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-full pr-10"
            />
            <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Input de Data de Vencimento com Ícone */}
          <div className="relative">
            <Input 
              placeholder="Próx. Vencimento" 
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-full pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Botão de Filtrar */}
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Tabela de Contas */}
        {/* Estilização da tabela copiada de EstoqueSaidas */}
        <div className="rounded-lg overflow-x-auto border border-[#E3E3E3] mt-6">
          <Table>
            <TableHeader className="whitespace-nowrap">
              {/* Estilização do cabeçalho da tabela copiada de EstoqueSaidas */}
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Lançamento</TableHead>
                <TableHead className="!text-black font-medium">Faturamento</TableHead>
                <TableHead className="!text-black font-medium">Cliente</TableHead>
                <TableHead className="!text-black font-medium">Documento</TableHead>
                <TableHead className="!text-black font-medium">Valor Título</TableHead>
                <TableHead className="!text-black font-medium">Multa</TableHead>
                <TableHead className="!text-black font-medium">Encargos</TableHead>
                <TableHead className="!text-black font-medium">Desconto</TableHead>
                <TableHead className="!text-black font-medium">Valor Recebido</TableHead>
                <TableHead className="!text-black font-medium text-center">Parcelas</TableHead>
                <TableHead className="!text-black font-medium text-center">Pagas</TableHead>
                <TableHead className="!text-black font-medium">Próx. Venc.</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead>
                <TableHead className="!text-black font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {contas.map((conta, index) => (
                // Estilização das linhas copiada de EstoqueSaidas
                <TableRow 
                  key={index} 
                  className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors"
                >
                  <TableCell className="text-center">{conta.dataLancamento}</TableCell>
                  <TableCell className="text-center">{conta.dataFaturamento}</TableCell>
                  <TableCell>{conta.cliente}</TableCell>
                  <TableCell>{conta.documento}</TableCell>
                  <TableCell>{conta.valorTitulo}</TableCell>
                  <TableCell>{conta.multa}</TableCell>
                  <TableCell>{conta.encargos}</TableCell>
                  <TableCell>{conta.desconto}</TableCell>
                  <TableCell>{conta.valorTotalRecebido}</TableCell>
                  <TableCell className="text-center">{conta.totalParcelas}</TableCell>
                  <TableCell className="text-center">{conta.parcelasPagas}</TableCell>
                  <TableCell>{conta.proximoVencimento}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(conta.status)}>{conta.status}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {/* Estilização do botão de Ações na tabela copiada de EstoqueSaidas */}
                    <Button size="sm" className="rounded-full bg-orange-500 text-white hover:bg-orange-600 text-xs">
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