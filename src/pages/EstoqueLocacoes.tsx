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

        <div>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Nova Locação
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <Input 
            placeholder="Locador" 
            className="rounded-full w-64 bg-[#efefef] placeholder:!text-[#22265B]"
          />
          <div className="relative">
            <Input 
              placeholder="DD/MM/AAAA" 
              className="rounded-full w-48 pr-10 bg-[#efefef] placeholder:!text-[#22265B]"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="relative">
            <Input 
              placeholder="DD/MM/AAAA" 
              className="rounded-full w-48 pr-10 bg-[#efefef] placeholder:!text-[#22265B]"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Unidade</TableHead>
                <TableHead className="!text-black font-medium">Data de Início</TableHead>
                <TableHead className="!text-black font-medium">Previsão de Finalização</TableHead>
                <TableHead className="!text-black font-medium">Data de Fim</TableHead>
                <TableHead className="!text-black font-medium">Locador</TableHead>
                <TableHead className="!text-black font-medium">Contrato</TableHead>
                <TableHead className="!text-black font-medium">Itens</TableHead>
                <TableHead className="!text-black font-medium">Quantidades</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead>
                <TableHead className="!text-black font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors">
                <TableCell>xxxxxxxx</TableCell>
                <TableCell>02/06/2025</TableCell>
                <TableCell>02/06/2025</TableCell>
                <TableCell>02/06/2025</TableCell>
                <TableCell>xxxxxxxx</TableCell>
                <TableCell>xxxxxxxx</TableCell>
                <TableCell>xxxxxxxxx</TableCell>
                <TableCell>xxxxxxxxx</TableCell>
                <TableCell>xxxxxxxxx</TableCell>
                <TableCell>
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