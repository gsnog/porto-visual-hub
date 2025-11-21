import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react"

export default function EstoqueLocacoes() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Locações</h1>
        </div>

        {/* Botão de Ação */}
        <div className="flex gap-3 pt-2">
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Nova Locação
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center flex-wrap">
          {/* Input Locador */}
          <Input 
            placeholder="Locador" 
            className="rounded-full w-64 bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3"
          />
          
          {/* Input de Data de Início - AGORA FUNCIONAL */}
          <div className="relative">
            {/* Usando type="date" para ativar o seletor de calendário nativo do navegador */}
            <Input 
              type="date" 
              // O placeholder é mantido para contexto, mas o campo de data nativo pode sobrescrevê-lo
              placeholder="Data de Início" 
              className="rounded-full w-48 bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-10"
            />
            {/* Ícone CalendarDays removido para evitar conflito visual com o input nativo */}
          </div>
          
          {/* Input de Previsão de Finalização - AGORA FUNCIONAL */}
          <div className="relative">
             {/* Usando type="date" para ativar o seletor de calendário nativo do navegador */}
            <Input 
              type="date"
              placeholder="Data Final (Prev.)" 
              className="rounded-full w-48 bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-10"
            />
            {/* Ícone CalendarDays removido */}
          </div>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Tabela de Locações */}
        <div className="rounded-lg overflow-x-auto border border-[#E3E3E3]">
          <Table>
            <TableHeader className="whitespace-nowrap">
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Unidade</TableHead>
                <TableHead className="!text-black font-medium">Início</TableHead>
                <TableHead className="!text-black font-medium">Fim (Previsto)</TableHead>
                <TableHead className="!text-black font-medium">Fim (Real)</TableHead>
                <TableHead className="!text-black font-medium">Locador</TableHead>
                <TableHead className="!text-black font-medium">Contrato</TableHead>
                <TableHead className="!text-black font-medium">Itens</TableHead>
                <TableHead className="!text-black font-medium">Quantidades</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead>
                <TableHead className="!text-black font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              <TableRow className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors">
                <TableCell>Unidade A</TableCell>
                <TableCell>02/06/2025</TableCell>
                <TableCell>02/07/2025</TableCell>
                <TableCell>-</TableCell>
                <TableCell>João Silva</TableCell>
                <TableCell>CONTR-001</TableCell>
                <TableCell>Cadeira, Mesa</TableCell>
                <TableCell>10, 5</TableCell>
                <TableCell>Em Andamento</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-full bg-orange-500 text-white hover:bg-orange-600 text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors">
                <TableCell>Unidade B</TableCell>
                <TableCell>01/05/2025</TableCell>
                <TableCell>01/06/2025</TableCell>
                <TableCell>30/05/2025</TableCell>
                <TableCell>Maria Souza</TableCell>
                <TableCell>CONTR-002</TableCell>
                <TableCell>Equip. Audiovisual</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-green-600 font-medium">Finalizada</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-full bg-orange-500 text-white hover:bg-orange-600 text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}