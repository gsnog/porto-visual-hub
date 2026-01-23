import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { ClipboardList } from "lucide-react"

export default function NovaRequisicao() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/estoque/requisicoes")
  }

  const handleCancelar = () => {
    navigate("/estoque/requisicoes")
  }

  return (
    <SimpleFormWizard title="Nova Requisição">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Requisição</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

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

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Item</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center" colSpan={2}>Nenhum item adicionado</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
                <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  )
}