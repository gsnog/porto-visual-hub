import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

export default function EstoqueInventario() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Inventário</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Nome do Item" 
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />

          <Select>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-64 rounded-lg">
              <SelectValue placeholder="Cidade" className="!text-[#22265B]" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="sao-paulo">São Paulo</SelectItem>
              <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
            </SelectContent>
          </Select>

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
                <TableHead className="!text-white font-medium text-center">Item</TableHead>
                <TableHead className="!text-white font-medium text-center">Quantidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Unidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                <TableCell className="text-center">999</TableCell>
                <TableCell className="text-center">1</TableCell>
                <TableCell className="text-center">xxxxxxxxxx</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                <TableCell className="text-center">Cabo HDMI</TableCell>
                <TableCell className="text-center">3</TableCell>
                <TableCell className="text-center">un</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
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