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
    <div className="space-y-6">
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">Setor</label>
          <Select>
            <SelectTrigger className="form-input w-40">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="setor1">Setor 1</SelectItem>
              <SelectItem value="setor2">Setor 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Projeto</label>
          <Select>
            <SelectTrigger className="form-input w-40">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="projeto1">Projeto 1</SelectItem>
              <SelectItem value="projeto2">Projeto 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start gap-4">
          <label className="form-label pt-2">Observações</label>
          <Textarea className="form-input w-80 min-h-[180px]" />
        </div>

        <div className="form-row">
          <label className="form-label">Item</label>
          <Select>
            <SelectTrigger className="form-input flex-1">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="item1">Item 1</SelectItem>
              <SelectItem value="item2">Item 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Quantidade</label>
          <Input type="number" className="form-input flex-1" />
        </div>

        <div className="form-row">
          <label className="w-40"></label>
          <Button variant="outline" className="btn-outline">Adicionar Item</Button>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">Itens</h2>

        <div className="table-professional">
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead className="table-head">Item</TableHead>
                <TableHead className="table-head">Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="table-row">
                <TableCell className="table-cell" colSpan={2}>Nenhum item adicionado</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
          <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
        </div>
      </div>
    </div>
  )
}
