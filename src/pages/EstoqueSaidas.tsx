import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"
import { ExportButton } from "@/components/ExportButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const mockSaidas = [
  { id: 1, data: "02/06/2025", item: "Parafuso M8", setor: "Produção", requisitante: "Lucas V.", quantidade: 50, origem: "Almoxarifado SP", destino: "Setor Montagem" },
  { id: 2, data: "01/06/2025", item: "Cabo HDMI", setor: "TI", requisitante: "Ana F.", quantidade: 2, origem: "TI Central", destino: "Sala de Reuniões" },
  { id: 3, data: "30/05/2025", item: "Óleo Lubrificante", setor: "Manutenção", requisitante: "Pedro S.", quantidade: 1, origem: "Manutenção", destino: "Linha 1" },
  { id: 4, data: "28/05/2025", item: "Parafuso M8", setor: "Produção", requisitante: "Maria C.", quantidade: 100, origem: "Almoxarifado RJ", destino: "Setor Acabamento" },
]

type Saida = typeof mockSaidas[0];

export default function EstoqueSaidas() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockSaidas)
  const [filterNome, setFilterNome] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<Saida | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Saida | null>(null)
  const [editData, setEditData] = useState({ item: "", setor: "", requisitante: "", quantidade: "", origem: "", destino: "" })

  const filtered = useMemo(() => {
    return items.filter(saida => {
      const matchNome = saida.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchDataInicio = filterDataInicio ? saida.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? saida.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchNome && matchDataInicio && matchDataFim
    })
  }, [items, filterNome, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(s => ({ Data: s.data, Item: s.item, Setor: s.setor, Requisitante: s.requisitante, Quantidade: s.quantidade, Origem: s.origem, Destino: s.destino }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Saída excluída." }); } };
  const openEdit = (s: Saida) => { setEditItem(s); setEditData({ item: s.item, setor: s.setor, requisitante: s.requisitante, quantidade: String(s.quantidade), origem: s.origem, destino: s.destino }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData, quantidade: Number(editData.quantidade) } : i)); setEditItem(null); toast({ title: "Salvo", description: "Saída atualizada." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/saidas/nova")} className="gap-2"><Plus className="w-4 h-4" />Adicionar Saída</Button>
          <ExportButton getData={getExportData} fileName="estoque-saidas" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Nome do Item", placeholder: "Buscar item...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead className="text-center">Data</TableHead><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Setor</TableHead><TableHead className="text-center">Requisitante</TableHead><TableHead className="text-center">Quantidade</TableHead><TableHead className="text-center">Origem</TableHead><TableHead className="text-center">Destino</TableHead><TableHead className="text-center">Ações</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Nenhuma saída encontrada.</TableCell></TableRow>) : (
                filtered.map((saida) => (
                  <TableRow key={saida.id}>
                    <TableCell className="text-center">{saida.data}</TableCell><TableCell className="text-center">{saida.item}</TableCell><TableCell className="text-center">{saida.setor}</TableCell><TableCell className="text-center">{saida.requisitante}</TableCell><TableCell className="text-center">{saida.quantidade}</TableCell><TableCell className="text-center">{saida.origem}</TableCell><TableCell className="text-center">{saida.destino}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(saida)} onEdit={() => openEdit(saida)} onDelete={() => setDeleteId(saida.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Saída</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Data: viewItem.data, Item: viewItem.item, Setor: viewItem.setor, Requisitante: viewItem.requisitante, Quantidade: viewItem.quantidade, Origem: viewItem.origem, Destino: viewItem.destino }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Saída</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Item</Label><Input value={editData.item} onChange={e => setEditData({ ...editData, item: e.target.value })} /></div>
            <div><Label>Setor</Label><Input value={editData.setor} onChange={e => setEditData({ ...editData, setor: e.target.value })} /></div>
            <div><Label>Requisitante</Label><Input value={editData.requisitante} onChange={e => setEditData({ ...editData, requisitante: e.target.value })} /></div>
            <div><Label>Quantidade</Label><Input type="number" value={editData.quantidade} onChange={e => setEditData({ ...editData, quantidade: e.target.value })} /></div>
            <div><Label>Origem</Label><Input value={editData.origem} onChange={e => setEditData({ ...editData, origem: e.target.value })} /></div>
            <div><Label>Destino</Label><Input value={editData.destino} onChange={e => setEditData({ ...editData, destino: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir saída?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a saída "{deleteItemData?.item}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
