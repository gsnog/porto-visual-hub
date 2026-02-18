import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Trash2, Plus, Landmark } from "lucide-react"
import { DropdownWithAdd } from "@/components/DropdownWithAdd"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"

type Asset = {
  id: string
  codigo: string
  item: string
  dataAquisicao: string
  valor: string
  quantidade: string
}

const mockAssets: Asset[] = [
  { id: "1", codigo: "0001", item: "Automóvel", dataAquisicao: "30/01/2025", valor: "R$ 1.000,00", quantidade: "1" },
  { id: "2", codigo: "0002", item: "Equipamento", dataAquisicao: "15/02/2025", valor: "R$ 5.500,00", quantidade: "5" },
  { id: "3", codigo: "0003", item: "Mobiliário", dataAquisicao: "10/03/2025", valor: "R$ 250,00", quantidade: "20" },
  { id: "4", codigo: "0004", item: "Software", dataAquisicao: "01/04/2025", valor: "R$ 15.000,00", quantidade: "1" },
  { id: "5", codigo: "0005", item: "Automóvel", dataAquisicao: "05/05/2025", valor: "R$ 45.000,00", quantidade: "1" }
]

type ViewState = 'list' | 'add' | 'details'

const Patrimonio = () => {
  const [currentView, setCurrentView] = useState<ViewState>('list')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [filterNome, setFilterNome] = useState("")
  const [filterData, setFilterData] = useState("")
  const [formData, setFormData] = useState({
    item: '',
    dataAquisicao: '',
    valor: '',
    quantidade: ''
  })

  const [itemOptions, setItemOptions] = useState([
    { value: "automovel", label: "Automóvel" },
    { value: "equipamento", label: "Equipamento" },
    { value: "mobiliario", label: "Mobiliário" },
    { value: "software", label: "Software" },
  ])

  const filteredAssets = useMemo(() => {
    return mockAssets.filter(asset => {
      const matchNome = asset.item.toLowerCase().includes(filterNome.toLowerCase()) || 
                        asset.codigo.toLowerCase().includes(filterNome.toLowerCase())
      const matchData = filterData ? asset.dataAquisicao.includes(filterData.split("-").reverse().join("/")) : true
      return matchNome && matchData
    })
  }, [filterNome, filterData])

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset)
    setCurrentView('details')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedAsset(null)
  }

  const handleAddNew = () => {
    setCurrentView('add')
  }

  const handleCancelAdd = () => {
    setCurrentView('list')
    setFormData({ item: '', dataAquisicao: '', valor: '', quantidade: '' })
  }

  const { handleSave, isSaving } = useSaveWithDelay()

  const handleSubmitAdd = async () => {
    console.log("Adding asset:", formData)
    await handleSave("/patrimonio", "Patrimônio salvo com sucesso!", "O registro foi adicionado ao sistema.")
    setFormData({ item: '', dataAquisicao: '', valor: '', quantidade: '' })
  }

  const handleDelete = () => {
    console.log("Deleting asset:", selectedAsset?.id)
    setCurrentView('list')
    setSelectedAsset(null)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  if (currentView === 'list') {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 items-center">
            <Button 
              onClick={handleAddNew}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Patrimônio
            </Button>
          </div>
          
          <FilterSection
            fields={[
              {
                type: "text",
                label: "Item / Código",
                placeholder: "Buscar...",
                value: filterNome,
                onChange: setFilterNome,
                width: "flex-1 min-w-[200px]"
              },
              {
                type: "date",
                label: "Data de Aquisição",
                value: filterData,
                onChange: setFilterData,
                width: "min-w-[160px]"
              }
            ]}
            resultsCount={filteredAssets.length}
          />

          <div className="rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Código</TableHead>
                  <TableHead className="text-center">Item</TableHead>
                  <TableHead className="text-center">Data de Aquisição</TableHead>
                  <TableHead className="text-center">Valor Unitário</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhum patrimônio encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="text-center">{asset.codigo}</TableCell>
                      <TableCell className="text-center">{asset.item}</TableCell>
                      <TableCell className="text-center">{asset.dataAquisicao}</TableCell>
                      <TableCell className="text-center">{asset.valor}</TableCell>
                      <TableCell className="text-center">{asset.quantidade}</TableCell>
                      <TableCell className="text-center">
                        <TableActions 
                          onView={() => handleViewDetails(asset)}
                          onEdit={() => console.log('Edit', asset.id)}
                          onDelete={() => console.log('Delete', asset.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'add') {
    return (
      <SimpleFormWizard title="Novo Patrimônio">
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Dados do Patrimônio</h2>
                  <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DropdownWithAdd
                  label="Item"
                  required
                  value={formData.item}
                  onChange={(value) => setFormData(prev => ({...prev, item: value}))}
                  options={itemOptions}
                  onAddNew={(name) => {
                    const newValue = name.toLowerCase().replace(/\s+/g, "-");
                    setItemOptions(prev => [...prev, { value: newValue, label: name }]);
                    setFormData(prev => ({ ...prev, item: newValue }));
                  }}
                />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Data de Aquisição <span className="text-destructive">*</span></Label>
                  <Input 
                    id="dataAquisicao"
                    type="date"
                    value={formData.dataAquisicao}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Valor Unitário <span className="text-destructive">*</span></Label>
                  <Input 
                    id="valor"
                    type="text"
                    placeholder="Ex: 1500.00"
                    value={formData.valor}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantidade</Label>
                  <Input 
                    id="quantidade"
                    type="number"
                    value={formData.quantidade}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <FormActionBar
                onSave={handleSubmitAdd}
                onCancel={handleCancelAdd}
                isSaving={isSaving}
              />
            </div>
          </CardContent>
        </Card>
      </SimpleFormWizard>
    )
  }

  if (currentView === 'details' && selectedAsset) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="space-y-6">
          <div className="mb-6">
            <Button 
              onClick={handleBackToList}
              variant="ghost"
              className="text-primary hover:bg-primary/10 px-3 py-2 rounded font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar à Lista
            </Button>
            <h1 className="text-2xl font-semibold text-foreground mt-4">
              Detalhes do Item: {selectedAsset.item} ({selectedAsset.codigo})
            </h1>
          </div>

          <Card className="w-full max-w-2xl bg-white rounded shadow-lg border border-[#E3E3E3]">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b border-gray-100 py-2">
                  <label className="text-sm font-medium text-gray-600">Código:</label>
                  <p className="text-base font-semibold text-gray-900">{selectedAsset.codigo}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-gray-100 py-2">
                  <label className="text-sm font-medium text-gray-600">Item:</label>
                  <p className="text-base font-semibold text-gray-900">{selectedAsset.item}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-gray-100 py-2">
                  <label className="text-sm font-medium text-gray-600">Data de Aquisição:</label>
                  <p className="text-base font-semibold text-gray-900">{selectedAsset.dataAquisicao}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-b border-gray-100 py-2">
                  <label className="text-sm font-medium text-gray-600">Valor Unitário:</label>
                  <p className="text-base font-semibold text-gray-900">{selectedAsset.valor}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-b border-gray-100 py-2">
                  <label className="text-sm font-medium text-gray-600">Quantidade em Estoque:</label>
                  <p className="text-base font-semibold text-gray-900">{selectedAsset.quantidade}</p>
                </div>

                <div className="flex gap-4 justify-start pt-8">
                  <Button className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground">
                    Editar
                  </Button>
                  <Button 
                    onClick={handleDelete}
                    className="rounded-md bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}

export default Patrimonio