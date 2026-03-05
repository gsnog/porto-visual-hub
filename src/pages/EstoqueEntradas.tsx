import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Upload, ChevronDown, ChevronRight, CheckCircle, XCircle, Link2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"
import { ExportButton } from "@/components/ExportButton"
import { StatusBadge } from "@/components/StatusBadge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface ItemNF {
  id: number;
  item: string;
  marca: string;
  quantidade: number;
  custoUnitario: string;
  especificacoes: string;
  tipo: "novo" | "existente";
}

interface EntradaNF {
  id: number;
  data: string;
  responsavel: string;
  notaFiscal: string;
  fornecedor: string;
  unidade: string;
  custoTotal: string;
  status: string;
  itens: ItemNF[];
}

const mockEntradas: EntradaNF[] = [
  {
    id: 1, data: "02/06/2025", responsavel: "Lucas V.", notaFiscal: "NF-123456", fornecedor: "ABC Distribuidora", unidade: "Almoxarifado SP", custoTotal: "R$ 300,00", status: "Pré-Cadastro",
    itens: [
      { id: 1, item: "Parafuso M8", marca: "Fischer", quantidade: 100, custoUnitario: "R$ 0,50", especificacoes: "Aço inox", tipo: "novo" },
      { id: 2, item: "Parafuso M10", marca: "Fischer", quantidade: 200, custoUnitario: "R$ 1,25", especificacoes: "Aço carbono", tipo: "existente" },
    ]
  },
  {
    id: 2, data: "01/06/2025", responsavel: "Ana F.", notaFiscal: "NF-789012", fornecedor: "TechParts Ltda", unidade: "TI Central", custoTotal: "R$ 250,00", status: "Aprovada",
    itens: [
      { id: 3, item: "Cabo HDMI", marca: "StarTech", quantidade: 10, custoUnitario: "R$ 25,00", especificacoes: "2m 4K", tipo: "existente" },
    ]
  },
  {
    id: 3, data: "30/05/2025", responsavel: "Pedro S.", notaFiscal: "NF-345678", fornecedor: "Lubrificantes SA", unidade: "Manutenção", custoTotal: "R$ 225,00", status: "Pré-Cadastro",
    itens: [
      { id: 4, item: "Óleo Lubrificante", marca: "Shell", quantidade: 5, custoUnitario: "R$ 45,00", especificacoes: "10W40", tipo: "novo" },
    ]
  },
  {
    id: 4, data: "28/05/2025", responsavel: "Maria C.", notaFiscal: "NF-901234", fornecedor: "ABC Distribuidora", unidade: "Almoxarifado RJ", custoTotal: "R$ 110,00", status: "Rejeitada",
    itens: [
      { id: 5, item: "Parafuso M8", marca: "Fischer", quantidade: 200, custoUnitario: "R$ 0,55", especificacoes: "Aço inox", tipo: "existente" },
    ]
  },
]

const itensEstoqueMock = [
  { value: "parafuso-m8", label: "Parafuso M8" },
  { value: "parafuso-m10", label: "Parafuso M10" },
  { value: "cabo-hdmi", label: "Cabo HDMI" },
  { value: "oleo-lubrificante", label: "Óleo Lubrificante" },
  { value: "papel-a4", label: "Papel A4" },
]

