import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays } from "lucide-react"

export default function EstoqueRequisicoes() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Requisições</h1>
        </div>

        <div className="flex gap-3">
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Adicionar
          </Button>
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex gap-4 items-center">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full">
                  <SelectValue placeholder="Cidade" className="!text-black" />
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
                  className="rounded-full w-48 pr-10 bg-[#efefef] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"
                />
                <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
                Filtrar
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                <TableHead className="!text-black font-medium">Data</TableHead>
                <TableHead className="!text-black font-medium">Data de Aprovação</TableHead>
                <TableHead className="!text-black font-medium">Item</TableHead>
                <TableHead className="!text-black font-medium">Quantidade</TableHead>
                <TableHead className="!text-black font-medium">Quantidade Aprovada</TableHead>
                <TableHead className="!text-black font-medium">Requisitante</TableHead>
                <TableHead className="!text-black font-medium">Gestor</TableHead>
                <TableHead className="!text-black font-medium">Unidade</TableHead>
                <TableHead className="!text-black font-medium">Setor</TableHead>
                <TableHead className="!text-black font-medium">Projeto</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead>
                <TableHead className="!text-black font-medium">Entrega</TableHead>
                <TableHead className="!text-black font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors">
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