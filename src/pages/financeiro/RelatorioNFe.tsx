import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { FileText, Users } from "lucide-react"

export default function RelatorioNFe() {
  const navigate = useNavigate()

  const handleGerar = () => {
    console.log("Gerando relatório...")
  }

  const handleVoltar = () => {
    navigate("/financeiro/xml")
  }

  return (
    <SimpleFormWizard title="Relatório NF-e">
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
                <Select defaultValue="nfe">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="nfe">NF-e</SelectItem>
                    <SelectItem value="nfce">NFC-e</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Data</Label>
                <Select defaultValue="emissao">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="emissao">Data de Emissão</SelectItem>
                    <SelectItem value="autorizacao">Data de Autorização</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Filtrar por</Label>
                <Select defaultValue="anual">
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
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
                  <Label className="text-sm font-medium">Fornecedor</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="fornecedor1">Fornecedor 1</SelectItem>
                      <SelectItem value="fornecedor2">Fornecedor 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cliente</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cliente1">Cliente 1</SelectItem>
                      <SelectItem value="cliente2">Cliente 2</SelectItem>
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
                      <SelectItem value="autorizada">Autorizada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                      <SelectItem value="processando">Processando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Série</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="1">Série 1</SelectItem>
                      <SelectItem value="2">Série 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Número Inicial</Label>
                  <Input placeholder="Ex: 00001" className="form-input" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Número Final</Label>
                  <Input placeholder="Ex: 99999" className="form-input" />
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
