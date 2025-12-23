import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

export default function NovaEntrada() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/estoque/entradas")
  }

  const handleCancelar = () => {
    navigate("/estoque/entradas")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Entrada</h1>

        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Data</label>
            <Input type="date" className="bg-muted text-foreground h-10 px-3 flex-1 rounded-lg" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Item</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-muted text-foreground h-10 rounded-lg">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item1">Item 1</SelectItem>
                  <SelectItem value="item2">Item 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-destructive mt-1">Obrigatório</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Validade</label>
            <div className="flex-1">
              <Input type="date" className="bg-muted text-foreground h-10 px-3 w-full rounded-lg" />
              <p className="text-xs text-muted-foreground mt-1">Opcional, caso o produto não tenha validade</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Estoque de Origem</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-muted text-foreground h-10 rounded-lg">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="origem1">Estoque 1</SelectItem>
                  <SelectItem value="origem2">Estoque 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Caso seja nova compra deixar vazio</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Estoque de Destino</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-muted text-foreground h-10 rounded-lg">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="destino1">Estoque 1</SelectItem>
                  <SelectItem value="destino2">Estoque 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-destructive mt-1">Obrigatório</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Operação</label>
            <Select>
              <SelectTrigger className="bg-muted text-foreground h-10 rounded-lg flex-1">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compra">Compra</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Custo Unitário</label>
            <div className="flex-1">
              <Input type="text" className="bg-muted text-foreground h-10 px-3 w-full rounded-lg" />
              <p className="text-xs text-destructive mt-1">Obrigatório</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Quantidade</label>
            <div className="flex-1">
              <Input type="number" className="bg-muted text-foreground h-10 px-3 w-full rounded-lg" />
              <p className="text-xs text-destructive mt-1">Obrigatório</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Custo Total</label>
            <Input type="text" className="bg-muted text-foreground h-10 px-3 flex-1 rounded-lg" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-foreground">Nota Fiscal</label>
            <div className="flex-1">
              <Input type="text" className="bg-muted text-foreground h-10 px-3 w-full rounded-lg" />
              <p className="text-xs text-destructive mt-1">Obrigatório</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <label className="w-40 text-sm font-medium text-foreground pt-2">Observação</label>
            <div className="flex-1">
              <Textarea className="bg-muted text-foreground min-h-[120px] rounded-lg" />
              <p className="text-xs text-muted-foreground mt-1">Opcional</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSalvar} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
              Salvar
            </Button>
            <Button onClick={handleCancelar} variant="secondary" className="rounded-lg">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