export default function EstoqueEntradas() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockEntradas)
  const [filterNome, setFilterNome] = useState("")
  const [filterNFe, setFilterNFe] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<EntradaNF | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<EntradaNF | null>(null)
  const [editData, setEditData] = useState({ notaFiscal: "", fornecedor: "", unidade: "", responsavel: "" })
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  // Approval workflow
  const [approvalItem, setApprovalItem] = useState<EntradaNF | null>(null)
  const [rejectItem, setRejectItem] = useState<EntradaNF | null>(null)
  const [rejectJustificativa, setRejectJustificativa] = useState("")
  // Conciliation
  const [conciliateItem, setConciliateItem] = useState<{ entrada: EntradaNF; itemNF: ItemNF } | null>(null)
  const [conciliateWith, setConciliateWith] = useState("")

  const toggleRow = (id: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    return items.filter(entrada => {
      const matchNome = entrada.notaFiscal.toLowerCase().includes(filterNome.toLowerCase()) || entrada.fornecedor.toLowerCase().includes(filterNome.toLowerCase())
      const matchNFe = entrada.notaFiscal.toLowerCase().includes(filterNFe.toLowerCase())
      const matchStatus = filterStatus && filterStatus !== "todos" ? entrada.status.toLowerCase() === filterStatus.toLowerCase() : true
      const matchDataInicio = filterDataInicio ? entrada.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? entrada.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchNome && matchNFe && matchStatus && matchDataInicio && matchDataFim
    })
  }, [items, filterNome, filterNFe, filterStatus, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(e => ({ Data: e.data, Responsável: e.responsavel, "Nota Fiscal": e.notaFiscal, Fornecedor: e.fornecedor, Unidade: e.unidade, "Custo Total": e.custoTotal, Status: e.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Entrada excluída." }); } };
  const openEdit = (e: EntradaNF) => { setEditItem(e); setEditData({ notaFiscal: e.notaFiscal, fornecedor: e.fornecedor, unidade: e.unidade, responsavel: e.responsavel }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Entrada atualizada." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  const handleApprove = (entrada: EntradaNF) => {
    setItems(prev => prev.map(i => i.id === entrada.id ? { ...i, status: "Aprovada" } : i));
    setApprovalItem(null);
    toast({ title: "Aprovada", description: `Entrada ${entrada.notaFiscal} aprovada com sucesso.` });
  };

  const handleReject = () => {
    if (rejectItem) {
      setItems(prev => prev.map(i => i.id === rejectItem.id ? { ...i, status: "Rejeitada" } : i));
      setRejectItem(null);
      setRejectJustificativa("");
      toast({ title: "Rejeitada", description: `Entrada ${rejectItem.notaFiscal} foi rejeitada.` });
    }
  };

  const handleConciliate = () => {
    if (conciliateItem && conciliateWith) {
      setItems(prev => prev.map(entrada => {
        if (entrada.id === conciliateItem.entrada.id) {
          return {
            ...entrada,
            itens: entrada.itens.map(it => it.id === conciliateItem.itemNF.id ? { ...it, tipo: "existente" as const, item: itensEstoqueMock.find(i => i.value === conciliateWith)?.label || it.item } : it)
          }
        }
        return entrada
      }));
      setConciliateItem(null);
      setConciliateWith("");
      toast({ title: "Conciliado", description: "Item conciliado com estoque existente." });
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/entradas/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Entrada</Button>
          <Button onClick={() => navigate("/estoque/entradas/upload-nfe")} variant="outline" className="gap-2 border-border"><Upload className="w-4 h-4" />Upload NF-e<ChevronDown className="w-4 h-4" /></Button>
          <ExportButton getData={getExportData} fileName="estoque-entradas" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Buscar", placeholder: "NF ou fornecedor...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
            { type: "text", label: "NF-e", placeholder: "Número da NF-e...", value: filterNFe, onChange: setFilterNFe, width: "min-w-[160px]" },
            { type: "select", label: "Status", placeholder: "Todos", value: filterStatus, onChange: setFilterStatus, options: [{ value: "todos", label: "Todos" }, { value: "pré-cadastro", label: "Pré-Cadastro" }, { value: "aprovada", label: "Aprovada" }, { value: "rejeitada", label: "Rejeitada" }], width: "min-w-[160px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-12"></TableHead>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Responsável</TableHead>
                <TableHead className="text-center">Nota Fiscal</TableHead>
                <TableHead className="text-center">Fornecedor</TableHead>
                <TableHead className="text-center">Unidade</TableHead>
                <TableHead className="text-center">Custo Total</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Nenhuma entrada encontrada.</TableCell></TableRow>
              ) : (
                filtered.map((entrada) => (
                  <>
                    <TableRow key={entrada.id}>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => toggleRow(entrada.id)}>
                          {expandedRows.has(entrada.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">{entrada.data}</TableCell>
                      <TableCell className="text-center">{entrada.responsavel}</TableCell>
                      <TableCell className="text-center">{entrada.notaFiscal}</TableCell>
                      <TableCell className="text-center">{entrada.fornecedor}</TableCell>
                      <TableCell className="text-center">{entrada.unidade}</TableCell>
                      <TableCell className="text-center">{entrada.custoTotal}</TableCell>
                      <TableCell className="text-center"><StatusBadge status={entrada.status} /></TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {entrada.status === "Pré-Cadastro" && (
                            <>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-primary hover:text-primary" title="Aprovar" onClick={() => setApprovalItem(entrada)}>
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive" title="Reprovar" onClick={() => setRejectItem(entrada)}>
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <TableActions onView={() => setViewItem(entrada)} onEdit={() => openEdit(entrada)} onDelete={() => setDeleteId(entrada.id)} />
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(entrada.id) && (
                      <TableRow key={`${entrada.id}-items`}>
                        <TableCell colSpan={9} className="p-0">
                          <div className="bg-muted/30 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Itens da Nota Fiscal</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-center">Item</TableHead>
                                  <TableHead className="text-center">Marca</TableHead>
                                  <TableHead className="text-center">Quantidade</TableHead>
                                  <TableHead className="text-center">Custo Unitário</TableHead>
                                  <TableHead className="text-center">Especificações</TableHead>
                                  <TableHead className="text-center">Tipo</TableHead>
                                  {entrada.status === "Pré-Cadastro" && <TableHead className="text-center">Conciliar</TableHead>}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {entrada.itens.map(item => (
                                  <TableRow key={item.id}>
                                    <TableCell className="text-center">{item.item}</TableCell>
                                    <TableCell className="text-center">{item.marca}</TableCell>
                                    <TableCell className="text-center">{item.quantidade}</TableCell>
                                    <TableCell className="text-center">{item.custoUnitario}</TableCell>
                                    <TableCell className="text-center">{item.especificacoes}</TableCell>
                                    <TableCell className="text-center">
                                      <StatusBadge status={item.tipo === "novo" ? "Pré-Cadastro" : "Aprovada"} className="text-[10px] min-w-[70px]" />
                                    </TableCell>
                                    {entrada.status === "Pré-Cadastro" && (
                                      <TableCell className="text-center">
                                        {item.tipo === "novo" && (
                                          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-blue-600" onClick={() => setConciliateItem({ entrada, itemNF: item })}>
                                            <Link2 className="w-3 h-3" /> Conciliar
                                          </Button>
                                        )}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Approval Dialog */}
      <AlertDialog open={!!approvalItem} onOpenChange={() => setApprovalItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aprovar Entrada?</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja aprovar a entrada <strong>{approvalItem?.notaFiscal}</strong> de {approvalItem?.responsavel}? Os itens em pré-cadastro serão incorporados ao estoque.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => approvalItem && handleApprove(approvalItem)}>Aprovar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectItem} onOpenChange={() => { setRejectItem(null); setRejectJustificativa(""); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reprovar Entrada</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Informe a justificativa para reprovar a entrada <strong>{rejectItem?.notaFiscal}</strong>.</p>
            <div className="space-y-2">
              <Label>Justificativa <span className="text-destructive">*</span></Label>
              <Textarea value={rejectJustificativa} onChange={e => setRejectJustificativa(e.target.value)} placeholder="Motivo da reprovação..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectItem(null); setRejectJustificativa(""); }}>Cancelar</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectJustificativa.trim()}>Reprovar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conciliation Dialog */}
      <Dialog open={!!conciliateItem} onOpenChange={() => { setConciliateItem(null); setConciliateWith(""); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Conciliar Item</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">O item <strong>{conciliateItem?.itemNF.item}</strong> foi marcado como novo. Se já existe no estoque, selecione o item correspondente para conciliar.</p>
            <div className="space-y-2">
              <Label>Item do Estoque</Label>
              <Select value={conciliateWith} onValueChange={setConciliateWith}>
                <SelectTrigger><SelectValue placeholder="Selecione o item existente" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {itensEstoqueMock.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setConciliateItem(null); setConciliateWith(""); }}>Cancelar</Button>
            <Button onClick={handleConciliate} disabled={!conciliateWith}>Conciliar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Detalhes da Entrada</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                {Object.entries({ Data: viewItem.data, Responsável: viewItem.responsavel, "Nota Fiscal": viewItem.notaFiscal, Fornecedor: viewItem.fornecedor, Unidade: viewItem.unidade, "Custo Total": viewItem.custoTotal, Status: viewItem.status }).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Itens</p>
                <Table>
                  <TableHeader><TableRow><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Marca</TableHead><TableHead className="text-center">Qtd</TableHead><TableHead className="text-center">Custo Unit.</TableHead><TableHead className="text-center">Especificações</TableHead><TableHead className="text-center">Tipo</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {viewItem.itens.map(item => (
                      <TableRow key={item.id}><TableCell className="text-center">{item.item}</TableCell><TableCell className="text-center">{item.marca}</TableCell><TableCell className="text-center">{item.quantidade}</TableCell><TableCell className="text-center">{item.custoUnitario}</TableCell><TableCell className="text-center">{item.especificacoes}</TableCell><TableCell className="text-center"><StatusBadge status={item.tipo === "novo" ? "Pré-Cadastro" : "Aprovada"} className="text-[10px] min-w-[60px]" /></TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Entrada</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nota Fiscal</Label><Input value={editData.notaFiscal} onChange={e => setEditData({ ...editData, notaFiscal: e.target.value })} /></div>
            <div><Label>Fornecedor</Label><Input value={editData.fornecedor} onChange={e => setEditData({ ...editData, fornecedor: e.target.value })} /></div>
            <div><Label>Unidade</Label><Input value={editData.unidade} onChange={e => setEditData({ ...editData, unidade: e.target.value })} /></div>
            <div><Label>Responsável</Label><Input value={editData.responsavel} onChange={e => setEditData({ ...editData, responsavel: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir entrada?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a NF "{deleteItem?.notaFiscal}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
