import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Landmark } from "lucide-react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"
import { ExportButton } from "@/components/ExportButton"
import { SimpleFormWizard } from "@/components/SimpleFormWizard"
import { FormActionBar } from "@/components/FormActionBar"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

type Asset = { id: string; codigo: string; item: string; dataAquisicao: string; valor: string; quantidade: string }

const initialAssets: Asset[] = [
  { id: "1", codigo: "0001", item: "Automóvel", dataAquisicao: "30/01/2025", valor: "R$ 1.000,00", quantidade: "1" },
  { id: "2", codigo: "0002", item: "Equipamento", dataAquisicao: "15/02/2025", valor: "R$ 5.500,00", quantidade: "5" },
  { id: "3", codigo: "0003", item: "Mobiliário", dataAquisicao: "10/03/2025", valor: "R$ 250,00", quantidade: "20" },
  { id: "4", codigo: "0004", item: "Software", dataAquisicao: "01/04/2025", valor: "R$ 15.000,00", quantidade: "1" },
  { id: "5", codigo: "0005", item: "Automóvel", dataAquisicao: "05/05/2025", valor: "R$ 45.000,00", quantidade: "1" }
]

const itemOptions = [
  { value: "automovel", label: "Automóvel" },
  { value: "equipamento", label: "Equipamento" },
  { value: "mobiliario", label: "Mobiliário" },
  { value: "software", label: "Software" },
]

const unidadeOptions = [
  { value: "almoxarifado-sp", label: "Almoxarifado SP" },
  { value: "ti-central", label: "TI Central" },
  { value: "deposito-rj", label: "Depósito RJ" },
]

type ViewState = 'list' | 'add'

