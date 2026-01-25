import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { CreditCard } from "lucide-react"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"

export default function NovaContaPagar() {
  const navigate = useNavigate()
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/financeiro/contas-pagar",
    successMessage: "Conta a pagar salva!",
    successDescription: "O registro foi salvo com sucesso.",
  })

  const handleCancelar = () => {
    navigate("/financeiro/contas-pagar")
  }

  return (
    <SimpleFormWizard title="Nova Conta a Pagar">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Conta a Pagar</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Beneficiário <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="beneficiario1">Beneficiário 1</SelectItem>
                      <SelectItem value="beneficiario2">Beneficiário 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6">Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Centro de Custo</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="centro1">Centro 1</SelectItem>
                    <SelectItem value="centro2">Centro 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Documento <span className="text-destructive">*</span></Label>
                <Input type="text" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor do Título <span className="text-destructive">*</span></Label>
                <Input type="text" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Faturamento <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Vencimento <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Descrição</Label>
                <Textarea className="form-input min-h-[100px]" />
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
