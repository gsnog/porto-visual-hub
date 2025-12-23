import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function EstoqueEntradas() {
  const navigate = useNavigate()
  const [showRelatorio, setShowRelatorio] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Entradas</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/estoque/entradas/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Novo Item</Button>
          <Button onClick={() => navigate("/estoque/entradas/upload-nfe")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Upload NF-e</Button>
          <Button 
            onClick={() => setShowRelatorio(!showRelatorio)} 
            className={`rounded-lg ${showRelatorio ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'} text-primary-foreground`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>

        {showRelatorio && (
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Filtrar por:</label>
              <Select defaultValue="anual">
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-28 rounded-lg border border-[#22265B]">
                  <SelectValue placeholder="Anual" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anual">Anual</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Ano:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-32 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Fornecedor:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Item:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Nota Fiscal:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Unidade:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <Button className="rounded-lg bg-green-600 hover:bg-green-700 text-white">
              Gerar Relatório
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-4 items-center">
          <Input placeholder="Nome do Item" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" />
          <Input placeholder="NF-e" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" />
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
                <TableHead className="!text-white font-medium text-center">Validade</TableHead>
                <TableHead className="!text-white font-medium text-center">Nota Fiscal</TableHead>
                <TableHead className="!text-white font-medium text-center">Estoque Destinado</TableHead>
                <TableHead className="!text-white font-medium text-center">Custo Unitário</TableHead>
                <TableHead className="!text-white font-medium text-center">Quantidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Custo Total</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                <TableCell className="text-center">02/06/2025</TableCell>
                <TableCell className="text-center">999</TableCell>
                <TableCell className="text-center">05/06/2025</TableCell>
                <TableCell className="text-center">999999</TableCell>
                <TableCell className="text-center">xxxxxxxxx</TableCell>
                <TableCell className="text-center">R$ 9.999,99</TableCell>
                <TableCell className="text-center">1</TableCell>
                <TableCell className="text-center">R$ 9.999,99</TableCell>
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
