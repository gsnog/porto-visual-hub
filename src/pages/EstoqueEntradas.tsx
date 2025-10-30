import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react"

export default function EstoqueEntradas() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Entradas</h1>
        </div>

        <div className="flex gap-3">
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">Novo Item</Button>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">Upload NF-e</Button>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">Relatório</Button>
        </div>

        <div className="flex gap-4 items-center">
          <Input placeholder="Nome do Item" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full" />
          <Input placeholder="NF-e" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full" />
          <div className="relative">
            <Input placeholder="DD/MM/AAAA" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full" />
            <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">Filtrar</Button>
        </div>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Data</TableHead>
                <TableHead className="!text-black font-medium">Item</TableHead>
                <TableHead className="!text-black font-medium">Validade</TableHead>
                <TableHead className="!text-black font-medium">Nota Fiscal</TableHead>
                <TableHead className="!text-black font-medium">Estoque Destinado</TableHead>
                <TableHead className="!text-black font-medium">Custo Unitário</TableHead>
                <TableHead className="!text-black font-medium">Quantidade</TableHead>
                <TableHead className="!text-black font-medium">Custo Total</TableHead>
                <TableHead className="!text-black font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors">
                <TableCell>02/06/2025</TableCell>
                <TableCell>999</TableCell>
                <TableCell>05/06/2025</TableCell>
                <TableCell>999999</TableCell>
                <TableCell>xxxxxxxxx</TableCell>
                <TableCell>R$ 9.999,99</TableCell>
                <TableCell>1</TableCell>
                <TableCell>R$ 9.999,99</TableCell>
                <TableCell>
                  <Button size="sm" className="rounded-full bg-orange-500 text-white hover:bg-orange-600 text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors">
                <TableCell>10/06/2025</TableCell>
                <TableCell>Cabo HDMI</TableCell>
                <TableCell>—</TableCell>
                <TableCell>123456</TableCell>
                <TableCell>Estoque Principal</TableCell>
                <TableCell>R$ 49,90</TableCell>
                <TableCell>3</TableCell>
                <TableCell>R$ 149,70</TableCell>
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