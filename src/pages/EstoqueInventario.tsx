import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"
import { ExportButton } from "@/components/ExportButton"
import { FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const mockInventario = [
  { id: 1, item: "Parafuso M8", quantidade: 250, unidade: "Almoxarifado SP" },
  { id: 2, item: "Cabo HDMI", quantidade: 8, unidade: "TI Central" },
  { id: 3, item: "Óleo Lubrificante", quantidade: 4, unidade: "Manutenção" },
  { id: 4, item: "Papel A4", quantidade: 50, unidade: "Almoxarifado SP" },
  { id: 5, item: "Toner HP", quantidade: 3, unidade: "TI Central" },
]

type Item = typeof mockInventario[0];

export default function EstoqueInventario() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockInventario)
  const [filterNome, setFilterNome] = useState("")
  const [filterCidade, setFilterCidade] = useState("")
  const [viewItem, setViewItem] = useState<Item | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [editData, setEditData] = useState({ item: "", quantidade: "", unidade: "" })

  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchNome = item.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchCidade = filterCidade && filterCidade !== "todos" ? item.unidade.toLowerCase().includes(filterCidade.toLowerCase()) : true
      return matchNome && matchCidade
    })
  }, [items, filterNome, filterCidade])

  const getExportData = () => filtered.map(i => ({ Item: i.item, Quantidade: i.quantidade, Unidade: i.unidade }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Item excluído do inventário." }); } };
  const openEdit = (i: Item) => { setEditItem(i); setEditData({ item: i.item, quantidade: String(i.quantidade), unidade: i.unidade }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, item: editData.item, quantidade: Number(editData.quantidade), unidade: editData.unidade } : i)); setEditItem(null); toast({ title: "Salvo", description: "Item atualizado." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/inventario/relatorio")} variant="outline" className="gap-2 border-border"><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="estoque-inventario" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Nome do Item", placeholder: "Buscar item...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
            { type: "select", label: "Unidade", placeholder: "Selecione...", value: filterCidade, onChange: setFilterCidade, options: [{ value: "todos", label: "Todos" }, { value: "almoxarifado-sp", label: "Almoxarifado SP" }, { value: "ti-central", label: "TI Central" }, { value: "manutencao", label: "Manutenção" }], width: "min-w-[180px]" }
          ]}
          resultsCount={filtered.length}
        />

        <Table>
          <TableHeader><TableRow><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Quantidade</TableHead><TableHead className="text-center">Unidade</TableHead><TableHead className="text-center">Ações</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.length === 0 ? (<TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Nenhum item encontrado.</TableCell></TableRow>) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.item}</TableCell><TableCell className="text-center">{item.quantidade}</TableCell><TableCell className="text-center">{item.unidade}</TableCell>
                  <TableCell className="text-center"><TableActions onView={() => setViewItem(item)} onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes do Item</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Item: viewItem.item, Quantidade: viewItem.quantidade, Unidade: viewItem.unidade }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Item</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Item</Label><Input value={editData.item} onChange={e => setEditData({ ...editData, item: e.target.value })} /></div>
            <div><Label>Quantidade</Label><Input type="number" value={editData.quantidade} onChange={e => setEditData({ ...editData, quantidade: e.target.value })} /></div>
            <div><Label>Unidade</Label><Input value={editData.unidade} onChange={e => setEditData({ ...editData, unidade: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir item?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItem?.item}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
