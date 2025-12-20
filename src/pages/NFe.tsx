import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileText, Search } from "lucide-react"

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

  const getStatusColor = (status: string) => {
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
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Notas Fiscais Eletrônicas (NF-e)</h1>
        
        <div className="flex flex-wrap gap-4 items-center">
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <FileText className="h-4 w-4 mr-2" />
            Nova NF-e
          </Button>
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Relatório
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Número NF-e" 
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
                <TableHead className="!text-white font-medium text-center">Data Emissão</TableHead>
                <TableHead className="!text-white font-medium text-center">Número</TableHead>
                <TableHead className="!text-white font-medium text-center">NF</TableHead>
                <TableHead className="!text-white font-medium text-center">Valor Total</TableHead>
                <TableHead className="!text-white font-medium text-center">Chave de Acesso</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nfes.map((nfe, index) => (
                <TableRow key={index} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                  <TableCell className="text-center">{nfe.dataEmissao}</TableCell>
                  <TableCell className="text-center">{nfe.numero}</TableCell>
                  <TableCell className="text-center">{nfe.nf}</TableCell>
                  <TableCell className="text-center font-semibold">{nfe.valorTotal}</TableCell>
                  <TableCell className="text-center text-xs">{nfe.chaveAcesso}</TableCell>
                  <TableCell className="text-center">
                    <span className={getStatusColor(nfe.status)}>{nfe.status}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center">
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        XML
                      </Button>
                    </div>
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