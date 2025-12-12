import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Componentes de Card de Sumário Simples (para manter a funcionalidade original de Cards de Resumo)
const SummaryCard = ({ title, value, colorClass }) => (
  <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="border-t border-white/30 mb-3"></div>
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
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 space-y-6 overflow-y-auto">
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Contas a Receber</h1>
        </div>

        {/* Cards de Sumário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="Total Recebido" 
            value="R$ 87.939,88" 
            colorClass="bg-green-500"
          />
          
          <SummaryCard 
            title="Total a Receber" 
            value="R$ 12.345,00" 
            colorClass="bg-red-500"
          />
          
          <SummaryCard 
            title="Valor Total em Títulos" 
            value="R$ 100.284,88" 
            colorClass="bg-blue-500"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-2 flex-wrap">
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Adicionar Conta
          </Button>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center flex-wrap">
          <Input 
            placeholder="Cliente" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-40 sm:w-52 rounded-lg"
          />
          <Input 
            placeholder="Documento" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-40 sm:w-52 rounded-lg"
          />
          
          <Input 
            placeholder="Valor Mínimo" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-36 sm:w-44 rounded-lg"
          />

          <Input 
            type="date"
            placeholder="Próx. Vencimento" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-40 sm:w-44 rounded-lg"
          />
          
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Tabela de Contas - Adaptável sem rolagem horizontal */}
        <div className="rounded-lg border border-[#E3E3E3] mt-6 overflow-hidden">
          <table className="table-fixed w-full">
            <thead>
              <tr className="bg-[#E3E3E3] h-14">
                <th className="!text-black font-medium text-[14px] sm:text-base w-[6%] p-2 sm:p-3 text-left">Lanç.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[6%] p-2 sm:p-3 text-left">Fatur.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[10%] p-2 sm:p-3 text-left">Cliente</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[8%] p-2 sm:p-3 text-left">Doc.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[8%] p-2 sm:p-3 text-left">Título</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[6%] p-2 sm:p-3 text-left hidden md:table-cell">Multa</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[7%] p-2 sm:p-3 text-left hidden md:table-cell">Encarg.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[7%] p-2 sm:p-3 text-left hidden lg:table-cell">Desc.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[8%] p-2 sm:p-3 text-left">Recebido</th>
                <th className="!text-black font-medium text-[14px] sm:text-base text-center w-[6%] p-2 sm:p-3 hidden lg:table-cell">Parc.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base text-center w-[5%] p-2 sm:p-3 hidden lg:table-cell">Pag.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[7%] p-2 sm:p-3 text-left hidden sm:table-cell">Venc.</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[8%] p-2 sm:p-3 text-left">Status</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[8%] p-2 sm:p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta, index) => (
                <tr 
                  key={index} 
                  className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors h-16 border-b border-gray-200"
                >
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 truncate">{conta.dataLancamento}</td>
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 truncate">{conta.dataFaturamento}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate" title={conta.cliente}>{conta.cliente}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate">{conta.documento}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate">{conta.valorTitulo}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate hidden md:table-cell">{conta.multa}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate hidden md:table-cell">{conta.encargos}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate hidden lg:table-cell">{conta.desconto}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate">{conta.valorTotalRecebido}</td>
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 hidden lg:table-cell">{conta.totalParcelas}</td>
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 hidden lg:table-cell">{conta.parcelasPagas}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 truncate hidden sm:table-cell">{conta.proximoVencimento}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3">
                    <span className={getStatusColor(conta.status)}>{conta.status}</span>
                  </td>
                  <td className="text-center p-2 sm:p-3">
                    <Button size="lg" className="rounded bg-orange-500 text-white hover:bg-orange-600 text-[14px] h-8 px-3">
                      Ações
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

export default ContasReceber