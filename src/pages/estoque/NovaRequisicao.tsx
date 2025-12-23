import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

export default function NovaRequisicao() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/estoque/requisicoes")
  }

  const handleCancelar = () => {
    navigate("/estoque/requisicoes")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Requisição</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Setor</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="setor1">Setor 1</SelectItem>
                <SelectItem value="setor2">Setor 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Projeto</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="projeto1">Projeto 1</SelectItem>
                <SelectItem value="projeto2">Projeto 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-8">
            <label className="text-foreground font-medium w-40 pt-2">Observações</label>
            <Textarea className="bg-[#efefef] !text-[#22265B] px-3 rounded-lg border border-[#22265B] w-80 min-h-[180px]" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Item</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg flex-1 border border-[#22265B]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="item1">Item 1</SelectItem>
                <SelectItem value="item2">Item 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Quantidade</label>
            <Input type="number" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] flex-1" />
          </div>

          <div className="flex items-center gap-8">
            <label className="w-40"></label>
            <Button variant="outline" className="rounded-lg border-[#22265B] text-foreground">
              Adicionar Item
            </Button>
          </div>

          <h2 className="text-xl font-semibold text-foreground pt-4">Itens</h2>

          <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                  <TableHead className="!text-white font-medium text-center">Item</TableHead>
                  <TableHead className="!text-white font-medium text-center">Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white text-black">
                  <TableCell className="text-center text-muted-foreground" colSpan={2}>Nenhum item adicionado</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSalvar}
              className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              Salvar
            </Button>
            <Button 
              onClick={handleCancelar}
              variant="destructive"
              className="rounded-lg px-6"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
