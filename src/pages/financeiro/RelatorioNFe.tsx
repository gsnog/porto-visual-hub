import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"

export default function RelatorioNFe() {
  const navigate = useNavigate()

  const handleGerar = () => {
    console.log("Gerando relatório...")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <SimpleFormWizard currentStep="Relatório NF-e">
          <></>
        </SimpleFormWizard>

        <Card className="shadow-md">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Relatório NF-e</h2>
                <p className="text-sm text-muted-foreground">Configure os filtros para gerar o relatório</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select defaultValue="nfe">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nfe">NF-e</SelectItem>
                    <SelectItem value="nfce">NFC-e</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data</Label>
                <Select defaultValue="emissao">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emissao">Data de Emissão</SelectItem>
                    <SelectItem value="autorizacao">Data de Autorização</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Filtrar por</Label>
                <Select defaultValue="anual">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
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
                  <Label>Fornecedor</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fornecedor1">Fornecedor 1</SelectItem>
                      <SelectItem value="fornecedor2">Fornecedor 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="autorizada">Autorizada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                      <SelectItem value="processando">Processando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Série</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Série 1</SelectItem>
                      <SelectItem value="2">Série 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Número Inicial</Label>
                  <Input placeholder="Ex: 00001" className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label>Número Final</Label>
                  <Input placeholder="Ex: 99999" className="w-full" />
                </div>
              </div>
            </div>

            <FormActionBar
              onSave={handleGerar}
              onCancel={() => navigate("/financeiro/xml")}
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
