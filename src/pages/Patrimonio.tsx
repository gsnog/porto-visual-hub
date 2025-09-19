import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

type Asset = {
  id: string
  codigo: string
  item: string
  dataAquisicao: string
  valor: string
}

const mockAssets: Asset[] = [
  { id: "1", codigo: "0001", item: "Automóvel", dataAquisicao: "30/01/2025", valor: "R$ 1.000,00" },
  { id: "2", codigo: "0001", item: "Automóvel", dataAquisicao: "30/01/2025", valor: "R$ 1.000,00" },
  { id: "3", codigo: "0001", item: "Automóvel", dataAquisicao: "30/01/2025", valor: "R$ 1.000,00" },
  { id: "4", codigo: "0001", item: "Automóvel", dataAquisicao: "30/01/2025", valor: "R$ 1.000,00" },
  { id: "5", codigo: "0001", item: "Automóvel", dataAquisicao: "30/01/2025", valor: "R$ 1.000,00" }
]

type ViewState = 'list' | 'add' | 'details'

const Patrimonio = () => {
  const [currentView, setCurrentView] = useState<ViewState>('list')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [formData, setFormData] = useState({
    item: '',
    dataAquisicao: '',
    valor: 'R$ 1.000,00',
    quantidade: '100'
  })

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
    setFormData({
      item: '',
      dataAquisicao: '',
      valor: 'R$ 1.000,00',
      quantidade: '100'
    })
  }

  const handleSubmitAdd = () => {
    // In a real app, this would submit to an API
    setCurrentView('list')
    setFormData({
      item: '',
      dataAquisicao: '',
      valor: 'R$ 1.000,00',
      quantidade: '100'
    })
  }

  const handleDelete = () => {
    // In a real app, this would delete from API
    setCurrentView('list')
    setSelectedAsset(null)
  }

  // List View
  if (currentView === 'list') {
    return (
      <div className="flex-1 p-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Patrimônio</h1>
          <Button 
            onClick={handleAddNew}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-2 rounded-full font-medium"
          >
            Novo Patrimônio
          </Button>
        </div>

        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-0">
            <Table className="table-custom">
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-gray-600 font-medium p-6">Código</TableHead>
                  <TableHead className="text-gray-600 font-medium p-6">Item</TableHead>
                  <TableHead className="text-gray-600 font-medium p-6">Data de Aquisição</TableHead>
                  <TableHead className="text-gray-600 font-medium p-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssets.map((asset) => (
                  <TableRow key={asset.id} className="border-b border-gray-100 last:border-0">
                    <TableCell className="p-6 font-medium text-gray-900">{asset.codigo}</TableCell>
                    <TableCell className="p-6 text-gray-900">{asset.item}</TableCell>
                    <TableCell className="p-6 text-gray-900">{asset.dataAquisicao}</TableCell>
                    <TableCell className="p-6">
                      <Button 
                        onClick={() => handleViewDetails(asset)}
                        className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-medium"
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Add Form View
  if (currentView === 'add') {
    return (
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Adicionar Patrimônio</h1>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item*
                  </label>
                  <Select value={formData.item} onValueChange={(value) => setFormData(prev => ({...prev, item: value}))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automovel">Automóvel</SelectItem>
                      <SelectItem value="equipamento">Equipamento</SelectItem>
                      <SelectItem value="mobiliario">Mobiliário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Aquisição*
                  </label>
                  <Input 
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={formData.dataAquisicao}
                    onChange={(e) => setFormData(prev => ({...prev, dataAquisicao: e.target.value}))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor (R$)*
                  </label>
                  <Input 
                    type="text"
                    value={formData.valor}
                    onChange={(e) => setFormData(prev => ({...prev, valor: e.target.value}))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <Input 
                    type="text"
                    value={formData.quantidade}
                    onChange={(e) => setFormData(prev => ({...prev, quantidade: e.target.value}))}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-4 justify-center pt-6">
                  <Button 
                    onClick={handleSubmitAdd}
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-2 rounded-full font-medium"
                  >
                    Adicionar
                  </Button>
                  <Button 
                    onClick={handleCancelAdd}
                    variant="outline"
                    className="bg-accent hover:bg-accent/90 text-white border-accent px-8 py-2 rounded-full font-medium"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Details View
  if (currentView === 'details' && selectedAsset) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Detalhes do Patrimônio</h1>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Data:</label>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selectedAsset.dataAquisicao}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Código:</label>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selectedAsset.codigo}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Produto:</label>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selectedAsset.item}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Valor:</label>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selectedAsset.valor}</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center pt-8">
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-2 rounded-full font-medium"
                  >
                    Editar
                  </Button>
                  <Button 
                    onClick={handleBackToList}
                    variant="outline"
                    className="bg-accent hover:bg-accent/90 text-white border-accent px-8 py-2 rounded-full font-medium"
                  >
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full font-medium"
                  >
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