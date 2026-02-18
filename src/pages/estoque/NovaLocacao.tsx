import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { MapPin } from "lucide-react"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"
import { useState } from "react"
import { DropdownWithAdd } from "@/components/DropdownWithAdd"

export default function NovaLocacao() {
  const navigate = useNavigate()
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/estoque/locacoes",
    successMessage: "Locação salva!",
    successDescription: "O registro foi salvo com sucesso.",
  })

  const handleCancelar = () => {
    navigate("/estoque/locacoes")
  }

  const [supplier, setSupplier] = useState("")
  const [supplierOptions, setSupplierOptions] = useState([
    { value: "supplier1", label: "Supplier 1" },
    { value: "supplier2", label: "Supplier 2" },
  ])

  const [unidade, setUnidade] = useState("")
  const [unidadeOptions, setUnidadeOptions] = useState([
    { value: "unidade1", label: "Unidade 1" },
    { value: "unidade2", label: "Unidade 2" },
  ])

  const [item, setItem] = useState("")
  const [itemOptions, setItemOptions] = useState([
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
  ])

  const addOption = (setter: React.Dispatch<React.SetStateAction<{value:string;label:string}[]>>, valueSetter: React.Dispatch<React.SetStateAction<string>>) => (name: string) => {
    const newValue = name.toLowerCase().replace(/\s+/g, "-")
    setter(prev => [...prev, { value: newValue, label: name }])
    valueSetter(newValue)
  }

  return (
    <SimpleFormWizard title="Nova Locação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Locação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Supplier"
                value={supplier}
                onChange={setSupplier}
                options={supplierOptions}
                onAddNew={addOption(setSupplierOptions, setSupplier)}
              />

              <DropdownWithAdd
                label="Unidade"
                required
                value={unidade}
                onChange={setUnidade}
                options={unidadeOptions}
                onAddNew={addOption(setUnidadeOptions, setUnidade)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Início <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Previsão de Entrega <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label className="text-sm font-medium">Contrato</Label>
                 <Input type="file" className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
               </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor</Label>
                <Input type="text" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Adicional</Label>
                <Input type="number" defaultValue="0" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Desconto</Label>
                <Input type="number" defaultValue="0" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor Total</Label>
                <Input type="text" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Descrição</Label>
                <Textarea className="form-input min-h-[120px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Item"
                value={item}
                onChange={setItem}
                options={itemOptions}
                onAddNew={addOption(setItemOptions, setItem)}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Quantidade</Label>
                <Input type="number" className="form-input" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="btn-outline">Adicionar Item</Button>
            </div>

            <h2 className="text-xl font-semibold text-foreground pt-4">Itens</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Item</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center" colSpan={3}>Nenhum item adicionado</TableCell>
                </TableRow>
              </TableBody>
            </Table>

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