const Patrimonio = () => {
  const [currentView, setCurrentView] = useState<ViewState>('list')
  const [assets, setAssets] = useState(initialAssets)
  const [filterNome, setFilterNome] = useState("")
  const [filterData, setFilterData] = useState("")
  const [viewItem, setViewItem] = useState<Asset | null>(null)
  const [editItem, setEditItem] = useState<Asset | null>(null)
  const [editData, setEditData] = useState({ codigo: "", item: "", dataAquisicao: "", valor: "", quantidade: "" })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ item: '', dataAquisicao: '', valor: '', quantidade: '', descricao: '', unidade: '' })

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchNome = asset.item.toLowerCase().includes(filterNome.toLowerCase()) || asset.codigo.toLowerCase().includes(filterNome.toLowerCase())
      const matchData = filterData ? asset.dataAquisicao.includes(filterData.split("-").reverse().join("/")) : true
      return matchNome && matchData
    })
  }, [assets, filterNome, filterData])

  const getExportData = () => filteredAssets.map(a => ({ Código: a.codigo, Item: a.item, "Data Aquisição": a.dataAquisicao, "Valor Unitário": a.valor, Quantidade: a.quantidade }))
  const openEdit = (a: Asset) => { setEditItem(a); setEditData({ codigo: a.codigo, item: a.item, dataAquisicao: a.dataAquisicao, valor: a.valor, quantidade: a.quantidade }) }
  const handleSaveEdit = () => { if (editItem) { setAssets(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Patrimônio atualizado." }) } }
  const handleDeleteConfirm = () => { if (deleteId) { setAssets(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Patrimônio excluído." }) } }
  const deleteItemData = assets.find(i => i.id === deleteId)

  const handleAddNew = () => { setCurrentView('add') }
  const handleCancelAdd = () => { setCurrentView('list'); setFormData({ item: '', dataAquisicao: '', valor: '', quantidade: '', descricao: '', unidade: '' }) }

  const { handleSave, isSaving } = useSaveWithDelay()
  const handleSubmitAdd = async () => {
    await handleSave("/patrimonio", "Patrimônio salvo com sucesso!", "O registro foi adicionado ao sistema.")
    setFormData({ item: '', dataAquisicao: '', valor: '', quantidade: '', descricao: '', unidade: '' })
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
            <Button onClick={handleAddNew} className="gap-2"><Plus className="w-4 h-4" />Novo Patrimônio</Button>
            <ExportButton getData={getExportData} fileName="patrimonio" />
          </div>

          <FilterSection
            fields={[
              { type: "text", label: "Item / Código", placeholder: "Buscar...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
              { type: "date", label: "Data de Aquisição", value: filterData, onChange: setFilterData, width: "min-w-[160px]" }
            ]}
            resultsCount={filteredAssets.length}
          />

          <div className="rounded border border-border overflow-hidden">
            <Table>
              <TableHeader><TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Código</TableHead>
                <TableHead className="text-center font-semibold">Item</TableHead>
                <TableHead className="text-center font-semibold">Data de Aquisição</TableHead>
                <TableHead className="text-center font-semibold">Valor Unitário</TableHead>
                <TableHead className="text-center font-semibold">Quantidade</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filteredAssets.length === 0 ? (<TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum patrimônio encontrado.</TableCell></TableRow>) : (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-table-hover transition-colors">
                      <TableCell className="text-center">{asset.codigo}</TableCell>
                      <TableCell className="text-center font-medium">{asset.item}</TableCell>
                      <TableCell className="text-center">{asset.dataAquisicao}</TableCell>
                      <TableCell className="text-center font-semibold">{asset.valor}</TableCell>
                      <TableCell className="text-center">{asset.quantidade}</TableCell>
                      <TableCell className="text-center">
                        <TableActions onView={() => setViewItem(asset)} onEdit={() => openEdit(asset)} onDelete={() => setDeleteId(asset.id)} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>{viewItem?.item} ({viewItem?.codigo})</DialogTitle></DialogHeader>
            {viewItem && (
              <div className="space-y-2 py-2">
                <InfoRow label="Código" value={viewItem.codigo} />
                <InfoRow label="Item" value={viewItem.item} />
                <InfoRow label="Data de Aquisição" value={viewItem.dataAquisicao} />
                <InfoRow label="Valor Unitário" value={viewItem.valor} />
                <InfoRow label="Quantidade" value={viewItem.quantidade} />
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Editar Patrimônio</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2"><Label>Código</Label><Input value={editData.codigo} onChange={e => setEditData(p => ({ ...p, codigo: e.target.value }))} /></div>
              <div className="space-y-2"><Label>Item</Label><Input value={editData.item} onChange={e => setEditData(p => ({ ...p, item: e.target.value }))} /></div>
              <div className="space-y-2"><Label>Data de Aquisição</Label><Input value={editData.dataAquisicao} onChange={e => setEditData(p => ({ ...p, dataAquisicao: e.target.value }))} /></div>
              <div className="space-y-2"><Label>Valor Unitário</Label><Input value={editData.valor} onChange={e => setEditData(p => ({ ...p, valor: e.target.value }))} /></div>
              <div className="space-y-2"><Label>Quantidade</Label><Input value={editData.quantidade} onChange={e => setEditData(p => ({ ...p, quantidade: e.target.value }))} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
              <Button onClick={handleSaveEdit}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>Deseja excluir <strong>{deleteItemData?.item} ({deleteItemData?.codigo})</strong>?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center"><Landmark className="h-5 w-5 text-primary" /></div>
                <div><h2 className="text-xl font-semibold text-foreground">Dados do Patrimônio</h2><p className="text-sm text-muted-foreground">Preencha as informações abaixo</p></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Item <span className="text-destructive">*</span></Label>
                  <Select value={formData.item} onValueChange={(v) => setFormData(prev => ({ ...prev, item: v }))}>
                    <SelectTrigger className="form-input"><SelectValue placeholder="Selecione o item" /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      {itemOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-sm font-medium">Data de Aquisição <span className="text-destructive">*</span></Label><Input id="dataAquisicao" type="date" value={formData.dataAquisicao} onChange={handleInputChange} className="form-input" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label className="text-sm font-medium">Valor Unitário <span className="text-destructive">*</span></Label><Input id="valor" type="text" placeholder="Ex: 1500.00" value={formData.valor} onChange={handleInputChange} className="form-input" /></div>
                <div className="space-y-2"><Label className="text-sm font-medium">Quantidade</Label><Input id="quantidade" type="number" value={formData.quantidade} onChange={handleInputChange} className="form-input" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Unidade</Label>
                  <Select value={formData.unidade} onValueChange={(v) => setFormData(prev => ({ ...prev, unidade: v }))}>
                    <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a unidade" /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      {unidadeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Descrição</Label>
                  <Textarea value={formData.descricao} onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))} placeholder="Descrição do patrimônio" className="form-input min-h-[80px]" />
                </div>
              </div>
              <FormActionBar onSave={handleSubmitAdd} onCancel={handleCancelAdd} isSaving={isSaving} />
            </div>
          </CardContent>
        </Card>
      </SimpleFormWizard>
    )
  }

  return null
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>;
}

export default Patrimonio
