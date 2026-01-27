import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { FileText, Package } from "lucide-react"

export default function RelatorioInventario() {
  const navigate = useNavigate()

  const handleGerar = () => {
    console.log("Gerando relatório...")
  }

  const handleVoltar = () => {
    navigate("/estoque/inventario")
  }

  return (
    <SimpleFormWizard title="Relatório de Inventário">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Filtros do Relatório</h2>
                <p className="text-sm text-muted-foreground">Configure os filtros para gerar o relatório de inventário</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              <div className="space-y-2">
                <Label className="text-sm font-medium">Data Referência</Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Relacionados</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Item</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="item1">Parafuso M8</SelectItem>
                      <SelectItem value="item2">Cabo HDMI</SelectItem>
                      <SelectItem value="item3">Óleo Lubrificante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Unidade/Estoque</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="almoxarifado-sp">Almoxarifado SP</SelectItem>
                      <SelectItem value="ti-central">TI Central</SelectItem>
                      <SelectItem value="manutencao">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cidade</Label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="---" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="rj">Rio de Janeiro</SelectItem>
                      <SelectItem value="central">Central</SelectItem>
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
                  <Label className="text-sm font-medium">Quantidade Mínima</Label>
                  <Input type="number" placeholder="0" className="form-input" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantidade Máxima</Label>
                  <Input type="number" placeholder="999" className="form-input" />
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
