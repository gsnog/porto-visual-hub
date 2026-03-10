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

interface RequisicaoItem {
  id: number;
  item: string;
  quantidade: number;
  quantidadeAprovada?: number;
}

interface Requisicao {
  id: number;
  data: string;
  requisitante: string;
  unidade: string;
  setor: string;
  status: string;
  itens: RequisicaoItem[];
}

const mockRequisicoes: Requisicao[] = [
  { id: 1, data: "12/05/2025", requisitante: "Ana F.", unidade: "DLC Diagnósticos", setor: "TI", status: "Aprovada", itens: [{ id: 1, item: "Cabo HDMI", quantidade: 1 }] },
  { id: 2, data: "10/05/2025", requisitante: "Carlos M.", unidade: "Almoxarifado SP", setor: "Administrativo", status: "Aguardando Aprovação", itens: [{ id: 2, item: "Papel A4", quantidade: 5 }, { id: 3, item: "Toner HP", quantidade: 2 }] },
  { id: 3, data: "08/05/2025", requisitante: "Pedro S.", unidade: "TI Central", setor: "TI", status: "Entregue", itens: [{ id: 4, item: "Toner HP", quantidade: 2 }] },
  { id: 4, data: "05/05/2025", requisitante: "Lucas V.", unidade: "Depósito RJ", setor: "Produção", status: "Rejeitada", itens: [{ id: 5, item: "Parafuso M8", quantidade: 50 }] },
];

