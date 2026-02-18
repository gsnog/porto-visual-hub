import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { PackagePlus } from "lucide-react"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"
import { useState } from "react"
import { DropdownWithAdd } from "@/components/DropdownWithAdd"

export default function NovaEntrada() {
  const navigate = useNavigate()
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/estoque/entradas",
    successMessage: "Entrada salva!",
    successDescription: "O registro foi salvo com sucesso.",
  })

  const handleCancelar = () => {
    navigate("/estoque/entradas")
  }

  const [item, setItem] = useState("")
  const [itemOptions, setItemOptions] = useState([
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
  ])

  const [estoqueOrigem, setEstoqueOrigem] = useState("")
  const [estoqueOrigemOptions, setEstoqueOrigemOptions] = useState([
    { value: "origem1", label: "Estoque 1" },
    { value: "origem2", label: "Estoque 2" },
  ])

  const [estoqueDestino, setEstoqueDestino] = useState("")
  const [estoqueDestinoOptions, setEstoqueDestinoOptions] = useState([
    { value: "destino1", label: "Estoque 1" },
    { value: "destino2", label: "Estoque 2" },
  ])

  const [operacao, setOperacao] = useState("")
  const [operacaoOptions, setOperacaoOptions] = useState([
    { value: "compra", label: "Compra" },
    { value: "transferencia", label: "Transferência" },
  ])

  const addOption = (setter: React.Dispatch<React.SetStateAction<{value:string;label:string}[]>>, valueSetter: React.Dispatch<React.SetStateAction<string>>) => (name: string) => {
    const newValue = name.toLowerCase().replace(/\s+/g, "-")
    setter(prev => [...prev, { value: newValue, label: name }])
    valueSetter(newValue)
  }

  return (
    <SimpleFormWizard title="Nova Entrada">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <PackagePlus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Entrada</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data</Label>
                <Input type="date" className="form-input" />
              </div>

              <DropdownWithAdd
                label="Item"
                required
                value={item}
                onChange={setItem}
                options={itemOptions}
                onAddNew={addOption(setItemOptions, setItem)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Validade</Label>
                <Input type="date" className="form-input" />
              </div>

              <DropdownWithAdd
                label="Estoque de Origem"
                value={estoqueOrigem}
                onChange={setEstoqueOrigem}
                options={estoqueOrigemOptions}
                onAddNew={addOption(setEstoqueOrigemOptions, setEstoqueOrigem)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Estoque de Destino"
                required
                value={estoqueDestino}
                onChange={setEstoqueDestino}
                options={estoqueDestinoOptions}
                onAddNew={addOption(setEstoqueDestinoOptions, setEstoqueDestino)}
              />

              <DropdownWithAdd
                label="Operação"
                value={operacao}
                onChange={setOperacao}
                options={operacaoOptions}
                onAddNew={addOption(setOperacaoOptions, setOperacao)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Custo Unitário <span className="text-destructive">*</span></Label>
                <Input type="text" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Quantidade <span className="text-destructive">*</span></Label>
                <Input type="number" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Custo Total</Label>
                <Input type="text" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nota Fiscal <span className="text-destructive">*</span></Label>
                <Input type="text" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Observação</Label>
                <Textarea className="form-input min-h-[120px]" />
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
