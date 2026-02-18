import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { FileText } from "lucide-react"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"

export default function UploadNFe() {
  const navigate = useNavigate()
  const { isSaving, handleSave } = useSaveWithDelay()

  const handleEnviar = () => {
    handleSave("/estoque/entradas", "XML enviado com sucesso!")
  }

  const handleCancelar = () => {
    navigate("/estoque/entradas")
  }

  return (
    <SimpleFormWizard title="Upload de NF-e">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da NF-e</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Unidade</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="unidade1">Unidade 1</SelectItem>
                    <SelectItem value="unidade2">Unidade 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Projeto</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="projeto1">Projeto 1</SelectItem>
                    <SelectItem value="projeto2">Projeto 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">PDF da NF</Label>
                <Input 
                  type="file" 
                  accept=".pdf" 
                  className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">PDF dos Boletos</Label>
                <Input 
                  type="file" 
                  accept=".pdf" 
                  className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Arquivo XML <span className="text-destructive">*</span></Label>
                <Input 
                  type="file" 
                  accept=".xml" 
                  className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" 
                />
              </div>
            </div>

            <FormActionBar
              onSave={handleEnviar}
              onCancel={handleCancelar}
              isSaving={isSaving}
              saveLabel="Enviar XML"
            />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  )
}