export default function EstoqueRequisicoes() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Requisicao[]>(mockRequisicoes)
  const [filterItem, setFilterItem] = useState("")
  const [filterSetor, setFilterSetor] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<Requisicao | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Requisicao | null>(null)
  const [editData, setEditData] = useState({ requisitante: "", setor: "" })

  // Approval
  const [approvalItem, setApprovalItem] = useState<Requisicao | null>(null)
  const [approvalQuantities, setApprovalQuantities] = useState<Record<number, string>>({})
  const [rejectItem, setRejectItem] = useState<Requisicao | null>(null)
  const [rejectJustificativa, setRejectJustificativa] = useState("")
  const [entregarItem, setEntregarItem] = useState<Requisicao | null>(null)

  const filtered = useMemo(() => {
    return items.filter(req => {
      const matchItem = req.itens.some(i => i.item.toLowerCase().includes(filterItem.toLowerCase())) || req.requisitante.toLowerCase().includes(filterItem.toLowerCase())
      const matchSetor = filterSetor && filterSetor !== "todos" ? req.setor.toLowerCase().includes(filterSetor.toLowerCase()) : true
      const matchDataInicio = filterDataInicio ? req.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? req.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchItem && matchSetor && matchDataInicio && matchDataFim
    })
  }, [items, filterItem, filterSetor, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(r => ({ Data: r.data, Itens: r.itens.map(i => i.item).join(", "), Requisitante: r.requisitante, Setor: r.setor, Status: r.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Requisição excluída." }); } };
  const openEdit = (r: Requisicao) => { setEditItem(r); setEditData({ requisitante: r.requisitante, setor: r.setor }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, requisitante: editData.requisitante, setor: editData.setor } : i)); setEditItem(null); toast({ title: "Salvo", description: "Pedido atualizado." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  const openApproval = (req: Requisicao) => {
    setApprovalItem(req);
    // Pre-fill quantities with requested amounts
    const quantities: Record<number, string> = {};
    req.itens.forEach(it => { quantities[it.id] = String(it.quantidade); });
    setApprovalQuantities(quantities);
  };

  const handleApprove = () => {
    if (!approvalItem) return;
    // Validate quantities
    for (const it of approvalItem.itens) {
      const qty = approvalQuantities[it.id];
      if (!qty || isNaN(Number(qty)) || Number(qty) < 0) {
        toast({ title: "Quantidade inválida", description: `Informe a quantidade aprovada para "${it.item}".`, variant: "destructive" });
        return;
      }
    }
    setItems(prev => prev.map(i => i.id === approvalItem.id ? {
      ...i,
      status: "Aprovada",
      itens: i.itens.map(it => ({ ...it, quantidadeAprovada: Number(approvalQuantities[it.id]) || 0 }))
    } : i));
    setApprovalItem(null);
    setApprovalQuantities({});
    toast({ title: "Aprovado", description: `Pedido interno aprovado. O botão "Entregar" está agora disponível.` });
  };

  const handleReject = () => {
    if (rejectItem) {
      setItems(prev => prev.map(i => i.id === rejectItem.id ? { ...i, status: "Rejeitada" } : i));
      setRejectItem(null);
      setRejectJustificativa("");
      toast({ title: "Rejeitada", description: `Pedido interno rejeitado.` });
    }
  };

  const handleEntregar = (req: Requisicao) => {
    setItems(prev => prev.map(i => i.id === req.id ? { ...i, status: "Entregue" } : i));
    setEntregarItem(null);
    toast({ title: "Entregue", description: `Pedido entregue. Saída de estoque gerada automaticamente.` });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/pedidos-internos/nova")} className="gap-2"><Plus className="w-4 h-4" />Adicionar</Button>
          <Button onClick={() => navigate("/estoque/pedidos-internos/relatorio")} variant="outline" className="gap-2 border-border"><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="estoque-pedidos-internos" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Buscar", placeholder: "Buscar item ou requisitante...", value: filterItem, onChange: setFilterItem, width: "flex-1 min-w-[200px]" },
            { type: "select", label: "Setor", placeholder: "Selecione o setor", value: filterSetor, onChange: setFilterSetor, options: [{ value: "todos", label: "Todos" }, { value: "ti", label: "TI" }, { value: "producao", label: "Produção" }, { value: "administrativo", label: "Administrativo" }], width: "min-w-[180px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Itens</TableHead>
              <TableHead className="text-center">Requisitante</TableHead>
              <TableHead className="text-center">Setor</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Aprovação</TableHead>
              <TableHead className="text-center">Entrega</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Nenhum pedido encontrado.</TableCell></TableRow>) : (
                filtered.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="text-center">{req.data}</TableCell>
                    <TableCell className="text-center">{req.itens.map(i => i.item).join(", ")}</TableCell>
                    <TableCell className="text-center">{req.requisitante}</TableCell>
                    <TableCell className="text-center">{req.setor}</TableCell>
                    <TableCell className="text-center"><StatusBadge status={req.status} /></TableCell>
                    <TableCell className="text-center">
                      {req.status === "Aguardando Aprovação" ? (
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => openApproval(req)}>
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

      {/* Approval Dialog - with details and quantity approved */}
      <Dialog open={!!approvalItem} onOpenChange={() => { setApprovalItem(null); setApprovalQuantities({}); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Aprovar Pedido Interno</DialogTitle></DialogHeader>
          {approvalItem && (
            <div className="space-y-5">
              <div className="border border-border rounded-lg p-4 space-y-3">
                <p className="text-sm font-semibold text-foreground">Detalhes do Pedido</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="font-semibold">Requisitante:</span> {approvalItem.requisitante}</div>
                  <div><span className="font-semibold">Unidade:</span> {approvalItem.unidade}</div>
                  <div><span className="font-semibold">Setor:</span> {approvalItem.setor}</div>
                  <div><span className="font-semibold">Data do Pedido:</span> {approvalItem.data}</div>
                  <div><span className="font-semibold">Status Atual:</span> Análise</div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3">Itens do Pedido</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Item</TableHead>
                      <TableHead className="text-center">Quantidade Requisitada</TableHead>
                      <TableHead className="text-center">Quantidade Aprovada</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalItem.itens.map(it => (
                      <TableRow key={it.id}>
                        <TableCell className="text-center font-medium">{it.item}</TableCell>
                        <TableCell className="text-center">{it.quantidade}</TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            min="0"
                            max={it.quantidade}
                            value={approvalQuantities[it.id] || ""}
                            onChange={(e) => setApprovalQuantities(prev => ({ ...prev, [it.id]: e.target.value }))}
                            className="form-input w-24 mx-auto text-center"
                            placeholder="Qtd"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <DialogFooter className="gap-2 pt-2">
                <Button variant="outline" onClick={() => { setRejectItem(approvalItem); setApprovalItem(null); setApprovalQuantities({}); }}>Rejeitar</Button>
                <Button variant="outline" onClick={() => { setApprovalItem(null); setApprovalQuantities({}); }}>Cancelar</Button>
                <Button onClick={handleApprove}>Aprovar Pedido</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectItem} onOpenChange={() => { setRejectItem(null); setRejectJustificativa(""); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rejeitar Pedido Interno</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Informe a justificativa para rejeitar o pedido de <strong>{rejectItem?.requisitante}</strong>.</p>
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
          <AlertDialogHeader><AlertDialogTitle>Entregar Pedido Interno?</AlertDialogTitle>
            <AlertDialogDescription>Ao entregar o pedido de <strong>{entregarItem?.requisitante}</strong>, uma <strong>saída de estoque automática</strong> será gerada. Deseja prosseguir?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => entregarItem && handleEntregar(entregarItem)}>Entregar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Detalhes do Pedido Interno</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-border"><span className="text-muted-foreground">Data</span><span className="font-medium">{viewItem.data}</span></div>
                <div className="flex justify-between py-1 border-b border-border"><span className="text-muted-foreground">Requisitante</span><span className="font-medium">{viewItem.requisitante}</span></div>
                <div className="flex justify-between py-1 border-b border-border"><span className="text-muted-foreground">Unidade</span><span className="font-medium">{viewItem.unidade}</span></div>
                <div className="flex justify-between py-1 border-b border-border"><span className="text-muted-foreground">Setor</span><span className="font-medium">{viewItem.setor}</span></div>
                <div className="flex justify-between py-1 border-b border-border"><span className="text-muted-foreground">Status</span><StatusBadge status={viewItem.status} /></div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Itens</p>
                <Table>
                  <TableHeader><TableRow>
                    <TableHead className="text-center">Item</TableHead>
                    <TableHead className="text-center">Qtd Requisitada</TableHead>
                    <TableHead className="text-center">Qtd Aprovada</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {viewItem.itens.map(it => (
                      <TableRow key={it.id}>
                        <TableCell className="text-center">{it.item}</TableCell>
                        <TableCell className="text-center">{it.quantidade}</TableCell>
                        <TableCell className="text-center">{it.quantidadeAprovada !== undefined ? it.quantidadeAprovada : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Pedido Interno</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Requisitante</Label><Input value={editData.requisitante} onChange={e => setEditData({ ...editData, requisitante: e.target.value })} /></div>
            <div><Label>Setor</Label><Input value={editData.setor} onChange={e => setEditData({ ...editData, setor: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir pedido?</AlertDialogTitle><AlertDialogDescription>Deseja excluir o pedido de "{deleteItemData?.requisitante}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
