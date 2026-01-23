import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { MapPin } from "lucide-react"

export default function NovaLocacao() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/estoque/locacoes")
  }

  const handleCancelar = () => {
    navigate("/estoque/locacoes")
  }

  return (
    <SimpleFormWizard title="Nova Locação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Locação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div className="form-row">
                <label className="form-label">Supplier</label>
                <Select>
                  <SelectTrigger className="form-input w-28">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="supplier1">Supplier 1</SelectItem>
                    <SelectItem value="supplier2">Supplier 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-row">
                <label className="form-label">Unidade</label>
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="form-input w-28">
                      <SelectValue placeholder="---------" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="unidade1">Unidade 1</SelectItem>
                      <SelectItem value="unidade2">Unidade 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="form-hint">Obrigatório</span>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Data de Início</label>
                <div className="flex-1">
                  <Input type="date" className="form-input w-40" />
                  <span className="form-hint">Obrigatório</span>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Previsão de Entrega</label>
                <div className="flex-1">
                  <Input type="date" className="form-input w-40" />
                  <span className="form-hint">Obrigatório</span>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Contrato</label>
                <div className="flex-1">
                  <Input type="file" className="form-input w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                  <span className="form-hint">Opcional</span>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Valor</label>
                <Input type="text" className="form-input w-40" />
              </div>

              <div className="form-row">
                <label className="form-label">Adicional</label>
                <Input type="number" defaultValue="0" className="form-input w-40" />
              </div>

              <div className="form-row">
                <label className="form-label">Desconto</label>
                <Input type="number" defaultValue="0" className="form-input w-40" />
              </div>

              <div className="form-row">
                <label className="form-label">Valor Total</label>
                <Input type="text" className="form-input w-40" />
              </div>

              <div className="flex items-start gap-4">
                <label className="form-label pt-2">Descrição</label>
                <div className="flex-1">
                  <Textarea className="form-input w-80 min-h-[150px]" />
                  <span className="form-hint">Opcional</span>
                </div>
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
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center" colSpan={3}>Nenhum item adicionado</TableCell>
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