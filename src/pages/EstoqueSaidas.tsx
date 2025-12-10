import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react"

export default function EstoqueSaidas() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Saídas</h1>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-2">
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Adicionar
          </Button>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center flex-wrap">
          <Input 
            placeholder="Nome do Item" 
            // CORRIGIDO: Adicionado text-black para o texto digitado
            className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg"
          />
          <div className="relative">
            <Input 
              type="date" // CORRIGIDO: Ativa o seletor de calendário nativo
              placeholder="DD/MM/AAAA" 
              // CORRIGIDO: Adicionado text-black e removido pr-10, pois o ícone CalendarDays foi removido
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-10 w-48 rounded-lg"
            />
            {/* Ícone CalendarDays removido para evitar conflito com o campo type="date" */}
          </div>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Tabela de Saídas */}
        <div className="rounded-lg overflow-x-auto border border-[#E3E3E3]">
          <Table>
            <TableHeader className="whitespace-nowrap">
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Data</TableHead>
                <TableHead className="!text-black font-medium">Item</TableHead>
                <TableHead className="!text-black font-medium">Setor</TableHead>
                <TableHead className="!text-black font-medium">Requisitante</TableHead>
                <TableHead className="!text-black font-medium">Quantidade</TableHead>
                <TableHead className="!text-black font-medium">Origem</TableHead>
                <TableHead className="!text-black font-medium">Destino</TableHead>
                <TableHead className="!text-black font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              <TableRow className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors">
                <TableCell>02/06/2025</TableCell>
                <TableCell>999</TableCell>
                <TableCell>Produção</TableCell>
                <TableCell>Lucas V.</TableCell>
                <TableCell>1</TableCell>
                <TableCell>Almoxarifado SP</TableCell>
                <TableCell>Setor Montagem</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-xs">
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