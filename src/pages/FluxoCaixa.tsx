import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Componentes de Card de Sumário Simples (para consistência visual)
const SummaryCard = ({ title, value, colorClass }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="border-t border-white/30 mb-3"></div>
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
      return 'bg-green-50 hover:bg-green-100 transition-colors';
    } else if (tipo === 'Saída') {
      return 'bg-red-50 hover:bg-red-100 transition-colors';
    }
    return 'bg-white hover:bg-[#22265B] hover:text-white transition-colors';
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 space-y-6 overflow-y-auto">
        
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Fluxo de Caixa</h1>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="Total de Entradas" 
            value="R$ 94.439,88" 
            colorClass="bg-green-500"
          />
          
          <SummaryCard 
            title="Total de Saídas" 
            value="R$ 12.500,00" 
            colorClass="bg-red-500"
          />
          
          <SummaryCard 
            title="Saldo Atual" 
            value="R$ 81.939,88" 
            colorClass="bg-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 flex-wrap">
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
          <div className="w-40 sm:w-48">
            <Select>
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
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-40 sm:w-52 rounded-lg"
          />

          {/* Input de Data Inicial */}
          <Input 
            type="date"
            placeholder="Data Inicial"
            className="bg-[#efefef] text-black h-10 px-3 w-40 sm:w-44 rounded-lg [&::-webkit-calendar-picker-indicator]:opacity-100"
            style={{
              colorScheme: 'light'
            }}
            onFocus={(e) => e.target.showPicker?.()}
          />

          {/* Input de Data Final */}
          <Input 
            type="date"
            className="bg-[#efefef] text-black h-10 px-3 w-40 sm:w-44 rounded-lg [&::-webkit-calendar-picker-indicator]:opacity-100"
            style={{
              colorScheme: 'light'
            }}
            onFocus={(e) => e.target.showPicker?.()}
          />
          
          {/* Botão de Filtrar */}
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Tabela de Transações */}
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Transações Recentes</h2>
        
        <div className="rounded-lg border border-[#E3E3E3] overflow-hidden">
          <table className="table-fixed w-full">
            <thead>
              <tr className="bg-[#E3E3E3] h-14">
                <th className="!text-black font-medium text-[14px] sm:text-base w-[10%] p-2 sm:p-3 text-left">Data Venc.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[10%] p-2 sm:p-3 text-left">Data Pag.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[8%] p-2 sm:p-3 text-left">Tipo</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[15%] p-2 sm:p-3 text-left">Beneficiário</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[12%] p-2 sm:p-3 text-left hidden md:table-cell">CNPJ</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[10%] p-2 sm:p-3 text-left">Status</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[12%] p-2 sm:p-3 text-left">Valor Total</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[12%] p-2 sm:p-3 text-left hidden lg:table-cell">Saldo</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[11%] p-2 sm:p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao, index) => (
                <tr 
                  key={index} 
                  className={getRowClass(transacao.tipo) + ' text-black h-16 border-b border-gray-200'}
                >
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 truncate">{transacao.dataVencimento}</td>
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 truncate">{transacao.dataPagamento}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3">
                    <span className={transacao.tipo === 'Entrada' ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                      {transacao.tipo}
                    </span>
                  </td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate" title={transacao.beneficiario}>{transacao.beneficiario}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate hidden md:table-cell">{transacao.cnpj}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3">
                    <span className={getStatusColor(transacao.status)}>{transacao.status}</span>
                  </td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate">
                    <span className={transacao.tipo === 'Entrada' ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                      {transacao.valorTotal}
                    </span>
                  </td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 font-semibold truncate hidden lg:table-cell">{transacao.saldo}</td>
                  <td className="text-center p-2 sm:p-3">
                    <Button size="lg" className="rounded bg-orange-500 text-white hover:bg-orange-600 text-[14px] h-8 px-3">
                      Detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FluxoCaixa