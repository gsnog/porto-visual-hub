import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { PackagePlus } from "lucide-react"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"

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

              <div className="space-y-2">
                <Label className="text-sm font-medium">Item <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="item1">Item 1</SelectItem>
                    <SelectItem value="item2">Item 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Validade</Label>
                <Input type="date" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Estoque de Origem</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="origem1">Estoque 1</SelectItem>
                    <SelectItem value="origem2">Estoque 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Estoque de Destino <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="destino1">Estoque 1</SelectItem>
                    <SelectItem value="destino2">Estoque 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Operação</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="compra">Compra</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
