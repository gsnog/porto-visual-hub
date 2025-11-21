import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, Download, Eye, FileText } from "lucide-react" // Usando CalendarDays para consistência

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
    // Removendo itens repetidos para manter a concisão
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
    // Estrutura do container principal copiada
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Notas Fiscais Eletrônicas (NF-e)</h1>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {/* Estilização dos botões copiada (laranja, rounded-full) */}
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            <FileText className="h-4 w-4 mr-2" />
            Nova NF-e
          </Button>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap">
          {/* Input de Número NF-e */}
          <Input 
            placeholder="Número NF-e" 
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"
          />

          {/* Input de Data de Emissão com Ícone */}
          <div className="relative">
            <Input 
              placeholder="Data de Emissão" 
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-full pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Botão de Filtrar */}
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* NFe Table */}
        <div className="rounded-lg overflow-x-auto border border-[#E3E3E3] mt-6">
          <Table>
            <TableHeader className="whitespace-nowrap">
              {/* Estilização do cabeçalho da tabela copiada */}
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Data Emissão</TableHead>
                <TableHead className="!text-black font-medium">Número</TableHead>
                <TableHead className="!text-black font-medium">NF</TableHead>
                <TableHead className="!text-black font-medium">Valor Total</TableHead>
                <TableHead className="!text-black font-medium">Chave de Acesso (XML)</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead>
                <TableHead className="!text-black font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {nfes.map((nfe, index) => (
                // Estilização das linhas copiada
                <TableRow 
                  key={index} 
                  className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors"
                >
                  <TableCell className="text-center">{nfe.dataEmissao}</TableCell>
                  <TableCell className="text-center">{nfe.numero}</TableCell>
                  <TableCell className="text-center">{nfe.nf}</TableCell>
                  <TableCell className="font-semibold">{nfe.valorTotal}</TableCell>
                  <TableCell className="text-xs">{nfe.chaveAcesso}</TableCell>
                  <TableCell>
                    <span className={getStatusColor(nfe.status)}>{nfe.status}</span>
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    {/* Botões de Ações na tabela com ícones */}
                    <Button size="sm" className="rounded-full bg-orange-500 text-white hover:bg-orange-600 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full bg-orange-500 text-white hover:bg-orange-600 text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      XML
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

export default NFe