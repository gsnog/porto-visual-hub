import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, ChevronDown, ChevronRight } from "lucide-react"
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

interface ItemNF {
  id: number;
  item: string;
  marca: string;
  quantidade: number;
  especificacoes: string;
}

interface SaidaNF {
  id: number;
  data: string;
  setorDestino: string;
  estoqueOrigem: string;
  criadoPor: string;
  itens: ItemNF[];
}

const mockSaidas: SaidaNF[] = [
  {
    id: 1, data: "02/06/2025", setorDestino: "Produção", estoqueOrigem: "Almoxarifado SP", criadoPor: "Lucas V.",
    itens: [
      { id: 1, item: "Parafuso M8", marca: "Fischer", quantidade: 50, especificacoes: "Aço inox" },
      { id: 2, item: "Porca M8", marca: "Fischer", quantidade: 50, especificacoes: "Aço inox" },
    ]
  },
  {
    id: 2, data: "01/06/2025", setorDestino: "TI", estoqueOrigem: "TI Central", criadoPor: "Ana F.",
    itens: [
      { id: 3, item: "Cabo HDMI", marca: "StarTech", quantidade: 2, especificacoes: "2m 4K" },
    ]
  },
  {
    id: 3, data: "30/05/2025", setorDestino: "Manutenção", estoqueOrigem: "Manutenção", criadoPor: "Pedro S.",
    itens: [
      { id: 4, item: "Óleo Lubrificante", marca: "Shell", quantidade: 1, especificacoes: "10W40" },
    ]
  },
  {
    id: 4, data: "28/05/2025", setorDestino: "Produção", estoqueOrigem: "Almoxarifado RJ", criadoPor: "Maria C.",
    itens: [
      { id: 5, item: "Parafuso M8", marca: "Fischer", quantidade: 100, especificacoes: "Aço inox" },
    ]
  },
]

export default function EstoqueSaidas() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockSaidas)
  const [filterNome, setFilterNome] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<SaidaNF | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<SaidaNF | null>(null)
  const [editData, setEditData] = useState({ setorDestino: "", estoqueOrigem: "", criadoPor: "" })
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (id: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    return items.filter(saida => {
      const matchNome = saida.setorDestino.toLowerCase().includes(filterNome.toLowerCase()) || saida.estoqueOrigem.toLowerCase().includes(filterNome.toLowerCase())
      const matchDataInicio = filterDataInicio ? saida.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? saida.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchNome && matchDataInicio && matchDataFim
    })
  }, [items, filterNome, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(s => ({ Data: s.data, "Setor Destino": s.setorDestino, "Estoque Origem": s.estoqueOrigem, "Criado Por": s.criadoPor }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Saída excluída." }); } };
  const openEdit = (s: SaidaNF) => { setEditItem(s); setEditData({ setorDestino: s.setorDestino, estoqueOrigem: s.estoqueOrigem, criadoPor: s.criadoPor }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Saída atualizada." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/saidas/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Saída</Button>
          <ExportButton getData={getExportData} fileName="estoque-saidas" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Buscar", placeholder: "Setor ou estoque...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
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
                <TableHead className="text-center">Setor Destino</TableHead>
                <TableHead className="text-center">Estoque Origem</TableHead>
                <TableHead className="text-center">Criado Por</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhuma saída encontrada.</TableCell></TableRow>
              ) : (
                filtered.map((saida) => (
                  <>
                    <TableRow key={saida.id}>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => toggleRow(saida.id)}>
                          {expandedRows.has(saida.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">{saida.data}</TableCell>
                      <TableCell className="text-center">{saida.setorDestino}</TableCell>
                      <TableCell className="text-center">{saida.estoqueOrigem}</TableCell>
                      <TableCell className="text-center">{saida.criadoPor}</TableCell>
                      <TableCell className="text-center">
                        <TableActions onView={() => setViewItem(saida)} onEdit={() => openEdit(saida)} onDelete={() => setDeleteId(saida.id)} />
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(saida.id) && (
                      <TableRow key={`${saida.id}-items`}>
                        <TableCell colSpan={6} className="p-0">
                          <div className="bg-muted/30 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Itens da Saída</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-center">Item</TableHead>
                                  <TableHead className="text-center">Marca</TableHead>
                                  <TableHead className="text-center">Quantidade</TableHead>
                                  <TableHead className="text-center">Especificações</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {saida.itens.map(item => (
                                  <TableRow key={item.id}>
                                    <TableCell className="text-center">{item.item}</TableCell>
                                    <TableCell className="text-center">{item.marca}</TableCell>
                                    <TableCell className="text-center">{item.quantidade}</TableCell>
                                    <TableCell className="text-center">{item.especificacoes}</TableCell>
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

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Detalhes da Saída</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                {Object.entries({ Data: viewItem.data, "Setor Destino": viewItem.setorDestino, "Estoque Origem": viewItem.estoqueOrigem, "Criado Por": viewItem.criadoPor }).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Itens</p>
                <Table>
                  <TableHeader><TableRow><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Marca</TableHead><TableHead className="text-center">Qtd</TableHead><TableHead className="text-center">Especificações</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {viewItem.itens.map(item => (
                      <TableRow key={item.id}><TableCell className="text-center">{item.item}</TableCell><TableCell className="text-center">{item.marca}</TableCell><TableCell className="text-center">{item.quantidade}</TableCell><TableCell className="text-center">{item.especificacoes}</TableCell></TableRow>
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
        <DialogContent><DialogHeader><DialogTitle>Editar Saída</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Setor Destino</Label><Input value={editData.setorDestino} onChange={e => setEditData({ ...editData, setorDestino: e.target.value })} /></div>
            <div><Label>Estoque Origem</Label><Input value={editData.estoqueOrigem} onChange={e => setEditData({ ...editData, estoqueOrigem: e.target.value })} /></div>
            <div><Label>Criado Por</Label><Input value={editData.criadoPor} onChange={e => setEditData({ ...editData, criadoPor: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir saída?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a saída de "{deleteItemData?.setorDestino}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
