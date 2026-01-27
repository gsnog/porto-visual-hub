import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"

export default function NovaTransacao() {
  const navigate = useNavigate()
  const { handleSave, isSaving } = useSaveWithDelay()

  const handleSalvar = async () => {
    await handleSave("/financeiro/fluxo-caixa", "Transação salva com sucesso!", "A transação foi registrada no sistema.")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <SimpleFormWizard currentStep="Dados da Transação">
          <></>
        </SimpleFormWizard>

        <Card className="shadow-md">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-primary/10">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Nova Transação</h2>
                <p className="text-sm text-muted-foreground">Preencha os dados da transação</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Tipo *</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Beneficiário *</Label>
                <Input placeholder="Nome do beneficiário" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label>Data de Vencimento *</Label>
                <Input type="date" className="w-full bg-[#efefef]" />
              </div>

              <div className="space-y-2">
                <Label>Data de Pagamento</Label>
                <Input type="date" className="w-full bg-[#efefef]" />
              </div>

              <div className="space-y-2">
                <Label>Valor *</Label>
                <Input placeholder="R$ 0,00" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label>Status *</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="efetuado">Efetuado</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat1">Categoria 1</SelectItem>
                    <SelectItem value="cat2">Categoria 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Conta Bancária</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conta1">Conta 1</SelectItem>
                    <SelectItem value="conta2">Conta 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label>Observações</Label>
                <Input placeholder="Observações adicionais" className="w-full" />
              </div>
            </div>

            <FormActionBar
              onSave={handleSalvar}
              onCancel={() => navigate("/financeiro/fluxo-caixa")}
              isSaving={isSaving}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
