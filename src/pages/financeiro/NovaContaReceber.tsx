import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

export default function NovaContaReceber() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/financeiro/contas-receber")
  }

  const handleCancelar = () => {
    navigate("/financeiro/contas-receber")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">Cliente</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-28">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="cliente1">Cliente 1</SelectItem>
                <SelectItem value="cliente2">Cliente 2</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Centro de Receita</label>
          <Select>
            <SelectTrigger className="form-input flex-1">
              <SelectValue placeholder="---- Selecione ----" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="centro1">Centro 1</SelectItem>
              <SelectItem value="centro2">Centro 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Plano de Contas</label>
          <Select>
            <SelectTrigger className="form-input w-52">
              <SelectValue placeholder="---- Selecione ----" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="plano1">Plano 1</SelectItem>
              <SelectItem value="plano2">Plano 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Documento</label>
          <div className="flex-1">
            <Input type="text" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Valor do Título</label>
          <div className="flex-1">
            <Input type="text" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Multa</label>
          <div className="flex-1">
            <Input type="number" defaultValue="0" className="form-input w-40" />
            <span className="form-hint">Opcional</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Encargos</label>
          <Input type="number" defaultValue="0" className="form-input w-40" />
        </div>

        <div className="form-row">
          <label className="form-label">Juros</label>
          <Input type="number" defaultValue="0" className="form-input w-40" />
        </div>

        <div className="form-row">
          <label className="form-label">Desconto</label>
          <div className="flex-1">
            <Input type="number" defaultValue="0" className="form-input w-40" />
            <span className="form-hint">Opcional</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Valor Total</label>
          <Input type="text" className="form-input w-40" />
        </div>

        <div className="form-row">
          <label className="form-label">Data de Faturamento</label>
          <div className="flex-1">
            <Input type="date" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Data de Vencimento</label>
          <div className="flex-1">
            <Input type="date" className="form-input w-40" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Documento PDF</label>
          <Input type="file" accept=".pdf" className="form-input w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>

        <div className="flex items-start gap-4">
          <label className="form-label pt-2">Descrição</label>
          <div className="flex-1">
            <Textarea className="form-input w-80 min-h-[120px]" />
            <span className="form-hint">Opcional</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Número de Parcelas</label>
          <div className="flex-1">
            <Input type="number" defaultValue="1" className="form-input w-40" />
            <span className="form-hint">Informe o número de Parcelas</span>
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
