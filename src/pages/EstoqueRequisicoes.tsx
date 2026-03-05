import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus, FileText, ClipboardCheck, PackageCheck } from "lucide-react"
import { TableActions } from "@/components/TableActions"
import { StatusBadge } from "@/components/StatusBadge"
import { ExportButton } from "@/components/ExportButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const mockRequisicoes = [
  { id: 1, data: "12/05/2025", item: "Cabo HDMI", quantidade: 1, requisitante: "Ana F.", setor: "TI", status: "Aprovada" },
  { id: 2, data: "10/05/2025", item: "Papel A4", quantidade: 5, requisitante: "Carlos M.", setor: "Administrativo", status: "Aguardando Aprovação" },
  { id: 3, data: "08/05/2025", item: "Toner HP", quantidade: 2, requisitante: "Pedro S.", setor: "TI", status: "Entregue" },
  { id: 4, data: "05/05/2025", item: "Parafuso M8", quantidade: 50, requisitante: "Lucas V.", setor: "Produção", status: "Rejeitada" },
]

type Requisicao = typeof mockRequisicoes[0];

export default function EstoqueRequisicoes() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockRequisicoes)
  const [filterItem, setFilterItem] = useState("")
  const [filterSetor, setFilterSetor] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<Requisicao | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Requisicao | null>(null)
  const [editData, setEditData] = useState({ item: "", quantidade: "", requisitante: "", setor: "" })

  // Approval
  const [approvalItem, setApprovalItem] = useState<Requisicao | null>(null)
  const [rejectItem, setRejectItem] = useState<Requisicao | null>(null)
  const [rejectJustificativa, setRejectJustificativa] = useState("")
  const [entregarItem, setEntregarItem] = useState<Requisicao | null>(null)

  const filtered = useMemo(() => {
    return items.filter(req => {
      const matchItem = req.item.toLowerCase().includes(filterItem.toLowerCase())
      const matchSetor = filterSetor && filterSetor !== "todos" ? req.setor.toLowerCase().includes(filterSetor.toLowerCase()) : true
      const matchDataInicio = filterDataInicio ? req.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? req.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchItem && matchSetor && matchDataInicio && matchDataFim
    })
  }, [items, filterItem, filterSetor, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(r => ({ Data: r.data, Item: r.item, Quantidade: r.quantidade, Requisitante: r.requisitante, Setor: r.setor, Status: r.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Requisição excluída." }); } };
  const openEdit = (r: Requisicao) => { setEditItem(r); setEditData({ item: r.item, quantidade: String(r.quantidade), requisitante: r.requisitante, setor: r.setor }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, item: editData.item, quantidade: Number(editData.quantidade), requisitante: editData.requisitante, setor: editData.setor } : i)); setEditItem(null); toast({ title: "Salvo", description: "Requisição atualizada." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  const handleApprove = (req: Requisicao) => {
    setItems(prev => prev.map(i => i.id === req.id ? { ...i, status: "Aprovada" } : i));
    setApprovalItem(null);
    toast({ title: "Aprovada", description: `Requisição de "${req.item}" aprovada. O botão "Entregar" está agora disponível.` });
  };

  const handleReject = () => {
    if (rejectItem) {
      setItems(prev => prev.map(i => i.id === rejectItem.id ? { ...i, status: "Rejeitada" } : i));
      setRejectItem(null);
      setRejectJustificativa("");
      toast({ title: "Rejeitada", description: `Requisição de "${rejectItem.item}" foi rejeitada.` });
    }
  };

  const handleEntregar = (req: Requisicao) => {
    setItems(prev => prev.map(i => i.id === req.id ? { ...i, status: "Entregue" } : i));
    setEntregarItem(null);
    toast({ title: "Entregue", description: `Requisição de "${req.item}" entregue. Saída de estoque gerada automaticamente.` });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/requisicoes/nova")} className="gap-2"><Plus className="w-4 h-4" />Adicionar</Button>
          <Button onClick={() => navigate("/estoque/requisicoes/relatorio")} variant="outline" className="gap-2 border-border"><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="estoque-requisicoes" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Item", placeholder: "Buscar item...", value: filterItem, onChange: setFilterItem, width: "flex-1 min-w-[200px]" },
            { type: "select", label: "Setor", placeholder: "Selecione o setor", value: filterSetor, onChange: setFilterSetor, options: [{ value: "todos", label: "Todos" }, { value: "ti", label: "TI" }, { value: "producao", label: "Produção" }, { value: "administrativo", label: "Administrativo" }], width: "min-w-[180px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead className="text-center">Data</TableHead><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Quantidade</TableHead><TableHead className="text-center">Requisitante</TableHead><TableHead className="text-center">Setor</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">Aprovação</TableHead><TableHead className="text-center">Entrega</TableHead><TableHead className="text-center">Ações</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Nenhuma requisição encontrada.</TableCell></TableRow>) : (
                filtered.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="text-center">{req.data}</TableCell><TableCell className="text-center">{req.item}</TableCell><TableCell className="text-center">{req.quantidade}</TableCell><TableCell className="text-center">{req.requisitante}</TableCell><TableCell className="text-center">{req.setor}</TableCell>
                    <TableCell className="text-center"><StatusBadge status={req.status} /></TableCell>
                    <TableCell className="text-center">
                      {req.status === "Aguardando Aprovação" ? (
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setApprovalItem(req)}>
                          <ClipboardCheck className="w-3.5 h-3.5" /> Analisar
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {req.status === "Aprovada" ? (
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setEntregarItem(req)}>
                          <PackageCheck className="w-3.5 h-3.5" /> Entregar
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <TableActions onView={() => setViewItem(req)} onEdit={() => openEdit(req)} onDelete={() => setDeleteId(req.id)} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Analysis / Approval Dialog */}
      <Dialog open={!!approvalItem} onOpenChange={() => setApprovalItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Análise — Requisição</DialogTitle></DialogHeader>
          {approvalItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Item:</span><p className="font-medium">{approvalItem.item}</p></div>
                <div><span className="text-muted-foreground">Quantidade:</span><p className="font-medium">{approvalItem.quantidade}</p></div>
                <div><span className="text-muted-foreground">Requisitante:</span><p className="font-medium">{approvalItem.requisitante}</p></div>
                <div><span className="text-muted-foreground">Setor:</span><p className="font-medium">{approvalItem.setor}</p></div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setApprovalItem(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => { setRejectItem(approvalItem); setApprovalItem(null); }}>Rejeitar</Button>
            <Button onClick={() => approvalItem && handleApprove(approvalItem)}>Aprovar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectItem} onOpenChange={() => { setRejectItem(null); setRejectJustificativa(""); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rejeitar Requisição</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Informe a justificativa para rejeitar a requisição de <strong>{rejectItem?.item}</strong>.</p>
            <div className="space-y-2">
              <Label>Justificativa <span className="text-destructive">*</span></Label>
              <Textarea value={rejectJustificativa} onChange={e => setRejectJustificativa(e.target.value)} placeholder="Motivo da rejeição..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectItem(null); setRejectJustificativa(""); }}>Cancelar</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectJustificativa.trim()}>Rejeitar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Entregar Dialog */}
      <AlertDialog open={!!entregarItem} onOpenChange={() => setEntregarItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Entregar Requisição?</AlertDialogTitle>
            <AlertDialogDescription>Ao entregar a requisição de <strong>{entregarItem?.item}</strong> (Qtd: {entregarItem?.quantidade}), uma <strong>saída de estoque automática</strong> será gerada. Deseja prosseguir?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => entregarItem && handleEntregar(entregarItem)}>Entregar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Requisição</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Data: viewItem.data, Item: viewItem.item, Quantidade: viewItem.quantidade, Requisitante: viewItem.requisitante, Setor: viewItem.setor, Status: viewItem.status }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Requisição</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Item</Label><Input value={editData.item} onChange={e => setEditData({ ...editData, item: e.target.value })} /></div>
            <div><Label>Quantidade</Label><Input type="number" value={editData.quantidade} onChange={e => setEditData({ ...editData, quantidade: e.target.value })} /></div>
            <div><Label>Requisitante</Label><Input value={editData.requisitante} onChange={e => setEditData({ ...editData, requisitante: e.target.value })} /></div>
            <div><Label>Setor</Label><Input value={editData.setor} onChange={e => setEditData({ ...editData, setor: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir requisição?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a requisição "{deleteItemData?.item}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
