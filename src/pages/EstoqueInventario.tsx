import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EstoqueInventario() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Inventário</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <Input 
            placeholder="Nome do Item" 
            className="w-64"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Cidade</label>
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
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        {/* Table */}
        <div className="bg-muted/30 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-muted-foreground font-medium">Item</TableHead>
                <TableHead className="text-muted-foreground font-medium">Quantidade</TableHead>
                <TableHead className="text-muted-foreground font-medium">Unidade</TableHead>
                <TableHead className="text-muted-foreground font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background hover:bg-muted/50">
                <TableCell>999</TableCell>
                <TableCell>1</TableCell>
                <TableCell>xxxxxxxxxx</TableCell>
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