import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Upload, ChevronDown } from "lucide-react"
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

const mockEntradas = [
  { id: 1, data: "02/06/2025", item: "Parafuso M8", validade: "05/06/2025", notaFiscal: "123456", estoqueDestinado: "Almoxarifado SP", custoUnitario: "R$ 0,50", quantidade: 100, custoTotal: "R$ 50,00" },
  { id: 2, data: "01/06/2025", item: "Cabo HDMI", validade: "01/06/2027", notaFiscal: "789012", estoqueDestinado: "TI Central", custoUnitario: "R$ 25,00", quantidade: 10, custoTotal: "R$ 250,00" },
  { id: 3, data: "30/05/2025", item: "Óleo Lubrificante", validade: "30/05/2026", notaFiscal: "345678", estoqueDestinado: "Manutenção", custoUnitario: "R$ 45,00", quantidade: 5, custoTotal: "R$ 225,00" },
  { id: 4, data: "28/05/2025", item: "Parafuso M8", validade: "28/05/2026", notaFiscal: "901234", estoqueDestinado: "Almoxarifado RJ", custoUnitario: "R$ 0,55", quantidade: 200, custoTotal: "R$ 110,00" },
]

type Entrada = typeof mockEntradas[0];

export default function EstoqueEntradas() {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockEntradas)
  const [filterNome, setFilterNome] = useState("")
  const [filterNFe, setFilterNFe] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<Entrada | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Entrada | null>(null)
  const [editData, setEditData] = useState({ item: "", notaFiscal: "", estoqueDestinado: "", custoUnitario: "", quantidade: "" })

  const filtered = useMemo(() => {
    return items.filter(entrada => {
      const matchNome = entrada.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchNFe = entrada.notaFiscal.toLowerCase().includes(filterNFe.toLowerCase())
      const matchDataInicio = filterDataInicio ? entrada.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? entrada.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchNome && matchNFe && matchDataInicio && matchDataFim
    })
  }, [items, filterNome, filterNFe, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(e => ({ Data: e.data, Item: e.item, Validade: e.validade, "Nota Fiscal": e.notaFiscal, "Estoque Destinado": e.estoqueDestinado, "Custo Unitário": e.custoUnitario, Quantidade: e.quantidade, "Custo Total": e.custoTotal }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Entrada excluída." }); } };
  const openEdit = (e: Entrada) => { setEditItem(e); setEditData({ item: e.item, notaFiscal: e.notaFiscal, estoqueDestinado: e.estoqueDestinado, custoUnitario: e.custoUnitario, quantidade: String(e.quantidade) }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData, quantidade: Number(editData.quantidade) } : i)); setEditItem(null); toast({ title: "Salvo", description: "Entrada atualizada." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/entradas/nova")} className="gap-2"><Plus className="w-4 h-4" />Novo Item</Button>
          <Button onClick={() => navigate("/estoque/entradas/upload-nfe")} variant="outline" className="gap-2 border-border"><Upload className="w-4 h-4" />Upload NF-e<ChevronDown className="w-4 h-4" /></Button>
          <ExportButton getData={getExportData} fileName="estoque-entradas" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Nome do Item", placeholder: "Buscar item...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
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
                <TableHead className="text-center">Data</TableHead><TableHead className="text-center">Item</TableHead><TableHead className="text-center">Validade</TableHead><TableHead className="text-center">Nota Fiscal</TableHead><TableHead className="text-center">Estoque Destinado</TableHead><TableHead className="text-center">Custo Unitário</TableHead><TableHead className="text-center">Quantidade</TableHead><TableHead className="text-center">Custo Total</TableHead><TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Nenhuma entrada encontrada.</TableCell></TableRow>
              ) : (
                filtered.map((entrada) => (
                  <TableRow key={entrada.id}>
                    <TableCell className="text-center">{entrada.data}</TableCell><TableCell className="text-center">{entrada.item}</TableCell><TableCell className="text-center">{entrada.validade}</TableCell><TableCell className="text-center">{entrada.notaFiscal}</TableCell><TableCell className="text-center">{entrada.estoqueDestinado}</TableCell><TableCell className="text-center">{entrada.custoUnitario}</TableCell><TableCell className="text-center">{entrada.quantidade}</TableCell><TableCell className="text-center">{entrada.custoTotal}</TableCell>
                    <TableCell className="text-center">
                      <TableActions onView={() => setViewItem(entrada)} onEdit={() => openEdit(entrada)} onDelete={() => setDeleteId(entrada.id)} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Entrada</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Data: viewItem.data, Item: viewItem.item, Validade: viewItem.validade, "Nota Fiscal": viewItem.notaFiscal, "Estoque Destinado": viewItem.estoqueDestinado, "Custo Unitário": viewItem.custoUnitario, Quantidade: viewItem.quantidade, "Custo Total": viewItem.custoTotal }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Entrada</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Item</Label><Input value={editData.item} onChange={e => setEditData({ ...editData, item: e.target.value })} /></div>
            <div><Label>Nota Fiscal</Label><Input value={editData.notaFiscal} onChange={e => setEditData({ ...editData, notaFiscal: e.target.value })} /></div>
            <div><Label>Estoque Destinado</Label><Input value={editData.estoqueDestinado} onChange={e => setEditData({ ...editData, estoqueDestinado: e.target.value })} /></div>
            <div><Label>Custo Unitário</Label><Input value={editData.custoUnitario} onChange={e => setEditData({ ...editData, custoUnitario: e.target.value })} /></div>
            <div><Label>Quantidade</Label><Input type="number" value={editData.quantidade} onChange={e => setEditData({ ...editData, quantidade: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir entrada?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a entrada "{deleteItem?.item}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
