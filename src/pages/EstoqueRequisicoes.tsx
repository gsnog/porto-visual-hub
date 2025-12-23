import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function EstoqueRequisicoes() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Requisições</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/estoque/requisicoes/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Adicionar</Button>
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Relatório</Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Select>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-64 rounded-lg">
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="sao-paulo">São Paulo</SelectItem>
              <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
            </SelectContent>
          </Select>
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
                <TableHead className="!text-white font-medium text-center">Data</TableHead>
                <TableHead className="!text-white font-medium text-center">Item</TableHead>
                <TableHead className="!text-white font-medium text-center">Quantidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Requisitante</TableHead>
                <TableHead className="!text-white font-medium text-center">Setor</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                <TableCell className="text-center">12/05/2025</TableCell>
                <TableCell className="text-center">Cabo HDMI</TableCell>
                <TableCell className="text-center">1</TableCell>
                <TableCell className="text-center">Ana F.</TableCell>
                <TableCell className="text-center">TI</TableCell>
                <TableCell className="text-center"><span className="text-green-600 font-medium">Aprovada</span></TableCell>
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