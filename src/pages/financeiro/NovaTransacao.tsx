import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { Wallet } from "lucide-react"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"
import { useState } from "react"
import { DropdownWithAdd } from "@/components/DropdownWithAdd"

export default function NovaTransacao() {
  const navigate = useNavigate()
  const { isSaving, handleSave } = useSaveWithDelay()

  const [tipo, setTipo] = useState("")
  const [tipoOptions, setTipoOptions] = useState([
    { value: "entrada", label: "Entrada" },
    { value: "saida", label: "Saída" },
  ])

  const [status, setStatus] = useState("")
  const [statusOptions, setStatusOptions] = useState([
    { value: "pendente", label: "Pendente" },
    { value: "efetuado", label: "Efetuado" },
    { value: "vencido", label: "Vencido" },
  ])

  const [categoria, setCategoria] = useState("")
  const [categoriaOptions, setCategoriaOptions] = useState([
    { value: "cat1", label: "Categoria 1" },
    { value: "cat2", label: "Categoria 2" },
  ])

  const [contaBancaria, setContaBancaria] = useState("")
  const [contaBancariaOptions, setContaBancariaOptions] = useState([
    { value: "conta1", label: "Conta 1" },
    { value: "conta2", label: "Conta 2" },
  ])

  const addOption = (setter: React.Dispatch<React.SetStateAction<{value:string;label:string}[]>>, valueSetter: React.Dispatch<React.SetStateAction<string>>) => (name: string) => {
    const newValue = name.toLowerCase().replace(/\s+/g, "-")
    setter(prev => [...prev, { value: newValue, label: name }])
    valueSetter(newValue)
  }

  const handleSalvar = () => {
    handleSave("/financeiro/fluxo-caixa", "Transação salva com sucesso!", "A transação foi registrada no sistema.")
  }

  const handleCancelar = () => {
    navigate("/financeiro/fluxo-caixa")
  }

  return (
    <SimpleFormWizard title="Nova Transação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Transação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Tipo"
                required
                value={tipo}
                onChange={setTipo}
                options={tipoOptions}
                onAddNew={addOption(setTipoOptions, setTipo)}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Beneficiário <span className="text-destructive">*</span></Label>
                <Input type="text" placeholder="Nome do beneficiário" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Vencimento <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Pagamento</Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor <span className="text-destructive">*</span></Label>
                <Input type="text" placeholder="R$ 0,00" className="form-input" />
              </div>

              <DropdownWithAdd
                label="Status"
                required
                value={status}
                onChange={setStatus}
                options={statusOptions}
                onAddNew={addOption(setStatusOptions, setStatus)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Categoria"
                value={categoria}
                onChange={setCategoria}
                options={categoriaOptions}
                onAddNew={addOption(setCategoriaOptions, setCategoria)}
              />

              <DropdownWithAdd
                label="Conta Bancária"
                value={contaBancaria}
                onChange={setContaBancaria}
                options={contaBancariaOptions}
                onAddNew={addOption(setContaBancariaOptions, setContaBancaria)}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Observações</Label>
                <Textarea placeholder="Observações adicionais" className="form-input min-h-[100px]" />
              </div>
            </div>

            <FormActionBar
              onSave={handleSalvar}
              onCancel={handleCancelar}
              isSaving={isSaving}
            />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  )
}
