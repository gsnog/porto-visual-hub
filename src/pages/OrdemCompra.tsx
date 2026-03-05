import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";
import { Plus, FileText, ClipboardCheck, RefreshCw } from "lucide-react";
import { TableActions } from "@/components/TableActions";
import { StatusBadge } from "@/components/StatusBadge";
import { ExportButton } from "@/components/ExportButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const mockOrdens = [
  { id: 1, data: "19/12/2024", dataCompra: "20/12/2024", dataEntrega: "25/12/2024", item: "Papel A4", marca: "Chamex", quantidade: 100, requisitante: "João Silva", setor: "Administrativo", status: "Aprovado" },
  { id: 2, data: "18/12/2024", dataCompra: "19/12/2024", dataEntrega: "24/12/2024", item: "Toner HP", marca: "HP Original", quantidade: 5, requisitante: "Maria Santos", setor: "TI", status: "Aguardando Aprovação" },
  { id: 3, data: "17/12/2024", dataCompra: "-", dataEntrega: "-", item: "Parafusos M8", marca: "Ciser", quantidade: 500, requisitante: "Carlos Pereira", setor: "Produção", status: "Negado" },
]

type Ordem = typeof mockOrdens[0];

export default function OrdemCompra() {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockOrdens);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterData, setFilterData] = useState("");
  const [filterItem, setFilterItem] = useState("");
  const [viewItem, setViewItem] = useState<Ordem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Ordem | null>(null);
  const [editData, setEditData] = useState({ item: "", marca: "", quantidade: "", requisitante: "", setor: "" });

  // Approval
  const [approvalItem, setApprovalItem] = useState<Ordem | null>(null);
  const [rejectItem, setRejectItem] = useState<Ordem | null>(null);
  const [rejectJustificativa, setRejectJustificativa] = useState("");

  const filtered = useMemo(() => {
    return items.filter(ordem => {
      const matchStatus = filterStatus && filterStatus !== "todos" ? ordem.status.toLowerCase() === filterStatus : true
      const matchData = filterData ? ordem.data.includes(filterData.split("-").reverse().join("/")) : true
      const matchItem = ordem.item.toLowerCase().includes(filterItem.toLowerCase())
      return matchStatus && matchData && matchItem
    })
  }, [items, filterStatus, filterData, filterItem])

  const getExportData = () => filtered.map(o => ({ ID: o.id, Data: o.data, "Data Compra": o.dataCompra, "Data Entrega": o.dataEntrega, Item: o.item, Marca: o.marca, Qtd: o.quantidade, Requisitante: o.requisitante, Setor: o.setor, Status: o.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Ordem de compra excluída." }); } };
  const openEdit = (o: Ordem) => { setEditItem(o); setEditData({ item: o.item, marca: o.marca, quantidade: String(o.quantidade), requisitante: o.requisitante, setor: o.setor }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData, quantidade: Number(editData.quantidade) } : i)); setEditItem(null); toast({ title: "Salvo", description: "Ordem atualizada." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  const handleApprove = (ordem: Ordem) => {
    setItems(prev => prev.map(i => i.id === ordem.id ? { ...i, status: "Aprovado" } : i));
    setApprovalItem(null);
    toast({ title: "Aprovada", description: `Ordem de compra "${ordem.item}" aprovada.` });
  };

  const handleReject = () => {
    if (rejectItem) {
      setItems(prev => prev.map(i => i.id === rejectItem.id ? { ...i, status: "Negado" } : i));
      setRejectItem(null);
      setRejectJustificativa("");
      toast({ title: "Negada", description: `Ordem de compra "${rejectItem.item}" foi negada.` });
    }
  };

  const handlePedirNovamente = (ordem: Ordem) => {
    const novaOrdem = { ...ordem, id: Date.now(), status: "Aguardando Aprovação", data: new Date().toLocaleDateString("pt-BR"), dataCompra: "-", dataEntrega: "-" };
    setItems(prev => [...prev, novaOrdem]);
    toast({ title: "Novo pedido criado", description: `Nova ordem baseada em "${ordem.item}" criada para aprovação.` });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2" onClick={() => navigate("/estoque/ordem-compra/nova")}><Plus className="w-4 h-4" />Nova Ordem</Button>
          <Button variant="outline" className="gap-2 border-border" onClick={() => navigate("/estoque/ordem-compra/relatorio")}><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="ordem-compra" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Item", placeholder: "Buscar item...", value: filterItem, onChange: setFilterItem, width: "flex-1 min-w-[200px]" },
            { type: "select", label: "Status", placeholder: "Selecione...", value: filterStatus, onChange: setFilterStatus, options: [{ value: "todos", label: "Todos" }, { value: "aguardando aprovação", label: "Aguardando Aprovação" }, { value: "aprovado", label: "Aprovado" }, { value: "negado", label: "Negado" }], width: "min-w-[180px]" },
            { type: "date", label: "Data", value: filterData, onChange: setFilterData, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead className="text-center">ID</TableHead><TableHead className="text-center">Data</TableHead><TableHead className="text-center">Data Compra</TableHead><TableHead className="text-center">Data Entrega</TableHead><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Marca</TableHead><TableHead className="text-center">Qtd</TableHead><TableHead className="text-center">Requisitante</TableHead><TableHead className="text-center">Setor</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">Aprovação</TableHead><TableHead className="text-center">Repetir Pedido</TableHead><TableHead className="text-center">Ações</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={13} className="text-center py-8 text-muted-foreground">Nenhuma ordem encontrada.</TableCell></TableRow>) : (
                filtered.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="text-center">{ordem.id}</TableCell><TableCell className="text-center">{ordem.data}</TableCell><TableCell className="text-center">{ordem.dataCompra}</TableCell><TableCell className="text-center">{ordem.dataEntrega}</TableCell><TableCell className="text-center">{ordem.item}</TableCell><TableCell className="text-center">{ordem.marca}</TableCell><TableCell className="text-center">{ordem.quantidade}</TableCell><TableCell className="text-center">{ordem.requisitante}</TableCell><TableCell className="text-center">{ordem.setor}</TableCell>
                    <TableCell className="text-center"><StatusBadge status={ordem.status} /></TableCell>
                    <TableCell className="text-center">
                      {ordem.status === "Aguardando Aprovação" ? (
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setApprovalItem(ordem)}>
                          <ClipboardCheck className="w-3.5 h-3.5" /> Analisar
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => handlePedirNovamente(ordem)}>
                        <RefreshCw className="w-3.5 h-3.5" /> Repetir
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <TableActions onView={() => setViewItem(ordem)} onEdit={() => openEdit(ordem)} onDelete={() => setDeleteId(ordem.id)} />
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
          <DialogHeader><DialogTitle>Análise — Ordem de Compra</DialogTitle></DialogHeader>
          {approvalItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Item:</span><p className="font-medium">{approvalItem.item}</p></div>
                <div><span className="text-muted-foreground">Marca:</span><p className="font-medium">{approvalItem.marca}</p></div>
                <div><span className="text-muted-foreground">Quantidade:</span><p className="font-medium">{approvalItem.quantidade}</p></div>
                <div><span className="text-muted-foreground">Requisitante:</span><p className="font-medium">{approvalItem.requisitante}</p></div>
                <div><span className="text-muted-foreground">Setor:</span><p className="font-medium">{approvalItem.setor}</p></div>
                <div><span className="text-muted-foreground">Data:</span><p className="font-medium">{approvalItem.data}</p></div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setApprovalItem(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => { setRejectItem(approvalItem); setApprovalItem(null); }}>Negar</Button>
            <Button onClick={() => approvalItem && handleApprove(approvalItem)}>Aprovar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectItem} onOpenChange={() => { setRejectItem(null); setRejectJustificativa(""); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Negar Ordem de Compra</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Informe a justificativa para negar a ordem de <strong>{rejectItem?.item}</strong>.</p>
            <div className="space-y-2">
              <Label>Justificativa <span className="text-destructive">*</span></Label>
              <Textarea value={rejectJustificativa} onChange={e => setRejectJustificativa(e.target.value)} placeholder="Motivo da negação..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectItem(null); setRejectJustificativa(""); }}>Cancelar</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectJustificativa.trim()}>Negar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Ordem de Compra</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ ID: viewItem.id, Data: viewItem.data, "Data Compra": viewItem.dataCompra, "Data Entrega": viewItem.dataEntrega, Item: viewItem.item, Marca: viewItem.marca, Quantidade: viewItem.quantidade, Requisitante: viewItem.requisitante, Setor: viewItem.setor, Status: viewItem.status }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Ordem de Compra</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Item</Label><Input value={editData.item} onChange={e => setEditData({ ...editData, item: e.target.value })} /></div>
            <div><Label>Marca</Label><Input value={editData.marca} onChange={e => setEditData({ ...editData, marca: e.target.value })} /></div>
            <div><Label>Quantidade</Label><Input type="number" value={editData.quantidade} onChange={e => setEditData({ ...editData, quantidade: e.target.value })} /></div>
            <div><Label>Requisitante</Label><Input value={editData.requisitante} onChange={e => setEditData({ ...editData, requisitante: e.target.value })} /></div>
            <div><Label>Setor</Label><Input value={editData.setor} onChange={e => setEditData({ ...editData, setor: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir ordem?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a ordem "{deleteItemData?.item}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
