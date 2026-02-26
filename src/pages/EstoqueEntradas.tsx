import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Upload, ChevronDown, ChevronRight } from "lucide-react"
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
  custoUnitario: string;
  especificacoes: string;
}

interface EntradaNF {
  id: number;
  data: string;
  responsavel: string;
  notaFiscal: string;
  fornecedor: string;
  unidade: string;
  custoTotal: string;
  itens: ItemNF[];
}

const mockEntradas: EntradaNF[] = [
  {
    id: 1, data: "02/06/2025", responsavel: "Lucas V.", notaFiscal: "NF-123456", fornecedor: "ABC Distribuidora", unidade: "Almoxarifado SP", custoTotal: "R$ 300,00",
    itens: [
      { id: 1, item: "Parafuso M8", marca: "Fischer", quantidade: 100, custoUnitario: "R$ 0,50", especificacoes: "Aço inox" },
      { id: 2, item: "Parafuso M10", marca: "Fischer", quantidade: 200, custoUnitario: "R$ 1,25", especificacoes: "Aço carbono" },
    ]
  },
  {
    id: 2, data: "01/06/2025", responsavel: "Ana F.", notaFiscal: "NF-789012", fornecedor: "TechParts Ltda", unidade: "TI Central", custoTotal: "R$ 250,00",
    itens: [
      { id: 3, item: "Cabo HDMI", marca: "StarTech", quantidade: 10, custoUnitario: "R$ 25,00", especificacoes: "2m 4K" },
    ]
  },
  {
    id: 3, data: "30/05/2025", responsavel: "Pedro S.", notaFiscal: "NF-345678", fornecedor: "Lubrificantes SA", unidade: "Manutenção", custoTotal: "R$ 225,00",
    itens: [
      { id: 4, item: "Óleo Lubrificante", marca: "Shell", quantidade: 5, custoUnitario: "R$ 45,00", especificacoes: "10W40" },
    ]
  },
  {
    id: 4, data: "28/05/2025", responsavel: "Maria C.", notaFiscal: "NF-901234", fornecedor: "ABC Distribuidora", unidade: "Almoxarifado RJ", custoTotal: "R$ 110,00",
    itens: [
      { id: 5, item: "Parafuso M8", marca: "Fischer", quantidade: 200, custoUnitario: "R$ 0,55", especificacoes: "Aço inox" },
    ]
  },
]

export default function EstoqueEntradas() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockEntradas)
  const [filterNome, setFilterNome] = useState("")
  const [filterNFe, setFilterNFe] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<EntradaNF | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<EntradaNF | null>(null)
  const [editData, setEditData] = useState({ notaFiscal: "", fornecedor: "", unidade: "", responsavel: "" })
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
    return items.filter(entrada => {
      const matchNome = entrada.notaFiscal.toLowerCase().includes(filterNome.toLowerCase()) || entrada.fornecedor.toLowerCase().includes(filterNome.toLowerCase())
      const matchNFe = entrada.notaFiscal.toLowerCase().includes(filterNFe.toLowerCase())
      const matchDataInicio = filterDataInicio ? entrada.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? entrada.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchNome && matchNFe && matchDataInicio && matchDataFim
    })
  }, [items, filterNome, filterNFe, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(e => ({ Data: e.data, Responsável: e.responsavel, "Nota Fiscal": e.notaFiscal, Fornecedor: e.fornecedor, Unidade: e.unidade, "Custo Total": e.custoTotal }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Entrada excluída." }); } };
  const openEdit = (e: EntradaNF) => { setEditItem(e); setEditData({ notaFiscal: e.notaFiscal, fornecedor: e.fornecedor, unidade: e.unidade, responsavel: e.responsavel }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Entrada atualizada." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

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
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Nenhuma entrada encontrada.</TableCell></TableRow>
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
                      <TableCell className="text-center">
                        <TableActions onView={() => setViewItem(entrada)} onEdit={() => openEdit(entrada)} onDelete={() => setDeleteId(entrada.id)} />
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(entrada.id) && (
                      <TableRow key={`${entrada.id}-items`}>
                        <TableCell colSpan={8} className="p-0">
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
          <DialogHeader><DialogTitle>Detalhes da Entrada</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                {Object.entries({ Data: viewItem.data, Responsável: viewItem.responsavel, "Nota Fiscal": viewItem.notaFiscal, Fornecedor: viewItem.fornecedor, Unidade: viewItem.unidade, "Custo Total": viewItem.custoTotal }).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Itens</p>
                <Table>
                  <TableHeader><TableRow><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Marca</TableHead><TableHead className="text-center">Qtd</TableHead><TableHead className="text-center">Custo Unit.</TableHead><TableHead className="text-center">Especificações</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {viewItem.itens.map(item => (
                      <TableRow key={item.id}><TableCell className="text-center">{item.item}</TableCell><TableCell className="text-center">{item.marca}</TableCell><TableCell className="text-center">{item.quantidade}</TableCell><TableCell className="text-center">{item.custoUnitario}</TableCell><TableCell className="text-center">{item.especificacoes}</TableCell></TableRow>
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
