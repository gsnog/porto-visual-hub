import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import SimpleFormWizard from "@/components/SimpleFormWizard"

export default function NovaSaida() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/estoque/saidas")
  }

  const handleCancelar = () => {
    navigate("/estoque/saidas")
  }

  return (
    <SimpleFormWizard currentStep="Dados" steps={["Dados"]}>
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">Data</label>
          <Input type="date" className="form-input w-40" />
        </div>

        <div className="form-row">
          <label className="form-label">Estoque de Origem</label>
          <div className="flex-1">
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="form-input w-40">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="origem1">Estoque 1</SelectItem>
                  <SelectItem value="origem2">Estoque 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-action px-6">Adicionar</Button>
            </div>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Setor</label>
          <div className="flex-1">
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="form-input w-40">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="setor1">Setor 1</SelectItem>
                  <SelectItem value="setor2">Setor 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-action px-6">Adicionar</Button>
            </div>
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
              <SelectItem value="consumo">Consumo</SelectItem>
              <SelectItem value="transferencia">Transferência</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Item</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-28">
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
          <label className="form-label">Quantidade</label>
          <div className="flex-1">
            <Input type="number" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Estoque de Destino</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-40">
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

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
          <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
        </div>
      </div>
    </SimpleFormWizard>
  )
}
