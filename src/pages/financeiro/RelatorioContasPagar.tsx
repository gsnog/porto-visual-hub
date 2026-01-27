import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { FileText, Users } from "lucide-react"

export default function RelatorioContasPagar() {
  const navigate = useNavigate()

  const handleGerar = () => {
    console.log("Gerando relatório...")
  }

  const handleVoltar = () => {
    navigate("/financeiro/contas-pagar")
  }

  return (
    <SimpleFormWizard title="Relatório Contas a Pagar">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Filtros do Relatório</h2>
                <p className="text-sm text-muted-foreground">Configure os filtros para gerar o relatório</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo</Label>
                <Select defaultValue="contas-pagar">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Contas a Pagar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="contas-pagar">Contas a Pagar</SelectItem>
                    <SelectItem value="contas-receber">Contas a Receber</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Data</Label>
                <Select defaultValue="vencimento">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Data de Vencimento" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="vencimento">Data de Vencimento</SelectItem>
                    <SelectItem value="faturamento">Data de Faturamento</SelectItem>
                    <SelectItem value="lancamento">Data de Lançamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Filtrar por</Label>
                <Select defaultValue="anual">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Anual" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="anual">Anual</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Ano</Label>
                <Input placeholder="2025" className="form-input" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Relacionados</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Beneficiário</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="beneficiario1">Beneficiário 1</SelectItem>
                      <SelectItem value="beneficiario2">Beneficiário 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Conta Bancária</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="conta1">Conta 1</SelectItem>
                      <SelectItem value="conta2">Conta 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Categoria</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cat1">Categoria 1</SelectItem>
                      <SelectItem value="cat2">Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sub Categoria</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="subcat1">Sub Categoria 1</SelectItem>
                      <SelectItem value="subcat2">Sub Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contábil</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="contabil1">Contábil 1</SelectItem>
                      <SelectItem value="contabil2">Contábil 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Plano de Contas</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="plano1">Plano 1</SelectItem>
                      <SelectItem value="plano2">Plano 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Diretoria</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="diretoria1">Diretoria 1</SelectItem>
                      <SelectItem value="diretoria2">Diretoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gerência</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="gerencia1">Gerência 1</SelectItem>
                      <SelectItem value="gerencia2">Gerência 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Departamento</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="depto1">Departamento 1</SelectItem>
                      <SelectItem value="depto2">Departamento 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Centro de Custo</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="centro1">Centro 1</SelectItem>
                      <SelectItem value="centro2">Centro 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="aberto">Em Aberto</SelectItem>
                      <SelectItem value="efetuado">Efetuado</SelectItem>
                      <SelectItem value="vencido">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <FormActionBar
              onSave={handleGerar}
              onCancel={handleVoltar}
              isSaving={false}
              saveLabel="Gerar"
              cancelLabel="Voltar"
            />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  )
}
