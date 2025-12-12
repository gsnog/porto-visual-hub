import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Eye, FileText } from "lucide-react"

const NFe = () => {
  const nfes = [
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99",
      numero: "99999",
      chaveAcesso: "9999.9999.9999.9999.9999.9999.9999.9999.9999.9999",
      nf: "NFe 12345",
      status: "Autorizada"
    },
    {
      dataEmissao: "10/06/2025", 
      valorTotal: "R$ 1.500,50",
      numero: "10001",
      chaveAcesso: "8888.8888.8888.8888.8888.8888.8888.8888.8888.8888",
      nf: "NFe 67890",
      status: "Cancelada"
    },
    {
      dataEmissao: "15/06/2025",
      valorTotal: "R$ 5.000,00", 
      numero: "10002",
      chaveAcesso: "7777.7777.7777.7777.7777.7777.7777.7777.7777.7777",
      nf: "NFe 54321",
      status: "Em Processamento"
    },
  ]

  // Função auxiliar para definir a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Autorizada':
        return 'text-green-600 font-medium';
      case 'Cancelada':
        return 'text-red-600 font-medium';
      case 'Em Processamento':
        return 'text-yellow-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="p-6 space-y-6 overflow-y-auto">
        
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Notas Fiscais Eletrônicas (NF-e)</h1>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 flex-wrap">
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            <FileText className="h-4 w-4 mr-2" />
            Nova NF-e
          </Button>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap">
          {/* Input de Número NF-e */}
          <Input 
            placeholder="Número NF-e" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-40 sm:w-52 rounded-lg"
          />

          {/* Input de Data de Emissão */}
          <Input 
            type="date"
            placeholder="Data de Emissão" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-40 sm:w-44 rounded-lg"
          />
          
          {/* Botão de Filtrar */}
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* NFe Table */}
        <div className="rounded-lg border border-[#E3E3E3] mt-6 overflow-hidden">
          <table className="table-fixed w-full">
            <thead>
              <tr className="bg-[#E3E3E3] h-14">
                <th className="!text-black font-medium text-[14px] sm:text-base w-[12%] p-2 sm:p-3 text-left">Data Emissão</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[10%] p-2 sm:p-3 text-left">Número</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[12%] p-2 sm:p-3 text-left">NF</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[12%] p-2 sm:p-3 text-left">Valor Total</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[25%] p-2 sm:p-3 text-left hidden lg:table-cell">Chave de Acesso</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[12%] p-2 sm:p-3 text-left">Status</th>
                <th className="!text-black font-medium text-[14px] sm:text-base w-[17%] p-2 sm:p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {nfes.map((nfe, index) => (
                <tr 
                  key={index} 
                  className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors h-16 border-b border-gray-200"
                >
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 truncate">{nfe.dataEmissao}</td>
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 truncate">{nfe.numero}</td>
                  <td className="text-center text-[14px] sm:text-base p-2 sm:p-3 truncate">{nfe.nf}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3 font-semibold truncate">{nfe.valorTotal}</td>
                  <td className="text-[12px] sm:text-[13px] p-2 sm:p-3 truncate hidden lg:table-cell" title={nfe.chaveAcesso}>{nfe.chaveAcesso}</td>
                  <td className="text-[14px] sm:text-base p-2 sm:p-3">
                    <span className={getStatusColor(nfe.status)}>{nfe.status}</span>
                  </td>
                  <td className="text-center p-2 sm:p-3">
                    <div className="flex gap-1 justify-center flex-wrap">
                      <Button size="sm" className="rounded bg-orange-500 text-white hover:bg-orange-600 text-[11px] sm:text-xs h-7 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" className="rounded bg-orange-500 text-white hover:bg-orange-600 text-[11px] sm:text-xs h-7 px-2">
                        <Download className="h-3 w-3 mr-1" />
                        XML
                      </Button>
                    </div>
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

export default NFe