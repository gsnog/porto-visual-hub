import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, DollarSign } from "lucide-react" // Adicionando ícones para filtros

// Componentes de Card de Sumário Simples (para consistência visual)
const SummaryCard = ({ title, value, colorClass }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ContasPagar = () => {
  const contas = [
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025", 
      proximoVencimento: "-",
      beneficiario: "Pedro Piaes",
      documento: "NI",
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 1.500,00",
      valorPago: "R$ 0,00",
      totalParcelas: "0",
      parcelas: "0",
      valorParcela: "R$ 1.500,00",
      status: "Em Aberto" // Adicionado status para simulação
    },
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025",
      proximoVencimento: "20/12/2025", 
      beneficiario: "Transportadora X",
      documento: "NF 987",
      valorTitulo: "R$ 250,00",
      multa: "R$ 0,00",
      frete: "R$ 50,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 300,00",
      valorPago: "R$ 0,00",
      totalParcelas: "2",
      parcelas: "1", 
      valorParcela: "R$ 150,00",
      status: "Pago Parcial"
    },
    {
      dataLancamento: "01/05/2025",
      dataFaturamento: "01/05/2025",
      proximoVencimento: "20/11/2025",
      beneficiario: "Fornecedor Y", 
      documento: "BOL 101",
      valorTitulo: "R$ 5.000,00",
      multa: "R$ 50,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 5.050,00",
      valorPago: "R$ 5.050,00",
      totalParcelas: "1",
      parcelas: "1",
      valorParcela: "R$ 5.050,00",
      status: "Efetuado"
    },
    // Removendo itens repetidos e deixando 3 exemplos variados para fins de demonstração
  ].filter((_, i) => i < 3)
  
  // Função auxiliar para definir a cor do status (adaptada de ContasReceber)
  const getStatusColor = (status) => {
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
    // Estrutura do container principal copiada
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Contas a Pagar</h1>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="Total Pago" 
            value="R$ 87.939,88" 
            colorClass="bg-green-500" // Cor para 'Pago'
          />
          
          <SummaryCard 
            title="Total a Pagar" 
            value="R$ 1.800,00" // Valor ajustado para exemplo
            colorClass="bg-red-500" // Cor para 'A Pagar'
          />
          
          <SummaryCard 
            title="Valor Total em Títulos" 
            value="R$ 89.739,88" // Valor ajustado para exemplo
            colorClass="bg-blue-500" // Cor Primária
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {/* Estilização dos botões copiada (laranja, rounded-full) */}
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Adicionar
          </Button>
          {/* Estilização aplicada aos outros botões para consistência */}
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Pendentes (1)
          </Button>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap">
          {/* Estilização dos inputs copiada (text-black e placeholder) */}
          <Input 
            placeholder="Beneficiário" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"
          />
          <Input 
            placeholder="Documento" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"
          />
          
          {/* Input de Valor com Ícone (como em ContasReceber) */}
          <div className="relative">
            <Input 
              placeholder="Valor Mínimo" 
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-full pr-10"
            />
            <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Input de Data de Vencimento com Ícone (como em ContasReceber) */}
          <div className="relative">
            <Input 
              placeholder="Próx. Vencimento" 
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-full pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Botão de Filtrar */}
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Accounts Table */}
        <div className="rounded-lg overflow-x-auto border border-[#E3E3E3] mt-6">
          <Table>
            <TableHeader className="whitespace-nowrap">
              {/* Estilização do cabeçalho da tabela copiada */}
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Lançamento</TableHead>
                <TableHead className="!text-black font-medium">Faturamento</TableHead>
                <TableHead className="!text-black font-medium">Próx. Venc.</TableHead>
                <TableHead className="!text-black font-medium">Beneficiário</TableHead>
                <TableHead className="!text-black font-medium">Documento</TableHead>
                <TableHead className="!text-black font-medium">Valor Título</TableHead>
                <TableHead className="!text-black font-medium">Multa</TableHead>
                <TableHead className="!text-black font-medium">Frete</TableHead>
                <TableHead className="!text-black font-medium">Desconto</TableHead>
                <TableHead className="!text-black font-medium">Valor Total</TableHead>
                <TableHead className="!text-black font-medium">Valor Pago</TableHead>
                <TableHead className="!text-black font-medium text-center">Total Parcelas</TableHead>
                <TableHead className="!text-black font-medium text-center">Parcelas</TableHead>
                <TableHead className="!text-black font-medium">Valor Parcela</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead> 
                <TableHead className="!text-black font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {contas.map((conta, index) => (
                // Estilização das linhas copiada
                <TableRow 
                  key={index} 
                  className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors"
                >
                  <TableCell className="text-center">{conta.dataLancamento}</TableCell>
                  <TableCell className="text-center">{conta.dataFaturamento}</TableCell>
                  <TableCell className="text-center">{conta.proximoVencimento}</TableCell>
                  <TableCell>{conta.beneficiario}</TableCell>
                  <TableCell>{conta.documento}</TableCell>
                  <TableCell>{conta.valorTitulo}</TableCell>
                  <TableCell>{conta.multa}</TableCell>
                  <TableCell>{conta.frete}</TableCell>
                  <TableCell>{conta.desconto}</TableCell>
                  <TableCell>{conta.valorTotal}</TableCell>
                  <TableCell>{conta.valorPago}</TableCell>
                  <TableCell className="text-center">{conta.totalParcelas}</TableCell>
                  <TableCell className="text-center">{conta.parcelas}</TableCell>
                  <TableCell>{conta.valorParcela}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(conta.status)}>{conta.status}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {/* Estilização do botão de Ações na tabela copiada */}
                    <Button size="sm" className="rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-xs">
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

export default ContasPagar