import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react"

export default function EstoqueLocacoes() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Locações</h1>
        </div>

        {/* Action Button */}
        <div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Nova Locação
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <Input 
            placeholder="Locador" 
            className="w-64"
          />
          <div className="relative">
            <Input 
              placeholder="DD/MM/AAAA" 
              className="w-48 pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="relative">
            <Input 
              placeholder="DD/MM/AAAA" 
              className="w-48 pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Table */}
        <div className="bg-muted/30 rounded-lg overflow-hidden">
          <Table className="table-custom">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-muted-foreground font-medium">Unidade</TableHead>
                <TableHead className="text-muted-foreground font-medium">Data de Início</TableHead>
                <TableHead className="text-muted-foreground font-medium">Previsão de Finalização</TableHead>
                <TableHead className="text-muted-foreground font-medium">Data de Fim</TableHead>
                <TableHead className="text-muted-foreground font-medium">Locador</TableHead>
                <TableHead className="text-muted-foreground font-medium">Contrato</TableHead>
                <TableHead className="text-muted-foreground font-medium">Itens</TableHead>
                <TableHead className="text-muted-foreground font-medium">Quantidades</TableHead>
                <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background hover:bg-muted/50">
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
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
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