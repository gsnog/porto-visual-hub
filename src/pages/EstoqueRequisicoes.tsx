import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react"

export default function EstoqueRequisicoes() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Requisições</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Adicionar
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div>
            <label className="text-lg font-medium text-foreground mb-3 block">Cidade</label>
            <div className="flex gap-4 items-center">
              <Select>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sao-paulo">São Paulo</SelectItem>
                  <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                </SelectContent>
              </Select>
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
          </div>
        </div>

        {/* Table */}
        <div className="bg-muted/30 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-muted-foreground font-medium">Data</TableHead>
                <TableHead className="text-muted-foreground font-medium">Data de Aprovação</TableHead>
                <TableHead className="text-muted-foreground font-medium">Item</TableHead>
                <TableHead className="text-muted-foreground font-medium">Quantidade</TableHead>
                <TableHead className="text-muted-foreground font-medium">Quantidade Aprovada</TableHead>
                <TableHead className="text-muted-foreground font-medium">Requisitante</TableHead>
                <TableHead className="text-muted-foreground font-medium">Gestor</TableHead>
                <TableHead className="text-muted-foreground font-medium">Unidade</TableHead>
                <TableHead className="text-muted-foreground font-medium">Setor</TableHead>
                <TableHead className="text-muted-foreground font-medium">Projeto</TableHead>
                <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">Entrega</TableHead>
                <TableHead className="text-muted-foreground font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background hover:bg-muted/50">
                <TableCell>12/05/2025</TableCell>
                <TableCell>30/04/2025</TableCell>
                <TableCell>xxxxxxx</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>xxxxxxx</TableCell>
                <TableCell>xxxxxxx</TableCell>
                <TableCell>xxxxxxx</TableCell>
                <TableCell>xxxxxxx</TableCell>
                <TableCell>xxxxxxx</TableCell>
                <TableCell>Efetuado</TableCell>
                <TableCell>Efetuado</TableCell>
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