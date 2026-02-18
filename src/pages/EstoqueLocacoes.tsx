import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus, FileText } from "lucide-react"
import { TableActions } from "@/components/TableActions"
import { StatusBadge } from "@/components/StatusBadge"
import { ExportButton } from "@/components/ExportButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const mockLocacoes = [
  { id: 1, unidade: "Unidade A", inicio: "02/06/2025", fimPrevisto: "02/07/2025", locador: "João Silva", contrato: "CONTR-001", status: "Em Andamento" },
  { id: 2, unidade: "Unidade B", inicio: "15/05/2025", fimPrevisto: "15/08/2025", locador: "Maria Santos", contrato: "CONTR-002", status: "Em Andamento" },
  { id: 3, unidade: "Unidade C", inicio: "01/04/2025", fimPrevisto: "01/06/2025", locador: "Carlos Pereira", contrato: "CONTR-003", status: "Finalizado" },
]

type Locacao = typeof mockLocacoes[0];

export default function EstoqueLocacoes() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockLocacoes)
  const [filterLocador, setFilterLocador] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<Locacao | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Locacao | null>(null)
  const [editData, setEditData] = useState({ unidade: "", locador: "", contrato: "" })

  const filtered = useMemo(() => {
    return items.filter(loc => {
      const matchLocador = loc.locador.toLowerCase().includes(filterLocador.toLowerCase())
      const matchDataInicio = filterDataInicio ? loc.inicio >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? loc.fimPrevisto <= filterDataFim.split("-").reverse().join("/") : true
      return matchLocador && matchDataInicio && matchDataFim
    })
  }, [items, filterLocador, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(l => ({ Unidade: l.unidade, Início: l.inicio, "Fim Previsto": l.fimPrevisto, Locador: l.locador, Contrato: l.contrato, Status: l.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Locação excluída." }); } };
  const openEdit = (l: Locacao) => { setEditItem(l); setEditData({ unidade: l.unidade, locador: l.locador, contrato: l.contrato }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Locação atualizada." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/locacoes/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Locação</Button>
          <Button onClick={() => navigate("/estoque/locacoes/relatorio")} variant="outline" className="gap-2 border-border"><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="estoque-locacoes" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Locador", placeholder: "Buscar locador...", value: filterLocador, onChange: setFilterLocador, width: "flex-1 min-w-[200px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <Table>
          <TableHeader><TableRow><TableHead className="text-center">Unidade</TableHead><TableHead className="text-center">Início</TableHead><TableHead className="text-center">Fim (Previsto)</TableHead><TableHead className="text-center">Locador</TableHead><TableHead className="text-center">Contrato</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">Ações</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.length === 0 ? (<TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma locação encontrada.</TableCell></TableRow>) : (
              filtered.map((loc) => (
                <TableRow key={loc.id}>
                  <TableCell className="text-center">{loc.unidade}</TableCell><TableCell className="text-center">{loc.inicio}</TableCell><TableCell className="text-center">{loc.fimPrevisto}</TableCell><TableCell className="text-center">{loc.locador}</TableCell><TableCell className="text-center">{loc.contrato}</TableCell>
                  <TableCell className="text-center"><StatusBadge status={loc.status} /></TableCell>
                  <TableCell className="text-center"><TableActions onView={() => setViewItem(loc)} onEdit={() => openEdit(loc)} onDelete={() => setDeleteId(loc.id)} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Locação</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Unidade: viewItem.unidade, Início: viewItem.inicio, "Fim Previsto": viewItem.fimPrevisto, Locador: viewItem.locador, Contrato: viewItem.contrato, Status: viewItem.status }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Locação</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Unidade</Label><Input value={editData.unidade} onChange={e => setEditData({ ...editData, unidade: e.target.value })} /></div>
            <div><Label>Locador</Label><Input value={editData.locador} onChange={e => setEditData({ ...editData, locador: e.target.value })} /></div>
            <div><Label>Contrato</Label><Input value={editData.contrato} onChange={e => setEditData({ ...editData, contrato: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir locação?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a locação "{deleteItem?.unidade}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
