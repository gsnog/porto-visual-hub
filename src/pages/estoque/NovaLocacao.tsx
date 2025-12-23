import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

export default function NovaLocacao() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/estoque/locacoes")
  }

  const handleCancelar = () => {
    navigate("/estoque/locacoes")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Locação</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Supplier</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier1">Supplier 1</SelectItem>
                <SelectItem value="supplier2">Supplier 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Unidade</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidade1">Unidade 1</SelectItem>
                  <SelectItem value="unidade2">Unidade 2</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Data de Início</label>
            <div className="flex-1">
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Previsão de Entrega</label>
            <div className="flex-1">
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Contrato</label>
            <div className="flex-1">
              <Input type="file" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              <span className="text-muted-foreground text-sm mt-1 block">Opcional</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Valor</label>
            <Input type="text" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Adicional</label>
            <Input type="number" defaultValue="0" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Desconto</label>
            <Input type="number" defaultValue="0" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Valor Total</label>
            <Input type="text" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-start gap-8">
            <label className="text-foreground font-medium w-40 pt-2">Descrição</label>
            <div className="flex-1">
              <Textarea className="bg-[#efefef] !text-[#22265B] px-3 rounded-lg border border-[#22265B] w-80 min-h-[150px]" />
              <span className="text-muted-foreground text-sm mt-1 block">Opcional</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Item</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg flex-1 border border-[#22265B]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
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
                  <TableHead className="!text-white font-medium text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-white text-black">
                  <TableCell className="text-center text-muted-foreground" colSpan={3}>Nenhum item adicionado</TableCell>
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
