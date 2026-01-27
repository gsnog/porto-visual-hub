import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { Wallet } from "lucide-react"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"

export default function NovaTransacao() {
  const navigate = useNavigate()
  const { isSaving, handleSave } = useSaveWithDelay()

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
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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

              <div className="space-y-2">
                <Label className="text-sm font-medium">Status <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="efetuado">Efetuado</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoria</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="cat1">Categoria 1</SelectItem>
                    <SelectItem value="cat2">Categoria 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Conta Bancária</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione a conta" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="conta1">Conta 1</SelectItem>
                    <SelectItem value="conta2">Conta 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
