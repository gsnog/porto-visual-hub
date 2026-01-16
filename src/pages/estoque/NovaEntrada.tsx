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
    <div className="space-y-6">
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">Data</label>
          <Input type="date" className="form-input w-40" />
        </div>

        <div className="form-row">
          <label className="form-label">Item</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-52">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="item1">Item 1</SelectItem>
                <SelectItem value="item2">Item 2</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Validade</label>
          <div className="flex-1">
            <Input type="date" className="form-input w-40" />
            <span className="form-hint">Opcional, caso o produto não tenha validade</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Estoque de Origem</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-52">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="origem1">Estoque 1</SelectItem>
                <SelectItem value="origem2">Estoque 2</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Caso seja nova compra deixar vazio</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Estoque de Destino</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-52">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="destino1">Estoque 1</SelectItem>
                <SelectItem value="destino2">Estoque 2</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Operação</label>
          <Select>
            <SelectTrigger className="form-input w-28">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="compra">Compra</SelectItem>
              <SelectItem value="transferencia">Transferência</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Custo Unitário</label>
          <div className="flex-1">
            <Input type="text" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Quantidade</label>
          <div className="flex-1">
            <Input type="number" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Custo Total</label>
          <Input type="text" className="form-input w-40" />
        </div>

        <div className="form-row">
          <label className="form-label">Nota Fiscal</label>
          <div className="flex-1">
            <Input type="text" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <label className="form-label pt-2">Observação</label>
          <div className="flex-1">
            <Textarea className="form-input w-80 min-h-[150px]" />
            <span className="form-hint">Opcional</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
          <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
        </div>
      </div>
    </div>
  )
}
