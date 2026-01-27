import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"

export default function RelatorioFluxoCaixa() {
  const navigate = useNavigate()

  const handleGerar = () => {
    console.log("Gerando relatório...")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <SimpleFormWizard currentStep="Relatório Fluxo de Caixa">
          <></>
        </SimpleFormWizard>

        <Card className="shadow-md">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Relatório Fluxo de Caixa</h2>
                <p className="text-sm text-muted-foreground">Configure os filtros para gerar o relatório</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select defaultValue="fluxo-caixa">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Fluxo de Caixa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fluxo-caixa">Fluxo de Caixa</SelectItem>
                    <SelectItem value="contas-receber">Contas a Receber</SelectItem>
                    <SelectItem value="contas-pagar">Contas a Pagar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data</Label>
                <Select defaultValue="vencimento">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Data de Vencimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vencimento">Data de Vencimento</SelectItem>
                    <SelectItem value="pagamento">Data de Pagamento</SelectItem>
                    <SelectItem value="lancamento">Data de Lançamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Filtrar por</Label>
                <Select defaultValue="anual">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Anual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anual">Anual</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ano</Label>
                <Input placeholder="2025" className="w-full bg-[#efefef]" />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-500" />
                Relacionados
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cliente1">Cliente 1</SelectItem>
                      <SelectItem value="cliente2">Cliente 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Conta Bancária</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conta1">Conta 1</SelectItem>
                      <SelectItem value="conta2">Conta 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat1">Categoria 1</SelectItem>
                      <SelectItem value="cat2">Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sub Categoria</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subcat1">Sub Categoria 1</SelectItem>
                      <SelectItem value="subcat2">Sub Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Contábil</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contabil1">Contábil 1</SelectItem>
                      <SelectItem value="contabil2">Contábil 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Plano de Contas</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plano1">Plano 1</SelectItem>
                      <SelectItem value="plano2">Plano 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Diretoria</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diretoria1">Diretoria 1</SelectItem>
                      <SelectItem value="diretoria2">Diretoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gerência</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gerencia1">Gerência 1</SelectItem>
                      <SelectItem value="gerencia2">Gerência 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Departamento</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="depto1">Departamento 1</SelectItem>
                      <SelectItem value="depto2">Departamento 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Centro de Receita</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="centro1">Centro 1</SelectItem>
                      <SelectItem value="centro2">Centro 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="efetuado">Efetuado</SelectItem>
                      <SelectItem value="vencido">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <FormActionBar
              onSave={handleGerar}
              onCancel={() => navigate("/financeiro/fluxo-caixa")}
              isSaving={false}
              saveLabel="Gerar"
              cancelLabel="Voltar"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
