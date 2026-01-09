import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Trash2, FileText } from "lucide-react"
import { FilterSection } from "@/components/FilterSection"

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

  const handleSubmitAdd = () => {
    console.log("Adding asset:", formData)
    setCurrentView('list')
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
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              onClick={handleAddNew}
              className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
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

          <div className="rounded-xl overflow-hidden shadow-sm">
            <Table className="table-professional">
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
                        <Button 
                          onClick={() => handleViewDetails(asset)}
                          size="sm"
                          className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
                        >
                          Detalhes
                        </Button>
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
      <div className="flex flex-col h-full bg-background">
        <div className="space-y-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-8">
              <label className="text-foreground font-medium w-40">Item</label>
              <div className="flex-1">
                <Select value={formData.item} onValueChange={(value) => setFormData(prev => ({...prev, item: value}))}>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-52 border border-[#22265B]">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="automovel">Automóvel</SelectItem>
                    <SelectItem value="equipamento">Equipamento</SelectItem>
                    <SelectItem value="mobiliario">Mobiliário</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <label className="text-foreground font-medium w-40">Data de Aquisição</label>
              <div className="flex-1">
                <Input 
                  id="dataAquisicao"
                  type="date"
                  value={formData.dataAquisicao}
                  onChange={handleInputChange}
                  className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40"
                />
                <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <label className="text-foreground font-medium w-40">Valor Unitário</label>
              <div className="flex-1">
                <Input 
                  id="valor"
                  type="text"
                  placeholder="Ex: 1500.00"
                  value={formData.valor}
                  onChange={handleInputChange}
                  className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40"
                />
                <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <label className="text-foreground font-medium w-40">Quantidade</label>
              <Input 
                id="quantidade"
                type="number"
                value={formData.quantidade}
                onChange={handleInputChange}
                className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSubmitAdd}
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Salvar
              </Button>
              <Button 
                onClick={handleCancelAdd}
                variant="destructive"
                className="rounded-lg px-6"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
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
              className="text-primary hover:bg-primary/10 px-3 py-2 rounded-lg font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar à Lista
            </Button>
            <h1 className="text-2xl font-semibold text-foreground mt-4">
              Detalhes do Item: {selectedAsset.item} ({selectedAsset.codigo})
            </h1>
          </div>

          <Card className="w-full max-w-2xl bg-white rounded-lg shadow-lg border border-[#E3E3E3]">
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
                  <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                    Editar
                  </Button>
                  <Button 
                    onClick={handleDelete}
                    className="rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground"
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