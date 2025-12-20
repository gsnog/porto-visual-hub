import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

export default function EstoqueLocacoes() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Locações</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Nova Locação</Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input placeholder="Locador" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" />
          <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" />
          <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Unidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Início</TableHead>
                <TableHead className="!text-white font-medium text-center">Fim (Previsto)</TableHead>
                <TableHead className="!text-white font-medium text-center">Locador</TableHead>
                <TableHead className="!text-white font-medium text-center">Contrato</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                <TableCell className="text-center">Unidade A</TableCell>
                <TableCell className="text-center">02/06/2025</TableCell>
                <TableCell className="text-center">02/07/2025</TableCell>
                <TableCell className="text-center">João Silva</TableCell>
                <TableCell className="text-center">CONTR-001</TableCell>
                <TableCell className="text-center">Em Andamento</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">Ações</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}