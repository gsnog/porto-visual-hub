import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Trash2, FileText, DollarSign } from "lucide-react" // Adicionando FileText e DollarSign
import { CalendarDays } from "lucide-react"

type Asset = {
  id: string
  codigo: string
  item: string
  dataAquisicao: string
  valor: string
  quantidade: string
}

// Atualizado com a estrutura de dados mais completa
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
  const [formData, setFormData] = useState({
    item: '',
    dataAquisicao: '',
    valor: '',
    quantidade: ''
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
      valor: '',
      quantidade: ''
    })
  }

  const handleSubmitAdd = () => {
    // In a real app, this would submit to an API
    console.log("Adding asset:", formData)
    setCurrentView('list')
    setFormData({
      item: '',
      dataAquisicao: '',
      valor: '',
      quantidade: ''
    })
  }

  const handleDelete = () => {
    // In a real app, this would delete from API
    console.log("Deleting asset:", selectedAsset?.id)
    setCurrentView('list')
    setSelectedAsset(null)
  }
  
  // Função auxiliar para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  // List View
  if (currentView === 'list') {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Patrimônio</h1>
            <Button 
              onClick={handleAddNew}
              // Estilização consistente: laranja e rounded-full
              className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Novo Patrimônio
            </Button>
          </div>
          
          {/* Filtros */}
          <div className="flex gap-4 items-center flex-wrap">
            <Input 
              placeholder="Item / Código" 
              // Estilização consistente: fundo, texto preto
              className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"
            />
            
            <div className="relative">
              <Input 
                type="date" // Correção para seletor de data
                placeholder="Data de Aquisição" 
                className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-48 rounded-full"
              />
            </div>
            
            <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
              Filtrar
            </Button>
          </div>


          {/* Tabela de Patrimônio */}
          <div className="rounded-lg overflow-x-auto border border-[#E3E3E3]">
            <Table>
              <TableHeader className="whitespace-nowrap">
                {/* Estilização do cabeçalho da tabela consistente */}
                <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] cursor-default select-none">
                  <TableHead className="!text-black font-medium">Código</TableHead>
                  <TableHead className="!text-black font-medium">Item</TableHead>
                  <TableHead className="!text-black font-medium">Data de Aquisição</TableHead>
                  <TableHead className="!text-black font-medium">Valor Unitário</TableHead>
                  <TableHead className="!text-black font-medium">Quantidade</TableHead>
                  <TableHead className="!text-black font-medium text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="whitespace-nowrap">
                {mockAssets.map((asset) => (
                  <TableRow 
                    key={asset.id} 
                    // Estilização da linha consistente (hover azul escuro)
                    className="bg-white text-black hover:bg-[#22265B] hover:text-white transition-colors"
                  >
                    <TableCell>{asset.codigo}</TableCell>
                    <TableCell>{asset.item}</TableCell>
                    <TableCell>{asset.dataAquisicao}</TableCell>
                    <TableCell>{asset.valor}</TableCell>
                    <TableCell>{asset.quantidade}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        onClick={() => handleViewDetails(asset)}
                        size="sm"
                        // Estilização do botão consistente
                        className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs"
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

  // Add Form View
  if (currentView === 'add') {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="p-6 space-y-6">
          <div className="mb-6">
            <Button 
              onClick={handleBackToList}
              variant="ghost"
              className="text-orange-500 hover:bg-orange-50/20 px-3 py-2 rounded-lg font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-semibold text-foreground mt-4">Adicionar Novo Patrimônio</h1>
          </div>

          <div className="flex justify-start">
            <Card className="w-full max-w-2xl bg-white rounded-lg shadow-lg border border-[#E3E3E3]">
              <CardContent className="p-8">
                <div className="space-y-6">
                  
                  {/* Item */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item*
                    </label>
                    <Select value={formData.item} onValueChange={(value) => setFormData(prev => ({...prev, item: value}))}>
                      <SelectTrigger className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-full w-full">
                        <SelectValue placeholder="Selecione o tipo de item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automovel">Automóvel</SelectItem>
                        <SelectItem value="equipamento">Equipamento</SelectItem>
                        <SelectItem value="mobiliario">Mobiliário</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Data de Aquisição */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Aquisição*
                    </label>
                    <Input 
                      id="dataAquisicao"
                      type="date" // Correção para seletor de data
                      value={formData.dataAquisicao}
                      onChange={handleInputChange}
                      className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-full w-full"
                    />
                  </div>

                  {/* Valor */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor Unitário (R$)*
                    </label>
                    <Input 
                      id="valor"
                      type="text"
                      placeholder="Ex: 1500.00"
                      value={formData.valor}
                      onChange={handleInputChange}
                      className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-full w-full pr-10"
                    />
                    <DollarSign className="absolute right-3 top-[50px] transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>

                  {/* Quantidade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantidade
                    </label>
                    <Input 
                      id="quantidade"
                      type="number"
                      value={formData.quantidade}
                      onChange={handleInputChange}
                      className="bg-[#efefef] text-black placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-full w-full"
                    />
                  </div>

                  {/* Botões do Formulário */}
                  <div className="flex gap-4 justify-start pt-6">
                    <Button 
                      onClick={handleSubmitAdd}
                      // Estilização consistente
                      className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Adicionar Patrimônio
                    </Button>
                    <Button 
                      onClick={handleCancelAdd}
                      variant="outline"
                      // Estilização consistente
                      className="rounded-lg border-orange-500 text-orange-500 hover:bg-orange-500 text-xs"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Details View
  if (currentView === 'details' && selectedAsset) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="p-6 space-y-6">
          <div className="mb-6">
            <Button 
              onClick={handleBackToList}
              variant="ghost"
              className="text-orange-500 hover:bg-orange-50/20 px-3 py-2 rounded-lg font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar à Lista
            </Button>
            <h1 className="text-2xl font-semibold text-foreground mt-4">
              Detalhes do Item: {selectedAsset.item} ({selectedAsset.codigo})
            </h1>
          </div>

          <div className="flex justify-start">
            <Card className="w-full max-w-2xl bg-white rounded-lg shadow-lg border border-[#E3E3E3]">
              <CardContent className="p-8">
                <div className="space-y-4">
                  
                  {/* Detalhes organizados em linhas */}
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

                  {/* Botões de Ação na seção de Detalhes */}
                  <div className="flex gap-4 justify-start pt-8">
                    <Button 
                      className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Editar
                    </Button>
                    <Button 
                      onClick={handleDelete}
                      className="rounded-lg bg-red-500 hover:bg-red-600 text-white"
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
      </div>
    )
  }

  return null
}

export default Patrimonio